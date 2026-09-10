# WalkWahr

PWA zum manuellen Tracken von Touren zu Fuß, mit dem Rad oder Auto –
mit Live-Karte, Wetter-Schnappschuss, Verlauf und Statistik. Alle
Daten bleiben ausschließlich lokal auf dem Gerät.

## Wichtigstes Prinzip

Das Tracking startet **ausschließlich** durch expliziten Tipp auf
„Start" und endet durch expliziten Tipp auf „Tour beenden". Es gibt
kein automatisches Hintergrund-Tracking.

## Installation (GitHub Pages)

1. Alle Dateien dieses ZIPs direkt (ohne Unterordner) in ein
   GitHub-Repository laden.
2. GitHub Pages für den Branch aktivieren.
3. Auf dem iPhone die Seite in Safari öffnen und über
   „Zum Home-Bildschirm" installieren.

## Technischer Stand

- Reines HTML/CSS/JavaScript, keine Build-Schritte nötig
- Karte: Leaflet + OpenStreetMap-Standardkacheln (kein API-Key,
  keine Registrierung, kein Nutzungslimit; kein SLA garantiert)
- Wetter: Open-Meteo (wie in HimmelsWahr)
- Speicherung: ausschließlich localStorage, kein Server, kein Konto
- Service Worker cached nur die App-eigenen Dateien, keine Live-Daten

## Änderungen in v44

- **Hinweis auf ungefähre Lage**: Nominatim-Suchtreffer ohne erfasste
  Hausnummer (`addressdetails=1` ausgewertet) werden in der
  Ergebnisliste mit „≈ ungefähre Lage – keine Hausnummer in den
  Kartendaten erfasst" markiert. Der Hinweis bleibt sichtbar,
  solange das Ziel aktiv ist, und wird beim Speichern als Favorit
  mit übernommen (★-Eintrag mit „≈"-Kennzeichen). Ziele per
  Kartentipp gelten weiterhin als exakt, da hier keine Geocodierung
  stattfindet.

## Änderungen in v43

- **Favoriten für Navigationsziele**: Ein gewähltes Navigationsziel
  kann per Stern-Button gemerkt werden (Name frei wählbar). Gemerkte
  Ziele erscheinen als eigene Liste über der Adresssuche und lassen
  sich mit einem Tipp direkt wieder als Ziel setzen. Einzelne
  Favoriten lassen sich löschen (mit Rückgängig-Möglichkeit).
  Speicherung ausschließlich lokal (`wk-navfavorites`), keine
  Übertragung an Dritte – rechtlich durch dieselbe TDDDG-§25-
  Ausnahme wie die übrigen lokalen Daten gedeckt.

## Änderungen in v36

- **Komplettes optisches Redesign** über alle Seiten: durchgängiges
  Mitternachtsblau statt Petrol/Türkis, dezente Kachel-Optik für
  Karten/Buttons/Filter statt kräftiger Farbverläufe, ruhigere,
  gut lesbare Systemschrift (weiterhin keine Google Fonts, nur
  native System-Schriftarten) statt der bisherigen kräftigen
  ui-rounded-Optik.
- **Neue Startseite mit Kachel-Schnellzugriff**: Über der
  „Neue Tour"-Karte liegt jetzt eine dezente 3er-Kachelreihe
  (Verlauf/Statistik/Info) für schnelle Navigation.
- **Alle App-Icons neu gestaltet** (Startbildschirm, Titel-Icon,
  maskable-Varianten für Android) – gleiches Routen-Motiv wie
  bisher, jetzt in Mitternachtsblau; komplett eigenständig erstellt,
  keine fremden Marken oder lizenzpflichtigen Bildquellen.
- Farbcode-Anpassungen betreffen ausschließlich Optik (CSS-Variablen,
  Icon-Farben, Kartenmarker-/Routenfarben); an Funktion, Datenhaltung
  und den rechtlichen Grundlagen ändert sich nichts.

## Änderungen in v30

- Abbiege-Signal während der Navigation: ca. 100 m vor der nächsten
  Richtungsänderung ertönt ein kurzer, sanfter Ton (per Web Audio API
  erzeugt, keine Datei nötig, funktioniert offline) und zusätzlich
  wird für 5 Sekunden ein halbtransparenter Richtungspfeil über der
  Karte eingeblendet. Steht die nächste Richtungsänderung bereits
  näher bevor (z. B. gleich zu Beginn der Navigation), löst das
  Signal sofort aus, statt auf die 100 m zu warten.
- Verlauf: Tour-Detailkarte robuster gemacht (ganze Zeile in der
  Liste antippbar statt nur Titel/Icon, zusätzliche verzögerte
  Neuberechnung der Kartengröße), damit sich aufgezeichnete Routen
  zuverlässig öffnen lassen.

## Änderungen in v29

- Navigation startet nicht mehr automatisch, sobald ein Ziel gewählt
  ist: nach Adresssuche bzw. Antippen auf der Karte erscheint jetzt
  ein eigener „▶️ Start"-Button in der Zielkarte. Distanz/Route werden
  schon vorab als Vorschau angezeigt, aber Kartendrehung in
  Fahrtrichtung, Tempo-Zoom und (bei reiner Navigation ohne
  gleichzeitige Tour-Aufzeichnung) das Display-Wachhalten (Wake Lock)
  sowie die GPS-Dauerabfrage starten erst mit diesem Tipp. Das spart
  während der reinen Zielauswahl Akku und macht den Start-Zeitpunkt
  eindeutig. Bei gleichzeitiger Tour-Aufzeichnung läuft die
  GPS-Abfrage weiterhin ab Sessionstart, da die Tour ohnehin
  durchgehend Standortdaten braucht.
- Der Kartenvergrößern-Button (⤢) in der Live-Navigation saß bislang
  etwas zu weit von der Ecke entfernt und lag optisch noch im
  Kartenbild; er sitzt jetzt bündig oben rechts in der Kartenecke
  (wie schon in der Tour-Zusammenfassung).
- Rechtscheck der Navigations-Funktion (Nominatim/OSRM): Datenschutz-
  erklärung ergänzt um die konkrete Rechtsgrundlage (Art. 6 Abs. 1
  lit. b/f DSGVO) für Standort- und Koordinatenübermittlung, die
  bislang fehlende TDDDG-§25-Ausnahme für localStorage sowie einen
  Hinweis zur Angemessenheitsbeschluss-Lage bei Nominatim (Betreiber
  im Vereinigten Königreich). Abschnitt „Standortdaten" deckt jetzt
  explizit auch reine Navigation (ohne Tour-Aufzeichnung) ab, inkl.
  des neuen späteren GPS-Starts erst nach Tippen auf „▶️ Start".

## Änderungen in v25

- **Zielführung jetzt explizit an das Setzen eines Ziels gekoppelt**: Drehung
  der Karte in Fahrtrichtung und geschwindigkeitsabhängiges Reinzoomen
  laufen nicht mehr durchgehend im Hintergrund, sondern erst ab dem
  Moment, in dem ein Navigationsziel gesetzt wird – vorher (bloßes Tracken
  oder reine Zielauswahl) bleibt die Karte normal, nordoben ausgerichtet.
  Beim Beenden der Navigation ("Neues Ziel" bzw. Tour-/Navigationsende)
  wird die Karte automatisch wieder zurückgesetzt.
- **Positions-Pfeilspitze statt Punkt während der Zielführung**: Der
  eigene Standort wird während aktiver Navigation als kleine, in
  Fahrtrichtung ausgerichtete Pfeilspitze dargestellt (gegenläufig zur
  Kartendrehung, zeigt dadurch immer "nach oben" auf dem Bildschirm – wie
  bei klassischen Navigations-Apps). Außerhalb der Navigation bleibt es
  beim bisherigen farbigen Punkt.
- **Geschwindigkeitsabhängiges Reinzoomen**: Bei aktiver Zielführung
  passt sich der Kartenzoom automatisch ans Tempo an (näher dran bei
  langsamer Fortbewegung, mehr Übersicht bei höherem Tempo), gedämpft
  mit Mindestabstand zwischen zwei Zoomwechseln, damit die Karte nicht
  bei jedem GPS-Update springt. Geschwindigkeitsquelle: bevorzugt das
  vom Gerät gelieferte GPS-Tempo, ersatzweise Berechnung aus
  aufeinanderfolgenden Positionspunkten.
- **Routenlinie überarbeitet**: deutlich dünner (Strichstärke 3 statt 5)
  und in Mitternachtsblau statt Lila, für bessere Lesbarkeit auf der
  Karte neben Tour-Route und Zielmarker.

## Änderungen in v24

- **Echte Straßen-Navigation (OSRM)**: Nach dem Setzen eines Ziels
  berechnet WalkWahr jetzt eine echte Straßenroute passend zum Modus
  (Gehen/Rad/Auto) über den öffentlichen OSRM-Demo-Server
  (router.project-osrm.org, FOSSGIS) – kostenlos, ohne API-Key, ohne
  Registrierung. Die Route wird als durchgezogene Linie auf der Karte
  angezeigt, dazu Restdistanz, geschätzte Ankunftszeit und ein
  Abbiege-Hinweis zum nächsten Manöver (z. B. „Links abbiegen auf
  Musterstraße"). Angefragt wird nur einmal beim Zielsetzen sowie bei
  spürbarer Abweichung von der Route (mindestens 20 Sekunden Abstand
  zwischen zwei Anfragen), nicht bei jedem GPS-Punkt.
- **Automatischer Fallback**: Ist der OSRM-Dienst nicht erreichbar
  (z. B. offline), zeigt WalkWahr wie bisher nur Richtungspfeil und
  Luftlinien-Entfernung zum Ziel an, komplett ohne weitere Anfragen.
- Damit ist die Navigation nicht mehr komplett offline, sobald ein
  Ziel gesetzt wird (siehe Datenschutz, Abschnitt 6) – wer das
  bewusst vermeiden möchte, kann die Navigations-Funktion einfach
  nicht nutzen (reines Tracking bleibt wie gehabt vollständig offline).

## Änderungen in v23

- **Zieladresse eingeben**: In der Navigation lässt sich das Ziel jetzt
  wieder per Adresssuche eingeben (zusätzlich zum Antippen auf der Karte).
  Nutzt Nominatim (OpenStreetMap) – kostenlos, ohne Registrierung, ohne
  API-Key. Die Suche wird bewusst nur bei Klick/Enter ausgelöst, nie bei
  jedem Tastenanschlag, entsprechend der Nominatim-Nutzungsbedingungen;
  Attribution ist direkt bei der Suche sichtbar. Diese Anfrage ist der
  einzige externe Zugriff der Navigations-Funktion – wer das vermeiden
  möchte, tippt das Ziel stattdessen direkt auf der Karte an.

## Änderungen in v22

- **Vorab-Entscheidung statt Umschalten während der Fahrt**: Auf dem
  Start-Tab wird jetzt zuerst gewählt, ob eine Tour aufgezeichnet oder
  navigiert werden soll. Bei „Navigation" folgt eine zweite Wahl: mit
  oder ohne gleichzeitige Aufzeichnung. Diese Entscheidung lässt sich
  bewusst nicht mehr während der laufenden Session ändern.
  - **Aufzeichnen**: wie bisher, keine Navigation.
  - **Navigation mit Aufzeichnung**: volle Tour-Aufzeichnung wie bisher,
    zusätzlich von Anfang an aktive Navigation (Ziel wird direkt nach
    dem Start auf der Karte angetippt).
  - **Navigation ohne Aufzeichnung**: schlanke Ansicht nur mit Karte,
    Richtungspfeil und Entfernung zum Ziel – keine Strecke/Zeit/Tempo
    wird erfasst, am Ende wird nichts gespeichert.
- Der Zentrieren-Button (🎯) und der bisherige Umschalt-Button für
  Navigation (🧭 während der laufenden Ansicht) sind entfallen, da die
  Navigations-Entscheidung jetzt vorab getroffen wird.

## Änderungen in v21

- **Einfache Navigation (Luftlinie)**: Während einer laufenden Tour über
  das neue 🧭-Symbol auf der Karte ein Ziel auf der Karte antippen. Danach
  zeigt ein Pfeil die Richtung zum Ziel relativ zur eigenen
  Bewegungsrichtung sowie die Luftlinien-Entfernung, dazu eine gestrichelte
  Linie zum Ziel auf der Karte. Bewusst **keine echte Straßen-Routenführung**
  und **keine Adresssuche** (beides würde einen externen Dienst
  voraussetzen) – die Navigation läuft komplett offline, ausschließlich mit
  den ohnehin schon vorhandenen GPS-Daten, ganz ohne externe Zugriffe.
  Während des Antippens wird die Karte kurz "nordoben" ausgerichtet, damit
  der Tipppunkt exakt der Kartenposition entspricht (die sonst zur
  Fahrtrichtung gedrehte Live-Karte würde die Tippkoordinate sonst
  verfälschen). Bei Ankunft (< 30 m) erscheint ein Hinweis samt kurzer
  Vibration.

## Änderungen in v20

- **Automatisches Update-Handling**: Bisher konnte es passieren, dass
  auf dem Gerät trotz neuer Version noch der alte, im Hintergrund
  weiterlaufende App-Stand angezeigt wurde (Ursache vermutlich für die
  wiederholt gemeldete "alte Karte kommt nicht"-Beobachtung). Die App
  erkennt jetzt, wenn eine neue Version übernommen hat, und lädt sich
  in dem Fall automatisch einmal neu.
- **Live-Tempo springt beim Stehenbleiben jetzt auf 0 km/h**: Bisher
  blieb die Geschwindigkeitsanzeige während der Aufzeichnung auf dem
  letzten gemessenen Wert stehen, wenn sich Auto/Rad/Fußgänger nicht
  mehr bewegten (z. B. an einer Ampel), weil in diesem Fall kein neuer
  Wert mehr geschrieben wurde. Jetzt wird das Tempo bei erkanntem
  Stillstand aktiv auf 0 km/h gesetzt.

## Änderungen in v13

- **Notizen als Marker auf der Karte**: In Zusammenfassung und
  Tour-Detail erscheinen deine während der Tour angelegten Notizen
  jetzt als 📍-Marker an ihrem tatsächlichen Standort – antippen zeigt
  Titel, Text und Foto in einer Sprechblase.
- **Tour-Titel nachträglich bearbeiten**: In der Detailansicht lässt
  sich der Name einer gespeicherten Tour jederzeit über „Bearbeiten"
  ändern (z. B. wenn beim Speichern kein Titel vergeben wurde).
- **Monatsstatistik**: Neues Balkendiagramm im Statistik-Tab zeigt die
  gefahrene/gelaufene Strecke der letzten 6 Monate auf einen Blick,
  ergänzend zum Aktivitäts-Kalender.
- **Wetter-Icons**: Die Wetteranzeige (Live-Tracking, Zusammenfassung,
  Tour-Detail) zeigt jetzt zusätzlich zum Text ein passendes
  Wetter-Symbol statt reinem Text.

## Änderungen in v12

- **App-im-Hintergrund-Lücken erkannt**: Wird die App gesperrt oder in
  den Hintergrund gewechselt (z. B. durch aktives Sperren des Displays
  oder App-Wechsel), unterbricht das Betriebssystem technisch bedingt
  die Standorterfassung. WalkWahr erkennt eine solche Lücke jetzt beim
  Zurückkehren in den Vordergrund (ab ca. 15 Sekunden Zeitsprung) und
  fragt aktiv: „Als Pause werten" (Zeit zählt nicht zur Tourdauer) oder
  „Normal zählen" (Zeit zählt weiter). Das automatische Abdunkeln durch
  den Wake Lock (v9) bleibt davon unberührt – diese Abfrage betrifft nur
  Fälle, in denen du selbst sperrst oder die App wechselst.
- **Lücken werden auf der Karte gestrichelt dargestellt** – in der
  Live-Karte, der Zusammenfassung und der Tour-Detailansicht. So ist
  sofort erkennbar, welche Streckenabschnitte echte GPS-Messpunkte sind
  und welche nur eine grobe Gerade zwischen zwei Punkten vor und nach
  der Lücke darstellen.
- Datenschutzerklärung (Abschnitt 3) entsprechend ergänzt: Es werden
  dabei keine zusätzlichen Standortdaten erhoben, nur der ohnehin schon
  vorhandene Zeitstempel ausgewertet.

## Änderungen in v11

- **Favoriten**: Touren im Verlauf mit ★ markieren (in der Tour-Detailansicht
  oben auf der Karte), eigener Filterchip „★ Favoriten" im Verlauf.
- **Sortierung im Verlauf**: Neueste/Älteste/Längste/Kürzeste zuerst, per
  Auswahlmenü über der Tourenliste.
- **Routen-Miniaturen im Verlauf**: Jede Tour zeigt eine kleine
  Streckenvorschau (reines SVG aus den gespeicherten Punkten, keine
  zusätzlichen Kartenkacheln nötig).
- **Aktivitäts-Kalender** im Statistik-Tab: GitHub-artige Heatmap der
  letzten 12 Wochen, zeigt auf einen Blick, an welchen Tagen du unterwegs
  warst (berücksichtigt den gewählten Modus-Filter).
- **Optisch:** Wochenziel auf dem Start-Tab jetzt als Fortschrittsring statt
  Balken; jeder Modus (Gehen/Rad/Auto) hat jetzt eine eigene Akzentfarbe,
  die sich durch Karten, Routen, Miniaturen und Icons zieht statt überall
  derselben Farbe.

## Änderungen in v10

- **Sicherung als JSON-Datei** (Info-Tab): „Sicherung exportieren" legt
  alle Touren als Datei an, „Sicherung importieren" spielt eine solche
  Datei wieder ein (neue Touren werden ergänzt, keine Duplikate).
  Wurde in v8 auf ausdrücklichen Wunsch entfernt und jetzt auf
  ausdrücklichen Wunsch wieder eingebaut.
- **Speichern/Teilen über die Teilen-Funktion des Geräts** (Web-Share-API)
  statt eines reinen Download-Links: Auf dem iPhone öffnet ein reiner
  Download-Link in einer installierten PWA oft nur eine neue
  Browser-Ansicht statt wirklich zu speichern. Über „Teilen" lässt sich
  die Datei zuverlässig in der Dateien-App ablegen oder direkt per
  Mail/Messenger verschicken. Ist die Teilen-Funktion nicht verfügbar
  (z. B. am Desktop), greift automatisch der klassische Download.
- **Einzelne Tour als GPX exportieren** (Tour-Detail) – zur Weiterverwendung
  in anderen Karten-/Sport-Apps.
- **Tour teilen** (Tour-Detail) – verschickt eine kurze Textzusammenfassung
  (Strecke, Zeit, Ø-Tempo) über die Teilen-Funktion, z. B. per WhatsApp.
- Datenschutzerklärung um Abschnitt 5a („Sicherung, Export und Teilen")
  ergänzt, neue localStorage-Schlüssel aus v9 in Abschnitt 5 ergänzt.

## Änderungen in v9

- **Display bleibt während einer Tour an** (Wake Lock API): kein
  Abdunkeln/Sperren mehr mitten in der Aufzeichnung. Wird beim
  manuellen Pausieren wieder freigegeben und beim Fortsetzen erneut
  angefordert; auf Geräten/Browsern ohne Unterstützung ändert sich
  nichts (Kernfunktion bleibt unberührt).
- **Automatische Pause bei Stillstand** (neue, standardmäßig
  ausgeschaltete Einstellung im Info-Tab): Wenn aktiviert, pausiert
  die App Zeit- und Streckenzählung automatisch, sobald länger keine
  Bewegung erkannt wird (z. B. an einer Ampel), und setzt bei
  Weiterbewegung automatisch fort. Gestartet und beendet wird eine
  Tour weiterhin **ausschließlich** durch deinen eigenen Tipp – daran
  ändert sich nichts.
- **Wochenziel** auf dem Start-Tab: eigene Zielstrecke pro Woche
  festlegen, Fortschrittsbalken färbt sich bei Erreichen grün.
- **Erfolge/Meilensteine** im Info-Tab (z. B. 10 Touren, 100 km
  gesamt, 7 Tage in Folge unterwegs) – rein motivierend, keine neuen
  Daten oder Berechtigungen nötig.
- **Kilometer-Splits**: In Zusammenfassung und Tour-Detail zeigt eine
  Liste die Zeit pro gelaufenem/gefahrenem Kilometer (grobe Schätzung
  anhand der aufgezeichneten Punkte, wie beim Höhenprofil).
- **Neue Bestleistung** wird beim Speichern einer Tour erkannt und in
  der Bestätigung angezeigt, wenn sie die bisher längste Tour dieses
  Modus übertrifft.
- **Löschen mit Rückgängig-Option** statt Sicherheitsabfrage: Eine
  gelöschte Tour lässt sich für einige Sekunden über eine Einblendung
  wiederherstellen, danach ist sie endgültig weg.
- Kleine Haptik-Rückmeldung (Vibration) bei Start, Pause/Fortsetzen
  und Tour-Ende, sofern das Gerät das unterstützt.

## Änderungen in v3

- **Kartenanbieter gewechselt:** MapLibre GL JS + OpenFreeMap wurde
  vollständig entfernt (das war vermutlich Ursache dafür, dass die
  Karte nicht lud – MapLibre benötigt WebGL, das auf manchen
  Geräten/Einstellungen nicht zur Verfügung steht). Jetzt: Leaflet
  1.9.4 + OpenStreetMap-Standardkacheln (tile.openstreetmap.org) –
  derselbe Kartenstandard wie in den anderen Wahr-Apps. Leaflet
  zeichnet rein über DOM/Canvas, ganz ohne WebGL.
- **Gänzlich neuer Aufbau:** feste Tab-Leiste unten (Start / Verlauf
  / Statistik / Info) statt Kachel-Startseite mit Zurück-Stapel.
  „Neue Tour" ist direkt auf dem Start-Tab (Moduswahl + Start-Button),
  kein separater Zwischenschritt mehr. Live-Tracking läuft jetzt als
  Vollbild mit Karte im Hintergrund und einer schwebenden Karte mit
  den Live-Werten darüber. Zusammenfassung und Tour-Detail öffnen als
  eigene Vollbild-Ansichten mit funktionierendem Zurück-Pfeil.
- Lizenz-/Datenquellen-Hinweise weiterhin Teil der Datenschutz­erklärung
  (Abschnitt 10) statt einer separaten, in der installierten App nicht
  schließbaren LICENSE.txt-Seite.
- Kartenaufbau bleibt vollständig von der Aufzeichnung entkoppelt und
  gegen Fehler abgesichert: Tracking läuft in jedem Fall, auch wenn
  die Karte selbst ausfallen sollte (Hinweistext statt leerer Box).
- Eigens gestaltetes App-Icon (statt Schuh-Emoji) für iOS und Android
  in allen Größen inkl. maskable-Varianten; gleiches Icon im Titel.

## Änderungen in v8

- **Export wieder entfernt** (GPX-Export einzelner Touren, Gesamt-Backup
  als JSON): auf ausdrücklichen Wunsch zurückgebaut, Backup soll
  ausschließlich lokal auf dem Gerät bleiben. Datenschutzerklärung
  entsprechend zurückgesetzt.
- **Höhenprofil ergänzt**: In Zusammenfassung und Tour-Detail zeigt eine
  kleine Grafik den Höhenverlauf, dazu Anstieg/Gefälle in Metern. Basis
  sind die GPS-Höhenwerte, die die ohnehin schon genutzte
  Standort-API liefert (keine neue Datenquelle). Die Werte werden
  geglättet und kleine Schwankungen als Messrauschen ignoriert, um die
  bekannte Ungenauigkeit von GPS-Höhenangaben auf dem iPhone (kein
  Barometer) abzufedern – ein deutlicher Hinweis dazu steht direkt bei
  der Grafik. Ist für eine Tour kein Höhenwert vorhanden, wird die
  Karte automatisch ausgeblendet statt eine leere/falsche Anzeige zu
  zeigen.

## Änderungen in v7

- **Zusammenfassung/Tour-Detail:** Karten dort lassen sich jetzt genau
  wie die Live-Karte über ⤢ auf Vollbild vergrößern und über ✕ wieder
  verkleinern (gleicher, jetzt korrekt funktionierender Stapel-Fix).
- Streckenlinie auf der Karte etwas dünner (Breite 5 → 4).
- GPS-Genauigkeit optimiert: Fixe mit schlechter Genauigkeit (>30 m)
  fließen nicht mehr in Strecke/Route ein (Marker bewegt sich trotzdem
  weiter, für flüssiges Live-Gefühl); die Mindestbewegung zwischen zwei
  gezählten Punkten ist jetzt an die jeweilige GPS-Ungenauigkeit
  gekoppelt (mind. 5 m, mehr bei unsicherem Signal) statt fest 3 m –
  reines GPS-Wackeln im Stehen zählt dadurch seltener fälschlich als
  Strecke.

## Noch offen / bewusst nicht enthalten

- Lieblingsrouten/Favoriten: noch nicht enthalten, wäre eine
  sinnvolle Erweiterung für eine der nächsten Versionen.
- Verknüpfung mit OrteWahr (z. B. „ruhige Orte" entlang der Route
  einblenden): bewusst nicht in Version 1, da dafür ein Datenaustausch
  zwischen den eigenständigen Apps nötig wäre.
- Gerätetest auf deinem iPhone steht noch aus (bisher Code-Analyse
  und Behebung der konkret gemeldeten Fehler).
