import type { Metadata } from "next";
import Link from "next/link";
import { Isotype } from "@/components/Isotype";

export const metadata: Metadata = {
  title: "Página no encontrada",
  description: "Esta página no existe.",
};

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-[1080px] flex-col items-start px-7 py-28">
      <Isotype className="w-24" animated={false} />
      <h1 className="rv-header-4 mt-10">404 · Esta página no existe.</h1>
      <p className="mt-8">
        <Link href="/" className="rv-link text-teal-600">
          Volver al inicio <span className="rv-arrow" aria-hidden="true">↗</span>
        </Link>
      </p>
    </main>
  );
}
