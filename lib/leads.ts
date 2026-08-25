import "server-only";

/*
 * Capa de leads: normalización, persistencia en Supabase y aviso por correo.
 * Solo se importa desde funciones de servidor (route handlers). Las claves
 * viven en variables de entorno; nunca llegan al cliente.
 */

export type LeadOrigen = "chat" | "formulario";

export interface Lead {
  origen: LeadOrigen;
  nombre?: string | null;
  correo?: string | null;
  whatsapp?: string | null;
  empresa?: string | null;
  problema?: string | null;
  problema_reformulado?: string | null;
  proceso?: string | null;
  volumen?: string | null;
  transcripcion?: { role: string; content: string }[] | null;
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

/**
 * Normaliza un WhatsApp a formato E.164. Acepta formato chileno
 * (9 1234 5678, 09..., +56 9...) e internacional (+XX..., 00XX...).
 * Devuelve null si no hay suficientes dígitos para ser un número real.
 */
export function normalizeWhatsapp(raw: string): string | null {
  const trimmed = raw.trim();
  const hasPlus = trimmed.startsWith("+") || trimmed.startsWith("00");
  const digits = trimmed.replace(/\D/g, "").replace(/^00/, "");
  if (hasPlus) {
    return digits.length >= 8 && digits.length <= 15 ? `+${digits}` : null;
  }
  // Móvil chileno: 9 dígitos empezando por 9, u 8 dígitos tras un 0 inicial
  const local = digits.replace(/^0/, "");
  if (local.length === 9 && local.startsWith("9")) return `+56${local}`;
  // Ya viene con código de país sin "+" (ej: 569..., 549...)
  if (digits.length >= 11 && digits.length <= 15) return `+${digits}`;
  return null;
}

export async function saveLead(lead: Lead): Promise<void> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Faltan variables de entorno de Supabase");

  const res = await fetch(`${url}/rest/v1/leads`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(lead),
  });
  if (!res.ok) {
    throw new Error(`Supabase respondió ${res.status}: ${await res.text()}`);
  }
}

/**
 * Aviso a hello@ con cada lead nuevo, vía Resend. Si falla o no hay clave,
 * no bota el request: el lead ya quedó guardado en Supabase.
 */
export async function notifyLead(lead: Lead): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  if (!key || !from) {
    console.warn("RESEND_API_KEY o RESEND_FROM sin configurar; lead sin aviso por correo");
    return;
  }

  const line = (label: string, value?: string | null) =>
    value ? `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>` : "";

  const transcript = lead.transcripcion
    ?.map((m) => `<p><strong>${m.role === "user" ? "Cliente" : "Chat"}:</strong> ${escapeHtml(m.content)}</p>`)
    .join("\n");

  const html = [
    `<h2>Lead nuevo (${lead.origen})</h2>`,
    line("Nombre", lead.nombre),
    line("Correo", lead.correo),
    line("WhatsApp", lead.whatsapp),
    line("Empresa", lead.empresa),
    line("Problema", lead.problema),
    line("Problema reformulado", lead.problema_reformulado),
    line("Proceso afectado", lead.proceso),
    line("Volumen", lead.volumen),
    transcript ? `<hr><h3>Transcripción</h3>${transcript}` : "",
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: ["hello@relevostudio.com"],
        subject: `Lead nuevo desde el ${lead.origen === "chat" ? "chat" : "formulario"}${lead.nombre ? ` · ${lead.nombre}` : ""}`,
        html,
      }),
    });
    if (!res.ok) {
      console.error(`Resend respondió ${res.status}: ${await res.text()}`);
    }
  } catch (err) {
    console.error("Error enviando aviso por correo", err);
  }
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
