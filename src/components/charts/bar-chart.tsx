"use client"

import {
  BarChart as RechartsBarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts"
import { CHART_HEX_ARRAY, CHART_THEME, ANIMATION_CONFIG } from "@/lib/chart-config"
import { ChartWrapper } from "@/components/charts/chart-wrapper"
import { cn } from "@/lib/utils"

interface BarChartProps {
  data: Record<string, string | number>[]
  series: { key: string; name: string; color?: string }[]
  xKey: string
  height?: number
  className?: string
  formatY?: (value: number) => string
  formatTooltip?: (value: number, name: string) => string
  layout?: "vertical" | "horizontal"
  showLegend?: boolean
  rounded?: boolean
}

export function BarChart({ data, series, xKey, height = 300, className,
  formatY, formatTooltip, layout = "horizontal", showLegend = false, rounded = true }: BarChartProps) {
  const isVertical = layout === "vertical"
  return (
    <ChartWrapper height={height} className={className}>
      <div className={cn("w-full", className)} style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={data} layout={layout}
            margin={{ top: 4, right: 4, left: 0, bottom: 0 }} barCategoryGap="28%">
            <CartesianGrid strokeDasharray={CHART_THEME.grid.strokeDasharray}
              stroke={CHART_THEME.grid.stroke} opacity={CHART_THEME.grid.opacity}
              horizontal={!isVertical} vertical={isVertical} />
            {isVertical ? (
              <>
                <XAxis type="number" tick={CHART_THEME.axis.tick} axisLine={false} tickLine={false}
                  tickMargin={8} tickFormatter={formatY} />
                <YAxis dataKey={xKey} type="category" tick={CHART_THEME.axis.tick} axisLine={false}
                  tickLine={false} tickMargin={8} width={120} />
              </>
            ) : (
              <>
                <XAxis dataKey={xKey} tick={CHART_THEME.axis.tick} axisLine={false} tickLine={false} tickMargin={8} />
                <YAxis tick={CHART_THEME.axis.tick} axisLine={false} tickLine={false}
                  tickMargin={8} tickFormatter={formatY} width={60} />
              </>
            )}
            <Tooltip
              contentStyle={CHART_THEME.tooltip.contentStyle}
              labelStyle={CHART_THEME.tooltip.labelStyle}
              itemStyle={CHART_THEME.tooltip.itemStyle}
              formatter={formatTooltip ? (val, name) => [formatTooltip(Number(val), String(name)), name] : undefined}
              cursor={{ fill: "var(--muted)", opacity: 0.4 }}
            />
            {showLegend && (
              <Legend wrapperStyle={{ fontSize: 12, color: "var(--muted-foreground)", paddingTop: 12 }} />
            )}
            {series.map((s, i) => {
              const color = s.color ?? CHART_HEX_ARRAY[i % CHART_HEX_ARRAY.length]
              return (
                <Bar key={s.key} dataKey={s.key} name={s.name} fill={color}
                  radius={rounded ? [4, 4, 0, 0] : [0, 0, 0, 0]}
                  animationDuration={ANIMATION_CONFIG.duration} animationEasing="ease-out"
                  animationBegin={ANIMATION_CONFIG.begin + i * 80} maxBarSize={48} />
              )
            })}
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </ChartWrapper>
  )
}
