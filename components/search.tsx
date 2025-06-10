"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"

export function Search() {
  const [searchType, setSearchType] = useState("Clients")

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="flex">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="rounded-r-none border-r-0 px-2 sm:px-3 text-xs sm:text-sm whitespace-nowrap min-h-[36px] sm:min-h-[40px]"
            >
              <span className="hidden sm:inline">{searchType}</span>
              <span className="sm:hidden">{searchType.slice(0, 3)}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSearchType("Clients")}>Clients</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSearchType("Bonds")}>Bonds</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSearchType("Court Dates")}>Court Dates</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSearchType("All Notes")}>All Notes</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2 sm:left-3 top-1/2 h-3 w-3 sm:h-4 sm:w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={`Search ${searchType.toLowerCase()}...`}
            className="pl-7 sm:pl-9 rounded-l-none text-sm sm:text-base min-h-[36px] sm:min-h-[40px]"
          />
        </div>
      </div>
    </div>
  )
}
