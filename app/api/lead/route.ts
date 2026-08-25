import { NextResponse } from "next/server";
import {
  isValidEmail,
  normalizeWhatsapp,
  saveLead,
  notifyLead,
} from "@/lib/leads";

/*
 * Recepción del formulario de contacto. Valida los campos del copy
 * (nombre, correo, whatsapp obligatorios; problema mínimo 20 caracteres),
 * descarta bots por campo trampa y guarda el lead con aviso por correo.
 */

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 });
  }

  // Campo trampa: los bots lo llenan, las personas no lo ven.
  // Se responde como éxito para no darles señal.
  if (typeof body.sitio === "string" && body.sitio.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const text = (key: string, max = 500) =>
    typeof body[key] === "string" ? (body[key] as string).trim().slice(0, max) : "";

  const nombre = text("nombre", 120);
  const correo = text("correo", 200);
  const whatsappRaw = text("whatsapp", 40);
  const empresa = text("empresa", 200);
  const problema = text("problema", 4000);

  const errores: Record<string, string> = {};
  if (!nombre) errores.nombre = "Falta el nombre";
  if (!isValidEmail(correo)) errores.correo = "Revisa el correo";
  const whatsapp = whatsappRaw ? normalizeWhatsapp(whatsappRaw) : null;
  if (!whatsapp) errores.whatsapp = "Revisa el número de WhatsApp";
  if (problema.length < 20) errores.problema = "Cuéntanos un poco más (mínimo 20 caracteres)";

  if (Object.keys(errores).length > 0) {
    return NextResponse.json({ errores }, { status: 400 });
  }

  try {
    const lead = {
      origen: "formulario" as const,
      nombre,
      correo,
      whatsapp,
      empresa: empresa || null,
      problema,
    };
    await saveLead(lead);
    await notifyLead(lead);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error guardando lead del formulario", err);
    return NextResponse.json(
      { error: "No pudimos guardar tu mensaje. Escríbenos a hello@relevostudio.com" },
      { status: 500 },
    );
  }
}
