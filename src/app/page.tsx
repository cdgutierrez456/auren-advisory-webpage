import { Capacidades } from "@/components/sections/capacidades";
import { Contacto } from "@/components/sections/contacto";
import { Hero } from "@/components/sections/hero";
import { Manifiesto } from "@/components/sections/manifiesto";
import { Metodo } from "@/components/sections/metodo";
import { Principios } from "@/components/sections/principios";
import { Productos } from "@/components/sections/productos";

export default function Home() {
  return (
    <>
      <Hero />
      <Manifiesto />
      <Metodo />
      <Capacidades />
      <Productos />
      <Principios />
      <Contacto />
    </>
  );
}
