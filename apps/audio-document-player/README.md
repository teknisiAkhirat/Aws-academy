# Dengar & Baca

Aplikasi web mobile-first untuk memutar audio lokal dan membaca dokumen MD, SRT, serta TXT. Tidak ada akun, backend, database, analytics, atau upload file.

## Jalankan lokal
Buka aplikasi melalui static web server. Service worker membutuhkan HTTPS atau localhost; membuka `index.html` langsung dengan skema `file://` tidak mengaktifkan offline cache.

Contoh jika Node.js tersedia:
```sh
npx serve apps/audio-document-player
```
Lalu buka alamat localhost yang ditampilkan. Folder ini tidak membutuhkan proses build atau instalasi dependency proyek.

## Cara menggunakan
1. Pilih **Pilih berkas audio** dan pilih audio lokal.
2. Setelah durasi muncul, tekan Putar/Jeda atau sentuh slider untuk melompat ke posisi tertentu.
3. Pilih dokumen MD, SRT, atau TXT pada panel bawah.
4. Untuk pemakaian offline, buka aplikasi sekali saat online melalui HTTPS/localhost agar app shell dapat di-cache.

## Privasi dan batasan
- Audio dan dokumen dibaca dari berkas yang dipilih pengguna di browser; isi file tidak diunggah.
- Browser biasanya tidak mempertahankan izin/objek file setelah reload. Pilih ulang berkas setelah membuka ulang aplikasi.
- Offline cache hanya menyimpan app shell, bukan audio atau dokumen.
- Format/codec audio bergantung pada dukungan browser/perangkat.
- Pemutaran background bisa dibatasi oleh browser atau sistem operasi.
- MVP tidak menyinkronkan subtitle dengan audio; baris SRT tidak dapat diketuk untuk seek.
- Renderer Markdown mendukung heading level 1–6, paragraf, bold, italic, coret, tautan aman, list, blockquote, garis pemisah, blok kode, kode sebaris, dan tabel pipe. HTML mentah di-escape; gambar Markdown ditampilkan sebagai teks alt agar tidak memuat gambar jarak jauh.
- Service worker hanya tersedia pada secure context (HTTPS/localhost).

## Uji renderer Markdown\n\nDengan Node.js 18 atau lebih baru, jalankan dari root repository:\n\n```sh\nnode --test apps/audio-document-player/tests/markdown.test.js\n```\n\n## Status verifikasi
- Implementasi dan source inspection: tersedia di branch fitur.
- Automated tests, browser interaction, Android playback, installability, dan offline runtime: **UNCONFIRMED** sampai benar-benar dijalankan dan hasilnya dicatat.
- Jangan menyatakan production-ready sebelum gate runtime selesai.

## File utama
- `index.html` — semantic UI
- `styles.css` — responsive styling
- `app.js` — audio controls, safe document readers, state
- `manifest.webmanifest` — PWA metadata
- `sw.js` — app-shell caching
- `01-requirements.md`, `02-design.md`, `03-task-plan.md` — specification artifacts
