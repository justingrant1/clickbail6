"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"

export function SimpleReportsView() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
      </div>

      <div className="grid md:grid-cols-[250px_1fr] gap-6">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Reports Section</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1 p-2">
              <Button variant="ghost" className="w-full justify-start font-bold">
                <BarChart3 className="mr-2 h-4 w-4" />
                Company Reports
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <BarChart3 className="mr-2 h-4 w-4" />
                Agent Reports
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <BarChart3 className="mr-2 h-4 w-4" />
                Power Reports
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <BarChart3 className="mr-2 h-4 w-4" />
                State Reports
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <BarChart3 className="mr-2 h-4 w-4" />
                Saved Reports
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Select a Report</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Please select a report type from the menu on the left to view available reports.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
