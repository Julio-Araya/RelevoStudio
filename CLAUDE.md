# CLAUDE.md — relevostudio.com

Instrucciones para trabajar en este repositorio. Léelas completas antes de escribir código.

---

## Qué es este proyecto

El sitio público de **Relevo Studio**, estudio de IA aplicada en Santiago de Chile.

**Objetivo de esta fase: legitimar, no convertir.** El visitante típico llega desde LinkedIn o desde un correo de prospección, ya vio una auditoría o un demo, y viene a confirmar si el estudio es serio. El sitio tiene que sostener esa impresión.

No hay que optimizar para conversión, no hay que agregar CTAs por todos lados, no hay pruebas sociales que mostrar.

---

## Fuentes de verdad

Tres archivos mandan sobre cualquier criterio propio. Léelos antes de empezar.

| Archivo | Qué manda |
|---|---|
| `relevo-design-system-v1.html` | **Toda la marca.** Paleta, tipografía, escala, radios, sombras, animaciones, componentes |
| `relevostudio-copy-home.md` | **Todo el copy y la estructura de la home.** Bloques, orden, ritmo claro-oscuro |
| `Relevo_Studio_Manifiesto_Fundacional_v2.md` | **Contenido de `/manifiesto`** |

**Regla dura: no dupliques tokens ni copy en el código.** Extrae los valores del design system a variables CSS y consúmelas. Si mañana sale una v2 del design system, tiene que haber un solo lugar donde actualizar. Nunca escribas un hex a mano en un componente.

**Regla dura: no inventes ni edites copy.** El texto de los archivos de contenido va tal cual. Si algo no calza o falta, pregunta; no lo resuelvas escribiendo.

Como primera tarea, mueve los archivos a `docs/relevo-design-system-v1.html`, `content/copy-home.md` y `content/manifiesto.md`, y actualiza esta tabla.

---

## Estado actual del repo y qué hacer con él

El repo trae una landing generada con Replit Agent que **está descartada**: usa otra paleta (ink oscuro + brass dorado) que ya no es la marca.

**Conservar:** el repositorio, su historia y el proyecto de Vercel ya conectado.

**Eliminar:**
- El monorepo pnpm (`pnpm-workspace.yaml`, la estructura `artifacts/`)
- `artifacts/api-server` — plantilla vacía de Replit
- `artifacts/mockup-sandbox`
- `.replit`, `.replitignore`, `replit.md`, `.npmrc`
- La landing actual completa

**Resultado:** aplicación Next.js en la raíz del repo, sin herencia de Replit.

---

## Stack

- **Next.js (App Router) + TypeScript**, con render estático
- **Tailwind CSS**, con los tokens del design system como variables CSS
- **Vercel** para deploy, **Cloudflare** para DNS
- Sin librería de componentes. Sin shadcn. Sin dependencias que no hagan falta.

**Next.js con SSG no es negociable.** Relevo vende legibilidad para máquinas y modelos de lenguaje: un sitio que entrega un `<div>` vacío al crawler contradice el argumento comercial. El HTML tiene que llegar completo sin ejecutar JavaScript.

---

## Rutas

| Ruta | Contenido |
|---|---|
| `/` | Home, nueve bloques según `copy-home.md` |
| `/manifiesto` | Manifiesto completo, tratamiento editorial |
| `/404` | Mínima, en marca |

Nada más en esta fase. No crear páginas de servicios: no hay contenido para llenarlas.

---

## Reglas de marca

**Tipografía.** Plus Jakarta Sans para display, Hanken Grotesk para cuerpo. El `letter-spacing: -0.05em` en headers es la regla que da el look de la casa; respétala en toda la escala.

**Ritmo claro-oscuro.** El sitio respira en off-white. El ink-gradient se reserva para dos golpes: bloque 4 (la tesis) y bloque 9 (contacto). No agregar más fondos oscuros.

**Logotipo.** El wordmark es `relev` + doble círculo + `studio`. La doble *o* son dos círculos solapados con la animación `handoff`, que es la firma de la marca. Construirlo como SVG inline, no como imagen.

**Motion.** Easing firma `cubic-bezier(.25,1,.5,1)`. Disparar con `animation-timeline: view()` donde el navegador lo soporte, con degradación limpia donde no. Respetar `prefers-reduced-motion`.

**Flechas.** ↗ para enlaces salientes, ↙ decorativa en paneles de color. Plus Jakarta Sans tiene ambos glifos; Hanken Grotesk no.

---

## Capa de legibilidad

Esta sección es la más importante del proyecto. El sitio de un estudio que vende legibilidad tiene que ser un ejemplo del servicio.

- **Metadata real por página:** `title` y `description` únicos, escritos, no generados
- **JSON-LD:** `Organization` en todas las páginas, `Service` para las cuatro líneas, `Article` en `/manifiesto`
- **`sitemap.xml`** generado
- **`robots.txt`** que permita explícitamente a los crawlers de modelos de lenguaje. No bloquear GPTBot, ClaudeBot, PerplexityBot ni similares
- **`llms.txt`** en la raíz, con una descripción concisa del estudio, qué construye, a qué renuncia y enlaces a las páginas principales
- **Open Graph e imagen social** propias, en marca
- **HTML semántico:** un solo `h1` por página, jerarquía correcta, `alt` en todo elemento gráfico con significado
- **Encabezados como texto**, nunca como imagen

---

## Prohibiciones

- No inventar contenido, casos, cifras, testimonios ni logos de clientes
- No agregar secciones que no estén en `copy-home.md`
- No usar `localStorage` ni almacenamiento del navegador
- No agregar formularios ni chat en esta fase — el contacto es `hello@relevostudio.com` y nada más
- No incluir analítica de terceros sin preguntar
- No commitear secretos. No hay API keys en esta fase; si más adelante hacen falta, van en variables de entorno de Vercel y jamás en el frontend
- No tomar decisiones de marca ni de redacción. Ante la duda, preguntar

---

## Criterios de aceptación

Antes de dar por terminado el trabajo, verificar uno por uno:

- [ ] `curl` a la home devuelve el contenido completo en el HTML, sin ejecutar JavaScript
- [ ] Ningún color hexadecimal escrito a mano en componentes; todo viene de variables
- [ ] El copy calza palabra por palabra con `copy-home.md`
- [ ] La animación `handoff` del isotipo corre y se detiene con `prefers-reduced-motion`
- [ ] Lighthouse: 95+ en Performance, Accessibility, Best Practices y SEO
- [ ] `/llms.txt`, `/robots.txt` y `/sitemap.xml` responden correctamente
- [ ] JSON-LD válido según el validador de datos estructurados
- [ ] Se ve bien en móvil real, no solo en el simulador del navegador
- [ ] Los enlaces a `serchi.ai` y `workieo.com` abren en pestaña nueva con `rel="noopener noreferrer"`
- [ ] Contraste suficiente en todos los pares de color usados

---

## Deploy

Vercel ya está conectado a este repo (`relevo-studio-snowy.vercel.app`). Al mover la app a la raíz, revisar que **Root Directory** quede vacío y que el preset sea el correcto para Next.js.

Dominio en Cloudflare: el registro tiene que quedar en **DNS only, nube gris**. Con el proxy activo Vercel no valida el certificado y el sitio queda caído.

---

## Cómo trabajar

- Preguntar antes de asumir. Este proyecto tiene decisiones ya tomadas y documentadas; adivinarlas sale más caro que preguntar
- Commits pequeños y descriptivos, en español
- Al terminar, actualizar este archivo con la estructura real de carpetas y los comandos del proyecto
