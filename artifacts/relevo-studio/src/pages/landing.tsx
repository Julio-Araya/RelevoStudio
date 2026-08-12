import { FadeIn } from "@/components/fade-in";
import { RelevoBar } from "@/components/relevo-bar";

export function LandingPage() {
  return (
    <main className="w-full min-h-[100dvh] flex flex-col bg-[var(--ink)] overflow-x-hidden selection:bg-[var(--brass)] selection:text-[var(--ink)]">
      {/* Section 1 - Opening */}
      <section className="w-full min-h-[100dvh] flex flex-col relative px-6 md:px-12 py-8 max-w-[1200px] mx-auto">
        <header className="w-full flex justify-between font-mono text-[11px] text-[var(--stone)] uppercase tracking-[0.08em] mb-auto">
          <span>RELEVO STUDIO</span>
          <span>SANTIAGO · CHILE</span>
        </header>

        <div className="w-full flex flex-col max-w-[800px] mt-24 md:mt-32">
          <FadeIn delay={0.0}>
            <h1 className="font-display font-[800] text-[40px] md:text-[72px] leading-[1.1] text-[var(--paper)]">
              Relevo
            </h1>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="mt-8 mb-12 flex flex-col gap-4 max-w-[280px]">
              <span className="font-mono text-[11px] text-[var(--stone)] uppercase tracking-[0.08em]">
                re·le·vo
              </span>
              <div className="w-full h-[1px] bg-[var(--ink-3)]" />
              <p className="font-sans text-[17px] text-[var(--body)] leading-[1.5]">
                del latín relevare: aliviar lo que pesa.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p className="font-sans text-[20px] md:text-[24px] text-[var(--body)] leading-[1.4] max-w-[640px]">
              Construimos sistemas de inteligencia artificial para empresas que ya funcionan y todavía dependen de que alguien conteste manualmente.
            </p>
          </FadeIn>
        </div>

        <div className="mt-auto pt-24 w-full max-w-[1000px] mx-auto pb-8 md:pb-12">
          <RelevoBar />
        </div>
      </section>

      {/* Hairline separator */}
      <div className="w-full h-[1px] bg-[var(--ink-3)] max-w-[1200px] mx-auto" />

      {/* Section 2 - What we do */}
      <section className="w-full bg-[var(--ink)] px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn delay={0.0}>
            <span className="font-mono text-[11px] text-[var(--brass)] uppercase tracking-[0.08em] block mb-12 md:mb-16">
              QUÉ CONSTRUIMOS
            </span>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            <FadeIn delay={0.08}>
              <h3 className="font-display font-[800] text-[24px] md:text-[32px] text-[var(--paper)] mb-4 md:mb-6 leading-[1.2]">
                Asistentes que saben del negocio
              </h3>
              <p className="font-sans text-[17px] text-[var(--body)] leading-[1.5]">
                Responden a clientes y equipos con el conocimiento real de la empresa, en el canal donde ya están: sitio, WhatsApp, correo.
              </p>
            </FadeIn>
            
            <FadeIn delay={0.16}>
              <h3 className="font-display font-[800] text-[24px] md:text-[32px] text-[var(--paper)] mb-4 md:mb-6 leading-[1.2]">
                Procesos que dejan de ser manuales
              </h3>
              <p className="font-sans text-[17px] text-[var(--body)] leading-[1.5]">
                Cotizaciones, calificación de contactos, reportes, seguimiento. Lo que hoy ocupa horas de alguien pasa a ocurrir solo.
              </p>
            </FadeIn>
            
            <FadeIn delay={0.24}>
              <h3 className="font-display font-[800] text-[24px] md:text-[32px] text-[var(--paper)] mb-4 md:mb-6 leading-[1.2]">
                Producto, no presentaciones
              </h3>
              <p className="font-sans text-[17px] text-[var(--body)] leading-[1.5]">
                Entregamos software funcionando en producción, no una estrategia en PDF. Es la diferencia entre un consultor y un estudio.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Section 3 - Products */}
      <section className="w-full bg-[var(--paper)] px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn delay={0.0}>
            <span className="font-mono text-[11px] text-[var(--ink)] uppercase tracking-[0.08em] block mb-8 md:mb-12">
              PRODUCTOS PROPIOS
            </span>
            <h2 className="font-display font-[800] text-[28px] md:text-[48px] text-[var(--ink)] leading-[1.1] mb-16 md:mb-24 max-w-[800px]">
              No solo trabajamos para clientes.
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 mb-20 md:mb-24">
            <FadeIn delay={0.08}>
              <div className="flex flex-col border-l border-[var(--ink)]/10 pl-6 md:pl-8">
                <h3 className="font-display font-[800] text-[24px] md:text-[32px] text-[var(--ink)] mb-4">
                  Serchi
                </h3>
                <p className="font-sans text-[17px] text-[var(--ink-2)] leading-[1.5] mb-8 max-w-[400px]">
                  Reclutamiento con inteligencia artificial. Filtra, ordena y entiende candidatos a la velocidad a la que llegan.
                </p>
                <a 
                  href="https://serchi.ai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] text-[var(--ink)] tracking-[0.08em] uppercase group flex items-center w-fit outline-none focus-visible:ring-2 focus-visible:ring-[var(--brass)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--paper)]"
                >
                  serchi.ai 
                  <span className="ml-1 transition-transform duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-[3px]">
                    ↗
                  </span>
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={0.16}>
              <div className="flex flex-col border-l border-[var(--ink)]/10 pl-6 md:pl-8">
                <h3 className="font-display font-[800] text-[24px] md:text-[32px] text-[var(--ink)] mb-4">
                  Workieo
                </h3>
                <p className="font-sans text-[17px] text-[var(--ink-2)] leading-[1.5] mb-8 max-w-[400px]">
                  Control de asistencia por WhatsApp para empresas con personal en terreno. Sin reloj biométrico, sin apps nuevas.
                </p>
                <a 
                  href="https://workieo.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] text-[var(--ink)] tracking-[0.08em] uppercase group flex items-center w-fit outline-none focus-visible:ring-2 focus-visible:ring-[var(--brass)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--paper)]"
                >
                  workieo.com
                  <span className="ml-1 transition-transform duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-[3px]">
                    ↗
                  </span>
                </a>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.24}>
            <p className="font-sans text-[17px] text-[var(--stone)] leading-[1.5]">
              El resto de nuestro trabajo es bajo acuerdo de confidencialidad.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Section 4 - Contact */}
      <section className="w-full bg-[var(--ink)] px-6 md:px-12 pt-24 md:pt-32 pb-8 flex flex-col min-h-[50vh]">
        <div className="max-w-[1200px] mx-auto w-full flex-1 flex flex-col">
          <FadeIn delay={0.0}>
            <h2 className="font-display font-[800] text-[28px] md:text-[48px] text-[var(--paper)] leading-[1.1] mb-12">
              Conversemos.
            </h2>
          </FadeIn>
          
          <FadeIn delay={0.08}>
            <div className="flex flex-col gap-6 items-start">
              <a 
                href="mailto:hello@relevostudio.com"
                className="font-sans text-[24px] md:text-[32px] text-[var(--brass)] hover:text-[var(--brass-lo)] hover:underline underline-offset-[6px] decoration-1 decoration-[var(--brass-lo)] transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[var(--brass)] focus-visible:ring-offset-8 focus-visible:ring-offset-[var(--ink)]"
              >
                hello@relevostudio.com
              </a>
              <span className="font-mono text-[11px] text-[var(--stone)] uppercase tracking-[0.08em]">
                RESPONDEMOS EN MENOS DE 24 HORAS
              </span>
            </div>
          </FadeIn>

          <div className="mt-auto pt-32 w-full">
            <div className="w-full h-[1px] bg-[var(--ink-3)] mb-6" />
            <footer className="w-full">
              <span className="font-mono text-[11px] text-[var(--stone)] uppercase tracking-[0.08em]">
                RELEVO STUDIO · SANTIAGO, CHILE · 2026
              </span>
            </footer>
          </div>
        </div>
      </section>
    </main>
  );
}