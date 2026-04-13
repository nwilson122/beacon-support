"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

const ROUTE_LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  analytics: "Analytics",
  settings: "Settings",
  users: "Users",
  billing: "Billing",
  reports: "Reports",
  alerts: "Alerts",
  integrations: "Integrations",
  security: "Security",
  performance: "Performance",
  activity: "Activity",
}

export function Breadcrumbs() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  if (segments.length <= 1) {
    return (
      <div className="flex items-center gap-1 text-sm">
        <span className="font-semibold text-foreground">Dashboard</span>
      </div>
    )
  }

  const crumbs = segments.map((seg, i) => ({
    label: ROUTE_LABELS[seg] ?? seg.charAt(0).toUpperCase() + seg.slice(1),
    href: "/" + segments.slice(0, i + 1).join("/"),
    isLast: i === segments.length - 1,
  }))

  return (
    <nav className="flex items-center gap-1 text-sm" aria-label="Breadcrumb">
      {crumbs.map((crumb, i) => (
        <span key={crumb.href} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="size-3 text-muted-foreground/50" />}
          {crumb.isLast ? (
            <span className="font-semibold text-foreground">{crumb.label}</span>
          ) : (
            <Link
              href={crumb.href}
              className={cn(
                "text-muted-foreground hover:text-foreground transition-colors",
                i === 0 && "text-muted-foreground"
              )}
            >
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  )
}
