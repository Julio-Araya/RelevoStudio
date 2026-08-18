/*
 * Isotipo: dos círculos solapados con la animación `handoff`, firma de la marca.
 */
export function Isotype({
  onDark = false,
  animated = true,
  className = "",
}: {
  onDark?: boolean;
  animated?: boolean;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 120 80" aria-hidden="true" className={className}>
      <circle
        cx="52"
        cy="40"
        r="24"
        fill="none"
        strokeWidth="10"
        className={`${onDark ? "stroke-teal-bright" : "stroke-teal-500"} ${
          animated ? "animate-handoff" : ""
        }`}
      />
      <circle
        cx="68"
        cy="40"
        r="24"
        fill="none"
        strokeWidth="10"
        className={`stroke-coral-300 ${animated ? "animate-handoff-b" : ""}`}
      />
    </svg>
  );
}
