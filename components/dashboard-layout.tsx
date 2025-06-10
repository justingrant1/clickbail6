"use client"

import type React from "react"

import { useState } from "react"
import { UserNav } from "@/components/user-nav"
import { Sidebar } from "@/components/sidebar"
import { Search } from "@/components/search"
import { Menu, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notificationCount] = useState(3) // Mock notification count

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4 md:px-6">
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 sm:h-10 sm:w-10 md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
            <div className="flex items-center gap-1 sm:gap-2">
              <img src="/placeholder.svg?height=40&width=40" alt="BondPro Logo" className="h-8 w-8 sm:h-10 sm:w-10" />
              <span className="text-lg sm:text-xl font-bold hidden xs:inline-block">BondPro</span>
            </div>
          </div>
          <div className="flex-1 px-2 sm:px-4 md:px-6 lg:px-8 max-w-2xl">
            <Search />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
              {notificationCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {notificationCount}
                </Badge>
              )}
              <span className="sr-only">Notifications</span>
            </Button>
            <UserNav />
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <main className="flex-1 overflow-auto p-3 sm:p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
