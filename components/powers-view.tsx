"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Package, FileText, Search, Download, AlertTriangle, TrendingUp, Eye, ShoppingCart } from "lucide-react"

// Sample powers data
const powersData = [
  {
    id: "1",
    insurer: "Universal Fire & Casualty Insurance Company",
    prefix: "123",
    faceValue: 123.0,
    available: 1107,
    total: 1500,
    status: "active",
    lastOrdered: "2024-12-15",
  },
  {
    id: "2",
    insurer: "Universal Fire & Casualty Insurance Company",
    prefix: "gary",
    faceValue: 50000.0,
    available: 234,
    total: 500,
    status: "low",
    lastOrdered: "2024-11-20",
  },
  {
    id: "3",
    insurer: "Surety Bonding Company",
    prefix: "SBC",
    faceValue: 25000.0,
    available: 45,
    total: 200,
    status: "critical",
    lastOrdered: "2024-10-05",
  },
  {
    id: "4",
    insurer: "American Surety Company",
    prefix: "ASC",
    faceValue: 10000.0,
    available: 892,
    total: 1000,
    status: "active",
    lastOrdered: "2025-01-10",
  },
]

const recentReceipts = [
  {
    id: "R001",
    date: "2025-06-08",
    insurer: "Universal Fire & Casualty",
    prefix: "123",
    quantity: 100,
    receivedBy: "Lucas",
  },
  {
    id: "R002",
    date: "2025-06-05",
    insurer: "Surety Bonding Company",
    prefix: "SBC",
    quantity: 50,
    receivedBy: "Agent Smith",
  },
]

export function PowersView() {
  const [selectedInsurer, setSelectedInsurer] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const getStatusBadge = (status: string, available: number, total: number) => {
    const percentage = (available / total) * 100

    if (percentage <= 10) {
      return <Badge className="bg-red-100 text-red-800">Critical</Badge>
    } else if (percentage <= 25) {
      return <Badge className="bg-yellow-100 text-yellow-800">Low Stock</Badge>
    } else {
      return <Badge className="bg-green-100 text-green-800">In Stock</Badge>
    }
  }

  const totalAvailablePowers = powersData.reduce((sum, power) => sum + power.available, 0)
  const totalPowers = powersData.reduce((sum, power) => sum + power.total, 0)
  const lowStockCount = powersData.filter((power) => power.available / power.total <= 0.25).length
  const criticalStockCount = powersData.filter((power) => power.available / power.total <= 0.1).length

  const filteredPowers = powersData.filter((power) => {
    const matchesInsurer =
      selectedInsurer === "all" || power.insurer.toLowerCase().includes(selectedInsurer.toLowerCase())
    const matchesSearch =
      power.insurer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      power.prefix.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesInsurer && matchesSearch
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Powers Management</h1>
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Powers
          </Button>
          <Button variant="outline">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Order Powers Request
          </Button>
          <Button variant="outline">
            <Package className="mr-2 h-4 w-4" />
            Issue Group of Powers
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full p-2 bg-blue-100">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Available Powers</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-2xl font-bold">{totalAvailablePowers.toLocaleString()}</h3>
                  <p className="text-xs text-muted-foreground">of {totalPowers.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full p-2 bg-green-100">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Stock Level</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-2xl font-bold">{Math.round((totalAvailablePowers / totalPowers) * 100)}%</h3>
                  <p className="text-xs text-muted-foreground">Overall</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full p-2 bg-yellow-100">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Low Stock Items</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-2xl font-bold">{lowStockCount}</h3>
                  <p className="text-xs text-muted-foreground">Need Reorder</p>
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
                <p className="text-sm font-medium text-muted-foreground">Critical Stock</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-2xl font-bold">{criticalStockCount}</h3>
                  <p className="text-xs text-muted-foreground">Urgent</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="inventory" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="inventory">Inventory Summary</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
          <TabsTrigger value="receipts">Added Powers Receipts</TabsTrigger>
          <TabsTrigger value="group-receipts">Group Receipts</TabsTrigger>
          <TabsTrigger value="agent-summary">Agent Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col gap-2 md:flex-row md:items-center">
                  <label className="text-sm font-medium">Insurer:</label>
                  <Select value={selectedInsurer} onValueChange={setSelectedInsurer}>
                    <SelectTrigger className="w-full md:w-[300px]">
                      <SelectValue placeholder="Select Insurer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Insurers</SelectItem>
                      <SelectItem value="universal">Universal Fire & Casualty Insurance Company</SelectItem>
                      <SelectItem value="surety">Surety Bonding Company</SelectItem>
                      <SelectItem value="american">American Surety Company</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search powers..."
                      className="pl-9 w-[300px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Powers Inventory Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Powers Inventory</CardTitle>
                  <CardDescription>Total Available Powers = {totalAvailablePowers.toLocaleString()}</CardDescription>
                </div>
                <span className="text-sm text-muted-foreground">
                  {filteredPowers.length} of {powersData.length} items
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Insurer</TableHead>
                    <TableHead>Prefix</TableHead>
                    <TableHead className="text-right">Face Value</TableHead>
                    <TableHead className="text-right"># Available</TableHead>
                    <TableHead className="text-right">Total Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Ordered</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPowers.map((power) => (
                    <TableRow key={power.id}>
                      <TableCell className="font-medium max-w-[300px]">
                        <div className="truncate" title={power.insurer}>
                          {power.insurer}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{power.prefix}</TableCell>
                      <TableCell className="text-right font-medium">{formatCurrency(power.faceValue)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="font-medium">{power.available.toLocaleString()}</span>
                          <Button variant="link" className="p-0 h-auto text-xs text-blue-600">
                            (view all)
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">{power.total.toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(power.status, power.available, power.total)}</TableCell>
                      <TableCell>{power.lastOrdered}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View Details</span>
                          </Button>
                          <Button variant="ghost" size="icon">
                            <FileText className="h-4 w-4" />
                            <span className="sr-only">Generate Report</span>
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

        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Powers Register</CardTitle>
              <CardDescription>Complete register of all power transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10 text-muted-foreground">
                Powers register functionality will be implemented here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="receipts">
          <Card>
            <CardHeader>
              <CardTitle>Added Powers Receipts</CardTitle>
              <CardDescription>Track received power inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Receipt ID</TableHead>
                    <TableHead>Date Received</TableHead>
                    <TableHead>Insurer</TableHead>
                    <TableHead>Prefix</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead>Received By</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentReceipts.map((receipt) => (
                    <TableRow key={receipt.id}>
                      <TableCell className="font-medium">{receipt.id}</TableCell>
                      <TableCell>{receipt.date}</TableCell>
                      <TableCell>{receipt.insurer}</TableCell>
                      <TableCell>{receipt.prefix}</TableCell>
                      <TableCell className="text-right">{receipt.quantity}</TableCell>
                      <TableCell>{receipt.receivedBy}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <FileText className="h-4 w-4" />
                          <span className="sr-only">View Receipt</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="group-receipts">
          <Card>
            <CardHeader>
              <CardTitle>Issue Group of Powers Receipts</CardTitle>
              <CardDescription>Bulk power issuance tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10 text-muted-foreground">
                Group receipts functionality will be implemented here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agent-summary">
          <Card>
            <CardHeader>
              <CardTitle>Agent Inventory Summary</CardTitle>
              <CardDescription>Powers inventory by agent</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10 text-muted-foreground">
                Agent inventory summary will be implemented here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced Search</CardTitle>
          <CardDescription>Search powers by specific criteria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="text-sm font-medium mb-1 block">Search Type</label>
              <Select defaultValue="powers">
                <SelectTrigger>
                  <SelectValue placeholder="Powers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="powers">Powers</SelectItem>
                  <SelectItem value="receipts">Receipts</SelectItem>
                  <SelectItem value="orders">Orders</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Search Term</label>
              <Input placeholder="Enter search term..." />
            </div>
            <div className="flex items-end">
              <Button className="w-full">Search</Button>
            </div>
          </div>
          <div className="mt-4">
            <Button variant="link" className="p-0 text-blue-600">
              Advanced Search Options
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
