"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, CreditCard, FileText, UserPlus } from "lucide-react"
import { PaymentModal } from "@/components/modals/payment-modal"
import { BondModal } from "@/components/modals/bond-modal"
import { ClientModal } from "@/components/modals/client-modal"
import { CourtDateModal } from "@/components/modals/court-date-modal"
import { CheckinModal } from "@/components/modals/checkin-modal"

export function QuickActions() {
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [bondModalOpen, setBondModalOpen] = useState(false)
  const [clientModalOpen, setClientModalOpen] = useState(false)
  const [courtDateModalOpen, setCourtDateModalOpen] = useState(false)
  const [checkinModalOpen, setCheckinModalOpen] = useState(false)

  return (
    <>
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="h-auto py-4 flex flex-col gap-2" onClick={() => setPaymentModalOpen(true)}>
              <CreditCard className="h-6 w-6" />
              <span>Enter Payment</span>
            </Button>

            <Button size="lg" className="h-auto py-4 flex flex-col gap-2" onClick={() => setBondModalOpen(true)}>
              <FileText className="h-6 w-6" />
              <span>Add New Bond</span>
            </Button>

            <Button size="lg" className="h-auto py-4 flex flex-col gap-2" onClick={() => setClientModalOpen(true)}>
              <UserPlus className="h-6 w-6" />
              <span>Add New Client</span>
            </Button>

            <Button size="lg" className="h-auto py-4 flex flex-col gap-2" onClick={() => setCourtDateModalOpen(true)}>
              <Calendar className="h-6 w-6" />
              <span>Add Court Date</span>
            </Button>

            <Button size="lg" className="h-auto py-4 flex flex-col gap-2" onClick={() => setCheckinModalOpen(true)}>
              <Clock className="h-6 w-6" />
              <span>Add Check-In</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <PaymentModal open={paymentModalOpen} onOpenChange={setPaymentModalOpen} />
      <BondModal open={bondModalOpen} onOpenChange={setBondModalOpen} />
      <ClientModal open={clientModalOpen} onOpenChange={setClientModalOpen} />
      <CourtDateModal open={courtDateModalOpen} onOpenChange={setCourtDateModalOpen} />
      <CheckinModal open={checkinModalOpen} onOpenChange={setCheckinModalOpen} />
    </>
  )
}
