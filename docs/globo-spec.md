# El globo — especificación visual

*Versión 2. Anexo del CLAUDE.md. Capa gráfica de la home de relevostudio.com.*

> **Cambio respecto de la v1:** la capa gráfica ya no es un SVG de piezas animadas. Son siete imágenes fotográficas, una por acto, que se cruzan con el scroll. Si existe un componente de globo en SVG, se reemplaza. El motor de animación por variables de progreso se conserva: lo único que cambia es qué se anima.

---

## El concepto

El globo aerostático es la marca dibujada: *hacer ligero lo que pesa* es lo que hace un globo.

El relato avanza con el scroll. El globo empieza entero, se carga de lastre, se abre para mostrar de qué está hecho, revela su base, se vuelve a armar desde abajo, se prueba y finalmente sube.

**El globo nunca se rompe.** Se abre. La diferencia entre "se desarma" y "se abre" es todo el mensaje, y por eso las imágenes muestran piezas intactas y ordenadas, nunca escombros.

---

## Las imágenes

Siete archivos en `public/actos/`. Formato original PNG, 1672×941, ya normalizadas en brillo y color como serie.

| Acto | Archivo | Qué muestra |
|---|---|---|
| 01 Relevo | `acto-01-completo.png` | Globo completo, alto, sereno. Tercio izquierdo libre |
| 02 El punto | `acto-02-lastres.png` | Globo bajo, con bolsas de lastre colgando |
| 03 Lo que realmente pasa | `acto-03-abre.png` | Envoltura abierta en piezas, ordenadas, intactas |
| 04 Lo que nadie está mirando | `acto-04-base.png` | Quemador nítido en primer plano, envoltura difusa detrás |
| 05 El sistema | `acto-05-arma.png` | Las piezas convergiendo. Es el acto 03 espejado |
| 06 La forma Relevo | `acto-06-prueba.png` | Globo completo en tierra, amarrado, a punto de salir |
| 07 Conversación | `acto-07-sube.png` | Globo cerca del borde superior, mucho cielo. Recorte del acto 01 |

**El 05 es el 03 espejado y el 07 es un recorte del 01.** Es deliberado: el sol cambia de lado en el 05, y que el sitio abra y cierre con el mismo globo es un cierre de arco. No hay que "corregirlo" regenerando nada.

---

## Reglas duras

**Es capa visual, no contenido.** Va detrás del texto. Si las imágenes no cargan o no hay JavaScript, el HTML de los siete actos llega completo y el sitio se lee entero.

**Nunca compite con el texto.** Ver la sección de legibilidad más abajo: es el punto donde esto se gana o se pierde.

**`prefers-reduced-motion`**: sin cruces ni desplazamiento. Cada acto muestra su imagen fija, sin transición.

**Rendimiento:** solo se animan `opacity` y `transform`. Nada de `filter` ni `background-position`.

---

## Motor de animación

Se conserva el motor de la v1: siete propiedades registradas con `@property --p1 … --p7`, cada una animada de 0 a 1 contra la `view-timeline` de su acto, con `timeline-scope` en el contenedor. El estado es una función pura de la posición de scroll, por lo que el scroll rápido nunca deja nada trabado y la ida y la vuelta son simétricas.

Lo que cambia es qué consume esas variables:

**Opacidad de cada imagen.** La imagen del acto N está en opacidad 1 mientras su acto ocupa la pantalla. La transición es secuencial: la saliente baja a 0 —con un desplazamiento propio hacia arriba, para que se lea como salida— antes de que la entrante empiece a subir, con un tramo corto donde domina el velo. Nunca se ven dos globos a la vez.

**Desplazamiento y escala lentos dentro de cada acto.** Cada imagen entra en `scale(1.06)` y termina en `scale(1)`, con un desplazamiento vertical de unos 20px en el mismo tramo. Es lo que le da vida al plano fijo y evita que el sitio se sienta como un carrusel. Suave: si se nota como movimiento, es demasiado.

**Fallback.** Donde no haya soporte de `timeline-scope`, la isla con `IntersectionObserver` de la v1 escribe `data-acto="N"` y el CSS resuelve el estado con `transition`. Mismo resultado, sin librerías. La comprobación de soporte se hace sobre `timeline-scope`, no sobre `animation-timeline`.

---

## Legibilidad del texto

**Este es el punto crítico de toda la spec.**

Las imágenes son claras y cálidas: cielos color crema, sol bajo, mucha luz. Buena parte del copy va en ink sobre ellas y se va a perder.

**Cómo resolverlo:** un velo del color de fondo del acto entre la imagen y el texto.

- Actos en off-white → velo `off-white-200` al 55–70% de opacidad
- Actos en ink-gradient (04 y 07) → velo ink al 60–75%

**Cómo NO resolverlo:** oscureciendo las imágenes, subiéndoles el contraste o poniéndoles un degradado negro. La calidez de la serie es lo que la hace buena; un velo la conserva, un filtro la mata.

El velo puede ser más denso justo detrás del bloque de texto y más liviano en el resto del cuadro, para que la imagen respire donde no hay nada encima.

**Verificar acto por acto**, no con una regla global. Cada imagen tiene el globo en un lugar distinto y cada acto tiene su titular en un lugar distinto.

---

## Formatos y peso

**Es el mayor riesgo del sitio.** Siete imágenes a pantalla completa contra un criterio de Lighthouse 95+.

- Convertir a **AVIF** con respaldo **WebP**, servidas con `<picture>` o el componente de imagen de Next
- Tamaños responsivos: 1920, 1280, 828, 640
- **Presupuesto: menos de 250 KB por imagen en AVIF a 1920px.** Si alguna no baja, se simplifica el recorte, no se comprime más
- Solo la del acto 01 carga con prioridad. Las otras seis, diferidas
- Precargar la del acto siguiente cuando el actual entra en pantalla, para que el cruce no parpadee

**Móvil:** generar recortes 4:5 de las siete. En pantallas angostas se conservan tres cruces —completo, abierto, sube— en vez de siete, para no gastar datos en transiciones que casi no se ven.

---

## Criterios de aceptación

- [ ] El HTML de los siete actos llega completo aunque las imágenes no carguen
- [ ] Con `prefers-reduced-motion` no hay cruces ni desplazamiento, y no hay saltos
- [ ] Todo el texto es legible sobre su imagen, verificado acto por acto, en claro y sobre ink
- [ ] Ninguna imagen fue oscurecida ni le subieron el contraste: la legibilidad se resolvió con velo
- [ ] Cada AVIF a 1920px pesa menos de 250 KB
- [ ] Existen los recortes 4:5 y se sirven en móvil
- [ ] Lighthouse sobre 95 en las cuatro categorías, con las imágenes cargando
- [ ] El cruce entre actos no parpadea ni muestra fondo intermedio
- [ ] Al hacer scroll rápido de arriba abajo el estado final es correcto
- [ ] Solo se animan `opacity` y `transform`
- [ ] Las imágenes llevan `alt` vacío: son decorativas, el contenido está en el texto