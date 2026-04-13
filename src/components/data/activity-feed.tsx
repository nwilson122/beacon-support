"use client"

import { formatRelativeTime } from "@/lib/utils"
import type { ActivityItem, TicketPriority } from "@/types"
import { Badge } from "@/components/ui/badge"
import {
  UserPlus, ShoppingCart, RefreshCcw, TrendingUp, TrendingDown,
  Download, AlertTriangle, Rocket, MessageSquare, Zap, Ticket,
  UserCheck, ArrowUp, CheckCircle, X, Star, Clock, User,
} from "lucide-react"
import { cn } from "@/lib/utils"

const TYPE_CONFIG: Record<ActivityItem["type"], {
  icon: React.ElementType
  color: string
  bg: string
}> = {
  // Support activity types
  ticket_created: { icon: Ticket, color: "text-blue-500", bg: "bg-blue-500/10" },
  ticket_assigned: { icon: UserCheck, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  ticket_escalated: { icon: ArrowUp, color: "text-orange-500", bg: "bg-orange-500/10" },
  ticket_resolved: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10" },
  ticket_closed: { icon: X, color: "text-slate-500", bg: "bg-slate-500/10" },
  csat_received: { icon: Star, color: "text-amber-500", bg: "bg-amber-500/10" },
  sla_breached: { icon: Clock, color: "text-red-500", bg: "bg-red-500/10" },
  agent_status_change: { icon: User, color: "text-purple-500", bg: "bg-purple-500/10" },
  comment_added: { icon: MessageSquare, color: "text-cyan-500", bg: "bg-cyan-500/10" },
  priority_changed: { icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-500/10" },

  // Legacy activity types
  user_signup: { icon: UserPlus, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  purchase: { icon: ShoppingCart, color: "text-blue-500", bg: "bg-blue-500/10" },
  refund: { icon: RefreshCcw, color: "text-rose-500", bg: "bg-rose-500/10" },
  plan_upgrade: { icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  plan_downgrade: { icon: TrendingDown, color: "text-amber-500", bg: "bg-amber-500/10" },
  export: { icon: Download, color: "text-violet-500", bg: "bg-violet-500/10" },
  alert: { icon: AlertTriangle, color: "text-rose-500", bg: "bg-rose-500/10" },
  deploy: { icon: Rocket, color: "text-cyan-500", bg: "bg-cyan-500/10" },
  comment: { icon: MessageSquare, color: "text-blue-500", bg: "bg-blue-500/10" },
}

interface ActivityFeedProps {
  items: ActivityItem[]
  className?: string
}

export function ActivityFeed({ items, className }: ActivityFeedProps) {
  return (
    <div className={cn("space-y-1", className)}>
      {items.map((item, i) => {
        const cfg = TYPE_CONFIG[item.type] ?? { icon: Zap, color: "text-muted-foreground", bg: "bg-muted" }
        const Icon = cfg.icon

        return (
          <div
            key={item.id}
            className="flex gap-3 items-start py-2.5 px-1 rounded-lg hover:bg-muted/30 transition-colors group animate-fade-in-up"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className={cn("flex size-7 shrink-0 items-center justify-center rounded-full mt-0.5", cfg.bg)}>
              <Icon className={cn("size-3.5", cfg.color)} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-sm font-medium text-foreground leading-snug">{item.title}</p>
                {item.ticketId && (
                  <span className="text-[10px] font-mono text-muted-foreground bg-muted px-1 py-0.5 rounded">
                    {item.ticketId}
                  </span>
                )}
                {item.priority && (
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[9px] h-4 px-1 border",
                      item.priority === "critical" && "bg-red-500/10 text-red-500 border-red-500/20",
                      item.priority === "high" && "bg-orange-500/10 text-orange-500 border-orange-500/20",
                      item.priority === "medium" && "bg-amber-500/10 text-amber-600 border-amber-500/20",
                      item.priority === "low" && "bg-green-500/10 text-green-600 border-green-500/20"
                    )}
                  >
                    {item.priority}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
            <span className="text-[10px] text-muted-foreground/60 shrink-0 mt-0.5 tabular-nums">
              {formatRelativeTime(item.timestamp)}
            </span>
          </div>
        )
      })}
    </div>
  )
}
