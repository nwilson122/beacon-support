"use client"

import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { CHART_HEX_ARRAY, CHART_THEME, ANIMATION_CONFIG } from "@/lib/chart-config"
import { ChartWrapper } from "@/components/charts/chart-wrapper"
import { cn } from "@/lib/utils"

interface AreaChartProps {
  data: Record<string, string | number>[]
  series: { key: string; name: string; color?: string }[]
  xKey: string
  height?: number
  className?: string
  formatY?: (value: number) => string
  formatTooltip?: (value: number, name: string) => string
  stacked?: boolean
  showLegend?: boolean
  showGrid?: boolean
}

export function AreaChart({
  data, series, xKey, height = 300, className,
  formatY, formatTooltip, stacked = false,
  showLegend = true, showGrid = true,
}: AreaChartProps) {
  return (
    <ChartWrapper height={height} className={className}>
      <div className={cn("w-full", className)} style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsAreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <defs>
              {series.map((s, i) => {
                const color = s.color ?? CHART_HEX_ARRAY[i % CHART_HEX_ARRAY.length]
                return (
                  <linearGradient key={s.key} id={`gradient-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.18} />
                    <stop offset="95%" stopColor={color} stopOpacity={0.02} />
                  </linearGradient>
                )
              })}
            </defs>
            {showGrid && (
              <CartesianGrid strokeDasharray={CHART_THEME.grid.strokeDasharray}
                stroke={CHART_THEME.grid.stroke} opacity={CHART_THEME.grid.opacity} vertical={false} />
            )}
            <XAxis dataKey={xKey} tick={CHART_THEME.axis.tick} axisLine={false} tickLine={false} tickMargin={8} />
            <YAxis tick={CHART_THEME.axis.tick} axisLine={false} tickLine={false}
              tickMargin={8} tickFormatter={formatY} width={60} />
            <Tooltip
              contentStyle={CHART_THEME.tooltip.contentStyle}
              labelStyle={CHART_THEME.tooltip.labelStyle}
              itemStyle={CHART_THEME.tooltip.itemStyle}
              formatter={formatTooltip ? (val, name) => [formatTooltip(Number(val), String(name)), name] : undefined}
            />
            {showLegend && (
              <Legend wrapperStyle={{ fontSize: 12, color: "var(--muted-foreground)", paddingTop: 12 }} />
            )}
            {series.map((s, i) => {
              const color = s.color ?? CHART_HEX_ARRAY[i % CHART_HEX_ARRAY.length]
              return (
                <Area key={s.key} type="monotone" dataKey={s.key} name={s.name}
                  stroke={color} strokeWidth={2} fill={`url(#gradient-${s.key})`}
                  stackId={stacked ? "stack" : undefined}
                  animationDuration={ANIMATION_CONFIG.duration} animationEasing="ease-out"
                  animationBegin={ANIMATION_CONFIG.begin + i * 100}
                  dot={false} activeDot={{ r: 4, strokeWidth: 0 }} />
              )
            })}
          </RechartsAreaChart>
        </ResponsiveContainer>
      </div>
    </ChartWrapper>
  )
}
