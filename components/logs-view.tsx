"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  Calendar,
  Search,
  Download,
  Filter,
  FileText,
  Clock,
  MapPin,
  Smartphone,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  Eye,
  PrinterIcon as Print,
  Plus,
} from "lucide-react"

// Sample court date data
const courtDateData = [
  {
    id: "1",
    bondAmount: 10000.0,
    powerNumber: "123-786",
    courtName: "District Court",
    courtDate: "06/15/25",
    courtTime: "9:00 AM",
    division: "Division A",
    room: "Room 101",
    caseNumber: "2025-CF-1350",
    defendant: "Gorbell, Ryan",
    charges: "DUI",
    homePhone: "(555) 123-4567",
    mobilePhone: "(555) 987-6543",
    notified: true,
    office: "Main Office",
    agent: "Lucas",
    county: "County A",
  },
  {
    id: "2",
    bondAmount: 1500.0,
    powerNumber: "123-93986",
    courtName: "Municipal Court",
    courtDate: "06/16/25",
    courtTime: "2:00 PM",
    division: "Division B",
    room: "Room 205",
    caseNumber: "128899",
    defendant: "Carroll, Dessie",
    charges: "Theft",
    homePhone: "",
    mobilePhone: "(555) 456-7890",
    notified: false,
    office: "Main Office",
    agent: "Lucas",
    county: "County B",
  },
]

// Sample activity logs
const activityLogs = [
  {
    id: "1",
    timestamp: "2025-06-10 14:30:25",
    type: "court_date",
    description: "Court date added for Gorbell, Ryan",
    user: "Lucas",
    details: "District Court - 06/15/25 9:00 AM",
  },
  {
    id: "2",
    timestamp: "2025-06-10 13:15:42",
    type: "check_in",
    description: "Client check-in via mobile app",
    user: "System",
    details: "Carroll, Dessie - GPS location verified",
  },
  {
    id: "3",
    timestamp: "2025-06-10 11:45:18",
    type: "payment",
    description: "Premium payment received",
    user: "Lucas",
    details: "$150.00 - Check #1234",
  },
]

export function LogsView() {
  const [selectedOffice, setSelectedOffice] = useState("all")
  const [selectedAgent, setSelectedAgent] = useState("all")
  const [selectedCounty, setSelectedCounty] = useState("all")
  const [courtDateFilter, setCourtDateFilter] = useState("today")
  const [receiptNumber, setReceiptNumber] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const getLogTypeIcon = (type: string) => {
    switch (type) {
      case "court_date":
        return <Calendar className="h-4 w-4 text-blue-600" />
      case "check_in":
        return <MapPin className="h-4 w-4 text-green-600" />
      case "payment":
        return <CreditCard className="h-4 w-4 text-purple-600" />
      default:
        return <FileText className="h-4 w-4 text-gray-600" />
    }
  }

  const getLogTypeBadge = (type: string) => {
    switch (type) {
      case "court_date":
        return <Badge className="bg-blue-100 text-blue-800">Court Date</Badge>
      case "check_in":
        return <Badge className="bg-green-100 text-green-800">Check-in</Badge>
      case "payment":
        return <Badge className="bg-purple-100 text-purple-800">Payment</Badge>
      default:
        return <Badge variant="outline">System</Badge>
    }
  }

  const totalCourtDates = courtDateData.length
  const notifiedCount = courtDateData.filter((item) => item.notified).length
  const todayCourtDates = courtDateData.filter((item) => item.courtDate === "06/15/25").length

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Logs & Court Dates</h1>
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Court Date
          </Button>
          <Button variant="outline">
            <Print className="mr-2 h-4 w-4" />
            Print
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full p-2 bg-blue-100">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Court Dates</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-2xl font-bold">{totalCourtDates}</h3>
                  <p className="text-xs text-muted-foreground">Scheduled</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full p-2 bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Defendants Notified</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-2xl font-bold">{notifiedCount}</h3>
                  <p className="text-xs text-muted-foreground">of {totalCourtDates}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full p-2 bg-orange-100">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Today's Court Dates</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-2xl font-bold">{todayCourtDates}</h3>
                  <p className="text-xs text-muted-foreground">Scheduled</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full p-2 bg-purple-100">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Activity Logs</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-2xl font-bold">{activityLogs.length}</h3>
                  <p className="text-xs text-muted-foreground">Today</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-[250px_1fr] gap-6">
        {/* Sidebar */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Logs</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1 p-2">
              <Button variant="default" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Court Dates
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <MapPin className="mr-2 h-4 w-4" />
                Check-ins
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Collateral List
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Delete Log
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <CreditCard className="mr-2 h-4 w-4" />
                Voided Premium Receipt Log
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <MapPin className="mr-2 h-4 w-4" />
                Locate Now Attempts
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Smartphone className="mr-2 h-4 w-4" />
                Info Added Via Mobile App
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <CreditCard className="mr-2 h-4 w-4" />
                BailbondPay Reconcile Log
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Batch Add Court Dates
              </Button>
            </div>

            <div className="border-t p-4">
              <h4 className="font-medium mb-2">Receipt Log Search</h4>
              <div className="space-y-2">
                <Input
                  placeholder="Enter Receipt Number"
                  value={receiptNumber}
                  onChange={(e) => setReceiptNumber(e.target.value)}
                />
                <Button className="w-full">Go</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="space-y-4">
          <Tabs defaultValue="court-dates" className="space-y-4">
            <TabsList>
              <TabsTrigger value="court-dates">Court Date Docket</TabsTrigger>
              <TabsTrigger value="activity">Activity Logs</TabsTrigger>
              <TabsTrigger value="check-ins">Check-ins</TabsTrigger>
              <TabsTrigger value="payments">Payment Logs</TabsTrigger>
            </TabsList>

            <TabsContent value="court-dates" className="space-y-4">
              {/* Filters */}
              <Card>
                <CardContent className="p-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Office</label>
                      <Select value={selectedOffice} onValueChange={setSelectedOffice}>
                        <SelectTrigger>
                          <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="main">Main Office</SelectItem>
                          <SelectItem value="branch">Branch Office</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1 block">Agent</label>
                      <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                        <SelectTrigger>
                          <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="lucas">Lucas</SelectItem>
                          <SelectItem value="agent2">Agent 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1 block">County</label>
                      <Select value={selectedCounty} onValueChange={setSelectedCounty}>
                        <SelectTrigger>
                          <SelectValue placeholder="-- All --" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">-- All --</SelectItem>
                          <SelectItem value="county-a">County A</SelectItem>
                          <SelectItem value="county-b">County B</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <Button>Go</Button>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="Search court dates..."
                          className="pl-9 w-[300px]"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Court Date Options */}
              <Card>
                <CardContent className="p-6">
                  <RadioGroup value={courtDateFilter} onValueChange={setCourtDateFilter} className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="today" id="today" />
                      <Label htmlFor="today" className="flex items-center gap-2">
                        Show Active Defendants that have court:
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
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no-future" id="no-future" />
                      <Label htmlFor="no-future">
                        Show Active Defendants that do not have a future scheduled court date.
                      </Label>
                    </div>
                  </RadioGroup>

                  <div className="mt-4 flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-green-600">= Defendant has been notified of Court Date</span>
                  </div>
                </CardContent>
              </Card>

              {/* Alphabetical Navigation */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
                      <Button key={letter} variant="outline" size="sm" className="w-8 h-8 p-0">
                        {letter}
                      </Button>
                    ))}
                    <Button variant="outline" size="sm">
                      Other
                    </Button>
                    <Button variant="outline" size="sm">
                      ALL
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Court Date Actions */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Select defaultValue="select-letter">
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="-- Select Letter --" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="select-letter">-- Select Letter --</SelectItem>
                          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
                            <SelectItem key={letter} value={letter}>
                              {letter}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                      </Button>
                    </div>
                    <span className="text-sm text-muted-foreground">1 to 0 of 0</span>
                  </div>
                </CardContent>
              </Card>

              {/* Court Dates Table */}
              <Card>
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
                        <TableHead className="w-[100px]">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {courtDateData.length > 0 ? (
                        courtDateData.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              {item.notified ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                <AlertTriangle className="h-4 w-4 text-orange-600" />
                              )}
                            </TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium">{formatCurrency(item.bondAmount)}</div>
                                <div className="text-sm text-muted-foreground">{item.powerNumber}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium">{item.courtName}</div>
                                <div className="text-sm text-muted-foreground">
                                  {item.courtDate} {item.courtTime}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium">
                                  {item.division} / {item.room}
                                </div>
                                <div className="text-sm text-muted-foreground">{item.caseNumber}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium">{item.defendant}</div>
                                <div className="text-sm text-muted-foreground">{item.charges}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <div className="text-sm">{item.homePhone || "N/A"}</div>
                                <div className="text-sm text-muted-foreground">{item.mobilePhone}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                            No Information Found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>System and user activity logs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activityLogs.map((log) => (
                      <div key={log.id} className="flex items-start gap-4 p-4 border rounded-lg">
                        <div className="mt-1">{getLogTypeIcon(log.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {getLogTypeBadge(log.type)}
                            <span className="text-sm text-muted-foreground">{log.timestamp}</span>
                          </div>
                          <div className="font-medium">{log.description}</div>
                          <div className="text-sm text-muted-foreground">{log.details}</div>
                          <div className="text-xs text-muted-foreground mt-1">By: {log.user}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="check-ins">
              <Card>
                <CardContent className="p-6 text-center py-10 text-muted-foreground">
                  Check-in logs will be displayed here
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payments">
              <Card>
                <CardContent className="p-6 text-center py-10 text-muted-foreground">
                  Payment logs will be displayed here
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
