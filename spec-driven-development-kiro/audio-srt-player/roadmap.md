# Roadmap Belajar — Audio SRT Player

Dokumen ini menghubungkan spesifikasi aplikasi dengan tujuan belajar Spec-Driven Development (SDD). Aplikasi adalah laboratorium belajar; targetnya bukan sekadar membuat player, tetapi memahami alur:

**Spec → Task → Implement → Test → Verify → Evidence → Review → Commit**

## M0 — Bootstrap & Spec Audit
- Audit requirement, design, dan tasks.
- Tentukan MVP dan batas out-of-scope.
- Catat konflik/ambiguity sebagai task dokumentasi.
- Siapkan repository aplikasi terpisah.
- Output: spec audit + baseline project.
- DoD: struktur proyek, lint/typecheck/test/build baseline PASS.

## M1 — Audio + SRT Core
- Import audio + SRT.
- Parser SRT.
- Model Cue.
- Audio player dasar.
- Subtitle tampil mengikuti audio.
- Output: vertical slice pertama yang benar-benar berjalan.

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
3. Setiap task mengikuti: **Implement → Test → Verify → Evidence → Review → Commit**.
4. Konflik requirement/design tidak diselesaikan diam-diam di kode.
5. Jika ditemukan konflik, buat task [DOC], perbaiki sumber dokumen, lalu lanjut.
6. **NO EVIDENCE, NO DONE.**

## Hubungan milestone dengan task
| Milestone | Fokus task |
|---|---|
| M0 | Spec audit + bootstrap |
| M1 | T-04 s/d T-07 setelah fondasi |
| M2 | T-06/T-07 dan pengujian sinkronisasi |
| M3 | T-10/T-11/T-14 s/d T-18/T-26/T-27 |
| M4 | T-08/T-09 + persistence |
| M5 | T-19/T-20 |
| M6 | T-13/T-22 |
| M7 | T-24/T-25 |
| M8 | T-28/T-29/T-30 |
| M9 | T-31 |

> Urutan task lama tetap dipertahankan sebagai referensi implementasi. Roadmap ini adalah urutan belajar/eksekusi tingkat milestone, bukan pengganti task detail.