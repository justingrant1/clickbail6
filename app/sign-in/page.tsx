import { Metadata } from "next"
import { SignInForm } from "@/components/sign-in-form"

export const metadata: Metadata = {
  title: "Sign In - BondPro Bail Bonds Software",
  description: "Sign in to your BondPro account to access your bail bonds management dashboard, track defendants, manage court dates, and handle payments.",
  robots: {
    index: true,
    follow: true,
  },
}

export default function SignIn() {
  return <SignInForm />
}
