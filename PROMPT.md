# Vanguard Showcase — Premium Shared Template

> This is the shared starter template for rapidly building portfolio prototype demos.
> Every prototype built from this template should look like a $50k enterprise product.

## Goal

Create a **premium, production-grade Next.js dashboard template** that can be forked/adapted to build 10+ different portfolio demo projects in 2-3 hours each. The template itself must be polished enough that JUST the template would impress a CTO.

## Tech Stack (non-negotiable)

| Layer | Choice | Version |
|-------|--------|---------|
| Framework | Next.js | 16 (App Router, React 19) |
| Language | TypeScript | 5 |
| Styling | Tailwind CSS | v4 |
| UI Components | shadcn/ui | Latest (copy-paste, not npm) |
| Charts | Recharts (via shadcn/ui charts) + Tremor raw components | Latest |
| Icons | Lucide React | Latest |
| State | Zustand | Latest |
| Data tables | TanStack Table | Latest |
| Animations | Framer Motion | Latest |
| Command palette | cmdk (via shadcn) | Latest |
| Date handling | date-fns | Latest |
| Deploy | Vercel-ready | Zero config |

## Architecture

```
src/
├── app/
│   ├── layout.tsx              # Root layout with sidebar + theme
│   ├── page.tsx                # Dashboard home (redirect to /dashboard)
│   ├── dashboard/
│   │   ├── layout.tsx          # Dashboard shell (sidebar + header)
│   │   ├── page.tsx            # Overview/home dashboard
│   │   ├── analytics/
│   │   │   └── page.tsx        # Analytics view
│   │   └── settings/
│   │       └── page.tsx        # Settings page
│   └── globals.css
├── components/
│   ├── ui/                     # shadcn/ui components (DO NOT MODIFY)
│   ├── layout/
│   │   ├── sidebar.tsx         # Collapsible sidebar with nav groups
│   │   ├── header.tsx          # Top bar with search, notifications, user menu
│   │   ├── breadcrumbs.tsx     # Auto breadcrumbs from route
│   │   └── mobile-nav.tsx      # Mobile hamburger menu
│   ├── charts/
│   │   ├── area-chart.tsx      # Reusable area chart wrapper
│   │   ├── bar-chart.tsx       # Reusable bar chart wrapper
│   │   ├── line-chart.tsx      # Reusable line chart wrapper
│   │   ├── donut-chart.tsx     # Reusable donut/pie chart wrapper
│   │   ├── sparkline.tsx       # Mini inline sparkline
│   │   └── stat-card.tsx       # KPI card with sparkline + trend
│   ├── data/
│   │   ├── data-table.tsx      # TanStack table with sort/filter/pagination
│   │   ├── data-card.tsx       # Card view for data items
│   │   └── empty-state.tsx     # Beautiful empty states
│   ├── shared/
│   │   ├── page-header.tsx     # Page title + description + actions
│   │   ├── loading.tsx         # Skeleton loaders
│   │   ├── error-boundary.tsx  # Error display
│   │   └── command-menu.tsx    # ⌘K command palette
│   └── theme/
│       ├── theme-provider.tsx  # Dark/light/system theme
│       └── theme-toggle.tsx    # Theme switcher
├── data/
│   └── mock/                   # Mock data JSON files
│       ├── dashboard.json
│       ├── users.json
│       ├── analytics.json
│       └── transactions.json
├── lib/
│   ├── utils.ts                # cn() helper, formatters
│   ├── mock-data.ts            # Data generators using faker-like patterns
│   └── chart-config.ts         # Shared chart theme/colors
├── hooks/
│   ├── use-sidebar.ts          # Sidebar collapse state
│   ├── use-media-query.ts      # Responsive breakpoints
│   └── use-mock-data.ts        # Hook to load mock data with simulated delay
├── store/
│   └── app-store.ts            # Zustand global state
└── types/
    └── index.ts                # Shared TypeScript types
```

## Design System

### Theme: "Obsidian"
- **Dark mode default** (toggle to light)
- Background: Near-black (#09090b) with subtle noise texture
- Cards: Slightly lighter (#0f0f11) with 1px border (#1f1f23)
- Accent: Vibrant blue (#3b82f6) — professional, not playful
- Secondary accent: Emerald (#10b981) for positive metrics
- Destructive: Rose (#f43f5e) for negative/alerts
- Text: White (#fafafa) primary, muted (#a1a1aa) secondary
- **NO gradients on backgrounds.** Flat, clean, enterprise.

### Typography
- Headings: `font-semibold` (not bold), tracking-tight
- Body: System font stack (Geist Sans if available)
- Monospace: Geist Mono for code/numbers
- Sizes: Conservative — h1: 2xl, h2: xl, h3: lg, body: sm

### Spacing & Layout
- Sidebar: 280px expanded, 68px collapsed (icon-only)
- Content max-width: 1400px, centered
- Card grid: CSS Grid, responsive (1 col mobile, 2 tablet, 3-4 desktop)
- Generous padding: p-6 on cards, gap-6 on grids
- Border radius: rounded-xl on cards, rounded-lg on buttons

### Charts Theme
- All charts use consistent color palette
- Colors: Blue (#3b82f6), Emerald (#10b981), Amber (#f59e0b), Rose (#f43f5e), Violet (#8b5cf6), Cyan (#06b6d4)
- Grid lines: Very subtle (#1f1f23)
- Tooltips: Dark card style matching theme
- Animations: Smooth entry animations on mount
- Responsive: Charts resize gracefully

### Interactions
- Sidebar items: Subtle hover bg, active state with accent left border
- Cards: Subtle hover lift (translate-y -1px) + border glow
- Buttons: Scale down slightly on press (active:scale-[0.98])
- Page transitions: Fade-in-up on route change
- Skeleton loading: Pulse animation matching card layout

## Pre-built Dashboard Page

The default `/dashboard` page should be a **beautiful overview** with:

### Row 1: KPI Stats (4 cards)
- Total Revenue ($45,231.89, +20.1% from last month)
- Active Users (2,350, +180.1% from last month)  
- Subscriptions (+12,234, +19% from last month)
- Active Now (573, +201 since last hour)

Each card: Icon, title, big number, sparkline, trend badge (green up / red down)

### Row 2: Charts (2 columns)
- **Left (2/3 width):** Area chart — Revenue over time (last 12 months)
- **Right (1/3 width):** Donut chart — Revenue by category

### Row 3: Data Table + Activity
- **Left (2/3 width):** Recent transactions table (sortable, filterable, paginated)
- **Right (1/3 width):** Recent activity feed (avatar + action + timestamp)

### Analytics Page
- Line chart: Page views vs unique visitors (last 30 days)
- Bar chart: Top pages by views
- Horizontal bar: Traffic sources
- Table: Detailed page analytics

## What Makes This Template Special

1. **Every component is a wrapper.** Charts, tables, cards — all wrapped with consistent styling. Forking a new project = swap the data, change the title.

2. **Mock data is realistic.** Not "Lorem ipsum" — real-looking business data with proper formatting (currency, percentages, dates).

3. **It's FAST.** Next.js App Router, Server Components where possible, minimal client JS. Lighthouse 95+.

4. **It's accessible.** WCAG 2.1 AA. Keyboard navigation. Screen reader labels. Color contrast checked.

5. **It deploys in one click.** `vercel deploy` and done. No env vars needed for the demo.

## README Template

The README should include:
- Hero screenshot (placeholder for now)
- Feature list with emojis
- Tech stack badges
- Quick start instructions
- File structure overview
- "How to fork for your own project" section
- Deploy to Vercel button
- License: MIT

## Build Instructions

1. Initialize with `npx create-next-app@latest` (App Router, TypeScript, Tailwind, ESLint)
2. Install shadcn/ui: `npx shadcn@latest init` (New York style, neutral theme)
3. Add shadcn components: button, card, badge, avatar, dropdown-menu, sheet, dialog, command, table, tabs, input, select, separator, skeleton, tooltip, popover, calendar, scroll-area, sidebar
4. Install additional: `recharts`, `@tremor/react`, `zustand`, `@tanstack/react-table`, `framer-motion`, `lucide-react`, `date-fns`, `cmdk`
5. Build the layout shell (sidebar + header)
6. Build chart wrappers
7. Build the dashboard page
8. Build the analytics page
9. Add the command palette
10. Add theme toggle
11. Polish animations, loading states, responsive
12. Write README
13. Verify clean build, deploy to Vercel

## Quality Bar

Before this template is "done":
- [ ] `npm run build` — 0 errors, 0 warnings
- [ ] Lighthouse: 95+ Performance, 100 Accessibility
- [ ] Responsive: Looks great on 375px, 768px, 1280px, 1920px
- [ ] Dark/light mode both look polished
- [ ] ⌘K command palette works
- [ ] Sidebar collapses gracefully
- [ ] All charts animate on mount
- [ ] Mock data looks realistic
- [ ] README is comprehensive
- [ ] Git history is clean (not one giant commit)
