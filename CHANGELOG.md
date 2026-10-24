# Changelog

## [0.7.0] - 2026-10-23

### 🍰 Agile Vertical Slices, Interactive Testing & Live Verification

### Added

- **Anya High-Resolution Chibi Sprites:** Organic integration of character illustrations (`Peeking`, `Quality Inspector`, and `Waku-Waku`) across the landing page with transparent alphas and dual WebP/PNG responsive sources.
- **Permanent Sticky Floating Navigation Island:** Restructured viewport overflow containment using `overflow-x: clip` to allow permanent sticky positioning (`top: 0`), dynamic frosted glass capsule animation on scroll, and polished padding (`36px` desktop / `18px` mobile).

### Changed

- **Agile Vertical Slices (End-to-End):** Every spec is an end-to-end usable increment (Interface/UI/CLI + Logic + State/Data + Tests). Strictly prohibits horizontal cascade development (no isolated DB or backend-only specs).
- **Walking Skeleton as Spec 001:** The initial deliverable implements the most elemental user flow, absorbing minimal setup so the application is 100% functional, runnable, and testable from the very first spec.
- **Proportional Spec Sizing (`anya-spec`):** Complete Vertical Slice Spec for medium/large features, and Flexible Lightweight Spec for bug fixes, evolutives, and small tweaks.
- **Dynamic Task Tracking (`anya-task` & `anya-implement`):** Real-time task status tracking supporting `[ ]` (pending), `[/]` (in progress), and `[x]` (completed). Every task list concludes with a mandatory final task for compilation, startup, and live interactive verification.
- **6-Level Verification & Runtime Health (`anya-verify`):** Explicit validation of application build and runtime health using exact execution commands from `anya/stack.md`.
- **Interactive Live Testing Guide & Mandatory Pause:** Generates concrete user walkthroughs (run command, URLs/CLI input, expected results) and strictly pauses execution until human live verification is approved.
- **Execution Commands in Stack (`anya-stack`):** Captures build and run/dev commands alongside testing strategies.

## [0.6.0] - 2026-10-22

### Numbered Specs & Incremental Delivery

### Changed

- Specs now live in numbered folders: `anya/specs/001-name/spec.md`, with
  `tasks.md` beside them. New specs receive the next number; updates keep it.
- Updated downstream skill paths, name resolution, and documentation examples.
- Plans stay lightweight; specs are detailed just before implementing a small,
  usable increment. Mini-Spec is the default; feedback guides the next delivery.
- `tasks.md` remains mandatory for every spec. Task counts scale to the work;
  existing authorization is reused, and TDD is supported.
- Removed repeated role descriptions and task examples to keep skill text small.

### Fixed

- Corrected the clone URL in README and QUICKSTART to match `anya-sdd`.
- Fixed nested Markdown fences in the Full-Spec example.

### Migration

- Replace the seven installed skill folders with this version.
- Move each flat `<name>.md` / `<name>.tasks.md` pair into a numbered folder as
  `spec.md` / `tasks.md`, following the existing plan order. Preserve already
  numbered folders, content, and checked tasks; update affected links and references.
- See [QUICKSTART.md](./QUICKSTART.md#output-files) for migration details.

## [0.5.0] - 2026-10-20

### 🧱 Structure & Portability Release

Skills now follow the standard `<skill>/SKILL.md` layout, paths are relative, and
the framework no longer assumes a language ecosystem.

### Changed

- **Layout:** `.anya/anya-<skill>.md` → `.anya/anya-<skill>/SKILL.md` (portable to OpenCode, Claude Code, and any Agent Skills compatible harness).
- **Paths:** all artifact references are relative (`anya/...`), so the agent can never write outside the project.
- **Distribution:** artifacts live in `anya/`; skills live in `.anya/`. Copy the skill folders into your agent's skills directory to enable auto-discovery.
- **Testing:** `anya-stack` records the tool **and the exact command** for each suite, derived from the project's ecosystem. No framework is hardcoded.
- **Verification:** Level 5 runs only when `anya/stack.md` declares testing; otherwise it reports `N/A`.
- **Implementation:** tasks are marked one at a time (`3/8`), never batch-marked at the end. Verification reports each level and item as it checks it.
- **Specs outside the plan:** `anya-spec` asks what's missing (scope, criteria, exclusions) before generating.
- **Versioning:** every artifact starts with `> version: N · updated: YYYY-MM-DD`.
- **Examples:** reduced to structural skeletons; formatting details are delegated to the agent.

### Removed

- `## Quality Gates` and `## Next` sections from skill bodies (duplicated the frontmatter).
- All conversational examples and `## Examples` sections.
- `EXECUTIVE-SUMMARY.md` (stale v0.3.0 document).
- Broken link to `OPTIMIZATION-PROPOSAL.md`.

### Metrics

| Metric | v0.4.0 | v0.5.0 | Change |
|--------|--------|--------|--------|
| Lines (7 skills) | 1,541 | ~1,000 | -35% |
| Absolute paths | 67 | 0 | -100% |
| Test frameworks hardcoded | 5 | 0 | -100% |
| Duplicated metadata sections | 14 | 0 | -100% |
| Documentation files | 4 | 3 | -25% |

### Migration

- Replace the old flat skill files with the new `.anya/anya-<skill>/SKILL.md` folders.
- Existing `anya/` artifacts remain valid; add `> version: 1 · updated: <date>` to each if you want version tracking.
- If you had copied the whole repo into a project, remove the old docs from that copy.

---

## [0.4.0] - 2026-01-19

### 🎯 Token Optimization Release

All skills rewritten in English with maximum token efficiency.

### Changed

**All Skills (v0.3.0 → v0.4.0):**
- Language: Spanish → English (better tokenization)
- Frontmatter keys condensed:
  - `quality_gates` → `gates`
  - `exit_criteria` → `exit`
  - `anti_patterns` → `anti`
  - `next_skill` → `next`
- Instructions: explanatory → imperative
- Examples: detailed → minimal but complete
- Average lines per skill: ~200 → ~120 (**-40%**)

### Metrics

| Metric | v0.3.0 | v0.4.0 | Improvement |
|--------|--------|--------|-------------|
| Lines per skill | ~200 | ~120 | -40% |
| Frontmatter tokens | verbose | condensed | -50% |
| Instruction style | explanatory | imperative | -60% |
| Example length | detailed | minimal | -50% |

### Migration

**From v0.3.0 to v0.4.0:**
- Replace all skill files with v0.4.0 versions
- No changes needed to existing `anya/` output files
- Fully backward compatible

---

## [0.3.0] - 2026-01-19

### 🎯 Role-Based Architecture

Added specialized roles, triggers, quality gates, anti-patterns, exit criteria.

### Added

- **Role assignment** per skill (7 specialized personas)
- **Trigger system** (user_intent + context patterns)
- **Quality gates** (strict validation per skill)
- **Anti-pattern detection** (prevent common mistakes)
- **Exit criteria** (clear completion conditions)
- **Pipeline chaining** (`next_skill` field)

### Changed

- Descriptions optimized for AI agent triggering
- Cross-coherence validation (constitution ↔ stack ↔ specs)

---

## [0.2.0] - 2026-01-18

### 🎯 Initial Implementation

Full framework with 7 skills, modular specs, prompt-based interaction.

### Added

- 7 core skills (constitution → verify)
- Mini-Spec vs Full-Spec decision
- Cascade diagnosis (4 levels)
- Automatic verification after implementation
- Risk detection + improvement suggestions

---

## [0.1.0] - 2026-01-17

### 🎉 Initial Concept

Framework concept, basic workflow, skill structure proposal.

---

## Version History

| Version | Date | Major Changes |
|---------|------|---------------|
| 0.1.0 | 2026-01-17 | Initial concept |
| 0.2.0 | 2026-01-18 | Full implementation, 7 skills |
| 0.3.0 | 2026-01-19 | Role-based architecture, triggers, gates |
| 0.4.0 | 2026-01-19 | English rewrite, token optimization |
| 0.5.0 | 2026-10-20 | SKILL.md layout, relative paths, ecosystem-agnostic testing |
| 0.6.0 | 2026-10-22 | Numbered spec folders, incremental delivery, mandatory task files |
