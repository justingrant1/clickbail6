"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Plus,
  Search,
  Download,
  Filter,
  Calendar,
  Users,
  TrendingUp,
  Phone,
  FileText,
  Eye,
  Edit,
  UserPlus,
} from "lucide-react"

// Sample prospects data
const prospectsData = [
  {
    id: "1",
    dateAdded: "12/16/24 02:34 PM",
    defendantName: "Perry, Tyler",
    birthDate: "06/21/1972",
    filterGroup: "Hot",
    leadSource: "Google",
    addedBy: "Lucas",
    lastEditedBy: "Lucas",
    editDateTime: "12/16/24 02:36 PM",
    totalBondAmount: 25000.0,
    prospectStatus: "Converted to Def",
    phone: "(555) 123-4567",
    email: "perry.tyler@email.com",
    jail: "County Jail",
    charges: "DUI",
  },
  {
    id: "2",
    dateAdded: "12/04/24 01:22 PM",
    defendantName: "Test, Mario",
    birthDate: "05/16/1989",
    filterGroup: "None",
    leadSource: "Google",
    addedBy: "Lucas",
    lastEditedBy: "Lucas",
    editDateTime: "12/04/24 01:23 PM",
    totalBondAmount: 10000.0,
    prospectStatus: "Converted to Def",
    phone: "(555) 987-6543",
    email: "test.mario@email.com",
    jail: "City Jail",
    charges: "Theft",
  },
  {
    id: "3",
    dateAdded: "11/27/24 07:25 PM",
    defendantName: "Schemmel, Kail",
    birthDate: "01/03/1996",
    filterGroup: "None",
    leadSource: "Google",
    addedBy: "Lucas",
    lastEditedBy: "Lucas",
    editDateTime: "11/27/24 07:25 PM",
    totalBondAmount: 1000.0,
    prospectStatus: "Needs Work",
    phone: "(555) 456-7890",
    email: "schemmel.kail@email.com",
    jail: "County Jail",
    charges: "Disorderly Conduct",
  },
  {
    id: "4",
    dateAdded: "06/25/24 01:46 AM",
    defendantName: "Sdass, Dhanush",
    birthDate: "03/09/2002",
    filterGroup: "None",
    leadSource: "Attorney Referrals",
    addedBy: "Lucas",
    lastEditedBy: "Lucas",
    editDateTime: "06/04/25 07:50 PM",
    totalBondAmount: 0.0,
    prospectStatus: "Cold Lead",
    phone: "(555) 321-0987",
    email: "sdass.dhanush@email.com",
    jail: "State Facility",
    charges: "Pending",
  },
]

const recentProspects = [
  "SMITH, HAROLD",
  "SDASS, DHANUSH",
  "DEMON, DEMON",
  "PERRY, TYLER",
  "DOE, JANE",
  "SCHEMMEL, KAIL",
  "SMITH, JOE",
  "GARCIA, OSCAR",
]

export function ProspectsView() {
  const [selectedProspects, setSelectedProspects] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterGroup, setFilterGroup] = useState("all")
  const [leadSource, setLeadSource] = useState("all")
  const [prospectStatus, setProspectStatus] = useState("all")

  const handleSelectProspect = (prospectId: string) => {
    setSelectedProspects((prev) =>
      prev.includes(prospectId) ? prev.filter((id) => id !== prospectId) : [...prev, prospectId],
    )
  }

  const handleSelectAll = () => {
    setSelectedProspects(
      selectedProspects.length === prospectsData.length ? [] : prospectsData.map((prospect) => prospect.id),
    )
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "converted to def":
        return <Badge className="bg-green-100 text-green-800">Converted</Badge>
      case "hot lead":
        return <Badge className="bg-red-100 text-red-800">Hot Lead</Badge>
      case "cold lead":
        return <Badge className="bg-blue-100 text-blue-800">Cold Lead</Badge>
      case "needs work":
        return <Badge className="bg-orange-100 text-orange-800">Needs Work</Badge>
      case "court update":
        return <Badge className="bg-green-100 text-green-800">Court Update</Badge>
      case "cosigner needed":
        return <Badge className="bg-purple-100 text-purple-800">Cosigner Needed</Badge>
      default:
        return <Badge variant="outline">No Label</Badge>
    }
  }

  const getFilterGroupBadge = (group: string) => {
    switch (group.toLowerCase()) {
      case "hot":
        return <Badge className="bg-red-500 text-white">Hot</Badge>
      case "warm":
        return <Badge className="bg-orange-500 text-white">Warm</Badge>
      case "cold":
        return <Badge className="bg-blue-500 text-white">Cold</Badge>
      default:
        return <Badge variant="outline">None</Badge>
    }
  }

  const totalProspects = prospectsData.length
  const hotLeads = prospectsData.filter((p) => p.filterGroup.toLowerCase() === "hot").length
  const convertedProspects = prospectsData.filter((p) => p.prospectStatus.toLowerCase().includes("converted")).length
  const totalBondValue = prospectsData.reduce((sum, prospect) => sum + prospect.totalBondAmount, 0)

  const filteredProspects = prospectsData.filter((prospect) => {
    const matchesSearch =
      prospect.defendantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prospect.charges.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGroup = filterGroup === "all" || prospect.filterGroup.toLowerCase() === filterGroup.toLowerCase()
    const matchesSource = leadSource === "all" || prospect.leadSource.toLowerCase() === leadSource.toLowerCase()
    const matchesStatus =
      prospectStatus === "all" || prospect.prospectStatus.toLowerCase() === prospectStatus.toLowerCase()
    return matchesSearch && matchesGroup && matchesSource && matchesStatus
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Prospects Management</h1>
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Prospect
          </Button>
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Work Sheet
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export to Excel
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full p-2 bg-blue-100">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Prospects</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-2xl font-bold">{totalProspects}</h3>
                  <p className="text-xs text-muted-foreground">Active</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full p-2 bg-red-100">
                <TrendingUp className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Hot Leads</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-2xl font-bold">{hotLeads}</h3>
                  <p className="text-xs text-muted-foreground">Priority</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full p-2 bg-green-100">
                <UserPlus className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Converted</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-2xl font-bold">{convertedProspects}</h3>
                  <p className="text-xs text-muted-foreground">To Clients</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full p-2 bg-purple-100">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Bond Value</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-2xl font-bold">{formatCurrency(totalBondValue)}</h3>
                  <p className="text-xs text-muted-foreground">Potential</p>
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
            <CardTitle>Prospects</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1 p-2">
              <Button variant="ghost" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Last 10 Prospects
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                All Prospects (77)
              </Button>
              <Button variant="default" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Active Prospects (76)
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Archived Prospects (1)
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Prospect Calendar
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Follow Up Calendar
              </Button>
            </div>

            <div className="border-t p-4">
              <h4 className="font-medium mb-2">Recent Prospects</h4>
              <div className="space-y-1">
                {recentProspects.slice(0, 8).map((name, index) => (
                  <Button key={index} variant="link" className="p-0 h-auto text-xs justify-start">
                    {name}
                  </Button>
                ))}
              </div>
            </div>

            <div className="border-t p-4">
              <h4 className="font-medium mb-2">Search</h4>
              <div className="space-y-2">
                <Select defaultValue="prospects">
                  <SelectTrigger>
                    <SelectValue placeholder="Prospects" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prospects">Prospects</SelectItem>
                    <SelectItem value="clients">Clients</SelectItem>
                    <SelectItem value="bonds">Bonds</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="w-full">Go</Button>
                <Button variant="link" className="p-0 text-xs">
                  Advanced Search
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="space-y-4">
          <Tabs defaultValue="active" className="space-y-4">
            <TabsList>
              <TabsTrigger value="active">Active Prospects</TabsTrigger>
              <TabsTrigger value="archived">Archived Prospects</TabsTrigger>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              {/* Filters */}
              <Card>
                <CardContent className="p-6">
                  <div className="grid gap-4 md:grid-cols-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Filter Group</label>
                      <Select value={filterGroup} onValueChange={setFilterGroup}>
                        <SelectTrigger>
                          <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="hot">Hot</SelectItem>
                          <SelectItem value="warm">Warm</SelectItem>
                          <SelectItem value="cold">Cold</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1 block">Added By</label>
                      <Select defaultValue="all">
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
                      <label className="text-sm font-medium mb-1 block">Lead Source</label>
                      <Select value={leadSource} onValueChange={setLeadSource}>
                        <SelectTrigger>
                          <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="google">Google</SelectItem>
                          <SelectItem value="attorney referrals">Attorney Referrals</SelectItem>
                          <SelectItem value="walk in">Walk In</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1 block">Prospect Status</label>
                      <Select value={prospectStatus} onValueChange={setProspectStatus}>
                        <SelectTrigger>
                          <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="hot lead">Hot Lead</SelectItem>
                          <SelectItem value="cold lead">Cold Lead</SelectItem>
                          <SelectItem value="needs work">Needs Work</SelectItem>
                          <SelectItem value="converted to def">Converted</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-4 mt-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Jail / Facility</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="county">County Jail</SelectItem>
                          <SelectItem value="city">City Jail</SelectItem>
                          <SelectItem value="state">State Facility</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1 block">Month</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="01">January</SelectItem>
                          <SelectItem value="02">February</SelectItem>
                          <SelectItem value="03">March</SelectItem>
                          <SelectItem value="04">April</SelectItem>
                          <SelectItem value="05">May</SelectItem>
                          <SelectItem value="06">June</SelectItem>
                          <SelectItem value="07">July</SelectItem>
                          <SelectItem value="08">August</SelectItem>
                          <SelectItem value="09">September</SelectItem>
                          <SelectItem value="10">October</SelectItem>
                          <SelectItem value="11">November</SelectItem>
                          <SelectItem value="12">December</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1 block">Day</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          {Array.from({ length: 31 }, (_, i) => (
                            <SelectItem key={i + 1} value={(i + 1).toString()}>
                              {i + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1 block">Year</label>
                      <Select defaultValue="2025">
                        <SelectTrigger>
                          <SelectValue placeholder="2025" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2025">2025</SelectItem>
                          <SelectItem value="2024">2024</SelectItem>
                          <SelectItem value="2023">2023</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <Button>GO</Button>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="Search prospects..."
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

              {/* Prospect Labels */}
              <Card>
                <CardHeader>
                  <CardTitle>Prospect Labels</CardTitle>
                  <CardDescription>Filter prospects by label</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="cursor-pointer border-2 border-red-500 bg-red-500 text-white px-4 py-2 text-base">
                      Hot Lead
                    </Badge>
                    <Badge className="cursor-pointer border-2 border-blue-500 bg-blue-500 text-white px-4 py-2 text-base">
                      Cold Lead
                    </Badge>
                    <Badge className="cursor-pointer border-2 border-orange-500 bg-orange-500 text-white px-4 py-2 text-base">
                      Needs Work
                    </Badge>
                    <Badge className="cursor-pointer border-2 border-green-500 bg-green-500 text-white px-4 py-2 text-base">
                      Court Update
                    </Badge>
                    <Badge className="cursor-pointer border-2 border-purple-500 bg-purple-500 text-white px-4 py-2 text-base">
                      Cosigner Needed
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer border-2 px-4 py-2 text-base">
                      No Label
                    </Badge>
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

              {/* Prospect Actions */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Select defaultValue="more-actions">
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="-- More Actions --" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="more-actions">-- More Actions --</SelectItem>
                          <SelectItem value="bulk-update">Bulk Update Status</SelectItem>
                          <SelectItem value="assign">Assign to Agent</SelectItem>
                          <SelectItem value="export">Export Selected</SelectItem>
                          <SelectItem value="delete">Delete Selected</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" disabled={selectedProspects.length === 0}>
                        Apply to Selected ({selectedProspects.length})
                      </Button>
                    </div>
                    <span className="text-sm text-muted-foreground">1 to 50 of 76</span>
                  </div>
                </CardContent>
              </Card>

              {/* Prospects Table */}
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">
                          <Checkbox
                            checked={selectedProspects.length === filteredProspects.length}
                            onCheckedChange={handleSelectAll}
                          />
                        </TableHead>
                        <TableHead>Date/Time Added</TableHead>
                        <TableHead>Defendant Name</TableHead>
                        <TableHead>Filter Group</TableHead>
                        <TableHead>Lead Source</TableHead>
                        <TableHead>Added By</TableHead>
                        <TableHead>Last Edited By</TableHead>
                        <TableHead>Edit Date/Time</TableHead>
                        <TableHead className="text-right">Total Bond Amount</TableHead>
                        <TableHead>Prospect Status</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProspects.map((prospect) => (
                        <TableRow key={prospect.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedProspects.includes(prospect.id)}
                              onCheckedChange={() => handleSelectProspect(prospect.id)}
                            />
                          </TableCell>
                          <TableCell className="font-medium">{prospect.dateAdded}</TableCell>
                          <TableCell>
                            <div>
                              <Button variant="link" className="p-0 h-auto font-medium text-blue-600">
                                {prospect.defendantName}
                              </Button>
                              <div className="text-xs text-muted-foreground">{prospect.birthDate}</div>
                            </div>
                          </TableCell>
                          <TableCell>{getFilterGroupBadge(prospect.filterGroup)}</TableCell>
                          <TableCell>{prospect.leadSource}</TableCell>
                          <TableCell>{prospect.addedBy}</TableCell>
                          <TableCell>{prospect.lastEditedBy}</TableCell>
                          <TableCell>{prospect.editDateTime}</TableCell>
                          <TableCell className="text-right font-medium">
                            {formatCurrency(prospect.totalBondAmount)}
                          </TableCell>
                          <TableCell>{getStatusBadge(prospect.prospectStatus)}</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Phone className="h-4 w-4" />
                                <span className="sr-only">Call</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="archived">
              <Card>
                <CardContent className="p-6 text-center py-10 text-muted-foreground">
                  No archived prospects to display
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="calendar">
              <Card>
                <CardContent className="p-6 text-center py-10 text-muted-foreground">
                  Calendar view will be implemented here
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
