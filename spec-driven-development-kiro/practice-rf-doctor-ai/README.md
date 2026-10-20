# RF Doctor AI — Dokumen Proyek

> [REVISI AUDIT 2026-10-17]
> [REVISI AUDIT 2026-10-17 B2]
> Status, arah awal, dan indeks audit diperbarui.

Status: **DISCOVERY / DRAFT — belum disetujui untuk implementasi**

## Tujuan

RF Doctor AI adalah calon asisten diagnosis untuk teknisi servis HP. Fokus awal yang diuji adalah masalah jaringan seluler, RX/TX, dan RF. Aplikasi mungkin membantu teknisi mengumpulkan gejala, mencatat hasil pemeriksaan, mencari referensi, dan menyusun langkah pemeriksaan yang dapat diverifikasi. Aplikasi tidak mengklaim dapat mengukur kondisi fisik komponen RF hanya melalui software.

## Arah awal (belum final, lihat decision log) [REVISI AUDIT 2026-10-17 B2]

- Pengguna yang dituju: teknisi yang memeriksa berbagai HP pelanggan.
- Fokus uji awal: jaringan seluler, RX/TX, dan RF.
- Platform aplikasi: OPEN; bandingkan Kotlin native, Flutter, PWA, dan penggunaan modul aplikasi yang sudah ada.
- Backend: OPEN; mungkin tidak diperlukan pada fase awal.
- Penyimpanan lokal: OPEN; offline-first menjadi opsi, bukan keputusan final.
- AI: OPEN; hanya dievaluasi setelah gerbang uji manual dan persetujuan privasi/biaya.
- Pengetahuan: belum ada knowledge base yang dianggap lengkap/terverifikasi; perlu disusun dari catatan yang boleh digunakan dan ditinjau.
- Pendekatan: Spec-Driven Development (SDD), AI coding agent sebagai executor, AI tutor untuk pembelajaran.
- Tidak ada merge otomatis ke main.
- Prinsip: **NO EVIDENCE, NO DONE**.

## Dokumen

1. [Project Charter](00-project-charter.md)
2. [Riset Kelayakan](01-feasibility-research.md)
3. [Requirements](02-requirements.md)
4. [Desain Sistem](03-design.md)
5. [Steering / Aturan Proyek](04-steering.md)
6. [Task Breakdown](05-task-breakdown.md)
7. [Decision Log](06-decision-log.md)
8. [Temuan Audit](07-audit-findings.md)
9. [Protokol SPIKE-01](08-spike-01-protocol.md)

## Data dan privasi [REVISI AUDIT 2026-10-17 B2]

Repo ini publik. Jangan commit data servis, KB, kasus SPIKE, atau output model. Data disimpan di lokasi yang diputuskan ADR-012; pemilik menganonimkan sebelum data diberikan ke layanan AI. Evidence PR hanya ringkasan/agregat.

## Status dan gerbang

[REVISI AUDIT 2026-10-17] Dokumen ini adalah fondasi untuk review. Tidak ada aplikasi atau layanan produksi yang dibuat dalam perubahan dokumentasi ini. SPIKE-01 adalah gerbang untuk Phase 1+; keputusan yang bertanda OPEN atau OWNER TO DECIDE harus tetap terbuka sampai pemilik menyetujuinya.
