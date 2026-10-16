# System Design — RF Doctor AI

Status: PROPOSED DESIGN — decisions pending owner review  
Versi: 0.1

## 1. Prinsip desain

- Modul terpisah untuk kasus, pemeriksaan, pengetahuan, dan provider AI.
- Backend menjadi batas keamanan untuk API provider.
- AI hanya memberi rekomendasi; tidak menjalankan tindakan pada perangkat.
- Semua hasil harus dapat ditelusuri ke input dan sumber.
- Komponen yang belum terbukti perlu tidak dimasukkan ke MVP.
- Kontrak API dan struktur output harus tervalidasi.

## 2. Arsitektur usulan

```
Android App (Kotlin + Jetpack Compose)
  ├── Case UI
  ├── Symptom & Measurement Forms
  ├── Diagnosis UI
  └── Local storage (strategy TBD)
            │ HTTPS
            ▼
Cloudflare Worker API (candidate)
  ├── Authentication / authorization (TBD; mandatory before public pilot)
  ├── Request validation + rate limits
  ├── Case/knowledge API
  ├── Retrieval service
  └── AI provider adapter
        ├── Workers AI candidate
        └── alternate provider candidate
            │
            ├── Cloudflare D1 (case metadata / knowledge metadata candidate)
            └── reviewed knowledge documents (storage/index strategy TBD)
```

D1 tidak otomatis berarti cocok menyimpan semua dokumen teknis atau lampiran. Pada MVP awal, simpan metadata dan teks pendek terstruktur; evaluasi object storage hanya bila dokumen/attachment memang diperlukan dan izinnya jelas.

## 3. Modul

### Android
- Case management
- Symptom intake
- Measurement log
- Diagnosis display
- Reference viewer
- Settings/privacy notice

### Backend
- Auth middleware (belum diputuskan, wajib sebelum API publik)
- Case endpoints
- Search/retrieval endpoint
- Diagnosis endpoint
- Provider adapter
- Schema validation
- Rate limit and usage guard
- Audit/error logging yang tidak menyimpan data sensitif

### Knowledge
- Source registry
- Reference document/chunk
- Device/model/category tags
- Verification status
- Source URL/license/access notes
- Search interface; vector search ditunda sampai kebutuhan terbukti.

## 4. Alur diagnosis

1. Pengguna memilih kasus.
2. Aplikasi mengirim hanya data minimum yang diperlukan.
3. Backend memvalidasi skema dan membersihkan identifier sensitif.
4. Retrieval mencari sumber relevan yang statusnya layak digunakan.
5. Backend membangun prompt dengan fakta, informasi hilang, dan sumber yang benar-benar ditemukan.
6. Provider AI mengembalikan respons terstruktur.
7. Backend memvalidasi respons; JSON invalid atau sumber yang tidak dikenal tidak dianggap sukses.
8. Aplikasi menampilkan hipotesis dan langkah verifikasi.
9. Teknisi menjalankan pemeriksaan secara manual dan mencatat hasil.
10. Kasus dianalisis ulang hanya setelah teknisi memasukkan bukti baru.

## 5. Kontrak output diagnosis (konseptual)

- case_summary
- known_facts[]
- unknowns[]
- hypotheses[]:
  - hypothesis
  - rationale
  - supporting_evidence[]
  - contradicting_evidence[]
  - confidence_label (LOW/MEDIUM/HIGH; bukan probabilitas ilmiah)
  - verification_steps[]
  - required_tools[]
  - risk_level
- references[]:
  - source_id
  - title
  - relevant_excerpt
  - verification_status
- limitations[]
- next_action

Model tidak boleh membuat source_id sendiri. Backend hanya menerima referensi yang memang ditemukan dalam retrieval. Label confidence adalah ringkasan kualitatif dan harus dijelaskan; bukan angka akurasi diagnosis.

## 6. Keamanan

- Tidak ada provider API key di aplikasi Android.
- Semua traffic menggunakan HTTPS.
- Auth dan authorization harus selesai sebelum API bisa digunakan publik.
- Validasi input, ukuran request, batas permintaan, dan timeout wajib.
- Jangan mengirim identifier SIM/perangkat yang tidak dibutuhkan.
- Jangan log prompt lengkap jika berpotensi berisi data pelanggan.
- Secret disimpan pada backend secret store.
- Tidak ada operasi diagnostik yang menulis konfigurasi modem/perangkat.
- Data retensi, backup, dan penghapusan ditentukan sebelum pilot.

## 7. Observability dan evidence

Setiap diagnosis menyimpan metadata minimal:
- internal case ID;
- timestamp;
- provider/model version bila tersedia;
- status request;
- reference IDs;
- validasi output pass/fail;
- hasil yang disetujui teknisi secara manual.

Hindari logging payload pribadi. Evidence pengujian mencakup unit test, API contract test, sample case benchmark, dan device test ketika tersedia.

## 8. Keputusan yang masih TBD

- Auth: pilih solusi yang aman dan tidak memaksa membuat sistem password buatan sendiri.
- Local data: Room/local-first versus online-first.
- Provider AI: hasil benchmark harus mendahului keputusan final.
- Knowledge storage: D1 text/search awal versus object storage.
- Minimum Android API dan build tooling.
- Pengelolaan dokumen legal dan proses review teknis.