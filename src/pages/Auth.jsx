import React from 'react';
import { useState } from 'react'
import { Shield, CheckCircle, RefreshCw, Mail } from 'lucide-react'
import './Auth.css'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
    }, 1000)
  }

  return (
    <div className="auth-layout">
      {/* Left Panel */}
      <div className="auth-left">
        <div className="auth-left-content">
          <div className="auth-quote-container">
            <div className="auth-quote-icon">
              <div className="auth-scales-svg">
                <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" width="140" height="140">
                  <line x1="100" y1="20" x2="100" y2="170" stroke="#415A77" strokeWidth="2" />
                  <line x1="40" y1="40" x2="160" y2="40" stroke="#415A77" strokeWidth="2" />
                  <circle cx="100" cy="20" r="4" fill="#C9A44C" />
                  {/* Left scale */}
                  <line x1="40" y1="40" x2="30" y2="80" stroke="#415A77" strokeWidth="1.5" />
                  <line x1="40" y1="40" x2="50" y2="80" stroke="#415A77" strokeWidth="1.5" />
                  <path d="M24 80 Q30 95 36 80" stroke="#C9A44C" strokeWidth="1.5" fill="none" opacity="0.6"/>
                  <line x1="24" y1="80" x2="36" y2="80" stroke="#415A77" strokeWidth="1" />
                  {/* Right scale */}
                  <line x1="160" y1="40" x2="150" y2="90" stroke="#415A77" strokeWidth="1.5" />
                  <line x1="160" y1="40" x2="170" y2="90" stroke="#415A77" strokeWidth="1.5" />
                  <path d="M144 90 Q150 105 156 90" stroke="#C9A44C" strokeWidth="1.5" fill="none" opacity="0.6"/>
                  <line x1="144" y1="90" x2="156" y2="90" stroke="#415A77" strokeWidth="1" />
                  {/* Base */}
                  <line x1="80" y1="170" x2="120" y2="170" stroke="#415A77" strokeWidth="2" />
                  {/* Decorative dots */}
                  <circle cx="40" cy="40" r="3" fill="#415A77" />
                  <circle cx="160" cy="40" r="3" fill="#415A77" />
                </svg>
              </div>
            </div>
            <blockquote className="auth-quote serif">
              "Justice without force is powerless."
            </blockquote>
            <p className="auth-attribution mono gold">— BLAISE PASCAL</p>
          </div>
          <div className="auth-left-decoration">
            <div className="auth-deco-line" />
            <span className="mono muted" style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
              Specter Intelligence Platform
            </span>
            <div className="auth-deco-line" />
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="auth-right">
        <div className="auth-form-wrap">
          {/* Logo */}
          <div className="auth-logo">
            <Shield size={18} strokeWidth={1.5} color="var(--gold-verdict)" />
            <span className="serif mono uppercase" style={{ fontSize: 14, letterSpacing: '0.3em', color: 'var(--parchment)' }}>
              SPECTER
            </span>
          </div>

          {!sent ? (
            <>
              <h1 className="auth-heading serif">Enter the Chamber</h1>
              <p className="auth-sub body-font">
                We'll send a secure access link to your email. No passwords. No friction. Just counsel.
              </p>

              <form onSubmit={handleSubmit} className="auth-form">
                <div className="auth-input-group">
                  <Mail size={15} strokeWidth={1.5} color="var(--steel-authority)" className="auth-input-icon" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="input-field auth-email-input"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-gold btn-full btn-lg"
                  disabled={loading}
                  style={{ position: 'relative' }}
                >
                  {loading ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <RefreshCw size={14} strokeWidth={1.5} style={{ animation: 'spin 1s linear infinite' }} />
                      Dispatching...
                    </span>
                  ) : 'Send Access Link →'}
                </button>
              </form>
              <p className="auth-terms mono">
                By continuing you agree to Specter's{' '}
                <span style={{ color: 'var(--gold-verdict)', cursor: 'pointer' }}>Terms of Service</span>{' '}
                and{' '}
                <span style={{ color: 'var(--gold-verdict)', cursor: 'pointer' }}>Privacy Policy</span>.
              </p>
            </>
          ) : (
            <div className="auth-success">
              <div className="auth-success-icon">
                <CheckCircle size={40} strokeWidth={1.5} color="var(--gold-verdict)" />
              </div>
              <h2 className="serif" style={{ fontSize: 32, marginBottom: 12, color: 'var(--parchment)' }}>
                Access link dispatched.
              </h2>
              <p className="body-font" style={{ color: 'var(--silver-counsel)', fontSize: 16, marginBottom: 24 }}>
                Check your inbox. The link expires in 15 minutes and contains your secure passkey.
              </p>
              <p className="mono muted" style={{ fontSize: 11, marginBottom: 20 }}>
                Sent to: <span style={{ color: 'var(--gold-verdict)' }}>{email}</span>
              </p>
              <button onClick={() => setSent(false)} className="btn btn-gold-outline btn-sm">
                <RefreshCw size={12} strokeWidth={1.5} />
                Resend link
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
