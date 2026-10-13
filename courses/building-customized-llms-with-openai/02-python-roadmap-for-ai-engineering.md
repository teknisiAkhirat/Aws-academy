# Python dari Nol untuk AI Application Engineer

> **Status:** revisi berdasarkan audit; tetap melalui PR dan belum menjadi acuan final sampai di-merge.
> **Tujuan:** membangun kemampuan Python praktis yang diperlukan untuk jalur AI Application Engineer pada `ROADMAP_AI_ENGINEER_FINAL.md`.
> **Metode:** Google Colab dahulu, belajar dari kebutuhan proyek, dan bukti praktik sebelum menyatakan lulus.
> **Bukan tujuan:** menjadi peneliti ML, melatih model dari nol, atau menuntaskan seluruh fitur Python.

## 1. Acuan dan prioritas

Dokumen ini adalah **jembatan belajar Python**, bukan roadmap karier yang berdiri sendiri. Acuan urutan dan Definition of Done (DoD) adalah:

1. [ROADMAP_AI_ENGINEER_FINAL.md](https://github.com/teknisiAkhirat/ai-engineer-roadmap-2026/blob/main/ROADMAP_AI_ENGINEER_FINAL.md) — tujuan dan urutan fase.
2. [TASK-LOG.md](https://github.com/teknisiAkhirat/ai-engineer-roadmap-2026/blob/main/TASK-LOG.md) — posisi belajar dan bukti kemajuan aktual.

README umum repo AI Engineer hanya konteks; README tersebut masih memuat rencana lama. Jika ada konflik, ikuti roadmap FINAL dan TASK-LOG, lalu tandai konflik yang belum terselesaikan.

**Prioritas hidup tetap dagang sparepart/HP bekas, servis sesuai kemampuan, dan keluarga.** Roadmap AI Engineer adalah side-track yang boleh berjalan pelan atau berhenti sementara.

### Anggaran waktu

Roadmap FINAL menetapkan sekitar **3 jam per minggu**, bukan kewajiban belajar setiap hari. Gunakan itu sebagai rencana dasar. Sesi satu jam boleh dipakai saat ada waktu; tidak perlu mengejar ketertinggalan jika satu minggu terlewat.

Perkiraan jam dalam dokumen ini adalah **perkiraan perencanaan, bukan fakta terverifikasi atau tenggat**. Kecepatan mengikuti hasil diagnostik dan bukti praktik. Jangan menyimpulkan kemampuan hanya dari jumlah jam.

## 2. Dua gerbang yang berbeda

Jangan mencampur kesiapan mengikuti kursus Columbia dengan kesiapan menyelesaikan fase roadmap AI Engineer.

### Gerbang A — cukup siap mulai kursus Columbia

Halaman resmi Columbia+ menyebut prasyarat **basic Python programming knowledge**. Itu tidak otomatis berarti semua materi dalam roadmap ini wajib selesai sebelum kursus.

Sebelum membayar atau mulai kursus, lakukan diagnostik mandiri 1–2 jam. Jika belum lulus, pelajari bagian dasar yang gagal saja, lalu ulangi tes. Gunakan materi resmi kursus yang bisa diakses untuk memastikan apakah ada kebutuhan tambahan. Isi Courseworks yang memerlukan login dan rincian praktik yang belum bisa diperiksa **belum terverifikasi secara independen**.

**Tes diagnostik awal (tanpa menyalin jawaban):**
1. Buat fungsi yang menghitung biaya servis dari beberapa angka dan mengembalikan total dengan `return`.
2. Gunakan `if` untuk menentukan kategori biaya.
3. Ulangi data pada sebuah `list` dengan `for`, lalu cari data di sebuah `dict`.
4. Baca JSON sederhana, akses satu nilai di dalam objek bersarang, lalu ubah nilainya.
5. Jelaskan traceback sederhana dan perbaiki satu kesalahan yang sengaja dibuat.

Catat setiap butir sebagai **lulus / perlu latihan**. Ini diagnostik kemampuan saat ini, bukan ujian resmi Columbia. Jika sebagian sudah bisa, jangan mengulang semua materi dari nol.

### Gerbang B — siap menjalankan Fase 1 roadmap AI Engineer

Untuk Fase 1, prasyarat Python dasar saja belum cukup. Ikuti DoD pada roadmap FINAL:
- script memanggil LLM API langsung melalui SDK resmi provider;
- respons divalidasi menggunakan Pydantic model buatan sendiri;
- kegagalan validasi ditangani tanpa membuat program crash;
- ada contoh input/output dan evidence yang dapat diperiksa.

Jangan menyatakan Fase 1 selesai hanya karena kursus selesai atau contoh AI berhasil dijalankan.

## 3. Jalur belajar minimum

Kerjakan bagian yang diperlukan, lalu buktikan melalui latihan. Perkiraan jam berikut bersifat kasar dan dapat berubah berdasarkan hasil diagnostik.

### Tahap 0 — menjalankan Python (perkiraan 1–3 jam)
- Python, program, notebook, dan cell Google Colab.
- `print()`, komentar, string, dan menjalankan ulang cell.
- Latihan: ubah program sederhana dan jelaskan output.
- **Lulus jika:** dapat membuat notebook, menjalankan/mengubah kode, dan membaca output.

### Tahap 1 — variabel dan tipe data (perkiraan 3–5 jam)
- Variabel, assignment, `str`, `int`, `float`, `bool`, `None`, operasi dan konversi tipe.
- F-string untuk menyusun teks dengan nilai variabel.
- Latihan: kalkulator biaya servis HP dengan data sintetis.
- **Lulus jika:** dapat menjelaskan tipe data dan memperbaiki kesalahan tipe sederhana.

### Tahap 2 — kondisi dan logika (perkiraan 2–4 jam)
- `if/elif/else`, perbandingan, `and/or/not`.
- Latihan: menentukan kategori/status pekerjaan servis.
- **Lulus jika:** menulis beberapa cabang keputusan dan menguji kondisi normal serta batas.

### Tahap 3 — perulangan (perkiraan 2–4 jam)
- `for`, `while`, `range()`, `break`, `continue`; hindari loop tanpa akhir.
- Latihan: menghitung total beberapa pekerjaan.
- **Lulus jika:** memilih perulangan yang sesuai dan dapat memperkirakan hasilnya.

### Tahap 4 — koleksi data (perkiraan 4–7 jam)
- `list`, `tuple`, `dict`, `set`; indeks, slicing, menambah/mengubah/menghapus item.
- Iterasi list/dictionary, akses JSON bersarang, comprehension sederhana.
- **Lulus jika:** dapat menyimpan, mencari, mengubah, dan merangkum data sederhana.

### Tahap 5 — fungsi (perkiraan 3–5 jam)
- `def`, parameter/argumen, `return`, nilai default, cakupan variabel dasar.
- Bedakan `print()` dengan `return`; satu fungsi sebaiknya punya satu tanggung jawab.
- **Lulus jika:** dapat membuat dan menguji fungsi tanpa menyalin contoh.

### Tahap 6 — berkas dan JSON (perkiraan 4–7 jam)
- Membaca/menulis teks, UTF-8, `with`, modul `json` (`load/dump/loads/dumps`).
- Memahami objek, array, string, angka, boolean, dan null; mencari teks.
- **Lulus jika:** menyimpan data, menjalankan ulang program, lalu membaca data kembali.
- **Catatan Colab:** berkas di penyimpanan sementara runtime dapat hilang saat runtime di-reset. Untuk uji persistensi, simpan di Google Drive atau unduh berkas lalu unggah kembali; jangan menganggap file lokal `/content` akan tetap ada setelah reset.

### Tahap 7 — error dan debugging (perkiraan 3–5 jam)
- Membaca traceback, membedakan error sintaks dan error saat runtime.
- Validasi input, `try/except` yang spesifik, debugging dengan eksperimen kecil.
- **Lulus jika:** sengaja membuat dan memperbaiki tiga bug, lalu menjelaskan penyebabnya.

### Tahap 8 — modul dan kode rapi (perkiraan 2–4 jam)
- `import`, modul standar seperti `json`, `pathlib`, `datetime`; cara membaca dokumentasi.
- Type hints dasar: `str`, `int`, `list[str]`; kelas sederhana hanya bila memang membantu.
- `pip` secukupnya. Konsep `venv` boleh dikenali, tetapi tidak menjadi gerbang awal.
- **Lulus jika:** dapat membagi program kecil menjadi fungsi/modul dan memahami type hints dasar.

### Tahap 9 — HTTP API dan pemanggilan LLM (perkiraan 5–8 jam untuk dasar API; praktik SDK LLM dilakukan sebagai jembatan Fase 1)
- Request/response, GET/POST, status code, header, body, JSON, dan kegagalan jaringan.
- Mulai dengan API publik yang tidak memerlukan token.
- Terapkan timeout dan retry terbatas secara sinkron; misalnya maksimal tiga percobaan dengan jeda yang wajar. Retry hanya untuk kegagalan yang layak dicoba ulang, bukan semua error.
- Setelah dasar HTTP dipahami, panggil LLM langsung menggunakan SDK resmi provider. Pilih provider dan tetapkan batas pengeluaran sebelum memakai API berbayar.
- Simpan API key di Colab Secrets/variabel lingkungan; jangan menaruhnya di kode, output notebook, atau GitHub.
- **Lulus dasar API jika:** request berhasil, status diperiksa, timeout/error ditangani, dan respons JSON diproses.
- **Lulus jembatan Fase 1 jika:** SDK memperoleh respons LLM, Pydantic memvalidasi output, dan validation failure ditangani tanpa crash. Gunakan Pydantic model sederhana dan kelas hanya sejauh diperlukan.

### Tahap 10 — AI fundamentals dan NumPy minimum (sebagai jembatan menuju RAG, bukan prasyarat universal kursus)
- Pahami istilah token, embedding, chunk, cosine similarity, top-k, RAG, dan perbedaan RAG dengan fine-tuning.
- Pelajari NumPy secukupnya untuk menghitung cosine similarity pada beberapa vektor/embedding dan memahami hasilnya. Tidak perlu mendalami NumPy/Pandas.
- Latihan: bandingkan tiga kalimat menggunakan embedding dari provider yang dipilih; perhatikan bahwa kemiripan angka bukan jaminan makna atau kebenaran.
- Perkiraan awal 3–6 jam untuk pengenalan; tambah latihan bila belum dapat menjelaskan hasilnya.
- **Lulus jika:** dapat menjelaskan alur chunk → embedding → similarity → top-k dengan kata sendiri dan memeriksa hasil sederhana.

### Tahap 11 — SQLite untuk persistensi (saat masuk Fase 2)
- Pelajari modul bawaan `sqlite3`: membuat tabel, insert, query, dan membaca hasil.
- **Lulus jika:** hasil percakapan/LLM contoh tersimpan dan bisa di-query ulang, sesuai DoD Fase 2.
- Jangan mengganti ini dengan framework ORM pada tahap awal.

## 4. Materi yang ditunda

Materi berikut tidak menjadi syarat untuk memulai kursus Columbia atau menuntaskan fondasi awal, kecuali ada bukti kebutuhan dari latihan/proyek:
- `async/await` dan concurrency: tunda sampai ada kebutuhan nyata; kuasai request sinkron, timeout, dan retry terlebih dahulu.
- `pytest` dan pengujian otomatis yang lebih lengkap: mulai dari tes manual/assertion sederhana; tambah pytest saat proyek membutuhkan pengujian berulang.
- Pengelolaan `venv` secara mendalam: pahami konsep, praktikkan ketika beralih ke lingkungan lokal/proyek.
- OOP tingkat lanjut, decorator, generator, metaclass, algoritma kompetitif, NumPy/Pandas mendalam, training model, CUDA, dan microservices.
- Fine-tuning **bukan target utama roadmap FINAL**. Jika modul kursus membahasnya, perlakukan sebagai pengenalan kecuali tujuan belajar sengaja diubah.

Jika materi resmi kursus ternyata membutuhkan sesuatu yang belum ada di jalur ini, catat bukti dan tambahkan hanya materi minimum yang diperlukan. Jangan menganggap JSONL/fine-tuning wajib sebelum memeriksa modul kursus yang benar-benar tersedia.

## 5. Urutan yang disarankan

1. Jalankan tes diagnostik 1–2 jam; tandai kemampuan yang sudah ada dan yang perlu latihan.
2. Pelajari Tahap 0–7 hanya sejauh dibutuhkan sampai dapat menulis program kecil sendiri.
3. Pelajari dasar HTTP di Tahap 9, lalu lakukan jembatan SDK LLM + Pydantic untuk memenuhi DoD Fase 1.
4. Setelah Gerbang A terpenuhi, putuskan apakah kursus Columbia sesuai tujuan dan anggaran. Tidak perlu menunda belajar Python sambil menunggu keputusan kursus.
5. Untuk roadmap utama, lanjutkan retry/timeout dan SQLite pada Fase 2, kemudian chunking/embedding/NumPy/cosine/top-k untuk RAG manual pada Fase 3.
6. Tunda async dan pytest sampai ada kebutuhan yang jelas.

## 6. Biaya dan keamanan

- Google Colab dapat digunakan untuk latihan dasar tanpa mengatur instalasi lokal.
- API berbayar bukan syarat untuk mempelajari Python. Mulai dari API publik tanpa token dan data contoh.
- Sebelum memakai LLM API, periksa harga provider dan tetapkan batas pengeluaran. Jangan mengandalkan key yang memiliki izin luas jika key terbatas dapat digunakan.
- Jangan menaruh API key, token, data pelanggan, atau dokumen pribadi di notebook publik maupun repository.
- Kursus Columbia berbayar bukan prasyarat untuk menjadi AI Application Engineer. Evaluasi biaya kursus, API, dan nilai kemampuan yang akan diperoleh sebelum mendaftar.

## 7. Checklist praktik

Gunakan checklist ini sebagai bukti kemampuan; tidak semua butir harus selesai sebelum mulai kursus.

- [ ] Menulis fungsi kalkulator biaya servis tanpa menyalin dan menguji lima kasus manual.
- [ ] Membaca JSON stok, mencari item, menyimpan perubahan, lalu menguji persistensi sesuai batasan Colab.
- [ ] Membuat tiga bug dengan sengaja dan memperbaikinya berdasarkan traceback.
- [ ] Memanggil API publik dengan pemeriksaan status, timeout, dan retry terbatas.
- [ ] Menyimpan API key di Secrets dan memastikan key tidak muncul di output.
- [ ] Untuk DoD Fase 1: memanggil LLM melalui SDK, memvalidasi respons dengan Pydantic, dan menangani kegagalan validasi.
- [ ] Untuk jembatan RAG: menghitung cosine similarity sederhana dengan NumPy dan menjelaskan hasilnya.
- [ ] Menjelaskan embedding, chunk, top-k, RAG vs fine-tuning dengan kata sendiri.

## 8. Aturan kelulusan dan pencatatan

Setiap topik berstatus **Belum dipelajari**, **Sedang dikuasai**, atau **Dikuasai**. Status “Dikuasai” berarti dapat menjelaskan konsep, menulis variasi kode tanpa menyalin, dan memeriksa hasilnya.

Ikuti siklus **LEARN → IMPLEMENT → TEST → VERIFY → RECORD**. Simpan evidence kecil yang bisa diperiksa dan catat kemajuan di TASK-LOG setelah ada hasil nyata. Kursus selesai, build berhasil, atau klaim AI saja bukan bukti bahwa DoD terpenuhi.

> **NO EVIDENCE, NO DONE.**
