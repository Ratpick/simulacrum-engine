# Simulacrum Engine Documentation

## Structure Overview
- **frontend/** — User-facing apps & static sites.
  - `hexagram-myth/` — Easter egg glitch project.
  - `mhcic-solar-first/` — Solar initiative microsite.
  - `principia-paradoxica-site/` — Main lore portal.
- **backend/** — API services, database hooks.
- **packages/** — Modular components.
  - `infinite-weiqi/` — Game logic engine.
  - `twine-authoring/` — Narrative tools.
  - `DAO_IZM_Algorand_Testnet/` — DAO governance modules.
- **docs/** — Internal documentation (this file, workflows, cheat sheets).
- **scripts/** — Automation helpers, deployment scripts.
- **public/** — Shared static assets (global CSS, icons).

## Key Files
- `repo-map.txt` — Visual file tree snapshot.
- `deploy-cheat-sheet.md` — Deployment workflows.

## Git Submodules
- `frontend/mhcic-solar-first` — Managed as submodule.
  - [Repo Link](https://github.com/Ratpick/mhcic-solar-first)

## Contribution Notes
- Follow the branch naming convention: `feature/`, `bugfix/`, `hotfix/`, `docs/`.
- Commit messages: <type>: <short description> (e.g., `feature: add DAO hooks`).
- PRs require one reviewer approval (initially, that’s you).

## Current Priorities
- Finalise Lovable edits for Hexagram Myth.
- Wire up MHCIC deploy flow.
- Define DAO IZM smart contract schemas.