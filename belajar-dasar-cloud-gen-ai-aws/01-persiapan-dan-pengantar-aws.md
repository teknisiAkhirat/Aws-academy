# Modul 1 — Persiapan dan Pengantar Amazon Web Services

> Catatan belajar dari kelas Dicoding **Belajar Dasar Cloud dan Gen AI di AWS** (Academy 251). Materi dibaca dari awal kelas sampai Knowledge Check modul Pengantar AWS.

## Status belajar

- Kelas: [Belajar Dasar Cloud dan Gen AI di AWS](https://www.dicoding.com/academies/251)
- Learning path: AI Engineer
- Posisi: Persiapan Belajar dan Pengantar ke Amazon Web Services
- Knowledge Check: **Lulus — 100% (3/3)**
- Tanggal pengerjaan Knowledge Check: 8 Oktober 2026

---

## 1. Persiapan Belajar

### Persetujuan hak cipta

Materi kelas Dicoding dilindungi hak cipta. Penggandaan atau komersialisasi sebagian maupun seluruh materi, baik dalam bentuk cetak maupun elektronik, memerlukan izin formal tertulis dari pemilik hak cipta.

Catatan pentingnya adalah materi belajar digunakan untuk pembelajaran pribadi dan tidak boleh disalin atau didistribusikan ulang secara tidak sah.

### Mekanisme belajar

Kelas menggunakan beberapa fasilitas pembelajaran berikut:

- **Materi bacaan elektronik** sebagai media utama belajar.
- **Forum diskusi** untuk bertanya, menjawab, dan berdiskusi dengan siswa maupun instruktur.
- **Kuis, knowledge check, dan ujian** untuk mengevaluasi pemahaman.

Praktik belajar yang disarankan:

1. Baca materi secara perlahan dan pahami konsepnya.
2. Gunakan forum untuk mencari diskusi lama sebelum membuat pertanyaan baru.
3. Jika mengalami kendala teknis situs atau administrasi, gunakan kanal bantuan yang sesuai, bukan forum materi.
4. Ulangi materi apabila hasil evaluasi belum memenuhi syarat.
5. Berbagi jawaban yang baik di forum dapat membantu retensi pengetahuan.

### Etika forum diskusi

Forum harus digunakan dengan sopan dan saling menghormati. Sebelum membuat diskusi baru:

- cari judul atau kata kunci yang relevan;
- pilih modul untuk mempersempit pencarian;
- baca jawaban yang sudah ada;
- buat pertanyaan baru hanya jika solusi belum tersedia.

Komentar yang bermanfaat dapat diberi **upvote**, sedangkan komentar yang tidak tepat atau tidak membantu dapat diberi **downvote**. Jawaban terbaik dapat ditandai sebagai **Approved Answer**.

### Glosarium inti

| Istilah | Makna ringkas |
|---|---|
| Artificial Intelligence | Kemampuan komputer bertindak seperti manusia. |
| Cloud | Server yang diakses melalui internet beserta software yang berjalan di dalamnya. |
| Database | Struktur data yang menyimpan informasi terorganisasi. |
| Deploy | Proses membuat software atau hardware rilis dan berjalan, termasuk instalasi, konfigurasi, pengujian, dan perubahan. |
| Instance | Server virtual di AWS. |
| Latensi | Waktu yang diperlukan untuk mengirim dan menerima data. |
| Machine Learning | Subbidang AI yang dapat belajar atau beradaptasi dari waktu ke waktu. |
| On-premise | Penyimpanan dan pemeliharaan data di server lokal atau pribadi. |
| Permission | Persetujuan atau otorisasi untuk melakukan tindakan tertentu. |
| Resource | Sumber daya AWS yang digunakan, misalnya Amazon EC2 atau bucket Amazon S3. |
| Throughput | Jumlah data yang dapat dikirim dalam waktu tertentu. |

### Referensi awal

Referensi yang digunakan dalam materi antara lain:

- [Cisco — What Is a Data Center](https://www.cisco.com/c/en/us/solutions/data-center-virtualization/what-is-a-data-center.html)
- [The New Yorker — How the Metaphor of the Cloud Changed Our Attitude Toward the Internet](https://www.newyorker.com/books/page-turner/how-the-metaphor-of-the-cloud-changed-our-attitude-toward-the-internet)
- [AWS Cloud Practitioner Essentials](https://www.aws.training/Details/eLearning?id=60697)

---

## 2. Mengenal Amazon Web Services

**Amazon Web Services (AWS)** adalah platform cloud yang menyediakan berbagai layanan komputasi secara luas. Layanannya mencakup kebutuhan dasar seperti:

- komputasi;
- penyimpanan;
- jaringan;
- keamanan;
- database;
- machine learning;
- Artificial Intelligence;
- Internet of Things;
- blockchain;
- layanan khusus seperti video dan satelit.

Kelas ini mengenalkan AWS untuk pemula dan tidak mengharuskan peserta memiliki latar belakang profesi tertentu. Dasar yang disarankan adalah pemahaman umum tentang komputer, jaringan, hardware, software, web, internet, dan bisnis teknologi.

### Client-server dengan analogi kedai kopi

Materi menggunakan analogi kedai kopi untuk menjelaskan arsitektur client-server:

- **Pelanggan** berperan sebagai client yang membuat permintaan.
- **Kasir** berperan sebagai server yang menerima, memvalidasi, dan memproses permintaan.
- **Kopi** adalah hasil atau response yang dikembalikan kepada client.
- **Amazon EC2 instance** dapat dianalogikan sebagai server virtual/kasir yang menjalankan proses.

Alur sederhananya:

```text
Client membuat request
        ↓
Server memvalidasi request
        ↓
Server memproses pekerjaan
        ↓
Server mengembalikan response
```

---

## 3. Komputasi cloud

Menurut materi, **cloud computing** adalah penggunaan sumber daya IT sesuai kebutuhan melalui internet dengan harga sesuai pemakaian (**on-demand** dan **pay-as-you-go**).

Artinya, pengguna dapat menyediakan sumber daya ketika diperlukan, kemudian mengurangi atau melepasnya ketika tidak lagi dibutuhkan.

Contoh:

- membutuhkan server virtual tambahan ketika traffic meningkat;
- menambah kapasitas storage sementara;
- mengurangi kapasitas saat beban kerja turun;
- membayar waktu dan resource yang digunakan, bukan membeli seluruh infrastruktur di awal.

### Undifferentiated heavy lifting

AWS membantu menangani pekerjaan IT berulang yang tidak secara langsung membedakan bisnis dari kompetitor, misalnya:

- instalasi sistem operasi;
- pembaruan software;
- pengelolaan server fisik;
- backup dan pemeliharaan infrastruktur dasar.

Dengan demikian, tim dapat lebih fokus pada data, logika bisnis, produk, dan pengalaman pelanggan.

### Data center dan on-premise

Data center adalah fasilitas untuk menempatkan aplikasi dan data penting. Komponen umumnya meliputi:

- router;
- switch;
- firewall;
- sistem penyimpanan;
- server;
- listrik, pendingin, keamanan, dan bangunan.

**On-premise** berarti data dan sistem dikelola pada server lokal atau data center milik sendiri. Model ini memerlukan investasi awal dan pengelolaan kapasitas yang lebih besar.

---

## 4. Model penerapan komputasi cloud

### Cloud-based deployment

Aplikasi dirancang, dibangun, dan dijalankan di cloud. Aplikasi lama juga dapat dimigrasikan ke cloud.

Pilihan pengelolaannya dapat berupa:

- infrastruktur tingkat rendah yang dikelola lebih banyak oleh tim IT;
- layanan tingkat tinggi yang mengurangi beban pengelolaan, arsitektur, dan scaling.

### On-premises deployment

Disebut juga **private cloud deployment**. Aplikasi dijalankan menggunakan teknologi virtualisasi dan layanan manajemen pada data center pribadi.

### Hybrid deployment

Cloud terhubung dengan data center on-premise. Model ini berguna ketika:

- aplikasi lama masih lebih cocok dijalankan lokal;
- aturan pemerintah mewajibkan data tertentu disimpan di data center lokal;
- organisasi ingin memanfaatkan cloud tanpa langsung memindahkan semua sistem.

Perbandingan singkat:

| Model | Lokasi utama | Kelebihan | Contoh alasan penggunaan |
|---|---|---|---|
| Cloud-based | Cloud | Fleksibel dan cepat diskalakan | Aplikasi baru dan kebutuhan dinamis |
| On-premises/private cloud | Data center sendiri | Kontrol langsung atas infrastruktur | Regulasi atau sistem lama |
| Hybrid | Cloud + lokal | Fleksibel dan bertahap | Migrasi bertahap atau kebutuhan compliance |

---

## 5. Enam manfaat komputasi cloud

### 5.1 Mengubah pengeluaran di muka menjadi pengeluaran variabel

On-premise biasanya memerlukan pembelian server dan data center sebelum dipakai. Cloud mengubah pola tersebut menjadi biaya berdasarkan resource yang dikonsumsi.

### 5.2 Menghentikan biaya pengelolaan data center

AWS mengurangi kebutuhan untuk mengurus server fisik, listrik, pendingin, bangunan, dan pemeliharaan infrastruktur lokal.

### 5.3 Berhenti menebak kapasitas

Resource dapat ditambah atau dikurangi sesuai beban kerja. Istilah pentingnya:

- **scale out**: menambah kapasitas atau instance;
- **scale in**: mengurangi kapasitas atau instance.

### 5.4 Memanfaatkan skala ekonomi yang masif

AWS melayani banyak pelanggan sehingga dapat mencapai economies of scale. Efisiensi tersebut mendukung harga pay-as-you-go yang lebih rendah dibandingkan jika setiap organisasi membangun semua infrastruktur sendiri.

### 5.5 Meningkatkan kecepatan dan ketangkasan

Resource baru dapat tersedia dalam hitungan menit, bukan berminggu-minggu seperti proses pengadaan data center. Hal ini mempercepat eksperimen, pengembangan, dan deployment.

### 5.6 Mendunia dalam hitungan menit

AWS memungkinkan aplikasi diluncurkan ke pelanggan di berbagai wilayah dengan cepat. Distribusi global dapat membantu mengurangi latensi bagi pengguna di lokasi berbeda.

---

## 6. Ringkasan modul

Materi awal menggunakan analogi kedai kopi untuk menjelaskan request, server, response, dan resource cloud. Konsep yang perlu diingat:

1. Cloud computing menyediakan sumber daya IT secara on-demand melalui internet.
2. Pay-as-you-go berarti membayar resource sesuai pemakaian.
3. AWS membantu mengurangi undifferentiated heavy lifting.
4. Tiga model deployment utama adalah cloud-based, on-premises/private cloud, dan hybrid.
5. Cloud mengurangi biaya awal, beban pemeliharaan, dan kebutuhan menebak kapasitas.
6. Cloud membantu organisasi bergerak cepat dan menjangkau pengguna global.

---

## 7. Knowledge Check — Soal dan jawaban

**Ketentuan:** 3 soal, batas lulus 60%, durasi 5 menit.

### Soal 1

**Apa itu komputasi cloud?**

- A. Menjalankan kode tanpa perlu mengelola atau menyediakan server.
- B. Men-deploy aplikasi yang terhubung ke infrastruktur on-premise.
- **C. Penggunaan sesuai kebutuhan sumber daya IT melalui internet dengan harga sesuai pemakaian.**
- D. Mem-backup file yang disimpan di desktop dan perangkat seluler untuk mencegah kehilangan data.

**Jawaban:** C.

**Alasan:** Definisi cloud computing pada materi adalah penggunaan sumber daya IT secara on-demand melalui internet dengan harga pay-as-you-go.

### Soal 2

**Manakah yang BUKAN manfaat dari komputasi cloud?**

- A. Berhenti menebak kapasitas.
- **B. Ubah pengeluaran variabel menjadi pengeluaran di muka.**
- C. Ubah pengeluaran di muka menjadi pengeluaran variabel.
- D. Mendunia dalam hitungan menit.

**Jawaban:** B.

**Alasan:** Cloud justru mengubah pengeluaran di muka menjadi pengeluaran variabel, bukan sebaliknya.

### Soal 3

**Apa nama lain dari on-premise deployment?**

- A. Hybrid deployment.
- B. Cloud-based application.
- C. AWS Cloud.
- **D. Private cloud deployment.**

**Jawaban:** D.

**Alasan:** Materi menyebut on-premises juga dikenal sebagai private cloud karena dikelola pada data center pribadi.

### Hasil

- Total soal: 3.
- Skor: **100**.
- Status: **Lulus**.

---

## Sumber Dicoding

- [Persetujuan Hak Cipta 1.1](https://www.dicoding.com/academies/251/tutorials/12962)
- [Mekanisme Belajar 1.2](https://www.dicoding.com/academies/251/tutorials/12967)
- [Forum Diskusi 1.3](https://www.dicoding.com/academies/251/tutorials/12972)
- [Glosarium 1.4](https://www.dicoding.com/academies/251/tutorials/12977)
- [Daftar Referensi 1.5](https://www.dicoding.com/academies/251/tutorials/12982)
- [Pengantar ke Amazon Web Services 2.1](https://www.dicoding.com/academies/251/tutorials/12987)
- [Pengantar 2.2](https://www.dicoding.com/academies/251/tutorials/12997)
- [Komputasi Cloud 2.3](https://www.dicoding.com/academies/251/tutorials/13002)
- [Model Penerapan untuk Komputasi Cloud 2.4](https://www.dicoding.com/academies/251/tutorials/13007)
- [Manfaat dari Komputasi Cloud 2.5](https://www.dicoding.com/academies/251/tutorials/13012)
- [Ikhtisar 2.6](https://www.dicoding.com/academies/251/tutorials/13017)
- [Knowledge Check 2.7](https://www.dicoding.com/academies/251/tutorials/13022)
