"use client";

import { useRef, useState } from "react";
import { Arrow } from "@/components/ui";
import { axes, questions, radiografia } from "@/content/radiografia";
import { type Answers, callUrl, scoreRadiografia } from "@/lib/radiografia";

/**
 * Auto-diagnóstico interactivo.
 *
 * Sin persistencia por diseño: el resultado vive en el estado de React y
 * desaparece al cerrar la pestaña. No hay red, no hay backend, no hay dato
 * que se guarde sin que la persona lo entregue.
 */
export function RadiografiaForm() {
  const [answers, setAnswers] = useState<Answers>({});
  const result = scoreRadiografia(answers);
  const resultRef = useRef<HTMLDivElement>(null);

  function choose(id: string, value: number) {
    const next = { ...answers, [id]: value };
    setAnswers(next);

    // Al completar la última, llevamos la vista al resultado: si no, queda
    // fuera de pantalla y parece que el formulario no hizo nada.
    if (Object.keys(next).length === questions.length) {
      requestAnimationFrame(() =>
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    }
  }

  return (
    <>
      <p className="mb-2 flex items-center gap-4 border-b border-line pb-8 text-sm text-fg/55">
        <span aria-hidden className="h-0.5 w-6 shrink-0 bg-lime" />
        {radiografia.scale}
      </p>

      <ol className="flex flex-col gap-3">
        {questions.map((q, i) => (
          <li key={q.id} className="glass rounded-card px-7 py-8 md:px-9 md:py-9">
            <fieldset className="flex flex-col gap-6 md:flex-row md:gap-12">
              <legend className="sr-only">{q.prompt}</legend>
              <div className="flex shrink-0 items-baseline gap-4 md:w-64 md:flex-col md:gap-3">
                <span className="label text-fg/40">{String(i + 1).padStart(2, "0")}</span>
                <span className="label text-fg/55">{axes[q.axis].name}</span>
              </div>
              <div className="flex flex-1 flex-col gap-6">
                <p
                  aria-hidden
                  className="max-w-2xl text-balance text-xl leading-snug tracking-tight text-fg md:text-2xl"
                >
                  {q.prompt}
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {q.options.map((option, value) => (
                    <Option
                      key={option}
                      name={q.id}
                      label={option}
                      score={value}
                      checked={answers[q.id] === value}
                      onSelect={() => choose(q.id, value)}
                    />
                  ))}
                </div>
              </div>
            </fieldset>
          </li>
        ))}
      </ol>

      {result.complete ? null : <Progress answered={result.answered} />}

      <div ref={resultRef} className="scroll-mt-24">
        {result.complete ? (
          <Result result={result} onReset={() => setAnswers({})} />
        ) : (
          <Pending answered={result.answered} onReset={() => setAnswers({})} />
        )}
      </div>
    </>
  );
}

/** Opción como botón de radio: navegable con teclado, sin JS para el foco. */
function Option({
  name,
  label,
  score,
  checked,
  onSelect,
}: {
  name: string;
  label: string;
  score: number;
  checked: boolean;
  onSelect: () => void;
}) {
  return (
    <label
      className={`group flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3.5 transition-colors duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-lime ${
        checked
          ? "border-lime/60 bg-lime/10 text-fg"
          : "border-line-strong text-fg/75 hover:border-lime/40 hover:text-fg"
      }`}
    >
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onSelect}
        className="sr-only"
      />
      <span
        aria-hidden
        className={`w-5 shrink-0 text-center text-base font-medium tabular-nums transition-colors ${
          checked ? "text-accent" : "text-fg/40 group-hover:text-fg/55"
        }`}
      >
        {score}
      </span>
      <span className="text-sm leading-snug">{label}</span>
    </label>
  );
}

/** Barra fija: cuántas van. Sin puntaje parcial — engañaría. */
function Progress({ answered }: { answered: number }) {
  const total = questions.length;
  return (
    <div className="sticky bottom-0 z-40 -mx-gutter mt-4 border-t border-line bg-surface/80 px-gutter py-4 backdrop-blur-xl">
      <div className="flex items-center gap-5">
        <span className="label shrink-0 text-fg/55">
          {answered} / {total}
        </span>
        <div
          role="progressbar"
          aria-label={radiografia.progress.label}
          aria-valuenow={answered}
          aria-valuemin={0}
          aria-valuemax={total}
          className="h-0.5 flex-1 bg-line"
        >
          <div
            className="h-full bg-lime transition-[width] duration-500 ease-out"
            style={{ width: `${(answered / total) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function Pending({ answered, onReset }: { answered: number; onReset: () => void }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-6 border-t border-line py-10">
      <p role="status" className="text-pretty text-fg/55">
        {answered === 0
          ? radiografia.progress.pending
          : `Le faltan ${questions.length - answered} preguntas para ver su radiografía completa.`}
      </p>
      {answered > 0 ? <ResetButton onReset={onReset} /> : null}
    </div>
  );
}

function Result({
  result,
  onReset,
}: {
  result: ReturnType<typeof scoreRadiografia>;
  onReset: () => void;
}) {
  const { result: copy } = radiografia;

  return (
    <section className="-mx-gutter -mb-section mt-4 bg-surface-4 px-gutter py-16 text-fg md:py-20">
      <div className="flex items-baseline gap-5">
        <span className="label text-accent">{copy.eyebrow}</span>
        <span className="h-px flex-1 bg-line" />
      </div>

      <div className="mt-12 grid gap-12 md:grid-cols-[auto_1fr] md:gap-20">
        <div className="flex items-baseline gap-2">
          <span className="tnum text-display font-normal leading-none text-accent [text-shadow:0_0_44px_rgba(200,241,105,0.45)]">
            {result.total}
          </span>
          <span className="label text-fg/55">/ {result.max}</span>
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="text-headline text-balance font-normal">{result.band.name}</h2>
          <p className="font-serif text-2xl leading-snug text-balance text-fg/90 md:text-3xl">
            {result.band.verdict}
          </p>
          <p className="max-w-xl text-pretty leading-relaxed text-fg/60">
            {result.band.body}
          </p>
        </div>
      </div>

      <div className="mt-16 border-t border-line pt-12">
        <h3 className="label text-fg/55">{copy.focusTitle}</h3>
        {result.focuses.length === 0 ? (
          <p className="mt-6 max-w-xl text-pretty leading-relaxed text-fg/60">
            {copy.focusNone}
          </p>
        ) : (
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {result.focuses.map((focus) => (
              <li key={focus.id} className="glass flex flex-col gap-4 rounded-card p-7">
                <div className="flex items-center gap-3">
                  <span className="h-0.5 w-6 bg-lime" />
                  <span className="label text-fg/55">
                    {focus.score} / {focus.max}
                  </span>
                </div>
                <p className="text-xl leading-tight tracking-tight">{focus.name}</p>
                <p className="text-pretty text-sm leading-relaxed text-fg/60">
                  {focus.gain}
                </p>
              </li>
            ))}
          </ol>
        )}
      </div>

      <div className="mt-16 flex flex-col gap-8 border-t border-line pt-12">
        <p className="max-w-2xl text-pretty text-lede leading-relaxed text-fg/90">
          {copy.closing}
        </p>
        <div className="flex flex-wrap items-center gap-6">
          <a
            href={callUrl(result)}
            target="_blank"
            rel="noopener noreferrer"
            className="label inline-flex items-center gap-3 rounded-pill bg-lime px-8 py-4.5 text-ink transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_-6px_var(--color-lime)] active:translate-y-0 active:scale-[0.97]"
          >
            {copy.cta} <Arrow />
          </a>
          <ResetButton onReset={onReset} />
        </div>
      </div>
    </section>
  );
}

function ResetButton({ onReset }: { onReset: () => void }) {
  return (
    <button
      type="button"
      onClick={onReset}
      className="label text-fg/55 underline-offset-8 transition-colors duration-300 hover:text-fg hover:underline"
    >
      {radiografia.result.reset}
    </button>
  );
}
