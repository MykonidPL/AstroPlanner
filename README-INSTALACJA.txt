AstroPlanner v0.14 — pełna synchronizacja produkcji z działającym R&D

Repozytorium produkcyjne:
MykonidPL/AstroPlanner

Źródło działającego stanu:
- repo R&D: MykonidPL/AstroPlanner-v014-RD
- commit R&D: 119eec15538e8c67d9aab4e7aecaf5c23e5ac4c3
- raster-layer.js blob: 6248206e37f7275a8f355088b0589a304bf2d6e8
- baza produkcyjna przed tą synchronizacją: e24cdb194fce00529fb98f95fe6eb680c174164c

Cel tej paczki:
- funkcjonalnie zrównać produkcję z potwierdzonym działającym R&D,
- zachować produkcyjne dane użytkownika i produkcyjne namespace'y,
- wymusić świeży cache PWA `astroplanner-v014-raster-preregression1`.

Wdrożenie:
1. Wgraj wszystkie 23 pliki bezpośrednio do root repo MykonidPL/AstroPlanner.
2. Zastąp pliki o tych samych nazwach; nie twórz folderu nadrzędnego.
3. Zrób jeden commit.
4. Po publikacji GitHub Pages zamknij całkowicie PWA/przeglądarkę i uruchom ponownie.

Różnice względem R&D są wyłącznie środowiskowe:
- produkcja: localStorage bez prefiksu `aprd014:`,
- produkcja: IndexedDB `astroplanner-project-snapshots`,
- produkcja: cache Bortle `ap014_sky_brightness_cache_v2`,
- produkcja: cache PWA `astroplanner-v014-raster-preregression1`,
- branding/linki wskazują repo produkcyjne.

Logika mapy, scoringu, rekomendacji, framowania, katalogów i UI odpowiada działającemu R&D.
