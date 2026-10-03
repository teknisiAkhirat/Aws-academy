# Modul 5 — Praktik Terbaik dan Menjaga Kualitas Kode

> Catatan belajar lengkap dari modul Dicoding **Spec-Driven Development dengan Kiro**, tutorial 5.1–5.7. Materi diparafrasekan untuk dokumentasi belajar pribadi.

## Tujuan modul

Modul ini membahas cara menjaga kualitas proyek yang semakin besar dengan bantuan Kiro. Fokusnya:

- mengelola konteks pada proyek besar;
- menulis Steering Files yang efektif, aman, dan mudah dipelihara;
- melakukan refactoring tanpa mengubah perilaku eksternal;
- membuat unit test sederhana dengan bantuan AI;
- menyusun README yang akurat berdasarkan codebase;
- mempertahankan SDD sebagai acuan kualitas jangka panjang.

---

## 1. Pengantar: technical debt dan kualitas kode (5.1)

Pada awal proyek, fitur biasanya mudah ditambahkan karena struktur kode masih sederhana dan konteks sistem masih mudah diingat. Seiring jumlah kode dan hubungan antarkomponen bertambah, satu perubahan kecil dapat merusak bagian lain jika proyek tidak dikelola dengan disiplin.

Akumulasi kerumitan tersebut disebut **technical debt** atau utang teknis. Technical debt dapat memperlambat inovasi, menyulitkan pemeliharaan, dan meningkatkan risiko regresi.

Modul ini menawarkan pendekatan berbasis Kiro untuk:

1. mengelola konteks proyek berskala besar;
2. meningkatkan struktur kode melalui refactoring;
3. menjaga perilaku aplikasi dengan pengujian otomatis;
4. menyusun dokumentasi yang dapat dipercaya developer lain.

### Prinsip utama

AI dapat mempercepat pekerjaan, tetapi developer tetap bertanggung jawab menjaga satu sumber kebenaran, memeriksa hasil, dan memastikan kualitas implementasi.

---

## 2. Standardisasi Steering Files (5.2)

Steering Files dapat dianalogikan sebagai **buku panduan karyawan** untuk Kiro. Kiro mungkin memahami bahasa pemrograman, tetapi tidak otomatis mengetahui gaya kode tim, aturan keamanan, struktur direktori, atau kebiasaan khusus proyek.

> Kualitas bantuan Kiro berbanding lurus dengan kualitas instruksi yang diberikan.

Steering Files bukan sekadar salinan dokumentasi. Isinya harus berupa instruksi yang dioptimalkan agar dapat diproses secara presisi oleh AI.

### Enam prinsip fundamental

#### 2.1 Fokus — Single Responsibility

Satu file sebaiknya membahas satu topik spesifik. Jangan mencampur aturan desain API, prosedur testing, dan deployment dalam satu dokumen. Pemisahan ini mengurangi noise dan membantu Kiro mengambil konteks yang relevan.

#### 2.2 Nama yang deskriptif

Nama file harus langsung menjelaskan isinya. Contoh:

- Lebih baik: `components-form-validation.md`
- Kurang jelas: `forms.md`

#### 2.3 Jelaskan “mengapa”

Jangan hanya menyebut aturan. Jelaskan alasan di balik keputusan tersebut agar Kiro memahami konteks arsitektur dan dapat menerapkan aturan secara tepat pada kasus baru.

#### 2.4 Berikan contoh konkret

Instruksi abstrak lebih sulit dikalibrasi. Sertakan code snippet dan perbandingan:

- **Sebelum:** pola yang salah atau tidak diinginkan.
- **Sesudah:** pola yang benar dan disarankan.

#### 2.5 Keamanan tanpa toleransi

Jangan pernah menaruh hal berikut dalam Steering Files:

- API key;
- password;
- access token;
- data pelanggan sensitif.

Anggap Steering Files dapat masuk repository atau diproses pihak ketiga.

#### 2.6 Pemeliharaan berkala

Review Steering Files ketika:

- merencanakan sprint;
- mengubah arsitektur;
- merestrukturisasi folder;
- mengganti framework atau library.

Pastikan referensi file masih valid. Perubahan pada Steering Files perlu melalui review seperti perubahan pada kode produksi.

### Kategori Steering Files yang umum

| File | Isi utama |
|---|---|
| `api-standards.md` | konvensi REST, error response, autentikasi, versioning, endpoint, status HTTP |
| `testing-standards.md` | unit/integration test, mocking, coverage, library, assertion, struktur file test |
| `code-conventions.md` | penamaan variabel, direktori, urutan import, struktur komponen, anti-pattern |
| `security-policies.md` | autentikasi, validasi, sanitasi input, SQL Injection, XSS, coding aman |
| `deployment-workflow.md` | build, environment variables, deployment, rollback, CI/CD, troubleshooting |

### Checklist review Steering

- [ ] Satu file memiliki satu tanggung jawab.
- [ ] Nama file mudah dipahami.
- [ ] Aturan memiliki alasan yang jelas.
- [ ] Tersedia contoh konkret.
- [ ] Tidak ada rahasia atau data sensitif.
- [ ] Semua referensi file masih valid.
- [ ] Perubahan telah direview.

---

## 3. Refactoring dengan Kiro (5.3)

Kode yang berjalan belum tentu berkualitas. **Refactoring** adalah perbaikan struktur internal kode tanpa mengubah perilaku eksternalnya.

Tujuannya antara lain:

- meningkatkan keterbacaan;
- mengurangi kompleksitas;
- memudahkan testing;
- mengurangi risiko technical debt;
- membuat kode lebih mudah dipelihara developer lain.

### Instruksi refactoring harus spesifik

Permintaan “rapikan kode” terlalu ambigu. Berikan target desain yang jelas, misalnya:

- terapkan **Single Responsibility Principle (SRP)**;
- pisahkan validasi dari penyimpanan data;
- pecah fungsi besar menjadi fungsi kecil yang fokus;
- pertahankan perilaku eksternal;
- tambahkan atau jalankan test setelah perubahan.

### Single Responsibility Principle

SRP adalah salah satu prinsip SOLID. Sebuah kelas atau fungsi seharusnya memiliki **satu alasan untuk berubah**.

Fungsi yang sekaligus melakukan validasi, kalkulasi, dan penyimpanan akan rapuh. Lebih baik memisahkan tanggung jawabnya menjadi komponen/fungsi yang lebih kecil dan mudah diuji.

### Nama yang mengungkapkan niat

Kode juga merupakan sarana komunikasi antarmanusia. Nama seperti `x`, `data1`, atau `temp` memaksa pembaca mengingat konteks. Gunakan nama yang menjelaskan tujuan, misalnya:

- `userRegistrationDate` daripada `d`;
- `totalOrderAmount` daripada `x`;
- `activeUserAccounts` daripada `list`.

### Checklist refactoring aman

1. Pahami perilaku aplikasi saat ini.
2. Tentukan masalah struktur yang ingin diperbaiki.
3. Berikan instruksi spesifik ke Kiro.
4. Tinjau diff/perubahan yang dihasilkan.
5. Jalankan test sebelum dan sesudah refactoring.
6. Pastikan kontrak eksternal tidak berubah.
7. Periksa readability dan maintainability.

---

## 4. Latihan testing dengan Kiro IDE (5.4)

Setelah kode berjalan dan mudah dibaca, Kiro dapat membantu membuat skenario pengujian. Materi menggunakan unit test sederhana dengan `console.assert` agar konsep actual result dan expected result mudah dipahami.

### Alur latihan

1. Buka `app.js`.
2. Buka panel Chat.
3. Referensikan current file menggunakan simbol `#`.
4. Minta Kiro membuat pengujian untuk fungsi penyimpanan task dengan:
   - input normal;
   - input negatif atau tidak valid.
5. Simpan hasil test, misalnya dalam `test.js`.
6. Tambahkan pemanggilan `test.js` setelah `app.js` di `index.html`:

```html
<script src="app.js"></script>
<script src="test.js"></script>
```

7. Buka aplikasi di browser.
8. Tekan `F12` atau `Fn+F12`.
9. Pilih tab **Console** dan periksa hasil assertion.

### Batasan pendekatan `console.assert`

Metode ini baik untuk memahami logika fungsi dan menjadi smoke test sederhana. Namun, ia tidak cukup untuk menjamin seluruh aplikasi siap digunakan.

Jenis pengujian yang diperkenalkan:

- **Unit test:** menguji bagian terkecil, misalnya fungsi.
- **Service/integration test:** menguji interaksi antarkomponen atau layanan.
- **UI test:** menguji perilaku aplikasi dari sudut pandang pengguna.

Unit test adalah fondasi, tetapi proyek besar perlu strategi pengujian yang lebih lengkap dan seimbang sesuai konsep Test Pyramid.

---

## 5. Latihan membuat dokumentasi aplikasi (5.5)

Kode berisi logika, sedangkan dokumentasi menjelaskan maksud dan cara menggunakan logika tersebut. Dokumentasi menjadi jembatan antara intensi desain awal dan pemeliharaan di masa depan.

### README sebagai wajah repository

README yang baik setidaknya menjawab:

- Apa proyek ini?
- Bagaimana cara memasang dan menjalankannya?
- Bagaimana struktur foldernya?
- Teknologi apa yang digunakan?
- Bagaimana cara berkontribusi?

### Alur membuat README dengan Kiro

1. Buka Chat dalam **Vibe Mode**.
2. Tambahkan konteks `#codebase`.
3. Minta Kiro bertindak sebagai Senior Technical Writer.
4. Minta struktur README yang mencakup:
   - judul dan deskripsi singkat;
   - fitur utama berdasarkan codebase;
   - instalasi dan cara menjalankan;
   - struktur folder;
   - teknologi yang digunakan;
   - Markdown rapi tanpa ikon.
5. Tinjau hasil yang dibuat Kiro.
6. Koreksi perintah dan instruksi yang tidak sesuai fakta.

### Waspada halusinasi dokumentasi

AI dapat menyarankan `npm install` walaupun proyek sebenarnya hanya HTML statis tanpa dependensi Node.js. Karena itu, dokumentasi yang dihasilkan AI harus dibandingkan dengan codebase nyata:

- periksa `package.json` sebelum menulis perintah npm;
- periksa entry point sebenarnya;
- uji instruksi instalasi dan run;
- hapus klaim fitur yang tidak ada;
- pastikan struktur folder sesuai repository.

### Tantangan opsional

Buat `CONTRIBUTING.md` yang menjelaskan aturan Pull Request, coding style, dan etika komunikasi proyek.

---

## 6. Rangkuman modul (5.6)

Modul menggabungkan empat kebiasaan engineering untuk menjaga kualitas dalam jangka panjang:

1. **Steering yang terstandardisasi** — konteks Kiro harus fokus, deskriptif, memiliki alasan, contoh, aman, dan dirawat.
2. **Refactoring terarah** — perbaiki struktur tanpa mengubah perilaku; gunakan SRP dan nama yang mengungkapkan niat.
3. **Testing** — gunakan unit test untuk memvalidasi fungsi; pahami bahwa smoke test sederhana bukan pengganti strategi testing lengkap.
4. **Dokumentasi yang diverifikasi** — README harus menjelaskan proyek berdasarkan codebase nyata, bukan asumsi AI.

### Siklus kualitas

```text
Steering yang jelas
        ↓
Implementasi dan refactoring terarah
        ↓
Testing
        ↓
Review hasil dan codebase
        ↓
Dokumentasi akurat
        ↓
Pemeliharaan berkala
```

---

## 7. Kuis modul (5.7)

### Aturan

- Jumlah soal: **4**.
- Nilai kelulusan: **75%**.
- Durasi: **5 menit**.
- Jika belum memenuhi syarat, percobaan ulang tersedia setelah jeda **1 menit**.

### Checklist belajar sebelum mengerjakan

- [ ] Dapat menjelaskan enam prinsip Steering Files.
- [ ] Dapat membedakan refactoring dari perubahan perilaku.
- [ ] Memahami SRP dan alasan memecah fungsi besar.
- [ ] Dapat menjelaskan actual result vs expected result.
- [ ] Mengetahui perbedaan unit, integration/service, dan UI test.
- [ ] Memahami README harus diverifikasi terhadap codebase.
- [ ] Mengetahui risiko halusinasi perintah instalasi oleh AI.

Pada sesi dokumentasi ini halaman kuis sudah dibaca sampai aturan lengkapnya. Tidak ada hasil submit baru yang dicatat, sehingga kuis sebaiknya dikerjakan dengan pemahaman dari checklist di atas dan hasilnya dicatat setelah selesai.

---

## 8. Ringkasan satu halaman

| Konsep | Inti |
|---|---|
| Technical debt | Kerumitan yang menumpuk dan membuat perubahan makin mahal/berisiko |
| Steering Files | Buku panduan persisten untuk mengarahkan Kiro |
| Single Responsibility | Satu fungsi/kelas memiliki satu alasan untuk berubah |
| Refactoring | Memperbaiki struktur internal tanpa mengubah perilaku eksternal |
| Intention-revealing names | Nama variabel menjelaskan tujuan dan mengurangi beban kognitif |
| Unit test | Menguji unit terkecil seperti fungsi |
| Smoke test | Pemeriksaan dasar; berguna tetapi bukan jaminan kualitas menyeluruh |
| README | Dokumentasi utama yang menjelaskan proyek, setup, dan penggunaan |
| Human review | Developer memvalidasi hasil AI terhadap codebase dan kebutuhan nyata |

## Kesimpulan

Kiro paling berguna ketika bekerja di dalam sistem engineering yang disiplin. Steering menyediakan konteks, refactoring menjaga struktur, testing memeriksa perilaku, dan dokumentasi menjaga pengetahuan proyek tetap dapat diwariskan.

AI boleh membantu menulis kode, test, dan dokumen, tetapi developer tetap harus memverifikasi ketiganya. Kualitas proyek tidak ditentukan oleh seberapa cepat AI menghasilkan output, melainkan oleh seberapa baik manusia memberi konteks, meninjau hasil, dan memelihara sumber kebenaran.

## Sumber belajar

- [Pengantar Praktik Terbaik dan Menjaga Kualitas Kode (5.1)](https://www.dicoding.com/academies/929/tutorials/47690)
- [Standardisasi Berkas Steering (5.2)](https://www.dicoding.com/academies/929/tutorials/47693)
- [Refactoring dengan Kiro (5.3)](https://www.dicoding.com/academies/929/tutorials/47696)
- [Latihan Testing dengan Kiro (5.4)](https://www.dicoding.com/academies/929/tutorials/47699)
- [Latihan Dokumentasi Aplikasi (5.5)](https://www.dicoding.com/academies/929/tutorials/47702)
- [Rangkuman Modul (5.6)](https://www.dicoding.com/academies/929/tutorials/47705)
- [Kuis Modul (5.7)](https://www.dicoding.com/academies/929/tutorials/47708)
