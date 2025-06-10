"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Plus } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export function CourtDatesView() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Court Date Docket</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Court Date
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="text-sm font-medium mb-1 block">Office</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Agent</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">County</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="-- All --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">-- All --</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6">
            <RadioGroup defaultValue="active" className="flex flex-col md:flex-row gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="active" id="active" />
                <Label htmlFor="active" className="text-base">
                  Show Active Defendants that have court:
                </Label>
                <Select defaultValue="today">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Today" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="tomorrow">Tomorrow</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="future" id="future" />
                <Label htmlFor="future" className="text-base">
                  Show Active Defendants that do not have a future scheduled court date.
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Court Date Listing</CardTitle>
          <div className="flex items-center gap-2">
            <Select defaultValue="letter">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="-- Select Letter --" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="letter">-- Select Letter --</SelectItem>
                <SelectItem value="a">A</SelectItem>
                <SelectItem value="b">B</SelectItem>
                <SelectItem value="c">C</SelectItem>
                {/* More letters */}
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Calendar className="h-4 w-4" />
              <span className="sr-only">Calendar</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Bond Amount / Power Number</TableHead>
                <TableHead>Court Name / Court Date/Time</TableHead>
                <TableHead>Division / Room / Case Number</TableHead>
                <TableHead>Defendant / Charges</TableHead>
                <TableHead>Home Phone / Mobile Phone</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                  No information found.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
