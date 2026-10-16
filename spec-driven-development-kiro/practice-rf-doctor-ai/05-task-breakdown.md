# Task Breakdown — RF Doctor AI

> [REVISI AUDIT 2026-10-17 B2] Urutan fase diubah agar validasi nilai produk mendahului implementasi. Semua task implementasi tetap memerlukan persetujuan pemilik.

Status: DRAFT BACKLOG — belum ada task implementasi yang diizinkan  
Versi: 0.2

## Aturan

- SPIKE-01 adalah gerbang nilai produk. Phase 1 dan semua fase setelahnya BLOCKED sampai SPIKE-01A dan SPIKE-01B yang relevan selesai, hasil dinilai pemilik, dan pemilik menyetujui lanjut. Jumlah kasus: 10-15 USULAN; OWNER TO CONFIRM.
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
- Dependency: ADR-010 (jalur build harus disetujui sebelum percobaan yang membutuhkan resource/akses).
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

### SPIKE-01A — Uji manual tanpa KB
- Size: M
- Requirements/AC: FR-05..FR-08; AC-04, AC-15, AC-16.
- Output: baseline tanpa referensi KB. Jumlah kasus: 10-15 USULAN; OWNER TO CONFIRM.
- Verify/evidence: gunakan 08-spike-01-protocol.md; data/hasil di luar repo publik.
- Dependency: tidak ada; dapat mulai kapan saja setelah pemilik menyiapkan kasus aman.
- Status: BLOCKED ON OWNER PREPARATION; belum dilakukan.

### SPIKE-01B — Uji manual dengan KB
- Size: M
- Requirements/AC: FR-05..FR-09, FR-13; AC-04, AC-14, AC-15, AC-16.
- Output: ulangi kasus sama dengan catatan KB ber-ID yang diizinkan dan ditinjau; bandingkan dengan SPIKE-01A.
- Verify/evidence: protokol 08; sitasi menunjuk ID yang benar-benar diberikan. Data/hasil di luar repo publik.
- Dependency: KB-01 dan ADR-012.
- Status: BLOCKED ON KB-01 + OWNER REVIEW; belum dilakukan.
- Gate: Phase 1+ BLOCKED sampai pemilik menilai hasil dan menyetujui lanjut.

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

## Phase 1 — Offline-only tanpa AI (BLOCKED sampai SPIKE-01 dan persetujuan pemilik)

### APP-01 — Scaffold aplikasi
- Size: M
- Requirements/AC: FR-01, FR-15; NFR-01, NFR-02, NFR-08; AC-01, AC-21, AC-24, AC-25, AC-28.
- Output: aplikasi minimal dapat dibangun dan dibuka di perangkat target.
- Verify/evidence: build log dan uji perangkat nyata.
- Dependency: ENV-01, ADR-001, dan ADR-010.
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
- Requirements/AC: FR-02, FR-03, FR-04, FR-07; NFR-01, NFR-05, NFR-06; AC-02, AC-03, AC-13, AC-14.
- Output: form mempertahankan UNKNOWN, satuan, metode, label sumber, dan peringatan agar data mentah tidak dimasukkan ke layanan AI.
- Verify/evidence: fixture valid/invalid dan uji perangkat.
- Status: BLOCKED.

### SAN-01 — Sanitizer dan fixture privasi
- Size: M
- Requirements/AC: NFR-05; AC-08, AC-23.
- Output: sanitizer + fixture sintetis untuk IMEI, telepon, ICCID, IMSI, email, NIK. Luhn hanya sinyal tambahan, tidak melonggarkan pembuangan/penandaan.
- Verify/evidence: tes positif/negatif, variasi pemisah, false-positive review, peringatan UI; tanpa data kasus nyata.
- Dependency: sebelum APP-04 ekspor dan sebelum AI/provider mengirim data.
- Status: BLOCKED; pengiriman AI Phase 2.

### APP-04 — Riwayat, pencarian lokal, dan ekspor
- Size: M
- Requirements/AC: FR-10, FR-11, FR-12, FR-13, FR-17, FR-18; NFR-07, NFR-09, NFR-10; AC-09, AC-17, AC-18, AC-19, AC-23, AC-27, AC-29, AC-31, AC-32.
- Output: riwayat kasus, pencarian knowledge lokal, dan ekspor tanpa identifier sensitif secara default.
- Verify/evidence: tes urutan riwayat, pencarian, ekspor fixture, dan pemeriksaan data lokal.
- Dependency: SAN-01 untuk ekspor; ADR-012 untuk registry/format KB; ADR-013 untuk backup/restore, hapus/arsip.
- Status: BLOCKED.

### KB-02 — Registry dan format knowledge lokal
- Size: M
- Requirements/AC: FR-12, FR-13; AC-09, AC-16, AC-19.
- Output: Markdown/JSON + metadata registry; sumber berizin dengan ID/provenance/status REVIEW NEEDED/REVIEWED/VERIFIED/RETIRED. Isi KB di lokasi ADR-012, bukan repo publik.
- Verify/evidence: placeholder di repo; uji dengan data sintetis atau lokasi privat disetujui.
- Dependency: ADR-012 dan KB-01.
- Status: BLOCKED ON OWNER DECISION.

### DATA-01 — Backup/restore dan hapus/arsip lokal
- Size: M
- Requirements/AC: FR-18, NFR-10; AC-31, AC-32.
- Output: konfirmasi hapus/arsip dan backup/restore sesuai ADR-013; retensi berlaku sejak Phase 1.
- Verify/evidence: tes restore/hapus/arsip dengan fixture sintetis; tanpa backup hanya setelah risiko diterima pemilik.
- Dependency: ADR-013.
- Status: BLOCKED ON OWNER DECISION.

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
- Output: metadata sumber/status review untuk retrieval; isi KB tidak di repo publik.
- Verify/evidence: sumber REVIEW NEEDED/RETIRED/tanpa izin tidak masuk retrieval.
- Dependency: KB-02.
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
- Verify/evidence: seluruh AC kritis (AC berprioritas MUST yang disetujui di matriks 02) lulus; tes belum dilakukan berstatus UNCONFIRMED.
- Status: BLOCKED ON OWNER APPROVAL.

### DOC-06 — Setujui steering (04)
- Size: S
- Requirements/AC: governance; AC-11, AC-12.
- Output: pemilik menyetujui atau memberi catatan pada 04-steering.md.
- Verify/evidence: persetujuan eksplisit; sebelum itu steering PROPOSED.
- Dependency: tidak ada.
- Status: BLOCKED ON OWNER DECISION.

### DOC-07 — Bersihkan penanda REVISI AUDIT sebelum merge
- Size: S
- Requirements/AC: PR-only; AC-11, AC-12.
- Output: penanda audit dibersihkan hanya atas permintaan/persetujuan pemilik.
- Verify/evidence: diff hanya mengubah penanda yang diminta.
- Dependency: persetujuan pemilik dan review akhir PR.
- Status: OWNER TO DECIDE.

## Definition of done

- Task terkait requirement dan AC.
- Dokumen/kode ditinjau.
- Tes benar-benar dijalankan dan hasil aktual dicatat.
- Evidence dapat diperiksa.
- Batasan dan risiko dicatat.
- Tidak ada secret atau identifier pelanggan dalam log/artefak.
- PR terbuka untuk review pemilik; tidak ada merge otomatis atau deployment produksi.
