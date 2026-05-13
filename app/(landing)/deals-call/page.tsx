'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Phone, MessageSquare } from 'lucide-react'
import NavigationCall from '@/components/landing/NavigationCall'
import HeroDealsCall from '@/components/landing/HeroDealsCall'
import { PHONE_NUMBER, PHONE_NUMBER_RAW } from '@/lib/constants'

const SMS_NUMBER = '+13854440030'

// Below-fold: lazy loaded for performance
const PromoBannerDealsCall = dynamic(() => import('@/components/landing/PromoBannerDealsCall'))
const TotalShieldPackage = dynamic(() => import('@/components/landing/TotalShieldPackage'))
const StatsBar = dynamic(() => import('@/components/landing/StatsBar'))
const AwardsMarquee = dynamic(() => import('@/components/landing/AwardsMarquee'))
const HowItWorks = dynamic(() => import('@/components/landing/HowItWorks'))
const CrimeStats = dynamic(() => import('@/components/landing/CrimeStats'))
const ProductShowcase = dynamic(() => import('@/components/landing/ProductShowcase'))
const TestimonialCarousel = dynamic(() => import('@/components/landing/TestimonialCarousel'))
const ComparisonTable = dynamic(() => import('@/components/landing/ComparisonTable'))
const WhyVivintSection = dynamic(() => import('@/components/landing/WhyVivintSection'))
const EnhancedGuarantee = dynamic(() => import('@/components/landing/EnhancedGuarantee'))
const FAQSection = dynamic(() => import('@/components/landing/FAQSection'))
const Footer = dynamic(() => import('@/components/landing/Footer'))
const StickyPhoneOnlyCTA = dynamic(() => import('@/components/landing/StickyPhoneOnlyCTA'))

function trackPhoneClick(source: string) {
  if (typeof window !== 'undefined') {
    const dl = (window as unknown as { dataLayer?: Array<Record<string, unknown>> }).dataLayer
    dl?.push({ event: 'phone_click', source })
  }
}

function DealsCallPageInner() {
  return (
    <div className="min-h-screen bg-white">
      <a href="#main-content" className="skip-to-content">Skip to content</a>

      {/* Spacer for fixed trust bar */}
      <div className="h-9" />

      <NavigationCall />
      <PromoBannerDealsCall />

      <main id="main-content">
        {/* Hero — confidence headline + prominent phone CTA */}
        <HeroDealsCall />

        {/* ADT / competitor contract buyout callout — call to confirm buyout */}
        <section className="bg-slate-100 py-10 md:py-14 border-y border-slate-200">
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
                <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                  <Phone size={28} className="text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] md:text-[11px] font-heading font-bold uppercase tracking-[0.16em] text-emerald-700 mb-1.5">
                    Currently with ADT, Brinks, or Another Provider?
                  </p>
                  <h3 className="font-heading font-bold text-[20px] md:text-[26px] text-slate-900 mb-2 tracking-[-0.02em] leading-tight">
                    We&apos;ll Cover Up to $1,000 of Your Existing Contract
                  </h3>
                  <p className="text-[14px] md:text-[15px] font-body text-slate-600 leading-[1.55]">
                    Call a Smart Home Pro to confirm your buyout amount — seamless switchover,
                    no gap in protection.
                  </p>
                </div>
                <a
                  href={`tel:${PHONE_NUMBER_RAW}`}
                  onClick={() => trackPhoneClick('buyout_callout')}
                  className="flex-shrink-0 inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-heading font-semibold text-[14px] md:text-[15px] tracking-[-0.01em] transition-all duration-300 hover:-translate-y-px hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
                >
                  <Phone size={15} />
                  Call to Confirm Buyout
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Total Shield Package Value Stack — call mode */}
        <TotalShieldPackage callMode />

        {/* Social proof */}
        <StatsBar />
        <AwardsMarquee />

        {/* How It Works */}
        <HowItWorks />

        {/* Crime Stats */}
        <CrimeStats callMode />

        {/* Products */}
        <ProductShowcase callMode />

        {/* Testimonials */}
        <TestimonialCarousel />

        {/* Comparison */}
        <ComparisonTable callMode />

        {/* Why Vivint */}
        <WhyVivintSection callMode />

        {/* Enhanced Protected Home Promise */}
        <EnhancedGuarantee callMode />

        {/* FAQ */}
        <FAQSection />

        {/* Final CTA — phone-only */}
        <section className="bg-slate-900 py-14 md:py-32 relative overflow-hidden">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] pointer-events-none"
            style={{ backgroundColor: 'rgba(5, 150, 105, 0.06)' }}
          />

          <div className="max-w-2xl mx-auto px-4 md:px-8 text-center relative">
            <p
              className="text-[10px] md:text-[11px] font-heading font-semibold uppercase tracking-[0.16em] mb-3 md:mb-5"
              style={{ color: 'var(--color-brass-300)' }}
            >
              Talk to a Smart Home Pro
            </p>
            <h2 className="font-heading font-bold text-[24px] md:text-[40px] tracking-[-0.03em] text-white mb-3 md:mb-4 leading-[1.15]">
              Ready to Lock In Your $0 Down Offer?
            </h2>
            <p className="text-[14px] md:text-[16px] font-body text-slate-400 mb-3 md:mb-4 max-w-md mx-auto">
              One call. Real pricing. Real install dates. No back-and-forth.
            </p>
            <p className="text-[12px] md:text-[13px] font-body text-slate-500 mb-8 md:mb-12 flex items-center justify-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live agents · Mon–Sat, 8am–8pm MT
            </p>

            <div className="flex flex-col items-center justify-center gap-4">
              <a
                href={`tel:${PHONE_NUMBER_RAW}`}
                onClick={() => trackPhoneClick('final_cta')}
                className="inline-flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-5 rounded-lg font-heading font-bold text-[20px] md:text-[24px] tracking-[-0.01em] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-px hover:shadow-[0_8px_40px_rgba(5,150,105,0.5)] w-full sm:w-auto"
              >
                <Phone size={22} />
                {PHONE_NUMBER}
              </a>
              <a
                href={`sms:${SMS_NUMBER}`}
                onClick={() => trackPhoneClick('final_cta_sms')}
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors duration-300 text-[14px] font-body"
              >
                <MessageSquare size={14} />
                <span>Or text us your address — we&apos;ll call back</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <StickyPhoneOnlyCTA />
    </div>
  )
}

export default function DealsCallPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-900" />}>
      <DealsCallPageInner />
    </Suspense>
  )
}
