# Paradox Foundry — Project Map

*Last updated: 4 June 2025*

## Purpose

Paradox Foundry is a myth-tech R&D and narrative platform:  
- **Core of the Simulacrum Engine**
- Powers "Principia Paradoxica" and all reality-warping spin-offs
- Built for *modularity*, *lore-logic*, and *paradox-resilient* frontends

---

## Top-Level Structure
paradox-foundry/
│
├── .env.example                # Example environment variables (never commit .env)
├── README.md                   # High-level vision and setup instructions
├── PROJECT_MAP.md              # This file (repo structure & logic overview)
│
├── src/
│   ├── components/             # Reusable React components (NavBar, Layout, Ritual UI)
│   ├── contexts/               # React Contexts (Language, Theme, User, etc.)
│   ├── hooks/                  # Custom React hooks
│   ├── hocs/                   # Higher-Order Components for cross-cutting logic
│   ├── types/                  # TypeScript type definitions & interfaces
│   ├── utils/                  # Utility functions (i18n, FSA adapters, bread logic, etc.)
│   ├── pages/                  # Next.js pages (index, engine, magazine, ecosystem, engage, etc.)
│   ├── styles/                 # Tailwind/global styles, theme tokens
│   └── content/                # Static/MDX content, demo artifacts, narrative branches
│
├── public/                     # Public assets (favicons, SVGs, media, docs)
│
├── tests/                      # Test suites (unit, integration, storybook)
│
└── package.json, tsconfig.json, etc.   # Project configs
---

## Key Rituals & Myth-Tech Features

- **NavBar:** Multilingual, lens-aware, fully accessible
- **LanguageContext:** Polyglot navigation for site-wide i18n/RTL
- **FSA / Zoan:** Flow-State Algorithm modular hooks for narrative/game adaptation
- **Vibe Architecture:** Annotated code, symbolic breadcrumbs, ritual interface
- **DAO/Loaf-for-Loaf:** Decentralised, auditable bread logic (to be enabled in future phase)
- **Artifacts:** All interactive demos, Claude artifacts, and generative content live in `/src/content/`
- **Accessibility:** Every component and page must be ARIA-compliant and modularly styled

---

## Contribution & Onboarding

- **Start here:** `README.md`
- **Project map:** This file (`PROJECT_MAP.md`)
- **Environment:** Copy `.env.example` ➜ `.env` and set required variables
- **Run locally:** See `README.md` for install & dev commands
- **Key scripts:**  
    - `npm run dev` – Start local dev server  
    - `npm run build` – Production build  
    - `npm run lint` – Lint codebase  
    - `npm run test` – Run tests

---

## Symbolic Topology

- **Every commit is a move in Infinite Weiqi.**
- **Every component should feel ritualistic, not generic.**
- **Maintain a living link between lore, governance, and the codebase.**

---

*“In the Simulacrum, code is never just code. Every function, every page, every bread logic is a ritual, a move in the greater game.”*

---
