/**
 * Bilder fuer die Beispielseiten erzeugen.
 *
 * Braucht die Umgebungsvariable OPENAI_API_KEY. Der Schluessel steht
 * nirgends in dieser Datei und gehoert auch nicht ins Repository.
 *
 * Aufruf:
 *   node werkzeug/bilder-erzeugen.mjs weingut
 *   node werkzeug/bilder-erzeugen.mjs weingut hang keller   (nur diese)
 *
 * Vorhandene Dateien werden nach bilder/alt/ geschoben, nicht geloescht.
 */

import { writeFile, mkdir, rename, access } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const WURZEL = join(dirname(fileURLToPath(import.meta.url)), "..");
const SCHLUESSEL = process.env.OPENAI_API_KEY;
if (!SCHLUESSEL) {
  console.error("OPENAI_API_KEY ist nicht gesetzt. Siehe Anleitung.");
  process.exit(1);
}

/* Eine gemeinsame Handschrift fuer alle Bilder eines Auftrags. Ohne die
   sieht jedes Bild fuer sich gut aus und der Satz trotzdem zusammen-
   gewuerfelt: anderes Licht, andere Jahreszeit, andere Saettigung. */
const HANDSCHRIFT =
  "Shot on 35mm film with a 50mm lens, natural available light only, " +
  "restrained desaturated colour, fine grain, soft contrast, documentary " +
  "photography, nothing staged. No people facing the camera, no text, " +
  "no lettering, no signage, no logos, no watermarks, no borders.";

const AUFTRAEGE = {
  weingut: {
    ordner: "beispiele/weingut/bilder",
    format: "1536x1024",
    motive: {
      hang:
        "A very steep terraced Riesling vineyard on blue Devonian slate " +
        "dropping down to a wide bend of the Mosel river in Germany. Late " +
        "September, low raking evening light across the slope, thin mist on " +
        "the water, a small village of slate roofs on the far bank far below. " +
        "Photographed from inside the vine rows, a few backlit vine leaves " +
        "soft in the near foreground.",
      ort:
        "A small German wine village of slate-roofed houses around a slender " +
        "church spire, wedged between steep vineyard slopes, seen from the " +
        "hillside above. Early autumn, soft overcast morning light, the vine " +
        "rows running in long diagonal lines across the frame.",
      reben:
        "Close view of ripe golden Riesling grape bunches hanging on the vine, " +
        "early morning, dew on the skins, flat weathered blue slate stones on " +
        "the ground behind them, shallow depth of field.",
      keller:
        "An old vaulted cellar of dark sandstone blocks with one row of large " +
        "oval oak casks along the wall, dim warm light from a single bulb far " +
        "down the vault, damp stone floor, cool damp air, completely empty of " +
        "people.",
      fluss:
        "The Mosel river winding in a wide loop between steep terraced " +
        "vineyards, seen from a high ridge at dusk, blue hour, low mist lying " +
        "in the valley, the last light on the water.",
    },
  },
};

async function existiert(p) {
  try { await access(p); return true; } catch { return false; }
}

async function erzeuge(name, anweisung, ordner, format) {
  const antwort = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SCHLUESSEL}`,
    },
    body: JSON.stringify({
      model: "gpt-image-1",
      prompt: `${anweisung} ${HANDSCHRIFT}`,
      size: format,
      quality: "high",
      output_format: "jpeg",
      output_compression: 82,
      n: 1,
    }),
  });

  if (!antwort.ok) {
    const text = await antwort.text();
    throw new Error(`${name}: HTTP ${antwort.status} ${text.slice(0, 400)}`);
  }

  const daten = await antwort.json();
  const roh = daten.data?.[0]?.b64_json;
  if (!roh) throw new Error(`${name}: keine Bilddaten in der Antwort`);

  const ziel = join(WURZEL, ordner, `${name}.jpg`);
  if (await existiert(ziel)) {
    const altOrdner = join(WURZEL, ordner, "alt");
    await mkdir(altOrdner, { recursive: true });
    await rename(ziel, join(altOrdner, `${name}.jpg`));
  }
  const puffer = Buffer.from(roh, "base64");
  await writeFile(ziel, puffer);

  return { name, kb: Math.round(puffer.length / 1024), verbrauch: daten.usage };
}

const [auftragName, ...nurDiese] = process.argv.slice(2);
const auftrag = AUFTRAEGE[auftragName];
if (!auftrag) {
  console.error(`Unbekannter Auftrag. Vorhanden: ${Object.keys(AUFTRAEGE).join(", ")}`);
  process.exit(1);
}

const namen = nurDiese.length ? nurDiese : Object.keys(auftrag.motive);
await mkdir(join(WURZEL, auftrag.ordner), { recursive: true });

/* Nacheinander, nicht parallel: die Bild-Schnittstelle drosselt sonst,
   und bei einem Fehler weiss man, welches Motiv gescheitert ist. */
for (const name of namen) {
  const anweisung = auftrag.motive[name];
  if (!anweisung) { console.error(`Kein Motiv namens "${name}"`); continue; }
  process.stdout.write(`${name} ... `);
  try {
    const e = await erzeuge(name, anweisung, auftrag.ordner, auftrag.format);
    console.log(`fertig, ${e.kb} KB` + (e.verbrauch ? `, ${e.verbrauch.total_tokens} Token` : ""));
  } catch (fehler) {
    console.log("FEHLER");
    console.error(String(fehler.message));
  }
}
