/* ==========================================================
   Preise und Auswahllisten, EINE Quelle fuer beide Seiten.
   Die Startseite zeigt sie im Menue und im Preisabschnitt, die
   Anfrageseite baut daraus das Formular und rechnet damit.
   Wer hier eine Zahl aendert, aendert sie ueberall.
   Diese Datei wird von beiden Seiten geladen, bevor deren
   eigenes Skript laeuft.
   ========================================================== */
(function(global){
"use strict";

// ---------- PRICING DATA (single source of truth) ----------
var PACKAGES = [
  {id:'onepager', name:'Einstieg: Landingpage', desc:'Eine Seite, klar auf ein Ziel zugeschnitten. Responsive, Kontaktformular, Basis-SEO.', low:1100, high:1500,
    detail:'Zum Beispiel: ein Handwerksbetrieb, der einfach gefunden werden will. Eine Seite mit Leistungen, ein paar Fotos, Kontakt, fertig. Kein großes Menü, keine Unterseiten.'},
  {id:'business', name:'Business: Mehrseitige Website', desc:'5 bis 8 Seiten, individuelles Design, Rechtstexte eingebunden, SEO-Grundlagen.', low:1900, high:2500, feat:true,
    detail:'Zum Beispiel: eine Praxis oder ein Betrieb mit mehr zu erzählen. Startseite, Über uns, Leistungen, Referenzen, Kontakt, dazu Impressum und Datenschutz, alles im gleichen Design.'},
  {id:'verein', name:'Verein & Non-Profit', desc:'Mehrseitig, rechtssichere Texte (Satzung, Impressum, Datenschutz), News-Bereich.', low:2200, high:2900,
    detail:'Liegt bewusst über der Business-Website, weil ein Verein mehr Seiten und mehr Daten hat: Abteilungen, Mannschaften, Kader, Tabelle, Spielplan, Termine, Galerie, Sponsoren, Vorstand, Satzung, Mitgliedschaft. Die rechtlichen Seiten mache ich hier besonders sorgfältig, weil die bei Vereinen öfter geprüft werden. Der SV Fisch oben ist genau dieses Paket.'},
  {id:'tool', name:'Individuelles Tool / Web-App', desc:'Eigene Datenbank, Filter- oder Vergleichsfunktion, wie ein Konfigurator.', low:5500, high:null,
    detail:'Eine Seite, die nicht nur Text zeigt, sondern etwas tut: zum Beispiel eine durchsuchbare Liste mit Filtern, ein Preis- oder Angebotsrechner, ein Buchungskalender mit echter Logik dahinter. Der Besucher gibt etwas ein, und die Seite rechnet oder filtert live. Genau das ist BenchMeister.'},
];
var ADDONS = [
  {id:'gallery', name:'Bildergalerie', note:'Projekte oder Referenzen zeigen', low:150, high:250},
  {id:'blog', name:'Blog- / News-Bereich', note:'Eigenständig pflegbar', low:400, high:600},
  {id:'booking', name:'Terminbuchung', note:'Anbindung an einen Buchungsdienst. Habe ich noch nicht gebaut, deshalb kein fester Preis. Am Markt liegen Buchungssysteme bei 1.000 bis 3.000 €', custom:'Nach Absprache'},
  {id:'newsletter', name:'Newsletter-Anmeldung', note:'Anbindung an einen Versanddienst', low:150, high:200},
  {id:'members', name:'Mitgliederbereich mit Login', note:'Geschützter Bereich für Mitglieder, noch neu für mich, klären wir am besten im Gespräch', custom:'Nach Absprache'},
  {id:'shop', name:'Online-Shop', note:'Einen Shopify-Shop einrichten, gestalten und befüllen mache ich für einen laufenden Shop. Eine selbst gebaute Zahlungsanbindung ohne Shop-System ist weiterhin neu für mich', custom:'Nach Absprache'},
  {id:'compare', name:'Vergleichs- / Filter-Tool', note:'Individuelle Datenbank, wie bei BenchMeister', low:2000, high:null},
  {id:'lang', name:'Zusätzliche Sprache', note:'Pro weiterer Sprache, Übersetzung nicht enthalten. Habe ich noch nicht gebaut. Der Aufschlag hängt am Umfang, üblich sind 30 bis 50 Prozent des Projektpreises', custom:'Nach Absprache'},
  {id:'seo', name:'SEO-Grundpaket', note:'Sitemap, Meta-Daten, Search-Console-Anbindung', low:200, high:300},
  {id:'analytics', name:'DSGVO-konforme Analyse', note:'Datenschutzfreundliche Besucherstatistik', low:100, high:150},
  {id:'onsite', name:'Vor-Ort-Termin', note:'Pro Termin, inklusive Anfahrt im Raum Trier / Luxemburg', low:120, high:180},
];
var GOALS = [
  {id:'goal_neukunden', title:'Neukunden gewinnen', sub:'Sichtbar werden, angefragt werden'},
  {id:'goal_infos', title:'Erreichbarkeit & Infos', sub:'Öffnungszeiten, Angebot, Kontakt'},
  {id:'goal_verkauf', title:'Online verkaufen', sub:'Produkte oder Leistungen anbieten'},
  {id:'goal_verein', title:'Verein organisieren', sub:'Mitglieder, News, Termine'},
  {id:'goal_portfolio', title:'Referenzen zeigen', sub:'Projekte, Arbeitsproben'},
  {id:'goal_abloesen', title:'Bestehende Seite ablösen', sub:'Alte Seite ist veraltet oder langsam'},
];
var STYLES = [
  {id:'style_serioes', title:'Seriös / klassisch', sub:''},
  {id:'style_modern', title:'Modern / technisch', sub:''},
  {id:'style_freundlich', title:'Freundlich / verspielt', sub:''},
  {id:'style_minimal', title:'Minimalistisch', sub:''},
];

function adj(n){ return n; }
function fmt(n){ return n.toLocaleString('de-DE'); }
function rangeLabel(item){
  if (item.custom) return item.custom;
  if (item.high == null) return 'ab ' + fmt(adj(item.low)) + ' €';
  return fmt(adj(item.low)) + ' bis ' + fmt(adj(item.high)) + ' €';
}

global.PREISE = { PACKAGES:PACKAGES, ADDONS:ADDONS, GOALS:GOALS, STYLES:STYLES,
                  adj:adj, fmt:fmt, rangeLabel:rangeLabel };
})(window);
