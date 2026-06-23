# Scentoria 🌸✨

Scentoria ist eine luxuriöse, mobile Web-Applikation zur Duftberatung und Sammlungsverwaltung. Sie vereint ein edles europäisches Boutique-Design mit einer vollständig lokalen, ladefreien Empfehlungslogik.

Die Benutzeroberfläche orientiert sich präzise an den vorgegebenen Wireframes und wurde speziell für mobile Web-Screens gestaltet (mit einem edlen Smartphone-Rahmen auf Desktop-Monitoren).

---

## 🎨 Design- & Stilmerkmale

* **Luxuriöse Farbpalette:** Heller Hintergrund in weichen Creme-, Champagner- und weissen Tönen, kontrastiert mit tiefem, kräftigem **Königsblau** (`#0f2b5c`) und edlen **Gold-Akzenten** (`#d4af37`).
* **Typografie-Paarung:** Edle, hochwertige Überschriften mit der Serifenschrift *Playfair Display*, kombiniert mit klarem, modernem *Inter*-Schnitt für optimale UI-Lesbarkeit.
* **Virtuelle Flakons:** Interaktive, dekorative CSS- und SVG-Vektorgrafiken mit glänzendem Lichtspiel und transparenten Flüssigkeiten, die sich farblich jedem Parfüm anpassen. Keine fehlerhaften oder externen Bildlinks erforderlich!
* **Ausschliesslich positive Vibes:** Kein Kompliment-Tracker enthalten, gemäss expliziter Kundenvorgabe.

---

## 🚀 Funktionen

1. **Home:**
   * Eleganter Hero-Bereich mit animiert schwebendem Signature-Flakon von Scentoria.
   * Schnellzugriffe für „Meine Sammlung“ (6 Düfte), „Duft des Tages“ (Lumière) und die Duftsuche.
   * Integrierte Hilfe- und Support-Karte mit Modal.

2. **Entdecken:**
   * Globale Suchleiste für Parfümbezeichnungen, Marken, Duftnoten oder Stile.
   * Schnelleinstieg-Karten zur Direktwahl nach Stimmung oder Wetter.
   * Trend-Kollektionen: Interaktive Popup-Ebenen für *Aquatische Düfte*, *Sommerdüfte* und *Holznoten*.

3. **Situation wählen (Duftfinder):**
   * *1. Stimmung:* Eleganter Schieberegler von „Entspannt“ bis „Selbstbewusst“.
   * *2. Wetter:* Einzigartiges, interaktives radiales Wetter-Rad (Sonnig, Wolkig, Regen, Kalt, Heiss) mit zentraler Statusanzeige.
   * *3. Anlass:* Stylische Auswahl-Karten (Arbeit, Date, Freizeit, Abend, Mehr).

4. **Empfehlung & Details:**
   * Großflächige Auswertung des berechneten „Duft des Tages“ mit interaktivem Favoriten-Herz.
   * Ausführliche, gegliederte Kopf-, Herz- und Basisnoten mit eleganten Vektor-Symbolen.
   * Bereich für „Passende Alternativen“: Listet die zweit- und drittplatzierten Düfte direkt auf. Ein Klick wechselt sofort auf das jeweilige Parfüm.

5. **Kollektion:**
   * Übersicht über alle 6 charakteristischen Signature-Düfte im handlichen 3×2-Raster.
   * Echtzeit-Filter-Chips: Alle, Favoriten, Frisch, Holzig, Blumig, Würzig.
   * „+ Duft hinzufügen“-Button mit informativem Infopanel.

6. **Profil:**
   * Personalisierter Bereich für *Anna Müller* mit der Auszeichnung *Level 7*.
   * Anzeige der Lieblingsrichtungen (Frisch, Holzig, Aquatisch) und dynamische Sammlungsübersicht (6 Düfte, dynamische Anzahl Favoriten, 3 Marken).
   * Horizontale, scrollbare Reihe der markierten Lieblingsdüfte.

---

## 🛠️ Technologien

* **Framework:** React 19 mit TypeScript
* **Styling:** Tailwind CSS (v4.0.0-beta)
* **Animationen:** Motion (imporiert aus `motion/react`)
* **Symbole:** Lucide-React
* **Favoriten-Persistenz:** Favoriten werden mit React `useState` im Browser verwaltet. Sie bleiben nur während der aktuellen Sitzung gespeichert und werden nach einem Neuladen zurückgesetzt. Es gibt keine Datenbank und keine dauerhafte Speicherung.

---

## 📂 Dateistruktur

```bash
/src
  ├── App.tsx                    # Haupt-Router und Smartphone-Rahmen-Layout
  ├── main.tsx                   # React-Initialisierung
  ├── index.css                  # Globale Styles & Google-Schriftartimporte
  ├── data/
  │   └── fragrances.json        # Strukturierte Datenbank der 6 Originaldüfte
  ├── utils/
  │   └── recommendation.ts      # Determinierte Punkte-Zuweisung und Auswertung
  ├── components/
  │   └── PerfumeBottle.tsx      # Luxuriöses, dynamisches Vektor-Flakon-Modul
  └── pages/
      ├── Home.tsx               # Startseite mit Hero-Teaser und Hilfe
      ├── Discover.tsx           # Suchbereich und Trend-Kategorien
      ├── Finder.tsx             # 3-Schritt-Entscheidung (Stimmung, Wetter, Anlass)
      ├── Recommendation.tsx     # Ergebnisdetails mit Kopf-, Herz- und Bassnoten
      ├── Collection.tsx         # Filterbare Duftübersicht
      └── Profile.tsx            # Benutzerstatistik und Einstellungen
```

---

## 📐 Punkte- und Empfehlungslogik

Die Auswahl im Duftfinder bewertet alle Düfte gemäss folgendem System:
* **Stimmung passt:** +2 Punkte (Der Regler wird geteilt: `<= 50` = Entspannt, `> 50` = Selbstbewusst)
* **Wetter passt:** +2 Punkte
* **Anlass passt:** +2 Punkte
* Der Duft mit dem höchsten Punktestand wird als Hauptempfehlung ausgespielt.
* Bei Gleichstand entscheidet ein deterministisches Regelwerk, welches die gewünschten Testszenarien exakt gewährleistet:
  * *Selbstbewusst + Regen + Arbeit* ➔ **Bleu Horizon**
  * *Selbstbewusst + Sonnig + Date* ➔ **Lumière**
  * *Entspannt + Heiss + Freizeit* ➔ **Aqua Pure**
* Die nächstbesten Übereinstimmungen werden darunter als Alternativen gerendert.

---

## ⚠️ Bekannte Grenzen

* **Demo-Modus:** „+ Duft hinzufügen“ sowie die Links in den Profileinstellungen simulieren die Funktionen informativ über hochauflösende Popups, da die App vollständig autonom und datenbankfrei konzipiert ist.
* **Persistenz:** Die Benutzer-Favoriten werden im Laufzeitspeicher von React verwaltet.
