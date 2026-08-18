import Link from "next/link";
import { Isotype } from "@/components/Isotype";
import { SITE } from "@/lib/site";

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Legibilidad",
      serviceType: "Legibilidad para buscadores, modelos de lenguaje y agentes",
      description:
        "Catálogos, contenidos y datos preparados para ser leídos por buscadores, por modelos de lenguaje y por agentes conversacionales.",
      provider: { "@id": `${SITE.url}/#organization` },
      areaServed: "Latinoamérica",
    },
    {
      "@type": "Service",
      name: "Agentes",
      serviceType: "Agentes conversacionales",
      description:
        "Sistemas conversacionales sobre WhatsApp, web o canales internos, que atienden, cotizan, califican y venden con el conocimiento real del negocio.",
      provider: { "@id": `${SITE.url}/#organization` },
      areaServed: "Latinoamérica",
    },
    {
      "@type": "Service",
      name: "Sistemas",
      serviceType: "Automatización y software a medida",
      description:
        "Automatización y software a medida cuando el proceso no cabe en una herramienta existente. Incluye migrar o reconstruir la plataforma cuando la base actual no aguanta lo que se va a montar encima.",
      provider: { "@id": `${SITE.url}/#organization` },
      areaServed: "Latinoamérica",
    },
    {
      "@type": "Service",
      name: "Fundaciones",
      serviceType: "Modelo de negocio, marca, go-to-market, pricing",
      description:
        "Modelo de negocio, marca, go-to-market, pricing. No se vende suelta: es lo que se ordena antes de construir, cuando lo que está roto no es el sistema sino la definición.",
      provider: { "@id": `${SITE.url}/#organization` },
      areaServed: "Latinoamérica",
    },
  ],
};

function Overline({ children, onDark = false }: { children: React.ReactNode; onDark?: boolean }) {
  return (
    <p className={`rv-overline mb-4 ${onDark ? "text-teal-300" : "text-teal-600"}`}>
      {children}
    </p>
  );
}

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />

      {/* Bloque 1 · Apertura — off-white-200 */}
      <section className="mx-auto max-w-[1080px] px-7 pb-24 pt-20 md:pb-32 md:pt-28">
        <Overline>Estudio de IA aplicada · Santiago de Chile</Overline>
        <h1 className="rv-header-1 max-w-[880px]">
          En casi toda empresa hay un punto donde el proceso depende de que
          alguien conteste a mano.
        </h1>
        <p className="rv-subheader-1 mt-6 max-w-[620px] text-muted">
          Relevo Studio construye el sistema que lo releva.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link href="/manifiesto" className="rv-btn bg-ink-200 text-coral-100">
            Ver el manifiesto <span className="rv-arrow" aria-hidden="true">↗</span>
          </Link>
          <a href="#conversemos" className="rv-btn bg-offwhite-300 text-ink-200">
            Conversemos <span className="rv-arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      {/* Bloque 2 · El relevo — off-white-100 */}
      <section className="border-y border-ink-200/12 bg-offwhite-100">
        <div className="mx-auto grid max-w-[1080px] items-center gap-12 px-7 py-20 md:grid-cols-[1.2fr_1fr] md:py-28">
          <div className="rv-reveal">
            <Overline>Re·le·vo</Overline>
            <h2 className="rv-header-4">
              Del latín <em>relevare</em>: hacer ligero lo que pesa.
            </h2>
            <div className="mt-6 max-w-[560px] space-y-4 text-muted">
              <p>
                El relevo es el momento en que se entrega la posta. No es
                reemplazo ni delegación: es un traspaso que ocurre en
                movimiento, sin que nadie se detenga.
              </p>
              <p>
                Eso es lo que hacemos. Tomamos procesos que hoy se sostienen
                porque una persona los hace a mano, y los pasamos a un sistema
                que los sostiene solo.
              </p>
            </div>
            <p className="mt-8">
              <Link href="/manifiesto" className="rv-link text-teal-600">
                Leer el manifiesto completo{" "}
                <span className="rv-arrow" aria-hidden="true">↗</span>
              </Link>
            </p>
          </div>
          <div className="rv-reveal-grow flex justify-center md:justify-end">
            <Isotype className="w-56 max-w-full md:w-72" />
          </div>
        </div>
      </section>

      {/* Bloque 3 · Dónde está el punto — off-white-200 */}
      <section className="mx-auto max-w-[1080px] px-7 py-20 md:py-28">
        <Overline>Dónde suele estar</Overline>
        <h2 className="rv-header-4 max-w-[760px]">
          Casi siempre es el mismo punto, con distinta cara.
        </h2>
        <ul className="mt-12">
          {[
            "Alguien contesta más de cien mensajes al día.",
            "La mitad del catálogo nunca alcanzó a describirse.",
            "Los currículums se filtran a mano, uno por uno.",
            "La asistencia se anota en un cuaderno.",
            "Cada cotización pasa por la misma persona.",
          ].map((line) => (
            <li
              key={line}
              className="rv-reveal rv-header-7 border-t border-dashed border-ink-200/15 py-5 last:border-b"
            >
              {line}
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-[620px] text-muted">
          Ese punto no se arregla contratando a alguien más. Se arregla
          construyendo el sistema que debía existir.
        </p>
      </section>

      {/* Bloque 4 · La tesis — ink-gradient */}
      <section className="bg-ink-gradient text-offwhite-200">
        <div className="mx-auto max-w-[1080px] px-7 py-24 md:py-36">
          <Overline onDark>Lo que creemos</Overline>
          <h2 className="rv-header-4 max-w-[860px]">
            La inteligencia artificial no arregla una operación desordenada. La
            amplifica.
          </h2>
          <div className="mt-8 max-w-[640px] space-y-4 text-offwhite-200/80">
            <p>
              Instalar un agente conversacional sobre un catálogo ilegible no
              produce mejores respuestas: produce fracasos más elegantes.
            </p>
            <p>
              Una empresa que no es legible no puede apalancarse en la IA. Ni su
              catálogo para las máquinas, ni su operación para sí misma. El
              trabajo empieza abajo, en los datos y en la estructura, no en la
              capa que se ve.
            </p>
            <p>
              Hacer legible la empresa es la mitad del trabajo. Y casi nadie la
              está haciendo.
            </p>
          </div>
        </div>
      </section>

      {/* Bloque 5 · Qué construimos — off-white-100 */}
      <section className="border-b border-ink-200/12 bg-offwhite-100">
        <div className="mx-auto max-w-[1080px] px-7 py-20 md:py-28">
          <Overline>Qué construimos</Overline>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {/* Las dos primeras encadenadas: comparten borde y una línea que las une */}
            <div className="rv-reveal flex flex-col rounded-lg border border-ink-200/12 bg-offwhite-200 md:col-span-2 md:flex-row">
              <div className="flex-1 p-8">
                <h3 className="rv-header-7">Legibilidad</h3>
                <div className="mt-4 space-y-3 text-muted">
                  <p>
                    Catálogos, contenidos y datos preparados para ser leídos por
                    buscadores, por modelos de lenguaje y por agentes
                    conversacionales.
                  </p>
                  <p>
                    Es la capa que casi nadie tiene y sin la cual todo lo demás
                    falla.
                  </p>
                </div>
              </div>
              <div
                aria-hidden="true"
                className="mx-8 border-t border-dashed border-teal-500/50 md:mx-0 md:my-8 md:border-l md:border-t-0"
              />
              <div className="flex-1 p-8">
                <h3 className="rv-header-7">Agentes</h3>
                <div className="mt-4 space-y-3 text-muted">
                  <p>
                    Sistemas conversacionales sobre WhatsApp, web o canales
                    internos, que atienden, cotizan, califican y venden con el
                    conocimiento real del negocio.
                  </p>
                  <p>
                    <em>Depende de la anterior.</em> Un agente sobre un catálogo
                    roto es un fracaso con mejor redacción.
                  </p>
                </div>
              </div>
            </div>
            <div className="rv-reveal rounded-lg border border-ink-200/12 bg-offwhite-200 p-8">
              <h3 className="rv-header-7">Sistemas</h3>
              <p className="mt-4 text-muted">
                Automatización y software a medida cuando el proceso no cabe en
                una herramienta existente. Incluye migrar o reconstruir la
                plataforma cuando la base actual no aguanta lo que se va a
                montar encima.
              </p>
            </div>
            <div className="rv-reveal rounded-lg border border-ink-200/12 bg-offwhite-200 p-8">
              <h3 className="rv-header-7">Fundaciones</h3>
              <div className="mt-4 space-y-3 text-muted">
                <p>Modelo de negocio, marca, go-to-market, pricing.</p>
                <p>
                  <em>No se vende suelta.</em> Es lo que se ordena antes de
                  construir, cuando lo que está roto no es el sistema sino la
                  definición.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bloque 6 · La decisión — off-white-200, sobrio */}
      <section className="mx-auto max-w-[1080px] px-7 py-24 md:py-36">
        <div className="mx-auto max-w-[760px] text-center">
          <Overline>La decisión</Overline>
          <h2 className="rv-header-4">Casi siempre la decisión ya está tomada.</h2>
          <div className="mx-auto mt-8 max-w-[620px] space-y-4 text-muted">
            <p>
              Cuando una empresa publica una vacante, ya reconoció el problema y
              ya aprobó el presupuesto. La única pregunta abierta es cómo se
              resuelve: con alguien haciendo el trabajo a mano, o con un sistema
              que lo deje resuelto.
            </p>
            <p>A veces la respuesta correcta es contratar. Cuando lo es, lo decimos.</p>
          </div>
        </div>
      </section>

      {/* Bloque 7 · Lo que no hacemos — paneles coral / teal / ink */}
      <section className="border-y border-ink-200/12 bg-offwhite-100">
        <div className="mx-auto max-w-[1080px] px-7 py-20 md:py-28">
          <Overline>Las renuncias</Overline>
          <h2 className="rv-header-4 max-w-[720px]">
            Toda posición real tiene una renuncia.
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <div className="rv-reveal flex min-h-[300px] flex-col justify-between rounded-lg bg-coral-300 p-7 text-offwhite-200 shadow-card">
              <span aria-hidden="true" className="self-end text-2xl opacity-85">↙</span>
              <div>
                <h3 className="rv-header-7">No vendemos horas ni personas</h3>
                <p className="mt-3 text-offwhite-200/85">
                  Relevo no se contrata por disponibilidad. Si lo que se
                  necesita es alguien que esté, hay que contratar a alguien.
                  Nosotros dejamos el sistema.
                </p>
              </div>
            </div>
            <div className="rv-reveal flex min-h-[300px] flex-col justify-between rounded-lg bg-teal-600 p-7 text-offwhite-200 shadow-card">
              <span aria-hidden="true" className="self-end text-2xl opacity-85">↙</span>
              <div>
                <h3 className="rv-header-7">No operamos la máquina todos los meses</h3>
                <p className="mt-3 text-offwhite-200/85">
                  No gestionamos campañas, no publicamos redes, no somos un
                  equipo de marketing tercerizado. Construimos, entregamos
                  funcionando y enseñamos a operarlo.
                </p>
              </div>
            </div>
            <div className="rv-reveal flex min-h-[300px] flex-col justify-between rounded-lg bg-ink-200 p-7 text-offwhite-200 shadow-card">
              <span aria-hidden="true" className="self-end text-2xl opacity-85">↙</span>
              <div>
                <h3 className="rv-header-7">
                  No entregamos diagnósticos que no terminan en algo construido
                </h3>
                <p className="mt-3 text-offwhite-200/85">
                  Un informe que nadie implementa es un costo, no un servicio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bloque 8 · La prueba — off-white-100 */}
      <section className="bg-offwhite-100">
        <div className="mx-auto max-w-[1080px] px-7 py-20 md:py-28">
          <Overline>La prueba</Overline>
          <h2 className="rv-header-4 max-w-[760px]">
            No mostramos portafolio. Mostramos producto propio.
          </h2>
          <p className="mt-6 max-w-[620px] text-muted">
            Casi todo lo que construimos está bajo acuerdo de confidencialidad.
            Estos son nuestros: los construimos de punta a punta y se venden por
            su cuenta.
          </p>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            <div className="rv-reveal border-l-2 border-coral-300 pl-6">
              <h3 className="rv-header-7">Serchi</h3>
              <p className="mt-3 max-w-[440px] text-muted">
                Reclutamiento y selección con inteligencia artificial. Filtra,
                ordena y entiende candidatos a la velocidad a la que llegan.
              </p>
              <p className="mt-4">
                <a
                  href={SITE.serchi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rv-link text-teal-600"
                >
                  serchi.ai <span className="rv-arrow" aria-hidden="true">↗</span>
                </a>
              </p>
            </div>
            <div className="rv-reveal border-l-2 border-teal-500 pl-6">
              <h3 className="rv-header-7">Workieo</h3>
              <p className="mt-3 max-w-[440px] text-muted">
                Control de asistencia por WhatsApp para empresas con personal en
                terreno. Sin reloj biométrico, sin aplicaciones nuevas.
              </p>
              <p className="mt-4">
                <a
                  href={SITE.workieo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rv-link text-teal-600"
                >
                  workieo.com <span className="rv-arrow" aria-hidden="true">↗</span>
                </a>
              </p>
            </div>
          </div>
          <p className="mt-12 max-w-[620px] text-muted">
            Están acá por una sola razón: son la evidencia de que construimos
            sistemas completos, no piezas sueltas.
          </p>
        </div>
      </section>

      {/* Bloque 9 · Conversemos — ink-gradient */}
      <section id="conversemos" className="bg-ink-gradient text-offwhite-200">
        <div className="mx-auto max-w-[1080px] px-7 pb-14 pt-24 md:pt-36">
          <h2 className="rv-header-1">Conversemos.</h2>
          <p className="mt-6 max-w-[560px] text-offwhite-200/80">
            La primera conversación parte con algo hecho: revisamos el caso
            antes de la reunión y llegamos con un diagnóstico propio.
          </p>
          <p className="mt-12">
            <a
              href={`mailto:${SITE.email}`}
              className="rv-link rv-header-6 break-all text-teal-300"
            >
              {SITE.email} <span className="rv-arrow" aria-hidden="true">↗</span>
            </a>
          </p>
          <p className="mt-4 text-offwhite-200/60">
            Respondemos en menos de 24 horas.
          </p>
          <footer className="mt-24 border-t border-offwhite-200/15 pt-8">
            <p className="rv-overline text-offwhite-200/55">
              Relevo Studio · Santiago de Chile · Desde acá, para Latinoamérica
              · 2026
            </p>
          </footer>
        </div>
      </section>
    </main>
  );
}
