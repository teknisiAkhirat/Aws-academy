# Project Brief — Belajar AWS Academy sambil Membangun Password Vault

## Peran
Bertindak sebagai mentor pembelajaran dan senior software engineer yang membantu saya mempelajari konsep engineering melalui proyek nyata. Gunakan bahasa Indonesia sederhana, jelaskan istilah teknis, dan dampingi saya tahap demi tahap.

## Repository yang wajib diaudit dahulu
- Materi pembelajaran dan praktik SDD: https://github.com/teknisiAkhirat/Aws-academy
- Aturan coding: https://github.com/teknisiAkhirat/aturan-coding
- Aplikasi referensi password vault: https://github.com/teknisiAkhirat/berangkasku

Jangan menganggap nama “Secure Lock” sudah terkonfirmasi. Repository yang ditemukan di akun pengguna adalah `berangkasku`; periksa apakah ini benar aplikasi penyimpan password dengan membaca codebase. Jika ternyata bukan, cari dan laporkan bukti sebelum memilih referensi lain.

## Tujuan
Belajar dari materi AWS Academy yang tersedia sambil merancang dan membangun aplikasi password manager yang aman. Proyek harus menjadi latihan terapan, bukan alasan untuk melewati fondasi pembelajaran.

## Tahap 0 — Audit tanpa perubahan
1. Baca aturan coding sampai memahami workflow branch, PR, test, evidence, dan larangan operasi destruktif.
2. Audit AWS Academy: struktur materi, rangkuman SDD/Kiro, spec dan task yang sudah ada, serta status PR relevan.
3. Audit `berangkasku`: README (jika ada), package manifest, arsitektur, autentikasi, database, penyimpanan rahasia, enkripsi, test, dan deployment.
4. Catat temuan dengan tautan file/line bila tersedia. Bedakan fakta, asumsi, dan bagian yang belum dapat diakses.
5. Jangan mengubah `main`, menggabungkan PR, atau deploy pada tahap audit.

## Tahap 1 — Rencana belajar dan spesifikasi
Buat roadmap belajar singkat yang memetakan konsep yang benar-benar ada di AWS Academy ke tugas proyek. Mulai dengan requirement, user stories, acceptance criteria, threat model, batasan, arsitektur, dan test plan. Jangan memilih layanan AWS/Cloudflare/database hanya karena familier; bandingkan dengan materi, aturan repository, biaya, dan kebutuhan nyata.

## Tahap 2 — Rancang keamanan sebelum fitur
Password manager menyimpan data sangat sensitif. Tentukan dengan jelas:
- data yang dilindungi dan model ancaman;
- perbedaan password akun dan master password;
- strategi enkripsi/dekripsi dan pengelolaan kunci;
- apakah enkripsi dilakukan di client atau server dan konsekuensinya;
- salt, nonce/IV, autentikasi integritas, derivasi kunci, backup dan pemulihan;
- autentikasi, otorisasi, sesi, rate limiting, validasi, logging, dan risiko XSS/CSRF;
- konsekuensi kehilangan master password.
Jangan menyimpan rahasia plaintext, jangan mengembangkan kriptografi sendiri, dan jangan menyebut sistem zero-knowledge sebelum bisa dibuktikan. Gunakan data dummy saja. Jika desain keamanan belum dapat dipertanggungjawabkan, hentikan implementasi fitur penyimpanan rahasia dan laporkan pertanyaan terbuka.

## Tahap 3 — Implementasi bertahap
- Gunakan workflow Spec-Driven Development: requirements → design → tasks → implementasi → test → evidence → review.
- Pecah pekerjaan menjadi PR kecil yang mandiri dan mudah diverifikasi.
- Setiap PR harus mengajarkan satu atau beberapa konsep yang jelas.
- Sebelum setiap task, jelaskan konsep singkat; setelahnya jelaskan perubahan dan hasil test.
- Jangan push langsung ke `main`, jangan merge otomatis, jangan menyentuh PR lain, dan jangan melakukan operasi destruktif.
- Terapkan “NO EVIDENCE, NO DONE”. Tes yang tidak dijalankan wajib ditandai UNCONFIRMED.
- Jangan menambahkan fitur atau dependensi di luar scope tanpa alasan dan persetujuan.

## Tahap 4 — Verifikasi
Jalankan lint, type-check, unit/integration test, build, dan pemeriksaan keamanan yang relevan dengan stack aktual. Tambahkan test negatif: akses tanpa autentikasi, akses data pengguna lain, input tidak valid, kesalahan dekripsi, dan kebocoran rahasia ke log. Jangan menyatakan aman hanya karena build sukses. Catat keterbatasan tes yang tidak dapat dijalankan.

## Tahap 5 — Laporan dan PR
Buat PR dengan ringkasan, alasan desain, konsep pembelajaran, daftar perubahan, test command beserta output, bukti, risiko, dan langkah review. Jangan merge atau deploy produksi tanpa persetujuan eksplisit.

## Keluaran pertama yang saya minta
Jangan langsung coding. Berikan:
1. hasil audit tiga repository;
2. identitas pasti repository password manager atau status bahwa belum terkonfirmasi;
3. daftar materi AWS Academy yang paling relevan beserta alasan;
4. roadmap belajar + proyek dalam beberapa PR kecil;
5. risiko keamanan paling penting dan pertanyaan yang harus diputuskan;
6. rekomendasi langkah pertama.
Setelah laporan itu, tunggu konfirmasi saya sebelum mulai implementasi.
