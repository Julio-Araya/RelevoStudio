# El globo — especificación visual

*Anexo del CLAUDE.md. Capa gráfica de la home de relevostudio.com.*

---

## El concepto

El globo aerostático es la marca dibujada: *hacer ligero lo que pesa* es lo que hace un globo.

**No es una ilustración nueva.** La envoltura son los dos círculos del logotipo a escala grande. Cuando el globo se abre, lo que se separa son las dos *o* de `relevo`. Cuando vuelve a armarse, el logotipo se reconstruye.

**El globo nunca se rompe.** Se abre para mostrar de qué está hecho. Eso es el diagnóstico, no una falla. La diferencia entre "se desarma" y "se abre" es toda la diferencia de mensaje, y tiene que notarse en el movimiento: las piezas se separan con orden, nunca caen ni giran al azar.

---

## Reglas duras

**Es capa visual, no contenido.** Va detrás del texto, en `position: sticky`. Si el JavaScript falla o el navegador no soporta scroll-driven animations, el sitio se lee completo igual. El globo queda en su estado inicial y no pasa nada.

**Nunca compite con el texto.** Opacidad máxima 100% solo cuando no hay texto encima; bajo bloques de copy, la capa baja a ~35%.

**`prefers-reduced-motion`**: sin animación. El globo queda estático en el estado completo del acto 01.

**Móvil:** el globo se reduce y se centra detrás del texto con opacidad baja. No se intenta reproducir la secuencia completa en pantallas angostas — se conservan tres estados (completo → abierto → sube) en vez de siete.

**Rendimiento:** solo se animan `transform` y `opacity`. Nada de `filter`, `box-shadow` ni cambios de geometría. Ningún `<path>` cambia su atributo `d` en ningún momento.

---

## SVG maestro

Cada anillo son tres arcos de 120°. Cerrados se tocan y leen como un círculo; abiertos se separan con `transform`. Nunca se hace morphing de paths.

```svg
<svg viewBox="0 0 400 520" fill="none" aria-hidden="true" id="globo">

  <g id="envoltura">
    <g id="anillo-teal" stroke="var(--teal-500)" stroke-width="26" stroke-linecap="round">
      <path id="t1" d="M185,275 A95,95 0 0,1 102.7,132.5"/>
      <path id="t2" d="M102.7,132.5 A95,95 0 0,1 267.3,132.5"/>
      <path id="t3" d="M267.3,132.5 A95,95 0 0,1 185,275"/>
    </g>
    <g id="anillo-coral" stroke="var(--coral-300)" stroke-width="26" stroke-linecap="round">
      <path id="c1" d="M215,275 A95,95 0 0,1 132.7,132.5"/>
      <path id="c2" d="M132.7,132.5 A95,95 0 0,1 297.3,132.5"/>
      <path id="c3" d="M297.3,132.5 A95,95 0 0,1 215,275"/>
    </g>
  </g>

  <g id="base" opacity="0">
    <rect x="168" y="300" width="64" height="7" rx="3" fill="var(--coral-300)"/>
    <path d="M186,300 L192,282 L198,300 Z" fill="var(--coral-300)"/>
    <path d="M202,300 L208,286 L214,300 Z" fill="var(--coral-300)"/>
  </g>

  <g id="cables" stroke="var(--ink-200)" stroke-width="3">
    <path d="M158,266 L184,360"/>
    <path d="M242,266 L216,360"/>
  </g>

  <rect id="canasta" x="178" y="360" width="44" height="32" rx="10" fill="var(--ink-200)"/>

  <g id="lastres" opacity="0">
    <path d="M190,392 L190,424" stroke="var(--ink-200)" stroke-width="2"/>
    <path d="M210,392 L210,440" stroke="var(--ink-200)" stroke-width="2"/>
    <rect x="180" y="424" width="20" height="15" rx="4" fill="var(--ink-200)" opacity="0.55"/>
    <rect x="200" y="440" width="20" height="15" rx="4" fill="var(--ink-200)" opacity="0.55"/>
  </g>

  <g id="estela" opacity="0" stroke="var(--ink-200)" stroke-width="3" stroke-linecap="round" opacity="0.3">
    <path d="M168,420 L168,448"/>
    <path d="M200,430 L200,466"/>
    <path d="M232,420 L232,448"/>
  </g>

</svg>
```

Los colores salen de las variables del design system. Ningún hex escrito a mano.

---

## Storyboard por acto

Cada acto ocupa un tramo del scroll. Los valores son el estado **al final** del tramo; la interpolación es continua con el easing firma `cubic-bezier(.25,1,.5,1)`.

### 01 · Relevo — completo

Estado base del SVG, sin transformaciones.

El globo entero flota con una oscilación mínima: `translateY` de ±6px en ciclo de 6s. Es lo único que se mueve sin scroll, y es lo que da la sensación de que está vivo.

### 02 · El punto — con lastres

- `#lastres` → `opacity: 1`
- `#globo` completo → `translateY(18px)` — pesa, baja un poco
- La oscilación se reduce a ±2px: está cargado, ya casi no flota

### 03 · Lo que realmente pasa — se abre

Las seis piezas se separan hacia afuera, radialmente, con retardo escalonado de 60ms entre ellas.

| Pieza | Transform final |
|---|---|
| `#t1` | `translate(-46px, 20px) rotate(-12deg)` |
| `#t2` | `translate(-30px, -44px) rotate(-6deg)` |
| `#t3` | `translate(10px, -18px) rotate(4deg)` |
| `#c1` | `translate(-8px, 34px) rotate(8deg)` |
| `#c2` | `translate(34px, -38px) rotate(6deg)` |
| `#c3` | `translate(52px, 12px) rotate(14deg)` |

- `#lastres` → `opacity: 0`
- `#cables` → `opacity: 0.3`

**El movimiento es ordenado y lento.** Ninguna pieza gira más de 15°. Si se ve caótico, está mal: esto es una apertura, no una explosión.

### 04 · Lo que nadie está mirando — aparece la base

Las piezas se mantienen abiertas, quietas.

- `#base` → `opacity: 1`, entrando con `scale(0.6 → 1)` desde su propio centro
- Las seis piezas → `opacity: 0.35`

Es el único momento en que la base es protagonista. Todo lo demás retrocede.

### 05 · El sistema — vuelve a armarse

Las piezas regresan a su posición original, **de abajo hacia arriba**: primero las que estaban más bajas (`t1`, `c1`), al final las de arriba (`t2`, `c2`). Retardo escalonado de 80ms.

- Todas las piezas → `transform: none`, `opacity: 1`
- `#base` → `opacity: 0.5`, se queda pero deja de ser el foco
- `#cables` → `opacity: 1`

El orden importa y es el argumento del acto: primero la base, después la capa que se ve.

### 06 · La forma Relevo — probándose

- El globo entero → `translateY(-10px)`
- Vuelve la oscilación, ahora de ±8px y algo más rápida: está listo

### 07 · Conversación — sube

- `#globo` → `translateY(-140px)`, `scale(0.82)`
- `#estela` → `opacity: 1`
- La capa completa → `opacity: 0.25`, para que el bloque de contacto quede limpio

---

## Implementación

Preferir `animation-timeline: view()` y `scroll()` nativos de CSS. Donde no haya soporte, degradar a un `IntersectionObserver` que agregue clases de estado por acto — **nunca** a una librería de scroll.

El SVG va una sola vez en el DOM, en un contenedor `sticky` que abarca los siete actos. No se duplica por sección.

---

## Criterios de aceptación

- [ ] El HTML de los siete actos llega completo aunque el SVG no cargue
- [ ] Con `prefers-reduced-motion` el globo queda estático y no hay saltos
- [ ] Ningún `<path>` cambia su atributo `d` en ninguna transición
- [ ] Solo se animan `transform` y `opacity`
- [ ] El texto es legible sobre el globo en todos los actos, en claro y sobre ink
- [ ] En móvil se conservan tres estados y el rendimiento no cae
- [ ] Ningún color hexadecimal escrito a mano en el SVG
- [ ] Al hacer scroll rápido de arriba abajo no quedan piezas trabadas fuera de lugar
