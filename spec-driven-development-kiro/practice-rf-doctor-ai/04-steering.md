# Steering — RF Doctor AI

Status: ACTIVE PROPOSED RULES — berlaku setelah project owner menyetujui  
Versi: 0.1

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
- Tidak push langsung ke main.
- Tidak merge otomatis.
- Tidak menjalankan operasi git destruktif (force push, reset hard, rebase destruktif, menghapus branch/data) tanpa persetujuan eksplisit.
- Jangan melakukan deploy produksi, membuat biaya berbayar, atau mengaktifkan billing tanpa persetujuan pemilik.
- Jangan membuat/menggunakan secret atau mengubah akun layanan tanpa izin.
- Gunakan branch khusus untuk setiap batch kerja dan PR yang dapat ditinjau.

## 3. NO EVIDENCE, NO DONE

Setiap task wajib melaporkan:
- perubahan yang dibuat;
- file yang berubah;
- command tes yang dijalankan;
- hasil aktual command;
- pemeriksaan manual yang dilakukan;
- bukti/link/artefak;
- tes yang belum dilakukan dan alasan;
- keterbatasan dan risiko yang tersisa.

Jangan mengklaim tes PASS jika tidak dijalankan. Tes yang belum dijalankan diberi status UNCONFIRMED.

## 4. Batas kewenangan AI

AI coding agent boleh:
- membaca repo dan spesifikasi;
- membuat perubahan di branch kerja;
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
- menyatakan komponen rusak tanpa bukti teknis.

## 5. Standar diagnosis AI

- Pisahkan fakta, laporan, hipotesis, dan hasil verifikasi.
- Jangan mengarang nilai pengukuran, sumber, skema, nomor komponen, atau langkah service.
- Sumber tanpa izin/asal-usul yang jelas tidak boleh menjadi referensi aktif.
- Bila bukti kurang, minta pemeriksaan yang paling relevan berikutnya.
- Tunjukkan risiko tindakan yang berpotensi merusak perangkat.
- Diagnosis tidak boleh mengendalikan alat atau perangkat secara otomatis.
- Hindari menyimpan data pelanggan yang tidak diperlukan.

## 6. Standar kode

- Gunakan dependency minimal dan versi yang didukung.
- Validasi data pada batas API.
- Pisahkan UI, domain logic, persistence, retrieval, dan AI provider.
- Tambahkan unit test untuk logic yang deterministik.
- Tambahkan contract tests untuk API.
- Jangan hardcode API key.
- Hindari abstraksi berlebihan; arsitektur modular harus tetap sederhana untuk MVP.
- Dokumentasikan keputusan penting di decision log.

## 7. Proses review

PR harus menjelaskan:
- tujuan;
- requirement/task terkait;
- perubahan utama;
- tes dan hasil;
- evidence;
- risiko;
- cara rollback bila relevan.

PR belum layak merge jika acceptance criteria belum terpenuhi, evidence hilang, ada secret, atau tes penting gagal.

## 8. Belajar sambil membangun

Setiap batch implementasi perlu ringkasan tutor singkat:
- konsep teknis yang dipakai;
- alasan pemilihan;
- istilah baru dengan definisi sederhana;
- satu latihan/pertanyaan pemahaman bila bermanfaat.

Tutor tidak boleh mengubah scope atau menulis ulang requirement tanpa menandai perubahan yang diusulkan.