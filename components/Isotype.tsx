/*
 * Isotipo: dos círculos solapados con la animación `handoff`, firma de la marca.
 * Tonos: sobre claro (teal-500 + coral-300), sobre ink (teal-bright + coral-300)
 * y sobre coral (ink-200 + off-white-200: el coral del segundo círculo no se
 * distingue del fondo, así que el par pasa a los dos neutros de la marca).
 */
export function Isotype({
  onDark = false,
  onCoral = false,
  animated = true,
  className = "",
}: {
  onDark?: boolean;
  onCoral?: boolean;
  animated?: boolean;
  className?: string;
}) {
  const first = onCoral ? "stroke-ink-200" : onDark ? "stroke-teal-bright" : "stroke-teal-500";
  const second = onCoral ? "stroke-offwhite-200" : "stroke-coral-300";
  return (
    <svg viewBox="0 0 120 80" aria-hidden="true" className={className}>
      <circle
        cx="52"
        cy="40"
        r="24"
        fill="none"
        strokeWidth="10"
        className={`${first} ${animated ? "animate-handoff" : ""}`}
      />
      <circle
        cx="68"
        cy="40"
        r="24"
        fill="none"
        strokeWidth="10"
        className={`${second} ${animated ? "animate-handoff-b" : ""}`}
      />
    </svg>
  );
}
