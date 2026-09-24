# Requirements — Warung Bu Sukarni

> Status: BRAINSTORMING REQUIREMENT — selesai untuk MVP, dapat dikoreksi bertahap.

## 1. Tujuan

Membuat aplikasi nota sederhana untuk membantu orang tua mengelola transaksi Warung Bu Sukarni dengan alur sesingkat mungkin:

**Pilih menu → Hitung → Nota → Simpan/Kirim → Transaksi berikutnya**

Prioritas utama adalah kemudahan penggunaan bagi orang tua yang tidak terbiasa dengan teknologi.

## 2. Pengguna

### Operator
Orang tua sebagai pengguna utama aplikasi.

Operator dapat:
- memilih menu;
- menambah jumlah dengan tap;
- mengurangi jumlah dengan long press;
- melihat nota aktif;
- menyimpan nota;
- mengirim nota melalui Android Share → WhatsApp;
- mengosongkan nota aktif;
- melihat riwayat nota;
- mencari riwayat;
- mengirim ulang nota lama.

### Admin
Admin berwenang mengelola:
- kategori;
- menu;
- harga.

Akses admin dibuat tersembunyi dari UI utama operator. Mekanisme autentikasi/akses admin belum ditentukan.

## 3. Menu dan kategori

- Menu ditampilkan berdasarkan kategori.
- Semua kategori berada dalam satu halaman dan dapat di-scroll.
- Tidak menggunakan gambar makanan.
- Tombol menu menampilkan nama, harga satuan, dan jumlah yang sedang dipilih.
- Harga menggunakan format Rupiah bulat, contoh: Rp15.000.
- Tap biasa menambah jumlah +1.
- Long press mengurangi jumlah -1.
- Jumlah per item tidak memiliki batas bisnis khusus.
- Jika jumlah menjadi 0, item hilang dari nota aktif.
- Menu yang dipilih mendapat perubahan visual yang jelas.
- Tap cepat tidak menampilkan toast setiap kali; perubahan jumlah pada tombol menjadi feedback utama.
- Long press menampilkan feedback sementara, misalnya: Rawon dikurangi menjadi 2.

## 4. Nota aktif

- Nota baru selalu dimulai dalam keadaan kosong.
- Nota aktif menampilkan nama item, jumlah, harga satuan, subtotal, dan total.
- Nomor nota tidak ditampilkan sebelum transaksi diselesaikan.
- KIRIM NOTA, SIMPAN NOTA, dan KOSONGKAN NOTA disabled ketika nota kosong.
- KOSONGKAN NOTA meminta konfirmasi dan tidak menyimpan transaksi.
- Membatalkan konfirmasi simpan/kirim mempertahankan nota aktif tanpa perubahan.
- Setelah transaksi selesai, nota aktif dikosongkan dan semua jumlah menu kembali 0.

## 5. Nomor nota

Format: **YYMMDDNNN**

Contoh: 260924001.

Aturan:
- NNN selalu tiga digit.
- Nomor dibuat hanya ketika transaksi dikonfirmasi untuk disimpan/dikirim.
- Draft yang dibatalkan tidak menggunakan nomor.
- Nomor berurutan dalam satu hari operasional.
- Hari operasional dimulai pukul 05:00.
- Transaksi 00:00–04:59 masih menggunakan tanggal hari operasional sebelumnya.
- Restart/penutupan aplikasi tidak mereset urutan.
- Transaksi offline tetap menggunakan urutan yang sama.
- Dalam MVP hanya satu HP yang membuat nota.
- Batas 999 transaksi per hari operasional belum ditentukan.

## 6. Simpan dan kirim

### SIMPAN NOTA
- Meminta konfirmasi.
- Setelah dikonfirmasi, transaksi disimpan.
- Muncul notifikasi seperti: Nota 260924027 berhasil disimpan.
- Nota aktif kemudian dikosongkan.

### KIRIM NOTA
- Meminta konfirmasi.
- Setelah dikonfirmasi, transaksi disimpan dan dibuka melalui Android Share → WhatsApp.
- Tidak menggunakan PDF untuk MVP.
- Tidak mengklaim bahwa pesan benar-benar terkirim karena aplikasi tidak dapat memastikan hasil akhir di WhatsApp.
- Jika pengguna membatalkan konfirmasi, nota aktif tetap utuh.
- Jika Share dibatalkan sebelum proses berbagi dilanjutkan, nota aktif perlu dapat dipulihkan untuk dicoba lagi tanpa membuat nomor/transaksi baru.

## 7. Format nota WhatsApp

Nota WhatsApp lengkap memuat:
- nama Warung Bu Sukarni;
- nomor nota;
- tanggal;
- jam;
- nama item;
- jumlah;
- harga satuan;
- subtotal;
- total;
- ucapan penutup tetap.

Ucapan penutup:
Terima kasih telah berbelanja di Warung Bu Sukarni.

Tampilan nota di aplikasi boleh lebih sederhana daripada format WhatsApp.

## 8. Riwayat nota

- Tombol RIWAYAT NOTA tersedia di halaman utama.
- Ada tombol KEMBALI yang jelas.
- Nota terbaru berada paling atas.
- Isi nota ditampilkan langsung dalam bentuk ringkas; tidak wajib membuka detail terpisah.
- Pencarian gabungan berdasarkan nomor nota, tanggal, atau nama menu.
- Setiap nota memiliki opsi KIRIM ULANG.
- KIRIM ULANG meminta konfirmasi.
- Kirim ulang menggunakan nomor dan isi nota lama; tidak membuat transaksi/nomor baru.
- Nota tersimpan tidak dapat dihapus dari aplikasi.
- Riwayat disimpan tanpa batas waktu selama data masih tersedia.
- Nota lama mempertahankan nama menu, kategori, dan harga pada saat transaksi dibuat.

## 9. Offline dan sinkronisasi

- Aplikasi harus dapat membuat dan menyimpan transaksi tanpa internet.
- Data transaksi offline disimpan persisten di perangkat.
- Restart HP tidak boleh menghilangkan transaksi.
- Saat internet kembali, transaksi dapat disinkronkan ke database online.
- Nota yang belum tersinkron diberi status Belum tersinkron.
- Tersedia satu tombol SINKRONKAN SEKARANG untuk mencoba menyinkronkan semua nota tertunda.
- Status berhasil dapat ditampilkan sebagai Tersinkron.
- Jika internet tidak tersedia, KIRIM NOTA disabled.
- SIMPAN NOTA tetap dapat digunakan offline.
- Riwayat online harus dapat dipulihkan jika HP lama rusak/hilang.
- Tidak menggunakan login operator; mekanisme pemulihan tanpa login belum ditentukan.

## 10. Master data

- Hanya admin yang dapat mengubah kategori, menu, dan harga.
- Perubahan master berlaku untuk transaksi berikutnya.
- Menu/kategori yang sudah pernah digunakan tidak dihapus permanen; dapat dinonaktifkan.
- Menu/kategori nonaktif tidak muncul pada transaksi baru.
- Nota lama tidak berubah ketika nama menu, kategori, atau harga master berubah.

## 11. Di luar MVP / TBD

- Mekanisme akses admin.
- Mekanisme identitas/pemulihan warung tanpa login.
- Batas setelah nomor urut 999.
- Detail teknologi database, local storage, sinkronisasi, dan Android Share.
- Detail desain visual.
- Fitur tambahan di luar alur transaksi inti.