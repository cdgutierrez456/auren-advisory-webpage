import { Capacidades } from "@/components/sections/capacidades";
import { Cifras } from "@/components/sections/cifras";
import { Contacto } from "@/components/sections/contacto";
import { Hero } from "@/components/sections/hero";
import { Manifiesto } from "@/components/sections/manifiesto";
import { Metodo } from "@/components/sections/metodo";
import { Nosotros } from "@/components/sections/nosotros";
import { Productos } from "@/components/sections/productos";

export default function Home() {
  return (
    <>
      <Hero />
      <Manifiesto />
      <Metodo />
      <Capacidades />
      <Cifras />
      <Productos />
      <Nosotros />
      <Contacto />
    </>
  );
}
