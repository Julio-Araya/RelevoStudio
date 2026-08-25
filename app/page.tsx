import Link from "next/link";
import { DialogTrigger } from "@/components/DialogTrigger";
import { ChatBubble } from "@/components/ChatBubble";
import { ConversationDialogs } from "@/components/ConversationDialogs";
import { Globo } from "@/components/Globo";
import { GloboScroll } from "@/components/GloboScroll";
import { SITE } from "@/lib/site";

function Overline({ children, onDark = false }: { children: React.ReactNode; onDark?: boolean }) {
  return (
    <p className={`rv-overline mb-4 ${onDark ? "text-teal-300" : "text-teal-600"}`}>
      {children}
    </p>
  );
}

export default function Home() {
  return (
    <main className="globo-escena">
      {/* Capa gráfica: el globo, sticky detrás del texto de los siete actos.
          Los fondos de sección quedan debajo; los contenedores de texto
          (relative) quedan encima. */}
      <Globo />

      {/* Acto 01 · Relevo — off-white-200 */}
      <section
        data-acto="1"
        className="relative mx-auto max-w-[1080px] px-7 pb-24 pt-20 md:pb-32 md:pt-28"
      >
        <Overline>Relevo Studio · Santiago de Chile</Overline>
        <h1 className="rv-header-1 max-w-[880px]">Hacer ligero lo que pesa.</h1>
        <div className="mt-6 max-w-[620px] space-y-4 text-muted">
          <p>
            Construimos sistemas para que tu operación avance con menos
            fricción y más capacidad.
          </p>
          <p>
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
      </section>

      {/* Acto 02 · El punto — off-white-100, líneas escalonadas */}
      <section data-acto="2" className="border-y border-ink-200/12 bg-offwhite-100">
        <div className="relative mx-auto max-w-[1080px] px-7 py-20 md:py-28">
          <Overline>El punto</Overline>
          <h2 className="rv-header-4 max-w-[820px]">
            <span className="rv-reveal block">Tu empresa funciona.</span>
            <span className="rv-reveal block">
              Pero demasiado trabajo todavía depende de alguien.
            </span>
          </h2>
          <div className="mt-8 max-w-[620px] space-y-4 text-muted">
            <p>
              <span className="rv-reveal block">Alguien busca.</span>
              <span className="rv-reveal block">Alguien responde.</span>
              <span className="rv-reveal block">
                Alguien conecta lo que debería estar conectado.
              </span>
            </p>
            <p className="rv-reveal">
              Y mientras tanto, una venta, una decisión o un cliente espera.
            </p>
          </div>
          <ul className="mt-14 grid gap-x-10 gap-y-3 text-sm text-label md:grid-cols-2">
            {[
              "Alguien contesta más de cien mensajes al día.",
              "La mitad del catálogo nunca alcanzó a describirse.",
              "Los currículums se filtran a mano, uno por uno.",
              "La asistencia se anota en un cuaderno.",
              "Cada cotización pasa por la misma persona.",
            ].map((line) => (
              <li key={line} className="rv-reveal border-t border-dashed border-ink-200/15 pt-3">
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Acto 03 · Lo que realmente pasa — off-white-200 */}
      <section data-acto="3" className="relative mx-auto max-w-[1080px] px-7 py-20 md:py-28">
        <Overline>Lo que realmente pasa</Overline>
        <h2 className="rv-header-4 max-w-[760px]">
          El problema que se ve no siempre es el problema real.
        </h2>
        <div className="mt-8 max-w-[620px] space-y-4 text-muted">
          <p>Por eso no empezamos por la tecnología.</p>
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
      </section>

      {/* Acto 04 · Lo que nadie está mirando — ink-gradient, primer golpe oscuro */}
      <section data-acto="4" className="bg-ink-gradient text-offwhite-200">
        <div className="relative mx-auto max-w-[1080px] px-7 py-24 md:py-36">
          <Overline onDark>Lo que nadie está mirando</Overline>
          <h2 className="rv-header-4 max-w-[900px]">
            La inteligencia artificial no arregla una operación desordenada.
            <br />
            La amplifica.
          </h2>
          <div className="mt-10 max-w-[680px] space-y-6 text-offwhite-200/80">
            <p>
              Un agente conversacional montado sobre datos ilegibles no da
              mejores respuestas.
              <br />
              Da fracasos más elegantes.
            </p>
            <p>
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
      <section data-acto="5" className="border-b border-ink-200/12 bg-offwhite-100">
        <div className="relative mx-auto max-w-[1080px] px-7 py-20 md:py-28">
          <Overline>El sistema</Overline>
          <h2 className="rv-header-4 max-w-[760px]">
            El sistema empieza antes que la IA.
          </h2>
          <div className="mt-8 max-w-[620px] space-y-4 text-muted">
            <p>
              Conectamos lo que ya existe.
              <br />
              Construimos lo que falta.
            </p>
            <p>
              Puede ser un agente.
              <br />
              Una herramienta.
              <br />
              Un flujo.
              <br />
              Una capa de datos.
            </p>
            <p>
              La forma cambia. El orden no: primero la base, después la capa
              que se ve.
            </p>
          </div>
          <p className="rv-reveal rv-subheader-1 mt-12 max-w-[620px]">
            Más conversión.
            <br />
            Más capacidad para el equipo.
            <br />
            Una operación preparada para trabajar con IA.
          </p>
        </div>
      </section>

      {/* Acto 06 · La forma Relevo — off-white-200, los tres verbos como componente */}
      <section data-acto="6" className="relative mx-auto max-w-[1080px] px-7 py-20 md:py-28">
        <Overline>La forma Relevo</Overline>
        <h2 className="rv-header-4 max-w-[820px]">
          Construimos lo que el día a día nunca alcanza a construir.
        </h2>
        <div className="mt-12 flex flex-col rounded-lg border border-ink-200/12 bg-offwhite-100 md:flex-row">
          {["Observamos.", "Construimos.", "Probamos."].map((verbo, index) => (
            <div key={verbo} className="flex flex-1 items-center">
              {index > 0 && (
                <div
                  aria-hidden="true"
                  className="mx-8 self-stretch border-t border-dashed border-teal-500/50 md:mx-0 md:my-8 md:border-l md:border-t-0"
                />
              )}
              <p className="rv-reveal rv-header-7 p-8">{verbo}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 max-w-[620px] space-y-4 text-muted">
          <p>Sobre datos, procesos y operación reales.</p>
          <p>
            Primero lo comprobamos.
            <br />
            Después lo dejamos funcionando.
          </p>
        </div>
      </section>

      {/* Acto 07 · Conversación — ink-gradient, segundo y último golpe oscuro */}
      <section data-acto="7" className="bg-ink-gradient text-offwhite-200">
        <div className="relative mx-auto max-w-[1080px] px-7 pb-14 pt-24 md:pt-36">
          <Overline onDark>Conversación</Overline>
          <h2 className="rv-header-4 max-w-[900px]">
            Hay una parte de tu operación que podría estar funcionando mucho
            mejor.
            <br />
            Encontrémosla.
          </h2>
          <p className="mt-8 max-w-[620px] text-offwhite-200/80">
            Cuéntanos qué está pasando.
            <br />
            Nosotros hacemos las preguntas.
            <br />
            Tú no necesitas tener clara la solución.
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
            <a href={`mailto:${SITE.email}`} className="rv-link break-all text-teal-300">
              {SITE.email} <span className="rv-arrow" aria-hidden="true">↗</span>
            </a>
          </p>
          <footer className="mt-24 border-t border-offwhite-200/15 pt-8">
            <p className="rv-overline text-offwhite-200/55">
              Relevo Studio · Santiago de Chile · Desde acá, para Latinoamérica
              · 2026
            </p>
            <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              <Link href="/manifiesto" className="rv-link text-offwhite-200/80">
                Manifiesto
              </Link>
              <a href={`mailto:${SITE.email}`} className="rv-link break-all text-offwhite-200/80">
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
