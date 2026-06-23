# Scentoria

Scentoria ist ein mobiler Web-Prototyp für Duftempfehlungen und die Verwaltung einer Duftkollektion. Die App hilft Nutzerinnen und Nutzern dabei, anhand von **Stimmung**, **Wetter** und **Anlass** einen passenden Duft zu finden.

Die Kernfunktion lautet:

> Stimmung wählen → Wetter wählen → Anlass wählen → Duftempfehlung erhalten

Der Prototyp enthält eine grosse Auswahl realer Duftbeispiele mit Marken, Duftnoten und einer eigenen lokalen Empfehlungslogik. Die Oberfläche basiert auf den erstellten Wireframes und ist vor allem für die Nutzung auf dem Smartphone gestaltet.

---

## Inhaltsverzeichnis

1. [Voraussetzungen](#1-voraussetzungen)  
2. [Projekt herunterladen](#2-projekt-herunterladen)  
3. [Installation](#3-installation)  
4. [Anwendung starten](#4-anwendung-starten)  
5. [Anwendung testen](#5-anwendung-testen)  
6. [Funktionsüberblick](#6-funktionsüberblick)  
7. [Technologie-Stack](#7-technologie-stack)  
8. [Projektstruktur](#8-projektstruktur)  
9. [Daten und Empfehlungslogik](#9-daten-und-empfehlungslogik)  
10. [Bekannte Grenzen](#10-bekannte-grenzen)  
11. [Fehlerbehebung](#11-fehlerbehebung)  

---

## 1. Voraussetzungen

Damit Scentoria auf einem anderen Computer gestartet werden kann, wird Folgendes benötigt:

- **Node.js 20 oder neuer**
- **npm** (wird mit Node.js installiert)
- Ein moderner Browser, z. B. Google Chrome, Microsoft Edge oder Firefox
- Eine Internetverbindung ist empfohlen, damit externe Flakonbilder geladen werden können

Die Anwendung benötigt keine Datenbank, keinen API-Key und keine Registrierung.

### Node.js und npm prüfen

Öffne ein Terminal im Projektordner und führe diese Befehle aus:

```bash
node -v
npm -v
```

Wenn bei beiden Befehlen eine Versionsnummer erscheint, sind die Voraussetzungen erfüllt.

Beispiel:

```text
v24.17.0
11.x.x
```

> **Hinweis für Windows PowerShell:**  
> Auf einzelnen Windows-Geräten kann PowerShell den Befehl `npm` blockieren. Dann erscheint eine Meldung, dass `npm.ps1` wegen der Ausführungsrichtlinie nicht geladen werden kann.  
> Das ist kein Fehler von Scentoria. Verwende in diesem Fall statt `npm` immer `npm.cmd`.

Beispiel:

```powershell
npm.cmd -v
```

---

## 2. Projekt herunterladen

### Variante A: Download über GitHub

1. Öffne das GitHub-Repository von Scentoria.
2. Wähle den gewünschten Branch aus.
3. Klicke auf den grünen Button **Code**.
4. Klicke auf **Download ZIP**.
5. Entpacke die ZIP-Datei in einen beliebigen Ordner.
6. Öffne ein Terminal direkt in diesem entpackten Projektordner.

### Variante B: Projekt mit Git klonen

```bash
git clone https://github.com/maximushelvetius-star/scentoria-prototype.git
cd scentoria-prototype
```

---

## 3. Installation

Installiere zuerst alle benötigten Pakete.

### Standard-Befehl

```bash
npm install
```

### Falls Windows PowerShell `npm` blockiert

```powershell
npm.cmd install
```

Der Vorgang kann beim ersten Mal einige Minuten dauern. Danach wird der Ordner `node_modules` automatisch erstellt.

> `node_modules` soll nicht in GitHub hochgeladen werden.

---

## 4. Anwendung starten

### Entwicklungsmodus starten

```bash
npm run dev
```

Falls PowerShell `npm` blockiert:

```powershell
npm.cmd run dev
```

Danach zeigt das Terminal eine lokale Adresse an, zum Beispiel:

```text
Local: http://localhost:3000/
```

Öffne diese Adresse im Browser:

```text
http://localhost:3000
```

Lass das Terminal offen, solange Scentoria läuft.

### Anwendung beenden

Drücke im Terminal:

```text
Ctrl + C
```

### Produktions-Build erstellen

Mit diesem Befehl prüfst du, ob die Anwendung für eine Veröffentlichung gebaut werden kann:

```bash
npm run build
```

Falls nötig:

```powershell
npm.cmd run build
```

Wenn der Befehl ohne Fehler endet, wird ein Ordner `dist` erstellt.

### TypeScript-Prüfung

```bash
npm run lint
```

Falls nötig:

```powershell
npm.cmd run lint
```

Dieser Befehl prüft den TypeScript-Code auf Fehler.

---

## 5. Anwendung testen

### Kurzer Funktionstest

1. Öffne die Home-Seite.
2. Klicke auf **Duft finden**.
3. Wähle eine Stimmung.
4. Wähle ein Wetter.
5. Wähle einen Anlass.
6. Klicke auf **Empfehlung finden**.
7. Prüfe, ob ein Hauptduft und passende Alternativen angezeigt werden.
8. Teste die Navigation unten: Home, Entdecken, Kollektion und Profil.
9. Teste in der Kollektion Suche, Filter und Favoriten.

### Feste Testfälle

Diese drei Fälle sind im Prototyp bewusst abgesichert:

| Stimmung | Wetter | Anlass | Erwartete Empfehlung |
|---|---|---|---|
| Selbstbewusst | Regen | Arbeit | Bleu de Chanel Eau de Parfum |
| Selbstbewusst | Sonnig | Date | XJ 1861 Naxos |
| Entspannt | Heiss | Freizeit | Acqua di Giò Profumo |

### Weitere Testpunkte

- Suche auf der Seite **Entdecken** nach einem Duftnamen, einer Marke, einer Duftnote oder einem Stil.
- Öffne **Meine Kollektion** und teste die Filter, z. B. **Frisch**, **Holzig** oder **Würzig**.
- Klicke auf ein Herz, um einen Duft als Favorit zu markieren oder zu entfernen.
- Prüfe, ob bei einem nicht geladenen externen Flakonbild automatisch eine eigene Flakonillustration angezeigt wird.
- Klicke auf **Hilfe & Support** und prüfe, ob ein Informationsfenster angezeigt wird.

---

## 6. Funktionsüberblick

### Home

Die Home-Seite ist der Einstieg in Scentoria. Sie enthält:

- Button **Duft finden**
- Direktzugriff auf die Kollektion
- Direktzugriff auf den Duft des Tages
- Hilfe & Support
- Bottom Navigation

### Duftfinder

Der Duftfinder ist die Kernfunktion der App.

Ablauf:

1. Stimmung wählen
2. Wetter wählen
3. Anlass wählen
4. Duftempfehlung erhalten

Die Stimmung wird über einen Slider von **Entspannt** bis **Selbstbewusst** gewählt. Das Wetter wird über ein Wetter-Rad gewählt. Beim Anlass stehen unter anderem Arbeit, Date, Freizeit und Abend zur Auswahl.

### Duftempfehlung

Nach der Auswahl zeigt Scentoria:

- einen empfohlenen Duft
- Marke und Duftstil
- Kopfnoten, Herznoten und Basisnoten
- passende Tags
- Alternativen
- ein Favoriten-Symbol
- die Möglichkeit, eine neue Situation zu wählen

### Entdecken

Die Seite **Entdecken** enthält:

- Suche nach Duftname, Marke, Note oder Stil
- Schnelleinstiege nach Stimmung und Wetter
- Duft des Tages
- Trendbereiche, z. B. aquatische Düfte, Sommerdüfte und Holznoten

### Meine Kollektion

Die Kollektion enthält reale Duftbeispiele und bietet:

- Suche nach Düften
- Filter wie Alle, Favoriten, Frisch, Holzig, Blumig und Würzig
- Öffnen von Duftdetails
- Favoriten setzen oder entfernen
- einen Hinweis bei **+ Duft hinzufügen**, da im MVP keine dauerhafte Speicherung vorhanden ist

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

## 7. Technologie-Stack

| Technologie | Einsatz in Scentoria |
|---|---|
| React 19 | Aufbau der Benutzeroberfläche mit Komponenten und States |
| TypeScript | Typsicherer Frontend-Code |
| Vite | Lokaler Entwicklungsserver und Produktions-Build |
| Tailwind CSS | Responsive Styling, Farben, Karten und Mobile-Layout |
| Motion | Weiche UI-Animationen |
| Lucide React | Icons für Navigation, Wetter, Favoriten und Aktionen |
| JSON | Lokale Speicherung der Duftdaten |
| GitHub | Versionierung und Bereitstellung des Codes |

Scentoria verwendet aktuell keine Datenbank und keine externe Duft-API. Die Duftempfehlung wird vollständig lokal berechnet.

---

## 8. Projektstruktur

```text
scentoria-prototype/
│
├── assets/                      # Zusätzliche Projektdateien aus Google AI Studio
├── src/
│   ├── App.tsx                  # Steuerung von Navigation und States
│   ├── main.tsx                 # React-Initialisierung
│   ├── index.css                # Globale Styles
│   │
│   ├── components/
│   │   └── PerfumeBottle.tsx    # Flakonbild oder SVG-Ersatz
│   │
│   ├── data/
│   │   └── fragrances.json      # Lokale Duftdaten
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
│       └── recommendation.ts    # Duftempfehlungslogik
│
├── .env.example
├── .gitignore
├── index.html
├── metadata.json
├── package.json
├── package-lock.json
├── tsconfig.json
└── vite.config.ts
```

### Wichtige Dateien

| Datei | Zweck |
|---|---|
| `src/App.tsx` | Steuert Navigation, Views und Favoriten |
| `src/data/fragrances.json` | Enthält die lokalen Duftdaten |
| `src/utils/recommendation.ts` | Berechnet die Duftempfehlung |
| `src/components/PerfumeBottle.tsx` | Zeigt externe Bilder oder einen SVG-Ersatzflakon |
| `src/pages/` | Enthält die einzelnen App-Seiten |
| `package.json` | Enthält die Befehle und Abhängigkeiten des Projekts |

---

## 9. Daten und Empfehlungslogik

### Duftdaten

Die Duftdaten liegen lokal in:

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

### Bilder

Die App speichert keine fremden Produktbilder direkt im Repository. Sie verwendet externe Bild-URLs.

Falls ein Bild nicht erreichbar ist, zeigt `PerfumeBottle.tsx` automatisch eine eigene SVG-Flakonillustration. Dadurch bleibt die App trotzdem funktionsfähig.

### Empfehlungslogik

Die Empfehlungslogik befindet sich in:

```text
src/utils/recommendation.ts
```

Jeder Duft erhält Punkte:

- passende Stimmung: +2 Punkte
- passendes Wetter: +2 Punkte
- passender Anlass: +2 Punkte

Der Duft mit der höchsten Punktzahl wird als Hauptempfehlung angezeigt. Die nächsten passenden Düfte werden als Alternativen angezeigt.

Die Zuordnung von Stimmung, Wetter und Anlass ist eine eigene Scentoria-Regellogik. Sie ist keine offizielle Empfehlung der jeweiligen Marke.

---

## 10. Bekannte Grenzen

Scentoria ist ein MVP. Folgende Punkte sind bewusst noch nicht umgesetzt:

- keine Datenbank
- keine Anmeldung oder Registrierung
- keine dauerhafte Speicherung von Favoriten
- keine Kauf- oder Zahlungsfunktion
- keine echten Benutzerkonten
- keine Social-Media-Funktionen
- keine externe Duft-API

Favoriten werden mit React `useState` verwaltet. Nach einem Neuladen der Seite werden sie zurückgesetzt.

Für eine spätere Version könnten eine Datenbank, Benutzerkonten, eine lizenzierte Duft-API sowie eigene oder klar lizenzierte Produktbilder ergänzt werden.

---

## 11. Fehlerbehebung

### `node` oder `npm` wird nicht erkannt

Node.js ist vermutlich nicht installiert oder das Terminal wurde nach der Installation nicht neu geöffnet.

1. Installiere Node.js 20 oder neuer.
2. Schliesse das Terminal komplett.
3. Öffne ein neues Terminal.
4. Prüfe nochmals:

```bash
node -v
npm -v
```

### PowerShell meldet einen Fehler mit `npm.ps1`

Verwende statt `npm` immer `npm.cmd`.

Beispiele:

```powershell
npm.cmd install
npm.cmd run dev
npm.cmd run build
npm.cmd run lint
```

Alternativ kann die Anwendung über die klassische Windows-Eingabeaufforderung `cmd` gestartet werden. Dort funktioniert `npm` normalerweise direkt.

### Port 3000 ist bereits belegt

Starte die Anwendung auf einem anderen Port:

```powershell
npx.cmd vite --port 3001
```

Danach öffnest du:

```text
http://localhost:3001
```

### Externe Flakonbilder laden nicht

Das stoppt die Anwendung nicht. Scentoria zeigt automatisch den eigenen SVG-Flakon als Ersatz an.

### Nach `npm install` gibt es Fehler

Lösche den Ordner `node_modules` und die Datei `package-lock.json`. Installiere danach die Pakete erneut:

```powershell
npm.cmd install
```

---

## Team

- **Redon:** Design, Wireframes, visuelle Umsetzung und Prototyp
- **Luca:** Recherche, Dokumentation, Planung und Testing

---

**Scentoria – Dein Duft. Dein Moment.**
