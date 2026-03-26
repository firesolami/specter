import React from 'react';
import { useState } from 'react'
import AppLayout from '../components/AppLayout'
import { Compass, CheckCircle, MapPin } from 'lucide-react'
import './FindLawyer.css'

const matchedLawyers = [
  {
    initials: 'TJ', name: 'Tunde Jegede (SAN)', firm: 'Jegede & Associates', spec: 'Commercial & Corporate Law',
    years: 28, location: 'Lagos', bg: '#1A3A5C', confidence: 94,
    reasons: [
      'Specialises in commercial contract disputes with 28 years of active practice.',
      'Successfully handled 140+ similar contractual breach matters in Nigerian courts.',
      'Senior Advocate of Nigeria — highest qualification in the Nigerian Bar.',
    ]
  },
  {
    initials: 'ON', name: 'Olumide Nurudeen (SAN)', firm: 'Nurudeen & Co.', spec: 'Commercial & Criminal Law',
    years: 25, location: 'Lagos', bg: '#1A3A4A', confidence: 87,
    reasons: [
      'Broad commercial litigation experience covering breach of contract and corporate disputes.',
      'Strong track record in complex multi-party commercial cases up to the Supreme Court level.',
      'Listed in Chambers & Partners Africa 2024 as a leading commercial litigator.',
    ]
  },
  {
    initials: 'EI', name: 'Emeka Ikenna, Esq.', firm: 'Pinnacle Legal Group', spec: 'Corporate & IP Law',
    years: 19, location: 'Lagos', bg: '#1A4A3A', confidence: 79,
    reasons: [
      'Corporate law specialist with experience in technology contracts and IP disputes.',
      'Provides practical commercial advice and cost-effective strategic litigation.',
      'Speaks fluent Igbo and Yoruba — valuable for West African cross-border disputes.',
    ]
  },
]

const matterTypes = ['Contract Dispute', 'Criminal Defence', 'Family Law', 'Property', 'Employment', 'Immigration', 'Corporate', 'Constitutional', 'Debt Recovery', 'IP Dispute']

export default function FindLawyer() {
  const [stage, setStage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [matter, setMatter] = useState('')
  const [matterType, setMatterType] = useState('')
  const [urgency, setUrgency] = useState('Standard')
  const [budget, setBudget] = useState('')

  const handleFind = () => {
    if (!matter.trim()) return
    setLoading(true)
    setTimeout(() => { setLoading(false); setStage(2) }, 2000)
  }

  return (
    <AppLayout>
      <div className="find-lawyer-page">
        {stage === 1 ? (
          <div className="intake-layout">
            <div style={{ marginBottom: 40, textAlign: 'center' }}>
              <div className="mono gold uppercase tracking-wider" style={{ fontSize: 11, marginBottom: 16, letterSpacing: '0.4em' }}>
                AI-POWERED LAWYER MATCHING
              </div>
              <h1 className="serif" style={{ fontSize: 44, color: 'var(--parchment)', marginBottom: 12, lineHeight: 1.2 }}>
                Describe Your Legal Matter.
              </h1>
              <p className="body-font muted" style={{ fontSize: 16, maxWidth: 500, margin: '0 auto' }}>
                Tell us what you're facing. The more detail, the better our AI can match you with the right counsel.
              </p>
            </div>

            <div className="intake-form card-featured card" style={{ padding: 40 }}>
              <textarea
                className="input-field"
                rows={8}
                placeholder="Tell us what you're facing. For example: I entered a contract with a supplier for goods worth ₦4.5 million. They failed to deliver on the agreed date and have refused refunds. I have all documentation including signed agreements, invoices, and correspondence. I need to recover my money and potentially seek damages..."
                value={matter}
                onChange={e => setMatter(e.target.value)}
                style={{ resize: 'vertical', marginBottom: 20 }}
              />

              <div className="intake-selects">
                <div>
                  <div className="mono muted" style={{ fontSize: 10, marginBottom: 8, letterSpacing: '0.1em' }}>MATTER TYPE</div>
                  <select className="input-field" value={matterType} onChange={e => setMatterType(e.target.value)}>
                    <option value="">Select matter type...</option>
                    {matterTypes.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <div className="mono muted" style={{ fontSize: 10, marginBottom: 8, letterSpacing: '0.1em' }}>URGENCY</div>
                  <select className="input-field" value={urgency} onChange={e => setUrgency(e.target.value)}>
                    <option>Standard</option>
                    <option>Urgent</option>
                    <option>Emergency</option>
                  </select>
                </div>
                <div>
                  <div className="mono muted" style={{ fontSize: 10, marginBottom: 8, letterSpacing: '0.1em' }}>BUDGET RANGE</div>
                  <select className="input-field" value={budget} onChange={e => setBudget(e.target.value)}>
                    <option value="">Select budget...</option>
                    <option>Below ₦50,000</option>
                    <option>₦50,000 – ₦200,000</option>
                    <option>₦200,000+</option>
                    <option>Undisclosed</option>
                  </select>
                </div>
              </div>

              <button
                className="btn btn-gold btn-full btn-lg"
                style={{ marginTop: 24 }}
                onClick={handleFind}
                disabled={loading}
              >
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Compass size={16} strokeWidth={1.5} style={{ animation: 'spin 1.5s linear infinite' }} />
                    Analysing your matter and matching counsel...
                  </span>
                ) : (
                  'FIND MY COUNSEL →'
                )}
              </button>
              <p className="mono muted" style={{ textAlign: 'center', fontSize: 10, marginTop: 12, letterSpacing: '0.08em' }}>
                AI will analyse your matter and match you with 3 verified lawyers from our directory.
              </p>
            </div>
          </div>
        ) : (
          <div className="results-layout">
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <div className="mono gold uppercase" style={{ fontSize: 11, letterSpacing: '0.4em', marginBottom: 12 }}>
                ◆ MATCH COMPLETE
              </div>
              <h1 className="serif" style={{ fontSize: 40, color: 'var(--parchment)', marginBottom: 12 }}>
                We Found Your Counsel.
              </h1>
              <p className="body-font muted" style={{ fontSize: 15 }}>
                Based on your matter, these 3 lawyers are your strongest match.
              </p>
            </div>

            <div className="match-cards">
              {matchedLawyers.map((l, i) => (
                <div key={i} className="card match-card stagger-item">
                  <div className="match-rank">
                    <span className="mono uppercase" style={{ fontSize: 9, letterSpacing: '0.2em', color: i === 0 ? 'var(--gold-verdict)' : 'var(--silver-counsel)' }}>
                      #{i + 1} {i === 0 ? 'BEST MATCH' : `MATCH`}
                    </span>
                  </div>
                  <div className="match-layout">
                    {/* Left: Profile */}
                    <div className="match-profile">
                      <div className="avatar avatar-lg" style={{ background: l.bg, width: 64, height: 64, fontSize: 18 }}>{l.initials}</div>
                      <div className="serif" style={{ fontSize: 22, color: 'var(--parchment)', marginBottom: 4 }}>{l.name}</div>
                      <div className="mono muted" style={{ fontSize: 10 }}>{l.firm}</div>
                      <div className="mono gold" style={{ fontSize: 10, marginTop: 4 }}>{l.spec}</div>
                      <div style={{ display: 'flex', gap: 12, marginTop: 10, flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <MapPin size={11} strokeWidth={1.5} color="var(--silver-counsel)" />
                          <span className="mono muted" style={{ fontSize: 10 }}>{l.location}</span>
                        </div>
                        <span className="mono muted" style={{ fontSize: 10 }}>{l.years}yrs experience</span>
                      </div>
                    </div>

                    {/* Center: Reasons */}
                    <div className="match-reasons">
                      <div className="mono uppercase" style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--gold-verdict)', marginBottom: 14 }}>
                        WHY WE MATCHED YOU
                      </div>
                      {l.reasons.map((r, ri) => (
                        <div key={ri} style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                          <CheckCircle size={13} strokeWidth={1.5} color="var(--emerald-verified)" style={{ flexShrink: 0, marginTop: 2 }} />
                          <p className="body-font" style={{ fontSize: 13, margin: 0, lineHeight: 1.6 }}>{r}</p>
                        </div>
                      ))}
                    </div>

                    {/* Right: CTA */}
                    <div className="match-cta">
                      <div className="trust-badge high" style={{ marginBottom: 16, fontSize: 14, padding: '8px 16px' }}>
                        {l.confidence}% MATCH
                      </div>
                      <button className="btn btn-gold btn-full">Contact Lawyer</button>
                      <button className="btn btn-ghost btn-full" style={{ marginTop: 8 }}>View Profile</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: 32 }}>
              <button className="btn btn-ghost" onClick={() => setStage(1)}>← Refine My Search</button>
            </div>
          </div>
        )}

        <style>{`
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}</style>
      </div>
    </AppLayout>
  )
}
