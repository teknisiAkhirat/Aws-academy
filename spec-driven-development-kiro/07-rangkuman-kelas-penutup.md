# Rangkuman Kelas — Penutup Spec-Driven Development dengan Kiro

> Catatan belajar dari tutorial **Rangkuman Kelas (6.1)** Dicoding. Dokumen ini merangkum seluruh konsep utama kelas: SDD, Kiro, perancangan spesifikasi, workflow task, Steering, refactoring, testing, dan dokumentasi.

## 1. Code-First vs Spec-Driven Development

### Code-First

Dalam pendekatan tradisional **Code-First**, developer langsung menulis kode setelah memperoleh gambaran kasar fitur. Prioritasnya adalah membuat fitur berjalan terlebih dahulu. Dokumentasi sering dibuat belakangan atau bahkan terabaikan.

Risikonya:

- kebutuhan belum jelas ketika implementasi dimulai;
- kode mudah menyimpang dari tujuan bisnis;
- AI/developer harus menebak konteks;
- dokumentasi dan kode dapat tidak sinkron.

### Spec-Driven Development (SDD)

**SDD** membalik urutan tersebut: spesifikasi ditulis dan diverifikasi sebelum implementasi. Spec menjelaskan perilaku sistem, input, output, batasan, dan aturan bisnis dalam format yang terstruktur seperti Markdown atau YAML.

Dalam SDD, spesifikasi menjadi **single source of truth**:

- kode mengikuti spesifikasi;
- tim mengacu pada spesifikasi yang sama;
- AI menggunakan spesifikasi sebagai instruksi utama;
- perubahan kebutuhan dimulai dari pembaruan spesifikasi.

Pada era Generative AI, spec dapat dipandang sebagai prompt besar yang menyediakan konteks penuh. Tanpa spec, Vibe Coding berisiko menghasilkan fungsi yang benar secara sintaksis tetapi salah secara kebutuhan.

---

## 2. Tiga tingkat penerapan SDD

### 2.1 Spec-First

Spesifikasi dibuat sebelum tugas dimulai dan digunakan untuk menghasilkan kode awal. Fokusnya adalah menyelesaikan pekerjaan saat itu. Setelah kode berjalan, spec mungkin tidak dirawat lagi.

**Analogi:** sketsa sebelum melukis; membantu tahap awal, tetapi hasil akhir menjadi fokus utama.

### 2.2 Spec-Anchored

Spesifikasi tetap disimpan dan dirawat setelah implementasi awal. Spec menjadi jangkar evolusi dan pemeliharaan fitur.

Ketika kebutuhan berubah:

1. perbarui spec;
2. tinjau perubahan;
3. minta AI menyesuaikan implementasi;
4. uji kesesuaian kode dengan spec baru.

### 2.3 Spec-as-Source

Ini adalah bentuk paling ketat. Spesifikasi menjadi berkas sumber utama sepanjang umur proyek. Developer menyunting spec, lalu implementasi kode dihasilkan atau diselaraskan berdasarkan spec tersebut.

### Perbandingan

| Tingkat | Perlakuan terhadap spec | Risiko utama |
|---|---|---|
| Spec-First | Dipakai terutama di awal | spec cepat usang |
| Spec-Anchored | Disimpan dan dirawat sebagai jangkar | spec drift jika developer mengubah kode langsung |
| Spec-as-Source | Menjadi sumber utama implementasi | memerlukan disiplin workflow yang tinggi |

---

## 3. Tantangan SDD

### Spec Drift

**Spec drift** adalah penyimpangan antara spesifikasi dan kode. Contohnya, developer memperbaiki kode secara langsung tetapi lupa memperbarui spec. Ketika AI diminta melakukan perubahan berdasarkan spec lama, perubahan manual dapat tertimpa.

Pencegahan:

- ubah spec sebelum kode;
- review diff spec dan implementasi;
- gunakan task yang diturunkan dari spec;
- uji hasil terhadap requirement.

### Ilusi kompetensi AI

AI dapat menghasilkan kode yang terlihat rapi dan benar dalam waktu singkat. Namun, tampilan kode bukan bukti bahwa perilakunya benar, aman, efisien, atau sesuai kebutuhan.

Developer tetap wajib:

- memahami output AI;
- melakukan review;
- menjalankan pengujian;
- memeriksa keamanan dan efisiensi;
- memastikan kesesuaian dengan spesifikasi.

### Investasi verifikasi dan refleksi

SDD mengubah peran developer. Developer bukan hanya mengarahkan AI, tetapi juga memverifikasi setiap fase, merefleksikan kualitas spec, dan memperbaikinya secara berulang.

Siklus ini mungkin terasa lebih lambat pada awalnya, tetapi penting untuk kualitas jangka panjang.

---

## 4. Kiro sebagai AI Agentic IDE

Kiro adalah IDE berbasis AI yang mengubah instruksi bahasa natural menjadi kode, pengujian, dan dokumentasi. Kiro dirancang untuk mendukung workflow SDD dan meningkatkan produktivitas berdasarkan spesifikasi.

Kiro paling efektif ketika diberikan:

- tujuan bisnis yang jelas;
- spec yang terstruktur;
- tech stack dan batasan;
- konteks codebase yang relevan;
- feedback berdasarkan hasil verifikasi.

---

## 5. Mode Vibe dan Mode Spec

### Mode Vibe — eksploratif dan cepat

Mode Vibe bekerja seperti pair programmer santai. Ia cocok untuk instruksi pendek dan eksplorasi tanpa dokumen persyaratan formal.

Gunakan untuk:

- perubahan visual ringan;
- bug sederhana;
- prototyping ide;
- bertanya tentang fungsi atau potongan kode;
- eksplorasi awal sebelum requirement matang.

Contoh kebutuhan:

- mengubah warna tombol;
- menjelaskan fungsi `reduce()`;
- membuat kerangka kasar halaman;
- memperbaiki error sederhana.

### Mode Spec — terstruktur dan disiplin

Mode Spec menggunakan dokumen spesifikasi sebagai acuan utama, bukan chat singkat. Mode ini cocok untuk:

- fitur kompleks seperti login/register;
- validasi email dan enkripsi password;
- desain skema database;
- refactoring besar;
- perubahan struktur folder;
- pemisahan business logic dan UI;
- menjaga konsistensi kerja tim.

### Cara memilih mode

| Situasi | Mode yang sesuai |
|---|---|
| Eksplorasi ide cepat | Vibe |
| Perubahan kecil dan lokal | Vibe |
| Fitur kompleks dengan aturan bisnis | Spec |
| Perubahan arsitektur | Spec |
| Perubahan yang harus konsisten lintas tim | Spec |

---

## 6. Panel Chat dan pemilihan model

Panel Chat adalah jembatan utama antara developer dan codebase. Developer dapat berinteraksi dengan bahasa natural untuk:

- bertanya tentang codebase;
- meminta penjelasan legacy code;
- menghasilkan fitur baru;
- debugging;
- otomatisasi tugas berulang.

### Model Auto

Model Auto bertindak sebagai router yang memilih model sesuai tugas. Materi merekomendasikannya ketika developer menginginkan keseimbangan kualitas, biaya, dan kemudahan penggunaan.

### Model Claude Haiku

Untuk tugas yang tidak terlalu kompleks dan membutuhkan respons cepat serta efisiensi biaya, model kelas cepat seperti Claude Haiku dapat menjadi pilihan.

### Prinsip pemilihan model

Pilih model berdasarkan:

- kompleksitas tugas;
- kebutuhan kecepatan;
- sensitivitas biaya;
- kebutuhan reasoning;
- banyaknya konteks yang perlu dianalisis.

---

## 7. Memberikan konteks dengan tag

Kiro menyediakan tag konteks menggunakan simbol `#`:

| Tag | Fungsi |
|---|---|
| `#Files` | Meminta Kiro membaca file tertentu |
| `#Codebase` | Meminta analisis seluruh proyek |
| `#Folder` | Memfokuskan analisis pada folder tertentu |
| `#Current File` | Menggunakan file yang sedang aktif |
| `#Docs` | Memberikan konteks dari dokumentasi |
| `#Spec` | Menggunakan requirements, design, dan tasks |

Contoh penggunaan:

```text
Jelaskan alur autentikasi pada #auth.ts.
```

```text
#codebase cari semua penggunaan userToken dan jelaskan alurnya.
```

### Prinsip least relevant context

Berikan konteks yang cukup, tetapi jangan memasukkan seluruh proyek jika hanya satu file yang relevan. Konteks yang tepat mengurangi noise dan membantu AI memberi jawaban lebih presisi.

---

## 8. Menulis prompt yang tidak ambigu

Kualitas instruksi memengaruhi kualitas output. Prinsipnya adalah **Garbage In, Garbage Out**: instruksi yang ambigu menghasilkan implementasi yang ambigu.

### Hindari kata sifat subjektif

Kata seperti berikut belum cukup teknis jika tidak diberi definisi:

- bagus;
- keren;
- cepat;
- modern;
- rapi.

Gantilah dengan kriteria yang dapat diperiksa, misalnya:

- waktu respons maksimal 200 ms;
- kontras warna memenuhi WCAG AA;
- border 2 px berwarna hitam;
- fungsi memiliki satu tanggung jawab;
- input minimal 3 dan maksimal 50 karakter.

### Rumus prompt efektif

#### Role

Berikan identitas dan keahlian yang relevan.

```text
Bertindak sebagai Senior Frontend Developer yang memahami React dan aksesibilitas.
```

#### Task

Jelaskan pekerjaan yang harus dilakukan secara spesifik.

```text
Buat komponen Button yang reusable.
```

#### Constraints

Tuliskan batasan yang tidak boleh dilanggar.

```text
Gunakan Tailwind CSS, jangan menambah library baru, dan pastikan dapat digunakan dengan keyboard.
```

### Template prompt

```text
Role: [peran/keahlian AI]
Task: [hasil spesifik yang harus dibuat]
Context: [file, codebase, spec, atau requirement]
Constraints: [teknologi, batasan, keamanan, aksesibilitas]
Acceptance criteria: [cara memverifikasi hasil]
```

---

## 9. Kiro Specs sebagai cetak biru hidup

Kiro Specs adalah berkas teks, biasanya Markdown, yang menjembatani ide dan eksekusi AI. Spec bukan dokumen yang ditulis sekali lalu dilupakan, melainkan dokumen hidup.

### Tiga karakteristik utama

1. **Single source of truth** — kode mengikuti spec.
2. **Konteks terfokus** — AI mengetahui batasan, teknologi, dan hasil yang diharapkan.
3. **Format Markdown yang familier** — developer dapat fokus pada logika bisnis tanpa mempelajari bahasa baru.

### Komponen spec yang baik

#### User Stories

Menjelaskan fitur dari sudut pandang pengguna.

```text
Sebagai [peran], saya ingin [fitur], agar [tujuan].
```

Contoh:

```text
Sebagai pelanggan, saya ingin melihat riwayat pesanan agar dapat melacak belanjaan.
```

#### Tech Stack dan Constraints

Menjelaskan bahan teknis yang boleh digunakan.

Contoh:

- Next.js 14 App Router;
- Tailwind CSS;
- Supabase;
- batasan library tambahan;
- persyaratan keamanan dan aksesibilitas.

#### Business Rules

Menjelaskan logika boleh/tidak boleh yang menjaga integritas aplikasi.

Contoh:

- password minimal 8 karakter;
- password harus mengandung angka;
- deskripsi task minimal 3 dan maksimal 50 karakter;
- user hanya dapat mengakses data miliknya.

---

## 10. Task-based workflow dan Steering

### Eksekusi melalui `task.md`

Kiro memecah pekerjaan menjadi task yang dapat dikerjakan bertahap:

```text
Task → implementasi → verifikasi → feedback → penyesuaian
```

Ketika task diaktifkan, Kiro menganalisis konteks proyek agar fitur tetap selaras dengan kode yang ada. Untuk CRUD, task dapat mencakup form, tabel, dan logika server.

Developer perlu memverifikasi hasil secara real-time. Jika tidak sesuai, berikan feedback melalui chat dan ulangi siklus perbaikan.

### Steering

Steering memberikan pengetahuan persisten melalui Markdown sehingga aturan tidak perlu dijelaskan ulang setiap kali.

| Jenis | Lokasi | Cakupan |
|---|---|---|
| Workspace Steering | `.kiro/steering/` | Satu aplikasi/proyek |
| Global Steering | `~/.kiro/steering/` | Semua proyek pengguna |

Workspace Steering cocok untuk aturan khusus aplikasi. Global Steering cocok untuk standar pribadi atau tim yang berlaku lintas proyek.

---

## 11. Praktik terbaik kualitas kode

### Enam prinsip Steering Files

1. **Fokus** — satu file satu topik.
2. **Nama deskriptif** — nama langsung menjelaskan isi.
3. **Konteks “mengapa”** — jelaskan alasan aturan.
4. **Contoh konkret** — gunakan Before/After dan snippet.
5. **Keamanan nol toleransi** — jangan simpan key, password, token, atau data sensitif.
6. **Pemeliharaan berkala** — review saat sprint, arsitektur, atau struktur folder berubah.

### Refactoring

Refactoring memperbaiki struktur internal tanpa mengubah perilaku eksternal. Instruksi kepada Kiro harus spesifik, misalnya menerapkan **Single Responsibility Principle (SRP)** dan Clean Code.

### Testing

Unit test membandingkan actual result dengan expected result. `console.assert` dapat menjadi latihan atau smoke test dasar, tetapi tidak menggantikan unit, integration/service, dan UI test dalam sistem yang lebih besar.

### Dokumentasi

README adalah wajah repository. README yang baik menjawab:

- apa proyek ini;
- cara instalasi dan menjalankan;
- fitur utama;
- struktur folder;
- teknologi;
- cara berkontribusi.

Dokumentasi hasil AI wajib diverifikasi terhadap codebase. Jangan menerima perintah seperti `npm install` jika proyek sebenarnya hanya HTML statis tanpa dependensi Node.js.

---

## 12. Alur kerja engineering yang direkomendasikan

```text
Kebutuhan bisnis
      ↓
User stories + business rules
      ↓
Tech stack + constraints
      ↓
Requirements / design / tasks
      ↓
Steering dan konteks yang relevan
      ↓
Implementasi bertahap melalui task
      ↓
Testing dan review manusia
      ↓
Dokumentasi dan verifikasi codebase
      ↓
Feedback / revisi spec
      ↓
Iterasi berikutnya
```

### Checklist sebelum menerima hasil AI

- [ ] Requirement sudah jelas dan tidak ambigu.
- [ ] Spec telah ditinjau manusia.
- [ ] Konteks yang diberikan relevan.
- [ ] Tech stack dan constraints dipatuhi.
- [ ] Perubahan tidak menyebabkan spec drift.
- [ ] Test dijalankan.
- [ ] Keamanan dan aksesibilitas diperiksa.
- [ ] Dokumentasi sesuai fakta codebase.
- [ ] Diff perubahan direview.

## 13. Ujian Akhir kelas

Setelah membuka **Rangkuman Kelas 6.1**, saya melanjutkan ke halaman **Ujian Akhir 6.2** agar alur modul penutup tercatat sebagai selesai.

Aturan Ujian Akhir yang ditampilkan Dicoding:

- Jumlah pertanyaan: **20 soal**.
- Nilai kelulusan: **75%**.
- Durasi: **60 menit**.
- Jika belum lulus, percobaan ulang dapat dilakukan setelah menunggu **120 menit**.

Ujian Akhir berbeda dari kuis per modul karena mencakup seluruh materi kelas. Persiapan terbaik adalah mengulang konsep SDD, Mode Vibe/Spec, prompt dan konteks, requirements/design/tasks, Steering, refactoring, testing, dokumentasi, serta verifikasi hasil AI.

## Kesimpulan

Kelas ini mengajarkan bahwa AI engineering bukan sekadar menulis prompt untuk menghasilkan kode. AI engineering yang dapat dipelihara membutuhkan spesifikasi sebagai sumber kebenaran, konteks yang tepat, task yang terstruktur, Steering yang persisten, pengujian, refactoring, dokumentasi, dan verifikasi manusia.

Kiro dapat mempercepat banyak pekerjaan, tetapi kualitas akhir tetap ditentukan oleh kemampuan developer dalam:

1. merumuskan kebutuhan;
2. menetapkan batasan;
3. memberi konteks;
4. meninjau hasil;
5. menguji perilaku;
6. memperbarui spesifikasi;
7. menjaga dokumentasi tetap sinkron.

> Peran developer dalam workflow AI bukan hanya mengarahkan, tetapi juga memverifikasi, merefleksikan, dan menyempurnakan.

## Sumber belajar

- [Rangkuman Kelas 6.1](https://www.dicoding.com/academies/929/tutorials/47711)
- [Ujian Akhir 6.2](https://www.dicoding.com/academies/929/tutorials/47714)
- [Modul 1 — Materi Inti SDD dan Kiro](https://github.com/teknisiAkhirat/Aws-academy/blob/main/spec-driven-development-kiro/01-materi-inti-sdd-dan-kiro.md)
- [Modul 4 — Pengembangan Aplikasi Menggunakan Kiro](https://github.com/teknisiAkhirat/Aws-academy/blob/main/spec-driven-development-kiro/03-rangkuman-pengembangan-aplikasi-kiro.md)
- [Modul 5 — Praktik Terbaik dan Menjaga Kualitas Kode](https://github.com/teknisiAkhirat/Aws-academy/blob/main/spec-driven-development-kiro/06-rangkuman-praktik-terbaik-kualitas-kode.md)
