import React from 'react';
import { Link } from 'react-router-dom'
import {
  Shield, MessageSquare, FileSearch, BookOpen,
  Users, Globe, AlertTriangle, CheckCircle, ChevronRight,
  Scale, Zap, Eye
} from 'lucide-react'
import './Landing.css'

const features = [
  { icon: MessageSquare, name: 'AI Legal Chat', desc: 'Precision-engineered legal dialogue with source citations' },
  { icon: FileSearch, name: 'Document Analyser', desc: 'Risk-flag contracts, affidavits and corporate filings' },
  { icon: Shield, name: 'Hallucination Detection', desc: 'Every citation cross-referenced in real-time' },
  { icon: Users, name: 'Lawyer Directory', desc: 'Verified Nigerian Bar Association practitioners' },
  { icon: BookOpen, name: 'Case Law Library', desc: '12,440+ Nigerian and international precedents' },
  { icon: Globe, name: 'Chrome Extension', desc: 'Specter Shield active on every website you visit' },
]

const mockCaseCard = {
  name: 'Gani Fawehinmi v. Inspector General of Police [2002]',
  court: 'SUPREME COURT OF NIGERIA',
  score: 94,
  points: [
    'Landmark constitutional rights case establishing locus standi',
    'Upheld fundamental rights under Chapter IV CFRN 1999',
    'Widely cited in subsequent fundamental rights applications',
  ]
}

export default function Landing() {
  return (
    <div className="landing">
      {/* NAVBAR */}
      <nav className="landing-nav">
        <div className="landing-nav-inner">
          <div className="landing-logo">
            <Shield size={20} strokeWidth={1.5} color="var(--gold-verdict)" />
            <span className="landing-wordmark">SPECTER</span>
            <div className="landing-logo-sep" />
            <span className="landing-nav-label">LEGAL INTELLIGENCE</span>
          </div>
          <div className="landing-nav-actions">
            <Link to="/auth" className="btn btn-ghost btn-sm">Sign In</Link>
            <Link to="/auth" className="btn btn-gold btn-sm">Get Access</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-copy">
            <div className="hero-label mono uppercase tracking-widest gold">
              BUILT FOR THE WEIGHT OF THE LAW
            </div>
            <h1 className="hero-headline">
              The Counsel<br />
              You Never<br />
              Had.
            </h1>
            <p className="hero-subheading">
              AI-powered legal intelligence with built-in hallucination detection.
              Research, analyse, verify — then connect with real lawyers who can act.
            </p>
            <div className="hero-ctas">
              <Link to="/auth" className="btn btn-gold btn-lg">Begin Your Case</Link>
              <a href="https://drive.google.com/file/d/1Pfnx-zoEUy0b7WpKGuL3lERwpDsjd0LS/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-lg">Watch Demo →</a>
            </div>
            <div className="hero-social">
              <div className="avatar-group">
                {['OA', 'KI', 'BE', 'CH', 'FN'].map((init, i) => (
                  <div key={i} className="avatar avatar-sm" style={{
                    background: ['#2C4A6B', '#3D5A78', '#4A6680', '#374F66', '#2E4A5E'][i],
                    marginLeft: i > 0 ? '-8px' : 0,
                    border: '2px solid var(--deep-void)',
                    position: 'relative',
                    zIndex: 5 - i
                  }}>{init}</div>
                ))}
              </div>
              <span className="mono muted" style={{ fontSize: '11px', letterSpacing: '0.05em' }}>
                Trusted by 2,400+ legal professionals across West Africa
              </span>
            </div>
          </div>

          {/* Decorative case card */}
          <div className="hero-card-wrap">
            <div className="hero-case-card card card-featured">
              <div className="hero-case-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--emerald-verified)' }} />
                  <span className="mono uppercase" style={{ fontSize: 10, letterSpacing: '0.2em', color: 'var(--emerald-verified)' }}>
                    CITATION VERIFIED
                  </span>
                </div>
                <div className="trust-badge high">
                  <Shield size={10} strokeWidth={1.5} />
                  {mockCaseCard.score}% TRUST
                </div>
              </div>
              <div style={{ marginBottom: 12 }}>
                <div className="mono gold" style={{ fontSize: 9, letterSpacing: '0.15em', marginBottom: 6 }}>
                  {mockCaseCard.court}
                </div>
                <div className="serif" style={{ fontSize: '15px', color: 'var(--parchment)', lineHeight: 1.3 }}>
                  {mockCaseCard.name}
                </div>
              </div>
              {mockCaseCard.points.map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'flex-start' }}>
                  <CheckCircle size={12} strokeWidth={1.5} color="var(--emerald-verified)" style={{ marginTop: 2, flexShrink: 0 }} />
                  <p style={{ fontSize: '12px', color: 'var(--silver-counsel)', fontFamily: 'var(--font-body)', margin: 0 }}>
                    {p}
                  </p>
                </div>
              ))}
              <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid rgba(65,90,119,0.3)' }}>
                <div className="mono gold" style={{ fontSize: '11px', letterSpacing: '0.1em', cursor: 'pointer' }}>
                  VIEW FULL ANALYSIS →
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES STRIP */}
      <section className="features-strip">
        <div className="features-inner">
          {features.map(({ icon: Icon, name, desc }, i) => (
            <div key={i} className="feature-item stagger-item">
              <Icon size={22} strokeWidth={1.5} color="var(--gold-verdict)" />
              <div>
                <div className="mono uppercase parchment" style={{ fontSize: 11, letterSpacing: '0.1em', marginBottom: 4 }}>
                  {name}
                </div>
                <p style={{ fontSize: '13px', margin: 0, lineHeight: 1.4 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works">
        <div className="how-inner">
          <div className="section-label mono uppercase gold tracking-wider" style={{ marginBottom: 20, fontSize: 11 }}>
            HOW IT WORKS
          </div>
          <h2 className="serif" style={{ fontSize: 48, marginBottom: 60, color: 'var(--parchment)' }}>
            Three Steps to Clarity
          </h2>
          {[
            { num: '01', title: 'Ask', desc: 'Describe your legal situation in plain language. Specter understands context, jurisdiction, and nuance across Nigerian and international law.' },
            { num: '02', title: 'Verify', desc: 'Every response is analysed by Specter Shield — our proprietary hallucination detection engine that cross-references citations in real-time.' },
            { num: '03', title: 'Act', desc: 'Export your research, share verified reports, or connect directly with a matched Nigerian Bar Association practitioner.' },
          ].map(({ num, title, desc }) => (
            <div key={num} className="step-row">
              <div className="step-num-bg serif">{num}</div>
              <div className="step-content">
                <h3 className="serif" style={{ fontSize: 36, color: 'var(--parchment)', marginBottom: 12 }}>{title}</h3>
                <p style={{ maxWidth: 520, fontSize: 16, lineHeight: 1.7 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="trust-section">
        <div className="trust-inner">
          <h2 className="serif" style={{ fontSize: 48, textAlign: 'center', marginBottom: 60, color: 'var(--parchment)' }}>
            The AI That Doesn't Lie to You.
          </h2>
          <div className="trust-grid">
            {/* Problem */}
            <div className="trust-col card" style={{ padding: 32 }}>
              <div className="mono uppercase" style={{ fontSize: 10, color: 'var(--crimson-flag)', letterSpacing: '0.2em', marginBottom: 20 }}>
                ⚠ THE PROBLEM
              </div>
              <h3 className="serif" style={{ fontSize: 22, marginBottom: 20, color: 'var(--parchment)' }}>
                Mata v. Avianca: A Cautionary Tale
              </h3>
              {[
                'A New York attorney submitted AI-generated legal briefs citing six entirely fictitious cases.',
                'The cases had convincing names, docket numbers, and court citations — all fabricated.',
                'The attorney faced sanctions, professional censure, and public humiliation.',
              ].map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
                  <AlertTriangle size={14} strokeWidth={1.5} color="var(--crimson-flag)" style={{ flexShrink: 0, marginTop: 3 }} />
                  <p style={{ fontSize: '14px', margin: 0 }}>{p}</p>
                </div>
              ))}
            </div>

            {/* Solution */}
            <div className="trust-col card" style={{ padding: 32 }}>
              <div className="mono uppercase" style={{ fontSize: 10, color: 'var(--emerald-verified)', letterSpacing: '0.2em', marginBottom: 20 }}>
                ✓ THE SPECTER SOLUTION
              </div>
              <h3 className="serif" style={{ fontSize: 22, marginBottom: 20, color: 'var(--parchment)' }}>
                Specter Shield: Citation Integrity
              </h3>
              {[
                'Every citation is cross-referenced against our verified legal database before being presented to you.',
                'Unverified citations are flagged amber or red with explicit warnings — never delivered as fact.',
                'A real-time Trust Score (0–100%) accompanies every AI response with full auditability.',
              ].map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
                  <CheckCircle size={14} strokeWidth={1.5} color="var(--emerald-verified)" style={{ flexShrink: 0, marginTop: 3 }} />
                  <p style={{ fontSize: '14px', margin: 0 }}>{p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="landing-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="landing-logo" style={{ marginBottom: 8 }}>
              <Shield size={16} strokeWidth={1.5} color="var(--gold-verdict)" />
              <span className="landing-wordmark" style={{ fontSize: 16 }}>SPECTER</span>
            </div>
            <p style={{ fontSize: '13px', maxWidth: 300 }}>
              AI-powered legal intelligence for the modern practitioner.
            </p>
          </div>
          <div className="footer-links">
            {['Features', 'Pricing', 'Case Library', 'Find a Lawyer', 'API'].map(l => (
              <Link key={l} to="/" className="mono muted" style={{ fontSize: 11, display: 'block', marginBottom: 8, transition: 'color 200ms' }}
                onMouseEnter={e => e.target.style.color = 'var(--gold-verdict)'}
                onMouseLeave={e => e.target.style.color = ''}>
                {l}
              </Link>
            ))}
          </div>
          <div className="footer-links">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Contact', 'Blog'].map(l => (
              <Link key={l} to="/" className="mono muted" style={{ fontSize: 11, display: 'block', marginBottom: 8, transition: 'color 200ms' }}
                onMouseEnter={e => e.target.style.color = 'var(--gold-verdict)'}
                onMouseLeave={e => e.target.style.color = ''}>
                {l}
              </Link>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <span className="mono muted" style={{ fontSize: 10, letterSpacing: '0.1em' }}>
            © 2025 SPECTER TECHNOLOGIES LTD · NOT A LAW FIRM · NIGERIAN COMPANY NUMBER RC-2025/LAG/004812
          </span>
        </div>
      </footer>
    </div>
  )
}
