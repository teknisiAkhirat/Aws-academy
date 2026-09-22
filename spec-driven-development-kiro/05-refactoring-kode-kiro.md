# 05. Refactoring Kode dengan Kiro

> Ringkasan materi inti dari tutorial Refactoring dengan Kiro. Fokus pada prinsip refactoring, instruksi yang spesifik, Single Responsibility Principle, dan penamaan kode yang deskriptif.

## 1. Apa Itu Refactoring?

**Refactoring** adalah proses memperbaiki struktur internal kode tanpa mengubah perilaku atau hasil yang terlihat oleh pengguna.

Tujuannya bukan sekadar membuat kode terlihat lebih rapi, tetapi membuat kode:

- lebih mudah dibaca;
- lebih mudah dipahami;
- lebih mudah diuji;
- lebih mudah dikembangkan;
- lebih mudah dipelihara dalam jangka panjang.

Kiro dapat membantu menemukan bagian kode yang sulit dibaca atau kurang efisien, kemudian membantu menyusun ulang kode berdasarkan instruksi yang jelas.

## 2. Instruksi Refactoring Harus Spesifik

Jangan memberikan instruksi yang terlalu umum seperti:

> "Rapikan kode ini."

Instruksi tersebut tidak menjelaskan standar atau bagian mana yang perlu diperbaiki.

Lebih baik jelaskan:

- prinsip yang ingin diterapkan;
- bagian kode yang perlu ditinjau;
- batasan perubahan;
- hasil yang diharapkan.

Dengan instruksi yang spesifik, Kiro memiliki kriteria yang lebih jelas untuk melakukan refactoring tanpa mengubah perilaku yang seharusnya tetap sama.

## 3. Single Responsibility Principle (SRP)

Salah satu prinsip penting dalam refactoring adalah **Single Responsibility Principle (SRP)**.

SRP merupakan salah satu prinsip **SOLID**. Intinya, sebuah kelas atau fungsi sebaiknya memiliki **satu alasan untuk berubah**.

### Masalah yang Sering Terjadi

Sebuah fungsi dapat menjadi terlalu besar karena menangani beberapa tanggung jawab sekaligus, misalnya:

1. melakukan validasi data;
2. menghitung nilai;
3. menyimpan data.

Fungsi seperti ini lebih sulit dipahami, diuji, dan dipelihara.

### Pendekatan Refactoring

Instruksikan Kiro untuk memecah fungsi besar menjadi beberapa fungsi yang lebih kecil dan fokus.

Contoh instruksi:

```text
Tinjau fungsi berikut dan terapkan Single Responsibility Principle.
Pecah fungsi ini menjadi beberapa fungsi kecil agar setiap bagian
hanya mengemban satu tugas spesifik.

Pisahkan, misalnya:
- logika validasi;
- logika perhitungan;
- logika penyimpanan data.

Pertahankan perilaku eksternal kode yang sudah ada.
```

Prinsipnya:

**Satu fungsi → satu tanggung jawab utama → lebih mudah dipahami dan diuji.**

## 4. Penamaan yang Deskriptif

Refactoring juga mencakup **penamaan variabel, fungsi, dan bagian kode lainnya**.

Nama yang terlalu umum seperti:

- `x`;
- `data1`;
- `temp`;
- `list`;

membuat developer harus membaca kode tambahan untuk mengetahui maksudnya.

Gunakan nama yang menjelaskan tujuan atau isi data, misalnya:

- `userRegistrationDate`;
- `totalOrderAmount`;
- `activeUserAccounts`.

Nama yang deskriptif membantu kode menjelaskan maksudnya sendiri dan mengurangi beban kognitif ketika membaca codebase.

### Contoh Instruksi ke Kiro

```text
Analisis kode ini dan perbaiki penamaan variabel agar lebih deskriptif
sesuai prinsip Clean Code.

Ubah nama variabel yang ambigu menjadi nama yang mencerminkan tujuannya.
Contohnya:
- ganti d menjadi days;
- ganti list menjadi activeUserAccounts.

Jangan mengubah perilaku program.
```

## 5. Refactoring Bukan Sekadar Estetika

Refactoring merupakan investasi jangka panjang terhadap kualitas codebase.

Struktur yang lebih jelas dan tanggung jawab yang lebih terpisah dapat membantu mengurangi risiko teknis ketika aplikasi berkembang.

Dua praktik penting dari materi ini:

1. **Gunakan SRP** untuk memisahkan tanggung jawab.
2. **Gunakan nama yang deskriptif** agar maksud kode mudah dipahami.

Keduanya membantu menjaga kode tetap maintainable ketika fitur bertambah dan perubahan dilakukan berulang kali.

## 6. Pola Praktis Refactoring dengan Kiro

Gunakan pola berikut ketika meminta Kiro melakukan refactoring:

**Tinjau → Tentukan prinsip → Instruksikan perubahan → Pertahankan perilaku → Verifikasi**

### Checklist

- [ ] Bagian kode yang akan direfactor sudah jelas.
- [ ] Prinsip refactoring disebutkan secara eksplisit.
- [ ] Batasan perubahan dijelaskan.
- [ ] Perilaku eksternal tidak boleh berubah tanpa alasan.
- [ ] Hasil refactoring diperiksa kembali.
- [ ] Testing dijalankan setelah perubahan.

## 7. Inti Pembelajaran

Yang perlu dibawa ke praktik engineering:

1. **Refactoring memperbaiki struktur internal tanpa mengubah perilaku yang diharapkan.**
2. **Instruksi kepada Kiro harus spesifik, bukan sekadar "rapikan kode".**
3. **SRP membantu memecah fungsi atau kelas yang memiliki terlalu banyak tanggung jawab.**
4. **Nama variabel yang deskriptif mengurangi beban kognitif saat membaca kode.**
5. **Refactoring adalah investasi maintainability, bukan hanya kosmetik.**
6. **Setelah refactoring, hasil tetap harus diverifikasi dan diuji.**

## Alur yang Perlu Diingat

```text
Kode yang sulit dipelihara
        ↓
Identifikasi masalah
        ↓
Tentukan prinsip refactoring
        ↓
Instruksi spesifik ke Kiro
        ↓
Refactoring
        ↓
Verifikasi perilaku
        ↓
Testing
        ↓
Kode lebih mudah dipelihara
```

## Sumber

Materi diringkas dari:

**Academy 929 — Tutorial 47696: Refactoring: Menginstruksikan Kiro untuk Refactoring Kode**

Bagian utama yang diringkas:

- Refactoring dengan Kiro;
- Single Responsibility Principle (SRP);
- Clean Code dan penamaan variabel;
- instruksi refactoring yang spesifik;
- manfaat refactoring untuk maintainability.
