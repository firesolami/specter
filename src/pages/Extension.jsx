import React from 'react';
import AppLayout from '../components/AppLayout'
import { Globe, Shield, Eye, Zap, Play } from 'lucide-react'
import './Extension.css'

const features = [
  {
    icon: Eye,
    title: 'Auto-Detection',
    desc: 'Specter Shield automatically identifies Terms & Conditions, Privacy Policies, and legal documents on any webpage you visit. No setup required.',
  },
  {
    icon: Shield,
    title: 'Real-Time Risk Flagging',
    desc: 'Dangerous clauses are highlighted in real-time with risk scores. Arbitration waivers, liability caps, and auto-renewals are instantly flagged.',
  },
  {
    icon: Zap,
    title: 'One-Click Analysis',
    desc: 'Highlight any text and click "Ask Specter" for instant AI analysis. Get plain-English explanations of complex legal language in seconds.',
  },
]

const flaggedClauses = [
  { text: 'Mandatory arbitration waiver...', risk: 'HIGH', color: '#C0392B' },
  { text: 'Automatic data sharing with third parties...', risk: 'HIGH', color: '#C0392B' },
  { text: 'Auto-renewal clause (90 days notice required)', risk: 'MEDIUM', color: '#C9A44C' },
  { text: 'Limitation of liability to 3 months fees', risk: 'MEDIUM', color: '#C9A44C' },
  { text: 'Governing law: Delaware, United States', risk: 'LOW', color: '#1A7A4A' },
]

export default function Extension() {
  return (
    <AppLayout>
      <div className="extension-page">
        {/* Hero */}
        <div className="ext-hero">
          <div className="ext-hero-content">
            <div className="mono gold uppercase tracking-widest" style={{ fontSize: 10, marginBottom: 16, letterSpacing: '0.4em' }}>
              SPECTER SHIELD
            </div>
            <h1 className="serif" style={{ fontSize: 52, color: 'var(--parchment)', lineHeight: 1.1, marginBottom: 20 }}>
              Browser Extension
            </h1>
            <p className="body-font" style={{ fontSize: 17, color: 'var(--silver-counsel)', maxWidth: 480, marginBottom: 32, lineHeight: 1.7 }}>
              Real-time legal analysis on every website you visit. Never sign another dangerous agreement without knowing what you're agreeing to.
            </p>
            <div style={{ display: 'flex', gap: 16 }}>
              <button className="btn btn-gold btn-lg">
                <Globe size={16} strokeWidth={1.5} />
                Install on Chrome →
              </button>
              <button className="btn btn-ghost btn-lg">
                View Documentation
              </button>
            </div>
            <div className="mono muted" style={{ fontSize: 10, marginTop: 16, letterSpacing: '0.1em' }}>
              Compatible with Chrome · Edge · Brave · Opera
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="ext-features">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <div key={i} className="card ext-feature-card stagger-item">
              <div className="ext-feature-icon">
                <Icon size={22} strokeWidth={1.5} color="var(--gold-verdict)" />
              </div>
              <div className="mono uppercase parchment" style={{ fontSize: 11, letterSpacing: '0.12em', marginBottom: 8 }}>{title}</div>
              <p style={{ fontSize: 14, lineHeight: 1.6, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>

        {/* Browser Mockup */}
        <div style={{ marginBottom: 60 }}>
          <div className="mono uppercase parchment" style={{ fontSize: 10, letterSpacing: '0.2em', marginBottom: 24, textAlign: 'center' }}>
            SEE IT IN ACTION
          </div>
          <div className="browser-mockup">
            {/* Browser chrome */}
            <div className="browser-chrome">
              <div className="browser-dots">
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#C0392B', opacity: 0.7 }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#C9A44C', opacity: 0.7 }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#1A7A4A', opacity: 0.7 }} />
              </div>
              <div className="browser-address">
                <div className="mono muted" style={{ fontSize: 11 }}>🔒 https://some-service.com/terms-of-service</div>
              </div>
            </div>

            {/* Browser content */}
            <div className="browser-content">
              {/* Fake Terms & Conditions */}
              <div className="mock-page">
                <h2 style={{ fontFamily: 'var(--font-body)', fontSize: 20, marginBottom: 16, color: 'var(--parchment)', opacity: 0.8 }}>
                  Terms and Conditions
                </h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--silver-counsel)', lineHeight: 1.8, marginBottom: 12 }}>
                  By accessing or using our services, you agree to be bound by these terms. All disputes arising out of or relating to these Terms shall be resolved exclusively through binding arbitration. <span style={{ background: 'rgba(192, 57, 43, 0.25)', borderBottom: '2px solid #C0392B', paddingBottom: 1 }}>You hereby waive any right to trial by jury or class action lawsuit in connection with our Services.</span>
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--silver-counsel)', lineHeight: 1.8, marginBottom: 12 }}>
                  <span style={{ background: 'rgba(201, 164, 76, 0.2)', borderBottom: '2px solid #C9A44C', paddingBottom: 1 }}>This subscription shall automatically renew on an annual basis unless cancelled with 90 days written notice prior to renewal date.</span> Cancellation requests must be submitted in writing via registered mail to our registered office.
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--silver-counsel)', lineHeight: 1.8 }}>
                  You grant us a worldwide, royalty-free licence to use, reproduce, and display your content. <span style={{ background: 'rgba(192, 57, 43, 0.25)', borderBottom: '2px solid #C0392B', paddingBottom: 1 }}>We may share your personal data with our affiliate partners and third-party advertising networks without prior notification.</span>
                </p>
              </div>

              {/* Extension Sidebar */}
              <div className="ext-sidebar-demo">
                <div className="ext-sidebar-header">
                  <Shield size={14} strokeWidth={1.5} color="var(--gold-verdict)" />
                  <span className="mono gold" style={{ fontSize: 10, letterSpacing: '0.15em' }}>SPECTER SHIELD</span>
                  <div className="trust-badge" style={{ background: 'rgba(192, 57, 43, 0.15)', color: '#E74C3C', border: '1px solid rgba(192, 57, 43, 0.3)', fontSize: 9, padding: '2px 6px', marginLeft: 'auto' }}>
                    HIGH RISK
                  </div>
                </div>
                <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--silver-counsel)', marginBottom: 12, letterSpacing: '0.05em' }}>
                  3 risk clauses detected
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {flaggedClauses.map((c, i) => (
                    <div key={i} style={{ background: `${c.color}12`, border: `1px solid ${c.color}30`, borderRadius: 2, padding: '8px 10px' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: c.color, letterSpacing: '0.1em', marginBottom: 4 }}>
                        ▲ {c.risk} RISK
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--silver-counsel)' }}>
                        {c.text}
                      </div>
                    </div>
                  ))}
                </div>
                <button style={{ marginTop: 14, width: '100%', background: 'var(--gold-verdict)', border: 'none', color: 'var(--deep-void)', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', padding: '8px', cursor: 'pointer', borderRadius: 2, textTransform: 'uppercase' }}>
                  Full Analysis →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Video Placeholder */}
        <div className="card ext-demo-video">
          <div className="ext-play-btn">
            <Play size={32} strokeWidth={1.5} color="var(--gold-verdict)" />
          </div>
          <div className="body-font" style={{ marginTop: 16, color: 'var(--silver-counsel)', fontSize: 16 }}>
            See Specter Shield in action — 2 min demo.
          </div>
          <div className="mono gold" style={{ fontSize: 11, marginTop: 6, letterSpacing: '0.1em' }}>WATCH FULL DEMO →</div>
        </div>
      </div>
    </AppLayout>
  )
}
