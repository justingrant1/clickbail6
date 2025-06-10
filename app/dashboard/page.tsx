import { Metadata } from "next"
import { MainDashboard } from "@/components/main-dashboard"
import { DashboardLayout } from "@/components/dashboard-layout"

export const metadata: Metadata = {
  title: "Dashboard - Bail Bonds Management",
  description: "Manage your bail bonds business with real-time analytics, client tracking, court dates, and financial oversight. Complete bonding company dashboard.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function Home() {
  return (
    <DashboardLayout>
      <MainDashboard />
    </DashboardLayout>
  )
}
