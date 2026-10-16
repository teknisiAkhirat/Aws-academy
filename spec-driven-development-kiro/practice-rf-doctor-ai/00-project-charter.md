# Project Charter — RF Doctor AI

Status: DRAFT FOR REVIEW  
Versi: 0.1  
Tanggal: 2026-10-17

## 1. Masalah

Teknisi membutuhkan cara yang konsisten untuk mencatat gejala kerusakan jaringan seluler, menghubungkan hasil pemeriksaan dengan referensi teknis, dan memilih langkah verifikasi berikutnya. Jawaban chatbot umum saja berisiko menghasilkan dugaan komponen yang tidak didukung bukti.

## 2. Visi

Membangun asisten teknisi yang membantu penalaran diagnosis jaringan seluler secara bertahap, transparan, dan berbasis bukti. Aplikasi harus membantu teknisi belajar, bukan menggantikan pengukuran atau penilaian teknisi.

## 3. Target pengguna

- Pengguna utama: teknisi servis HP.
- Pengguna awal: satu teknisi/pemilik usaha, dengan kemungkinan multi-user setelah kebutuhan terbukti.
- Perangkat penggunaan: HP Android milik teknisi.
- Perangkat yang didiagnosis: beragam HP pelanggan; aplikasi tidak menganggap dirinya memiliki akses otomatis ke data internal HP pelanggan.

## 4. Sasaran MVP

1. Membuat dan mengelola kasus servis.
2. Mencatat model/perangkat, gejala, konteks jaringan, dan pemeriksaan.
3. Menyimpan pengukuran manual dengan satuan dan konteks yang jelas.
4. Mengambil referensi teknis terkurasi yang relevan.
5. Meminta AI menyusun hipotesis, alasan, ketidakpastian, dan langkah pemeriksaan berikutnya.
6. Menyimpan temuan akhir dan hasil perbaikan.
7. Menampilkan sumber referensi yang dipakai dalam jawaban.

## 5. Bukan sasaran MVP

- Mengukur RF analog secara langsung melalui HP Android.
- Menentukan IC/komponen rusak tanpa bukti.
- Membaca modem Qualcomm/MediaTek melalui jalur proprietary secara universal.
- Menggunakan root, ADB, Shizuku, atau perintah AT sebagai prasyarat.
- Melakukan flashing, unlock, write NV, mengubah IMEI, atau tindakan berisiko pada perangkat.
- Mengunggah otomatis skema/boardview berhak cipta atau sumber yang tidak berizin.
- Melatih model AI sendiri.
- Mendukung seluruh kategori kerusakan HP sejak versi pertama.

## 6. Prinsip diagnosis

- Bedakan **data terukur**, **laporan pengguna**, **hipotesis AI**, dan **temuan terverifikasi**.
- Jangan menyimpulkan kerusakan komponen hanya dari satu indikator seperti sinyal lemah.
- Jika bukti tidak cukup, AI harus menyatakan belum dapat dipastikan.
- Setiap rekomendasi pemeriksaan harus menjelaskan tujuan, alat yang dibutuhkan, risiko, dan hasil yang perlu dicatat.
- Langkah berisiko tinggi harus disertai peringatan dan tidak boleh dijalankan otomatis.
- Hasil diagnosis harus bisa ditinjau ulang dari riwayat bukti dan sumber.

## 7. Ukuran keberhasilan awal

- Teknisi dapat membuat dan menyimpan kasus tanpa meminta AI.
- AI mengembalikan struktur jawaban yang valid dan menampilkan ketidakpastian.
- Setiap klaim yang menggunakan basis pengetahuan memiliki sumber yang dapat dibuka.
- Data yang tidak tersedia tidak ditampilkan sebagai nol atau nilai normal.
- Tidak ada API key penyedia AI di APK.
- Tes otomatis dan uji manual yang dilakukan dilaporkan dengan bukti; tes yang belum dilakukan ditandai UNCONFIRMED.
- MVP diuji dengan kasus simulasi sebelum digunakan untuk diagnosis pelanggan nyata.

## 8. Batasan dan asumsi

- Koneksi internet diperlukan untuk diagnosis AI online; pencatatan kasus lokal dapat dirancang agar tetap tersedia saat offline.
- Data telephony Android hanya mencerminkan data yang dilaporkan sistem/modem dan tersedia melalui izin API; bukan pengukuran fisik semua jalur RF.
- Harga, kuota, model AI, dan ketersediaan API dapat berubah dan harus dicek kembali sebelum rilis.
- Semua skema dan referensi harus memiliki asal-usul serta izin penggunaan yang sesuai.

## 9. Gerbang persetujuan

Tidak mulai implementasi produk sampai pemilik menyetujui requirements, desain, keputusan autentikasi, dan task breakdown. Dokumen saat ini hanya tahap discovery/specification.