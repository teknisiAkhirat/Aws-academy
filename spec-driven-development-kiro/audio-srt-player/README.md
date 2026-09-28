# Audio SRT Player — SDD Practice Spec

Folder ini adalah **spec source of truth** untuk proyek latihan Audio SRT Player.

## Dokumen

1. [requirements.md](./requirements.md) — kebutuhan, user story, FR/NFR, acceptance criteria, model data, dan Definition of Done. **WHAT**.
2. [design.md](./design.md) — arsitektur, UI/UX, design tokens, komponen, interaksi, accessibility, dan traceability. **HOW**.
3. [tasks.md](./tasks.md) — task implementasi detail `T-01` s/d `T-31` + `M0-T01`, dikelompokkan per milestone M0–M9.
4. [roadmap.md](./roadmap.md) — milestone belajar M0–M9 dan pemetaan ke task.
5. [spec-audit.md](./spec-audit.md) — hasil M0: matriks audit manual, temuan PASS/PARTIAL/GAP/UNCLEAR, dan batas vertical slice.

> Semua link bersifat relatif terhadap folder ini, sehingga tetap valid saat folder dipindahkan atau di-merge ke branch lain.

## Cara belajar

Jangan langsung mengimplementasikan seluruh `tasks.md`.

Gunakan pola:

**M0 audit → pilih 1 task → implement → test → verify → evidence → review → commit → task berikutnya.**

Task pertama yang aktif adalah `M0-T01` (Spec & Manual Audit). Setelah itu, gerbang pertama adalah **vertical slice M1**: `audio → SRT → parse cue → play → subtitle sinkron`.

> **Scope fitur boleh kecil; reading experience subtitle tidak boleh dikorbankan.** Subtitle adalah fokus utama player, bukan caption pelengkap. Jangan mengecilkan subtitle demi menampilkan lebih banyak kontrol.

Folder ini berada di repository pembelajaran [Aws-academy](https://github.com/teknisiAkhirat/Aws-academy). Kode aplikasi tetap berada di repository aplikasi [audio-srt-player](https://github.com/teknisiAkhirat/audio-srt-player).

## Batas tanggung jawab

| | Spec repository (`Aws-academy`) | App repository (`audio-srt-player`) |
|---|---|---|
| Isi | requirements, design, tasks, roadmap, audit, pembelajaran SDD | source code, tests, build, runtime, deployment |
| Diubah saat | requirement/design berubah | implementasi task berjalan |

- Perubahan requirement/design yang memengaruhi kode harus tercermin dalam task dan evidence implementasi.
- Spec repository tidak pernah berisi source code aplikasi.

## Status

Dokumen dipisahkan dari monolith lama sebagai bagian dari refactor dokumentasi SDD. `M0` (Spec & Manual Audit) sudah dijalankan; lihat `spec-audit.md` untuk hasil audit dan temuan terbuka. Implementasi aplikasi **belum dimulai**.