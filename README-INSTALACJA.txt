AstroPlanner v0.14 — instalacja i aktualizacja produkcji

Repozytorium produkcyjne:
MykonidPL/AstroPlanner

Źródło wydania:
- v0.14 zostało promowane z przetestowanego repo R&D MykonidPL/AstroPlanner-v014-RD,
- stan źródłowy R&D: commit 70f6b91f4e9cef9d109e6e227137c93b6123de0b,
- baza produkcyjna przed promocją: commit 475b010e296a35d7eb6e3d702eb5960932649644 (v0.13.1).

WAŻNE PRZED AKTUALIZACJĄ
1. Otwórz obecną produkcję i wykonaj Eksport JSON.
2. Zachowaj kopię pliku poza aplikacją.
3. Nie czyść danych witryny/PWA przed testem nowej wersji.

Aktualizacja repozytorium przez GitHub
1. Otwórz repo MykonidPL/AstroPlanner, branch main.
2. Wgraj zawartość paczki bezpośrednio do root repozytorium — bez dodatkowego folderu nadrzędnego.
3. Pliki o tych samych nazwach zastąp; nowe moduły dodaj.
4. Zrób jeden commit wydania, np. „Release AstroPlanner v0.14”.
5. Poczekaj na publikację GitHub Pages i uruchom Settings / Pages -> Visit site.
6. W razie starego UI zamknij i ponownie uruchom PWA/przeglądarkę; service worker v0.14 ma własny cache `astroplanner-v014-raster-pan1`.

Kompatybilność danych
- v0.14 zachowuje produkcyjne klucze localStorage używane przez v0.13.1; projekty, sesje, sprzęt, profile, lokalizacje, darki i ustawienia nie wymagają migracji,
- snapshoty DSS2 nadal używają IndexedDB `astroplanner-project-snapshots`,
- cache katalogów pozostaje `astroplanner-catalog-v06` z przypiętym źródłem katalogowym,
- dane testowego repo R&D używają osobnej przestrzeni `aprd014:` i nie są automatycznie kopiowane do produkcji; jeśli w R&D istnieją dane potrzebne w produkcji, przenieś je kontrolowanie przez Eksport/Import JSON.

Nowe pliki v0.14
- bortle-indicator.js
- filter-profiles.js
- recommendation-engine.js
- target-metadata.js

Smoke test po publikacji
1. Start pokazuje logo, AstroPlanner i wersję v0.14; dolna nawigacja ma dokładnie: Planer / Projekty / Dziennik / Sprzęt.
2. Istniejące projekty, sesje i sprzęt z v0.13.1 są nadal widoczne.
3. Planner: wybór celu -> DSS2 -> FOV / rotacja / mozaika działa.
4. Warunki nocy pokazują Bortle ≈ X dla zapisanej lokalizacji, ręcznych współrzędnych i GPS, gdy dane atlasu są dostępne.
5. Sekcja Co fotografować? pokazuje ranking planowanych/aktywnych projektów bez Archiwum.
6. Analiza pokazuje Noc / Kulminacja / Księżyc / Score; Score jest zgodny z rankingiem dla tych samych warunków.
7. Zapis projektu, dodanie/edycja/usunięcie sesji, Dziennik i Sprzęt działają bez regresji.
8. Eksport JSON zapisuje wersję `0.14`; testowy import kopii działa.
9. Po ponownym otwarciu PWA dane produkcyjne pozostają dostępne.

Rollback
- jeśli po publikacji pojawi się krytyczna regresja, przywróć pliki z commita 475b010e296a35d7eb6e3d702eb5960932649644 i ponownie opublikuj Pages,
- nie usuwaj danych witryny podczas rollbacku; model danych v0.14 pozostaje zgodny z v0.13.1.
