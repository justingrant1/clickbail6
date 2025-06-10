"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { BarChart3 } from "lucide-react"

export function ReportsView() {
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
              <div className="pl-6 space-y-1">
                <Button variant="ghost" className="w-full justify-start text-sm">
                  Production Execution
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  Exonerations
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  Forfeitures
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  Court Dates Log
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  Daily Bond Register
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  Bonding Report
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  Bonds Added By User
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  Daily Take Report
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  Production Summary Report
                </Button>
              </div>

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
            <CardTitle>Execution Report</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Sort By</h3>
                <div className="flex flex-wrap gap-4">
                  <Select defaultValue="bond-date">
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Bond Date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bond-date">Bond Date</SelectItem>
                      <SelectItem value="defendant">Defendant</SelectItem>
                      <SelectItem value="agent">Agent</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select defaultValue="ascending">
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Ascending" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ascending">Ascending</SelectItem>
                      <SelectItem value="descending">Descending</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="rewrite" />
                    <label htmlFor="rewrite" className="text-sm font-medium">
                      In case of re-write add only the Increase of Liability.
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="column" />
                    <label htmlFor="column" className="text-sm font-medium">
                      Include Bond Share Posting Agent Column.
                    </label>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="not-reported" defaultChecked />
                    <label htmlFor="not-reported" className="text-sm font-medium">
                      Show only Bonds Not Reported Yet
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="marked" />
                    <label htmlFor="marked" className="text-sm font-medium">
                      Show only Bonds marked as Reported
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Filter / Date Selection</h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Insurer:</label>
                    <Select defaultValue="select">
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="select">Select</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Office:</label>
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
                    <label className="text-sm font-medium mb-1 block">Agent:</label>
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
                    <label className="text-sm font-medium mb-1 block">Bond Type:</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="All" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3 mt-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Date Ranges:</label>
                    <div className="flex gap-2">
                      <Select defaultValue="jun">
                        <SelectTrigger>
                          <SelectValue placeholder="Jun" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="jun">Jun</SelectItem>
                          <SelectItem value="jul">Jul</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select defaultValue="10">
                        <SelectTrigger>
                          <SelectValue placeholder="10" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="11">11</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select defaultValue="2025">
                        <SelectTrigger>
                          <SelectValue placeholder="2025" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2025">2025</SelectItem>
                          <SelectItem value="2024">2024</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">&nbsp;</label>
                    <div className="flex gap-2">
                      <Select defaultValue="jun">
                        <SelectTrigger>
                          <SelectValue placeholder="Jun" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="jun">Jun</SelectItem>
                          <SelectItem value="jul">Jul</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select defaultValue="10">
                        <SelectTrigger>
                          <SelectValue placeholder="10" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="11">11</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select defaultValue="2025">
                        <SelectTrigger>
                          <SelectValue placeholder="2025" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2025">2025</SelectItem>
                          <SelectItem value="2024">2024</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-end">
                    <Button>Generate Report</Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
