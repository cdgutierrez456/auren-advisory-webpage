import type { Metadata } from "next";
import { BarraDemos } from "@/components/demo-ui";

/**
 * Shell de los demos: una barra, una URL, ocho pantallas.
 *
 * `noindex` deliberado: son piezas de venta con datos sintéticos, no
 * contenido del sitio. Se comparten por enlace directo, no por buscador.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function DemosLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BarraDemos />
      <div className="shell py-14 md:py-20">{children}</div>
    </>
  );
}
