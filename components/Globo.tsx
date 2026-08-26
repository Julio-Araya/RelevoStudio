/*
 * El globo: capa gráfica de la home, según docs/globo-spec.md (v2).
 * Server component. Siete imágenes, una por acto, en un contenedor sticky
 * que abarca los siete actos; el cruce entre ellas y el desplazamiento
 * lento dentro de cada acto los gobierna app/globo.css con las variables
 * de progreso --p2…--p7 animadas por scroll.
 *
 * Son decorativas (alt vacío): el contenido está en el texto y llega
 * completo aunque no cargue ninguna.
 *
 * Carga: solo la del acto 01 llega con prioridad. Las otras seis van con
 * los srcset en data-* y components/GloboScroll.tsx los promueve cuando el
 * acto anterior entra en pantalla. No pueden ir en loading="lazy": la capa
 * sticky siempre está en el viewport y se descargarían las siete de golpe.
 *
 * Los archivos los genera scripts/imagenes.mjs (npm run imagenes).
 */

const IMAGENES = [
  { acto: 1, archivo: "acto-01-completo" },
  { acto: 2, archivo: "acto-02-lastres" },
  { acto: 3, archivo: "acto-03-abre" },
  { acto: 4, archivo: "acto-04-base" },
  { acto: 5, archivo: "acto-05-arma" },
  { acto: 6, archivo: "acto-06-prueba" },
  { acto: 7, archivo: "acto-07-sube" },
] as const;

const ANCHOS = [640, 828, 1280, 1920] as const;
const ANCHOS_MOVIL = [640, 828] as const;
const MOVIL = "(max-width: 767px)";

function srcset(archivo: string, ext: "avif" | "webp", anchos: readonly number[], sufijo = "") {
  return anchos.map((w) => `/actos/${archivo}${sufijo}-${w}.${ext} ${w}w`).join(", ");
}

export function Globo() {
  return (
    <div className="globo-capa" aria-hidden="true">
      {IMAGENES.map(({ acto, archivo }) => {
        const prioritaria = acto === 1;
        // Con prioridad: atributos reales. Diferida: en data-*, hasta que la isla los promueva.
        const attr = prioritaria ? "srcSet" : "data-srcset";
        const fuentes = [
          { type: "image/avif", media: MOVIL, set: srcset(archivo, "avif", ANCHOS_MOVIL, "-4x5") },
          { type: "image/webp", media: MOVIL, set: srcset(archivo, "webp", ANCHOS_MOVIL, "-4x5") },
          { type: "image/avif", set: srcset(archivo, "avif", ANCHOS) },
          { type: "image/webp", set: srcset(archivo, "webp", ANCHOS) },
        ];
        const fallback = `/actos/${archivo}-1280.webp`;
        return (
          <picture
            key={acto}
            className={`globo-imagen globo-imagen-${acto}`}
            data-imagen={acto}
          >
            {fuentes.map(({ type, media, set }) => (
              <source
                key={`${type}${media ?? ""}`}
                type={type}
                media={media}
                sizes="100vw"
                {...{ [attr]: set }}
              />
            ))}
            <img
              alt=""
              width={1920}
              height={1080}
              decoding="async"
              {...(prioritaria
                ? { src: fallback, fetchPriority: "high" as const }
                : { "data-src": fallback })}
            />
          </picture>
        );
      })}
      {/* Velo: color de fondo del acto, translúcido, interpolado por scroll */}
      <div className="globo-velo" />
    </div>
  );
}
