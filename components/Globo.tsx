/*
 * El globo: capa gráfica de la home, según docs/globo-spec.md.
 * Server component, SVG estático y único en el DOM. Va en un contenedor
 * sticky que abarca los siete actos; el estado por acto lo gobierna
 * app/globo.css (variables de progreso --p2…--p7 animadas por scroll).
 *
 * La envoltura son los dos círculos del logotipo: cada anillo son tres arcos
 * de 120° que cerrados leen como un círculo. Nunca cambia ningún atributo `d`;
 * las piezas solo se mueven con transform y opacity.
 */

const PIEZAS = {
  t1: "M185,275 A95,95 0 0,1 102.7,132.5",
  t2: "M102.7,132.5 A95,95 0 0,1 267.3,132.5",
  t3: "M267.3,132.5 A95,95 0 0,1 185,275",
  c1: "M215,275 A95,95 0 0,1 132.7,132.5",
  c2: "M132.7,132.5 A95,95 0 0,1 297.3,132.5",
  c3: "M297.3,132.5 A95,95 0 0,1 215,275",
} as const;

export function Globo() {
  return (
    <div className="globo-capa" aria-hidden="true">
      <svg viewBox="0 0 400 520" fill="none" className="globo">
        <g className="globo-flotar">
          <g className="globo-cuerpo">
            <g className="globo-envoltura">
              <g className="stroke-teal-500" strokeWidth={26} strokeLinecap="round">
                <path className="globo-pieza globo-t1" d={PIEZAS.t1} />
                <path className="globo-pieza globo-t2" d={PIEZAS.t2} />
                <path className="globo-pieza globo-t3" d={PIEZAS.t3} />
              </g>
              <g className="stroke-coral-300" strokeWidth={26} strokeLinecap="round">
                <path className="globo-pieza globo-c1" d={PIEZAS.c1} />
                <path className="globo-pieza globo-c2" d={PIEZAS.c2} />
                <path className="globo-pieza globo-c3" d={PIEZAS.c3} />
              </g>
            </g>

            <g className="globo-base fill-coral-300">
              <rect x="168" y="300" width="64" height="7" rx="3" />
              <path d="M186,300 L192,282 L198,300 Z" />
              <path d="M202,300 L208,286 L214,300 Z" />
            </g>

            <g className="globo-cables globo-ink-stroke" strokeWidth={3}>
              <path d="M158,266 L184,360" />
              <path d="M242,266 L216,360" />
            </g>

            <rect
              className="globo-canasta globo-ink-fill"
              x="178"
              y="360"
              width="44"
              height="32"
              rx="10"
            />

            <g className="globo-lastres">
              <path className="globo-ink-stroke" strokeWidth={2} d="M190,392 L190,424" />
              <path className="globo-ink-stroke" strokeWidth={2} d="M210,392 L210,440" />
              <rect className="globo-ink-fill" x="180" y="424" width="20" height="15" rx="4" opacity="0.55" />
              <rect className="globo-ink-fill" x="200" y="440" width="20" height="15" rx="4" opacity="0.55" />
            </g>

            <g
              className="globo-estela globo-ink-stroke"
              strokeWidth={3}
              strokeLinecap="round"
              strokeOpacity={0.3}
            >
              <path d="M168,420 L168,448" />
              <path d="M200,430 L200,466" />
              <path d="M232,420 L232,448" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
