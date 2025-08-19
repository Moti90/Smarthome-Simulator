# ibisimulator
Simulator for intelligent building installations 


IBISIMULATOR v1.8 – Udviklingsplan (roadmap)

Baseline: v1.7.3 (WebView2 • SPA med faner)

Mål for v1.8

Gøre simulatoren markant mere undervisningsegnet uden at kompromittere nuværende funktionalitet.

Tilføje onboarding, opgavebank og diagnosepanel samt styrke Flow-editoren.

Indføre evalueringsmode (auto-tests) og delbarhed/versionering.

Milepæle (sekventielle “pakker”)
M1 – Onboarding & Opgavebank (grundpakke)

Features

Guided Tour (product tour) med 6–8 tooltips.

“Kom godt i gang” side med 3 basisopgaver.

Opgavebank (10 øvelser) med metadata: sværhedsgrad, læringsmål, forventede testcases.

Import/Export af opgaver (.json) + Del-link (URL med base64 payload eller gist-id).

Akzeptkriterier

Bruger kan gennemføre “Ganglys basic” uden forhåndsviden.

Opgave kan eksporteres og åbnes på en anden maskine og er identisk.

M2 – Diagnosepanel & Log-forbedringer

Features

Diagnosepanel pr. regel: IF/AND-evaluering med aktuelle værdier (grøn/rød markering) + årsag til fejl (fx Lux 350 > 200 → AND=false).

“Explain why/why not” knap på THEN-aktion.

Log-tilstand: tidslinje pr. entitet (sensor/aktor/global), filtrering + CSV eksport.

Akzeptkriterier

Ved fejlslagen THEN vises mindst én konkret årsag (ikke generisk fejl).

CSV eksporterer mindst: timestamp, entity, old_value, new_value, rule_id.

M3 – Flow-editor 2.0 (wiresheet)

Features

Nye noder: Timer (on/off-delay), One-shot, Edge detect (rising/falling), Hysterese, Debounce, Scheduler (dage/perioder), Scene (preset af outputs), Gate (enable/disable), Math/Compare.

Snap-to-grid, multi-select, kopier/indsæt, auto-layout.

Validering: ugyldige forbindelser highlightes.

Akzeptkriterier

Kan bygge “Badventilator”-scenariet udelukkende i Flow.

Flow ↔ Blokregler-paritet: eksport/import giver funktionelt samme adfærd.

M4 – Evalueringsmode (lærer)

Features

Test Runner: definér testcases (input-sekvenser over tid) + forventet state.

Kør alle testcases og generér rapport (bestået/ikke bestået + diff pr. step).

Delning: opgave + tests i én pakke.

Akzeptkriterier

Mindst 5 testcases pr. opgave kan afvikles deterministisk.

Rapport kan gemmes (JSON) og genskabes.

M5 – Deling, versionering og PWA

Features

Versionering af projekter (v1, v2 …) + diff-view (regler/flow).

Delbare links (komprimeret payload) + valgfri cloud backend senere.

PWA: offline support (cache assets + sidste projekt), “Add to Home Screen”.

Akzeptkriterier

App kan startes offline og indlæser seneste projekt.

Version-diff viser mindst: tilføjede/slettede/ændrede regler og noder.
