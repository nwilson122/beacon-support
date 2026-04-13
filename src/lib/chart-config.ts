// Shared chart configuration for consistent styling across all charts

export const CHART_COLORS = {
  blue: "var(--chart-1)",
  emerald: "var(--chart-2)",
  amber: "var(--chart-3)",
  rose: "var(--chart-4)",
  violet: "var(--chart-5)",
  cyan: "var(--chart-6)",
} as const

export const CHART_COLOR_ARRAY = [
  CHART_COLORS.blue,
  CHART_COLORS.emerald,
  CHART_COLORS.amber,
  CHART_COLORS.rose,
  CHART_COLORS.violet,
  CHART_COLORS.cyan,
]

export const CHART_HEX = {
  blue: "#3b82f6",
  emerald: "#10b981",
  amber: "#f59e0b",
  rose: "#f43f5e",
  violet: "#8b5cf6",
  cyan: "#06b6d4",
}

export const CHART_HEX_ARRAY = Object.values(CHART_HEX)

export const CHART_THEME = {
  grid: {
    stroke: "var(--border)",
    strokeDasharray: "3 3",
    opacity: 0.6,
  },
  axis: {
    tick: { fill: "var(--muted-foreground)", fontSize: 11 },
    line: { stroke: "var(--border)" },
  },
  tooltip: {
    contentStyle: {
      backgroundColor: "var(--popover)",
      border: "1px solid var(--border)",
      borderRadius: "8px",
      boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
      padding: "10px 14px",
      fontSize: "13px",
    },
    labelStyle: {
      color: "var(--foreground)",
      fontWeight: 600,
      marginBottom: 4,
    },
    itemStyle: {
      color: "var(--muted-foreground)",
    },
  },
}

export const ANIMATION_CONFIG = {
  duration: 800,
  easing: "ease-out",
  begin: 200,
}
