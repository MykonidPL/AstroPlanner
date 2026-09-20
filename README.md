# AstroPlanner

Mobilny planner i dziennik projektów astrofotograficznych DSO.

## Aktualna wersja

**v0.10.4.2 — Public Beta**

AstroPlanner pomaga prowadzić wielonocne projekty astrofotograficzne: planować cele, oceniać warunki dla wybranej nocy, zapisywać wykonane sesje, śledzić postęp integracji oraz utrzymywać historię użytego sprzętu i materiału kalibracyjnego.

## Aplikacja

https://mykonidpl.github.io/AstroPlanner/

## Główne obszary

- **Projekty** — aktywne, planowane i zakończone cele wraz z postępem integracji.
- **Planner** — wysokość obiektu, kulminacja, użyteczne okno, tryb nocy, Księżyc i lokalizacja/GPS.
- **Dziennik** — historia wykonanych sesji pogrupowana według projektów.
- **Sprzęt** — własna biblioteka teleskopów, kamer, korektorów, filtrów, profili setupów i materiału kalibracyjnego.

AstroPlanner działa jako PWA i jest projektowany przede wszystkim do wygodnej obsługi na telefonie oraz pracy terenowej.

## Dane i backup

Dane użytkownika są przechowywane lokalnie w pamięci przeglądarki/PWA. Aktualizacja aplikacji nie powinna usuwać zapisanych projektów, sesji ani sprzętu, ale wyczyszczenie danych witryny może spowodować ich utratę.

W aplikacji dostępny jest eksport i import kopii zapasowej JSON. Przy regularnym korzystaniu zalecane jest okresowe wykonywanie backupu.

## Sprzęt w wersji publicznej

Nowa instalacja startuje z pustą biblioteką teleskopów, kamer, filtrów, korektorów i profili. Każdy użytkownik dodaje własny sprzęt. Aktualizacja nie usuwa sprzętu już zapisanego lokalnie w przeglądarce.

## Historia zmian

### v0.10.4.2

- zablokowano zapisywanie nowych sesji bez przypisanego projektu,
- obiekt i współrzędne sesji są teraz zawsze pobierane z projektu, a zapis jest blokowany, jeśli projekt nie ma poprawnego targetu,
- poprawiono parser RA/Dec: puste pola nie są już interpretowane jako RA 0h / Dec 0°,
- brak poprawnych współrzędnych celu oznacza brak obliczeń danych Księżyca,
- dodano jednorazową migrację czyszczącą błędnie wyliczone dane Księżyca w starszych sesjach bez poprawnych współrzędnych celu.

### v0.10.4.1

- naprawiono błąd Plannera, który mógł wykonywać obliczenia dla starych współrzędnych mimo braku aktualnie wybranego obiektu,
- Planner nie oblicza planu nocy bez świadomie wybranego celu i pokazuje komunikat „Wybierz obiekt, aby obliczyć plan nocy”,
- unieważnienie celu czyści poprzednie wyniki Plannera, wykres oraz osierocone współrzędne celu,
- zapis preferencji nie utrwala już współrzędnych jako celu, jeśli żaden obiekt nie jest wybrany.

### v0.10.4

- rozdzielono **obiekt astronomiczny** od dowolnej **nazwy projektu**,
- projekt wymaga świadomie wybranego obiektu z katalogu albo własnego obiektu,
- data wybrana w Plannerze może zostać przeniesiona do terminu nowego planowanego projektu,
- rozpoczęcie nowego planowania resetuje datę do bieżącego dnia,
- dodano przycisk **Dzisiaj** przy wyborze daty,
- status i dopasowanie Master Dark przeniesiono do sekcji **Kalibracja**.

### v0.10.3

- poprawiono responsywność wykresu Plannera na ekranach mobilnych i HiDPI,
- dodano automatyczny zapis roboczy formularza sesji oraz jego przywracanie po ponownym uruchomieniu aplikacji,
- dodano jednoznaczny komunikat o braku nocy astronomicznej,
- rozszerzono obsługę katalogu obiektów w trybie offline,
- poprawiono komunikaty błędów geolokalizacji i możliwość ręcznego wpisania współrzędnych,
- dodano wyraźne ostrzeżenie o konieczności wykonywania backupu danych lokalnych.

### v0.10.2

- dodano planowany miesiąc/rok oraz opcjonalną dokładną datę dla planowanych projektów,
- dodano chronologiczne sortowanie planowanych projektów,
- rozbudowano szczegóły sesji w Dzienniku przy zachowaniu krótkiego widoku domyślnego,
- poprawiono obsługę darków sesyjnych oraz Master Dark / Master Dark Flat,
- dodano historyczny snapshot użytego materiału kalibracyjnego,
- poprawiono aktywowanie planowanego projektu dopiero po faktycznym zapisie pierwszej sesji,
- poprawiono integralność danych GPS i deduplikację obiektów katalogowych,
- usunięto pozostałe godziny dziesiętne z interfejsu.

### v0.10.1

- naprawiono krytyczny błąd inicjalizacji powodujący brak działania interfejsu po uruchomieniu v0.10.0.

### v0.10.0

- uporządkowano workflow i statusy projektów,
- dodano planowane projekty i archiwum,
- Planner przestał wymagać wyboru projektu,
- poprawiono przeglądanie katalogów na ekranach dotykowych,
- dodano ocenę widoczności obiektu oraz rozbudowane informacje o Księżycu,
- wprowadzono czytelny format czasu h/min,
- dodano zwijane sesje w Dzienniku,
- rozróżniono kamery astro oraz DSLR/mirrorless z Gain/ISO,
- dodano edycję sprzętu i poprawki GPS,
- zmieniono ikonę aplikacji na aktualne logo AstroPlannera.

### v0.9.4

- poprawiono usuwanie projektów z historią,
- projekt z zapisanymi sesjami można zachować jako ukończony albo trwale usunąć razem z przypisanymi sesjami.

## Copyright

AstroPlanner © 2026 Mykonid. Kod źródłowy nie jest udostępniany na licencji open source. Szczegóły: [LICENSE](LICENSE).
