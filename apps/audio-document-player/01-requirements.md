# Audio + Document Reader — Requirements

Status: Draft MVP specification
Repository: teknisiAkhirat/Aws-academy
Scope: standalone static PWA under `apps/audio-document-player/`

## Problem and outcome
Provide a mobile-first, offline-first browser app for listening to a local audio file while reading a separate local document. The user can seek directly to any position by tapping the audio progress bar.

## Target user
A person using an Android phone to listen to lectures or other audio and read accompanying notes/transcripts.

## Functional requirements
- FR-01: Choose a local audio file through the browser file picker.
- FR-02: Play and pause audio.
- FR-03: Display current time and total duration.
- FR-04: Tapping or keyboard-operating the seek bar seeks to that relative position immediately when media metadata is available.
- FR-05: Seek bar supports accessible labels and keyboard input.
- FR-06: Choose one local document with extension .md, .srt, or .txt.
- FR-07: Render common Markdown formatting (headings, paragraphs, bold, italic, strikethrough, lists, blockquotes, links, inline/fenced code, horizontal rules, and pipe tables) as readable content; escape raw HTML and block unsafe link protocols.
- FR-08: Display SRT cues as timestamped blocks; malformed entries must not crash the app and must be reported clearly.
- FR-09: Display TXT as readable plain text while preserving line breaks.
- FR-10: Remember playback position for the current audio during the current browser session; do not upload files.
- FR-11: Provide installable PWA metadata and cache the app shell for offline reopening after the first successful online visit.
- FR-12: Clearly communicate that local files must be selected again after a page reload if the browser does not retain access; never claim file bytes are persisted.
- FR-13: Provide clear empty, loading, unsupported-file, and error states.

## Non-functional requirements
- Mobile-first responsive layout; usable on narrow screens.
- No backend, account, database, analytics, remote fonts, CDN libraries, or paid API.
- No network request for user-selected file contents.
- Security: treat document content as untrusted; do not use unsanitized HTML.
- Basic keyboard accessibility, semantic controls, focus visibility, and sufficient contrast.

## Non-goals
- No audio/subtitle synchronization or click-to-seek from SRT cues.
- No cloud sync, playlist management, server upload, transcription, AI features, or account system.
- No guarantee that every codec plays in every browser.
- No guarantee that audio continues in the background when the browser/OS suspends the page.

## Acceptance criteria
- AC-01: Selecting a supported audio file displays its name and enables playback when browser decoding is supported.
- AC-02: Play/Pause toggles actual media playback and updates the control label/state.
- AC-03: Tapping 25%, 50%, and 90% of the seek bar sets currentTime to approximately the corresponding fraction of duration (tolerance 1 second).
- AC-04: Time display updates during playback and after seeking.
- AC-05: TXT opens with readable line breaks.
- AC-06: SRT displays valid cues with timestamps and text; malformed input shows a non-fatal warning/fallback.
- AC-07: Markdown headings, paragraphs, lists, emphasis, strikethrough, links, code, horizontal rules, and pipe tables render safely; raw HTML is not executed and unsafe link protocols are blocked. Markdown images do not trigger remote requests.
- AC-08: A rejected file type produces a clear message without breaking the current screen.
- AC-09: App shell is cacheable for offline reopen after initial successful load; network failure does not erase app UI.
- AC-10: No backend or user-file upload exists in the implementation.
- AC-11: Automated/static checks and manual verification evidence are recorded honestly; unrun browser/device tests remain UNCONFIRMED.

## Definition of done
Requirements, implementation, tests, README, known limitations, and evidence are committed in a feature branch and submitted as a PR. Do not merge to main automatically.
