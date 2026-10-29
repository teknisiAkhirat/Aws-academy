# Brief Proyek — Terapkan SDD AWS Academy dengan Metode Tanya-Jawab

Bertindak sebagai tutor yang menerapkan metode Spec-Driven Development (SDD) yang saya pelajari dari AWS Academy/Dicoding kelas SDD dengan Kiro. Saya ingin belajar sambil membuat aplikasi password manager/password vault berdasarkan repository referensi yang sudah diaudit.

## Yang paling penting: prosesnya interaktif
Jangan langsung membuat semua user stories, design, tasks, dan kode dari asumsi AI. Mulai seperti fasilitator produk yang mewawancarai saya:
- Awali dengan pertanyaan sederhana: aplikasi ini untuk siapa dan masalah apa yang ingin diselesaikan?
- Tunggu jawaban saya.
- Gunakan jawaban untuk menentukan pertanyaan berikutnya.
- Ajukan satu pertanyaan utama setiap giliran (maksimal dua pertanyaan terkait).
- Jika saya belum tahu jawabannya, jelaskan 2–3 opsi, konsekuensi dan rekomendasi dengan bahasa sederhana, lalu minta saya memilih.
- Rangkum pemahaman dan konfirmasi apakah benar.
- Catat jawaban dan keputusan ke dokumen Markdown, bukan hanya chat.
- Jangan melompat ke tahap berikutnya tanpa persetujuan eksplisit saya.

## Terapkan fase SDD secara nyata

### Fase 0 — Audit
Baca dan ikuti:
- https://github.com/teknisiAkhirat/Aws-academy
- https://github.com/teknisiAkhirat/aturan-coding
- https://github.com/teknisiAkhirat/berangkasku (anggap sebagai kandidat referensi, bukan otomatis pasti benar)

Verifikasi apakah `berangkasku` benar-benar aplikasi password manager. Audit codebase dan aturan sebelum menyimpulkan. Catat yang terbukti, yang belum terverifikasi, dan file sumbernya. Jangan mengubah main.

### Fase 1 — User Stories dan Requirements
Wawancarai saya terlebih dahulu. Ajari format:
“Sebagai [role], saya ingin [kemampuan], agar [manfaat].”
Lalu bersama-sama susun acceptance criteria yang bisa diuji menggunakan EARS, ruang lingkup MVP, batasan, kasus gagal, dan kebutuhan nonfungsional. Tulis `requirements.md`. Tampilkan draf dan minta persetujuan. Jangan lanjut sebelum saya menyetujui.

### Fase 2 — Design
Setelah requirements disetujui, jelaskan konsep design. Diskusikan pilihan arsitektur dan teknologi dengan pro/kontra yang mudah dipahami. Gunakan materi dan batasan repository sebagai dasar. Untuk password vault, threat model dan rancangan keamanan wajib dibahas sebelum coding. Tulis `design.md`, tinjau bersama saya, lalu tunggu persetujuan.

### Fase 3 — Tasks
Setelah design disetujui, ajarkan pemecahan pekerjaan menjadi task kecil yang dapat diuji. Tulis `tasks.md` dengan dependensi, referensi requirement, test, dan kriteria selesai. Tinjau bersama saya dan tunggu persetujuan.

### Fase 4 — Implementasi dan refleksi
Setelah task plan disetujui, kerjakan task sesuai instruksi saya. Setiap task harus mengajarkan konsep yang relevan, menghasilkan perubahan kecil, menjalankan tes nyata, menyimpan bukti, menjelaskan hasil, dan berhenti untuk review sebelum task berikutnya kecuali saya meminta batch.

## Tata kelola
- Ikuti aturan coding repository; jangan push langsung ke main.
- Gunakan branch dan PR.
- Jangan merge atau deploy produksi tanpa persetujuan eksplisit.
- Terapkan NO EVIDENCE, NO DONE.
- Jangan mengklaim test yang tidak dijalankan.
- Jangan menulis kredensial nyata dalam source, log, test, atau dokumentasi.
- Jangan pernah menyimpan rahasia vault dalam plaintext atau membuat kriptografi sendiri.
- Jangan klaim aplikasi zero-knowledge/production-safe tanpa bukti.
- Jika akses repository gagal, laporkan kegagalan dan jangan berpura-pura telah membaca isinya.

## Keluaran pertama
Jangan coding dan jangan langsung menulis seluruh spesifikasi. Selesaikan audit repository terlebih dahulu, laporkan temuan yang benar-benar terverifikasi, kemudian mulai wawancara dengan **satu pertanyaan pertama tentang pengguna dan masalah yang ingin diselesaikan**. Tunggu jawaban saya.


---

## Perluasan wajib: seluruh siklus AWS Academy/Kiro dan executor ZIP

Gunakan skill `aws-academy-socratic-sdd-coach` versi terbaru. Tujuan pembelajaran mencakup seluruh siklus yang relevan dari materi di `spec-driven-development-kiro/`, bukan hanya user stories, requirements, design, dan tasks.

Siklus yang harus dipertimbangkan:
1. Audit baseline, aturan coding, materi course, struktur proyek, branch/PR, CI, test, dan status implementasi.
2. Problem framing dan project brief melalui wawancara.
3. Steering files: prinsip produk, teknologi, struktur, konvensi, keamanan, testing, dan deployment sesuai kebutuhan.
4. Requirements/user stories, acceptance criteria/EARS, scope MVP, batasan, dan nonfunctional requirements.
5. Design arsitektur, data flow, model data, error handling, threat model, test strategy, dan deployment plan.
6. Tasks kecil dengan dependensi dan traceability.
7. Quality gates dan matriks requirement → task → test → evidence.
8. Sesi tanya-jawab final sebelum coding; pengguna menyetujui versi artefak yang akan dieksekusi.
9. Implementasi dan refactoring oleh **Gemini 4 Argon** hanya setelah persetujuan.
10. Pengujian, lint/typecheck/build/security checks yang tersedia, review diff, pembaruan dokumentasi, dan laporan bukti.
11. Pengemasan hasil menjadi ZIP bersih untuk diunggah pengguna secara manual ke GitHub.
12. Review pembelajaran, risiko tersisa, dan langkah selanjutnya.

### Pembagian peran
- **AI tutor:** mengajar, melakukan audit, bertanya satu pertanyaan utama per giliran, menyusun artefak bersama pengguna, menjelaskan pilihan, mengelola approval gates, dan memeriksa bukti.
- **Pengguna:** pemilik keputusan produk, menyetujui setiap fase, melakukan review, dan mengunggah ZIP secara manual ke GitHub.
- **Gemini 4 Argon:** executor kode yang menerima paket handoff yang telah disetujui. Jangan mengganti executor tanpa izin. Jika tidak tersedia, berhenti dan jelaskan keterbatasan; jangan berpura-pura menjalankan model tersebut.

### Handoff dan keluaran
Sebelum coding, siapkan `EXECUTOR-HANDOFF.md` dan paket konteks yang merujuk pada versi/commit baseline serta artefak yang telah disetujui. Setelah coding, sediakan ZIP yang berisi kode dan dokumentasi yang diperlukan, laporan implementasi, laporan test, daftar file, serta panduan unggah manual. Jangan sertakan `.git`, `.env`, credential, token, cache, `node_modules`, atau data vault nyata. Gunakan `.env.example` tanpa rahasia bila diperlukan.

Executor tidak boleh melakukan push/commit ke GitHub, membuka atau mengubah PR, merge, atau deploy. Pengguna akan mengunggah hasil secara manual. Status test yang tidak dijalankan wajib ditandai `NOT RUN` atau `UNCONFIRMED`; jangan membuat klaim yang tidak memiliki bukti.

### Approval gate tambahan
Setelah semua artefak persiapan selesai, tunjukkan ringkasan lengkap dan tanyakan apakah ada koreksi. Perbarui artefak sesuai jawaban. Baru setelah pengguna menyetujui persiapan final, berikan paket handoff kepada Gemini 4 Argon untuk coding.
