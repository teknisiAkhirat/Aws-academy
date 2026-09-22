# Materi Inti — Spec-Driven Development (SDD) dan Kiro

> Catatan inti yang diekstrak dari materi sumber. Fokus pada konsep yang relevan untuk pembelajaran dan praktik engineering.

## 1. Code-First Development

**Code-First** adalah pendekatan tradisional di mana developer langsung menulis kode setelah memperoleh gambaran kasar mengenai fitur.

Ciri utama:
- Fokus awal pada membuat fitur segera berjalan.
- Dokumentasi sering dibuat belakangan.
- Dokumentasi bahkan dapat terabaikan sampai proyek selesai.

## 2. Spec-Driven Development (SDD)

**Spec-Driven Development (SDD)** membalik alur tersebut: spesifikasi ditulis terlebih dahulu sebelum implementasi.

Dalam SDD:
1. Tentukan dan tulis spesifikasi.
2. Deskripsikan perilaku sistem.
3. Tentukan data yang masuk dan keluar.
4. Gunakan format yang jelas dan terstruktur, misalnya Markdown atau YAML.
5. Setelah spesifikasi matang, implementasi kode dilakukan, sering kali dengan bantuan AI.

### Single Source of Truth

Spesifikasi bukan sekadar dokumentasi pasif. Spesifikasi menjadi **single source of truth (kebenaran tunggal)**.

Artinya:
- Kode harus mengikuti spesifikasi.
- Spesifikasi menjadi acuan tim.
- Spesifikasi juga menjadi instruksi utama bagi AI ketika menghasilkan kode.

## 3. SDD dalam Era Generative AI

SDD merupakan pola pikir di mana spesifikasi menjadi fondasi yang menggerakkan pembuatan kode secara otomatis.

Spesifikasi dapat berfungsi seperti **prompt besar** yang memberikan konteks lengkap kepada AI.

Tanpa spesifikasi yang jelas, Vibe Coding memiliki risiko lebih tinggi menghasilkan kode yang:
- terlihat benar secara sintaksis,
- tetapi tidak sesuai kebutuhan aplikasi,
- atau tidak memenuhi ekspektasi perilaku sistem.

Karena itu, spesifikasi menjadi fondasi untuk membuat penggunaan AI dalam software engineering lebih terarah.

## 4. Tiga Tingkatan Implementasi SDD

SDD memiliki spektrum penerapan. Tiga tingkatan utama yang dijelaskan dalam materi adalah:

### 4.1 Spec-First

Ini merupakan tingkat dasar SDD.

Alurnya:
- Spesifikasi yang matang ditulis terlebih dahulu.
- Spesifikasi digunakan dalam workflow yang dibantu AI.
- AI menghasilkan kode awal.

Fokus utamanya adalah menyelesaikan tugas saat itu. Setelah kode selesai dan berjalan, spesifikasi bisa saja tidak diperbarui lagi.

**Gambaran:** seperti membuat sketsa sebelum melukis; sketsa membantu proses awal, tetapi hasil akhir menjadi fokus utama.

### 4.2 Spec-Anchored

Pada tingkat ini, spesifikasi tetap disimpan dan dirawat setelah tugas awal selesai.

Spesifikasi menjadi **jangkar (anchor)** bagi evolusi dan pemeliharaan fitur.

Ketika kebutuhan berubah:
1. Perbarui spesifikasi terlebih dahulu.
2. Gunakan spesifikasi baru sebagai acuan.
3. Modifikasi kode agar mengikuti spesifikasi tersebut.

Tujuannya menjaga dokumentasi tetap hidup dan relevan dengan kondisi kode terkini.

### 4.3 Spec-as-Source

Ini merupakan bentuk paling murni dari SDD.

Spesifikasi diperlakukan sebagai **berkas sumber utama** selama siklus hidup proyek.

Dalam pendekatan ini:
- Developer menyunting spesifikasi.
- Implementasi kode dihasilkan berdasarkan spesifikasi.
- Developer tidak secara langsung menyunting kode implementasi sebagai sumber utama.

## 5. Tantangan Penerapan SDD

### 5.1 Spec Drift

**Spec Drift** adalah penyimpangan antara spesifikasi dan kode.

Contohnya:
- Developer mengubah kode secara langsung.
- Spesifikasi tidak ikut diperbarui.
- Spesifikasi akhirnya menjadi usang.

Risikonya, ketika AI kemudian diminta memperbarui fitur berdasarkan spesifikasi lama, perubahan manual yang tidak tercatat dapat tertimpa atau hilang.

### 5.2 Ilusi Kompetensi AI

AI dapat menghasilkan kode yang terlihat benar dan rapi dengan sangat cepat.

Namun:

> Kode yang terlihat benar belum tentu benar-benar berfungsi sesuai kebutuhan.

Developer tetap perlu:
- memahami kode yang dihasilkan,
- melakukan verifikasi,
- memeriksa keamanan,
- memeriksa efisiensi,
- memastikan implementasi sesuai spesifikasi.

### 5.3 Investasi Waktu untuk Verifikasi dan Refleksi

SDD mengubah beban kerja developer.

Developer tidak hanya mengarahkan AI, tetapi juga harus:
- memeriksa hasil kerja AI,
- merefleksikan apakah spesifikasi sudah cukup jelas,
- menyempurnakan spesifikasi,
- melakukan siklus verifikasi dan perbaikan secara berulang.

Proses ini dapat terasa lebih lambat pada awalnya, tetapi diperlukan untuk menjaga kualitas jangka panjang.

## 6. Kiro — AI Agentic IDE

**Kiro** adalah IDE berbasis AI yang mengubah instruksi bahasa natural menjadi kode, pengujian, dan dokumentasi.

Kiro dirancang untuk:
- memfasilitasi Spec-Driven Development,
- meningkatkan produktivitas developer,
- mendukung pengembangan berbasis spesifikasi.

## 7. Inti Pembelajaran

Dari materi ini, prinsip yang paling penting untuk dibawa ke praktik engineering:

1. **Jangan langsung menjadikan kode sebagai titik awal.**
2. **Tulis spesifikasi sebelum implementasi.**
3. **Perlakukan spesifikasi sebagai sumber kebenaran.**
4. **Semakin tinggi tingkat SDD, semakin kuat hubungan antara spec dan kode.**
5. **Hindari Spec Drift dengan memperbarui spec sebelum mengubah implementasi.**
6. **Jangan menganggap kode hasil AI otomatis benar.**
7. **Verifikasi hasil AI adalah bagian dari pekerjaan developer.**
8. **Gunakan AI berdasarkan konteks dan spesifikasi yang jelas.**
9. **Refleksi dan penyempurnaan spec merupakan siklus berkelanjutan.**
10. **Kiro merupakan salah satu IDE AI yang dirancang untuk workflow Spec-Driven Development.**

## 8. Alur Praktis yang Dapat Diingat

```text
Kebutuhan
   ↓
Spesifikasi
   ↓
Verifikasi spesifikasi
   ↓
AI / Developer
   ↓
Implementasi
   ↓
Testing & Verifikasi
   ↓
Refleksi
   ↓
Perbarui spesifikasi bila diperlukan
   ↓
Iterasi
```

## Sumber

Materi berasal dari modul:

**Spec-Driven Development dengan Kiro — Dicoding**

Bagian sumber yang diringkas:
- Code-First Development
- Spec-Driven Development
- Tingkatan Implementasi SDD
- Tantangan Penerapan SDD
- Kiro: AI Agentic IDE
- Rangkuman Pengenalan Spec-Driven Development dan Kiro
