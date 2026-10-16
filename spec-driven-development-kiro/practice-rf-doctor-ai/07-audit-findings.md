# Audit Findings — RF Doctor AI

> [REVISI AUDIT 2026-10-17 B2] Register ini mencatat temuan audit, bukan keputusan final. Status diperbarui hanya berdasarkan bukti.

Status: OPEN FOR OWNER REVIEW  
Ruang lingkup: dokumen Markdown di folder practice-rf-doctor-ai.

| ID | Temuan | Severity | File terkait | Status |
|---|---|---|---|---|
| AUD-01 | Nilai inti produk belum terbukti dan knowledge base belum tersedia/ditinjau. Perlu SPIKE-01 dengan 10–15 kasus servis nyata anonim dan KB-01 dari catatan pemilik yang sah dipakai. | BLOCKER | 01-feasibility-research.md, 05-task-breakdown.md, 06-decision-log.md | OPEN — menunggu uji dan penilaian pemilik |
| AUD-02 | Arsitektur awal berpotensi terlalu berat untuk satu pengguna: Android + backend + database + retrieval + AI sebelum manfaatnya terbukti. | HIGH | 03-design.md, 05-task-breakdown.md, 06-decision-log.md | DIREVISI — opsi offline-only dicatat; perlu keputusan pemilik |
| AUD-03 | Keputusan penentu arsitektur masih TBD: platform, penyimpanan, auth, provider AI, build path, dan backend. | BLOCKER | 03-design.md, 06-decision-log.md, 02-requirements.md | OPEN — OWNER TO DECIDE |
| AUD-04 | Cakupan acceptance criteria sebelumnya bolong untuk FR-04, FR-07..FR-12, FR-14, FR-16, dan FR-17. | HIGH | 02-requirements.md | DIREVISI — matriks dan AC tambahan dibuat; masih perlu review |
| AUD-05 | Ukuran keberhasilan sebelumnya tidak memiliki metrik/ambang yang dapat dinilai. | HIGH | 00-project-charter.md, 02-requirements.md, 06-decision-log.md | DIREVISI SEBAGIAN — metrik di requirements, nilai tetap OWNER TO DECIDE |
| AUD-06 | Confidence diagnosis sebelumnya berasal dari output model tanpa aturan bukti yang jelas. | HIGH | 03-design.md, 04-steering.md | DIREVISI — aturan turunan berstatus PROPOSED |
| AUD-07 | AC-08 sebelumnya terlalu umum dan belum dapat diuji terhadap pola identifier. | HIGH | 02-requirements.md | DIREVISI — pola, peringatan UI, dan fixture ditentukan; sanitasi tidak menjamin semua data tertangkap |
| AUD-08 | Riset TelephonyManager tidak konsisten dengan keputusan MVP yang tidak memerlukan izin telephony. | MEDIUM | 01-feasibility-research.md, 02-requirements.md, 06-decision-log.md | DIREVISI — ditandai POST-MVP, tidak dipakai MVP |
| AUD-09 | Toolchain/build Android dari Termux, GitHub Actions, dan Oracle VPS belum diuji untuk platform proyek. | HIGH | 01-feasibility-research.md, 05-task-breakdown.md, 06-decision-log.md | OPEN — ENV-01 dibutuhkan; semua klaim build UNCONFIRMED |
| AUD-10 | Urutan task sebelumnya menempatkan backend sebelum pembuktian nilai produk dan sebelum kesiapan lingkungan. | BLOCKER | 05-task-breakdown.md | DIREVISI — SPIKE-01 sebagai gerbang; Phase 1+ BLOCKED sampai lulus |
| AUD-11 | ADR-007 mencampur autentikasi dan penyimpanan lokal serta tidak memuat perbandingan opsi yang cukup. | MEDIUM | 06-decision-log.md | DIREVISI — ADR-007 dan ADR-008 dipisah, opsi dicantumkan |
| AUD-12 | Status README/steering sebelumnya dapat terbaca sebagai keputusan sudah disepakati, padahal banyak keputusan masih OPEN. | MEDIUM | README.md, 04-steering.md | DIREVISI — arah awal belum final dan steering menunggu persetujuan |
| AUD-13 | Tidak ada batas biaya bulanan yang disetujui. | HIGH | 06-decision-log.md, 02-requirements.md | OPEN — ADR-011, OWNER TO DECIDE |
| AUD-14 | Vercel dilaporkan membangun proyek audio-document-player pada PR dokumentasi. Tindakan yang diminta adalah pemeriksaan konfigurasi dashboard Vercel oleh pemilik; jangan mengubah konfigurasi melalui repository ini sebagai bagian audit RF Doctor AI. | MEDIUM | Di luar folder RF Doctor AI; konfigurasi dashboard Vercel | OPEN — tindakan pemilik di dashboard Vercel |

| AUD-15 (B1) | Data operasional tidak boleh disimpan di repo publik. | BLOCKER | .gitignore, 04-steering.md, ADR-012 | DIREVISI; lokasi menunggu pemilik |
| AUD-16 (B2) | Checklist/aturan dan sumber kebenaran penyimpanan perlu diperjelas. | HIGH | 03-design.md, ADR-008 | DIREVISI; pilihan OPEN |
| AUD-17 (B3) | Backup, restore, retensi, dan penghapusan belum diputuskan. | HIGH | 02-requirements.md, ADR-013 | ADR-013 OPEN |
| AUD-18 (B4) | Fase, prioritas, dan kelas AC perlu dinyatakan sebagai usulan. | HIGH | 02-requirements.md | DIREVISI; PROPOSED |
| AUD-19 (B5) | Lokasi/format KB dan izin penggunaan perlu keputusan. | BLOCKER | 04-steering.md, ADR-012 | ADR-012 OPEN |
| AUD-20 (H1) | SPIKE dipisah menjadi baseline tanpa KB dan putaran dengan KB. | BLOCKER | 01, 05, 08 | DIREVISI; belum dijalankan |
| AUD-21 (H2) | AC perlu klasifikasi jenis uji. | MEDIUM | 02-requirements.md | DIREVISI; PROPOSED |
| AUD-22 (H3) | Ringkasan bukti menggantikan pilihan confidence oleh model. | HIGH | 02, 03, 04, 06 | DIREVISI; PROPOSED |
| AUD-23 (H4) | Status observasi, status KB, dan penyebab terkonfirmasi harus berbeda. | HIGH | 02-requirements.md, 03-design.md | DIREVISI; review perlu |
| AUD-24 (H5) | String UI, matriks perangkat, dan AC-07/AC-30 perlu dipisah. | MEDIUM | 02-requirements.md | DIREVISI; matriks perangkat OWNER TO DECIDE |
| AUD-25 (H6) | Status ADR dan opsi tanpa aplikasi kustom perlu eksplisit. | MEDIUM | 01, 06 | DIREVISI; ADR-001 OPEN |
| AUD-26 (H7) | Task KB-02, sanitizer, backup/hapus, dan ADR-010 perlu konsisten. | HIGH | 05-task-breakdown.md | DIREVISI; task BLOCKED |
| AUD-27 (H8) | Protokol SPIKE membutuhkan prompt A/B, rubrik, dan aturan privasi. | HIGH | 08-spike-01-protocol.md | DIREVISI; belum dijalankan |
| AUD-28 (M1) | Charter harus menyebut Phase 1 offline tanpa AI. | MEDIUM | 00-project-charter.md | DIREVISI |
| AUD-29 (M2) | Task persetujuan steering dan penanda audit belum tercatat. | LOW | 05-task-breakdown.md | DOC-06/DOC-07 ditambahkan |
| AUD-30 (M3) | README perlu indeks protokol dan catatan repo publik. | MEDIUM | README.md, .gitignore | DIREVISI |
| AUD-31 (M4) | Keterlacakan AC dan proses PR-only perlu konsisten. | MEDIUM | 02-requirements.md | DIREVISI; review perlu |
| AUD-32 (M5) | Sanitizer perlu pola email/NIK dan aturan Luhn yang aman. | HIGH | 02, 05 | DIREVISI; implementasi belum ada |
| AUD-33 (M6) | Laporan perlu membedakan pemeriksaan dokumen dari uji nyata. | MEDIUM | 07, 04 | Tes nyata belum dilakukan |

## Terverifikasi aman [REVISI AUDIT 2026-10-17 B2]

- Rujukan ADR harus cocok dengan ID yang tercatat di 06-decision-log.md; konsistensi otomatis pascaperubahan perlu diperiksa.
- Tidak ada status ADR yang diubah menjadi ACCEPTED/APPROVED.
- “DIREVISI DOKUMEN” bukan bukti SPIKE, build, atau uji perangkat lulus.

## Catatan status

- “DIREVISI” berarti perubahan dokumen dibuat; bukan berarti risiko sudah ditutup atau keputusan pemilik sudah diberikan.
- SPIKE-01 belum dijalankan oleh agent. Kasus nyata harus dianonimkan dan pemilik menilai hasilnya.
- ENV-01 belum dijalankan; tidak ada klaim build berhasil.
- Tidak ada keputusan platform, auth, penyimpanan, provider AI, batas biaya, atau ambang metrik yang dibuat atas nama pemilik.
- Temuan AUD-14 dicatat sebagai tindakan pemilik di dashboard Vercel dan tidak mengizinkan perubahan di repository ini.
