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
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  UserPlus,
  Search,
  Download,
  Filter,
  Users,
  AlertTriangle,
  DollarSign,
  Eye,
  Edit,
  Phone,
  MapPin,
  Camera,
  Gift,
  FileText,
  TrendingUp,
  UserCheck,
} from "lucide-react"

// Sample clients data
const clientsData = [
  {
    id: "1",
    name: "1e1, D1r",
    birthDate: "12/12/2000",
    phone: "",
    activeBonds: 1,
    allBonds: 1,
    dateAdded: "06/15/2024",
    fta: 0,
    lastPayment: "",
    lastCheckIn: "",
    nextPaymentDue: "N/A",
    nextCourtDate: "",
    balance: 1.0,
    status: "active",
    label: "none",
    inCustody: false,
    address: "123 Main St, City, State",
    email: "client1@email.com",
  },
  {
    id: "2",
    name: "Aa, Dd",
    birthDate: "12/12/2012",
    phone: "626-598-7485",
    activeBonds: 1,
    allBonds: 1,
    dateAdded: "01/07/2015",
    fta: 0,
    lastPayment: "02/12/2024",
    lastCheckIn: "06/11/2024",
    nextPaymentDue: "N/A",
    nextCourtDate: "",
    balance: -50.0,
    status: "active",
    label: "bad-address",
    inCustody: false,
    address: "456 Oak Ave, City, State",
    email: "aa.dd@email.com",
  },
  {
    id: "3",
    name: "Aaaaaa, Jim5",
    birthDate: "01/01/2020",
    phone: "",
    activeBonds: 1,
    allBonds: 2,
    dateAdded: "03/24/2020",
    fta: 0,
    lastPayment: "06/13/2023",
    lastCheckIn: "",
    nextPaymentDue: "N/A",
    nextCourtDate: "",
    balance: 0.0,
    status: "active",
    label: "supervised",
    inCustody: false,
    address: "789 Pine St, City, State",
    email: "aaaaaa.jim5@email.com",
  },
  {
    id: "4",
    name: "Aasdasd, Aadassd",
    birthDate: "08/22/1989",
    phone: "919-307-3618",
    activeBonds: 2,
    allBonds: 2,
    dateAdded: "06/20/2013",
    fta: 0,
    lastPayment: "11/04/2022",
    lastCheckIn: "07/11/2023",
    nextPaymentDue: "N/A",
    nextCourtDate: "",
    balance: -600.0,
    status: "active",
    label: "escrow-payment",
    inCustody: true,
    address: "321 Elm St, City, State",
    email: "aasdasd.aadassd@email.com",
  },
  {
    id: "5",
    name: "ABE, AB A",
    birthDate: "12/12/1983",
    phone: "406-533-6555",
    activeBonds: 2,
    allBonds: 6,
    dateAdded: "02/16/2012",
    fta: 2,
    lastPayment: "09/11/2013",
    lastCheckIn: "04/16/2025",
    nextPaymentDue: "N/A",
    nextCourtDate: "",
    balance: 0.0,
    status: "active",
    label: "gps",
    inCustody: false,
    address: "654 Maple Dr, City, State",
    email: "abe.aba@email.com",
  },
]

const recentClients = [
  "SMITH, HAROLD",
  "JOHNSON, MARY",
  "WILLIAMS, ROBERT",
  "BROWN, PATRICIA",
  "JONES, MICHAEL",
  "GARCIA, LINDA",
  "MILLER, WILLIAM",
  "DAVIS, ELIZABETH",
]

export function ClientsView() {
  const [selectedClients, setSelectedClients] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showCustody, setShowCustody] = useState(false)
  const [selectedLabel, setSelectedLabel] = useState("all")
  const [clientFilter, setClientFilter] = useState("all")

  const handleSelectClient = (clientId: string) => {
    setSelectedClients((prev) => (prev.includes(clientId) ? prev.filter((id) => id !== clientId) : [...prev, clientId]))
  }

  const handleSelectAll = () => {
    setSelectedClients(selectedClients.length === clientsData.length ? [] : clientsData.map((client) => client.id))
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const getLabelBadge = (label: string) => {
    switch (label) {
      case "deceased":
        return <Badge className="bg-red-100 text-red-800">Deceased</Badge>
      case "bad-address":
        return <Badge className="bg-blue-100 text-blue-800">Bad Address</Badge>
      case "supervised":
        return <Badge className="bg-orange-100 text-orange-800">Supervised</Badge>
      case "escrow-payment":
        return <Badge className="bg-green-100 text-green-800">Escrow Payment</Badge>
      case "gps":
        return <Badge className="bg-purple-100 text-purple-800">GPS</Badge>
      default:
        return <Badge variant="outline">No Label</Badge>
    }
  }

  const getStatusIndicator = (status: string, inCustody: boolean) => {
    if (inCustody) {
      return <div className="h-3 w-3 rounded-full bg-red-500" title="In Custody" />
    } else if (status === "active") {
      return <div className="h-3 w-3 rounded-full bg-green-500" title="Active" />
    } else {
      return <div className="h-3 w-3 rounded-full bg-gray-500" title="Inactive" />
    }
  }

  const totalClients = clientsData.length
  const activeClients = clientsData.filter((client) => client.status === "active").length
  const inCustodyCount = clientsData.filter((client) => client.inCustody).length
  const totalBalance = clientsData.reduce((sum, client) => sum + client.balance, 0)

  const filteredClients = clientsData.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLabel = selectedLabel === "all" || client.label === selectedLabel
    const matchesCustody = !showCustody || client.inCustody
    const matchesFilter =
      clientFilter === "all" ||
      (clientFilter === "active" && client.status === "active") ||
      (clientFilter === "fta" && client.fta > 0) ||
      (clientFilter === "custody" && client.inCustody)
    return matchesSearch && matchesLabel && matchesCustody && matchesFilter
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Clients Management</h1>
        <div className="flex gap-2">
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            New Client
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
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
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Clients</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-2xl font-bold">{totalClients}</h3>
                  <p className="text-xs text-muted-foreground">Active: {activeClients}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full p-2 bg-red-100">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Custody</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-2xl font-bold">{inCustodyCount}</h3>
                  <p className="text-xs text-muted-foreground">Flagged</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full p-2 bg-green-100">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Balance</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-2xl font-bold">{formatCurrency(totalBalance)}</h3>
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
                <p className="text-sm font-medium text-muted-foreground">FTA Count</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-2xl font-bold">{clientsData.reduce((sum, client) => sum + client.fta, 0)}</h3>
                  <p className="text-xs text-muted-foreground">Total</p>
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
            <CardTitle>Client Section</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1 p-2">
              <Button variant="ghost" className="w-full justify-start">
                <UserCheck className="mr-2 h-4 w-4" />
                Clients I Am Following (6)
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                All Clients
              </Button>
              <Button variant="default" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Active Defendants
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Active Indemnitors
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                References
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <DollarSign className="mr-2 h-4 w-4" />
                Collections
              </Button>
              <Button variant="ghost" className="w-full justify-start text-red-600">
                <AlertTriangle className="mr-2 h-4 w-4" />
                DO NOT BOND LIST
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Most Wanted List
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <MapPin className="mr-2 h-4 w-4" />
                No Valid Address
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Phone className="mr-2 h-4 w-4" />
                No Valid Phone
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Customer Document Requests
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Prospect Document Requests
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Added By Online Application
              </Button>
              <Button variant="ghost" className="w-full justify-start text-red-600">
                <AlertTriangle className="mr-2 h-4 w-4" />
                DO NOT BOND Shareable List
              </Button>
            </div>

            <div className="border-t p-4">
              <h4 className="font-medium mb-2">Photos / Wanted / Birthdays</h4>
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start text-sm">
                  <Camera className="mr-2 h-4 w-4" />
                  Online Wanted Poster List
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  <Camera className="mr-2 h-4 w-4" />
                  Selfie / Client Photos List
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  <Gift className="mr-2 h-4 w-4" />
                  Clients / Birthdays Today
                </Button>
              </div>
            </div>

            <div className="border-t p-4">
              <h4 className="font-medium mb-2">Search</h4>
              <div className="space-y-2">
                <Select defaultValue="clients">
                  <SelectTrigger>
                    <SelectValue placeholder="Clients" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clients">Clients</SelectItem>
                    <SelectItem value="bonds">Bonds</SelectItem>
                    <SelectItem value="prospects">Prospects</SelectItem>
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
              <TabsTrigger value="active">Active Defendants</TabsTrigger>
              <TabsTrigger value="indemnitors">Active Indemnitors</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
              <TabsTrigger value="collections">Collections</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              {/* Filters */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-col gap-2 md:flex-row md:items-center">
                      <label className="text-sm font-medium">Show Clients With:</label>
                      <Select value={clientFilter} onValueChange={setClientFilter}>
                        <SelectTrigger className="w-full md:w-[200px]">
                          <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="active">Active Bonds</SelectItem>
                          <SelectItem value="fta">FTA Status</SelectItem>
                          <SelectItem value="custody">In Custody</SelectItem>
                          <SelectItem value="payments">Due Payments</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button>Go</Button>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="custody" checked={showCustody} onCheckedChange={setShowCustody} />
                      <Label htmlFor="custody">Show Only Clients Flagged "In Custody"</Label>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search by client's first or last name..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Client Labels */}
              <Card>
                <CardHeader>
                  <CardTitle>Client Labels</CardTitle>
                  <CardDescription>Filter clients by label</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      className={`cursor-pointer border-2 border-red-500 px-4 py-2 text-base ${
                        selectedLabel === "deceased" ? "bg-red-500 text-white" : "bg-red-100 text-red-800"
                      }`}
                      onClick={() => setSelectedLabel(selectedLabel === "deceased" ? "all" : "deceased")}
                    >
                      Deceased
                    </Badge>
                    <Badge
                      className={`cursor-pointer border-2 border-blue-500 px-4 py-2 text-base ${
                        selectedLabel === "bad-address" ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-800"
                      }`}
                      onClick={() => setSelectedLabel(selectedLabel === "bad-address" ? "all" : "bad-address")}
                    >
                      Bad Address
                    </Badge>
                    <Badge
                      className={`cursor-pointer border-2 border-orange-500 px-4 py-2 text-base ${
                        selectedLabel === "supervised" ? "bg-orange-500 text-white" : "bg-orange-100 text-orange-800"
                      }`}
                      onClick={() => setSelectedLabel(selectedLabel === "supervised" ? "all" : "supervised")}
                    >
                      Supervised
                    </Badge>
                    <Badge
                      className={`cursor-pointer border-2 border-green-500 px-4 py-2 text-base ${
                        selectedLabel === "escrow-payment" ? "bg-green-500 text-white" : "bg-green-100 text-green-800"
                      }`}
                      onClick={() => setSelectedLabel(selectedLabel === "escrow-payment" ? "all" : "escrow-payment")}
                    >
                      Escrow Payment
                    </Badge>
                    <Badge
                      className={`cursor-pointer border-2 border-purple-500 px-4 py-2 text-base ${
                        selectedLabel === "gps" ? "bg-purple-500 text-white" : "bg-purple-100 text-purple-800"
                      }`}
                      onClick={() => setSelectedLabel(selectedLabel === "gps" ? "all" : "gps")}
                    >
                      GPS
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`cursor-pointer border-2 px-4 py-2 text-base ${
                        selectedLabel === "none" ? "bg-gray-500 text-white" : ""
                      }`}
                      onClick={() => setSelectedLabel(selectedLabel === "none" ? "all" : "none")}
                    >
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

              {/* Client Actions */}
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
                          <SelectItem value="bulk-update">Bulk Update Labels</SelectItem>
                          <SelectItem value="export">Export Selected</SelectItem>
                          <SelectItem value="merge">Merge Clients</SelectItem>
                          <SelectItem value="archive">Archive Selected</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" disabled={selectedClients.length === 0}>
                        Apply to Selected ({selectedClients.length})
                      </Button>
                    </div>
                    <span className="text-sm text-muted-foreground">1 to 50 of 490</span>
                  </div>
                </CardContent>
              </Card>

              {/* Clients Table */}
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">
                          <Checkbox
                            checked={selectedClients.length === filteredClients.length}
                            onCheckedChange={handleSelectAll}
                          />
                        </TableHead>
                        <TableHead className="w-[50px]">Status</TableHead>
                        <TableHead>Name / Birthdate</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead className="text-center">Active Bonds</TableHead>
                        <TableHead className="text-center">All Bonds</TableHead>
                        <TableHead>Date Added</TableHead>
                        <TableHead className="text-center">FTA</TableHead>
                        <TableHead>Last Payment</TableHead>
                        <TableHead>Last Check-In</TableHead>
                        <TableHead>Next Pmt. Due</TableHead>
                        <TableHead>Next Court Date</TableHead>
                        <TableHead className="text-right">Balance</TableHead>
                        <TableHead>Label</TableHead>
                        <TableHead className="w-[100px]">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredClients.map((client) => (
                        <TableRow key={client.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedClients.includes(client.id)}
                              onCheckedChange={() => handleSelectClient(client.id)}
                            />
                          </TableCell>
                          <TableCell>{getStatusIndicator(client.status, client.inCustody)}</TableCell>
                          <TableCell>
                            <div>
                              <Button variant="link" className="p-0 h-auto font-medium text-blue-600">
                                {client.name}
                              </Button>
                              <div className="text-xs text-muted-foreground">{client.birthDate}</div>
                            </div>
                          </TableCell>
                          <TableCell>{client.phone || "N/A"}</TableCell>
                          <TableCell className="text-center">{client.activeBonds}</TableCell>
                          <TableCell className="text-center">{client.allBonds}</TableCell>
                          <TableCell>{client.dateAdded}</TableCell>
                          <TableCell className="text-center">
                            {client.fta > 0 ? (
                              <Badge variant="destructive">{client.fta}</Badge>
                            ) : (
                              <span className="text-muted-foreground">0</span>
                            )}
                          </TableCell>
                          <TableCell>{client.lastPayment || "N/A"}</TableCell>
                          <TableCell>{client.lastCheckIn || "N/A"}</TableCell>
                          <TableCell>{client.nextPaymentDue}</TableCell>
                          <TableCell>{client.nextCourtDate || "N/A"}</TableCell>
                          <TableCell
                            className={`text-right font-medium ${
                              client.balance > 0
                                ? "text-red-600"
                                : client.balance < 0
                                  ? "text-blue-600"
                                  : "text-green-600"
                            }`}
                          >
                            {formatCurrency(client.balance)}
                          </TableCell>
                          <TableCell>{getLabelBadge(client.label)}</TableCell>
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

            <TabsContent value="indemnitors">
              <Card>
                <CardContent className="p-6 text-center py-10 text-muted-foreground">
                  Active indemnitors will be displayed here
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="following">
              <Card>
                <CardContent className="p-6 text-center py-10 text-muted-foreground">
                  Clients you are following will be displayed here
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="collections">
              <Card>
                <CardContent className="p-6 text-center py-10 text-muted-foreground">
                  Clients in collections will be displayed here
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
