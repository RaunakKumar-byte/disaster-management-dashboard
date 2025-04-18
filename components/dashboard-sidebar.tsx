"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import {
  HelpingHand,
  LayoutDashboard,
  Map,
  AlertTriangle,
  Package,
  MessageSquareIcon as MessageSquareHelp,
  Bell,
  Users,
  Settings,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function DashboardSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Disaster Map",
      href: "/dashboard/map",
      icon: Map,
    },
    {
      name: "Report Disaster",
      href: "/dashboard/report",
      icon: AlertTriangle,
    },
    {
      name: "Resources",
      href: "/dashboard/resources",
      icon: Package,
    },
    {
      name: "Help Requests",
      href: "/dashboard/help-requests",
      icon: MessageSquareHelp,
    },
    {
      name: "Notifications",
      href: "/dashboard/notifications",
      icon: Bell,
    },
  ]

  // Admin-only navigation items
  const adminItems = [
    {
      name: "Manage Users",
      href: "/dashboard/users",
      icon: Users,
    },
  ]

  return (
    <div className="w-64 h-full bg-card border-r flex flex-col">
      <div className="p-4 border-b">
        <Link href="/dashboard" className="flex items-center gap-2">
          <HelpingHand className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">DisasterRelief</span>
        </Link>
      </div>

      <div className="flex-1 overflow-auto py-4">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}

          {user?.role === "admin" && (
            <>
              <div className="mt-6 mb-2 px-3">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Administration</h3>
              </div>
              {adminItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </>
          )}
        </nav>
      </div>

      <div className="p-4 border-t">
        <div className="flex flex-col space-y-4">
          <Link
            href="/dashboard/settings"
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
              pathname === "/dashboard/settings"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
          <Button variant="ghost" className="justify-start" onClick={logout}>
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}
