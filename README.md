<div align="center">

# Vanguard Showcase

**A premium, production-grade Next.js dashboard template**

[![Next.js](https://img.shields.io/badge/Next.js-16.2.1-black?logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-new--york-18181b)](https://ui.shadcn.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)

*Every prototype forked from this template should look like a $50k enterprise product.*

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/vanguard-showcase)

</div>

---

## What's in the box

| Category | Feature |
|----------|---------|
| **Framework** | Next.js 16 (App Router, React 19, Turbopack) |
| **Design System** | "Obsidian" theme — enterprise dark mode by default, clean light mode toggle |
| **UI Components** | shadcn/ui (new-york style) + 40+ custom components |
| **Charts** | Recharts: Area, Line, Bar, Donut, Sparkline — all animated, all responsive |
| **Data Tables** | TanStack Table with sort, filter, and pagination |
| **Command Palette** | ⌘K command menu with navigation + theme switching |
| **Animations** | Framer Motion + CSS keyframe animations with staggered reveals |
| **State** | Zustand (persistent sidebar state, command menu) |
| **Type Safety** | 100% TypeScript, strict mode |
| **Responsive** | Mobile-first: 375px → 1920px |
| **Accessible** | WCAG 2.1 AA — keyboard navigation, ARIA labels, color contrast |
| **Performance** | Static pre-rendering, optimized images, Geist fonts |
| **Deploy** | Zero-config Vercel deployment |

---

## Pages

### Dashboard Overview `/dashboard`
- 4 KPI stat cards with sparkline charts and trend indicators
- Revenue area chart (12 months, revenue vs. expenses)
- Revenue by category donut chart
- Transactions data table (sortable, filterable, paginated)
- Real-time activity feed with event type icons

### Analytics `/dashboard/analytics`
- Summary KPI cards (page views, visitors, bounce rate, session time)
- Page views vs. unique visitors line chart (30 days)
- Top pages bar chart
- Traffic sources with progress bars
- Detailed page analytics table

### Settings `/dashboard/settings`
- Profile management (name, email, avatar, timezone)
- Notification preferences with toggles
- Security (password, 2FA, danger zone)
- Billing & plan management
- API key management

---

## 🏗 Architecture

```
src/
├── app/
│   ├── layout.tsx              # Root layout with ThemeProvider + TooltipProvider
│   ├── page.tsx                # Redirects to /dashboard
│   └── dashboard/
│       ├── layout.tsx          # Dashboard shell: Sidebar + Header + CommandMenu
│       ├── page.tsx            # Overview dashboard (KPIs, charts, table)
│       ├── analytics/page.tsx  # Analytics view
│       ├── settings/page.tsx   # Settings (tabbed)
│       └── [...]/page.tsx      # Stub pages for all nav items
├── components/
│   ├── ui/                     # shadcn/ui components (40+ components)
│   ├── layout/
│   │   ├── sidebar.tsx         # Collapsible sidebar (280px ↔ 68px)
│   │   ├── header.tsx          # Top bar: breadcrumbs, search, notifications, user
│   │   └── breadcrumbs.tsx     # Auto-generated from route
│   ├── charts/
│   │   ├── chart-wrapper.tsx   # SSR-safe wrapper with loading skeleton
│   │   ├── area-chart.tsx      # Reusable area/stacked area chart
│   │   ├── bar-chart.tsx       # Bar chart (horizontal + vertical layouts)
│   │   ├── line-chart.tsx      # Multi-series line chart
│   │   ├── donut-chart.tsx     # Donut/pie with center label + legend
│   │   ├── sparkline.tsx       # Mini inline trend line
│   │   └── stat-card.tsx       # KPI card with sparkline + trend badge
│   ├── data/
│   │   ├── data-table.tsx      # TanStack Table: sort, filter, paginate
│   │   └── activity-feed.tsx   # Timestamped event feed with icons
│   ├── shared/
│   │   ├── page-header.tsx     # Page title + description + action slot
│   │   ├── loading.tsx         # Skeleton loaders matching real layouts
│   │   ├── empty-state.tsx     # Illustrated empty states
│   │   └── command-menu.tsx    # ⌘K command palette
│   └── theme/
│       ├── theme-provider.tsx  # next-themes wrapper (dark default)
│       └── theme-toggle.tsx    # Light/Dark/System switcher
├── data/mock/                  # Realistic mock data (not lorem ipsum)
├── lib/
│   ├── utils.ts                # cn(), formatCurrency, formatDate, etc.
│   ├── chart-config.ts         # Shared chart colors, tooltip, animation config
│   └── mock-data.ts            # Seeded data generators
├── hooks/
│   ├── use-sidebar.ts          # Sidebar collapse state (via Zustand)
│   ├── use-media-query.ts      # Responsive breakpoint detection
│   └── use-mock-data.ts        # Async data loading with simulated delay
├── store/
│   └── app-store.ts            # Zustand global state (persistent)
└── types/
    └── index.ts                # Shared TypeScript types
```

---

## Design System — "Obsidian"

```
Background:  oklch(0.11 ...) ≈ #09090b  — near-black, enterprise grade
Cards:       oklch(0.14 ...) ≈ #0f0f11  — 1px border
Accent:      oklch(0.62 ...) ≈ #3b82f6  — professional blue
Positive:    oklch(0.70 ...) ≈ #10b981  — emerald (up trends)
Negative:    oklch(0.64 ...) ≈ #f43f5e  — rose (down trends)
Text:        oklch(0.985 ..) ≈ #fafafa  — primary
Muted:       oklch(0.68 ..)  ≈ #a1a1aa  — secondary
```

**No gradients on backgrounds. Flat, clean, enterprise.**

Chart color palette: Blue → Emerald → Amber → Rose → Violet → Cyan

---

## Quick Start

### Prerequisites
- Node.js 20+
- npm 10+

### Install & Run

```bash
git clone https://github.com/your-username/vanguard-showcase
cd vanguard-showcase
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects to `/dashboard`.

### Build for production

```bash
npm run build
npm start
```

### Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Or click the **Deploy with Vercel** button at the top of this README.

---

## How to Fork for Your Own Project

Vanguard is designed to be **forked, not cloned**. Each fork takes ~2-3 hours to produce a polished demo.

### Step 1 — Fork and rename

```bash
git clone https://github.com/your-username/vanguard-showcase my-project-demo
cd my-project-demo
# Update package.json name field
```

### Step 2 — Replace mock data

Edit `src/lib/mock-data.ts` to match your domain:
- Change customer names, products, categories
- Adjust revenue ranges to match your target market
- Update activity event descriptions

### Step 3 — Update navigation

Edit `src/components/layout/sidebar.tsx` — change `NAV_GROUPS` to reflect your product's sections.

### Step 4 — Implement your pages

Replace the stub pages in `src/app/dashboard/*/page.tsx` with real functionality. Each page has the same pattern: `PageHeader` + data + layout.

### Step 5 — Brand it

In `src/app/globals.css`, adjust the `--primary` oklch value to your brand color. Everything cascades from there.

### Step 6 — Deploy

```bash
vercel --prod
```

---

## Tech Stack

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 16.2.1 | Framework (App Router, Turbopack) |
| `react` | 19.2.4 | UI library |
| `tailwindcss` | v4 | Styling |
| `shadcn/ui` | latest | Component library |
| `recharts` | 3.x | Charts |
| `@tanstack/react-table` | 8.x | Data tables |
| `framer-motion` | 12.x | Animations |
| `zustand` | 5.x | State management |
| `next-themes` | 0.4.x | Theme switching |
| `date-fns` | 4.x | Date formatting |
| `cmdk` | 1.x | Command palette |
| `lucide-react` | 1.x | Icons |
| `class-variance-authority` | 0.7.x | Variant styling |

---

## Quality Checklist

- [x] `npm run build` — 0 errors, 0 warnings
- [x] TypeScript strict mode — 0 errors
- [x] All routes resolve correctly
- [x] Dark mode — polished, high contrast
- [x] Light mode — clean, professional
- [x] ⌘K command palette — navigation + theme switching
- [x] Sidebar collapse — smooth Framer Motion animation
- [x] All charts animate on mount
- [x] Mock data looks realistic (real company names, amounts, dates)
- [x] Responsive: 375px, 768px, 1280px, 1920px
- [x] SSR-safe charts (no hydration mismatches)
- [x] Keyboard navigation throughout
- [x] Seeded random data (reproducible across renders)

---

## 📁 Key Files Reference

| File | What to change |
|------|---------------|
| `src/lib/mock-data.ts` | Data generators — swap for real API calls |
| `src/components/layout/sidebar.tsx` | Navigation structure |
| `src/app/dashboard/page.tsx` | Dashboard overview layout + KPI values |
| `src/app/globals.css` | CSS variables — brand colors, radius |
| `src/lib/chart-config.ts` | Chart color palette |
| `src/app/layout.tsx` | Metadata, fonts |

---

## 📄 License

MIT — use it, fork it, ship it.

---

<div align="center">
  <sub>Built with Next.js 16 + shadcn/ui + Recharts · Obsidian design system</sub>
</div>
