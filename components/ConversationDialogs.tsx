"use client";

import { useEffect, useRef, useState } from "react";

/*
 * Las dos puertas de conversación: chat calificador y formulario.
 * Islas de cliente montadas una sola vez; se abren con los eventos
 * relevo:chat y relevo:form que disparan los DialogTrigger.
 * Sin almacenamiento del navegador: el estado vive solo en memoria.
 */

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const APERTURA =
  "Cuéntame qué está pasando en tu operación. Con lo que se te venga a la cabeza basta.";

function useDialogEvent(eventName: string) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const open = () => ref.current?.showModal();
    window.addEventListener(eventName, open);
    return () => window.removeEventListener(eventName, open);
  }, [eventName]);
  return ref;
}

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Cerrar"
      className="absolute right-5 top-5 rounded-full px-2 py-0.5 text-xl leading-none text-label transition-colors hover:text-ink-200"
    >
      ×
    </button>
  );
}

export function ConversationDialogs() {
  return (
    <>
      <ChatDialog />
      <FormDialog />
    </>
  );
}

function ChatDialog() {
  const ref = useDialogEvent("relevo:chat");
  const listRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, sending]);

  async function send(event: React.FormEvent) {
    event.preventDefault();
    const content = input.trim();
    if (!content || sending || done) return;

    const next: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setSending(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      if (!res.ok || !data.reply) {
        throw new Error(data.error ?? "Sin respuesta");
      }
      setMessages([...next, { role: "assistant", content: data.reply }]);
      if (data.done) setDone(true);
    } catch (err) {
      setError(
        err instanceof Error && err.message !== "Sin respuesta"
          ? err.message
          : "Algo falló de nuestro lado. Escríbenos a hello@relevostudio.com",
      );
      setMessages(messages);
      setInput(content);
    } finally {
      setSending(false);
    }
  }

  return (
    <dialog ref={ref} className="rv-dialog" aria-label="Chat con Relevo Studio">
      <div className="relative flex h-[70vh] max-h-[640px] flex-col p-6 md:p-8">
        <CloseButton onClick={() => ref.current?.close()} />
        <p className="rv-overline text-coral-400">Conversación</p>
        <div ref={listRef} className="mt-5 flex-1 space-y-3 overflow-y-auto pr-1">
          <Bubble role="assistant">{APERTURA}</Bubble>
          {messages.map((message, index) => (
            <Bubble key={index} role={message.role}>
              {message.content}
            </Bubble>
          ))}
          {sending && (
            <Bubble role="assistant">
              <span className="text-label">Escribiendo…</span>
            </Bubble>
          )}
        </div>
        {error && <p className="mt-3 text-sm text-coral-400">{error}</p>}
        <form onSubmit={send} className="mt-4 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            disabled={sending || done}
            maxLength={2000}
            placeholder={done ? "Conversación cerrada" : "Escribe acá"}
            aria-label="Tu mensaje"
            className="rv-input flex-1"
          />
          <button
            type="submit"
            disabled={sending || done || input.trim() === ""}
            className="rv-btn bg-ink-200 text-coral-100 disabled:opacity-40"
          >
            Enviar <span className="rv-arrow" aria-hidden="true">↗</span>
          </button>
        </form>
      </div>
    </dialog>
  );
}

function Bubble({
  role,
  children,
}: {
  role: "user" | "assistant";
  children: React.ReactNode;
}) {
  return (
    <div
      className={
        role === "user"
          ? "ml-auto w-fit max-w-[85%] rounded-sm bg-ink-200 px-4 py-3 text-offwhite-200"
          : "w-fit max-w-[85%] whitespace-pre-line rounded-sm bg-offwhite-300 px-4 py-3"
      }
    >
      {children}
    </div>
  );
}

function FormDialog() {
  const ref = useDialogEvent("relevo:form");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [errorGeneral, setErrorGeneral] = useState<string | null>(null);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    setSending(true);
    setErrores({});
    setErrorGeneral(null);

    const data = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = await res.json();
      if (res.ok) {
        setSent(true);
      } else if (payload.errores) {
        setErrores(payload.errores);
      } else {
        setErrorGeneral(
          payload.error ?? "No pudimos guardar tu mensaje. Escríbenos a hello@relevostudio.com",
        );
      }
    } catch {
      setErrorGeneral("No pudimos guardar tu mensaje. Escríbenos a hello@relevostudio.com");
    } finally {
      setSending(false);
    }
  }

  return (
    <dialog ref={ref} className="rv-dialog" aria-label="Formulario de contacto">
      <div className="relative p-6 md:p-8">
        <CloseButton onClick={() => ref.current?.close()} />
        {sent ? (
          <div className="py-10 text-center">
            <p className="rv-header-7">Recibido.</p>
            <p className="mt-3 text-muted">Te respondemos en menos de 24 horas.</p>
          </div>
        ) : (
          <>
            <p className="rv-overline text-coral-400">Prefiero escribir</p>
            <p className="mt-4 text-muted">
              Cuéntanos en tus palabras. No hace falta que sea preciso.
            </p>
            <form onSubmit={submit} className="mt-6 space-y-4">
              {/* Campo trampa anti-bots: invisible para personas */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label>
                  Sitio web
                  <input type="text" name="sitio" tabIndex={-1} autoComplete="off" />
                </label>
              </div>
              <Field name="nombre" label="Nombre" error={errores.nombre}>
                <input id="nombre" type="text" name="nombre" required maxLength={120} className="rv-input w-full" />
              </Field>
              <Field name="correo" label="Correo" error={errores.correo}>
                <input id="correo" type="email" name="correo" required maxLength={200} className="rv-input w-full" />
              </Field>
              <Field name="whatsapp" label="WhatsApp" error={errores.whatsapp}>
                <input id="whatsapp" type="tel" name="whatsapp"
                  required
                  maxLength={40}
                  placeholder="+56 9 1234 5678"
                  className="rv-input w-full"
                />
              </Field>
              <Field name="empresa" label="Empresa (opcional)" error={errores.empresa}>
                <input id="empresa" type="text" name="empresa" maxLength={200} className="rv-input w-full" />
              </Field>
              <Field name="problema" label="¿Qué quieres resolver?" error={errores.problema}>
                <textarea
                  id="problema"
                  name="problema"
                  required
                  minLength={20}
                  maxLength={4000}
                  rows={4}
                  className="rv-input w-full"
                />
              </Field>
              {errorGeneral && <p className="text-sm text-coral-400">{errorGeneral}</p>}
              <button
                type="submit"
                disabled={sending}
                className="rv-btn bg-ink-200 text-coral-100 disabled:opacity-40"
              >
                {sending ? "Enviando…" : "Enviar"}{" "}
                <span className="rv-arrow" aria-hidden="true">↗</span>
              </button>
            </form>
          </>
        )}
      </div>
    </dialog>
  );
}

function Field({
  name,
  label,
  error,
  children,
}: {
  name: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="rv-overline block text-label">
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1 text-sm text-coral-400">{error}</p>}
    </div>
  );
}
