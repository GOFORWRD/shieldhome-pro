'use client'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { ShieldCheck, Phone, MessageSquare } from 'lucide-react'
import { getHeadlineVariant } from '@/lib/headlineVariants'
import { PHONE_NUMBER, PHONE_NUMBER_RAW } from '@/lib/constants'

const SMS_NUMBER = '+13854440030'

function trackPhoneClick() {
  if (typeof window !== 'undefined') {
    const dl = (window as unknown as { dataLayer?: Array<Record<string, unknown>> }).dataLayer
    dl?.push({ event: 'phone_click', source: 'hero_call' })
  }
}

function trackSmsClick() {
  if (typeof window !== 'undefined') {
    const dl = (window as unknown as { dataLayer?: Array<Record<string, unknown>> }).dataLayer
    dl?.push({ event: 'sms_click', source: 'hero_call' })
  }
}

export default function HeroDealsCall() {
  const searchParams = useSearchParams()
  const src = searchParams.get('src')
  const variant = getHeadlineVariant(src)

  return (
    <section className="relative overflow-hidden bg-slate-900">
      {/* Background image — desktop only, behind right column */}
      <div className="hidden lg:block absolute top-0 right-0 bottom-0 w-[40%] pointer-events-none opacity-30">
        <Image
          src="/images/google/vivint-products-hero.jpg"
          alt=""
          fill
          priority
          className="object-contain object-right"
          sizes="40vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent" />
      </div>

      {/* ── Mobile ── */}
      <div className="md:hidden relative">
        {/* Mobile product image — top of hero for credibility */}
        <div className="relative h-[180px] overflow-hidden">
          <Image
            src="/images/google/vivint-products-hero.jpg"
            alt="Vivint smart home security lineup"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-900/20 to-slate-900" />
        </div>

        <div className="pt-3 pb-8 px-4 -mt-6 relative">
          {/* Pre-headline pill */}
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-2.5 py-1 mb-3">
            <ShieldCheck size={11} className="text-emerald-400" />
            <span className="text-[10px] font-heading font-semibold text-emerald-300 uppercase tracking-[0.1em]">
              {variant.preHeadline}
            </span>
          </div>

          {/* H1 */}
          <h1 className="text-white font-heading font-bold text-[26px] leading-[1.15] tracking-[-0.025em] mb-2">
            {variant.h1Mobile}
          </h1>

          {/* Subheadline */}
          <p className="text-slate-300 text-[14px] leading-[1.55] mb-5 font-body">
            {variant.subheadline}
          </p>

          {/* Phone CTA — primary */}
          <a
            href={`tel:${PHONE_NUMBER_RAW}`}
            onClick={trackPhoneClick}
            className="flex items-center justify-center gap-2 w-full bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-4 rounded-lg font-heading font-bold text-[17px] tracking-[-0.01em] transition-all duration-300 mb-2 shadow-[0_8px_30px_rgba(5,150,105,0.35)]"
          >
            <Phone size={18} />
            Call {PHONE_NUMBER}
          </a>

          {/* SMS secondary */}
          <a
            href={`sms:${SMS_NUMBER}`}
            onClick={trackSmsClick}
            className="flex items-center justify-center gap-2 w-full border border-slate-700 hover:border-slate-500 text-white px-6 py-3 rounded-lg font-heading font-semibold text-[14px] tracking-[-0.01em] transition-all duration-300 mb-4"
          >
            <MessageSquare size={14} />
            Text Us
          </a>

          {/* Availability cue */}
          <p className="text-[12px] text-center text-slate-400 font-body mb-4">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 align-middle animate-pulse" />
            Smart Home Pros standing by — Mon–Sat, 8am–8pm MT
          </p>

          {/* Trust strip */}
          <div className="flex items-center justify-center gap-3 text-[10px] text-slate-500 font-body tracking-[0.04em] uppercase">
            <span className="flex items-center gap-1">
              <span className="text-amber-400 text-sm">★</span>
              58K+ reviews
            </span>
            <span className="text-slate-700">|</span>
            <span>BBB A+</span>
            <span className="text-slate-700">|</span>
            <span>2M+ Homes</span>
          </div>
        </div>
      </div>

      {/* ── Desktop ── */}
      <div className="hidden md:block relative">
        <div className="max-w-7xl mx-auto px-8 pt-16 pb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left column: copy */}
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-3 py-1.5 mb-5">
                <ShieldCheck size={13} className="text-emerald-400" />
                <span className="text-[11px] font-heading font-semibold text-emerald-300 uppercase tracking-[0.1em]">
                  {variant.preHeadline}
                </span>
              </div>

              <h1 className="text-white font-heading font-bold text-[44px] lg:text-[52px] leading-[1.05] tracking-[-0.03em] mb-4">
                {variant.h1Desktop}
              </h1>

              <p className="text-slate-300 text-[17px] leading-[1.55] mb-6 font-body max-w-[520px]">
                {variant.subheadline}
              </p>

              <ul className="space-y-2.5 mb-6">
                {[
                  '$0 down. Free professional install.',
                  'AI cameras that spotlight and deter intruders.',
                  'Most homes protected within 48 hours.',
                ].map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5 text-[15px] text-slate-200 font-body">
                    <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-4 text-[12px] text-slate-400 font-body tracking-[0.04em] uppercase">
                <span className="flex items-center gap-1">
                  <span className="text-amber-400 text-sm">★</span>
                  4.8/5 · 58K+ reviews
                </span>
                <span className="text-slate-700">|</span>
                <span>BBB A+</span>
                <span className="text-slate-700">|</span>
                <span>2M+ Homes</span>
              </div>
            </div>

            {/* Right column: phone CTA card */}
            <div className="lg:pl-6">
              <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.25)] p-8 text-center">
                <p
                  className="text-[11px] font-heading font-semibold uppercase tracking-[0.16em] mb-2"
                  style={{ color: 'var(--color-brass-400)' }}
                >
                  Talk to a Smart Home Pro
                </p>
                <h2 className="font-heading font-bold text-[22px] text-slate-900 mb-2 tracking-[-0.02em] leading-tight">
                  Get Your Quote in One Call
                </h2>
                <p className="text-[14px] font-body text-slate-500 mb-6 leading-[1.55]">
                  No back-and-forth. Real pricing, real install dates, no automated callbacks.
                </p>

                <a
                  href={`tel:${PHONE_NUMBER_RAW}`}
                  onClick={trackPhoneClick}
                  className="flex items-center justify-center gap-2 w-full bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-5 rounded-lg font-heading font-bold text-[22px] tracking-[-0.01em] transition-all duration-300 hover:-translate-y-px shadow-[0_8px_30px_rgba(5,150,105,0.35)]"
                >
                  <Phone size={20} />
                  {PHONE_NUMBER}
                </a>

                <a
                  href={`sms:${SMS_NUMBER}`}
                  onClick={trackSmsClick}
                  className="flex items-center justify-center gap-2 w-full mt-3 border border-slate-200 hover:border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-heading font-semibold text-[14px] tracking-[-0.01em] transition-all duration-300"
                >
                  <MessageSquare size={14} />
                  Or text us your address
                </a>

                <p className="text-[12px] text-slate-500 font-body mt-5 flex items-center justify-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live agents · Mon–Sat, 8am–8pm MT
                </p>

                <div className="mt-5 pt-5 border-t border-slate-100 flex items-center justify-center gap-3 text-[11px] text-slate-400 font-body tracking-[0.04em] uppercase">
                  <span>No bots</span>
                  <span className="text-slate-300">·</span>
                  <span>No automated callbacks</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
