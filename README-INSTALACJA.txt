AstroPlanner v0.13.1 — hotfix produkcyjny

Pakiet jest przeznaczony do repozytorium MykonidPL/AstroPlanner i aktualizuje produkcyjny AstroPlanner v0.13 do v0.13.1.

Wgraj całą zawartość paczki do katalogu głównego repozytorium, zastępując pliki o tych samych nazwach. Nie twórz dodatkowych folderów.

Hotfix nie zmienia formatu danych. Projekty, sesje, sprzęt, lokalizacje, biblioteki kalibracji ani snapshoty DSS2 nie wymagają migracji.

Po commicie otwórz GitHub Pages -> Visit site i sprawdź:
1. Dziennik: każda karta sesji ma przyciski „Edytuj sesję” i „Usuń”.
2. Usunięcie sesji wymaga potwierdzenia i znika z historii/postępu projektu.
3. Projekty -> Archiwum: karta projektu ma bezpośredni przycisk „Usuń projekt”.
4. Projekt z sesjami otwiera bezpieczny modal przed trwałym usunięciem projektu i jego sesji.
5. Szybki smoke test: Planner/DSS2, snapshot projektu, formularz sesji i Sprzęt.

Service worker używa cache astroplanner-v0131. Po pierwszym wejściu po aktualizacji aplikacja może wykonać jeden automatyczny reload po przejęciu nowego service workera.
