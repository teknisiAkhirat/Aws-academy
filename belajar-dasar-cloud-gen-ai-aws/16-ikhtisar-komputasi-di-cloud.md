# 3.8 — Ikhtisar Komputasi di Cloud

## Ringkasan modul

Modul ini membahas komputasi cloud dan layanan yang ditawarkan AWS.

AWS mendefinisikan komputasi cloud sebagai penyediaan sumber daya IT sesuai permintaan (*on-demand*) melalui internet dengan harga sesuai pemakaian (*pay-as-you-go*). Sumber daya tersebut dapat berupa komputasi, jaringan, penyimpanan, analitik, dan layanan lainnya. Biaya dibayarkan berdasarkan penggunaan, bukan dengan membeli semua sumber daya di muka.

## Amazon EC2 dan tipe instance

Amazon EC2 memungkinkan pengguna membuat dan menghapus server virtual secara dinamis. Server virtual ini disebut **EC2 instance**.

Saat meluncurkan instance, pengguna memilih *instance family* (keluarga instance) yang menentukan jenis perangkat keras dan dioptimalkan untuk kebutuhan tertentu:

- **General purpose** — tujuan umum.
- **Compute optimized** — dioptimalkan untuk komputasi.
- **Memory optimized** — dioptimalkan untuk memori.
- **Accelerated computing** — komputasi terakselerasi.
- **Storage optimized** — dioptimalkan untuk penyimpanan.

## Scaling dan distribusi traffic

EC2 instance dapat disesuaikan kapasitasnya dengan dua cara:

- **Vertical scaling** — mengubah ukuran atau kapasitas instance yang ada.
- **Horizontal scaling** — menambah atau mengurangi jumlah instance.

Amazon EC2 Auto Scaling dapat mengatur horizontal scaling secara otomatis. Setelah jumlah instance ditambah, **Elastic Load Balancing (ELB)** dapat digunakan untuk mendistribusikan traffic yang masuk ke instance.

## Model harga Amazon EC2

Modul ini memperkenalkan beberapa model harga:

- **On-Demand Instances** — fleksibel dan tidak memerlukan komitmen kontrak jangka panjang.
- **Spot Instances** — memanfaatkan kapasitas AWS yang tidak terpakai dengan tarif diskon.
- **Reserved Instances** — dapat memberikan diskon dengan komitmen penggunaan tertentu.
- **Savings Plans** — dapat memberikan diskon sebagai imbalan atas komitmen penggunaan tertentu; dalam materi ini disebut berlaku untuk EC2, AWS Lambda, dan AWS Fargate.

## Layanan messaging dan queueing

### Amazon Simple Queue Service (Amazon SQS)

SQS membantu memisahkan ketergantungan antarkomponen sistem (*decouple system components*). Pesan tetap berada di antrean sampai diproses atau dihapus.

### Amazon Simple Notification Service (Amazon SNS)

SNS mengirimkan pesan seperti email, SMS, push notification, atau permintaan HTTP. Setelah pesan diterbitkan (*publish*), pesan dikirim ke semua pelanggan yang berlangganan (*subscribers*) pada topik tersebut.

## Pilihan komputasi selain EC2

AWS juga menyediakan layanan komputasi berbasis container dan serverless:

- **Amazon ECS** dan **Amazon EKS** adalah layanan orkestrasi container. Container dapat dijalankan menggunakan EC2.
- **AWS Fargate** memungkinkan container dijalankan pada platform komputasi serverless tanpa pengguna harus mengelola server yang mendasarinya.
- **AWS Lambda** memungkinkan pengguna mengunggah kode dan mengonfigurasikannya agar berjalan ketika menerima pemicu (*trigger*). Biaya komputasi dikenakan saat kode berjalan, sesuai ringkasan materi.

## Video Komputasi di Cloud

Untuk memperdalam pemahaman, materi menyediakan video pembahasan berikut:

[**Tonton video Komputasi di Cloud di YouTube**](https://youtu.be/ds23QIICgyk?si=YBpP6eg6sEtY95j5)

## Materi pendukung

Materi juga merekomendasikan sumber-sumber berikut untuk belajar lebih lanjut:

- Komputasi di AWS
- AWS Compute Blog
- AWS Compute Services
- Tutorial langsung dengan Amazon Web Services (AWS)
- Category Deep Dive: Serverless

## Kesimpulan

Modul Komputasi di Cloud memperkenalkan pilihan komputasi AWS dari pengelolaan server virtual dengan EC2, scaling dan distribusi traffic, model harga EC2, hingga messaging dengan SQS/SNS serta container dan serverless melalui ECS, EKS, Fargate, dan Lambda.
