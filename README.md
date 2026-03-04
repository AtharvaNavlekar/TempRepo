<p align="center">
  <img src="https://img.shields.io/badge/COLLABRISE-PROTOCOL_v1.0-ccff00?style=for-the-badge&labelColor=050505" alt="CollabRise Protocol" />
</p>

<h1 align="center">COLLABRISE</h1>
<h3 align="center"><code>SHIP. OR DIE TRYING.</code></h3>

<p align="center">
  <em>The Universal Proof-of-Work Protocol — A Gen Z OS for Human Potential</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=nextdotjs" />
  <img src="https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Three.js-r170-black?style=flat-square&logo=threedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Framer_Motion-11-bb4fff?style=flat-square&logo=framer&logoColor=white" />
</p>

---

## 🧬 What is CollabRise?

CollabRise is a **platform that replaces résumés with verifiable Proof-of-Work**. Instead of telling people what you can do, you *show* them through shipped artifacts, verified contributions, and a living digital identity called your **Ship Log**.

Whether you write code, design interfaces, bake bread, or weld steel — CollabRise quantifies, verifies, and displays your *actual output* through six interconnected protocol systems:

| System | What It Does |
|---|---|
| ⚡ **Ship Score** | On-chain proof of execution — every commit, pixel, and plate quantified |
| 🧬 **Artifact DNA** | Genetic metadata extracted from your work (PSD layers, Git commits, etc.) |
| 🔒 **Commitment Contracts** | Stake your reputation — ghost a project and watch your profile decay |
| 💀 **Failure Vault** | Post-mortems that prove you learn from breaking things |
| ⚔️ **Guilds** | Tribes organized by craft — rise through ranks by shipping together |
| 💰 **Build-to-Hire** | Companies see what you've built — sprint challenges replace whiteboards |

---

## 🗂️ Project Structure

```
CollabRise/
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── page.tsx                  # Landing page (Manifesto)
│   │   ├── layout.tsx                # Root layout with Navbar
│   │   ├── globals.css               # Global styles & design tokens
│   │   │
│   │   ├── auth/                     # Authentication
│   │   │   ├── login/                #   Login page
│   │   │   └── recovery/             #   Account recovery
│   │   │
│   │   ├── dashboard/                # Builder command center
│   │   │
│   │   ├── onboard/                  # Onboarding flow (6 steps)
│   │   │   ├── identity/             #   Step 1 — Create identity
│   │   │   ├── scraper/              #   Step 2 — Import existing work
│   │   │   ├── psychometric/         #   Step 3 — Personality calibration
│   │   │   ├── guilds/               #   Step 4 — Join guilds
│   │   │   ├── seed/                 #   Step 5 — Seed your ship log
│   │   │   └── contract/             #   Step 6 — Commitment contract
│   │   │
│   │   ├── ship-log/                 # The Ship Log (Identity Layer)
│   │   │   ├── [username]/           #   Public profile page
│   │   │   ├── studio/               #   Ship Log editor/studio
│   │   │   ├── calendar/             #   Contribution calendar
│   │   │   ├── dna/[id]/             #   Artifact DNA deep-dive
│   │   │   ├── heatmap/              #   Skill heatmap
│   │   │   ├── failures/             #   Failure vault & new post-mortem
│   │   │   ├── reputation/           #   Reputation score breakdown
│   │   │   └── reviews/              #   Peer review wall
│   │   │
│   │   ├── profiles/[industry]/      # Industry-specific profile views
│   │   ├── vibe-check/               # "Are you ready to ship?" gateway
│   │   └── waitlist/                 # Waitlist signup
│   │
│   ├── components/
│   │   ├── forge/                    # 🔥 Forge Design System
│   │   │   ├── ForgeButton.tsx       #   Primary action button
│   │   │   ├── BentoCard.tsx         #   Glassmorphic bento grid card
│   │   │   ├── GlitchText.tsx        #   Cyberpunk glitch text effect
│   │   │   ├── ShipScoreCounter.tsx  #   Animated score counter
│   │   │   ├── DNACard.tsx           #   Artifact DNA display card
│   │   │   ├── PulseTag.tsx          #   Animated status tag
│   │   │   ├── TerminalBlock.tsx     #   CLI-styled code/output block
│   │   │   ├── GlassOverlay.tsx      #   Glassmorphism modal overlay
│   │   │   ├── SpringTransition.tsx  #   Spring-physics scroll reveal
│   │   │   └── index.ts             #   Barrel exports
│   │   │
│   │   ├── landing/                  # Landing page sections
│   │   │   ├── ArtifactCloud.tsx     #   3D Three.js floating artifacts
│   │   │   ├── BuilderTicker.tsx     #   Live builder activity ticker
│   │   │   └── ManifestoScroll.tsx   #   Scroll-driven manifesto section
│   │   │
│   │   └── layout/
│   │       └── Navbar.tsx            # Top navigation bar
│   │
│   ├── store/
│   │   └── store.ts                  # Zustand global state
│   │
│   ├── fonts/
│   │   └── ClashDisplay-Medium.woff2 # Custom display typeface
│   │
│   └── types/
│       └── r3f.d.ts                  # React Three Fiber type defs
│
├── tailwind.config.ts                # Extended theme (obsidian, lime, cyber, acid)
├── next.config.ts                    # Next.js configuration
├── tsconfig.json                     # TypeScript configuration
├── eslint.config.mjs                 # ESLint flat config
├── postcss.config.mjs                # PostCSS configuration
└── package.json                      # Dependencies & scripts
```

---

## 🎨 Design System — "The Forge"

CollabRise uses a custom design system called **The Forge**, built for a dark, cyberpunk-inspired aesthetic.

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `obsidian` | `#050505` | Primary background |
| `lime` | `#CCFF00` | Primary accent — CTAs, highlights |
| `cyber` | `#8A2BE2` | Secondary accent — categories, badges |
| `acid` | `#FF00FF` | Tertiary accent — warnings, failures |
| `glass-white` | `rgba(255,255,255,0.06)` | Glassmorphic surfaces |
| `glass-border` | `rgba(255,255,255,0.1)` | Subtle borders |

### Typography

| Font | Usage |
|---|---|
| **Clash Display** | Headlines, hero text, scores |
| **Space Grotesk** | Body text, UI elements |
| **JetBrains Mono** | Code blocks, metadata, labels |

### Components

- **`ForgeButton`** — Primary/secondary/ghost action buttons with brutal shadow variants
- **`BentoCard`** — Glassmorphic card with accent-colored borders and hover effects
- **`GlitchText`** — Cyberpunk text with configurable glitch speed and clip-path animation
- **`ShipScoreCounter`** — Animated counter with spring physics for score displays
- **`DNACard`** — Card for displaying artifact DNA metadata
- **`PulseTag`** — Animated status indicator with pulse ring animation
- **`TerminalBlock`** — CLI-style output block with syntax highlighting
- **`GlassOverlay`** — Full-screen glassmorphic modal overlay
- **`SpringTransition`** — Scroll-triggered spring-physics reveal animation

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.0
- **npm** >= 9.0

### Installation

```bash
# Clone the repository
git clone https://github.com/AtharvaNavlekar/TempRepo.git
cd TempRepo

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at **http://localhost:3000**

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

---

## 🧭 Page Guide

### Landing Page (`/`)
The manifesto page featuring a **"SHIP. OR DIE TRYING."** hero section, interactive 3D artifact cloud (Three.js), bento grid protocol overview, live builder ticker, scroll-driven manifesto, and a full footer.

### Vibe Check (`/vibe-check`)
A high-intensity gateway page — "Are you ready to ship?" — with pulsing neon effects that funnels users into the onboarding flow.

### Onboarding Flow (`/onboard/*`)
A 6-step identity creation pipeline:
1. **Identity** — Create your builder handle and avatar
2. **Scraper** — Import existing work from GitHub, Behance, etc.
3. **Psychometric** — Personality and workstyle calibration
4. **Guilds** — Join craft-based guilds (React Guild, Chef Guild, etc.)
5. **Seed** — Seed your Ship Log with initial artifacts
6. **Contract** — Sign a commitment contract to stay accountable

### Ship Log (`/ship-log/*`)
Your verifiable "Proof of Work" identity:
- **Public Profile** (`/ship-log/[username]`) — Your public builder page
- **Studio** (`/ship-log/studio`) — Edit and curate your Ship Log
- **Calendar** (`/ship-log/calendar`) — GitHub-style contribution heatmap
- **Artifact DNA** (`/ship-log/dna/[id]`) — Deep-dive into an artifact's metadata
- **Skill Heatmap** (`/ship-log/heatmap`) — Visual skill proficiency breakdown
- **Failure Vault** (`/ship-log/failures`) — Post-mortems and lessons learned
- **Reputation** (`/ship-log/reputation`) — Reputation score and trust metrics
- **Peer Reviews** (`/ship-log/reviews`) — Verified reviews from collaborators

### Dashboard (`/dashboard`)
Builder command center with Ship Score, active projects, DNA cards, and pulse tags.

### Industry Profiles (`/profiles/[industry]`)
Dynamic, industry-specific profile views tailored for different career verticals.

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js 15 (App Router) | Server & client rendering, file-based routing |
| **UI Library** | React 19 | Component architecture |
| **Language** | TypeScript 5 | Type safety |
| **Styling** | Tailwind CSS 3.4 | Utility-first CSS with custom design tokens |
| **3D Graphics** | Three.js + React Three Fiber + Drei | Interactive 3D artifact cloud |
| **Animation** | Framer Motion + GSAP | Page transitions, scroll-driven animations |
| **State** | Zustand | Lightweight global state management |
| **Fonts** | Clash Display, Space Grotesk, JetBrains Mono | Custom typography via Google Fonts + local |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is proprietary. All rights reserved.

---

<p align="center">
  <strong>© 2026 CollabRise Protocol</strong><br/>
  <sub><code>SHIP. OR DIE TRYING.</code></sub>
</p>
