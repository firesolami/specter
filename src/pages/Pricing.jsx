import React from 'react';
import { useState, useEffect } from 'react'
import AppLayout from '../components/AppLayout'
import { Check, X, Lock, ChevronDown, ChevronUp } from 'lucide-react'
import './Pricing.css'

const TARGET_TIME = new Date().getTime() + 47 * 3600000 + 23 * 60000 + 11 * 1000 + 44000

function useCountdown() {
  const [time, setTime] = useState({})
  useEffect(() => {
    const tick = () => {
      const diff = TARGET_TIME - Date.now()
      if (diff <= 0) { setTime({ d: 0, h: 0, m: 0, s: 0 }); return }
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])
  return time
}

const plans = [
  {
    name: 'ASSOCIATE',
    subtitle: 'For legal researchers and students',
    monthlyOriginal: '$29',
    monthly: '$12',
    yearlyOriginal: '$348',
    yearly: '$89',
    yearlyNote: '= $7.42/mo billed annually',
    cta: 'Get Started',
    ctaStyle: 'ghost',
    featured: false,
    features: [
      { text: 'AI Chat (50 queries/month)', included: true },
      { text: 'Document Analyser (5 docs/month)', included: true },
      { text: 'Case Library access', included: true },
      { text: 'Basic Trust Score', included: true },
      { text: 'Lawyer matching', included: false },
      { text: 'Chrome Extension', included: false },
    ]
  },
  {
    name: 'COUNSEL',
    subtitle: 'For practising legal professionals',
    monthlyOriginal: '$59',
    monthly: '$24',
    yearlyOriginal: '$708',
    yearly: '$199',
    yearlyNote: '= $16.58/mo billed annually',
    cta: 'Start Free Trial',
    ctaStyle: 'gold',
    featured: true,
    badge: 'MOST POPULAR',
    features: [
      { text: 'Unlimited AI Chat', included: true },
      { text: 'Document Analyser (unlimited)', included: true },
      { text: 'Full Case Library + Case AI Q&A', included: true },
      { text: 'Advanced Trust Score + Citations', included: true },
      { text: 'Lawyer Directory + 3 matches/month', included: true },
      { text: 'Chrome Extension (Specter Shield)', included: true },
    ]
  },
  {
    name: 'CHAMBERS',
    subtitle: 'For law firms and legal departments',
    monthlyOriginal: '$149',
    monthly: '$59',
    yearlyOriginal: '$1,788',
    yearly: '$499',
    yearlyNote: '= $41.58/mo billed annually',
    cta: 'Contact Sales',
    ctaStyle: 'ghost',
    featured: false,
    features: [
      { text: 'Everything in Counsel', included: true },
      { text: 'Team seats (up to 10)', included: true },
      { text: 'API access', included: true },
      { text: 'Custom document templates', included: true },
      { text: 'Priority lawyer matching', included: true },
      { text: 'White-label reports', included: true },
    ]
  },
]

const faqs = [
  { q: 'Is Specter a law firm?', a: 'No. Specter is a legal intelligence platform powered by AI. We provide research tools, citation verification, and lawyer matching. We do not provide legal advice, and our AI responses should not be construed as such. Always consult a qualified legal practitioner for your specific matter.' },
  { q: 'How accurate is the citation verification?', a: 'Our Specter Shield engine achieves 99.2% citation accuracy across our Nigerian and international legal database. Unlike generic AI models, every citation is cross-referenced against verified sources before being shown to you.' },
  { q: 'Does Specter cover Nigerian law specifically?', a: 'Yes. Our primary database covers Nigerian federal and state legislation, Supreme Court, Court of Appeal, Federal High Court, and State High Court judgments. We also include key Commonwealth and international precedents that apply in Nigerian courts.' },
  { q: 'Can I cancel anytime?', a: 'Yes. All plans can be cancelled at any time. If you cancel a yearly plan, you retain access until the end of your paid period with no further charges. Monthly plans are cancelled effective the next billing cycle.' },
  { q: 'Is my data secure and NDPR compliant?', a: 'Specter is fully compliant with the Nigeria Data Protection Regulation (NDPR) 2019 and NDPR Implementation Framework 2020. All data is encrypted in transit and at rest. We do not sell or share your data with third parties.' },
]

export default function Pricing() {
  const [yearly, setYearly] = useState(true)
  const [openFaq, setOpenFaq] = useState(null)
  const countdown = useCountdown()

  return (
    <AppLayout>
      <div className="pricing-page">
        {/* Top Banner */}
        <div className="pricing-banner">
          <span>⚡ FOUNDING MEMBER OFFER · 60% OFF ALL PLANS · ENDS IN </span>
          <span className="countdown-display">
            {String(countdown.d).padStart(2,'0')}:{String(countdown.h).padStart(2,'0')}:{String(countdown.m).padStart(2,'0')}:{String(countdown.s).padStart(2,'0')}
          </span>
        </div>

        {/* Heading */}
        <div className="pricing-header">
          <h1 className="serif" style={{ fontSize: 52, color: 'var(--parchment)', lineHeight: 1.1 }}>
            Counsel-Grade Intelligence.<br />Accessible Pricing.
          </h1>
        </div>

        {/* Toggle */}
        <div className="billing-toggle">
          <button className={`toggle-btn ${!yearly ? 'active' : ''}`} onClick={() => setYearly(false)}>Monthly</button>
          <button className={`toggle-btn ${yearly ? 'active' : ''}`} onClick={() => setYearly(true)}>
            Yearly
          </button>
          {yearly && <span className="pill pill-gold save-pill">SAVE UP TO 67%</span>}
        </div>

        {/* Plans Grid */}
        <div className="plans-grid">
          {plans.map(plan => (
            <div key={plan.name}
              className={`card plan-card ${plan.featured ? 'plan-featured card-featured' : ''}`}
              style={plan.featured ? { borderColor: 'var(--gold-verdict)', transform: 'translateY(-8px)' } : {}}>
              {plan.badge && (
                <div style={{ textAlign: 'center', marginBottom: 16 }}>
                  <span className="pill pill-gold">{plan.badge}</span>
                </div>
              )}
              <div className="mono uppercase" style={{ fontSize: 11, letterSpacing: '0.3em', color: plan.featured ? 'var(--gold-verdict)' : 'var(--silver-counsel)', marginBottom: 4 }}>
                {plan.name}
              </div>
              <div className="body-font muted" style={{ fontSize: 13, marginBottom: 24 }}>{plan.subtitle}</div>

              {yearly ? (
                <div style={{ marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span className="serif" style={{ fontSize: 46, color: 'var(--parchment)', lineHeight: 1 }}>{plan.yearly}</span>
                    <div>
                      <div className="mono muted" style={{ fontSize: 10, textDecoration: 'line-through' }}>{plan.yearlyOriginal}</div>
                      <div className="mono muted" style={{ fontSize: 10 }}>/yr</div>
                    </div>
                  </div>
                  <div className="mono muted" style={{ fontSize: 10, marginTop: 4 }}>{plan.yearlyNote}</div>
                </div>
              ) : (
                <div style={{ marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span className="serif" style={{ fontSize: 46, color: 'var(--parchment)', lineHeight: 1 }}>{plan.monthly}</span>
                    <div>
                      <div className="mono muted" style={{ fontSize: 10, textDecoration: 'line-through' }}>{plan.monthlyOriginal}</div>
                      <div className="mono muted" style={{ fontSize: 10 }}>/mo</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="divider" />

              <div className="plan-features">
                {plan.features.map((f, i) => (
                  <div key={i} className={`plan-feature ${!f.included ? 'disabled' : ''}`}>
                    {f.included
                      ? <Check size={14} strokeWidth={2} color="var(--emerald-verified)" style={{ flexShrink: 0 }} />
                      : <X size={14} strokeWidth={2} color="var(--steel-authority)" style={{ flexShrink: 0 }} />
                    }
                    <span className="body-font" style={{ fontSize: 14 }}>{f.text}</span>
                  </div>
                ))}
              </div>

              <button className={`btn btn-full btn-lg ${plan.ctaStyle === 'gold' ? 'btn-gold' : 'btn-ghost'}`} style={{ marginTop: 24 }}>
                {plan.cta}
              </button>
              {plan.featured && (
                <p className="mono muted" style={{ fontSize: 10, textAlign: 'center', marginTop: 10, letterSpacing: '0.08em' }}>
                  14-day free trial · No credit card required
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Trust row */}
        <div className="trust-row">
          {['🔒 SSL Encrypted', 'Cancel Anytime', 'NDPR Compliant', 'Nigerian & International Law Coverage'].map((t, i) => (
            <div key={i} className="trust-item">
              <Lock size={11} strokeWidth={1.5} color="var(--gold-verdict)" />
              <span className="mono muted" style={{ fontSize: 11 }}>{t}</span>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="pricing-faq">
          <h2 className="serif" style={{ fontSize: 36, color: 'var(--parchment)', marginBottom: 32, textAlign: 'center' }}>
            Frequently Asked Questions
          </h2>
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item card">
              <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span className="body-font" style={{ fontSize: 16, color: 'var(--parchment)', fontWeight: 600 }}>{faq.q}</span>
                {openFaq === i ? <ChevronUp size={16} strokeWidth={1.5} color="var(--gold-verdict)" /> : <ChevronDown size={16} strokeWidth={1.5} color="var(--silver-counsel)" />}
              </button>
              {openFaq === i && (
                <div style={{ padding: '0 20px 20px' }}>
                  <p className="body-font" style={{ fontSize: 14, lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Social Proof */}
        <div style={{ textAlign: 'center', padding: '40px 0 20px' }}>
          <div style={{ display: 'flex', gap: 0, justifyContent: 'center', marginBottom: 12 }}>
            {['OA', 'KI', 'BE', 'CH', 'FN'].map((init, i) => (
              <div key={i} className="avatar" style={{ background: ['#2C4A6B', '#3D5A78', '#4A6680', '#374F66', '#2E4A5E'][i], marginLeft: i > 0 ? '-8px' : 0, border: '2px solid var(--deep-void)', zIndex: 5 - i, position: 'relative' }}>{init}</div>
            ))}
          </div>
          <p className="serif" style={{ fontSize: 20, color: 'var(--parchment)', marginBottom: 6 }}>
            Join 2,400+ legal professionals
          </p>
          <div className="mono gold" style={{ fontSize: 12, letterSpacing: '0.1em' }}>★★★★★ 4.9/5 — Based on 847 reviews</div>
        </div>
      </div>
    </AppLayout>
  )
}
