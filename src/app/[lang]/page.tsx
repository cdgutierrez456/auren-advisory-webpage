import { Capacidades } from "@/components/sections/capacidades";
import { Contacto } from "@/components/sections/contacto";
import { Hero } from "@/components/sections/hero";
import { Manifiesto } from "@/components/sections/manifiesto";
import { Metodo } from "@/components/sections/metodo";
import { Nosotros } from "@/components/sections/nosotros";
import { Preguntas } from "@/components/sections/preguntas";
import { Productos } from "@/components/sections/productos";
import { Sectores } from "@/components/sections/sectores";
import { Testimonios } from "@/components/sections/testimonios";
import { CtaBand } from "@/components/ui";
import { getContent, getT } from "@/lib/i18n-server";
import { faqPage, JsonLd } from "@/lib/schema";

export default async function Home() {
  const [{ homeFaqs }, t] = await Promise.all([getContent(), getT()]);
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
      {/* Llamado a mitad de recorrido: quien ya entendió el método y las
          capacidades no debería tener que llegar al pie para agendar. */}
      <CtaBand
        title={t("¿Sabe dónde se le va el tiempo hoy?", "Do you know where your time goes today?")}
        lede={t(
          "Nosotros tampoco, todavía. Por eso el primer paso es mirar la operación, no proponerle una herramienta. Una conversación de diagnóstico, sin compromiso.",
          "Neither do we, yet. That's why the first step is to look at the operation, not to pitch you a tool. A no-commitment diagnostic conversation.",
        )}
      />
      <Productos />
      <Sectores />
      <Testimonios />
      <Nosotros />
      <Preguntas />
      <Contacto />
    </>
  );
}
