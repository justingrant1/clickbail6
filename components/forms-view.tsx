"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { FileText, Printer, Download, Eye, Plus, Search, CheckSquare, Square } from "lucide-react"

// Sample form categories and forms
const formCategories = [
  {
    id: "general",
    name: "GENERAL FORMS",
    forms: [
      { id: "unsuccessful-call", name: "Unsuccessful Call", description: "Record unsuccessful contact attempts" },
      { id: "24-hour-checkin", name: "24 Hour Check-in", description: "Daily check-in form" },
      { id: "72-hour-checkin", name: "72 Hour Check-in", description: "Extended check-in form" },
    ],
  },
  {
    id: "action-bail",
    name: "A Action Bail Bonds",
    forms: [
      { id: "disclosure-statement", name: "Disclosure Statement", description: "Legal disclosure requirements" },
      { id: "promissory-note", name: "Promissory Note", description: "Payment agreement document" },
      { id: "texas-standard", name: "Texas Standard Form", description: "State required standard form" },
      { id: "application", name: "Application", description: "Bond application form" },
      { id: "client-instructions", name: "Client Instructions", description: "Instructions for defendants" },
      { id: "credit-card-auth", name: "Credit Card Authorization Form", description: "Payment authorization" },
      { id: "potter-bond", name: "Potter Bond Form", description: "Potter county specific form" },
      { id: "collateral-agreement", name: "Collateral Agreement", description: "Collateral terms and conditions" },
      { id: "randall-bond", name: "Randall Bond Form", description: "Randall county specific form" },
    ],
  },
  {
    id: "court-forms",
    name: "COURT FORMS",
    forms: [
      { id: "appearance-bond", name: "Appearance Bond", description: "Court appearance guarantee" },
      { id: "motion-reduce", name: "Motion to Reduce Bond", description: "Bond reduction request" },
      { id: "surrender-notice", name: "Surrender Notice", description: "Defendant surrender form" },
    ],
  },
  {
    id: "financial",
    name: "FINANCIAL FORMS",
    forms: [
      { id: "payment-plan", name: "Payment Plan Agreement", description: "Payment schedule agreement" },
      { id: "receipt", name: "Payment Receipt", description: "Payment confirmation" },
      { id: "refund-request", name: "Refund Request", description: "Refund application form" },
    ],
  },
]

// Sample clients for dropdown
const sampleClients = [
  { id: "1", name: "Gorbell, Ryan", bondDate: "06/05/25" },
  { id: "2", name: "Carroll, Dessie", bondDate: "05/25/25" },
  { id: "3", name: "Mosier, Matthew", bondDate: "04/05/25" },
]

export function FormsView() {
  const [selectedForms, setSelectedForms] = useState<string[]>([])
  const [selectedClient, setSelectedClient] = useState("")
  const [bondDate, setBondDate] = useState("")
  const [powerNumber, setPowerNumber] = useState("")
  const [bondAmount, setBondAmount] = useState("")
  const [cosignerName, setCosignerName] = useState("")
  const [cosignerRelation, setCosignerRelation] = useState("")
  const [collateralType, setCollateralType] = useState("")
  const [collateralValue, setCollateralValue] = useState("")
  const [collateralReceiptNo, setCollateralReceiptNo] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const handleFormToggle = (formId: string) => {
    setSelectedForms((prev) => (prev.includes(formId) ? prev.filter((id) => id !== formId) : [...prev, formId]))
  }

  const handleSelectAll = () => {
    const allFormIds = formCategories.flatMap((category) => category.forms.map((form) => form.id))
    setSelectedForms(allFormIds)
  }

  const handleSelectNone = () => {
    setSelectedForms([])
  }

  const handleCategoryToggle = (categoryId: string) => {
    const category = formCategories.find((cat) => cat.id === categoryId)
    if (!category) return

    const categoryFormIds = category.forms.map((form) => form.id)
    const allSelected = categoryFormIds.every((id) => selectedForms.includes(id))

    if (allSelected) {
      setSelectedForms((prev) => prev.filter((id) => !categoryFormIds.includes(id)))
    } else {
      setSelectedForms((prev) => [...new Set([...prev, ...categoryFormIds])])
    }
  }

  const handlePrintPaperwork = () => {
    if (selectedForms.length === 0) {
      alert("Please select at least one form to print.")
      return
    }
    console.log("Printing forms:", selectedForms)
    console.log("Client:", selectedClient)
    console.log("Form data:", {
      bondDate,
      powerNumber,
      bondAmount,
      cosignerName,
      cosignerRelation,
      collateralType,
      collateralValue,
      collateralReceiptNo,
    })
  }

  const filteredCategories = formCategories
    .map((category) => ({
      ...category,
      forms: category.forms.filter(
        (form) =>
          form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          form.description.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.forms.length > 0)

  const totalSelectedForms = selectedForms.length
  const totalAvailableForms = formCategories.reduce((sum, category) => sum + category.forms.length, 0)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Forms Management</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Create Custom Form
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download Templates
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
                <p className="text-sm font-medium text-muted-foreground">Available Forms</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-2xl font-bold">{totalAvailableForms}</h3>
                  <p className="text-xs text-muted-foreground">Templates</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full p-2 bg-green-100">
                <CheckSquare className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Selected Forms</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-2xl font-bold">{totalSelectedForms}</h3>
                  <p className="text-xs text-muted-foreground">Ready to Print</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full p-2 bg-purple-100">
                <Printer className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Forms Printed</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-2xl font-bold">247</h3>
                  <p className="text-xs text-muted-foreground">This Month</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full p-2 bg-orange-100">
                <FileText className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Custom Forms</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-2xl font-bold">5</h3>
                  <p className="text-xs text-muted-foreground">Created</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-[400px_1fr] gap-6">
        {/* Form Selection Sidebar */}
        <Card>
          <CardHeader>
            <CardTitle>Select Forms</CardTitle>
            <CardDescription>Check the box next to the form you want to print</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleSelectAll}>
                  Select All
                </Button>
                <Button variant="outline" size="sm" onClick={handleSelectNone}>
                  None
                </Button>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search forms..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="space-y-4">
                {filteredCategories.map((category) => {
                  const categoryFormIds = category.forms.map((form) => form.id)
                  const allSelected = categoryFormIds.every((id) => selectedForms.includes(id))
                  const someSelected = categoryFormIds.some((id) => selectedForms.includes(id))

                  return (
                    <div key={category.id} className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-0 h-auto"
                          onClick={() => handleCategoryToggle(category.id)}
                        >
                          {allSelected ? (
                            <CheckSquare className="h-4 w-4 text-primary" />
                          ) : someSelected ? (
                            <div className="h-4 w-4 border-2 border-primary bg-primary/20" />
                          ) : (
                            <Square className="h-4 w-4" />
                          )}
                        </Button>
                        <Label
                          className="font-medium text-primary cursor-pointer"
                          onClick={() => handleCategoryToggle(category.id)}
                        >
                          {category.name}
                        </Label>
                      </div>

                      <div className="pl-6 space-y-2">
                        {category.forms.map((form) => (
                          <div key={form.id} className="flex items-start space-x-2">
                            <Checkbox
                              id={form.id}
                              checked={selectedForms.includes(form.id)}
                              onCheckedChange={() => handleFormToggle(form.id)}
                            />
                            <div className="grid gap-1.5 leading-none">
                              <Label
                                htmlFor={form.id}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                              >
                                {form.name}
                              </Label>
                              <p className="text-xs text-muted-foreground">{form.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Data Input */}
        <Card>
          <CardHeader>
            <CardTitle>Form Information</CardTitle>
            <CardDescription>Enter the information to populate the selected forms</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Defendant Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Defendant</h3>
                <Select value={bondDate} onValueChange={setBondDate}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Bond Date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="06/05/25">06/05/25</SelectItem>
                    <SelectItem value="05/25/25">05/25/25</SelectItem>
                    <SelectItem value="04/05/25">04/05/25</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="client-select">Client</Label>
                <Select value={selectedClient} onValueChange={setSelectedClient}>
                  <SelectTrigger>
                    <SelectValue placeholder="Start Typing Last Name" />
                  </SelectTrigger>
                  <SelectContent>
                    {sampleClients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Start typing defendant's last name and select the client
                </p>
              </div>
            </div>

            <Separator />

            {/* Bond Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Bond</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="power-number">Power Number</Label>
                  <Input
                    id="power-number"
                    value={powerNumber}
                    onChange={(e) => setPowerNumber(e.target.value)}
                    placeholder="Enter power number"
                  />
                </div>
                <div>
                  <Label htmlFor="bond-amount">Bond Amount</Label>
                  <Input
                    id="bond-amount"
                    value={bondAmount}
                    onChange={(e) => setBondAmount(e.target.value)}
                    placeholder="Enter bond amount"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Co-signer Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Co-signer</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="cosigner-name">Name</Label>
                  <Input
                    id="cosigner-name"
                    value={cosignerName}
                    onChange={(e) => setCosignerName(e.target.value)}
                    placeholder="Enter co-signer name"
                  />
                </div>
                <div>
                  <Label htmlFor="cosigner-relation">Relation</Label>
                  <Input
                    id="cosigner-relation"
                    value={cosignerRelation}
                    onChange={(e) => setCosignerRelation(e.target.value)}
                    placeholder="Enter relation"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Collateral Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Collateral</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label htmlFor="collateral-type">Collateral Type</Label>
                  <Input
                    id="collateral-type"
                    value={collateralType}
                    onChange={(e) => setCollateralType(e.target.value)}
                    placeholder="Enter type"
                  />
                </div>
                <div>
                  <Label htmlFor="collateral-value">Value</Label>
                  <Input
                    id="collateral-value"
                    value={collateralValue}
                    onChange={(e) => setCollateralValue(e.target.value)}
                    placeholder="Enter value"
                  />
                </div>
                <div>
                  <Label htmlFor="collateral-receipt">Collateral Receipt No.</Label>
                  <Input
                    id="collateral-receipt"
                    value={collateralReceiptNo}
                    onChange={(e) => setCollateralReceiptNo(e.target.value)}
                    placeholder="Enter receipt number"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button onClick={handlePrintPaperwork} disabled={selectedForms.length === 0}>
                <Printer className="mr-2 h-4 w-4" />
                Print Paperwork ({selectedForms.length})
              </Button>
              <Button variant="outline">
                <Eye className="mr-2 h-4 w-4" />
                Preview Forms
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>

            {selectedForms.length > 0 && (
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Selected Forms ({selectedForms.length}):</h4>
                <div className="text-sm text-muted-foreground">
                  {selectedForms
                    .map((formId) => {
                      const form = formCategories.flatMap((cat) => cat.forms).find((f) => f.id === formId)
                      return form?.name
                    })
                    .filter(Boolean)
                    .join(", ")}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
