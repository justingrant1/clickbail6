import { Metadata } from "next"
import { StartTrialForm } from "@/components/start-trial-form"

export const metadata: Metadata = {
  title: "Start Free Trial - BondPro Bail Bonds Management Software",
  description: "Start your 30-day free trial of BondPro bail bonds software. No setup fees, no contracts. Get GPS tracking, court management, and financial tools for your bonding company.",
  keywords: "bail bonds software free trial, bonding company management, GPS defendant tracking trial, court date management software",
  openGraph: {
    title: "Start Your Free 30-Day Trial - BondPro",
    description: "Try the #1 bail bonds management software free for 30 days. Complete GPS tracking, automated compliance, and financial management.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Start Free Trial - BondPro Bail Bonds Software",
    description: "30-day free trial of professional bail bonds management software. No setup fees required.",
  },
}

export default function StartTrial() {
  return <StartTrialForm />
}
