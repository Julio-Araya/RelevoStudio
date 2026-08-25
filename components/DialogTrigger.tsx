"use client";

/*
 * Botón que abre el chat o el formulario. El texto (copy) lo entrega el
 * server component que lo usa; acá solo va el comportamiento.
 */
export function DialogTrigger({
  target,
  className,
  children,
}: {
  target: "chat" | "form";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent(`relevo:${target}`))}
    >
      {children}
    </button>
  );
}
