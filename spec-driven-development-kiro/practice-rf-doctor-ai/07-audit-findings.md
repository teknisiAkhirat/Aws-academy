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
