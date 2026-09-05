# Dominic Lutz Webdesign

Die Verkaufsseite des Webdesign-Nebengewerbes: Leistungen zum Ausprobieren,
Preise mit offengelegter Grundlage, und ein Briefing-Formular, das der Kunde
selbst per Mail abschickt.

## Aufbau

Eine einzige statische Datei. Kein Baukasten, kein Framework, kein Build.
`index.html` enthaelt Auszeichnung, Gestaltung und Verhalten. Das ist Absicht:
die Seite laedt sofort, es gibt nichts, was beim Aktualisieren kaputtgehen
kann, und sie laesst sich ohne Werkzeuge oeffnen.

Fremde Adressen werden geladen fuer die Schriften (Google Fonts). Alles
andere liegt in der Datei.

## Veroeffentlichen

Vercel erkennt eine statische Seite von selbst, es ist nichts einzustellen.

    npx.cmd vercel          # Vorschau-Adresse
    npx.cmd vercel --prod   # feste Adresse

## Stand

- Preise beruhen auf 55 Euro je Stunde, Grundlage steht offen auf der Seite
- Was noch nie gebaut wurde, steht als "Nach Absprache" und ist so gekennzeichnet
- Kontakt laeuft ueber eine private Mailadresse, spaeter auf eine eigene Domain umstellen
- Die fuenf Beispielseiten liegen noch als Artifacts auf claude.ai
