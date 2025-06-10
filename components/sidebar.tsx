"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Calendar,
  ClipboardList,
  FileText,
  Home,
  MessageSquare,
  PenTool,
  Phone,
  Users,
  Wallet,
  MapPin,
  Eye,
  LayoutGrid,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname()

  const routes = [
    {
      name: "Dashboard",
      href: "/",
      icon: Home,
    },
    {
      name: "Clients",
      href: "/clients",
      icon: Users,
    },
    {
      name: "Bonds",
      href: "/bonds",
      icon: FileText,
    },
    {
      name: "Prospects",
      href: "/prospects",
      icon: LayoutGrid,
    },
    {
      name: "Powers",
      href: "/powers",
      icon: ClipboardList,
    },
    {
      name: "Money",
      href: "/money",
      icon: Wallet,
    },
    {
      name: "Reports",
      href: "/reports",
      icon: BarChart3,
    },
    {
      name: "E-Sign",
      href: "/e-sign",
      icon: PenTool,
    },
    {
      name: "Logs",
      href: "/logs",
      icon: ClipboardList,
    },
    {
      name: "Calendar",
      href: "/calendar",
      icon: Calendar,
    },
    {
      name: "Office Chat",
      href: "/chat",
      icon: MessageSquare,
    },
    {
      name: "Def. Watch",
      href: "/def-watch",
      icon: Eye,
    },
    {
      name: "Forms",
      href: "/forms",
      icon: FileText,
    },
    {
      name: "Geo Fence",
      href: "/geo-fence",
      icon: MapPin,
    },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 sm:w-72 border-r bg-card shadow-lg transition-transform duration-300 md:relative md:z-0 md:translate-x-0 md:w-64 lg:w-72",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Mobile header */}
          <div className="flex items-center justify-between p-3 sm:p-4 md:hidden border-b">
            <div className="flex items-center gap-2">
              <img src="/placeholder.svg?height=40&width=40" alt="BondPro Logo" className="h-8 w-8 sm:h-10 sm:w-10" />
              <span className="text-lg sm:text-xl font-bold">BondPro</span>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10" onClick={() => setOpen(false)}>
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4">
            <div className="space-y-1">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-3 sm:py-3 text-sm sm:text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground min-h-[44px] touch-manipulation",
                    pathname === route.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                  )}
                >
                  <route.icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <span className="truncate">{route.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Support section */}
          <div className="p-3 sm:p-4 border-t">
            <div className="rounded-lg bg-muted p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                <div className="text-sm font-medium">Need help?</div>
              </div>
              <div className="mt-2 text-xs sm:text-sm text-muted-foreground">Contact support at 1-800-BONDPRO</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
