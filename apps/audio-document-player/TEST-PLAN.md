# Manual Acceptance Test Plan

Status: planned; not yet executed in a real browser/device.

## Audio
- [ ] Select supported MP3 or WAV file; verify file name and duration.
- [ ] Play, pause, resume, and replay after reaching end.
- [ ] Tap approximately 25%, 50%, and 90% on seek slider; verify current time changes immediately to the expected position (±1 second).
- [ ] Use keyboard arrows on focused seek slider.
- [ ] Select unsupported/corrupt file; verify non-fatal error.
- [ ] Select another audio file; verify old object URL is released and new file loads.

## Document
- [ ] Open TXT containing blank lines and Indonesian characters; verify line breaks.
- [ ] Open Markdown containing heading, bold, italic, list, quote, code, and literal HTML; verify supported formatting and that HTML is not executed.
- [ ] Open SRT with multiple valid cues, millisecond commas, and hour timestamps.
- [ ] Open malformed SRT; verify warning/fallback and no page crash.
- [ ] Try unsupported extension; verify clear error.

## PWA / offline
- [ ] Serve on HTTPS or localhost.
- [ ] Confirm service worker installs and app shell assets are cached.
- [ ] Reopen app with network disabled; verify app shell opens.
- [ ] Confirm selected local files must be reselected after reload.
- [ ] Verify layout and controls on a narrow Android viewport.
- [ ] Verify install prompt/installability where supported.

## Evidence capture
For each test record: date/time, browser/device, test case, expected result, actual result, PASS/FAIL/UNCONFIRMED, and screenshot/log when applicable. Do not mark a test PASS without evidence.
