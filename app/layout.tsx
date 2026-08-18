import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Hanken_Grotesk } from "next/font/google";
import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";
import { SITE } from "@/lib/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hanken",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Relevo Studio · Estudio de IA aplicada en Santiago de Chile",
    template: "%s · Relevo Studio",
  },
  description:
    "Relevo Studio construye los sistemas que relevan los procesos que hoy dependen de que alguien conteste a mano. Legibilidad, agentes y software a medida, desde Santiago de Chile para Latinoamérica.",
  alternates: { canonical: "/" },
  openGraph: {
    siteName: "Relevo Studio",
    locale: "es_CL",
    type: "website",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE.url}/#organization`,
  name: "Relevo Studio",
  url: SITE.url,
  email: SITE.email,
  description:
    "Estudio de IA aplicada. Construye los sistemas que relevan los procesos que hoy dependen de que alguien conteste a mano: legibilidad para máquinas y modelos de lenguaje, agentes conversacionales y software a medida.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Santiago",
    addressCountry: "CL",
  },
  areaServed: "Latinoamérica",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${jakarta.variable} ${hanken.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <header className="mx-auto flex w-full max-w-[1080px] items-center px-7 pt-8">
          <Link href="/" className="text-[27px]">
            <Wordmark />
          </Link>
        </header>
        {children}
      </body>
    </html>
  );
}
