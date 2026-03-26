import React from 'react';
import { useState } from 'react'
import AppLayout from '../components/AppLayout'
import { Upload, FileText, X, Shield, AlertTriangle, CheckCircle, Send } from 'lucide-react'
import './Documents.css'

const flaggedClauses = [
  {
    excerpt: '"...all disputes shall be resolved exclusively by arbitration, and the parties hereby waive their right to trial by jury or any other judicial proceedings..."',
    type: 'ARBITRATION WAIVER',
    typeColor: 'var(--crimson-flag)',
    explanation: 'This clause completely removes your right to take disputes to court. In Nigeria, forced arbitration clauses in consumer contracts may be unenforceable under the Consumer Protection Regulation 2020, but should be reviewed by counsel.',
    trustScore: 72,
  },
  {
    excerpt: '"...the total liability of the Service Provider shall not exceed the fees paid by the Client in the preceding three (3) calendar months..."',
    type: 'LIABILITY CAP',
    typeColor: 'var(--gold-verdict)',
    explanation: 'This severely limits compensation you can recover even if the counterparty causes significant damage. This is common but potentially unfair depending on the nature of services rendered.',
    trustScore: 81,
  },
  {
    excerpt: '"...this Agreement shall automatically renew for successive one-year periods unless either party provides ninety (90) days written notice of cancellation..."',
    type: 'AUTO-RENEWAL',
    typeColor: 'var(--gold-verdict)',
    explanation: '90-day cancellation notice is unusually long. Standard industry practice is typically 30 days. Failure to notice this clause could bind you to an unwanted one-year commitment.',
    trustScore: 88,
  },
]

const mockDocText = `SERVICE AGREEMENT

This Service Agreement ("Agreement") is entered into as of the 1st day of January, 2025, between TechCorp Limited ("Service Provider") and the undersigned Client.

1. SCOPE OF SERVICES
The Service Provider agrees to provide software development and consulting services as described in Schedule A attached hereto.

2. PAYMENT TERMS
Client shall pay Service Provider at the rate specified in Schedule B within thirty (30) days of invoice.

3. DISPUTE RESOLUTION
All disputes shall be resolved exclusively by arbitration, and the parties hereby waive their right to trial by jury or any other judicial proceedings. Arbitration shall be conducted under the rules of the Lagos Court of Arbitration.

4. LIMITATION OF LIABILITY
The total liability of the Service Provider shall not exceed the fees paid by the Client in the preceding three (3) calendar months, regardless of the nature or basis of the claim.

5. TERM AND RENEWAL
This Agreement shall automatically renew for successive one-year periods unless either party provides ninety (90) days written notice of cancellation prior to the end of the then-current term.

6. INTELLECTUAL PROPERTY
All work product created under this Agreement shall be the exclusive property of the Client upon full payment of all fees.`

export default function Documents() {
  const [uploaded, setUploaded] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [chatInput, setChatInput] = useState('')

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    setUploaded(true)
  }

  return (
    <AppLayout>
      <div className="documents-page">
        {!uploaded ? (
          /* Upload State */
          <div className="upload-container">
            <div className="upload-zone"
              onDragOver={e => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              style={{ borderColor: dragOver ? 'var(--gold-verdict)' : undefined }}>
              <Upload size={48} strokeWidth={1} color="var(--steel-authority)" style={{ marginBottom: 20 }} />
              <h2 className="serif" style={{ fontSize: 32, marginBottom: 12, color: 'var(--parchment)' }}>
                DROP YOUR DOCUMENT HERE
              </h2>
              <p className="mono muted" style={{ fontSize: 12, marginBottom: 28, letterSpacing: '0.08em' }}>
                Supported: PDF, DOCX, TXT — up to 50MB
              </p>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn btn-gold" onClick={() => setUploaded(true)}>
                  Browse Files
                </button>
                <button className="btn btn-ghost" onClick={() => setUploaded(true)}>
                  Paste text directly →
                </button>
              </div>
            </div>

            {/* Feature callouts */}
            <div className="upload-features">
              {[
                { icon: FileText, title: 'Contract Review', desc: 'Full clause-by-clause analysis with risk categorisation' },
                { icon: Shield, title: 'Terms Analysis', desc: 'Extract and verify all legal obligations and warranties' },
                { icon: AlertTriangle, title: 'Clause Risk Flagging', desc: 'AI-powered identification of dangerous, unfair or non-standard terms' },
              ].map(({ icon: Icon, title, desc }, i) => (
                <div key={i} className="card upload-feature-card">
                  <Icon size={20} strokeWidth={1.5} color="var(--gold-verdict)" style={{ marginBottom: 12 }} />
                  <div className="mono uppercase parchment" style={{ fontSize: 11, letterSpacing: '0.1em', marginBottom: 6 }}>{title}</div>
                  <p style={{ fontSize: 13, margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Analysis State */
          <div className="analysis-layout">
            {/* Left: Document Viewer */}
            <div className="doc-viewer-panel">
              <div className="doc-viewer-header">
                <div>
                  <div className="mono uppercase parchment" style={{ fontSize: 10, letterSpacing: '0.15em', marginBottom: 4 }}>DOCUMENT VIEWER</div>
                  <div className="mono gold" style={{ fontSize: 12 }}>service_agreement_2025.pdf</div>
                </div>
                <button className="btn btn-ghost btn-sm" onClick={() => setUploaded(false)}>
                  <X size={12} strokeWidth={1.5} />
                  Remove
                </button>
              </div>
              <div className="doc-legend">
                {[
                  { color: 'var(--crimson-flag)', label: 'High Risk' },
                  { color: 'var(--gold-verdict)', label: 'Moderate Risk' },
                  { color: 'var(--emerald-verified)', label: 'Verified Safe' },
                ].map(({ color, label }) => (
                  <div key={label} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <div style={{ width: 10, height: 10, borderRadius: 2, background: color, opacity: 0.7 }} />
                    <span className="mono muted" style={{ fontSize: 10 }}>{label}</span>
                  </div>
                ))}
              </div>
              <div className="doc-text-scroll">
                {mockDocText.split('\n').map((line, i) => {
                  let highlight = ''
                  if (line.includes('waive their right') || line.includes('arbitration')) highlight = 'high-risk-line'
                  if (line.includes('total liability') || line.includes('preceding three')) highlight = 'medium-risk-line'
                  if (line.includes('automatically renew') || line.includes('ninety (90) days')) highlight = 'medium-risk-line'
                  if (line.includes('exclusive property') || line.includes('full payment')) highlight = 'safe-line'
                  return (
                    <p key={i} className={`doc-line ${highlight}`} style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.8 }}>
                      {line || '\u00A0'}
                    </p>
                  )
                })}
              </div>
            </div>

            {/* Right: Analysis Results */}
            <div className="analysis-panel">
              {/* Header */}
              <div style={{ marginBottom: 24 }}>
                <div className="mono muted" style={{ fontSize: 10, marginBottom: 4, letterSpacing: '0.1em' }}>UPLOADED 2 MIN AGO</div>
                <h2 className="serif" style={{ fontSize: 28, color: 'var(--parchment)', marginBottom: 4 }}>service_agreement_2025.pdf</h2>
              </div>

              {/* Risk Score */}
              <div className="card" style={{ padding: 24, marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                  <div className="risk-circle">
                    <svg viewBox="0 0 80 80" width="80" height="80">
                      <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(65,90,119,0.3)" strokeWidth="6" />
                      <circle cx="40" cy="40" r="34" fill="none" stroke="#C9A44C" strokeWidth="6"
                        strokeDasharray="213.6" strokeDashoffset="96"
                        strokeLinecap="round" transform="rotate(-90 40 40)" />
                    </svg>
                    <div className="risk-circle-num mono gold" style={{ fontSize: 20, fontWeight: 500 }}>55</div>
                  </div>
                  <div>
                    <div className="mono uppercase" style={{ fontSize: 10, letterSpacing: '0.2em', color: 'var(--gold-verdict)', marginBottom: 8 }}>
                      OVERALL RISK SCORE
                    </div>
                    <div className="serif" style={{ fontSize: 20, color: 'var(--parchment)', marginBottom: 4 }}>
                      Moderate Risk
                    </div>
                    <p className="body-font" style={{ fontSize: 13, margin: 0 }}>
                      3 clauses require attention before signing.
                    </p>
                  </div>
                </div>
              </div>

              {/* Flagged Clauses */}
              <div className="mono uppercase parchment" style={{ fontSize: 10, letterSpacing: '0.2em', marginBottom: 16 }}>
                FLAGGED CLAUSES
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {flaggedClauses.map((clause, i) => (
                  <div key={i} className="card" style={{ padding: 18 }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
                      <AlertTriangle size={12} strokeWidth={1.5} color={clause.typeColor} />
                      <span className="pill" style={{
                        background: `${clause.typeColor}20`, color: clause.typeColor,
                        border: `1px solid ${clause.typeColor}40`
                      }}>{clause.type}</span>
                      <div className={`trust-badge ${clause.trustScore > 80 ? 'high' : 'medium'}`} style={{ marginLeft: 'auto' }}>
                        <Shield size={10} strokeWidth={1.5} />
                        {clause.trustScore}%
                      </div>
                    </div>
                    <blockquote className="mono" style={{ fontSize: 11, color: 'var(--silver-counsel)', borderLeft: `2px solid ${clause.typeColor}`, paddingLeft: 12, marginBottom: 12, lineHeight: 1.6, fontStyle: 'italic' }}>
                      {clause.excerpt}
                    </blockquote>
                    <p className="body-font" style={{ fontSize: 13, margin: 0, lineHeight: 1.6 }}>{clause.explanation}</p>
                  </div>
                ))}
              </div>

              {/* Document Chat */}
              <div className="card" style={{ padding: 18, marginTop: 20 }}>
                <div className="mono uppercase" style={{ fontSize: 10, letterSpacing: '0.15em', color: 'var(--gold-verdict)', marginBottom: 12 }}>
                  ASK ABOUT THIS DOCUMENT
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    className="input-field"
                    placeholder="Ask a question about this document..."
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    style={{ flex: 1 }}
                  />
                  <button className="btn btn-gold" style={{ padding: '10px 14px' }}>
                    <Send size={14} strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                <button className="btn btn-ghost" style={{ flex: 1 }}>Share Report</button>
                <button className="btn btn-gold-outline" style={{ flex: 1 }}>Export PDF</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
