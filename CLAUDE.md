# CLAUDE.md — relevostudio.com

Instrucciones para trabajar en este repositorio. Léelas completas antes de escribir código.

---

## Qué es este proyecto

El sitio público de **Relevo Studio**, estudio de IA aplicada en Santiago de Chile. Construye sistemas —software, datos e IA— para empresas que ya funcionan.

**Objetivo: legitimar y captar.** El visitante típico llega desde LinkedIn o desde un correo de prospección. El sitio tiene que sostener la impresión de seriedad y dejarle dos puertas abiertas para conversar: un chat y un formulario.

No hay pruebas sociales que mostrar. No inventar ninguna.

---

## Fuentes de verdad

Tres archivos mandan sobre cualquier criterio propio. Léelos antes de empezar.

| Archivo | Qué manda |
|---|---|
| `docs/relevo-design-system-v1.html` | **Toda la marca.** Paleta, tipografía, escala, radios, sombras, animaciones, componentes |
| `content/copy-home.md` | **Todo el copy, la estructura de la home, el formulario y el chat** (v2, siete actos) |
| `content/manifiesto.md` | **Contenido de `/manifiesto`** |

**Regla dura: no dupliques tokens ni copy en el código.** Extrae los valores del design system a variables CSS y consúmelas. Nunca escribas un hex a mano en un componente.

**Regla dura: no inventes ni edites copy.** El texto de los archivos de contenido va tal cual. Si algo no calza o falta, pregunta; no lo resuelvas escribiendo.

---

## Estructura del repo

La herencia de Replit ya fue eliminada. La aplicación Next.js vive en la raíz.

```
app/
  layout.tsx            # fuentes (next/font), metadata global, JSON-LD Organization, header con wordmark
  globals.css           # ÚNICO lugar con valores de marca: tokens del design system como variables CSS
  page.tsx              # home, siete actos según content/copy-home.md
  manifiesto/page.tsx   # manifiesto completo, tratamiento editorial, JSON-LD Article
  not-found.tsx         # 404 mínima en marca
  api/chat/route.ts     # chat calificador: Anthropic + tool registrar_lead que guarda y avisa
  api/lead/route.ts     # recepción del formulario: validación, campo trampa, guarda y avisa
  sitemap.ts            # /sitemap.xml
  robots.ts             # /robots.txt con permiso explícito a crawlers de LLM
  opengraph-image.tsx   # imagen OG generada en build (usa assets/fonts/)
  icon.svg              # favicon: isotipo
components/
  Wordmark.tsx          # relev + doble círculo + studio, SVG inline
  Isotype.tsx           # doble círculo con animación handoff
  DialogTrigger.tsx     # isla mínima: botón que abre chat o formulario (eventos relevo:*)
  ConversationDialogs.tsx # islas de chat y formulario sobre <dialog> nativo
lib/
  site.ts               # constantes del sitio (URL, correo)
  leads.ts              # normalización de WhatsApp, escritura en Supabase, aviso por Resend (server-only)
  tokens.ts             # espejo mínimo de tokens para la imagen OG (sin CSS)
content/                # fuentes de verdad de copy (ver tabla de arriba)
docs/                   # design system v1
assets/fonts/           # TTF de Plus Jakarta Sans solo para la imagen OG
public/llms.txt
```

**Comandos:** `npm run dev` (desarrollo), `npm run build` (build), `npm run start` (servir el build).

**Variables de entorno** (en Vercel y en `.env.local`, nunca en el repo): `ANTHROPIC_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `RESEND_FROM`.

**Infraestructura:** proyecto Supabase «Relevo Studio» (`vpcgifpwmntghfyuucbf`, región `sa-east-1`), tabla `leads` con RLS activa y sin políticas (solo escribe el servidor con la service role key). Correo transaccional por Resend.

Detalles que no hay que romper:
- `experimental.inlineCss` en `next.config.ts` mantiene el CSS inline en el HTML (LCP / Lighthouse)
- Los overlines sobre fondo claro usan `teal-600` (no `teal-500`) por contraste AA
- Los tokens viven en `app/globals.css` bajo `@theme` de Tailwind 4; los gradientes y los estilos de diálogo/inputs se derivan de los tokens

---

## Stack

- **Next.js (App Router) + TypeScript**, con render estático para las páginas de contenido
- **Tailwind CSS**, con los tokens del design system como variables CSS
- **Supabase** para persistencia de leads
- **Vercel** para deploy, **Cloudflare** para DNS
- Sin librería de componentes. Sin shadcn. Sin dependencias que no hagan falta.

**El contenido tiene que llegar estático.** Relevo vende legibilidad para máquinas y modelos de lenguaje: un sitio que entrega un `<div>` vacío al crawler contradice el argumento comercial. Los siete actos y el manifiesto van en el HTML sin ejecutar JavaScript. El chat y el formulario son islas interactivas y no deben arrastrar el resto a cliente.

---

## Rutas

| Ruta | Contenido |
|---|---|
| `/` | Home, siete actos según el copy |
| `/manifiesto` | Manifiesto completo, tratamiento editorial |
| `/404` | Mínima, en marca |
| `/api/chat` | Endpoint del chat, servidor |
| `/api/lead` | Recepción de formulario y cierre de chat, servidor |

No crear páginas de servicios: no hay contenido para llenarlas.

---

## Reglas de marca

**Tipografía.** Plus Jakarta Sans para display, Hanken Grotesk para cuerpo. El `letter-spacing: -0.05em` en headers es la regla que da el look de la casa.

**Ritmo claro-oscuro.** El sitio respira en off-white. El ink-gradient se reserva para dos golpes: acto 04 y acto 07. No agregar más fondos oscuros.

**Logotipo.** El wordmark es `relev` + doble círculo + `studio`. La doble *o* son dos círculos solapados con la animación `handoff`, que es la firma de la marca. SVG inline, no imagen.

**Motion.** Easing firma `cubic-bezier(.25,1,.5,1)`. Disparar con `animation-timeline: view()` donde el navegador lo soporte, con degradación limpia donde no. Respetar `prefers-reduced-motion`.

**Flechas.** ↗ para acciones y enlaces salientes, ↙ decorativa en paneles de color. Plus Jakarta Sans tiene ambos glifos; Hanken Grotesk no.

**Cadencia.** Muchas frases van en línea propia. Eso es intencional y es parte del diseño: respetar los saltos de línea del copy, no compactarlos en párrafos.

---

## Capa de legibilidad

El sitio de un estudio que vende legibilidad tiene que ser un ejemplo del servicio.

- **Metadata real por página:** `title` y `description` únicos, escritos, no generados
- **JSON-LD:** `Organization` en todas las páginas, `Article` en `/manifiesto`
- **`sitemap.xml`** generado
- **`robots.txt`** que permita explícitamente a los crawlers de modelos de lenguaje. No bloquear GPTBot, ClaudeBot, PerplexityBot ni similares
- **`llms.txt`** en la raíz, con una descripción concisa del estudio, qué construye y enlaces a las páginas principales
- **Open Graph e imagen social** propias, en marca
- **HTML semántico:** un solo `h1` por página, jerarquía correcta, `alt` en todo elemento gráfico con significado
- **Encabezados como texto**, nunca como imagen

---

## Chat y formulario

La especificación completa —flujo, reglas del prompt, campos, qué guarda— está en el archivo de copy. Resumen de lo no negociable:

- **El chat no da precios, plazos ni alcances.** Ni aproximados. Si preguntan, responde que depende del diagnóstico
- **API key solo en función de servidor.** Jamás en el frontend, jamás en el repo
- Modelo `claude-haiku-4-5-20251001`, `max_tokens` 500, **sin streaming**
- El prompt debe prohibir explícitamente inventar precios, tecnologías, casos de clientes o resultados garantizados
- Registro: Supabase, tabla `leads`, escritura solo desde servidor, Row Level Security activa, sin lectura pública
- Aviso por correo a `hello@relevostudio.com` con cada lead nuevo
- El formulario envía por `fetch`, sin recarga. Anti-bots por campo trampa oculto, no captcha de terceros

---

## Prohibiciones

- No inventar contenido, casos, cifras, testimonios ni logos de clientes
- No agregar secciones que no estén en el copy
- No usar `localStorage` ni almacenamiento del navegador
- No incluir analítica de terceros sin preguntar
- No commitear secretos. Las claves de Anthropic y Supabase van en variables de entorno de Vercel
- No tomar decisiones de marca ni de redacción. Ante la duda, preguntar

---

## Criterios de aceptación

- [ ] `curl` a la home devuelve los siete actos completos en el HTML, sin ejecutar JavaScript
- [ ] Ningún color hexadecimal escrito a mano en componentes
- [ ] El copy calza palabra por palabra, incluidos los saltos de línea
- [ ] La animación `handoff` corre y se detiene con `prefers-reduced-motion`
- [ ] El chat responde **en producción**, no solo en local
- [ ] El chat no entrega precios ante insistencia directa. Probarlo a propósito
- [ ] Un lead enviado desde el formulario llega a Supabase y genera aviso por correo
- [ ] Un lead cerrado desde el chat llega con el registro estructurado completo
- [ ] La API key no aparece en el bundle del cliente. Verificar buscando en los archivos servidos
- [ ] Lighthouse: 95+ en Performance, Accessibility, Best Practices y SEO
- [ ] `/llms.txt`, `/robots.txt` y `/sitemap.xml` responden correctamente
- [ ] JSON-LD válido según el validador de datos estructurados
- [ ] Se ve bien en móvil real, no solo en el simulador
- [ ] Contraste suficiente en todos los pares de color usados

---

## Deploy

Vercel ya está conectado a este repo (`relevo-studio-snowy.vercel.app`). Al mover la app a la raíz, revisar que **Root Directory** quede vacío y que el preset sea el correcto para Next.js.

Variables de entorno a cargar en Vercel: clave de Anthropic, URL y clave de servicio de Supabase, clave y remitente de Resend. No se heredan del repo.

Dominio en Cloudflare: el registro tiene que quedar en **DNS only, nube gris**. Con el proxy activo Vercel no valida el certificado y el sitio queda caído.

---

## Cómo trabajar

- Preguntar antes de asumir. Este proyecto tiene decisiones ya tomadas y documentadas
- Commits pequeños y descriptivos, en español
- Al terminar, actualizar este archivo con la estructura real de carpetas y los comandos del proyecto
