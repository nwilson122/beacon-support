"use client"

import { Search, Bell, Settings } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { useAppStore } from "@/store/app-store"
import { Breadcrumbs } from "@/components/layout/breadcrumbs"

export function Header() {
  const { setCommandMenuOpen } = useAppStore()

  return (
    <header className="flex h-14 items-center border-b border-border bg-background/80 backdrop-blur-sm px-4 gap-4 shrink-0 sticky top-0 z-30">
      {/* Breadcrumbs */}
      <div className="flex-1 min-w-0">
        <Breadcrumbs />
      </div>

      {/* Search trigger */}
      <button
        onClick={() => setCommandMenuOpen(true)}
        className="hidden md:flex items-center gap-2 h-8 w-64 rounded-md border border-border bg-muted/40 px-3 text-sm text-muted-foreground hover:bg-muted/60 transition-colors cursor-pointer"
      >
        <Search className="size-3.5 shrink-0" />
        <span className="flex-1 text-left">Search...</span>
        <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium">
          <span>⌘</span>K
        </kbd>
      </button>

      {/* Actions */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="size-8 text-muted-foreground hover:text-foreground md:hidden"
          onClick={() => setCommandMenuOpen(true)}
        >
          <Search className="size-4" />
        </Button>

        <ThemeToggle />

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-foreground relative">
              <Bell className="size-4" />
              <span className="absolute top-1 right-1 size-1.5 rounded-full bg-destructive" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              Notifications
              <Badge variant="secondary" className="text-[10px]">3 new</Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {[
              { title: "Anomaly detected", desc: "Unusual traffic spike on /api/checkout", time: "2m ago", urgent: true },
              { title: "Weyland-Yutani signed Enterprise", desc: "$48,000/yr contract executed", time: "18m ago", urgent: false },
              { title: "Export completed", desc: "Q4 transaction report is ready", time: "1h ago", urgent: false },
            ].map((n, i) => (
              <DropdownMenuItem key={i} className="flex-col items-start gap-1 py-3 cursor-pointer">
                <div className="flex items-center gap-2 w-full">
                  <span className={`size-1.5 rounded-full shrink-0 ${n.urgent ? "bg-destructive" : "bg-primary"}`} />
                  <span className="text-sm font-medium flex-1">{n.title}</span>
                  <span className="text-[10px] text-muted-foreground">{n.time}</span>
                </div>
                <p className="text-xs text-muted-foreground pl-3.5">{n.desc}</p>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center text-sm text-primary justify-center">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 gap-2 pl-1 pr-2 text-muted-foreground hover:text-foreground">
              <Avatar className="size-6">
                <AvatarFallback className="bg-primary/20 text-primary text-[10px] font-semibold">JM</AvatarFallback>
              </Avatar>
              <span className="hidden sm:block text-xs font-medium">Jordan</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>
              <div className="text-sm font-medium">Jordan Mitchell</div>
              <div className="text-xs text-muted-foreground font-normal">jordan@acme.io</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings">
                <Settings className="mr-2 size-3.5" />Profile & Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
