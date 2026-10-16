# Task Breakdown — RF Doctor AI

Status: DRAFT BACKLOG — belum ada task implementasi yang diizinkan  
Versi: 0.1

## Aturan

Setiap task wajib bisa dikerjakan, diuji, diverifikasi, dan memiliki evidence. Task dengan keputusan penting yang masih TBD diblokir sampai keputusan itu ditutup. Task ini belum menjadi izin untuk menulis kode produk.

## Phase 0 — Discovery and specification

### DOC-01 — Review project charter
- Output: charter disetujui atau diberi catatan.
- Verify: owner review tercatat.
- Evidence: keputusan pada PR/comment.
- Status: BLOCKED ON REVIEW.

### DOC-02 — Review feasibility research
- Output: klaim teknis dan sumber diperiksa.
- Verify: sumber primer tersedia dan keterbatasan dicatat.
- Evidence: referensi dan catatan validasi.
- Status: DRAFT.

### DOC-03 — Close requirements
- Output: requirements v1.0.
- Verify: setiap FR memiliki acceptance criteria yang dapat diuji.
- Evidence: review checklist.
- Status: BLOCKED ON REVIEW.

### DOC-04 — Close architecture decisions
- Output: keputusan autentikasi, penyimpanan lokal, provider AI, API level, dan knowledge storage.
- Verify: decision log diperbarui.
- Evidence: ADR/decision record yang disetujui.
- Status: BLOCKED ON REVIEW.

### DOC-05 — Prepare case benchmark
- Output: dataset kasus sintetis/anonim dengan hasil evaluasi teknisi.
- Verify: setiap kasus memiliki input, referensi yang diizinkan, dan expected evaluation criteria.
- Evidence: benchmark file dan review.
- Status: BLOCKED ON TECHNICAL REVIEW.

## Phase 1 — Secure backend foundation (not authorized yet)

### BE-01 — Backend project scaffold
- Output: minimal Cloudflare Worker project.
- Verify: lint/build/test pass.
- Evidence: logs and PR.

### BE-02 — Request schema and validation
- Output: versioned API contract with invalid-input tests.
- Verify: malformed/oversized payload rejected.
- Evidence: contract tests.

### BE-03 — Authentication and authorization
- Output: chosen auth flow implemented.
- Verify: unauthenticated and unauthorized requests rejected.
- Dependency: DOC-04.
- Evidence: automated tests.

### BE-04 — Secret handling and rate limits
- Output: provider secrets in server-side secret store; usage limits.
- Verify: source/build/log scan and tests.
- Evidence: checks and configuration notes.

## Phase 2 — Case management

### APP-01 — Android project scaffold
- Output: Kotlin + Compose app builds.
- Verify: unit/build checks and install on a supported device.
- Evidence: build logs and device test.

### APP-02 — Case model and local persistence
- Output: case records persist according to approved offline strategy.
- Verify: create/read/update and restart tests.
- Dependency: DOC-04.
- Evidence: tests and device verification.

### APP-03 — Symptom and measurement forms
- Output: input forms preserve UNKNOWN and units.
- Verify: validation and boundary tests.
- Evidence: tests and screenshots.

### APP-04 — Case history
- Output: browse and search cases.
- Verify: stable sort, empty/error states, no data loss.
- Evidence: tests and device checks.

## Phase 3 — Knowledge and AI

### AI-01 — Knowledge source registry
- Output: source metadata and review status.
- Verify: draft/unlicensed source is excluded from retrieval.
- Evidence: tests.

### AI-02 — Baseline retrieval
- Output: keyword search over reviewed knowledge.
- Verify: relevance test set and no invented source IDs.
- Evidence: benchmark results.

### AI-03 — Provider adapter
- Output: one selected AI provider behind backend interface.
- Dependency: DOC-04 and provider benchmark.
- Verify: timeout, provider error, invalid JSON and rate limit handling.
- Evidence: integration tests.

### AI-04 — Structured diagnostic response
- Output: schema-validated diagnostic hypotheses and verification steps.
- Verify: synthetic case benchmark; unsupported claims flagged.
- Evidence: report and sample outputs.

## Phase 4 — Integration and pilot readiness

### INT-01 — End-to-end case diagnosis
- Output: Android case → backend retrieval → AI response → case history.
- Verify: integration tests and manual device walkthrough.
- Evidence: logs without sensitive data, screenshots, test report.

### INT-02 — Privacy and security review
- Output: data flow and retention policy reviewed.
- Verify: secret scan, sensitive-field scan, authorization tests.
- Evidence: security checklist.

### INT-03 — Pilot readiness gate
- Output: release candidate checklist.
- Verify: all critical acceptance criteria pass; unresolved risks documented.
- Evidence: release report.

## Definition of done

- Requirements linked to task.
- Code/docs reviewed.
- Tests run and actual results recorded.
- Evidence linked.
- Known limitations listed.
- No secrets or sensitive customer identifiers in logs/artifacts.
- PR open for owner review; no automatic merge or production deployment.