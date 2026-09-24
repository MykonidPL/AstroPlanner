AstroPlanner v0.13 — aktualizacja produkcyjna

Pakiet jest przeznaczony do repozytorium MykonidPL/AstroPlanner i aktualizuje produkcyjny AstroPlanner v0.12 do v0.13.

Wgraj całą zawartość paczki do katalogu głównego repozytorium, zastępując pliki o tych samych nazwach. Nowe pliki ui-shell.css, ui-state.js i snapshot-store.js również muszą znaleźć się w root repozytorium. Nie twórz dodatkowych folderów.

Aktualizacja zachowuje dotychczasowe dane projektów, sesji, sprzętu, lokalizacji i bibliotek kalibracji zapisane w przeglądarce/PWA. Przed wdrożeniem warto wykonać Eksport JSON jako kopię zapasową.

Po commicie otwórz GitHub Pages -> Visit site i sprawdź:
1. Start oraz dolną nawigację.
2. Planner: pusty stan -> wybór obiektu -> DSS2 -> kadr/FOV.
3. Zapis projektu i rasterowy podgląd w Projekcie oraz Dzienniku.
4. Dodanie/edycję sesji.
5. Sprzęt i dane.
6. Zamknięcie i ponowne uruchomienie PWA.

Service worker używa cache astroplanner-v013. Po pierwszym wejściu po aktualizacji aplikacja może wykonać jeden automatyczny reload po przejęciu nowego service workera.
