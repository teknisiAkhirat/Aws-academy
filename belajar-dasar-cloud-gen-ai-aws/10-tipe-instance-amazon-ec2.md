# Tipe Instance Amazon EC2

> Materi 3.2 — Belajar Dasar Cloud dan Gen AI di AWS

## Pengertian Tipe Instance

Amazon EC2 menyediakan berbagai tipe instance untuk kebutuhan komputasi yang berbeda. Seperti pegawai di kedai kopi yang memiliki peran khusus, aplikasi juga membutuhkan kombinasi sumber daya yang sesuai dengan tugasnya.

Setiap tipe instance dikelompokkan ke dalam **instance family** atau keluarga instance. Tipe-tipe ini menawarkan kombinasi kapasitas CPU, memori, penyimpanan, dan jaringan yang berbeda agar pengguna dapat memilih sumber daya sesuai kebutuhan aplikasi.

Ada lima kelompok utama tipe instance Amazon EC2:

1. General purpose
2. Compute optimized
3. Memory optimized
4. Accelerated computing
5. Storage optimized

## 1. General Purpose Instances

**General purpose** atau instance tujuan umum memberikan keseimbangan antara sumber daya komputasi, memori, dan jaringan.

Tipe ini dapat digunakan untuk berbagai beban kerja, misalnya:

- Server aplikasi web.
- Repositori kode.

## 2. Compute Optimized Instances

**Compute optimized** atau instance teroptimasi untuk komputasi cocok untuk tugas intensif komputasi yang berpusat pada prosesor berkinerja tinggi.

Contoh penggunaannya:

- Server game.
- High-performance computing (HPC), yaitu komputasi berkinerja tinggi.
- Pemodelan ilmiah.
- Pemrosesan batch (*batch processing*) yang membutuhkan banyak proses dalam satu kelompok.

## 3. Memory Optimized Instances

**Memory optimized** atau instance teroptimasi untuk memori dirancang untuk memberikan performa tinggi pada beban kerja yang memproses kumpulan data besar di dalam memori.

Contoh penggunaannya meliputi:

- Basis data relasional dan nonrelasional.
- High-performance computing (HPC).

## 4. Accelerated Computing Instances

**Accelerated computing** atau instance komputasi terakselerasi menggunakan perangkat keras akselerator untuk menjalankan fungsi tertentu dengan lebih efisien dibandingkan perangkat lunak yang berjalan pada CPU.

Contoh fungsi yang disebutkan dalam materi:

- Penghitungan bilangan floating-point.
- Pemrosesan grafik.
- Pencocokan pola data (*data pattern matching*).

## 5. Storage Optimized Instances

**Storage optimized** atau instance teroptimasi untuk penyimpanan dirancang untuk beban kerja yang membutuhkan akses baca (*read*) dan tulis (*write*) berurutan dengan frekuensi tinggi terhadap kumpulan data besar di penyimpanan lokal.

Contoh penggunaannya:

- Sistem file terdistribusi.
- Aplikasi gudang data (*data warehousing*).
- Sistem pemrosesan transaksi online (*online transaction processing* atau OLTP) berfrekuensi tinggi.

### Memahami IOPS

**Input/output operations per second (IOPS)** adalah metrik untuk mengukur kinerja perangkat penyimpanan. Metrik ini menunjukkan jumlah operasi input atau output yang dapat dilakukan perangkat dalam satu detik.

- **Input** adalah data yang dimasukkan ke sistem, misalnya data yang dimasukkan ke basis data.
- **Output** adalah data yang dihasilkan sistem, misalnya hasil analitik atas data dalam basis data.

Jika aplikasi membutuhkan IOPS tinggi, storage optimized instance dapat memberikan kinerja yang lebih baik dibandingkan tipe yang tidak dioptimalkan untuk kebutuhan tersebut.

## Analogi Kedai Kopi

Materi menggunakan analogi peran pegawai kedai kopi untuk membantu mengingat beberapa tipe instance:

- Kasir dianalogikan sebagai **memory optimized instance**.
- Barista dianalogikan sebagai **compute optimized instance**.
- Pembuat seni latte dianalogikan sebagai **accelerated computing instance**.

Analogi ini membantu menggambarkan bahwa setiap tipe instance dirancang untuk kebutuhan kerja yang berbeda.

## Inti Materi

Pilih tipe instance berdasarkan kebutuhan beban kerja:

| Tipe instance | Fokus utama | Contoh penggunaan dari materi |
|---|---|---|
| General purpose | Keseimbangan komputasi, memori, dan jaringan | Server web, repositori kode |
| Compute optimized | Komputasi intensif dan performa prosesor | Server game, HPC, pemodelan ilmiah, batch processing |
| Memory optimized | Memproses kumpulan data besar di memori | Basis data relasional/nonrelasional, HPC |
| Accelerated computing | Akselerator perangkat keras untuk fungsi tertentu | Komputasi floating-point, grafik, pencocokan pola |
| Storage optimized | Akses baca/tulis tinggi ke data besar di penyimpanan lokal | Sistem file terdistribusi, data warehousing, OLTP |

Tidak ada satu tipe yang paling cocok untuk semua aplikasi. Sesuaikan keluarga instance dengan karakteristik beban kerja yang hendak dijalankan.
