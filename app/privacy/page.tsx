import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPage() {
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
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
              <p className="text-slate-700">
                At Clickbail, we take your privacy seriously. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you use our service.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
              <p className="text-slate-700">
                We collect information that you provide directly to us when you register for an account, 
                create or modify your profile, or interact with our services. This includes:
              </p>
              <ul className="list-disc pl-6 mt-2 text-slate-700 space-y-1">
                <li>Account information (name, email address, password)</li>
                <li>Profile information (company name, phone number)</li>
                <li>Payment information (processed securely through Stripe)</li>
                <li>User-generated content (client information, case details)</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
              <p className="text-slate-700">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 mt-2 text-slate-700 space-y-1">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send administrative messages, updates, and security alerts</li>
                <li>Respond to your comments, questions, and customer service requests</li>
                <li>Monitor and analyze trends, usage, and activities</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">4. Data Storage and Security</h2>
              <p className="text-slate-700">
                Your data is stored securely on our Supabase database. We implement appropriate 
                technical and organizational measures to protect the security of your personal information. 
                However, please note that no method of transmission over the Internet or electronic storage is 
                100% secure.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">5. Payment Processing</h2>
              <p className="text-slate-700">
                We use Stripe for payment processing. When you provide payment information, you are 
                providing it directly to Stripe, and their privacy policy applies to that information.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">6. Your Rights</h2>
              <p className="text-slate-700">
                Depending on your location, you may have certain rights regarding your personal information, 
                such as the right to access, correct, delete, or export your data. To exercise these rights, 
                please contact us using the information provided below.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">7. Changes to This Privacy Policy</h2>
              <p className="text-slate-700">
                We may update this Privacy Policy from time to time. We will notify you of any changes by 
                posting the new Privacy Policy on this page and updating the "Last Updated" date.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">8. Contact Us</h2>
              <p className="text-slate-700">
                If you have any questions about this Privacy Policy, please contact us at: privacy@clickbail.com
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
