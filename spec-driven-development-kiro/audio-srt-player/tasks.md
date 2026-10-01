---
project: audio-srt-player
document: tasks
status: draft
---

# Tasks - Audio Subtitle Player (ASP)

Dokumen ini adalah **pekerjaan yang harus dijalankan**, diturunkan dari `requirements.md` (sumber kebutuhan / WHAT) dan `design.md` (sumber keputusan UI-UX / HOW). Tidak ada ide baru di sini; setiap task harus bisa ditelusuri ke ID di kedua dokumen.

Struktur task mengikuti milestone **M0-M9** dari `roadmap.md`. ID task `T-01` s/d `T-31` **tidak berubah** - yang dipindahkan hanya pengelompokan ke milestone, sehingga seluruh riwayatnya tetap dapat dirujuk.

## Cara Kerja Setiap Task

Setiap task memakai siklus yang sama. Jangan melompat ke task berikutnya sebelum task aktif **Done**.

```
Spec
  |
Task
  |
Implement
  |
Test
  |
Verify
  |
Evidence
  |
Review
  |
Commit
```

### Aturan Adjust

- Gagal di VERIFY -> **Adjust di task yang sama**, bukan task baru.
- Hasilnya beda dari `requirements.md` atau `design.md` -> **Adjust di task yang sama**, atau koreksi dokumen dulu kalau memang dokumennya yang salah (pakai task `[DOC]`).
- Kalau satu task butuh lebih dari ~1 sesi kerja, pecah jadi beberapa task baru - jangan jadi satu task raksasa.
- Konflik tidak diselesaikan diam-diam di kode. Buat task `[DOC]`, perbaiki sumber dokumen, baru lanjut.

### Perintah Verifikasi (standar)

```bash
npm run typecheck   # tsc --noEmit, strict
npm run lint        # eslint
npm run test        # vitest run
npm run build       # hanya untuk task yang menyentuh konfigurasi/bundling
```

E2E (`npx playwright test`) hanya untuk task bertanda `[E2E]`.

### Jalur Evidence (wajib per task)

Tiap task harus punya jejak untuk **enam** tahap berikut. Tidak perlu delapan kolom; yang wajib adalah tidak ada tahap yang dilewati tanpa bukti.

| Tahap | Isi | Bukti minimum |
|---|---|---|
| **Implementation** | kode selesai ditulis sesuai `requirements.md` + `design.md` yang dirujuk | daftar file tersentuh |
| **Test** | test otomatis ditulis/ditambahkan | nama test yang dijalankan |
| **Verification** | `typecheck` + `lint` + `test` (+ `build`/`e2e` bila relevan) hijau | output ringkas perintah |
| **Evidence** | artefak hasil: capture, log, angka drift, screenshot | path/link artefak |
| **Review** | hasil dicocokkan balik ke requirement/design yang dirujuk | catatan selisih, atau "selaras" |
| **Commit** | perubahan disimpan pada branch fitur | pesan commit |

> **NO EVIDENCE, NO DONE.** Task tanpa evidence tidak boleh dicentang **Done**, meskipun test hijau.

### Checkboxes

Setiap task punya 6 checkbox yang **wajib** dicentang berurutan:

- [ ] **Implement** - kode selesai ditulis
- [ ] **Test** - test ditulis / diperbarui dan dijalankan
- [ ] **Verify** - typecheck + lint + test hijau
- [ ] **Evidence** - artefak hasil disimpan (path dicatat di baris *Evidence* pada task)
- [ ] **Review** - perilaku dicek ulang terhadap `requirements.md` + `design.md` yang dirujuk
- [ ] **Done** - task selesai

---

## Gerbang Vertical Slice (M1)

M0 sengaja dibiarkan kecil: **scope fitur kecil**. Yang tidak boleh dikorbankan adalah **reading experience subtitle**. Scope kecil berarti lebih sedikit fitur, bukan subtitle yang lebih kecil.

Rantai yang harus terbukti di M1:

```
Audio
  |
SRT
  |
Parse Cue
  |
Play Audio
  |
Subtitle tampil
  |
Subtitle mengikuti audio
```

Enam klaim yang harus dibuktikan, dengan task yang:

| # | Klaim | Dibuktikan oleh |
|---|---|---|
| 1 | audio dapat dimainkan | T-07 `[CORE]` |
| 2 | SRT dapat dibaca | T-04 `[PARSER]` |
| 3 | cue dapat diparse | T-04 `[PARSER]` |
| 4 | cue aktif dapat ditentukan | T-06 `[CORE]` |
| 5 | subtitle **besar** dapat ditampilkan | T-02 `[TOKENS]`, T-03 `[UI]`, T-15 `[PLAYER]` |
| 6 | subtitle berubah mengikuti audio | T-06 + T-07 + T-15 |

> **Catatan prioritas.** `design.md` D-01 menyatakan subtitle adalah fokus utama, bukan pelengkap. `requirements.md` §9.2 memberi subtitle stage proporsi vertikal terbesar (~45%) dan `design.md` §8.1 S-01..S-10 mengunci keterbacaannya.
>
> Jika terjadi konflik **lebih banyak kontrol terlihat** vs **subtitle mudah dibaca**, yang dikorbankan adalah kontrol, bukan subtitle. Jangan mengecilkan font, jangan perkecil stage, dan jangan menambah baris kontrol di area subtitle demi muat lebih banyak tombol.

Task T-15 ditarik ke depan ke M1 (dari blok E semula) khusus untuk menutup gerbang ini. Transport lengkap `SeekBar`/`RateSelector` tetap M3.

---

## Peta Task

Kolom Milestone menggantikan blok lama A-I dan mengikuti `roadmap.md`.

| ID | Task | Milestone | Rujukan | AC |
|---|---|---|---|---|
| T-01 | Scaffold project | M0 | req §8.1, §8.8 | — |
| T-02 | Design tokens + tema | M0 | des §3.1-3.4 | — |
| T-03 | Primitif UI | M0 | des §6.1 | — |
| T-04 | Model `Cue` + parser SRT | M1 | req §6.2, §14 | AC-15 |
| T-05 | Parser WebVTT | M1 | req §7.3, §14 | AC-15 |
| T-06 | `cue-sync` (binary search + offset) | M1 | req §8.2 | AC-01,02,03,04 |
| T-07 | `AudioEngine` (rAF loop) | M1 | req §8.2, §8.3 | AC-01,02 |
| T-08 | localStorage wrapper + skema | M4 | req §6.3, §8.6 | — |
| T-09 | IndexedDB wrapper file ref | M4 | req §6.5, §8.4 | AC-06 |
| T-10 | AppShell + AppBar + NavTabs | M3 | des §4.1, §11.1 | — |
| T-11 | LibraryPage + grid + kartu | M4 | des §5.1, §5.2 | AC-20 |
| T-12 | ImportDialog (FSA + fallback) | M4 | req §4.1, §7.2 | AC-07, AC-15 |
| T-13 | Fingerprinting + relink | M6 | req §6.4, §4.1 | AC-11 |
| T-14 | TransportControls + SeekBar | M3 | des §4.2, §6.2 | — |
| T-15 | SubtitleStage + Overlay | M1 | des §5.3, §8.1, §8.2 | AC-13, AC-19 |
| T-16 | `sync-apply` (offset real-time) | M2 | req §8.3 | AC-04 |
| T-17 | CueList + pencarian cue | M3 | des §8.3 | — |
| T-18 | OffsetPanel + readout + minitimeline | M2 | des §9.1-9.5 | AC-05 |
| T-19 | Bookmark CRUD | M5 | req §4.4 | AC-10 |
| T-20 | Progress autosave + ResumePrompt | M5 | req §4.4 | AC-09 |
| T-21 | SyncWizard (Guided Sync) | M2 | req §4.3 FR-45, des §10 | AC-17 |
| T-22 | Export / import JSON | M6 | req §4.1 | AC-14 |
| T-23 | SettingsPage | M3 | des §5.6 | — |
| T-24 | PWA: manifest + service worker | M7 | req §8.7 | AC-08 |
| T-25 | Toast update + install prompt | M7 | req §4.5 | AC-16 |
| T-26 | Pintasan keyboard | M3 | req §5.1, des §11.5 | AC-12, AC-18 |
| T-27 | Dock responsif | M3 | des §4.2, §4.3, §12.2 | AC-21 |
| T-28 | A11y audit + perbaikan | M8 | des §11.1-11.5 | AC-18,19,20 |
| T-29 | Audit warna & motion | M8 | des §11.4, §3.5 | — |
| T-30 | E2E Playwright | M8 | req §13 | semua |
| T-31 | Checklist pre-ship | M9 | des §15 | semua |

---

## Urutan Milestone

Milestone dikerjakan berurutan M0 -> M9. Dalam satu milestone, kerjakan juga berurutan.

| Milestone | Isi | Syarat keluar milestone |
|---|---|---|
| **M0 - Bootstrap & Spec Audit** | T-01, T-02, T-03 | Spec audit selesai tanpa konflik terbuka; baseline `npm run typecheck && npm run lint && npm run build && npm run test` hijau. |
| **M1 - Audio + SRT Core (vertical slice)** | T-04, T-05, T-06, T-07, T-15 | **Vertical slice terbukti.** Audio + SRT bisa diputar, cue ter-parse, cue aktif ditentukan, subtitle besar tampil dan berubah mengikuti audio. Lihat gate lengkap di bagian "Gerbang Vertical Slice". |
| **M2 - Synchronization Engine** | T-16, T-18, T-21 | Offset berlaku di frame yang sama dengan perubahan readout; boundary, gap, overlap, dan drift playback panjang punya test. |
| **M3 - Player UX** | T-10, T-14, T-17, T-23, T-26, T-27 | Transport, cue list, offset panel, pintasan, dan dock responsif jalan; dock 64px<->88px tidak mereset state audio (AC-21). |
| **M4 - Library & Persistence** | T-08, T-09, T-11, T-12 | Reload dan restart mempertahankan library, metadata, dan referensi file (AC-06, AC-07). |
| **M5 - Bookmark & Progress** | T-19, T-20 | Bookmark CRUD, autosave progress, resume prompt, dan state completed jalan (AC-09, AC-10). |
| **M6 - Relink & Backup** | T-13, T-22 | File hilang terdeteksi dan bisa di-relink tanpa kehilangan bookmark/progress/offset; export/import metadata jalan (AC-11, AC-14). |
| **M7 - PWA & Offline** | T-24, T-25 | Offline penuh tanpa request eksternal; update toast tidak memutus playback (AC-08, AC-16). |
| **M8 - Verification** | T-28, T-29, T-30 | A11y, kontras, motion, dan E2E hijau; evidence tersimpan untuk AC yang relevan. |
| **M9 - Ship** | T-31 | Checklist `design.md` §15 tercentang; traceability FR/NFR/AC terverifikasi ulang; release memenuhi Definition of Done `requirements.md` §13. |

> Urutan milestone adalah urutan **belajar/eksekusi**, bukan pengganti task detail. T-15 dipindahkan ke M1 secara sadar untuk menutup gerbang vertical slice; urutan asli blok A-I tetap tercatat di `spec-audit.md` § Riwayat Blok Lama.

---

## M0 - Bootstrap & Spec Audit

**Syarat keluar:** Spec audit selesai tanpa konflik terbuka; baseline `npm run typecheck && npm run lint && npm run build && npm run test` hijau.

M0 memuat dua kelompok: `M0-T01` (audit dokumen) dan bootstrap project `T-01` s/d `T-03`.

### M0-T01 `[DOC]` Spec & Manual Audit

**Rujukan:** `spec-audit.md`, `roadmap.md` M0, `requirements.md` (canonical filenames), `design.md` (catatan versi)

**File:** `requirements.md`, `design.md`, `tasks.md`, `roadmap.md`, `spec-audit.md`, `README.md`

**Implement:** task dokumentasi, **bukan** implementasi aplikasi. Tidak ada source code, tidak ada dependency, tidak ada runtime yang disentuh.

- [x] Baca manual referensi dan catat prinsip yang relevan — `Workflow Vibe Coding - Panduan Praktis v.2.md`, 18 prinsip diekstrak
- [x] Audit `requirements.md` - kebutuhan, user story, FR/NFR, AC, model data, DoD
- [x] Audit `design.md` - arsitektur, token, komponen, interaksi, a11y, traceability
- [x] Audit `tasks.md` - kelengkapan task, referensi silang, jalur evidence
- [x] Audit `roadmap.md` - keselarasan milestone dengan task
- [x] Audit traceability `requirements.md` -> `design.md` -> `tasks.md` -> `roadmap.md`
- [x] Audit source-of-truth - pemisahan spec repo vs app repo
- [x] Terapkan nama file canonical (`requirements.md`) dan bersihkan seluruh referensi ke nama lama — 0 sisa
- [x] Perbaiki catatan versi `design.md` yang obsolete — v1.0 -> v1.1
- [x] Sinkronkan `tasks.md` ke struktur milestone M0-M9 — 31 task, 0 duplikat, 0 omissions
- [x] Audit link `README.md` — 5/5 resolve
- [x] Tetapkan batas vertical slice MVP — 6 klaim, di `spec-audit.md` §6
- [x] Bangun matriks Manual -> Dokumen SDD -> Evidence -> Status (PASS/PARTIAL/GAP/UNCLEAR) di `spec-audit.md` — 18 baris
- [x] Verifikasi ulang traceability dan catat angka aktual beserta perubahannya — `spec-audit.md` §5.2

**Verify:** pencarian nama file lama = 0 hasil; `design.md` tidak lagi berisi klaim wireframe full-screen; `tasks.md` memakai M0-M9; semua link `README.md` resolve ke file yang ada; tidak ada karakter korup di 6 file.

**Evidence:**
- [x] Laporan M0 (git state, inventory, temuan per dokumen, matriks manual, angka traceability) — dilaporkan di sesi ini
- [x] Output perintah verifikasi mentah (jumlah referensi, jumlah FR/NFR/AC, jumlah komponen, jumlah task/checkbox) — 0 legacy ref, 45/15/21, 44 komponen, 32 task, 32 gate group, 228 checkbox, 0 U+FFFD
- [x] Daftar temuan diklasifikasi PASS / PARTIAL / GAP / UNCLEAR — `spec-audit.md` §3–§4, §10

**Adjust yang mungkin:** temuan yang butuh keputusan produk/arsitektur **dilaporkan, tidak diputuskan sendiri**. Tulis sebagai temuan terbuka di `spec-audit.md` dengan status UNCLEAR, lalu tunggu instruksi.

**Review (doc check):** matriks manual, angka traceability, dan batas MVP sudah dicocokkan ulang dengan isi file. Empat temuan terbuka dicatat di `spec-audit.md` §10 dan **tidak** diputuskan sepihak.
- [x] Implement
- [x] Test
- [x] Verify
- [x] Evidence
- [x] Review
- [x] Done

> **Catatan.** Task ini selesai tanpa version control karena folder spec bukan git repository (lihat `spec-audit.md` §4.11). Mitigasi: baseline keenam file dicadangkan sebelum perubahan pertama dan setiap perubahan diverifikasi lewat diff. Tahap **Commit** pada gate tidak dapat dijalankan untuk milestone ini.

**Rincian M0-T01:** lihat `spec-audit.md` untuk matriks audit manual dan temuan.

---


### T-01 `[SCAFFOLD]` Project skeleton

**Rujukan:** req §8.1 (stack), §8.8 (struktur direktori), des §6.1 (nama berkas komponen)

**File:** `package.json`, `tsconfig.json`, `vite.config.ts`, `eslint.config.js`, `index.html`, `src/main.tsx`, `src/App.tsx`, seluruh folder kosong di `src/`

**Implement:**
- `npm create vite@latest` varian react-ts, lalu install `zustand`, `tailwindcss@4` + `@tailwindcss/vite`, `vite-plugin-pwa`, `workbox-window`
- Dev: `typescript`, `@types/react`, `@types/react-dom`, `vitest`, `@vitest/coverage-v8`, `@playwright/test`, `eslint`, `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `jsdom`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`
- `tsconfig.json` dengan `"strict": true`
- Script: `dev`, `build`, `preview`, `typecheck` (`tsc --noEmit`), `lint`, `test` (`vitest run`), `test:watch`, `test:e2e`
- `vite.config.ts`: plugin react, plugin tailwind, plugin PWA (isi manifest-nya dipakai T-24)
- `.gitignore`: `node_modules`, `dist`, `coverage`, `playwright-report`, `.env*`
- Buat struktur direktori persis seperti req §8.8 (termasuk `lib/`, `components/ui/`, `hooks/`, `routes/`)

**Verify:** `npm run typecheck`, `npm run lint`, `npm run build`, `npm run test` (boleh 0 test), `npm run dev` → buka, halaman putih tanpa error konsol.

**Adjust yang mungkin:** Vite PWA plugin butuh `workbox-window`; kalau build gagal karena plugin, tambahkan dependency itu dulu.

**Review (doc check):** nama folder di §8.8 dan nama file komponen di des §6.1 harus cocok.

**Evidence:** _path / link artefak + ringkasan hasil verifikasi_

- [ ] Implement
- [ ] Test
- [ ] Verify
- [ ] Evidence
- [ ] Review
- [ ] Done

### T-02 `[TOKENS]` Design tokens + tema dark/light

**Rujukan:** des §3.1 (warna), §3.2 (tipografi), §3.3 (spacing), §3.4 (radius/border/elevation), §3.5 (motion), §3.6 (z-index), §3.7 (breakpoint), §3.8 (dock)

**File:** `src/styles/tokens.css`, `src/styles/base.css`, `src/styles/index.css`

**Implement:**
- Salin semua token warna, font, spacing, radius, elevation, motion, z-index, ukuran dock dari des §3 ke CSS custom properties
- Dark sebagai `:root` default; light lewat `[data-theme="light"]`
- Terapkan aturan `prefers-reduced-motion` dari des §3.5
- Helper class yang memakai nama token semantik, **tidak ada hex literal** di komponen mana pun

**Verify:** `npm run typecheck && npm run lint`. Cek visual: ganti `data-theme`, pastikan semua token berubah.

**Adjust yang mungkin:** kalau Tailwind v4 memakai `@theme`, sesuaikan sintaksnya; jangan sampai token terduplikasi.

**Review (doc check):** hitung jumlah token — harus cocok dengan des §3. Tidak boleh ada token di `tokens.css` yang tidak ada di design.md.

**Evidence:** _path / link artefak + ringkasan hasil verifikasi_

- [ ] Implement
- [ ] Test
- [ ] Verify
- [ ] Evidence
- [ ] Review
- [ ] Done

### T-03 `[UI]` Primitif UI dasar

**Rujukan:** des §6.1 (inventory), §13.4 (label tombol), §11.1 (focus ring)

**File:** `src/components/ui/*.tsx`

**Implement:** `Button` (5 variant × 3 size, `disabled` + `aria-disabled`), `IconButton` (**`aria-label` wajib**), `Badge` (6 warna), `Switch` (`role="switch"`), `Slider` (primitive), `Segmented` (`role="radiogroup"`), `Tabs` (`role="tablist"`, panah kiri/kanan), `Skeleton` (`aria-hidden` + `aria-busy`), `Tooltip`, `Toast` (`role="status"`/`role="alert"`), `Dialog` (focus trap + restore fokus + `Esc`), `EmptyState`

Label tombol mengikuti tabel des §13.4. Focus ring mengikuti des §11.1.

**Verify:** `npm run typecheck && npm run lint && npm run test`. Tulis test minimal: `Dialog` mengembalikan fokus ke pemicu, `IconButton` error kompiler tanpa `aria-label`.

**Adjust yang mungkin:** `Slider` butuh `role="slider"` + `aria-valuetext`; `SeekBar` (T-14) akan membangunNYA di atas primitive ini.

**Review (doc check):** setiap primitive ada di des §6.1 dengan state dan catatan a11y yang sama.

**Evidence:** _path / link artefak + ringkasan hasil verifikasi_

- [ ] Implement
- [ ] Test
- [ ] Verify
- [ ] Evidence
- [ ] Review
- [ ] Done

---

## Blok B — Subtitle sync engine

---

## M1 - Audio + SRT Core (vertical slice)

**Syarat keluar:** **Vertical slice terbukti.** Audio + SRT bisa diputar, cue ter-parse, cue aktif ditentukan, subtitle besar tampil dan berubah mengikuti audio. Lihat gate lengkap di bagian "Gerbang Vertical Slice".

### T-04 `[PARSER]` Model `Cue` + parser SRT

**Rujukan:** req §6.2 (skema `Cue`), §14 (fixture), §7.3, des §8.1

**File:** `src/lib/cue.ts`, `src/lib/parse-srt.ts`, `src/lib/__tests__/parse-srt.test.ts`, `src/test/fixtures/*.srt`

**Implement:**
- Tipe `Cue` persis seperti req §6.2
- Parser: `try/catch` per cue, cue buruk di-skip dan parsing lanjut (req R-07)
- Deteksi UTF-8 BOM
- Timestamp SRT `00:00:00,000 --> 00:00:00,000`; toleransi `.` sebagai pemisah desimal
- Inline markup bold/italic/line break (FR-22) disimpan terpisah dari teks mentah
- Cue hasil parse **diurutkan** berdasarkan `startMs`

**Verify:** `npm run test` — test dengan fixture req §14: cue valid, file kosong, timestamp rusak di tengah, BOM, cue overlap, baris tanpa nomor.

**Adjust yang mungkin:** kalau fixture req §14 tidak mencakup suatu kasus, tambahkan kasusnya di test, bukan di parser.

**Review (doc check):** nama field `Cue` harus identik dengan req §6.2.

**Evidence:** _path / link artefak + ringkasan hasil verifikasi_

- [ ] Implement
- [ ] Test
- [ ] Verify
- [ ] Evidence
- [ ] Review
- [ ] Done

### T-05 `[PARSER]` Parser WebVTT

**Rujukan:** req §7.3, §14, FR-21, R-07

**File:** `src/lib/parse-vtt.ts`, `src/lib/__tests__/parse-vtt.test.ts`, `src/test/fixtures/*.vtt`

**Implement:**
- Header `WEBVTT`, cue `00:00:00.000`, dan opsional `HH:MM:SS.mmm` (tanpa jam)
- Cue setting setelah timestamp diabaikan
- Teks `NOTE`, `STYLE`, `REGION` di-skip
- Markup inline sama dengan SRT
- Toleran terhadap file rusak, identik dengan SRT

**Verify:** `npm run test` — kedua parser harus punya tabel kasus edge yang sama supaya perilakunya konsisten.

**Adjust yang mungkin:** kalau ada perbedaan hasil antara SRT dan VTT untuk input yang setara, itu bug — samakan.

**Review (doc check):** §7.3 req.

**Evidence:** _path / link artefak + ringkasan hasil verifikasi_

- [ ] Implement
- [ ] Test
- [ ] Verify
- [ ] Evidence
- [ ] Review
- [ ] Done

### T-06 `[CORE]` `cue-sync` — binary search + offset

**Rujukan:** req §8.2, AC-01 s/d AC-04, des §6.2 `SubtitleOverlay`

**File:** `src/lib/cue-sync.ts`, `src/lib/__tests__/cue-sync.test.ts`

**Implement:**
- Binary search pada array `Cue` yang sudah terurut → `findCueIndexAt(cues, positionMs)`
- Offset diterapkan: `positionMs - offsetMs`
- Fungsi murni, tanpa akses DOM
- Kasus: seek, playback rate ≠ 1, offset negatif/positif, gap antar cue, cue overlap, array kosong

**Verify:** `npm run test` — butuh 100% branch coverage untuk file ini (req §13).

**Adjust yang mungkin:** kalau overlap cue menghasilkan hasil ambigu, tetapkan aturan eksplisit dan tulis di test.

**Review (doc check):** fungsi ini tidak boleh menyimpan state apa pun.

**Evidence:** _path / link artefak + ringkasan hasil verifikasi_

- [ ] Implement
- [ ] Test
- [ ] Verify
- [ ] Evidence
- [ ] Review
- [ ] Done

### T-07 `[CORE]` `AudioEngine` — rAF loop

**Rujukan:** req §8.2, §8.3, AC-01, AC-02, R-01, AC-16

**File:** `src/lib/audio-engine.ts`

**Implement:**
- Satu `<audio>` element, satu `requestAnimationFrame` loop
- `currentTime` dibaca di dalam rAF, **tidak pernah** masuk React/Zustand state (req §8.3, D-03)
- Buffering (`readyState < 3`) ditangani eksplisit
- `ended` menandai `completed`
- Tidak ada `setInterval` dan **tidak ada** `timeupdate` sebagai sumber kebenaran
- Audio baru boleh `play()` setelah user gesture (req R-10)

**Verify:** `npm run typecheck && npm run test`. Manual: putar audio, ubah rate ke 2x, subtitle harus tetap sinkron (AC-02).

**Adjust yang mungkin:** kalau `play()` ditolak, tampilkan pesan sesuai req R-10 — jangan diamkan.

**Review (doc check):** grep untuk memastikan tidak ada `setInterval` atau `timeupdate` yang dipakai sebagai sumber waktu.

**Evidence:** _path / link artefak + ringkasan hasil verifikasi_

- [ ] Implement
- [ ] Test
- [ ] Verify
- [ ] Evidence
- [ ] Review
- [ ] Done

---

## Blok C — Persistensi & shell

### T-15 `[PLAYER]` SubtitleStage + SubtitleOverlay

**Rujukan:** des §5.3, §8.1 (S-01 s/d S-10), §8.2, §6.2, §9.3 req, AC-13, AC-19, D-13

**File:** `src/components/player/SubtitleStage.tsx`, `SubtitleOverlay.tsx`

**Implement:**
- Tulis teks cue **imperatif via `textContent`**, bukan lewat state (req §8.3)
- Semua style dari token `design.md` §3 — tanpa hex literal
- Maksimal 2 baris + ellipsis (S-02), `text-wrap: balance` (S-08)
- `min-height: 72px` saat idle supaya stage tidak melompat (D-13)
- Lebar 90% stage, `pointer-events: none` kecuali click-to-reveal
- `aria-live="off"` + `aria-hidden="true"` (AC-19)
- **Tidak boleh** ada `backdrop-filter` (D-07)
- Tombol "Bacakan subtitle" dengan `aria-live="polite"`
- `prefers-reduced-motion` tidak boleh mematikan subtitle (req §3.5)

**Verify:** `npm run test` + manual: cue terpanjang, artwork paling terang, toggle subtitle saat audio tetap jalan (AC-13).

**Adjust yang mungkin:** kalau teks terpotong jadi tidak terbaca, pakai click-to-reveal — bukan auto-expand (des §8.4).

**Review (doc check):** req §9.3 dan des §8.1 harus cocok baris per baris.

**Evidence:** _path / link artefak + ringkasan hasil verifikasi_

- [ ] Implement
- [ ] Test
- [ ] Verify
- [ ] Evidence
- [ ] Review
- [ ] Done

---

## M2 - Synchronization Engine

**Syarat keluar:** Offset berlaku di frame yang sama dengan perubahan readout; boundary, gap, overlap, dan drift playback panjang punya test.

### T-16 `[SYNC]` Offset real-time

**Rujukan:** req FR-24 s/d FR-27, AC-04, AC-05, §8.3, des §9

**File:** `src/hooks/useOffset.ts`, `src/lib/offset.ts`

**Implement:**
- Perubahan offset berlaku **di frame yang sama** dengan perubahan readout (AC-04)
- `clamp(-5000, 5000)`
- Offset per item, default dari global setting
- Reset ke 0

**Verify:** `npm run test` + manual: audio diputar, tekan `+100` berulang, teks harus bergeser seketika.

**Adjust yang mungkin:** jangan pernah menyentuh React state dari dalam rAF loop untuk ini juga.

**Review (doc check):** AC-04, AC-05.

**Evidence:** _path / link artefak + ringkasan hasil verifikasi_

- [ ] Implement
- [ ] Test
- [ ] Verify
- [ ] Evidence
- [ ] Review
- [ ] Done

### T-18 `[OFFSET]` OffsetPanel + readout + mini timeline

**Rujukan:** des §9.1 s/d §9.5, D-17, FR-24 s/d FR-27, AC-04

**File:** `src/components/player/OffsetPanel.tsx`, `OffsetReadout.tsx`, `MiniTimeline.tsx`

**Implement:**
- Readout selalu 3 desimal, `+` eksplisit untuk positif, `U+2212` untuk negatif — **bukan** `-` ASCII
- **Dibulatkan ke bawah** (floor), bukan ke terdekat (D-17)
- `role="status"` + `aria-live="polite"`; warna `--warning` bila `abs > 2000ms`
- Tombol `[-500] [-100] [0] [+100] [+500]`; `0` disabled saat sudah nol; tahan = repeat tiap 120ms
- `shift+klik` pada angka → `<input type="number">`
- Checkbox "Terapkan ke semua item", **default tidak aktif** (FR-26), dengan konfirmasi
- Mini timeline jendela `±2000ms`, `aria-hidden="true"`, re-render hanya saat offset atau cue berubah
- Blok cue bergeser **ke kanan** saat offset negatif

**Verify:** `npm run test` (test floor) + manual: tombol-tahan, `shift+klik`, offset ±5 detik.

**Adjust yang mungkin:** mini timeline yang re-render tiap frame akan melumpuhkan — pastikan tidak.

**Review (doc check):** D-17, des §9.2.

**Evidence:** _path / link artefak + ringkasan hasil verifikasi_

- [ ] Implement
- [ ] Test
- [ ] Verify
- [ ] Evidence
- [ ] Review
- [ ] Done

### T-21 `[WIZARD]` Guided Sync Wizard

**Rujukan:** req FR-45, AC-17, des §10 (D-18), §5.5

**File:** `src/components/player/SyncWizard.tsx`, `src/hooks/useSyncWizardTrigger.ts`

**Implement:**
- Dipicu saat subtitle pertama dilampirkan ke item, **sekali** (`syncHintDismissed`)
- 3 langkah: pendahuluan → dengarkan 15 detik pertama → sesuaikan offset
- Langkah 2 memakai **dua tombol** ("Terlalu cepat" / "Terlalu lambat"), bukan slider (D-18)
- Langkah 3 re-use `OffsetPanel` dari T-18
- `Esc` = batal, **tanpa** perubahan tersimpan
- **Tidak boleh** auto-play sebelum user gesture
- Selesai atau batal → tulis `subtitleOffsetMs` **dan** `syncHintDismissed: true`
- Total durasi 30–45 detik (AC-17)

**Verify:** `npm run test` + manual: jalankan dari `useState` kosong, cek `syncHintDismissed` ter-set di kedua jalur.

**Adjust yang mungkin:** kalau wizard opened dari `useEffect`, autoplay akan ditolak — pancing lewat klik "Mulai".

**Review (doc check):** req §4.3 FR-45 dan des §10.

**Evidence:** _path / link artefak + ringkasan hasil verifikasi_

- [ ] Implement
- [ ] Test
- [ ] Verify
- [ ] Evidence
- [ ] Review
- [ ] Done

---

## Blok G — Data, settings, PWA, keyboard

---

## M3 - Player UX

**Syarat keluar:** Transport, cue list, offset panel, pintasan, dan dock responsif jalan; dock 64px<->88px tidak mereset state audio (AC-21).

### T-10 `[SHELL]` AppShell + AppBar + NavTabs

**Rujukan:** des §4.1 (anatomi), §11.1, §11.2, §2.1 (sitemap), des §3.6 (z-index)

**File:** `src/components/layout/AppShell.tsx`, `AppBar.tsx`, `NavTabs.tsx`, `src/routes/*.tsx`, `src/hooks/useRoute.ts`

**Implement:**
- Landmark `<main>`, `<header role="banner">`, `<nav>`
- Skip link `<a href="#main">`
- 3 rute: `/`, `/play/:itemId`, `/settings`
- `aria-current="page"` pada tab aktif
- `AppBar` berubah `scrolled` → `z-index: var(--z-sticky)`
- Router minimal (tidak perlu library berat)

**Verify:** `npm run typecheck && npm run lint`. Manual: pindah-pindah tab, cek landmark & `aria-current`.

**Adjust yang mungkin:** kalau `useRoute` manual jadiromat, tambahkan `react-router-dom` — tapi catat di `package.json` alasannya.

**Review (doc check):** urutan fokus harus mengikuti des §11.2.

**Evidence:** _path / link artefak + ringkasan hasil verifikasi_

- [ ] Implement
- [ ] Test
- [ ] Verify
- [ ] Evidence
- [ ] Review
- [ ] Done

### T-14 `[PLAYER]` TransportControls + SeekBar

**Rujukan:** des §4.2, §6.2 (`SeekBar`), req §8.3, AC-12

**File:** `src/components/player/TransportControls.tsx`, `SeekBar.tsx`, `RateSelector.tsx`, `VolumeControl.tsx`

**Implement:**
- `SeekBar` dengan `role="slider"`, `aria-valuemin/max/now`, dan `aria-valuetext` **verbal** ("0 menit 42 detik dari 45 menit 13 detik")
- Lapisan: track → buffered → fill → knob
- Klik seek; drag kontinu **throttled ke 1 frame**; knob hilang saat tidak hover/drag
- Posisi **tidak** lewat React state (req §8.3) — pointer menulis langsung ke DOM, sama seperti overlay
- Tidak ada transisi pada `.fill` (D-03)
- `RateSelector` 6 opsi, `role="radiogroup"`

**Verify:** `npm run typecheck && npm run test`. Manual: drag tidak boleh "tertinggal dari jarinya".

**Adjust yang mungkin:** `aria-valuetext` harus di-update tanpa memicu render ulang React yang berat.

**Review (doc check):** des §6.2 `SeekBar` Persilaku.

**Evidence:** _path / link artefak + ringkasan hasil verifikasi_

- [ ] Implement
- [ ] Test
- [ ] Verify
- [ ] Evidence
- [ ] Review
- [ ] Done

### T-17 `[PLAYER]` CueList + pencarian cue

**Rujukan:** req FR-28, FR-29, des §8.3, D-16

**File:** `src/components/player/CueList.tsx`, `CueListItem.tsx`

**Implement:**
- `role="listbox"` + `aria-activedescendant`; panah untuk navigasi
- Klik cue → lompat ke `cue.startMs` **dengan offset dikoreksi** (des §8.3)
- Kolom timestamp lebar tetap 56px, `tabular-nums`
- Cue terlewati tampil `--text-tertiary` (D-15)
- Pencarian cue dengan `<mark>` untuk hasil cocok
- Auto-scroll **hanya** saat cue aktif keluar viewport, berhenti begitu user scroll manual (D-16), flag di-reset oleh `scrollend` atau timeout 3 detik
- Panel ini **tidak** berubah saat offset digeser (des §9.6)

**Verify:** `npm run test` + manual: scroll manual benar-benar menghentikan auto-scroll.

**Adjust yang mungkin:** `aria-activedescendant` tidak boleh memicu auto-scroll (AC-19 terkait).

**Review (doc check):** des §8.3.

**Evidence:** _path / link artefak + ringkasan hasil verifikasi_

- [ ] Implement
- [ ] Test
- [ ] Verify
- [ ] Evidence
- [ ] Review
- [ ] Done

---

## Blok F — Offset panel, bookmark, wizard

### T-23 `[SETTINGS]` SettingsPage

**Rujukan:** des §5.6, D-12, req §4.5

**File:** `src/components/settings/SettingsPage.tsx`, `StorageUsage.tsx`, `ShortcutReference.tsx`

**Implement:**
- Preferensi: tema, ukuran lompat, pertahankan nada (pitch), tampilkan subtitle, offset subtitle global
- `StorageUsage` dengan `role="meter"`, kondisi `unknown` / `known` / `critical`
- Permintaan `navigator.storage.persist()`
- **Status kapabilitas browser** — `showOpenFilePicker` tersedia atau tidak (D-12), **bukan** dump teknis
- `ShortcutReference` memakai `<table>`, bukan daftar `div`
- Tata letak persis des §5.6

**Verify:** `npm run typecheck && npm run test` + manual: light mode di halaman ini juga (bukan hanya Library).

**Adjust yang mungkin:** `navigator.storage.estimate()` tidak ada di semua browser — jangan crash.

**Review (doc check):** des §5.6.

**Evidence:** _path / link artefak + ringkasan hasil verifikasi_

- [ ] Implement
- [ ] Test
- [ ] Verify
- [ ] Evidence
- [ ] Review
- [ ] Done

### T-26 `[KEYS]` Pintasan keyboard

**Rujukan:** req §5.1, AC-12, AC-18, des §11.5, `?`

**File:** `src/hooks/useKeyboardShortcuts.ts`

**Implement:**
- Seluruh pintasan req §5.1 berlaku
- Tambah `?` (buka referensi pintasan) dan `Esc` (tutup dialog/wizard) dari des §11.5
- **Semua single-key shortcut nonaktif saat user mengetik** di `<input>`, `<textarea>`, atau `contenteditable` (AC-18) — ini termasuk label bookmark, pencarian cue, dan input offset
- `focus ring` tidak di-animate (des §7.2)

**Verify:** `npm run test` — ketik `b` di label bookmark, lalu `?`, lalu `c`. Tidak boleh ada aksi yang terjadi (AC-18).

**Adjust yang mungkin:** `Escape` tetap boleh bekerja walau di input.

**Review (doc check):** req §5.1 dan des §11.5.

**Evidence:** _path / link artefak + ringkasan hasil verifikasi_

- [ ] Implement
- [ ] Test
- [ ] Verify
- [ ] Evidence
- [ ] Review
- [ ] Done

---

## Blok H — Polish & verifikasi akhir

### T-27 `[DOCK]` Dock responsif

**Rujukan:** des §4.2, §4.3, §3.8, §12.2, AC-21, D-09

**File:** `src/components/player/Dock.tsx`, `DockMeta.tsx`, `TransportControls.tsx` (re-use)

**Implement:**
- Desktop `lg` (≥1024px): 88px, dua baris, seekbar full-width
- Mobile: 64px, **tanpa** seekbar, ketuk area → Player Sheet
- Dock **selalu tampil di semua halaman** (req §9.1)
- Kontrol di dock adalah **alias dari kontrol yang sama** dengan Player — bukan instance baru
- Transisi 64px → 88px **tidak boleh** mereset posisi, rate, atau volume (AC-21)
- Cue preview di dock (D-09): 1 baris, `ellipsis`, `pointer-events: none`, disembunyi bila `subtitleVisible === false`, baca dari store yang sama

**Verify:** manual: putar audio di mobile, resize ke desktop, cek posisi/rate/volume tidak berubah (AC-21).

**Adjust yang mungkin:** kalau dock dirender ulang saat breakpoint berubah, state audio ikut hilang — jadikan dock tetap satu instance.

**Review (doc check):** des §4.2, §4.3, §12.2.

**Evidence:** _path / link artefak + ringkasan hasil verifikasi_

- [ ] Implement
- [ ] Test
- [ ] Verify
- [ ] Evidence
- [ ] Review
- [ ] Done

---

## M4 - Library & Persistence

**Syarat keluar:** Reload dan restart mempertahankan library, metadata, dan referensi file (AC-06, AC-07).

### T-08 `[STORE]` localStorage wrapper + skema

**Rujukan:** req §6.3 (keys), §8.6, R-09

**File:** `src/lib/storage/local.ts`, `src/lib/storage/schema.ts`, `src/lib/storage/__tests__/*.test.ts`

**Implement:**
- Skema `LibraryItem`, `Progress`, `Bookmark` persis req §6.1 (termasuk `syncHintDismissed` yang ditambahkan untuk FR-45)
- Wrapper `get`/`set` dengan `try/catch`
- **Fallback ke in-memory** saat localStorage tidak tersedia atau penuh (req R-09) — app tidak boleh crash
- Notifikasi ke user saat storage exception terjadi

**Verify:** `npm run test` — test dengan `localStorage` yang dipalsukan throws.

**Adjust yang mungkin:** Jangan pernah menyimpan `File`/`Blob` di sini (req §8.6).

**Review (doc check):** daftar key harus persis req §6.3.

**Evidence:** _path / link artefak + ringkasan hasil verifikasi_

- [ ] Implement
- [ ] Test
- [ ] Verify
- [ ] Evidence
- [ ] Review
- [ ] Done

### T-09 `[IDB]` IndexedDB wrapper untuk file reference

**Rujukan:** req §6.5, §8.4, AC-06, AC-07, D-06

**File:** `src/lib/idb/index.ts`, `src/lib/idb/file-store.ts`, `src/lib/__tests__/file-store.test.ts`

**Implement:**
- Simpan `FileSystemFileHandle` untuk browser yang mendukung FSA
- Fallback: simpan `Blob` bila FSA tidak tersedia (req AC-07)
- Store terpisah dari metadata — **tidak** memindahkan seluruh database aplikasi ke IndexedDB
- Buka DB secara lazy, tangani `onupgradeneeded`

**Verify:** `npm run test` dengan `fake-indexeddb`. Manual: reload, file masih bisa diputar (AC-06).

**Adjust yang mungkin:** di Firefox/Safari, FSA tidak ada — pastikan jalur `Blob` benar-benar dipakai, bukan hanya di-kode.

**Review (doc check):** req §6.5.

**Evidence:** _path / link artefak + ringkasan hasil verifikasi_

- [ ] Implement
- [ ] Test
- [ ] Verify
- [ ] Evidence
- [ ] Review
- [ ] Done

### T-11 `[LIBRARY]` LibraryPage + grid + kartu

**Rujukan:** des §5.1, §5.2, §7.1, §13.1–13.3 (copy)

**File:** `src/components/library/LibraryPage.tsx`, `LibraryGrid.tsx`, `LibraryCard.tsx`, `src/components/ui/EmptyState.tsx`

**Implement:**
- Grid responsif 1/2/3/4 kolom sesuai breakpoint (des §12.1)
- 7 kondisi kartu dari des §5.1 (termasuk `File hilang` dan `Perlu izin`)
- 4 kondisi halaman: loading (skeleton), ready, empty, error — des §7.1
- Thumbnail `aspect-ratio: 1` supaya **tidak ada layout shift** (AC-20)
- `aria-label` ringkas per kartu, persis des §6.2
- Copy(empty state) mengikuti des §13.3

**Verify:** `npm run test` — test semua kondisi kartu. Manual: 200 item, scroll mulus (AC-20).

**Adjust yang mungkin:** error **tidak boleh** mengganti konten yang sudah ada (D-14).

**Review (doc check):** des §5.1 dan §7.1.

**Evidence:** _path / link artefak + ringkasan hasil verifikasi_

- [ ] Implement
- [ ] Test
- [ ] Verify
- [ ] Evidence
- [ ] Review
- [ ] Done

---

## Blok D — Import & relink

### T-12 `[IMPORT]` ImportDialog — FSA + fallback

**Rujukan:** req §4.1, §7.2, AC-07, AC-15, des §5.5

**File:** `src/components/library/ImportDialog.tsx`, `src/lib/import.ts`

**Implement:**
- `showOpenFilePicker()` bila tersedia; fallback `<input type="file">` (req §7.2)
- Audio wajib, subtitle opsional
- Judul default = nama file tanpa ekstensi, dapat diedit
- Ringkasan langsung tampil: nama, ukuran, durasi, jumlah cue
- Subtitle yang gagal parse **tetap boleh** ditambahkan, dengan peringatan (des §5.5)
- Tombol `Tambah` disabled sampai audio terisi
- **Tidak ada** permintaan izin penyimpanan (req §8.4)

**Verify:** `npm run test` + manual di browser tanpa FSA.

**Adjust yang mungkin:** `showOpenFilePicker` butuh user gesture — kalau dipanggil dari `useEffect`, browser akan menolaknya.

**Review (doc check):** des §5.5 "Kunci perilaku".

**Evidence:** _path / link artefak + ringkasan hasil verifikasi_

- [ ] Implement
- [ ] Test
- [ ] Verify
- [ ] Evidence
- [ ] Review
- [ ] Done

---

## M5 - Bookmark & Progress

**Syarat keluar:** Bookmark CRUD, autosave progress, resume prompt, dan state completed jalan (AC-09, AC-10).

### T-19 `[BOOKMARK]` Bookmark CRUD

**Rujukan:** req FR-31, FR-32, AC-10, des §5.3, §11.5

**File:** `src/components/player/BookmarkPanel.tsx`, `BookmarkItem.tsx`

**Implement:**
- Tambah di waktu tertentu, label default `mm:ss`, ubah label, hapus
- Lompat dari daftar bookmark
- Panel punya state `empty` dan `list` (des §6.1)

**Verify:** `npm run test` + manual: label kosong tidak boleh membuat bookmark yang tidak jelas.

**Adjust yang mungkin:** label bookmark adalah `<input>` — ini yang memicu AC-18, jadi pastikan T-26 proudly mengabaikannya.

**Review (doc check):** AC-10.

**Evidence:** _path / link artefak + ringkasan hasil verifikasi_

- [ ] Implement
- [ ] Test
- [ ] Verify
- [ ] Evidence
- [ ] Review
- [ ] Done

### T-20 `[PROGRESS]` Autosave progress + ResumePrompt

**Rujukan:** req FR-33, FR-34, AC-09, des §5.5

**File:** `src/hooks/useProgress.ts`, `src/components/player/ResumePrompt.tsx`

**Implement:**
- Autosave posisi playback per item
- `completed` bila `>= 95%` durasi atau event `ended`
- Dialog "Lanjut dari mm:ss?" **muncul sekali**, dengan aksi "Mulai dari 0:00" dan "lewati"
- **Tidak pernah** muncul otomatis tanpa user action (des §5.5)

**Verify:** `npm run test` + manual: putar 10 detik, reload, cek posisi.

**Adjust yang mungkin:** throttle autosave — jangan tulis ke localStorage tiap frame.

**Review (doc check):** AC-09.

**Evidence:** _path / link artefak + ringkasan hasil verifikasi_

- [ ] Implement
- [ ] Test
- [ ] Verify
- [ ] Evidence
- [ ] Review
- [ ] Done

---

## M6 - Relink & Backup

**Syarat keluar:** File hilang terdeteksi dan bisa di-relink tanpa kehilangan bookmark/progress/offset; export/import metadata jalan (AC-11, AC-14).

### T-13 `[RELINK]` Fingerprinting + RelinkDialog

**Rujukan:** req §6.4, §4.1, AC-11, des §5.5 (Relink), D-11

**File:** `src/lib/fingerprint.ts`, `src/components/library/RelinkDialog.tsx`, `src/components/library/MissingFilesBanner.tsx`

**Implement:**
- Fingerprint `name + size + lastModified` sesuai req §6.4
- Item yang file-nya hilang ditandai `missing_audio`
- Banner `role="alert"` muncul kalau jumlah file hilang > 0
- Dialog selalu menampilkan **apa yang tidak hilang**: bookmark, progress, offset (D-11)
- Aksi `Lewati` dan `Pasang ulang`

**Verify:** `npm run test` untuk logika fingerprint. Manual: hapus file dari disk, reload, cek banner + dialog.

**Adjust yang mungkin:** kalau user memilih file berbeda yang tidak cocok fingerprint, tanyakan konfirmasi eksplisit.

**Review (doc check):** AC-11.

**Evidence:** _path / link artefak + ringkasan hasil verifikasi_

- [ ] Implement
- [ ] Test
- [ ] Verify
- [ ] Evidence
- [ ] Review
- [ ] Done

---

## Blok E — Player

### T-22 `[EXPORT]` Export / import JSON

**Rujukan:** req FR-08, AC-14, des §5.2 (jalur pemulihan)

**File:** `src/lib/export-import.ts`, `src/components/settings/ExportImportCard.tsx`, `src/components/ui/EmptyState.tsx` (jalur "Impor dari file JSON")

**Implement:**
- Export seluruh metadata sebagai JSON
- Import memvalidasi skema, menampilkan ringkasan sebelum menimpa
- Gagal import → pesan jelas, data lama tidak boleh rusak

**Verify:** `npm run test` + manual: export, hapus data, import, hasilnya identik.

**Adjust yang mungkin:** versi skema wajib ada di dalam file export supaya import versi lama bisa ditolak dengan pesan jelas.

**Review (doc check):** AC-14.

**Evidence:** _path / link artefak + ringkasan hasil verifikasi_

- [ ] Implement
- [ ] Test
- [ ] Verify
- [ ] Evidence
- [ ] Review
- [ ] Done

---

## M7 - PWA & Offline

**Syarat keluar:** Offline penuh tanpa request eksternal; update toast tidak memutus playback (AC-08, AC-16).

### T-24 `[PWA]` Manifest + service worker

**Rujukan:** req FR-36 s/d FR-38, §8.7, AC-08, NFR-07, D-06

**File:** `vite.config.ts`, `public/manifest.webmanifest`, `public/icons/*`, `src/main.tsx` (registrasi SW)

**Implement:**
- Manifest: nama, `start_url`, `display: standalone`, ikon 192 & 512 (termasuk maskable)
- `vite-plugin-pwa` dengan Workbox: precache app shell
- **Nol request eksternal** (D-06, NFR-07) — tidak ada CDN, tidak ada font eksternal, tidak ada analytics
- `updateViaCache: 'none'`

**Verify:** `npm run build`, lalu `npm run preview` → DevTools → Application → Service worker aktif, Network →nol request ke domain luar.

**Adjust yang mungkin:** kalau ada aset yang gagal di-cache, tambahkan ke `globPatterns`.

**Review (doc check):** AC-08, D-06.

**Evidence:** _path / link artefak + ringkasan hasil verifikasi_

- [ ] Implement
- [ ] Test
- [ ] Verify
- [ ] Evidence
- [ ] Review
- [ ] Done

### T-25 `[PWA]` Toast update + install prompt

**Rujukan:** req FR-40, AC-16, D-06, des §5.5 (tempat uninstall), des §7.3 (tabel toast)

**File:** `src/components/ui/Toast.tsx`, `src/components/settings/InstallButton.tsx`, `src/hooks/useServiceWorkerUpdate.ts`

**Implement:**
- `workbox-window` mendeteksi update → toast "Pembaruan tersedia" dengan aksi "Muat ulang"
- **Playback tidak boleh terputus**; reload hanya atas klik (AC-16)
- `InstallButton` dengan state `hidden` / `available` / `installed`
- Toast: `success` 4 detik, `info` 8 detik, `warning` 6 detik, `error` **persist**, `undo` 8 detik (des §7.3)

**Verify:** manual: build dua versi, cek toast muncul tanpa playback terputus (AC-16), lalu reload atas klik user.

**Adjust yang mungkin:** `beforeinstallprompt` hanya sekali per pengguna — cache event-nya.

**Review (doc check):** des §7.3.

**Evidence:** _path / link artefak + ringkasan hasil verifikasi_

- [ ] Implement
- [ ] Test
- [ ] Verify
- [ ] Evidence
- [ ] Review
- [ ] Done

---

## M8 - Verification

**Syarat keluar:** A11y, kontras, motion, dan E2E hijau; evidence tersimpan untuk AC yang relevan.

### T-28 `[A11Y]` Audit aksesibilitas

**Rujukan:** des §11.1 s/d §11.5, req NFR-12, NFR-13, AC-18, AC-19, AC-20

**File:** tersebar di seluruh komponen yang bermasalah

**Implement:**
- Jalankan alur utama **hanya dengan keyboard**
- Focus trap di semua dialog; fokus kembali ke pemicu (req §13)
- Semua `IconButton` punya `aria-label`
- Target sentuh minimal 44px di mobile
- 200% zoom browser tidak merusak layout
- Audit Lighthouse a11y **≥ 90**

**Verify:** Lighthouse a11y, plus navigasi keyboard manual seluruh alur.

**Adjust yang mungkin:** perbaiki setiap temuan satu per satu, jangan menumpuk.

**Review (doc check):** des §15.3.

**Evidence:** _path / link artefak + ringkasan hasil verifikasi_

- [ ] Implement
- [ ] Test
- [ ] Verify
- [ ] Evidence
- [ ] Review
- [ ] Done

### T-29 `[THEME]` Audit kontras & motion

**Rujukan:** des §11.4, §8.2, §3.5, D-15

**File:** `src/styles/*`, komponen yang bermasalah

**Implement:**
- Verifikasi semua kombinasi des §11.4 di dark **dan** light
- `--text-tertiary` **tidak boleh** dipakai untuk informasi yang harus dibaca (D-15)
- Kontras subtitle ≥ 4.5:1 di atas artwork paling terang
- Semua animasi playback memakai `--duration-instant` (D-03)
- Z-index hanya memakai nilai des §3.6
- `prefers-reduced-motion` mematikan transisi dekoratif saja

**Verify:** alat kontras untuk setiap pasangan token; checklist des §15.1 dan §15.2.

**Adjust yang mungkin:** kalau sebuah rasio gagal, ubah **token** — jangan menambal per komponen.

**Review (doc check):** des §11.4.

**Evidence:** _path / link artefak + ringkasan hasil verifikasi_

- [ ] Implement
- [ ] Test
- [ ] Verify
- [ ] Evidence
- [ ] Review
- [ ] Done

### T-30 `[E2E]` Playwright end-to-end

**Rujukan:** req §13, seluruh AC

**File:** `playwright.config.ts`, `src/e2e/*.spec.ts`

**Implement:**
- `import` → item muncul di library
- `play` → audio & subtitle sinkron
- `bookmark` → tersimpan
- `reload` → progress & library bertahan
- `relink` → file hilang tertangani
- `offline` → app tetap jalan
- Assertion untuk AC yang bisa diuji otomatis

**Verify:** `npx playwright test` hijau.

**Adjust yang mungkin:** service worker bikin test flaky — matikan SW untuk test yang tidak perlu, dan buat test khusus untuknya.

**Review (doc check):** req §13.

**Evidence:** _path / link artefak + ringkasan hasil verifikasi_

- [ ] Implement
- [ ] Test
- [ ] Verify
- [ ] Evidence
- [ ] Review
- [ ] Done

---

## Blok I — Penutupan

---

## M9 - Ship

**Syarat keluar:** Checklist `design.md` §15 tercentang; traceability FR/NFR/AC terverifikasi ulang; release memenuhi Definition of Done `requirements.md` §13.

### T-31 `[SHIP]` Checklist pre-ship + Definition of Done

**Rujukan:** req §13 (DoD), des §15 (checklist pre-ship), **seluruh** AC

**Implement:** tidak ada kode baru — ini task verifikasi.

**Verify — DoD (req §13):**
- [ ] Semua AC hijau
- [ ] `npm run typecheck` tanpa error
- [ ] `npm run lint` tanpa error
- [ ] Unit test Vitest untuk parser SRT, WebVTT, `cue-sync` — offset, seek, playback rate
- [ ] E2E Playwright: import, play, subtitle sinkron, bookmark, reload
- [ ] Tidak ada request network eksternal (AC-08)
- [ ] Komentar kode menjelaskan **mengapa**, bukan **apa**
- [ ] Tidak ada `console.log` / `debugger` tertinggal

**Verify — Checklist desain (des §15):**
- [ ] §15.1 Design — semua
- [ ] §15.2 Subtitle UX — semua
- [ ] §15.3 Aksesibilitas — semua
- [ ] §15.4 Responsif — semua
- [ ] §15.5 Traceability — semua FR M punya komponen; tidak ada komponen yang tidak menjawab FR

**Adjust yang mungkin:** kalau ada butir yang gagal, **buat task baru** untuk memperbaikinya — jangan centang manual.

**Review (doc check):** `requirements.md` dan `design.md` tetap konsisten satu sama lain.

**Evidence:** _path / link artefak + ringkasan hasil verifikasi_

- [ ] Implement
- [ ] Test
- [ ] Verify
- [ ] Evidence
- [ ] Review
- [ ] Done

---

## Catatan Konsistensi Antar Dokumen

Hal-hal berikut **sudah diselaraskan** dan tidak boleh diubah sepihak di salah satu dokumen:

| Hal | Sumber | Status |
|---|---|---|
| Layout dock + panel subtitle besar | req §9.1–9.3, des §4.2, §5.3 | selaras |
| FR-45 + `syncHintDismissed` | req §4.3, §6.1, AC-17; des §10 | selaras |
| AC-17 s/d AC-21 | req §10, des §14.3 | selaras |
| Nama komponen | req §9, des §6.1 | 44/44 terpetakan |
| Nilai token subtitle | req §9.3, des §8.1 | selaras |
| Z-index | des §3.6 | dipakai des §4.1, §6.1 |
| Breakpoint dock 64px → 88px | des §3.8, §12.2, AC-21 | selaras |
| Tabel kontras | des §11.4, §8.2 | internal design |

Kalau ada konflik baru yang ditemukan saat mengerjakan task, tambahkan task `[DOC]` dan perbaiki **dua** dokumen sekaligus. Jangan hanya menambal di satu tempat.


**Akhir dokumen.**