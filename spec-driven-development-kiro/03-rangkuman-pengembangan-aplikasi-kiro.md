# Modul 4 — Pengembangan Aplikasi Menggunakan Kiro

> Catatan belajar dari tutorial Dicoding **Spec-Driven Development dengan Kiro**, mulai tutorial 4.2 sampai 4.11. Materi diparafrasekan untuk dokumentasi belajar pribadi, bukan salinan mentah.

## Tujuan modul

Modul ini menerapkan alur **Spec-Driven Development (SDD)** secara praktis menggunakan Kiro Agentic IDE untuk membangun TodoList App. Siklusnya meliputi:

1. menyiapkan struktur proyek;
2. memberi konteks melalui Steering;
3. mengeksekusi pekerjaan secara bertahap melalui `task.md`;
4. memverifikasi hasil;
5. memperbarui requirement/design ketika kebutuhan berubah;
6. menghasilkan task baru dari perubahan spesifikasi;
7. menguji kembali aplikasi.

---

## 1. Inisiasi Proyek (4.2)

**Scaffolding** adalah pembuatan fondasi awal proyek: direktori, konfigurasi environment, dependensi, dan struktur berkas. Fondasi yang rapi penting agar aplikasi tidak berubah menjadi kumpulan berkas yang sulit dirawat ketika skala membesar.

Kiro membantu mengotomatisasi setup berdasarkan teknologi yang dipilih. Dalam workflow Kiro, berkas **`task.md`** berperan sebagai kompas: berisi fitur atau modul yang perlu dibangun. Ketika task dipilih, Kiro dapat menyiapkan komponen frontend, skema data, dan rute backend sesuai konteks proyek.

### Insight engineering

- Scaffolding bukan sekadar membuat folder; ia menetapkan batas dan pola awal proyek.
- Task perlu cukup jelas agar agent dapat bekerja tanpa menebak-nebak.
- Struktur awal yang konsisten mengurangi biaya pemeliharaan dan integrasi pada tahap selanjutnya.

---

## 2. Eksekusi Fitur melalui `task.md` (4.3)

Kiro menggunakan **task-based workflow** atau implementasi inkremental. Fitur besar dipecah menjadi pekerjaan fungsional yang diselesaikan satu per satu.

Alur utamanya:

```text
Baca task → aktifkan task → Kiro memahami konteks → implementasi
→ jalankan/verifikasi → berikan feedback → lakukan penyesuaian
```

Contoh yang diberikan materi adalah fitur CRUD (Create, Read, Update, Delete). Dari task yang tepat, Kiro dapat membantu membuat form input, tampilan tabel/data, dan logika server yang diperlukan.

### Praktik penting

- Jangan menerima hasil AI tanpa verifikasi.
- Uji hasil setiap task sebelum pindah ke task berikutnya.
- Jika hasil tidak sesuai, gunakan feedback yang spesifik di chat, bukan membongkar seluruh codebase secara manual.
- Perubahan kecil yang terverifikasi lebih aman daripada satu perubahan besar yang sulit dilacak.

---

## 3. Kendali Persisten melalui Steering (4.4)

**Steering** adalah pengetahuan persisten untuk Kiro yang disimpan dalam berkas Markdown. Steering membuat aturan proyek tidak perlu dijelaskan ulang di setiap percakapan.

### Dua cakupan Steering

| Cakupan | Lokasi | Kegunaan |
|---|---|---|
| Workspace Steering | `.kiro/steering/` di akar proyek | Aturan khusus satu aplikasi, misalnya validasi form atau arsitektur proyek |
| Global Steering | `~/.kiro/steering/` | Standar yang berlaku lintas proyek, misalnya gaya kode pribadi/tim |

Jika aturan global dan workspace bertabrakan, **workspace steering diprioritaskan** karena lebih spesifik terhadap aplikasi.

### Foundation steering files

Kiro dapat membuat tiga berkas fondasi melalui panel Steering dan perintah **Generate Steering Docs**:

- **`product.md`** — tujuan produk, target pengguna, fitur utama, dan tujuan bisnis.
- **`tech.md`** — framework, library, tools, serta batasan teknis.
- **`structure.md`** — organisasi berkas, konvensi penamaan, pola import, dan keputusan arsitektur.

Berkas ini menjadi baseline konteks pada interaksi berikutnya sehingga saran Kiro lebih selaras dengan visi dan struktur aplikasi.

---

## 4. Latihan: Membuat Steering (4.5)

### Langkah praktik

1. Buka menu Kiro di navigasi kiri.
2. Buka bagian **Steering**.
3. Pilih **Generate Steering Docs**.
4. Jika Kiro meminta izin menjalankan perintah terminal, tinjau lalu izinkan hanya jika sesuai konteks.
5. Pastikan berkas hasil generate berada di `.kiro/steering/`.
6. Baca front matter YAML pada berkas steering untuk memahami kapan berkas tersebut dimuat.

### Inclusion modes

| Mode | Perilaku | Contoh penggunaan |
|---|---|---|
| **Always Included** | Selalu dimuat setiap interaksi | standar stack dan kebijakan keamanan |
| **Conditional Inclusion** | Dimuat ketika pola berkas tertentu cocok | aturan untuk `components/**/*.tsx` |
| **Manual Inclusion** | Dimuat ketika diminta memakai `#nama-berkas` | troubleshooting atau migrasi |
| **Auto Inclusion** | Kiro memuat berdasarkan kecocokan deskripsi kebutuhan | panduan yang relevan dengan pertanyaan |

**Prinsip:** semakin tepat inclusion mode, semakin kecil konteks yang tidak relevan dan semakin fokus bantuan AI.

---

## 5. Latihan: Menjalankan Task Setup Project (4.6)

Setelah konteks proyek dan Steering siap:

1. Buka `task.md`.
2. Pilih task inisialisasi proyek.
3. Klik **Start task**; status berubah menjadi `in progress`.
4. Tunggu sampai status menjadi `Task completed`.
5. Periksa berkas hasil yang membentuk struktur awal TodoList App.
6. Buka `index.html` di browser untuk melihat hasil awal.

Hasil pertama memang belum harus indah. Fokus tahap ini adalah memastikan fondasi dan struktur awal berhasil dibuat.

### Checklist verifikasi

- [ ] Task berubah menjadi selesai.
- [ ] Berkas struktur awal tersedia.
- [ ] `index.html` dapat dibuka.
- [ ] Tidak ada error dasar yang menghalangi aplikasi berjalan.

---

## 6. Latihan: Menambahkan CSS ke TodoList App (4.7)

Setelah setup selesai, pekerjaan dilanjutkan melalui task CSS pada `task.md`:

1. Buka kembali `task.md`.
2. Cari task styling.
3. Jalankan task **2.1** untuk styling awal.
4. Buka ulang `index.html` dan verifikasi perubahan visual.
5. Jalankan task **2.2** untuk styling area input.
6. Lanjutkan task CSS lain secara bertahap sampai seluruh styling selesai.

### Pelajaran

Perubahan visual juga sebaiknya inkremental. Dengan menjalankan task satu per satu, penyebab perubahan tampilan lebih mudah dipahami dan regresi lebih mudah ditemukan.

---

## 7. Latihan: Memperbaiki Logika Aplikasi (4.8)

Tampilan yang baik tidak cukup jika logika aplikasi salah. Contoh masalah yang perlu dicegah adalah tombol hapus menghapus item yang keliru atau input kosong masuk ke daftar.

SDD mengarahkan perbaikan logika melalui **kejelasan niat**:

1. Buka `requirements.md`.
2. Temukan requirement pertama tentang deskripsi tugas.
3. Identifikasi celah: belum ada batas minimal/maksimal karakter.
4. Di chat Kiro, gunakan **Spec Mode** untuk meminta perubahan requirement berupa validasi minimal 3 dan maksimal 50 karakter.
5. Tinjau perubahan pada `requirements.md`.
6. Lanjutkan ke design phase dan tinjau `design.md`.
7. Buka `tasks.md`, pilih **Update tasks**.
8. Cari task baru terkait validasi karakter.
9. Jalankan task tersebut.
10. Uji TodoList App dengan input valid, input terlalu pendek, dan input terlalu panjang.

### Insight penting

Jika perilaku aplikasi tidak sesuai, penyebabnya bisa berupa requirement ambigu atau instruksi implementasi yang kurang detail. Perbaiki spesifikasi lebih dahulu, lalu biarkan task baru diturunkan dari spesifikasi tersebut. Ini mencegah **spec drift**.

---

## 8. Latihan: Mempercantik UI dengan Neobrutalism (4.9)

Latihan ini mengubah desain TodoList App menjadi gaya **Neobrutalism**, yang ditandai oleh:

- warna kontras;
- border hitam tebal;
- hard shadow atau bayangan hitam yang kaku;
- tampilan berani dan modern.

### Workflow yang benar

1. Jangan langsung mengedit CSS sebagai titik awal.
2. Buka chat Kiro dalam **Spec Mode**.
3. Perbarui blueprint visual pada `design.md` dengan menjelaskan konsep Neobrutalism, border, hard shadow, dan palet warna.
4. Tinjau definisi variabel warna serta aturan komponen pada `design.md`.
5. Buka `tasks.md` dan pilih **Update tasks**.
6. Jalankan task redesign yang baru dibuat.
7. Buka aplikasi dan verifikasi hasil visual.

### Pelajaran

Perubahan desain berskala besar menjadi lebih cepat dan konsisten jika dimulai dari design spec. AI tidak hanya diminta “membuat tampilan bagus”, tetapi diberi konsep visual yang dapat diturunkan menjadi aturan dan task konkret.

---

## 9. Rangkuman modul (4.10)

Dua mekanisme utama modul ini adalah:

1. **`task.md`** mengatur pekerjaan secara bertahap dan inkremental.
2. **Steering** menyimpan pengetahuan serta aturan proyek secara persisten.

Keduanya membentuk siklus:

```text
Konteks + Steering → task → implementasi → verifikasi → feedback
→ perubahan spec bila perlu → update tasks → implementasi ulang
```

Kiro bukan hanya generator kode. Kiro menjadi lebih efektif ketika developer menyediakan konteks, spesifikasi yang jelas, batasan yang aman, serta feedback berbasis hasil pengujian.

---

## 10. Kuis modul (4.11)

### Aturan yang dibaca

- Jumlah soal: **4**.
- Nilai kelulusan: **75%**.
- Durasi: **5 menit**.
- Jika belum lulus, tersedia jeda **1 menit** sebelum percobaan ulang.

### Status akun saat dokumentasi

Riwayat kuis pada My Browser menunjukkan:

- **100% — Lulus** pada 20 Sep 2026 02:36.
- **75% — Lulus** pada 20 Sep 2026 02:32.

Karena kuis sudah lulus dengan nilai 100%, tidak dilakukan submit ulang. Dokumentasi ini mencatat status hasil dan konsep yang harus dikuasai, bukan menggantikan proses evaluasi akun.

### Checklist persiapan kuis

- [ ] Pahami perbedaan workspace dan global Steering.
- [ ] Ingat fungsi `task.md` sebagai daftar pekerjaan inkremental.
- [ ] Ingat urutan perubahan requirement → design → update tasks → implementasi → pengujian.
- [ ] Pahami bahwa verifikasi dan feedback developer tetap wajib.
- [ ] Ketahui alasan memperbarui spesifikasi sebelum mengubah kode.

---

## 11. Ringkasan satu halaman

| Konsep | Inti yang perlu diingat |
|---|---|
| Scaffolding | Membuat fondasi direktori, konfigurasi, dan dependensi proyek |
| `task.md` | Memecah fitur menjadi task yang dapat dikerjakan bertahap |
| Task-based workflow | Task → implementasi → verifikasi → feedback → penyesuaian |
| Workspace Steering | Aturan khusus satu proyek di `.kiro/steering/` |
| Global Steering | Aturan lintas proyek di `~/.kiro/steering/` |
| Inclusion modes | Mengatur kapan Steering dimuat |
| Spec Mode | Memperbarui requirement/design sebelum implementasi |
| Update tasks | Menurunkan perubahan spesifikasi menjadi pekerjaan baru |
| Human-in-the-loop | Developer meninjau, menguji, dan mengarahkan hasil AI |
| Spec drift | Ketidaksesuaian antara spesifikasi dan implementasi |

## Kesimpulan

Workflow Kiro yang efektif bukan “meminta AI menulis semua kode”. Workflow yang benar adalah menyediakan spesifikasi dan konteks yang dapat dipahami, memecah pekerjaan menjadi task kecil, menjalankan task secara bertahap, menguji hasil, lalu memperbarui spesifikasi ketika kebutuhan berubah.

Dengan pola ini, AI membantu implementasi tanpa mengambil alih tanggung jawab engineering: developer tetap bertanggung jawab atas requirement, keputusan desain, keamanan, pengujian, dan kualitas akhir aplikasi.

## Sumber belajar

- [Tutorial posisi awal: Inisiasi Proyek (4.2)](https://www.dicoding.com/academies/929/tutorials/47660?from=47657)
- [Eksekusi Fitur melalui task.md (4.3)](https://www.dicoding.com/academies/929/tutorials/47663)
- [Kendali Persisten melalui Steering (4.4)](https://www.dicoding.com/academies/929/tutorials/47666)
- [Latihan Membuat Steering (4.5)](https://www.dicoding.com/academies/929/tutorials/47669)
- [Latihan Task Setup Project (4.6)](https://www.dicoding.com/academies/929/tutorials/47672)
- [Latihan CSS TodoList (4.7)](https://www.dicoding.com/academies/929/tutorials/47675)
- [Latihan Memperbaiki Logika (4.8)](https://www.dicoding.com/academies/929/tutorials/47678)
- [Latihan Neobrutalism UI (4.9)](https://www.dicoding.com/academies/929/tutorials/47681)
- [Rangkuman Modul (4.10)](https://www.dicoding.com/academies/929/tutorials/47684)
- [Kuis Modul (4.11)](https://www.dicoding.com/academies/929/tutorials/47687)
