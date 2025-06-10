import type { Metadata } from "next"
import { SignInForm } from "@/components/sign-in-form"

export const metadata: Metadata = {
  title: "Sign In - Clickbail",
  description: "Sign in to your Clickbail account to manage your bail bonds business.",
}

export default function SignInPage() {
  return <SignInForm />
}
