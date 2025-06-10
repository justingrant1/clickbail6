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
  CreditCard,
  Download,
  Search,
  Filter,
  DollarSign,
  Receipt,
  FileText,
  TrendingUp,
  AlertCircle,
} from "lucide-react"

// Sample invoice data
const invoiceData = [
  {
    id: "8391102",
    clientName: "Gorbell, Ryan",
    powerNo: "123-786",
    bondAmount: 10000.0,
    invoiceDate: "06/05/25",
    lastPayment: "06/05/25",
    total: 965.0,
    balance: 0.0,
    status: "paid",
  },
  {
    id: "8370006",
    clientName: "Carroll, Dessie",
    powerNo: "123-93986",
    bondAmount: 1500.0,
    invoiceDate: "05/25/25",
    lastPayment: "05/25/25",
    total: 200.0,
    balance: 100.0,
    status: "partial",
  },
  {
    id: "8286570",
    clientName: "Mosier, Matthew",
    powerNo: "123-909",
    bondAmount: 250.0,
    invoiceDate: "04/05/25",
    lastPayment: "04/05/25",
    total: 350.0,
    balance: 0.0,
    status: "paid",
  },
  {
    id: "8164995",
    clientName: "Day, Jarren",
    powerNo: "123-771",
    bondAmount: 20000.0,
    invoiceDate: "01/23/25",
    lastPayment: "01/23/25",
    total: 2000.0,
    balance: 1350.0,
    status: "overdue",
  },
  {
    id: "8166553",
    clientName: "HARRIS, TERRY",
    powerNo: "123-780",
    bondAmount: 50000.0,
    invoiceDate: "01/22/25",
    lastPayment: "01/24/25",
    total: 0.0,
    balance: -1250.0,
    status: "credit",
  },
]

export function MoneyView() {
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const handleSelectInvoice = (invoiceId: string) => {
    setSelectedInvoices((prev) =>
      prev.includes(invoiceId) ? prev.filter((id) => id !== invoiceId) : [...prev, invoiceId],
    )
  }

  const handleSelectAll = () => {
    setSelectedInvoices(selectedInvoices.length === invoiceData.length ? [] : invoiceData.map((invoice) => invoice.id))
  }

  const getStatusBadge = (status: string, balance: number) => {
    if (status === "paid") return <Badge className="bg-green-100 text-green-800">Paid</Badge>
    if (status === "partial") return <Badge className="bg-yellow-100 text-yellow-800">Partial</Badge>
    if (status === "overdue") return <Badge className="bg-red-100 text-red-800">Overdue</Badge>
    if (status === "credit") return <Badge className="bg-blue-100 text-blue-800">Credit</Badge>
    return <Badge variant="outline">Pending</Badge>
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const totalOutstanding = invoiceData.reduce((sum, invoice) => sum + Math.max(0, invoice.balance), 0)
  const totalCredits = invoiceData.reduce((sum, invoice) => sum + Math.min(0, invoice.balance), 0)
  const totalInvoiced = invoiceData.reduce((sum, invoice) => sum + invoice.total, 0)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Money Management</h1>
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Invoice
          </Button>
          <Button variant="outline">
            <CreditCard className="mr-2 h-4 w-4" />
            Receive Payment
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full p-2 bg-green-100">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Invoiced</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-2xl font-bold">{formatCurrency(totalInvoiced)}</h3>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full p-2 bg-red-100">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Outstanding</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-2xl font-bold">{formatCurrency(totalOutstanding)}</h3>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full p-2 bg-blue-100">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Credits</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-2xl font-bold">{formatCurrency(Math.abs(totalCredits))}</h3>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full p-2 bg-purple-100">
                <Receipt className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Invoices</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-2xl font-bold">{invoiceData.length}</h3>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="invoices" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="invoices">List of Invoices</TabsTrigger>
          <TabsTrigger value="summary">Money Summary</TabsTrigger>
          <TabsTrigger value="register">Client Register</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
          <TabsTrigger value="billable">Billable Items</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="grid gap-4 md:grid-cols-6">
                <div>
                  <label className="text-sm font-medium mb-1 block">Insurer</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="universal">Universal Fire & Casualty</SelectItem>
                      <SelectItem value="surety">Surety Bonding</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Office</label>
                  <Select defaultValue="all">
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
                  <label className="text-sm font-medium mb-1 block">Invoices</label>
                  <Select defaultValue="total-billed">
                    <SelectTrigger>
                      <SelectValue placeholder="Total billed" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="total-billed">Total billed</SelectItem>
                      <SelectItem value="outstanding">Outstanding only</SelectItem>
                      <SelectItem value="paid">Paid only</SelectItem>
                      <SelectItem value="overdue">Overdue only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Invoice Month</label>
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
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Invoice Year</label>
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
                <Button>Go</Button>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search invoices..."
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

          {/* Invoice Actions */}
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
                      <SelectItem value="bulk-payment">Record Bulk Payment</SelectItem>
                      <SelectItem value="send-statements">Send Statements</SelectItem>
                      <SelectItem value="export">Export Selected</SelectItem>
                      <SelectItem value="delete">Delete Selected</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" disabled={selectedInvoices.length === 0}>
                    Apply to Selected ({selectedInvoices.length})
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                  <span className="text-sm text-muted-foreground">1 to 11 of 11</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Invoice Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={selectedInvoices.length === invoiceData.length}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Client Name</TableHead>
                    <TableHead>Power No.</TableHead>
                    <TableHead className="text-right">Bond Amount</TableHead>
                    <TableHead>Invoice Date</TableHead>
                    <TableHead>Last Payment</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-right">Balance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoiceData.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedInvoices.includes(invoice.id)}
                          onCheckedChange={() => handleSelectInvoice(invoice.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        <Button variant="link" className="p-0 h-auto font-medium text-blue-600">
                          {invoice.id}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button variant="link" className="p-0 h-auto font-medium text-blue-600">
                          {invoice.clientName}
                        </Button>
                      </TableCell>
                      <TableCell>{invoice.powerNo}</TableCell>
                      <TableCell className="text-right font-medium">{formatCurrency(invoice.bondAmount)}</TableCell>
                      <TableCell>{invoice.invoiceDate}</TableCell>
                      <TableCell>{invoice.lastPayment}</TableCell>
                      <TableCell className="text-right font-medium">{formatCurrency(invoice.total)}</TableCell>
                      <TableCell
                        className={`text-right font-medium ${
                          invoice.balance > 0
                            ? "text-red-600"
                            : invoice.balance < 0
                              ? "text-blue-600"
                              : "text-green-600"
                        }`}
                      >
                        {formatCurrency(invoice.balance)}
                      </TableCell>
                      <TableCell>{getStatusBadge(invoice.status, invoice.balance)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <FileText className="h-4 w-4" />
                          <span className="sr-only">View Invoice</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary">
          <Card>
            <CardHeader>
              <CardTitle>Money Summary</CardTitle>
              <CardDescription>Overview of financial metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <span className="font-medium">Total Revenue (YTD)</span>
                    <span className="text-2xl font-bold text-green-600">{formatCurrency(125000)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <span className="font-medium">Outstanding Receivables</span>
                    <span className="text-2xl font-bold text-red-600">{formatCurrency(totalOutstanding)}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <span className="font-medium">Average Invoice Amount</span>
                    <span className="text-2xl font-bold">{formatCurrency(totalInvoiced / invoiceData.length)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <span className="font-medium">Collection Rate</span>
                    <span className="text-2xl font-bold text-green-600">94.2%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Client Register</CardTitle>
              <CardDescription>Client payment and billing information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10 text-muted-foreground">
                Client register functionality will be implemented here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Complete payment transaction history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10 text-muted-foreground">
                Payment history functionality will be implemented here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billable">
          <Card>
            <CardHeader>
              <CardTitle>Billable Items</CardTitle>
              <CardDescription>Manage billable services and fees</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10 text-muted-foreground">
                Billable items functionality will be implemented here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Payment Activity Log</CardTitle>
              <CardDescription>Track all payment-related activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10 text-muted-foreground">
                Activity log functionality will be implemented here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
