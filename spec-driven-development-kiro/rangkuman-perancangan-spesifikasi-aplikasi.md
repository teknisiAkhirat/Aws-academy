# Rangkuman Perancangan Spesifikasi Aplikasi — Kiro

> Ringkasan materi inti dari sumber, dengan analogi “musisi jazz” diganti menjadi analogi **thalibul ‘ilmi**. Isi teknis dipertahankan; perubahan utama hanya pada analogi dan cara penyampaiannya.

## 1. Dua Mode Kerja: Vibe dan Spec

### Mode Vibe — Seperti Thalibul ‘Ilmi Saat Mengulang Pelajaran

Mode **Vibe** bersifat eksploratif dan cepat.

Analogi yang digunakan di sini adalah seorang **thalibul ‘ilmi** yang sedang mengulang pelajaran. Ketika menemukan persoalan kecil yang jelas, ia dapat langsung menanganinya secara praktis tanpa harus membuat pembahasan panjang terlebih dahulu.

Dalam konteks Kiro, mode ini cocok untuk:

- perubahan visual yang ringan;
- memperbaiki bug sederhana;
- membuat prototipe;
- bertanya dan memahami bagian tertentu dari codebase.

Intinya: **langsung berinteraksi dengan kode untuk persoalan kecil dan eksploratif.**

### Mode Spec — Seperti Thalibul ‘Ilmi Mempelajari Bab Secara Sistematis

Mode **Spec** bersifat terstruktur dan disiplin.

Analogi ini seperti thalibul ‘ilmi yang mempelajari sebuah bab secara sistematis: memahami tujuan pembahasan, batasan, aturan yang harus diikuti, lalu mengerjakan bagian-bagiannya berdasarkan kerangka yang sudah ditetapkan.

Dalam Kiro, **Spec File menjadi sumber kebenaran utama (primary truth)** untuk pekerjaan tersebut.

Mode ini cocok untuk:

- fitur yang kompleks;
- perubahan atau perancangan database/schema;
- refactoring besar;
- menjaga konsistensi ketika pekerjaan dikerjakan bersama.

Intinya: **semakin besar dan kompleks pekerjaan, semakin penting spesifikasi yang jelas sebelum implementasi.**

## 2. Kiro Chat — Jembatan Bahasa Alami ke Codebase

Kiro Chat menjadi penghubung antara bahasa manusia dan codebase.

Dengan chat, kita dapat:

- bertanya tentang codebase;
- meminta penjelasan mengenai logika kode;
- membuat fitur;
- melakukan debugging;
- mengotomatisasi pekerjaan.

Jadi, chat bukan sekadar tempat bertanya, tetapi antarmuka untuk berinteraksi dengan konteks proyek.

## 3. Model dan Pemilihan Model

Materi sumber menjelaskan karakteristik pemilihan model di Kiro, termasuk mode **Auto** serta pertimbangan biaya dan kualitas.

Prinsip pentingnya adalah memilih model sesuai kebutuhan pekerjaan, bukan sekadar menggunakan model terbesar untuk semua tugas.

Materi sumber juga menyebut **Haiku** dalam pembahasan pemilihan model.

## 4. Context Tags

Kiro menyediakan context tags untuk memberikan konteks yang tepat kepada AI.

Tag yang dibahas:

- `#Files`
- `#Codebase`
- `#Folder`
- `#Current File`
- `#Docs`
- `#Spec`

Penggunaan konteks yang tepat membantu AI memahami bagian proyek yang memang relevan dengan pekerjaan.

## 5. Hindari Prompt yang Ambigu

Prompt yang menggunakan kata-kata subjektif atau terlalu umum dapat menghasilkan interpretasi yang berbeda.

Contohnya, kata seperti:

- “bagus”;
- “rapi”;
- “modern”;
- “optimal”;

perlu diperjelas dengan kriteria yang dapat dipahami dan diuji.

Struktur prompt yang disarankan:

### Role
Jelaskan peran AI.

### Task
Jelaskan pekerjaan yang harus dilakukan.

### Constraints
Jelaskan batasan dan aturan yang harus dipatuhi.

Dengan demikian, instruksi menjadi lebih terukur dan mengurangi ambiguitas.

## 6. Kiro Specs sebagai Living Blueprint

Kiro Specs dapat dipandang sebagai **blueprint yang hidup** untuk pengembangan aplikasi.

Spesifikasi berfungsi sebagai **Single Source of Truth** sehingga arah implementasi tidak hanya bergantung pada percakapan sesaat.

Keuntungannya:

- konteks pekerjaan lebih fokus;
- kebutuhan fitur lebih jelas;
- implementasi dapat mengikuti dokumen yang sama;
- perubahan dapat dilacak melalui spesifikasi.

Formatnya menggunakan Markdown.

## 7. Komponen Utama Spec

### User Stories

Menjelaskan kebutuhan dari sudut pandang pengguna dan apa yang ingin dicapai.

### Tech Stack & Constraints

Menentukan teknologi yang digunakan serta batasan yang harus diperhatikan.

### Business Rules

Menjelaskan aturan bisnis yang harus dipatuhi oleh aplikasi.

Ketiga bagian tersebut membantu mengubah kebutuhan yang masih umum menjadi instruksi yang lebih konkret untuk implementasi.

## 8. Prinsip Praktis untuk Workflow

Gunakan pendekatan sesuai skala pekerjaan:

**Pekerjaan kecil → Vibe**

Gunakan ketika perlu eksplorasi cepat, perubahan ringan, debugging sederhana, atau memahami bagian tertentu dari codebase.

**Pekerjaan besar → Spec**

Gunakan ketika menyentuh fitur kompleks, database, refactoring besar, atau pekerjaan yang membutuhkan konsistensi.

### Kesimpulan

Kiro menyediakan dua pola kerja yang saling melengkapi:

1. **Vibe** untuk eksplorasi dan perubahan cepat.
2. **Spec** untuk pekerjaan yang terstruktur dan kompleks.

Analogi thalibul ‘ilmi membantu membedakan keduanya: persoalan kecil dapat ditangani secara langsung ketika konteksnya sudah jelas, sedangkan pembahasan yang besar membutuhkan kerangka, batasan, dan urutan yang lebih sistematis.

Tujuan akhirnya bukan sekadar membuat AI menulis kode, tetapi membuat **AI bekerja berdasarkan konteks, spesifikasi, dan batasan yang jelas**.
