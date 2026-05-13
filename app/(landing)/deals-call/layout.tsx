import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Smartest Home Security in America — Call for $0 Down Pricing | ShieldHome Pro',
  description:
    "Smart Home Security Specialists — PCMag's 2026 #1-rated smart security system at partner pricing. $0 down, free professional installation. Call now to lock in your offer.",
  // noindex: paid-traffic / A/B variant — call-only CTA test against /deals
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'The Smartest Home Security in America — Call for $0 Down Pricing',
    description:
      'Best Security, Best Plan — At The Right Price. Free professional installation. Most homes protected within 48 hours. Call to lock in your offer.',
    type: 'website',
    url: 'https://shieldhome.pro/deals-call',
    siteName: 'ShieldHome Pro',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Smartest Home Security in America — Call for $0 Down Pricing',
    description: 'Best Security, Best Plan — At The Right Price. Free pro install. Protected in 48 hours.',
  },
  alternates: {
    canonical: 'https://shieldhome.pro/deals-call',
  },
}

export default function DealsCallLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
