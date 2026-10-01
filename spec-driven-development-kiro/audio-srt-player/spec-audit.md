# Spec Audit — Audio SRT Player

Dokumen ini adalah hasil eksekusi **`M0-T01` — Spec & Manual Audit**. Semua angka di bawah dihitung ulang pada audit ini, bukan Carry-over dari audit sebelumnya.

---

## 1. Tujuan

Dokumen ini menjadi hasil awal **M0 — Spec Audit**. Isinya adalah temuan yang perlu diverifikasi sebelum implementasi aplikasi dimulai.

M0-T01 adalah **task dokumentasi**. Tidak ada source code yang ditulis, tidak ada dependency yang dipasang, tidak ada runtime, database, atau deployment yang disentuh.

## 2. Sumber Audit

| Sumber | Lokasi | Catatan |
|---|---|---|
| Manual referensi | `Downloads/Workflow Vibe Coding - Panduan Praktis v.2.md` | Rangkuman Webinar Jago Vibe Coding Batch 2–5, Komunitas AI Builders. Berisi prinsip mindset, planning, PRD, design system, backup/version control, deploy, dan iterasi. |
| Spec folder | `Documents/audio-sub-player/` | 6 dokumen SDD. **Bukan** git repository pada saat audit ini. |
| App repository | `teknisiAkhirat/audio-srt-player` | **Tidak disentuh** oleh M0. |

> Manual dibaca utuh (254 baris), bukan hanya metadata. Prinsip yang relevan dengan SDD diekstrak pada bagian 3.

---

## 3. Matriks Manual → Dokumen SDD → Evidence → Status

Status: **PASS** (terpetakan penuh) · **PARTIAL** (terpetaman sebagian) · **GAP** (tidak ada) · **UNCLEAR** (butuh keputusan manusia)

| # | Prinsip Manual | Dokumen SDD | Evidence | Status |
|---|---|---|---|---|
| 1 | Posisikan diri sebagai Director of IT; yang penting **tahu mau bikin apa** | `roadmap.md` §Ringkasan, `requirements.md` §1–§2 | Tujuan belajar + Non-Tujuan tertulis eksplisit | PASS |
| 2 | Mulai dari **masalah nyata / pengalaman sendiri** | `requirements.md` §3 Persona & User Story | 3 persona, user story terstruktur | PASS |
| 3 | **Planning jangan dilewat**; semakin detail semakin baik | `requirements.md` | 45 FR + 15 NFR + 21 AC + model data + DoD | PASS |
| 4 | Buat dokumen **PRD + FRD + wireframe** | `requirements.md` (PRD/FRD), `design.md` §5 (wireframe) | Peta halaman + wireframe ASCII per halaman | PASS |
| 5 | **Blueprint.md** — tujuan, positioning, arsitektur, north star | `requirements.md` §1–§2, `design.md` §1–§2 | Ringkasan, sitemap, keputusan arsitektur | PASS |
| 6 | **Backup & version control** (rollback kalau rusak) | `roadmap.md` aturan pengerjaan | **Tidak ada `.git` di folder spec** | **GAP** |
| 7 | **Deploy** setelah build | `roadmap.md` M7, M9 | Disimpan sebagai milestone, belum dieksekusi | PARTIAL |
| 8 | **Revisi bertahap**; satu sesi = satu perubahan kecil | `tasks.md` §Cara Kerja, `roadmap.md` aturan 1 | "Satu task aktif pada satu waktu" | PASS |
| 9 | **Debug & iterasi**: salin error → perbaiki → approve → simpan | `tasks.md` §Aturan Adjust, gate **Test/Verify/Review** | Alur Adjust eksplisit per task | PASS |
| 10 | **Design system sebelum build** — design token, palette, UI component | `design.md` §3 (tokens), `tasks.md` T-02, T-03 | Token warna/tipografi/spacing/motion/z-index + 12 primitif UI | PASS |
| 11 | **Jangan percaya 100% output AI — selalu review** | `tasks.md` gate **Review**, `spec-audit.md` §4 | Review adalah checkbox wajib, bukan opsional | PASS |
| 12 | **Backup sebelum eksperimen besar** | — | Tidak ada mekanisme di spec repo (lihat #6) | **GAP** |
| 13 | **Jangan perfeksionis** — build MVP dulu | `roadmap.md` M1, `spec-audit.md` §6 | Vertical slice MVP ditetapkan eksplisit | PASS |
| 14 | **Simpan semua PRD di satu folder** | Folder spec terpusat | 6 dokumen dalam satu folder | PASS |
| 15 | Jalankan lokal: `npm i`, `npm run dev` | `requirements.md` §8.1, `tasks.md` §Perintah Verifikasi | Stack + script terdefinisi | PASS |
| 16 | Rekomendasi tool (Lovable / Bolt / Trae / Claude Code) | `requirements.md` §8.1 | **Stack yang dipilih berbeda dan disengaja** (Vite + React + TS) | UNCLEAR |
| 17 | Hemat biaya token / pilih tool sesuai level | — | Tidak relevan untuk proses SDD | UNCLEAR |
| 18 | Migrasi app lama ke framework baru | — | Proyek greenfield, tidak ada app lama | UNCLEAR |

### Ringkasan matriks

| Status | Jumlah | Nomor |
|---|---|---|
| PASS | 12 | 1, 2, 3, 4, 5, 8, 9, 10, 11, 13, 14, 15 |
| PARTIAL | 1 | 7 |
| GAP | 2 | 6, 12 |
| UNCLEAR | 3 | 16, 17, 18 |
| **Total** | **18** | |

> **Catatan.** Manual aimed at non-technical builders using Lovable/Replit. Prinsip **prosesnya** (planning-first, design-system-first, review, iterasi bertahap) seluruhnya sudah adopted. Prinsip **toolsnya** tidak, dan itu memang pilihan yang sudah dicatat di `requirements.md` §8.1 — bukan konflik.

---

## 4. Temuan yang Perlu Dibereskan

### 4.1 Penyimpanan data vs file — PASS (keputusan diterima)

Requirement menetapkan metadata aplikasi di localStorage, sedangkan file/reference di IndexedDB. Ini dipertahankan sebagai keputusan arsitektur dan perlu diuji terhadap ukuran data nyata.

### 4.2 Export / recovery — PASS (keputusan diterima)

Export JSON hanya berisi metadata, bookmark, progress, dan preferensi; isi file audio/subtitle tidak ikut diekspor. UI harus menjelaskan bahwa JSON adalah manifest/recovery metadata, bukan backup media.

### 4.3 Browser fallback — PASS (keputusan diterima)

File System Access API hanya tersedia pada browser tertentu. Jalur fallback IndexedDB perlu diuji khusus untuk quota dan file besar.

### 4.4 Performance target — PARTIAL

Requirement memuat target sinkronisasi sangat ketat sekaligus target drift 60 menit. Angka ini harus diperlakukan sebagai acceptance/performance target yang **perlu diukur**, bukan diasumsikan tercapai. Belum ada angka yang diukur — target M2/M8.

### 4.5 PWA dan offline — PASS (keputusan diterima)

Tidak boleh ada dependency runtime pada CDN/font/analytics eksternal jika NFR offline penuh tetap menjadi kontrak.

### 4.6 Task cross-reference — PASS (sudah diverifikasi ulang)

Seluruh ID FR/NFR/AC yang muncul di `design.md` dan `tasks.md` **ada** di `requirements.md`. Orphan = 0 di kedua dokumen. Lihat §5.

### 4.7 Scope MVP — PASS (vertical slice ditetapkan)

Requirement cukup luas. Implementasi dimulai dari vertical slice kecil: **audio → SRT → parse cue → play → subtitle sinkron**. Fitur library, relink, bookmark, PWA, accessibility, dan polish mengikuti milestone berikutnya. Rincian gerbang ada di §6.

### 4.8 Nama file canonical — PASS (selesai diperbaiki)

Nama file dokumen kebutuhan memakai bentuk jamak (`requirements.md`). Bentuk tunggal sudah tidak dipakai. Verifikasi ulang: **0 referensi tersisa** pada 6 file.

### 4.9 Catatan versi `design.md` — PASS (selesai diperbaiki)

Catatan versi lama menyatakan wireframe `requirements.md` §9 masih menggambarkan player **full-screen**. Klaim tersebut sudah obsolete: §9 sekarang memakai dock bawah + panel subtitle besar. Catatan ditulis ulang menjadi v1.1 dan menegaskan pembagian kewenangan: `requirements.md` = **WHAT**, `design.md` = **HOW**. Verifikasi: kemunculan "full-screen" = **0**.

### 4.10 Koponponen tanpa definisi — GAP

Empat nama komponen muncul di `requirements.md` §9 tetapi **tidak punya baris definisi** di `design.md` §6.1:

| Nama | Status | Catatan |
|---|---|---|
| `AudioEngine` | Probably bukan komponen UI | `requirements.md` §9 mencantumkannya di kolom "Komponen Utama" halaman Player, padahal `design.md` §6.1 hanya menginventarisasi komponen UI. Sebaiknya dipindah ke tabel "Modul logika". |
| `SearchInput` | GAP | Tidak didefinisikan di §6.1, tidak diberi baris file/state/a11y. |
| `PrefsEditor` | GAP | Tidak didefinisikan di §6.1. `tasks.md` T-23 menyebut `SettingsPage`, `StorageUsage`, `ShortcutReference` — bukan `PrefsEditor`. |
| `ExportImport` | GAP | Nama tidak konsisten dengan `design.md` §14.2 dan `tasks.md` T-22 yang memakai `ExportImportCard`. |

 Dua nama tambahan yang dipakai di dalam `design.md` tetapi tidak masuk inventaris §6.1:

| Nama | Dipakai di | Catatan |
|---|---|---|
| `ExportImportCard` | `design.md` §14.2, `tasks.md` T-22 | Tidak ada di §6.1 — kemungkinan tidak sengaja. |
| `SkipLink` | `design.md` §14.2 | Tidak ada di §6.1; `AppShell` di §6.1 hanya menyebut "skip link" di kolom catatan a11y. |

> **Arah yang sudah benar:** seluruh 44 komponen `design.md` §6.1 **ada** di `requirements.md` §9 (orphan = 0). Yang bermasalah adalah arah sebaliknya, yaitu nama yang hidup di requirement tapi tidak didefinisikan di design.

> **Belum diputuskan.** Definisi komponen mana yang benar (tambah ke `design.md` §6.1, atau koreksi nama di `requirements.md` §9) adalah keputusan arsitektur. Dicatat sebagai temuan, dikerjakan sebagai task `[DOC]` terpisah.

### 4.11 Version control untuk spec repo — GAP

Folder spec **bukan git repository** pada saat audit ini. Prinsip manual "backup & version control" dan "backup sebelum eksperimen besar" tidak terpenuhi. Konsekuensi: tidak ada rollback, dan "Commit" pada gate `tasks.md` tidak punya target repository untuk spec.

Mitigasi yang dipakai selama M0: salinan baseline keenam file dibuat sebelum perubahan pertama, dan setiap perubahan diverifikasi lewat diff terhadap baseline.

> **Belum diputuskan.** Apakah folder spec perlu `git init` + branch `refactor/audio-srt-player-spec-docs`, atau tetap file biasa, adalah keputusan proses. Dicatat, tidak dikerjakan sepihak.

### 4.12 Cakupan `spec-audit.md` — PASS

Dokumen ini sekarang memuat matriks manual (§3), temuan per dokumen (§4), hasil traceability (§5), batas vertical slice (§6), source of truth (§7), dan riwayat blok lama (§8).

---

## 5. Hasil Traceability

Rantai yang diverifikasi: **`requirements.md` → `design.md` → `tasks.md` → `roadmap.md`**

### 5.1 Angka

| Metrik | Nilai | Cara hitung |
|---|---|---|
| ID unik di `requirements.md` | **81** | 45 FR + 15 NFR + 21 AC |
| ID dirujuk `design.md` | 45 | 29 FR + 8 NFR + 8 AC |
| ID dirujuk `tasks.md` | 39 | 16 FR + 3 NFR + 20 AC |
| Orphan di `design.md` | **0** | setiap ID yang muncul di design ada di requirements |
| Orphan di `tasks.md` | **0** | setiap ID yang muncul di tasks ada di requirements |
| Komponen `design.md` §6.1 | **44** | baris tabel inventaris |
| Komponen design yang hilang dari `requirements.md` | **0** | arah design → requirements |
| Nama di `requirements.md` §9 tanpa definisi design | **4** | lihat §4.10 |
| Total task | **32** | 1 audit (`M0-T01`) + 31 implementasi (`T-01`–`T-31`) |
| Milestone | **10** | M0 s/d M9 |
| Gate group 6-item | **32** | satu per task, semua lengkap |
| Placeholder `**Evidence:**` | **32** | satu per task |
| Total checkbox | **228** | 32 gate × 6 (192) + checklist T-31 (13) + checklist M0-T01 (17) + template gate di header (6) |
| Karakter korup (U+FFFD) | **0** | 6 file, dibaca sebagai UTF-8 |
| Referensi nama file lama | **0** | 6 file |

### 5.2 Why angka berubah

| Angka | Sebelumnya | Sekarang | Penyebab |
|---|---|---|---|
| Total task | 31 | **32** | Ditambah `M0-T01` (Spec & Manual Audit) yang sebelumnya tidak ada sebagai task eksplisit. |
| Checkbox per task | 5 | **6** | Gate lama `Implement/Verify/Adjust/Doc check/Done` diganti `Implement/Test/Verify/Evidence/Review/Done` agar sesuai workflow `Spec → Task → Implement → Test → Verify → Evidence → Review → Commit`. |
| Total checkbox | 173 | **228** | 173 + 31 (gate 31 task T-xx naik 5→6) + 1 (template gate header 5→6) + 23 (M0-T01: 6 gate + 14 implement + 3 evidence). Checklist T-31 (13) tidak berubah. |
| Blocker milestone | A–I (9 blok) | **M0–M9 (10)** | `tasks.md` disinkronkan ke `roadmap.md`. |

Angka yang **tidak** berubah dan sudah diverifikasi ulang: 45 FR, 15 NFR, 21 AC, 44 komponen, 0 orphan, 0 karakter korup.

---

## 6. Batas Vertical Slice (MVP)

M0 kecil berarti **scope fitur kecil**. M0 kecil **tidak** berarti subtitle kecil atau UX seadanya.

### 6.1 Rantai yang harus terbukti

```
Audio
  ↓
SRT
  ↓
Parse Cue
  ↓
Play Audio
  ↓
Subtitle tampil
  ↓
Subtitle mengikuti audio
```

### 6.2 Enam klaim yang harus dibuktikan

| # | Klaim | Dibuktikan oleh |
|---|---|---|
| 1 | audio dapat dimainkan | `T-07` |
| 2 | SRT dapat dibaca | `T-04` |
| 3 | cue dapat diparse | `T-04` |
| 4 | cue aktif dapat ditentukan | `T-06` |
| 5 | **subtitle besar** dapat ditampilkan | `T-02`, `T-03`, `T-15` |
| 6 | subtitle berubah mengikuti audio | `T-06` + `T-07` + `T-15` |

### 6.3 Yang DI luar gerbang M1

Library grid dan skeleton · relink dan fingerprinting · bookmark · progress/resume · export/import · settings · PWA/service worker · offset panel penuh · guided sync wizard · dock responsif · audit a11y · E2E.

### 6.4 Yang TIDAK boleh dikorbankan saat memperkecil scope

Subtitle adalah **focal point utama** player, bukan caption pelengkap. Yang mengunci ini:

- `design.md` **D-01** — "Subtitle adalah fokus utama, bukan pelengkap"; kontrol subtitle tidak pernah dikubur di Settings.
- `requirements.md` §9.2 — subtitle stage mendapat proporsi vertikal terbesar pada Player desktop (~45%).
- `design.md` §8.1 **S-01**–**S-10** — lebar 90% stage, `line-height: 1.4`, weight 500, kontras ≥ 4.5:1, `text-wrap: balance`, safe area 8%.
- `requirements.md` §9.3 — `font-size: clamp(1.125rem, 2.6vw, 2rem)` = 18px mobile / 26px desktop / 32px `xl`, memakai `rem` agar zoom 200% tidak merusak layout.

**Aturan resolusi konflik:** bila muncul pilihan *lebih banyak kontrol terlihat* vs *subtitle mudah dibaca*, yang dikorbankan adalah **kontrol**, bukan subtitle. Jangan mengecilkan font, jangan memperkecil stage, jangan menambah baris kontrol di area subtitle demi muat lebih banyak tombol.

> `T-15` (`SubtitleStage` + `SubtitleOverlay`) ditarik ke M1 dari blok E semula khusus untuk menutup gerbang ini. Transport lengkap (`T-14`, `SeekBar`/`RateSelector`) tetap M3.

---

## 7. Source of Truth

Dua repository dipisah dengan tegas:

| | Spec / Learning Repository | Application Repository |
|---|---|---|
| Lokasi | `teknisiAkhirat/Aws-academy` | `teknisiAkhirat/audio-srt-player` |
| Isi | requirements, design, tasks, roadmap, audit, pembelajaran SDD | source code, tests, build, runtime, deployment |
| M0 | **Diubah** | **Tidak disentuh** |

Pembagian kewenangan antar dokumen:

| Dokumen | Sumber kebenaran untuk |
|---|---|
| `requirements.md` | **WHAT** — kebutuhan, FR/NFR, acceptance criteria, model data, Definition of Done |
| `design.md` | **HOW** — token, komponen, layout, interaksi, accessibility |
| `tasks.md` | Unit pekerjaan implementasi + jalur evidence |
| `roadmap.md` | Urutan belajar dan milestone M0–M9 |
| `spec-audit.md` | Temuan, matriks audit, batas MVP, hal yang belum selesai |
| `README.md` | Pintu masuk proyek |

Pada M0 ini **repository aplikasi tidak diubah sama sekali**.

---

## 8. Riwayat Blok Lama A–I

Blok A–I tidak lagi dipakai sebagai struktur utama `tasks.md`, tapi dipetakan ke milestone agar riwayatnya tetap dapat dirujuk:

| Blok lama | Isi | Milestone sekarang |
|---|---|---|
| A — Fondasi | T-01, T-02, T-03 | M0 |
| B — Subtitle sync engine | T-04, T-05, T-06, T-07 | M1 (T-05), M2 (T-16, T-18) |
| C — Persistensi & shell | T-08, T-09, T-10, T-11 | M4 (T-08, T-09, T-11), M3 (T-10) |
| D — Import & relink | T-12, T-13 | M4 (T-12), M6 (T-13) |
| E — Player | T-14, T-15, T-16, T-17 | M1 (T-15), M3 (T-14, T-17), M2 (T-16) |
| F — Offset panel, bookmark, wizard | T-18, T-19, T-20, T-21 | M2 (T-18, T-21), M5 (T-19, T-20) |
| G — Data, settings, PWA, keyboard | T-22, T-23, T-24, T-25, T-26 | M6 (T-22), M3 (T-23, T-26), M7 (T-24, T-25) |
| H — Polish & verifikasi akhir | T-27, T-28, T-29, T-30 | M3 (T-27), M8 (T-28, T-29, T-30) |
| I — Penutupan | T-31 | M9 |

ID task `T-01` s/d `T-31` **tidak diubah** sehingga seluruh rujukan lama tetap berlaku. Yang dipindahkan hanya pengelompokannya.

---

## 9. Keputusan Sementara

- `requirements.md` = sumber kebutuhan dan acceptance criteria.
- `design.md` = sumber keputusan arsitektur/UI.
- `tasks.md` = unit pekerjaan implementasi.
- `roadmap.md` = urutan belajar dan milestone M0–M9.
- `spec-audit.md` = hasil audit, temuan, dan konflik yang belum selesai.
- `README.md` = pintu masuk proyek.

## 10. Temuan Terbuka (menunggu keputusan)

1. **§4.10** — 4 nama komponen di `requirements.md` §9 tanpa definisi `design.md` §6.1, plus 2 nama (`ExportImportCard`, `SkipLink`) yang dipakai di design tapi tidak diinventarisasi.
2. **§4.11** — folder spec belum punya version control.
3. **§4.4** — target sinkronisasi/drift belum pernah diukur.
4. **§3 baris 16** — selisih filosofi tool antara manual (Lovable-first) dan stack yang dipilih (Vite + React + TS) perlu dikonfirmasi masih relevan.

## 11. Rule Perubahan

Jika implementasi menemukan konflik, jangan menambal kode untuk menutupi konflik. Buat task `[DOC]`, perbarui dokumen sumber yang benar, lalu sinkronkan dokumen terkait.

> **NO EVIDENCE, NO DONE.**
>
> **Satu task aktif pada satu waktu.**
>
> **Scope fitur boleh kecil; reading experience subtitle tidak boleh dikorbankan.**
