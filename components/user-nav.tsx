"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, FileSignature, MessageSquare, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function UserNav() {
  return (
    <div className="flex items-center gap-4">
      <Button variant="outline" size="icon" className="relative">
        <Bell className="h-5 w-5" />
        <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">0</Badge>
        <span className="sr-only">Notifications</span>
      </Button>

      <Button variant="outline" size="icon" className="relative">
        <MessageSquare className="h-5 w-5" />
        <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">0</Badge>
        <span className="sr-only">Messages</span>
      </Button>

      <Button variant="outline" size="icon">
        <FileSignature className="h-5 w-5" />
        <span className="sr-only">E-Signature</span>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Lucas</p>
              <p className="text-xs leading-none text-muted-foreground">lucas@bondpro.com</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FileSignature className="mr-2 h-4 w-4" />
              <span>My E-Signature</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <span>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
