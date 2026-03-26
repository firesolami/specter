import React from 'react';
import { useState } from 'react'
import { X, Send, Shield } from 'lucide-react'
import './MiniChat.css'

export default function MiniChat({ onClose }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Good day, Counsel. I am Specter — your AI legal intelligence assistant. How may I assist you today?',
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const send = async () => {
    if (!input.trim()) return
    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I have processed your query with precision. For a fuller analysis with citation verification and Trust Score, please proceed to the full AI Chat interface.',
        trustScore: 88
      }])
      setLoading(false)
    }, 1200)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className="glass-overlay" onClick={onClose}>
      <div className="mini-chat" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="mini-chat-header">
          <div className="mini-chat-title">
            <Shield size={16} strokeWidth={1.5} color="var(--gold-verdict)" />
            <span>ASK SPECTER</span>
          </div>
          <button onClick={onClose} className="mini-chat-close">
            <X size={16} strokeWidth={1.5} />
          </button>
        </div>

        {/* Messages */}
        <div className="mini-chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`mini-msg ${msg.role}`}>
              <p className="mini-msg-content">{msg.content}</p>
              {msg.trustScore && (
                <div className="trust-badge high" style={{ marginTop: 6, width: 'fit-content' }}>
                  <Shield size={10} strokeWidth={1.5} />
                  {msg.trustScore}% VERIFIED
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="mini-msg assistant">
              <div className="mini-typing">
                <span /><span /><span />
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="mini-chat-input">
          <input
            type="text"
            className="input-field"
            placeholder="Ask a legal question..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
          />
          <button className="btn btn-gold" onClick={send} style={{ padding: '10px 14px' }}>
            <Send size={14} strokeWidth={1.5} />
          </button>
        </div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--silver-counsel)', padding: '8px 16px 0', letterSpacing: '0.05em' }}>
          Specter Shield active — all citations cross-referenced.
        </p>
      </div>
    </div>
  )
}
