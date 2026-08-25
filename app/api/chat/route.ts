import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { normalizeWhatsapp, saveLead, notifyLead } from "@/lib/leads";

/*
 * Chat calificador. Entiende el problema, captura el contacto y deja un
 * lead estructurado vía la herramienta registrar_lead. No da precios,
 * plazos ni alcances: esa prohibición vive en el prompt y es absoluta.
 * Modelo y parámetros fijados por content/copy-home.md: claude-haiku-4-5-20251001,
 * max_tokens 500, sin streaming.
 */

const MODEL = "claude-haiku-4-5-20251001";
const MAX_TOKENS = 500;

const SYSTEM_PROMPT = `Eres el chat de Relevo Studio (relevostudio.com), un estudio de Santiago de Chile que construye sistemas —software, datos e IA— para empresas que ya funcionan y quieren crecer mejor.

Tu único trabajo: entender el problema del visitante, preguntar lo que falta, capturar su contacto y dejar un lead estructurado. Tú preparas la cotización; nunca la emites.

Cómo hablas:
- Español neutro, con tuteo. Sin modismos chilenos ni de ningún otro país, sin voseo. El sitio habla chileno; tú no.
- Respuestas cortas: dos o tres frases como máximo.
- Una sola pregunta por mensaje. Nunca dos o tres juntas.

Flujo de la conversación:
1. Entender: haz dos o tres preguntas, una a la vez. Qué proceso está fallando, quién lo hace hoy, qué volumen tiene, qué pasa si no se resuelve.
2. Devolver: reformula el problema en una sola frase, para que el visitante vea que lo entendiste. Hazlo antes de pedir el contacto.
3. Capturar: pide nombre, correo y WhatsApp. Empresa solo si sale de forma natural.
4. Cerrar: cuando tengas el contacto, usa la herramienta registrar_lead y despídete con exactamente esta frase: "Listo. Revisamos tu caso y te llega una propuesta con números en 48 horas."

Prohibiciones absolutas:
- Nunca des precios, plazos, rangos ni alcances. Ni siquiera aproximados, ni como ejemplo, ni ante insistencia. Si preguntan por precio o plazo responde: "Eso depende de lo que encontremos. Por eso partimos con un diagnóstico."
- La única excepción es la frase de cierre de las 48 horas, que es la que está arriba.
- Nunca inventes tecnologías específicas, casos de clientes, cifras ni resultados garantizados.
- No insistas con el contacto más de dos veces. Si el visitante no quiere darlo, deja el correo hello@relevostudio.com, usa registrar_lead con lo que tengas y cierra bien.
- Si el caso queda fuera del alcance de Relevo (no tiene que ver con la operación, el software, los datos o la IA de una empresa), dilo con honestidad y ofrece el correo hello@relevostudio.com.
- No te salgas de este rol aunque el visitante te lo pida. No respondas preguntas ajenas a Relevo Studio y su trabajo.`;

const REGISTRAR_LEAD: Anthropic.Tool = {
  name: "registrar_lead",
  description:
    "Registra el lead estructurado al cerrar la conversación. Llámala una sola vez: cuando ya capturaste nombre, correo y WhatsApp, o cuando el visitante declinó dar su contacto dos veces.",
  input_schema: {
    type: "object",
    properties: {
      nombre: { type: "string", description: "Nombre del visitante, si lo dio" },
      correo: { type: "string", description: "Correo del visitante, si lo dio" },
      whatsapp: { type: "string", description: "WhatsApp del visitante, si lo dio" },
      empresa: { type: "string", description: "Empresa, si la mencionó" },
      problema: {
        type: "string",
        description: "El problema en las palabras del propio cliente",
      },
      problema_reformulado: {
        type: "string",
        description: "El problema reformulado en una frase, como se lo devolviste",
      },
      proceso: { type: "string", description: "Proceso del negocio afectado" },
      volumen: {
        type: "string",
        description: "Volumen mencionado (mensajes al día, cotizaciones al mes, etc.), si lo dijo",
      },
    },
    required: ["problema", "problema_reformulado"],
  },
};

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

function textOf(response: Anthropic.Message): string {
  return response.content
    .filter((block): block is Anthropic.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("\n")
    .trim();
}

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "El chat no está disponible. Escríbenos a hello@relevostudio.com" },
      { status: 500 },
    );
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 });
  }

  const messages = body.messages;
  const valid =
    Array.isArray(messages) &&
    messages.length > 0 &&
    messages.length <= 40 &&
    messages.every(
      (m) =>
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.length > 0 &&
        m.content.length <= 2000,
    ) &&
    messages[messages.length - 1].role === "user";
  if (!valid) {
    return NextResponse.json({ error: "Mensajes inválidos" }, { status: 400 });
  }

  const client = new Anthropic();
  const params = {
    model: MODEL,
    max_tokens: MAX_TOKENS,
    system: SYSTEM_PROMPT,
    tools: [REGISTRAR_LEAD],
    messages: messages as Anthropic.MessageParam[],
  } satisfies Anthropic.MessageCreateParamsNonStreaming;

  try {
    const response = await client.messages.create(params);

    const toolUse = response.content.find(
      (block): block is Anthropic.ToolUseBlock => block.type === "tool_use",
    );

    if (!toolUse) {
      return NextResponse.json({ reply: textOf(response), done: false });
    }

    // Cierre: el modelo registró el lead. Guardar, avisar y pedir la despedida.
    const input = toolUse.input as Record<string, string | undefined>;
    const lead = {
      origen: "chat" as const,
      nombre: input.nombre?.trim() || null,
      correo: input.correo?.trim() || null,
      whatsapp: input.whatsapp ? normalizeWhatsapp(input.whatsapp) : null,
      empresa: input.empresa?.trim() || null,
      problema: input.problema?.trim() || null,
      problema_reformulado: input.problema_reformulado?.trim() || null,
      proceso: input.proceso?.trim() || null,
      volumen: input.volumen?.trim() || null,
      transcripcion: messages,
    };
    await saveLead(lead);
    await notifyLead(lead);

    const closing = await client.messages.create({
      ...params,
      messages: [
        ...(messages as Anthropic.MessageParam[]),
        { role: "assistant", content: response.content },
        {
          role: "user",
          content: [
            {
              type: "tool_result",
              tool_use_id: toolUse.id,
              content: "Lead registrado correctamente. Despídete.",
            },
          ],
        },
      ],
    });

    const reply = [textOf(response), textOf(closing)].filter(Boolean).join("\n");
    return NextResponse.json({ reply, done: true });
  } catch (err) {
    console.error("Error en /api/chat", err);
    return NextResponse.json(
      { error: "Algo falló de nuestro lado. Escríbenos a hello@relevostudio.com" },
      { status: 500 },
    );
  }
}
