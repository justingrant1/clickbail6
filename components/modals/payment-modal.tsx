"use client"

import type React from "react"

import { useState, useEffect } from "react"
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

interface PaymentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onPaymentAdded?: () => void
}

export function PaymentModal({ open, onOpenChange, onPaymentAdded }: PaymentModalProps) {
  const [formData, setFormData] = useState({
    clientName: "",
    bondNumber: "",
    amount: "",
    paymentMethod: "",
    notes: "",
  })
  
  const [clients, setClients] = useState<any[]>([])
  const [bonds, setBonds] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    const fetchClientsAndBonds = async () => {
      setIsLoading(true)
      try {
        // Fetch clients
        const { data: clientsData, error: clientsError } = await supabase.from('clients').select('*')
        if (clientsError) {
          console.error("Error fetching clients:", clientsError)
        } else {
          setClients(clientsData || [])
        }
        
        // Fetch bonds
        const { data: bondsData, error: bondsError } = await supabase.from('bonds').select('*')
        if (bondsError) {
          console.error("Error fetching bonds:", bondsError)
        } else {
          setBonds(bondsData || [])
        }
      } catch (err) {
        console.error("Unexpected error:", err)
      } finally {
        setIsLoading(false)
      }
    }
    
    if (open) {
      fetchClientsAndBonds()
    }
  }, [open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Convert amount to a number
      const amountValue = parseFloat(formData.amount)
      
      // Insert payment into Supabase
      const { error } = await supabase.from('payments').insert([
        {
          client_name: formData.clientName,
          bond_number: formData.bondNumber,
          amount: amountValue,
          payment_method: formData.paymentMethod,
          notes: formData.notes,
          payment_date: new Date().toISOString()
        }
      ])
      
      if (error) {
        console.error("Error recording payment:", error)
        alert("Failed to record payment. Please try again.")
      } else {
        alert("Payment recorded successfully!")
        onOpenChange(false)
        // Reset form
        setFormData({
          clientName: "",
          bondNumber: "",
          amount: "",
          paymentMethod: "",
          notes: "",
        })
        
        // Call the callback if provided
        if (onPaymentAdded) {
          onPaymentAdded()
        }
      }
    } catch (err) {
      console.error("Unexpected error:", err)
      alert("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter Payment</DialogTitle>
          <DialogDescription>Record a new payment from a client.</DialogDescription>
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
                placeholder="Enter client name"
                list="client-names"
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
                placeholder="Enter bond number"
                list="bond-numbers"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="col-span-3"
                placeholder="0.00"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="paymentMethod" className="text-right">
                Method
              </Label>
              <Select
                value={formData.paymentMethod}
                onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="check">Check</SelectItem>
                  <SelectItem value="credit-card">Credit Card</SelectItem>
                  <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
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
          <datalist id="client-names">
            {clients.map((client) => (
              <option key={client.id} value={client.name} />
            ))}
          </datalist>
          
          <datalist id="bond-numbers">
            {bonds.map((bond) => (
              <option key={bond.id} value={bond.powerNumber || bond.id} />
            ))}
          </datalist>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Processing..." : "Record Payment"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
