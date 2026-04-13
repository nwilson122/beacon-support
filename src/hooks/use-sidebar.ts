"use client"
import { useAppStore } from "@/store/app-store"

export function useSidebar() {
  const { sidebarCollapsed, setSidebarCollapsed, toggleSidebar } = useAppStore()
  return { collapsed: sidebarCollapsed, setSidebarCollapsed, toggle: toggleSidebar }
}
