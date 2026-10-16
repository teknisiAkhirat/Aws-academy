# RF Doctor AI — Dokumen Proyek

Status: **DISCOVERY / DRAFT — belum disetujui untuk implementasi**

## Tujuan

RF Doctor AI adalah asisten diagnosis untuk teknisi servis HP. MVP berfokus pada masalah jaringan seluler, RX/TX, dan RF. Aplikasi membantu teknisi mengumpulkan gejala, mencatat hasil pengukuran, mencari referensi, dan menyusun langkah pemeriksaan yang dapat diverifikasi. Aplikasi tidak mengklaim dapat mengukur kondisi fisik komponen RF hanya melalui software.

## Keputusan awal yang telah disepakati

- Pengguna utama: teknisi yang memeriksa berbagai HP pelanggan.
- Fokus MVP: jaringan seluler, RX/TX, dan RF.
- Arsitektur aplikasi: Android native + backend web.
- Android: Kotlin + Jetpack Compose sebagai kandidat.
- Backend: Cloudflare Workers sebagai kandidat.
- Penyimpanan server: Cloudflare D1 sebagai kandidat; penyimpanan lokal Android masih perlu diputuskan rinci.
- AI: online melalui API dengan adapter agar penyedia bisa diganti.
- Pengetahuan: gabungan referensi teknis terkurasi dan AI.
- Pendekatan: Spec-Driven Development (SDD), AI coding agent sebagai executor, AI tutor untuk pembelajaran.
- Tidak ada merge otomatis ke `main`.
- Prinsip: **NO EVIDENCE, NO DONE**.

## Dokumen

1. [Project Charter](00-project-charter.md)
2. [Riset Kelayakan](01-feasibility-research.md)
3. [Requirements](02-requirements.md)
4. [Desain Sistem](03-design.md)
5. [Steering / Aturan Proyek](04-steering.md)
6. [Task Breakdown](05-task-breakdown.md)
7. [Decision Log](06-decision-log.md)

## Status

Dokumen ini adalah fondasi untuk review. Tidak ada aplikasi atau layanan produksi yang dibuat dalam perubahan ini. Keputusan yang bertanda TBD wajib diselesaikan sebelum task implementasi terkait dimulai.