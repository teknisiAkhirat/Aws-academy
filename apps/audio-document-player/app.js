(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const audioInput = $('audio-file');
  const audio = $('audio');
  const playButton = $('play-toggle');
  const playSymbol = $('play-symbol');
  const seek = $('seek');
  const currentTime = $('current-time');
  const duration = $('duration');
  const audioName = $('audio-name');
  const audioMessage = $('audio-message');
  const documentInput = $('document-file');
  const documentName = $('document-name');
  const documentFormat = $('document-format');
  const documentContent = $('document-content');
  const documentPanel = $('document-panel');
  const fullscreenToggle = $('reader-fullscreen-toggle');
  const documentMessage = $('document-message');
  const networkStatus = $('network-status');
  let audioUrl = null;
  let toastTimer = null;

  function isReaderFullscreen() {
    return document.fullscreenElement === documentPanel || documentPanel.classList.contains('reader-fullscreen-fallback');
  }

  function syncFullscreenButton() {
    const active = isReaderFullscreen();
    fullscreenToggle.setAttribute('aria-pressed', String(active));
    fullscreenToggle.title = active ? 'Keluar dari layar penuh' : 'Buka pembaca layar penuh';
    fullscreenToggle.querySelector('.fullscreen-label').textContent = active ? 'Keluar layar penuh' : 'Layar penuh';
    fullscreenToggle.querySelector('[aria-hidden="true"]').textContent = active ? '⤢' : '⛶';
  }

  fullscreenToggle.addEventListener('click', async () => {
    if (documentPanel.classList.contains('reader-fullscreen-fallback')) {
      documentPanel.classList.remove('reader-fullscreen-fallback');
      document.body.classList.remove('reader-fallback-active');
      syncFullscreenButton();
      return;
    }
    if (document.fullscreenElement === documentPanel) {
      try { await document.exitFullscreen(); } catch { /* CSS fallback below keeps an exit control available. */ }
      syncFullscreenButton();
      return;
    }
    if (documentPanel.requestFullscreen) {
      try {
        await documentPanel.requestFullscreen();
        syncFullscreenButton();
        return;
      } catch { /* Some mobile browsers do not permit element fullscreen. */ }
    }
    documentPanel.classList.add('reader-fullscreen-fallback');
    document.body.classList.add('reader-fallback-active');
    syncFullscreenButton();
  });

  document.addEventListener('fullscreenchange', syncFullscreenButton);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && documentPanel.classList.contains('reader-fullscreen-fallback')) {
      documentPanel.classList.remove('reader-fullscreen-fallback');
      document.body.classList.remove('reader-fallback-active');
      syncFullscreenButton();
    }
  });

  function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return '00:00';
    const total = Math.floor(seconds);
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    return h ? [h, String(m).padStart(2, '0'), String(s).padStart(2, '0')].join(':') : [String(m).padStart(2, '0'), String(s).padStart(2, '0')].join(':');
  }

  function toast(message) {
    const node = $('toast');
    node.textContent = message;
    node.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => node.classList.remove('show'), 2800);
  }

  function updateTimeline() {
    currentTime.textContent = formatTime(audio.currentTime);
    duration.textContent = formatTime(audio.duration);
    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      seek.value = String(Math.round((audio.currentTime / audio.duration) * 1000));
      seek.disabled = false;
    } else {
      seek.value = '0';
      seek.disabled = true;
    }
  }

  audioInput.addEventListener('change', () => {
    const file = audioInput.files && audioInput.files[0];
    if (!file) return;
    if (!file.type.startsWith('audio/') && !/\.(mp3|m4a|aac|ogg|oga|opus|wav|flac|weba|webm|mp4)$/i.test(file.name)) {
      toast('Berkas ini tidak dikenali sebagai audio.');
      audioInput.value = '';
      return;
    }
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    audio.pause();
    audioUrl = URL.createObjectURL(file);
    audio.src = audioUrl;
    audio.load();
    audioName.textContent = file.name;
    audioMessage.textContent = 'Memuat metadata audio…';
    playButton.disabled = true;
    seek.disabled = true;
    currentTime.textContent = '00:00';
    duration.textContent = '00:00';
  });

  audio.addEventListener('loadedmetadata', () => {
    updateTimeline();
    playButton.disabled = false;
    audioMessage.textContent = 'Siap diputar. Ketuk garis posisi untuk berpindah ke waktu yang kamu inginkan.';
  });
  audio.addEventListener('timeupdate', updateTimeline);
  audio.addEventListener('durationchange', updateTimeline);
  audio.addEventListener('play', () => {
    playSymbol.textContent = 'Ⅱ';
    playButton.setAttribute('aria-label', 'Jeda audio');
  });
  audio.addEventListener('pause', () => {
    playSymbol.textContent = '▶';
    playButton.setAttribute('aria-label', 'Putar audio');
  });
  audio.addEventListener('ended', updateTimeline);
  audio.addEventListener('error', () => {
    if (!audio.src) return;
    playButton.disabled = true;
    seek.disabled = true;
    audioMessage.textContent = 'Audio tidak dapat dibaca browser. Coba format lain yang didukung perangkat.';
    toast('Audio gagal dibuka atau codec tidak didukung.');
  });

  playButton.addEventListener('click', async () => {
    if (!audio.src) return;
    if (audio.paused) {
      try { await audio.play(); }
      catch { audioMessage.textContent = 'Pemutaran ditolak browser. Coba tekan Putar sekali lagi.'; }
    } else audio.pause();
  });

  seek.addEventListener('input', () => {
    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      audio.currentTime = (Number(seek.value) / 1000) * audio.duration;
      updateTimeline();
    }
  });

  function escapeHtml(value) {
    return value.replace(/[&<>"']/g, (ch) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  }

  function parseSrt(text) {
    const normalized = text.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n').trim();
    if (!normalized) return { cues: [], malformed: 0 };
    const blocks = normalized.split(/\n\s*\n/);
    const cues = [];
    let malformed = 0;
    const timePattern = /(?:(\d{1,})\s*:\s*)?(\d{2}):(\d{2})[,.](\d{1,3})\s*-->\s*(?:(\d{1,})\s*:\s*)?(\d{2}):(\d{2})[,.](\d{1,3})/;
    for (const block of blocks) {
      const lines = block.split('\n');
      const timeIndex = lines.findIndex((line) => timePattern.test(line));
      if (timeIndex < 0) { malformed++; continue; }
      const match = lines[timeIndex].match(timePattern);
      const toSeconds = (h, m, s, ms) => Number(h || 0) * 3600 + Number(m) * 60 + Number(s) + Number(String(ms).padEnd(3, '0').slice(0, 3)) / 1000;
      const start = toSeconds(match[1], match[2], match[3], match[4]);
      const end = toSeconds(match[5], match[6], match[7], match[8]);
      const body = lines.slice(timeIndex + 1).join('\n').trim();
      if (!body || end < start) { malformed++; continue; }
      cues.push({ start, end, timestamp: lines[timeIndex].trim(), text: body });
    }
    return { cues, malformed };
  }

  function renderSrt(text) {
    const parsed = parseSrt(text);
    let html = '';
    if (parsed.malformed) html += '<div class="srt-warning">' + parsed.malformed + ' blok tidak terbaca dan dilewati. Periksa format timestamp SRT.</div>';
    if (!parsed.cues.length) {
      html += '<p class="raw-text">' + escapeHtml(text) + '</p>';
      if (!parsed.malformed) html += '<p>(Tidak ada cue subtitle yang dikenali.)</p>';
      return html;
    }
    html += parsed.cues.map((cue) => '<article class="srt-cue"><span class="srt-time">' + escapeHtml(cue.timestamp) + '</span><div class="srt-text">' + escapeHtml(cue.text) + '</div></article>').join('');
    return html;
  }

  documentInput.addEventListener('change', async () => {
    const file = documentInput.files && documentInput.files[0];
    if (!file) return;
    const ext = file.name.split('.').pop().toLowerCase();
    if (!['md', 'markdown', 'srt', 'txt'].includes(ext)) {
      toast('Format belum didukung. Pilih MD, SRT, atau TXT.');
      documentInput.value = '';
      return;
    }
    documentName.textContent = file.name;
    documentFormat.textContent = ext === 'markdown' ? 'MD' : ext.toUpperCase();
    documentContent.innerHTML = '<p class="helper">Membaca dokumen…</p>';
    documentMessage.textContent = 'Dokumen dibaca secara lokal di perangkat.';
    try {
      const text = await file.text();
      if (ext === 'srt') documentContent.innerHTML = renderSrt(text);
      else if (ext === 'md' || ext === 'markdown') documentContent.innerHTML = MarkdownRenderer.renderMarkdown(text);
      else documentContent.innerHTML = '<div class="raw-text">' + escapeHtml(text) + '</div>';
      if (!text.length) documentMessage.textContent = 'Berkas kosong.';
      else if (ext === 'srt') {
        const result = parseSrt(text);
        documentMessage.textContent = result.cues.length + ' cue terbaca' + (result.malformed ? ' · ' + result.malformed + ' blok dilewati' : '') + '.';
      } else documentMessage.textContent = 'Selesai · tidak ada data yang diunggah.';
    } catch {
      documentContent.textContent = 'Dokumen gagal dibaca. Coba pilih berkas lain.';
      documentMessage.textContent = 'Gagal membaca dokumen.';
    }
  });

  function updateNetworkStatus() {
    const online = navigator.onLine;
    networkStatus.textContent = online ? 'Online' : 'Offline';
    networkStatus.classList.toggle('online', online);
    networkStatus.classList.toggle('offline', !online);
  }
  window.addEventListener('online', updateNetworkStatus);
  window.addEventListener('offline', updateNetworkStatus);
  updateNetworkStatus();

  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {
      networkStatus.textContent = navigator.onLine ? 'Online · cache belum aktif' : 'Offline';
    }));
  }
  window.addEventListener('beforeunload', () => { if (audioUrl) URL.revokeObjectURL(audioUrl); });
})();
