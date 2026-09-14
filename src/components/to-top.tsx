import { ToTopButton } from "@/components/motion";
import { Arrow } from "@/components/ui";

/**
 * Volver arriba. Aparece pasados ~400px de scroll y se va al volver al tope.
 * El desplazamiento suave sigue siendo del navegador (`scroll-behavior`): el
 * enlace es un ancla de verdad, no un `scrollTo` reinventado.
 */
export function ToTop() {
  return (
    <ToTopButton className="glass shadow-float fixed bottom-6 right-6 z-40 inline-flex size-12 items-center justify-center rounded-pill text-fg/75 transition-colors duration-300 hover:border-lime hover:text-accent md:bottom-9 md:right-9">
      <Arrow className="-rotate-45" />
      <span className="sr-only">Volver arriba</span>
    </ToTopButton>
  );
}
