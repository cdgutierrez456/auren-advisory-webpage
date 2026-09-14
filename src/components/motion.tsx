"use client";

import type { ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  type HTMLMotionProps,
  useScroll,
  useTransform,
} from "motion/react";

/**
 * Envoltorios de animación sobre Motion.
 *
 * Por qué una librería y no solo CSS: `animation-timeline: view()` no existe en
 * Firefox ni en Safari anteriores al 26, y ahí las animaciones de scroll no
 * corrían en absoluto. Motion las resuelve con IntersectionObserver, que
 * funciona en todo lo que hay que soportar.
 *
 * Las animaciones de fondo (`.drift`, `.breathe`) y la entrada del hero siguen
 * siendo CSS: funcionan en todos los navegadores sin JavaScript y el contenido
 * sobre el pliegue no debería depender de que un bundle cargue para hacerse
 * visible.
 *
 * Estos componentes son cliente, pero sus hijos NO: llegan como `children` ya
 * renderizados en el servidor. Las secciones siguen siendo Server Components.
 */

type Etiqueta =
  | "div"
  | "ul"
  | "ol"
  | "li"
  | "dl"
  | "header"
  | "article"
  | "section"
  | "span"
  | "p"
  | "blockquote";

/** `motion.div`, `motion.li`… elegido en tiempo de ejecución. El cast existe
 *  porque el proxy de Motion no se deja tipar por índice; las props que
 *  aceptamos son las de un elemento HTML normal. */
const etiqueta = (as: Etiqueta) =>
  motion[as] as React.ComponentType<HTMLMotionProps<"div">>;

const SUBIR = {
  oculto: { opacity: 0, y: 28, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

/** La misma curva que el resto del sistema (`--ease-expo`). */
const EASE = [0.16, 1, 0.3, 1] as const;
const TRANSICION = { duration: 0.75, ease: EASE };

/** Se dispara una vez: volver a subir no vuelve a animar, que marea. */
const VISTA = { once: true, amount: 0.15 } as const;

/**
 * Respeta «reducir movimiento» del sistema: Motion desactiva desplazamientos y
 * escalas y deja solo la opacidad. Envuelve el sitio entero desde `layout.tsx`.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Un bloque que entra al aparecer en pantalla. */
export function Reveal({
  as = "div",
  delay = 0,
  children,
  ...props
}: { as?: Etiqueta; delay?: number; children?: ReactNode } & HTMLMotionProps<"div">) {
  const Tag = etiqueta(as);
  return (
    <Tag
      initial="oculto"
      whileInView="visible"
      viewport={VISTA}
      variants={SUBIR}
      transition={{ ...TRANSICION, delay }}
      {...props}
    >
      {children}
    </Tag>
  );
}

/**
 * Rejilla o lista cuyos hijos entran escalonados. El padre orquesta; cada hijo
 * va envuelto en <RevealItem>, que hereda las variantes.
 */
export function RevealList({
  as = "div",
  paso = 0.07,
  children,
  ...props
}: { as?: Etiqueta; paso?: number; children?: ReactNode } & HTMLMotionProps<"div">) {
  const Tag = etiqueta(as);
  return (
    <Tag
      initial="oculto"
      whileInView="visible"
      viewport={VISTA}
      variants={{ oculto: {}, visible: { transition: { staggerChildren: paso } } }}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({
  as = "div",
  children,
  ...props
}: { as?: Etiqueta; children?: ReactNode } & HTMLMotionProps<"div">) {
  const Tag = etiqueta(as);
  return (
    <Tag variants={SUBIR} transition={TRANSICION} {...props}>
      {children}
    </Tag>
  );
}

/** El trazo lima que se dibuja al entrar en vista. */
export function DrawRule({ className = "" }: { className?: string }) {
  return (
    <motion.span
      aria-hidden
      className={className}
      style={{ transformOrigin: "left center" }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VISTA}
      transition={{ duration: 0.8, ease: EASE }}
    />
  );
}

/** Telón que se mueve más lento que el contenido mientras baja la página. */
export function ParallaxY({
  distancia = 90,
  className = "",
  children,
}: {
  distancia?: number;
  className?: string;
  children: ReactNode;
}) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1200], [0, -distancia]);
  return (
    <motion.div aria-hidden className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}

/**
 * Volver arriba. Aparece cuando ya hay algo que desandar — antes era un truco
 * de `animation-timeline: scroll()`, que tampoco corría en medio navegador.
 */
export function ToTopButton({ className = "", children }: { className?: string; children: ReactNode }) {
  const { scrollY } = useScroll();
  const opacidad = useTransform(scrollY, [400, 700], [0, 1]);
  const escala = useTransform(scrollY, [400, 700], [0.85, 1]);
  const puntero = useTransform(opacidad, (v) => (v < 0.5 ? "none" : "auto"));

  return (
    <motion.a
      href="#contenido"
      className={className}
      style={{ opacity: opacidad, scale: escala, pointerEvents: puntero }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.94 }}
      transition={{ duration: 0.3, ease: EASE }}
    >
      {children}
    </motion.a>
  );
}

export { AnimatePresence };
