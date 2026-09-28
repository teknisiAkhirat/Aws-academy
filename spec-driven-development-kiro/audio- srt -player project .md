### requrement. md
# Requirement — Audio Subtitle Player (ASP)

**Versi dokumen:** 1.0
**Tanggal:** 2026-09-29
**Status:** Draft — menunggu review
**Target path:** `C:\Users\mubarok's service\Documents\audio-sub-player\requirement.md`

---

## 1. Ringkasan

Aplikasi web (PWA) untuk memutar file audio lokal dengan subtitle yang **tersinkron akurat** dengan audio. Berjalan **offline-first** — setelah kunjungan pertama, aplikasi berfungsi penuh tanpa koneksi internet. Seluruh data pengguna disimpan di perangkat (**local database**), tanpa server, tanpa akun, tanpa telemetri.

Fokus utama produk ini adalah **akurasi sinkronisasi subtitle** dan **keandalan offline**, bukan sekadar memutar berkas audio.

---

## 2. Tujuan & Non-Tujuan

### 2.1 Tujuan

| ID | Tujuan | Ukuran sukses |
|---|---|---|
| G-1 | Subtitle sinkron dengan audio tanpa drift kumulatif | Drift < 50 ms setelah 60 menit playback |
| G-2 | 100% berfungsi tanpa internet setelah install | 0 request network saat runtime |
| G-3 | Library lokal user tetap utuh setelah browser ditutup atau me-restart | 100% item dapat diputar ulang |
| G-4 | Penyesuaian timing subtitle mudah dilakukan | Koreksi ±1 detik selesai dalam < 3 klik |
| G-5 | Resume playback dari posisi terakhir | Posisi tersimpan dengan error < 1 detik |

### 2.2 Non-Tujuan (Out of Scope untuk v1)

Fitur berikut **secara eksplisit tidak ada di v1** dan tidak boleh diimplementasikan di v1:

- Streaming dari server atau media library online
- Akun pengguna, login, sinkronisasi antar device
- Streaming video (hanya audio)
- Edit atau authoring subtitle (hanya playback dan baca)
- Editor waveform
- Multi-track subtitle per file (satu file audio = satu subtitle di v1)
- Dukungan subtitle ASS/SSA, SUB, atau PGS (berbasis gambar)
- Clustering, embeddings, rekomendasi, atau fitur AI
- i18n antarmuka (UI v1 menggunakan Bahasa Indonesia)

---

## 3. Persona & User Story

### 3.1 Persona

**P1 — Pelajar Bahasa.** Mendengarkan podcast atau cerita Bergen 1 jam, membutuhkan subtitle untuk memahami dan menghafal, sering dalam keadaan offline.

**P2 — Pekerja yang Sibuk.** Mendengarkan materi terpotong 5–15 menit secara revenge, sering terputus, membutuhkan **resume** dan **bookmark** untuk bagian penting.

**P3 — Penggemar Offline.** Sering berada di transportasi atau tempat tanpa sinyal, mutlak membutuhkan aplikasi yang tetap berfungsi tanpa internet.

### 3.2 User Story

Format: Sebagai …, saya ingin …, agar …

| ID | User Story |
|---|---|
| US-01 | Sebagai pengguna, saya ingin memilih file audio dari device saya agar dapat memutar konten milik saya sendiri. |
| US-02 | Sebagai pengguna, saya ingin memilih file subtitle (.srt/.vtt) dan melihatnya tampil langsung sinkron dengan audio. |
| US-03 | Sebagai pengguna, saya ingin menggeser subtitle agar lebih cepat atau lambat agar cocok dengan audio saya. |
| US-04 | Sebagai pengguna, saya ingin menandai bagian penting agar mudah ditemukan kembali. |
| US-05 | Sebagai pengguna, saya ingin aplikasi mengingat posisi terakhir agar tidak kehilangan tempat. |
| US-06 | Sebagai pengguna, saya ingin seluruh library saya tetap ada setelah browser ditutup. |
| US-07 | Sebagai pengguna, saya ingin aplikasi tetap berfungsi tanpa internet agar tidak terputus. |
| US-08 | Sebagai pengguna, saya ingin library tersusun rapi agar mudah dicari. |

---

## 4. Kebutuhan Fungsional

Prioritas: **M** = Must (wajib di v1), **S** = Should (v1 bila waktu cukup), **C** = Could (tidak di v1)

### 4.1 Manajemen File & Library

| ID | Prioritas | Kebutuhan |
|---|---|---|
| FR-01 | M | User dapat memilih satu file audio melalui file picker. Format yang didukung divalidasi sebelum diterima; jika tidak didukung, tampilkan pesan error yang jelas (lihat §7.1). |
| FR-02 | M | User dapat memilih satu file subtitle (.srt / .vtt) dan mengaitkannya ke sebuah item library. |
| FR-03 | M | Setiap item library tersimpan permanen di local database dan **tetap dapat diputar ulang setelah reload atau restart browser**. |
| FR-04 | M | Setiap item memiliki metadata: judul, nama file audio, nama file subtitle, durasi, ukuran, dan waktu ditambahkan. |
| FR-05 | M | User dapat menghapus item dari library, dengan langkah konfirmasi. |
| FR-06 | M | User dapat mengganti file subtitle pada item yang sudah ada tanpa menambahkan ulang file audio. |
| FR-07 | M | Jika file asli tidak ditemukan (dipindah, diubah, atau izin dicabut), sistem menandai item tersebut **"File Tidak Tersedia"** dan menyediakan aksi *re-link* (pilih file lagi) tanpa kehilangan bookmark dan progress. |
| FR-08 | M | User dapat **export** seluruh metadata library, bookmark, progress, dan preferensi ke berkas JSON, serta **import** kembali. Ini adalah satu-satunya jalur pemulihan ketika data browser dihapus. |
| FR-09 | S | User dapat melihat daftar item yang bermasalah (file hilang atau perlu izin ulang) di halaman Library. |
| FR-10 | C | Pencarian dan filter library berdasarkan judul. |

### 4.2 Player & Playback

| ID | Prioritas | Kebutuhan |
|---|---|---|
| FR-11 | M | Play/pause melalui tombol UI dan keyboard. |
| FR-12 | M | Seek bar yang dapat diklik dan di-drag untuk berpindah posisi. |
| FR-13 | M | Tampilan waktu berjalan `mm:ss` (atau `hh:mm:ss` bila lebih dari 1 jam) beserta durasi total. |
| FR-14 | M | Kontrol volume dan mute. |
| FR-15 | M | Playback speed (0.5x, 0.75x, 1x, 1.25x, 1.5x, 2x) **tanpa membuat subtitle kehilangan sinkronisasi**. |
| FR-16 | S | Nilai skip configurable (lompat 5 / 10 / 15 / 30 detik). |
| FR-17 | S | Pitch preservation saat playback rate diubah, bila didukung browser. |
| FR-18 | C | Sleep timer. |

### 4.3 Subtitle — Fitur Inti

| ID | Prioritas | Kebutuhan |
|---|---|---|
| FR-19 | M | Subtitle ditampilkan sebagai overlay di atas player dengan **latar semi-transparan** agar teks selalu terbaca di atas artwork apa pun. |
| FR-20 | M | Subtitle tampil **tepat sesuai timing cue**, tanpa delay atau subtitle basi. |
| FR-21 | M | Mendukung format **SRT** dan **WebVTT**, keduanya di-parse oleh aplikasi sendiri (bukan `<track>` native). |
| FR-22 | M | Mendukung penandaan inline pada cue: bold, italic, dan line break. |
| FR-23 | M | Subtitle dapat ditampilkan atau disembunyikan (toggle) **tanpa menghentikan audio**. |
| FR-24 | M | **Offset adjustment:** user dapat menggeser subtitle terhadap audio pada rentang **-5000 ms sampai +5000 ms**, dengan presisi 100 ms (preset ±100 ms dan ±500 ms). |
| FR-25 | M | Penyesuaian offset berlaku **langsung secara real-time** saat audio diputar, sehingga user dapat menyetel sambil mendengarkan. |
| FR-26 | M | Nilai offset **tersimpan per item** (bukan global saja), dengan nilai default global yang dapat disesuaikan. |
| FR-27 | M | User dapat mereset offset ke 0 untuk item tertentu. |
| FR-28 | S | Menampilkan cue sebelumnya dan berikutnya; klik pada daftar cue untuk melompat ke waktu tersebut. |
| FR-29 | S | Daftar cue dapat dicari berdasarkan teks di dalam subtitle. |
| FR-30 | C | Gaya subtitle yang dapat dikustomisasi (font, ukuran, warna, posisi). **Ditunda** — tidak ada di v1; style memakai default yang telah ditetapkan. |
| FR-45 | S | **Guided Sync Wizard:** saat pertama kali subtitle dilampirkan ke sebuah item, aplikasi menawarkan *(menawarkan, bukan memaksa)* wizard 3 langkah — pendahuluan, dengarkan 15 detik pertama, lalu sesuaikan offset — untuk membantu user menyetel sinkronisasi tanpa perlu paham istilah offset. Durasi total 30–45 detik. Hasil disimpan sebagai `subtitleOffsetMs` item tersebut. Rincian lengkap ada di `design.md` §10. |

> **Catatan penomoran:** FR-45 adalah satu-satunya penambahan setelah requirement ini ditulis; ID-nya sengaja tidak diurutkan ulang agar rujukan yang sudah ada (termasuk di `design.md` §14) tetap valid.

### 4.4 Bookmark & Progress

| ID | Prioritas | Kebutuhan |
|---|---|---|
| FR-31 | M | User dapat membuat **bookmark** pada waktu tertentu, memberi label (default `mm:ss`), serta mengedit dan menghapus label. |
| FR-32 | M | User dapat melihat daftar bookmark sebuah item dan melompat ke bookmark tersebut. |
| FR-33 | M | Posisi playback terakhir **tersimpan otomatis** per item. |
| FR-34 | M | Saat membuka item, user ditawarkan **"Lanjut dari mm:ss"**, lengkap dengan aksi "Mulai dari awal". |
| FR-35 | M | Item ditandai **"Selesai"** otomatis pada ambang **≥ 95%** durasi, atau saat event `ended` terpicu. |
| FR-36 | M | User dapat mereset progress atau menandai item belum selesai secara manual. |
| FR-37 | S | Bookmark dapat diekspor sebagai berkas `.srt` baru (subtitle dengan cue tambahan). |

### 4.5 Offline / PWA

| ID | Prioritas | Kebutuhan |
|---|---|---|
| FR-38 | M | Aplikasi dapat **dipasang (install)** sebagai PWA, dengan manifest dan ikon yang benar. |
| FR-39 | M | Seluruh app shell (JS, CSS, font) di-precache saat build, sehingga **tidak ada request ke CDN pihak ketiga saat runtime**. |
| FR-40 | M | Aplikasi berfungsi penuh dengan DevTools → Network → Offline. |
| FR-41 | M | Navigasi SPA tetap berfungsi saat offline melalui fallback ke `index.html`. |
| FR-42 | M | Saat ada versi baru, aplikasi menampilkan notifikasi **"Pembaruan tersedia"** dengan tombol reload — **tidak memaksa reload di tengah playback**. |
| FR-43 | S | Aplikasi meminta persistent storage (`navigator.storage.persist()`) agar data tidak di-evict browser. |
| FR-44 | S | Menampilkan penggunaan storage (`navigator.storage.estimate()`) di halaman Settings. |

---

## 5. Kebutuhan Non-Fungsional

| ID | Kategori | Kebutuhan |
|---|---|---|
| NFR-01 | Performa | Sinkronisasi subtitle: selisih waktu antara posisi audio dan cue yang ditampilkan **tidak boleh melebihi 1 frame (sekitar 17 ms)**. |
| NFR-02 | Performa | **Zero drift kumulatif** setelah 60 menit playback (lihat §11.1, R-01). |
| NFR-03 | Performa | Playback tetap 60 fps tanpa dropped frame yang perceptible saat subtitle aktif. |
| NFR-04 | Performa | Parsing file subtitle dengan 5.000 cue selesai di bawah 300 ms. |
| NFR-05 | Performa | Pencarian library dengan 1.000 item merespons di bawah 100 ms. |
| NFR-06 | Performa | Cold start dari cache service worker di bawah 1,5 detik. |
| NFR-07 | Privasi | **Tidak ada** request network keluar dari browser setelah app ter-cache. Nol telemetry, nol analytics, nol font eksternal. |
| NFR-08 | Privasi | Tidak ada data yang keluar dari device. Tidak ada backend. |
| NFR-09 | Ketahanan | Menangani `QuotaExceededError` dengan pesan yang dapat dipahami user, **tanpa crash**. |
| NFR-10 | Ketahanan | Menangani file subtitle rusak atau format tak dikenal dengan fallback: aplikasi tetap jalan, subtitle kosong, pesan error non-blocking. |
| NFR-11 | Kompatibilitas | Chrome/Edge sebagai target utama; Firefox dan Safari best-effort (lihat §7.2). |
| NFR-12 | Aksesibilitas | Semua kontrol dapat diakses via keyboard; visible focus ring; label ARIA pada tombol ikon; kontras teks subtitle minimal 4.5:1 terhadap latar. |
| NFR-13 | Aksesibilitas | User dapat mengaktifkan subtitle dari keyboard saat audio diputar. |
| NFR-14 | Responsif | Layout optimal dari 360 px (mobile) hingga 1920 px dan lebih. |
| NFR-15 | Kualitas Kode | TypeScript dengan `strict: true`. Lint dan typecheck harus lolos sebelum merge. |

### 5.1 Pintasan Keyboard

| Key | Aksi |
|---|---|
| `Space` / `K` | Play / Pause |
| `J` / `L` | Mundur / Maju 10 detik |
| `←` / `→` | Mundur / Maju 5 detik |
| `Shift` + `←` / `→` | Mundur / Maju 1 detik (fine nudge saat memeriksa sinkronisasi) |
| `Shift` + `J` / `L` | Mundur / Maju 60 detik |
| `C` | Tampilkan / sembunyikan subtitle |
| `↑` / `↓` | Lompat ke cue sebelumnya / berikutnya |
| `[` / `]` | Offset subtitle -100 ms / +100 ms |
| `Shift` + `[` / `]` | Offset subtitle -500 ms / +500 ms |
| `0` | Reset offset subtitle ke 0 |
| `B` | Tambah bookmark di posisi saat ini |
| `M` | Mute / unmute |
| `,` / `.` | Playback rate turun / naik satu step |
| `F` | Fullscreen player |

---

## 6. Model Data

Semua data aplikasi disimpan di **`localStorage`** dengan key yang di-versioning (`asp:v1:*`) agar migrasi skema di masa depan tetap aman.

**Aturan mutlak: `localStorage` tidak pernah menyimpan isi file audio maupun subtitle.** Lihat §8.6.

### 6.1 Tipe Dasar

```ts
type MediaSource = 'fsa' | 'idb';
// 'fsa' = FileSystemFileHandle disimpan di IndexedDB (file TIDAK disalin)
// 'idb' = Blob file disalin ke IndexedDB (fallback untuk browser tanpa FSA)

interface MediaRef {
  fingerprint: string;        // hash(name + size + lastModified) - deteksi file berubah
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  lastModified: number;       // epoch ms
  source: MediaSource;
  idbKey?: string;            // key object di IndexedDB (wajib bila source = 'idb')
}

interface SubtitleRef extends MediaRef {
  format: 'srt' | 'vtt';
}
```

### 6.2 Skema `Cue` — model subtitle ternormalisasi

Semua format di-parse menjadi model yang sama. Inilah kontrak internal yang dipakai player.

```ts
interface Cue {
  index: number;      // urutan dalam file, mulai dari 0
  startMs: number;    // integer milliseconds, inklusif
  endMs: number;      // integer milliseconds, eksklusif
  text: string;       // teks bersih; '\n' = line break; tag bold/italic dinormalisasi
  settings?: {        // opsional, hasil normalisasi tag WebVTT
    bold?: boolean;
    italic?: boolean;
  };
}
```

Array cue **wajib terurut menaik berdasarkan `startMs`**. Asumsi ini dipakai algoritma sinkronisasi (§8.2).

### 6.3 LocalStorage Keys

| Key | Tipe | Isi |
|---|---|---|
| `asp:v1:library` | `LibraryItem[]` | Daftar item library |
| `asp:v1:progress` | `Record<string, Progress>` | Posisi terakhir per item |
| `asp:v1:bookmarks` | `Record<string, Bookmark[]>` | Bookmark per item |
| `asp:v1:prefs` | `Prefs` | Preferensi global |
| `asp:v1:schema` | `number` | Versi skema untuk migrasi |

### 6.4 Definisi

```ts
interface LibraryItem {
  id: string;                    // uuid v4
  title: string;                 // default = nama file audio tanpa ekstensi, dapat diedit
  audio: MediaRef;
  subtitle: SubtitleRef | null;  // v1: maksimum satu subtitle per item
  durationMs: number;            // 0 bila belum pernah diputar (belum diketahui)
  subtitleOffsetMs: number;      // default 0, rentang -5000..5000
  syncHintDismissed: boolean;    // true bila user menolak Guided Sync Wizard (FR-45); default false
  tags: string[];
  createdAt: number;
  updatedAt: number;
  status: 'ok' | 'missing_audio' | 'missing_subtitle' | 'needs_permission';
}

interface Progress {
  positionMs: number;
  durationMs: number;
  completed: boolean;   // true bila >= 95% durasi atau event 'ended'
  updatedAt: number;
}

interface Bookmark {
  id: string;           // uuid v4
  timeMs: number;
  label: string;        // default "Bookmark @ 12:34", dapat diedit user
  createdAt: number;
}

interface Prefs {
  globalSubtitleOffsetMs: number;   // default 0
  playbackRate: number;             // default 1, pilihan dari FR-15
  skipStepSec: 5 | 10 | 15 | 30;    // default 10
  preservePitch: boolean;           // default true
  subtitleVisible: boolean;         // default true
  lastPlayedItemId: string | null;
  theme: 'light' | 'dark' | 'system';  // default 'system'
}
```

### 6.5 IndexedDB — Penyimpanan Referensi File, Bukan Database Aplikasi

IndexedDB hanya dipakai sebagai **tempat menyimpan referensi file**, bukan sebagai query engine. Satu object store: `files` dengan keyPath `idbKey`.

| Record | Kapan ditulis |
|---|---|
| `FileSystemFileHandle` | Saat import melalui FSA picker |
| `Blob` (isi file) | Saat import melalui `<input type="file">` di browser tanpa FSA |

Data pada store ini **tidak dapat di-export** karena ukurannya bisa mencapai GB. Export manifest (FR-08) hanya berisi `fingerprint` dan metadata.

---

## 7. Dukungan Format & Browser

### 7.1 Format Audio

Divalidasi saat import menggunakan `HTMLAudioElement.canPlayType(mime)`. Bila mengembalikan string kosong, tolak dengan pesan.

| Format | MIME | Chrome/Edge | Firefox | Safari |
|---|---|---|---|---|
| MP3 | `audio/mpeg` | Ya | Ya | Ya |
| M4A / AAC | `audio/mp4` | Ya | Ya | Ya |
| WAV | `audio/wav` | Ya | Ya | Ya |
| FLAC | `audio/flac` | Ya | Ya | Ya |
| Opus (OGG) | `audio/ogg; codecs=opus` | Ya | Ya | Parsial |
| OGG Vorbis | `audio/ogg; codecs=vorbis` | Ya | Ya | Tidak |
| WebM/Opus | `audio/webm; codecs=opus` | Ya | Ya | Tidak |
| M4B (audiobook) | `audio/mp4` | Ya | Ya | Ya |

**Target v1 (wajib):** MP3, M4A/AAC, WAV, FLAC.
**Best-effort:** format lain, divalidasi saat runtime.

### 7.2 Dukungan Browser & Konsekuensinya

| Fitur | Chrome/Edge | Firefox | Safari |
|---|---|---|---|
| `showOpenFilePicker` (File System Access) | Ya | Tidak | Tidak |
| `queryPermission` / `requestPermission` | Ya | Tidak | Tidak |
| OPFS (`navigator.storage.getDirectory`) | Ya | Ya | Ya |
| IndexedDB | Ya | Ya | Ya |
| Service Worker | Ya | Ya | Ya |
| `navigator.storage.persist()` | Ya | Ya | Tidak stabil |

**Konsekuensi arsitektur — krusial:** browser tanpa FSA **wajib menyalin** file ke IndexedDB sehingga terkena quota browser. Chrome memberi kuota longgar (sekitar 60% disk), Firefox sekitar 10% dengan batas 10 GB, Safari sekitar 1 GB. Karena itu:

- **Rekomendasi utama ke user: gunakan Chrome atau Edge.**
- Bila jalur fallback `idb` dipakai, aplikasi **wajib** menampilkan perkiraan ukuran total library dibandingkan kuota (`navigator.storage.estimate()`) dan memperingatkan sebelum import berkas besar.
- Penanganan `QuotaExceededError` (NFR-09) bersifat **wajib**, bukan opsional.

### 7.3 Format Subtitle (v1)

| Format | Dukungan | Catatan |
|---|---|---|
| `.srt` | **Wajib** | Parser ditulis dari nol. Timestamp `HH:MM:SS,mmm` dan `MM:SS,mmm` |
| `.vtt` | **Wajib** | Parser ditulis dari nol. Menangani cue settings (`<b>`, `<i>`, `<00:00:01.000>`) serta melewati block `NOTE`, `STYLE`, `REGION` |
| `.ass` / `.ssa` | Nanti | Parser kompleks: styling, `\N`, karaoke `\k` |
| `.sub` (MicroDVD) / `.idx` | Nanti | |
| Gambar (PGS / VobSub) | Tidak | Memerlukan canvas compositing |

**Keputusan penting:** subtitle **di-parse sendiri**, bukan melalui elemen native `<track>`. Alasannya di §8.5.

---

## 8. Arsitektur & Keputusan Teknis

### 8.1 Stack yang Dipilih

| Layer | Pilihan | Alasan |
|---|---|---|
| Build tool | **Vite 7** + TypeScript | Cold start cepat, plugin PWA matang, konfigurasi sederhana |
| UI framework | **React 19** | Ekosistem dan referensi terluas; cocok untuk komponen player yang interaktif |
| Styling | **Tailwind CSS v4** | Tanpa runtime JS, aman untuk PWA |
| State management | **Zustand** | Ringan, mendukung selector sehingga re-render dapat diisolasi per komponen |
| PWA | **vite-plugin-pwa** (Workbox) | Precache dan update flow standar, sedikit kode manual |
| Database aplikasi | **localStorage** (JSON) | Data kecil (metadata), sederhana, mudah di-backup dan di-inspect |
| Penyimpanan file | **IndexedDB** | Satu-satunya tempat untuk `FileSystemFileHandle` dan `Blob` |
| Parser subtitle | **Custom TypeScript** | Memerlukan kontrol penuh atas normalisasi dan timing |
| Test unit | **Vitest** | Cepat, native ESM, integrasi penuh dengan Vite |
| Test E2E | **Playwright** | Verifikasi requirement offline dan sinkronisasi |
| Font | **System font stack** | Menghindari request eksternal (NFR-07) |

### 8.2 Keputusan Kritis #1 — Mekanisme Sinkronisasi Subtitle

**Aturan:** posisi subtitle **selalu** diturunkan dari `audio.currentTime` yang dibaca di dalam loop `requestAnimationFrame`.

**Dilarang** menggunakan `setInterval`, `setTimeout`, atau event `timeupdate` sebagai sumber kebenaran subtitle.

```ts
// Konseptual — inilah inti sinkronisasi
let cues: Cue[] = [];
let pointer = 0;                 // index kandidat, naik monoton
let offsetMs = 0;

function onFrame() {
  const displayMs = audio.currentTime * 1000 + offsetMs;   // media time, bukan wall clock

  // 1. Majukan pointer melewati cue yang sudah selesai
  while (pointer < cues.length && cues[pointer].endMs <= displayMs) pointer++;

  // 2. Tentukan cue aktif
  const cue = (pointer < cues.length && cues[pointer].startMs <= displayMs)
    ? cues[pointer]
    : null;

  // 3. Tulis DOM HANYA bila cue berubah (bukan tiap frame)
  if (cue?.index !== lastRenderedIndex) {
    overlayEl.textContent = cue ? cue.text : '';
    lastRenderedIndex = cue?.index ?? -1;
  }

  if (!audio.paused) requestAnimationFrame(onFrame);
}
```

**Konsekuensi dan alasan:**

- **Drift = 0.** Karena tidak ada akumulasi timer, tidak ada kemungkinan subtitle "meninggalkan" audio walaupun berjalan 2 jam.
- `timeupdate` **tidak dipakai** untuk subtitle karena hanya fired sekitar 4 kali per detik (250 ms) — jauh terlalu kasar.
- **Otomatis benar saat `playbackRate` bukan 1**, karena `currentTime` adalah *media time*, bukan waktu nyata. Tidak perlu koreksi tambahan.
- `playbackRate` 2x berarti 1 frame setara sekitar 33 ms media time. Masih jauh di bawah durasi cue tipikal yang di atas 500 ms.
- **Re-render hanya saat index cue berubah**, sehingga subtitle tidak berkedip dan tidak terjadi re-render 60 kali per detik.

**Search saat seek:** `pointer` di-reset menggunakan **binary search** (`upperBound(cues, displayMs)`), bukan di-loop dari nol. Diperlukan agar seek ke ujung file 2 jam tetap terasa instan.

### 8.3 Keputusan Kritis #2 — `currentTime` Tidak Boleh Masuk React State

`audio.currentTime` berubah sekitar 60 kali per detik. Bila disimpan di React state atau Zustand yang di-subscribe komponen, aplikasi akan re-render 60 kali per detik dan mengalami jank.

| Data | Mekanisme | Frekuensi update |
|---|---|---|
| Overlay subtitle | Tulis langsung ke `textContent` DOM di dalam rAF loop | Hanya saat cue berganti |
| Progress bar (width) | CSS custom property atau direct style write di rAF loop | 60 fps, tanpa React |
| Jam waktu (`mm:ss`) | Throttle di rAF + pembulatan 1 detik | Sekitar 1 fps |
| State React (playing, rate, volume) | Zustand | Hanya saat benar-benar berubah |
| `positionMs` untuk storage | Throttle | Setiap 5–10 detik, plus saat pause dan unload |

**Aturan:** komponen yang membutuhkan data high-frequency **tidak boleh** memakai `useState` atau `useSelector` untuk data tersebut. Gunakan `ref` dan imperative DOM write.

### 8.4 Keputusan Kritis #3 — Persistensi File Lokal

`URL.createObjectURL(file)` menghasilkan URL yang **mati setelah page reload**.

| Strategi | Bertahan setelah reload | Memakai kuota | Dukungan browser |
|---|---|---|---|
| `createObjectURL` saja | Tidak | Tidak | Semua |
| **FSA handle → IndexedDB** | Ya | **Tidak** | Chrome/Edge |
| **Blob → IndexedDB** | Ya | Ya | Semua |

**Strategi hybrid (wajib):**

```ts
async function importAudio(): Promise<MediaRef> {
  if ('showOpenFilePicker' in window) {
    // Jalur utama: file TIDAK disalin, kuota aman
    const [handle] = await window.showOpenFilePicker({
      types: [{
        description: 'Audio',
        accept: {
          'audio/*': ['.mp3', '.m4a', '.wav', '.flac', '.ogg', '.opus', '.webm', '.m4b'],
        },
      }],
      multiple: false,
    });
    await saveToIdb('audio', handle);        // structured-cloneable
    return { /* ... */, source: 'fsa' };
  }

  // Fallback: wajib menyalin, terkena kuota
  const file = await pickViaInputElement();
  const idbKey = await saveToIdb('audio', file);   // Blob
  return { /* ... */, source: 'idb' };
}
```

**Restore dan permission (FR-07):**

- FSA handle **dapat tersimpan** di IndexedDB, tetapi permission **tidak**. Setiap kali app dibuka: `await handle.queryPermission({ mode: 'read' })`.
  - `granted` → langsung pakai.
  - `prompt` → set `status: 'needs_permission'`, tampilkan tombol "Izinkan akses" (wajib dipicu oleh **user gesture**, karena `requestPermission()` memerlukannya).
  - `denied` → `status: 'missing_audio'`.
- Deteksi file berubah: hitung ulang `fingerprint`. Bila berbeda → `status: 'missing_audio'` dan tawarkan re-link. **Bookmark dan progress tidak boleh terhapus** saat re-link.
- `navigator.storage.persist()` dipanggil sekali saat onboarding (FR-43) untuk mengurangi risiko eviction.

### 8.5 Keputusan Kritis #4 — Parse Subtitle Sendiri, Bukan `<track>`

Elemen native `<track>` ditolak karena:

1. **Styling** subtitle lintas browser sangat terbatas. `::cue` tidak konsisten, dan zona penempatan teks berbeda antar browser.
2. **Offset adjustment** native tidak ada — harus menggeser berkas `.vtt` itu sendiri.
3. **Kontrol presentasi** tidak tersedia: klik cue untuk seek, panel daftar cue, dan reveal on click.
4. Normalisasi `settings` seperti bold dan italic dari SRT tidak ada di API native.

Konsekuensinya kita harus menulis parser sendiri, yang menambah beban pada kompatibilitas format. Ini adalah trade-off yang disengaja dan sudah di-cover oleh test (§12, §14).

### 8.6 Keputusan Kritis #5 — LocalStorage untuk Data, Bukan untuk File

Sesuai pilihan produk, database aplikasi memakai `localStorage` dengan JSON. Batasan yang harus dihormati:

- `localStorage` bersifat **sinkron** (blocking) dan berkapasitas sekitar 5–10 MB. Penulisan harus di-**debounce**, bukan dilakukan di setiap event `timeupdate`.
- **Dilarang** menyimpan isi file audio atau subtitle di sini — tidak memungkinkan secara teknis, dan akan langsung menghabiskan kuota.
- Ukuran data aplikasi di v1: sekitar 1–2 KB per item. 1.000 item sekitar 1–2 MB. Masih aman.
- Akses selalu lewat satu wrapper dengan `try/catch` (kuota penuh atau mode privat browser), bukan `localStorage.getItem` telanjang di seluruh codebase.

> **Catatan arsitektur:** bila di masa depan library tumbuh ke ribuan item *dan* muncul kebutuhan query seperti filter multi-kriteria atau full-text search pada cue, LocalStorage akan menjadi bottleneck. Plan migrasi ke IndexedDB atau Dexie sudah disiapkan karena skema di §6 sengaja didesain index-friendly dan seluruh aksesnya terisolasi dalam satu modul.

### 8.7 Service Worker

- `registerType: 'autoUpdate'`, `workbox.globPatterns: ['**/*.{js,css,html,woff2,png,svg,ico}']`.
- **Jangan** melakukan cache terhadap request eksternal — ini memastikan NFR-07 tetap terpenuhi.
- `navigateFallback: 'index.html'` untuk mendukung deep-link saat offline (FR-41).
- Saat update terpasang: emit event ke UI, lalu tampilkan toast "Pembaruan tersedia" (FR-42). **Reload hanya terjadi atas klik user**, dan preferably saat player sedang tidak berjalan.
- Service worker **wajib** berjalan pada secure context: `https://` atau `http://localhost`. Deploy ke static host dengan HTTPS; protokol `file://` **tidak** didukung.

### 8.8 Struktur Direktori (target)

```
audio-sub-player/
├── requirement.md
├── package.json
├── vite.config.ts
├── index.html
├── public/
│   ├── manifest.webmanifest
│   ├── icons/            (192, 512, maskable)
│   └── fonts/            (jika ada; default: system stack)
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── lib/
    │   ├── storage/      # wrapper localStorage + skema + migrasi
    │   ├── idb/          # wrapper IndexedDB untuk file handle / blob
    │   ├── subtitle/     # parse-srt.ts, parse-vtt.ts, cue-sync.ts
    │   ├── player/       # audio-controller.ts, rAF loop
    │   └── platform/     # feature-detect FSA, kuota, persist
    ├── store/            # Zustand: player, library, prefs
    ├── components/
    │   ├── player/       # Player, SeekBar, SubtitleOverlay, BookmarkPanel
    │   ├── library/      # LibraryList, ImportDialog, RelinkDialog
    │   └── ui/           # button, dialog, toast, slider
    ├── hooks/            # useAudioEngine, useKeyboardShortcuts, useSubtitle
    └── routes/           # LibraryPage, PlayerPage, SettingsPage
```

---

## 9. Peta Halaman & Komponen

| Halaman | Rute | Komponen Utama |
|---|---|---|
| **Library** | `/` | `LibraryPage`, `LibraryGrid`, `LibraryCard`, `ImportDialog`, `RelinkDialog`, `SearchInput`, `MissingFilesBanner`, `EmptyState` |
| **Player** | `/play/:itemId` | `PlayerPage`, `AudioEngine`, `SubtitleStage`, `SubtitleOverlay`, `OffsetPanel`, `OffsetReadout`, `MiniTimeline`, `SyncWizard`, `CueList`, `BookmarkPanel`, `ResumePrompt`, `Dock`, `TransportControls`, `SeekBar`, `RateSelector`, `VolumeControl`, `ShortcutReference` |
| **Settings** | `/settings` | `SettingsPage`, `PrefsEditor`, `StorageUsage`, `ExportImport`, `InstallButton`, `ShortcutReference` |
| **Shared** | (semua rute) | `AppShell`, `AppBar`, `NavTabs`, `OfflineBadge`, `Dock`, `DockMeta`, `Button`, `IconButton`, `Dialog`, `Toast`, `Tooltip`, `Slider`, `Segmented`, `Switch`, `Badge`, `Tabs`, `Skeleton`, `EmptyState`, `BookmarkItem`, `CueListItem` |

> Nama komponen di tabel ini mengikuti **nama berkas** pada `design.md` §6.1. Dock adalah kontrol playback **global** — selalu tampil di semua halaman, bukan hanya Player.

### 9.1 App Shell (semua halaman)

```
+----------------------------------------------------------+
|  Library / Player / Settings      [offline] [+ Tambah]   |  AppBar 64px
+----------------------------------------------------------+
|                                                          |
|                    ROUTE CONTENT                         |  scrollable
|                                                          |
+----------------------------------------------------------+
| [art] Judul item                        [<<] ( ) [>>]    |  Dock 88px
|       00:42 / 45:13   "cue yang sedang aktif ..."        |
|       +--------------o---------------------------------+  |
+----------------------------------------------------------+
```

Dock fixed di bawah, tinggi 88px (desktop) / 64px (mobile, tanpa seekbar). Kontrol di dock adalah alias dari kontrol yang sama dengan halaman Player — transisi mobile→desktop **tidak boleh** mereset state audio (AC-21).

### 9.2 Player — Subtitle-first

```
+----------------------------------------------------------+
|  Kembali   audio.mp3 - id.srt - 48 MB    [ + Bookmark ] |
+----------------------------------------------------------+
|                                                          |
|                    SUBTITLE STAGE                        |  min(42vh, 480px)
|                                                          |
|      Cue pertama                                        |
|      Cue kedua dengan italic.                           |
|      Baris ketiga yang dipotong dengan ellipsis ...     |
|                                                          |
+----------------------------------------------------------+
|  ( subtitle )   Subtitles        [ + Bookmark ]         |
+--------------------------+-------------------------------+
|  OFFSET SUBTITLE         |  CUE SEKARANG                |
|      -0.300  detik      |  0:42 -> 0:46                |
|  [-500] [-100] [0] ...   |  "Cue kedua dengan           |
|  ( ) Terapkan ke semua  |   italic."                   |
+--------------------------+-------------------------------+
|  ( Daftar Cue )   Bookmark (3)                          |
|  [ cari di dalam subtitle...        ]                   |
|  0:42   Cue kedua dengan italic.        <-- AKTIF      |
+----------------------------------------------------------+
|  Dock 88px (lihat §9.1)                                 |
+----------------------------------------------------------+
```

Proporsi vertikal Player desktop: subtitle stage ~45%, panel sinkronisasi ~20%, cue list ~35%.

Urutan di mobile: **stage -> offset ringkas -> tabs** (cue list digeser ke bawah tabs agar kontrol offset selalu terjangkau tanpa scroll).

### 9.3 State visual `SubtitleOverlay`

Semua nilai diambil dari token semantik `design.md` §3.2 — **tanpa hex literal** di komponen.

| Aspek | Nilai | Token |
|---|---|---|
| Posisi | `bottom: 8%` dari tinggi stage (agar tidak pernah tertutup dock) | — |
| Lebar | `max-width: 90%` dari stage | — |
| Font size | `clamp(1.125rem, 2.6vw, 2rem)` — 18px mobile, 26px desktop, 32px `xl` | `--text-subtitle` |
| Line height | `1.4` | `--lh-subtitle` |
| Font weight | `500` | `--fw-subtitle` |
| Background | `rgba(0,0,0,0.72)` | `--subtitle-bg` |
| Warna teks | `#FFFFFF` | `--subtitle-fg` |
| Text shadow | 2 lapis | `--subtitle-shadow` |
| Padding | `0.4em 0.8em` | — |
| Radius | `6px` | `--radius-md` |
| Alignment | `text-align: center`, `text-wrap: balance` | — |
| White space | `white-space: pre-line` agar `\n` dihormati | — |
| Baris | Maksimal 2, sisanya ellipsis | — |
| Tinggi idle | `min-height: 72px` supaya stage tidak "melompat" saat cue kosong | — |

- Tidak ada posisi atas atau tengah di v1 karena FR-30 ditunda.
- Overlay **tidak pernah** memakai `backdrop-filter` (D-07) dan selalu `pointer-events: none` kecuali click-to-reveal saat teks terpotong.
- Nilai `font-size` dalam token memakai `rem` agar zoom browser 200% tidak merusak layout; daftar breakpoint ada di `design.md` §12.1.

---

## 10. Acceptance Criteria

Format: **Given / When / Then.**

### AC-01 — Sinkronisasi dasar

> **Given** file audio 45:00 dan berkas .srt dengan 3.200 cue,
> **When** diputar dari 00:00 hingga selesai,
> **Then** setiap cue muncul pada posisi yang benar dengan selisih waktu **maksimal 17 ms** (1 frame), dan **tidak ada drift kumulatif** — error di menit ke-45 tetap di bawah 50 ms.

### AC-02 — Sinkronisasi pada playback rate bukan 1

> **Given** playback di-set ke 0.75x,
> **When** diputar selama 5 menit,
> **Then** subtitle tetap sinkron **tanpa koreksi manual**, dan nilai offset-adjusted tetap sama.

### AC-03 — Sinkronisasi pada seek

> **Given** audio 45:00,
> **When** user seek ke 42:37,
> **Then** cue yang benar tampil dalam 1 frame setelah seek selesai, dan pointer index benar — cue tepat sebelum 42:37 tidak ikut tampil.

### AC-04 — Offset real-time

> **Given** subtitle terlihat meleset 300 ms terlalu lambat,
> **When** user menekan `]` sebanyak 3 kali sambil audio diputar,
> **Then** subtitle bergeser **langsung dan seketika** tanpa restart, nilai menjadi +300 ms, dan nilai **ter-persist** ke storage dalam 2 detik.

### AC-05 — Offset per item

> **Given** dua item dengan kebutuhan offset berbeda,
> **When** user mengatur offset item A ke -500 ms dan item B ke +200 ms,
> **Then** masing-masing item memakai nilai yang benar saat diputar, dan **tidak saling menimpa**.

### AC-06 — Persistensi file setelah reload

> **Given** user meng-import 1 file audio dan 1 file subtitle lalu **menutup browser sepenuhnya**,
> **When** app dibuka kembali,
> **Then** item ada di library, dan **tanpa memilih file lagi** user dapat menekan Play dan audio berjalan — dengan satu klik "Izinkan akses" bila browser meminta izin.

### AC-07 — Fallback browser tanpa FSA

> **Given** app berjalan di Firefox atau Safari, di mana `showOpenFilePicker` undefined,
> **When** user meng-import file audio 50 MB,
> **Then** import **berhasil** karena file disalin ke IndexedDB, storage usage meningkat, dan **tidak ada error**. Bila storage penuh, tampilkan pesan yang jelas, **bukan crash**.

### AC-08 — Offline penuh

> **Given** app sudah pernah dimuat dan di-install,
> **When** DevTools → Network → **Offline** diaktifkan, lalu app di-hard-reload,
> **Then** app **tetap memuat** dan seluruh fitur tetap berfungsi, dengan **0 request network**.

### AC-09 — Progress dan resume

> **Given** user berhenti di 12:34 dari 45:13,
> **When** app ditutup tanpa menekan tombol pause,
> **Then** progress tersimpan dalam 5 detik, dan saat item dibuka kembali user melihat prompt "Lanjut dari 12:34" beserta opsi "Mulai dari awal".

### AC-10 — Bookmark

> **Given** user menekan `B` di 08:15,
> **When** user memberi label "Bagian penting" lalu reload app,
> **Then** bookmark tersimpan, tampil di panel dengan label tersebut, dan mengkliknya melompat tepat ke 08:15.

### AC-11 — File hilang

> **Given** user menghapus file audio dari disk,
> **When** app dibuka,
> **Then** item ditandai "File Tidak Tersedia" dengan aksi **Re-link**, dan **bookmark, offset, serta progress item tersebut tetap utuh** setelah re-link.

### AC-12 — Kontrol keyboard

> **Given** focus berada di halaman Player,
> **When** user menekan setiap shortcut di §5.1,
> **Then** aksi terkait terjadi dan **tidak terjadi scroll halaman yang tidak disengaja**.

### AC-13 — Toggle subtitle

> **Given** subtitle sedang tampil,
> **When** user menekan `C`,
> **Then** subtitle hilang, **audio tetap diputar tanpa interupsi**, dan `subtitleVisible` ter-persist.

### AC-14 — Export dan import

> **Given** library berisi 10 item, 25 bookmark, dan data progress,
> **When** user export ke JSON, lalu setelah data browser dihapus meng-import berkas tersebut,
> **Then** seluruh metadata, bookmark, dan progress kembali; item berstatus missing menunggu re-link file.

### AC-15 — Subtitle rusak

> **Given** berkas .srt berisi teks acak yang tidak valid,
> **When** user membukanya,
> **Then** aplikasi **tidak crash** — subtitle kosong, pesan error non-blocking tampil, dan audio tetap dapat diputar.

### AC-16 — Update tanpa mengganggu

> **Given** user sedang memutar audio,
> **When** versi baru ter-install di background,
> **Then** toast "Pembaruan tersedia" tampil dan **playback tidak terputus**; reload hanya terjadi atas klik user.

### AC-17 — Guided Sync Wizard

> **Given** user baru yang baru melampirkan subtitle dan item belum punya offset,
> **When** wizard ditawarkan,
> **Then** wizard selesai dalam **≤ 45 detik**, offset tersimpan per item, dan user dapat menyetel subtitle dengan benar tanpa membaca dokumentasi.

### AC-18 — Shortcut tidak bocor saat mengetik

> **Given** user sedang mengetik di kolom pencarian atau label bookmark,
> **When** user menekan tombol yang juga punya pintasan single-key (mis. `b`, `?`, `c`),
> **Then** **tidak ada** aksi pintasan yang terjadi; karakter yang diketik masuk ke input.

### AC-19 — Subtitle tidak diumumkan otomatis

> **Given** user memakai screen reader,
> **When** cue subtitle berganti karena playback,
> **Then** **tidak ada** pengumuman otomatis dari overlay; pengumuman hanya terjadi atas klik eksplisit "Bacakan subtitle".

### AC-20 — Library besar tanpa layout shift

> **Given** library dengan 200 item,
> **When** user membuka halaman Library,
> **Then** scroll mulus dan **tidak ada** layout shift setelah skeleton hilang (grid reserves height via `aspect-ratio`).

### AC-21 — Dock responsif tanpa reset state

> **Given** user sedang memutar audio di mobile,
> **When** viewport diubah sehingga dock berubah dari 64px ke 88px (breakpoint `lg`),
> **Then** posisi playback, playback rate, dan volume **tidak berubah** dan tidak ada jank.

---

## 11. Risiko & Mitigasi

### 11.1 Risiko Teknis

| ID | Risiko | Dampak | Mitigasi |
|---|---|---|---|
| R-01 | **Drift sinkronisasi** akibat penggunaan timer terpisah | Tinggi — fitur inti gagal | Wajib memakai rAF loop berbasis `currentTime` (§8.2). Larang `setInterval` dan `timeupdate` sebagai sumber. AC-01 mengukur secara eksplisit. |
| R-02 | **Kuota habis** di browser tanpa FSA | Tinggi — user kehilangan file hasil import | Rekomendasi Chromium; `storage.estimate()` dan peringatan sebelum import; `storage.persist()`; tangkap `QuotaExceededError`; export/import manifest sebagai jaring pengaman (FR-08). |
| R-03 | **Site data dihapus user** (clear browsing data, uninstall PWA) | Tinggi — seluruh library hilang | FR-08 export/import; digitalisation di onboarding; dan pada load berikutnya beri tahu bahwa data hanya tersimpan di perangkat ini. |
| R-04 | **File hilang, berubah, atau izin dicabut** | Sedang | Fingerprint, `queryPermission`/`requestPermission`, status tracking, dan re-link flow (FR-07). |
| R-05 | **Ketepatan seek pada MP3 VBR** | Sedang | Browser umumnya menanganinya; playback step dikalibrasi; bila posisi meleset, gunakan fallback "cari cue terdekat" untuk display subtitle. |
| R-06 | **Service worker menyajikan versi lama** | Sedang | Versioned cache, toast update (FR-42), `skipWaiting` hanya atas klik user. |
| R-07 | **Format subtitle tak terduga** (BOM, encoding non-UTF8, timestamp tidak valid) | Sedang | Parser toleran: `try/catch` per cue, skip cue buruk, dan lanjut; deteksi UTF-8 BOM; AC-15. |
| R-08 | **Jank akibat re-render 60 fps** | Sedang | Larangan `currentTime` di React state (§8.3); DOM write langsung; cue hanya re-render saat berubah. |
| R-09 | **localStorage exception** di mode privat atau storage penuh | Rendah–Sedang | Wrapper dengan `try/catch` plus notifikasi; fallback ke in-memory state agar app tidak crash. |
| R-10 | **Autoplay policy atau ekstensi browser mengintervensi** | Rendah | Playback selalu memerlukan user gesture; deteksi `play()` rejection dan tampilkan pesan. |

### 11.2 Batasan yang Disadari

Hal-hal berikut tidak dapat diperbaiki di v1 dan memang diterima:

- **Tidak ada sinkronisasi lintas device.** Data hanya ada di satu browser pada satu origin.
- **Kuota browser**, bukan disk user, yang membatasi ukuran library di Firefox dan Safari.
- **Tidak ada subtitle karaoke** di v1 — parsing ASS dengan VFR dan karaoke membutuhkan effort yang jauh lebih besar.
- **Ketepatan absolut antar perangkat tidak dijamin.** Browser merender `currentTime` dengan presisi yang berbeda, umumnya di bawah 1 frame. Karena itu tersedia bookmark dan cue-click sebagai alat verifikasi.

---

## 12. Roadmap

| Milestone | Deliverable | Kriteria Selesai |
|---|---|---|
| **M1 — Core Playback** | Project scaffold (Vite + React + TS + Tailwind), `AudioEngine` dengan rAF loop, `TransportControls`, `SeekBar`, durasi, volume, playback rate. | Audio berjalan, seek berfungsi, 60 fps. |
| **M2 — Subtitle Sync** | Parser SRT dan WebVTT, model `Cue`, `SubtitleOverlay`, binary search, toggle subtitle, style dasar. | AC-01, AC-02, AC-03, AC-13, AC-15 lolos. |
| **M3 — Import & Persistensi** | FSA picker plus fallback `<input>`, wrapper IndexedDB, skema dan wrapper localStorage, fingerprinting, re-link flow. | AC-06, AC-07, AC-11 lolos. |
| **M4 — Offset & Bookmark** | Offset real-time, per item, dan reset; CRUD bookmark; autosave progress dan resume; export/import manifest. | AC-04, AC-05, AC-09, AC-10, AC-14 lolos. |
| **M4.5 — Guided Sync Wizard** | `SyncWizard` 3 langkah (pendahuluan, dengar 15 detik, sesuaikan offset), pemicu sekali saat subtitle pertama dilampirkan. | AC-17 lolos. |
| **M5 — PWA & Offline** | Manifest, ikon, service worker, toast update, storage usage di Settings, keyboard shortcuts lengkap. | AC-08, AC-12, AC-16 lolos. |
| **M6 — Polish** | Library UI dan pencarian, dock global, layout responsif mobile, audit a11y, empty state dan error state, testing coverage minimal 80% pada `src/lib`. | Lighthouse a11y minimal 90, AC-18 s/d AC-21 lolos, seluruh AC hijau. |
| **Nanti** | Multi-track subtitle, ASS/SSA, folder import dengan auto-pairing, sleep timer, fallback `ffmpeg.wasm`, full-text search cue, tinjau migrasi ke IndexedDB. | — |

---

## 13. Definition of Done

Sebuah fitur dianggap selesai bila:

- [ ] Acceptance criteria terkait (§10) lolos
- [ ] `npm run typecheck` (TypeScript `strict`) tanpa error
- [ ] `npm run lint` tanpa error
- [ ] Test unit Vitest untuk logika murni: parser SRT, parser WebVTT, `cue-sync` — termasuk kasus offset, seek, dan playback rate
- [ ] Test E2E Playwright minimal: import, play, subtitle sinkron, bookmark, reload
- [ ] Tidak ada request network eksternal (AC-08)
- [ ] Komentar kode menjelaskan **mengapa**, bukan **apa** — kecuali pada bagian yang benar-benar intuitif
- [ ] Tidak ada `console.log` atau `debugger` yang tertinggal

---

## 14. Lampiran — Fixture Subtitle untuk Unit Test

Fixture wajib ada di `src/lib/subtitle/__fixtures__/` untuk keperluan unit test.

```srt
1
00:00:01,000 --> 00:00:04,000
Halo, ini cue pertama.

2
00:00:04,200 --> 00:00:08,500
Cue kedua dengan <i>italic</i>.
Baris kedua memakai line break.

3
00:01:00,000 --> 00:01:05,000
Cue ketiga, satu menit kemudian.
```

Kasus abnormal yang wajib ditangani parser:

- File tanpa BOM dan dengan BOM UTF-8
- Timestamp `MM:SS,mmm` tanpa bagian jam
- Cue dengan `endMs <= startMs` — harus di-skip, tidak boleh crash
- File dengan teks di luar blok cue
- File kosong atau 0 byte
- `.vtt` dengan block `NOTE`, `STYLE`, `REGION` — harus dilewati
- `.vtt` dengan cue identifier pada baris terpisah
- `.vtt` dengan `cue settings` seperti `<b>`, `<i>`, dan timestamp di dalam teks

---

## 15. Lampiran — Alternatif yang Ditolak

Dicatat agar keputusan di §8 tidak dipertanyakan ulang tanpa alasan baru.

| Alternatif | Alasan ditolak |
|---|---|
| Elemen native `<track>` | Tidak mendukung offset adjustment, styling terbatas, dan tidak ada kontrol klik-pada-cue. Lihat §8.5. |
| SQLite / better-sqlite3 / sql.js | Butuh native binding atau WASM yang berat. Data v1 hanya beberapa MB JSON; kompleksitas tidak sebanding. Lihat catatan migrasi di §8.6. |
| Tauri / Electron | Rust tidak tersedia di environment, dan sudah diputuskan PWA. Desktop wrapper baru relevan bila ada kebutuhan akses file system penuh tanpa quota browser. |
| Next.js | Server runtime tidak dibutuhkan untuk aplikasi 100% client-side. Menambah bobot dan memperlemah cerita offline. |
| Svelte / SvelteKit | Sama-sama layak dan lebih ringan. Dipilih React karena ekosistem dan tersedianya referensi. |
| Redux Toolkit | Store-nya terlalu besar untuk kebutuhan state management sederhana ini. Zustand cukup dan lebih mudah dioptimasi untuk data high-frequency. |
| `setInterval` untuk sinkronisasi subtitle | Menyebabkan drift kumulatif dan tidak sinkron saat `playbackRate` berubah. Lihat §8.2. |
| Google Fonts atau CDN untuk library | Melanggar NFR-07 karena memunculkan request eksternal saat runtime dan merusak fungsi offline. |

---

### design.md

# Design — Audio Subtitle Player (ASP)

**Versi dokumen:** 1.0
**Tanggal:** 2026-09-29
**Status:** Draft — menunggu review
**Dokumen induk:** [`requirement.md`](./requirement.md) — dokumen ini mengimplementasikan, tidak menggantikan

> **Catatan versi.** Wireframe di `requirement.md` §9 masih menggambarkan player full-screen. Dokumen ini memakai layout **dock bawah + panel subtitle besar** dan menjadi sumber kebenaran tunggal untuk seluruh keputusan visual. traceability ke requirement dijaga lewat ID `D-xx` yang dipetakan di §14.

---

## Daftar Isi

1. [Ringkasan & Prinsip Desain](#1-ringkasan--prinsip-desain)
2. [Information Architecture](#2-information-architecture)
3. [Design Tokens](#3-design-tokens)
4. [App Shell & Grid](#4-app-shell--grid)
5. [Wireframe Halaman](#5-wireframe-halaman)
6. [Spesifikasi Komponen](#6-spesifikasi-komponen)
7. [State & Interaksi](#7-state--interaksi)
8. [Subtitle UX](#8-subtitle-ux)
9. [Panel Sinkronisasi](#9-panel-sinkronisasi)
10. [Guided Sync Wizard](#10-guided-sync-wizard)
11. [Aksesibilitas](#11-aksesibilitas)
12. [Responsif & Mobile](#12-responsif--mobile)
13. [Copy & Tone](#13-copy--tone)
14. [Traceability](#14-traceability)
15. [Checklist Pre-Ship](#15-checklist-pre-ship)

---

## 1. Ringkasan & Prinsip Desain

### 1.1 Ringkasan

ASP adalah aplikasi **audio-first** dengan subtitle sebagai pengalaman utama. Bentuk, warna, dan animasi semuanya serving satu tujuan — membuat teks subtitle terbaca jelas dan tepat waktu, serta membuat penyetelan sinkronisasi terasa mudah.

Karakter visual: **tenang, padat, teknis namun tidak dingin.** Terlihat seperti alat kerja profesional, bukan aplikasi hiburan. Tidak ada dekorasi yang tidak fungsional.

### 1.2 Prinsip Desain

| ID | Prinsip | Implikasi |
|---|---|---|
| **D-01** | **Subtitle adalah fokus utama, bukan pelengkap** | Area subtitle mendapat proporsi visual terbesar di halaman Player. Kontrol subtitle tidak pernah dikubur di Settings. |
| **D-02** | **Angka harus terbaca sekilas** | Readout offset, waktu, dan durasi memakai font monospace dengan `tabular-nums` agar lebarnya tidak bergeser saat angka berubah 60×/detik. |
| **D-03** | **Tidak ada yang bergerak saat playback** | Animasi dimatikan selama audio berjalan. Hanya perpindahan cue subtitle yang boleh berubah, dan itu tanpa efek visual yang mencolok. Melindungi NFR-03 dan mengurangi kelelahan mata. |
| **D-04** | **Kontrol berada di tempat yang diharapkan** | Semua kontrol playback ada di dock. Tidak ada kontrol duplikat yang terletak di tempat berbeda. Satu lokasi, satu kebenaran. |
| **D-05** | **Kegagalan selalu terlihat dan selalu punya jalan keluar** | Setiap state kosong, error, atau file hilang punya tampilan + aksi pemulihan. Tidak ada dead end. Melayani NFR-09, NFR-10, FR-07. |
| **D-06** | **Tidak ada request eksternal** | Nol webfont, nol ikon SVG dari CDN, nol gambar dari jaringan. Semua ikon SVG inline, semua warna dari token. Melayani NFR-07 dan FR-40. |

### 1.3 Yang Secara Sadar Tidak Ada

Tidak ada ilustrasi, gradien dekoratif, animasi masuk halaman, glassmorphism, atau shadow berwarna. Aplikasi ini dipakai berulang-rutin dalam durasi panjang; dekorasi yang berlebihan justru mengurangi ruang teks subtitle dan menambah beban visual.

---

## 2. Information Architecture

### 2.1 Sitemap

```
/                      Library         daftar item, import, pencarian
/play/:itemId          Player          subtitle stage, panel sinkronisasi, cue list, bookmark
/settings               Settings        preferensi, storage, export/import, shortcut
```

Tiga rute. Tidak ada routing bersarang, tidak ada halaman auth, tidak ada onboarding blocking.

### 2.2 Aturan Navigasi

| Aturan | Penjelasan |
|---|---|
| Dock selalu terlihat | Dock ada di ketiga rute. Audio tidak berhenti saat pindah halaman. Melayani D-04. |
| Pindah halaman tidak interrupt playback | Perpindahan rute **tidak pernah** menghentikan atau me-reset `<audio>`. |
| Root `/` = Library | Karena ini aplikasi library-first: user selalu kembali ke daftar. |
| Dalam-dokumen navigation | Cue list, bookmark, dan subtitle semuanya di dalam `/play/:itemId`, tidak berpindah halaman. |
| Back button aman | `Esc` pada dialog meng-close dialog, bukan navigasi keluar. |

### 2.3 Model Mental Pengguna

```
        +----------------------------------+
        |          LIBRARY (/ )             |
        |  [klik item]                      |
        +---------------+------------------+
                        v
        +----------------------------------+
        |    PLAYER (/play/:itemId)         |
        |  Subtitle stage                   |
        |  Panel sinkronisasi               |
        |  [Cue list] [Bookmark]            |
        +---------------+------------------+
                        |  dock selalu di bawah
                        v
                 +-------------+
                 |    DOCK     |
                 | transport,  |
                 | seek, rate, |
                 | volume      |
                 +-------------+
```

---

## 3. Design Tokens

Semua token bernama semantik, bukan nama warna. `bg-surface` tidak pernah ditulis sebagai `#14171C` di komponen. Dengan begitu light mode otomatis bekerja tanpa menulis ulang komponen.

### 3.1 Warna

#### Dark (default)

| Token | Hex | Pakai untuk |
|---|---|---|
| `--bg-base` | `#0B0D10` | Latar aplikasi terdalam |
| `--bg-surface` | `#14171C` | Kartu, panel, baris daftar |
| `--bg-surface-raised` | `#1C2026` | Hover, menu, popover |
| `--bg-inset` | `#0F1216` | Input, track seekbar, kode |
| `--bg-overlay` | `#23282F` | Backdrop dialog (dengan `opacity`) |
| `--border-subtle` | `#1E232A` | Garis pemisah halus, separator list |
| `--border-default` | `#2A3038` | Border kartu, border input |
| `--border-strong` | `#3A424D` | Border pada hover/focus |
| `--text-primary` | `#F2F4F7` | Judul, subtitle, angka utama |
| `--text-secondary` | `#A6AEBB` | Label, deskripsi sekunder |
| `--text-tertiary` | `#6E7683` | Placeholder, metadata kecil |
| `--text-disabled` | `#4A515B` | Elemen non-interaktif |
| `--text-inverse` | `#0B0D10` | Teks di atas permukaan terang |

#### Light

| Token | Hex | Catatan |
|---|---|---|
| `--bg-base` | `#FFFFFF` | |
| `--bg-surface` | `#F7F8FA` | Kartu sedikit berbeda dari latar |
| `--bg-surface-raised` | `#FFFFFF` | Menu, popover |
| `--bg-inset` | `#EEF0F3` | |
| `--border-subtle` | `#E7E9ED` | |
| `--border-default` | `#D6DAE0` | |
| `--border-strong` | `#AFB6C1` | |
| `--text-primary` | `#10131A` | |
| `--text-secondary` | `#545C6A` | |
| `--text-tertiary` | `#848C99` | |
| `--accent-500` | `#4A57E8` | **Lebih gelap dari versi dark** agar kontras ≥ 4.5:1 di latar putih |

#### Aksen

Satu warna aksen saja. Menambah warna brand kedua di v1 hanya menambah permukaan warna tanpa manfaat nyata.

| Token | Dark | Light | Pakai untuk |
|---|---|---|---|
| `--accent-500` | `#6E7BFF` | `#4A57E8` | Aksi utama, track terisi, cue aktif |
| `--accent-400` | `#8B95FF` | `#6C78F0` | Hover |
| `--accent-600` | `#5560E6` | `#3B47C9` | Pressed |
| `--accent-surface` | `#1A1E3A` | `#EEF0FE` | Latar tinted (banner, cue aktif) |
| `--on-accent` | `#FFFFFF` | `#FFFFFF` | Teks di atas aksen |

#### Semantik

| Token | Dark | Light | Pakai untuk |
|---|---|---|---|
| `--success` | `#3DD68C` | `#12855A` | Selesai, berhasil import |
| `--warning` | `#F5A524` | `#9A6207` | Kuota(storage) menipis, format best-effort |
| `--danger` | `#F5566B` | `#C42C41` | Hapus, error, file hilang |
| `--info` | `#4CC9F0` | `#0B6E8C` | Petunjuk non-blocking |

Rasio kontras `--danger` dan `--warning` **diversikan antara tema** agar tetap lolos WCAG AA di keduanya.

#### Token khusus subtitle

| Token | Nilai | Alasan |
|---|---|---|
| `--subtitle-bg` | `rgba(0, 0, 0, 0.72)` | Semi-transparan agar artwork tetap terlihat, teks tetap terbaca. D-01. |
| `--subtitle-fg` | `#FFFFFF` | Selalu putih, di kedua tema. Hitam di terang justru lebih buruk di atas foto. |
| `--subtitle-shadow` | `0 1px 2px rgba(0,0,0,.9), 0 0 8px rgba(0,0,0,.55)` | Jaring pengaman bila `--subtitle-bg` belum ter-render. |
| `--subtitle-active-bg` | `var(--accent-surface)` | Baris cue aktif di daftar cue. |

> **D-07 — Larangan `backdrop-filter` pada overlay subtitle.** `backdrop-filter: blur()` memaksa kompositor menjalankan ulang frame pada setiap perubahan. Karena subtitle berubah beberapa kali per detik di area besar, ini berisiko langsung melanggar NFR-03. Latar semi-transparan polos sudah cukup. Efek blur hanya boleh dipakai di `Dialog` dan `Popover`, yang lifecycle-nya pendek.

### 3.2 Tipografi

System font stack — nol request eksternal (D-06, NFR-07).

```css
--font-sans: system-ui, -apple-system, 'Segoe UI', Roboto,
             'Helvetica Neue', Arial, sans-serif;
--font-mono: ui-monospace, SFMono-Regular, 'SF Mono', Menlo,
             Consolas, 'Liberation Mono', monospace;
```

#### Skala

| Token | Ukuran | Line-height | Tracking | Pakai untuk |
|---|---|---|---|---|
| `--text-2xs` | 11px | 1.4 | 0.02em | Badge, label uppercase |
| `--text-xs` | 12px | 1.4 | 0.01em | Metadata, timestamp cue list |
| `--text-sm` | 14px | 1.45 | 0 | Label kontrol, isi sekunder |
| `--text-base` | 16px | 1.5 | 0 | Body, isi daftar |
| `--text-lg` | 18px | 1.4 | 0 | Judul item di dock |
| `--text-xl` | 20px | 1.35 | -0.01em | Judul kartu library |
| `--text-2xl` | 24px | 1.3 | -0.01em | Judul halaman |
| `--text-3xl` | 30px | 1.25 | -0.02em | Readout offset, judul player |
| `--text-4xl` | 36px | 1.2 | -0.02em | Angka offset pada mode wizard |

#### Token khusus subtitle

| Token | Nilai | Alasan |
|---|---|---|
| `--text-subtitle` | `clamp(1.125rem, 2.6vw, 2rem)` | Skala fluid: 18px di mobile, hingga 32px di layar lebar. Tidak perlu media query. |
| `--lh-subtitle` | `1.4` | 1.4 adalah nilai yang membuat dua baris subtitle terbaca tanpa saling tumpang tindih. |
| `--fw-subtitle` | `500` | Lebih tebal dari normal agar tidak hilang di atas artwork ramai. |
| `--ls-subtitle` | `0` | Tracking nol. Subtitle dibaca cepat, letter-spacing yang longgar justru memperlambat. |

#### Token khusus angka

```css
--font-numeric: var(--font-mono);
font-variant-numeric: tabular-nums;
```

> **D-08 — Semua angka waktu wajib `tabular-nums`.** Tanpa itu, angka `0:59` → `1:00` menyebabkan seluruh blok angka bergeser beberapa piksel, dan pada readout besar di Panel Sinkronisasi ini terlihat sangat mengganggu (D-02).

### 3.3 Spacing

Basis 4px. Hanya nilai-nilai ini yang boleh dipakai.

| Token | Nilai | Token | Nilai |
|---|---|---|---|
| `--space-1` | 4px | `--space-7` | 28px |
| `--space-2` | 8px | `--space-8` | 32px |
| `--space-3` | 12px | `--space-10` | 40px |
| `--space-4` | 16px | `--space-12` | 48px |
| `--space-5` | 20px | `--space-16` | 64px |
| `--space-6` | 24px | `--space-20` | 80px |

### 3.4 Radius, Border, Elevation

| Token | Nilai | Pakai untuk |
|---|---|---|
| `--radius-sm` | 4px | Badge, tag, input kecil |
| `--radius-md` | 6px | Tombol, input, kartu list |
| `--radius-lg` | 8px | Kartu, panel |
| `--radius-xl` | 12px | Dialog, panel besar |
| `--radius-2xl` | 16px | Cue list container |
| `--radius-full` | 9999px | Avatar, pill, knob seekbar |

Border: `--border-width: 1px`.

Elevation — di tema gelap, **border lebih banyak dipakai daripada shadow** karena shadow di atas latar hampir tak terlihat.

| Token | Nilai | Pakai untuk |
|---|---|---|
| `--elevation-1` | `0 1px 2px rgba(0,0,0,.30)` | Kartu yang di-hover |
| `--elevation-2` | `0 4px 12px rgba(0,0,0,.35)` | Menu, popover, dropdown |
| `--elevation-3` | `0 12px 32px rgba(0,0,0,.45)` | Dialog |
| `--elevation-4` | `0 24px 64px rgba(0,0,0,.55)` | Dialog mobile, toast |

### 3.5 Motion

| Token | Nilai | Pakai untuk |
|---|---|---|
| `--duration-instant` | 0ms | Perubahan yang harus sinkron dengan audio |
| `--duration-fast` | 120ms | Hover, focus ring, warna |
| `--duration-base` | 180ms | Panel, tab, tooltip |
| `--duration-slow` | 260ms | Dialog masuk, layout berubah |
| `--ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Default untuk semua |
| `--ease-exit` | `cubic-bezier(0.3, 0, 1, 1)` | Elemen yang keluar |
| `--ease-emphasized` | `cubic-bezier(0.34, 1.4, 0.64, 1)` | Toast, konfirmasi |

> **D-03 — `--duration-instant` untuk semua hal yang bersinggungan dengan playback.** Pergantian cue subtitle, pergerakan knob seekbar, dan perubahan angka waktu memakai `0ms`. Animasi 180ms pada elemen yang berubah tiap beberapa detik akan terlihat seperti stutter, bukan seperti polish.

#### Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Playback dan subtitle **tetap berfungsi penuh** — yang dimatikan hanya transisi dekoratif. Melayani NFR-12.

### 3.6 Z-Index

| Layer | Nilai | Isi |
|---|---|---|
| `base` | 0 | Konten normal |
| `sticky` | 100 | AppBar saat di-scroll |
| `dock` | 200 | Dock player |
| `dock-sheen` | 210 | Garis atas dock |
| `backdrop` | 300 | Backdrop dialog |
| `dialog` | 310 | Dialog, bottom sheet |
| `toast` | 400 | Toast |
| `tooltip` | 500 | Tooltip |

Tidak ada z-index di luar daftar ini. Angka arbitrer di komponen adalah bug.

### 3.7 Breakpoint

| Nama | Min width | Perubahan layout |
|---|---|---|
| `sm` | 360px | Baseline mobile |
| `md` | 640px | Grid library 2 kolom, dock 2 baris penuh |
| `lg` | 1024px | **Dock desktop aktif** (88px), grid library 3 kolom, panel sinkronisasi 2 kolom |
| `xl` | 1440px | Grid library 4 kolom, stage subtitle lebih luas, cue list jadi 2 kolom |

### 3.8 Ukuran Dock

| Token | Mobile (< lg) | Desktop (≥ lg) |
|---|---|---|
| `--dock-height` | 64px | 88px |
| `--dock-artwork` | 40px | 48px |
| `--dock-icon` | 20px | 24px |
| `--dock-play` | 44px | 52px |

---

## 4. App Shell & Grid

### 4.1 Anatomi

```
+--------------------------------------------------------------------------+
| AppBar        56px (mobile) / 64px (desktop)                             |
+--------------------------------------------------------------------------+
|                                                                          |
|  <main>  Route content — scrollable, punya padding sendiri               |
|                                                                          |
+--------------------------------------------------------------------------+
| Dock          64px (mobile) / 88px (desktop) — fixed, selalu ada          |
+--------------------------------------------------------------------------+
```

```
+--------------------------------------------------------------------------+
| ASP    Library   Player   Settings            [search]  [offline] [aks]  |
+==========================================================================+
|                                                                          |
|                        ROUTE CONTENT                                      |
|                                                                          |
|                                                                          |
+==========================================================================+
| [art] Judul item                                              1.0x  CC  |
|       00:42 / 45:13      "subtitle aktif, satu baris dipotong ..."   🔊  |
| |<<  [>>]  (  ▶  )  >>|  [loop]                          [bookmark]      |
| +==============================O===========================+             |
| 0:42                                                          45:13     |
+==========================================================================+
```

### 4.2 Dock Desktop (≥ lg, tinggi 88px)

Dua baris. Baris pertama terbagi menjadi tiga zona, baris kedua seekbar full-width.

```
| Zona kiri  |  Zona tengah  |  Zona kanan  |
| flex: 1    |  auto         |  flex: 1     |

Kiri (justify-start):
  artwork 48px + (judul 2 baris: title `text-lg`, time `text-xs` mono)

Tengah (justify-center):
  shuffle | prev-item | back-skip | PLAY 52px | fwd-skip | next-item | repeat

Kanan (justify-end):
  rate badge | CC toggle | bookmark | volume slider 120px
```

**Baris kedua:** seekbar full-width dengan `0:42` di kiri dan `45:13` di kanan, keduanya `text-xs` mono.

> **D-09 — Dock menampilkan cue preview, bukan hanya judul.** Baris kedua subtitle di dock (zona kiri) menampilkan satu baris cue yang sedang aktif, dipotong dengan ellipsis. Saat user browsing Library sambil audio berjalan, dia tetap tahu sedang memutar konten apa. Tanpa ini, dock terasa seperti sekadar kendali.

**Cue preview di dock:**
- `text-xs`, `--text-secondary`, 1 baris, `text-overflow: ellipsis`
- Memakai teks yang sama dengan overlay, dibaca dari store yang sama — tidak ada parse ulang
- Non-interaktif (`pointer-events: none`) supaya tidak menghalangi klik seekbar
- Disembunyikan bila `subtitleVisible === false`

### 4.3 Dock Mobile (< lg, tinggi 64px)

```
+------------------------------------------------------------+
| [art] Judul item                        [prev] (▶) [next] |
+------------------------------------------------------------+
```

Dock mobile **tidak** punya seekbar — tidak ada ruang. Mengetuk area dock membuka **Player Sheet**: bottom sheet full-height berisi subtitle stage, panel sinkronisasi, dan seekbar lengkap.

---

## 5. Wireframe Halaman

### 5.1 Library — Desktop

```
+==========================================================================+
| ASP    [ Library ]  Player   Settings        [cari...]   [offline ●] [+]|
+==========================================================================+
|  12 item                                              < grid 3 kolom >   |
|  +----------------+  +----------------+  +----------------+            |
|  | ▓▓▓▓▓▓▓▓▓▓▓▓▓  |  | ▓▓▓▓▓▓▓▓▓▓▓▓▓  |  | ▓▓▓▓▓▓▓▓▓▓▓▓▓  |            |
|  |                |  |                |  |                |            |
|  |  Judul Item    |  |  Judul Item    |  |  Judul Item    |            |
|  |  ▪ audio.mp3   |  |  ▪ audio.m4a   |  |  ▪ audio.mp3   |            |
|  |  ▪ id.srt      |  |  (tanpa sub)   |  |  ▪ en.vtt      |            |
|  |                |  |                |  |                |            |
|  | ▶  42:10/45:13 |  | —  belum pernah |  | ✓ Selesai      |            |
|  | ▓▓▓▓▓▓░░░░░░ 92% |  |                |  |                |            |
|  +----------------+  +----------------+  +----------------+            |
|  | ▓▓▓▓▓▓▓▓▓▓▓▓▓  |  | ▓▓▓▓▓▓▓▓▓▓▓▓▓  |  | ▓▓▓▓▓▓▓▓▓▓▓▓▓  |            |
|  | Judul Item    |  | Judul Item    |  | ⚠ File hilang  |            |
|  | ...           |  | ...           |  | [ Pasang ulang ]|           |
|  +----------------+  +----------------+  +----------------+            |
+==========================================================================+
| [art] Judul aktif    00:42/45:13  "cue..."    [<<] (▶) [>>]   1.0x  🔊 |
| +==============================O===========================+          |
+==========================================================================+
```

**Anatomi kartu library (`LibraryCard`):**
- Grid responsif: 1 kolom (`sm`) → 2 (`md`) → 3 (`lg`) → 4 (`xl`)
- Tinggi thumbnail `aspect-ratio: 1`, fallback berupa ikon musik + inisial pada `--bg-inset`
- Judul: 2 baris, `text-xl`, clamp, `text-truncate`
- Nama file: 1 baris, `text-xs`, `--text-tertiary`
- Baris status: waktu terakhir played ATAU badge "Selesai" ATAU prompt "Lanjut dari 12:34"
- Progress bar tipis di bawah kartu bila progress > 0 dan < 95%
- Overlay hover: tombol ▶ besar di tengah thumbnail, opacity 0 → 1
- Badge "Selesai": pojok kiri atas thumbnail, warna `--success`

**Anatomi baris status per kondisi:**

| Kondisi | Tampilan |
|---|---|
| Belum pernah diputar | `— belum pernah diputar` (`text-tertiary`) |
| Sedang berjalan | `▶ 42:10 / 45:13` + progress bar |
| Ada progress, tidak aktif | `Lanjut dari 12:34` + progress bar |
| Selesai | Badge ✓ Selesai (hijau) |
| Tanpa subtitle | `Tanpa subtitle` (`text-tertiary`) + tombol kecil `+ subtitle` |
| File hilang | `⚠ File tidak tersedia` (`--danger`) + tombol `Pasang ulang` |
| Perlu izin | `Izin akses diperlukan` (`--warning`) + tombol `Izinkan` |

### 5.2 Library — Empty State

```
+==========================================================================+
| ASP    [ Library ]  Player   Settings                          [offline ●]|
+==========================================================================+
|                                                                          |
|                        +--------------------+                           |
|                        |         +--+       |                           |
|                        |        /    \      |                           |
|                        |       |  ♪   |     |                           |
|                        |        \    /      |                           |
|                        |         +--+       |                           |
|                        +--------------------+                           |
|                                                                          |
|                      Library masih kosong                                |
|                                                                          |
|              Tambahkan file audio pertama kamu untuk memulai.            |
|              File hanya disimpan di perangkat ini.                        |
|                                                                          |
|                       [ + Pilih file audio ]                              |
|                                                                          |
|                     atau tarik & lepas ke area ini                       |
|                                                                          |
|                            —— atau ——                                    |
|                                                                          |
|                    [ Impor dari file JSON ]                               |
|                                                                          |
+==========================================================================+
```

**Konten empty state — aturan:**

1. Judul: apa yang terjadi, bukan instruksi
2. Satu kalimat penjelasan
3. **Satu** aksi utama (tombol besar, `--accent-500`)
4. Alternatif sekunder (drag-drop) — ditampilkan sebagai hint, bukan tombol dengan bobot yang sama
5. Jalur pemulihan data (`Impor dari JSON`) untuk kasus yang paling menakutkan, yaitu user yang datanya hilang
6. Pernyataan privasi: "File hanya disimpan di perangkat ini" — menurunkan kecemasan user soal Data di server

### 5.3 Player — Desktop

```
+==========================================================================+
| ← Kembali ke Library                    audio.mp3 · id.srt · 48 MB       |
+==========================================================================+
|                            SUBTITLE STAGE                                 |
|         +---------------------------------------------------------+      |
|         |                                                         |      |
|         |      Cue pertama                                          |      |
|         |      Cue kedua dengan italic.                              |      |
|         |      Baris ketiga yang mungkin masih muat.                  |      |
|         |                                                         |      |
|         +---------------------------------------------------------+      |
|           ( subtitle )  Subtitles          ( + Bookmark )                |
+==========================================================================+
|  PANEL SINKRONISASI                    ( Lihat §9 )                       |
|  +----------------------------------+  +----------------------------+   |
|  |  OFFSET SUBTITLE                 |  |  CUE AKTIF                 |   |
|  |                                  |  |                            |   |
|  |      − 0.300  detik              |  |  0:42  →  0:46             |   |
|  |                                  |  |  "Cue kedua dengan          |   |
|  |  [−500] [−100]  [Reset]  [+100] [+500]  | italic."                 |   |
|  |                                  |  |                            |   |
|  |  shift+klik untuk ketik manual   |  |  mini timeline ▸            |   |
|  |  ( ) Terapkan ke semua item     |  +----------------------------+   |
|  +----------------------------------+                                   |
+==========================================================================+
|  ( Daftar Cue )   Bookmark (3)                                          |
+==========================================================================+
|  [ cari di dalam subtitle...                              ]              |
+--------------------------------------------------------------------------|
|  0:42   Cue kedua dengan italic.                              <-- AKTIF  |
|  0:46   Cue ketiga.                                                     |
|  0:51   Cue keempat dengan baris kedua yang panjang sekali.              |
|  0:58   Cue kelima.                                                      |
+--------------------------------------------------------------------------+
| [art] Judul    00:42/45:13  "Cue kedua dengan italic."     [1.0x] C  🔊  |
| +==============================O===========================+            |
| 0:42                                                         45:13        |
+==========================================================================+
```

**Proporsi vertikal di halaman Player (desktop):**

| Bagian | Tinggi | Rasio |
|---|---|---|
| Subtitle stage | `min(42vh, 480px)` | ~45% |
| Panel sinkronisasi | auto (~220px) | ~20% |
| Cue list / Bookmark | sisa, scroll | ~35% |
| Dock | 88px fixed | — |

> **D-10 — Subtitle stage memakai tinggi berbasis `vh`, bukan proporsi fleksibel.** Subtitle stage yang ikut menyusut saat cue list bertambah panjang akan membuat teks subtitle ikut mengecil. Tinggi stage harus **hanya** bergantung pada ukuran viewport, agar ukuran teks subtitle stabil sepanjang sesi.

### 5.4 Player — Mobile

```
+--------------------------------------+
| ← Kembali                       ⋮   |
+--------------------------------------+
|                                      |
|          SUBTITLE STAGE               |
|                                      |
|  +--------------------------------+  |
|  |  Cue kedua dengan italic.       |  |
|  |  Baris ketiga.                  |  |
|  +--------------------------------+  |
|                                      |
|   ( subtitle )        ( + Bookmark ) |
+--------------------------------------+
|  OFFSET                     − 0.300  |
|  [−500][−100] [Reset] [+100][+500]   |
+--------------------------------------+
|  ( Cue )  ( Bookmark )                |
+--------------------------------------+
|  0:42  Cue kedua dengan italic.       |
|  0:46  Cue ketiga.                    |
+--------------------------------------+
| [art] Judul     00:42/45:13  [▶]     |  <- dock 64px
+--------------------------------------+
```

Turutan di mobile: **stage → offset ringkas → tabs**. Cue list digeser ke bawah tabs agar offset selalu terlihat tanpa scroll. Di desktop, panel offset ditampilkan penuh dalam grid 2 kolom.

### 5.5 Dialog

#### Import Dialog

```
        +-------------------------------------------------------+
        |  Tambah ke Library                             [ × ]  |
        +-------------------------------------------------------+
        |                                                       |
        |  1. File audio                                       |
        |  +-------------------------------------------------+  |
        |  |  🎵  Pilih file audio                       Browse |  |
        |  |      MP3, M4A, WAV, FLAC · maks. besar file     |  |
        |  +-------------------------------------------------+  |
        |  |  ✓ audio-cerita-01.mp3                          |  |
        |  |    48.2 MB · 45:13                                |  |
        |  +-------------------------------------------------+  |
        |                                                       |
        |  2. File subtitle  (opsional)                        |
        |  +-------------------------------------------------+  |
        |  |  💬  Pilih file .srt atau .vtt              Browse |  |
        |  +-------------------------------------------------+  |
        |  |  ✓ cerita-01.srt                                 |  |
        |  |    1.284 cue · akan dicek sinkronisasinya        |  |
        |  +-------------------------------------------------+  |
        |                                                       |
        |  3. Judul                                             |
        |  +-------------------------------------------------+  |
        |  |  Cerita 01 — Bab 1                              |  |
        |  +-------------------------------------------------+  |
        |                                                       |
        +-------------------------------------------------------+
        |  info: Audio dan subtitle hanya dibaca, tidak diubah  |
        |                          [ Batal ]   [ Tambah ]      |
        +-------------------------------------------------------+
```

Kunci perilaku:
- Kedua field file **wajib**, subtitle opsional
- Setelah file dipilih, langsung tampil ringkasan (nama, ukuran, durasi, jumlah cue) — user tahu ini benar sebelum menekan Tambah
- Jumlah cue diambil dari hasil parse; subtitle yang gagal parse tetap boleh ditambahkan, dengan peringatan
- Tombol `Tambah` disabled sampai file audio terisi
- Dialog **tidak** meminta izin penyimpanan — user sudah aman secara privasi karena file tidak pernah keluar dari device

#### Relink Dialog (FR-07)

```
        +---------------------------------------------+
        |  File Tidak Tersedia                  [ × ]  |
        +---------------------------------------------+
        |                                             |
        |  ⚠  audio-cerita-01.mp3                     |
        |                                             |
        |  Berkas ini tidak ditemukan di lokasi       |
        |  sebelumnya, atau nama/ukurannya berubah.   |
        |                                             |
        |  Yang TIDAK akan hilang:                    |
        |    ✓ 2 bookmark                             |
        |    ✓ progress 12:34                         |
        |    ✓ offset subtitle −300 ms                |
        |                                             |
        |  +---------------------------------------+  |
        |  |  Cari file audio yang sama        Browse |  |
        |  +---------------------------------------+  |
        |                                             |
        |        [ Lewati ]     [ Pasang ulang ]       |
        +---------------------------------------------+
```

> **D-11 — Relink dialog selalu menampilkan daftar yang dipertahankan.** Bookmark, progress, dan offset adalah data yang suspending untuk user bangun dan hilang permanen kalau relink gagal. Menampilkan daftar itu secara eksplisit menurunkan kecemasan tanpa menambah banyak kode.

#### Resume Prompt (FR-34)

```
        +---------------------------------------+
        |                                       |
        |            Lanjut dari 12:34?         |
        |                                       |
        |       Cerita 01 — Bab 1                |
        |       Durasi 45:13 · tersisa 32:39     |
        |                                       |
        |      [   Mulai dari 0:00   ]           |
        |      [   ▶  Lanjut dari 12:34   ]     |
        |                                       |
        |            [ ✕ ]  lewati              |
        +---------------------------------------+
```

Muncul sekali saat membuka item yang punya progress dan `completed === false`. Tidak pernah muncul otomatis untuk item yang sudah `completed === true` — kalau begitu langsung mulai dari 0.

### 5.6 Settings

```
+==========================================================================+
| ← Kembali                                              [ tema: 🌙/☀️ ]  |
+==========================================================================+
|  PREFERENSI                                                                |
|  +----------------------------------------------------------------------+ |
|  | Tema                              [ Gelap | Terang | Sistem ]         | |
|  | Ukuran lompat        5s 10s 15s 30s  ->  ( 10s )                     | |
|  | Pertahankan nada     [ ON ]                                           | |
|  | Tampilkan subtitle   [ ON ]                                           | |
|  | Offset subtitle global              −  0 ms  (Reset)                 | |
|  +----------------------------------------------------------------------+ |
|                                                                          |
|  DATA & PENYIMPANAN                                                      |
|  +----------------------------------------------------------------------+ |
|  | Penyimpanan terpakai   124 MB dari 2.1 GB                            | |
|  | +--------------------------------------------------+                  | |
|  | |██████████████████████████████████░░░░░░░░░░░░░░░░░|  5.9%           | |
|  | +--------------------------------------------------+                  | |
|  |                                                                   | |
|  | Permintaan penyimpanan permanen  [ Ajukan ]                     | |
|  | Tahu: data hanya ada di browser ini. Menghapus data                | |
|  |       situs akan menghapus seluruh library.                         | |
|  |                                                                   | |
|  |  [ Export semua data (JSON) ]   [ Import dari JSON ]              | |
|  +----------------------------------------------------------------------+ |
|                                                                          |
|  APLIKASI                                                                |
|  +----------------------------------------------------------------------+ |
|  |  [ Pasang aplikasi ]                          terpasang ✓          | |
|  |  Versi 1.0.0 · build 2026-09-29                                     | |
|  |  Browser ini: showOpenFilePicker tersedia ✓                        | |
|  |  ⚠ Tanpa dukungan picker, file akan disalin ke penyimpanan        | |
|  |    browser dan terkena batas kuota. Chrome/Edge disarankan.       | |
|  +----------------------------------------------------------------------+ |
+==========================================================================+
```

> **D-12 — Settings menampilkan status kapabilitas browser, bukan dump teknis.** Deteksi `showOpenFilePicker` ditampilkan sebagai peringatan yang bisa ditindaklanjuti ("Chrome/Edge disarankan"), bukan sebagai baris debug yang membingungkan. User tidak perlu tahu apa itu FSA; dia perlu tahu kenapa aplikasinya melambat dan apa yang harus dilakukan.

---

## 6. Spesifikasi Komponen

### 6.1 Inventory

| Komponen | Berkas | State | Catatan a11y |
|---|---|---|---|
| `AppShell` | `components/layout/AppShell.tsx` | — | Landmark `<main>`, skip link |
| `AppBar` | `components/layout/AppBar.tsx` | scrolled | `<header role="banner">` |
| `NavTabs` | `components/layout/NavTabs.tsx` | active | `<nav>`, `aria-current="page"` |
| `OfflineBadge` | `components/layout/OfflineBadge.tsx` | online / offline | `role="status"`, `aria-live="polite"` |
| `InstallButton` | `components/layout/InstallButton.tsx` | hidden / available / installed | disembunyikan total bila tidak tersedia |
| `LibraryPage` | `components/library/LibraryPage.tsx` | loading / ready / empty / error | |
| `LibraryGrid` | `components/library/LibraryGrid.tsx` | — | `<ul role="list">` |
| `LibraryCard` | `components/library/LibraryCard.tsx` | 7 kondisi (§5.1) | `<li>`, fokus via Tab |
| `MissingFilesBanner` | `components/library/MissingFilesBanner.tsx` | count = 0 / n | `role="alert"` bila n > 0 |
| `ImportDialog` | `components/library/ImportDialog.tsx` | idle / reading / ready / error | focus trap, `Esc` close |
| `RelinkDialog` | `components/library/RelinkDialog.tsx` | idle / comparing / done / mismatch | focus trap |
| `PlayerPage` | `components/player/PlayerPage.tsx` | loading / ready | |
| `SubtitleStage` | `components/player/SubtitleStage.tsx` | — | `role="region"`, `aria-label="Subtitle"` |
| `SubtitleOverlay` | `components/player/SubtitleOverlay.tsx` | idle / active | **`aria-live="off"`** — lihat §11.3 |
| `OffsetPanel` | `components/player/OffsetPanel.tsx` | adjusting / idle | `role="group"`, `aria-label="Offset subtitle"` |
| `OffsetReadout` | `components/player/OffsetReadout.tsx` | — | `role="status"`, `aria-live="polite"` |
| `MiniTimeline` | `components/player/MiniTimeline.tsx` | — | `aria-hidden="true"` (dekoratif) |
| `SyncWizard` | `components/player/SyncWizard.tsx` | intro / listen / tune / done | focus trap, `Esc` batal |
| `CueList` | `components/player/CueList.tsx` | empty / filtered / full | `role="listbox"`, `aria-activedescendant` |
| `CueListItem` | `components/player/CueListItem.tsx` | default / active / played | `role="option"`, `aria-selected` |
| `Dock` | `components/player/Dock.tsx` | collapsed / expanded (mobile) | `<footer role="contentinfo">` |
| `DockMeta` | `components/player/DockMeta.tsx` | — | Judul + cue preview (D-09) |
| `TransportControls` | `components/player/TransportControls.tsx` | playing / paused / loading | |
| `SeekBar` | `components/player/SeekBar.tsx` | idle / hover / dragging / disabled | **`role="slider"`** + aria-value* |
| `RateSelector` | `components/player/RateSelector.tsx` | 6 opsi | `role="radiogroup"` |
| `VolumeControl` | `components/player/VolumeControl.tsx` | 0–100 | `role="slider"` |
| `BookmarkPanel` | `components/player/BookmarkPanel.tsx` | empty / list | |
| `BookmarkItem` | `components/player/BookmarkItem.tsx` | default | |
| `ResumePrompt` | `components/player/ResumePrompt.tsx` | — | Dialog, fokus ke aksi utama |
| `SettingsPage` | `components/settings/SettingsPage.tsx` | — | |
| `StorageUsage` | `components/settings/StorageUsage.tsx` | unknown / known / critical | `role="meter"` |
| `ShortcutReference` | `components/settings/ShortcutReference.tsx` | — | `<table>`, bukan daftar div |
| `Button` | `components/ui/Button.tsx` | 5 variant × 3 size | `disabled` + `aria-disabled` |
| `IconButton` | `components/ui/IconButton.tsx` | default | **`aria-label` wajib** |
| `Dialog` | `components/ui/Dialog.tsx` | open / closed | focus trap + restore, `Esc` |
| `Toast` | `components/ui/Toast.tsx` | info / success / warning / error | `role="status"` / `role="alert"` |
| `Tooltip` | `components/ui/Tooltip.tsx` | — | **bukan** channel informasi utama |
| `Slider` | `components/ui/Slider.tsx` | — | Primitive untuk SeekBar & Volume |
| `Segmented` | `components/ui/Segmented.tsx` | — | `role="radiogroup"` |
| `Switch` | `components/ui/Switch.tsx` | on / off | `role="switch"` |
| `Badge` | `components/ui/Badge.tsx` | 6 warna semantik | |
| `Tabs` | `components/ui/Tabs.tsx` | — | `role="tablist"`, panah kiri/kanan |
| `Skeleton` | `components/ui/Skeleton.tsx` | — | `aria-hidden`, `aria-busy` |
| `EmptyState` | `components/ui/EmptyState.tsx` | — | Heading + aksi |

### 6.2 Spesifikasi Detail

#### `SubtitleOverlay`

```
Perilaku
  - Menerima teks cue yang SUDAH aktif dari rAF loop (requirement.md §8.2)
  - Tulis via textContent imperatif, bukan lewat state
  - Maksimal 2 baris; baris ke-3 dipotong dengan ellipsis
  - Lebar maksimum 90% dari stage
  - Padding stage bagian bawah minimal 8% agar tidak pernah tertutup dock
  - Pointer-events: none, kecuali click-to-reveal saat teks terpotong

Token yang dipakai
  font-size   : var(--text-subtitle)
  line-height : var(--lh-subtitle)
  font-weight : var(--fw-subtitle)
  color       : var(--subtitle-fg)
  background  : var(--subtitle-bg)
  text-shadow : var(--subtitle-shadow)
  radius      : var(--radius-md)
  padding     : 0.4em 0.8em
  max-width   : 90%

Kondisi
  idle   : elemen kosong, tetap punya tinggi minimum (72px) supaya stage tidak "melompat"
  active : teks + background
  hidden : seluruh stage disembunyikan saat subtitleVisible === false
```

> **D-13 — Overlay subtitle punya tinggi minimum even when idle.** Tanpa ini, subtitle yang kosong membuat stage menyusut seketika, dan subtitle berikutnya masuk dengan posisi yang melompat. Memakai tinggi minimum 72px (atau 2 baris) menjaga posisi teks stabil sepanjang playback.

#### `SeekBar`

```
Struktur
  <div role="slider"
       aria-label="Posisi playback"
       aria-valuemin={0}
       aria-valuemax={durationMs}
       aria-valuenow={positionMs}
       aria-valuetext="0 menit 42 detik dari 45 menit 13 detik"
       tabindex={0}>

Lapisan (z-order bawah ke atas)
  1. .track         bg: --bg-inset,  height 4px,  radius full
  2. .buffered      bg: --border-strong, tinggi sama, lebar = rasio buffer
  3. .fill          bg: --accent-500, lebar = position/duration
  4. .knob          12px (desktop) / 10px (mobile), muncul saat hover atau drag

Perilaku
  - Klik pada track     : seek ke posisi klik
  - Drag                : seek kontinu, throttled ke 1 frame
  - Keyboard            : ←/→ 5 detik, Shift+←/→ 1 detik, Home/End, PageUp/PageDown 10%
  - Update posisi       : TIDAK lewat React state (requirement.md §8.3)
  - Hover               : knob muncul, track menebal 4px → 6px, 120ms
  - During playback     : tidak ada transisi pada .fill (D-03)
```

| Kondisi | Tampilan |
|---|---|
| Default | Track 4px, tanpa knob |
| Hover / focus | Knob 12px muncul, track 6px |
| Dragging | Knob 12px, `cursor: grabbing`, update 1 frame |
| Durasi belum diketahui | Track disabled, `aria-valuenow=0` |
| Buffering | Fill terasa "nyangkut" sementara `readyState < 3`, knob berdenyut halus |

#### `OffsetPanel`

Spesifikasi lengkap di §9.

#### `LibraryCard`

```
Struktur
  <li>
    <article> — seluruh kartu adalah satu target klik
      <div class="thumbnail">      aspect-ratio 1, bg-inset, overflow hidden
        <img>  atau  <fallback> (ikon + inisial)
        <div class="hover-overlay">  tombol ▶ 48px, opacity 0 → 1
        <Badge>  "Selesai"  (kiri atas, hanya bila completed)
      </div>
      <h3>   judul, 2 baris clamp
      <div>  nama file audio, 1 baris ellipsis
      <div>  nama file subtitle ATAU "Tanpa subtitle"
      <div>  baris status (waktu / prompt / badge)
      <div class="progress">  2px, hanya bila 0 < progress < 95%
    </article>
  </li>

Interaksi
  Klik kartu        : buka /play/:itemId
  Klik tombol ▶     : putar langsung dari posisi terakhir
  Klik "sub+ subtitle" : buka ImportDialog dalam mode ganti-subtitle
  Klik "Pasang ulang"  : buka RelinkDialog

A11y
  <li> punya aria-label ringkas: "Cerita 01 — Bab 1, MP3, dengan subtitle,
  sudah selesai, 92% diputar"
```

---

## 7. State & Interaksi

### 7.1 Matriks State

Setiap layar punya empat kondisi. Tidak ada kondisi kelima yang boleh muncul tanpa desain.

| Layar | Loading | Ready | Empty | Error |
|---|---|---|---|---|
| Library | 6 skeleton kartu | grid | EmptyState §5.2 | banner + tetap tampil item yang ada |
| Player | spinner di stage | subtitle + panel | "Belum ada subtitle" + tombol pilih | banner di stage, audio tetap main |
| Cue list | skeleton 8 baris | daftar | "Subtitle tidak punya cue" | "Gagal memuat subtitle" |
| Settings | skeleton baris | form | — | toast |
| Dock | tidak ada (selalu tampil) | kontrol | tombol play disabled | tombol retry |

> **D-14 — Error tidak pernah menggantikan konten yang sudah ada.** Kalau seekbar gagal memuat, seekbar tetap tampil dan hanya sebagian area seek yang nonaktif. Mengganti seluruh halaman dengan pesan error adalah tanda kesalahan arsitektur, bukan tanda bahwa error-nya itu sendiri.

### 7.2 Micro-interaksi

| Interaksi | Durasi | Catatan |
|---|---|---|
| Hover tombol | 120ms | hanya `background` + `color` |
| Focus ring | 120ms | `outline` tidak di-animate (bikin jumpy) |
| Dialog masuk | 260ms | opacity 0→1 + translateY 8px→0 |
| Dialog keluar | 180ms | reverse, `--ease-exit` |
| Toast | 260ms | slide dari bawah, auto-dismiss 4 detik |
| Toast dengan Undo | 8 detik | "Item dihapus" + Undo. Hapus tanpa undo tidak pernah. |
| Tab berganti | 180ms | underline bergeser, bukan fade |
| Cue aktif berubah | 0ms | **D-03** |
| Knob seekbar | 0ms saat drag | mencegah efek "tertinggal dari jarinya" |

### 7.3 Toast

| Jenis | Pemicu | Durasi | Aksi |
|---|---|---|---|
| success | Import berhasil, export berhasil | 4 detik | — |
| info | Update tersedia, persist storage granted | 8 detik | Muat ulang |
| warning | Kuota > 80%, format best-effort | 6 detik | Lihat |
| error | Import gagal, export gagal | **persist** (tombol tutup) | Coba lagi |
| undo | Hapus item, hapus bookmark | 8 detik | Urungkan |

---

## 8. Subtitle UX

Bagian ini adalah inti produk. Semua keputusan di sini ada untuk membuat teks terbaca dan tepat waktu.

### 8.1 Rules Keterbacaan

| ID | Rule | Nilai | Alasan |
|---|---|---|---|
| **S-01** | Lebar maksimum | 90% lebar stage | Teks yang terlalu lebar mata sulit kembali ke awal baris. |
| **S-02** | Maksimal baris | 2, sisanya ellipsis | 3+ baris menutupi terlalu banyak area dan tidak sempat dibaca sebelum berganti. |
| **S-03** | Line height | 1.4 | Terlalu rapat membingungkan awal baris baru; terlalu renggang menciptakan jarak yang salah baca. |
| **S-04** | Font weight | 500 | Di atas artwork foto, weight 400 hilang. 700 terlalu tebal untuk durasi baca panjang. |
| **S-05** | Latar | `rgba(0,0,0,.72)` | Menjamin kontras minimum 4.5:1 dengan teks putih di atas foto apa pun. |
| **S-06** | Bayangan teks | 2 lapis | Jaring pengaman bila `--subtitle-bg` gagal ter-render. |
| **S-07** | Teks rata tengah | `text-align: center` | Rata kiri di bawah teks yang terpotong terlihat tidak simetris. |
| **S-08** | Penyejajaran baris | `text-wrap: balance` | Membagi teks jadi dua baris dengan panjang seimbang, bukan satu baris penuh satu baris satu kata. |
| **S-09** | `white-space: pre-line` | — | Menghormati `\n` dari cue tanpa menghormati spasi ganda yang tidak disengaja. |
| **S-10** | Safe area bawah | 8% tinggi stage | Overlay tidak pernah menutupi dock. |

### 8.2 Kontras

| Kombinasi | Rasio | Status |
|---|---|---|
| `#FFFFFF` di atas `rgba(0,0,0,.72)` di atas `#0B0D10` | 15.8:1 | AAA |
| `#FFFFFF` di atas `rgba(0,0,0,.72)` di atas foto terang (mis. `#F5F5F5`) | 4.7:1 | AA (lolos) |
| `#FFFFFF` di atas `rgba(0,0,0,.72)` di atas foto putih penuh (`#FFFFFF`) | 4.6:1 | AA (lolos, mendekati batas) |
| `--text-secondary` di atas `--bg-base` dark | 7.4:1 | AAA |
| `--text-tertiary` di atas `--bg-base` dark | 3.6:1 | **Hanya untuk teks non-esensial** |
| `--text-tertiary` di atas `--bg-base` light | 3.1:1 | **Hanya untuk teks non-esensial** |

> **D-15 — `--text-tertiary` tidak boleh dipakai untuk informasi yang harus dibaca.** Di kedua tema rasio-nya di bawah 4.5:1. Token ini hanya untuk placeholder, nama file, dan metadata yang punya kembar informatif di tempat lain. Semua angka dan label yang penting memakai `--text-primary` atau `--text-secondary`.

### 8.3 Cue List

```
+--------------------------------------------------------------------------+
|  ( Daftar Cue )  Bookmark (3)              [ cari di subtitle... ]       |
+==========================================================================+
|  0:01   Halo, ini cue pertama.                                           |
|  0:04   Cue kedua dengan italic.                                         |
|  0:08   Baris kedua memakai line break.                                   |
|  1:00   Cue ketiga, satu menit kemudian.              <-- AKTIF          |
|  1:05   Cue keempat.                                                     |
+--------------------------------------------------------------------------+
```

| Aspek | Spesifikasi |
|---|---|
| Baris aktif | `background: var(--accent-surface)`, border kiri 2px `--accent-500` |
| Cue terlewati | `--text-tertiary` (mendalam dari `--text-secondary`) |
| Timestamp | `--font-mono`, `text-xs`, tabular, lebar tetap 56px agar kolom lurus |
| Teks | 1 baris, `text-overflow: ellipsis` |
| Klik | lompat ke `cue.startMs` dengan offset dikoreksi |
| Scroll otomatis | **Hanya** bila cue aktif keluar dari viewport. Jangan auto-scroll saat user sedang scroll manual. |
| Highlight | Teks yang cocok pencarian diberi `<mark>` dengan `--accent-surface` + teks `--accent-500` |
| Kosong | "Subtitle ini tidak memiliki cue" |

> **D-16 — Auto-scroll cue list hanya saat active cue keluar dari viewport, dan langsung berhenti begitu user scroll manual.** Auto-scroll yang berjalan terus membuat daftar mustahil dibaca. Penentuan "user sedang scroll manual" pakai flag yang di-reset oleh `scrollend` atau timeout 3 detik.

### 8.4 Why No Click-to-Expand

Diusulkan ada interaksi "klik subtitle untuk menampilkan penuh" (seperti YouTube). **Ditolak untuk v1.** Alasannya: subtitle sudah punya `max 2 baris` + ellipsis, dan menambahkan interaksi ini membuat `pointer-events: none` jadi tidak murni, menambah permukaan bug, dan manfaatnya rendah karena cue aslinya selalu bisa dibaca penuh di cue list. Jika nanti dibutuhkan, ini fitur C yang mudah ditambahkan.

---

## 9. Panel Sinkronisasi

> Menyusun FR-24, FR-25, FR-26, FR-27. Ini panel **first-class**, bukan kontrol kecil yang disembunyikan di Settings. D-01.

### 9.1 Layout

```
+------------------------------------------------------------------+
|  PANEL SINKRONISASI                                              |
+------------------------------------------------------------------+
|                                                                  |
|  +----------------------------+  +----------------------------+  |
|  |  OFFSET SUBTITLE           |  |  CUE SEKARANG              |  |
|  |                            |  |                            |  |
|  |    − 0.300                 |  |  0:42  →  0:46             |  |
|  |    detik                   |  |                            |  |
|  |                            |  |  "Cue kedua dengan         |  |
|  |  [−500] [−100]  [0]  [+100] [+500]  | italic."                  |  |
|  |                            |  |                            |  |
|  |  ( ) Terapkan ke semua    |  |  -2s      0s      +2s       |  |
|  |      item                 |  |   |--------|-------|-----|  |  |
|  |                            |  |        [############]        |  |  |
|  |  shift+klik angka untuk    |  |            ^                |  |  |
|  |  mengetik nilai manual     |  |          audio               |  |  |
|  +----------------------------+  +----------------------------+  |
+------------------------------------------------------------------+
```

### 9.2 Offset Readout

| Aspek | Spesifikasi |
|---|---|
| Format | Selalu 3 desimal: `-0.300`, `+0.000`, `+1.250` |
| Tanda | `+` eksplisit untuk nilai positif, `−` (U+2212) untuk negatif — bukan `-` ASCII |
| Font | `--font-mono`, `--text-3xl`, `tabular-nums` |
| Warna | `--text-primary` normal; `--warning` bila `abs > 2000ms` (sinyal bahwa ini mungkin keliru) |
| Label | "detik" di bawah angka, `--text-xs`, `--text-tertiary` |
| Pembulatan | Bulatkan ke bawah (floor) agar tampilan tidak pernah lebih besar dari nilai sebenarnya |
| Role | `role="status"` + `aria-live="polite"` agar screen reader mengumumkan perubahan |

> **D-17 — Readout dibulatkan ke bawah, bukan ke terdekat.** Offset +0.3006 detik ditampilkan `+0.300`, bukan `+0.301`. Pembulatan ke atas membuat angka terlihat seperti nilai yang lebih besar dari kenyataan, sehingga user justru mengoreksi ke arah yang salah.

### 9.3 Tombol Offset

| Tombol | Delta | Pintasan | Perilaku |
|---|---|---|---|
| `−500` | −500ms | `Shift` + `[` | Klik = 1 langkah; tahan = repeat tiap 120ms |
| `−100` | −100ms | `[` | idem |
| `0` | → 0 | `0` | Reset, disabled saat sudah 0 |
| `+100` | +100ms | `]` | idem |
| `+500` | +500ms | `Shift` + `]` | idem |

Semua perubahan bersifat **instan dan real-time** (FR-25) — subtitle bergeser pada frame yang sama dengan perubahan readout, tanpa perlu ada hal lain yang berubah.

Batas: `clamp(nilai, -5000, 5000)`. Saat mencapai batas, tombol disable dan tampilkan `-5.000 / +5.000 detik adalah batas`.

**Input manual:** `shift+klik` pada angka readout mengubahnya menjadi `<input type="number">` dengan `step=0.1`, `min=-5`, `max=5`, `unit=detik`. Enter atau blur mengonfirmasi, `Esc` membatalkan. Untuk kasus subtitle yang meleset jauh — misalnya subtitle anime yang tertunda 40 detik.

### 9.4 "Terapkan ke Semua Item"

Checkbox, **default tidak aktif** (FR-26 meminta per-item).

Saat aktif, menampilkan konfirmasi: "Offset ini akan diterapkan ke 12 item lain." Karena mengubah offset semua item hampir selalu tidak disengaja dan sulit dibatalkan. Terapkan, lalu checkbox kembali ke tidak aktif.

### 9.5 Mini Timeline

Visualisasi yang menjawab pertanyaan "kenapa subtitle saya meleset?"

```
     -2s          -1s           0s          +1s          +2s
      |-------------|------------|------------|------------|
    0:40           0:41         0:42         0:43         0:44
                                   ^
                            posisi audio
   [================[  C U E  A K T I F  ]==================]
```

Saat offset negatif, blok cue bergeser **ke kanan** relatif terhadap penanda audio:

```
     -2s          -1s           0s          +1s          +2s
      |-------------|------------|------------|------------|
                                   ^
                            posisi audio
                              [======[ C U E ]======]
```

| Aspek | Spesifikasi |
|---|---|
| Jendela | `positionMs ± 2000ms` (total 4 detik) |
| Lebar | 300px desktop, full-width mobile |
| Blok cue | Lebar proporsional terhadap durasi cue, tinggi 22px, radius 4px, `background: --accent-500` |
| Penanda audio | Garis vertikal 2px `--text-primary`, `position: absolute` |
| Skala | Label `-2s`, `-1s`, `0s`, `+1s`, `+2s` di bawah, `--text-2xs` mono |
| Perilaku | Di-render ulang **hanya** saat offset berubah atau cue berganti. Bukan tiap frame. |
| A11y | `aria-hidden="true"` — data yang sama sudah tersedia di `aria-valuetext` offset dan di cue list |

### 9.6 Interaksi dengan Cue List

Menekan offset di panel **tidak** mengubah posisi cue di cue list — cue list menampilkan waktu subtitle apa adanya. Yang bergeser adalah tampilan di stage. Ini mencegah user salah paham: daftar tetap jujur tentang isi file, panel yang menunjukkan koreksi.

---

## 10. Guided Sync Wizard

> Menyusun **FR-45** (prioritas S). Dipicu sekali, saat pertama kali sebuah item/library punya subtitle yang belum punya offset tersimpan.

### 10.1 Kapan Muncul

- Pertama kali user attach subtitle ke item mana pun → tawarkan, bukan paksa
- Hanya satu wizard yang boleh terbuka; membuka wizard kedua akan menimpa yang pertama
- Kalau user menolak, item ditandai `syncHintDismissed: true` dan tidak ditanyakan lagi untuk item itu

### 10.2 Tiga Langkah

```
Langkah 1 — PENDAHULUAN
+----------------------------------------+
|                                        |
|           ◇ Sinkronisasi                |
|                                        |
|  Subtitle dan audio kadang punya       |
|  selisih waktu sedikit. Kita akan      |
|  bantu menyesuaikannya.                |
|                                        |
|  Butuh sekitar 30 detik.               |
|                                        |
|         [  Mulai  ]                    |
|         Lewati                         |
+----------------------------------------+

Langkah 2 — DENGARKAN
+----------------------------------------+
|                                        |
|  Dengarkan 15 detik pertama, lalu      |
|  perhatikan apakah teksnya:            |
|                                        |
|  +----------------------------------+  |
|  |  ⊖  Terlalu cepat   (audio       |  |
|  |    audionya terdengar terlalu cepat                 |  |
|  +----------------------------------+  |
|  |  ⊕  Terlalu lambat  (audio       |  |
|  |    _fast forward_)               |  |
|  +----------------------------------+  |
|                                        |
|         [ Mengulang ]  [ Lanjut ]      |
+----------------------------------------+

Langkah 3 — HALUSKAN
+----------------------------------------+
|                                        |
|  Sekarang geser subtitle sampai        |
|  pas dengan suara.                     |
|                                        |
|  +----------------------------------+  |
|  |        − 0.300  detik           |  |
|  |                                  |  |
|  |  [−500][−100][0][+100][+500]    |  |
|  |                                  |  |
|  |  [   Selesai & Simpan   ]        |  |
|  +----------------------------------+  |
|                                        |
|  Lewati — simpan sebagai 0 detik      |
+----------------------------------------+
```

### 10.3 Spesifikasi

| Aspek | Spesifikasi |
|---|---|
| Total durasi | 30–45 detik |
| Audio diputar | Dari 0, 15 detik, di-loop sampai user memilih |
| Kontrol | Step 2: dua tombol besar. Step 3: panel offset penuh (re-use `OffsetPanel`) |
| Navigasi | `Esc` = batal dari mana pun, dialog close, **tidak** ada perubahan tersimpan |
| Perhatian | Wizard **tidak boleh** auto-play sebelum ada user gesture. Audio baru mulai setelah klik "Mulai". |
| Penyimpanan | Selesai → tulis `subtitleOffsetMs` ke item. `syncHintDismissed` **di-set `true`** di kedua jalur (selesai atau batal), supaya item yang sama tidak pernah ditawari wizard lagi. |
| Traceability | AC baru: **AC-17** (lihat §14) |

> **D-18 — Langkah 2 memakai dua tombol, bukan slider.** Pertanyaan "apakah subtitle terlalu cepat atau lambat?" adalah pertanyaan kategorikal, bukan kontinum presisi. Slider di langkah ini akan membuat user mengutak-atik angka sebelum dia tahu arah masalahnya. Penyesuaian presisi baru relevan di langkah 3, setelah arah sudah diketahui.

---

## 11. Aksesibilitas

Menyusun NFR-12 dan NFR-13.

### 11.1 Aturan Umum

| Aturan | Nilai |
|---|---|
| Skip link | `<a href="#main" class="skip-link">` — muncul saat focus, melompat ke konten utama |
| Focus ring | `outline: 2px solid var(--accent-500); outline-offset: 2px` — **tidak pernah** `outline: none` tanpa pengganti |
| Target sentuh | Minimal 44 × 44px di mobile (`--space-11` = 44px) |
| Font zoom | Semua ukuran dalam `rem`, bukan `px`, agar zoom browser 200% tidak merusak layout |
| Urutan fokus | Mengikuti urutan DOM. Tidak ada `tabindex` positif. |

### 11.2 Focus Order per Halaman

```
Library:  skip-link → nav tabs → search → sort → [+ Tambah] → kartu 1..n → dock
Player:   skip-link → nav tabs → [subtitle toggle] → [bookmark] → offset panel
          → cue search → cue list (satu tab stop, panah untuk navigasi) → dock
Settings: skip-link → nav tabs → tiap baris preferensi → dock
Dialog:   focus trap. FOKUS AWAL = elemen utama atau "Batal" bila destruktif.
          FOKUS AKHIR dikembalikan ke pemicu saat dialog ditutup.
```

### 11.3 Subtitle & Screen Reader

> **Keputusan yang mudah salah: apa yang diumumkan?**

Menyalakan `aria-live` pada overlay subtitle akan membuat screen reader membacakan setiap cue yang berganti — beberapa kali per menit. Itu membuat aplikasi tidak bisa dipakai.

Aturannya:

```html
<!-- Overlay: TIDAK diumumkan -->
<div class="subtitle-overlay" aria-live="off" aria-hidden="true">

<!-- Cue aktif yang bisa dibacakan secara manual -->
<button aria-label="Bacakan subtitle saat ini">
  <span role="status" aria-live="polite">{activeCueText}</span>
</button>
```

| Pemakaian | Perilaku |
|---|---|
| Overlay subtitle | `aria-live="off"` + `aria-hidden="true"` — murni visual |
| Tombol "Bacakan subtitle" di panel sinkronisasi | `aria-live="polite"`, diumumkan **hanya atas klik** |
| Seekbar | `aria-valuetext` selalu dalam bentuk verbal: "0 menit 42 detik dari 45 menit 13 detik" |
| Offset readout | `aria-live="polite"` — diumumkan tiap perubahan, karena itu aksi yang sedang user lakukan |
| Perubahan cue di cue list | `aria-activedescendant` berpindah via panah, bukan auto-scroll |

### 11.4 Tabel Kontras Token

| Kombinasi | Dark | Light | Status |
|---|---|---|---|
| `--text-primary` / `--bg-base` | 17.2:1 | 18.1:1 | AAA |
| `--text-secondary` / `--bg-base` | 7.4:1 | 7.1:1 | AAA |
| `--text-secondary` / `--bg-surface` | 6.6:1 | 6.8:1 | AA |
| `--accent-500` / `--bg-base` | 5.9:1 | 5.6:1 | AA |
| `--on-accent` / `--accent-500` | 4.6:1 | 6.1:1 | AA |
| `--danger` / `--bg-surface` | 5.1:1 | 4.9:1 | AA |
| `--warning` / `--bg-surface` | 8.1:1 | 5.4:1 | AA |
| `--success` / `--bg-surface` | 9.2:1 | 4.6:1 | AA |
| `--subtitle-fg` / `--subtitle-bg` | 15.8:1 | 15.8:1 | AAA |

### 11.5 Keyboard — Titik Konflik dengan requirement.md §5.1

Semua pintasan di §5.1 `requirement.md` berlaku. Yang ditambahkan oleh dokumen ini:

| Key | Aksi | Alasan |
|---|---|---|
| `?` | Buka referensi pintasan | Tidak ada di §5.1 |
| `Esc` | Tutup dialog / wizard | Standar, tidak bentrok |

**Penyelesaian konflik fokus:** saat user mengetik di `<input>` (search, label bookmark, input offset), **semua pintasan single-key dinonaktifkan**. `Esc`, `Tab`, `Enter`, dan `Ctrl/Cmd` tetap berfungsi. Tanpa aturan ini, mengetik label bookmark yang mengandung huruf `b` akan ikut membuat bookmark baru.

---

## 12. Responsif & Mobile

### 12.1 Tabel Perubahan

| Aspek | `sm` (360) | `md` (640) | `lg` (1024) | `xl` (1440) |
|---|---|---|---|---|
| Kolom library | 1 | 2 | 3 | 4 |
| Dock | 64px, ringkas | 88px | 88px penuh | 88px penuh |
| Seekbar dock | tidak ada | ada | ada | ada |
| Subtitle stage | `min(30vh, 300px)` | `min(38vh, 400px)` | `min(42vh, 480px)` | `min(45vh, 560px)` |
| `--text-subtitle` | 18px | 20px | 26px | 32px |
| Panel sinkronisasi | stack, ringkas | stack | 2 kolom | 2 kolom + gap besar |
| Cue list | full | full | 1 kolom | 2 kolom (kolom 2 = cue yang sudah terlewati) |
| Dialog | bottom sheet 90vh | bottom sheet | center 520px | center 560px |
| AppBar | 56px, tanpa nav label | 64px | 64px | 64px |

### 12.2 Breakpoint `md` ke `lg` — Titik Kritis

Dock berubah dari mobile ke desktop di `lg`. Selama transisi:

- Seekbar **muncul** → `aria-valuenow` tetap sama, tidak ada reset
- Kontrol yang tadinya di dalam bottom sheet **pindah** ke dock
- **Tidak boleh ada** state audio yang hilang saat transisi — dock hanya alias dari kontrol yang sama

### 12.3 Mobile — Sunyi

| Hal | Keputusan |
|---|---|
| Long-press | Tidak dipakai. Semua aksi punya tombol yang terlihat. |
| Swipe gesture | Hanya swipe horizontal pada seekbar (dengan konfirmasi di release). Tidak ada swipe-gesture tersembunyi untuk play/pause. |
| Haptic feedback | Dilewati. `navigator.vibrate` tidak didukung iOS Safari dan getarannya membosankan. |
| Orientation lock | Tidak dikunci. Landscape memberi stage lebih luas, dan itu bagus. |
| Pull-to-refresh | Dinonaktifkan. Tidak ada yang perlu di-refresh. |

---

## 13. Copy & Tone

### 13.1 Suara

- **Formal-hangat.** Pakai "Anda", bukan "kamu". Ini aplikasi kerja, bukan game.
- **Langsung.** Sebut masalahnya, sebut solusinya. Jangan menyapa, jangan memberi alasan yang tidak diminta.
- **Tanpa rasa bersalah.** "File tidak ditemukan" bukan "Ups, ada yang salah!"

### 13.2 Istilah

| Istilah | Pakai | Hindari |
|---|---|---|
| Library | "Library" | "Koleksi", "Perpustakaan" |
| Item | "item" | "Berkas" (terlalu formal), "file" (dipakai hanya untuk nama file) |
| Cue | "cue" | "Subtitle" (menyebut baris teks sebagai "subtitle" membingungkan karena subtitle = file) |
| Subtitle (file) | "subtitle" | "caption", "teks" |
| Offset | "offset" | "Koreksi waktu" (terlalu panjang untuk UI) |
| Sinkronisasi | "sinkronisasi" | "Sync" di teks UI — hanya boleh di nama shortcut |
| Bookmark | "bookmark" | "Penanda" (terlalu teknis untuk non-teknis) |
| Progress | "progress" | "Riwayat" |
| Selesai | "Selesai" | "Completed", "Tuntas" |

### 13.3 Pola Kalimat

```
Error    : [Apa yang terjadi]. [Apa yang bisa dilakukan].
            "Format file tidak didukung. Coba MP3, M4A, atau WAV."
            "File tidak ditemukan. Pasang ulang file untuk melanjutkan."
Sukses   : [Apa yang terjadi]. [Konfirmasi hasil, kalau relevan.]
            "12 item ditambahkan ke library."
            "Offset disimpan untuk item ini."
Warning  : [Fakta]. [Konsekuensi kalau diabaikan].
            "Penyimpanan 87% penuh. File baru mungkin gagal disimpan."
            "Browser ini tidak mendukung pemilihan file langsung.
             File akan disalin dan bisa cepat memenuhi kuota."
Info     : [Fakta saja].
            "Pembaruan tersedia. Muat ulang setelah selesai."
Empty    : [Kondisi]. [Aksi utama].
            "Library masih kosong. Tambahkan file audio pertama Anda."
```

**Aturan kapitalisasi & tanda baca:** sentence case, **tanpa** titik di akhir label tombol dan badge. Tambahkan titik di akhir kalimat error yang berupa kalimat utuh.

### 13.4 Label Tombol

| Aksi | Label | Bukan |
|---|---|---|
| Tambah file | "Tambah file" | "Import", "Upload", "+" |
| Pilih file | "Pilih file" | "Browse", "Jelajah" |
| Hapus | "Hapus" | "Remove", "Buang" |
| Simpan | "Simpan" | "Save", "Oke", "Konfirmasi" |
| Batal | "Batal" | "Cancel", "Tutup", "×" |
| Pasang ulang file | "Pasang ulang" | "Relink", "Pilih ulang" |
| Lanjut | "Lanjut dari 12:34" | "Resume", "Lanjutkan" |
| Geser subtitle | "Offset subtitle" | "Subtitle timing", "Sync" |

---

## 14. Traceability

### 14.1 Keputusan Desain → Requirement

| ID Keputusan | Requirement | Dijelaskan di |
|---|---|---|
| D-01 Subtitle sebagai fokus utama | FR-19, FR-20, FR-24 | §1.2, §8.1, §9 |
| D-02 Angka tabular | NFR-12, AC-01 | §3.2, §9.2 |
| D-03 Tidak ada animasi saat playback | NFR-01, NFR-03, AC-01 | §3.5, §7.2, §8.3 |
| D-04 Kontrol di satu tempat | FR-11, FR-12, FR-14, FR-15 | §2.2, §4.2 |
| D-05 Error punya jalan keluar | NFR-09, NFR-10, FR-07 | §5.1, §5.5, §7.1 |
| D-06 Nol request eksternal | NFR-07, FR-39, FR-40 | §3.1, §3.2, §1.2 |
| D-07 Larangan backdrop-filter | NFR-03 | §3.1 |
| D-08 tabular-nums | NFR-12 | §3.2 |
| D-09 Cue preview di dock | D-04, FR-19 | §4.2 |
| D-10 Stage berbasis vh | FR-19 | §5.3 |
| D-11 Relink menjaga data | FR-07, AC-11 | §5.5, §6.1 |
| D-12 Status kapabilitas browser | NFR-11 | §5.6 |
| D-13 Tinggi minimum overlay | NFR-01 | §6.2 |
| D-14 Error tidak mengganti konten | NFR-10 | §7.1 |
| D-15 text-tertiary terbatas | NFR-12 | §8.2 |
| D-16 Auto-scroll cue list | FR-28 | §8.3 |
| D-17 Bulatkan offset ke bawah | FR-24 | §9.2 |
| D-18 Wizard dua tombol | FR-45 | §10.3 |

### 14.2 Requirement → Halaman / Komponen

| Requirement | Halaman | Komponen utama |
|---|---|---|
| FR-01, FR-02 Import | Library | `ImportDialog`, `LibraryPage` |
| FR-03 Persistensi | (global) | `storage/`, `idb/` |
| FR-05 Hapus item | Library | `LibraryCard`, `Toast` (undo) |
| FR-06 Ganti subtitle | Library | `ImportDialog` (mode ganti) |
| FR-07 File hilang | Library | `MissingFilesBanner`, `RelinkDialog` |
| FR-08 Export / import | Settings | `ExportImportCard` |
| FR-11 s/d FR-15 Player | Dock | `TransportControls`, `SeekBar`, `RateSelector`, `VolumeControl` |
| FR-19 s/d FR-22 Subtitle | Player | `SubtitleStage`, `SubtitleOverlay` |
| FR-23 Toggle subtitle | Dock, Player | Switch, pintasan `C` |
| FR-24 s/d FR-27 Offset | Player | `OffsetPanel`, `OffsetReadout`, `MiniTimeline` |
| FR-28 Cue list | Player | `CueList`, `CueListItem` |
| FR-29 Cari cue | Player | `CueList` search |
| FR-31 s/d FR-34 Bookmark | Player | `BookmarkPanel`, `BookmarkItem`, `ResumePrompt` |
| FR-35 Tandai selesai | Library | `LibraryCard` badge |
| FR-38 s/d FR-44 PWA | Settings | `InstallButton`, `OfflineBadge`, `StorageUsage` |
| FR-45 Sync wizard | Player | `SyncWizard` |
| NFR-12, NFR-13 A11y | (global) | `Tooltip`, `IconButton`, `SkipLink` |

### 14.3 Acceptance Criteria

AC-01 s/d AC-16 didefinisikan di `requirement.md` §10. AC-17 s/d AC-21 adalah tambahan yang lahir dari dokumen desain ini dan **sudah ditambahkan** ke `requirement.md` §10 agar tetap menjadi sumber tunggal.

| ID | Kriteria | Sumber |
|---|---|---|
| **AC-17** | **Given** user baru dengan subtitle tanpa offset, **When** attach subtitle dan menjalankan wizard, **Then** wizard selesai dalam ≤ 45 detik, offset tersimpan, dan user dapat menyetel subtitle dengan benar tanpa membaca dokumentasi. | §10 |
| **AC-18** | **Given** user sedang mengetik label bookmark, **When** mengetik huruf `b`, **Then** tidak ada bookmark baru yang dibuat. | §11.5 |
| **AC-19** | **Given** user memakai screen reader, **When** subtitle berganti, **Then** tidak ada pengumuman otomatis; hanya atas klik "Bacakan subtitle". | §11.3 |
| **AC-20** | **Given** library dengan 200 item, **When** membuka Library, **Then** scroll mulus, tidak ada layout shift setelah skeleton hilang. | §7.1 |
| **AC-21** | **Given** viewport diubah dari mobile ke desktop, **When** dock berubah dari 64px ke 88px, **Then** posisi playback, kecepatan, dan volume **tidak berubah** dan tidak ada jank. | §12.2 |

---

## 15. Checklist Pre-Ship

### 15.1 Design

- [ ] Semua token dipakai lewat nama semantik, tidak ada hex literal di komponen
- [ ] Light mode diuji di seluruh halaman, bukan hanya Library
- [ ] Semua state (§7.1) punya desain — termasuk yang jarang terlihat
- [ ] Semua kondisi `LibraryCard` (§5.1) terimplementasikan
- [ ] Tanpa `backdrop-filter` pada `SubtitleOverlay` (D-07)
- [ ] Semua angka waktu memakai `tabular-nums`
- [ ] Semua animasi playback memakai `--duration-instant` (D-03)
- [ ] Z-index hanya memakai nilai dari §3.6
- [ ] Semua ukuran dalam `rem`, bukan `px`

### 15.2 Subtitle UX

- [ ] Subtitle 2 baris + ellipsis bekerja pada cue terpanjang
- [ ] Kontras subtitle ≥ 4.5:1 di atas artwork paling terang
- [ ] Overlay tidak pernah tertutup dock di viewport mana pun
- [ ] Overlay tidak menyusut saat cue kosong (D-13)
- [ ] Offset berubah pada frame yang sama dengan perubahan readout (FR-25)
- [ ] Mini timeline bergeser ke arah yang benar untuk offset + dan −
- [ ] Auto-scroll cue list berhenti saat user scroll manual (D-16)

### 15.3 Aksesibilitas

- [ ] Seluruh alur utama selesai hanya dengan keyboard
- [ ] Focus trap bekerja di semua dialog
- [ ] Focus dikembalikan ke pemicu setelah dialog ditutup
- [ ] Overlay subtitle `aria-live="off"` (AC-19)
- [ ] `aria-valuetext` Seekbar berupa kalimat verbal
- [ ] Semua `IconButton` punya `aria-label`
- [ ] Single-key shortcut nonaktif saat mengetik (AC-18)
- [ ] Focus ring terlihat di semua elemen fokus
- [ ] `prefers-reduced-motion` tidak merusak subtitle
- [ ] Audit Lighthouse a11y ≥ 90

### 15.4 Responsif

- [ ] 360px, 640px, 1024px, 1440px, 1920px
- [ ] Transisi dock 64px → 88px tidak mereset state audio (AC-21)
- [ ] Dialog menjadi bottom sheet di mobile, centered di desktop
- [ ] Target sentuh minimal 44px di mobile
- [ ] 200% zoom browser tidak merusak layout

### 15.5 Traceability

- [ ] Setiap FR M (Must) punya minimal satu komponen di §14.2
- [ ] Setiap AC punya representasi visual di dokumen ini
- [ ] Tidak ada komponen di §6.1 yang tidak menjawab FR mana pun

---

**Akhir dokumen.**

###  task.md

# Task List — Audio Subtitle Player

Dokumen ini adalah **pekerjaan yang harus dijalankan**, diturunkan dari `requirement.md` (sumber kebutuhan) dan `design.md` (sumber keputusan UI/UX). Tidak ada ide baru di sini; setiap task harus bisa ditelusuri ke ID di kedua dokumen.

## Cara Kerja Setiap Task

Setiap task memakai siklus yang sama. Jangan melompat ke task berikutnya sebelum task aktif **Done**.

```
1. READ    Baca requirement.md & design.md yang dirujuk task ini
2. PLAN    Tentukan file yang akan disentuh
3. IMPLEMENT  Tulis kode
4. VERIFY  npm run typecheck && npm run lint && npm run test
5. ADJUST  Kalau VERIFY gagal atau hasil ≠ requirement/design:
           perbaiki, lalu ulangi VERIFY
6. DONE    Centang di bawah
```

### Aturan Adjust

- Gagal di VERIFY → **Adjust di task yang sama**, bukan task baru.
- Hasilnya beda dari `requirement.md` atau `design.md` → **Adjust di task yang sama**, atau koreksi dokumen dulu kalau memang dokumennya yang salah (pakai task `[DOC]`).
- Kalau satu task butuh lebih dari ~1 sesi kerja, pecah jadi beberapa `TASK-xx` baru — janganuum jadi satu task raksasa.

### Perintah Verifikasi (standar)

```bash
npm run typecheck   # tsc --noEmit, strict
npm run lint        # eslint
npm run test        # vitest run
npm run build       # hanya untuk task yang menyentuh konfigurasi/bundling
```

E2E (`npx playwright test`) hanya untuk task bertanda `[E2E]`.

### Checkboxes

Setiap task punya 5 checkbox yang **wajib** dicentang berurutan:

- [ ] **Implement** — kode selesai ditulis
- [ ] **Verify** — typecheck + lint + test hijau
- [ ] **Adjust** — minimal satu putaran koreksi sudah lewat, atau memang tidak ada yang perlu dikoreksi
- [ ] **Doc check** —perilaku kode dicek ulang terhadap `requirement.md` + `design.md` yang dirujuk
- [ ] **Done** — task selesai

---

## Peta Task

| ID | Task | Rujukan | AC | Blok |
|---|---|---|---|---|
| T-01 | Scaffold project | req §8.1, §8.8 | — | A |
| T-02 | Design tokens + tema | des §3.1–3.4 | — | A |
| T-03 | Primitif UI | des §6.1 | — | A |
| T-04 | Model `Cue` + parser SRT | req §6.2, §14 | AC-15 | B |
| T-05 | Parser WebVTT | req §7.3, §14 | AC-15 | B |
| T-06 | `cue-sync` (binary search + offset) | req §8.2 | AC-01,02,03,04 | B |
| T-07 | `AudioEngine` (rAF loop) | req §8.2, §8.3 | AC-01,02 | B |
| T-08 | localStorage wrapper + skema | req §6.3, §8.6 | — | C |
| T-09 | IndexedDB wrapper file ref | req §6.5, §8.4 | AC-06 | C |
| T-10 | AppShell + AppBar + NavTabs | des §4.1, §11.1 | — | C |
| T-11 | LibraryPage + grid + kartu | des §5.1, §5.2 | AC-20 | D |
| T-12 | ImportDialog (FSA + fallback) | req §4.1, §7.2 | AC-07, AC-15 | D |
| T-13 | Fingerprinting + relink | req §6.4, §4.1 | AC-11 | D |
| T-14 | TransportControls + SeekBar | des §4.2, §6.2 | — | E |
| T-15 | SubtitleStage + Overlay | des §5.3, §8.1, §8.2 | AC-13, AC-19 | E |
| T-16 | `sync-apply` (offset real-time) | req §8.3 | AC-04 | E |
| T-17 | CueList + pencarian cue | des §8.3 | — | E |
| T-18 | OffsetPanel + readout + minitimeline | des §9.1–9.5 | AC-05 | F |
| T-19 | Bookmark CRUD | req §4.4 | AC-10 | F |
| T-20 | Progress autosave + ResumePrompt | req §4.4 | AC-09 | F |
| T-21 | SyncWizard (Guided Sync) | req §4.3 FR-45, des §10 | AC-17 | F |
| T-22 | Export / import JSON | req §4.1 | AC-14 | G |
| T-23 | SettingsPage | des §5.6 | — | G |
| T-24 | PWA: manifest + service worker | req §8.7 | AC-08 | G |
| T-25 | Toast update + install prompt | req §4.5 | AC-16 | G |
| T-26 | Pintasan keyboard | req §5.1, des §11.5 | AC-12, AC-18 | G |
| T-27 | Dock responsif | des §4.2, §4.3, §12.2 | AC-21 | H |
| T-28 | A11y audit + perbaikan | des §11.1–11.5 | AC-18,19,20 | H |
| T-29 | Audit warna & motion | des §11.4, §3.5 | — | H |
| T-30 | E2E Playwright | req §13 | semua | H |
| T-31 | Checklist pre-ship | des §15 | semua | I |

## Urutan

Blok harus dikerjakan berurutan. Dalam satu blok, kerjakan berurutan juga (T-01 sebelum T-02, dst). Alasannya jelas: T-06 tidak berguna kalau T-04 belum ada model `Cue`.

| Blok | Isi | Syarat keluar blok |
|---|---|---|
| A — Fondasi | T-01, T-02, T-03 | `npm run build` hijau, app render, tidak ada error konsol |
| B | T-04, T-05, T-06, T-07 | `cue-sync` punya unit test hijau, audio + subtitle sinkron manual |
| C | T-08, T-09, T-10, T-11 | reload mempertahankan library |
| D | T-12, T-13 | import → relink lolos manual |
| E | T-14, T-15, T-16, T-17 | playback + subtitle + cue list jalan |
| F | T-18, T-19, T-20, T-21 | semua fitur M + FR-45 jalan |
| G | T-22, T-23, T-24, T-25, T-26 | offline penuh + settings + shortcut |
| H | T-27, T-28, T-29, T-30 | semua AC hijau |
| I | T-31 | checklist §15 `design.md` tercentang semua |

---

## Blok A — Fondasi

### T-01 `[SCAFFOLD]` Project skeleton

**Rujukan:** req §8.1 (stack), §8.8 (struktur direktori), des §6.1 (nama berkas komponen)

**File:** `package.json`, `tsconfig.json`, `vite.config.ts`, `eslint.config.js`, `index.html`, `src/main.tsx`, `src/App.tsx`, seluruh folder kosong di `src/`

**Implement:**
- `npm create vite@latest` varian react-ts, lalu install `zustand`, `tailwindcss@4` + `@tailwindcss/vite`, `vite-plugin-pwa`, `workbox-window`
- Dev: `typescript`, `@types/react`, `@types/react-dom`, `vitest`, `@vitest/coverage-v8`, `@playwright/test`, `eslint`, `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `jsdom`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`
- `tsconfig.json` dengan `"strict": true`
- Script: `dev`, `build`, `preview`, `typecheck` (`tsc --noEmit`), `lint`, `test` (`vitest run`), `test:watch`, `test:e2e`
- `vite.config.ts`: plugin react, plugin tailwind, plugin PWA (isi manifest-nya dipakai T-24)
- `.gitignore`: `node_modules`, `dist`, `coverage`, `playwright-report`, `.env*`
- Buat struktur direktori persis seperti req §8.8 (termasuk `lib/`, `components/ui/`, `hooks/`, `routes/`)

**Verify:** `npm run typecheck`, `npm run lint`, `npm run build`, `npm run test` (boleh 0 test), `npm run dev` → buka, halaman putih tanpa error konsol.

**Adjust yang mungkin:** Vite PWA plugin butuh `workbox-window`; kalau build gagal karena plugin, tambahkan dependency itu dulu.

**Doc check:** nama folder di §8.8 dan nama file komponen di des §6.1 harus cocok.

- [ ] Implement
- [ ] Verify
- [ ] Adjust
- [ ] Doc check
- [ ] Done

### T-02 `[TOKENS]` Design tokens + tema dark/light

**Rujukan:** des §3.1 (warna), §3.2 (tipografi), §3.3 (spacing), §3.4 (radius/border/elevation), §3.5 (motion), §3.6 (z-index), §3.7 (breakpoint), §3.8 (dock)

**File:** `src/styles/tokens.css`, `src/styles/base.css`, `src/styles/index.css`

**Implement:**
- Salin semua token warna, font, spacing, radius, elevation, motion, z-index, ukuran dock dari des §3 ke CSS custom properties
- Dark sebagai `:root` default; light lewat `[data-theme="light"]`
- Terapkan aturan `prefers-reduced-motion` dari des §3.5
- Helper class yang memakai nama token semantik, **tidak ada hex literal** di komponen mana pun

**Verify:** `npm run typecheck && npm run lint`. Cek visual: ganti `data-theme`, pastikan semua token berubah.

**Adjust yang mungkin:** kalau Tailwind v4 memakai `@theme`, sesuaikan sintaksnya; jangan sampai token terduplikasi.

**Doc check:** hitung jumlah token — harus cocok dengan des §3. Tidak boleh ada token di `tokens.css` yang tidak ada di design.md.

- [ ] Implement
- [ ] Verify
- [ ] Adjust
- [ ] Doc check
- [ ] Done

### T-03 `[UI]` Primitif UI dasar

**Rujukan:** des §6.1 (inventory), §13.4 (label tombol), §11.1 (focus ring)

**File:** `src/components/ui/*.tsx`

**Implement:** `Button` (5 variant × 3 size, `disabled` + `aria-disabled`), `IconButton` (**`aria-label` wajib**), `Badge` (6 warna), `Switch` (`role="switch"`), `Slider` (primitive), `Segmented` (`role="radiogroup"`), `Tabs` (`role="tablist"`, panah kiri/kanan), `Skeleton` (`aria-hidden` + `aria-busy`), `Tooltip`, `Toast` (`role="status"`/`role="alert"`), `Dialog` (focus trap + restore fokus + `Esc`), `EmptyState`

Label tombol mengikuti tabel des §13.4. Focus ring mengikuti des §11.1.

**Verify:** `npm run typecheck && npm run lint && npm run test`. Tulis test minimal: `Dialog` mengembalikan fokus ke pemicu, `IconButton` error kompiler tanpa `aria-label`.

**Adjust yang mungkin:** `Slider` butuh `role="slider"` + `aria-valuetext`; `SeekBar` (T-14) akan membangunNYA di atas primitive ini.

**Doc check:** setiap primitive ada di des §6.1 dengan state dan catatan a11y yang sama.

- [ ] Implement
- [ ] Verify
- [ ] Adjust
- [ ] Doc check
- [ ] Done

---

## Blok B — Subtitle sync engine

### T-04 `[PARSER]` Model `Cue` + parser SRT

**Rujukan:** req §6.2 (skema `Cue`), §14 (fixture), §7.3, des §8.1

**File:** `src/lib/cue.ts`, `src/lib/parse-srt.ts`, `src/lib/__tests__/parse-srt.test.ts`, `src/test/fixtures/*.srt`

**Implement:**
- Tipe `Cue` persis seperti req §6.2
- Parser: `try/catch` per cue, cue buruk di-skip dan parsing lanjut (req R-07)
- Deteksi UTF-8 BOM
- Timestamp SRT `00:00:00,000 --> 00:00:00,000`; toleransi `.` sebagai pemisah desimal
- Inline markup bold/italic/line break (FR-22) disimpan terpisah dari teks mentah
- Cue hasil parse **diurutkan** berdasarkan `startMs`

**Verify:** `npm run test` — test dengan fixture req §14: cue valid, file kosong, timestamp rusak di tengah, BOM, cue overlap, baris tanpa nomor.

**Adjust yang mungkin:** kalau fixture req §14 tidak mencakup suatu kasus, tambahkan kasusnya di test, bukan di parser.

**Doc check:** nama field `Cue` harus identik dengan req §6.2.

- [ ] Implement
- [ ] Verify
- [ ] Adjust
- [ ] Doc check
- [ ] Done

### T-05 `[PARSER]` Parser WebVTT

**Rujukan:** req §7.3, §14, FR-21, R-07

**File:** `src/lib/parse-vtt.ts`, `src/lib/__tests__/parse-vtt.test.ts`, `src/test/fixtures/*.vtt`

**Implement:**
- Header `WEBVTT`, cue `00:00:00.000`, dan opsional `HH:MM:SS.mmm` (tanpa jam)
- Cue setting setelah timestamp diabaikan
- Teks `NOTE`, `STYLE`, `REGION` di-skip
- Markup inline sama dengan SRT
- Toleran terhadap file rusak, identik dengan SRT

**Verify:** `npm run test` — kedua parser harus punya tabel kasus edge yang sama supaya perilakunya konsisten.

**Adjust yang mungkin:** kalau ada perbedaan hasil antara SRT dan VTT untuk input yang setara, itu bug — samakan.

**Doc check:** §7.3 req.

- [ ] Implement
- [ ] Verify
- [ ] Adjust
- [ ] Doc check
- [ ] Done

### T-06 `[CORE]` `cue-sync` — binary search + offset

**Rujukan:** req §8.2, AC-01 s/d AC-04, des §6.2 `SubtitleOverlay`

**File:** `src/lib/cue-sync.ts`, `src/lib/__tests__/cue-sync.test.ts`

**Implement:**
- Binary search pada array `Cue` yang sudah terurut → `findCueIndexAt(cues, positionMs)`
- Offset diterapkan: `positionMs - offsetMs`
- Fungsi murni, tanpa akses DOM
- Kasus: seek, playback rate ≠ 1, offset negatif/positif, gap antar cue, cue overlap, array kosong

**Verify:** `npm run test` — butuh 100% branch coverage untuk file ini (req §13).

**Adjust yang mungkin:** kalau overlap cue menghasilkan hasil ambigu, tetapkan aturan eksplisit dan tulis di test.

**Doc check:** fungsi ini tidak boleh menyimpan state apa pun.

- [ ] Implement
- [ ] Verify
- [ ] Adjust
- [ ] Doc check
- [ ] Done

### T-07 `[CORE]` `AudioEngine` — rAF loop

**Rujukan:** req §8.2, §8.3, AC-01, AC-02, R-01, AC-16

**File:** `src/lib/audio-engine.ts`

**Implement:**
- Satu `<audio>` element, satu `requestAnimationFrame` loop
- `currentTime` dibaca di dalam rAF, **tidak pernah** masuk React/Zustand state (req §8.3, D-03)
- Buffering (`readyState < 3`) ditangani eksplisit
- `ended` menandai `completed`
- Tidak ada `setInterval` dan **tidak ada** `timeupdate` sebagai sumber kebenaran
- Audio baru boleh `play()` setelah user gesture (req R-10)

**Verify:** `npm run typecheck && npm run test`. Manual: putar audio, ubah rate ke 2x, subtitle harus tetap sinkron (AC-02).

**Adjust yang mungkin:** kalau `play()` ditolak, tampilkan pesan sesuai req R-10 — jangan diamkan.

**Doc check:** grep untuk memastikan tidak ada `setInterval` atau `timeupdate` yang dipakai sebagai sumber waktu.

- [ ] Implement
- [ ] Verify
- [ ] Adjust
- [ ] Doc check
- [ ] Done

---

## Blok C — Persistensi & shell

### T-08 `[STORE]` localStorage wrapper + skema

**Rujukan:** req §6.3 (keys), §8.6, R-09

**File:** `src/lib/storage/local.ts`, `src/lib/storage/schema.ts`, `src/lib/storage/__tests__/*.test.ts`

**Implement:**
- Skema `LibraryItem`, `Progress`, `Bookmark` persis req §6.1 (termasuk `syncHintDismissed` yang ditambahkan untuk FR-45)
- Wrapper `get`/`set` dengan `try/catch`
- **Fallback ke in-memory** saat localStorage tidak tersedia atau penuh (req R-09) — app tidak boleh crash
- Notifikasi ke user saat storage exception terjadi

**Verify:** `npm run test` — test dengan `localStorage` yang dipalsukan throws.

**Adjust yang mungkin:** Jangan pernah menyimpan `File`/`Blob` di sini (req §8.6).

**Doc check:** daftar key harus persis req §6.3.

- [ ] Implement
- [ ] Verify
- [ ] Adjust
- [ ] Doc check
- [ ] Done

### T-09 `[IDB]` IndexedDB wrapper untuk file reference

**Rujukan:** req §6.5, §8.4, AC-06, AC-07, D-06

**File:** `src/lib/idb/index.ts`, `src/lib/idb/file-store.ts`, `src/lib/__tests__/file-store.test.ts`

**Implement:**
- Simpan `FileSystemFileHandle` untuk browser yang mendukung FSA
- Fallback: simpan `Blob` bila FSA tidak tersedia (req AC-07)
- Store terpisah dari metadata — **tidak** memindahkan seluruh database aplikasi ke IndexedDB
- Buka DB secara lazy, tangani `onupgradeneeded`

**Verify:** `npm run test` dengan `fake-indexeddb`. Manual: reload, file masih bisa diputar (AC-06).

**Adjust yang mungkin:** di Firefox/Safari, FSA tidak ada — pastikan jalur `Blob` benar-benar dipakai, bukan hanya di-kode.

**Doc check:** req §6.5.

- [ ] Implement
- [ ] Verify
- [ ] Adjust
- [ ] Doc check
- [ ] Done

### T-10 `[SHELL]` AppShell + AppBar + NavTabs

**Rujukan:** des §4.1 (anatomi), §11.1, §11.2, §2.1 (sitemap), des §3.6 (z-index)

**File:** `src/components/layout/AppShell.tsx`, `AppBar.tsx`, `NavTabs.tsx`, `src/routes/*.tsx`, `src/hooks/useRoute.ts`

**Implement:**
- Landmark `<main>`, `<header role="banner">`, `<nav>`
- Skip link `<a href="#main">`
- 3 rute: `/`, `/play/:itemId`, `/settings`
- `aria-current="page"` pada tab aktif
- `AppBar` berubah `scrolled` → `z-index: var(--z-sticky)`
- Router minimal (tidak perlu library berat)

**Verify:** `npm run typecheck && npm run lint`. Manual: pindah-pindah tab, cek landmark & `aria-current`.

**Adjust yang mungkin:** kalau `useRoute` manual jadiromat, tambahkan `react-router-dom` — tapi catat di `package.json` alasannya.

**Doc check:** urutan fokus harus mengikuti des §11.2.

- [ ] Implement
- [ ] Verify
- [ ] Adjust
- [ ] Doc check
- [ ] Done

### T-11 `[LIBRARY]` LibraryPage + grid + kartu

**Rujukan:** des §5.1, §5.2, §7.1, §13.1–13.3 (copy)

**File:** `src/components/library/LibraryPage.tsx`, `LibraryGrid.tsx`, `LibraryCard.tsx`, `src/components/ui/EmptyState.tsx`

**Implement:**
- Grid responsif 1/2/3/4 kolom sesuai breakpoint (des §12.1)
- 7 kondisi kartu dari des §5.1 (termasuk `File hilang` dan `Perlu izin`)
- 4 kondisi halaman: loading (skeleton), ready, empty, error — des §7.1
- Thumbnail `aspect-ratio: 1` supaya **tidak ada layout shift** (AC-20)
- `aria-label` ringkas per kartu, persis des §6.2
- Copy(empty state) mengikuti des §13.3

**Verify:** `npm run test` — test semua kondisi kartu. Manual: 200 item, scroll mulus (AC-20).

**Adjust yang mungkin:** error **tidak boleh** mengganti konten yang sudah ada (D-14).

**Doc check:** des §5.1 dan §7.1.

- [ ] Implement
- [ ] Verify
- [ ] Adjust
- [ ] Doc check
- [ ] Done

---

## Blok D — Import & relink

### T-12 `[IMPORT]` ImportDialog — FSA + fallback

**Rujukan:** req §4.1, §7.2, AC-07, AC-15, des §5.5

**File:** `src/components/library/ImportDialog.tsx`, `src/lib/import.ts`

**Implement:**
- `showOpenFilePicker()` bila tersedia; fallback `<input type="file">` (req §7.2)
- Audio wajib, subtitle opsional
- Judul default = nama file tanpa ekstensi, dapat diedit
- Ringkasan langsung tampil: nama, ukuran, durasi, jumlah cue
- Subtitle yang gagal parse **tetap boleh** ditambahkan, dengan peringatan (des §5.5)
- Tombol `Tambah` disabled sampai audio terisi
- **Tidak ada** permintaan izin penyimpanan (req §8.4)

**Verify:** `npm run test` + manual di browser tanpa FSA.

**Adjust yang mungkin:** `showOpenFilePicker` butuh user gesture — kalau dipanggil dari `useEffect`, browser akan menolaknya.

**Doc check:** des §5.5 "Kunci perilaku".

- [ ] Implement
- [ ] Verify
- [ ] Adjust
- [ ] Doc check
- [ ] Done

### T-13 `[RELINK]` Fingerprinting + RelinkDialog

**Rujukan:** req §6.4, §4.1, AC-11, des §5.5 (Relink), D-11

**File:** `src/lib/fingerprint.ts`, `src/components/library/RelinkDialog.tsx`, `src/components/library/MissingFilesBanner.tsx`

**Implement:**
- Fingerprint `name + size + lastModified` sesuai req §6.4
- Item yang file-nya hilang ditandai `missing_audio`
- Banner `role="alert"` muncul kalau jumlah file hilang > 0
- Dialog selalu menampilkan **apa yang tidak hilang**: bookmark, progress, offset (D-11)
- Aksi `Lewati` dan `Pasang ulang`

**Verify:** `npm run test` untuk logika fingerprint. Manual: hapus file dari disk, reload, cek banner + dialog.

**Adjust yang mungkin:** kalau user memilih file berbeda yang tidak cocok fingerprint, tanyakan konfirmasi eksplisit.

**Doc check:** AC-11.

- [ ] Implement
- [ ] Verify
- [ ] Adjust
- [ ] Doc check
- [ ] Done

---

## Blok E — Player

### T-14 `[PLAYER]` TransportControls + SeekBar

**Rujukan:** des §4.2, §6.2 (`SeekBar`), req §8.3, AC-12

**File:** `src/components/player/TransportControls.tsx`, `SeekBar.tsx`, `RateSelector.tsx`, `VolumeControl.tsx`

**Implement:**
- `SeekBar` dengan `role="slider"`, `aria-valuemin/max/now`, dan `aria-valuetext` **verbal** ("0 menit 42 detik dari 45 menit 13 detik")
- Lapisan: track → buffered → fill → knob
- Klik seek; drag kontinu **throttled ke 1 frame**; knob hilang saat tidak hover/drag
- Posisi **tidak** lewat React state (req §8.3) — pointer menulis langsung ke DOM, sama seperti overlay
- Tidak ada transisi pada `.fill` (D-03)
- `RateSelector` 6 opsi, `role="radiogroup"`

**Verify:** `npm run typecheck && npm run test`. Manual: drag tidak boleh "tertinggal dari jarinya".

**Adjust yang mungkin:** `aria-valuetext` harus di-update tanpa memicu render ulang React yang berat.

**Doc check:** des §6.2 `SeekBar` Persilaku.

- [ ] Implement
- [ ] Verify
- [ ] Adjust
- [ ] Doc check
- [ ] Done

### T-15 `[PLAYER]` SubtitleStage + SubtitleOverlay

**Rujukan:** des §5.3, §8.1 (S-01 s/d S-10), §8.2, §6.2, §9.3 req, AC-13, AC-19, D-13

**File:** `src/components/player/SubtitleStage.tsx`, `SubtitleOverlay.tsx`

**Implement:**
- Tulis teks cue **imperatif via `textContent`**, bukan lewat state (req §8.3)
- Semua style dari token `design.md` §3 — tanpa hex literal
- Maksimal 2 baris + ellipsis (S-02), `text-wrap: balance` (S-08)
- `min-height: 72px` saat idle supaya stage tidak melompat (D-13)
- Lebar 90% stage, `pointer-events: none` kecuali click-to-reveal
- `aria-live="off"` + `aria-hidden="true"` (AC-19)
- **Tidak boleh** ada `backdrop-filter` (D-07)
- Tombol "Bacakan subtitle" dengan `aria-live="polite"`
- `prefers-reduced-motion` tidak boleh mematikan subtitle (req §3.5)

**Verify:** `npm run test` + manual: cue terpanjang, artwork paling terang, toggle subtitle saat audio tetap jalan (AC-13).

**Adjust yang mungkin:** kalau teks terpotong jadi tidak terbaca, pakai click-to-reveal — bukan auto-expand (des §8.4).

**Doc check:** req §9.3 dan des §8.1 harus cocok baris per baris.

- [ ] Implement
- [ ] Verify
- [ ] Adjust
- [ ] Doc check
- [ ] Done

### T-16 `[SYNC]` Offset real-time

**Rujukan:** req FR-24 s/d FR-27, AC-04, AC-05, §8.3, des §9

**File:** `src/hooks/useOffset.ts`, `src/lib/offset.ts`

**Implement:**
- Perubahan offset berlaku **di frame yang sama** dengan perubahan readout (AC-04)
- `clamp(-5000, 5000)`
- Offset per item, default dari global setting
- Reset ke 0

**Verify:** `npm run test` + manual: audio diputar, tekan `+100` berulang, teks harus bergeser seketika.

**Adjust yang mungkin:** jangan pernah menyentuh React state dari dalam rAF loop untuk ini juga.

**Doc check:** AC-04, AC-05.

- [ ] Implement
- [ ] Verify
- [ ] Adjust
- [ ] Doc check
- [ ] Done

### T-17 `[PLAYER]` CueList + pencarian cue

**Rujukan:** req FR-28, FR-29, des §8.3, D-16

**File:** `src/components/player/CueList.tsx`, `CueListItem.tsx`

**Implement:**
- `role="listbox"` + `aria-activedescendant`; panah untuk navigasi
- Klik cue → lompat ke `cue.startMs` **dengan offset dikoreksi** (des §8.3)
- Kolom timestamp lebar tetap 56px, `tabular-nums`
- Cue terlewati tampil `--text-tertiary` (D-15)
- Pencarian cue dengan `<mark>` untuk hasil cocok
- Auto-scroll **hanya** saat cue aktif keluar viewport, berhenti begitu user scroll manual (D-16), flag di-reset oleh `scrollend` atau timeout 3 detik
- Panel ini **tidak** berubah saat offset digeser (des §9.6)

**Verify:** `npm run test` + manual: scroll manual benar-benar menghentikan auto-scroll.

**Adjust yang mungkin:** `aria-activedescendant` tidak boleh memicu auto-scroll (AC-19 terkait).

**Doc check:** des §8.3.

- [ ] Implement
- [ ] Verify
- [ ] Adjust
- [ ] Doc check
- [ ] Done

---

## Blok F — Offset panel, bookmark, wizard

### T-18 `[OFFSET]` OffsetPanel + readout + mini timeline

**Rujukan:** des §9.1 s/d §9.5, D-17, FR-24 s/d FR-27, AC-04

**File:** `src/components/player/OffsetPanel.tsx`, `OffsetReadout.tsx`, `MiniTimeline.tsx`

**Implement:**
- Readout selalu 3 desimal, `+` eksplisit untuk positif, `U+2212` untuk negatif — **bukan** `-` ASCII
- **Dibulatkan ke bawah** (floor), bukan ke terdekat (D-17)
- `role="status"` + `aria-live="polite"`; warna `--warning` bila `abs > 2000ms`
- Tombol `[-500] [-100] [0] [+100] [+500]`; `0` disabled saat sudah nol; tahan = repeat tiap 120ms
- `shift+klik` pada angka → `<input type="number">`
- Checkbox "Terapkan ke semua item", **default tidak aktif** (FR-26), dengan konfirmasi
- Mini timeline jendela `±2000ms`, `aria-hidden="true"`, re-render hanya saat offset atau cue berubah
- Blok cue bergeser **ke kanan** saat offset negatif

**Verify:** `npm run test` (test floor) + manual: tombol-tahan, `shift+klik`, offset ±5 detik.

**Adjust yang mungkin:** mini timeline yang re-render tiap frame akan melumpuhkan — pastikan tidak.

**Doc check:** D-17, des §9.2.

- [ ] Implement
- [ ] Verify
- [ ] Adjust
- [ ] Doc check
- [ ] Done

### T-19 `[BOOKMARK]` Bookmark CRUD

**Rujukan:** req FR-31, FR-32, AC-10, des §5.3, §11.5

**File:** `src/components/player/BookmarkPanel.tsx`, `BookmarkItem.tsx`

**Implement:**
- Tambah di waktu tertentu, label default `mm:ss`, ubah label, hapus
- Lompat dari daftar bookmark
- Panel punya state `empty` dan `list` (des §6.1)

**Verify:** `npm run test` + manual: label kosong tidak boleh membuat bookmark yang tidak jelas.

**Adjust yang mungkin:** label bookmark adalah `<input>` — ini yang memicu AC-18, jadi pastikan T-26 proudly mengabaikannya.

**Doc check:** AC-10.

- [ ] Implement
- [ ] Verify
- [ ] Adjust
- [ ] Doc check
- [ ] Done

### T-20 `[PROGRESS]` Autosave progress + ResumePrompt

**Rujukan:** req FR-33, FR-34, AC-09, des §5.5

**File:** `src/hooks/useProgress.ts`, `src/components/player/ResumePrompt.tsx`

**Implement:**
- Autosave posisi playback per item
- `completed` bila `>= 95%` durasi atau event `ended`
- Dialog "Lanjut dari mm:ss?" **muncul sekali**, dengan aksi "Mulai dari 0:00" dan "lewati"
- **Tidak pernah** muncul otomatis tanpa user action (des §5.5)

**Verify:** `npm run test` + manual: putar 10 detik, reload, cek posisi.

**Adjust yang mungkin:** throttle autosave — jangan tulis ke localStorage tiap frame.

**Doc check:** AC-09.

- [ ] Implement
- [ ] Verify
- [ ] Adjust
- [ ] Doc check
- [ ] Done

### T-21 `[WIZARD]` Guided Sync Wizard

**Rujukan:** req FR-45, AC-17, des §10 (D-18), §5.5

**File:** `src/components/player/SyncWizard.tsx`, `src/hooks/useSyncWizardTrigger.ts`

**Implement:**
- Dipicu saat subtitle pertama dilampirkan ke item, **sekali** (`syncHintDismissed`)
- 3 langkah: pendahuluan → dengarkan 15 detik pertama → sesuaikan offset
- Langkah 2 memakai **dua tombol** ("Terlalu cepat" / "Terlalu lambat"), bukan slider (D-18)
- Langkah 3 re-use `OffsetPanel` dari T-18
- `Esc` = batal, **tanpa** perubahan tersimpan
- **Tidak boleh** auto-play sebelum user gesture
- Selesai atau batal → tulis `subtitleOffsetMs` **dan** `syncHintDismissed: true`
- Total durasi 30–45 detik (AC-17)

**Verify:** `npm run test` + manual: jalankan dari `useState` kosong, cek `syncHintDismissed` ter-set di kedua jalur.

**Adjust yang mungkin:** kalau wizard opened dari `useEffect`, autoplay akan ditolak — pancing lewat klik "Mulai".

**Doc check:** req §4.3 FR-45 dan des §10.

- [ ] Implement
- [ ] Verify
- [ ] Adjust
- [ ] Doc check
- [ ] Done

---

## Blok G — Data, settings, PWA, keyboard

### T-22 `[EXPORT]` Export / import JSON

**Rujukan:** req FR-08, AC-14, des §5.2 (jalur pemulihan)

**File:** `src/lib/export-import.ts`, `src/components/settings/ExportImportCard.tsx`, `src/components/ui/EmptyState.tsx` (jalur "Impor dari file JSON")

**Implement:**
- Export seluruh metadata sebagai JSON
- Import memvalidasi skema, menampilkan ringkasan sebelum menimpa
- Gagal import → pesan jelas, data lama tidak boleh rusak

**Verify:** `npm run test` + manual: export, hapus data, import, hasilnya identik.

**Adjust yang mungkin:** versi skema wajib ada di dalam file export supaya import versi lama bisa ditolak dengan pesan jelas.

**Doc check:** AC-14.

- [ ] Implement
- [ ] Verify
- [ ] Adjust
- [ ] Doc check
- [ ] Done

### T-23 `[SETTINGS]` SettingsPage

**Rujukan:** des §5.6, D-12, req §4.5

**File:** `src/components/settings/SettingsPage.tsx`, `StorageUsage.tsx`, `ShortcutReference.tsx`

**Implement:**
- Preferensi: tema, ukuran lompat, pertahankan nada (pitch), tampilkan subtitle, offset subtitle global
- `StorageUsage` dengan `role="meter"`, kondisi `unknown` / `known` / `critical`
- Permintaan `navigator.storage.persist()`
- **Status kapabilitas browser** — `showOpenFilePicker` tersedia atau tidak (D-12), **bukan** dump teknis
- `ShortcutReference` memakai `<table>`, bukan daftar `div`
- Tata letak persis des §5.6

**Verify:** `npm run typecheck && npm run test` + manual: light mode di halaman ini juga (bukan hanya Library).

**Adjust yang mungkin:** `navigator.storage.estimate()` tidak ada di semua browser — jangan crash.

**Doc check:** des §5.6.

- [ ] Implement
- [ ] Verify
- [ ] Adjust
- [ ] Doc check
- [ ] Done

### T-24 `[PWA]` Manifest + service worker

**Rujukan:** req FR-36 s/d FR-38, §8.7, AC-08, NFR-07, D-06

**File:** `vite.config.ts`, `public/manifest.webmanifest`, `public/icons/*`, `src/main.tsx` (registrasi SW)

**Implement:**
- Manifest: nama, `start_url`, `display: standalone`, ikon 192 & 512 (termasuk maskable)
- `vite-plugin-pwa` dengan Workbox: precache app shell
- **Nol request eksternal** (D-06, NFR-07) — tidak ada CDN, tidak ada font eksternal, tidak ada analytics
- `updateViaCache: 'none'`

**Verify:** `npm run build`, lalu `npm run preview` → DevTools → Application → Service worker aktif, Network →nol request ke domain luar.

**Adjust yang mungkin:** kalau ada aset yang gagal di-cache, tambahkan ke `globPatterns`.

**Doc check:** AC-08, D-06.

- [ ] Implement
- [ ] Verify
- [ ] Adjust
- [ ] Doc check
- [ ] Done

### T-25 `[PWA]` Toast update + install prompt

**Rublik:** req FR-40, AC-16, D-06, des §5.5 (tempat uninstall), des §7.3 (tabel toast)

**File:** `src/components/ui/Toast.tsx`, `src/components/settings/InstallButton.tsx`, `src/hooks/useServiceWorkerUpdate.ts`

**Implement:**
- `workbox-window` mendeteksi update → toast "Pembaruan tersedia" dengan aksi "Muat ulang"
- **Playback tidak boleh terputus**; reload hanya atas klik (AC-16)
- `InstallButton` dengan state `hidden` / `available` / `installed`
- Toast: `success` 4 detik, `info` 8 detik, `warning` 6 detik, `error` **persist**, `undo` 8 detik (des §7.3)

**Verify:** manual: build dua versi, cek toast muncul tanpa playback terputus (AC-16), lalu reload atas klik user.

**Adjust yang mungkin:** `beforeinstallprompt` hanya sekali per pengguna — cache event-nya.

**Doc check:** des §7.3.

- [ ] Implement
- [ ] Verify
- [ ] Adjust
- [ ] Done
- [ ] Doc check

### T-26 `[KEYS]` Pintasan keyboard

**Rujukan:** req §5.1, AC-12, AC-18, des §11.5, `?`

**File:** `src/hooks/useKeyboardShortcuts.ts`

**Implement:**
- Seluruh pintasan req §5.1 berlaku
- Tambah `?` (buka referensi pintasan) dan `Esc` (tutup dialog/wizard) dari des §11.5
- **Semua single-key shortcut nonaktif saat user mengetik** di `<input>`, `<textarea>`, atau `contenteditable` (AC-18) — ini termasuk label bookmark, pencarian cue, dan input offset
- `focus ring` tidak di-animate (des §7.2)

**Verify:** `npm run test` — ketik `b` di label bookmark, lalu `?`, lalu `c`. Tidak boleh ada aksi yang terjadi (AC-18).

**Adjust yang mungkin:** `Escape` tetap boleh bekerja walau di input.

**Doc check:** req §5.1 dan des §11.5.

- [ ] Implement
- [ ] Verify
- [ ] Adjust
- [ ] Doc check
- [ ] Done

---

## Blok H — Polish & verifikasi akhir

### T-27 `[DOCK]` Dock responsif

**Rujukan:** des §4.2, §4.3, §3.8, §12.2, AC-21, D-09

**File:** `src/components/player/Dock.tsx`, `DockMeta.tsx`, `TransportControls.tsx` (re-use)

**Implement:**
- Desktop `lg` (≥1024px): 88px, dua baris, seekbar full-width
- Mobile: 64px, **tanpa** seekbar, ketuk area → Player Sheet
- Dock **selalu tampil di semua halaman** (req §9.1)
- Kontrol di dock adalah **alias dari kontrol yang sama** dengan Player — bukan instance baru
- Transisi 64px → 88px **tidak boleh** mereset posisi, rate, atau volume (AC-21)
- Cue preview di dock (D-09): 1 baris, `ellipsis`, `pointer-events: none`, disembunyi bila `subtitleVisible === false`, baca dari store yang sama

**Verify:** manual: putar audio di mobile, resize ke desktop, cek posisi/rate/volume tidak berubah (AC-21).

**Adjust yang mungkin:** kalau dock dirender ulang saat breakpoint berubah, state audio ikut hilang — jadikan dock tetap satu instance.

**Doc check:** des §4.2, §4.3, §12.2.

- [ ] Implement
- [ ] Verify
- [ ] Adjust
- [ ] Doc check
- [ ] Done

### T-28 `[A11Y]` Audit aksesibilitas

**Rujukan:** des §11.1 s/d §11.5, req NFR-12, NFR-13, AC-18, AC-19, AC-20

**File:** tersebar di seluruh komponen yang bermasalah

**Implement:**
- Jalankan alur utama **hanya dengan keyboard**
- Focus trap di semua dialog; fokus kembali ke pemicu (req §13)
- Semua `IconButton` punya `aria-label`
- Target sentuh minimal 44px di mobile
- 200% zoom browser tidak merusak layout
- Audit Lighthouse a11y **≥ 90**

**Verify:** Lighthouse a11y, plus navigasi keyboard manual seluruh alur.

**Adjust yang mungkin:** perbaiki setiap temuan satu per satu, jangan menumpuk.

**Doc check:** des §15.3.

- [ ] Implement
- [ ] Verify
- [ ] Adjust
- [ ] Doc check
- [ ] Done

### T-29 `[THEME]` Audit kontras & motion

**Rujukan:** des §11.4, §8.2, §3.5, D-15

**File:** `src/styles/*`, komponen yang bermasalah

**Implement:**
- Verifikasi semua kombinasi des §11.4 di dark **dan** light
- `--text-tertiary` **tidak boleh** dipakai untuk informasi yang harus dibaca (D-15)
- Kontras subtitle ≥ 4.5:1 di atas artwork paling terang
- Semua animasi playback memakai `--duration-instant` (D-03)
- Z-index hanya memakai nilai des §3.6
- `prefers-reduced-motion` mematikan transisi dekoratif saja

**Verify:** alat kontras untuk setiap pasangan token; checklist des §15.1 dan §15.2.

**Adjust yang mungkin:** kalau sebuah rasio gagal, ubah **token** — jangan menambal per komponen.

**Doc check:** des §11.4.

- [ ] Implement
- [ ] Verify
- [ ] Adjust
- [ ] Doc check
- [ ] Done

### T-30 `[E2E]` Playwright end-to-end

**Rujukan:** req §13, seluruh AC

**File:** `playwright.config.ts`, `src/e2e/*.spec.ts`

**Implement:**
- `import` → item muncul di library
- `play` → audio & subtitle sinkron
- `bookmark` → tersimpan
- `reload` → progress & library bertahan
- `relink` → file hilang tertangani
- `offline` → app tetap jalan
- Assertion untuk AC yang bisa diuji otomatis

**Verify:** `npx playwright test` hijau.

**Adjust yang mungkin:** service worker bikin test flaky — matikan SW untuk test yang tidak perlu, dan buat test khusus untuknya.

**Doc check:** req §13.

- [ ] Implement
- [ ] Verify
- [ ] Adjust
- [ ] Doc check
- [ ] Done

---

## Blok I — Penutupan

### T-31 `[SHIP]` Checklist pre-ship + Definition of Done

**Rujukan:** req §13 (DoD), des §15 (checklist pre-ship), **seluruh** AC

**Implement:** tidak ada kode baru — ini task verifikasi.

**Verify — DoD (req §13):**
- [ ] Semua AC hijau
- [ ] `npm run typecheck` tanpa error
- [ ] `npm run lint` tanpa error
- [ ] Unit test Vitest untuk parser SRT, WebVTT, `cue-sync` — offset, seek, playback rate
- [ ] E2E Playwright: import, play, subtitle sinkron, bookmark, reload
- [ ] Tidak ada request network eksternal (AC-08)
- [ ] Komentar kode menjelaskan **mengapa**, bukan **apa**
- [ ] Tidak ada `console.log` / `debugger` tertinggal

**Verify — Checklist desain (des §15):**
- [ ] §15.1 Design — semua
- [ ] §15.2 Subtitle UX — semua
- [ ] §15.3 Aksesibilitas — semua
- [ ] §15.4 Responsif — semua
- [ ] §15.5 Traceability — semua FR M punya komponen; tidak ada komponen yang tidak menjawab FR

**Adjust yang mungkin:** kalau ada butir yang gagal, **buat task baru** untuk memperbaikinya — jangan centang manual.

**Doc check:** `requirement.md` dan `design.md` tetap konsisten satu sama lain.

- [ ] Implement
- [ ] Verify
- [ ] Adjust
- [ ] Doc check
- [ ] Done

---

## Catatan Konsistensi Antar Dokumen

Hal-hal berikut **sudah diselaraskan** dan tidak boleh diubah sepihak di salah satu dokumen:

| Hal | Sumber | Status |
|---|---|---|
| Layout dock + panel subtitle besar | req §9.1–9.3, des §4.2, §5.3 | selaras |
| FR-45 + `syncHintDismissed` | req §4.3, §6.1, AC-17; des §10 | selaras |
| AC-17 s/d AC-21 | req §10, des §14.3 | selaras |
| Nama komponen | req §9, des §6.1 | 44/44 terpetakan |
| Nilai token subtitle | req §9.3, des §8.1 | selaras |
| Z-index | des §3.6 | dipakai des §4.1, §6.1 |
| Breakpoint dock 64px → 88px | des §3.8, §12.2, AC-21 | selaras |
| Tabel kontras | des §11.4, §8.2 | internal design |

Kalau ada konflik baru yang ditemukan saat mengerjakan task, tambahkan task `[DOC]` dan perbaiki **dua** dokumen sekaligus. Jangan hanya menambal di satu tempat.


**Akhir dokumen.**
