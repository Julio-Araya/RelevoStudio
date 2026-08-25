"use client";

import { useEffect } from "react";

/*
 * Fallback del globo para navegadores sin scroll-driven animations.
 * Solo si falta soporte de `animation-timeline`, un IntersectionObserver
 * con una franja en el centro del viewport marca el acto actual en <main>
 * (data-acto-actual) y el CSS de app/globo.css hace el resto con transitions.
 * Con soporte nativo, o con prefers-reduced-motion, no hace nada.
 */
export function GloboScroll() {
  useEffect(() => {
    if (typeof CSS === "undefined" || CSS.supports("animation-timeline: view()")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const escena = document.querySelector<HTMLElement>("main.globo-escena");
    const actos = document.querySelectorAll<HTMLElement>("main.globo-escena [data-acto]");
    if (!escena || actos.length === 0) return;

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
    return () => observer.disconnect();
  }, []);

  return null;
}
