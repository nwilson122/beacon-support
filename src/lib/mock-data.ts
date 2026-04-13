import { subDays, subMonths, format, subHours, subMinutes, addHours } from "date-fns"
import type {
  Transaction,
  User,
  ActivityItem,
  DailyAnalytics,
  PageAnalytics,
  TrafficSource,
  DonutSegment,
  Ticket,
  Agent,
  DailyTicketMetrics,
  AgentPerformance,
  CategoryMetrics,
  TicketPriority,
  TicketStatus,
  TicketType,
  ActivityType as SupportActivityType,
} from "@/types"

// ─── Seeded random for reproducibility ────────────────────────────────────────

function seededRng(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

const rng = seededRng(42)
const rand = (min: number, max: number) => Math.floor(rng() * (max - min + 1)) + min
const randFloat = (min: number, max: number) => Number((rng() * (max - min) + min).toFixed(2))
const pick = <T>(arr: T[]): T => arr[rand(0, arr.length - 1)]

// ─── Support Agents ───────────────────────────────────────────────────────────

const AGENT_NAMES = [
  "Sarah Chen", "Marcus Rodriguez", "Elena Vasquez", "James Park", "Aria Johnson",
  "David Kumar", "Maya Patel", "Alex Thompson", "Zoe Martinez", "Ryan Support",
  "Sophia Lee", "Omar Hassan", "Jessica Wong", "Carlos Silva", "Priya Sharma",
]

const DEPARTMENTS: Agent["department"][] = ["technical", "billing", "general", "escalation"]
const AGENT_ROLES: Agent["role"][] = ["admin", "senior", "agent", "trainee"]
const AGENT_STATUSES: Agent["status"][] = ["available", "busy", "away", "offline"]

export function generateAgents(): Agent[] {
  return AGENT_NAMES.map((name, i) => {
    const totalTickets = rand(120, 580)
    const resolved = rand(Math.floor(totalTickets * 0.7), totalTickets)
    return {
      id: `AGT-${String(1000 + i).padStart(4, "0")}`,
      name,
      email: name.toLowerCase().replace(" ", ".") + "@beacon.co",
      role: pick(AGENT_ROLES),
      status: pick(AGENT_STATUSES),
      department: pick(DEPARTMENTS),
      joinedAt: format(subMonths(new Date(), rand(6, 36)), "yyyy-MM-dd"),
      lastSeen: format(subMinutes(new Date(), rand(5, 480)), "yyyy-MM-dd'T'HH:mm:ss"),
      totalTickets,
      resolvedTickets: resolved,
      avgResponseTime: randFloat(0.5, 6.2),
      avgResolutionTime: randFloat(8, 48),
      csatRating: randFloat(4.1, 4.9),
    }
  })
}

// ─── Support Customers ────────────────────────────────────────────────────────

const SUPPORT_CUSTOMERS = [
  { name: "Acme Corporation", email: "support@acme.io", domain: "acme.io" },
  { name: "TechFlow Solutions", email: "help@techflow.com", domain: "techflow.com" },
  { name: "Digital Dynamics", email: "support@digitaldynamics.io", domain: "digitaldynamics.io" },
  { name: "CloudSync Systems", email: "tickets@cloudsync.dev", domain: "cloudsync.dev" },
  { name: "DataVault Inc", email: "help@datavault.co", domain: "datavault.co" },
  { name: "NetForge Technologies", email: "support@netforge.ai", domain: "netforge.ai" },
  { name: "PixelCraft Studios", email: "help@pixelcraft.design", domain: "pixelcraft.design" },
  { name: "Simplify Logistics", email: "support@simplify.transport", domain: "simplify.transport" },
  { name: "InnovateLab", email: "tickets@innovatelab.tech", domain: "innovatelab.tech" },
  { name: "FlexiCore Systems", email: "help@flexicore.io", domain: "flexicore.io" },
  { name: "QuickScale Partners", email: "support@quickscale.co", domain: "quickscale.co" },
  { name: "BrightPath Analytics", email: "help@brightpath.data", domain: "brightpath.data" },
  { name: "Velocity Networks", email: "support@velocity.network", domain: "velocity.network" },
  { name: "NexGen Industries", email: "tickets@nexgen.industrial", domain: "nexgen.industrial" },
  { name: "Unified Platforms", email: "help@unified.platforms", domain: "unified.platforms" },
]

// ─── Support Ticket Subjects and Types ────────────────────────────────────────

const TICKET_SUBJECTS = {
  technical: [
    "API rate limiting errors in production",
    "Dashboard loading timeout after update",
    "Integration webhook not receiving events",
    "SSO authentication fails intermittently",
    "Data export functionality broken",
    "Mobile app crashes on login",
    "Email notifications not being delivered",
    "Performance degradation in search",
    "File upload fails for large attachments",
    "Database connection timeouts",
  ],
  billing: [
    "Invoice discrepancy for October billing",
    "Unable to update payment method",
    "Duplicate charges on credit card",
    "Request for usage-based pricing tier",
    "Annual contract renewal terms",
    "Tax exemption certificate submission",
    "Billing address change request",
    "Proration calculation question",
    "Credit request for service downtime",
    "Enterprise plan upgrade pricing",
  ],
  feature_request: [
    "Add multi-factor authentication support",
    "Custom dashboard widgets feature",
    "Bulk user import/export functionality",
    "Advanced reporting with custom filters",
    "Integration with Salesforce CRM",
    "Dark mode theme option",
    "Automated backup scheduling",
    "Custom branding for white-label",
    "Advanced permissions and roles",
    "Real-time collaboration features",
  ],
  question: [
    "How to set up team permissions correctly",
    "Best practices for data retention policies",
    "Understanding API usage limits",
    "Setting up automated email workflows",
    "Troubleshooting import data formatting",
    "Configuring custom domain settings",
    "User onboarding process guidance",
    "Security compliance documentation",
    "Performance optimization recommendations",
    "Integration architecture guidance",
  ],
  account: [
    "Account suspension notice received",
    "Unable to access admin panel",
    "Password reset not working",
    "Request to delete user account",
    "Change account owner information",
    "Merge duplicate accounts",
    "Account upgrade to enterprise tier",
    "Regional data residency requirements",
    "Account transfer to new organization",
    "Security audit access request",
  ],
  bug: [
    "Charts not rendering on Safari browser",
    "CSV export contains formatting errors",
    "Pagination breaks on large datasets",
    "Time zone display incorrect in reports",
    "Search filters reset unexpectedly",
    "Form validation errors not clearing",
    "Notification settings not saving",
    "Mobile layout broken on tablets",
    "Print functionality cuts off content",
    "Auto-save feature not working",
  ],
}

const PRIORITIES: TicketPriority[] = ["critical", "high", "medium", "low"]
const TICKET_STATUSES: TicketStatus[] = ["open", "in_progress", "waiting", "resolved", "closed"]
const TICKET_TYPES: TicketType[] = ["technical", "billing", "feature_request", "question", "account", "bug"]

export function generateTickets(count = 50): Ticket[] {
  const agents = generateAgents()

  return Array.from({ length: count }, (_, i) => {
    const customer = pick(SUPPORT_CUSTOMERS)
    const type = pick(TICKET_TYPES)
    const priority = pick(PRIORITIES)
    const status = pick(TICKET_STATUSES)
    const subject = pick(TICKET_SUBJECTS[type])

    const createdDaysAgo = rand(0, 45)
    const createdAt = subDays(new Date(), createdDaysAgo)

    const isAssigned = status !== "open" || rng() > 0.3
    const agent = isAssigned ? pick(agents) : undefined

    const slaHours = priority === "critical" ? 2 : priority === "high" ? 4 : priority === "medium" ? 12 : 24
    const slaBreached = createdDaysAgo * 24 > slaHours && status !== "resolved" && status !== "closed"

    const responseTime = agent && status !== "open" ? randFloat(0.1, slaHours * 1.5) : undefined
    const resolutionTime = status === "resolved" || status === "closed" ? randFloat(slaHours * 0.5, slaHours * 3) : undefined

    return {
      id: `TKT-${String(100000 + i).padStart(6, "0")}`,
      ticketNumber: `#${42000 + i}`,
      subject,
      customer: customer.name,
      customerEmail: customer.email,
      priority,
      status,
      type,
      agent: agent?.name,
      assignedAt: agent ? format(addHours(createdAt, randFloat(0.1, 2)), "yyyy-MM-dd'T'HH:mm:ss") : undefined,
      createdAt: format(createdAt, "yyyy-MM-dd'T'HH:mm:ss"),
      updatedAt: format(subHours(new Date(), rand(0, createdDaysAgo * 24)), "yyyy-MM-dd'T'HH:mm:ss"),
      resolvedAt: status === "resolved" || status === "closed" ? format(addHours(createdAt, resolutionTime || 24), "yyyy-MM-dd'T'HH:mm:ss") : undefined,
      slaBreached,
      slaTarget: slaHours,
      responseTime,
      resolutionTime,
      csat: status === "resolved" || status === "closed" ? rand(3, 5) : undefined,
    }
  })
}

// ─── Daily Ticket Metrics (30 days) ───────────────────────────────────────────

export function generateDailyTicketMetrics(): DailyTicketMetrics[] {
  return Array.from({ length: 30 }, (_, i) => {
    const date = subDays(new Date(), 29 - i)
    const baseOpened = 35 + i * 0.5
    const baseResolved = 32 + i * 0.4

    return {
      date: format(date, "MMM d"),
      ticketsOpened: baseOpened + rand(-8, 12),
      ticketsResolved: baseResolved + rand(-6, 10),
      ticketsInProgress: rand(85, 125),
      avgResponseTime: randFloat(3.8, 5.2),
      slaCompliance: randFloat(85, 95),
    }
  })
}

// ─── Tickets by Priority (Donut Chart) ────────────────────────────────────────

export const TICKETS_BY_PRIORITY: DonutSegment[] = [
  { name: "Critical", value: 8, color: "#dc2626" },    // Red
  { name: "High", value: 24, color: "#ea580c" },       // Orange
  { name: "Medium", value: 67, color: "#d97706" },     // Amber
  { name: "Low", value: 43, color: "#16a34a" },        // Green
]

// ─── Agent Performance ────────────────────────────────────────────────────────

export function generateAgentPerformance(): AgentPerformance[] {
  const agents = generateAgents()

  return agents.slice(0, 8).map(agent => ({
    agentId: agent.id,
    agentName: agent.name,
    ticketsAssigned: agent.totalTickets,
    ticketsResolved: agent.resolvedTickets,
    avgResponseTime: agent.avgResponseTime,
    avgResolutionTime: agent.avgResolutionTime,
    csatRating: agent.csatRating,
    slaCompliance: randFloat(82, 98),
  }))
}

// ─── Support Activity Feed ────────────────────────────────────────────────────

export function generateSupportActivityFeed(count = 12): ActivityItem[] {
  const supportEvents: Array<{
    type: SupportActivityType
    title: string
    desc: string
    priority?: TicketPriority
  }> = [
    { type: "ticket_created", title: "New ticket created", desc: "Login issues reported by Acme Corporation", priority: "high" },
    { type: "ticket_assigned", title: "Ticket assigned", desc: "API timeout issue assigned to Sarah Chen", priority: "medium" },
    { type: "ticket_escalated", title: "Ticket escalated", desc: "Critical billing issue escalated to Tier 2", priority: "critical" },
    { type: "ticket_resolved", title: "Ticket resolved", desc: "Dashboard performance fixed for TechFlow", priority: "high" },
    { type: "csat_received", title: "Customer feedback", desc: "5-star rating from Digital Dynamics — 'Excellent support!'" },
    { type: "ticket_created", title: "New ticket created", desc: "Feature request for bulk data export", priority: "low" },
    { type: "sla_breached", title: "SLA breach alert", desc: "Response time exceeded for CloudSync ticket", priority: "high" },
    { type: "ticket_resolved", title: "Ticket resolved", desc: "SSO integration completed for NetForge", priority: "medium" },
    { type: "csat_received", title: "Customer feedback", desc: "4-star rating from DataVault — 'Quick resolution'" },
    { type: "ticket_assigned", title: "Ticket assigned", desc: "Payment method update assigned to Marcus Rodriguez", priority: "medium" },
    { type: "ticket_created", title: "New ticket created", desc: "Mobile app crash reported by PixelCraft", priority: "high" },
    { type: "ticket_closed", title: "Ticket closed", desc: "Account permissions resolved for Simplify", priority: "low" },
  ]

  return supportEvents.slice(0, count).map((e, i) => ({
    id: `SUP-${i + 1}`,
    type: e.type,
    title: e.title,
    description: e.desc,
    timestamp: format(subMinutes(new Date(), i * 12 + rand(2, 10)), "yyyy-MM-dd'T'HH:mm:ss"),
    priority: e.priority,
    ticketId: `#${42000 + rand(1, 999)}`,
    user: {
      name: pick(AGENT_NAMES),
    },
  }))
}

// ─── Category Metrics ─────────────────────────────────────────────────────────

export const TICKET_CATEGORIES: CategoryMetrics[] = [
  { category: "Technical Issues", count: 89, percentage: 42.4, avgResolutionTime: 18.5, csatRating: 4.2 },
  { category: "Billing & Payments", count: 34, percentage: 16.2, avgResolutionTime: 12.3, csatRating: 4.6 },
  { category: "Account Management", count: 31, percentage: 14.8, avgResolutionTime: 8.7, csatRating: 4.4 },
  { category: "Feature Requests", count: 28, percentage: 13.3, avgResolutionTime: 48.2, csatRating: 4.1 },
  { category: "Bug Reports", count: 18, percentage: 8.6, avgResolutionTime: 24.1, csatRating: 4.3 },
  { category: "General Questions", count: 10, percentage: 4.8, avgResolutionTime: 6.2, csatRating: 4.7 },
]

// ─── Legacy Functions (Revenue/Transaction data for fallback) ──────────────────

export function generateRevenueData() {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ]
  const baseRevenue = [28000, 32000, 27500, 35000, 41000, 38500, 44000, 47500, 43000, 52000, 58000, 63000]
  const baseExpenses = [18000, 21000, 19500, 22000, 26000, 24000, 27500, 29000, 26000, 31000, 34000, 37000]
  return months.map((month, i) => ({
    date: month,
    revenue: baseRevenue[i] + rand(-1500, 1500),
    expenses: baseExpenses[i] + rand(-800, 800),
    profit: baseRevenue[i] - baseExpenses[i] + rand(-500, 500),
  }))
}

export function generateDailyAnalytics(): DailyAnalytics[] {
  return Array.from({ length: 30 }, (_, i) => {
    const date = subDays(new Date(), 29 - i)
    const base = 3200 + i * 180
    return {
      date: format(date, "MMM d"),
      pageViews: base + rand(-400, 600),
      uniqueVisitors: Math.floor((base + rand(-400, 600)) * 0.68),
      sessions: Math.floor((base + rand(-400, 600)) * 0.82),
      bounceRate: randFloat(32, 58),
    }
  })
}

export const REVENUE_BY_CATEGORY: DonutSegment[] = [
  { name: "SaaS Subscriptions", value: 54230, color: "#3b82f6" },
  { name: "Professional Services", value: 23870, color: "#10b981" },
  { name: "Marketplace", value: 14560, color: "#f59e0b" },
  { name: "Add-ons & Upgrades", value: 8940, color: "#8b5cf6" },
  { name: "Other", value: 3420, color: "#06b6d4" },
]

const CUSTOMERS = [
  { name: "Acme Corporation", email: "billing@acme.io" },
  { name: "Globex Systems", email: "finance@globex.com" },
  { name: "Initech LLC", email: "accounts@initech.co" },
  { name: "Umbrella Corp", email: "payments@umbrella.dev" },
  { name: "Weyland-Yutani", email: "ar@weyland.tech" },
  { name: "Oscorp Industries", email: "billing@oscorp.io" },
  { name: "Stark Enterprises", email: "ap@stark.com" },
  { name: "Wayne Enterprises", email: "finance@wayne.co" },
  { name: "Cyberdyne Systems", email: "billing@cyberdyne.ai" },
  { name: "Tyrell Corporation", email: "accounts@tyrell.io" },
  { name: "Soylent Corp", email: "billing@soylent.dev" },
  { name: "Nakatomi Trading", email: "finance@nakatomi.jp" },
  { name: "Rekall Industries", email: "ar@rekall.io" },
  { name: "Vandelay Industries", email: "billing@vandelay.com" },
  { name: "Dunder Mifflin", email: "accounts@dundermifflin.co" },
]

const DESCRIPTIONS = [
  "Enterprise Annual License",
  "Professional Seat × 12",
  "Infrastructure Top-up",
  "API Overage Charges",
  "Custom Integration Package",
  "Support Tier Upgrade",
  "White-label License",
  "Onboarding & Setup",
  "Analytics Pro Module",
  "Security Compliance Add-on",
  "SSO Configuration",
  "Data Export Tokens",
  "Priority Support Bundle",
  "Team Workspace (50 seats)",
  "Marketplace Commission",
]

const CATEGORIES: Transaction["category"][] = [
  "software", "software", "infrastructure", "marketing",
  "design", "consulting", "other",
]
const TRANSACTION_STATUSES: Transaction["status"][] = [
  "completed", "completed", "completed", "pending", "failed", "refunded",
]
const METHODS: Transaction["method"][] = ["card", "wire", "ach", "card", "card"]

export function generateTransactions(count = 50): Transaction[] {
  return Array.from({ length: count }, (_, i) => {
    const customer = pick(CUSTOMERS)
    const daysAgo = rand(0, 60)
    return {
      id: `TXN-${String(10000 + i).padStart(6, "0")}`,
      date: format(subDays(new Date(), daysAgo), "yyyy-MM-dd"),
      description: pick(DESCRIPTIONS),
      amount: randFloat(299, 24999),
      status: pick(TRANSACTION_STATUSES),
      category: pick(CATEGORIES),
      customer: customer.name,
      customerEmail: customer.email,
      method: pick(METHODS),
    }
  })
}

const FIRST_NAMES = [
  "Alex", "Jordan", "Taylor", "Morgan", "Casey", "Riley", "Quinn", "Blake",
  "Avery", "Cameron", "Sage", "Devon", "Kendall", "Skyler", "Peyton",
  "Harper", "Finley", "Rowan", "Phoenix", "River",
]
const LAST_NAMES = [
  "Chen", "Park", "Williams", "Johnson", "Martinez", "Thompson", "Garcia",
  "Anderson", "Wilson", "Moore", "Taylor", "Jackson", "White", "Harris",
  "Clark", "Lewis", "Robinson", "Walker", "Hall", "Allen",
]
const DOMAINS = ["acme.io", "globex.com", "initech.co", "stark.com", "wayne.co"]
const ROLES: User["role"][] = ["admin", "editor", "viewer", "billing"]
const STATUSES_USER: User["status"][] = ["active", "active", "active", "inactive", "pending"]
const PLANS: User["plan"][] = ["starter", "pro", "pro", "enterprise"]

export function generateUsers(count = 30): User[] {
  return Array.from({ length: count }, (_, i) => {
    const first = pick(FIRST_NAMES)
    const last = pick(LAST_NAMES)
    const domain = pick(DOMAINS)
    return {
      id: `USR-${String(1000 + i).padStart(5, "0")}`,
      name: `${first} ${last}`,
      email: `${first.toLowerCase()}.${last.toLowerCase()}@${domain}`,
      role: pick(ROLES),
      status: pick(STATUSES_USER),
      joinedAt: format(subMonths(new Date(), rand(1, 24)), "yyyy-MM-dd"),
      lastSeen: format(subHours(new Date(), rand(0, 168)), "yyyy-MM-dd'T'HH:mm:ss"),
      plan: pick(PLANS),
      revenue: randFloat(500, 48000),
    }
  })
}

export function generateActivityFeed(count = 12): ActivityItem[] {
  const events: Array<{
    type: ActivityItem["type"]
    title: string
    desc: string
  }> = [
    { type: "user_signup", title: "New user registered", desc: "alex.chen@acme.io joined Pro plan" },
    { type: "purchase", title: "New purchase", desc: "Globex Systems upgraded to Enterprise — $12,400/yr" },
    { type: "plan_upgrade", title: "Plan upgraded", desc: "Initech LLC moved from Starter → Pro" },
    { type: "refund", title: "Refund processed", desc: "$2,399 refunded to Oscorp Industries" },
    { type: "deploy", title: "Deployment succeeded", desc: "v4.2.1 deployed to production — 0 errors" },
    { type: "alert", title: "Anomaly detected", desc: "Unusual login from IP 185.220.x.x — blocked" },
    { type: "purchase", title: "New purchase", desc: "Weyland-Yutani signed Enterprise — $48,000/yr" },
    { type: "export", title: "Data exported", desc: "Full transaction export by billing@wayne.co" },
    { type: "user_signup", title: "New user registered", desc: "morgan.taylor@cyberdyne.ai joined Starter" },
    { type: "plan_upgrade", title: "Plan upgraded", desc: "Nakatomi Trading upgraded to Enterprise" },
    { type: "comment", title: "Support ticket resolved", desc: "Ticket #8842 closed — API latency issue" },
    { type: "plan_downgrade", title: "Plan downgraded", desc: "Rekall Industries moved to Starter plan" },
  ]

  return events.slice(0, count).map((e, i) => ({
    id: `ACT-${i + 1}`,
    type: e.type,
    title: e.title,
    description: e.desc,
    timestamp: format(subMinutes(new Date(), i * 18 + rand(2, 15)), "yyyy-MM-dd'T'HH:mm:ss"),
    user: {
      name: `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`,
    },
  }))
}

export const PAGE_ANALYTICS: PageAnalytics[] = [
  { path: "/dashboard", title: "Dashboard Overview", views: 24830, uniqueVisitors: 18420, avgDuration: 287, bounceRate: 22.4, change: 12.3 },
  { path: "/analytics", title: "Analytics", views: 18640, uniqueVisitors: 14290, avgDuration: 342, bounceRate: 18.7, change: 28.1 },
  { path: "/settings", title: "Settings", views: 12310, uniqueVisitors: 9840, avgDuration: 198, bounceRate: 31.2, change: -4.3 },
  { path: "/users", title: "User Management", views: 9870, uniqueVisitors: 7620, avgDuration: 412, bounceRate: 15.8, change: 18.9 },
  { path: "/billing", title: "Billing & Plans", views: 7430, uniqueVisitors: 5890, avgDuration: 264, bounceRate: 27.3, change: 6.4 },
  { path: "/reports", title: "Reports", views: 5820, uniqueVisitors: 4710, avgDuration: 518, bounceRate: 11.2, change: 41.7 },
  { path: "/integrations", title: "Integrations", views: 4290, uniqueVisitors: 3480, avgDuration: 334, bounceRate: 24.6, change: 15.2 },
  { path: "/api-keys", title: "API Keys", views: 3140, uniqueVisitors: 2820, avgDuration: 156, bounceRate: 38.9, change: -9.1 },
]

export const TRAFFIC_SOURCES: TrafficSource[] = [
  { source: "Organic Search", visitors: 38420, percentage: 42.3, change: 18.4 },
  { source: "Direct", visitors: 21840, percentage: 24.1, change: 7.2 },
  { source: "Referral", visitors: 14290, percentage: 15.7, change: 32.8 },
  { source: "Social Media", visitors: 9870, percentage: 10.9, change: -3.4 },
  { source: "Email Campaign", visitors: 4680, percentage: 5.2, change: 22.1 },
  { source: "Paid Search", visitors: 1760, percentage: 1.9, change: -11.7 },
]

export function generateTopPagesBarData() {
  return PAGE_ANALYTICS.slice(0, 6).map((p) => ({
    page: p.title.replace(" Overview", "").replace(" Management", ""),
    views: p.views,
    visitors: p.uniqueVisitors,
  }))
}