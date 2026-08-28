"use client";

import { useEffect, useState } from "react";

/**
 * Estado de demo: arranca en los datos sembrados, acepta cambios durante la
 * sesión y se reinicia solo.
 *
 * `sessionStorage` y no `localStorage` a propósito: cerrar la pestaña deja el
 * demo limpio para el siguiente cliente, sin que nadie tenga que acordarse de
 * limpiarlo.
 *
 * Requisito de uso: el componente que llama a este hook debe estar dentro de
 * <SoloCliente>. Leer sessionStorage en el primer render del servidor es la
 * forma clásica de romper la hidratación.
 */
export function useDemoStore<T>(clave: string, semilla: readonly T[]) {
  const [items, setItems] = useState<T[]>(() => {
    const guardado = typeof window === "undefined" ? null : sessionStorage.getItem(clave);
    return guardado ? (JSON.parse(guardado) as T[]) : [...semilla];
  });

  useEffect(() => {
    sessionStorage.setItem(clave, JSON.stringify(items));
  }, [clave, items]);

  return {
    items,
    agregar: (item: T) => setItems((prev) => [item, ...prev]),
    actualizar: (coincide: (t: T) => boolean, cambios: Partial<T>) =>
      setItems((prev) => prev.map((t) => (coincide(t) ? { ...t, ...cambios } : t))),
    reiniciar: () => {
      sessionStorage.removeItem(clave);
      setItems([...semilla]);
    },
  };
}

/** Reinicia TODOS los demos. Va en el layout: se usa en vivo cuando el cliente
 *  quiere ver el flujo otra vez. */
export function reiniciarTodo() {
  sessionStorage.clear();
  location.reload();
}
