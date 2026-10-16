# Riset Kelayakan — RF Doctor AI

> [REVISI AUDIT 2026-10-17] Klaim yang belum diuji pada lingkungan pemilik secara eksplisit ditandai UNCONFIRMED.

Status: INITIAL RESEARCH — belum menjadi bukti kelayakan akhir  
Tanggal pemeriksaan dokumen: 2026-10-17

## 1. Ringkasan

Proyek mungkin layak sebagai asisten pencatatan dan penalaran diagnosis, tetapi nilai inti belum terbukti dan knowledge base belum tersedia/ditinjau. Gerbang awal adalah SPIKE-01: uji manual 10–15 kasus servis nyata yang sudah dianonimkan memakai format keluaran desain, lalu pemilik menilai manfaatnya.

Pengukuran fisik pada antena, filter, PA, jalur PCB, dan IC RF tetap membutuhkan prosedur servis serta alat yang sesuai. Aplikasi tidak boleh menyatakan dapat mengukur jalur RF fisik melalui software saja.

## 2. Android dan data jaringan — POST-MVP, tidak dipakai MVP (FR-15, ADR-005) [REVISI AUDIT 2026-10-17]

Bagian ini hanya catatan untuk kemungkinan fase berikutnya; bukan scope MVP offline-only.

Referensi resmi:
- TelephonyManager: https://developer.android.com/reference/android/telephony/TelephonyManager
- CellSignalStrengthLte: https://developer.android.com/reference/android/telephony/CellSignalStrengthLte
- CellSignalStrengthNr: https://developer.android.com/reference/android/telephony/CellSignalStrengthNr
- Android permissions overview: https://developer.android.com/guide/topics/permissions/overview

Temuan awal yang perlu diuji pada perangkat target:
- Android menyediakan API untuk sebagian nilai jaringan, tetapi nilai yang tersedia bergantung pada API level, izin, perangkat, implementasi modem, dan kondisi jaringan.
- Nilai UNAVAILABLE tidak boleh diubah menjadi nol.
- Aplikasi di HP teknisi tidak otomatis membaca data telephony dari HP pelanggan yang terpisah.
- Nilai yang dilaporkan modem bukan bukti tunggal kerusakan fisik RF.

Status detail ketersediaan tiap metrik/izin di perangkat pemilik: UNCONFIRMED. Tidak ada penggunaan TelephonyManager di MVP.

## 3. Lingkungan build & alternatif platform [REVISI AUDIT 2026-10-17]

Kondisi pemilik yang menjadi input perbandingan:
- Pengembangan sehari-hari mobile-first dari HP Android melalui Termux.
- Pemilik memiliki Oracle VPS.
- Pemilik sudah memiliki aplikasi Flutter offline-first.
- Kemampuan dan kemudahan membangun APK langsung di perangkat pemilik belum dibuktikan untuk toolchain yang dipilih.

Semua penilaian kecocokan di bawah adalah HIPOTESIS / UNCONFIRMED sampai ENV-01 menjalankan build nyata.

| Opsi | Potensi kelebihan | Potensi kekurangan/risiko | Status |
|---|---|---|---|
| Kotlin native + Jetpack Compose | API Android native dan integrasi platform langsung | Toolchain Android/Gradle/JDK/SDK di Termux perlu diuji; build lokal dari HP tidak boleh diasumsikan berhasil | UNCONFIRMED |
| Flutter | Pemilik sudah memiliki aplikasi Flutter offline-first; kemungkinan penggunaan ulang pengetahuan dan pola lokal | Kesesuaian codebase yang ada, versi Flutter/Dart, plugin, dan build APK pada lingkungan pemilik perlu diuji | UNCONFIRMED |
| PWA (web app yang dapat dipasang dari browser) | Potensi paling sederhana untuk workflow berbasis browser dan backend web | Batas akses hardware/native, pengalaman offline, dan kebutuhan distribusi APK perlu dibandingkan dengan kebutuhan MVP | UNCONFIRMED |
| Memperluas modul/aplikasi yang sudah ada | Bisa menghindari proyek baru jika arsitektur dan lisensinya cocok | Risiko mencampur scope, dependensi, dan perilaku aplikasi lama; harus audit codebase sebelum memilih | UNCONFIRMED |

### Jalur build yang perlu diuji

1. Build di Termux langsung: UNCONFIRMED untuk tiap opsi; jangan menganggap Android SDK/Gradle/JDK akan terpasang dan berjalan tanpa kendala.
2. GitHub Actions: secara umum dapat menjalankan workflow CI yang didefinisikan dalam repository, tetapi workflow Android untuk proyek ini, versi toolchain, artefak APK, dan kebutuhan secret belum diuji. Status proyek: UNCONFIRMED.
3. Oracle VPS: kemungkinan menjadi runner/build host jika OS, arsitektur, ruang disk, RAM, dependensi, dan akses jaringan cocok; build Android pada VPS ini belum diuji. Status: UNCONFIRMED.
4. Build Flutter dari environment lain lalu mengunduh APK ke HP: perlu uji apakah alur ini praktis bagi pemilik. Status: UNCONFIRMED.

Sumber resmi untuk investigasi (bukan bukti bahwa build telah berhasil):
- Android build overview: https://developer.android.com/build
- Android Gradle plugin release notes/compatibility: https://developer.android.com/build/releases/gradle-plugin
- Kotlin Android: https://kotlinlang.org/docs/android-overview.html
- Flutter install: https://docs.flutter.dev/get-started/install
- Flutter deployment Android: https://docs.flutter.dev/deployment/android
- GitHub Actions documentation: https://docs.github.com/actions
- Termux project repository: https://github.com/termux/termux-app
- Oracle Cloud Infrastructure documentation: https://docs.oracle.com/en-us/iaas/

Tidak ada klaim bahwa platform tertentu pasti paling mudah atau bahwa VPS/Actions telah dikonfigurasi. ENV-01 wajib menguji pilihan dengan bukti sebelum platform final dipilih.

## 4. Backend dan penyimpanan — ditunda sampai gerbang

Sumber resmi:
- Cloudflare Workers pricing: https://developers.cloudflare.com/workers/platform/pricing/
- Cloudflare D1 pricing: https://developers.cloudflare.com/d1/platform/pricing/
- Cloudflare D1 FAQ: https://developers.cloudflare.com/d1/reference/faq/
- Supabase pricing: https://supabase.com/pricing

Workers dapat dievaluasi sebagai API server-side; D1 adalah kandidat database. Supabase juga merupakan opsi yang perlu dibandingkan dengan kebutuhan nyata dan resource yang sudah ada. Harga, batas gratis, biaya egress, backup, dan kebutuhan operasional harus diverifikasi pada saat keputusan. Status konfigurasi serta biaya untuk proyek ini: UNCONFIRMED.

Tidak ada backend, database, deployment, atau billing yang dibuat oleh dokumen ini.

## 5. Pilihan AI — ditunda sampai SPIKE-01

Sumber resmi:
- Cloudflare Workers AI pricing: https://developers.cloudflare.com/workers-ai/platform/pricing/
- Gemini Developer API pricing and data terms: https://ai.google.dev/gemini-api/docs/pricing

Harga, kuota, model yang tersedia, aturan penggunaan data, dan kinerja bahasa Indonesia dapat berubah. Semua perbandingan kualitas untuk diagnosis servis belum diuji. Jangan mengirim data pelanggan ke model selama eksperimen; gunakan kasus yang telah dianonimkan dan periksa kembali hasil sanitasi.

Provider default: OPEN. Benchmark harus menilai sumber, ketidakpastian, langkah verifikasi, validitas struktur, latensi, batas penggunaan, privasi, dan biaya per kasus.

## 6. Basis pengetahuan

Saat ini nilai inti dan isi knowledge base belum terbukti. Mulai dari catatan servis milik pemilik yang boleh digunakan, dianonimkan, serta memiliki metadata asal-usul. Jangan mengasumsikan catatan yang ada cukup untuk diagnosis.

Metadata minimal:
- ID sumber;
- judul/catatan;
- merek/model/perangkat yang relevan bila diketahui;
- tanggal catatan;
- sumber asal dan izin penggunaan;
- gejala, bukti, langkah pemeriksaan, temuan akhir;
- status REVIEW NEEDED / REVIEWED / VERIFIED / RETIRED;
- siapa yang meninjau dan tanggal review.

Skema/boardview atau materi pihak ketiga hanya boleh digunakan jika izin pemakaian dan distribusinya jelas.

## 7. Keamanan dan privasi

- Jangan mengirim IMEI, IMSI, ICCID, nomor telepon, nama pelanggan, atau identitas yang tidak diperlukan ke AI.
- Gunakan ID kasus internal; jangan gunakan IMEI sebagai primary key.
- Sanitasi otomatis hanya pengurangan risiko dan tidak menjamin semua data pribadi tertangkap.
- Kunci provider harus berada di secret store backend jika backend AI kelak disetujui.
- Endpoint publik wajib memiliki autentikasi, validasi, pembatasan laju, dan batas ukuran request.
- Kebijakan retensi, backup, ekspor, dan penghapusan perlu disetujui sebelum pilot.

## 8. Risiko yang belum terjawab

1. Apakah keluaran AI benar-benar membantu pada 10–15 kasus servis nyata anonim?
2. Platform apa yang paling realistis untuk workflow pemilik dari HP?
3. Apakah perlu backend sama sekali setelah uji manual?
4. Strategi autentikasi dan sinkronisasi apa yang sesuai jika backend dipilih?
5. Catatan servis mana yang boleh dimasukkan ke knowledge base dan bagaimana menilainya?
6. Provider AI mana yang sesuai dari segi kualitas, privasi, dan batas biaya?
7. Bagaimana backup/export dilakukan tanpa mengumpulkan data pelanggan yang tidak diperlukan?

## 9. Kesimpulan

Jangan mulai backend atau integrasi TelephonyManager sekarang. Jalankan SPIKE-01 dan ENV-01, susun knowledge base dari catatan pemilik, lalu minta pemilik memutuskan apakah nilai produk terbukti dan platform mana yang akan digunakan. Semua klaim build/performa yang belum diuji tetap UNCONFIRMED.
