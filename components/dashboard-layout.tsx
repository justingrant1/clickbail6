"use client"

import type React from "react"

import { useState } from "react"
import { UserNav } from "@/components/user-nav"
import { Sidebar } from "@/components/sidebar"
import { Search } from "@/components/search"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
            <div className="flex items-center gap-2">
              <img src="/placeholder.svg?height=40&width=40" alt="BondPro Logo" className="h-10 w-10" />
              <span className="hidden text-xl font-bold md:inline-block">BondPro</span>
            </div>
          </div>
          <div className="flex-1 px-4 md:px-6 lg:px-8">
            <Search />
          </div>
          <div className="flex items-center gap-4">
            <UserNav />
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
