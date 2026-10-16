# Executor Handoff — AmalBrankas / Password Vault

> Dokumen ini adalah template kontrak kerja untuk executor coding. Jangan mulai implementasi sebelum semua artefak persiapan ditinjau dan disetujui pengguna.

## Peran dan batas kewenangan

Executor yang diminta: **Gemini 4 Argon**.

Executor bertugas mengimplementasikan rencana yang disetujui, menjalankan pemeriksaan yang tersedia, mengumpulkan bukti, memperbarui dokumentasi, lalu menghasilkan arsip ZIP untuk unggah manual. Executor bukan pemilik keputusan produk dan tidak boleh menebak keputusan yang belum disepakati.

Jika Gemini 4 Argon tidak tersedia di lingkungan eksekusi, berhenti dan laporkan keterbatasan. Jangan diam-diam menggantinya dengan model lain.

## Input wajib sebelum mulai coding

Pastikan paket handoff berisi versi terbaru dan telah disetujui dari:

- [ ] Audit baseline repository dan commit/ref yang menjadi dasar.
- [ ] Aturan coding dari repository `teknisiAkhirat/aturan-coding`.
- [ ] Steering files yang relevan (product, tech, structure, security, testing, deployment/code conventions).
- [ ] Project brief/problem statement.
- [ ] `requirements.md` beserta acceptance criteria dan scope.
- [ ] `design.md` termasuk threat model dan keputusan arsitektur yang relevan.
- [ ] `tasks.md` dengan dependensi dan kriteria selesai.
- [ ] Quality gates/test strategy dan matriks requirement → task → test → evidence.
- [ ] Persetujuan final pengguna untuk mulai coding.
- [ ] Daftar file/folder yang termasuk dan tidak termasuk dalam perubahan.

Jika ada input wajib yang hilang, bertentangan, atau belum disetujui, **jangan coding**. Tuliskan pertanyaan klarifikasi untuk AI tutor/pengguna.

## Instruksi eksekusi

1. Baca semua artefak dan aturan sebelum mengubah file.
2. Periksa baseline dan jangan menghapus perubahan yang sudah ada.
3. Kerjakan task sesuai urutan dan ID pada `tasks.md`; jangan memperluas scope tanpa persetujuan.
4. Untuk setiap task, catat requirement terkait, file yang diubah, pendekatan, hasil pemeriksaan, dan bukti.
5. Terapkan konvensi kode, prinsip tanggung jawab tunggal, penamaan jelas, komentar yang menjelaskan alasan, dan penanganan error yang tepat.
6. Jangan memasukkan rahasia, token, password, data pengguna, atau data vault nyata ke source code, log, fixture, screenshot, ZIP, atau laporan.
7. Untuk password manager, jangan menulis algoritme kriptografi sendiri; jangan mengklaim keamanan/zero-knowledge/production-ready tanpa bukti dan review yang memadai.
8. Jalankan test, lint, typecheck, build, dan pemeriksaan keamanan yang tersedia serta relevan. Jangan mengarang hasil atau menyamakan test yang tidak dijalankan dengan lulus.
9. Tinjau diff untuk perubahan di luar scope, risiko regresi, dokumentasi usang, serta file rahasia/artefak yang tidak semestinya.
10. Update status task dan dokumentasi sesuai hasil nyata. Tandai pemeriksaan yang tidak tersedia sebagai `NOT RUN` atau `UNCONFIRMED`.
11. Jangan melakukan push/commit ke GitHub, membuka/mengubah PR, merge, atau deploy. Pengguna akan mengunggah ZIP secara manual.

## Persyaratan ZIP

Buat satu arsip ZIP dengan struktur direktori yang masuk akal dan siap ditinjau/diunggah manual.

Sertakan, sesuai relevansi:

- Source code dan aset yang diperlukan.
- Artefak steering dan SDD yang diperbarui.
- `IMPLEMENTATION-REPORT.md`: ringkasan perubahan, task yang selesai/belum selesai, keputusan penting, dan keterbatasan.
- `TEST-REPORT.md`: perintah pemeriksaan yang benar-benar dijalankan, hasil aktual, bukti, dan daftar `NOT RUN` / `UNCONFIRMED`.
- `MANUAL-UPLOAD.md`: langkah meninjau ZIP dan mengunggah file ke repository secara manual, termasuk peringatan agar tidak menimpa perubahan baru tanpa review.
- Daftar file yang dimasukkan dan dikecualikan.
- SHA-256 ZIP bila lingkungan memungkinkan.

Jangan sertakan:

- Folder `.git/` kecuali diminta secara eksplisit.
- `.env` atau credential/token/private key.
- `node_modules/`, cache, file sementara, log rahasia, coverage/build output yang tidak dibutuhkan.
- Database dump, password asli, atau data brankas pengguna.
- File yang tidak terkait dengan scope yang disetujui.

Jika proyek memerlukan konfigurasi lingkungan, sertakan hanya template aman seperti `.env.example` dengan nilai dummy dan dokumentasi variabel yang dibutuhkan.

## Format laporan akhir

Laporan harus menyebutkan:

1. Baseline yang digunakan.
2. Versi artefak persiapan yang diimplementasikan.
3. Task yang selesai, parsial, dan belum dikerjakan.
4. File penting yang berubah dan alasannya.
5. Perintah test/lint/typecheck/build/security yang dijalankan dan hasil aktual.
6. Bukti dan keterbatasan; semua yang tidak dijalankan harus dinyatakan jelas.
7. Risiko keamanan/regresi yang masih terbuka.
8. Lokasi/nama ZIP, ukuran, dan SHA-256 jika tersedia.
9. Instruksi unggah manual.
10. Konsep SDD yang dipraktikkan dan refleksi singkat untuk pembelajaran.

**Definisi selesai:** hasil implementasi sesuai scope yang disetujui, bukti yang tersedia dilaporkan jujur, tidak ada rahasia dalam ZIP, dan arsip dapat diperiksa. Keberhasilan membuat ZIP saja bukan bukti bahwa aplikasi aman atau siap produksi.
