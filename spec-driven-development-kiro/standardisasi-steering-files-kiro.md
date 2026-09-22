# Standardisasi Steering Files Kiro

> Ringkasan materi inti dengan analogi **thalibul ‘ilmi**. Analogi hanya untuk membantu memahami konsep teknis.

## 1. Steering Files = Buku Panduan untuk Kiro

Materi menggambarkan Kiro seperti seorang insinyur perangkat lunak yang cerdas tetapi baru masuk ke sebuah tim.

Kiro mungkin mampu memahami bahasa pemrograman, tetapi belum otomatis mengetahui:
- gaya penulisan kode tim;
- standar keamanan;
- struktur direktori proyek;
- aturan dan kebiasaan khusus proyek.

**Steering Files** berfungsi sebagai buku panduan yang memberi Kiro instruksi mengenai hal-hal tersebut.

Prinsip pentingnya:

> **Kualitas bantuan Kiro berbanding lurus dengan kualitas instruksi yang diberikan.**

Menulis Steering Files bukan sekadar menyalin dokumentasi. Isinya harus berupa instruksi yang dioptimalkan agar dapat dipahami mesin secara efektif.

## 2. Enam Prinsip Fundamental Steering Files

### 1. Fokus — Single Responsibility
Setiap berkas Steering harus membahas **satu topik spesifik**.

Jangan mencampur panduan desain API dengan prosedur testing dalam satu dokumen.

Tujuannya agar Kiro mendapatkan konteks yang relevan dan tidak terganggu informasi yang tidak berkaitan.

**Analogi thalibul ‘ilmi:** satu pembahasan sebaiknya memiliki fokus yang jelas sehingga pelajaran tidak tercampur dengan pembahasan lain.

### 2. Nama yang Deskriptif
Nama file harus langsung menjelaskan isinya.

Contoh: `components-form-validation.md` lebih jelas daripada `forms.md`.

Nama yang deskriptif membantu manusia dan Kiro memahami tujuan dokumen tanpa harus membukanya terlebih dahulu.

### 3. Sertakan Konteks “Mengapa”
Jangan hanya menjelaskan **apa aturannya**, tetapi juga **mengapa aturan tersebut dibuat**.

Penjelasan alasan membantu Kiro memahami konteks arsitektur sehingga aturan dapat diterapkan secara lebih tepat pada kasus baru.

**Analogi thalibul ‘ilmi:** bukan hanya mengetahui sebuah aturan dalam pembahasan, tetapi memahami konteks pembahasannya agar tidak salah menerapkan pada keadaan yang berbeda.

### 4. Beri Contoh Konkret
Instruksi abstrak dapat membingungkan AI.

Karena itu, sertakan contoh nyata, terutama:
- code snippet;
- contoh **Sebelum** yang salah;
- contoh **Sesudah** yang benar.

Contoh konkret membantu mengkalibrasi pemahaman Kiro terhadap standar coding yang diinginkan.

### 5. Protokol Keamanan Nol Toleransi
Jangan pernah memasukkan ke Steering Files:
- API key;
- password;
- access token;
- data pelanggan sensitif.

Steering Files harus diperlakukan sebagai dokumen yang berpotensi dibagikan atau diproses pihak ketiga.

**Prinsip:** keamanan harus dijaga secara ketat.

### 6. Pemeliharaan Berkala
Aturan proyek dapat berubah.

Review Steering Files ketika:
- melakukan perencanaan sprint;
- mengubah arsitektur;
- merestrukturisasi folder.

Pastikan referensi file tetap valid.

Perubahan Steering Files harus diperlakukan serius seperti perubahan pada kode produksi dan melalui review sebelum digabungkan ke repository utama.

## 3. Struktur Steering Files yang Umum

Materi memberikan beberapa kategori Steering Files yang dapat digunakan untuk mempercepat inisiasi proyek.

### `api-standards.md`
- konvensi REST;
- format error response;
- autentikasi;
- versioning;
- penamaan endpoint;
- HTTP status code;
- struktur request/response JSON.

### `testing-standards.md`
- pola unit test;
- strategi integration test;
- mocking;
- code coverage;
- testing libraries;
- assertion styles;
- struktur file test.

### `code-conventions.md`
- penamaan variabel;
- struktur direktori;
- urutan import;
- contoh struktur komponen;
- anti-pattern yang harus dihindari Kiro.

### `security-policies.md`
- persyaratan autentikasi;
- validasi data;
- sanitasi input;
- pencegahan kerentanan umum seperti SQL Injection dan XSS;
- praktik coding aman yang sesuai dengan tech stack.

### `deployment-workflow.md`
- proses build;
- konfigurasi environment variables;
- deployment;
- rollback;
- CI/CD pipeline;
- penanganan masalah integrasi sistem.

## 4. Prinsip yang Perlu Diingat

**Fokus → Jelaskan nama → Jelaskan alasan → Berikan contoh → Jangan simpan rahasia → Review berkala**

Tujuannya adalah membuat instruksi yang:
- jelas;
- relevan;
- aman;
- mudah dipahami Kiro;
- tetap sesuai dengan kondisi proyek.

## 5. Inti Materi

Steering Files bukan sekadar tempat menyimpan dokumentasi.

Ia merupakan **instruksi persisten untuk mengarahkan cara Kiro bekerja dalam proyek**.

Analogi thalibul ‘ilmi membantu memahami prinsipnya: proses belajar membutuhkan pembahasan yang terarah, konteks yang jelas, contoh yang konkret, dan pedoman yang dijaga konsistensinya. Steering Files memberikan struktur dan batasan yang dibutuhkan AI ketika bekerja pada codebase.

Analogi tersebut hanya alat bantu pemahaman; konsep teknisnya tetap:

**Steering Files = instruksi yang terstruktur, spesifik, aman, dan dipelihara agar Kiro bekerja konsisten dengan standar proyek.**