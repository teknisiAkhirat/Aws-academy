# Design — Audio + Document Reader

## Architecture
Static vanilla HTML/CSS/JavaScript PWA. Avoid a build step and external dependencies so the app can be hosted from any static host and the app shell can be cached by a service worker.

## Main layout
1. Header and offline/readiness status.
2. Audio file picker and file name.
3. Player card: play/pause, seek slider, current time / duration.
4. Document file picker.
5. Document viewer with format-specific rendering.

## Key decisions
- Use the native HTMLAudioElement for codec support and playback controls.
- Use a native range input for seek; range input's input event seeks immediately. Ignore seeks until finite duration is available.
- Read files with File.text(); the selected File object is kept in memory only.
- Parse SRT conservatively and show a warning if some blocks are malformed.
- Render Markdown through a small safe inline/block renderer; all text is escaped before formatting. No raw HTML or external parser dependency.
- Service worker caches only the static app shell, not selected local media/documents.
- Avoid persistent file handles and IndexedDB for this MVP; browser file access permission persistence varies.
- No subtitle/audio synchronization or cue-to-seek behavior.

## Risks
- Codec support depends on browser and file encoding.
- Service workers generally require HTTPS or localhost.
- Local file selection must be repeated after a reload.
- Browser or operating-system power management may suspend playback in background.
