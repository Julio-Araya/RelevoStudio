"use client";

import { useEffect, useState } from "react";
import { Isotype } from "@/components/Isotype";

/*
 * Burbuja fija abajo a la derecha que abre el chat. Aparece cuando el
 * acto 01 sale del viewport y queda visible hasta el final. Abre el mismo
 * panel que los botones de la home (evento relevo:chat).
 */
export function ChatBubble() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const acto1 = document.querySelector('[data-acto="1"]');
    if (!acto1) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(acto1);
    return () => observer.disconnect();
  }, []);

  return (
    <button
      type="button"
      aria-label="Empezar conversación"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={() => window.dispatchEvent(new CustomEvent("relevo:chat"))}
      className={`rv-burbuja fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-coral-300 shadow-cta md:bottom-8 md:right-8 ${
        visible ? "" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <Isotype onCoral className="h-7 w-auto" />
    </button>
  );
}
