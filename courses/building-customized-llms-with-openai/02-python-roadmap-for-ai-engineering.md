# Python dari Nol untuk AI Application Engineer

> **Status:** rancangan belajar untuk ditinjau melalui PR.  
> **Target:** belajar Python dari pemula sampai cukup kuat untuk membangun aplikasi AI berbasis API dan RAG.  
> **Metode:** Google Colab terlebih dahulu, latihan kecil, lalu proyek yang bisa diuji.  
> **Batasan:** ini bukan kurikulum untuk menjadi peneliti machine learning atau melatih model dari nol.

## 1. Keputusan belajar

Roadmap utama [AI Engineer Roadmap 2026](https://github.com/teknisiAkhirat/ai-engineer-roadmap-2026/blob/main/README.md) menetapkan Python intermediate yang bersifat terapan sebagai keterampilan wajib, dengan perkiraan sekitar 20 jam praktik. Fondasi software engineering yang juga dibutuhkan meliputi JSON, HTTP/API, pengelolaan rahasia, penanganan error, debugging, pengujian, dan async dasar.

Namun, karena titik awal pembelajar sekarang adalah **pemula yang baru mengenal nama Python**, 20 jam tersebut diperlakukan sebagai perkiraan untuk fondasi awal, bukan jaminan langsung mahir. Durasi sebenarnya mengikuti hasil latihan dan penguasaan konsep. Materi di bawah memperluas fondasi tersebut tanpa mengubah sasaran akhirnya.

## 2. Sasaran akhir

Setelah menyelesaikan jalur ini, pembelajar diharapkan mampu:

- Membaca dan menjelaskan kode Python sederhana.
- Menulis program kecil tanpa hanya menyalin contoh.
- Menggunakan kondisi, perulangan, koleksi data, dan fungsi.
- Membaca dan menulis berkas teks serta JSON.
- Memahami dan memperbaiki error dasar menggunakan pesan error/traceback.
- Membagi kode ke fungsi dan modul yang masuk akal.
- Memakai type hints dan kelas sederhana bila memang membantu.
- Mengirim permintaan HTTP ke API dan memproses respons JSON.
- Menjaga API key menggunakan Secrets/variabel lingkungan, bukan menulisnya di kode.
- Memahami dasar async/await, timeout, dan retry untuk pemanggilan API.
- Menulis pengujian dasar untuk memastikan kode bekerja.
- Membuat program kecil yang bisa menjadi fondasi proyek LLM API dan RAG.

## 3. Urutan belajar

### Tahap 0 — Lingkungan dan cara menjalankan kode

**Pelajari**
- Apa itu Python, kode, program, dan notebook.
- Google Colab: notebook, cell kode, menjalankan ulang cell, dan menyimpan notebook.
- Fungsi print(), komentar, string, dan error pertama.
- Perbedaan antara menulis kode dan menjalankannya.

**Latihan**
- Tampilkan pesan dan informasi sederhana.
- Ubah kode, jalankan ulang, dan jelaskan hasilnya.

**Lulus jika**
- Bisa membuat notebook baru, menjalankan kode, mengubahnya, dan membaca output.

### Tahap 1 — Nilai, variabel, dan tipe data

**Pelajari**
- Variabel dan assignment.
- Tipe data str, int, float, bool, dan None.
- Operasi angka dan teks.
- Konversi tipe data seperti int() dan str().
- Input sederhana jika lingkungan mendukungnya.

**Latihan proyek**
- Kalkulator biaya servis HP dengan data contoh, tanpa data pelanggan sungguhan.

**Lulus jika**
- Bisa menjelaskan tipe data yang dipakai dan memperbaiki kesalahan tipe data sederhana.

### Tahap 2 — Kondisi dan logika

**Pelajari**
- Perbandingan: ==, !=, <, >, <=, >=.
- if, elif, else.
- Operator logika and, or, not.
- Kondisi bertingkat secukupnya.

**Latihan proyek**
- Menentukan status pekerjaan servis dari data contoh.

**Lulus jika**
- Bisa menulis beberapa cabang keputusan dan menguji kondisi normal maupun batasnya.

### Tahap 3 — Perulangan

**Pelajari**
- for, while, range().
- break dan continue.
- Mengulang daftar data.
- Menghindari perulangan while yang tidak pernah berhenti.

**Latihan proyek**
- Menghitung total beberapa pekerjaan dan menampilkan ringkasan daftar.

**Lulus jika**
- Bisa memilih perulangan yang sesuai, memperkirakan hasilnya, dan mencegah loop tanpa akhir.

### Tahap 4 — Struktur data yang sering dipakai aplikasi

**Pelajari**
- list, tuple, dict, dan set.
- Indeks, slicing, menambah/mengubah/menghapus item.
- Mengulang isi list dan dictionary.
- Memilih struktur data sesuai kebutuhan.
- Comprehension sederhana setelah pola biasa dipahami.

**Latihan proyek**
- Mengelola daftar komponen dan stok contoh di memori.

**Lulus jika**
- Bisa menyimpan, mencari, mengubah, dan merangkum sekumpulan data sederhana.

### Tahap 5 — Fungsi

**Pelajari**
- Membuat fungsi dengan def.
- Parameter, argumen, dan nilai balik return.
- Variabel lokal dan global secara dasar.
- Nilai default dan fungsi kecil dengan satu tanggung jawab.
- Memecah program panjang menjadi bagian yang bisa diuji.

**Latihan proyek**
- Mengubah kalkulator servis menjadi program dengan fungsi terpisah.

**Lulus jika**
- Bisa membuat fungsi sendiri, memanggilnya, dan menjelaskan perbedaan print() dengan return.

### Tahap 6 — Berkas, teks, dan JSON

**Pelajari**
- Membaca/menulis berkas teks.
- Encoding UTF-8 dan penggunaan with.
- Modul json: loads, dumps, load, dan dump.
- Struktur JSON: objek, array, string, angka, boolean, dan null.
- Dasar pemrosesan teks dan pencarian kata.

**Latihan proyek**
- Menyimpan dan memuat data contoh dari berkas JSON.

**Lulus jika**
- Program bisa menyimpan data, dijalankan ulang, lalu membaca kembali data tersebut.

### Tahap 7 — Error, debugging, dan logging

**Pelajari**
- Membaca traceback/pesan error secara terarah.
- Error sintaks dibandingkan error saat program berjalan.
- try/except untuk kesalahan yang memang bisa ditangani.
- Validasi input.
- Debugging dengan eksperimen kecil dan print().
- Dasar logging; kapan beralih dari print() ke log.

**Latihan proyek**
- Sengaja membuat beberapa bug pada program JSON, kemudian menemukan dan memperbaikinya.

**Lulus jika**
- Bisa menjelaskan penyebab error umum dan tidak sekadar menutup semua error dengan except yang terlalu luas.

### Tahap 8 — Modul, pustaka, dan kode yang rapi

**Pelajari**
- import dan modul standar seperti json, pathlib, dan datetime.
- Menggunakan pustaka pihak ketiga melalui pip ketika diperlukan.
- Gambaran venv dan file dependensi; pahami bahwa Colab sudah menyediakan lingkungan sementara.
- Type hints dasar seperti str, int, list[str], dan anotasi nilai balik.
- Kelas sederhana hanya ketika data dan perilaku memang perlu dikelompokkan.
- Prinsip satu fungsi/satu tanggung jawab.

**Latihan proyek**
- Merapikan program sebelumnya menjadi beberapa fungsi dan modul yang mudah dibaca.

**Lulus jika**
- Bisa mengimpor modul, membaca dokumentasi penggunaan dasar, dan memahami type hints pada fungsi.

### Tahap 9 — Python untuk HTTP API

**Pelajari**
- Konsep HTTP request/response.
- Method umum: GET dan POST.
- Status code, header, body, timeout, dan kegagalan jaringan.
- Memanggil API memakai pustaka yang sesuai, misalnya requests atau httpx.
- Mengurai dan memvalidasi respons JSON.
- Menyimpan API key di Colab Secrets atau variabel lingkungan.
- Jangan pernah commit token/API key ke GitHub atau menaruhnya di output notebook.

**Latihan proyek**
- Mengambil data dari API publik yang tidak memerlukan rahasia, lalu mengolah respons JSON.
- Setelah itu, latihan API berautentikasi hanya jika penyedia dan anggarannya sudah dipilih.

**Lulus jika**
- Bisa melakukan request, memeriksa status respons, menangani timeout/error, dan membaca JSON.

### Tahap 10 — Dasar async/await untuk pemanggilan layanan

**Pelajari**
- Mengapa menunggu respons jaringan berbeda dari menghitung secara lokal.
- async def, await, dan konsep coroutine.
- Timeout dan batas retry secara sederhana.
- Jangan memakai async sebelum memahami fungsi biasa dan request HTTP sinkron.

**Latihan**
- Membaca dan memodifikasi contoh kecil pemanggilan layanan asynchronous.

**Lulus jika**
- Bisa menjelaskan kapan async berguna dan membaca contoh dasar tanpa harus langsung membangun sistem concurrency kompleks.

### Tahap 11 — Pengujian otomatis

**Pelajari**
- Menguji fungsi dengan input dan hasil yang diharapkan.
- Assertion dan kasus batas.
- Dasar pytest setelah memahami fungsi.
- Memisahkan kode program dari kode pengujian.
- Pengujian API dilakukan dengan mock atau layanan yang aman; jangan bergantung pada API berbayar untuk setiap tes.

**Latihan proyek**
- Menulis tes untuk kalkulator, fungsi validasi, dan pembacaan JSON.

**Lulus jika**
- Bisa menjalankan tes, membaca kegagalan, memperbaiki kode, dan menjalankan tes kembali.

## 4. Materi yang sengaja tidak diprioritaskan

Untuk target **AI Application Engineer**, materi berikut tidak menjadi penghalang sebelum mulai membangun aplikasi:

- OOP tingkat lanjut, inheritance yang kompleks, dan design patterns secara mendalam.
- Decorator, generator, metaclass, dan fitur bahasa yang jarang dibutuhkan di tahap awal.
- Algoritma kompetitif dan struktur data tingkat lanjut.
- NumPy/Pandas mendalam sebelum ada kebutuhan pengolahan data yang nyata.
- Matematika machine learning mendalam, training model dari nol, CUDA/GPU engineering.
- Async/concurrency tingkat lanjut dan arsitektur microservices.

Materi tersebut bisa dipelajari nanti jika kebutuhan proyek memang mengharuskannya. Ini bukan berarti semuanya tidak berguna; hanya bukan prioritas awal untuk sasaran kita.

## 5. Cara belajar dan aturan kelulusan

Gunakan Google Colab pada tahap awal agar tidak perlu mengurus instalasi. Satu sesi belajar sekitar satu jam dapat dibagi menjadi:

- 10 menit mengulang materi sebelumnya.
- 15 menit memahami konsep baru.
- 25 menit menulis dan menjalankan kode.
- 10 menit latihan mandiri dan mencatat kesalahan.

Setiap topik memiliki tiga status:

1. **Belum dipelajari** — belum memahami konsep.
2. **Sedang dikuasai** — bisa mengikuti contoh tetapi belum mampu membuat variasi sendiri.
3. **Dikuasai** — mampu menjelaskan, menulis, mengubah, dan menguji kode untuk masalah selevel.

Jangan menganggap materi selesai hanya karena video atau halaman sudah dibaca. Gunakan latihan tanpa menyalin contoh sebagai bukti penguasaan. Jika belum lulus, ulangi dengan contoh berbeda.

## 6. Proyek bertahap

1. **Kalkulator biaya servis** — variabel, angka, kondisi, fungsi.
2. **Pengelola stok contoh** — list/dictionary, perulangan, validasi.
3. **Penyimpanan JSON** — baca/tulis berkas, error handling.
4. **Pembaca API publik** — HTTP, JSON, timeout, error handling.
5. **Program kecil yang diuji** — modul, type hints, pytest.
6. **Pencari dokumen lokal** — baca berkas Markdown/TXT dan cari bagian relevan.
7. **RAG dasar** — setelah fondasi cukup, hubungkan hasil pencarian ke model AI melalui API.

Gunakan data latihan sintetis atau publik pada tahap awal. Jangan gunakan data pribadi pelanggan atau dokumen sensitif untuk latihan.

## 7. Kaitan dengan roadmap AI Engineer

Python adalah fondasi, bukan tujuan akhir. Setelah tahap API dan pengujian cukup dikuasai, jalur berikutnya mengikuti roadmap utama:

1. LLM API dan structured output.
2. Prompt engineering dan evaluasi dasar.
3. RAG: ingestion, pemotongan dokumen (chunking), embedding, penyimpanan, retrieval, dan penyusunan konteks.
4. Backend dengan FastAPI serta validasi Pydantic.
5. Database dan persistensi.
6. Agentic workflow setelah RAG dan evaluasi cukup stabil.
7. Keamanan, deployment, observability, serta optimasi biaya.

Kursus *Building Customized LLMs with OpenAI* dapat dipelajari berdampingan secara ringan untuk mengenali istilah dan gambaran besarnya. Namun, implementasi yang memerlukan Python yang belum dikuasai harus kembali ke latihan fondasi.

## 8. Sumber belajar utama

- [Python for Everybody](https://www.py4e.com/) — jalur pemula dan latihan.
- [Dokumentasi resmi Python: Tutorial](https://docs.python.org/3/tutorial/index.html) — referensi bahasa; beberapa bagian mengasumsikan pengetahuan pemrograman dasar.
- [Google Colab](https://colab.research.google.com/) — lingkungan praktik di browser.
- [Google Python Education](https://developers.google.com/edu/python) — referensi tambahan.
- [AI Engineer Roadmap 2026 milik teknisiAkhirat](https://github.com/teknisiAkhirat/ai-engineer-roadmap-2026/blob/main/README.md) — sasaran kemampuan yang disesuaikan dengan AI Application Engineer.

**Prinsip akhir:** pelajari Python yang benar-benar diperlukan untuk membangun, menguji, dan memelihara aplikasi AI. Utamakan pemahaman dan praktik; jangan mengejar semua fitur Python sekaligus.
