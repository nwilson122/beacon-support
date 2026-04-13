"use client"

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"
import { CHART_HEX_ARRAY, CHART_THEME } from "@/lib/chart-config"
import { ChartWrapper } from "@/components/charts/chart-wrapper"
import { cn } from "@/lib/utils"
import type { DonutSegment } from "@/types"

interface DonutChartProps {
  data: DonutSegment[]
  height?: number
  className?: string
  innerRadius?: number
  outerRadius?: number
  formatValue?: (value: number) => string
  showLegend?: boolean
  centerLabel?: string
  centerValue?: string
}

const CustomTooltip = ({ active, payload, formatValue }: {
  active?: boolean
  payload?: Array<{ name: string; value: number; payload: DonutSegment }>
  formatValue?: (value: number) => string
}) => {
  if (!active || !payload?.length) return null
  const d = payload[0]
  return (
    <div style={CHART_THEME.tooltip.contentStyle}>
      <p style={{ ...CHART_THEME.tooltip.labelStyle, color: d.payload.color }}>{d.name}</p>
      <p style={{ color: "var(--foreground)", fontWeight: 600, fontSize: 14 }}>
        {formatValue ? formatValue(d.value) : d.value.toLocaleString()}
      </p>
    </div>
  )
}

export function DonutChart({
  data, height = 280, className, innerRadius = 70, outerRadius = 100,
  formatValue, showLegend = true, centerLabel, centerValue,
}: DonutChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0)

  return (
    <ChartWrapper height={height + (showLegend ? data.length * 28 : 0)} className={className}>
      <div className={cn("w-full relative", className)}>
        <div style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={innerRadius} outerRadius={outerRadius}
                paddingAngle={3} dataKey="value"
                animationBegin={200} animationDuration={900} animationEasing="ease-out" strokeWidth={0}>
                {data.map((entry, i) => (
                  <Cell key={`cell-${i}`}
                    fill={entry.color ?? CHART_HEX_ARRAY[i % CHART_HEX_ARRAY.length]} opacity={0.9} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip formatValue={formatValue} />} />
            </PieChart>
          </ResponsiveContainer>
          {(centerLabel || centerValue) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              {centerValue && <p className="text-xl font-bold font-mono tabular-nums text-foreground">{centerValue}</p>}
              {centerLabel && <p className="text-xs text-muted-foreground mt-0.5">{centerLabel}</p>}
            </div>
          )}
        </div>
        {showLegend && (
          <div className="mt-4 space-y-1.5 px-2">
            {data.map((d, i) => {
              const pct = ((d.value / total) * 100).toFixed(1)
              return (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <span className="size-2 rounded-full shrink-0"
                    style={{ background: d.color ?? CHART_HEX_ARRAY[i % CHART_HEX_ARRAY.length] }} />
                  <span className="text-muted-foreground truncate flex-1">{d.name}</span>
                  <span className="font-medium tabular-nums text-foreground">{pct}%</span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </ChartWrapper>
  )
}
