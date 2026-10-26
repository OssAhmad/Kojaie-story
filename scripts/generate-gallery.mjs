
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
);

const imageDir = path.join(root, "assets", "private-assets");

const files = (await fs.readdir(imageDir))
  .filter(name => /^\d+\.\s*.+\.(png|jpe?g|webp|gif|avif)$/i.test(name))
  .sort((a, b) => {
    const numberA = parseInt(a.match(/^\d+/)[0], 10);
    const numberB = parseInt(b.match(/^\d+/)[0], 10);
    return numberA - numberB || a.localeCompare(b);
  });

const output = `window.GALLERY_PHOTOS = ${JSON.stringify(files, null, 2)};\n`;

await fs.writeFile(
  path.join(root, "gallery-data.js"),
  output,
  "utf8"
);

console.log(`Success: ${files.length} photos loaded in numerical order.`);
