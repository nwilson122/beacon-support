"use client"

import {
  LineChart as RechartsLineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts"
import { CHART_HEX_ARRAY, CHART_THEME, ANIMATION_CONFIG } from "@/lib/chart-config"
import { ChartWrapper } from "@/components/charts/chart-wrapper"
import { cn } from "@/lib/utils"

interface LineChartProps {
  data: Record<string, string | number>[]
  series: { key: string; name: string; color?: string; dashed?: boolean }[]
  xKey: string
  height?: number
  className?: string
  formatY?: (value: number) => string
  formatTooltip?: (value: number, name: string) => string
  showLegend?: boolean
  showDots?: boolean
}

export function LineChart({ data, series, xKey, height = 300, className,
  formatY, formatTooltip, showLegend = true, showDots = false }: LineChartProps) {
  return (
    <ChartWrapper height={height} className={className}>
      <div className={cn("w-full", className)} style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray={CHART_THEME.grid.strokeDasharray}
              stroke={CHART_THEME.grid.stroke} opacity={CHART_THEME.grid.opacity} vertical={false} />
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
                <Line key={s.key} type="monotone" dataKey={s.key} name={s.name}
                  stroke={color} strokeWidth={2} strokeDasharray={s.dashed ? "6 3" : undefined}
                  dot={showDots ? { r: 3, fill: color, strokeWidth: 0 } : false}
                  activeDot={{ r: 5, strokeWidth: 0, fill: color }}
                  animationDuration={ANIMATION_CONFIG.duration} animationEasing="ease-out"
                  animationBegin={ANIMATION_CONFIG.begin + i * 100} />
              )
            })}
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </ChartWrapper>
  )
}
