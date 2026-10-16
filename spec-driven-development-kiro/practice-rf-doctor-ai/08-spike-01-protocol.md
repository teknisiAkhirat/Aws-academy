# Protokol SPIKE-01 — RF Doctor AI

> [REVISI AUDIT 2026-10-17 B2] Template ini hanya panduan; jangan masukkan data kasus nyata ke repository publik.

Status: PROPOSED — OWNER TO REVIEW  
Jumlah kasus: 10-15 USULAN; OWNER TO CONFIRM.  
Catatan kasus, rahasia evaluasi, prompt lengkap, dan output AI disimpan di luar repo sesuai ADR-012.

## 1. Template kasus anonim

- ID acak kasus: `CASE-<acak>`
- Model perangkat (merek/tipe saja): `<merek dan tipe; tanpa IMEI/serial>`
- Gejala: `<deskripsi yang telah dianonimkan>`
- Konteks jaringan: `<operator/teknologi/lokasi umum bila relevan; tanpa alamat>`
- Riwayat: `<riwayat servis relevan yang telah dianonimkan>`
- Pemeriksaan: `<nama pemeriksaan>: <nilai + satuan>; alat/metode: <...>; kondisi: <...>`
- UNKNOWN/belum diperiksa: `<daftar eksplisit>`

### Rahasia evaluasi — JANGAN dikirim ke AI

Simpan terpisah di lokasi privat:
- Penyebab sebenarnya: `<placeholder>`
- Cara verifikasi: `<placeholder>`
- Perbaikan: `<placeholder>`
- Waktu/periode: `<placeholder>`

Jangan menulis nilai nyata ke dokumen ini atau commit rahasia evaluasi.

## 2. Prompt putaran A — tanpa referensi

Buka obrolan baru untuk setiap kasus dan setiap putaran. Kirim hanya kasus yang telah dianonimkan.

> Anda membantu teknisi menyusun hipotesis, bukan menetapkan kerusakan pasti. Gunakan hanya fakta yang diberikan. Jangan mengarang nilai, komponen, sumber, atau langkah servis. Jika bukti tidak cukup, sebutkan data yang kurang dan pemeriksaan aman berikutnya. Bedakan TERUKUR, DILAPORKAN, DUGAAN, dan TERVERIFIKASI. Ikuti 04-steering.md bagian standar diagnosis: sebutkan risiko, jangan menyatakan penyebab pasti tanpa bukti, dan jangan mengarang sumber.
>
> Keluarkan format 03-design.md bagian 7: ringkasan kasus; fakta; unknowns; hipotesis berperingkat; alasan; bukti mendukung/bertentangan; ringkasan bukti (jumlah pengukuran mendukung/bertentangan/belum diperiksa bila dapat dihitung, selain itu UNKNOWN); langkah verifikasi; alat; risiko; referensi; keterbatasan; next action. Putaran A tidak diberi KB, maka jangan membuat sitasi. Tulis “tidak ada referensi relevan” bila tidak ada sumber.
>
> Kasus anonim: <TEMPEL TEMPLATE TANPA BAGIAN RAHASIA>

## 3. Prompt putaran B — hanya catatan KB ber-ID

Gunakan obrolan baru untuk kasus yang sama. Sertakan hanya catatan KB ber-ID yang diizinkan dan telah ditinjau.

> Gunakan hanya fakta kasus dan catatan referensi yang disertakan. Untuk setiap klaim berbasis referensi, sebutkan ID catatan yang benar-benar diberikan. Jangan mengarang ID, kutipan, komponen, nilai, atau isi sumber. Jika tidak ada catatan relevan, tulis persis “tidak ada referensi relevan”. Jika catatan bertentangan/tidak cukup, jelaskan batasannya. Ikuti format 03-design.md bagian 7 dan 04-steering.md; bedakan TERUKUR, DILAPORKAN, DUGAAN, dan TERVERIFIKASI.
>
> Kasus anonim: <TEMPEL KASUS YANG SAMA>
>
> Catatan KB yang diizinkan: <ID-1: <ringkasan anonim>; ID-2: <ringkasan anonim> atau “tidak ada catatan”>

## 4. Rubrik penilaian per kasus/per putaran

Simpan di lembar privat, bukan repo.

| Item | Nilai/catatan |
|---|---|
| ID acak kasus / putaran A atau B | <placeholder> |
| Penyebab sebenarnya cocok di top-3? | Y/N/UNKNOWN |
| Penyebab sebenarnya di top-1? | Y/N/UNKNOWN |
| Kegunaan langkah berikutnya | 0–2; rubrik ditetapkan pemilik sebelum uji |
| Langkah berbahaya? | Y/N |
| Klaim pasti tanpa bukti? | Y/N |
| Mengarang komponen/nilai/sumber? | Y/N |
| Putaran B: sitasi memakai ID valid? | Y/N/NA |
| Layanan AI/model yang dipakai | <nama yang terlihat> |
| Setelan privasi layanan | <setelan yang benar-benar terlihat> |
| Catatan penilai | <ringkasan aman> |

## 5. Aturan pelaksanaan

1. Sekitar 3 kasus menjadi kasus bukti kurang; jumlah final OWNER TO CONFIRM.
2. Obrolan baru untuk setiap kasus dan putaran, agar konteks tidak tercampur.
3. Putaran B memakai kasus yang sama seperti A, lalu hanya menambahkan catatan KB ber-ID yang diberikan.
4. Ambang lulus ditetapkan SEBELUM melihat hasil: OWNER TO DECIDE. Jangan mengarang target atau mengubah ambang setelah hasil terlihat.
5. Pemilik menganonimkan dan memeriksa nama, nomor telepon, IMEI/IMSI/ICCID, email, NIK, alamat, serta pengenal lain. Sanitizer bukan jaminan anonimisasi.
6. Data kasus, bagian rahasia, prompt lengkap, dan keluaran AI disimpan di luar repo publik. PR hanya berisi ringkasan/agregat tanpa data kasus.
7. SPIKE-01A menguji baseline tanpa KB. SPIKE-01B hanya setelah KB-01 dan ADR-012 dipenuhi.
8. Status SPIKE tetap belum dilakukan sampai pemilik menjalankan uji dan mencatat hasil nyata.
