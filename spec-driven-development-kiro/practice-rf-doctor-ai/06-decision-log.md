# Decision Log — RF Doctor AI

Status: DRAFT / INITIAL  
Gunakan format: konteks → opsi → keputusan → konsekuensi. Keputusan yang belum disetujui tetap berstatus PROPOSED.

## ADR-001 — Android technician app

- Status: PROPOSED
- Context: aplikasi utama dipasang di HP teknisi dan digunakan untuk banyak perangkat pelanggan.
- Decision: Android native menggunakan Kotlin + Jetpack Compose.
- Consequence: integrasi Android dan UX native lebih baik, tetapi membutuhkan Android toolchain serta pengujian perangkat.
- Review: pastikan minimum Android API dan kebutuhan build bisa dipenuhi.

## ADR-002 — Backend provider boundary

- Status: PROPOSED
- Context: provider API key tidak aman bila ditanamkan dalam APK.
- Decision: semua panggilan model AI melalui backend server-side.
- Consequence: membutuhkan autentikasi, validasi, rate limiting, pengelolaan secret, dan monitoring biaya.

## ADR-003 — Backend platform

- Status: PROPOSED
- Context: pemilik ingin solusi murah dan sudah memiliki pengalaman dengan Cloudflare.
- Decision: evaluasi Cloudflare Workers + D1 sebagai default kandidat.
- Consequence: free-tier limits dan ketersediaan layanan harus dipantau; tidak ada deployment/billing tanpa izin.

## ADR-004 — AI provider portability

- Status: PROPOSED
- Context: harga, kuota, kualitas, dan kebijakan provider dapat berubah.
- Decision: desain adapter provider dan benchmark beberapa kandidat sebelum mengunci model.
- Consequence: ada biaya implementasi kecil untuk interface dan tests, tetapi mengurangi ketergantungan provider.

## ADR-005 — Manual customer-device input for MVP

- Status: PROPOSED
- Context: app di HP teknisi tidak otomatis mengakses telephony data HP pelanggan yang terpisah.
- Decision: diagnosis awal menggunakan gejala dan hasil pemeriksaan yang dimasukkan teknisi; integrasi langsung ditunda.
- Consequence: UX harus membuat input manual mudah dan tidak boleh berpura-pura data diambil otomatis.

## ADR-006 — Knowledge retrieval starts simple

- Status: PROPOSED
- Context: volume dan lisensi dokumen belum diketahui.
- Decision: mulai dari registry sumber dan pencarian teks; evaluasi vector retrieval setelah kebutuhan terbukti.
- Consequence: awal lebih sederhana; kualitas retrieval diukur dengan benchmark.

## ADR-007 — Authentication and local storage

- Status: OPEN / BLOCKING
- Options to evaluate: auth provider yang mendukung Android dan JWT validation pada Worker; local Room database dengan sync; atau online-first yang dibatasi untuk prototipe.
- Decision: belum dipilih.
- Blocking rule: endpoint tidak boleh dibuka publik tanpa auth dan rate limit. Strategi penyimpanan kasus harus disepakati sebelum case management diimplementasikan.

## ADR-008 — Source-of-truth and safety

- Status: PROPOSED
- Context: diagnosis teknis dapat merugikan perangkat jika AI mengarang langkah atau komponen.
- Decision: jawaban harus memisahkan fakta, hipotesis, ketidakpastian, dan langkah verifikasi; sumber harus berasal dari retrieval aktual.
- Consequence: backend perlu validasi output dan benchmark kasus sintetis yang ditinjau teknisi.