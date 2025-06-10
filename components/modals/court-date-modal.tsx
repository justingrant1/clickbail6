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

interface CourtDateModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CourtDateModal({ open, onOpenChange }: CourtDateModalProps) {
  const [formData, setFormData] = useState({
    clientName: "",
    bondNumber: "",
    courtDate: "",
    courtTime: "",
    courtroom: "",
    judge: "",
    hearingType: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Court date submitted:", formData)
    onOpenChange(false)
    setFormData({
      clientName: "",
      bondNumber: "",
      courtDate: "",
      courtTime: "",
      courtroom: "",
      judge: "",
      hearingType: "",
      notes: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Court Date</DialogTitle>
          <DialogDescription>Schedule a new court date for a client.</DialogDescription>
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
              <Label htmlFor="courtDate" className="text-right">
                Date
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
              <Label htmlFor="courtTime" className="text-right">
                Time
              </Label>
              <Input
                id="courtTime"
                type="time"
                value={formData.courtTime}
                onChange={(e) => setFormData({ ...formData, courtTime: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="courtroom" className="text-right">
                Courtroom
              </Label>
              <Input
                id="courtroom"
                value={formData.courtroom}
                onChange={(e) => setFormData({ ...formData, courtroom: e.target.value })}
                className="col-span-3"
                placeholder="Courtroom number"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="judge" className="text-right">
                Judge
              </Label>
              <Input
                id="judge"
                value={formData.judge}
                onChange={(e) => setFormData({ ...formData, judge: e.target.value })}
                className="col-span-3"
                placeholder="Judge name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="hearingType" className="text-right">
                Hearing Type
              </Label>
              <Select
                value={formData.hearingType}
                onValueChange={(value) => setFormData({ ...formData, hearingType: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select hearing type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="arraignment">Arraignment</SelectItem>
                  <SelectItem value="preliminary">Preliminary Hearing</SelectItem>
                  <SelectItem value="trial">Trial</SelectItem>
                  <SelectItem value="sentencing">Sentencing</SelectItem>
                  <SelectItem value="review">Review Hearing</SelectItem>
                </SelectContent>
              </Select>
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
            <Button type="submit">Add Court Date</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
