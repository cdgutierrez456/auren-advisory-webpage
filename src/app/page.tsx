import { Confianza } from "@/components/sections/confianza";
import { Hero } from "@/components/sections/hero";
import { Metodo } from "@/components/sections/metodo";
import { Problemas } from "@/components/sections/problemas";
import { QueHacemos } from "@/components/sections/que-hacemos";
import { Sectores } from "@/components/sections/sectores";
import { Soluciones } from "@/components/sections/soluciones";
import { Testimonios } from "@/components/sections/testimonios";
import { CtaBand } from "@/components/ui";

/**
 * La home muestra poco y abre lo demás bajo demanda: hero, qué hacemos,
 * soluciones, método, sectores, ¿le suena?, por qué creer y conversación.
 * Las preguntas frecuentes viven en /contacto, donde se leen completas.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <QueHacemos />
      <Soluciones />
      <Metodo />
      <Sectores />
      <Problemas />
      <Confianza />
      <Testimonios />
      <CtaBand
        title="Empecemos por ver dónde puede funcionar mejor su empresa."
        lede="Una primera conversación de treinta minutos. Si hay caso, le decimos por dónde empezar; si no lo hay, también."
      />
    </>
  );
}
