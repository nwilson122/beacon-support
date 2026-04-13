"use client"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface ChartWrapperProps {
  children: React.ReactNode
  height?: number
  className?: string
}

export function ChartWrapper({ children, height = 300, className }: ChartWrapperProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div
        className={cn("w-full rounded-lg bg-muted/20 animate-pulse", className)}
        style={{ height }}
      />
    )
  }

  return <>{children}</>
}
