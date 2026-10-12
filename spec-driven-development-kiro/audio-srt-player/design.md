---
project: audio-srt-player
document: design
status: draft
---

# Design — Audio Subtitle Player (ASP)

**Versi dokumen:** 1.1
**Tanggal:** 2026-09-29
**Status:** Draft — menunggu review
**Dokumen induk:** [`requirements.md`](./requirements.md) — dokumen ini mengimplementasikan, tidak menggantikan

> **Catatan versi (v1.1).** `requirements.md` §9 **sudah** memakai layout **dock bawah + panel subtitle besar** dengan Player *subtitle-first*. Dokumen ini tidak lagi menimpa wireframe requirement. Seluruh keputusan visual tetap dipegang `design.md` sebagai sumber kebenaran tunggal, dan traceability ke requirement dijaga lewat ID `D-xx` yang dipetakan di §14.
>
> Division of authority: `requirements.md` = **WHAT** (kebutuhan & acceptance criteria). `design.md` = **HOW** (keputusan visual, token, komponen, interaksi).

---

## Daftar Isi

1. [Ringkasan & Prinsip Desain](#1-ringkasan--prinsip-desain)
2. [Information Architecture](#2-information-architecture)
3. [Design Tokens](#3-design-tokens)
4. [App Shell & Grid](#4-app-shell--grid)
5. [Wireframe Halaman](#5-wireframe-halaman)
6. [Spesifikasi Komponen](#6-spesifikasi-komponen)
7. [State & Interaksi](#7-state--interaksi)
8. [Subtitle UX](#8-subtitle-ux)
9. [Panel Sinkronisasi](#9-panel-sinkronisasi)
10. [Guided Sync Wizard](#10-guided-sync-wizard)
11. [Aksesibilitas](#11-aksesibilitas)
12. [Responsif & Mobile](#12-responsif--mobile)
13. [Copy & Tone](#13-copy--tone)
14. [Traceability](#14-traceability)
15. [Checklist Pre-Ship](#15-checklist-pre-ship)

---

## 1. Ringkasan & Prinsip Desain

### 1.1 Ringkasan

ASP adalah aplikasi **audio-first** dengan subtitle sebagai pengalaman utama. Bentuk, warna, dan animasi semuanya serving satu tujuan — membuat teks subtitle terbaca jelas dan tepat waktu, serta membuat penyetelan sinkronisasi terasa mudah.

Karakter visual: **tenang, padat, teknis namun tidak dingin.** Terlihat seperti alat kerja profesional, bukan aplikasi hiburan. Tidak ada dekorasi yang tidak fungsional.

### 1.2 Prinsip Desain

| ID | Prinsip | Implikasi |
|---|---|---|
| **D-01** | **Subtitle adalah fokus utama, bukan pelengkap** | Area subtitle mendapat proporsi visual terbesar di halaman Player. Kontrol subtitle tidak pernah dikubur di Settings. |
| **D-02** | **Angka harus terbaca sekilas** | Readout offset, waktu, dan durasi memakai font monospace dengan `tabular-nums` agar lebarnya tidak bergeser saat angka berubah 60×/detik. |
| **D-03** | **Tidak ada yang bergerak saat playback** | Animasi dimatikan selama audio berjalan. Hanya perpindahan cue subtitle yang boleh berubah, dan itu tanpa efek visual yang mencolok. Melindungi NFR-03 dan mengurangi kelelahan mata. |
| **D-04** | **Kontrol berada di tempat yang diharapkan** | Semua kontrol playback ada di dock. Tidak ada kontrol duplikat yang terletak di tempat berbeda. Satu lokasi, satu kebenaran. |
| **D-05** | **Kegagalan selalu terlihat dan selalu punya jalan keluar** | Setiap state kosong, error, atau file hilang punya tampilan + aksi pemulihan. Tidak ada dead end. Melayani NFR-09, NFR-10, FR-07. |
| **D-06** | **Tidak ada request eksternal** | Nol webfont, nol ikon SVG dari CDN, nol gambar dari jaringan. Semua ikon SVG inline, semua warna dari token. Melayani NFR-07 dan FR-40. |

### 1.3 Yang Secara Sadar Tidak Ada

Tidak ada ilustrasi, gradien dekoratif, animasi masuk halaman, glassmorphism, atau shadow berwarna. Aplikasi ini dipakai berulang-rutin dalam durasi panjang; dekorasi yang berlebihan justru mengurangi ruang teks subtitle dan menambah beban visual.

---

## 2. Information Architecture

### 2.1 Sitemap

```
/                      Library         daftar item, import, pencarian
/play/:itemId          Player          subtitle stage, panel sinkronisasi, cue list, bookmark
/settings               Settings        preferensi, storage, export/import, shortcut
```

Tiga rute. Tidak ada routing bersarang, tidak ada halaman auth, tidak ada onboarding blocking.

### 2.2 Aturan Navigasi

| Aturan | Penjelasan |
|---|---|
| Dock selalu terlihat | Dock ada di ketiga rute. Audio tidak berhenti saat pindah halaman. Melayani D-04. |
| Pindah halaman tidak interrupt playback | Perpindahan rute **tidak pernah** menghentikan atau me-reset `<audio>`. |
| Root `/` = Library | Karena ini aplikasi library-first: user selalu kembali ke daftar. |
| Dalam-dokumen navigation | Cue list, bookmark, dan subtitle semuanya di dalam `/play/:itemId`, tidak berpindah halaman. |
| Back button aman | `Esc` pada dialog meng-close dialog, bukan navigasi keluar. |

### 2.3 Model Mental Pengguna

```
        +----------------------------------+
        |          LIBRARY (/ )             |
        |  [klik item]                      |
        +---------------+------------------+
                        v
        +----------------------------------+
        |    PLAYER (/play/:itemId)         |
        |  Subtitle stage                   |
        |  Panel sinkronisasi               |
        |  [Cue list] [Bookmark]            |
        +---------------+------------------+
                        |  dock selalu di bawah
                        v
                 +-------------+
                 |    DOCK     |
                 | transport,  |
                 | seek, rate, |
                 | volume      |
                 +-------------+
```

---

## 3. Design Tokens

Semua token bernama semantik, bukan nama warna. `bg-surface` tidak pernah ditulis sebagai `#14171C` di komponen. Dengan begitu light mode otomatis bekerja tanpa menulis ulang komponen.

### 3.1 Warna

#### Dark (default)

| Token | Hex | Pakai untuk |
|---|---|---|
| `--bg-base` | `#0B0D10` | Latar aplikasi terdalam |
| `--bg-surface` | `#14171C` | Kartu, panel, baris daftar |
| `--bg-surface-raised` | `#1C2026` | Hover, menu, popover |
| `--bg-inset` | `#0F1216` | Input, track seekbar, kode |
| `--bg-overlay` | `#23282F` | Backdrop dialog (dengan `opacity`) |
| `--border-subtle` | `#1E232A` | Garis pemisah halus, separator list |
| `--border-default` | `#2A3038` | Border kartu, border input |
| `--border-strong` | `#3A424D` | Border pada hover/focus |
| `--text-primary` | `#F2F4F7` | Judul, subtitle, angka utama |
| `--text-secondary` | `#A6AEBB` | Label, deskripsi sekunder |
| `--text-tertiary` | `#6E7683` | Placeholder, metadata kecil |
| `--text-disabled` | `#4A515B` | Elemen non-interaktif |
| `--text-inverse` | `#0B0D10` | Teks di atas permukaan terang |

#### Light

| Token | Hex | Catatan |
|---|---|---|
| `--bg-base` | `#FFFFFF` | |
| `--bg-surface` | `#F7F8FA` | Kartu sedikit berbeda dari latar |
| `--bg-surface-raised` | `#FFFFFF` | Menu, popover |
| `--bg-inset` | `#EEF0F3` | |
| `--border-subtle` | `#E7E9ED` | |
| `--border-default` | `#D6DAE0` | |
| `--border-strong` | `#AFB6C1` | |
| `--text-primary` | `#10131A` | |
| `--text-secondary` | `#545C6A` | |
| `--text-tertiary` | `#848C99` | |
| `--accent-500` | `#4A57E8` | **Lebih gelap dari versi dark** agar kontras ≥ 4.5:1 di latar putih |

#### Aksen

Satu warna aksen saja. Menambah warna brand kedua di v1 hanya menambah permukaan warna tanpa manfaat nyata.

| Token | Dark | Light | Pakai untuk |
|---|---|---|---|
| `--accent-500` | `#6E7BFF` | `#4A57E8` | Aksi utama, track terisi, cue aktif |
| `--accent-400` | `#8B95FF` | `#6C78F0` | Hover |
| `--accent-600` | `#5560E6` | `#3B47C9` | Pressed |
| `--accent-surface` | `#1A1E3A` | `#EEF0FE` | Latar tinted (banner, cue aktif) |
| `--on-accent` | `#FFFFFF` | `#FFFFFF` | Teks di atas aksen |

#### Semantik

| Token | Dark | Light | Pakai untuk |
|---|---|---|---|
| `--success` | `#3DD68C` | `#12855A` | Selesai, berhasil import |
| `--warning` | `#F5A524` | `#9A6207` | Kuota(storage) menipis, format best-effort |
| `--danger` | `#F5566B` | `#C42C41` | Hapus, error, file hilang |
| `--info` | `#4CC9F0` | `#0B6E8C` | Petunjuk non-blocking |

Rasio kontras `--danger` dan `--warning` **diversikan antara tema** agar tetap lolos WCAG AA di keduanya.

#### Token khusus subtitle

| Token | Nilai | Alasan |
|---|---|---|
| `--subtitle-bg` | `rgba(0, 0, 0, 0.72)` | Semi-transparan agar artwork tetap terlihat, teks tetap terbaca. D-01. |
| `--subtitle-fg` | `#FFFFFF` | Selalu putih, di kedua tema. Hitam di terang justru lebih buruk di atas foto. |
| `--subtitle-shadow` | `0 1px 2px rgba(0,0,0,.9), 0 0 8px rgba(0,0,0,.55)` | Jaring pengaman bila `--subtitle-bg` belum ter-render. |
| `--subtitle-active-bg` | `var(--accent-surface)` | Baris cue aktif di daftar cue. |

> **D-07 — Larangan `backdrop-filter` pada overlay subtitle.** `backdrop-filter: blur()` memaksa kompositor menjalankan ulang frame pada setiap perubahan. Karena subtitle berubah beberapa kali per detik di area besar, ini berisiko langsung melanggar NFR-03. Latar semi-transparan polos sudah cukup. Efek blur hanya boleh dipakai di `Dialog` dan `Popover`, yang lifecycle-nya pendek.

### 3.2 Tipografi

System font stack — nol request eksternal (D-06, NFR-07).

```css
--font-sans: system-ui, -apple-system, 'Segoe UI', Roboto,
             'Helvetica Neue', Arial, sans-serif;
--font-mono: ui-monospace, SFMono-Regular, 'SF Mono', Menlo,
             Consolas, 'Liberation Mono', monospace;
```

#### Skala

| Token | Ukuran | Line-height | Tracking | Pakai untuk |
|---|---|---|---|---|
| `--text-2xs` | 11px | 1.4 | 0.02em | Badge, label uppercase |
| `--text-xs` | 12px | 1.4 | 0.01em | Metadata, timestamp cue list |
| `--text-sm` | 14px | 1.45 | 0 | Label kontrol, isi sekunder |
| `--text-base` | 16px | 1.5 | 0 | Body, isi daftar |
| `--text-lg` | 18px | 1.4 | 0 | Judul item di dock |
| `--text-xl` | 20px | 1.35 | -0.01em | Judul kartu library |
| `--text-2xl` | 24px | 1.3 | -0.01em | Judul halaman |
| `--text-3xl` | 30px | 1.25 | -0.02em | Readout offset, judul player |
| `--text-4xl` | 36px | 1.2 | -0.02em | Angka offset pada mode wizard |

#### Token khusus subtitle

| Token | Nilai | Alasan |
|---|---|---|
| `--text-subtitle` | `clamp(1.125rem, 2.6vw, 2rem)` | Skala fluid: 18px di mobile, hingga 32px di layar lebar. Tidak perlu media query. |
| `--lh-subtitle` | `1.4` | 1.4 adalah nilai yang membuat dua baris subtitle terbaca tanpa saling tumpang tindih. |
| `--fw-subtitle` | `500` | Lebih tebal dari normal agar tidak hilang di atas artwork ramai. |
| `--ls-subtitle` | `0` | Tracking nol. Subtitle dibaca cepat, letter-spacing yang longgar justru memperlambat. |

#### Token khusus angka

```css
--font-numeric: var(--font-mono);
font-variant-numeric: tabular-nums;
```

> **D-08 — Semua angka waktu wajib `tabular-nums`.** Tanpa itu, angka `0:59` → `1:00` menyebabkan seluruh blok angka bergeser beberapa piksel, dan pada readout besar di Panel Sinkronisasi ini terlihat sangat mengganggu (D-02).

### 3.3 Spacing

Basis 4px. Hanya nilai-nilai ini yang boleh dipakai.

| Token | Nilai | Token | Nilai |
|---|---|---|---|
| `--space-1` | 4px | `--space-7` | 28px |
| `--space-2` | 8px | `--space-8` | 32px |
| `--space-3` | 12px | `--space-10` | 40px |
| `--space-4` | 16px | `--space-12` | 48px |
| `--space-5` | 20px | `--space-16` | 64px |
| `--space-6` | 24px | `--space-20` | 80px |

### 3.4 Radius, Border, Elevation

| Token | Nilai | Pakai untuk |
|---|---|---|
| `--radius-sm` | 4px | Badge, tag, input kecil |
| `--radius-md` | 6px | Tombol, input, kartu list |
| `--radius-lg` | 8px | Kartu, panel |
| `--radius-xl` | 12px | Dialog, panel besar |
| `--radius-2xl` | 16px | Cue list container |
| `--radius-full` | 9999px | Avatar, pill, knob seekbar |

Border: `--border-width: 1px`.

Elevation — di tema gelap, **border lebih banyak dipakai daripada shadow** karena shadow di atas latar hampir tak terlihat.

| Token | Nilai | Pakai untuk |
|---|---|---|
| `--elevation-1` | `0 1px 2px rgba(0,0,0,.30)` | Kartu yang di-hover |
| `--elevation-2` | `0 4px 12px rgba(0,0,0,.35)` | Menu, popover, dropdown |
| `--elevation-3` | `0 12px 32px rgba(0,0,0,.45)` | Dialog |
| `--elevation-4` | `0 24px 64px rgba(0,0,0,.55)` | Dialog mobile, toast |

### 3.5 Motion

| Token | Nilai | Pakai untuk |
|---|---|---|
| `--duration-instant` | 0ms | Perubahan yang harus sinkron dengan audio |
| `--duration-fast` | 120ms | Hover, focus ring, warna |
| `--duration-base` | 180ms | Panel, tab, tooltip |
| `--duration-slow` | 260ms | Dialog masuk, layout berubah |
| `--ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Default untuk semua |
| `--ease-exit` | `cubic-bezier(0.3, 0, 1, 1)` | Elemen yang keluar |
| `--ease-emphasized` | `cubic-bezier(0.34, 1.4, 0.64, 1)` | Toast, konfirmasi |

> **D-03 — `--duration-instant` untuk semua hal yang bersinggungan dengan playback.** Pergantian cue subtitle, pergerakan knob seekbar, dan perubahan angka waktu memakai `0ms`. Animasi 180ms pada elemen yang berubah tiap beberapa detik akan terlihat seperti stutter, bukan seperti polish.

#### Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Playback dan subtitle **tetap berfungsi penuh** — yang dimatikan hanya transisi dekoratif. Melayani NFR-12.

### 3.6 Z-Index

| Layer | Nilai | Isi |
|---|---|---|
| `base` | 0 | Konten normal |
| `sticky` | 100 | AppBar saat di-scroll |
| `dock` | 200 | Dock player |
| `dock-sheen` | 210 | Garis atas dock |
| `backdrop` | 300 | Backdrop dialog |
| `dialog` | 310 | Dialog, bottom sheet |
| `toast` | 400 | Toast |
| `tooltip` | 500 | Tooltip |

Tidak ada z-index di luar daftar ini. Angka arbitrer di komponen adalah bug.

### 3.7 Breakpoint

| Nama | Min width | Perubahan layout |
|---|---|---|
| `sm` | 360px | Baseline mobile |
| `md` | 640px | Grid library 2 kolom, dock 2 baris penuh |
| `lg` | 1024px | **Dock desktop aktif** (88px), grid library 3 kolom, panel sinkronisasi 2 kolom |
| `xl` | 1440px | Grid library 4 kolom, stage subtitle lebih luas, cue list jadi 2 kolom |

### 3.8 Ukuran Dock

| Token | Mobile (< lg) | Desktop (≥ lg) |
|---|---|---|
| `--dock-height` | 64px | 88px |
| `--dock-artwork` | 40px | 48px |
| `--dock-icon` | 20px | 24px |
| `--dock-play` | 44px | 52px |

---

## 4. App Shell & Grid

### 4.1 Anatomi

```
+--------------------------------------------------------------------------+
| AppBar        56px (mobile) / 64px (desktop)                             |
+--------------------------------------------------------------------------+
|                                                                          |
|  <main>  Route content — scrollable, punya padding sendiri               |
|                                                                          |
+--------------------------------------------------------------------------+
| Dock          64px (mobile) / 88px (desktop) — fixed, selalu ada          |
+--------------------------------------------------------------------------+
```

```
+--------------------------------------------------------------------------+
| ASP    Library   Player   Settings            [search]  [offline] [aks]  |
+==========================================================================+
|                                                                          |
|                        ROUTE CONTENT                                      |
|                                                                          |
|                                                                          |
+==========================================================================+
| [art] Judul item                                              1.0x  CC  |
|       00:42 / 45:13      "subtitle aktif, satu baris dipotong ..."   🔊  |
| |<<  [>>]  (  ▶  )  >>|  [loop]                          [bookmark]      |
| +==============================O===========================+             |
| 0:42                                                          45:13     |
+==========================================================================+
```

### 4.2 Dock Desktop (≥ lg, tinggi 88px)

Dua baris. Baris pertama terbagi menjadi tiga zona, baris kedua seekbar full-width.

```
| Zona kiri  |  Zona tengah  |  Zona kanan  |
| flex: 1    |  auto         |  flex: 1     |

Kiri (justify-start):
  artwork 48px + (judul 2 baris: title `text-lg`, time `text-xs` mono)

Tengah (justify-center):
  shuffle | prev-item | back-skip | PLAY 52px | fwd-skip | next-item | repeat

Kanan (justify-end):
  rate badge | CC toggle | bookmark | volume slider 120px
```

**Baris kedua:** seekbar full-width dengan `0:42` di kiri dan `45:13` di kanan, keduanya `text-xs` mono.

> **D-09 — Dock menampilkan cue preview, bukan hanya judul.** Baris kedua subtitle di dock (zona kiri) menampilkan satu baris cue yang sedang aktif, dipotong dengan ellipsis. Saat user browsing Library sambil audio berjalan, dia tetap tahu sedang memutar konten apa. Tanpa ini, dock terasa seperti sekadar kendali.

**Cue preview di dock:**
- `text-xs`, `--text-secondary`, 1 baris, `text-overflow: ellipsis`
- Memakai teks yang sama dengan overlay, dibaca dari store yang sama — tidak ada parse ulang
- Non-interaktif (`pointer-events: none`) supaya tidak menghalangi klik seekbar
- Disembunyikan bila `subtitleVisible === false`

### 4.3 Dock Mobile (< lg, tinggi 64px)

```
+------------------------------------------------------------+
| [art] Judul item                        [prev] (▶) [next] |
+------------------------------------------------------------+
```

Dock mobile **tidak** punya seekbar — tidak ada ruang. Mengetuk area dock membuka **Player Sheet**: bottom sheet full-height berisi subtitle stage, panel sinkronisasi, dan seekbar lengkap.

---

## 5. Wireframe Halaman

### 5.1 Library — Desktop

```
+==========================================================================+
| ASP    [ Library ]  Player   Settings        [cari...]   [offline ●] [+]|
+==========================================================================+
|  12 item                                              < grid 3 kolom >   |
|  +----------------+  +----------------+  +----------------+            |
|  | ▓▓▓▓▓▓▓▓▓▓▓▓▓  |  | ▓▓▓▓▓▓▓▓▓▓▓▓▓  |  | ▓▓▓▓▓▓▓▓▓▓▓▓▓  |            |
|  |                |  |                |  |                |            |
|  |  Judul Item    |  |  Judul Item    |  |  Judul Item    |            |
|  |  ▪ audio.mp3   |  |  ▪ audio.m4a   |  |  ▪ audio.mp3   |            |
|  |  ▪ id.srt      |  |  (tanpa sub)   |  |  ▪ en.vtt      |            |
|  |                |  |                |  |                |            |
|  | ▶  42:10/45:13 |  | —  belum pernah |  | ✓ Selesai      |            |
|  | ▓▓▓▓▓▓░░░░░░ 92% |  |                |  |                |            |
|  +----------------+  +----------------+  +----------------+            |
|  | ▓▓▓▓▓▓▓▓▓▓▓▓▓  |  | ▓▓▓▓▓▓▓▓▓▓▓▓▓  |  | ▓▓▓▓▓▓▓▓▓▓▓▓▓  |            |
|  | Judul Item    |  | Judul Item    |  | ⚠ File hilang  |            |
|  | ...           |  | ...           |  | [ Pasang ulang ]|           |
|  +----------------+  +----------------+  +----------------+            |
+==========================================================================+
| [art] Judul aktif    00:42/45:13  "cue..."    [<<] (▶) [>>]   1.0x  🔊 |
| +==============================O===========================+          |
+==========================================================================+
```

**Anatomi kartu library (`LibraryCard`):**
- Grid responsif: 1 kolom (`sm`) → 2 (`md`) → 3 (`lg`) → 4 (`xl`)
- Tinggi thumbnail `aspect-ratio: 1`, fallback berupa ikon musik + inisial pada `--bg-inset`
- Judul: 2 baris, `text-xl`, clamp, `text-truncate`
- Nama file: 1 baris, `text-xs`, `--text-tertiary`
- Baris status: waktu terakhir played ATAU badge "Selesai" ATAU prompt "Lanjut dari 12:34"
- Progress bar tipis di bawah kartu bila progress > 0 dan < 95%
- Overlay hover: tombol ▶ besar di tengah thumbnail, opacity 0 → 1
- Badge "Selesai": pojok kiri atas thumbnail, warna `--success`

**Anatomi baris status per kondisi:**

| Kondisi | Tampilan |
|---|---|
| Belum pernah diputar | `— belum pernah diputar` (`text-tertiary`) |
| Sedang berjalan | `▶ 42:10 / 45:13` + progress bar |
| Ada progress, tidak aktif | `Lanjut dari 12:34` + progress bar |
| Selesai | Badge ✓ Selesai (hijau) |
| Tanpa subtitle | `Tanpa subtitle` (`text-tertiary`) + tombol kecil `+ subtitle` |
| File hilang | `⚠ File tidak tersedia` (`--danger`) + tombol `Pasang ulang` |
| Perlu izin | `Izin akses diperlukan` (`--warning`) + tombol `Izinkan` |

### 5.2 Library — Empty State

```
+==========================================================================+
| ASP    [ Library ]  Player   Settings                          [offline ●]|
+==========================================================================+
|                                                                          |
|                        +--------------------+                           |
|                        |         +--+       |                           |
|                        |        /    \      |                           |
|                        |       |  ♪   |     |                           |
|                        |        \    /      |                           |
|                        |         +--+       |                           |
|                        +--------------------+                           |
|                                                                          |
|                      Library masih kosong                                |
|                                                                          |
|              Tambahkan file audio pertama kamu untuk memulai.            |
|              File hanya disimpan di perangkat ini.                        |
|                                                                          |
|                       [ + Pilih file audio ]                              |
|                                                                          |
|                     atau tarik & lepas ke area ini                       |
|                                                                          |
|                            —— atau ——                                    |
|                                                                          |
|                    [ Impor dari file JSON ]                               |
|                                                                          |
+==========================================================================+
```

**Konten empty state — aturan:**

1. Judul: apa yang terjadi, bukan instruksi
2. Satu kalimat penjelasan
3. **Satu** aksi utama (tombol besar, `--accent-500`)
4. Alternatif sekunder (drag-drop) — ditampilkan sebagai hint, bukan tombol dengan bobot yang sama
5. Jalur pemulihan data (`Impor dari JSON`) untuk kasus yang paling menakutkan, yaitu user yang datanya hilang
6. Pernyataan privasi: "File hanya disimpan di perangkat ini" — menurunkan kecemasan user soal Data di server

### 5.3 Player — Desktop

```
+==========================================================================+
| ← Kembali ke Library                    audio.mp3 · id.srt · 48 MB       |
+==========================================================================+
|                            SUBTITLE STAGE                                 |
|         +---------------------------------------------------------+      |
|         |                                                         |      |
|         |      Cue pertama                                          |      |
|         |      Cue kedua dengan italic.                              |      |
|         |      Baris ketiga yang mungkin masih muat.                  |      |
|         |                                                         |      |
|         +---------------------------------------------------------+      |
|           ( subtitle )  Subtitles          ( + Bookmark )                |
+==========================================================================+
|  PANEL SINKRONISASI                    ( Lihat §9 )                       |
|  +----------------------------------+  +----------------------------+   |
|  |  OFFSET SUBTITLE                 |  |  CUE AKTIF                 |   |
|  |                                  |  |                            |   |
|  |      − 0.300  detik              |  |  0:42  →  0:46             |   |
|  |                                  |  |  "Cue kedua dengan          |   |
|  |  [−500] [−100]  [Reset]  [+100] [+500]  | italic."                 |   |
|  |                                  |  |                            |   |
|  |  shift+klik untuk ketik manual   |  |  mini timeline ▸            |   |
|  |  ( ) Terapkan ke semua item     |  +----------------------------+   |
|  +----------------------------------+                                   |
+==========================================================================+
|  ( Daftar Cue )   Bookmark (3)                                          |
+==========================================================================+
|  [ cari di dalam subtitle...                              ]              |
+--------------------------------------------------------------------------|
|  0:42   Cue kedua dengan italic.                              <-- AKTIF  |
|  0:46   Cue ketiga.                                                     |
|  0:51   Cue keempat dengan baris kedua yang panjang sekali.              |
|  0:58   Cue kelima.                                                      |
+--------------------------------------------------------------------------+
| [art] Judul    00:42/45:13  "Cue kedua dengan italic."     [1.0x] C  🔊  |
| +==============================O===========================+            |
| 0:42                                                         45:13        |
+==========================================================================+
```

**Proporsi vertikal di halaman Player (desktop):**

| Bagian | Tinggi | Rasio |
|---|---|---|
| Subtitle stage | `min(42vh, 480px)` | ~45% |
| Panel sinkronisasi | auto (~220px) | ~20% |
| Cue list / Bookmark | sisa, scroll | ~35% |
| Dock | 88px fixed | — |

> **D-10 — Subtitle stage memakai tinggi berbasis `vh`, bukan proporsi fleksibel.** Subtitle stage yang ikut menyusut saat cue list bertambah panjang akan membuat teks subtitle ikut mengecil. Tinggi stage harus **hanya** bergantung pada ukuran viewport, agar ukuran teks subtitle stabil sepanjang sesi.

### 5.4 Player — Mobile

```
+--------------------------------------+
| ← Kembali                       ⋮   |
+--------------------------------------+
|                                      |
|          SUBTITLE STAGE               |
|                                      |
|  +--------------------------------+  |
|  |  Cue kedua dengan italic.       |  |
|  |  Baris ketiga.                  |  |
|  +--------------------------------+  |
|                                      |
|   ( subtitle )        ( + Bookmark ) |
+--------------------------------------+
|  OFFSET                     − 0.300  |
|  [−500][−100] [Reset] [+100][+500]   |
+--------------------------------------+
|  ( Cue )  ( Bookmark )                |
+--------------------------------------+
|  0:42  Cue kedua dengan italic.       |
|  0:46  Cue ketiga.                    |
+--------------------------------------+
| [art] Judul     00:42/45:13  [▶]     |  <- dock 64px
+--------------------------------------+
```

Turutan di mobile: **stage → offset ringkas → tabs**. Cue list digeser ke bawah tabs agar offset selalu terlihat tanpa scroll. Di desktop, panel offset ditampilkan penuh dalam grid 2 kolom.

### 5.5 Dialog

#### Import Dialog

```
        +-------------------------------------------------------+
        |  Tambah ke Library                             [ × ]  |
        +-------------------------------------------------------+
        |                                                       |
        |  1. File audio                                       |
        |  +-------------------------------------------------+  |
        |  |  🎵  Pilih file audio                       Browse |  |
        |  |      MP3, M4A, WAV, FLAC · maks. besar file     |  |
        |  +-------------------------------------------------+  |
        |  |  ✓ audio-cerita-01.mp3                          |  |
        |  |    48.2 MB · 45:13                                |  |
        |  +-------------------------------------------------+  |
        |                                                       |
        |  2. File subtitle  (opsional)                        |
        |  +-------------------------------------------------+  |
        |  |  💬  Pilih file .srt atau .vtt              Browse |  |
        |  +-------------------------------------------------+  |
        |  |  ✓ cerita-01.srt                                 |  |
        |  |    1.284 cue · akan dicek sinkronisasinya        |  |
        |  +-------------------------------------------------+  |
        |                                                       |
        |  3. Judul                                             |
        |  +-------------------------------------------------+  |
        |  |  Cerita 01 — Bab 1                              |  |
        |  +-------------------------------------------------+  |
        |                                                       |
        +-------------------------------------------------------+
        |  info: Audio dan subtitle hanya dibaca, tidak diubah  |
        |                          [ Batal ]   [ Tambah ]      |
        +-------------------------------------------------------+
```

Kunci perilaku:
- Kedua field file **wajib**, subtitle opsional
- Setelah file dipilih, langsung tampil ringkasan (nama, ukuran, durasi, jumlah cue) — user tahu ini benar sebelum menekan Tambah
- Jumlah cue diambil dari hasil parse; subtitle yang gagal parse tetap boleh ditambahkan, dengan peringatan
- Tombol `Tambah` disabled sampai file audio terisi
- Dialog **tidak** meminta izin penyimpanan — user sudah aman secara privasi karena file tidak pernah keluar dari device

#### Relink Dialog (FR-07)

```
        +---------------------------------------------+
        |  File Tidak Tersedia                  [ × ]  |
        +---------------------------------------------+
        |                                             |
        |  ⚠  audio-cerita-01.mp3                     |
        |                                             |
        |  Berkas ini tidak ditemukan di lokasi       |
        |  sebelumnya, atau nama/ukurannya berubah.   |
        |                                             |
        |  Yang TIDAK akan hilang:                    |
        |    ✓ 2 bookmark                             |
        |    ✓ progress 12:34                         |
        |    ✓ offset subtitle −300 ms                |
        |                                             |
        |  +---------------------------------------+  |
        |  |  Cari file audio yang sama        Browse |  |
        |  +---------------------------------------+  |
        |                                             |
        |        [ Lewati ]     [ Pasang ulang ]       |
        +---------------------------------------------+
```

> **D-11 — Relink dialog selalu menampilkan daftar yang dipertahankan.** Bookmark, progress, dan offset adalah data yang suspending untuk user bangun dan hilang permanen kalau relink gagal. Menampilkan daftar itu secara eksplisit menurunkan kecemasan tanpa menambah banyak kode.

#### Resume Prompt (FR-34)

```
        +---------------------------------------+
        |                                       |
        |            Lanjut dari 12:34?         |
        |                                       |
        |       Cerita 01 — Bab 1                |
        |       Durasi 45:13 · tersisa 32:39     |
        |                                       |
        |      [   Mulai dari 0:00   ]           |
        |      [   ▶  Lanjut dari 12:34   ]     |
        |                                       |
        |            [ ✕ ]  lewati              |
        +---------------------------------------+
```

Muncul sekali saat membuka item yang punya progress dan `completed === false`. Tidak pernah muncul otomatis untuk item yang sudah `completed === true` — kalau begitu langsung mulai dari 0.

### 5.6 Settings

```
+==========================================================================+
| ← Kembali                                              [ tema: 🌙/☀️ ]  |
+==========================================================================+
|  PREFERENSI                                                                |
|  +----------------------------------------------------------------------+ |
|  | Tema                              [ Gelap | Terang | Sistem ]         | |
|  | Ukuran lompat        5s 10s 15s 30s  ->  ( 10s )                     | |
|  | Pertahankan nada     [ ON ]                                           | |
|  | Tampilkan subtitle   [ ON ]                                           | |
|  | Offset subtitle global              −  0 ms  (Reset)                 | |
|  +----------------------------------------------------------------------+ |
|                                                                          |
|  DATA & PENYIMPANAN                                                      |
|  +----------------------------------------------------------------------+ |
|  | Penyimpanan terpakai   124 MB dari 2.1 GB                            | |
|  | +--------------------------------------------------+                  | |
|  | |██████████████████████████████████░░░░░░░░░░░░░░░░░|  5.9%           | |
|  | +--------------------------------------------------+                  | |
|  |                                                                   | |
|  | Permintaan penyimpanan permanen  [ Ajukan ]                     | |
|  | Tahu: data hanya ada di browser ini. Menghapus data                | |
|  |       situs akan menghapus seluruh library.                         | |
|  |                                                                   | |
|  |  [ Export semua data (JSON) ]   [ Import dari JSON ]              | |
|  +----------------------------------------------------------------------+ |
|                                                                          |
|  APLIKASI                                                                |
|  +----------------------------------------------------------------------+ |
|  |  [ Pasang aplikasi ]                          terpasang ✓          | |
|  |  Versi 1.0.0 · build 2026-09-29                                     | |
|  |  Browser ini: showOpenFilePicker tersedia ✓                        | |
|  |  ⚠ Tanpa dukungan picker, file akan disalin ke penyimpanan        | |
|  |    browser dan terkena batas kuota. Chrome/Edge disarankan.       | |
|  +----------------------------------------------------------------------+ |
+==========================================================================+
```

> **D-12 — Settings menampilkan status kapabilitas browser, bukan dump teknis.** Deteksi `showOpenFilePicker` ditampilkan sebagai peringatan yang bisa ditindaklanjuti ("Chrome/Edge disarankan"), bukan sebagai baris debug yang membingungkan. User tidak perlu tahu apa itu FSA; dia perlu tahu kenapa aplikasinya melambat dan apa yang harus dilakukan.

---

## 6. Spesifikasi Komponen

### 6.1 Inventory

| Komponen | Berkas | State | Catatan a11y |
|---|---|---|---|
| `AppShell` | `components/layout/AppShell.tsx` | — | Landmark `<main>`, skip link |
| `AppBar` | `components/layout/AppBar.tsx` | scrolled | `<header role="banner">` |
| `NavTabs` | `components/layout/NavTabs.tsx` | active | `<nav>`, `aria-current="page"` |
| `OfflineBadge` | `components/layout/OfflineBadge.tsx` | online / offline | `role="status"`, `aria-live="polite"` |
| `InstallButton` | `components/layout/InstallButton.tsx` | hidden / available / installed | disembunyikan total bila tidak tersedia |
| `LibraryPage` | `components/library/LibraryPage.tsx` | loading / ready / empty / error | |
| `LibraryGrid` | `components/library/LibraryGrid.tsx` | — | `<ul role="list">` |
| `LibraryCard` | `components/library/LibraryCard.tsx` | 7 kondisi (§5.1) | `<li>`, fokus via Tab |
| `MissingFilesBanner` | `components/library/MissingFilesBanner.tsx` | count = 0 / n | `role="alert"` bila n > 0 |
| `ImportDialog` | `components/library/ImportDialog.tsx` | idle / reading / ready / error | focus trap, `Esc` close |
| `RelinkDialog` | `components/library/RelinkDialog.tsx` | idle / comparing / done / mismatch | focus trap |
| `PlayerPage` | `components/player/PlayerPage.tsx` | loading / ready | |
| `SubtitleStage` | `components/player/SubtitleStage.tsx` | — | `role="region"`, `aria-label="Subtitle"` |
| `SubtitleOverlay` | `components/player/SubtitleOverlay.tsx` | idle / active | **`aria-live="off"`** — lihat §11.3 |
| `OffsetPanel` | `components/player/OffsetPanel.tsx` | adjusting / idle | `role="group"`, `aria-label="Offset subtitle"` |
| `OffsetReadout` | `components/player/OffsetReadout.tsx` | — | `role="status"`, `aria-live="polite"` |
| `MiniTimeline` | `components/player/MiniTimeline.tsx` | — | `aria-hidden="true"` (dekoratif) |
| `SyncWizard` | `components/player/SyncWizard.tsx` | intro / listen / tune / done | focus trap, `Esc` batal |
| `CueList` | `components/player/CueList.tsx` | empty / filtered / full | `role="listbox"`, `aria-activedescendant` |
| `CueListItem` | `components/player/CueListItem.tsx` | default / active / played | `role="option"`, `aria-selected` |
| `Dock` | `components/player/Dock.tsx` | collapsed / expanded (mobile) | `<footer role="contentinfo">` |
| `DockMeta` | `components/player/DockMeta.tsx` | — | Judul + cue preview (D-09) |
| `TransportControls` | `components/player/TransportControls.tsx` | playing / paused / loading | |
| `SeekBar` | `components/player/SeekBar.tsx` | idle / hover / dragging / disabled | **`role="slider"`** + aria-value* |
| `RateSelector` | `components/player/RateSelector.tsx` | 6 opsi | `role="radiogroup"` |
| `VolumeControl` | `components/player/VolumeControl.tsx` | 0–100 | `role="slider"` |
| `BookmarkPanel` | `components/player/BookmarkPanel.tsx` | empty / list | |
| `BookmarkItem` | `components/player/BookmarkItem.tsx` | default | |
| `ResumePrompt` | `components/player/ResumePrompt.tsx` | — | Dialog, fokus ke aksi utama |
| `SettingsPage` | `components/settings/SettingsPage.tsx` | — | |
| `StorageUsage` | `components/settings/StorageUsage.tsx` | unknown / known / critical | `role="meter"` |
| `ShortcutReference` | `components/settings/ShortcutReference.tsx` | — | `<table>`, bukan daftar div |
| `Button` | `components/ui/Button.tsx` | 5 variant × 3 size | `disabled` + `aria-disabled` |
| `IconButton` | `components/ui/IconButton.tsx` | default | **`aria-label` wajib** |
| `Dialog` | `components/ui/Dialog.tsx` | open / closed | focus trap + restore, `Esc` |
| `Toast` | `components/ui/Toast.tsx` | info / success / warning / error | `role="status"` / `role="alert"` |
| `Tooltip` | `components/ui/Tooltip.tsx` | — | **bukan** channel informasi utama |
| `Slider` | `components/ui/Slider.tsx` | — | Primitive untuk SeekBar & Volume |
| `Segmented` | `components/ui/Segmented.tsx` | — | `role="radiogroup"` |
| `Switch` | `components/ui/Switch.tsx` | on / off | `role="switch"` |
| `Badge` | `components/ui/Badge.tsx` | 6 warna semantik | |
| `Tabs` | `components/ui/Tabs.tsx` | — | `role="tablist"`, panah kiri/kanan |
| `Skeleton` | `components/ui/Skeleton.tsx` | — | `aria-hidden`, `aria-busy` |
| `EmptyState` | `components/ui/EmptyState.tsx` | — | Heading + aksi |

### 6.2 Spesifikasi Detail

#### `SubtitleOverlay`

```
Perilaku
  - Menerima teks cue yang SUDAH aktif dari rAF loop (requirements.md §8.2)
  - Tulis via textContent imperatif, bukan lewat state
  - Maksimal 2 baris; baris ke-3 dipotong dengan ellipsis
  - Lebar maksimum 90% dari stage
  - Padding stage bagian bawah minimal 8% agar tidak pernah tertutup dock
  - Pointer-events: none, kecuali click-to-reveal saat teks terpotong

Token yang dipakai
  font-size   : var(--text-subtitle)
  line-height : var(--lh-subtitle)
  font-weight : var(--fw-subtitle)
  color       : var(--subtitle-fg)
  background  : var(--subtitle-bg)
  text-shadow : var(--subtitle-shadow)
  radius      : var(--radius-md)
  padding     : 0.4em 0.8em
  max-width   : 90%

Kondisi
  idle   : elemen kosong, tetap punya tinggi minimum (72px) supaya stage tidak "melompat"
  active : teks + background
  hidden : seluruh stage disembunyikan saat subtitleVisible === false
```

> **D-13 — Overlay subtitle punya tinggi minimum even when idle.** Tanpa ini, subtitle yang kosong membuat stage menyusut seketika, dan subtitle berikutnya masuk dengan posisi yang melompat. Memakai tinggi minimum 72px (atau 2 baris) menjaga posisi teks stabil sepanjang playback.

#### `SeekBar`

```
Struktur
  <div role="slider"
       aria-label="Posisi playback"
       aria-valuemin={0}
       aria-valuemax={durationMs}
       aria-valuenow={positionMs}
       aria-valuetext="0 menit 42 detik dari 45 menit 13 detik"
       tabindex={0}>

Lapisan (z-order bawah ke atas)
  1. .track         bg: --bg-inset,  height 4px,  radius full
  2. .buffered      bg: --border-strong, tinggi sama, lebar = rasio buffer
  3. .fill          bg: --accent-500, lebar = position/duration
  4. .knob          12px (desktop) / 10px (mobile), muncul saat hover atau drag

Perilaku
  - Klik pada track     : seek ke posisi klik
  - Drag                : seek kontinu, throttled ke 1 frame
  - Keyboard            : ←/→ 5 detik, Shift+←/→ 1 detik, Home/End, PageUp/PageDown 10%
  - Update posisi       : TIDAK lewat React state (requirements.md §8.3)
  - Hover               : knob muncul, track menebal 4px → 6px, 120ms
  - During playback     : tidak ada transisi pada .fill (D-03)
```

| Kondisi | Tampilan |
|---|---|
| Default | Track 4px, tanpa knob |
| Hover / focus | Knob 12px muncul, track 6px |
| Dragging | Knob 12px, `cursor: grabbing`, update 1 frame |
| Durasi belum diketahui | Track disabled, `aria-valuenow=0` |
| Buffering | Fill terasa "nyangkut" sementara `readyState < 3`, knob berdenyut halus |

#### `OffsetPanel`

Spesifikasi lengkap di §9.

#### `LibraryCard`

```
Struktur
  <li>
    <article> — seluruh kartu adalah satu target klik
      <div class="thumbnail">      aspect-ratio 1, bg-inset, overflow hidden
        <img>  atau  <fallback> (ikon + inisial)
        <div class="hover-overlay">  tombol ▶ 48px, opacity 0 → 1
        <Badge>  "Selesai"  (kiri atas, hanya bila completed)
      </div>
      <h3>   judul, 2 baris clamp
      <div>  nama file audio, 1 baris ellipsis
      <div>  nama file subtitle ATAU "Tanpa subtitle"
      <div>  baris status (waktu / prompt / badge)
      <div class="progress">  2px, hanya bila 0 < progress < 95%
    </article>
  </li>

Interaksi
  Klik kartu        : buka /play/:itemId
  Klik tombol ▶     : putar langsung dari posisi terakhir
  Klik "sub+ subtitle" : buka ImportDialog dalam mode ganti-subtitle
  Klik "Pasang ulang"  : buka RelinkDialog

A11y
  <li> punya aria-label ringkas: "Cerita 01 — Bab 1, MP3, dengan subtitle,
  sudah selesai, 92% diputar"
```

---

## 7. State & Interaksi

### 7.1 Matriks State

Setiap layar punya empat kondisi. Tidak ada kondisi kelima yang boleh muncul tanpa desain.

| Layar | Loading | Ready | Empty | Error |
|---|---|---|---|---|
| Library | 6 skeleton kartu | grid | EmptyState §5.2 | banner + tetap tampil item yang ada |
| Player | spinner di stage | subtitle + panel | "Belum ada subtitle" + tombol pilih | banner di stage, audio tetap main |
| Cue list | skeleton 8 baris | daftar | "Subtitle tidak punya cue" | "Gagal memuat subtitle" |
| Settings | skeleton baris | form | — | toast |
| Dock | tidak ada (selalu tampil) | kontrol | tombol play disabled | tombol retry |

> **D-14 — Error tidak pernah menggantikan konten yang sudah ada.** Kalau seekbar gagal memuat, seekbar tetap tampil dan hanya sebagian area seek yang nonaktif. Mengganti seluruh halaman dengan pesan error adalah tanda kesalahan arsitektur, bukan tanda bahwa error-nya itu sendiri.

### 7.2 Micro-interaksi

| Interaksi | Durasi | Catatan |
|---|---|---|
| Hover tombol | 120ms | hanya `background` + `color` |
| Focus ring | 120ms | `outline` tidak di-animate (bikin jumpy) |
| Dialog masuk | 260ms | opacity 0→1 + translateY 8px→0 |
| Dialog keluar | 180ms | reverse, `--ease-exit` |
| Toast | 260ms | slide dari bawah, auto-dismiss 4 detik |
| Toast dengan Undo | 8 detik | "Item dihapus" + Undo. Hapus tanpa undo tidak pernah. |
| Tab berganti | 180ms | underline bergeser, bukan fade |
| Cue aktif berubah | 0ms | **D-03** |
| Knob seekbar | 0ms saat drag | mencegah efek "tertinggal dari jarinya" |

### 7.3 Toast

| Jenis | Pemicu | Durasi | Aksi |
|---|---|---|---|
| success | Import berhasil, export berhasil | 4 detik | — |
| info | Update tersedia, persist storage granted | 8 detik | Muat ulang |
| warning | Kuota > 80%, format best-effort | 6 detik | Lihat |
| error | Import gagal, export gagal | **persist** (tombol tutup) | Coba lagi |
| undo | Hapus item, hapus bookmark | 8 detik | Urungkan |

---

## 8. Subtitle UX

Bagian ini adalah inti produk. Semua keputusan di sini ada untuk membuat teks terbaca dan tepat waktu.

### 8.1 Rules Keterbacaan

| ID | Rule | Nilai | Alasan |
|---|---|---|---|
| **S-01** | Lebar maksimum | 90% lebar stage | Teks yang terlalu lebar mata sulit kembali ke awal baris. |
| **S-02** | Maksimal baris | 2, sisanya ellipsis | 3+ baris menutupi terlalu banyak area dan tidak sempat dibaca sebelum berganti. |
| **S-03** | Line height | 1.4 | Terlalu rapat membingungkan awal baris baru; terlalu renggang menciptakan jarak yang salah baca. |
| **S-04** | Font weight | 500 | Di atas artwork foto, weight 400 hilang. 700 terlalu tebal untuk durasi baca panjang. |
| **S-05** | Latar | `rgba(0,0,0,.72)` | Menjamin kontras minimum 4.5:1 dengan teks putih di atas foto apa pun. |
| **S-06** | Bayangan teks | 2 lapis | Jaring pengaman bila `--subtitle-bg` gagal ter-render. |
| **S-07** | Teks rata tengah | `text-align: center` | Rata kiri di bawah teks yang terpotong terlihat tidak simetris. |
| **S-08** | Penyejajaran baris | `text-wrap: balance` | Membagi teks jadi dua baris dengan panjang seimbang, bukan satu baris penuh satu baris satu kata. |
| **S-09** | `white-space: pre-line` | — | Menghormati `\n` dari cue tanpa menghormati spasi ganda yang tidak disengaja. |
| **S-10** | Safe area bawah | 8% tinggi stage | Overlay tidak pernah menutupi dock. |

### 8.2 Kontras

| Kombinasi | Rasio | Status |
|---|---|---|
| `#FFFFFF` di atas `rgba(0,0,0,.72)` di atas `#0B0D10` | 15.8:1 | AAA |
| `#FFFFFF` di atas `rgba(0,0,0,.72)` di atas foto terang (mis. `#F5F5F5`) | 4.7:1 | AA (lolos) |
| `#FFFFFF` di atas `rgba(0,0,0,.72)` di atas foto putih penuh (`#FFFFFF`) | 4.6:1 | AA (lolos, mendekati batas) |
| `--text-secondary` di atas `--bg-base` dark | 7.4:1 | AAA |
| `--text-tertiary` di atas `--bg-base` dark | 3.6:1 | **Hanya untuk teks non-esensial** |
| `--text-tertiary` di atas `--bg-base` light | 3.1:1 | **Hanya untuk teks non-esensial** |

> **D-15 — `--text-tertiary` tidak boleh dipakai untuk informasi yang harus dibaca.** Di kedua tema rasio-nya di bawah 4.5:1. Token ini hanya untuk placeholder, nama file, dan metadata yang punya kembar informatif di tempat lain. Semua angka dan label yang penting memakai `--text-primary` atau `--text-secondary`.

### 8.3 Cue List

```
+--------------------------------------------------------------------------+
|  ( Daftar Cue )  Bookmark (3)              [ cari di subtitle... ]       |
+==========================================================================+
|  0:01   Halo, ini cue pertama.                                           |
|  0:04   Cue kedua dengan italic.                                         |
|  0:08   Baris kedua memakai line break.                                   |
|  1:00   Cue ketiga, satu menit kemudian.              <-- AKTIF          |
|  1:05   Cue keempat.                                                     |
+--------------------------------------------------------------------------+
```

| Aspek | Spesifikasi |
|---|---|
| Baris aktif | `background: var(--accent-surface)`, border kiri 2px `--accent-500` |
| Cue terlewati | `--text-tertiary` (mendalam dari `--text-secondary`) |
| Timestamp | `--font-mono`, `text-xs`, tabular, lebar tetap 56px agar kolom lurus |
| Teks | 1 baris, `text-overflow: ellipsis` |
| Klik | lompat ke `cue.startMs` dengan offset dikoreksi |
| Scroll otomatis | **Hanya** bila cue aktif keluar dari viewport. Jangan auto-scroll saat user sedang scroll manual. |
| Highlight | Teks yang cocok pencarian diberi `<mark>` dengan `--accent-surface` + teks `--accent-500` |
| Kosong | "Subtitle ini tidak memiliki cue" |

> **D-16 — Auto-scroll cue list hanya saat active cue keluar dari viewport, dan langsung berhenti begitu user scroll manual.** Auto-scroll yang berjalan terus membuat daftar mustahil dibaca. Penentuan "user sedang scroll manual" pakai flag yang di-reset oleh `scrollend` atau timeout 3 detik.

### 8.4 Why No Click-to-Expand

Diusulkan ada interaksi "klik subtitle untuk menampilkan penuh" (seperti YouTube). **Ditolak untuk v1.** Alasannya: subtitle sudah punya `max 2 baris` + ellipsis, dan menambahkan interaksi ini membuat `pointer-events: none` jadi tidak murni, menambah permukaan bug, dan manfaatnya rendah karena cue aslinya selalu bisa dibaca penuh di cue list. Jika nanti dibutuhkan, ini fitur C yang mudah ditambahkan.

---

## 9. Panel Sinkronisasi

> Menyusun FR-24, FR-25, FR-26, FR-27. Ini panel **first-class**, bukan kontrol kecil yang disembunyikan di Settings. D-01.

### 9.1 Layout

```
+------------------------------------------------------------------+
|  PANEL SINKRONISASI                                              |
+------------------------------------------------------------------+
|                                                                  |
|  +----------------------------+  +----------------------------+  |
|  |  OFFSET SUBTITLE           |  |  CUE SEKARANG              |  |
|  |                            |  |                            |  |
|  |    − 0.300                 |  |  0:42  →  0:46             |  |
|  |    detik                   |  |                            |  |
|  |                            |  |  "Cue kedua dengan         |  |
|  |  [−500] [−100]  [0]  [+100] [+500]  | italic."                  |  |
|  |                            |  |                            |  |
|  |  ( ) Terapkan ke semua    |  |  -2s      0s      +2s       |  |
|  |      item                 |  |   |--------|-------|-----|  |  |
|  |                            |  |        [############]        |  |  |
|  |  shift+klik angka untuk    |  |            ^                |  |  |
|  |  mengetik nilai manual     |  |          audio               |  |  |
|  +----------------------------+  +----------------------------+  |
+------------------------------------------------------------------+
```

### 9.2 Offset Readout

| Aspek | Spesifikasi |
|---|---|
| Format | Selalu 3 desimal: `-0.300`, `+0.000`, `+1.250` |
| Tanda | `+` eksplisit untuk nilai positif, `−` (U+2212) untuk negatif — bukan `-` ASCII |
| Font | `--font-mono`, `--text-3xl`, `tabular-nums` |
| Warna | `--text-primary` normal; `--warning` bila `abs > 2000ms` (sinyal bahwa ini mungkin keliru) |
| Label | "detik" di bawah angka, `--text-xs`, `--text-tertiary` |
| Pembulatan | Bulatkan ke bawah (floor) agar tampilan tidak pernah lebih besar dari nilai sebenarnya |
| Role | `role="status"` + `aria-live="polite"` agar screen reader mengumumkan perubahan |

> **D-17 — Readout dibulatkan ke bawah, bukan ke terdekat.** Offset +0.3006 detik ditampilkan `+0.300`, bukan `+0.301`. Pembulatan ke atas membuat angka terlihat seperti nilai yang lebih besar dari kenyataan, sehingga user justru mengoreksi ke arah yang salah.

### 9.3 Tombol Offset

| Tombol | Delta | Pintasan | Perilaku |
|---|---|---|---|
| `−500` | −500ms | `Shift` + `[` | Klik = 1 langkah; tahan = repeat tiap 120ms |
| `−100` | −100ms | `[` | idem |
| `0` | → 0 | `0` | Reset, disabled saat sudah 0 |
| `+100` | +100ms | `]` | idem |
| `+500` | +500ms | `Shift` + `]` | idem |

Semua perubahan bersifat **instan dan real-time** (FR-25) — subtitle bergeser pada frame yang sama dengan perubahan readout, tanpa perlu ada hal lain yang berubah.

Batas: `clamp(nilai, -5000, 5000)`. Saat mencapai batas, tombol disable dan tampilkan `-5.000 / +5.000 detik adalah batas`.

**Input manual:** `shift+klik` pada angka readout mengubahnya menjadi `<input type="number">` dengan `step=0.1`, `min=-5`, `max=5`, `unit=detik`. Enter atau blur mengonfirmasi, `Esc` membatalkan. Untuk kasus subtitle yang meleset jauh — misalnya subtitle anime yang tertunda 40 detik.

### 9.4 "Terapkan ke Semua Item"

Checkbox, **default tidak aktif** (FR-26 meminta per-item).

Saat aktif, menampilkan konfirmasi: "Offset ini akan diterapkan ke 12 item lain." Karena mengubah offset semua item hampir selalu tidak disengaja dan sulit dibatalkan. Terapkan, lalu checkbox kembali ke tidak aktif.

### 9.5 Mini Timeline

Visualisasi yang menjawab pertanyaan "kenapa subtitle saya meleset?"

```
     -2s          -1s           0s          +1s          +2s
      |-------------|------------|------------|------------|
    0:40           0:41         0:42         0:43         0:44
                                   ^
                            posisi audio
   [================[  C U E  A K T I F  ]==================]
```

Saat offset negatif, blok cue bergeser **ke kanan** relatif terhadap penanda audio:

```
     -2s          -1s           0s          +1s          +2s
      |-------------|------------|------------|------------|
                                   ^
                            posisi audio
                              [======[ C U E ]======]
```

| Aspek | Spesifikasi |
|---|---|
| Jendela | `positionMs ± 2000ms` (total 4 detik) |
| Lebar | 300px desktop, full-width mobile |
| Blok cue | Lebar proporsional terhadap durasi cue, tinggi 22px, radius 4px, `background: --accent-500` |
| Penanda audio | Garis vertikal 2px `--text-primary`, `position: absolute` |
| Skala | Label `-2s`, `-1s`, `0s`, `+1s`, `+2s` di bawah, `--text-2xs` mono |
| Perilaku | Di-render ulang **hanya** saat offset berubah atau cue berganti. Bukan tiap frame. |
| A11y | `aria-hidden="true"` — data yang sama sudah tersedia di `aria-valuetext` offset dan di cue list |

### 9.6 Interaksi dengan Cue List

Menekan offset di panel **tidak** mengubah posisi cue di cue list — cue list menampilkan waktu subtitle apa adanya. Yang bergeser adalah tampilan di stage. Ini mencegah user salah paham: daftar tetap jujur tentang isi file, panel yang menunjukkan koreksi.

---

## 10. Guided Sync Wizard

> Menyusun **FR-45** (prioritas S). Dipicu sekali, saat pertama kali sebuah item/library punya subtitle yang belum punya offset tersimpan.

### 10.1 Kapan Muncul

- Pertama kali user attach subtitle ke item mana pun → tawarkan, bukan paksa
- Hanya satu wizard yang boleh terbuka; membuka wizard kedua akan menimpa yang pertama
- Kalau user menolak, item ditandai `syncHintDismissed: true` dan tidak ditanyakan lagi untuk item itu

### 10.2 Tiga Langkah

```
Langkah 1 — PENDAHULUAN
+----------------------------------------+
|                                        |
|           ◇ Sinkronisasi                |
|                                        |
|  Subtitle dan audio kadang punya       |
|  selisih waktu sedikit. Kita akan      |
|  bantu menyesuaikannya.                |
|                                        |
|  Butuh sekitar 30 detik.               |
|                                        |
|         [  Mulai  ]                    |
|         Lewati                         |
+----------------------------------------+

Langkah 2 — DENGARKAN
+----------------------------------------+
|                                        |
|  Dengarkan 15 detik pertama, lalu      |
|  perhatikan apakah teksnya:            |
|                                        |
|  +----------------------------------+  |
|  |  ⊖  Terlalu cepat   (audio       |  |
|  |    audionya terdengar terlalu cepat                 |  |
|  +----------------------------------+  |
|  |  ⊕  Terlalu lambat  (audio       |  |
|  |    _fast forward_)               |  |
|  +----------------------------------+  |
|                                        |
|         [ Mengulang ]  [ Lanjut ]      |
+----------------------------------------+

Langkah 3 — HALUSKAN
+----------------------------------------+
|                                        |
|  Sekarang geser subtitle sampai        |
|  pas dengan suara.                     |
|                                        |
|  +----------------------------------+  |
|  |        − 0.300  detik           |  |
|  |                                  |  |
|  |  [−500][−100][0][+100][+500]    |  |
|  |                                  |  |
|  |  [   Selesai & Simpan   ]        |  |
|  +----------------------------------+  |
|                                        |
|  Lewati — simpan sebagai 0 detik      |
+----------------------------------------+
```

### 10.3 Spesifikasi

| Aspek | Spesifikasi |
|---|---|
| Total durasi | 30–45 detik |
| Audio diputar | Dari 0, 15 detik, di-loop sampai user memilih |
| Kontrol | Step 2: dua tombol besar. Step 3: panel offset penuh (re-use `OffsetPanel`) |
| Navigasi | `Esc` = batal dari mana pun, dialog close, **tidak** ada perubahan tersimpan |
| Perhatian | Wizard **tidak boleh** auto-play sebelum ada user gesture. Audio baru mulai setelah klik "Mulai". |
| Penyimpanan | Selesai → tulis `subtitleOffsetMs` ke item. `syncHintDismissed` **di-set `true`** di kedua jalur (selesai atau batal), supaya item yang sama tidak pernah ditawari wizard lagi. |
| Traceability | AC baru: **AC-17** (lihat §14) |

> **D-18 — Langkah 2 memakai dua tombol, bukan slider.** Pertanyaan "apakah subtitle terlalu cepat atau lambat?" adalah pertanyaan kategorikal, bukan kontinum presisi. Slider di langkah ini akan membuat user mengutak-atik angka sebelum dia tahu arah masalahnya. Penyesuaian presisi baru relevan di langkah 3, setelah arah sudah diketahui.

---

## 11. Aksesibilitas

Menyusun NFR-12 dan NFR-13.

### 11.1 Aturan Umum

| Aturan | Nilai |
|---|---|
| Skip link | `<a href="#main" class="skip-link">` — muncul saat focus, melompat ke konten utama |
| Focus ring | `outline: 2px solid var(--accent-500); outline-offset: 2px` — **tidak pernah** `outline: none` tanpa pengganti |
| Target sentuh | Minimal 44 × 44px di mobile (`--space-11` = 44px) |
| Font zoom | Semua ukuran dalam `rem`, bukan `px`, agar zoom browser 200% tidak merusak layout |
| Urutan fokus | Mengikuti urutan DOM. Tidak ada `tabindex` positif. |

### 11.2 Focus Order per Halaman

```
Library:  skip-link → nav tabs → search → sort → [+ Tambah] → kartu 1..n → dock
Player:   skip-link → nav tabs → [subtitle toggle] → [bookmark] → offset panel
          → cue search → cue list (satu tab stop, panah untuk navigasi) → dock
Settings: skip-link → nav tabs → tiap baris preferensi → dock
Dialog:   focus trap. FOKUS AWAL = elemen utama atau "Batal" bila destruktif.
          FOKUS AKHIR dikembalikan ke pemicu saat dialog ditutup.
```

### 11.3 Subtitle & Screen Reader

> **Keputusan yang mudah salah: apa yang diumumkan?**

Menyalakan `aria-live` pada overlay subtitle akan membuat screen reader membacakan setiap cue yang berganti — beberapa kali per menit. Itu membuat aplikasi tidak bisa dipakai.

Aturannya:

```html
<!-- Overlay: TIDAK diumumkan -->
<div class="subtitle-overlay" aria-live="off" aria-hidden="true">

<!-- Cue aktif yang bisa dibacakan secara manual -->
<button aria-label="Bacakan subtitle saat ini">
  <span role="status" aria-live="polite">{activeCueText}</span>
</button>
```

| Pemakaian | Perilaku |
|---|---|
| Overlay subtitle | `aria-live="off"` + `aria-hidden="true"` — murni visual |
| Tombol "Bacakan subtitle" di panel sinkronisasi | `aria-live="polite"`, diumumkan **hanya atas klik** |
| Seekbar | `aria-valuetext` selalu dalam bentuk verbal: "0 menit 42 detik dari 45 menit 13 detik" |
| Offset readout | `aria-live="polite"` — diumumkan tiap perubahan, karena itu aksi yang sedang user lakukan |
| Perubahan cue di cue list | `aria-activedescendant` berpindah via panah, bukan auto-scroll |

### 11.4 Tabel Kontras Token

| Kombinasi | Dark | Light | Status |
|---|---|---|---|
| `--text-primary` / `--bg-base` | 17.2:1 | 18.1:1 | AAA |
| `--text-secondary` / `--bg-base` | 7.4:1 | 7.1:1 | AAA |
| `--text-secondary` / `--bg-surface` | 6.6:1 | 6.8:1 | AA |
| `--accent-500` / `--bg-base` | 5.9:1 | 5.6:1 | AA |
| `--on-accent` / `--accent-500` | 4.6:1 | 6.1:1 | AA |
| `--danger` / `--bg-surface` | 5.1:1 | 4.9:1 | AA |
| `--warning` / `--bg-surface` | 8.1:1 | 5.4:1 | AA |
| `--success` / `--bg-surface` | 9.2:1 | 4.6:1 | AA |
| `--subtitle-fg` / `--subtitle-bg` | 15.8:1 | 15.8:1 | AAA |

### 11.5 Keyboard — Titik Konflik dengan requirements.md §5.1

Semua pintasan di requirements.md §5.1 berlaku. Yang ditambahkan oleh dokumen ini:

| Key | Aksi | Alasan |
|---|---|---|
| `?` | Buka referensi pintasan | Tidak ada di §5.1 |
| `Esc` | Tutup dialog / wizard | Standar, tidak bentrok |

**Penyelesaian konflik fokus:** saat user mengetik di `<input>` (search, label bookmark, input offset), **semua pintasan single-key dinonaktifkan**. `Esc`, `Tab`, `Enter`, dan `Ctrl/Cmd` tetap berfungsi. Tanpa aturan ini, mengetik label bookmark yang mengandung huruf `b` akan ikut membuat bookmark baru.

---

## 12. Responsif & Mobile

### 12.1 Tabel Perubahan

| Aspek | `sm` (360) | `md` (640) | `lg` (1024) | `xl` (1440) |
|---|---|---|---|---|
| Kolom library | 1 | 2 | 3 | 4 |
| Dock | 64px, ringkas | 88px | 88px penuh | 88px penuh |
| Seekbar dock | tidak ada | ada | ada | ada |
| Subtitle stage | `min(30vh, 300px)` | `min(38vh, 400px)` | `min(42vh, 480px)` | `min(45vh, 560px)` |
| `--text-subtitle` | 18px | 20px | 26px | 32px |
| Panel sinkronisasi | stack, ringkas | stack | 2 kolom | 2 kolom + gap besar |
| Cue list | full | full | 1 kolom | 2 kolom (kolom 2 = cue yang sudah terlewati) |
| Dialog | bottom sheet 90vh | bottom sheet | center 520px | center 560px |
| AppBar | 56px, tanpa nav label | 64px | 64px | 64px |

### 12.2 Breakpoint `md` ke `lg` — Titik Kritis

Dock berubah dari mobile ke desktop di `lg`. Selama transisi:

- Seekbar **muncul** → `aria-valuenow` tetap sama, tidak ada reset
- Kontrol yang tadinya di dalam bottom sheet **pindah** ke dock
- **Tidak boleh ada** state audio yang hilang saat transisi — dock hanya alias dari kontrol yang sama

### 12.3 Mobile — Sunyi

| Hal | Keputusan |
|---|---|
| Long-press | Tidak dipakai. Semua aksi punya tombol yang terlihat. |
| Swipe gesture | Hanya swipe horizontal pada seekbar (dengan konfirmasi di release). Tidak ada swipe-gesture tersembunyi untuk play/pause. |
| Haptic feedback | Dilewati. `navigator.vibrate` tidak didukung iOS Safari dan getarannya membosankan. |
| Orientation lock | Tidak dikunci. Landscape memberi stage lebih luas, dan itu bagus. |
| Pull-to-refresh | Dinonaktifkan. Tidak ada yang perlu di-refresh. |

---

## 13. Copy & Tone

### 13.1 Suara

- **Formal-hangat.** Pakai "Anda", bukan "kamu". Ini aplikasi kerja, bukan game.
- **Langsung.** Sebut masalahnya, sebut solusinya. Jangan menyapa, jangan memberi alasan yang tidak diminta.
- **Tanpa rasa bersalah.** "File tidak ditemukan" bukan "Ups, ada yang salah!"

### 13.2 Istilah

| Istilah | Pakai | Hindari |
|---|---|---|
| Library | "Library" | "Koleksi", "Perpustakaan" |
| Item | "item" | "Berkas" (terlalu formal), "file" (dipakai hanya untuk nama file) |
| Cue | "cue" | "Subtitle" (menyebut baris teks sebagai "subtitle" membingungkan karena subtitle = file) |
| Subtitle (file) | "subtitle" | "caption", "teks" |
| Offset | "offset" | "Koreksi waktu" (terlalu panjang untuk UI) |
| Sinkronisasi | "sinkronisasi" | "Sync" di teks UI — hanya boleh di nama shortcut |
| Bookmark | "bookmark" | "Penanda" (terlalu teknis untuk non-teknis) |
| Progress | "progress" | "Riwayat" |
| Selesai | "Selesai" | "Completed", "Tuntas" |

### 13.3 Pola Kalimat

```
Error    : [Apa yang terjadi]. [Apa yang bisa dilakukan].
            "Format file tidak didukung. Coba MP3, M4A, atau WAV."
            "File tidak ditemukan. Pasang ulang file untuk melanjutkan."
Sukses   : [Apa yang terjadi]. [Konfirmasi hasil, kalau relevan.]
            "12 item ditambahkan ke library."
            "Offset disimpan untuk item ini."
Warning  : [Fakta]. [Konsekuensi kalau diabaikan].
            "Penyimpanan 87% penuh. File baru mungkin gagal disimpan."
            "Browser ini tidak mendukung pemilihan file langsung.
             File akan disalin dan bisa cepat memenuhi kuota."
Info     : [Fakta saja].
            "Pembaruan tersedia. Muat ulang setelah selesai."
Empty    : [Kondisi]. [Aksi utama].
            "Library masih kosong. Tambahkan file audio pertama Anda."
```

**Aturan kapitalisasi & tanda baca:** sentence case, **tanpa** titik di akhir label tombol dan badge. Tambahkan titik di akhir kalimat error yang berupa kalimat utuh.

### 13.4 Label Tombol

| Aksi | Label | Bukan |
|---|---|---|
| Tambah file | "Tambah file" | "Import", "Upload", "+" |
| Pilih file | "Pilih file" | "Browse", "Jelajah" |
| Hapus | "Hapus" | "Remove", "Buang" |
| Simpan | "Simpan" | "Save", "Oke", "Konfirmasi" |
| Batal | "Batal" | "Cancel", "Tutup", "×" |
| Pasang ulang file | "Pasang ulang" | "Relink", "Pilih ulang" |
| Lanjut | "Lanjut dari 12:34" | "Resume", "Lanjutkan" |
| Geser subtitle | "Offset subtitle" | "Subtitle timing", "Sync" |

---

## 14. Traceability

### 14.1 Keputusan Desain → Requirement

| ID Keputusan | Requirement | Dijelaskan di |
|---|---|---|
| D-01 Subtitle sebagai fokus utama | FR-19, FR-20, FR-24 | §1.2, §8.1, §9 |
| D-02 Angka tabular | NFR-12, AC-01 | §3.2, §9.2 |
| D-03 Tidak ada animasi saat playback | NFR-01, NFR-03, AC-01 | §3.5, §7.2, §8.3 |
| D-04 Kontrol di satu tempat | FR-11, FR-12, FR-14, FR-15 | §2.2, §4.2 |
| D-05 Error punya jalan keluar | NFR-09, NFR-10, FR-07 | §5.1, §5.5, §7.1 |
| D-06 Nol request eksternal | NFR-07, FR-39, FR-40 | §3.1, §3.2, §1.2 |
| D-07 Larangan backdrop-filter | NFR-03 | §3.1 |
| D-08 tabular-nums | NFR-12 | §3.2 |
| D-09 Cue preview di dock | D-04, FR-19 | §4.2 |
| D-10 Stage berbasis vh | FR-19 | §5.3 |
| D-11 Relink menjaga data | FR-07, AC-11 | §5.5, §6.1 |
| D-12 Status kapabilitas browser | NFR-11 | §5.6 |
| D-13 Tinggi minimum overlay | NFR-01 | §6.2 |
| D-14 Error tidak mengganti konten | NFR-10 | §7.1 |
| D-15 text-tertiary terbatas | NFR-12 | §8.2 |
| D-16 Auto-scroll cue list | FR-28 | §8.3 |
| D-17 Bulatkan offset ke bawah | FR-24 | §9.2 |
| D-18 Wizard dua tombol | FR-45 | §10.3 |

### 14.2 Requirement → Halaman / Komponen

| Requirement | Halaman | Komponen utama |
|---|---|---|
| FR-01, FR-02 Import | Library | `ImportDialog`, `LibraryPage` |
| FR-03 Persistensi | (global) | `storage/`, `idb/` |
| FR-05 Hapus item | Library | `LibraryCard`, `Toast` (undo) |
| FR-06 Ganti subtitle | Library | `ImportDialog` (mode ganti) |
| FR-07 File hilang | Library | `MissingFilesBanner`, `RelinkDialog` |
| FR-08 Export / import | Settings | `ExportImportCard` |
| FR-11 s/d FR-15 Player | Dock | `TransportControls`, `SeekBar`, `RateSelector`, `VolumeControl` |
| FR-19 s/d FR-22 Subtitle | Player | `SubtitleStage`, `SubtitleOverlay` |
| FR-23 Toggle subtitle | Dock, Player | Switch, pintasan `C` |
| FR-24 s/d FR-27 Offset | Player | `OffsetPanel`, `OffsetReadout`, `MiniTimeline` |
| FR-28 Cue list | Player | `CueList`, `CueListItem` |
| FR-29 Cari cue | Player | `CueList` search |
| FR-31 s/d FR-34 Bookmark | Player | `BookmarkPanel`, `BookmarkItem`, `ResumePrompt` |
| FR-35 Tandai selesai | Library | `LibraryCard` badge |
| FR-38 s/d FR-44 PWA | Settings | `InstallButton`, `OfflineBadge`, `StorageUsage` |
| FR-45 Sync wizard | Player | `SyncWizard` |
| NFR-12, NFR-13 A11y | (global) | `Tooltip`, `IconButton`, `SkipLink` |

### 14.3 Acceptance Criteria

AC-01 s/d AC-16 didefinisikan di `requirements.md` §10. AC-17 s/d AC-21 adalah tambahan yang lahir dari dokumen desain ini dan **sudah ditambahkan** ke `requirements.md` §10 agar tetap menjadi sumber tunggal.

| ID | Kriteria | Sumber |
|---|---|---|
| **AC-17** | **Given** user baru dengan subtitle tanpa offset, **When** attach subtitle dan menjalankan wizard, **Then** wizard selesai dalam ≤ 45 detik, offset tersimpan, dan user dapat menyetel subtitle dengan benar tanpa membaca dokumentasi. | §10 |
| **AC-18** | **Given** user sedang mengetik label bookmark, **When** mengetik huruf `b`, **Then** tidak ada bookmark baru yang dibuat. | §11.5 |
| **AC-19** | **Given** user memakai screen reader, **When** subtitle berganti, **Then** tidak ada pengumuman otomatis; hanya atas klik "Bacakan subtitle". | §11.3 |
| **AC-20** | **Given** library dengan 200 item, **When** membuka Library, **Then** scroll mulus, tidak ada layout shift setelah skeleton hilang. | §7.1 |
| **AC-21** | **Given** viewport diubah dari mobile ke desktop, **When** dock berubah dari 64px ke 88px, **Then** posisi playback, kecepatan, dan volume **tidak berubah** dan tidak ada jank. | §12.2 |

---

## 15. Checklist Pre-Ship

### 15.1 Design

- [ ] Semua token dipakai lewat nama semantik, tidak ada hex literal di komponen
- [ ] Light mode diuji di seluruh halaman, bukan hanya Library
- [ ] Semua state (§7.1) punya desain — termasuk yang jarang terlihat
- [ ] Semua kondisi `LibraryCard` (§5.1) terimplementasikan
- [ ] Tanpa `backdrop-filter` pada `SubtitleOverlay` (D-07)
- [ ] Semua angka waktu memakai `tabular-nums`
- [ ] Semua animasi playback memakai `--duration-instant` (D-03)
- [ ] Z-index hanya memakai nilai dari §3.6
- [ ] Semua ukuran dalam `rem`, bukan `px`

### 15.2 Subtitle UX

- [ ] Subtitle 2 baris + ellipsis bekerja pada cue terpanjang
- [ ] Kontras subtitle ≥ 4.5:1 di atas artwork paling terang
- [ ] Overlay tidak pernah tertutup dock di viewport mana pun
- [ ] Overlay tidak menyusut saat cue kosong (D-13)
- [ ] Offset berubah pada frame yang sama dengan perubahan readout (FR-25)
- [ ] Mini timeline bergeser ke arah yang benar untuk offset + dan −
- [ ] Auto-scroll cue list berhenti saat user scroll manual (D-16)

### 15.3 Aksesibilitas

- [ ] Seluruh alur utama selesai hanya dengan keyboard
- [ ] Focus trap bekerja di semua dialog
- [ ] Focus dikembalikan ke pemicu setelah dialog ditutup
- [ ] Overlay subtitle `aria-live="off"` (AC-19)
- [ ] `aria-valuetext` Seekbar berupa kalimat verbal
- [ ] Semua `IconButton` punya `aria-label`
- [ ] Single-key shortcut nonaktif saat mengetik (AC-18)
- [ ] Focus ring terlihat di semua elemen fokus
- [ ] `prefers-reduced-motion` tidak merusak subtitle
- [ ] Audit Lighthouse a11y ≥ 90

### 15.4 Responsif

- [ ] 360px, 640px, 1024px, 1440px, 1920px
- [ ] Transisi dock 64px → 88px tidak mereset state audio (AC-21)
- [ ] Dialog menjadi bottom sheet di mobile, centered di desktop
- [ ] Target sentuh minimal 44px di mobile
- [ ] 200% zoom browser tidak merusak layout

### 15.5 Traceability

- [ ] Setiap FR M (Must) punya minimal satu komponen di §14.2
- [ ] Setiap AC punya representasi visual di dokumen ini
- [ ] Tidak ada komponen di §6.1 yang tidak menjawab FR mana pun

---

**Akhir dokumen.**