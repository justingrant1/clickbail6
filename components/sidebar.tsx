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
          "fixed inset-y-0 left-0 z-50 w-72 border-r bg-card p-4 shadow-lg transition-transform duration-300 md:relative md:z-0 md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between md:hidden">
          <div className="flex items-center gap-2">
            <img src="/placeholder.svg?height=40&width=40" alt="BondPro Logo" className="h-10 w-10" />
            <span className="text-xl font-bold">BondPro</span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="mt-6 space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                pathname === route.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
              )}
            >
              <route.icon className="h-5 w-5" />
              {route.name}
            </Link>
          ))}
        </div>

        <div className="absolute bottom-4 left-0 right-0 px-4">
          <div className="rounded-lg bg-muted p-4">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary" />
              <div className="text-sm font-medium">Need help?</div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">Contact support at 1-800-BONDPRO</div>
          </div>
        </div>
      </div>
    </>
  )
}
