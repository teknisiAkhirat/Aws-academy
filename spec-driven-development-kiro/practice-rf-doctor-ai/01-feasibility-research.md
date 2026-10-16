# Riset Kelayakan — RF Doctor AI

Status: INITIAL RESEARCH — sebagian perlu validasi melalui prototipe  
Tanggal pemeriksaan: 2026-10-17

## 1. Ringkasan

Proyek layak sebagai **asisten pencatatan dan penalaran diagnosis**, bukan sebagai alat ukur RF langsung. API Android dapat menyediakan sebagian informasi sinyal yang dilaporkan sistem/modem. Pengukuran fisik pada antena, filter, PA, jalur PCB, dan IC RF tetap membutuhkan prosedur servis serta alat yang sesuai.

## 2. Android dan data jaringan

Referensi:
- TelephonyManager: https://developer.android.com/reference/android/telephony/TelephonyManager
- CellSignalStrengthLte: https://developer.android.com/reference/android/telephony/CellSignalStrengthLte
- CellSignalStrengthNr: https://developer.android.com/reference/android/telephony/CellSignalStrengthNr
- Android permissions overview: https://developer.android.com/guide/topics/permissions/overview

Temuan awal:
- API Android menyediakan sejumlah nilai jaringan seperti RSRP, RSRQ, RSSNR, RSSI, dan metrik NR jika perangkat/API mendukungnya.
- Nilai tertentu memiliki penanda UNAVAILABLE. Aplikasi harus mempertahankan status tersebut, bukan mengubahnya menjadi nol.
- Ketersediaan data bergantung pada API level, permission, implementasi perangkat, modem, dan kondisi jaringan.
- Aplikasi yang berjalan di HP teknisi tidak otomatis memperoleh telephony data dari HP pelanggan yang terpisah. MVP memakai input manual; koneksi langsung ke perangkat pelanggan adalah riset terpisah.
- Nilai sinyal yang dilaporkan perangkat bukan bukti tunggal kerusakan fisik RF.

**Validasi sebelum implementasi:** buat matriks API level/perizinan dan uji pada perangkat Android nyata. Jangan menjanjikan semua metrik tersedia di semua perangkat.

## 3. Backend dan penyimpanan

Referensi:
- Cloudflare Workers pricing: https://developers.cloudflare.com/workers/platform/pricing/
- Cloudflare D1 pricing: https://developers.cloudflare.com/d1/platform/pricing/
- Cloudflare D1 FAQ: https://developers.cloudflare.com/d1/reference/faq/

Temuan awal:
- Workers cocok dievaluasi sebagai API backend untuk mengamankan kredensial AI dan menerapkan validasi, batas penggunaan, dan logging.
- D1 adalah database SQL yang memiliki tingkat gratis dengan batas penggunaan; jika batas gratis terlampaui, operasi dapat gagal sampai batas direset atau paket diubah.
- Batas, harga, dan kuota harus diperiksa kembali pada saat deployment.
- Kunci API model tidak boleh ditanamkan di APK. APK dapat diperiksa dan kredensial yang disisipkan dapat diekstrak.

## 4. Pilihan AI

Referensi:
- Cloudflare Workers AI pricing: https://developers.cloudflare.com/workers-ai/platform/pricing/
- Gemini Developer API pricing and data terms: https://ai.google.dev/gemini-api/docs/pricing

Temuan yang terlihat saat riset:
- Workers AI mendokumentasikan alokasi 10.000 Neurons per hari untuk tingkat gratis; model tertentu mensyaratkan metode pembayaran, dan batas dapat menyebabkan permintaan gagal.
- Gemini API mendokumentasikan free tier untuk model tertentu, tetapi tabel pricing menyatakan konten pada free tier dapat digunakan untuk meningkatkan produk. Ini perlu diperhatikan untuk data servis.
- Karena kebijakan, model, kuota, dan harga berubah, jangan mengunci provider hanya berdasarkan nama model atau klaim “gratis”.
- Rekomendasi desain: buat adapter provider di backend, lalu evaluasi model melalui benchmark kasus diagnosis sebelum menentukan default.

**Kriteria benchmark:** validitas struktur output, kepatuhan terhadap sumber, kalibrasi ketidakpastian, kualitas langkah pemeriksaan, latensi, batas permintaan, dan biaya per kasus. Model tidak dinilai hanya berdasarkan kelancaran bahasa.

## 5. Basis pengetahuan

MVP sebaiknya dimulai dengan dokumen teknis terstruktur dan pencarian teks sederhana. RAG (retrieval-augmented generation) berarti mengambil bagian dokumen relevan sebelum meminta AI menjawab. Pencarian vektor belum wajib untuk dataset awal.

Setiap sumber perlu metadata:
- judul dan penerbit/pemilik;
- URL atau lokasi sumber;
- tanggal diakses;
- lisensi/izin penggunaan;
- perangkat/model yang berlaku;
- status: DRAFT, REVIEWED, VERIFIED, atau RETIRED;
- reviewer dan tanggal verifikasi.

Skema, boardview, dan materi servis hanya boleh dimasukkan jika penggunaan serta distribusinya sah. Jangan mengunggah dokumen berhak cipta ke layanan AI tanpa hak atau dasar yang sesuai.

## 6. Keamanan dan privasi

- Jangan kirim IMEI, nomor telepon, ICCID, IMSI, nama pelanggan, atau data identitas yang tidak dibutuhkan ke model AI.
- Gunakan ID kasus internal acak; jangan menjadikan IMEI sebagai primary key.
- Jangan simpan data pribadi pelanggan di log aplikasi/backend.
- Kredensial provider hanya berada di secret store backend.
- Endpoint diagnosis harus memiliki autentikasi, pembatasan laju, validasi input, dan batas ukuran payload.
- Mekanisme autentikasi pengguna masih TBD dan harus diputuskan sebelum endpoint publik dibuat.
- Data diagnosis dapat berisi informasi usaha/pelanggan; tentukan kebijakan retensi dan penghapusan sebelum pilot.

## 7. Risiko yang belum terjawab

1. Model AI mana yang paling baik untuk bahasa Indonesia dan diagnosis teknis?
2. Bagaimana autentikasi pengguna yang sederhana tetapi aman untuk aplikasi Android dan Cloudflare Worker?
3. Apakah catatan kasus harus offline-first dengan Room, atau cukup penyimpanan online pada tahap awal?
4. Referensi teknis legal apa yang tersedia untuk model HP yang sering diservis?
5. Apa format kasus uji yang bisa dinilai oleh teknisi berpengalaman?
6. Bagaimana melakukan backup/export tanpa menyimpan data pelanggan yang berlebihan?

## 8. Kesimpulan

Lanjutkan ke review requirements dan desain, bukan langsung coding. Semua keputusan yang terkait autentikasi, penyimpanan offline, provider AI, dan sumber pengetahuan perlu ditutup sebelum implementasi fitur terkait.