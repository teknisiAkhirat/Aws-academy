# Komputasi Cloud

> Artikel bersih dari kelas Dicoding **Belajar Dasar Cloud dan Gen AI di AWS**, bagian 2.3.

Sebelum membahas AWS lebih dalam, mari kita persempit pembahasan pada definisi kerja dari cloud.

## Apa Itu Cloud?

Saat mendengar kata *cloud*, mungkin yang terbayang adalah gumpalan awan. Gambaran ini tidak salah karena ilustrasi jaringan komputer sering menggunakan simbol awan sebagai perumpamaan internet.

Menurut materi ini, simbol awan menggambarkan bahwa data berada di suatu tempat di luar sana: seolah mengambang, nirkabel, serta dapat tersedia di mana saja dan kapan saja saat dibutuhkan. Istilah ini juga menjadi kebalikan dari dunia material yang nyata, seperti colokan, kabel, dan hard disk.

## Definisi Komputasi Cloud

Menurut AWS, **cloud computing** atau **komputasi cloud** adalah penggunaan sumber daya IT sesuai kebutuhan (*on-demand*) melalui internet dengan harga sesuai pemakaian (*pay-as-you-go*).

Berikut uraian definisi tersebut.

### 1. Sesuai kebutuhan (*on-demand*)

AWS menyediakan sumber daya yang dibutuhkan kapan pun diperlukan, tanpa harus memberi tahu AWS terlebih dahulu kapan sumber daya itu akan digunakan.

Misalnya, jika tiba-tiba membutuhkan 300 server virtual, beberapa langkah saja dapat membuat server tersebut tersedia. Demikian pula, penyimpanan sebesar 2.000 terabyte dapat digunakan sesuai kebutuhan lalu dilepas ketika tidak lagi diperlukan.

Fleksibilitas seperti ini tidak mudah diperoleh dengan data center *on-premise* (lokal).

### 2. Sumber daya IT dan pekerjaan yang tidak membedakan bisnis

AWS menyediakan banyak layanan karena bisnis memiliki kebutuhan yang beragam.

Sebagai contoh, perusahaan yang menggunakan database MySQL tidak otomatis menjadi lebih unggul hanya karena mampu memasang mesin MySQL atau menyimpan cadangan (*backup*). Nilai pembeda perusahaan justru dapat terletak pada data di dalam database, cara membangun tabel, serta cara mengelola strukturnya.

Materi menyebut pekerjaan IT umum yang tidak menambah nilai pembeda bagi bisnis sebagai **undifferentiated heavy lifting**. Contohnya adalah instalasi sistem operasi dan pembaruan perangkat lunak yang dilakukan berulang kali dan memakan waktu.

AWS membantu menangani pekerjaan-pekerjaan umum tersebut sehingga perusahaan dapat lebih fokus pada bisnisnya.

### 3. Melalui internet dan bayar sesuai pemakaian

Sumber daya cloud dapat diakses melalui internet, baik menggunakan browser web maupun secara terprogram.

Dengan mekanisme *pay-as-you-go*, pengguna membayar sesuai pemakaian, tanpa harus terus-menerus menyediakan semua sumber daya. Analogi kedai kopi dari materi sebelumnya menggambarkan prinsip ini: pegawai dapat disiapkan saat jam sibuk dan tidak perlu dipekerjakan saat kedai tutup.

Itulah inti komputasi cloud: menggunakan sumber daya IT saat diperlukan dan membayar sesuai pemakaian.

## Tantangan Data Center Tradisional

Sebelum komputasi cloud, perusahaan yang ingin memiliki data center perlu membangunnya sendiri dan memperkirakan beban kerja layanan terlebih dahulu. Proses ini membutuhkan biaya besar.

Data center biasanya terdiri dari rak komputer, jaringan yang kompleks, dan sistem penyimpanan yang dikelola. Perusahaan juga perlu membayar bangunan, kebersihan, listrik, pendingin, serta keamanan.

Setelah data center siap digunakan, perusahaan masih harus memastikan kapasitasnya mampu memenuhi kebutuhan beban kerja.

Sebagai contoh, sebuah website rata-rata menerima 10.000 pengunjung setiap hari. Pada hari Minggu, jumlahnya mungkin hanya 5.000, tetapi pada malam tahun baru dapat meningkat hingga 30.000 pengunjung. Jika kapasitas tidak mampu mengimbangi lonjakan tersebut, website bisa mengalami gangguan (*down*).

## Bagaimana Komputasi Cloud Membantu?

Dengan komputasi cloud, kapasitas dapat disesuaikan dengan kebutuhan beban kerja. Tujuannya adalah menghindari kekurangan kapasitas saat permintaan meningkat dan mengurangi kapasitas berlebih saat permintaan rendah.

Materi berikutnya akan membahas penyesuaian kapasitas dengan lebih detail.

## Referensi yang disebutkan dalam materi

- The New Yorker — penjelasan mengenai penggunaan simbol awan.
- AWS — definisi komputasi cloud.
- Cisco — disebut pada materi sebelumnya sebagai sumber penjelasan tentang data center.
