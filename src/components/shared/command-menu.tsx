"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  LayoutDashboard, BarChart3, Settings, Users, CreditCard,
  Bell, FileText, Zap, Shield, TrendingUp, Activity,
  Sun, Moon, Monitor, LogOut, HelpCircle,
} from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { useAppStore } from "@/store/app-store"
import { useTheme } from "next-themes"

const NAV_COMMANDS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, shortcut: "G D" },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3, shortcut: "G A" },
  { label: "Activity", href: "/dashboard/activity", icon: Activity },
  { label: "Users", href: "/dashboard/users", icon: Users },
  { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { label: "Reports", href: "/dashboard/reports", icon: FileText },
  { label: "Alerts", href: "/dashboard/alerts", icon: Bell },
  { label: "Integrations", href: "/dashboard/integrations", icon: Zap },
  { label: "Security", href: "/dashboard/security", icon: Shield },
  { label: "Performance", href: "/dashboard/performance", icon: TrendingUp },
  { label: "Settings", href: "/dashboard/settings", icon: Settings, shortcut: "G S" },
]

export function CommandMenu() {
  const { commandMenuOpen, setCommandMenuOpen } = useAppStore()
  const { setTheme } = useTheme()
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCommandMenuOpen(!commandMenuOpen)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [commandMenuOpen, setCommandMenuOpen])

  const navigate = (href: string) => {
    router.push(href)
    setCommandMenuOpen(false)
  }

  return (
    <CommandDialog open={commandMenuOpen} onOpenChange={setCommandMenuOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigation">
          {NAV_COMMANDS.map((cmd) => (
            <CommandItem
              key={cmd.href}
              onSelect={() => navigate(cmd.href)}
              className="gap-2 cursor-pointer"
            >
              <cmd.icon className="size-4 text-muted-foreground" />
              {cmd.label}
              {cmd.shortcut && <CommandShortcut>{cmd.shortcut}</CommandShortcut>}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Theme">
          <CommandItem onSelect={() => { setTheme("light"); setCommandMenuOpen(false) }} className="gap-2 cursor-pointer">
            <Sun className="size-4 text-muted-foreground" />
            Switch to Light Mode
          </CommandItem>
          <CommandItem onSelect={() => { setTheme("dark"); setCommandMenuOpen(false) }} className="gap-2 cursor-pointer">
            <Moon className="size-4 text-muted-foreground" />
            Switch to Dark Mode
          </CommandItem>
          <CommandItem onSelect={() => { setTheme("system"); setCommandMenuOpen(false) }} className="gap-2 cursor-pointer">
            <Monitor className="size-4 text-muted-foreground" />
            Use System Theme
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Account">
          <CommandItem className="gap-2 cursor-pointer">
            <HelpCircle className="size-4 text-muted-foreground" />
            Help & Documentation
            <CommandShortcut>?</CommandShortcut>
          </CommandItem>
          <CommandItem className="gap-2 cursor-pointer text-destructive aria-selected:text-destructive">
            <LogOut className="size-4" />
            Sign Out
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
