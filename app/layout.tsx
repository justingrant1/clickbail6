import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Clickbail - Bail Bonds Management Software | Defendant Tracking & Court Management",
    template: "%s | Clickbail Bail Bonds Software"
  },
  description: "Leading bail bonds management software with GPS tracking, court date management, payment processing, and defendant monitoring. Trusted by 500+ bonding companies nationwide. Start your free trial today.",
  keywords: [
    "bail bonds software",
    "bail bondsman management system", 
    "defendant tracking software",
    "GPS monitoring bail bonds",
    "court date management",
    "bail bond payment processing",
    "bonding company software",
    "surety bond management",
    "pretrial services software",
    "bail enforcement tracking"
  ].join(", "),
  authors: [{ name: "Clickbail Team", url: "https://clickbail.com" }],
  creator: "Clickbail",
  publisher: "Clickbail",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://clickbail.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Clickbail',
    title: 'Clickbail - #1 Bail Bonds Management Software',
    description: 'Transform your bail bonds business with our all-in-one platform. GPS tracking, automated compliance, digital paperwork, and more. Trusted by 500+ companies.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Clickbail Bail Bonds Management Software Dashboard',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clickbail - Bail Bonds Management Software',
    description: 'Leading bail bonds management platform with GPS tracking and automated compliance. Start your free trial today.',
    images: ['/og-image.jpg'],
    creator: '@clickbail',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'technology',
  classification: 'Business Software',
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <link rel="canonical" href="https://clickbail.com" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#7c3aed" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Clickbail" />
      </head>
      <body className={inter.className}>
        {/* Structured Data for SEO */}
        <Script id="structured-data" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Clickbail",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web Browser",
            "description": "Professional bail bonds management software with GPS tracking, court management, and automated compliance features.",
            "url": "https://clickbail.com",
            "author": {
              "@type": "Organization",
              "name": "Clickbail"
            },
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
              "description": "30-day free trial"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "150"
            },
            "featureList": [
              "GPS Defendant Tracking",
              "Court Date Management",
              "Payment Processing",
              "Digital Document Management",
              "Automated Compliance Reporting",
              "Real-time Notifications"
            ]
          })}
        </Script>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DR386STHGE"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DR386STHGE', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `}
        </Script>

        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
