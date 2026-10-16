# System Design — RF Doctor AI

> [REVISI AUDIT 2026-10-17] Rancangan ini masih usulan; tidak ada keputusan arsitektur final tanpa persetujuan pemilik.

Status: PROPOSED DESIGN — decisions pending owner review  
Versi: 0.2

## 1. Prinsip desain

- Pisahkan modul kasus, pemeriksaan, pengetahuan, dan provider AI.
- Jangan membangun backend sebelum gerbang SPIKE-01 lulus dan pemilik menyetujui urutan fase.
- AI hanya memberi rekomendasi; tidak menjalankan tindakan pada perangkat.
- Semua hasil harus dapat ditelusuri ke input dan sumber.
- Komponen yang belum terbukti perlu tidak dimasukkan ke MVP.
- Kontrak API dan struktur output harus tervalidasi.
- Confidence bukan nilai yang dipilih model; jika kelak dipakai, label diturunkan dari aturan bukti yang transparan.

## 2. Opsi arsitektur [REVISI AUDIT 2026-10-17]

### Opsi A — Android offline-only lebih dahulu

Aplikasi menyimpan kasus dan catatan pengukuran secara lokal. Knowledge base berisi catatan servis pemilik yang sudah ditinjau dan metadata sumber. Diagnosis pada fase ini berupa checklist/aturan pencarian lokal; tidak ada backend, autentikasi, API AI, atau sinkronisasi.

Kelebihan: lebih sedikit komponen, tidak ada biaya backend/AI saat fase ini, bisa dipakai tanpa internet, dan cocok untuk menguji apakah format kasus bermanfaat.

Kekurangan: AI online belum tersedia; pencarian hanya sebaik isi knowledge base; backup/sinkronisasi perlu dirancang jika nanti dibutuhkan.

Status: OPSI UNTUK OWNER REVIEW.

### Opsi B — Android + backend sejak awal

Aplikasi berkomunikasi dengan backend HTTPS yang mengelola auth, database, retrieval, dan provider AI.

Kelebihan: diagnosis AI dan pengetahuan terpusat dapat tersedia lintas perangkat.

Kekurangan: menambah auth, privasi, batas penggunaan, observability, biaya, dan risiko operasional sebelum manfaatnya terbukti.

Status: OPSI UNTUK OWNER REVIEW; jangan mulai sebelum SPIKE-01 lulus.

## 3. Diagram usulan

Jika opsi offline-only dipilih:

    Android App (platform TBD)
      ├── Case UI
      ├── Symptom & Measurement Forms
      ├── Local Knowledge Search
      ├── Case History / Export
      └── Local database (technology TBD)

Jika opsi backend dipilih setelah gerbang:

    Android App
      │ HTTPS
      ▼
    Backend API (platform TBD)
      ├── Authentication / authorization
      ├── Request validation + rate limits
      ├── Case/knowledge API
      ├── Retrieval service
      └── AI provider adapter
      ├── Database (TBD)
      └── Reviewed knowledge documents (storage TBD)

## 4. Modul yang mungkin dibutuhkan

### Android
- Case management
- Symptom intake
- Measurement log
- Case history
- Local knowledge search
- Export
- Diagnosis display hanya ketika fitur AI disetujui dan tersedia
- Settings/privacy notice

### Backend (ditunda)
- Auth middleware
- Case endpoints
- Search/retrieval endpoint
- Diagnosis endpoint
- Provider adapter
- Schema validation
- Rate limit and usage guard
- Logging yang tidak menyimpan data sensitif

### Knowledge
- Source registry
- Reference document/note
- Device/model/category tags
- Verification status
- Source URL/license/access notes
- Pencarian teks sederhana terlebih dahulu; pencarian vektor hanya jika diperlukan dan disetujui.

## 5. Sumber kebenaran data [REVISI AUDIT 2026-10-17]

Urutan sumber kebenaran:
1. Hasil pengukuran yang dicatat teknisi, dengan metode/alat, kondisi, satuan, dan waktu.
2. Hasil pemeriksaan yang diamati langsung dan diberi label VERIFIED oleh teknisi; label ini tidak otomatis berarti sebab kerusakan telah terbukti.
3. Laporan/gejala dari pelanggan atau teknisi, dilabeli REPORTED.
4. Referensi teknis yang asal-usul dan izin penggunaannya jelas, dengan status verifikasi.
5. Hipotesis yang dihasilkan AI, dilabeli INFERRED dan tidak pernah mengalahkan hasil pengukuran atau temuan yang bertentangan.
6. Data yang tidak tersedia tetap UNKNOWN; tidak diisi berdasarkan tebakan.

Catatan: teknisi dapat salah mencatat atau mengukur. Aplikasi menyimpan sumber dan konteks agar hasil dapat ditinjau; urutan ini bukan jaminan bahwa setiap pengukuran benar.

## 6. Alur diagnosis (hanya setelah gerbang AI disetujui)

1. Pengguna memilih kasus.
2. Sistem menampilkan fakta yang tercatat dan informasi yang belum ada.
3. Retrieval mencari sumber yang statusnya layak digunakan.
4. Jika tidak ada sumber relevan, sistem menyatakannya dan tidak membuat sitasi.
5. Jika AI online diaktifkan, backend mengirim hanya data minimum setelah validasi dan sanitasi.
6. Backend memvalidasi bentuk respons dan referensi; sumber yang tidak ditemukan tidak diterima.
7. Aplikasi menampilkan hipotesis, alasan, bukti pendukung/bertentangan, ketidakpastian, risiko, dan langkah verifikasi.
8. Teknisi melakukan pemeriksaan secara manual dan mencatat hasil.
9. Diagnosis baru hanya dibuat setelah ada bukti baru atau perubahan input yang tercatat.

## 7. Kontrak keluaran diagnosis (konseptual)

- case_summary
- known_facts[] dengan label sumber: MEASURED, REPORTED, VERIFIED
- unknowns[]
- hypotheses[]:
  - hypothesis
  - rationale
  - supporting_evidence[]
  - contradicting_evidence[]
  - confidence_label (LOW/MEDIUM/HIGH; aturan turunan, bukan output bebas model)
  - verification_steps[]
  - required_tools[]
  - risk_level
- references[]:
  - source_id yang dibuat sistem
  - title
  - relevant_excerpt
  - verification_status
- limitations[]
- next_action

### Aturan confidence yang diusulkan [REVISI AUDIT 2026-10-17]

Status: PROPOSED — perlu persetujuan pemilik dan validasi pada SPIKE-01.

- LOW jika belum ada pengukuran yang relevan, bukti utama hanya laporan gejala, atau bukti saling bertentangan.
- MEDIUM hanya dapat dipertimbangkan jika ada pengukuran/pemeriksaan relevan yang mendukung hipotesis dan belum ada bukti penting yang bertentangan.
- HIGH tidak digunakan pada MVP sampai ada rubrik penilaian yang ditinjau teknisi berpengalaman dan pemilik menyetujuinya.
- Model AI boleh mengusulkan hipotesis dan alasan, tetapi tidak boleh menentukan atau menaikkan confidence_label. Sistem menurunkan label dari bukti yang tercatat dan aturan yang disetujui.
- Jika sistem belum dapat menilai relevansi/kualitas bukti secara deterministik, gunakan LOW dan jelaskan keterbatasannya.

Tidak ada angka ambang atau target metrik yang ditetapkan oleh dokumen ini. Nilai target: OWNER TO DECIDE.

## 8. Keamanan dan privasi

- Tidak ada provider API key di aplikasi Android.
- Semua traffic backend menggunakan HTTPS.
- Auth dan authorization harus selesai sebelum API digunakan publik.
- Validasi input, ukuran request, batas permintaan, dan timeout wajib.
- Jangan mengirim identifier SIM/perangkat yang tidak dibutuhkan.
- Jangan log prompt lengkap jika berpotensi berisi data pelanggan.
- Secret disimpan pada backend secret store.
- Tidak ada operasi diagnostik yang menulis konfigurasi modem/perangkat.
- Retensi, backup, penghapusan, dan ekspor ditentukan sebelum pilot.

## 9. Observability dan evidence

Jika backend kelak dipilih, metadata minimal:
- internal case ID;
- timestamp;
- provider/model version bila tersedia;
- status request;
- source IDs yang benar-benar dipakai;
- hasil validasi output;
- hasil yang dikonfirmasi teknisi secara manual.

Hindari logging payload pribadi. Evidence mencakup tes unit, kontrak API, benchmark kasus, dan uji perangkat bila tersedia. Pada fase offline-only, evidence mencakup tes penyimpanan lokal, ekspor, dan pencarian lokal.

## 10. Keputusan yang masih OPEN

- Platform aplikasi: lihat ADR-001.
- Backend platform: lihat ADR-003.
- Auth: lihat ADR-007.
- Penyimpanan lokal/sinkronisasi: lihat ADR-008.
- Provider AI: ADR-004, setelah SPIKE-01.
- Knowledge storage dan izin: belum diputuskan.
- Minimum Android API/build tooling: lihat ADR-010.
- Batas biaya bulanan: lihat ADR-011.
