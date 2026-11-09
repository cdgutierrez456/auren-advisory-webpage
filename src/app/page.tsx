import { Confianza } from "@/components/sections/confianza";
import { Hero } from "@/components/sections/hero";
import { Metodo } from "@/components/sections/metodo";
import { Preguntas } from "@/components/sections/preguntas";
import { Problemas } from "@/components/sections/problemas";
import { QueHacemos } from "@/components/sections/que-hacemos";
import { Sectores } from "@/components/sections/sectores";
import { Soluciones } from "@/components/sections/soluciones";
import { Testimonios } from "@/components/sections/testimonios";
import { CtaBand } from "@/components/ui";
import { homeFaqs } from "@/content/site";
import { faqPage, JsonLd } from "@/lib/schema";

/**
 * La home es un resumen con una secuencia: captar → qué hacemos → problemas
 * que reconoce → soluciones → método → sectores → por qué creer → preguntas
 * → conversación. Cada bloque enlaza a su página completa; el contenido no
 * se duplica, se lee del mismo array en `site.ts`.
 */
export default function Home() {
  return (
    <>
      {/* Las respuestas están visibles en la sección Preguntas; el JSON-LD solo
          se las declara al buscador. Nunca marcar aquí algo que no esté en la
          página: es exactamente lo que Google penaliza. */}
      <JsonLd data={faqPage(homeFaqs)} />
      <Hero />
      <QueHacemos />
      <Problemas />
      <Soluciones />
      <Metodo />
      <Sectores />
      <Confianza />
      <Testimonios />
      <Preguntas />
      <CtaBand
        title="Empecemos por ver dónde puede funcionar mejor su empresa."
        lede="Una primera conversación de treinta minutos. Si hay caso, le decimos por dónde empezar; si no lo hay, también."
      />
    </>
  );
}
