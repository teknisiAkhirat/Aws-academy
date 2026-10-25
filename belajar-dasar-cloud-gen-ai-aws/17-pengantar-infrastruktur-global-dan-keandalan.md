# Pengantar Infrastruktur Global dan Keandalan

**Kelas:** Belajar Dasar Cloud dan Gen AI di AWS  
**Modul:** 4.1 — Pengantar Infrastruktur Global dan Keandalan

## Tujuan Pembelajaran

Setelah mempelajari modul ini, diharapkan dapat:

- Merangkum manfaat infrastruktur global AWS.
- Menjelaskan konsep dasar Availability Zone.
- Menjelaskan manfaat Amazon CloudFront dan Edge Locations.
- Membandingkan berbagai metode untuk menyediakan layanan AWS.

## Memahami Ketersediaan Tinggi

Materi menggunakan analogi kedai kopi. Jika kedai hanya memiliki satu lokasi dan jalan menuju ke sana terhalang parade, pelanggan tidak bisa datang sehingga penjualan dapat menurun. Jika kedai memiliki beberapa lokasi di berbagai bagian kota, pelanggan masih dapat mengunjungi lokasi lain yang mudah dijangkau.

AWS menerapkan gagasan serupa melalui infrastruktur globalnya: sumber daya dan layanan dapat ditempatkan di lokasi-lokasi berbeda untuk membantu mengurangi dampak gangguan pada satu lokasi.

## Mengapa Sumber Daya Tidak Sebaiknya Berada di Satu Data Center?

Jika seluruh sumber daya ditempatkan di satu data center, gangguan seperti pemadaman listrik atau bencana alam dapat membuat semua aplikasi tidak tersedia sekaligus. Memiliki dua data center saja belum tentu memberikan perlindungan yang memadai.

Dua konsep penting untuk menghadapi risiko ini adalah:

- **High availability (ketersediaan tinggi):** kemampuan sistem untuk tetap bekerja dan dapat diakses dengan waktu henti minimal, tanpa perlu intervensi manusia.
- **Fault tolerance (toleransi terhadap kesalahan):** kemampuan sistem untuk tetap beroperasi meskipun beberapa komponennya mengalami kegagalan.

AWS beroperasi di berbagai lokasi di seluruh dunia yang disebut **AWS Regions**. Rincian tentang Region akan dibahas lebih lanjut dalam modul berikutnya.

## Inti Materi

Jangan menempatkan semua sumber daya hanya di satu lokasi. Merancang sistem dengan mempertimbangkan ketersediaan tinggi dan toleransi terhadap kegagalan membantu mengurangi risiko seluruh layanan berhenti ketika satu lokasi atau komponen mengalami gangguan.

> Catatan: Materi ini merupakan pengantar. Penjelasan lebih mendalam tentang AWS Regions dan komponen infrastruktur global dibahas pada submodul berikutnya.
