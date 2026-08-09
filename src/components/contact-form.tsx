"use client";

import { useState } from "react";
import { Arrow } from "@/components/ui";
import { validateLead, whatsappUrl } from "@/lib/lead";

const field =
  "w-full border-b bg-transparent py-4 text-ivory outline-none transition-colors placeholder:text-ivory/30 focus:border-lime";

export function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = validateLead(new FormData(event.currentTarget));

    if (!result.ok) {
      setErrors(result.fields);
      setSent(false);
      return;
    }

    setErrors({});
    const url = whatsappUrl(result.lead);
    // Si el navegador bloquea la pestaña nueva, navegamos en la misma.
    if (!window.open(url, "_blank", "noopener,noreferrer")) window.location.href = url;
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-9">
      <div className="grid gap-9 sm:grid-cols-2">
        <Field name="name" label="Nombre" autoComplete="name" error={errors.name} />
        <Field
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          error={errors.email}
        />
      </div>
      <Field name="company" label="Empresa" autoComplete="organization" optional />

      <label className="flex flex-col gap-3">
        <Legend text="Qué quiere resolver" error={errors.message} />
        <textarea
          name="message"
          rows={4}
          maxLength={4000}
          placeholder="El proceso, el área o la fricción concreta que tiene hoy."
          aria-invalid={Boolean(errors.message)}
          className={`${field} resize-none ${errors.message ? "border-lime" : "border-rule-invert"}`}
        />
      </label>

      <div className="flex flex-wrap items-center gap-6">
        <button
          type="submit"
          className="label inline-flex items-center gap-3 bg-lime px-8 py-4.5 text-ink transition-colors duration-300 hover:bg-ivory"
        >
          Enviar por WhatsApp <Arrow />
        </button>
        <p role="status" className="max-w-xs text-pretty text-sm text-ivory/55">
          {sent
            ? "Abrimos WhatsApp con su mensaje listo. Solo falta enviarlo."
            : "Se abre WhatsApp con el mensaje ya redactado."}
        </p>
      </div>
    </form>
  );
}

function Legend({ text, error }: { text: string; error?: string }) {
  return (
    <span className="label text-ivory/45">
      {text}
      {error ? <span className="ml-3 normal-case tracking-normal text-lime">{error}</span> : null}
    </span>
  );
}

function Field({
  name,
  label,
  error,
  optional = false,
  ...props
}: {
  name: string;
  label: string;
  error?: string;
  optional?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex flex-col gap-3">
      <Legend text={label} error={error} />
      <input
        name={name}
        aria-invalid={Boolean(error)}
        className={`${field} ${error ? "border-lime" : "border-rule-invert"}`}
        {...props}
      />
      {optional ? <span className="sr-only">Opcional</span> : null}
    </label>
  );
}
