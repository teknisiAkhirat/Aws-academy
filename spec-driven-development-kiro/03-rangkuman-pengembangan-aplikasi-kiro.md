# Rangkuman Pengembangan Aplikasi Menggunakan Kiro

> Ringkasan inti materi sumber. Fokus pada workflow berbasis tugas (**task.md**) dan kendali persisten melalui **Steering**.

## 1. Eksekusi Fitur melalui Manajemen Tugas (task.md)

Salah satu pola utama Kiro IDE adalah **task-based workflow**.

Alih-alih mengerjakan pengembangan secara tidak terarah di tengah banyaknya kode, pekerjaan dipecah menjadi komponen-komponen fungsional yang tercantum di **task.md**.

Pendekatan ini disebut **implementasi fitur secara bertahap atau inkremental**.

### Alur dasarnya

1. Fitur atau pekerjaan dipecah menjadi task.
2. Task yang diperlukan diaktifkan satu per satu.
3. Kiro menganalisis konteks proyek yang ada.
4. Implementasi dilakukan berdasarkan task tersebut.
5. Hasil langsung diverifikasi.
6. Jika hasil belum sesuai, berikan umpan balik melalui chat dan lakukan penyesuaian.

Dengan demikian, pekerjaan bergerak **task → implementasi → verifikasi → feedback → penyesuaian**.

## 2. Kiro Memahami Konteks Proyek

Ketika sebuah task diaktifkan, Kiro menganalisis konteks proyek untuk membantu memastikan fitur baru tetap selaras dengan kode yang sudah ada.

Contoh dari materi adalah implementasi fitur **CRUD (Create, Read, Update, Delete)**.

Dengan memicu task tersebut, Kiro dapat membantu menghasilkan bagian-bagian seperti:

- formulir input;
- tabel untuk menampilkan data;
- fungsi logika di sisi server.

Intinya, task menjadi instruksi kerja yang mengarahkan implementasi fitur secara bertahap.

## 3. Verifikasi dan Feedback secara Langsung

Salah satu bagian penting workflow adalah kemampuan melakukan verifikasi segera setelah Kiro menghasilkan perubahan.

Jika hasil belum sesuai ekspektasi, pengguna tidak harus membongkar kode secara manual. Feedback dapat diberikan melalui chat untuk mengarahkan penyesuaian berikutnya.

Prinsip praktisnya:

**Jalankan task → lihat hasil → verifikasi → berikan feedback → perbaiki.**

## 4. Kendali Persisten melalui Steering

**Steering** adalah mekanisme untuk memberikan pengetahuan yang persisten kepada Kiro mengenai workspace melalui berkas Markdown.

Tujuannya adalah agar aturan atau pengetahuan tertentu tidak perlu dijelaskan kembali dalam setiap percakapan.

Contohnya:

- konvensi penamaan;
- standar API;
- pola yang harus diikuti;
- pustaka yang digunakan;
- standar gaya kode.

Dengan Steering, Kiro dapat mengikuti standar yang telah ditetapkan secara lebih konsisten.

## 5. Dua Cakupan Steering

### Workspace Steering

Lokasi:

**.kiro/steering/**

Berada di akar proyek dan bersifat **spesifik untuk satu aplikasi**.

Contohnya adalah standar validasi formulir yang hanya berlaku untuk aplikasi tertentu.

### Global Steering

Lokasi:

**~/.kiro/steering/**

Berlaku untuk **semua proyek** yang dikerjakan pengguna.

Materi sumber memberikan contoh penggunaan untuk standar gaya kode pribadi atau tim.

## 6. Analogi Thalibul ‘Ilmi

Untuk menjaga analogi sesuai gaya belajar yang digunakan sebelumnya:

### task.md — Seperti Pembagian Target Belajar

Seorang **thalibul ‘ilmi** tidak harus menyelesaikan seluruh kitab sekaligus. Materi dapat dipelajari bertahap sesuai bagian yang sedang dibahas.

Dalam workflow Kiro, **task.md** berfungsi sebagai daftar pekerjaan yang dipecah menjadi bagian-bagian yang dapat dikerjakan secara bertahap.

### Steering — Seperti Kaidah yang Menjaga Cara Belajar

Steering dapat dianalogikan sebagai kaidah atau pedoman belajar yang sudah ditetapkan.

Ketika pedoman tersebut bersifat khusus untuk satu kajian, analoginya seperti **Workspace Steering**.

Ketika pedoman berlaku secara umum dalam berbagai kajian, analoginya seperti **Global Steering**.

Analogi ini hanya digunakan untuk membantu memahami konsep teknis; bukan merupakan penjelasan hukum atau kaidah agama.

## 7. Pola Kerja yang Perlu Diingat

### Task-based workflow

**Pecah → Kerjakan bertahap → Verifikasi → Feedback → Sesuaikan**

### Steering

**Tetapkan aturan → Simpan secara persisten → Kiro mengikuti aturan tersebut**

### Inti Materi

Kiro tidak hanya digunakan untuk menghasilkan kode, tetapi juga untuk mengatur **bagaimana pekerjaan dilakukan**.

- **task.md** mengatur pekerjaan secara bertahap.
- **Steering** menjaga pengetahuan dan aturan tetap tersedia secara persisten.
- **Chat** menjadi sarana memberikan feedback dan penyesuaian.
- **Verifikasi langsung** memastikan hasil tidak hanya diterima begitu saja.

## Kesimpulan

Materi ini menekankan dua mekanisme penting dalam workflow Kiro:

1. **Task-based workflow** untuk menjalankan fitur secara bertahap melalui **task.md**.
2. **Steering** untuk memberikan aturan dan pengetahuan persisten melalui Markdown.

Jika digabungkan, keduanya membantu membuat proses pengembangan lebih terarah: pekerjaan dipecah menjadi task yang jelas, dikerjakan secara inkremental, hasil diverifikasi, lalu Kiro tetap mengikuti standar proyek melalui Steering.
