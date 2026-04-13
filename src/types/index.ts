// ─── Navigation ──────────────────────────────────────────────────────────────

export interface NavItem {
  title: string
  href: string
  icon?: string
  badge?: string | number
  disabled?: boolean
  external?: boolean
}

export interface NavGroup {
  title?: string
  items: NavItem[]
}

// ─── KPI / Stats ─────────────────────────────────────────────────────────────

export interface StatCard {
  id: string
  title: string
  value: string
  rawValue: number
  change: number
  changeLabel: string
  icon: string
  trend: "up" | "down" | "neutral"
  sparkline: number[]
  prefix?: string
  suffix?: string
}

// ─── Charts ──────────────────────────────────────────────────────────────────

export interface ChartDataPoint {
  date: string
  [key: string]: string | number
}

export interface DonutSegment {
  name: string
  value: number
  color: string
}

// ─── Support Tickets ────────────────────────────────────────────────────────

export type TicketStatus = "open" | "in_progress" | "waiting" | "resolved" | "closed"
export type TicketPriority = "critical" | "high" | "medium" | "low"
export type TicketType = "bug" | "feature_request" | "question" | "billing" | "technical" | "account"

export interface Ticket {
  id: string
  ticketNumber: string
  subject: string
  description?: string
  customer: string
  customerEmail: string
  priority: TicketPriority
  status: TicketStatus
  type: TicketType
  agent?: string
  assignedAt?: string
  createdAt: string
  updatedAt: string
  resolvedAt?: string
  slaBreached: boolean
  slaTarget: number // hours
  responseTime?: number // hours
  resolutionTime?: number // hours
  csat?: number // 1-5 rating
}

// ─── Support Agents ──────────────────────────────────────────────────────────

export type AgentRole = "admin" | "senior" | "agent" | "trainee"
export type AgentStatus = "available" | "busy" | "away" | "offline"

export interface Agent {
  id: string
  name: string
  email: string
  role: AgentRole
  status: AgentStatus
  avatar?: string
  joinedAt: string
  lastSeen: string
  department: "technical" | "billing" | "general" | "escalation"
  totalTickets: number
  resolvedTickets: number
  avgResponseTime: number // hours
  avgResolutionTime: number // hours
  csatRating: number // average
}

// ─── Analytics ───────────────────────────────────────────────────────────────

export interface PageAnalytics extends Record<string, string | number> {
  path: string
  title: string
  views: number
  uniqueVisitors: number
  avgDuration: number
  bounceRate: number
  change: number
}

export interface TrafficSource {
  source: string
  visitors: number
  percentage: number
  change: number
}

export interface DailyAnalytics extends Record<string, string | number> {
  date: string
  pageViews: number
  uniqueVisitors: number
  sessions: number
  bounceRate: number
}

// ─── Support Analytics ────────────────────────────────────────────────────────

export interface DailyTicketMetrics extends Record<string, string | number> {
  date: string
  ticketsOpened: number
  ticketsResolved: number
  ticketsInProgress: number
  avgResponseTime: number
  slaCompliance: number
}

export interface AgentPerformance {
  agentId: string
  agentName: string
  ticketsAssigned: number
  ticketsResolved: number
  avgResponseTime: number
  avgResolutionTime: number
  csatRating: number
  slaCompliance: number
}

export interface CategoryMetrics {
  category: string
  count: number
  percentage: number
  avgResolutionTime: number
  csatRating: number
}

// ─── Activity Feed ────────────────────────────────────────────────────────────

export type ActivityType =
  | "ticket_created"
  | "ticket_assigned"
  | "ticket_escalated"
  | "ticket_resolved"
  | "ticket_closed"
  | "csat_received"
  | "sla_breached"
  | "agent_status_change"
  | "comment_added"
  | "priority_changed"
  | "user_signup"
  | "purchase"
  | "refund"
  | "plan_upgrade"
  | "plan_downgrade"
  | "export"
  | "alert"
  | "deploy"
  | "comment"

export interface ActivityItem {
  id: string
  type: ActivityType
  title: string
  description: string
  timestamp: string
  user?: {
    name: string
    avatar?: string
  }
  metadata?: Record<string, string | number>
  ticketId?: string
  priority?: TicketPriority
}

// ─── Legacy Types (kept for compatibility) ────────────────────────────────────

export type TransactionStatus = "completed" | "pending" | "failed" | "refunded"
export type TransactionCategory =
  | "software"
  | "marketing"
  | "infrastructure"
  | "design"
  | "consulting"
  | "other"

export interface Transaction {
  id: string
  date: string
  description: string
  amount: number
  status: TransactionStatus
  category: TransactionCategory
  customer: string
  customerEmail: string
  method: "card" | "wire" | "ach" | "crypto"
}

export type UserRole = "admin" | "editor" | "viewer" | "billing"
export type UserStatus = "active" | "inactive" | "pending" | "suspended"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  avatar?: string
  joinedAt: string
  lastSeen: string
  plan: "starter" | "pro" | "enterprise"
  revenue: number
}

// ─── Global App State ─────────────────────────────────────────────────────────

export interface AppState {
  sidebarCollapsed: boolean
  setSidebarCollapsed: (collapsed: boolean) => void
  toggleSidebar: () => void
  commandMenuOpen: boolean
  setCommandMenuOpen: (open: boolean) => void
}