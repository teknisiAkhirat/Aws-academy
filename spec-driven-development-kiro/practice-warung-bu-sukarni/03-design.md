# Design v0.1 — Warung Bu Sukarni

Status: DESIGN DRAFT — diturunkan dari Requirements dan Specification v0.1.

## 1. Tujuan Design

Design menerjemahkan requirement dan specification menjadi struktur teknis yang sederhana, mudah dirawat, dan cocok untuk operator utama berusia 60–70 tahun.

Prinsip utama:
- operator tidak perlu memahami teknologi;
- alur transaksi sesingkat mungkin;
- offline tetap menjadi jalur utama;
- transaksi yang sudah selesai bersifat immutable;
- online database berfungsi sebagai sinkronisasi dan pemulihan;
- satu fitur inti → implementasi → test → verification.

## 2. Arsitektur Tingkat Tinggi

```
Android
  │
  ▼
Web App / PWA
  │
  ├── UI Transaksi
  ├── UI Riwayat
  └── UI Admin tersembunyi
  │
  ▼
Local Database (IndexedDB)
  │
  ├── Draft transaksi
  ├── Transaksi selesai
  ├── Nomor nota
  └── Sync Queue
  │
  ├──────────────► Online Database (Supabase/PostgreSQL)
  │
  └──────────────► Android Share
                         │
                         ▼
                      WhatsApp
```

Local database adalah sumber kerja utama perangkat. Online database bukan prasyarat untuk transaksi.

## 3. Teknologi MVP

### Frontend
- React
- Vite
- JavaScript
- PWA

Alasan: sederhana, ringan, cocok untuk pembelajaran, dan dapat dijalankan sebagai aplikasi web yang terasa seperti aplikasi Android.

### Local Storage
IndexedDB.

IndexedDB dipilih daripada localStorage karena aplikasi membutuhkan:
- banyak transaksi;
- riwayat;
- status sinkronisasi;
- queue;
- data yang tetap ada setelah restart.

### Online Database
Supabase/PostgreSQL.

Online database dipakai untuk:
- backup;
- sinkronisasi;
- recovery ketika perangkat lama tidak tersedia.

## 4. Struktur Data

Relasi utama:

```
categories
    │
    └── menus
             │
             └── transaction_items

transactions
    │
    └── transaction_items
```

### Master Category
Menyimpan kategori aktif/nonaktif.

### Master Menu
Menyimpan:
- category_id;
- nama menu;
- harga;
- status aktif/nonaktif.

### Transaction
Menyimpan:
- receipt_number;
- transaction_time;
- operational_date;
- sync_status;
- total.

### Transaction Item
Wajib menyimpan snapshot:
- menu_name;
- category_name;
- unit_price;
- quantity;
- subtotal.

Snapshot diperlukan agar perubahan master menu tidak mengubah nota lama.

## 5. State Transaksi

```
EMPTY
  │
  │ pilih menu
  ▼
ACTIVE
  │
  ├── tambah/kurangi quantity
  ├── kosongkan → EMPTY
  │
  └── simpan/kirim
          │
          ▼
      COMPLETED
```

Draft ACTIVE tidak memiliki nomor nota.

Nomor nota hanya dibuat ketika transaksi benar-benar difinalisasi.

## 6. Perhitungan

Semua nominal disimpan sebagai integer Rupiah.

```
subtotal = unit_price × quantity
total = Σ subtotal
```

Tidak menggunakan floating point untuk nominal uang.

## 7. Nomor Nota

Format:

```
YYMMDDNNN
```

Hari operasional dimulai pukul 05:00.

Contoh:
- 24 Sep 23:59 → 260924002
- 25 Sep 02:00 → 260924003
- 25 Sep 05:00 → 260925001

Counter harus persisten di IndexedDB sehingga tetap aman setelah:
- aplikasi ditutup;
- HP direstart;
- perangkat offline.

Draft yang dibatalkan tidak mengambil nomor.

MVP hanya memiliki satu perangkat pembuat transaksi, sehingga belum diperlukan mekanisme distributed sequence.

Edge case setelah nomor 999 masih TBD dan tidak boleh ditangani dengan asumsi diam-diam.

## 8. Struktur Screen

### Screen Transaksi

Urutan visual:

1. Nama warung
2. Kategori
3. Tombol menu
4. Nota aktif
5. Total
6. KIRIM NOTA
7. SIMPAN NOTA
8. KOSONGKAN NOTA
9. RIWAYAT NOTA

Tombol harus besar dan mudah disentuh.

Tidak menggunakan gambar makanan.

### Screen Riwayat

Berisi:
- tombol KEMBALI;
- pencarian;
- daftar nota terbaru;
- isi nota;
- status sinkronisasi;
- KIRIM ULANG.

Urutan: transaksi terbaru di atas.

### Admin

Fungsi admin tidak ditampilkan pada navigasi operator.

Admin dapat mengelola:
- kategori;
- menu;
- harga;
- status aktif/nonaktif.

Mekanisme akses admin masih TBD.

## 9. Interaksi Menu

Tap normal:
- quantity +1.

Long press:
- quantity -1.

Jika quantity menjadi 0:
- item dikeluarkan dari nota aktif.

Perubahan quantity langsung terlihat pada nota.

Long press memberikan feedback singkat kepada operator.

## 10. Simpan Nota

Flow:

```
SIMPAN NOTA
    │
    ▼
Konfirmasi
    │
    ▼
Finalisasi transaksi
    │
    ├── generate receipt number
    ├── create snapshot
    ├── save Local DB
    └── set sync status
    │
    ▼
Notifikasi berhasil
    │
    ▼
Nota aktif dikosongkan
```

Jika transaksi dibuat ketika offline, status awal:
`PENDING_SYNC`.

## 11. Kirim Nota

Flow:

```
KIRIM NOTA
    │
    ▼
Konfirmasi
    │
    ▼
Finalisasi transaksi
    │
    ├── generate receipt number
    ├── save Local DB
    └── create plain-text receipt
    │
    ▼
Android Share
    │
    ▼
WhatsApp
```

Aplikasi tidak menganggap dirinya mengetahui apakah pesan benar-benar sudah terkirim oleh WhatsApp.

Jika Share Sheet dibatalkan sebelum proses dilanjutkan, transaksi yang sudah memiliki nomor tetap dapat dikirim ulang menggunakan nomor yang sama.

Kirim ulang dari riwayat tidak membuat transaksi baru dan tidak menghasilkan nomor baru.

## 12. Format Nota WhatsApp

MVP menggunakan plain text agar:
- ringan;
- mudah dibagikan;
- tidak membutuhkan PDF;
- mudah dipahami WhatsApp.

Format final teks ditentukan pada tahap implementation/design detail setelah data model dikunci.

## 13. Offline-First dan Sync Queue

Alur:

```
Operator
   │
   ▼
Local DB
   │
   ├── transaksi tersimpan
   └── PENDING_SYNC
          │
          ▼
    koneksi tersedia
          │
          ▼
       Sync Worker
          │
          ▼
     Online DB
          │
          ▼
        SYNCED
```

Tersedia tombol:
`SINKRONKAN SEKARANG`

Sinkronisasi tidak boleh menghapus data lokal yang belum berhasil dikirim.

Jika sinkronisasi gagal, transaksi tetap tersedia di riwayat sebagai `Belum tersinkron`.

Detail retry, idempotency, dan penanganan partial failure ditentukan sebelum implementasi sync.

## 14. Immutability Transaksi

Setelah transaksi COMPLETED:
- nama menu pada nota tidak berubah;
- kategori pada nota tidak berubah;
- harga pada nota tidak berubah;
- quantity tidak berubah;
- subtotal tidak berubah;
- nomor nota tidak berubah.

Perubahan master data hanya memengaruhi transaksi berikutnya.

## 15. Recovery

Karena operator tidak menggunakan login, recovery harus dirancang tanpa menambah langkah rumit bagi orang tua.

Target design:
- perangkat utama tetap dapat bekerja tanpa akun;
- online database menyimpan salinan transaksi;
- perangkat baru dapat dipasangkan/dipulihkan melalui mekanisme admin yang sederhana.

Mekanisme pairing/recovery belum dikunci pada Design v0.1.

## 16. Security dan Boundary

Operator tidak memiliki akses ke fungsi administrasi melalui alur normal.

Admin access tidak boleh bergantung hanya pada tombol yang disembunyikan secara visual sebagai satu-satunya security boundary.

Data transaksi lokal dianggap data penting dan tidak boleh dibuang hanya karena sinkronisasi gagal.

## 17. Deployment

Target MVP:
- aplikasi web/PWA;
- dapat di-install ke Android;
- HTTPS;
- online database Supabase;
- deployment frontend menggunakan platform static/web deployment yang dipilih saat implementation.

Platform deployment final belum dikunci pada Design v0.1.

## 18. Hal yang Sengaja Belum Dikunci

Design v0.1 belum mengunci:
1. schema PostgreSQL final;
2. schema IndexedDB final;
3. mekanisme admin authentication;
4. mekanisme recovery/pairing perangkat baru;
5. strategi idempotency sync;
6. detail partial sync;
7. perilaku nomor setelah 999;
8. detail PWA install;
9. platform deployment final;
10. API contract final.

Hal-hal tersebut harus diputuskan sebelum task implementation yang bergantung padanya dimulai.

## 19. Prinsip Verification

Setiap tahap implementasi harus menghasilkan evidence.

Minimal:
- build/test pass;
- feature test;
- offline test;
- restart persistence test;
- receipt numbering test;
- history test;
- share/resend test;
- sync test;
- regression test.

Prinsip proyek:

**NO EVIDENCE, NO DONE.**
