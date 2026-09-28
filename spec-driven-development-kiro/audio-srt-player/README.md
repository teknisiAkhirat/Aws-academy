# Audio SRT Player — SDD Practice Spec

Folder ini adalah **spec source of truth** untuk proyek latihan Audio SRT Player.

## Dokumen

1. [requirements.md](./requirements.md) — kebutuhan, user story, FR/NFR, acceptance criteria, model data, dan Definition of Done.
2. [design.md](./design.md) — arsitektur, UI/UX, design tokens, komponen, interaksi, accessibility, dan traceability.
3. [tasks.md](./tasks.md) — task implementasi detail T-01 s/d T-31.
4. [roadmap.md](./roadmap.md) — milestone belajar M0–M9.
5. [spec-audit.md](./spec-audit.md) — temuan audit dan hal yang perlu dibereskan sebelum implementasi.

> **Catatan link:** gunakan README pada branch/versi terbaru repository. Link dokumen di atas sengaja relatif terhadap folder ini agar tetap valid setelah branch ini di-merge.

## Cara belajar

Jangan langsung mengimplementasikan seluruh tasks.md.

Gunakan pola:

**M0 audit → pilih 1 task → implement → test → verify → evidence → review → commit → task berikutnya.**

Folder ini berada di repository pembelajaran [Aws-academy](https://github.com/teknisiAkhirat/Aws-academy). Kode aplikasi tetap berada di repository aplikasi [audio-srt-player](https://github.com/teknisiAkhirat/audio-srt-player).

## Batas tanggung jawab

- Spec repository: pembelajaran, requirement, design, task, roadmap, dan audit.
- App repository: source code aplikasi, test, konfigurasi build, dan deployment.
- Perubahan requirement/design yang memengaruhi kode harus tercermin dalam task dan evidence implementasi.

## Status

Dokumen dipisahkan dari monolith lama sebagai bagian dari refactor dokumentasi SDD. Sebelum implementasi besar, selesaikan M0 dan audit konsistensi dokumen.