"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertTriangle,
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  Eye,
  Filter,
  MapPin,
  MoreHorizontal,
  Phone,
  Plus,
  RefreshCw,
  Search,
  Settings,
  UserCheck,
  XCircle,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Mock data for defendants
const defendants = [
  {
    id: "DEF-1001",
    name: "John Smith",
    bondAmount: "$15,000",
    checkInStatus: "Compliant",
    lastCheckIn: "Today, 9:30 AM",
    nextCheckIn: "Tomorrow, 9:00 AM",
    riskLevel: "Low",
    courtDate: "Jun 15, 2025",
    location: "Within bounds",
    alerts: 0,
    phone: "(555) 123-4567",
    address: "123 Main St, Anytown, TX",
    bondsman: "Mike Johnson",
    caseNumber: "CR-2025-1234",
    checkInMethod: "In-person",
    checkInFrequency: "Daily",
    checkInHistory: [
      { date: "Jun 10, 2025", time: "9:30 AM", status: "Completed", method: "In-person" },
      { date: "Jun 9, 2025", time: "9:15 AM", status: "Completed", method: "In-person" },
      { date: "Jun 8, 2025", time: "9:45 AM", status: "Completed", method: "In-person" },
    ],
    locationHistory: [
      { date: "Jun 10, 2025", time: "3:30 PM", location: "Home", status: "Within bounds" },
      { date: "Jun 10, 2025", time: "1:15 PM", location: "Work", status: "Within bounds" },
      { date: "Jun 9, 2025", time: "7:45 PM", location: "Home", status: "Within bounds" },
    ],
  },
  {
    id: "DEF-1002",
    name: "Sarah Johnson",
    bondAmount: "$25,000",
    checkInStatus: "Missed",
    lastCheckIn: "Jun 8, 2025, 10:15 AM",
    nextCheckIn: "Today, 10:00 AM",
    riskLevel: "High",
    courtDate: "Jun 20, 2025",
    location: "Unknown",
    alerts: 2,
    phone: "(555) 987-6543",
    address: "456 Oak Ave, Anytown, TX",
    bondsman: "Lisa Williams",
    caseNumber: "CR-2025-5678",
    checkInMethod: "Phone",
    checkInFrequency: "Daily",
    checkInHistory: [
      { date: "Jun 8, 2025", time: "10:15 AM", status: "Completed", method: "Phone" },
      { date: "Jun 7, 2025", time: "10:30 AM", status: "Completed", method: "Phone" },
      { date: "Jun 6, 2025", time: "10:00 AM", status: "Missed", method: "Phone" },
    ],
    locationHistory: [
      { date: "Jun 8, 2025", time: "8:30 PM", location: "Unknown", status: "Out of bounds" },
      { date: "Jun 8, 2025", time: "2:15 PM", location: "Shopping Mall", status: "Within bounds" },
      { date: "Jun 7, 2025", time: "7:45 PM", location: "Home", status: "Within bounds" },
    ],
  },
  {
    id: "DEF-1003",
    name: "Michael Brown",
    bondAmount: "$10,000",
    checkInStatus: "Late",
    lastCheckIn: "Yesterday, 5:45 PM",
    nextCheckIn: "Today, 5:00 PM",
    riskLevel: "Medium",
    courtDate: "Jul 5, 2025",
    location: "Within bounds",
    alerts: 1,
    phone: "(555) 456-7890",
    address: "789 Pine St, Anytown, TX",
    bondsman: "Robert Davis",
    caseNumber: "CR-2025-9012",
    checkInMethod: "App",
    checkInFrequency: "Daily",
    checkInHistory: [
      { date: "Jun 9, 2025", time: "5:45 PM", status: "Late", method: "App" },
      { date: "Jun 8, 2025", time: "5:00 PM", status: "Completed", method: "App" },
      { date: "Jun 7, 2025", time: "5:10 PM", status: "Completed", method: "App" },
    ],
    locationHistory: [
      { date: "Jun 9, 2025", time: "8:30 PM", location: "Home", status: "Within bounds" },
      { date: "Jun 9, 2025", time: "2:15 PM", location: "Work", status: "Within bounds" },
      { date: "Jun 8, 2025", time: "7:45 PM", location: "Home", status: "Within bounds" },
    ],
  },
  {
    id: "DEF-1004",
    name: "Emily Wilson",
    bondAmount: "$50,000",
    checkInStatus: "Compliant",
    lastCheckIn: "Today, 8:00 AM",
    nextCheckIn: "Tomorrow, 8:00 AM",
    riskLevel: "Low",
    courtDate: "Jun 25, 2025",
    location: "Within bounds",
    alerts: 0,
    phone: "(555) 234-5678",
    address: "101 Elm St, Anytown, TX",
    bondsman: "Jennifer Smith",
    caseNumber: "CR-2025-3456",
    checkInMethod: "In-person",
    checkInFrequency: "Daily",
    checkInHistory: [
      { date: "Jun 10, 2025", time: "8:00 AM", status: "Completed", method: "In-person" },
      { date: "Jun 9, 2025", time: "8:15 AM", status: "Completed", method: "In-person" },
      { date: "Jun 8, 2025", time: "8:00 AM", status: "Completed", method: "In-person" },
    ],
    locationHistory: [
      { date: "Jun 10, 2025", time: "12:30 PM", location: "Work", status: "Within bounds" },
      { date: "Jun 10, 2025", time: "8:15 AM", location: "Office", status: "Within bounds" },
      { date: "Jun 9, 2025", time: "7:45 PM", location: "Home", status: "Within bounds" },
    ],
  },
  {
    id: "DEF-1005",
    name: "David Garcia",
    bondAmount: "$30,000",
    checkInStatus: "Warrant",
    lastCheckIn: "Jun 5, 2025, 3:30 PM",
    nextCheckIn: "Jun 6, 2025, 3:00 PM",
    riskLevel: "Critical",
    courtDate: "Jun 18, 2025",
    location: "Unknown",
    alerts: 5,
    phone: "(555) 876-5432",
    address: "202 Cedar Rd, Anytown, TX",
    bondsman: "Thomas Wilson",
    caseNumber: "CR-2025-7890",
    checkInMethod: "Phone",
    checkInFrequency: "Daily",
    checkInHistory: [
      { date: "Jun 5, 2025", time: "3:30 PM", status: "Completed", method: "Phone" },
      { date: "Jun 4, 2025", time: "3:15 PM", status: "Completed", method: "Phone" },
      { date: "Jun 3, 2025", time: "Missed", status: "Missed", method: "Phone" },
    ],
    locationHistory: [
      { date: "Jun 5, 2025", time: "8:30 PM", location: "Unknown", status: "Out of bounds" },
      { date: "Jun 5, 2025", time: "2:15 PM", location: "Unknown", status: "Out of bounds" },
      { date: "Jun 4, 2025", time: "7:45 PM", location: "Home", status: "Within bounds" },
    ],
  },
]

// Status badge component
function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "Compliant":
      return (
        <Badge className="bg-green-500 hover:bg-green-600">
          <CheckCircle className="mr-1 h-3 w-3" /> {status}
        </Badge>
      )
    case "Late":
      return (
        <Badge className="bg-yellow-500 hover:bg-yellow-600">
          <Clock className="mr-1 h-3 w-3" /> {status}
        </Badge>
      )
    case "Missed":
      return (
        <Badge className="bg-red-500 hover:bg-red-600">
          <XCircle className="mr-1 h-3 w-3" /> {status}
        </Badge>
      )
    case "Warrant":
      return (
        <Badge className="bg-purple-500 hover:bg-purple-600">
          <AlertTriangle className="mr-1 h-3 w-3" /> {status}
        </Badge>
      )
    default:
      return <Badge>{status}</Badge>
  }
}

// Risk level badge component
function RiskBadge({ level }: { level: string }) {
  switch (level) {
    case "Low":
      return <Badge className="bg-green-500 hover:bg-green-600">{level}</Badge>
    case "Medium":
      return <Badge className="bg-yellow-500 hover:bg-yellow-600">{level}</Badge>
    case "High":
      return <Badge className="bg-red-500 hover:bg-red-600">{level}</Badge>
    case "Critical":
      return <Badge className="bg-purple-500 hover:bg-purple-600">{level}</Badge>
    default:
      return <Badge>{level}</Badge>
  }
}

// Location status badge component
function LocationBadge({ status }: { status: string }) {
  switch (status) {
    case "Within bounds":
      return (
        <Badge className="bg-green-500 hover:bg-green-600">
          <MapPin className="mr-1 h-3 w-3" /> {status}
        </Badge>
      )
    case "Unknown":
      return (
        <Badge className="bg-gray-500 hover:bg-gray-600">
          <MapPin className="mr-1 h-3 w-3" /> {status}
        </Badge>
      )
    case "Out of bounds":
      return (
        <Badge className="bg-red-500 hover:bg-red-600">
          <MapPin className="mr-1 h-3 w-3" /> {status}
        </Badge>
      )
    default:
      return (
        <Badge>
          <MapPin className="mr-1 h-3 w-3" /> {status}
        </Badge>
      )
  }
}

export function DefendantWatchView() {
  const [selectedDefendant, setSelectedDefendant] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [riskFilter, setRiskFilter] = useState("all")

  // Filter defendants based on search query and filters
  const filteredDefendants = defendants.filter((defendant) => {
    const matchesSearch =
      defendant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      defendant.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || defendant.checkInStatus === statusFilter
    const matchesRisk = riskFilter === "all" || defendant.riskLevel === riskFilter

    return matchesSearch && matchesStatus && matchesRisk
  })

  // Stats for summary cards
  const stats = {
    total: defendants.length,
    compliant: defendants.filter((d) => d.checkInStatus === "Compliant").length,
    missed: defendants.filter((d) => d.checkInStatus === "Missed").length,
    late: defendants.filter((d) => d.checkInStatus === "Late").length,
    warrant: defendants.filter((d) => d.checkInStatus === "Warrant").length,
    highRisk: defendants.filter((d) => d.riskLevel === "High" || d.riskLevel === "Critical").length,
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Defendant Watch</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Monitor and manage defendants on bail with real-time status updates.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm" className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add Defendant
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Defendants</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Defendants currently being monitored</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{Math.round((stats.compliant / stats.total) * 100)}%</div>
            <Progress className="mt-2" value={(stats.compliant / stats.total) * 100} />
            <p className="mt-2 text-xs text-muted-foreground">
              {stats.compliant} of {stats.total} defendants compliant
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Missed Check-ins</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{stats.missed + stats.late}</div>
            <p className="text-xs text-muted-foreground">
              {stats.missed} missed, {stats.late} late
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{stats.highRisk}</div>
            <p className="text-xs text-muted-foreground">{stats.warrant} with active warrants</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col gap-3 sm:gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search defendants by name or ID..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="w-full sm:w-[180px]">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Compliant">Compliant</SelectItem>
                <SelectItem value="Late">Late</SelectItem>
                <SelectItem value="Missed">Missed</SelectItem>
                <SelectItem value="Warrant">Warrant</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full sm:w-[180px]">
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Risk Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" size="icon" className="w-full sm:w-auto">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Defendants Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Defendants Under Watch</CardTitle>
          <CardDescription>{filteredDefendants.length} defendants found</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[80px]">ID</TableHead>
                  <TableHead className="min-w-[120px]">Name</TableHead>
                  <TableHead className="min-w-[100px]">Status</TableHead>
                  <TableHead className="min-w-[140px]">Last Check-in</TableHead>
                  <TableHead className="min-w-[140px]">Next Check-in</TableHead>
                  <TableHead className="min-w-[80px]">Risk Level</TableHead>
                  <TableHead className="min-w-[100px]">Court Date</TableHead>
                  <TableHead className="min-w-[120px]">Location</TableHead>
                  <TableHead className="min-w-[60px]">Alerts</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDefendants.map((defendant) => (
                  <TableRow
                    key={defendant.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedDefendant(defendant)}
                  >
                    <TableCell className="font-medium text-xs sm:text-sm">{defendant.id}</TableCell>
                    <TableCell className="text-xs sm:text-sm">{defendant.name}</TableCell>
                    <TableCell>
                      <StatusBadge status={defendant.checkInStatus} />
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm">{defendant.lastCheckIn}</TableCell>
                    <TableCell className="text-xs sm:text-sm">{defendant.nextCheckIn}</TableCell>
                    <TableCell>
                      <RiskBadge level={defendant.riskLevel} />
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm">{defendant.courtDate}</TableCell>
                    <TableCell>
                      <LocationBadge status={defendant.location} />
                    </TableCell>
                    <TableCell>
                      {defendant.alerts > 0 && (
                        <Badge className="bg-red-500 hover:bg-red-600 text-xs">{defendant.alerts}</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 sm:h-8 sm:w-8 p-0">
                            <MoreHorizontal className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => setSelectedDefendant(defendant)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Phone className="mr-2 h-4 w-4" />
                            Contact Defendant
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MapPin className="mr-2 h-4 w-4" />
                            View Location
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Bell className="mr-2 h-4 w-4" />
                            Set Alert
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            Manage Monitoring
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Defendant Details Modal */}
      {selectedDefendant && (
        <Card className="mt-4 sm:mt-6">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <div>
              <CardTitle className="text-lg sm:text-xl">Defendant Details</CardTitle>
              <CardDescription>
                {selectedDefendant.id} - {selectedDefendant.name}
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setSelectedDefendant(null)}>
              <XCircle className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview">
              <TabsList className="mb-4 grid w-full grid-cols-2 sm:grid-cols-4">
                <TabsTrigger value="overview" className="text-xs sm:text-sm">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="check-ins" className="text-xs sm:text-sm">
                  Check-ins
                </TabsTrigger>
                <TabsTrigger value="location" className="text-xs sm:text-sm">
                  Location
                </TabsTrigger>
                <TabsTrigger value="alerts" className="text-xs sm:text-sm">
                  Alerts
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <h4 className="mb-2 font-medium text-sm sm:text-base">Personal Information</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 rounded-lg border p-3">
                        <div className="text-xs sm:text-sm font-medium">Name:</div>
                        <div className="text-xs sm:text-sm">{selectedDefendant.name}</div>
                        <div className="text-xs sm:text-sm font-medium">Phone:</div>
                        <div className="text-xs sm:text-sm">{selectedDefendant.phone}</div>
                        <div className="text-xs sm:text-sm font-medium">Address:</div>
                        <div className="text-xs sm:text-sm">{selectedDefendant.address}</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-2 font-medium text-sm sm:text-base">Case Information</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 rounded-lg border p-3">
                        <div className="text-xs sm:text-sm font-medium">Case Number:</div>
                        <div className="text-xs sm:text-sm">{selectedDefendant.caseNumber}</div>
                        <div className="text-xs sm:text-sm font-medium">Bond Amount:</div>
                        <div className="text-xs sm:text-sm">{selectedDefendant.bondAmount}</div>
                        <div className="text-xs sm:text-sm font-medium">Court Date:</div>
                        <div className="text-xs sm:text-sm">{selectedDefendant.courtDate}</div>
                        <div className="text-xs sm:text-sm font-medium">Bondsman:</div>
                        <div className="text-xs sm:text-sm">{selectedDefendant.bondsman}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="mb-2 font-medium text-sm sm:text-base">Monitoring Status</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 rounded-lg border p-3">
                        <div className="text-xs sm:text-sm font-medium">Check-in Status:</div>
                        <div className="text-xs sm:text-sm">
                          <StatusBadge status={selectedDefendant.checkInStatus} />
                        </div>
                        <div className="text-xs sm:text-sm font-medium">Risk Level:</div>
                        <div className="text-xs sm:text-sm">
                          <RiskBadge level={selectedDefendant.riskLevel} />
                        </div>
                        <div className="text-xs sm:text-sm font-medium">Last Check-in:</div>
                        <div className="text-xs sm:text-sm">{selectedDefendant.lastCheckIn}</div>
                        <div className="text-xs sm:text-sm font-medium">Next Check-in:</div>
                        <div className="text-xs sm:text-sm">{selectedDefendant.nextCheckIn}</div>
                        <div className="text-xs sm:text-sm font-medium">Check-in Method:</div>
                        <div className="text-xs sm:text-sm">{selectedDefendant.checkInMethod}</div>
                        <div className="text-xs sm:text-sm font-medium">Check-in Frequency:</div>
                        <div className="text-xs sm:text-sm">{selectedDefendant.checkInFrequency}</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-2 font-medium text-sm sm:text-base">Location Status</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 rounded-lg border p-3">
                        <div className="text-xs sm:text-sm font-medium">Current Location:</div>
                        <div className="text-xs sm:text-sm">
                          <LocationBadge status={selectedDefendant.location} />
                        </div>
                        <div className="text-xs sm:text-sm font-medium">Last Updated:</div>
                        <div className="text-xs sm:text-sm">Today, 2:30 PM</div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-end gap-2">
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        <Phone className="mr-2 h-4 w-4" />
                        Contact
                      </Button>
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        <MapPin className="mr-2 h-4 w-4" />
                        Track
                      </Button>
                      <Button size="sm" className="w-full sm:w-auto">
                        <Bell className="mr-2 h-4 w-4" />
                        Set Alert
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="check-ins">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <h4 className="font-medium text-sm sm:text-base">Check-in History</h4>
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Check-in
                    </Button>
                  </div>

                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="min-w-[100px]">Date</TableHead>
                          <TableHead className="min-w-[80px]">Time</TableHead>
                          <TableHead className="min-w-[100px]">Status</TableHead>
                          <TableHead className="min-w-[80px]">Method</TableHead>
                          <TableHead className="min-w-[80px]">Notes</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedDefendant.checkInHistory.map((checkIn, index) => (
                          <TableRow key={index}>
                            <TableCell className="text-xs sm:text-sm">{checkIn.date}</TableCell>
                            <TableCell className="text-xs sm:text-sm">{checkIn.time}</TableCell>
                            <TableCell>
                              {checkIn.status === "Completed" ? (
                                <Badge className="bg-green-500 hover:bg-green-600 text-xs">Completed</Badge>
                              ) : checkIn.status === "Late" ? (
                                <Badge className="bg-yellow-500 hover:bg-yellow-600 text-xs">Late</Badge>
                              ) : (
                                <Badge className="bg-red-500 hover:bg-red-600 text-xs">Missed</Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-xs sm:text-sm">{checkIn.method}</TableCell>
                            <TableCell className="text-xs sm:text-sm">-</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="location">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <h4 className="font-medium text-sm sm:text-base">Location History</h4>
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">
                      <MapPin className="mr-2 h-4 w-4" />
                      View Live Location
                    </Button>
                  </div>

                  <div className="rounded-lg border bg-muted/40 p-2">
                    <div className="aspect-video rounded-md bg-muted">
                      <div className="flex h-full items-center justify-center">
                        <p className="text-xs sm:text-sm text-muted-foreground">Map view would be displayed here</p>
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="min-w-[100px]">Date</TableHead>
                          <TableHead className="min-w-[80px]">Time</TableHead>
                          <TableHead className="min-w-[100px]">Location</TableHead>
                          <TableHead className="min-w-[120px]">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedDefendant.locationHistory.map((location, index) => (
                          <TableRow key={index}>
                            <TableCell className="text-xs sm:text-sm">{location.date}</TableCell>
                            <TableCell className="text-xs sm:text-sm">{location.time}</TableCell>
                            <TableCell className="text-xs sm:text-sm">{location.location}</TableCell>
                            <TableCell>
                              <LocationBadge status={location.status} />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="alerts">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <h4 className="font-medium text-sm sm:text-base">Alert Settings</h4>
                    <Button size="sm" className="w-full sm:w-auto">
                      <Plus className="mr-2 h-4 w-4" />
                      New Alert
                    </Button>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                          <h5 className="font-medium text-sm sm:text-base">Missed Check-in Alert</h5>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            Notify when defendant misses a scheduled check-in
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="text-xs">Active</Badge>
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                          <h5 className="font-medium text-sm sm:text-base">Geo-fence Alert</h5>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            Notify when defendant leaves allowed area
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="text-xs">Active</Badge>
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                          <h5 className="font-medium text-sm sm:text-base">Court Date Reminder</h5>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            Send reminder 48 hours before court date
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="text-xs">Active</Badge>
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-2 font-medium text-sm sm:text-base">Alert History</h4>
                    {selectedDefendant.alerts > 0 ? (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="min-w-[100px]">Date</TableHead>
                              <TableHead className="min-w-[80px]">Time</TableHead>
                              <TableHead className="min-w-[120px]">Type</TableHead>
                              <TableHead className="min-w-[80px]">Status</TableHead>
                              <TableHead className="min-w-[120px]">Action Taken</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedDefendant.id === "DEF-1002" && (
                              <>
                                <TableRow>
                                  <TableCell className="text-xs sm:text-sm">Jun 9, 2025</TableCell>
                                  <TableCell className="text-xs sm:text-sm">10:15 AM</TableCell>
                                  <TableCell className="text-xs sm:text-sm">Missed Check-in</TableCell>
                                  <TableCell>
                                    <Badge className="bg-red-500 hover:bg-red-600 text-xs">Active</Badge>
                                  </TableCell>
                                  <TableCell className="text-xs sm:text-sm">Phone call attempted</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="text-xs sm:text-sm">Jun 8, 2025</TableCell>
                                  <TableCell className="text-xs sm:text-sm">8:30 PM</TableCell>
                                  <TableCell className="text-xs sm:text-sm">Geo-fence Violation</TableCell>
                                  <TableCell>
                                    <Badge className="bg-red-500 hover:bg-red-600 text-xs">Active</Badge>
                                  </TableCell>
                                  <TableCell className="text-xs sm:text-sm">None</TableCell>
                                </TableRow>
                              </>
                            )}
                            {selectedDefendant.id === "DEF-1003" && (
                              <TableRow>
                                <TableCell className="text-xs sm:text-sm">Jun 9, 2025</TableCell>
                                <TableCell className="text-xs sm:text-sm">5:45 PM</TableCell>
                                <TableCell className="text-xs sm:text-sm">Late Check-in</TableCell>
                                <TableCell>
                                  <Badge className="bg-green-500 hover:bg-green-600 text-xs">Resolved</Badge>
                                </TableCell>
                                <TableCell className="text-xs sm:text-sm">Warning issued</TableCell>
                              </TableRow>
                            )}
                            {selectedDefendant.id === "DEF-1005" && (
                              <>
                                <TableRow>
                                  <TableCell className="text-xs sm:text-sm">Jun 6, 2025</TableCell>
                                  <TableCell className="text-xs sm:text-sm">3:00 PM</TableCell>
                                  <TableCell className="text-xs sm:text-sm">Missed Check-in</TableCell>
                                  <TableCell>
                                    <Badge className="bg-red-500 hover:bg-red-600 text-xs">Active</Badge>
                                  </TableCell>
                                  <TableCell className="text-xs sm:text-sm">Warrant requested</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="text-xs sm:text-sm">Jun 5, 2025</TableCell>
                                  <TableCell className="text-xs sm:text-sm">8:30 PM</TableCell>
                                  <TableCell className="text-xs sm:text-sm">Geo-fence Violation</TableCell>
                                  <TableCell>
                                    <Badge className="bg-red-500 hover:bg-red-600 text-xs">Active</Badge>
                                  </TableCell>
                                  <TableCell className="text-xs sm:text-sm">Bondsman notified</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="text-xs sm:text-sm">Jun 3, 2025</TableCell>
                                  <TableCell className="text-xs sm:text-sm">3:00 PM</TableCell>
                                  <TableCell className="text-xs sm:text-sm">Missed Check-in</TableCell>
                                  <TableCell>
                                    <Badge className="bg-red-500 hover:bg-red-600 text-xs">Active</Badge>
                                  </TableCell>
                                  <TableCell className="text-xs sm:text-sm">Phone call attempted</TableCell>
                                </TableRow>
                              </>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    ) : (
                      <div className="rounded-lg border p-8 text-center">
                        <p className="text-muted-foreground text-xs sm:text-sm">No alerts for this defendant</p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between gap-3">
            <Button variant="outline" onClick={() => setSelectedDefendant(null)} className="w-full sm:w-auto">
              Close
            </Button>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto">
                <Phone className="mr-2 h-4 w-4" />
                Contact
              </Button>
              <Button className="w-full sm:w-auto">
                <Settings className="mr-2 h-4 w-4" />
                Manage
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
