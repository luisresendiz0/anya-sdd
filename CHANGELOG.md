# Changelog

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
- No changes needed to existing `/anya/` output files
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
