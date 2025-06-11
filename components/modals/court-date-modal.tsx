"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { supabase } from "@/lib/supabaseClient"

interface CourtDateModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCourtDateAdded: () => void
}

export function CourtDateModal({ open, onOpenChange, onCourtDateAdded }: CourtDateModalProps) {
  const [formData, setFormData] = useState({
    bond_amount: "",
    power_number: "",
    court_name: "",
    court_date_time: "",
    division: "",
    room: "",
    case_number: "",
    defendant: "",
    charges: "",
    home_phone: "",
    mobile_phone: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    const { error } = await supabase.from("court_dates").insert([formData])
    if (error) {
      console.error("Error adding court date:", error)
    } else {
      onCourtDateAdded()
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Court Date</DialogTitle>
          <DialogDescription>
            Enter the court date information below. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bond_amount" className="text-right">
              Bond Amount
            </Label>
            <Input id="bond_amount" name="bond_amount" value={formData.bond_amount} onChange={handleInputChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="power_number" className="text-right">
              Power Number
            </Label>
            <Input id="power_number" name="power_number" value={formData.power_number} onChange={handleInputChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="court_name" className="text-right">
              Court Name
            </Label>
            <Input id="court_name" name="court_name" value={formData.court_name} onChange={handleInputChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="court_date_time" className="text-right">
              Date/Time
            </Label>
            <Input id="court_date_time" name="court_date_time" value={formData.court_date_time} onChange={handleInputChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="division" className="text-right">
              Division
            </Label>
            <Input id="division" name="division" value={formData.division} onChange={handleInputChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="room" className="text-right">
              Room
            </Label>
            <Input id="room" name="room" value={formData.room} onChange={handleInputChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="case_number" className="text-right">
              Case Number
            </Label>
            <Input id="case_number" name="case_number" value={formData.case_number} onChange={handleInputChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="defendant" className="text-right">
              Defendant
            </Label>
            <Input id="defendant" name="defendant" value={formData.defendant} onChange={handleInputChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="charges" className="text-right">
              Charges
            </Label>
            <Input id="charges" name="charges" value={formData.charges} onChange={handleInputChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="home_phone" className="text-right">
              Home Phone
            </Label>
            <Input id="home_phone" name="home_phone" value={formData.home_phone} onChange={handleInputChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="mobile_phone" className="text-right">
              Mobile Phone
            </Label>
            <Input id="mobile_phone" name="mobile_phone" value={formData.mobile_phone} onChange={handleInputChange} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Save Court Date</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
