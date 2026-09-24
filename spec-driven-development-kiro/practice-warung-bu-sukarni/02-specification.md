# Specification — Warung Bu Sukarni

> Version: 0.1  
> Status: Draft specification untuk MVP.

## 1. Aplikasi
- Aplikasi berbasis web/mobile-friendly yang berjalan nyaman di Android.
- Satu instalasi untuk Warung Bu Sukarni.
- Operator tidak perlu login.
- Data transaksi memiliki penyimpanan lokal persisten dan database online.

## 2. State transaksi
Aplikasi memiliki tiga keadaan utama:

**EMPTY → ACTIVE → COMPLETED**

- EMPTY: belum ada item.
- ACTIVE: ada item yang sedang dipilih.
- COMPLETED: transaksi sudah disimpan.
- Draft ACTIVE belum memiliki nomor nota.
- Nomor nota dibuat secara atomik saat transaksi dikonfirmasi.

## 3. Perhitungan
Untuk setiap item:

**subtotal = harga_satuan × quantity**

Total:

**total = Σ subtotal**

Harga dan perhitungan menggunakan bilangan integer Rupiah, bukan floating-point.

## 4. Nomor nota

Hari operasional:

**05:00 hari N → 04:59:59 hari N+1**

Tanggal nomor nota menggunakan tanggal hari operasional.

Format:

**YYMMDDNNN**

Counter disimpan secara persisten di perangkat sehingga:
- restart tidak mereset counter;
- offline tidak merusak urutan;
- transaksi batal tidak mengonsumsi nomor.

## 5. Snapshot transaksi

Ketika transaksi selesai, data transaksi menyimpan salinan:
- menu_name
- category_name
- unit_price
- quantity
- subtotal

Perubahan master menu setelahnya tidak mengubah histori.

## 6. Offline-first

Saat offline:

**UI → Local Database**

Saat online:

**Local Database → Sync Queue → Online Database**

Transaksi yang belum tersinkron memiliki status:

**PENDING_SYNC**

Setelah berhasil:

**SYNCED**

Satu tombol **SINKRONKAN SEKARANG** memproses seluruh antrean pending.

## 7. Riwayat

Query default:

**ORDER BY transaction_time DESC**

Pencarian melakukan pencocokan terhadap:
- nomor nota;
- tanggal;
- nama menu.

Tidak ada operasi delete dari UI operator.

## 8. Kirim WhatsApp

**KIRIM NOTA**
→ konfirmasi  
→ finalisasi transaksi  
→ generate nomor  
→ simpan transaksi  
→ generate plain-text receipt  
→ Android Share  
→ WhatsApp.

Untuk **KIRIM ULANG**:

**Riwayat → KIRIM ULANG → Konfirmasi → Share**

Nomor nota lama dipertahankan.

## 9. Kegagalan Share

Aplikasi tidak menganggap WhatsApp benar-benar mengirim pesan. Yang dapat diketahui aplikasi hanyalah hasil dari mekanisme Share yang tersedia.

Untuk mencegah nota ganda, transaksi yang sudah difinalisasi tetap memiliki satu nomor nota. Jika Share dibatalkan, nota yang sama dapat dikirim ulang tanpa membuat transaksi baru.

## 10. Master data

Admin dapat:
- membuat kategori;
- mengubah kategori;
- menonaktifkan kategori;
- membuat menu;
- mengubah menu;
- mengubah harga;
- menonaktifkan menu.

Perubahan berlaku untuk transaksi baru.

Data historis tidak dimutasi.

## 11. Batas keputusan pada Specification

Detail berikut sengaja belum dikunci pada tahap Specification dan akan diputuskan pada tahap Design:
- framework frontend;
- database konkret;
- skema database online;
- mekanisme identitas/pemulihan tanpa login;
- detail Android Share;
- mekanisme autentikasi admin;
- detail arsitektur local-first dan sinkronisasi.
