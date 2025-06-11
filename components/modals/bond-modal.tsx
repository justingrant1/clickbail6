"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from "@/lib/supabaseClient"

interface BondModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BondModal({ open, onOpenChange, onBondAdded }: BondModalProps & { onBondAdded?: () => void }) {
  const [formData, setFormData] = useState({
    clientName: "",
    bondAmount: "",
    bondType: "",
    courtDate: "",
    charges: "",
    notes: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { error } = await supabase.from('bonds').insert([
        {
          name: formData.clientName,
          bondamount: parseFloat(formData.bondAmount),
          bondtype: formData.bondType,
          courtdate: formData.courtDate,
          charges: formData.charges,
          notes: formData.notes,
          status: 'active',
        }
      ])
      if (error) {
        console.error("Error inserting bond:", error)
        alert("Failed to create bond. Please try again.")
      } else {
        onOpenChange(false)
        setFormData({
          clientName: "",
          bondAmount: "",
          bondType: "",
          courtDate: "",
          charges: "",
          notes: "",
        })
        alert("Bond created successfully!")
        if (onBondAdded) onBondAdded();
      }
    } catch (err) {
      console.error("Unexpected error:", err)
      alert("An unexpected error occurred. Please try again.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Bond</DialogTitle>
          <DialogDescription>Create a new bond for a client.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="clientName" className="text-right">
                Client
              </Label>
              <Input
                id="clientName"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                className="col-span-3"
                placeholder="Client name"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bondAmount" className="text-right">
                Bond Amount
              </Label>
              <Input
                id="bondAmount"
                type="number"
                step="0.01"
                value={formData.bondAmount}
                onChange={(e) => setFormData({ ...formData, bondAmount: e.target.value })}
                className="col-span-3"
                placeholder="0.00"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bondType" className="text-right">
                Bond Type
              </Label>
              <Select
                value={formData.bondType}
                onValueChange={(value) => setFormData({ ...formData, bondType: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select bond type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="surety">Surety Bond</SelectItem>
                  <SelectItem value="cash">Cash Bond</SelectItem>
                  <SelectItem value="property">Property Bond</SelectItem>
                  <SelectItem value="personal">Personal Recognizance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="courtDate" className="text-right">
                Court Date
              </Label>
              <Input
                id="courtDate"
                type="date"
                value={formData.courtDate}
                onChange={(e) => setFormData({ ...formData, courtDate: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="charges" className="text-right">
                Charges
              </Label>
              <Textarea
                id="charges"
                value={formData.charges}
                onChange={(e) => setFormData({ ...formData, charges: e.target.value })}
                className="col-span-3"
                placeholder="List of charges"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="col-span-3"
                placeholder="Optional notes"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Bond</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
