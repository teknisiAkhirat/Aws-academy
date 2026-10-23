# Pengenalan Komputasi di Cloud: Amazon EC2

> Materi 3.1 — Belajar Dasar Cloud dan Gen AI di AWS

## Tujuan Pembelajaran

Setelah mempelajari modul ini, Anda diharapkan mampu:

- Menjelaskan manfaat dasar Amazon EC2.
- Mengidentifikasi perbedaan tipe instance Amazon EC2.
- Membedakan berbagai opsi penagihan Amazon EC2.
- Merangkum manfaat Amazon EC2 Auto Scaling.
- Meringkas manfaat Elastic Load Balancing.
- Memberikan contoh penggunaan Elastic Load Balancing.
- Menjelaskan perbedaan Amazon Simple Notification Service (Amazon SNS) dan Amazon Simple Queue Service (Amazon SQS).
- Memaparkan opsi komputasi tambahan di AWS.

## Pengenalan Amazon Elastic Compute Cloud (Amazon EC2)

Pada model client-server, client mengirimkan permintaan kepada server. Server kemudian memproses permintaan tersebut dan mengirimkan tanggapan. Model ini tidak hanya berlaku untuk kedai kopi, tetapi juga untuk bisnis perawatan kesehatan, manufaktur, asuransi, dan layanan pengiriman konten video.

Bisnis membutuhkan server yang menyediakan kapasitas komputasi untuk menjalankan aplikasi dan memenuhi kebutuhan operasional. Di AWS, server tersebut tersedia dalam bentuk virtual melalui layanan **Amazon Elastic Compute Cloud (Amazon EC2)**.

Amazon EC2 menyediakan kapasitas komputasi yang fleksibel, hemat biaya, dan cepat dibandingkan dengan menjalankan server sendiri di pusat data (*data center*) lokal atau **on-premise**.

### Perbedaan server on-premise dan Amazon EC2

Menyiapkan server on-premise membutuhkan beberapa langkah dan biaya:

1. Meneliti jenis serta jumlah server yang diperlukan.
2. Membeli server dengan biaya awal yang besar.
3. Menunggu beberapa minggu atau bahkan beberapa bulan sampai server tersedia.
4. Memasang, menyusun, dan menghubungkan perangkat.
5. Memastikan server aman dan berjalan dengan baik sebelum aplikasi dapat dijalankan.

Setelah membeli server fisik, pemilik tetap menanggungnya meskipun kapasitasnya tidak digunakan secara maksimal.

Dengan Amazon EC2, AWS menangani pembangunan dan pengamanan pusat data serta pengadaan, penyusunan, dan pemasangan server. Pengguna dapat meminta instance sesuai kebutuhan, dan server virtual tersebut biasanya siap dalam hitungan menit.

Server virtual di AWS disebut **instance**. Setelah selesai digunakan, instance dapat dihentikan atau diakhiri. Biaya penggunaan mengikuti kapasitas dan sumber daya yang digunakan sesuai model harga layanan.

## Mesin virtual, hypervisor, dan multitenancy

Amazon EC2 berjalan pada **host**, yaitu mesin fisik yang dikelola AWS, dengan bantuan teknologi virtualisasi. Satu host dapat menjalankan beberapa mesin virtual; pengguna tidak harus menggunakan seluruh mesin fisik untuk satu instance.

**Hypervisor** adalah perangkat lunak yang membagi sumber daya fisik di antara mesin-mesin virtual. Hypervisor juga mengisolasi mesin virtual satu sama lain. Dengan demikian, instance dapat berbagi sumber daya host tanpa kehilangan pemisahan antar-instance.

Konsep berbagi perangkat keras fisik yang mendasari beberapa mesin virtual ini disebut **multitenancy**. Pengelolaan host dan hypervisor ditangani oleh AWS.

## Fleksibilitas dan kendali Amazon EC2

Amazon EC2 memberi pengguna kendali atas konfigurasi server virtual, antara lain:

- **Sistem operasi (OS):** memilih sistem operasi seperti Windows atau Linux.
- **Perangkat lunak:** memasang aplikasi bisnis internal, situs web sederhana atau kompleks, basis data, dan perangkat lunak pihak ketiga.
- **Ukuran instance:** memulai dengan instance berukuran kecil, lalu mengubah ukurannya ketika kebutuhan aplikasi bertambah atau berkurang.
- **CPU dan memori:** menambah atau mengurangi kapasitas komputasi sesuai kebutuhan.
- **Jaringan:** mengatur lalu lintas jaringan yang diizinkan serta menentukan apakah instance dapat diakses secara publik atau privat.

Mengubah kapasitas sebuah instance dengan menambah atau mengurangi sumber dayanya disebut **vertical scaling** atau penskalaan vertikal.

Amazon EC2 memungkinkan pengguna menjalankan, menghentikan, dan mengonfigurasi server sesuai kebutuhan. Model **Compute as a Service (CaaS)** membantu pengembang dan bisnis menyediakan komputasi tanpa harus mengelola sendiri seluruh perangkat keras pusat data.

## Cara Kerja Amazon EC2

Proses dasar penggunaan Amazon EC2 dapat dibagi menjadi tiga tahap.

### 1. Luncurkan (*Launch*)

Pilih templat dengan konfigurasi dasar untuk instance. Templat dapat mencakup sistem operasi, server aplikasi, atau aplikasi lainnya. Pilih juga tipe instance, yaitu konfigurasi perangkat keras tertentu untuk instance tersebut.

Saat menyiapkan peluncuran, tentukan pengaturan keamanan yang mengontrol lalu lintas jaringan masuk dan keluar dari instance.

### 2. Hubungkan (*Connect*)

Instance dapat dihubungkan melalui beberapa cara. Program dan aplikasi dapat tersambung langsung ke instance untuk bertukar data. Pengguna juga dapat mengakses instance dari komputer desktop melalui metode koneksi yang tersedia.

### 3. Gunakan (*Use*)

Setelah terhubung, instance dapat digunakan untuk berbagai pekerjaan, seperti:

- Menginstal perangkat lunak.
- Menambahkan penyimpanan.
- Menyalin dan mengatur berkas.
- Menjalankan aplikasi yang dibutuhkan.

## Inti Materi

Amazon EC2 adalah layanan komputasi AWS yang menyediakan server virtual sesuai kebutuhan. Dibandingkan mengelola server fisik sendiri, pengguna dapat menyediakan instance lebih cepat, memilih konfigurasi sistem operasi dan perangkat lunak, mengatur kapasitas, serta menghentikan instance ketika tidak lagi diperlukan.

Alur dasarnya adalah **luncurkan instance → hubungkan → gunakan**.
