/*
 * Wordmark: `relev` + doble círculo + `studio`, según el design system (00 y 06).
 * SVG inline, escala con el font-size del contenedor.
 */
export function Wordmark({
  onDark = false,
  animated = false,
}: {
  onDark?: boolean;
  animated?: boolean;
}) {
  return (
    <span className="inline-flex items-center leading-none">
      <span className="sr-only">Relevo Studio</span>
      <span
        aria-hidden="true"
        className={`font-display font-extrabold tracking-[-0.05em] ${
          onDark ? "text-offwhite-200" : "text-ink-200"
        }`}
      >
        relev
      </span>
      <svg
        viewBox="0 0 69 104"
        aria-hidden="true"
        className="-mx-px h-[1em] w-auto"
      >
        <circle
          cx="27"
          cy="63"
          r="22"
          fill="none"
          strokeWidth="10.5"
          className={`${onDark ? "stroke-teal-bright" : "stroke-teal-500"} ${
            animated ? "animate-handoff" : ""
          }`}
        />
        <circle
          cx="41"
          cy="63"
          r="22"
          fill="none"
          strokeWidth="10.5"
          className={`stroke-coral-300 ${animated ? "animate-handoff-b" : ""}`}
        />
      </svg>
      <span
        aria-hidden="true"
        className={`ml-[0.18em] self-end pb-[0.07em] font-display text-[0.6em] font-semibold tracking-[-0.04em] ${
          onDark ? "text-teal-300" : "text-teal-600"
        }`}
      >
        studio
      </span>
    </span>
  );
}
