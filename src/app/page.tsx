import { Capacidades } from "@/components/sections/capacidades";
import { Contacto } from "@/components/sections/contacto";
import { Hero } from "@/components/sections/hero";
import { Manifiesto } from "@/components/sections/manifiesto";
import { Metodo } from "@/components/sections/metodo";
import { Nosotros } from "@/components/sections/nosotros";
import { Preguntas } from "@/components/sections/preguntas";
import { Productos } from "@/components/sections/productos";
import { Sectores } from "@/components/sections/sectores";
import { homeFaqs } from "@/content/site";
import { faqPage, JsonLd } from "@/lib/schema";

export default function Home() {
  return (
    <>
      {/* Las respuestas están visibles en la sección Preguntas; el JSON-LD solo
          se las declara al buscador. Nunca marcar aquí algo que no esté en la
          página: es exactamente lo que Google penaliza. */}
      <JsonLd data={faqPage(homeFaqs)} />
      <Hero />
      <Manifiesto />
      <Metodo />
      <Capacidades />
      <Productos />
      <Sectores />
      <Nosotros />
      <Preguntas />
      <Contacto />
    </>
  );
}
