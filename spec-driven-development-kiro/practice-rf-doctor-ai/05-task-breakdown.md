# Task Breakdown — RF Doctor AI

> [REVISI AUDIT 2026-10-17] Urutan fase diubah agar validasi nilai produk mendahului implementasi. Semua task implementasi tetap memerlukan persetujuan pemilik.

Status: DRAFT BACKLOG — belum ada task implementasi yang diizinkan  
Versi: 0.2

## Aturan

- SPIKE-01 adalah gerbang nilai produk. Phase 1 dan semua fase setelahnya berstatus BLOCKED sampai SPIKE-01 selesai, hasil dinilai pemilik, dan pemilik memberi persetujuan eksplisit untuk lanjut.
- ENV-01 wajib dilakukan sebelum memilih platform/build path.
- KB-01 menyusun pengetahuan dari catatan servis pemilik yang sah dipakai; jangan mengarang isi atau menganggap catatan belum ditinjau sebagai fakta terverifikasi.
- Task yang memerlukan keputusan OPEN tidak boleh dikerjakan sampai keputusan itu ditutup.
- Ukuran S/M/L adalah estimasi relatif, bukan janji durasi: S kecil, M sedang, L besar. Revisi ukuran setelah spike/validasi.
- Satu task: implement → test → verify → evidence → commit → PR. Tidak ada merge otomatis.

## Phase 0 — Discovery, feasibility, and product-value gate

### DOC-01 — Review project charter
- Size: S
- Requirements/AC: semua; gerbang review proyek.
- Output: charter disetujui atau diberi catatan.
- Verify/evidence: keputusan pemilik tercatat pada PR/comment.
- Status: BLOCKED ON OWNER REVIEW.

### DOC-02 — Review feasibility research
- Size: M
- Requirements/AC: FR-15, NFR-02, NFR-08; AC-11, AC-21, AC-25, AC-28.
- Output: klaim teknis ditandai VERIFIED atau UNCONFIRMED dengan sumber primer.
- Verify/evidence: daftar sumber dan catatan validasi; klaim build tidak dianggap terbukti tanpa build nyata.
- Status: DRAFT.

### ENV-01 — Validasi lingkungan build
- Size: M
- Requirements/AC: NFR-02, NFR-08; AC-11, AC-25, AC-28.
- Output: bukti percobaan build minimal untuk opsi yang dipertimbangkan: Termux, GitHub Actions, Oracle VPS, serta Flutter/Kotlin/PWA sejauh relevan.
- Verify/evidence: perintah yang dijalankan, versi toolchain, hasil aktual, waktu, error lengkap yang tidak berisi secret, dan artefak build bila berhasil.
- Batas: jangan instal resource berbayar atau ubah VPS produksi tanpa persetujuan.
- Status: BLOCKED ON OWNER APPROVAL / ENVIRONMENT ACCESS.

### KB-01 — Susun knowledge base dari catatan servis pemilik
- Size: M
- Requirements/AC: FR-04, FR-07, FR-09, FR-12, FR-13; AC-13, AC-14, AC-16, AC-19.
- Output: catatan servis yang boleh dipakai, sudah diminimalkan/anonymized, dengan metadata sumber, model perangkat jika diketahui, gejala, bukti, langkah, temuan akhir, izin, dan status review.
- Verify/evidence: pemilik meninjau sampel; catatan tanpa asal-usul/izin atau yang belum ditinjau tidak ditandai VERIFIED.
- Status: BLOCKED ON OWNER-PROVIDED NOTES AND REVIEW.

### SPIKE-01 — Uji manual 10–15 kasus servis nyata yang anonim (GERBANG)
- Size: L
- Requirements/AC: FR-05..FR-09, FR-13; AC-04, AC-05, AC-09, AC-14, AC-15, AC-16.
- Output: 10–15 kasus servis nyata yang sudah dianonimkan; jalankan prompt/format keluaran dari 03-design secara manual di chat AI; simpan input yang aman, keluaran, sumber yang disebut, dan penilaian pemilik.
- Verify/evidence: pemilik menilai setiap kasus berdasarkan ketepatan fakta, hipotesis, ketidakpastian, sumber, risiko, dan langkah verifikasi; catat kasus gagal dan contoh hallucination.
- Jangan mengirim identifier pelanggan atau materi yang tidak memiliki izin.
- Kriteria lulus: OWNER TO DECIDE: rubrik dan ambang kelulusan.
- Status: BLOCKED ON OWNER REVIEW; belum dikerjakan oleh agent.
- Gate: Phase 1+ tetap BLOCKED sampai pemilik menyatakan SPIKE-01 lulus secara eksplisit.

### DOC-03 — Tutup requirements
- Size: M
- Requirements/AC: FR-01..FR-17, NFR-01..NFR-09; semua AC.
- Output: requirements v1.0 dan matriks keterlacakan disetujui.
- Verify/evidence: review setiap requirement dan AC; open questions dicatat.
- Status: BLOCKED ON OWNER REVIEW.

### DOC-04 — Tutup keputusan arsitektur
- Size: M
- Requirements/AC: NFR-02..NFR-05, NFR-09; AC-07, AC-08, AC-26, AC-30.
- Output: platform, penyimpanan, auth, provider, batas biaya, dan strategi knowledge disetujui atau tetap di luar scope.
- Verify/evidence: ADR dengan status dan konsekuensi.
- Status: BLOCKED ON OWNER REVIEW.

## Phase 1 — Android offline-only (BLOCKED sampai SPIKE-01 lulus)

### APP-01 — Scaffold aplikasi
- Size: M
- Requirements/AC: FR-01, FR-15; NFR-01, NFR-02, NFR-08; AC-01, AC-21, AC-24, AC-25, AC-28.
- Output: aplikasi minimal dapat dibangun dan dibuka di perangkat target.
- Verify/evidence: build log dan uji perangkat nyata.
- Dependency: ENV-01 dan keputusan platform ADR-001.
- Status: BLOCKED.

### APP-02 — Model kasus dan penyimpanan lokal
- Size: M
- Requirements/AC: FR-01, FR-02, FR-10, FR-11; NFR-06, NFR-09; AC-01, AC-02, AC-06, AC-17, AC-18, AC-29.
- Output: membuat, membaca, memperbarui, dan membuka kembali kasus.
- Verify/evidence: tes persistence/restart dan uji perangkat.
- Dependency: ADR-008.
- Status: BLOCKED.

### APP-03 — Form gejala, bukti, dan pengukuran
- Size: M
- Requirements/AC: FR-02, FR-03, FR-04, FR-07; NFR-01, NFR-05, NFR-06; AC-02, AC-03, AC-08, AC-13, AC-14.
- Output: form mempertahankan UNKNOWN, satuan, metode, label sumber, dan peringatan privasi.
- Verify/evidence: fixture valid/invalid dan screenshot uji.
- Status: BLOCKED.

### APP-04 — Riwayat, pencarian lokal, dan ekspor
- Size: M
- Requirements/AC: FR-10, FR-11, FR-12, FR-13, FR-17; NFR-07, NFR-09; AC-09, AC-17, AC-18, AC-19, AC-23, AC-27, AC-29.
- Output: riwayat kasus, pencarian knowledge lokal, dan ekspor tanpa identifier sensitif secara default.
- Verify/evidence: tes urutan riwayat, pencarian, ekspor fixture, dan pemeriksaan data lokal.
- Status: BLOCKED.

## Phase 2 — Backend/auth/AI (BLOCKED sampai SPIKE-01 lulus dan owner menyetujui)

### BE-01 — Backend scaffold
- Size: M
- Requirements/AC: NFR-03, NFR-04; AC-06, AC-26, AC-30.
- Output: minimal backend hanya setelah platform dipilih.
- Verify/evidence: build/test dan deployment non-production jika disetujui.
- Status: BLOCKED ON SPIKE-01 + OWNER APPROVAL.

### BE-02 — API schema dan validasi
- Size: M
- Requirements/AC: FR-05, FR-06; NFR-04, NFR-06; AC-04, AC-05, AC-20, AC-26.
- Output: kontrak API tervalidasi dan penolakan payload invalid/terlalu besar.
- Verify/evidence: contract tests.
- Status: BLOCKED.

### BE-03 — Auth dan authorization
- Size: L
- Requirements/AC: NFR-04; AC-26.
- Output: auth flow yang disetujui.
- Verify/evidence: request tanpa auth/otorisasi ditolak.
- Dependency: ADR-007.
- Status: BLOCKED.

### BE-04 — Secret, rate limit, dan biaya
- Size: M
- Requirements/AC: NFR-03, NFR-04; AC-07, AC-20, AC-26, AC-30.
- Output: secret server-side dan batas penggunaan yang disetujui.
- Verify/evidence: secret scan, rate-limit tests, catatan biaya.
- Dependency: ADR-011.
- Status: BLOCKED.

### AI-01 — Registry sumber knowledge
- Size: M
- Requirements/AC: FR-09, FR-13; AC-09, AC-16.
- Output: metadata sumber dan status review.
- Verify/evidence: sumber draft/tanpa izin tidak masuk retrieval.
- Dependency: KB-01.
- Status: BLOCKED.

### AI-02 — Pencarian/retrieval baseline
- Size: M
- Requirements/AC: FR-12, FR-13; AC-09, AC-16, AC-19.
- Output: pencarian teks atas sumber yang ditinjau.
- Verify/evidence: benchmark relevansi dan validasi source ID.
- Status: BLOCKED.

### AI-03 — Provider adapter
- Size: M
- Requirements/AC: FR-05, FR-14, FR-16; NFR-03, NFR-04; AC-05, AC-20, AC-22, AC-30.
- Output: satu provider terpilih di belakang interface.
- Verify/evidence: timeout, error provider, output invalid, rate limit, dan estimasi biaya.
- Dependency: SPIKE-01, ADR-004, ADR-011.
- Status: BLOCKED.

### AI-04 — Respons diagnosis terstruktur
- Size: L
- Requirements/AC: FR-05..FR-09, FR-13; NFR-06, NFR-07; AC-04, AC-05, AC-09, AC-14, AC-15, AC-16, AC-27.
- Output: hipotesis, alasan, bukti, unknowns, confidence turunan, langkah verifikasi, risiko, dan referensi.
- Verify/evidence: benchmark kasus yang ditinjau pemilik; tidak ada klaim sumber palsu.
- Status: BLOCKED.

## Phase 3 — Integrasi dan kesiapan pilot (BLOCKED)

### INT-01 — Alur end-to-end
- Size: L
- Requirements/AC: FR-01..FR-17; NFR-01..NFR-09; AC-01..AC-30 sesuai scope yang disetujui.
- Output: alur kasus lengkap hanya untuk fitur yang telah disetujui.
- Verify/evidence: tes integrasi dan walkthrough perangkat.
- Status: BLOCKED.

### INT-02 — Review privasi dan keamanan
- Size: M
- Requirements/AC: NFR-03..NFR-07; AC-07, AC-08, AC-23, AC-26, AC-30.
- Output: review alur data, retensi, dan penghapusan.
- Verify/evidence: secret scan, fixture identifier, tes otorisasi.
- Status: BLOCKED.

### INT-03 — Gerbang kesiapan pilot
- Size: M
- Requirements/AC: seluruh requirements dan AC dalam scope yang disetujui.
- Output: laporan release candidate dan risiko tersisa.
- Verify/evidence: seluruh AC kritis lulus; tes yang belum dilakukan berstatus UNCONFIRMED.
- Status: BLOCKED ON OWNER APPROVAL.

## Definition of done

- Task terkait requirement dan AC.
- Dokumen/kode ditinjau.
- Tes benar-benar dijalankan dan hasil aktual dicatat.
- Evidence dapat diperiksa.
- Batasan dan risiko dicatat.
- Tidak ada secret atau identifier pelanggan dalam log/artefak.
- PR terbuka untuk review pemilik; tidak ada merge otomatis atau deployment produksi.
