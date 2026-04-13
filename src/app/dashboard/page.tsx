"use client"

import { useMemo } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/charts/stat-card"
import { LineChart } from "@/components/charts/line-chart"
import { DonutChart } from "@/components/charts/donut-chart"
import { DataTable } from "@/components/data/data-table"
import { ActivityFeed } from "@/components/data/activity-feed"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, RefreshCw, Calendar, Clock, AlertTriangle, CheckCircle2, XCircle, MessageSquare } from "lucide-react"
import {
  generateDailyTicketMetrics,
  generateTickets,
  generateSupportActivityFeed,
  TICKETS_BY_PRIORITY,
} from "@/lib/mock-data"
import { formatDate, formatRelativeTime } from "@/lib/utils"
import type { StatCard as StatCardType, Ticket } from "@/types"
import { cn } from "@/lib/utils"

// ─── Support KPI Data ──────────────────────────────────────────────────────

const SUPPORT_KPI_STATS: StatCardType[] = [
  {
    id: "open-tickets",
    title: "Open Tickets",
    value: "142",
    rawValue: 142,
    change: -8,
    changeLabel: "vs last week",
    icon: "Headphones",
    trend: "up", // Fewer open tickets is good, so trend up despite negative change
    sparkline: [158, 162, 155, 148, 151, 147, 145, 139, 142, 144, 146, 142],
  },
  {
    id: "avg-response",
    title: "Avg Response Time",
    value: "4.2h",
    rawValue: 4.2,
    change: -1.1,
    changeLabel: "vs last month",
    icon: "Clock",
    trend: "up", // Lower response time is good
    sparkline: [5.8, 5.3, 4.9, 5.1, 4.7, 4.5, 4.8, 4.3, 4.1, 4.0, 4.4, 4.2],
  },
  {
    id: "resolution-rate",
    title: "Resolution Rate",
    value: "89%",
    rawValue: 89,
    change: 3,
    changeLabel: "vs last month",
    icon: "CheckCircle",
    trend: "up",
    sparkline: [84, 85, 86, 87, 86, 88, 87, 89, 88, 90, 89, 89],
  },
  {
    id: "csat-score",
    title: "CSAT Score",
    value: "4.4/5",
    rawValue: 4.4,
    change: 0.3,
    changeLabel: "vs last quarter",
    icon: "Star",
    trend: "up",
    sparkline: [4.1, 4.0, 4.2, 4.3, 4.2, 4.4, 4.3, 4.5, 4.4, 4.6, 4.5, 4.4],
  },
]

// ─── Ticket Queue Table Columns ────────────────────────────────────────────

const PRIORITY_STYLES: Record<Ticket["priority"], { label: string; className: string; icon: React.ElementType }> = {
  critical: { label: "Critical", className: "bg-red-500/10 text-red-500 border-red-500/20", icon: AlertTriangle },
  high: { label: "High", className: "bg-orange-500/10 text-orange-500 border-orange-500/20", icon: AlertTriangle },
  medium: { label: "Medium", className: "bg-amber-500/10 text-amber-600 border-amber-500/20", icon: Clock },
  low: { label: "Low", className: "bg-green-500/10 text-green-600 border-green-500/20", icon: CheckCircle2 },
}

const STATUS_STYLES: Record<Ticket["status"], { label: string; className: string }> = {
  open: { label: "Open", className: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
  in_progress: { label: "In Progress", className: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
  waiting: { label: "Waiting", className: "bg-purple-500/10 text-purple-500 border-purple-500/20" },
  resolved: { label: "Resolved", className: "bg-green-500/10 text-green-600 border-green-500/20" },
  closed: { label: "Closed", className: "bg-slate-500/10 text-slate-500 border-slate-500/20" },
}

const ticketColumns: ColumnDef<Ticket>[] = [
  {
    accessorKey: "ticketNumber",
    header: "Ticket #",
    cell: ({ row }) => (
      <div className="font-mono text-xs text-foreground font-medium">
        {row.original.ticketNumber}
      </div>
    ),
  },
  {
    accessorKey: "subject",
    header: "Subject",
    cell: ({ row }) => (
      <div className="max-w-[300px]">
        <div className="font-medium text-foreground text-xs truncate">{row.original.subject}</div>
        <div className="text-[11px] text-muted-foreground">{row.original.type.replace('_', ' ')}</div>
      </div>
    ),
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => (
      <div>
        <div className="font-medium text-foreground text-xs">{row.original.customer}</div>
        <div className="text-[11px] text-muted-foreground">{row.original.customerEmail}</div>
      </div>
    ),
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ getValue }) => {
      const priority = getValue() as Ticket["priority"]
      const cfg = PRIORITY_STYLES[priority]
      const Icon = cfg.icon
      return (
        <Badge variant="outline" className={cn("text-[10px] font-medium h-5 px-1.5 border gap-1", cfg.className)}>
          <Icon className="size-3" />
          {cfg.label}
        </Badge>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue() as Ticket["status"]
      const cfg = STATUS_STYLES[status]
      return (
        <Badge variant="outline" className={cn("text-[10px] font-medium h-5 px-1.5 border", cfg.className)}>
          {cfg.label}
        </Badge>
      )
    },
  },
  {
    accessorKey: "agent",
    header: "Agent",
    cell: ({ getValue, row }) => {
      const agent = getValue() as string | undefined
      return (
        <span className="text-xs text-muted-foreground">
          {agent || (
            <span className="text-amber-500 italic">Unassigned</span>
          )}
        </span>
      )
    },
  },
  {
    accessorKey: "slaBreached",
    header: "SLA",
    cell: ({ getValue, row }) => {
      const breached = getValue() as boolean
      const target = row.original.slaTarget
      return (
        <div className="flex items-center gap-1">
          {breached ? (
            <Badge variant="outline" className="text-[10px] font-medium h-5 px-1.5 border bg-red-500/10 text-red-500 border-red-500/20 gap-1">
              <XCircle className="size-3" />
              Breached
            </Badge>
          ) : (
            <span className="text-[11px] text-muted-foreground">{target}h target</span>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ getValue }) => (
      <span className="text-xs text-muted-foreground tabular-nums">
        {formatRelativeTime(String(getValue()))}
      </span>
    ),
  },
]

// ─── Dashboard Page ───────────────────────────────────────────────────────────

export default function DashboardPage() {
  const ticketMetrics = useMemo(() => generateDailyTicketMetrics(), [])
  const tickets = useMemo(() => generateTickets(25), [])
  const activityFeed = useMemo(() => generateSupportActivityFeed(12), [])
  const priorityTotal = TICKETS_BY_PRIORITY.reduce((s, d) => s + d.value, 0)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Support Intelligence"
        description="Monitor ticket volumes, team performance, and customer satisfaction in real-time."
      >
        <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
          <Calendar className="size-3.5" />
          Last 30 days
        </Button>
        <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
          <Download className="size-3.5" />
          Export
        </Button>
        <Button size="sm" className="h-8 gap-1.5 text-xs">
          <RefreshCw className="size-3.5" />
          Refresh
        </Button>
      </PageHeader>

      {/* ── Row 1: KPI Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {SUPPORT_KPI_STATS.map((stat, i) => (
          <StatCard key={stat.id} stat={stat} animationDelay={i * 80} />
        ))}
      </div>

      {/* ── Row 2: Ticket Metrics Charts ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tickets Opened vs Resolved Line Chart */}
        <Card className="lg:col-span-2 border-border/60 animate-fade-in-up delay-300">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="text-sm font-semibold">Ticket Volume Trends</CardTitle>
                <CardDescription className="text-xs mt-0.5">Daily tickets opened vs. resolved over the last 30 days</CardDescription>
              </div>
              <Tabs defaultValue="volume" className="shrink-0">
                <TabsList className="h-7 p-0.5">
                  <TabsTrigger value="volume" className="text-[11px] h-6 px-2.5">Volume</TabsTrigger>
                  <TabsTrigger value="sla" className="text-[11px] h-6 px-2.5">SLA</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="pt-2 pb-4 pr-2">
            <LineChart
              data={ticketMetrics}
              xKey="date"
              series={[
                { key: "ticketsOpened", name: "Opened", color: "#f59e0b" },
                { key: "ticketsResolved", name: "Resolved", color: "#10b981" },
              ]}
              height={260}
              formatY={(v) => v.toString()}
            />
          </CardContent>
        </Card>

        {/* Tickets by Priority Donut */}
        <Card className="border-border/60 animate-fade-in-up delay-400">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Tickets by Priority</CardTitle>
            <CardDescription className="text-xs">
              {priorityTotal} active tickets
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0 pb-4">
            <DonutChart
              data={TICKETS_BY_PRIORITY}
              height={200}
              innerRadius={65}
              outerRadius={90}
              formatValue={(v) => v.toString()}
              centerValue={priorityTotal.toString()}
              centerLabel="Total"
            />
          </CardContent>
        </Card>
      </div>

      {/* ── Row 3: Ticket Queue + Activity ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ticket Queue */}
        <Card className="lg:col-span-2 border-border/60 animate-fade-in-up delay-400">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold">Ticket Queue</CardTitle>
                <CardDescription className="text-xs mt-0.5">
                  Most recent {tickets.length} tickets across all priorities
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground">
                View all
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <DataTable
              columns={ticketColumns}
              data={tickets}
              searchKey="customer"
              searchPlaceholder="Search tickets..."
            />
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card className="border-border/60 animate-fade-in-up delay-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">Support Activity</CardTitle>
              <span className="text-[10px] font-medium text-muted-foreground bg-muted rounded-full px-2 py-0.5">
                Live
              </span>
            </div>
            <CardDescription className="text-xs">Real-time support events and updates</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <ActivityFeed items={activityFeed} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}