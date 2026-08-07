"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitContact, type ContactState } from "@/lib/actions";
import { Arrow } from "@/components/ui";

const initial: ContactState = { status: "idle", message: "" };

const field =
  "w-full border-b bg-transparent py-4 text-ivory outline-none transition-colors placeholder:text-ivory/30 focus:border-lime";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="label inline-flex items-center gap-3 bg-lime px-8 py-4.5 text-ink transition-colors duration-300 hover:bg-ivory disabled:opacity-50"
    >
      {pending ? "Enviando…" : "Enviar solicitud"} <Arrow />
    </button>
  );
}

export function ContactForm() {
  const [state, action] = useActionState(submitContact, initial);

  return (
    <form action={action} className="flex flex-col gap-9">
      <div className="grid gap-9 sm:grid-cols-2">
        <Field name="name" label="Nombre" autoComplete="name" error={state.fields?.name} />
        <Field
          name="email"
          label="Correo corporativo"
          type="email"
          autoComplete="email"
          error={state.fields?.email}
        />
      </div>
      <Field name="company" label="Empresa" autoComplete="organization" optional />

      <label className="flex flex-col gap-3">
        <span className="label text-ivory/45">
          Qué quiere resolver
          {state.fields?.message ? (
            <span className="ml-3 normal-case tracking-normal text-lime">
              {state.fields.message}
            </span>
          ) : null}
        </span>
        <textarea
          name="message"
          rows={4}
          required
          maxLength={4000}
          placeholder="El proceso, el área o la fricción concreta que tiene hoy."
          className={`${field} resize-none ${
            state.fields?.message ? "border-lime" : "border-rule-invert"
          }`}
        />
      </label>

      {/* Honeypot — oculto para personas, visible para bots */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="flex flex-wrap items-center gap-6">
        <Submit />
        {state.message ? (
          <p
            role="status"
            className={`max-w-sm text-sm text-pretty ${
              state.status === "ok" ? "text-lime" : "text-ivory/70"
            }`}
          >
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
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
      <span className="label text-ivory/45">
        {label}
        {error ? (
          <span className="ml-3 normal-case tracking-normal text-lime">{error}</span>
        ) : null}
      </span>
      <input
        name={name}
        required={!optional}
        className={`${field} ${error ? "border-lime" : "border-rule-invert"}`}
        {...props}
      />
    </label>
  );
}
