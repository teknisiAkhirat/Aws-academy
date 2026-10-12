# Roadmap Belajar — Audio SRT Player

Dokumen ini menghubungkan spesifikasi aplikasi dengan tujuan belajar Spec-Driven Development (SDD). Aplikasi adalah laboratorium belajar; targetnya bukan sekadar membuat player, tetapi memahami alur:

**Spec → Task → Implement → Test → Verify → Evidence → Review → Commit**

## M0 — Bootstrap & Spec Audit
- `M0-T01` Spec & Manual Audit — baca manual, audit dokumen, verifikasi traceability, tetapkan batas MVP.
- Audit `requirements.md`, `design.md`, dan `tasks.md`.
- Tentukan MVP dan batas out-of-scope.
- Catat konflik/ambiguity sebagai task dokumentasi.
- Siapkan repository aplikasi terpisah (`T-01` s/d `T-03`).
- Output: spec audit + baseline project.
- DoD: struktur proyek, lint/typecheck/test/build baseline PASS.

## M1 — Audio + SRT Core
- Import audio + SRT.
- Parser SRT.
- Model Cue.
- Audio player dasar.
- Subtitle tampil mengikuti audio.
- **Vertical slice**: `audio → SRT → parse cue → play → subtitle sinkron`.
- Output: vertical slice pertama yang benar-benar berjalan.

> Scope M1 sengaja kecil, tapi **subtitle tetap besar**. `design.md` D-01 menempatkan subtitle sebagai fokus utama, dan `requirements.md` §9.2 memberi subtitle stage proporsi vertikal terbesar. MVP kecil berarti lebih sedikit fitur, bukan subtitle yang lebih kecil. Gerbang lengkap ada di `tasks.md` bagian "Gerbang Vertical Slice (M1)".

## M2 — Synchronization Engine
- Pisahkan Audio Clock → Sync Engine → Active Cue → UI.
- Seek, pause/resume, playback rate.
- Offset dan boundary handling.
- Uji playback panjang dan drift.
- Output: engine sinkronisasi yang dapat diuji tanpa bergantung pada UI.

## M3 — Player UX
- Transport controls, seek bar, volume/mute, playback speed.
- Cue list, offset panel, keyboard shortcuts, responsive player.
- Output: player usable tanpa mencampur business logic ke komponen UI.

## M4 — Library & Persistence
- Library item.
- localStorage untuk metadata.
- IndexedDB untuk file reference/blob fallback.
- Reload/restart persistence.
- Schema versioning.
- Output: data tetap ada setelah browser ditutup.

## M5 — Bookmark & Progress
- Bookmark CRUD.
- Autosave progress.
- Resume prompt.
- Completed state.
- Last-played item.
- Output: pengalaman listening yang dapat dilanjutkan.

## M6 — Relink & Backup
- Fingerprinting.
- Missing-file state.
- Relink.
- Export/import metadata.
- Recovery flow.
- Output: lifecycle data jelas dan dapat dipulihkan.

## M7 — PWA & Offline
- Manifest.
- Service worker.
- App-shell precache.
- Offline navigation.
- Update notification tanpa memutus playback.
- Output: aplikasi dapat digunakan offline sesuai requirement.

## M8 — Verification
- Unit tests, integration tests, E2E Playwright.
- Accessibility, performance, offline verification, regression.
- Output: evidence untuk acceptance criteria yang relevan.

## M9 — Ship
- Final documentation.
- Traceability check.
- Build/deploy.
- Health check, function test, regression, evidence.
- Output: release yang memenuhi Definition of Done.

## Aturan pengerjaan
1. Satu task aktif pada satu waktu.
2. Jangan memberikan seluruh roadmap ke coding agent sebagai satu perintah implementasi.
3. Setiap task mengikuti: **Spec → Task → Implement → Test → Verify → Evidence → Review → Commit**.
4. Konflik requirement/design tidak diselesaikan diam-diam di kode.
5. Jika ditemukan konflik, buat task `[DOC]`, perbaiki sumber dokumen, lalu lanjut.
6. **NO EVIDENCE, NO DONE.**
7. Scope fitur boleh kecil; **reading experience subtitle tidak boleh dikorbankan**.

## Hubungan milestone dengan task

Struktur ini sudah diselaraskan dengan `tasks.md`. ID task `T-01` s/d `T-31` tidak berubah; hanya pengelompokan ke milestone yang diperbarui.

| Milestone | Task | Fokus |
|---|---|---|
| M0 | `M0-T01`, `T-01`, `T-02`, `T-03` | Spec & manual audit + bootstrap project |
| M1 | `T-04`, `T-05`, `T-06`, `T-07`, `T-15` | Vertical slice: audio + SRT + subtitle sinkron |
| M2 | `T-16`, `T-18`, `T-21` | Offset real-time, offset panel, sync wizard |
| M3 | `T-10`, `T-14`, `T-17`, `T-23`, `T-26`, `T-27` | Shell, transport, cue list, settings, pintasan, dock responsif |
| M4 | `T-08`, `T-09`, `T-11`, `T-12` | Library, localStorage, IndexedDB, import |
| M5 | `T-19`, `T-20` | Bookmark CRUD, autosave progress, resume |
| M6 | `T-13`, `T-22` | Fingerprinting, relink, export/import metadata |
| M7 | `T-24`, `T-25` | Manifest, service worker, offline, toast update |
| M8 | `T-28`, `T-29`, `T-30` | A11y, kontras & motion, E2E Playwright |
| M9 | `T-31` | Checklist pre-ship + Definition of Done |

Total: 32 task = 1 task audit (`M0-T01`) + 31 task implementasi (`T-01` s/d `T-31`).

> **`T-15` dipindahkan ke M1** dari blok E semula, supaya gerbang vertical slice benar-benar tertutup: subtitle harus tampil dan mengikuti audio, bukan "dijadwalkan nanti". Transport lengkap (`T-14`) tetap M3. Riwayat blok lama A–I dicatat di `spec-audit.md`.
>
> Urutan roadmap adalah urutan **belajar/eksekusi** tingkat milestone, bukan pengganti task detail di `tasks.md`.