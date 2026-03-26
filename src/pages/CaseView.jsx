import React from 'react';
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import { cases } from './Cases'
import { Shield, ChevronRight, Share2, Download, CheckCircle, Send } from 'lucide-react'
import './CaseView.css'

const mockHoldings = [
  'Non-governmental organisations and legal practitioners have locus standi to enforce fundamental rights on behalf of identifiable victims, per Chapter IV CFRN 1999.',
  'The right to personal liberty extends to freedom from arbitrary detention and imprisonment without due process, regardless of state security justifications.',
  'Courts may grant prerogative orders including mandamus and certiorari to compel government compliance with constitutional rights obligations.',
]

const mockExchanges = [
  { role: 'user', content: 'What is the significance of this case for locus standi?' },
  {
    role: 'assistant',
    content: 'This case fundamentally expanded standing in Nigerian constitutional litigation. Prior to Fawehinmi, only directly affected parties could enforce fundamental rights. The Supreme Court held that public-spirited organisations and advocates could bring actions on behalf of victims — a watershed moment for human rights litigation in Nigeria.',
    trustScore: 96
  },
]

const relatedCases = [
  { id: 3, name: 'Ransome-Kuti v. AG [1985]' },
  { id: 2, name: 'Abacha v. FRN [2006]' },
  { id: 10, name: 'EFCC v. Dariye [2011]' },
]

const lawyerRecs = [
  { initials: 'CI', name: 'Chief I. Okonkwo', spec: 'Constitutional Law', firm: 'Okonkwo & Associates', years: 22 },
  { initials: 'AO', name: 'Amina Olawale, Esq.', spec: 'Human Rights', firm: 'Liberty Legal LLP', years: 14 },
]

const tabs = ['Overview', 'Full Judgment', 'Key Holdings', 'Cited Cases']

export default function CaseView() {
  const { id } = useParams()
  const caseData = cases.find(c => c.id === parseInt(id)) || cases[0]
  const [activeTab, setActiveTab] = useState('Overview')
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState(mockExchanges)
  const [loading, setLoading] = useState(false)

  const sendChat = () => {
    if (!chatInput.trim()) return
    const userMsg = { role: 'user', content: chatInput }
    setChatMessages(prev => [...prev, userMsg])
    setChatInput('')
    setLoading(true)
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        content: `Based on the judgment in ${caseData.title}, I can provide specific analysis. The courts in this matter established principles that continue to influence Nigerian jurisprudence today. All citations have been cross-referenced and verified.`,
        trustScore: 91
      }])
      setLoading(false)
    }, 1200)
  }

  return (
    <AppLayout>
      <div className="case-view">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/cases" className="mono muted" style={{ fontSize: 11 }}>Case Library</Link>
          <ChevronRight size={12} strokeWidth={1.5} color="var(--steel-authority)" />
          <span className="mono" style={{ fontSize: 11, color: 'var(--silver-counsel)' }}>{caseData.title}</span>
        </div>

        <div className="case-view-layout">
          {/* LEFT */}
          <div className="case-left">
            {/* Header */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: 'flex', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
                <span className="pill pill-gold">{caseData.court}</span>
                <span className="trust-badge high">
                  <Shield size={10} strokeWidth={1.5} />
                  VERIFIED
                </span>
                <span className="pill pill-category">{caseData.category}</span>
              </div>
              <h1 className="serif" style={{ fontSize: 44, color: 'var(--parchment)', lineHeight: 1.15, marginBottom: 12 }}>
                {caseData.title}
              </h1>
              <div className="mono gold" style={{ fontSize: 13, letterSpacing: '0.1em' }}>
                {caseData.citation}
              </div>
            </div>

            {/* Parties */}
            <div className="card" style={{ padding: 20, marginBottom: 24 }}>
              <div className="parties-row">
                <div className="party-block">
                  <div className="mono uppercase muted" style={{ fontSize: 9, letterSpacing: '0.2em', marginBottom: 6 }}>APPELLANT</div>
                  <div className="serif" style={{ fontSize: 18, color: 'var(--parchment)' }}>{caseData.appellant}</div>
                </div>
                <div className="vs-separator">VS.</div>
                <div className="party-block">
                  <div className="mono uppercase muted" style={{ fontSize: 9, letterSpacing: '0.2em', marginBottom: 6 }}>RESPONDENT</div>
                  <div className="serif" style={{ fontSize: 18, color: 'var(--parchment)' }}>{caseData.respondent}</div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="tab-bar">
              {tabs.map(t => (
                <button key={t} className={`tab-btn ${activeTab === t ? 'active' : ''}`}
                  onClick={() => setActiveTab(t)}>
                  {t}
                </button>
              ))}
            </div>

            {activeTab === 'Overview' && (
              <div className="tab-content">
                <h3 className="mono uppercase" style={{ fontSize: 10, letterSpacing: '0.2em', color: 'var(--gold-verdict)', marginBottom: 16 }}>
                  BACKGROUND
                </h3>
                <p className="body-font" style={{ fontSize: 15, lineHeight: 1.8, marginBottom: 20 }}>
                  {caseData.summary} This case arose in the context of growing concerns about the restriction of civil liberties and the curtailment of fundamental rights under successive Nigerian administrations.
                </p>
                <p className="body-font" style={{ fontSize: 15, lineHeight: 1.8, marginBottom: 20 }}>
                  The {caseData.appellant} brought this action against the {caseData.respondent} challenging the constitutional validity of actions taken that were alleged to be in violation of Chapter IV of the Constitution of the Federal Republic of Nigeria 1999. The proceedings were contested vigorously at all levels of the court hierarchy.
                </p>
                <p className="body-font" style={{ fontSize: 15, lineHeight: 1.8, marginBottom: 32 }}>
                  The Supreme Court's decision in this matter has had far-reaching implications, not only for the specific area of law it addressed, but for the broader development of jurisprudence across West Africa and the Commonwealth.
                </p>

                <h3 className="mono uppercase" style={{ fontSize: 10, letterSpacing: '0.2em', color: 'var(--gold-verdict)', marginBottom: 16 }}>
                  KEY HOLDINGS
                </h3>
                {mockHoldings.map((h, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                    <CheckCircle size={16} strokeWidth={1.5} color="var(--emerald-verified)" style={{ flexShrink: 0, marginTop: 2 }} />
                    <p className="body-font" style={{ fontSize: 14, lineHeight: 1.7, margin: 0 }}>{h}</p>
                  </div>
                ))}

                <div style={{ marginTop: 32 }}>
                  <h3 className="mono uppercase" style={{ fontSize: 10, letterSpacing: '0.2em', color: 'var(--gold-verdict)', marginBottom: 12 }}>
                    SIGNIFICANCE
                  </h3>
                  <p className="body-font" style={{ fontSize: 15, lineHeight: 1.8 }}>
                    This judgment remains one of the most cited precedents in Nigerian constitutional law. It has been applied in over 400 subsequent cases, broadening access to justice and strengthening the constitutional order. Legal scholars consider it a cornerstone of Nigeria's human rights jurisprudence.
                  </p>
                </div>
              </div>
            )}

            {activeTab !== 'Overview' && (
              <div className="tab-content">
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <Shield size={32} strokeWidth={1} color="var(--steel-authority)" style={{ marginBottom: 16 }} />
                  <p className="mono muted" style={{ fontSize: 12, letterSpacing: '0.1em' }}>
                    {activeTab.toUpperCase()} — AVAILABLE IN FULL ACCESS PLAN
                  </p>
                  <Link to="/pricing" className="btn btn-gold btn-sm" style={{ marginTop: 16, display: 'inline-flex' }}>
                    Upgrade to Counsel
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Sticky Panel */}
          <div className="case-right">
            {/* Case AI Chat */}
            <div className="card case-chat-panel">
              <div className="mono uppercase" style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--gold-verdict)', marginBottom: 16, padding: '16px 16px 0' }}>
                ASK AI ABOUT THIS CASE
              </div>
              <div className="case-chat-messages">
                {chatMessages.map((m, i) => (
                  <div key={i} className={`case-chat-msg ${m.role}`}>
                    <p className="body-font" style={{ fontSize: 12, lineHeight: 1.6, margin: 0 }}>{m.content}</p>
                    {m.trustScore && (
                      <div className="trust-badge high" style={{ marginTop: 6, width: 'fit-content', fontSize: 9 }}>
                        <Shield size={9} strokeWidth={1.5} />
                        {m.trustScore}% VERIFIED
                      </div>
                    )}
                  </div>
                ))}
                {loading && (
                  <div className="case-chat-msg assistant">
                    <div className="mini-typing">
                      <span /><span /><span />
                    </div>
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', gap: 8, padding: '12px 16px', borderTop: '1px solid rgba(65,90,119,0.3)' }}>
                <input className="input-field" style={{ flex: 1, fontSize: 12 }}
                  placeholder="Ask about this case..."
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendChat()}
                />
                <button onClick={sendChat} className="btn btn-gold" style={{ padding: '8px 12px' }}>
                  <Send size={12} strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Related Cases */}
            <div className="card" style={{ padding: 18 }}>
              <div className="mono uppercase" style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--gold-verdict)', marginBottom: 14 }}>
                RELATED CASES
              </div>
              {relatedCases.map((c, i) => (
                <Link key={i} to={`/cases/${c.id}`} className="context-case-link" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderBottom: '1px solid rgba(65,90,119,0.2)', textDecoration: 'none' }}>
                  <ChevronRight size={12} strokeWidth={1.5} color="var(--gold-verdict)" />
                  <span className="body-font" style={{ fontSize: 13, color: 'var(--silver-counsel)' }}>{c.name}</span>
                </Link>
              ))}
            </div>

            {/* Lawyer Recs */}
            <div className="card" style={{ padding: 18 }}>
              <div className="mono uppercase" style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--gold-verdict)', marginBottom: 14 }}>
                LAWYERS IN THIS AREA
              </div>
              {lawyerRecs.map((l, i) => (
                <div key={i} className="card" style={{ padding: 14, marginBottom: 10, background: 'rgba(65,90,119,0.1)' }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div className="avatar" style={{ background: ['#2C4A6B', '#3D5A78'][i] }}>{l.initials}</div>
                    <div>
                      <div className="serif" style={{ fontSize: 13, color: 'var(--parchment)' }}>{l.name}</div>
                      <div className="mono muted" style={{ fontSize: 9 }}>{l.spec} · {l.years}yrs</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-ghost" style={{ flex: 1 }}>
                <Share2 size={12} strokeWidth={1.5} />
                Share
              </button>
              <button className="btn btn-gold-outline" style={{ flex: 1 }}>
                <Download size={12} strokeWidth={1.5} />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .mini-typing { display: flex; gap: 6px; }
        .mini-typing span { width: 5px; height: 5px; border-radius: 50%; background: var(--gold-verdict); animation: typingPulse 1.2s infinite; }
        .mini-typing span:nth-child(2) { animation-delay: 0.2s; }
        .mini-typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typingPulse { 0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); } 40% { opacity: 1; transform: scale(1); } }
      `}</style>
    </AppLayout>
  )
}
