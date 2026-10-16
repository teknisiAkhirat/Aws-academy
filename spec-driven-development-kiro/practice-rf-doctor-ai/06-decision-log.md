# Decision Log — RF Doctor AI

> [REVISI AUDIT 2026-10-17] Semua keputusan arsitektur di bawah tetap PROPOSED atau OPEN sampai pemilik memilih secara eksplisit.

Status: DRAFT / INITIAL  
Gunakan format: konteks → opsi → keputusan → konsekuensi. Keputusan yang belum disetujui tidak boleh dianggap final.

## ADR-001 — Platform aplikasi

- Status: PROPOSED / OWNER TO DECIDE.
- Konteks: pemilik bekerja mobile-first dari HP melalui Termux, punya Oracle VPS, dan sudah memiliki aplikasi Flutter offline-first.
- Opsi yang dipertimbangkan:
  - Kotlin native + Jetpack Compose. Kelebihan: akses API Android dan pola native. Kekurangan: build/toolchain dari HP harus diuji; berpotensi lebih berat untuk setup.
  - Flutter. Kelebihan: pemilik sudah punya pengalaman/kode aplikasi Flutter offline-first dan dapat memakai ulang pola UI/data jika cocok. Kekurangan: reuse tidak boleh diasumsikan sebelum codebase diperiksa; plugin dan build tetap harus diuji.
  - PWA. Kelebihan: berpotensi mengurangi kebutuhan toolchain APK dan mudah diuji melalui browser. Kekurangan: batas API native, distribusi, dan offline behavior harus diuji terhadap kebutuhan.
  - Modul dari aplikasi yang sudah ada. Kelebihan: mungkin memanfaatkan UI, penyimpanan, atau pola yang sudah tersedia. Kekurangan: audit codebase diperlukan dan dapat menambah coupling/scope.
- Keputusan: belum dipilih.
- Konsekuensi: ENV-01 harus menyediakan bukti build/fit sebelum pemilik memilih.
- OWNER TO DECIDE: platform dan target distribusi.

## ADR-002 — Batas provider AI

- Status: PROPOSED.
- Konteks: API key provider tidak aman jika ditanamkan di APK.
- Opsi: panggilan langsung dari aplikasi versus panggilan server-side.
- Rekomendasi teknis untuk opsi backend: panggilan server-side agar secret tetap di server.
- Keputusan final: OPEN sampai fase backend disetujui.
- Konsekuensi: backend memerlukan auth, validasi, rate limit, dan kontrol biaya.

## ADR-003 — Backend dan database

- Status: OPEN / OWNER TO DECIDE.
- Konteks: backend hanya diperlukan bila SPIKE-01 membuktikan manfaat AI/knowledge online.
- Opsi yang dipertimbangkan:
  - Cloudflare Workers + D1. Kelebihan: satu ekosistem untuk API dan SQL database. Kekurangan: kuota, batas layanan, dan pola runtime perlu divalidasi.
  - Supabase. Kelebihan: menyediakan database Postgres dan layanan terkait; pemilik sudah pernah memakai proyek Supabase. Kekurangan: perlu meninjau status proyek, biaya/kuota, auth, dan kesesuaian untuk aplikasi ini.
  - Backend/DB lain yang telah tersedia. Kelebihan: dapat memanfaatkan resource yang sudah dimiliki. Kekurangan: perlu menilai operasi, keamanan, biaya, dan lock-in.
  - Tanpa backend. Kelebihan: paling sederhana dan tidak memerlukan layanan online pada fase awal. Kekurangan: tidak ada AI server-side atau sinkronisasi terpusat.
- Keputusan: belum dipilih; opsi tanpa backend tetap sah.
- OWNER TO DECIDE: apakah backend diperlukan dan, jika ya, platform/database yang dipilih.

## ADR-004 — Provider AI

- Status: OPEN.
- Konteks: harga, kuota, kebijakan data, dan kualitas model berubah.
- Opsi: provider gratis/berkuota, provider berbayar dengan batas biaya, atau tanpa AI online sampai manfaat terbukti.
- Keputusan: belum dipilih; jangan kirim data kasus ke provider sebelum privasi dan biaya disetujui.
- Kriteria evaluasi: ketepatan fakta, kualitas langkah verifikasi, sumber yang benar, ketidakpastian, latensi, privasi, dan biaya per kasus.
- Dependency: SPIKE-01.

## ADR-005 — Data perangkat pelanggan

- Status: PROPOSED.
- Konteks: aplikasi berjalan pada HP teknisi dan tidak otomatis mengakses data internal HP pelanggan yang terpisah.
- Opsi: input manual pada MVP; integrasi langsung ke perangkat pelanggan sebagai riset terpisah.
- Keputusan usulan: input manual; TelephonyManager bukan bagian MVP.
- Konsekuensi: UI tidak boleh berpura-pura data jaringan diambil otomatis.

## ADR-006 — Knowledge retrieval

- Status: PROPOSED.
- Konteks: volume dan izin sumber belum diketahui.
- Opsi: catatan lokal + pencarian teks; backend retrieval; vector search jika terbukti diperlukan.
- Keputusan usulan: mulai dari catatan pemilik yang dianonimkan dan ditinjau, lalu pencarian sederhana.
- Konsekuensi: kualitas dan cakupan knowledge base harus diuji pada SPIKE-01/KB-01.

## ADR-007 — Authentication and authorization

- Status: OPEN / BLOCKING jika backend publik dipilih.
- Opsi:
  - Auth provider terkelola dengan token yang diverifikasi backend. Kelebihan: mengurangi pembuatan sistem password sendiri. Kekurangan: integrasi, konfigurasi, dan kemungkinan batas/biaya provider.
  - Backend terbatas untuk penggunaan privat selama eksperimen. Kelebihan: scope awal lebih kecil. Kekurangan: tidak boleh dianggap aman untuk endpoint publik; perlu pembatasan akses yang jelas.
  - Tanpa auth karena tidak ada backend: tidak relevan jika opsi offline-only dipilih.
- Keputusan: belum dipilih.
- OWNER TO DECIDE: provider, alur login, serta kebutuhan akun.
- Gerbang: endpoint publik tidak boleh tersedia tanpa auth/authorization, validasi, dan rate limit yang sesuai.

## ADR-008 — Penyimpanan lokal dan sinkronisasi

- Status: OPEN / OWNER TO DECIDE.
- Opsi:
  - Database lokal di perangkat (misalnya Room untuk aplikasi Android native atau penyimpanan lokal sesuai platform). Kelebihan: kasus tetap tersedia offline. Kekurangan: backup, migrasi, dan sinkronisasi harus dirancang.
  - Online-first. Kelebihan: lebih sederhana untuk konsistensi server bila koneksi selalu ada. Kekurangan: kasus tidak tersedia tanpa internet dan kurang cocok untuk kerja servis lapangan.
  - Lokal dahulu, sinkronisasi belakangan. Kelebihan: dapat menguji MVP tanpa backend. Kekurangan: sinkronisasi konflik dan backup menjadi pekerjaan fase berikutnya.
- Keputusan: belum dipilih; usulan offline-first tidak mengikat pemilik.
- OWNER TO DECIDE: strategi lokal, backup, dan sinkronisasi.

## ADR-009 — Source of truth and safety (ADR-008 lama)

- Status: PROPOSED.
- Konteks: diagnosis teknis dapat merugikan perangkat jika AI mengarang langkah atau komponen.
- Keputusan usulan: pisahkan fakta, laporan, hipotesis, dan hasil verifikasi; sumber harus berasal dari retrieval aktual; confidence diturunkan dari aturan bukti yang disetujui, bukan dipilih model.
- Konsekuensi: perlu validasi output dan benchmark kasus yang ditinjau teknisi/pemilik.

## ADR-010 — Lingkungan build

- Status: OPEN / OWNER TO DECIDE.
- Konteks: pemilik bekerja dari HP melalui Termux dan memiliki Oracle VPS; ketersediaan build environment belum diuji.
- Opsi: build lokal Termux, GitHub Actions, Oracle VPS, atau build pada lingkungan lain lalu mengunduh artefak.
- Kelebihan/kekurangan: berbeda menurut platform, toolchain, penyimpanan, koneksi, dan pemeliharaan; semua perlu diuji pada ENV-01.
- OWNER TO DECIDE: jalur build utama dan fallback.
- Tidak ada instalasi, perubahan VPS, secret, atau biaya yang dilakukan tanpa izin.

## ADR-011 — Batas biaya bulanan dan metrik keberhasilan

- Status: OPEN / OWNER TO DECIDE.
- Konteks: biaya AI, backend, storage, build, dan konektivitas belum diketahui; nilai produk juga belum dibuktikan.
- Opsi: tidak ada layanan berbayar; hanya layanan gratis dengan batas penggunaan; atau biaya berbayar dengan hard cap dan persetujuan pemilik.
- OWNER TO DECIDE: batas biaya bulanan = nominal belum ditetapkan.
- OWNER TO DECIDE: jumlah kasus evaluasi, target keberhasilan top-3, target waktu per kasus, dan rubrik SPIKE-01.
- Konsekuensi: tidak boleh mengaktifkan billing atau memilih target angka atas nama pemilik.
