"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Shield, Rocket, Lock, Lightbulb, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { supabase } from "@/lib/supabaseClient"

export function StartTrialForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    password: "",
    confirmPassword: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }
    
    try {
      console.log("Starting signup process...")
      
      // Step 1: Create user in Supabase first
      console.log("Creating user in Supabase...")
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            company: formData.company,
            phone: formData.phone,
            subscription_status: 'trialing'
          }
        }
      })
      
      if (authError) {
        console.error("Supabase auth error:", authError)
        if (authError.status === 422) {
          setError("An account with this email already exists. Please sign in or use a different email.")
        } else {
          setError(authError.message || "Failed to create account in Supabase.")
        }
        setIsLoading(false)
        return
      }
      
      console.log("Supabase user created:", authData)
      setSuccessMessage("Your account has been created and your 7-day trial has started! Redirecting to sign in...")
      // Redirect to sign-in page after a short delay to allow user to read the success message
      setTimeout(() => {
        window.location.href = "/sign-in";
      }, 2000);
    } catch (err: any) {
      console.error("Error processing signup:", err)
      setError(err.message || "An unexpected error occurred during sign-up. Please try again or contact support.")
    } finally {
      setIsLoading(false)
    }
  }

  const starterPlanFeatures = [
    "Full Starter plan access for 7 days",
    "Up to 50 defendants tracking",
    "Basic geo-fencing",
    "Core form templates",
    "Email support",
    "Mobile app access",
    "Basic reporting",
    "E-signature platform",
    "Court calendar sync",
    "Financial management tools",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6 sm:mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm sm:text-base">Back to home</span>
          </Link>

          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
              Start Your 7-Day Starter Plan Trial
            </h1>
            <p className="text-lg sm:text-xl text-white/80">Join 500+ bail bond companies already using Clickbail</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Form */}
          <div className="space-y-6 sm:space-y-8">
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {/* Account Information */}
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-semibold text-white">Account Information</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-white/90">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-400"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-white/90">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white/90">
                        Work Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-400"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white/90">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-400"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-white/90">
                        Company Name
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-400"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-white/90">
                        Password
                      </Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-400"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-white/90">
                        Confirm Password
                      </Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-400"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Trial Information */}
              <Card className="bg-slate-800/30 border-slate-700/30 backdrop-blur-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <Lock className="h-5 w-5 text-purple-400" />
                    <h3 className="text-base sm:text-lg font-semibold text-white">
                      Your Starter plan trial starts immediately
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                    You won't be charged for 7 days. After your trial, you'll be automatically enrolled in the Starter
                    plan at $49/month. Cancel anytime during your trial period.
                  </p>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 sm:py-4 text-base sm:text-lg rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
              >
                Start 7-Day Starter Trial
              </Button>

              <p className="text-xs sm:text-sm text-white/60 text-center">
                By signing up, you agree to our{" "}
                <Link href="/terms" className="text-purple-300 hover:text-purple-200 underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-purple-300 hover:text-purple-200 underline">
                  Privacy Policy
                </Link>
              </p>
            </form>
          </div>

          {/* Right Column - Benefits */}
          <div className="space-y-6">
            {/* What's Included */}
            <Card className="bg-slate-800/30 border-slate-700/30 backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600/20 rounded-full flex items-center justify-center">
                    <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-white">
                    What's included in your Starter plan trial:
                  </h2>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {starterPlanFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-white/90">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Info Cards */}
            <div className="space-y-4">
              <Card className="bg-purple-600/20 border-purple-500/30 backdrop-blur-sm">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Rocket className="h-4 w-4 text-purple-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1 sm:mb-2">Setup in under 24 hours</h3>
                      <p className="text-sm text-white/70">
                        Our team will help you get started with personalized onboarding and training.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-purple-600/20 border-purple-500/30 backdrop-blur-sm">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Lock className="h-4 w-4 text-purple-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1 sm:mb-2">Secure Payment Processing</h3>
                      <p className="text-sm text-white/70">
                        Your payment information is encrypted and secure. We use industry-standard security protocols.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-purple-600/20 border-purple-500/30 backdrop-blur-sm">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Lightbulb className="h-4 w-4 text-purple-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1 sm:mb-2">After Your Trial</h3>
                      <p className="text-sm text-white/70">
                        Automatically converts to Starter plan at $49/month. Upgrade to Professional or Enterprise
                        anytime.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
