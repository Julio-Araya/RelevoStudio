import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Manifiesto Fundacional",
  description:
    "El documento de postura de Relevo Studio: en qué creemos y a qué renunciamos. La IA no arregla una operación desordenada, la amplifica; hacer legible la empresa es la mitad del trabajo.",
  alternates: { canonical: "/manifiesto" },
  openGraph: {
    title: "Manifiesto Fundacional · Relevo Studio",
    description:
      "En qué creemos y a qué renunciamos. La postura fundacional de Relevo Studio.",
    type: "article",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Manifiesto Fundacional — Relevo Studio",
  description:
    "El documento de postura de Relevo Studio: en qué creemos y a qué renunciamos.",
  url: `${SITE.url}/manifiesto`,
  inLanguage: "es",
  author: { "@id": `${SITE.url}/#organization` },
  publisher: { "@id": `${SITE.url}/#organization` },
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="rv-header-7 mt-16 scroll-mt-8">{children}</h2>;
}

export default function Manifiesto() {
  return (
    <main className="mx-auto max-w-[720px] px-7 pb-24 pt-16 md:pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <article className="text-[17px] leading-[1.75] md:text-[18px]">
        <header>
          <p className="rv-overline mb-4 text-teal-500">Documento de postura</p>
          <h1 className="rv-header-4">Manifiesto Fundacional</h1>
          <p className="mt-4 italic text-muted">
            Versión 2 · Fija en qué creemos y a qué renunciamos.
          </p>
        </header>

        <SectionTitle>1. El nombre</SectionTitle>
        <div className="mt-5 space-y-5">
          <p>
            <em>Relevare</em>, del latín: hacer ligero lo que pesa.
          </p>
          <p>
            El relevo es el momento en que se entrega la posta. No es reemplazo
            ni es delegación: es un traspaso que ocurre en movimiento, sin que
            nadie se detenga.
          </p>
          <p>
            Eso es lo que hacemos. Tomamos procesos que hoy se sostienen porque
            una persona los hace a mano, y los pasamos a un sistema que los
            sostiene solo.
          </p>
        </div>

        <SectionTitle>2. Por qué existimos</SectionTitle>
        <div className="mt-5 space-y-5">
          <p>
            En casi toda empresa hay un punto donde el proceso se rompe y
            depende de que alguien conteste, escriba o revise.
          </p>
          <p>
            Alguien responde ciento cuarenta mensajes de WhatsApp al día.
            Alguien nunca alcanzó a describir la mitad del catálogo. Alguien
            filtra currículums a mano. Alguien anota la asistencia en un
            cuaderno.
          </p>
          <p>
            Ese punto no se arregla contratando a otra persona. Se arregla
            construyendo el sistema que debía existir.
          </p>
          <p>Relevo Studio existe para construir ese sistema.</p>
        </div>

        <SectionTitle>3. En qué creemos</SectionTitle>
        <div className="mt-5 space-y-5">
          <p>
            <strong>La IA no arregla una operación desordenada, la amplifica.</strong>{" "}
            Instalar un agente conversacional sobre un catálogo ilegible no
            produce mejores respuestas: produce fracasos más elegantes. El
            trabajo empieza abajo, en los datos y en la estructura, no en la
            capa que se ve.
          </p>
          <p>
            <strong>Una empresa que no es legible no puede apalancarse en la IA.</strong>{" "}
            Ni su catálogo para las máquinas, ni su operación para sí misma.
            Hacer legible la empresa es la mitad del trabajo, y casi nadie la
            está haciendo.
          </p>
          <p>
            <strong>El presupuesto casi siempre ya existe.</strong> Lo que
            cambia no es cuánto se gasta, sino en qué. Una vacante abierta, una
            agencia contratada, una suscripción que nadie usa: ahí está la
            plata, y ahí está la decisión que hay que reencuadrar.
          </p>
          <p>
            <strong>El demo es el argumento.</strong> No mandamos una propuesta:
            mandamos algo funcionando, con una propuesta adjunta. Construir
            antes de vender cuesta más y convence más.
          </p>
          <p>
            <strong>Se garantizan condiciones, no resultados.</strong> No
            prometemos posiciones en Google, ni tasas de conversión, ni
            apariciones en modelos de lenguaje. Prometemos que las condiciones
            para que eso ocurra van a estar construidas y verificables.
          </p>
        </div>

        <SectionTitle>4. Contra qué competimos</SectionTitle>
        <div className="mt-5 space-y-5">
          <p>
            No competimos contra otras agencias. Competimos contra{" "}
            <strong>el cargo que la empresa está a punto de llenar.</strong>
          </p>
          <p>
            Cuando una empresa publica una vacante, está declarando dos cosas:
            que reconoció un problema y que ya aprobó el presupuesto para
            resolverlo. La pregunta que traemos no es si contratar o no. Es si
            ese problema se resuelve con una persona más haciendo el trabajo a
            mano, o con un sistema que lo deje resuelto.
          </p>
          <p>A veces la respuesta correcta es contratar. Cuando lo es, lo decimos.</p>
        </div>

        <SectionTitle>5. Qué construimos</SectionTitle>
        <div className="mt-5 space-y-5">
          <p>
            <strong>Legibilidad.</strong> Catálogos, contenidos y datos
            preparados para ser leídos por buscadores, por modelos de lenguaje
            y por agentes conversacionales. Es la capa que casi nadie tiene y
            sin la cual todo lo demás falla.
          </p>
          <p>
            <strong>Agentes.</strong> Sistemas conversacionales que atienden,
            cotizan, califican y venden con el conocimiento real del negocio,
            no con respuestas genéricas.
          </p>
          <p>
            <strong>Automatización y software a medida.</strong> Cuando el
            proceso no cabe en una herramienta existente, lo construimos.
          </p>
          <p>
            <strong>Plataforma.</strong> Migraciones y reconstrucciones cuando
            la base actual no aguanta lo que se va a montar encima.
          </p>
          <p>
            <strong>La antesala estratégica.</strong> Modelo de negocio, marca,
            go-to-market, pricing. No la vendemos suelta: es lo que se ordena
            antes de construir, cuando lo que está roto no es el sistema sino
            la definición.
          </p>
        </div>

        <SectionTitle>6. Lo que no hacemos</SectionTitle>
        <div className="mt-5 space-y-5">
          <p>Toda posición real tiene una renuncia. Estas son las nuestras.</p>
          <p>
            <strong>No vendemos horas ni personas.</strong> Relevo no se
            contrata por disponibilidad. Si lo que necesitas es alguien que
            esté, contrata a alguien. Nosotros dejamos el sistema.
          </p>
          <p>
            <strong>No operamos la máquina todos los meses.</strong> No
            gestionamos campañas, no publicamos redes, no somos un equipo de
            marketing tercerizado. Construimos, entregamos funcionando y
            enseñamos a operarlo.
          </p>
          <p>
            <strong>No entregamos diagnósticos que no terminan en algo construido.</strong>{" "}
            Un informe que nadie implementa es un costo, no un servicio.
          </p>
        </div>

        <SectionTitle>7. Cómo trabajamos</SectionTitle>
        <ul className="mt-5 list-disc space-y-4 pl-5 marker:text-coral-300">
          <li>
            <strong>Separamos lo observado de lo inferido.</strong> Siempre, en
            documentos y en reuniones. Afirmar una inferencia y equivocarse
            destruye todo lo que la evidencia construyó.
          </li>
          <li>
            <strong>Verificamos antes de afirmar.</strong> Ningún dato llega al
            cliente sin haber sido comprobado a mano.
          </li>
          <li>
            <strong>Entregamos evidencia antes de pedir nada.</strong> La
            primera conversación empieza con algo hecho, no con una
            presentación.
          </li>
          <li>
            <strong>Menos presentaciones, más implementación.</strong>
          </li>
          <li>
            <strong>Velocidad con criterio.</strong> Rápido no es apurado.
          </li>
        </ul>

        <SectionTitle>8. Para quién trabajamos</SectionTitle>
        <div className="mt-5 space-y-5">
          <p>
            Empresas pequeñas y medianas con un negocio que ya funciona,
            presupuesto real y procesos que dependen de que alguien conteste a
            mano. Comercio electrónico, empresas de servicios, operaciones con
            equipos en terreno, negocios B2B con venta consultiva.
          </p>
          <p>Hablamos directo con quien decide.</p>
          <p>Desde Santiago de Chile, para Latinoamérica.</p>
        </div>

        <SectionTitle>9. La prueba</SectionTitle>
        <div className="mt-5 space-y-5">
          <p>
            No mostramos portafolio: casi todo lo que construimos está bajo
            acuerdo de confidencialidad. Mostramos producto propio.
          </p>
          <p>
            <strong>Serchi</strong> — plataforma de reclutamiento y selección
            con IA, construida de punta a punta.
            <br />
            <strong>Workieo</strong> — control de asistencia por WhatsApp para
            equipos en terreno.
          </p>
          <p>
            Se venden por su cuenta. Están acá por una sola razón: son la
            evidencia de que construimos sistemas completos, no piezas sueltas.
          </p>
        </div>

        <SectionTitle>10. La promesa</SectionTitle>
        <blockquote className="rv-subheader-1 mt-5 border-l-2 border-coral-300 pl-6">
          <p>
            Relevamos los procesos que hoy dependen de que alguien conteste,
            escriba o revise a mano.
          </p>
          <p className="mt-4">
            Entregamos el sistema funcionando, no la presentación.
          </p>
        </blockquote>
      </article>

      <footer className="mt-20 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-ink-200/12 pt-8">
        <Link href="/" className="rv-link text-teal-600">
          Volver al inicio <span className="rv-arrow" aria-hidden="true">↗</span>
        </Link>
        <a href={`mailto:${SITE.email}`} className="rv-link text-teal-600">
          {SITE.email} <span className="rv-arrow" aria-hidden="true">↗</span>
        </a>
      </footer>
    </main>
  );
}
