# 3.4 — Penyesuaian Kapasitas Amazon EC2

Materi kursus: **Belajar Dasar Cloud dan Gen AI di AWS**  
Bagian: **Komputasi di Cloud**

## Mengapa penyesuaian kapasitas diperlukan?

Beban kerja aplikasi dapat berubah dari waktu ke waktu. Ada masa ketika aplikasi ramai digunakan dan ada masa ketika permintaan menurun.

Pada data center yang dikelola sendiri (*on-premise*), bisnis perlu memperkirakan berapa banyak perangkat keras yang harus dibeli:

- Jika kapasitas hanya mengikuti penggunaan rata-rata, sumber daya bisa tidak cukup ketika permintaan melonjak.
- Jika kapasitas disiapkan untuk beban tertinggi sepanjang waktu, banyak sumber daya dapat menganggur dan biaya menjadi sia-sia.

Dengan AWS, kapasitas dapat disesuaikan dengan kondisi dan permintaan yang terjadi. Pendekatan ini disebut **scaling** atau penyesuaian kapasitas.

## Contoh kedai kopi dan sistem yang terpisah

Dalam contoh kedai kopi, sistem dibuat terpisah (*decoupled system*): kasir menerima pesanan, sedangkan barista membuat minuman. Setiap bagian memiliki tugas sendiri.

Pemisahan ini membantu kita menentukan kapasitas yang sesuai untuk setiap bagian. Misalnya, jika tugas kasir menjadi antrean utama, kita dapat menambah kapasitas kasir tanpa harus menambah jumlah barista dalam jumlah yang sama.

Sistem juga perlu dirancang dengan mempertimbangkan kegagalan. Jika satu instance kasir gagal, instance lain dapat disiapkan untuk melanjutkan tugas sehingga pelanggan tetap bisa memesan. Pendekatan ini mendukung **high availability** (ketersediaan tinggi).

## Skalabilitas dan elastisitas

**Skalabilitas** berarti kapasitas arsitektur dapat merespons perubahan permintaan melalui penambahan atau pengurangan kapasitas. Dengan menyesuaikan kapasitas terhadap kebutuhan, kita tidak harus terus menyediakan sumber daya untuk beban puncak.

Untuk melakukan penyesuaian instance EC2 secara otomatis, AWS menyediakan **Amazon EC2 Auto Scaling**.

## Amazon EC2 Auto Scaling

Amazon EC2 Auto Scaling membantu menambah atau menghapus instance Amazon EC2 secara otomatis sesuai kebutuhan agar aplikasi tetap tersedia.

Ada dua pendekatan yang dijelaskan dalam materi:

- **Dynamic scaling**: merespons perubahan permintaan yang sedang terjadi.
- **Predictive scaling**: menjadwalkan jumlah instance yang tepat secara otomatis berdasarkan prediksi permintaan.

Kedua pendekatan tersebut dapat digunakan bersamaan agar kapasitas arsitektur dapat disesuaikan dengan lebih cepat.

## Scaling up dan scaling out

Ada dua cara untuk meningkatkan kapasitas saat permintaan meningkat:

### Scaling up (vertical scaling)

**Scaling up** berarti menambahkan daya pada mesin yang sedang berjalan. Dalam contoh kedai kopi, membuat instance kasir menjadi lebih besar belum tentu membuatnya dapat menerima pesanan lebih cepat, karena kecepatan juga dapat bergantung pada pelanggan.

### Scaling out (horizontal scaling)

**Scaling out** berarti menambahkan lebih banyak instance untuk menangani permintaan.

Pada sistem yang dipisahkan, kita dapat menambah instance pada bagian yang paling membutuhkan kapasitas. Contohnya, jika antrean kasir menjadi masalah sementara barista masih mampu menangani pesanan, jumlah instance kasir dapat ditambah lebih banyak daripada instance barista.

Ketika pelanggan berkurang, instance tambahan dapat dihentikan agar kapasitas kembali sesuai kebutuhan.

Istilah kebalikannya adalah:

- **Scaling down**: mengurangi daya komputasi pada mesin.
- **Scaling in**: mengurangi jumlah instance.

Dengan Amazon EC2 Auto Scaling, instance dapat ditambahkan ketika diperlukan dan dikurangi ketika tidak lagi dibutuhkan.

## Auto Scaling group

Untuk melakukan scaling, kita mengonfigurasi **Auto Scaling group**, yaitu kumpulan instance Amazon EC2 yang dikelola untuk keperluan scaling secara otomatis.

Tiga pengaturan pentingnya adalah:

| Pengaturan | Arti |
|---|---|
| **Minimum capacity** | Jumlah minimum instance yang harus tersedia. Contohnya, nilai 1 berarti setidaknya satu instance berjalan. |
| **Desired capacity** | Jumlah instance yang diinginkan. Contohnya, dapat diatur menjadi 2 meskipun aplikasi hanya membutuhkan minimal 1 instance. |
| **Maximum capacity** | Batas tertinggi jumlah instance yang boleh dijalankan. Contohnya, kapasitas maksimum 4 instance. |

Jika **desired capacity** tidak ditentukan, nilainya secara default mengikuti **minimum capacity**.

Karena Auto Scaling menggunakan instance Amazon EC2, biaya komputasi mengikuti sumber daya yang digunakan. Pengaturan kapasitas yang sesuai dapat membantu membuat arsitektur lebih hemat biaya sekaligus menjaga pengalaman pelanggan.

## Ringkasan

- Beban kerja aplikasi dapat naik dan turun, sehingga kapasitas perlu disesuaikan.
- Amazon EC2 Auto Scaling menambah atau menghapus instance secara otomatis sesuai kebutuhan.
- **Dynamic scaling** merespons perubahan permintaan; **predictive scaling** menggunakan prediksi permintaan.
- **Scaling up** menambah daya pada mesin, sedangkan **scaling out** menambah jumlah instance.
- **Scaling down** mengurangi daya mesin, sedangkan **scaling in** mengurangi jumlah instance.
- Auto Scaling group menggunakan pengaturan minimum, desired, dan maximum capacity untuk mengendalikan jumlah instance.
