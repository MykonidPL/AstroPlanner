# AstroPlanner

Mobilny planner i dziennik projektów astrofotograficznych DSO.

## Aktualna wersja

**v0.10.6.2 — Public Beta**

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

### v0.10.6.2

- dodano czytelny stan **„Cel osiągnięty ✓”** dla projektu po dojściu do 100% celu, bez automatycznej zmiany statusu projektu,
- dla aktywnego projektu po osiągnięciu celu dostępny jest bezpośredni przycisk **Oznacz jako ukończony**; decyzja o zamknięciu projektu nadal należy do użytkownika,
- panele mozaiki i składniki Planu materiału pokazują **„Cel osiągnięty ✓”** po dojściu do 100%; nadmiar nadal jest prezentowany jako czas dodatkowy zamiast procentu powyżej 100%,
- dodano nieblokujące sanity checks przy zapisie sesji dla wyraźnie podejrzanych danych, m.in. daty w przyszłości, zerowego zaakceptowanego materiału, skrajnie długiej integracji, ekspozycji lub liczby klatek oraz bardzo wysokiego odsetka odrzuceń,
- podejrzaną, ale świadomie poprawną sesję nadal można zapisać po potwierdzeniu ostrzeżenia,
- wzmocniono ochronę historii przy usuwaniu używanego panelu lub składnika Planu materiału: komunikat pokazuje liczbę powiązanych sesji i jasno informuje o utracie przypisania do postępu,
- bez zmian w modelu danych; zachowana jest kompatybilność z v0.10.6.1,
- zaktualizowano numer aplikacji, eksport JSON, manifest, cache PWA, README oraz instrukcję instalacji.

### v0.10.6.1

- zmniejszono wysokość kart projektów z Planem materiału i projektów mozaikowych: szczegółowy postęp składników/paneli jest teraz domyślnie zwinięty,
- dodano kompaktowy nagłówek sekcji z nazwą, postępem czasu, procentem realizacji oraz liczbą składników lub paneli,
- po rozwinięciu zachowano dotychczasowy niezależny postęp każdego składnika/panelu, paski postępu, czas pozostały oraz czas dodatkowy ponad plan,
- stan rozwinięcia sekcji jest pamiętany podczas bieżącej pracy aplikacji i kolejnych renderów listy projektów,
- bez zmian w modelu danych projektów i sesji; aktualizacja jest kompatybilna z danymi v0.10.6,
- zaktualizowano numer aplikacji, eksport JSON, manifest, cache PWA, README oraz instrukcję instalacji.

### v0.10.6

- dodano **Mozaikę v1**: projekt może być zwykłym pojedynczym kadrem albo mozaiką z własną listą paneli, edytowalnymi nazwami i osobnym celem godzinowym każdego panelu,
- dla mozaiki łączny cel projektu jest automatycznie sumą celów paneli; postęp każdego panelu jest liczony niezależnie i nie przekracza 100%, a nadmiar jest pokazywany jako czas dodatkowy,
- sesja projektu mozaikowego wymaga przypisania do panelu; panel jest zapisywany również w Dzienniku i zachowywany podczas edycji sesji,
- starsze projekty bez pola typu projektu są nadal traktowane jako zwykłe projekty i nie wymagają destrukcyjnej migracji,
- Planner pokazuje **szczyt widoczności** dla wybranego obiektu i potwierdzonej lokalizacji: miesiąc najlepszej nocnej widoczności oraz geometryczną maksymalną wysokość obiektu,
- wynik szczytu widoczności jest natychmiast unieważniany po zmianie celu, rozpoczęciu nowego wyszukiwania, zmianie lokalizacji albo utracie poprawnych współrzędnych,
- poprawiono formularz katalogu ZWO: po dodaniu nowej kamery wybór katalogowy, podgląd i formularz są czyszczone; zapis edycji istniejącej kamery nie uruchamia tego resetu,
- zaktualizowano numer aplikacji, eksport JSON, manifest, cache PWA, README oraz instrukcję instalacji.

### v0.10.5

- poprawiono logikę terminów projektów planowanych: domyślna data Plannera nie jest terminem projektu, miesiąc i dokładna data są synchronizowane bez sprzecznych wartości, a termin można wyczyścić,
- dodano opcjonalny **Plan materiału** z osobnymi składnikami (np. Hα/OIII, RGB), ich celami godzinowymi oraz opcjonalnym przypisaniem filtrów,
- przy Planie materiału łączny cel projektu jest automatycznie sumą celów składników; nie wpisuje się go osobno,
- dodano postęp każdego składnika, czas pozostały oraz osobny czas zebrany ponad plan; procent postępu nie przekracza 100%,
- sesje projektów z Planem materiału są przypisywane do konkretnego składnika, z automatyczną podpowiedzią na podstawie filtra,
- zachowano pełną zgodność ze starszymi projektami bez Planu materiału,
- dodano pierwszą lokalną bazę sprzętu: katalog 20 kamer ZWO z podstawowymi parametrami sensora, rozdzielczością, pikselem i informacją o chłodzeniu,
- wybór kamery z katalogu tylko uzupełnia edytowalny formularz; nowy użytkownik nadal startuje z pustą własną biblioteką sprzętu,
- katalog kamer ZWO jest dołączony do cache PWA i dostępny również offline po instalacji.

### v0.10.4.4

- ukryto przycisk **Dodaj ukończoną sesję** w samodzielnym Plannerze bez kontekstu projektu,
- utwardzono przejście **Historia** z karty projektu do właściwej grupy w Dzienniku,
- po imporcie backupu ponownie uruchamiana jest migracja integralności danych, dzięki czemu stare sesje bez poprawnych RA/Dec nie zachowują błędnie wyliczonych danych Księżyca.

### v0.10.4.3

- przebudowano sekcję Księżyca w Plannerze: skrót jest widoczny od razu, a pełne informacje są rozwijane,
- usunięto mało użyteczną średnią wysokość Księżyca; dodano wschód, zachód, górowanie i wysokość podczas górowania,
- dodano kontekst Księżyca względem użytecznego okna sesji, m.in. informację o zachodzie lub wschodzie w trakcie okna,
- w Dzienniku przyciski **Edytuj** i **Usuń** są dostępne bez rozwijania całej sesji,
- szczegóły sesji podzielono na osobno rozwijane sekcje: Materiał, Sprzęt, Warunki, Kalibracja i Pozostałe.

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
