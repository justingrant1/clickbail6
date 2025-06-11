"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Eye, EyeOff, Shield, Target, Smartphone, Lock } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error("Authentication error:", error.message)
        alert("Authentication failed: " + error.message)
        setIsLoading(false)
        return
      }

      if (data.session) {
        setIsLoading(false)
        router.push("/dashboard")
      } else {
        console.error("No session returned after authentication")
        alert("Authentication failed: No session returned")
        setIsLoading(false)
      }
    } catch (err) {
      console.error("Unexpected error during authentication:", err)
      alert("An unexpected error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800">
      <div className="container mx-auto px-4 py-8">
        {/* Back to home link */}
        <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Side - Sign In Form */}
          <div className="space-y-8">
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl font-bold text-white">Welcome Back</h1>
              <p className="text-lg text-white/80">Sign in to your Clickbail account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    className="border-slate-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                  />
                  <Label htmlFor="remember" className="text-white/80 text-sm">
                    Remember me
                  </Label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm text-purple-300 hover:text-purple-200 transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-lg transition-all duration-200"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>

              <div className="text-center space-y-4">
                <p className="text-white/60 text-sm">{"Don't have an account?"}</p>
                <Button
                  type="button"
                  variant="outline"
                  asChild
                  className="w-full h-12 border-white/20 text-white hover:bg-white/10 hover:text-white"
                >
                  <Link href="/start-trial">Create your account</Link>
                </Button>
              </div>
            </form>

            <p className="text-xs text-white/60 text-center">
              By signing in, you agree to our{" "}
              <Link href="/terms" className="text-purple-300 hover:text-purple-200">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-purple-300 hover:text-purple-200">
                Privacy Policy
              </Link>
            </p>
          </div>

          {/* Right Side - Benefits */}
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Welcome back to Clickbail</h2>
                <p className="text-lg text-white/80">
                  Continue managing your bail bonds business with our comprehensive platform.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Quick Access */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Target className="h-5 w-5 text-purple-300" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-white text-lg">Quick Access</h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                      Jump right back into tracking defendants, managing court dates, and monitoring your business
                      metrics.
                    </p>
                  </div>
                </div>
              </div>

              {/* Mobile Ready */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Smartphone className="h-5 w-5 text-blue-300" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-white text-lg">Mobile Ready</h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                      Access your dashboard from anywhere with our responsive design and mobile-optimized interface.
                    </p>
                  </div>
                </div>
              </div>

              {/* Secure & Reliable */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Lock className="h-5 w-5 text-green-300" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-white text-lg">Secure & Reliable</h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                      Your data is protected with bank-grade security and automatic backups.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
