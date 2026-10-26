"use client";

import { useState } from "react";
import { Arrow } from "@/components/arrow";
import { validateLead, whatsappUrl } from "@/lib/lead";
import { useLang } from "@/lib/use-lang";
import { translator } from "@/lib/i18n";

const field =
  "w-full border-b bg-transparent py-4 text-fg outline-none transition-colors placeholder:text-fg/30 focus:border-lime";

export function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const lang = useLang();
  const t = translator(lang);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const result = validateLead(new FormData(form), lang);

    if (!result.ok) {
      setErrors(result.fields);
      setSent(false);
      return;
    }

    setErrors({});
    const url = whatsappUrl(result.lead, lang);

    // Si el navegador bloquea la ventana nueva, navegamos en la actual: ahí no
    // hay formulario que limpiar porque la página se va.
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) {
      window.location.href = url;
      return;
    }

    form.reset();
    setSent(true);
  }

  return (
    <form
      onSubmit={onSubmit}
      // El aviso de envío deja de ser cierto en cuanto empieza un mensaje nuevo.
      onInput={() => setSent(false)}
      noValidate
      className="flex flex-col gap-9"
    >
      <div className="grid gap-9 sm:grid-cols-2">
        <Field name="name" label={t("Nombre", "Name")} autoComplete="name" error={errors.name} />
        <Field
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          error={errors.email}
        />
      </div>
      <Field
        name="company"
        label={t("Empresa", "Company")}
        autoComplete="organization"
        optional
        optionalLabel={t("Opcional", "Optional")}
      />

      <label className="flex flex-col gap-3">
        <Legend text={t("Qué quiere resolver", "What you want to solve")} error={errors.message} />
        <textarea
          name="message"
          rows={4}
          maxLength={4000}
          placeholder={t(
            "El proceso, el área o la fricción concreta que tiene hoy.",
            "The process, the department or the specific friction you have today.",
          )}
          aria-invalid={Boolean(errors.message)}
          className={`${field} resize-none ${errors.message ? "border-lime" : "border-line"}`}
        />
      </label>

      <div className="flex flex-wrap items-center gap-6">
        <button
          type="submit"
          className="label inline-flex items-center gap-3 rounded-pill bg-lime px-8 py-4.5 text-ink transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_-6px_var(--color-lime)] active:translate-y-0 active:scale-[0.97]"
        >
          {t("Enviar por WhatsApp", "Send via WhatsApp")} <Arrow />
        </button>
        <p role="status" className="max-w-xs text-pretty text-sm text-fg/55">
          {sent
            ? t(
                "Abrimos WhatsApp con su mensaje listo. Solo falta enviarlo.",
                "We opened WhatsApp with your message ready. All that's left is to send it.",
              )
            : null}
        </p>
      </div>
    </form>
  );
}

function Legend({ text, error }: { text: string; error?: string }) {
  return (
    <span className="label text-fg/45">
      {text}
      {error ? <span className="ml-3 normal-case tracking-normal text-accent">{error}</span> : null}
    </span>
  );
}

function Field({
  name,
  label,
  error,
  optional = false,
  optionalLabel,
  ...props
}: {
  name: string;
  label: string;
  error?: string;
  optional?: boolean;
  optionalLabel?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex flex-col gap-3">
      <Legend text={label} error={error} />
      <input
        name={name}
        aria-invalid={Boolean(error)}
        className={`${field} ${error ? "border-lime" : "border-line"}`}
        {...props}
      />
      {optional ? <span className="sr-only">{optionalLabel}</span> : null}
    </label>
  );
}
