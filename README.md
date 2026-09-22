# AstroPlanner

Mobilny planner i dziennik projektów astrofotograficznych DSO.

## Aktualna wersja

**v0.11.3.1 — Public Beta**

AstroPlanner pomaga prowadzić wielonocne projekty astrofotograficzne: planować cele, oceniać warunki dla wybranej nocy, zapisywać wykonane sesje, śledzić postęp integracji oraz utrzymywać historię użytego sprzętu i materiału kalibracyjnego.

## Aplikacja

https://mykonidpl.github.io/AstroPlanner/

## Główne obszary

- **Projekty** — aktywne, planowane i zakończone cele wraz z postępem integracji.
- **Planner** — wysokość obiektu, kulminacja, użyteczne okno, tryb nocy, Księżyc i lokalizacja/GPS.
- **Dziennik** — historia wykonanych sesji pogrupowana według projektów.
- **Sprzęt** — własna biblioteka teleskopów, kamer, korektorów, filtrów, profili setupów i materiału kalibracyjnego. Profile automatycznie wyliczają światłosiłę, skalę obrazu i FOV.

AstroPlanner działa jako PWA i jest projektowany przede wszystkim do wygodnej obsługi na telefonie oraz pracy terenowej.

## Dane i backup

Dane użytkownika są przechowywane lokalnie w pamięci przeglądarki/PWA. Aktualizacja aplikacji nie powinna usuwać zapisanych projektów, sesji ani sprzętu, ale wyczyszczenie danych witryny może spowodować ich utratę.

W aplikacji dostępny jest eksport i import kopii zapasowej JSON. Przy regularnym korzystaniu zalecane jest okresowe wykonywanie backupu.

## Sprzęt w wersji publicznej

Nowa instalacja startuje z pustą biblioteką teleskopów, kamer, filtrów, korektorów i profili. Każdy użytkownik dodaje własny sprzęt. Aktualizacja nie usuwa sprzętu już zapisanego lokalnie w przeglądarce.

## Historia zmian

### v0.11.3.1

- naprawiono kierunek przeliczania środka ruchomej mapy po puszczeniu palca; widok nie powinien już odskakiwać ani wracać w przeciwną stronę po dragowaniu,
- rozdzielono obszary dotykowe mapy i FOV: przeciągnięcie tła lub wnętrza prostokąta przesuwa mapę, natomiast sam kadr przesuwa się po złapaniu jego obrysu albo żółtego znacznika środka,
- przyciski **Widok na obiekt** i **Widok na kadr** zostały nazwane jednoznacznie: zmieniają wyłącznie środek mapy i nie modyfikują zapisanego RA/Dec kadru,
- zachowano dotychczasową rotację gestem dwóch palców, suwakiem i przyciskami ±90°,
- brak zmian w modelu danych; pełna kompatybilność z v0.11.3,
- zaktualizowano numer aplikacji, eksport JSON, manifest, cache PWA, README i instrukcję instalacji.

### v0.11.3

- mapa kadrowania w edytorze stała się **pełnym ruchomym viewportem**: tło mapy można przesuwać niezależnie od kadru, dzięki czemu nie jest już zablokowane do obszaru wokół początkowego podglądu,
- przeciąganie działa teraz kontekstowo: przeciągnięcie **samego kadru** zmienia środek RA/Dec kadru, a przeciągnięcie **tła mapy** przesuwa widok nieba bez zmiany zapisanego kadru,
- dodano właściwą **siatkę współrzędnych RA/Dec** rysowaną w tej samej projekcji co gwiazdy i FOV, wraz z etykietami osi dostosowanymi automatycznie do skali widoku,
- warstwa gwiazd została przełączona z lokalnego pola obiektu na aktualny środek mapy, więc po przesunięciu widoku gwiazdy nadal odpowiadają temu, co widać na ekranie,
- dodano szybkie przyciski **Pokaż obiekt** i **Pokaż kadr**, aby jednym tapnięciem wrócić do celu projektu albo do aktualnego środka kadru,
- istniejący gest dwóch palców do rotacji kadru został zachowany; nie obraca on mapy ani nie zmienia jej skali,
- brak zmian w modelu danych projektów i sesji; aktualizacja pozostaje kompatybilna z zapisami v0.11.2,
- zaktualizowano numer aplikacji, manifest, cache PWA, README i instrukcję instalacji.

### v0.11.2

- dodano pierwszą właściwą warstwę mapy kadrowania: **realne gwiazdy katalogowe** są rysowane jako techniczne punkty bez fotograficznego tła i bez elementów planetarium,
- źródłem warstwy jest HYG v4.1; aplikacja korzysta z kompaktowego katalogu binarnego i wyświetla tylko gwiazdy znajdujące się w aktualnym lokalnym polu mapy,
- jasność punktów i ich rozmiar zależą od magnitudo, a limit jasności jest dobierany automatycznie do skali widoku, aby mapa pozostała czytelna,
- warstwa gwiazd jest wspólna dla pojedynczego kadru i mozaiki oraz pojawia się także w miniaturowym podglądzie kadru na karcie projektu,
- katalog gwiazd jest pobierany asynchronicznie i nie blokuje uruchomienia AstroPlannera; po pierwszym udanym pobraniu jest przechowywany w osobnym cache `astroplanner-stars-v01` i może być używany offline,
- brak sieci lub niedostępność katalogu nie blokuje kadrowania: geometria FOV, przesuwanie, obrót, overlap i zapis RA/Dec działają nadal bez warstwy gwiazd,
- nie zmieniono modelu projektów ani sesji; nie jest wymagana migracja istniejących danych,
- dodano `star-layer.js`, zaktualizowano cache aplikacji do `astroplanner-v0112`, numer eksportu JSON, manifest, README i instrukcję instalacji.

### v0.11.1.2

- dodano płynną rotację kadru i całej mozaiki gestem dwóch palców; obrót odbywa się wokół zapisanego środka i nie zmienia FOV ani położenia środka,
- dodano suwak rotacji `-180°…+180°`, zsynchronizowany z dotychczasowym polem liczbowym i przyciskami ±90°,
- gest jednym palcem nadal służy wyłącznie do przesuwania kadru; pojawienie się drugiego palca przełącza interakcję w tryb rotacji bez przypadkowego przesunięcia,
- po zakończeniu gestu dwupalcowego pozostały palec nie rozpoczyna automatycznie dragowania, co zapobiega skokom środka kadru,
- brak zmian w modelu danych; pełna kompatybilność z v0.11.1.1,
- zaktualizowano numer aplikacji, eksport JSON, manifest, cache PWA, README oraz instrukcję instalacji.

### v0.11.1.1

- naprawiono przeciąganie kadru na ekranie dotykowym: kadr przesuwa się płynnie podczas ruchu palca zamiast przeskakiwać dopiero po jego puszczeniu,
- skala widoku edytora jest teraz stała podczas przesuwania, dzięki czemu FOV nie zmniejsza się ani nie powiększa wskutek odsuwania kadru od środka obiektu,
- przeciąganie używa wizualnego przesunięcia SVG w trakcie gestu i dopiero po jego zakończeniu przelicza środek kadru na RA/Dec, co ogranicza koszt renderowania i eliminuje skoki,
- dodano obsługę `pointercancel` i pojedynczego aktywnego wskaźnika, aby gesty dotykowe nie pozostawiały kadru w stanie pośrednim,
- brak zmian w modelu danych; pełna kompatybilność z v0.11.1,
- zaktualizowano numer aplikacji, eksport JSON, manifest, cache PWA, README oraz instrukcję instalacji.

### v0.11.1

- dodano fundament **Kadrowania** wspólny dla projektów pojedynczego kadru i mozaik; mapa nieba nie jest jeszcze częścią tej wersji,
- projekt z poprawnym targetem RA/Dec i planowanym setupem automatycznie otrzymuje techniczny podgląd FOV na karcie projektu,
- pojedynczy kadr może zapisać własny środek RA/Dec i rotację niezależnie od środka obiektu,
- mozaika korzysta z tego samego silnika kadru: użytkownik ustawia liczbę wierszy i kolumn, overlap oraz rotację całego układu,
- liczba pól siatki mozaiki musi odpowiadać liczbie istniejących paneli projektu; aplikacja nie tworzy ani nie usuwa paneli podczas kadrowania,
- po zapisaniu kadru AstroPlanner oblicza i zapisuje RA/Dec środka każdego panelu oraz jego FOV i rotację, bez zmiany nazw i celów czasowych paneli,
- dodano przesuwanie kadru gestem/przeciągnięciem oraz szybkie wyśrodkowanie na obiekcie i obrót ±90°,
- geometria korzysta z lokalnej projekcji gnomonicznej/tangent-plane zamiast liniowego przybliżenia RA/Dec,
- stary projekt bez pola `framing` pozostaje w pełni zgodny: podgląd jest wyliczany domyślnie z targetu i setupu, a dane kadru są zapisywane dopiero przy świadomej zmianie/zapisie,
- przy zmianie planowanego setupu zapisany środek i rotacja kadru są zachowane, natomiast FOV oraz geometria paneli są przeliczane z aktualnego setupu,
- kod geometrii i renderera wydzielono do `framing-engine.js` i `framing-renderer.js`, aby kolejne warstwy mapy (gwiazdy i kontury DSO) nie rozbudowywały monolitycznego `index.html`,
- nowe moduły są częścią cache PWA i działają offline po aktualizacji,
- zaktualizowano numer aplikacji, eksport JSON, manifest, cache PWA, README oraz instrukcję instalacji.

### v0.11.0

- rozbudowano istniejące **Profile setupów** w automatyczne zestawy optyczne: na podstawie teleskopu, korektora/reduktora i kamery AstroPlanner wylicza efektywną ogniskową, światłosiłę, skalę obrazu oraz pole widzenia,
- profil pokazuje obliczone parametry już podczas tworzenia i edycji; brakujące dane kamery (pixel size lub wymiary sensora) są sygnalizowane bez zgadywania wartości,
- projekt może mieć opcjonalny **Planowany setup** wskazujący istniejący profil; starsze projekty bez `profileId` działają bez migracji,
- karta projektu i Planner pokazują parametry planowanego zestawu automatycznie, bez ręcznego przepisywania ogniskowej, piksela ani wymiarów sensora,
- Planner dostał sekcję **Kadr zestawu** z nazwą setupu, f/, skalą obrazu i FOV,
- nowa sesja projektu z przypisanym setupem automatycznie dziedziczy teleskop, korektor i kamerę z profilu; ręczna zmiana optyki odłącza sesję od profilu zamiast błędnie zachowywać jego nazwę,
- zapis sesji przechowuje historyczny snapshot parametrów optycznych (m.in. efektywną ogniskową, f/, skalę i FOV), dzięki czemu późniejsza edycja profilu nie zmienia historii,
- Dziennik pokazuje zapisane parametry setupu w szczegółach sesji,
- zachowano pełną zgodność z istniejącymi projektami, sesjami, kamerami, profilami i backupami v0.10.6.x; nie jest wymagana destrukcyjna migracja,
- zaktualizowano numer aplikacji, eksport JSON, manifest, cache PWA, README oraz instrukcję instalacji.

### v0.10.6.5

- ujednolicono prezentację planowanej liczby klatek na kartach projektów: ekspozycja i **Cel materiału** są teraz pokazywane w osobnych wierszach,
- projekt z **Planem materiału** pokazuje od razu również łączny minimalny cel liczby klatek, obliczony jako suma celów poszczególnych składników, np. `400 + 120 = 520 klatek`,
- projekt pojedynczy i mozaika korzystają z tego samego układu: `Ekspozycja planowana` oraz osobno `Cel materiału: min. X klatek`,
- jeżeli w Planie materiału tylko część składników ma podaną ekspozycję, aplikacja nie pokazuje mylącej niepełnej sumy i prosi o uzupełnienie ekspozycji wszystkich składników,
- brak zmian w modelu danych i logice postępu; pełna kompatybilność z v0.10.6.4,
- zaktualizowano numer aplikacji, eksport JSON, manifest, cache PWA, README oraz instrukcję instalacji.

### v0.10.6.4

- ujednolicono prezentację planowanych ekspozycji na kartach projektów: projekt z **Planem materiału** pokazuje teraz od razu skrót ekspozycji poszczególnych składników, np. `HII + OIII 180 s · RGB 60 s`, bez konieczności rozwijania sekcji,
- szczegółowa liczba planowanych klatek dla każdego składnika nadal pozostaje w rozwijanym **Planie materiału**, dzięki czemu karta projektu pozostaje kompaktowa,
- projekt pojedynczy i mozaika zachowują dotychczasową prezentację wspólnej planowanej ekspozycji i minimalnej liczby klatek,
- brak zmian w modelu danych; pełna kompatybilność z v0.10.6.3,
- zaktualizowano numer aplikacji, eksport JSON, manifest, cache PWA, README oraz instrukcję instalacji.

### v0.10.6.3

- dodano opcjonalną **planowaną ekspozycję** do projektu pojedynczego kadru i jako wspólną ekspozycję projektu mozaikowego,
- składniki **Planu materiału** mogą mieć własne czasy ekspozycji, dzięki czemu np. narrowband i RGB są liczone niezależnie,
- Planner pokazuje nową sekcję **Klatki w użytecznym oknie**: teoretyczną maksymalną liczbę klatek możliwych do wykonania tej nocy przy zadanej ekspozycji oraz orientacyjną liczbę klatek pozostałych do celu,
- liczba klatek jest liczona z faktycznego użytecznego okna Plannera; wynik jest jawnie opisany jako maksimum teoretyczne bez ditheringu, autofocusu, meridian flipa i innych przerw,
- przy tworzeniu nowego projektu obliczenie liczby klatek działa jeszcze przed jego zapisaniem; w projekcie z Planem materiału wspólne pole ekspozycji jest zastępowane ekspozycjami poszczególnych składników,
- w kartach projektów i rozwijanych panelach/składnikach pokazano planowaną ekspozycję oraz wynikającą z niej minimalną liczbę klatek potrzebną do realizacji celu godzinowego,
- przy dodawaniu nowej sesji planowana ekspozycja projektu lub wybranego składnika Planu materiału jest automatycznie podpowiadana; edycja istniejącej sesji nie jest nadpisywana,
- nowe pola są opcjonalne, więc starsze projekty bez planowanej ekspozycji działają bez migracji i zachowują dotychczasowe zachowanie,
- zaktualizowano numer aplikacji, eksport JSON, manifest, cache PWA, README oraz instrukcję instalacji.

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

## Dane astronomiczne i licencje zewnętrzne

Warstwa gwiazd korzysta z **HYG v4.1** (David Nash / Astronexus), udostępnianego na licencji **CC BY-SA 4.0**. AstroPlanner pobiera kompaktową reprezentację katalogu przygotowaną w projekcie `bryancurran/celestial-cartography`; dane gwiazd pozostają objęte właściwą licencją HYG. Szczegóły znajdują się również w `THIRD_PARTY-NOTICES.md`.

## Copyright

AstroPlanner © 2026 Mykonid. Kod źródłowy nie jest udostępniany na licencji open source. Szczegóły: [LICENSE](LICENSE).
