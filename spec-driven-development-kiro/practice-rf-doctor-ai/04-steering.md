# Steering — RF Doctor AI

> [REVISI AUDIT 2026-10-17] Status dan aturan diperjelas; belum berlaku sampai disetujui pemilik.

Status: PROPOSED - berlaku setelah disetujui pemilik  
Versi: 0.2

Dokumen ini mengatur perilaku AI coding agent, reviewer, dan alur pengembangan.

## 1. Source of truth

Urutan otoritas:
1. Keputusan eksplisit pemilik proyek yang terbaru.
2. Requirements dan acceptance criteria yang disetujui.
3. Design dan decision log yang disetujui.
4. Task breakdown.
5. Implementasi yang ada.
6. Saran AI/agent.

Jika implementasi bertentangan dengan spesifikasi, jangan mengubah spesifikasi diam-diam. Laporkan konflik dan usulkan perubahan melalui PR.

## 2. Aturan eksekusi

- Satu task aktif pada satu waktu, kecuali task independen yang secara eksplisit disetujui.
- Satu task: implement → test → verify → evidence → commit → PR.
- Jangan mulai task berikutnya sebelum bukti task sebelumnya cukup.
- Jika requirement ambigu, saling bertentangan, atau terblokir oleh keputusan OPEN, berhenti dan bertanya kepada pemilik. Jangan menebak atau meneruskan keputusan arsitektur.
- Jangan mengarang angka, target, ambang, estimasi biaya, hasil pengujian, atau data. Gunakan OWNER TO DECIDE: ___ untuk nilai yang memerlukan keputusan pemilik.
- Tidak push langsung ke main.
- Tidak merge otomatis.
- Tidak menjalankan operasi git destruktif (force push, reset hard, rebase destruktif, menghapus branch/data) tanpa persetujuan eksplisit.
- Jangan melakukan deploy produksi, membuat biaya berbayar, atau mengaktifkan billing tanpa persetujuan pemilik.
- Jangan membuat/menggunakan secret atau mengubah akun layanan tanpa izin.
- Jika secret terdeteksi telah masuk riwayat Git, segera berhenti, jangan menyalin atau mengulang nilainya, laporkan file/commit secara aman kepada pemilik, dan tunggu instruksi rotasi/remediasi. Jangan mencoba menghapus riwayat secara otomatis.
- Gunakan branch khusus untuk setiap batch kerja dan PR yang dapat ditinjau.
- Semua instruksi yang diberikan kepada pemilik harus berupa perintah lengkap yang siap ditempel, disertai penjelasan singkat tentang fungsi dan hasil yang diharapkan. Asumsikan pemilik bekerja dari HP dan tidak menyunting kode manual.

## 3. NO EVIDENCE, NO DONE

Setiap task wajib melaporkan:
- perubahan yang dibuat dan file yang berubah;
- command tes/verifikasi yang dijalankan;
- hasil aktual setiap command, termasuk exit code bila tersedia;
- pemeriksaan manual yang dilakukan;
- bukti/link/artefak;
- tes yang belum dilakukan dan alasannya;
- keterbatasan, risiko, dan keputusan yang masih terbuka.

Jangan mengklaim tes PASS jika tidak dijalankan. Tes yang belum dijalankan diberi status UNCONFIRMED. Jika lingkungan eksekusi tidak tersedia, nyatakan keterbatasan dan jangan menyamakan pemeriksaan API dengan hasil command lokal.

## 4. Batas kewenangan AI

AI coding agent boleh:
- membaca repo dan spesifikasi;
- membuat perubahan di branch kerja yang diizinkan;
- menjalankan build/test yang aman;
- menyiapkan dokumentasi dan PR;
- mengusulkan perubahan desain dengan alasan.

AI coding agent tidak boleh tanpa persetujuan:
- merge PR;
- deploy ke produksi;
- mengaktifkan billing/layanan berbayar;
- menghapus data, database, repository, atau resource;
- mengubah IMEI, NV data, atau konfigurasi modem;
- mengunggah skema/boardview atau dokumen berhak cipta tanpa izin;
- mengirim data pelanggan atau identifier sensitif ke provider AI;
- menyatakan komponen rusak tanpa bukti teknis;
- mengubah status keputusan OPEN menjadi final.

## 5. Standar diagnosis AI

- Pisahkan fakta, laporan, hipotesis, dan hasil verifikasi.
- Jangan mengarang nilai pengukuran, sumber, skema, nomor komponen, atau langkah service.
- Sumber tanpa izin/asal-usul yang jelas tidak boleh menjadi referensi aktif.
- Bila bukti kurang, minta pemeriksaan yang paling relevan berikutnya.
- Tunjukkan risiko tindakan yang berpotensi merusak perangkat.
- Diagnosis tidak boleh mengendalikan alat atau perangkat secara otomatis.
- Hindari menyimpan data pelanggan yang tidak diperlukan.
- Confidence label harus mengikuti aturan bukti yang ditinjau, bukan angka/label bebas dari model.

## 6. Standar kode dan dokumen

- Gunakan dependency minimal dan versi yang didukung.
- Validasi data pada batas API.
- Pisahkan UI, domain logic, persistence, retrieval, dan AI provider bila komponen tersebut benar-benar diperlukan.
- Tambahkan unit test untuk logic yang deterministik.
- Tambahkan contract tests untuk API.
- Jangan hardcode API key.
- Hindari abstraksi berlebihan; arsitektur harus sesederhana kebutuhan yang sudah terbukti.
- Dokumentasikan keputusan penting di decision log.
- Untuk perubahan audit, tandai bagian yang berubah dengan [REVISI AUDIT YYYY-MM-DD].

## 7. Proses review

PR harus menjelaskan:
- tujuan;
- requirement/task terkait;
- perubahan utama;
- tes dan hasil aktual;
- evidence;
- risiko dan keputusan OPEN;
- cara rollback bila relevan.

PR belum layak merge jika acceptance criteria belum terpenuhi, evidence hilang, ada secret, atau tes penting gagal. Jangan mengklaim command lokal telah dijalankan bila hanya memeriksa file melalui GitHub API.

## 8. Belajar sambil membangun

Setiap batch implementasi perlu ringkasan tutor singkat:
- konsep teknis yang dipakai;
- alasan pemilihan;
- istilah baru dengan definisi sederhana;
- satu latihan/pertanyaan pemahaman bila bermanfaat.

Tutor tidak boleh mengubah scope atau menulis ulang requirement tanpa menandai perubahan yang diusulkan.
