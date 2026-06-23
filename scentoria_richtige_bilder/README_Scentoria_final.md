# Scentoria

Scentoria ist ein mobiler Web-Prototyp für Duftempfehlungen. Die App hilft dabei, aus einer grossen Duftauswahl einen passenden Duft für eine Situation zu finden.

Die Kernfunktion lautet:

> Stimmung wählen → Wetter wählen → Anlass wählen → Duftempfehlung erhalten

Der Prototyp enthält 200 reale Duftbeispiele mit Marken, Duftnoten und einer eigenen Scentoria-Empfehlungslogik. Die Benutzeroberfläche basiert auf den erstellten Wireframes und ist für die Nutzung auf dem Smartphone gestaltet.

---

## Inhaltsverzeichnis

- [1. Voraussetzungen](#1-voraussetzungen)
- [2. Installation](#2-installation)
- [3. Anwendung starten](#3-anwendung-starten)
- [4. Anwendung testen](#4-anwendung-testen)
- [5. Funktionsüberblick](#5-funktionsüberblick)
- [6. Technologie-Stack](#6-technologie-stack)
- [7. Projektstruktur](#7-projektstruktur)
- [8. Daten und Empfehlungslogik](#8-daten-und-empfehlungslogik)
- [9. Bekannte Grenzen](#9-bekannte-grenzen)
- [10. Fehlerbehebung](#10-fehlerbehebung)

---

## 1. Voraussetzungen

Damit Scentoria auf einem anderen Computer gestartet werden kann, wird Folgendes benötigt:

- **Node.js 20 oder neuer**
- **npm** (wird mit Node.js installiert)
- Ein moderner Browser, zum Beispiel Google Chrome, Microsoft Edge oder Firefox
- Eine Internetverbindung ist empfohlen, damit externe Flakonbilder geladen werden können

Die Anwendung braucht keine Datenbank, keinen API-Key und keine Registrierung.

### Node.js-Version prüfen

Öffne ein Terminal im Projektordner und führe aus:

```bash
node -v
npm -v
```

Wenn bei `node -v` eine Version ab 20 angezeigt wird, ist die Voraussetzung erfüllt.

---

## 2. Installation

### Variante A: Projekt über GitHub herunterladen

1. Öffne das GitHub-Repository von Scentoria.
2. Klicke auf **Code**.
3. Klicke auf **Download ZIP**.
4. Entpacke die ZIP-Datei in einen beliebigen Ordner.
5. Öffne ein Terminal in diesem Projektordner.

### Variante B: Projekt mit Git klonen

```bash
git clone https://github.com/maximushelvetius-star/scentoria-prototype.git
cd scentoria-prototype
```

### Abhängigkeiten installieren

Führe danach diesen Befehl aus:

```bash
npm install
```

Dabei werden alle benötigten Pakete installiert.

Wichtig: Der Ordner `node_modules` wird automatisch erstellt und soll nicht in GitHub hochgeladen werden.

---

## 3. Anwendung starten

Starte den Entwicklungsserver mit:

```bash
npm run dev
```

Danach erscheint im Terminal eine Adresse ähnlich wie:

```text
Local: http://localhost:3000/
```

Öffne diese Adresse im Browser:

```text
http://localhost:3000
```

Die Anwendung startet danach im Browser.

### Produktions-Build erstellen

Mit diesem Befehl kann geprüft werden, ob der Produktions-Build funktioniert:

```bash
npm run build
```

Wenn der Befehl ohne Fehler endet, wird ein Ordner `dist` erstellt.

### Produktions-Build lokal testen

```bash
npm run preview
```

Das Terminal zeigt danach die lokale Adresse an, über die der Build getestet werden kann.

### TypeScript-Prüfung ausführen

```bash
npm run lint
```

Dieser Befehl prüft den TypeScript-Code auf Fehler.

---

## 4. Anwendung testen

### Kurzer Funktionstest

1. Öffne die Home-Seite.
2. Klicke auf **Duft finden**.
3. Wähle eine Stimmung.
4. Wähle ein Wetter.
5. Wähle einen Anlass.
6. Klicke auf **Empfehlung finden**.
7. Prüfe, ob ein Hauptduft und zwei Alternativen angezeigt werden.
8. Teste die Bottom Navigation: Home, Entdecken, Kollektion und Profil.
9. Teste in der Kollektion die Suche, Filter und Favoriten.

### Feste Testfälle

Diese drei Testfälle sind im Prototyp bewusst fest abgesichert:

| Stimmung | Wetter | Anlass | Erwartete Empfehlung |
|---|---|---|---|
| Selbstbewusst | Regen | Arbeit | Bleu de Chanel Eau de Parfum |
| Selbstbewusst | Sonnig | Date | XJ 1861 Naxos |
| Entspannt | Heiss | Freizeit | Acqua di Giò Profumo |

### Weitere Testpunkte

- Die Suche auf der Seite **Entdecken** soll nach Name, Marke, Duftnoten und Stil filtern.
- Die Filter in **Meine Kollektion** sollen die Duftkarten passend ein- und ausblenden.
- Das Herzsymbol soll einen Duft zu den Favoriten hinzufügen oder daraus entfernen.
- Wenn ein externes Flakonbild nicht geladen werden kann, soll automatisch eine eigene SVG-Flakonillustration angezeigt werden.
- Die Hilfe-&-Support-Karte soll ein Informationsfenster öffnen.

---

## 5. Funktionsüberblick

### Home

Die Home-Seite ist der Einstieg in Scentoria. Sie enthält:

- Button **Duft finden**
- Direktzugriff auf die Kollektion
- Direktzugriff auf den Duft des Tages
- Hilfe & Support
- Bottom Navigation

### Duftfinder

Der Duftfinder ist die Kernfunktion der App.

Die Reihenfolge ist:

1. Stimmung wählen
2. Wetter wählen
3. Anlass wählen
4. Empfehlung erhalten

Die Stimmung wird über einen Slider von **Entspannt** bis **Selbstbewusst** gewählt. Das Wetter wird über ein Wetter-Rad gewählt. Beim Anlass stehen Arbeit, Date, Freizeit, Abend und Mehr zur Auswahl.

### Duftempfehlung

Nach der Auswahl zeigt Scentoria:

- einen empfohlenen Duft
- Marke und Duftstil
- Kopfnoten, Herznoten und Basisnoten
- passende Tags
- zwei Alternativen
- ein Favoriten-Symbol
- die Möglichkeit, eine neue Situation zu wählen

### Entdecken

Die Seite **Entdecken** enthält:

- Suche nach Duftname, Marke, Note oder Stil
- Schnelleinstiege nach Stimmung und Wetter
- Duft des Tages
- Trendbereiche, zum Beispiel aquatische Düfte, Sommerdüfte und Holznoten

### Meine Kollektion

Die Kollektion enthält 200 reale Duftbeispiele.

Mögliche Funktionen:

- Suche nach Düften
- Filter: Alle, Favoriten, Frisch, Holzig, Blumig und Würzig
- Duftdetails öffnen
- Favoriten setzen oder entfernen
- Hinweis bei **+ Duft hinzufügen**, da im MVP keine dauerhafte Speicherung vorhanden ist

### Profil

Im Profil werden ein Beispielprofil und eine Sammlungsübersicht angezeigt:

- Benutzerin: Anna Müller
- Duftvorlieben
- Anzahl Düfte
- Anzahl Favoriten
- Lieblingsdüfte
- Einstellungen
- Benachrichtigungen
- Hilfe & Support

---

## 6. Technologie-Stack

| Technologie | Einsatz in Scentoria |
|---|---|
| React 19 | Aufbau der Benutzeroberfläche mit Komponenten und States |
| TypeScript | Typsicherer Frontend-Code |
| Vite | Lokaler Entwicklungsserver und Produktions-Build |
| Tailwind CSS | Responsive Styling, Farben, Karten und Mobile-Layout |
| Motion | Weiche Seitenwechsel und kleine UI-Animationen |
| Lucide React | Icons für Navigation, Wetter, Favoriten und Aktionen |
| JSON | Lokale Speicherung der Duftdaten |
| GitHub | Versionierung und Bereitstellung des Codes |

Scentoria verwendet aktuell keine Datenbank, kein Login und keine externe Duft-API. Die Empfehlung wird vollständig lokal berechnet.

---

## 7. Projektstruktur

```text
scentoria-prototype/
│
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   │
│   ├── components/
│   │   └── PerfumeBottle.tsx
│   │
│   ├── data/
│   │   └── fragrances.json
│   │
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Discover.tsx
│   │   ├── Finder.tsx
│   │   ├── Recommendation.tsx
│   │   ├── Collection.tsx
│   │   └── Profile.tsx
│   │
│   └── utils/
│       └── recommendation.ts
│
├── docs/
│   ├── DATA_SOURCES.md
│   └── FRAGRANCE_CATALOG.md
│
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
└── vite.config.ts
```

### Wichtige Dateien

| Datei | Zweck |
|---|---|
| `src/App.tsx` | Steuert die Navigation, Views und Favoriten |
| `src/data/fragrances.json` | Enthält die 200 Duftdaten |
| `src/utils/recommendation.ts` | Berechnet die Duftempfehlung |
| `src/components/PerfumeBottle.tsx` | Zeigt echte Remote-Bilder oder den SVG-Ersatzflakon |
| `src/pages/` | Enthält die einzelnen App-Seiten |
| `docs/DATA_SOURCES.md` | Enthält Hinweise zu Datenquellen und Bildern |
| `docs/FRAGRANCE_CATALOG.md` | Enthält den Duftkatalog |

---

## 8. Daten und Empfehlungslogik

### Duftdaten

Die Duftdaten liegen lokal in folgender Datei:

```text
src/data/fragrances.json
```

Pro Duft werden unter anderem gespeichert:

- ID
- Duftname
- Marke
- Beschreibung
- Duftstil
- Kopfnoten
- Herznoten
- Basisnoten
- Kategorie
- Stimmung
- Wetter
- Anlass
- Tags
- Bild-URL
- Farben für den SVG-Ersatzflakon

Die Anwendung verwendet 200 reale Duftbeispiele.

### Bilder

Die App speichert keine fremden Produktbilder direkt im Repository. Sie verwendet Remote-Bild-URLs aus den dokumentierten Datenquellen.

Falls ein Bild nicht erreichbar ist, zeigt `PerfumeBottle.tsx` automatisch eine eigene SVG-Flakonillustration. Dadurch bleibt die App auch bei fehlenden Bildern nutzbar.

### Empfehlungslogik

Die Empfehlungslogik befindet sich in:

```text
src/utils/recommendation.ts
```

Jeder Duft erhält Punkte:

- passende Stimmung: +2 Punkte
- passendes Wetter: +2 Punkte
- passender Anlass: +2 Punkte

Der Duft mit der höchsten Punktzahl wird als Hauptempfehlung ausgegeben. Die zwei nächstbesten Düfte werden als Alternativen angezeigt.

Die Zuordnung von Stimmung, Wetter und Anlass ist eine eigene Scentoria-Regellogik. Sie ist keine offizielle Empfehlung der jeweiligen Marke.

---

## 9. Bekannte Grenzen

Scentoria ist ein MVP. Folgende Punkte sind bewusst noch nicht umgesetzt:

- keine Datenbank
- keine Anmeldung oder Registrierung
- keine dauerhafte Speicherung von Favoriten
- kein echter Warenkorb und keine Kauf-Funktion
- keine externe Duft-API
- keine echten Benutzerkonten
- keine Social-Media-Funktionen

Favoriten werden mit React `useState` gespeichert. Nach einem Neuladen der Seite werden sie auf den Startwert zurückgesetzt.

Für eine spätere Weiterentwicklung könnten eine Datenbank, Benutzerkonten, eine lizenzierte Duft-API und eigene oder klar lizenzierte Produktbilder ergänzt werden.

---

## 10. Fehlerbehebung

### `npm` oder `node` wird nicht erkannt

Node.js ist nicht installiert oder wurde nach der Installation noch nicht neu geöffnet. Installiere Node.js 20 oder neuer und starte das Terminal erneut.

### Port 3000 ist bereits belegt

Beende den anderen Prozess auf Port 3000 oder starte Vite mit einem anderen Port:

```bash
npx vite --port 3001
```

Danach öffnest du:

```text
http://localhost:3001
```

### Externe Flakonbilder laden nicht

Das ist kein Fehler, der die App stoppt. Scentoria zeigt automatisch den eigenen SVG-Flakon als Ersatz an.

### Nach `npm install` gibt es Fehler

Lösche den Ordner `node_modules` und die Datei `package-lock.json`. Führe danach erneut aus:

```bash
npm install
```

---

## Quellen

Hinweise zu Duftdaten, Remote-Bildern und Lizenzfragen befinden sich in:

- `docs/DATA_SOURCES.md`
- `docs/FRAGRANCE_CATALOG.md`

---

## Team

- **Redon:** Design, Wireframes, visuelle Umsetzung und Prototyp
- **Luca:** Recherche, Dokumentation, Planung und Testing

---

**Scentoria – Dein Duft. Dein Moment.**
