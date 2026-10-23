# 3.6 — Messaging dan Queueing

Materi ini menjelaskan cara aplikasi berkomunikasi menggunakan pesan dan antrean agar satu komponen tidak harus menunggu komponen lain siap.

## Analogi kedai kopi: kasir dan barista

Kasir menerima pesanan pelanggan, menuliskannya, lalu menyerahkannya kepada barista. Jika barista sedang istirahat atau sibuk, kasir harus menunggu. Pesanan bisa terlambat atau bahkan dibatalkan.

Solusinya adalah menyediakan **buffer** (tempat penampungan sementara) berupa papan antrean pesanan:

1. Kasir menambahkan pesanan ke antrean.
2. Barista memeriksa antrean dan membuat pesanan.
3. Setelah pesanan selesai, barista menghapusnya dari antrean.
4. Selama barista bekerja, kasir tetap dapat menerima pesanan baru.

Konsep menempatkan pesan di buffer ini disebut **messaging dan queueing**.

## Tightly coupled dan loosely coupled

### Tightly coupled architecture

Pada arsitektur **tightly coupled** (komponen saling bergantung erat), aplikasi berkomunikasi secara langsung. Jika aplikasi B gagal menerima pesan dari aplikasi A, aplikasi A juga dapat mengalami error.

Ketergantungan seperti ini dapat menyebabkan masalah pada satu komponen merambat ke komponen lain atau ke seluruh sistem. Materi mengaitkan pendekatan ini dengan aplikasi monolitik, yaitu aplikasi yang berbagai komponennya digabungkan menjadi satu kesatuan.

### Loosely coupled architecture

Pada arsitektur **loosely coupled** (komponen tidak terlalu bergantung satu sama lain), kegagalan satu komponen dapat diisolasi agar tidak menyebabkan kegagalan beruntun.

Salah satu caranya adalah memakai **message queue** (antrean pesan):

1. Aplikasi A mengirim pesan ke antrean.
2. Aplikasi B mengambil dan memproses pesan.
3. Jika aplikasi B sedang gagal atau tidak tersedia, pesan tetap berada di antrean sampai dapat diproses.

Materi menghubungkan desain ini dengan **microservices** (layanan mikro): komponen memiliki tugas masing-masing serta dapat dikembangkan, diterapkan (*deploy*), dan dikelola secara independen.

## Layanan AWS untuk messaging dan queueing

Dua layanan yang diperkenalkan dalam materi ini adalah Amazon SQS dan Amazon SNS.

### Amazon Simple Queue Service (Amazon SQS)

**Amazon SQS** memungkinkan komponen perangkat lunak mengirim, menyimpan, dan menerima pesan dalam berbagai volume tanpa perlu mengelola sendiri infrastruktur antrean.

- **Queue** adalah tempat pesan disimpan sampai diproses.
- Aplikasi A mengirim pesan ke queue.
- Aplikasi B mengambil dan memproses pesan, lalu menghapusnya dari queue.
- **Payload** adalah data yang terkandung di dalam pesan.

AWS mengelola infrastruktur dasarnya. Menurut materi, layanan ini dapat diskalakan secara otomatis, andal, serta mudah dikonfigurasi dan digunakan.

Dalam analogi kedai kopi, pesan adalah pesanan kopi dan SQS queue adalah tempat penampungan antrean pesanan.

### Amazon Simple Notification Service (Amazon SNS)

**Amazon SNS** digunakan untuk mengirim pesan ke layanan dan mengirimkan pemberitahuan kepada pelanggan. SNS menggunakan model **publish/subscribe (pub/sub)**:

- **Topic** adalah saluran untuk menyampaikan pesan.
- **Publisher** menerbitkan pesan ke topic.
- **Subscribers** adalah penerima yang berlangganan topic tersebut.

Satu pesan yang diterbitkan ke SNS topic dapat disebarkan ke semua subscribers. Penerimanya dapat berupa endpoint layanan lain, seperti SQS queue, fungsi AWS Lambda, atau server web.

SNS juga dapat mengirim notifikasi kepada pelanggan melalui push notification (notifikasi pada perangkat seluler), SMS, dan email. Dalam analogi kedai kopi, pelanggan dapat menerima pemberitahuan saat pesanan siap diambil.

## Studi kasus: memisahkan buletin dengan Amazon SNS

Bayangkan kedai kopi mengirim buletin berisi kupon, trivia kopi, dan informasi produk baru. Awalnya, semua informasi dikirim sebagai satu buletin kepada seluruh pelanggan yang berlangganan.

Jika pelanggan ingin menerima hanya topik tertentu, buletin dapat dipisahkan menjadi tiga SNS topic:

- Kupon
- Trivia kopi
- Produk baru

Pelanggan dapat berlangganan satu atau beberapa topic sesuai minatnya. Contohnya:

- Pelanggan pertama berlangganan topic kupon.
- Pelanggan kedua berlangganan topic trivia kopi.
- Pelanggan ketiga berlangganan topic trivia kopi dan produk baru.

Dalam Amazon SNS, subscriber tidak harus berupa manusia. Subscriber juga dapat berupa server web, alamat email, fungsi AWS Lambda, atau tujuan lain yang didukung layanan.

## Ringkasan

| Konsep atau layanan | Fungsi utama |
|---|---|
| Messaging dan queueing | Menyampaikan pesan melalui antrean agar komponen tidak harus selalu siap pada saat yang sama |
| Tightly coupled | Komponen bergantung erat; gangguan pada satu komponen dapat memengaruhi komponen lain |
| Loosely coupled | Komponen lebih terpisah sehingga kegagalan dapat diisolasi |
| Amazon SQS | Menyimpan pesan dalam queue sampai diproses oleh penerima |
| Amazon SNS | Menerbitkan pesan ke topic dan menyebarkannya ke subscribers |

