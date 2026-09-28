# Spec Audit — Audio SRT Player

## Tujuan
Dokumen ini menjadi hasil awal **M0 — Spec Audit**. Isinya adalah temuan yang perlu diverifikasi sebelum implementasi besar dimulai.

## Temuan yang perlu dibereskan

### 1. Penyimpanan data vs file
Requirement menetapkan metadata aplikasi di localStorage, sedangkan file/reference di IndexedDB. Ini perlu dipertahankan sebagai keputusan arsitektur dan diuji terhadap ukuran data nyata.

### 2. Export / recovery
Export JSON hanya berisi metadata, bookmark, progress, dan preferensi; isi file audio/subtitle tidak ikut diekspor. UI harus menjelaskan bahwa JSON adalah manifest/recovery metadata, bukan backup media.

### 3. Browser fallback
File System Access API hanya tersedia pada browser tertentu. Jalur fallback IndexedDB perlu diuji khusus untuk quota dan file besar.

### 4. Performance target
Requirement memuat target sinkronisasi sangat ketat sekaligus target drift 60 menit. Angka ini harus diperlakukan sebagai acceptance/performance target yang perlu diukur, bukan diasumsikan tercapai.

### 5. PWA dan offline
Tidak boleh ada dependency runtime pada CDN/font/analytics eksternal jika NFR offline penuh tetap menjadi kontrak.

### 6. Task cross-reference
Beberapa referensi nomor FR di task perlu diaudit kembali terhadap requirement setelah dokumen dipisahkan. Jangan memperbaiki nomor hanya di task tanpa memastikan sumber requirement/design konsisten.

### 7. Scope MVP
Requirement saat ini cukup luas. Untuk latihan SDD, implementasi sebaiknya dimulai dari vertical slice kecil: **audio → SRT → parse cue → play → subtitle sinkron**. Fitur library, relink, bookmark, PWA, accessibility, dan polish mengikuti milestone berikutnya.

## Keputusan sementara
- requirements.md = sumber kebutuhan dan acceptance criteria.
- design.md = sumber keputusan arsitektur/UI.
- tasks.md = unit pekerjaan implementasi.
- roadmap.md = urutan belajar dan milestone M0–M9.
- spec-audit.md = temuan dan konflik yang belum selesai.
- README.md = pintu masuk proyek.

## Rule perubahan
Jika implementasi menemukan konflik, jangan menambal kode untuk menutupi konflik. Buat task [DOC], perbarui dokumen sumber yang benar, lalu sinkronkan dokumen terkait.