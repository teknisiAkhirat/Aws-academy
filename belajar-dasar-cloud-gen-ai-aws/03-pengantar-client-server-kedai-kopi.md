# Pengantar

> Catatan artikel bersih dari kelas Dicoding **Belajar Dasar Cloud dan Gen AI di AWS**, bagian 2.2.

## Tujuan Pembelajaran

Di bagian ini, Anda akan mempelajari cara:

- Merangkum manfaat menggunakan AWS.
- Menjelaskan perbedaan antara penyajian on-demand dan penerapan cloud.
- Merangkum model harga pay-as-you-go.

## Selamat Datang di Kedai Kopi

Kelas ini membahas informasi penting seputar AWS agar Anda memahami mengapa AWS bermanfaat bagi kebutuhan perusahaan dan bisnis saat ini.

AWS menawarkan berbagai layanan untuk beragam kebutuhan. Layanannya mencakup komputasi, penyimpanan, keamanan jaringan, blockchain, machine learning, artificial intelligence (kecerdasan buatan), platform pengembangan robot, hingga layanan khusus seperti manajemen produksi video dan satelit orbital yang dapat disewa per menit.

Karena cakupannya sangat luas, pembahasan dimulai dari model dasar komputasi cloud.

## Model Client-Server

Hampir semua model komputasi modern menggunakan model **client-server**.

Dalam komputasi, **client** dapat berupa browser web atau aplikasi yang mengirim permintaan kepada **server**. Server dapat berupa layanan seperti Amazon Elastic Compute Cloud (Amazon EC2).

Sebagai contoh, client meminta akses ke artikel berita, skor game online, atau video. Server kemudian mengevaluasi permintaan tersebut dan mengembalikan informasi yang diminta kepada client.

### Analogi kedai kopi

Untuk mempermudah pemahaman, materi menggunakan skenario kedai kopi:

- **Pelanggan** berperan sebagai client yang mengajukan permintaan.
- **Kasir** berperan sebagai server yang menerima dan memproses permintaan.
- Dalam AWS, peran server tersebut dapat dianalogikan dengan **Amazon EC2**, yaitu server virtual yang disebut *instance*.

Seperti pelanggan yang memesan kopi, client mengajukan permintaan dengan izin akses yang sesuai. Server kemudian menanggapi permintaan tersebut.

Alur transaksi di kedai kopi:

1. Pelanggan (client) mengajukan permintaan kepada kasir (server).
2. Kasir memvalidasi permintaan, misalnya memeriksa apakah pelanggan telah membayar.
3. Jika permintaan sah, pesanan diproses.
4. Setelah selesai, kasir memberikan kopi kepada pelanggan. Dalam analogi komputasi, ini seperti server mengembalikan respons kepada client.

Aplikasi nyata dapat memiliki alur yang jauh lebih kompleks, terutama ketika digunakan dalam sistem bisnis berskala besar. Karena itu, materi dimulai dari konsep yang sederhana.

## Prinsip Biaya AWS

Salah satu konsep utama AWS adalah **pay for what you use** — membayar sesuai penggunaan.

Dalam analogi kedai kopi, pegawai dibayar saat bekerja. Pemilik kedai dapat menentukan jumlah pegawai yang dibutuhkan dan membayar berdasarkan jam kerja.

Misalnya, ketika meluncurkan minuman baru, pemilik kedai mungkin ingin menyiapkan banyak pegawai untuk menghadapi lonjakan pelanggan. Namun, jumlah pelanggan tidak selalu tinggi sepanjang hari.

Situasi ini mirip dengan data center **on-premise** (lokal). Menambah kapasitas tidak dapat dilakukan secara instan hanya dengan menekan tombol; ada proses administratif dan biaya yang perlu dipertimbangkan.

Dengan AWS, pengguna tidak perlu membayar uang muka untuk seluruh infrastruktur dan dapat menyesuaikan sumber daya sesuai kebutuhan.

### Data center dan on-premise

Menurut materi, data center adalah fasilitas yang digunakan perusahaan untuk menempatkan aplikasi dan data penting. Komponen utamanya meliputi router, switch, firewall, sistem penyimpanan, dan server.

Istilah **on-premise** mengacu pada penyimpanan dan pemeliharaan data di server lokal atau pribadi.

### Pay for what you need

Prinsip berikutnya adalah **pay for what you need** — membayar sesuai kebutuhan.

Dalam analogi kedai kopi, ketika membutuhkan barista atau kapasitas tambahan, pemilik dapat menyediakannya. Ketika sudah tidak dibutuhkan, sumber daya tersebut dapat dilepas sehingga tidak perlu terus membayarnya.

Prinsip ini menjadi salah satu nilai utama AWS. Kelas ini membantu peserta memahami bagaimana AWS dapat mendukung operasional bisnis dengan lebih baik.

Pelajari materi secara saksama karena konsep-konsep tersebut akan dibahas lebih dalam dalam perjalanan menuju Cloud Practitioner.

## Referensi yang disebutkan dalam materi

- Cisco — sumber penjelasan tentang data center.
