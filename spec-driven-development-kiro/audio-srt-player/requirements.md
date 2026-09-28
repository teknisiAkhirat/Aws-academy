---
project: audio-srt-player
document: requirements
status: draft
---

# Requirements — Audio Subtitle Player (ASP)

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