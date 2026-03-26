import React from 'react';
import { useState, useRef, useEffect } from 'react'
import AppLayout from '../components/AppLayout'
import { Shield, Send, Paperclip, Plus, ChevronDown, ChevronUp, X, Scale, BookOpen, AlertTriangle } from 'lucide-react'
import './Chat.css'

const suggestions = [
  'Contract breach precedents Nigeria',
  'Tenant rights Lagos 2024',
  'EFCC investigation powers',
  'IP law West Africa',
]

const mockChats = [
  { id: 1, title: 'Constitutional rights analysis', time: '2 min ago' },
  { id: 2, title: 'Employment contract review', time: '1 hr ago' },
  { id: 3, title: 'EFCC investigation powers', time: '3 hr ago' },
  { id: 4, title: 'IP registration procedure Nigeria', time: 'Yesterday' },
  { id: 5, title: 'Property law and land titles', time: '2 days ago' },
]

const mockCitations = [
  { text: 'Gani Fawehinmi v. IGP [2002] 7 NWLR 636', status: 'verified' },
  { text: 'Abacha v. FRN [2006] NWLR 281', status: 'verified' },
  { text: 'Section 46 CFRN 1999 (as amended)', status: 'verified' },
]

const relatedLawyers = [
  { initials: 'CI', name: 'Chief I. Okonkwo', spec: 'Constitutional Law', years: 22 },
  { initials: 'AB', name: 'Adaobi Bello, Esq.', spec: 'Human Rights', years: 11 },
]

const relatedCases = [
  { id: 1, name: 'Fawehinmi v. IGP [2002]' },
  { id: 3, name: 'Ransome-Kuti v. AG [1985]' },
]

function ShieldAnalysis({ citations, trustScore }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="shield-analysis">
      <div className="shield-header" onClick={() => setExpanded(!expanded)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Shield size={12} strokeWidth={1.5} color="var(--gold-verdict)" />
          <span className="mono uppercase" style={{ fontSize: 10, letterSpacing: '0.2em', color: 'var(--gold-verdict)' }}>
            SPECTER SHIELD ANALYSIS
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="trust-badge high">
            <Shield size={10} strokeWidth={1.5} />
            {trustScore}% TRUST
          </div>
          <button className="shield-toggle" onClick={() => setExpanded(!expanded)}>
            {expanded ? <ChevronUp size={12} strokeWidth={1.5} /> : <ChevronDown size={12} strokeWidth={1.5} />}
          </button>
        </div>
      </div>
      {expanded && (
        <div className="shield-content">
          {citations.map((c, i) => (
            <div key={i} className="citation-row">
              <span className="mono" style={{ fontSize: 11, color: 'var(--silver-counsel)', flex: 1 }}>{c.text}</span>
              <span className={`pill pill-${c.status}`}>{c.status}</span>
            </div>
          ))}
          <button className="mono muted" style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 10, letterSpacing: '0.08em', marginTop: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
            View chain-of-thought <ChevronDown size={10} strokeWidth={1.5} />
          </button>
        </div>
      )}
    </div>
  )
}

export default function Chat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [activeChat, setActiveChat] = useState(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (text) => {
    const content = text || input.trim()
    if (!content) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content }])
    setLoading(true)

    await new Promise(r => setTimeout(r, 1500))

    setMessages(prev => [...prev, {
      role: 'assistant',
      content: `Under the Constitution of the Federal Republic of Nigeria 1999 (as amended), Chapter IV provides an expansive framework for the protection of fundamental rights. The landmark precedent in Gani Fawehinmi v. Inspector General of Police [2002] 7 NWLR 636 established that NGOs and advocacy organisations possess locus standi to enforce fundamental rights on behalf of citizens.\n\nIn Abacha v. FRN [2006] NWLR 281, the Supreme Court further clarified that the right to fair hearing under Section 36 CFRN 1999 applies to all civil and criminal proceedings, with no exceptions for high-profile or national security cases.\n\nConfidence: High. All cited cases cross-referenced against our Nigerian legal database. Citations verified at 94% accuracy.`,
      trustScore: 94,
      citations: mockCitations,
    }])
    setLoading(false)
  }

  return (
    <AppLayout>
      <div className="chat-layout">
        {/* LEFT: History Sidebar */}
        <div className="chat-history">
          <button className="btn btn-gold btn-full" style={{ marginBottom: 16 }}>
            <Plus size={14} strokeWidth={1.5} />
            NEW CHAT
          </button>
          <div className="divider" />
          {mockChats.map(chat => (
            <div key={chat.id}
              className={`chat-history-item ${activeChat === chat.id ? 'active' : ''}`}
              onClick={() => setActiveChat(chat.id)}>
              <div className="body-font" style={{ fontSize: 13, color: 'var(--parchment)', lineHeight: 1.4, marginBottom: 2 }}>
                {chat.title}
              </div>
              <div className="mono muted" style={{ fontSize: 10 }}>{chat.time}</div>
            </div>
          ))}
        </div>

        {/* CENTER: Chat Area */}
        <div className="chat-main">
          {/* Top bar */}
          <div className="chat-topbar">
            <span className="mono parchment" style={{ fontSize: 12, letterSpacing: '0.1em' }}>
              LEGAL INTELLIGENCE SESSION
            </span>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.length === 0 ? (
              <div className="chat-empty">
                <div className="chat-watermark serif">SPECTER</div>
                <p className="body-font" style={{ fontSize: 16, color: 'var(--silver-counsel)', marginBottom: 28 }}>
                  Ask anything about Nigerian or international law.
                </p>
                <div className="suggestion-chips">
                  {suggestions.map((s, i) => (
                    <button key={i} className="suggestion-chip" onClick={() => sendMessage(s)}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="messages-list">
                {messages.map((msg, i) => (
                  <div key={i} className={`message-wrap ${msg.role}`}>
                    {msg.role === 'user' ? (
                      <div className="user-bubble body-font">{msg.content}</div>
                    ) : (
                      <div className="assistant-message">
                        <div className="card assistant-bubble">
                          <p className="body-font" style={{ fontSize: 15, color: 'var(--parchment)', lineHeight: 1.7, whiteSpace: 'pre-wrap', margin: 0 }}>
                            {msg.content}
                          </p>
                        </div>
                        <ShieldAnalysis citations={msg.citations} trustScore={msg.trustScore} />
                      </div>
                    )}
                  </div>
                ))}
                {loading && (
                  <div className="message-wrap assistant">
                    <div className="assistant-message">
                      <div className="card assistant-bubble">
                        <div className="mini-typing">
                          <span /><span /><span />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input */}
          <div className="chat-input-area">
            <div className="chat-input-row">
              <button className="chat-attach-btn" title="Attach document">
                <Paperclip size={16} strokeWidth={1.5} color="var(--silver-counsel)" />
              </button>
              <textarea
                className="input-field chat-textarea"
                placeholder="Ask your legal question..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    sendMessage()
                  }
                }}
                rows={1}
                style={{ resize: 'none' }}
              />
              <button onClick={() => sendMessage()} className="btn btn-gold" style={{ padding: '10px 14px', flexShrink: 0 }}>
                <Send size={14} strokeWidth={1.5} />
              </button>
            </div>
            <p className="mono" style={{ fontSize: 10, color: 'var(--silver-counsel)', letterSpacing: '0.08em', marginTop: 8, textAlign: 'center' }}>
              Specter Shield active — all citations cross-referenced against our Nigerian legal database.
            </p>
          </div>
        </div>

        {/* RIGHT: Context Panel */}
        <div className="chat-context">
          <div className="context-section">
            <div className="mono uppercase parchment" style={{ fontSize: 10, letterSpacing: '0.2em', marginBottom: 14 }}>
              RELATED LAWYERS
            </div>
            {relatedLawyers.map((l, i) => (
              <div key={i} className="card context-card">
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div className="avatar" style={{ background: ['#2C4A6B', '#3D5A78'][i] }}>{l.initials}</div>
                  <div>
                    <div className="serif" style={{ fontSize: 14, color: 'var(--parchment)' }}>{l.name}</div>
                    <div className="mono muted" style={{ fontSize: 10 }}>{l.spec} · {l.years}yrs</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="context-section">
            <div className="mono uppercase parchment" style={{ fontSize: 10, letterSpacing: '0.2em', marginBottom: 14 }}>
              RELATED CASES
            </div>
            {relatedCases.map((c, i) => (
              <div key={i} className="context-case-link">
                <BookOpen size={12} strokeWidth={1.5} color="var(--gold-verdict)" />
                <span className="body-font" style={{ fontSize: 13 }}>{c.name}</span>
              </div>
            ))}
          </div>

          <div className="context-section">
            <div className="card context-card" style={{ background: 'rgba(192, 57, 43, 0.06)', borderColor: 'rgba(192, 57, 43, 0.2)' }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                <AlertTriangle size={12} strokeWidth={1.5} color="var(--crimson-flag)" />
                <span className="mono uppercase" style={{ fontSize: 9, color: 'var(--crimson-flag)', letterSpacing: '0.2em' }}>
                  LEGAL DISCLAIMER
                </span>
              </div>
              <p className="body-font" style={{ fontSize: 12, color: 'var(--silver-counsel)', lineHeight: 1.5, margin: 0 }}>
                Specter provides AI-assisted legal research only. This does not constitute legal advice. Always consult a qualified legal practitioner for your specific matter.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
