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

interface CheckinModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CheckinModal({ open, onOpenChange }: CheckinModalProps) {
  const [formData, setFormData] = useState({
    clientName: "",
    bondNumber: "",
    checkinType: "",
    location: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Check-in submitted:", formData)
    onOpenChange(false)
    setFormData({
      clientName: "",
      bondNumber: "",
      checkinType: "",
      location: "",
      notes: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Check-In</DialogTitle>
          <DialogDescription>Record a check-in for a defendant.</DialogDescription>
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
              <Label htmlFor="bondNumber" className="text-right">
                Bond #
              </Label>
              <Input
                id="bondNumber"
                value={formData.bondNumber}
                onChange={(e) => setFormData({ ...formData, bondNumber: e.target.value })}
                className="col-span-3"
                placeholder="Bond number"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="checkinType" className="text-right">
                Check-in Type
              </Label>
              <Select
                value={formData.checkinType}
                onValueChange={(value) => setFormData({ ...formData, checkinType: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select check-in type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="phone">Phone Call</SelectItem>
                  <SelectItem value="office">Office Visit</SelectItem>
                  <SelectItem value="mobile">Mobile App</SelectItem>
                  <SelectItem value="home">Home Visit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="col-span-3"
                placeholder="Current location"
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
                placeholder="Check-in notes"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Record Check-In</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
