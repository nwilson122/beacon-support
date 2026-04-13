"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, ResponsiveContainer } from "recharts"
import { cn } from "@/lib/utils"

interface SparklineProps {
  data: number[]
  color?: string
  height?: number
  className?: string
  trend?: "up" | "down" | "neutral"
}

const TREND_COLORS = { up: "#10b981", down: "#f43f5e", neutral: "#3b82f6" }

export function Sparkline({ data, color, height = 36, className, trend = "neutral" }: SparklineProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const lineColor = color ?? TREND_COLORS[trend]
  const chartData = data.map((v, i) => ({ v, i }))

  if (!mounted) return <div className={cn("w-full rounded bg-muted/20", className)} style={{ height }} />

  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
          <defs>
            <linearGradient id={`spark-grad-${trend}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={lineColor} stopOpacity={0.4} />
              <stop offset="100%" stopColor={lineColor} stopOpacity={1} />
            </linearGradient>
          </defs>
          <Line type="monotone" dataKey="v" stroke={`url(#spark-grad-${trend})`}
            strokeWidth={1.5} dot={false} animationDuration={1000} animationEasing="ease-out" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
