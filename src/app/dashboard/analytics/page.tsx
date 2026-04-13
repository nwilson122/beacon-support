"use client"

import { useMemo } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { PageHeader } from "@/components/shared/page-header"
import { LineChart } from "@/components/charts/line-chart"
import { BarChart } from "@/components/charts/bar-chart"
import { DataTable } from "@/components/data/data-table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { TrendingUp, TrendingDown, Globe, Clock, Minus } from "lucide-react"
import {
  generateDailyAnalytics,
  generateTopPagesBarData,
  PAGE_ANALYTICS,
  TRAFFIC_SOURCES,
} from "@/lib/mock-data"
import { formatNumber, formatPercent } from "@/lib/utils"
import type { PageAnalytics } from "@/types"
import { cn } from "@/lib/utils"
import { CHART_HEX } from "@/lib/chart-config"

// ─── Page Analytics Table Columns ────────────────────────────────────────────

const pageColumns: ColumnDef<PageAnalytics>[] = [
  {
    accessorKey: "title",
    header: "Page",
    cell: ({ row }) => (
      <div>
        <div className="font-medium text-xs text-foreground">{row.original.title}</div>
        <div className="text-[11px] text-muted-foreground font-mono">{row.original.path}</div>
      </div>
    ),
  },
  {
    accessorKey: "views",
    header: "Views",
    cell: ({ getValue }) => (
      <span className="font-mono text-xs tabular-nums">{formatNumber(Number(getValue()))}</span>
    ),
  },
  {
    accessorKey: "uniqueVisitors",
    header: "Unique",
    cell: ({ getValue }) => (
      <span className="font-mono text-xs tabular-nums text-muted-foreground">{formatNumber(Number(getValue()))}</span>
    ),
  },
  {
    accessorKey: "avgDuration",
    header: "Avg. Time",
    cell: ({ getValue }) => {
      const secs = Number(getValue())
      const m = Math.floor(secs / 60)
      const s = secs % 60
      return (
        <span className="text-xs text-muted-foreground tabular-nums font-mono">
          {m}m {s}s
        </span>
      )
    },
  },
  {
    accessorKey: "bounceRate",
    header: "Bounce",
    cell: ({ getValue }) => (
      <span className="text-xs text-muted-foreground tabular-nums">{Number(getValue()).toFixed(1)}%</span>
    ),
  },
  {
    accessorKey: "change",
    header: "Change",
    cell: ({ getValue }) => {
      const v = Number(getValue())
      const Icon = v > 0 ? TrendingUp : v < 0 ? TrendingDown : Minus
      return (
        <span className={cn("flex items-center gap-1 text-xs font-medium tabular-nums",
          v > 0 ? "text-emerald-500" : v < 0 ? "text-rose-500" : "text-muted-foreground"
        )}>
          <Icon className="size-3" />
          {formatPercent(v)}
        </span>
      )
    },
  },
]

// ─── Analytics Page ──────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const dailyData = useMemo(() => generateDailyAnalytics(), [])
  const topPages = useMemo(() => generateTopPagesBarData(), [])
  const totalViews = PAGE_ANALYTICS.reduce((s, p) => s + p.views, 0)
  const totalVisitors = PAGE_ANALYTICS.reduce((s, p) => s + p.uniqueVisitors, 0)
  const avgBounce = (PAGE_ANALYTICS.reduce((s, p) => s + p.bounceRate, 0) / PAGE_ANALYTICS.length).toFixed(1)

  // Summary cards
  const summaryStats = [
    { label: "Total Page Views", value: formatNumber(totalViews), sub: "+18.4% vs last period", up: true, icon: Globe },
    { label: "Unique Visitors", value: formatNumber(totalVisitors), sub: "+12.7% vs last period", up: true, icon: TrendingUp },
    { label: "Avg. Bounce Rate", value: `${avgBounce}%`, sub: "-3.2% vs last period", up: false, icon: TrendingDown },
    { label: "Avg. Session Time", value: "4m 12s", sub: "+28s vs last period", up: true, icon: Clock },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        description="Detailed traffic analysis and user behavior insights for the last 30 days."
      >
        <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
          Last 30 days
        </Button>
      </PageHeader>

      {/* ── Summary KPIs ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryStats.map((s, i) => (
          <Card
            key={s.label}
            className="border-border/60 animate-fade-in-up"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{s.label}</p>
                <s.icon className="size-3.5 text-muted-foreground/50" />
              </div>
              <p className="text-xl font-bold font-mono tabular-nums">{s.value}</p>
              <p className={cn("text-[11px] mt-1", s.up ? "text-emerald-500" : "text-rose-500")}>{s.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Page Views / Visitors Line Chart ── */}
      <Card className="border-border/60 animate-fade-in-up delay-200">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-sm font-semibold">Traffic Over Time</CardTitle>
              <CardDescription className="text-xs mt-0.5">Daily page views vs. unique visitors (last 30 days)</CardDescription>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-blue-500" />
                Page Views
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-emerald-500" />
                Unique Visitors
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-2 pb-4 pr-2">
          <LineChart
            data={dailyData}
            xKey="date"
            series={[
              { key: "pageViews", name: "Page Views", color: CHART_HEX.blue },
              { key: "uniqueVisitors", name: "Unique Visitors", color: CHART_HEX.emerald },
            ]}
            height={280}
            formatY={(v) => formatNumber(v, true)}
            formatTooltip={(v) => formatNumber(v)}
            showLegend={false}
          />
        </CardContent>
      </Card>

      {/* ── Top Pages + Traffic Sources ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages Bar Chart */}
        <Card className="border-border/60 animate-fade-in-up delay-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Top Pages by Views</CardTitle>
            <CardDescription className="text-xs">Most visited pages this period</CardDescription>
          </CardHeader>
          <CardContent className="pt-2 pb-4 pr-2">
            <BarChart
              data={topPages}
              xKey="page"
              series={[
                { key: "views", name: "Page Views", color: CHART_HEX.blue },
                { key: "visitors", name: "Unique Visitors", color: CHART_HEX.emerald },
              ]}
              height={240}
              formatY={(v) => formatNumber(v, true)}
              formatTooltip={(v) => formatNumber(v)}
              showLegend={true}
            />
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card className="border-border/60 animate-fade-in-up delay-400">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Traffic Sources</CardTitle>
            <CardDescription className="text-xs">Where your visitors are coming from</CardDescription>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            {TRAFFIC_SOURCES.map((src, i) => (
              <div key={src.source}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-foreground">{src.source}</span>
                  <div className="flex items-center gap-3">
                    <span className={cn("text-[11px] font-medium flex items-center gap-0.5",
                      src.change > 0 ? "text-emerald-500" : "text-rose-500"
                    )}>
                      {src.change > 0 ? <TrendingUp className="size-2.5" /> : <TrendingDown className="size-2.5" />}
                      {Math.abs(src.change).toFixed(1)}%
                    </span>
                    <span className="text-xs font-mono tabular-nums text-muted-foreground w-16 text-right">
                      {formatNumber(src.visitors)}
                    </span>
                  </div>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-1000"
                    style={{
                      width: `${src.percentage}%`,
                      opacity: 0.7 + (i === 0 ? 0.3 : 0),
                    }}
                  />
                </div>
                <p className="text-[10px] text-muted-foreground/60 mt-1">{src.percentage.toFixed(1)}% of total</p>
                {i < TRAFFIC_SOURCES.length - 1 && <Separator className="mt-3 opacity-30" />}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* ── Detailed Page Analytics Table ── */}
      <Card className="border-border/60 animate-fade-in-up delay-500">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Page Analytics</CardTitle>
          <CardDescription className="text-xs">Detailed metrics for all tracked pages</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <DataTable
            columns={pageColumns}
            data={PAGE_ANALYTICS}
            searchKey="title"
            searchPlaceholder="Search pages..."
          />
        </CardContent>
      </Card>
    </div>
  )
}
