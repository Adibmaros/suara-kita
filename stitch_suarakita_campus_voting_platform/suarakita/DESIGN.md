---
name: SuaraKita
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#464553'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#777584'
  outline-variant: '#c8c4d5'
  surface-tint: '#544fc0'
  primary: '#1f108e'
  on-primary: '#ffffff'
  primary-container: '#3730a3'
  on-primary-container: '#a9a7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#855300'
  on-secondary: '#ffffff'
  secondary-container: '#fea619'
  on-secondary-container: '#684000'
  tertiary: '#003512'
  on-tertiary: '#ffffff'
  tertiary-container: '#004e1e'
  on-tertiary-container: '#48c768'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3b35a7'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#7ffc97'
  tertiary-fixed-dim: '#62df7d'
  on-tertiary-fixed: '#002109'
  on-tertiary-fixed-variant: '#005320'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '800'
    lineHeight: 38px
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system is crafted for high-stakes civic engagement, transparent student governance, and collaborative fundraising within Indonesian higher education institutions (Universitas, Institut, Politeknik). The core audience consists of Gen Z university students, executive boards (BEM, Senat), academic departments (Himpunan Mahasiswa), and activity clubs (UKM).

The visual aesthetic balances institutional integrity with collegiate vitality. It steers clear of dreary, archaic governmental bureaucracy while avoiding excessive, chaotic playfulness that might undermine ballot credibility. 

Key attributes:
- **Energetic & Youthful:** Dynamic contrast, high-chroma accent badges, friendly tactile curves, and celebratory motion for voting confirmations or crowdfunding milestones.
- **Trustworthy & Transparent:** Deep indigo grounding, high-clarity data displays, verifiable vote seals, and clear transaction ledgers.
- **Accessible & Localized:** Optimized for mobile-first campus life (spotty campus Wi-Fi, rapid WhatsApp sharing, bi-lingual Bahasa Indonesia & English terms like *Bilik Suara*, *Target Donasi*, *Kandidat*).

Visual treatment blends modern soft-dimensional UI with clean, layered card surfaces, gentle ambient drop shadows, and purposeful pill-shaped interactive triggers.

## Colors

The palette establishes an immediate sense of institutional trust accented by collegiate enthusiasm.

### Role Allocations
- **Primary (`#3730A3` - Deep Indigo):** Represents integrity, democratic weight, and administrative security. Used for primary navigation, primary action buttons, focused states, and dominant headline accents.
- **Secondary / Accent (`#F59E0B` - Warm Amber):** Ignites gamification, milestone progress, real-time leaderboard ranks, countdown badges (*Menghitung Mundur*), and fundraising badges.
- **Tertiary / Action Success (`#16A34A` - Vibrant Green):** Dedicated to verified checkmarks, quorum reached alerts, successful transaction flags, and direct WhatsApp sharing/payment confirmation CTAs.
- **Destructive (`#DC2626` - Crimson Rose):** Reserved for irreversible voting lock-ins, invalid tokens, overdue reporting deadlines, and campaign cancellations.
- **Neutral Palette (`#0F172A` to `#F8FAFC` - Slate Spectrum):**
  - Background Canvas: `#F8FAFC` (Slate 50) provides a soft, glare-free backdrop that allows white surface cards to pop naturally.
  - Surface Containers: `#FFFFFF` (Pure White) for voting ballots, candidate profiles, and campaign feeds.
  - Text Hierarchy: `#0F172A` (Slate 900) for high-contrast titles; `#475569` (Slate 600) for body and metadata; `#94A3B8` (Slate 400) for borders and placeholders.

## Typography

This design system uses **Plus Jakarta Sans** across all roles. Its geometric geometry, open counters, and humanist proportions create an inviting, ultra-contemporary presentation that feels natural to Indonesian university students.

### Typographic Hierarchy Guidelines
- **Headings & Hero Blocks:** Rendered in `fontWeight: 700` and `800` with tighter tracking (`-0.02em` to `-0.01em`) to create commanding, confident titles for candidate names, election banners, and donation figures.
- **Body & Longform:** Set at `body-md` (14px) and `body-lg` (16px) with generous line heights (`1.5` to `1.6`) to maintain effortless legibility when students read candidate manifestos, constitution amendments, or accountability reports (*LPJ*).
- **Interactive & Badges:** `label-sm` through `label-lg` carry medium-to-bold weights (`600` - `700`) to guarantee fast identification of time limits, verified student status (*NIM Terverifikasi*), and vote tallies.

## Layout & Spacing

A disciplined, fluid 8pt-based spatial model supports both fast smartphone navigation during student elections and multi-column desktop monitoring dashboards for election committees (KPU Kampus).

### Layout & Grids
- **Mobile (< 768px):** 4-column fluid layout with `16px` margins and `16px` gutters. Floating action triggers (e.g., *Beri Suara Sekarang*, *Kirim Donasi*) are pinned to the bottom safe area.
- **Tablet (768px - 1023px):** 8-column layout with `24px` margins and `20px` gutters. Used primarily for candidate comparison grids and campaign directory lists.
- **Desktop (>= 1024px):** 12-column layout capped at a max-width container of `1280px` with `40px` outer margins. Features persistent vertical navigation for committee management consoles and split-screen voting verification desks.

### Content Density
- Visual elements breathe comfortably with `space-lg` (24px) separating card modules and `space-md` (16px) internal card padding on mobile, scaling to `space-lg` padding on larger screens.
- Inline form elements and compact tally tables utilize `space-xs` (4px) and `space-sm` (8px) for tightly coupled visual relationships.

## Elevation & Depth

Visual hierarchy uses soft, colored ambient shadows and clean borders rather than harsh drop shadows, creating an approachable, clean layer hierarchy.

### Depth Scales
- **Level 0 (Flat Canvas):** `#F8FAFC`. Base canvas layer for scrollable views and backdrops.
- **Level 1 (Surface Cards & Lists):** `#FFFFFF` surfaces paired with a hairline border `1px solid #E2E8F0` and subtle diffuse shadow: `0 2px 4px -1px rgba(55, 48, 163, 0.04), 0 4px 12px -2px rgba(15, 23, 42, 0.05)`. Used for candidate cards, voting categories, and donation cards.
- **Level 2 (Hovered States & Active Modals):** Slight elevation boost with tinted indigo ambient spread: `0 10px 25px -5px rgba(55, 48, 163, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)`. Used when cards are tapped or hovered, indicating immediate interactivity.
- **Level 3 (Sticky CTAs & Bottom Sheets):** `0 20px 30px -10px rgba(15, 23, 42, 0.12)`. Applied to sticky vote confirmation drawers and mobile quick-actions.

## Shapes

The design system incorporates a dual-tier geometry: friendly structured modules combined with full-pill elements.

- **Cards and Data Containers:** Set strictly to `16px` (`rounded-lg` under Level 2 setting) to give student activity feeds, ballot envelopes, and profile containers a friendly, welcoming, yet structured outline.
- **Interactive Action Elements (Buttons, Search Bars, Status Badges):** Sculpted with full pill borders (`rounded-full` / `9999px`). The pill shape communicates immediate tap-friendliness, youthfulness, and distinction from content cards.
- **Inputs & Dropdowns:** Softly rounded with `12px` (`0.75rem`) radii to sit comfortably between card geometry and button shapes.

## Components

### Buttons
- **Primary Pill:** Background `#3730A3`, text `#FFFFFF`, font `label-lg`, full pill radius (`9999px`), padding `12px 24px`. Hover state shifts to `#312E81` with subtle scale transition (`transform: translateY(-1px)`).
- **Secondary / WhatsApp CTA Pill:** Background `#16A34A`, text `#FFFFFF`, with WhatsApp icon aligned to the leading edge. Used for donor confirmations and voting ticket distribution via campus chat groups.
- **Tertiary Accent Pill:** Background `#FEF3C7`, text `#B45309`, border `1px solid #FDE68A`. Used for quick donation amount presets (e.g., *Rp 10.000*, *Rp 25.000*).

### Cards & Candidate Modules
- Pure white background (`#FFFFFF`), `16px` border-radius, `1px solid #E2E8F0`.
- Includes candidate ballot numbering pill on top-left (e.g., `#3730A3` background with white text: *No. Urut 01*).
- Contains real-time interactive progress indicators for fundraising targets, with animated track fill in `#F59E0B`.

### Ballot Chips & Selection Tags
- Fully rounded pills (`9999px`), `8px 16px` padding.
- **Unselected:** Background `#F1F5F9`, text `#475569`, border `1px solid transparent`.
- **Selected:** Background `#EEF2FF`, text `#3730A3`, border `2px solid #3730A3`, with a checkmark icon indicator.

### Input Fields
- `12px` rounded corners, background `#FFFFFF`, border `1.5px solid #CBD5E1`, padding `12px 16px`.
- Focus state features a crisp outer glow: border color `#3730A3`, ring outline `3px solid rgba(55, 48, 163, 0.15)`.
- Helper labels and validation messages use `body-sm` with student-friendly guidance (e.g., *Gunakan email kampus @mahasiswa.ac.id*).

### Checkboxes & Radio Selectors
- Radio buttons for single-choice voting options feature an oversized, thumb-friendly hit area (minimum 44x44px).
- Selection shows an outer ring of `#3730A3` with an inner filled circle in primary indigo, offering high contrast verification before ballot casting.

### Domain-Specific Components
- **Student ID (NIM) Verification Badge:** Dual-tone chip featuring green checkmark for *Terverifikasi Dikti/Biro Akademik* with white-to-slate contrast.
- **Live Voting Quorum Bar:** Segmented bar charting voter turnout percentages against legal quorum thresholds with dynamic milestone flags in Amber (`#F59E0B`).