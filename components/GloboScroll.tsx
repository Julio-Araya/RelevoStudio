"use client";

import { useEffect } from "react";

/*
 * Isla del globo. Dos trabajos, ambos mejoras progresivas: sin JavaScript
 * el texto llega igual y queda la imagen del acto 01.
 *
 * 1. Carga diferida. Las imágenes de los actos 02–07 llegan con los srcset
 *    en data-*; acá se promueven a atributos reales cuando el acto anterior
 *    entra en pantalla, para que el cruce no parpadee. La primera se promueve
 *    recién cuando terminó de cargar la del acto 01, que es la prioritaria.
 *    Las que no se muestran (display: none en móvil) no se descargan.
 *
 * 2. Fallback del estado. Solo si falta soporte de `timeline-scope` o si el
 *    visitante prefiere menos movimiento, un IntersectionObserver con una
 *    franja en el centro del viewport marca el acto actual en <main>
 *    (data-acto-actual) y app/globo.css fija las variables por acto.
 */
export function GloboScroll() {
  useEffect(() => {
    const escena = document.querySelector<HTMLElement>("main.globo-escena");
    const actos = Array.from(
      document.querySelectorAll<HTMLElement>("main.globo-escena [data-acto]"),
    );
    if (!escena || actos.length === 0) return;

    const limpiezas: Array<() => void> = [];

    /* ---- 1. Carga diferida ---- */
    const pendientes = new Map<number, HTMLPictureElement>();
    for (const picture of escena.querySelectorAll<HTMLPictureElement>("picture[data-imagen]")) {
      if (picture.querySelector("img[data-src]")) {
        pendientes.set(Number(picture.dataset.imagen), picture);
      }
    }

    const seMuestra = (el: HTMLElement) => el.getClientRects().length > 0;

    const promover = (n: number) => {
      const picture = pendientes.get(n);
      if (!picture || !seMuestra(picture)) return;
      pendientes.delete(n);
      for (const source of picture.querySelectorAll<HTMLSourceElement>("source[data-srcset]")) {
        source.srcset = source.dataset.srcset ?? "";
        delete source.dataset.srcset;
      }
      const img = picture.querySelector<HTMLImageElement>("img[data-src]");
      if (img) {
        img.src = img.dataset.src ?? "";
        delete img.dataset.src;
      }
    };

    const siguienteDe = (n: number) => {
      const candidatos = Array.from(pendientes.keys())
        .filter((k) => k > n && seMuestra(pendientes.get(k)!))
        .sort((a, b) => a - b);
      return candidatos[0];
    };

    const iniciarCarga = () => {
      if (pendientes.size === 0) return;
      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const n = Number((entry.target as HTMLElement).dataset.acto);
          promover(n);
          const siguiente = siguienteDe(n);
          if (siguiente !== undefined) promover(siguiente);
        }
        if (pendientes.size === 0) observer.disconnect();
      });
      actos.forEach((acto) => observer.observe(acto));
      limpiezas.push(() => observer.disconnect());
    };

    const primera = escena.querySelector<HTMLImageElement>(
      'picture[data-imagen="1"] img',
    );
    if (primera && !primera.complete) {
      primera.addEventListener("load", iniciarCarga, { once: true });
      primera.addEventListener("error", iniciarCarga, { once: true });
      limpiezas.push(() => {
        primera.removeEventListener("load", iniciarCarga);
        primera.removeEventListener("error", iniciarCarga);
      });
    } else {
      iniciarCarga();
    }

    /* ---- 2. Fallback del estado ---- */
    const soporte = typeof CSS !== "undefined" && CSS.supports("timeline-scope: --acto");
    const menosMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!soporte || menosMovimiento) {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              escena.dataset.actoActual = (entry.target as HTMLElement).dataset.acto;
            }
          }
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
      );
      actos.forEach((acto) => observer.observe(acto));
      limpiezas.push(() => observer.disconnect());
    }

    return () => limpiezas.forEach((fn) => fn());
  }, []);

  return null;
}
