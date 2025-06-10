"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  MapPin,
  Shield,
  AlertTriangle,
  Users,
  Plus,
  Search,
  Download,
  Edit,
  Trash2,
  Eye,
  Settings,
  Navigation,
  Home,
  Building,
  XCircle,
  CheckCircle,
} from "lucide-react"

// Mock data
const geofenceStats = {
  totalGeofences: 45,
  activeGeofences: 38,
  violations: 7,
  defendantsMonitored: 156,
}

const geofences = [
  {
    id: "GF001",
    name: "John Smith - Home Zone",
    type: "Inclusion",
    category: "Residence",
    address: "123 Main St, Dallas, TX 75201",
    radius: 500,
    defendants: ["John Smith"],
    status: "Active",
    violations: 0,
    lastViolation: null,
    createdDate: "2024-01-15",
    schedule: "24/7",
  },
  {
    id: "GF002",
    name: "Sarah Johnson - Work Zone",
    type: "Inclusion",
    category: "Employment",
    address: "456 Business Ave, Dallas, TX 75202",
    radius: 200,
    defendants: ["Sarah Johnson"],
    status: "Active",
    violations: 0,
    lastViolation: null,
    createdDate: "2024-01-20",
    schedule: "Mon-Fri 8AM-6PM",
  },
  {
    id: "GF003",
    name: "Downtown Bar District",
    type: "Exclusion",
    category: "Restricted Area",
    address: "Deep Ellum, Dallas, TX",
    radius: 1000,
    defendants: ["Mike Wilson", "Tom Brown"],
    status: "Active",
    violations: 3,
    lastViolation: "2024-01-28 11:30 PM",
    createdDate: "2024-01-10",
    schedule: "24/7",
  },
  {
    id: "GF004",
    name: "Lisa Davis - School Zone",
    type: "Exclusion",
    category: "Educational",
    address: "Roosevelt High School, Dallas, TX",
    radius: 300,
    defendants: ["Lisa Davis"],
    status: "Violation",
    violations: 1,
    lastViolation: "2024-01-29 3:15 PM",
    createdDate: "2024-01-18",
    schedule: "Mon-Fri 7AM-4PM",
  },
  {
    id: "GF005",
    name: "Robert Lee - Medical Center",
    type: "Inclusion",
    category: "Medical",
    address: "Dallas Medical Center, TX",
    radius: 150,
    defendants: ["Robert Lee"],
    status: "Inactive",
    violations: 0,
    lastViolation: null,
    createdDate: "2024-01-12",
    schedule: "As Needed",
  },
]

const recentViolations = [
  {
    id: "V001",
    defendant: "Mike Wilson",
    geofence: "Downtown Bar District",
    type: "Entry Violation",
    timestamp: "2024-01-29 11:30 PM",
    duration: "45 minutes",
    status: "Resolved",
  },
  {
    id: "V002",
    defendant: "Lisa Davis",
    geofence: "Lisa Davis - School Zone",
    type: "Proximity Violation",
    timestamp: "2024-01-29 3:15 PM",
    duration: "10 minutes",
    status: "Under Review",
  },
  {
    id: "V003",
    defendant: "Tom Brown",
    geofence: "Downtown Bar District",
    type: "Entry Violation",
    timestamp: "2024-01-28 10:45 PM",
    duration: "2 hours",
    status: "Documented",
  },
]

export function GeofenceView() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedGeofence, setSelectedGeofence] = useState(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Violation":
        return "bg-red-100 text-red-800"
      case "Inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (category: string) => {
    switch (category) {
      case "Residence":
        return <Home className="h-4 w-4" />
      case "Employment":
        return <Building className="h-4 w-4" />
      case "Restricted Area":
        return <XCircle className="h-4 w-4" />
      case "Educational":
        return <Shield className="h-4 w-4" />
      case "Medical":
        return <Plus className="h-4 w-4" />
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  const filteredGeofences = geofences.filter((geofence) => {
    const matchesSearch =
      geofence.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      geofence.address.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || geofence.status.toLowerCase() === statusFilter
    const matchesType = typeFilter === "all" || geofence.type.toLowerCase() === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Geo Fence</h1>
          <p className="text-muted-foreground">Manage geographical boundaries and monitor defendant locations</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Geofence
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Geofence</DialogTitle>
                <DialogDescription>Set up a new geographical boundary for defendant monitoring</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Geofence Name</Label>
                    <Input id="name" placeholder="Enter geofence name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inclusion">Inclusion Zone</SelectItem>
                        <SelectItem value="exclusion">Exclusion Zone</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residence">Residence</SelectItem>
                        <SelectItem value="employment">Employment</SelectItem>
                        <SelectItem value="medical">Medical</SelectItem>
                        <SelectItem value="educational">Educational</SelectItem>
                        <SelectItem value="restricted">Restricted Area</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="radius">Radius (meters)</Label>
                    <Input id="radius" type="number" placeholder="500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="Enter address or coordinates" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defendants">Assign Defendants</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select defendants" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john-smith">John Smith</SelectItem>
                      <SelectItem value="sarah-johnson">Sarah Johnson</SelectItem>
                      <SelectItem value="mike-wilson">Mike Wilson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schedule">Schedule</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select schedule" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24-7">24/7</SelectItem>
                      <SelectItem value="business">Business Hours</SelectItem>
                      <SelectItem value="custom">Custom Schedule</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="alerts" />
                  <Label htmlFor="alerts">Enable violation alerts</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsCreateDialogOpen(false)}>Create Geofence</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Geofences</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{geofenceStats.totalGeofences}</div>
            <p className="text-xs text-muted-foreground">+3 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Zones</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{geofenceStats.activeGeofences}</div>
            <p className="text-xs text-muted-foreground">84% of total geofences</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Violations Today</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{geofenceStats.violations}</div>
            <p className="text-xs text-muted-foreground">-2 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Defendants Monitored</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{geofenceStats.defendantsMonitored}</div>
            <p className="text-xs text-muted-foreground">Across all geofences</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="geofences" className="space-y-4">
        <TabsList>
          <TabsTrigger value="geofences">Geofences</TabsTrigger>
          <TabsTrigger value="violations">Recent Violations</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
        </TabsList>

        <TabsContent value="geofences" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Geofence Management</CardTitle>
              <CardDescription>Monitor and manage all geographical boundaries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search geofences..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="violation">Violation</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="inclusion">Inclusion</SelectItem>
                    <SelectItem value="exclusion">Exclusion</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Geofences Table */}
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="h-12 px-4 text-left align-middle font-medium">Name</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Type</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Address</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Defendants</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Violations</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredGeofences.map((geofence) => (
                        <tr key={geofence.id} className="border-b">
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              {getTypeIcon(geofence.category)}
                              <div>
                                <div className="font-medium">{geofence.name}</div>
                                <div className="text-sm text-muted-foreground">{geofence.radius}m radius</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge variant={geofence.type === "Inclusion" ? "default" : "destructive"}>
                              {geofence.type}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="text-sm">{geofence.address}</div>
                            <div className="text-xs text-muted-foreground">{geofence.schedule}</div>
                          </td>
                          <td className="p-4">
                            <div className="text-sm">{geofence.defendants.length} assigned</div>
                            <div className="text-xs text-muted-foreground">
                              {geofence.defendants.slice(0, 2).join(", ")}
                              {geofence.defendants.length > 2 && "..."}
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge className={getStatusColor(geofence.status)}>{geofence.status}</Badge>
                          </td>
                          <td className="p-4">
                            <div className="text-sm">
                              {geofence.violations > 0 ? (
                                <span className="text-red-600 font-medium">{geofence.violations}</span>
                              ) : (
                                <span className="text-green-600">0</span>
                              )}
                            </div>
                            {geofence.lastViolation && (
                              <div className="text-xs text-muted-foreground">
                                Last: {new Date(geofence.lastViolation).toLocaleDateString()}
                              </div>
                            )}
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Settings className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="violations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Violations</CardTitle>
              <CardDescription>Track and manage geofence violations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentViolations.map((violation) => (
                  <div key={violation.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-red-100 rounded-full">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <div className="font-medium">{violation.defendant}</div>
                        <div className="text-sm text-muted-foreground">{violation.geofence}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{violation.type}</div>
                      <div className="text-xs text-muted-foreground">{violation.timestamp}</div>
                      <div className="text-xs text-muted-foreground">Duration: {violation.duration}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        className={
                          violation.status === "Resolved"
                            ? "bg-green-100 text-green-800"
                            : violation.status === "Under Review"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                        }
                      >
                        {violation.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="map" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Map View</CardTitle>
              <CardDescription>Visual representation of all geofences and defendant locations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Interactive map would be displayed here</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Showing geofences, defendant locations, and real-time tracking
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Inclusion Zones</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm">Exclusion Zones</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Defendant Locations</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Navigation className="mr-2 h-4 w-4" />
                  Center Map
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
