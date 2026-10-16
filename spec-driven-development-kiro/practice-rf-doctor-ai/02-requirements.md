# Requirements — RF Doctor AI

> [REVISI AUDIT 2026-10-17] Dokumen direvisi berdasarkan audit. Status tetap DRAFT; perubahan belum menjadi persetujuan pemilik.

Status: DRAFT FOR OWNER REVIEW  
Versi: 0.2

## Problem and outcome

Teknisi membutuhkan catatan kasus yang rapi dan bantuan untuk memilih langkah diagnosis jaringan seluler/RX/TX/RF berdasarkan gejala, bukti pemeriksaan, dan referensi teknis. Sistem harus transparan tentang keterbatasan dan tidak menampilkan dugaan AI sebagai fakta.

## Target user

Teknisi HP yang menggunakan perangkat Android miliknya untuk menangani banyak perangkat pelanggan.

## Functional requirements

- FR-01: Pengguna dapat membuat kasus dengan ID internal, merek/model perangkat, gejala utama, konteks jaringan, dan catatan awal.
- FR-02: Form harus membolehkan informasi yang belum diketahui tetap kosong dan menandainya sebagai UNKNOWN; tidak boleh mengarang nilai default.
- FR-03: Pengguna dapat mencatat hasil pemeriksaan manual dengan nilai, satuan, alat/metode, kondisi pengukuran, waktu, dan catatan.
- FR-04: Pengguna dapat menambahkan bukti seperti teks hasil pemeriksaan. Dukungan foto/attachment masih OPEN dan tidak termasuk MVP awal kecuali disetujui pemilik.
- FR-05: Pengguna dapat meminta AI menyusun hipotesis diagnosis berdasarkan data kasus yang disediakan; fitur ini berada setelah gerbang SPIKE-01.
- FR-06: Jawaban AI harus memiliki struktur: ringkasan kasus, fakta yang diketahui, informasi yang belum ada, hipotesis berperingkat dengan alasan, langkah verifikasi berikutnya, alat yang dibutuhkan, peringatan risiko, dan referensi.
- FR-07: Sistem harus membedakan data terukur, laporan teknisi, inferensi AI, dan hasil yang telah diverifikasi.
- FR-08: AI tidak boleh mengklaim komponen rusak secara pasti bila bukti belum mencukupi.
- FR-09: Jika sumber relevan tidak ditemukan, AI harus mengatakannya dan tidak menciptakan sitasi.
- FR-10: Pengguna dapat menambahkan temuan akhir dan hasil setelah perbaikan secara manual.
- FR-11: Pengguna dapat melihat riwayat kasus dan perubahan diagnosis yang tercatat.
- FR-12: Pengguna dapat mencari referensi teknis berdasarkan istilah, gejala, kategori, dan model perangkat. Fitur pencarian pada fase offline hanya mencakup sumber yang memang tersedia secara lokal.
- FR-13: Semua sumber referensi yang ditampilkan harus memiliki metadata asal-usul dan status verifikasi.
- FR-14: Sistem menampilkan status layanan AI, batas penggunaan yang diketahui, dan pesan error yang dapat dimengerti. Jika batas provider tidak dapat diketahui, UI menyatakannya.
- FR-15: Fungsi inti MVP tidak mengharuskan root, ADB, Shizuku, akses modem vendor, atau izin telephony.
- FR-16: Aplikasi menyatakan bahwa diagnosis AI online membutuhkan koneksi internet. Fase offline-only tidak boleh menampilkan AI seolah-olah tersedia.
- FR-17: Pengguna dapat mengekspor ringkasan kasus tanpa menyertakan identifier sensitif secara default. Format ekspor masih OPEN.

## Non-functional requirements

- NFR-01: Bahasa antarmuka utama adalah Bahasa Indonesia yang mudah dipahami.
- NFR-02: Antarmuka mobile-first, cocok untuk layar Android.
- NFR-03: API provider key hanya disimpan di backend secret store jika backend AI kelak disetujui.
- NFR-04: Endpoint API harus memiliki autentikasi, validasi input, batas ukuran request, dan rate limiting sebelum digunakan di luar lingkungan lokal.
- NFR-05: IMEI/IMSI/ICCID/nomor telepon tidak dikirim ke AI secara default.
- NFR-06: Error dan data kosong ditampilkan eksplisit, tidak dianggap sebagai nilai normal.
- NFR-07: Jawaban diagnosis dapat ditelusuri ke input dan sumber yang digunakan.
- NFR-08: Setiap fitur memiliki automated tests dan evidence; uji perangkat nyata ditandai terpisah dari tes otomatis.
- NFR-09: Ketika backend/AI tidak tersedia, kasus yang sudah tersimpan lokal tidak hilang, sesuai strategi penyimpanan yang nanti disetujui pemilik.

## Non-goals

- Pengukuran RF fisik tanpa alat eksternal.
- Diagnosis otomatis yang memastikan komponen rusak tanpa pemeriksaan.
- Root/ADB/vendor modem integration pada MVP.
- TelephonyManager dan pengambilan data jaringan otomatis pada MVP; risetnya POST-MVP.
- Flashing, write NV, modifikasi IMEI, atau operasi destruktif.
- Knowledge-base ingestion untuk dokumen yang tidak memiliki izin penggunaan.
- Multi-tenant/organisasi dan billing pengguna sampai kebutuhan terbukti.

## Acceptance criteria

- AC-01: Kasus baru dapat disimpan dengan informasi minimal dan ID internal unik.
- AC-02: Data yang tidak diketahui ditampilkan sebagai UNKNOWN/kosong, bukan nol.
- AC-03: Pengukuran manual menyimpan nilai, satuan, metode/alat, kondisi, dan waktu; field yang tidak diketahui tetap UNKNOWN.
- AC-04: Struktur hasil diagnosis mencakup ringkasan, fakta, unknowns, hipotesis beserta alasan, langkah verifikasi, alat, risiko, batasan, dan referensi.
- AC-05: Jika model mengembalikan JSON tidak valid atau source ID yang tidak ditemukan dalam hasil retrieval, sistem menampilkan error/fallback aman dan tidak mengklaim diagnosis berhasil.
- AC-06: Saat AI/backend offline atau tidak dikonfigurasi, UI menampilkan status yang jelas; data lokal yang tersimpan tetap dapat dibuka.
- AC-07: Pemeriksaan source, konfigurasi, dan artefak build tidak menemukan API key provider yang tertanam di kode Android atau log.
- AC-08: Sebelum teks bebas dikirim ke AI, sanitizer mencoba membuang pola identifier yang ditentukan di bawah. UI memperingatkan teknisi agar tidak memasukkan data pribadi. Tes fixture mencakup setiap pola. Sanitasi regex tidak menjamin semua data pribadi tertangkap; UI harus meminta pengguna memeriksa teks sebelum pengiriman.
- AC-09: Referensi berstatus DRAFT atau tanpa asal-usul/izin yang jelas tidak ditampilkan sebagai sumber terverifikasi.
- AC-10: Paket uji mencakup sinyal lemah, no service, tidak bisa panggilan, dan data tidak lengkap.
- AC-11: Laporan tugas mencantumkan perintah tes yang benar-benar dijalankan, hasil aktual, bukti, dan tes yang belum dilakukan berstatus UNCONFIRMED.
- AC-12: Perubahan spesifikasi/kode diserahkan melalui PR; tidak ada merge otomatis.
- AC-13: Untuk FR-04, pengguna dapat menambahkan bukti teks ke kasus dan membuka kembali bukti tersebut setelah aplikasi ditutup/dibuka. Foto/attachment tidak diuji selama masih di luar scope.
- AC-14: Pada fixture dengan nilai berlabel MEASURED, REPORTED, INFERRED, dan VERIFIED, UI/keluaran menyajikan label sumber tersebut secara terpisah dan tidak menaikkan inferensi menjadi hasil terverifikasi.
- AC-15: Pada kasus uji bukti-tidak-cukup, keluaran tidak memuat klaim bahwa komponen tertentu pasti rusak; keluaran menyatakan bukti yang kurang dan meminta langkah verifikasi.
- AC-16: Pada fixture retrieval kosong, keluaran menyatakan sumber relevan tidak ditemukan dan tidak menghasilkan sitasi/source ID palsu.
- AC-17: Pengguna dapat menyimpan temuan akhir dan hasil perbaikan; setelah kasus dibuka kembali, nilai yang disimpan tetap sama dan dibedakan dari hipotesis sebelumnya.
- AC-18: Setelah dua revisi diagnosis pada fixture, riwayat menampilkan urutan waktu dan versi/perubahan tanpa menimpa entri sebelumnya secara diam-diam.
- AC-19: Pencarian mengembalikan referensi lokal yang cocok dengan kata kunci fixture dan tidak menyajikan sumber yang tidak ada di registry.
- AC-20: Saat AI tidak dikonfigurasi, kuota tidak diketahui, kuota terlampaui, atau provider error, UI menampilkan keadaan yang sesuai tanpa mengarang angka kuota.
- AC-21: Build MVP dan alur kasus dapat digunakan tanpa meminta izin root, ADB, Shizuku, atau telephony; daftar permission aktual diperiksa dari manifest build.
- AC-22: Ketika pengguna membuka fitur diagnosis online saat offline, UI menjelaskan bahwa koneksi diperlukan; mode offline tidak mengklaim telah menjalankan AI.
- AC-23: Ekspor default tidak memuat identifier sensitif yang terdeteksi oleh sanitizer; fixture ekspor mencakup IMEI 15 digit, nomor telepon Indonesia, ICCID, serta kasus dengan data yang tidak cocok pola untuk menguji batasan.
- AC-24: String UI utama dan pesan error yang diuji menggunakan Bahasa Indonesia yang sederhana.
- AC-25: Alur utama diuji pada layar ponsel; screenshot atau rekaman langkah uji dilampirkan sebagai evidence bila pengujian perangkat tersedia.
- AC-26: Sebelum endpoint publik diaktifkan, tes menunjukkan request tanpa autentikasi/otorisasi ditolak, payload invalid/terlalu besar ditolak, dan batas permintaan diterapkan. Endpoint publik tidak dibuat pada fase offline-only.
- AC-27: Untuk NFR-07, fixture hasil diagnosis dapat ditelusuri ke input kasus dan ID sumber yang benar-benar digunakan.
- AC-28: Setiap fitur yang diserahkan memiliki tes otomatis yang relevan atau alasan tertulis bila tes otomatis tidak masuk akal, serta status uji perangkat nyata.
- AC-29: Simulasi backend/AI tidak tersedia menunjukkan bahwa kasus lokal masih dapat dibaca dan tidak terhapus.
- AC-30: Untuk NFR-03, pemeriksaan artefak tidak menemukan secret provider; aturan ini baru berlaku untuk implementasi backend/AI.

### Aturan sanitizer untuk AC-08 dan AC-23 [REVISI AUDIT 2026-10-17]

Pola yang wajib dicoba oleh implementasi:
- IMEI: rangkaian 15 digit berturut-turut.
- Nomor telepon Indonesia: variasi umum yang diawali +62, 62, atau 0 dengan panjang digit yang sesuai pola telepon; implementasi perlu menghindari menghapus angka acak yang bukan nomor telepon.
- ICCID: pola identifier kartu SIM berupa rangkaian digit panjang. Panjang dan format bisa berbeda; jangan menganggap satu regex mencakup semua ICCID.
- IMSI juga termasuk identifier sensitif dan harus diminimalkan/dibuang bila ditemukan, tetapi pola lengkap perlu divalidasi sebelum implementasi.

Fixture tes harus mencakup contoh sintetis positif, negatif, format dengan spasi/tanda hubung, dan teks campuran. Jangan gunakan identifier pelanggan nyata sebagai fixture. UI teks bebas menampilkan peringatan: “Jangan masukkan nama, nomor telepon, IMEI/IMSI/ICCID, atau data pelanggan. Pemeriksaan otomatis tidak menjamin semua data pribadi terhapus; periksa teks sebelum mengirim.” Sanitasi regex hanya lapisan pengurangan risiko, bukan jaminan anonimisasi.

## Matriks Keterlacakan [REVISI AUDIT 2026-10-17]

| Requirement | Acceptance criteria yang menutupnya |
|---|---|
| FR-01 | AC-01 |
| FR-02 | AC-02 |
| FR-03 | AC-03 |
| FR-04 | AC-13 |
| FR-05 | AC-04, AC-05, AC-15 |
| FR-06 | AC-04 |
| FR-07 | AC-14 |
| FR-08 | AC-15 |
| FR-09 | AC-16 |
| FR-10 | AC-17 |
| FR-11 | AC-18 |
| FR-12 | AC-19 |
| FR-13 | AC-09 |
| FR-14 | AC-20 |
| FR-15 | AC-21 |
| FR-16 | AC-22 |
| FR-17 | AC-23 |
| NFR-01 | AC-24 |
| NFR-02 | AC-25 |
| NFR-03 | AC-07, AC-30 |
| NFR-04 | AC-26 |
| NFR-05 | AC-08, AC-23 |
| NFR-06 | AC-02, AC-05, AC-20 |
| NFR-07 | AC-04, AC-14, AC-27 |
| NFR-08 | AC-11, AC-28 |
| NFR-09 | AC-06, AC-29 |

## Ukuran Keberhasilan [REVISI AUDIT 2026-10-17]

Nilai berikut belum ditetapkan. Tidak boleh dipilih oleh agent.

- Proporsi kasus servis nyata yang penyebab terverifikasinya berada di tiga hipotesis teratas: OWNER TO DECIDE: jumlah kasus N, definisi “penyebab terverifikasi”, dan target persentase.
- Waktu median untuk melengkapi satu kasus: OWNER TO DECIDE: target waktu dan metode pencatatan.
- Proporsi hasil diagnosis dengan sumber yang dapat diverifikasi: OWNER TO DECIDE: target persentase dan metode penilaian.
- Batas biaya AI/backend bulanan: OWNER TO DECIDE: nominal dan apakah biaya non-AI ikut dihitung.
- Kriteria kelulusan SPIKE-01: OWNER TO DECIDE: rubrik dan ambang kelulusan.

## Open questions

- Platform Android: Kotlin native, Flutter, PWA, atau modul aplikasi yang sudah ada — lihat ADR-001.
- Auth provider/flow: OPEN — lihat ADR-007.
- Penyimpanan lokal dan sinkronisasi: OPEN — lihat ADR-008.
- Provider AI default: OPEN setelah SPIKE-01 dan benchmark.
- Attachment/foto: OPEN; tidak termasuk fase awal kecuali disetujui.
- Minimum Android API dan cara build: OPEN — lihat ADR-010.
- Batas biaya bulanan dan metrik keberhasilan: OPEN — lihat ADR-011 dan bagian Ukuran Keberhasilan.
