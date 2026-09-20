"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Arrow } from "@/components/ui";
import {
  axes,
  DEFAULT_CLIENTE,
  DEFAULT_UNIDAD,
  type OperationType,
  operationTypes,
  questions,
  radiografia,
  sizes,
} from "@/content/radiografia";
import {
  type AnswerValue,
  type Answers,
  callUrl,
  type Context,
  scoreRadiografia,
} from "@/lib/radiografia";

/**
 * Auto-diagnóstico interactivo, una pregunta a la vez.
 *
 * Sin persistencia por diseño: el resultado vive en el estado de React y
 * desaparece al cerrar la pestaña. No hay red, no hay backend, no hay dato
 * que se guarde sin que la persona lo entregue.
 *
 * Recorrido: dos preguntas de contexto (no puntúan) y luego las doce, cada una
 * en su propio panel, con flechas atrás/siguiente. Al terminar, el resultado
 * reemplaza el panel en un contenedor limpio.
 */

const nav = radiografia.nav;

/** Reemplaza {unidad}/{cliente} según el tipo de operación elegido en C1. */
function fillVars(prompt: string, op?: OperationType): string {
  const found = operationTypes.find((o) => o.id === op);
  return prompt
    .replace("{unidad}", found?.unidad ?? DEFAULT_UNIDAD)
    .replace("{cliente}", found?.cliente ?? DEFAULT_CLIENTE);
}

type Screen = { kind: "c1" } | { kind: "c2" } | { kind: "question"; index: number };

const screens: Screen[] = [
  { kind: "c1" },
  { kind: "c2" },
  ...questions.map((_, index) => ({ kind: "question" as const, index })),
];

export function RadiografiaForm() {
  const [answers, setAnswers] = useState<Answers>({});
  const [operacion, setOperacion] = useState<OperationType | undefined>();
  const [tamano, setTamano] = useState<string | undefined>();
  const [step, setStep] = useState(0);
  const [finished, setFinished] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const result = scoreRadiografia(answers);
  const context: Context = {
    operacion: operationTypes.find((o) => o.id === operacion)?.label,
    tamano,
  };

  const screen = screens[step];
  const isLast = step === screens.length - 1;

  const answeredCurrent =
    screen.kind === "c1"
      ? operacion !== undefined
      : screen.kind === "c2"
        ? tamano !== undefined
        : answers[questions[screen.index].id] !== undefined;

  function toTop() {
    requestAnimationFrame(() =>
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  }

  function goNext() {
    if (!answeredCurrent) return;
    if (isLast) {
      setFinished(true);
      toTop();
      return;
    }
    // Sin scroll entre pasos: el panel tiene alto mínimo y cambia en su sitio,
    // así no se mete debajo de la barra fija.
    setStep((s) => Math.min(screens.length - 1, s + 1));
  }

  function goBack() {
    if (finished) {
      setFinished(false);
      toTop();
      return;
    }
    setStep((s) => Math.max(0, s - 1));
  }

  function restart() {
    setAnswers({});
    setOperacion(undefined);
    setTamano(undefined);
    setStep(0);
    setFinished(false);
    toTop();
  }

  if (finished) {
    return (
      <div ref={topRef} className="scroll-mt-28">
        <Result result={result} context={context} onReset={restart} />
      </div>
    );
  }

  const answeredScored = questions.filter((q) => answers[q.id] !== undefined).length;

  return (
    <div ref={topRef} className="scroll-mt-28">
      <div className="glass mx-auto flex max-w-3xl flex-col rounded-card p-7 md:p-12">
        <ProgressHead screen={screen} answeredScored={answeredScored} />

        <div className="mt-10 min-h-[20rem] md:min-h-[22rem]">
          {screen.kind === "c1" ? (
            <SingleChoice
              eyebrow={nav.context}
              prompt={radiografia.context.c1.prompt}
              hint={radiografia.context.intro}
              options={operationTypes.map((o) => o.label)}
              selectedIndex={operationTypes.findIndex((o) => o.id === operacion)}
              onSelect={(i) => setOperacion(operationTypes[i].id)}
            />
          ) : screen.kind === "c2" ? (
            <SingleChoice
              eyebrow={nav.context}
              prompt={radiografia.context.c2.prompt}
              options={[...sizes]}
              selectedIndex={sizes.indexOf((tamano ?? "") as (typeof sizes)[number])}
              onSelect={(i) => setTamano(sizes[i])}
              compact
            />
          ) : (
            <QuestionScreen
              index={screen.index}
              operacion={operacion}
              value={answers[questions[screen.index].id]}
              onSelect={(v) =>
                setAnswers((prev) => ({ ...prev, [questions[screen.index].id]: v }))
              }
            />
          )}
        </div>

        <div className="mt-10 flex items-center justify-between gap-4 border-t border-line pt-7">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 0}
            className="label inline-flex items-center gap-2 rounded-pill px-5 py-3 text-fg/55 transition-colors duration-300 hover:text-fg disabled:cursor-not-allowed disabled:opacity-0"
          >
            <Arrow className="rotate-[225deg]" /> {nav.back}
          </button>

          <span className="label text-fg/40">
            {step + 1} / {screens.length}
          </span>

          <button
            type="button"
            onClick={goNext}
            disabled={!answeredCurrent}
            className="label inline-flex items-center gap-3 rounded-pill bg-lime px-7 py-4 text-ink transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_-6px_var(--color-lime)] active:translate-y-0 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            {isLast ? nav.finish : nav.next} <Arrow />
          </button>
        </div>
      </div>

      {step > 0 || answeredScored > 0 ? (
        <p className="mt-6 text-center">
          <button
            type="button"
            onClick={restart}
            className="label text-fg/40 underline-offset-8 transition-colors duration-300 hover:text-fg/70 hover:underline"
          >
            {radiografia.result.reset}
          </button>
        </p>
      ) : null}
    </div>
  );
}

function ProgressHead({
  screen,
  answeredScored,
}: {
  screen: Screen;
  answeredScored: number;
}) {
  const total = questions.length;
  const label =
    screen.kind === "question"
      ? `${nav.step} ${screen.index + 1} ${nav.of} ${total}`
      : nav.context;
  const pct =
    screen.kind === "question"
      ? ((screen.index + (answeredScored > screen.index ? 1 : 0)) / total) * 100
      : 2;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span aria-hidden className="h-0.5 w-6 shrink-0 bg-lime" />
        <span className="label text-fg/55">{label}</span>
      </div>
      <div
        role="progressbar"
        aria-label={radiografia.progress.label}
        aria-valuenow={answeredScored}
        aria-valuemin={0}
        aria-valuemax={total}
        className="h-0.5 w-full bg-line"
      >
        <div
          className="h-full bg-lime transition-[width] duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function QuestionScreen({
  index,
  operacion,
  value,
  onSelect,
}: {
  index: number;
  operacion?: OperationType;
  value: AnswerValue | undefined;
  onSelect: (value: AnswerValue) => void;
}) {
  const q = questions[index];
  return (
    <fieldset className="flex flex-col gap-7">
      <legend className="sr-only">{fillVars(q.prompt, operacion)}</legend>
      <span className="label text-accent">{axes[q.axis].name}</span>
      <div className="flex flex-col gap-3">
        <p
          aria-hidden
          className="text-balance text-2xl leading-snug tracking-tight text-fg md:text-3xl"
        >
          {fillVars(q.prompt, operacion)}
        </p>
        {q.hint ? <p className="text-pretty text-fg/55">{q.hint}</p> : null}
      </div>

      <div className="mt-1 grid gap-2.5">
        {q.options.map((option, score) => (
          <Choice
            key={option}
            label={option}
            badge={String(score)}
            selected={value === score}
            onSelect={() => onSelect(score)}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => onSelect("NA")}
        className={`label self-start rounded-pill px-4 py-2 transition-colors duration-200 ${
          value === "NA" ? "bg-fg/10 text-fg" : "text-fg/40 hover:text-fg/70"
        }`}
      >
        {radiografia.naLabel}
      </button>
    </fieldset>
  );
}

/** Opción con badge de puntaje (para las 12 preguntas). */
function Choice({
  label,
  badge,
  selected,
  onSelect,
}: {
  label: string;
  badge: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={`group flex items-center gap-4 rounded-card border px-5 py-4 text-left transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime ${
        selected
          ? "border-lime/60 bg-lime/10 text-fg"
          : "border-line-strong text-fg/75 hover:-translate-y-0.5 hover:border-lime/40 hover:text-fg"
      }`}
    >
      <span
        aria-hidden
        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-sm font-medium tabular-nums transition-colors ${
          selected ? "bg-lime text-ink" : "bg-fg/5 text-fg/40 group-hover:text-fg/70"
        }`}
      >
        {badge}
      </span>
      <span className="text-pretty leading-snug">{label}</span>
    </button>
  );
}

/** Selección simple sin puntaje (para las preguntas de contexto). */
function SingleChoice({
  eyebrow,
  prompt,
  hint,
  options,
  selectedIndex,
  onSelect,
  compact = false,
}: {
  eyebrow: string;
  prompt: string;
  hint?: string;
  options: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  compact?: boolean;
}) {
  return (
    <div className="flex flex-col gap-7">
      <span className="label text-accent">{eyebrow}</span>
      <div className="flex flex-col gap-3">
        <p className="text-balance text-2xl leading-snug tracking-tight text-fg md:text-3xl">
          {prompt}
        </p>
        {hint ? <p className="text-pretty text-fg/55">{hint}</p> : null}
      </div>
      <div className={`mt-1 grid gap-2.5 ${compact ? "sm:grid-cols-2" : ""}`}>
        {options.map((option, i) => (
          <button
            key={option}
            type="button"
            aria-pressed={selectedIndex === i}
            onClick={() => onSelect(i)}
            className={`rounded-card border px-5 py-4 text-left text-pretty leading-snug transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime ${
              selectedIndex === i
                ? "border-lime/60 bg-lime/10 text-fg"
                : "border-line-strong text-fg/75 hover:-translate-y-0.5 hover:border-lime/40 hover:text-fg"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Resultado ────────────────────────────────────────────────────────────────

function Result({
  result,
  context,
  onReset,
}: {
  result: ReturnType<typeof scoreRadiografia>;
  context: Context;
  onReset: () => void;
}) {
  const copy = radiografia.result;

  // 5+ «No aplica»: la operación se sale del patrón. Se salta el puntaje.
  if (result.offScale) {
    return (
      <ResultShell eyebrow={copy.eyebrow}>
        <div className="max-w-2xl">
          <h2 className="text-headline text-balance font-normal">{copy.offScale.title}</h2>
          <p className="mt-6 text-pretty text-lede leading-relaxed text-fg/75">
            {copy.offScale.body}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <CtaLink href={callUrl(result, context)}>{copy.cta}</CtaLink>
            <ResetLink onReset={onReset} />
          </div>
        </div>
      </ResultShell>
    );
  }

  const band = result.band!;
  const hours = result.p1 ? copy.hoursByScore[result.p1] : null;

  return (
    <ResultShell eyebrow={copy.eyebrow}>
      {/* Puntaje + banda */}
      <div className="grid gap-10 md:grid-cols-[auto_1fr] md:items-start md:gap-16">
        <div className="flex items-baseline gap-2">
          <span className="tnum text-display font-normal leading-none text-accent [text-shadow:0_0_44px_rgba(200,241,105,0.45)]">
            {result.total}
          </span>
          <span className="label text-fg/55">/ {result.max}</span>
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="text-headline text-balance font-normal">{band.name}</h2>
          <p className="font-serif text-quote text-balance leading-snug text-fg/90">
            {band.verdict}
          </p>
          <p className="max-w-2xl text-pretty leading-relaxed text-fg/60">{band.body}</p>
        </div>
      </div>

      {/* Bloque 1 — el costo en horas (ancho completo) */}
      {hours ? (
        <div className="mt-12 rounded-card border border-lime/30 bg-lime/[0.06] p-7 md:p-9">
          <p className="max-w-3xl text-pretty text-lede leading-relaxed text-fg/90">{hours}</p>
        </div>
      ) : null}

      {/* Focos a la izquierda · cierre a la derecha */}
      <div className="mt-14 grid gap-12 border-t border-line pt-12 md:grid-cols-2 md:gap-16">
        <div>
          <h3 className="label text-fg/55">{copy.focusTitle}</h3>
          {result.focuses.length === 0 ? (
            <p className="mt-6 text-pretty leading-relaxed text-fg/60">{copy.focusNone}</p>
          ) : (
            <ol className="mt-8 flex flex-col gap-4">
              {result.focuses.map((focus) => (
                <li key={focus.id} className="glass rounded-card p-7">
                  <div className="flex items-center gap-3">
                    <span aria-hidden className="h-0.5 w-6 bg-lime" />
                    <span className="label text-fg/55">
                      {focus.score} / {focus.max}
                    </span>
                  </div>
                  <p className="mt-4 text-xl leading-tight tracking-tight text-fg">{focus.name}</p>
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-fg/60">
                    {focus.phrase}
                  </p>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="flex flex-col gap-8">
          {band.insightBridge ? (
            <>
              <p className="text-pretty leading-relaxed text-fg/75">{copy.bridge}</p>
              <div className="flex flex-col gap-4">
                <p className="text-pretty leading-relaxed text-fg/90">{copy.talk}</p>
                <div className="flex flex-wrap items-center gap-3">
                  <CtaLink href={callUrl(result, context)}>{copy.cta}</CtaLink>
                  <Link
                    href={copy.insightHref}
                    className="label inline-flex items-center gap-2 rounded-pill border border-line-strong px-6 py-4 text-fg transition-all duration-300 hover:-translate-y-0.5 hover:border-lime hover:text-accent"
                  >
                    {copy.insightCta} <Arrow />
                  </Link>
                </div>
                <p className="text-sm text-fg/45">{copy.ctaSub}</p>
                <p className="text-sm text-fg/45">{copy.capacity}</p>
              </div>
            </>
          ) : (
            <CtaLink href={callUrl(result, context)}>{copy.ctaSoft}</CtaLink>
          )}
        </div>
      </div>

      {/* Salidas «no ahora», a lo ancho y separadas del CTA principal. */}
      <div className="mt-12 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-line pt-8">
        <p className="max-w-md text-pretty text-sm leading-relaxed text-fg/45">{copy.secondary}</p>
        <ResetLink onReset={onReset} />
      </div>
    </ResultShell>
  );
}

/** Contenedor limpio del resultado: banda oscura, acento lima, aire. */
function ResultShell({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden rounded-card bg-surface-4 p-8 text-fg md:p-14">
      <div
        aria-hidden
        className="glow breathe pointer-events-none absolute -top-24 right-[6%] h-72 w-72 bg-lime"
      />
      <div className="relative">
        <div className="flex items-center gap-4">
          <span aria-hidden className="h-0.5 w-8 bg-lime" />
          <span className="label text-accent">{eyebrow}</span>
        </div>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

function CtaLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="label inline-flex items-center gap-3 rounded-pill bg-lime px-8 py-4 text-ink transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_-6px_var(--color-lime)] active:translate-y-0 active:scale-[0.97]"
    >
      {children} <Arrow />
    </a>
  );
}

function ResetLink({ onReset }: { onReset: () => void }) {
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
