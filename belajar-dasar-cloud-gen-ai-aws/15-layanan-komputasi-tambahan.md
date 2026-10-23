# 3.7 — Layanan Komputasi Tambahan

Materi ini membahas beberapa pilihan komputasi AWS selain mengelola instance Amazon EC2 sendiri: komputasi serverless dengan AWS Lambda, orkestrasi container dengan Amazon ECS atau Amazon EKS, dan platform container serverless AWS Fargate.

## Tanggung jawab saat menggunakan Amazon EC2

Amazon EC2 menyediakan mesin virtual untuk berbagai kebutuhan, mulai dari server web sederhana hingga klaster komputasi berkinerja tinggi (*high performance computing*).

Saat menggunakan EC2, pengguna bertanggung jawab untuk:
- Melakukan *patching* (memperbarui perangkat lunak untuk memperbaiki masalah) saat paket perangkat lunak baru tersedia.
- Menyiapkan *scaling* (penyesuaian kapasitas).
- Merancang aplikasi agar memiliki *high availability* (ketersediaan tinggi).

Jika menggunakan pusat data sendiri (*on-premises*), tanggung jawab pengelolaan yang perlu ditangani bahkan lebih banyak.

## Komputasi serverless

**Serverless** berarti pengguna tidak melihat atau mengakses infrastruktur dasar yang menjalankan aplikasi. Pengelolaan lingkungan yang mendasari—termasuk penyediaan, scaling, high availability, dan pemeliharaan—ditangani oleh penyedia layanan sehingga pengguna dapat berfokus pada aplikasi.

### AWS Lambda

**AWS Lambda** memungkinkan pengguna menjalankan kode tanpa membuat atau mengelola server. Layanan ini dikelola sepenuhnya oleh AWS, dapat diskalakan secara otomatis, dan dirancang untuk ketersediaan tinggi.

Lambda dapat menyesuaikan kapasitas saat fungsi dipicu oleh permintaan. Materi ini menyebut batas waktu eksekusi fungsi di bawah 15 menit, sehingga Lambda lebih sesuai untuk pemrosesan singkat seperti backend web, penanganan permintaan, atau pemrosesan laporan pengeluaran—bukan proses panjang seperti deep learning.

### Cara kerja AWS Lambda

1. Unggah kode ke AWS Lambda.
2. Konfigurasikan kode agar dipicu oleh suatu kejadian (*trigger*), misalnya dari layanan AWS, aplikasi seluler, atau endpoint HTTP.
3. Kode berjalan ketika menerima trigger.
4. Biaya dihitung berdasarkan waktu komputasi yang digunakan, sesuai penjelasan materi.

Contohnya, fungsi untuk mengubah ukuran gambar berjalan ketika gambar baru diunggah. Waktu komputasi fungsi digunakan saat kejadian itu memicunya.

## Container

Container dapat menjadi pilihan jika pengguna memerlukan akses ke infrastruktur dan menginginkan efisiensi serta portabilitas, tetapi belum memilih serverless.

**Docker** adalah platform perangkat lunak yang menggunakan virtualisasi sistem operasi untuk membantu membangun, menguji, dan menerapkan aplikasi. **Container** mengemas kode, konfigurasi, dan dependensi aplikasi ke dalam satu objek.

Container berjalan di atas instance EC2 dan terpisah satu sama lain. Saat container dijalankan pada banyak instance, dibutuhkan cara untuk memulai, menghentikan, memulai ulang, dan memantaunya di seluruh klaster.

Proses pengelolaan ini disebut **container orchestration** (orkestrasi container). Layanan orkestrasi membantu menerapkan, mengelola, dan menyesuaikan skala aplikasi berbasis container.

### Studi kasus container

Developer dan staf operasi IT mungkin bekerja dengan lingkungan komputasi yang berbeda. Container membantu menjaga konsistensi lingkungan aplikasi saat diterapkan, serta mengurangi waktu untuk melakukan debugging (mencari dan memperbaiki error) dan mendiagnosis perbedaan lingkungan.

Skalanya dapat bervariasi, mulai dari satu host dengan banyak container hingga ratusan host dengan ribuan container. Pada skala besar, pemantauan memori, keamanan, dan log menjadi lebih rumit; orkestrasi container membantu mengelola kebutuhan tersebut.

## Amazon Elastic Container Service (Amazon ECS)

**Amazon ECS** adalah sistem manajemen container yang membantu menjalankan dan menyesuaikan skala aplikasi berbasis container di AWS.

- Mendukung Docker container.
- Memungkinkan aplikasi berbasis Docker diluncurkan dan dihentikan menggunakan panggilan API.
- **API** (*Application Programming Interface*) adalah perantara perangkat lunak yang memungkinkan dua aplikasi berinteraksi.

## Amazon Elastic Kubernetes Service (Amazon EKS)

**Amazon EKS** adalah layanan terkelola untuk menjalankan Kubernetes di AWS.

**Kubernetes** adalah perangkat lunak open-source (sumber terbuka) untuk menerapkan dan mengelola aplikasi berbasis container dalam skala besar. Materi menjelaskan bahwa AWS bekerja sama dengan komunitas Kubernetes dan pengguna dapat menerapkan pembaruan fitur Kubernetes ke aplikasi yang dikelola oleh EKS.

## AWS Fargate

Amazon ECS dan Amazon EKS dapat berjalan di atas EC2. Jika pengguna tidak ingin menyediakan atau mengelola instance EC2, **AWS Fargate** menyediakan platform komputasi serverless untuk ECS dan EKS.

Dengan Fargate, AWS mengelola server yang mendasarinya. Pengguna dapat berfokus pada aplikasi dan membayar sumber daya yang diperlukan untuk menjalankan container.

## Memilih opsi komputasi

| Kebutuhan | Opsi yang dijelaskan dalam materi |
|---|---|
| Menjalankan aplikasi dengan akses penuh ke sistem operasi, seperti Linux atau Windows | Amazon EC2 |
| Menjalankan fungsi singkat atau aplikasi berbasis kejadian tanpa mengelola infrastruktur | AWS Lambda |
| Menjalankan beban kerja berbasis Docker container | Pilih orkestrasi Amazon ECS atau Amazon EKS |
| Menjalankan container dengan mengelola instance sendiri | ECS atau EKS di atas Amazon EC2 |
| Menjalankan container tanpa menyediakan atau mengelola server | ECS atau EKS dengan AWS Fargate |

Untuk container, pemilihan dilakukan dalam dua langkah: tentukan layanan orkestrasi (ECS atau EKS), lalu tentukan platform komputasinya (EC2 yang dikelola sendiri atau Fargate yang dikelola AWS).

## Ringkasan

- **EC2** memberi kendali atas mesin virtual, tetapi pengguna perlu mengelola pembaruan, scaling, dan rancangan ketersediaan.
- **Lambda** menjalankan kode saat dipicu tanpa mengharuskan pengguna mengelola server.
- **ECS** dan **EKS** membantu mengelola aplikasi dalam container; EKS menggunakan Kubernetes.
- **Fargate** menjalankan container untuk ECS atau EKS tanpa pengguna harus menyediakan dan mengelola server.
