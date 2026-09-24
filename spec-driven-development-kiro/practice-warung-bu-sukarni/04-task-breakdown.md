# Task Breakdown v0.1 — Warung Bu Sukarni

Status: TASK BREAKDOWN MVP — fokus eksekusi cepat.

## Aturan Kerja

Setiap task wajib memenuhi:

**Satu task → bisa dikerjakan → bisa dites → bisa diverifikasi → ada evidence.**

Jangan mengerjakan task berikutnya sebelum task sebelumnya memiliki evidence yang cukup.

## Phase 1 — Fondasi

### TASK-01 — Project Setup
- Tujuan: menyiapkan React + Vite + JavaScript + PWA.
- Test: aplikasi dapat dijalankan.
- Verify: build PASS.
- Evidence: output build/test.

### TASK-02 — Local Database
- Tujuan: menyiapkan IndexedDB dan struktur penyimpanan dasar.
- Test: write/read data.
- Verify: data tetap setelah reload/restart.
- Evidence: test PASS.

### TASK-03 — Master Category & Menu
- Tujuan: kategori, menu, harga, dan status aktif.
- Test: create/update/disable data master.
- Verify: menu aktif tampil; menu nonaktif tidak tampil.
- Evidence: test PASS.

## Phase 2 — Mesin Transaksi

### TASK-04 — Menu Selection
- Tujuan: tap menambah quantity; long press mengurangi quantity.
- Test: quantity berubah benar.
- Verify: quantity 0 menghapus item.
- Evidence: UI/test evidence.

### TASK-05 — Active Receipt
- Tujuan: menampilkan item, quantity, harga, subtotal, dan total.
- Test: transaksi dengan beberapa item.
- Verify: perhitungan sesuai Specification.
- Evidence: test PASS.

### TASK-06 — Clear Receipt
- Tujuan: mengosongkan draft dengan konfirmasi.
- Test: BATAL dan YA, KOSONGKAN.
- Verify: draft hanya terhapus setelah konfirmasi.
- Evidence: test PASS.

## Phase 3 — Nomor & Penyimpanan

### TASK-07 — Receipt Number Generator
- Tujuan: menghasilkan YYMMDDNNN dengan operational day 05:00.
- Test: pergantian hari, 00:00–04:59, restart.
- Verify: nomor berurutan; draft batal tidak memakai nomor.
- Evidence: test PASS.

### TASK-08 — Save Transaction
- Tujuan: finalisasi, snapshot, dan penyimpanan lokal.
- Test: simpan offline.
- Verify: transaksi tetap ada setelah restart.
- Evidence: test PASS.

## Phase 4 — Riwayat

### TASK-09 — Transaction History
- Tujuan: menampilkan nota terbaru dengan isi lengkap.
- Test: beberapa transaksi.
- Verify: snapshot lama tidak berubah.
- Evidence: test PASS.

### TASK-10 — History Search
- Tujuan: pencarian berdasarkan nomor nota, tanggal, atau nama menu.
- Test: masing-masing jenis pencarian.
- Verify: hasil sesuai.
- Evidence: test PASS.

### TASK-11 — Resend Receipt
- Tujuan: mengirim ulang nota lama.
- Test: resend.
- Verify: nomor nota tetap sama dan tidak membuat transaksi baru.
- Evidence: test PASS.

## Phase 5 — WhatsApp

### TASK-12 — Plain-text Receipt
- Tujuan: menghasilkan teks nota untuk WhatsApp.
- Test: format nota.
- Verify: isi sesuai snapshot.
- Evidence: test PASS.

### TASK-13 — Android Share
- Tujuan: membuka Android Share untuk WhatsApp.
- Test: Share dan cancel.
- Verify: cancel tidak menghasilkan nomor baru.
- Evidence: device test.

## Phase 6 — Offline Sync

### TASK-14 — Sync Queue
- Tujuan: PENDING_SYNC → SYNCED.
- Test: transaksi dibuat offline.
- Verify: transaksi tidak hilang saat sync gagal.
- Evidence: test PASS.

### TASK-15 — Manual Sync
- Tujuan: tombol SINKRONKAN SEKARANG.
- Test: transaksi pending.
- Verify: transaksi masuk online DB.
- Evidence: database/test evidence.

### TASK-16 — Sync Idempotency
- Tujuan: mencegah transaksi tersimpan dua kali.
- Test: sync transaksi yang sama lebih dari sekali.
- Verify: hanya satu transaksi online.
- Evidence: database/test evidence.

## Phase 7 — Admin

### TASK-17 — Admin Access
### TASK-18 — Category Management
### TASK-19 — Menu Management
### TASK-20 — Price Management
### TASK-21 — Disable/Enable Master Data

Setiap task admin wajib memiliki test dan verification evidence sebelum dianggap selesai.

## Phase 8 — Recovery & Final Verification

### TASK-22 — Device Recovery
### TASK-23 — PWA Install & Persistence
### TASK-24 — End-to-End Test
### TASK-25 — Regression Test
### TASK-26 — Production Verification

## Urutan Eksekusi

Untuk mempercepat, kita mulai dari fondasi dan tidak mengerjakan task berikutnya sebelum evidence task aktif cukup:

```
TASK-01
  ↓
TEST
  ↓
VERIFY
  ↓
EVIDENCE
  ↓
TASK-02
  ↓
...
```

## Prinsip Proyek

**NO EVIDENCE, NO DONE.**
