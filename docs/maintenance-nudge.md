
# 📌 Simulacrum Engine Maintenance Nudge Guide

**Purpose:**  
To ensure your repo, documentation, and deployment assets stay aligned as you develop. Reference this checklist weekly or after key updates.

## ✅ When to Update README.md Files
| Trigger | Action |
|---------|--------|
| New submodule added | Update root README with description & link. |
| Major structural change (folders, packages) | Update README diagrams & structure explanation. |
| New deployable component (e.g., Lovable frontend) | Add dedicated README in component folder. |

## ✅ When to Update `repo-map.txt`
| Trigger | Action |
|---------|--------|
| Any folder/file structure change beyond minor tweaks | Regenerate with `tree -L 3 -I '.git|node_modules' > repo-map.txt`. |
| Before handover to collaborators | Ensure repo-map reflects current state. |

## ✅ When to Update Site Map / CTA Flows
| Trigger | Action |
|---------|--------|
| New Glitch/Easter Egg project linked to CTA | Add to site map in `/docs/`. |
| New Principia Paradoxica content node (e.g., lore expansions) | Update navigation structure & CTA flow diagrams. |

## ✅ When to Update Onboarding Guides
| Trigger | Action |
|---------|--------|
| New dev joins (or will join) | Review onboarding docs for accuracy & clarity. |
| Major toolchain/process change (e.g., switch from Cursor to Lovable) | Document new workflow steps. |

## ✅ When to Check CI/CD Workflows
| Trigger | Action |
|---------|--------|
| New deployable site added (e.g., MHCIC Solar First) | Create/update `.github/workflows/` files. |
| Repo renamed, branch protection rules updated | Review workflows for correct paths & triggers. |

## ✅ Weekly Reminder (Can automate with o3 or Manus later)
- [ ] Run `git status` and ensure no forgotten changes.
- [ ] Check all READMEs & repo-map reflect current structure.
- [ ] Confirm CTA & site navigation flows are up to date.
- [ ] Review any deployable frontend changes (Hexagram Myth, MHCIC).
- [ ] Update `/docs/` if lore or structural documentation has changed.
