import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to home</span>
          </Link>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
              <p className="text-slate-700">
                Welcome to Clickbail. These Terms of Service govern your use of our website and services. 
                By accessing or using Clickbail, you agree to be bound by these Terms.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">2. Subscription Terms</h2>
              <p className="text-slate-700">
                The Clickbail Starter Plan begins with a 7-day free trial. After the trial period, 
                you will be automatically charged $49 per month unless you cancel before the trial ends.
                You may cancel your subscription at any time by contacting our support team.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">3. User Accounts</h2>
              <p className="text-slate-700">
                You are responsible for safeguarding your account credentials and for all activity that occurs 
                under your account. You must notify us immediately of any unauthorized use of your account.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">4. Data Privacy</h2>
              <p className="text-slate-700">
                Our collection and use of personal information in connection with your access to and use of the 
                Services is described in our <Link href="/privacy" className="text-purple-600 hover:text-purple-800 underline">Privacy Policy</Link>.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">5. Limitations of Liability</h2>
              <p className="text-slate-700">
                Clickbail and its affiliates, service providers, employees, agents, officers, and directors shall not be 
                liable to you for any indirect, punitive, incidental, special, consequential, or exemplary damages.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">6. Changes to Terms</h2>
              <p className="text-slate-700">
                We may modify these Terms at any time. If we make changes, we will provide notice of such changes, 
                such as by sending an email notification, providing notice through the Services, or updating the 
                "Last Updated" date at the top of these Terms.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">7. Contact Information</h2>
              <p className="text-slate-700">
                If you have any questions about these Terms, please contact us at: support@clickbail.com
              </p>
            </section>
          </div>
          
          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link href="/">Return to Homepage</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
