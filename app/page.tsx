import Link from "next/link";
import { DialogTrigger } from "@/components/DialogTrigger";
import { ChatBubble } from "@/components/ChatBubble";
import { ConversationDialogs } from "@/components/ConversationDialogs";
import { Globo } from "@/components/Globo";
import { GloboScroll } from "@/components/GloboScroll";
import { SITE } from "@/lib/site";

/* Los colores del texto (tinta, cuerpo, overline, destacado) los define
   app/globo.css a partir del progreso del scroll: en los actos ink (04 y 07)
   conmutan junto con el velo. Por eso acá no hay clases de color de texto. */

function Overline({ children }: { children: React.ReactNode }) {
  return <p className="rv-overline rv-overline-acto mb-4">{children}</p>;
}

export default function Home() {
  return (
    <main className="globo-escena">
      {/* Capa gráfica: las imágenes del globo y su velo, sticky detrás de los
          siete actos. Las secciones son posicionadas y sin fondo: pintan su
          texto sobre el velo (docs/globo-spec.md). */}
      <Globo />

      {/* Acto 01 · Relevo — off-white-200 */}
      <section data-acto="1">
        <div className="mx-auto max-w-[1080px] px-7 pb-24 pt-20 md:pb-32 md:pt-28">
          <Overline>Relevo Studio · Santiago de Chile</Overline>
          <h1 className="rv-header-1 max-w-[880px]">
            Hacer ligero lo que pesa<span className="text-coral-300">.</span>
          </h1>
          <div className="rv-cuerpo mt-6 max-w-[620px] space-y-4">
            <p>
              Construimos sistemas para que tu operación avance con menos
              fricción y más capacidad.
            </p>
            <p className="rv-destacado">
              Para empresas que ya funcionan y quieren crecer mejor con software,
              datos e IA.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <DialogTrigger target="chat" className="rv-btn bg-ink-200 text-coral-100">
              Empezar conversación <span className="rv-arrow" aria-hidden="true">↗</span>
            </DialogTrigger>
            <Link href="/manifiesto" className="rv-btn bg-offwhite-300 text-ink-200">
              Leer el manifiesto <span className="rv-arrow" aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Acto 02 · El punto — off-white-100, líneas escalonadas */}
      <section data-acto="2">
        <div className="mx-auto max-w-[1080px] px-7 py-20 md:py-28">
          <Overline>El punto</Overline>
          <h2 className="rv-header-4 max-w-[820px]">
            <span className="rv-reveal block">Tu empresa funciona.</span>
            <span className="rv-reveal block">
              Pero demasiado trabajo todavía depende de alguien.
            </span>
          </h2>
          <div className="rv-cuerpo mt-8 max-w-[620px] space-y-4">
            <p>
              <span className="rv-reveal block">Alguien busca.</span>
              <span className="rv-reveal block">Alguien responde.</span>
              <span className="rv-reveal block">
                Alguien conecta lo que debería estar conectado.
              </span>
            </p>
            <p className="rv-reveal rv-destacado">
              Y mientras tanto, una venta, una decisión o un cliente espera.
            </p>
          </div>
        </div>
      </section>

      {/* Acto 03 · Lo que realmente pasa — off-white-200 */}
      <section data-acto="3">
        <div className="mx-auto max-w-[1080px] px-7 py-20 md:py-28">
          <Overline>Lo que realmente pasa</Overline>
          <h2 className="rv-header-4 max-w-[760px]">
            El problema que se ve no siempre es el problema real.
          </h2>
          <div className="rv-cuerpo mt-8 max-w-[620px] space-y-4">
            <p className="rv-destacado">Por eso no empezamos por la tecnología.</p>
            <p>
              Primero entendemos qué está frenando el negocio.
              <br />
              Después decidimos qué construir, qué automatizar y dónde la IA
              aporta.
            </p>
            <p>
              Antes de sumar otra persona al mismo proceso, vale la pena
              preguntarse si el proceso debería cambiar.
            </p>
          </div>
        </div>
      </section>

      {/* Acto 04 · Lo que nadie está mirando — ink, primer golpe oscuro */}
      <section data-acto="4">
        <div className="mx-auto max-w-[1080px] px-7 py-24 md:py-36">
          <Overline>Lo que nadie está mirando</Overline>
          <h2 className="rv-header-4 max-w-[900px]">
            La inteligencia artificial no arregla una operación desordenada.
            <br />
            La amplifica.
          </h2>
          <div className="rv-cuerpo mt-10 max-w-[680px] space-y-6">
            <p>
              Un agente conversacional montado sobre datos ilegibles no da
              mejores respuestas.
              <br />
              Da fracasos más elegantes.
            </p>
            <p className="rv-destacado">
              Antes de que un modelo pueda ayudarte, tiene que poder
              entenderte.
              <br />
              Tu catálogo, tus procesos, tu información.
            </p>
            <p>
              Esa capa casi nadie la está construyendo.
              <br />
              Nosotros empezamos por ahí.
            </p>
          </div>
        </div>
      </section>

      {/* Acto 05 · El sistema — off-white-100 */}
      <section data-acto="5">
        <div className="mx-auto max-w-[1080px] px-7 py-20 md:py-28">
          <Overline>El sistema</Overline>
          <h2 className="rv-header-4 max-w-[760px]">
            El sistema empieza antes que la IA.
          </h2>
          {/* Tratamiento tipográfico del acto 05: dos declaraciones en
              subheader-1, la lista como pills del design system (no son
              enlaces), y la frase clave destacada. Mismas palabras del copy. */}
          <p className="rv-subheader-1 mt-8 max-w-[620px]">
            Conectamos lo que ya existe.
            <br />
            Construimos lo que falta.
          </p>
          <div className="mt-8 max-w-[620px]">
            <p className="rv-entradilla">Puede ser</p>
            <ul className="rv-pills mt-3" aria-label="Puede ser">
              {["Un agente", "Una herramienta", "Un flujo", "Una capa de datos"].map((pill) => (
                <li key={pill} className="rv-pill">
                  {pill}
                </li>
              ))}
            </ul>
          </div>
          <p className="rv-cuerpo rv-destacado mt-8 max-w-[620px]">
            La forma cambia. El orden no: primero la base, después la capa
            que se ve.
          </p>
          <p className="rv-reveal rv-subheader-1 mt-12 max-w-[620px]">
            Más conversión.
            <br />
            Más capacidad para el equipo.
            <br />
            Una operación preparada para trabajar con IA.
          </p>
        </div>
      </section>

      {/* Acto 06 · La forma Relevo — off-white-200, los tres verbos como
          paneles de color sólido con flecha ↙ (design system, 06) */}
      <section data-acto="6">
        <div className="mx-auto max-w-[1080px] px-7 py-20 md:py-28">
          <Overline>La forma Relevo</Overline>
          <h2 className="rv-header-4 max-w-[820px]">
            Construimos lo que el día a día nunca alcanza a construir.
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { verbo: "Observamos.", fondo: "bg-coral-300" },
              { verbo: "Construimos.", fondo: "bg-teal-600" },
              { verbo: "Probamos.", fondo: "bg-ink-200" },
            ].map(({ verbo, fondo }) => (
              <div key={verbo} className={`rv-panel rv-reveal-grow ${fondo}`}>
                <span className="rv-panel-flecha" aria-hidden="true">
                  ↙
                </span>
                <p className="rv-panel-titulo">{verbo}</p>
              </div>
            ))}
          </div>
          <div className="rv-cuerpo mt-10 max-w-[620px] space-y-4">
            <p className="rv-destacado">Sobre datos, procesos y operación reales.</p>
            <p>
              Primero lo comprobamos.
              <br />
              Después lo dejamos funcionando.
            </p>
          </div>
        </div>
      </section>

      {/* Acto 07 · Conversación — ink, segundo y último golpe oscuro */}
      <section data-acto="7">
        <div className="mx-auto max-w-[1080px] px-7 pb-14 pt-24 md:pt-36">
          <Overline>Conversación</Overline>
          <h2 className="rv-header-4 max-w-[900px]">
            Hay una parte de tu operación que podría estar funcionando mucho
            mejor.
            <br />
            Encontrémosla.
          </h2>
          <p className="rv-cuerpo mt-8 max-w-[620px]">
            Cuéntanos qué está pasando.
            <br />
            Nosotros hacemos las preguntas.
            <br />
            <span className="rv-destacado">Tú no necesitas tener clara la solución.</span>
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <DialogTrigger target="chat" className="rv-btn bg-teal-300 text-teal-800">
              Empezar conversación <span className="rv-arrow" aria-hidden="true">↗</span>
            </DialogTrigger>
            <DialogTrigger target="form" className="rv-btn bg-offwhite-300 text-ink-200">
              Prefiero escribir <span className="rv-arrow" aria-hidden="true">↗</span>
            </DialogTrigger>
          </div>
          <p className="mt-8">
            <a href={`mailto:${SITE.email}`} className="rv-link rv-destacado break-all">
              {SITE.email} <span className="rv-arrow" aria-hidden="true">↗</span>
            </a>
          </p>
          <footer className="mt-24 border-t border-current/15 pt-8">
            <p className="rv-overline rv-pie">
              Relevo Studio · Santiago de Chile · Desde acá, para Latinoamérica
              · 2026
            </p>
            <p className="rv-cuerpo mt-4 flex flex-wrap gap-x-6 gap-y-2">
              <Link href="/manifiesto" className="rv-link">
                Manifiesto
              </Link>
              <a href={`mailto:${SITE.email}`} className="rv-link break-all">
                {SITE.email}
              </a>
            </p>
          </footer>
        </div>
      </section>

      <GloboScroll />
      <ChatBubble />
      <ConversationDialogs />
    </main>
  );
}
