"use client"

import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkline } from "@/components/charts/sparkline"
import { cn } from "@/lib/utils"
import type { StatCard as StatCardType } from "@/types"

// Icon map for string-based icon names
import {
  DollarSign, Users, CreditCard, Activity, BarChart3,
  Globe, Zap, ShoppingCart, Package, TrendingUp as TrendUp,
} from "lucide-react"

const ICONS: Record<string, React.ElementType> = {
  DollarSign, Users, CreditCard, Activity, BarChart3,
  Globe, Zap, ShoppingCart, Package, TrendingUp: TrendUp,
}

interface StatCardProps {
  stat: StatCardType
  className?: string
  animationDelay?: number
}

const TREND_ICON = {
  up: TrendingUp,
  down: TrendingDown,
  neutral: Minus,
}

const TREND_COLOR = {
  up: "text-emerald-500",
  down: "text-rose-500",
  neutral: "text-muted-foreground",
}

const TREND_BG = {
  up: "bg-emerald-500/10",
  down: "bg-rose-500/10",
  neutral: "bg-muted",
}

export function StatCard({ stat, className, animationDelay = 0 }: StatCardProps) {
  const TrendIcon = TREND_ICON[stat.trend]
  const Icon = ICONS[stat.icon] ?? Activity

  return (
    <Card
      className={cn(
        "group relative overflow-hidden border-border/60 bg-card transition-all duration-200",
        "hover:-translate-y-0.5 hover:border-border hover:shadow-lg hover:shadow-black/10",
        "animate-fade-in-up",
        className
      )}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
              {stat.title}
            </p>
            <p className="text-2xl font-bold font-mono tabular-nums tracking-tight text-foreground">
              {stat.value}
            </p>
            <div className="mt-2 flex items-center gap-1.5">
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11px] font-semibold",
                  TREND_BG[stat.trend],
                  TREND_COLOR[stat.trend]
                )}
              >
                <TrendIcon className="size-2.5" />
                {Math.abs(stat.change).toFixed(1)}%
              </span>
              <span className="text-[11px] text-muted-foreground">{stat.changeLabel}</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-3">
            <div
              className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-lg",
                "bg-primary/10 text-primary"
              )}
            >
              <Icon className="size-4" />
            </div>
          </div>
        </div>

        {/* Sparkline */}
        <div className="mt-3 -mx-1">
          <Sparkline data={stat.sparkline} trend={stat.trend} height={36} />
        </div>
      </CardContent>
    </Card>
  )
}
