# Harga Amazon EC2

> Materi 3.3 — Belajar Dasar Cloud dan Gen AI di AWS

Amazon EC2 menyediakan beberapa pilihan penagihan. Pilihan yang sesuai bergantung pada durasi penggunaan, kestabilan beban kerja, toleransi terhadap interupsi, serta kebutuhan kepatuhan dan lisensi.

## 1. On-Demand

**On-Demand** adalah opsi pembayaran sesuai penggunaan. Pengguna membayar selama instance berjalan, dengan perhitungan per jam atau per detik bergantung pada tipe instance dan sistem operasi yang dipilih.

Opsi ini cocok untuk:

- Penggunaan jangka pendek.
- Pengembangan dan pengujian aplikasi.
- Beban kerja yang tidak dapat diprediksi atau diinterupsi.
- Pengguna baru yang sedang mencoba atau bereksperimen dengan beban kerja.
- Menentukan gambaran dasar penggunaan instance.

On-Demand tidak memerlukan kontrak, komitmen jangka panjang, pembayaran di muka, atau komunikasi sebelumnya dengan AWS.

## 2. Savings Plans

**Savings Plans** dapat mengurangi biaya komputasi dengan komitmen terhadap jumlah pengeluaran per jam dan penggunaan komputasi yang konsisten selama **1 atau 3 tahun**. Penggunaan di luar komitmen tersebut dikenai tarif On-Demand biasa.

Materi menyebutkan potensi penghematan hingga **72%**. Savings Plans dapat berlaku untuk penggunaan komputasi AWS terlepas dari keluarga instance, ukuran, sistem operasi, tenancy, atau AWS Region. Model ini juga berlaku untuk AWS Fargate dan AWS Lambda, yang merupakan opsi komputasi tanpa server.

### Rekomendasi melalui AWS Cost Explorer

**AWS Cost Explorer** adalah layanan untuk memvisualisasikan, memahami, dan mengelola biaya serta penggunaan AWS dari waktu ke waktu.

Saat mempertimbangkan Savings Plans, Cost Explorer dapat menganalisis penggunaan Amazon EC2 selama 7, 30, atau 60 hari terakhir dan memberikan rekomendasi yang disesuaikan. Rekomendasi tersebut memperkirakan potensi penghematan bulanan berdasarkan penggunaan sebelumnya dan jumlah komitmen per jam selama 1 atau 3 tahun.

## 3. Reserved Instances

**Reserved Instances** memberikan diskon penagihan yang diterapkan pada penggunaan instance On-Demand dengan komitmen tingkat penggunaan selama **1 atau 3 tahun**.

Pilihan yang disebutkan dalam materi meliputi:

- **Standard Reserved Instances** — tersedia untuk jangka waktu 1 atau 3 tahun.
- **Convertible Reserved Instances** — tersedia untuk jangka waktu 1 atau 3 tahun.
- **Scheduled Reserved Instance** — disebutkan tersedia untuk jangka waktu 1 tahun.

Opsi ini sesuai untuk beban kerja yang stabil atau dapat diprediksi. Materi menyebutkan diskon hingga **75%** dibandingkan dengan On-Demand.

### Pilihan pembayaran Reserved Instances

- **All upfront:** membayar seluruh biaya di muka saat membuat komitmen.
- **Partial upfront:** membayar sebagian biaya di muka.
- **No upfront:** tidak membayar uang muka.

Ketika masa Reserved Instance berakhir, instance EC2 tetap dapat berjalan tanpa gangguan, tetapi akan dikenai tarif On-Demand sampai dihentikan atau pengguna membeli Reserved Instance baru yang sesuai dengan atribut instance, seperti tipe instance, Region, tenancy, dan platform.

## 4. Spot Instances

**Spot Instances** menggunakan kapasitas komputasi Amazon EC2 yang sedang tidak terpakai. Materi menyebutkan penghematan hingga **90%** dibandingkan harga On-Demand.

Spot Instances cocok untuk beban kerja yang waktu mulai dan selesainya fleksibel serta dapat menerima interupsi.

- Jika kapasitas tersedia, instance dapat diluncurkan.
- Jika kapasitas tidak tersedia, permintaan tidak berhasil sampai kapasitas tersedia kembali.
- AWS dapat mengambil kembali kapasitas dan menghentikan Spot Instance ketika dibutuhkan.
- Materi menyebutkan AWS memberikan peringatan dua menit sebelumnya agar pekerjaan dapat diselesaikan. Pekerjaan dapat dilanjutkan kemudian jika diperlukan.

Karena instance dapat mengalami interupsi, pastikan beban kerja yang dijalankan dapat menerimanya.

## 5. Dedicated Hosts

**Dedicated Hosts** adalah server fisik yang didedikasikan untuk penggunaan Anda, tanpa berbagi sewa server fisik dengan pelanggan lain.

Opsi ini biasanya digunakan untuk memenuhi persyaratan kepatuhan (*compliance*) tertentu. Dedicated Hosts juga memungkinkan penggunaan lisensi perangkat lunak yang sudah dimiliki berdasarkan soket (*per-socket*), inti prosesor (*per-core*), atau mesin virtual (*per-VM*) untuk membantu memenuhi persyaratan lisensi yang terikat pada server.

Dalam materi ini, Dedicated Hosts disebut sebagai opsi harga Amazon EC2 yang paling mahal.

## Ringkasan Pilihan Harga

| Opsi | Cocok untuk | Komitmen atau karakteristik utama |
|---|---|---|
| On-Demand | Penggunaan jangka pendek, pengembangan, pengujian, atau kebutuhan tak terduga | Bayar selama instance berjalan; tanpa komitmen jangka panjang |
| Savings Plans | Penggunaan komputasi yang konsisten | Komitmen pengeluaran per jam selama 1 atau 3 tahun |
| Reserved Instances | Beban kerja stabil atau dapat diprediksi | Komitmen 1 atau 3 tahun; tersedia beberapa pilihan pembayaran |
| Spot Instances | Beban kerja fleksibel yang dapat menerima interupsi | Memanfaatkan kapasitas EC2 yang tidak terpakai |
| Dedicated Hosts | Kebutuhan kepatuhan atau lisensi tertentu | Server fisik didedikasikan untuk satu pengguna |

## Inti Materi

Pilih opsi harga berdasarkan kebutuhan beban kerja:

- Gunakan **On-Demand** untuk fleksibilitas tanpa komitmen jangka panjang.
- Pertimbangkan **Savings Plans** untuk penggunaan komputasi yang konsisten dan komitmen jangka panjang.
- Pertimbangkan **Reserved Instances** untuk beban kerja yang stabil atau dapat diprediksi.
- Pilih **Spot Instances** jika beban kerja dapat menerima interupsi.
- Pertimbangkan **Dedicated Hosts** jika membutuhkan server fisik khusus untuk kepatuhan atau lisensi.

Angka diskon dalam artikel ini mengikuti angka yang dicantumkan pada materi kursus.
