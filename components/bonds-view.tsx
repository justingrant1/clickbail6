"use client"

import { useState, useEffect } from "react"
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
  FileText,
  Download,
  Plus,
  Search,
  Filter,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Eye,
  Edit,
} from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import { BondModal } from "@/components/modals/bond-modal"

interface Bond {
  id: string;
  powerNumber: string;
  caseNumber: string;
  bondDate: string;
  name: string;
  agent: string;
  bondAmount: number;
  premium: number;
  balance: number;
  status: string;
  label: string;
  courtName: string;
  insurer: string;
  office: string;
}

// Initialize with empty array; data will be fetched from Supabase
const bondsData: Bond[] = [];

const recentBonds: string[] = [];

export function BondsView() {
  const [selectedBonds, setSelectedBonds] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showNoFileCharges, setShowNoFileCharges] = useState(false)
  const [selectedLabel, setSelectedLabel] = useState("all")
  const [bondsDataState, setBondsDataState] = useState<Bond[]>(bondsData)
  const [recentBondsState, setRecentBondsState] = useState<string[]>(recentBonds)
  const [isLoading, setIsLoading] = useState(true)
  const [bondModalOpen, setBondModalOpen] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const refreshBonds = () => {
    setRefreshTrigger(prev => prev + 1);
  }
  
  useEffect(() => {
    const fetchBondsData = async () => {
      setIsLoading(true)
      try {
        // Fetch all bonds data from Supabase
        const { data: bonds, error } = await supabase
          .from('bonds')
          .select('*')
        if (error) {
          console.error("Error fetching bonds data:", error)
          setBondsDataState([])
        } else {
          setBondsDataState(bonds || [])
          // Set recent bonds (last 7 names for display)
          const recentNames = bonds.slice(-7).map((bond: Bond) => bond.name)
          setRecentBondsState(recentNames)
        }
      } catch (err) {
        console.error("Unexpected error fetching bonds data:", err)
        setBondsDataState([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchBondsData()
  }, [refreshTrigger])

  const handleSelectBond = (bondId: string) => {
    setSelectedBonds((prev) => (prev.includes(bondId) ? prev.filter((id) => id !== bondId) : [...prev, bondId]))
  }

  const handleSelectAll = () => {
    setSelectedBonds(selectedBonds.length === bondsData.length ? [] : bondsData.map((bond) => bond.id))
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const getLabelBadge = (label: string) => {
    switch (label) {
      case "no-cosigner":
        return <Badge className="bg-red-100 text-red-800">No Cosigner</Badge>
      case "bond-splits":
        return <Badge className="bg-blue-100 text-blue-800">Bond Splits</Badge>
      case "deed-of-trust":
        return <Badge className="bg-orange-100 text-orange-800">Deed of Trust</Badge>
      case "cash-collateral":
        return <Badge className="bg-green-100 text-green-800">Cash Collateral</Badge>
      case "reinstated":
        return <Badge className="bg-purple-100 text-purple-800">Reinstated</Badge>
      default:
        return <Badge variant="outline">No Label</Badge>
    }
  }

  const getStatusIndicator = (balance: number) => {
    if (balance > 0) {
      return <div className="h-3 w-3 rounded-full bg-red-500" title="Outstanding Balance" />
    } else {
      return <div className="h-3 w-3 rounded-full bg-green-500" title="Paid in Full" />
    }
  }

  const totalBonds = isLoading ? 0 : bondsDataState.length
  const activeBonds = isLoading ? 0 : bondsDataState.filter((bond) => bond.status === "active").length
  const totalBondAmount = isLoading ? 0 : bondsDataState.reduce((sum, bond) => sum + bond.bondAmount, 0)
  const outstandingBalance = isLoading ? 0 : bondsDataState.reduce((sum, bond) => sum + bond.balance, 0)

  const filteredBonds = bondsDataState.filter((bond) => {
    const matchesSearch =
      bond.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bond.powerNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bond.caseNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLabel = selectedLabel === "all" || bond.label === selectedLabel
    return matchesSearch && matchesLabel
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Bonds Management</h1>
        <div className="flex gap-2">
          <Button onClick={() => setBondModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Bond - Add All Info
          </Button>
          <Button variant="outline" onClick={() => setBondModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Bond - Quick Add
          </Button>
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Batch Discharge
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full p-2 bg-blue-100">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Bonds</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-2xl font-bold">{totalBonds}</h3>
                  <p className="text-xs text-muted-foreground">Active: {activeBonds}</p>
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
                <p className="text-sm font-medium text-muted-foreground">Total Bond Amount</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-2xl font-bold">{formatCurrency(totalBondAmount)}</h3>
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
                <p className="text-sm font-medium text-muted-foreground">Outstanding Balance</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-2xl font-bold">{formatCurrency(outstandingBalance)}</h3>
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
                <p className="text-sm font-medium text-muted-foreground">Collection Rate</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-2xl font-bold">
                    {Math.round(((totalBondAmount - outstandingBalance) / totalBondAmount) * 100)}%
                  </h3>
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
            <CardTitle>Bond Section</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1 p-2">
              <Button variant="ghost" className="w-full justify-start text-red-600">
                <FileText className="mr-2 h-4 w-4" />
                Saved Drafts (9)
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Recently Added (30)
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                All Bonds (933)
              </Button>
              <Button variant="default" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Active Bonds (657)
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <AlertTriangle className="mr-2 h-4 w-4" />
                FTA Bonds (100)
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Discharged Bonds (176)
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Transfer Posting (9)
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Quick Discharge Tool
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Payment Plan Bonds
              </Button>
            </div>

            <div className="border-t p-4">
              <h4 className="font-medium mb-2">Last 15 Bonds You Opened</h4>
              <div className="space-y-1">
                {recentBondsState.map((name, index) => (
                  <Button key={index} variant="link" className="p-0 h-auto text-xs justify-start">
                    {name}
                  </Button>
                ))}
              </div>
            </div>

            <div className="border-t p-4">
              <h4 className="font-medium mb-2">Search</h4>
              <div className="space-y-2">
                <Select defaultValue="bonds">
                  <SelectTrigger>
                    <SelectValue placeholder="Bonds" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bonds">Bonds</SelectItem>
                    <SelectItem value="clients">Clients</SelectItem>
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
              <TabsTrigger value="active">Active Bonds</TabsTrigger>
              <TabsTrigger value="fta">FTA Bonds</TabsTrigger>
              <TabsTrigger value="discharged">Discharged Bonds</TabsTrigger>
              <TabsTrigger value="drafts">Saved Drafts</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              {/* Filters */}
              <Card>
                <CardContent className="p-6">
                  <div className="grid gap-4 md:grid-cols-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Insurer</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="universal">Universal Fire & Casualty</SelectItem>
                          <SelectItem value="surety">Surety Bonding Company</SelectItem>
                          <SelectItem value="american">American Surety Company</SelectItem>
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
                      <label className="text-sm font-medium mb-1 block">Court Name</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="district">District Court</SelectItem>
                          <SelectItem value="municipal">Municipal Court</SelectItem>
                          <SelectItem value="county">County Court</SelectItem>
                          <SelectItem value="superior">Superior Court</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-4 mt-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Minimum Bond</label>
                      <Input type="text" placeholder="$10.00" />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1 block">Maximum Bond</label>
                      <Input type="text" placeholder="$10,000,000.00" />
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
                    <Button>Go</Button>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="no-file-charges"
                          checked={showNoFileCharges}
                          onCheckedChange={setShowNoFileCharges}
                        />
                        <Label htmlFor="no-file-charges">Show "No File Charges" Bond</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            placeholder="Search bonds..."
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
                  </div>
                </CardContent>
              </Card>

              {/* Bond Labels */}
              <Card>
                <CardHeader>
                  <CardTitle>Bond Labels</CardTitle>
                  <CardDescription>Filter bonds by label</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      className={`cursor-pointer border-2 border-red-500 px-4 py-2 text-base ${
                        selectedLabel === "no-cosigner" ? "bg-red-500 text-white" : "bg-red-100 text-red-800"
                      }`}
                      onClick={() => setSelectedLabel(selectedLabel === "no-cosigner" ? "all" : "no-cosigner")}
                    >
                      No Cosigner
                    </Badge>
                    <Badge
                      className={`cursor-pointer border-2 border-blue-500 px-4 py-2 text-base ${
                        selectedLabel === "bond-splits" ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-800"
                      }`}
                      onClick={() => setSelectedLabel(selectedLabel === "bond-splits" ? "all" : "bond-splits")}
                    >
                      Bond Splits
                    </Badge>
                    <Badge
                      className={`cursor-pointer border-2 border-orange-500 px-4 py-2 text-base ${
                        selectedLabel === "deed-of-trust" ? "bg-orange-500 text-white" : "bg-orange-100 text-orange-800"
                      }`}
                      onClick={() => setSelectedLabel(selectedLabel === "deed-of-trust" ? "all" : "deed-of-trust")}
                    >
                      Deed of Trust
                    </Badge>
                    <Badge
                      className={`cursor-pointer border-2 border-green-500 px-4 py-2 text-base ${
                        selectedLabel === "cash-collateral" ? "bg-green-500 text-white" : "bg-green-100 text-green-800"
                      }`}
                      onClick={() => setSelectedLabel(selectedLabel === "cash-collateral" ? "all" : "cash-collateral")}
                    >
                      Cash Collateral
                    </Badge>
                    <Badge
                      className={`cursor-pointer border-2 border-purple-500 px-4 py-2 text-base ${
                        selectedLabel === "reinstated" ? "bg-purple-500 text-white" : "bg-purple-100 text-purple-800"
                      }`}
                      onClick={() => setSelectedLabel(selectedLabel === "reinstated" ? "all" : "reinstated")}
                    >
                      Reinstated
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

              {/* Bond Actions */}
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
                          <SelectItem value="bulk-discharge">Bulk Discharge</SelectItem>
                          <SelectItem value="transfer">Transfer Bonds</SelectItem>
                          <SelectItem value="export">Export Selected</SelectItem>
                          <SelectItem value="print">Print Selected</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" disabled={selectedBonds.length === 0}>
                        Apply to Selected ({selectedBonds.length})
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                      </Button>
                      <span className="text-sm text-muted-foreground">1 to 50 of 589</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bonds Table */}
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">
                          <Checkbox
                            checked={selectedBonds.length === filteredBonds.length}
                            onCheckedChange={handleSelectAll}
                          />
                        </TableHead>
                        <TableHead className="w-[50px]">Status</TableHead>
                        <TableHead>Power Number</TableHead>
                        <TableHead>Case Number</TableHead>
                        <TableHead>Bond Date</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Agent</TableHead>
                        <TableHead className="text-right">Bond Amount</TableHead>
                        <TableHead className="text-right">Premium</TableHead>
                        <TableHead className="text-right">Balance</TableHead>
                        <TableHead>Label</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBonds.map((bond) => (
                        <TableRow key={bond.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedBonds.includes(bond.id)}
                              onCheckedChange={() => handleSelectBond(bond.id)}
                            />
                          </TableCell>
                          <TableCell>{getStatusIndicator(bond.balance)}</TableCell>
                          <TableCell className="font-medium">
                            <Button variant="link" className="p-0 h-auto font-medium text-blue-600">
                              {bond.powerNumber}
                            </Button>
                          </TableCell>
                          <TableCell>{bond.caseNumber}</TableCell>
                          <TableCell>{bond.bondDate}</TableCell>
                          <TableCell>
                            <Button variant="link" className="p-0 h-auto font-medium text-blue-600">
                              {bond.name}
                            </Button>
                          </TableCell>
                          <TableCell>{bond.agent}</TableCell>
                          <TableCell className="text-right font-medium">{formatCurrency(bond.bondAmount)}</TableCell>
                          <TableCell className="text-right">{formatCurrency(bond.premium)}</TableCell>
                          <TableCell
                            className={`text-right font-medium ${bond.balance > 0 ? "text-red-600" : "text-green-600"}`}
                          >
                            {formatCurrency(bond.balance)}
                          </TableCell>
                          <TableCell>{getLabelBadge(bond.label)}</TableCell>
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
                                <FileText className="h-4 w-4" />
                                <span className="sr-only">Documents</span>
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

            <TabsContent value="fta">
              <Card>
                <CardContent className="p-6 text-center py-10 text-muted-foreground">
                  {isLoading ? "Loading FTA bonds..." : "FTA (Failure to Appear) bonds will be displayed here"}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="discharged">
              <Card>
                <CardContent className="p-6 text-center py-10 text-muted-foreground">
                  {isLoading ? "Loading discharged bonds..." : "Discharged bonds will be displayed here"}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="drafts">
              <Card>
                <CardContent className="p-6 text-center py-10 text-muted-foreground">
                  {isLoading ? "Loading saved draft bonds..." : "Saved draft bonds will be displayed here"}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <BondModal open={bondModalOpen} onOpenChange={setBondModalOpen} onBondAdded={refreshBonds} />
    </div>
  )
}
