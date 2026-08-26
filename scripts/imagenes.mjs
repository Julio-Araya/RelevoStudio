/*
 * Genera las variantes de las siete imágenes de la home (docs/globo-spec.md).
 *
 * Lee los PNG originales de public/actos/ y deja al lado:
 *   - 16:9 en 1920, 1280, 828 y 640 de ancho, en AVIF y WebP
 *   - recortes 4:5 para móvil en 640 y 828 de ancho, en AVIF y WebP
 *
 * Presupuesto: menos de 250 KB por AVIF a 1920. Si alguna no baja, se
 * simplifica el recorte, no se comprime más: el script avisa y falla.
 *
 * Uso: npm run imagenes
 */

import { readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DIR = path.resolve("public/actos");
const PRESUPUESTO_1920 = 250 * 1024;

/* Foco horizontal de cada imagen (0 = borde izquierdo, 1 = derecho): dónde
   está el globo. Manda el recorte 4:5 y es el mismo valor que usa
   object-position en app/globo.css. */
const IMAGENES = [
  { archivo: "acto-01-completo", foco: 0.78 },
  { archivo: "acto-02-lastres", foco: 0.77 },
  { archivo: "acto-03-abre", foco: 0.7 },
  { archivo: "acto-04-base", foco: 0.5 },
  { archivo: "acto-05-arma", foco: 0.3 },
  { archivo: "acto-06-prueba", foco: 0.76 },
  { archivo: "acto-07-sube", foco: 0.76 },
];

const ANCHOS_16_9 = [1920, 1280, 828, 640];
const ANCHOS_4_5 = [828, 640];

/* Con el presupuesto de 250 KB sobra margen: calidad alta para que los
   cielos en degradado no muestren bandas. Croma 4:2:0 (sharp usa 4:4:4 por
   defecto): archivos más livianos y decodificación más barata, sin
   diferencia visible en fotografía. */
const AVIF = { quality: 68, effort: 6, chromaSubsampling: "4:2:0" };
const WEBP = { quality: 82, effort: 5 };

function kb(bytes) {
  return `${Math.round(bytes / 1024)} KB`;
}

async function guardar(pipeline, base) {
  const salidas = [];
  for (const [ext, opts] of [
    ["avif", AVIF],
    ["webp", WEBP],
  ]) {
    const destino = path.join(DIR, `${base}.${ext}`);
    const buffer = await pipeline.clone()[ext](opts).toBuffer();
    await writeFile(destino, buffer);
    salidas.push({ destino, ext, bytes: buffer.length });
  }
  return salidas;
}

let fallo = false;

for (const { archivo, foco } of IMAGENES) {
  const origen = path.join(DIR, `${archivo}.png`);
  const entrada = sharp(await readFile(origen));
  const { width, height } = await entrada.metadata();
  console.log(`\n${archivo}.png · ${width}×${height} · ${kb((await stat(origen)).size)}`);

  /* 16:9: escala al ancho y recorta a 16:9 centrado en vertical */
  for (const ancho of ANCHOS_16_9) {
    const alto = Math.round((ancho * 9) / 16);
    const pipeline = entrada
      .clone()
      .resize(ancho, alto, { fit: "cover", position: "centre", kernel: "lanczos3" });
    for (const { ext, bytes } of await guardar(pipeline, `${archivo}-${ancho}`)) {
      let nota = "";
      if (ancho === 1920 && ext === "avif") {
        const dentro = bytes < PRESUPUESTO_1920;
        nota = dentro ? "  ✓ dentro del presupuesto" : "  ✗ SUPERA LOS 250 KB";
        if (!dentro) fallo = true;
      }
      console.log(`  ${ancho}×${alto} ${ext.padEnd(4)} ${kb(bytes).padStart(7)}${nota}`);
    }
  }

  /* 4:5: recorte a altura completa, centrado en el foco del globo */
  const anchoRecorte = Math.round((height * 4) / 5);
  const left = Math.min(Math.max(Math.round(width * foco - anchoRecorte / 2), 0), width - anchoRecorte);
  for (const ancho of ANCHOS_4_5) {
    const alto = Math.round((ancho * 5) / 4);
    const pipeline = entrada
      .clone()
      .extract({ left, top: 0, width: anchoRecorte, height })
      .resize(ancho, alto, { fit: "cover", kernel: "lanczos3" });
    for (const { ext, bytes } of await guardar(pipeline, `${archivo}-4x5-${ancho}`)) {
      console.log(`  4:5 ${ancho}×${alto} ${ext.padEnd(4)} ${kb(bytes).padStart(7)}`);
    }
  }
}

if (fallo) {
  console.error("\nAlguna imagen supera el presupuesto: simplificar el recorte, no comprimir más.");
  process.exit(1);
}
