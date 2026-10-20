# Changelog

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
