import { Confianza } from "@/components/sections/confianza";
import { Hero } from "@/components/sections/hero";
import { Metodo } from "@/components/sections/metodo";
import { Problemas } from "@/components/sections/problemas";
import { QueHacemos } from "@/components/sections/que-hacemos";
import { Sectores } from "@/components/sections/sectores";
import { Soluciones } from "@/components/sections/soluciones";
import { Testimonios } from "@/components/sections/testimonios";
import { CtaBand } from "@/components/ui";
import { getT } from "@/lib/i18n-server";

/**
 * La home muestra poco y abre lo demás bajo demanda: hero, qué hacemos,
 * soluciones, método, sectores, ¿le suena?, por qué creer y conversación.
 * Las preguntas frecuentes viven en /contacto, donde se leen completas.
 */
export default async function Home() {
  const t = await getT();
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
        title={t(
          "El primer paso es ver dónde puede funcionar mejor su empresa.",
          "The first step is to see where your company can work better.",
        )}
        lede={t(
          "Una primera conversación de treinta minutos. Si hay caso, se define por dónde empezar; si no lo hay, también se dice con claridad.",
          "A first thirty-minute conversation. If there's a case, we define where to start; if there isn't, we say so clearly.",
        )}
      />
    </>
  );
}
