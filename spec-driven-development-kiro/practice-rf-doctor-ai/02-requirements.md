# Requirements — RF Doctor AI

Status: DRAFT FOR REVIEW  
Versi: 0.1

## Problem and outcome

Teknisi membutuhkan catatan kasus yang rapi dan bantuan untuk memilih langkah diagnosis jaringan seluler/RX/TX/RF berdasarkan gejala, bukti pemeriksaan, dan referensi teknis. Sistem harus transparan tentang keterbatasan dan tidak menampilkan dugaan AI sebagai fakta.

## Target user

Teknisi HP yang menggunakan perangkat Android miliknya untuk menangani banyak perangkat pelanggan.

## Functional requirements

- FR-01: Pengguna dapat membuat kasus dengan ID internal, merek/model perangkat, gejala utama, konteks jaringan, dan catatan awal.
- FR-02: Form harus membolehkan informasi yang belum diketahui tetap kosong dan menandainya sebagai UNKNOWN; tidak boleh mengarang nilai default.
- FR-03: Pengguna dapat mencatat hasil pemeriksaan manual dengan nilai, satuan, alat/metode, kondisi pengukuran, waktu, dan catatan.
- FR-04: Pengguna dapat menambahkan bukti seperti teks hasil pemeriksaan; dukungan foto/attachment masih TBD dan tidak wajib untuk MVP awal.
- FR-05: Pengguna dapat meminta AI menyusun hipotesis diagnosis berdasarkan data kasus yang disediakan.
- FR-06: Jawaban AI harus memiliki struktur: ringkasan kasus, fakta yang diketahui, informasi yang belum ada, hipotesis berperingkat dengan alasan, langkah verifikasi berikutnya, alat yang dibutuhkan, peringatan risiko, dan referensi.
- FR-07: AI harus membedakan data terukur, laporan teknisi, inferensi, dan hasil terverifikasi.
- FR-08: AI tidak boleh mengklaim komponen rusak secara pasti bila bukti belum mencukupi.
- FR-09: Jika sumber relevan tidak ditemukan, AI harus mengatakannya dan tidak menciptakan sitasi.
- FR-10: Pengguna dapat menambahkan temuan akhir dan hasil setelah perbaikan secara manual.
- FR-11: Pengguna dapat melihat riwayat kasus dan setiap perubahan diagnosis.
- FR-12: Pengguna dapat mencari referensi teknis berdasarkan istilah, gejala, kategori, dan model perangkat.
- FR-13: Semua sumber referensi yang ditampilkan harus memiliki metadata asal-usul dan status verifikasi.
- FR-14: Sistem menampilkan status layanan AI, batas penggunaan, dan pesan error yang dapat dimengerti.
- FR-15: Sistem tidak mengharuskan root, ADB, Shizuku, akses modem vendor, atau izin telephony untuk fungsi inti MVP.
- FR-16: Aplikasi harus menyatakan bahwa AI online membutuhkan koneksi internet.
- FR-17: Pengguna dapat mengekspor ringkasan kasus tanpa menyertakan identifier sensitif secara default; format ekspor TBD.

## Non-functional requirements

- NFR-01: Bahasa antarmuka utama adalah Bahasa Indonesia yang mudah dipahami.
- NFR-02: Antarmuka mobile-first, cocok untuk layar Android.
- NFR-03: API provider key hanya disimpan di backend secret store.
- NFR-04: Endpoint API memiliki autentikasi, validasi input, batas ukuran request, dan rate limiting sebelum digunakan di luar lingkungan lokal.
- NFR-05: Tidak ada IMEI/IMSI/ICCID/nomor telepon yang dikirim ke AI secara default.
- NFR-06: Error dan data kosong harus ditampilkan eksplisit, tidak dianggap sebagai nilai normal.
- NFR-07: Jawaban diagnosis harus dapat ditelusuri ke input dan sumber yang digunakan.
- NFR-08: Setiap fitur harus memiliki automated tests dan evidence; uji perangkat nyata ditandai terpisah dari tes otomatis.
- NFR-09: Ketika backend/AI tidak tersedia, kasus yang sudah tersimpan secara lokal tidak boleh hilang jika strategi penyimpanan offline disetujui.

## Non-goals

- Pengukuran RF fisik tanpa alat eksternal.
- Diagnosis otomatis yang memastikan komponen rusak tanpa pemeriksaan.
- Root/ADB/vendor modem integration pada MVP.
- Flashing, write NV, modifikasi IMEI, atau operasi destructive.
- Knowledge-base ingestion untuk dokumen yang tidak memiliki izin penggunaan.
- Multi-tenant/organisasi dan billing pengguna sampai kebutuhan terbukti.

## Acceptance criteria

- AC-01: Kasus baru dapat disimpan dengan informasi minimal dan ID internal unik.
- AC-02: Data yang tidak diketahui ditampilkan sebagai UNKNOWN/kosong, bukan nol.
- AC-03: Pengukuran manual menyimpan satuan dan metode.
- AC-04: Diagnosis menyertakan hipotesis, alasan, data kurang, langkah verifikasi, risiko, dan sumber.
- AC-05: Jika model mengembalikan JSON tidak valid atau tanpa sumber yang diminta, aplikasi menampilkan error/fallback aman dan tidak mengklaim diagnosis berhasil.
- AC-06: Jika AI/backend offline, pengguna menerima pesan yang jelas; data kasus lokal yang sudah disimpan tetap tersedia sesuai desain.
- AC-07: Tidak ada secret provider dalam kode Android, build artifact, atau log.
- AC-08: Input sensitif dihapus/minimalkan sebelum dikirim ke model.
- AC-09: Referensi dengan status DRAFT tidak ditampilkan sebagai sumber terverifikasi.
- AC-10: Pengujian kasus simulasi mencakup sinyal lemah, no service, tidak bisa panggilan, dan data tidak lengkap.
- AC-11: Hasil tes, keterbatasan, dan tes yang belum dijalankan dilaporkan dengan jujur.
- AC-12: Dokumen requirements, design, steering, task breakdown, dan evidence diperbarui melalui PR; tidak merge otomatis.

## Open questions

- Auth provider/flow: TBD.
- Offline local database and sync: TBD.
- Provider AI default: TBD after benchmark.
- Attachment/photo scope: TBD; excluded from first implementation unless approved.
- Minimum Android API: TBD after build environment and device matrix review.