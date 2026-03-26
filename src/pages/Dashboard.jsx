import React from 'react';
import { Link } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import {
  FileText, MessageSquare, BookOpen, Scale, CheckCircle,
  Clock, AlertCircle, ArrowRight, Plus, Users, Compass
} from 'lucide-react'
import './Dashboard.css'

const stats = [
  { label: 'Documents Analysed', value: '247', sub: 'this month', color: 'var(--gold-verdict)' },
  { label: 'Citations Verified', value: '1,843', sub: 'lifetime total', color: 'var(--parchment)' },
  { label: 'Trust Score Avg', value: '91%', sub: 'all responses', color: 'var(--emerald-verified)', badge: true },
  { label: 'Lawyers Matched', value: '12', sub: 'this month', color: 'var(--parchment)' },
]

const recentActivity = [
  { type: 'chat', status: 'verified', icon: MessageSquare, title: 'Constitutional rights analysis — CFRN Chapter IV provisions', time: '2 min ago' },
  { type: 'doc', status: 'flagged', icon: FileText, title: 'Employment contract review — Auto-renewal clause flagged', time: '1 hr ago' },
  { type: 'case', status: 'verified', icon: BookOpen, title: 'Gani Fawehinmi v. IGP [2002] — Locus standi research', time: '3 hr ago' },
  { type: 'match', status: 'pending', icon: Users, title: 'Lawyer match request — Commercial dispute specialist', time: 'Yesterday' },
  { type: 'chat', status: 'verified', icon: MessageSquare, title: 'EFCC investigation powers — Section 6 EFCC Act analysis', time: 'Yesterday' },
]

const suggestedCases = [
  {
    id: 1,
    title: 'Gani Fawehinmi v. Inspector General of Police',
    court: 'SUPREME COURT OF NIGERIA',
    year: '[2002] 7 NWLR 636',
    category: 'Constitutional',
    summary: 'Landmark case establishing locus standi for public interest litigation and fundamental rights enforcement in Nigeria.',
  },
  {
    id: 6,
    title: 'Donoghue v Stevenson',
    court: 'HOUSE OF LORDS',
    year: '[1932] AC 562',
    category: 'Tort',
    summary: 'Foundation of modern negligence law — established the neighbour principle and duty of care doctrine.',
  },
  {
    id: 7,
    title: 'Hadley v Baxendale',
    court: 'COURT OF EXCHEQUER',
    year: '[1854] 9 Exch 341',
    category: 'Contract',
    summary: 'Established the fundamental principle governing remoteness of damage in contract breach cases.',
  },
  {
    id: 10,
    title: 'EFCC v. Dariye',
    court: 'COURT OF APPEAL NIGERIA',
    year: '[2011] 16 NWLR 52',
    category: 'Criminal',
    summary: 'Significant anti-corruption precedent examining the constitutional limits of EFCC investigatory powers.',
  },
]

const categoryColors = {
  Constitutional: '#C9A44C',
  Tort: '#778DA9',
  Contract: '#415A77',
  Criminal: '#C0392B',
  Commercial: '#1A7A4A',
  Family: '#9B59B6',
}

const now = new Date()
const hour = now.getHours()
const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="dashboard">
        {/* Header */}
        <div className="dash-header">
          <div>
            <h1 className="serif dash-greeting">{greeting}, Counsel.</h1>
            <p className="mono muted" style={{ fontSize: 12, letterSpacing: '0.1em', marginTop: 4 }}>
              {now.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              {' · '}
              {now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          <Link to="/chat" className="btn btn-gold">
            <Plus size={14} strokeWidth={1.5} />
            New Intelligence Brief
          </Link>
        </div>

        {/* Stats Row */}
        <div className="dash-stats-grid stagger-item">
          {stats.map(({ label, value, sub, badge }, i) => (
            <div key={i} className="card card-featured dash-stat-card">
              <div className="mono muted uppercase dash-stat-label" style={{ fontSize: '10px', letterSpacing: '0.15em' }}>
                {label}
              </div>
              <div className="serif dash-stat-value">{value}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {badge ? (
                  <div className="trust-badge high">
                    <CheckCircle size={10} strokeWidth={1.5} />
                    VERIFIED
                  </div>
                ) : (
                  <span className="mono muted" style={{ fontSize: 10 }}>{sub}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Two Column Section */}
        <div className="dash-two-col">
          {/* Recent Activity */}
          <div className="card dash-activity">
            <div className="dash-section-header">
              <h3 className="mono uppercase parchment" style={{ fontSize: 11, letterSpacing: '0.15em' }}>
                Recent Activity
              </h3>
              <Link to="/chat" className="mono gold" style={{ fontSize: 10, letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: 4 }}>
                VIEW ALL <ArrowRight size={10} strokeWidth={1.5} />
              </Link>
            </div>
            <div className="divider" />
            {recentActivity.map((item, i) => (
              <div key={i} className="activity-row">
                <div className={`activity-dot ${item.status}`} />
                <div className="activity-icon">
                  <item.icon size={14} strokeWidth={1.5} color="var(--silver-counsel)" />
                </div>
                <div className="activity-content">
                  <p className="body-font" style={{ color: 'var(--parchment)', fontSize: 13, margin: 0, lineHeight: 1.5 }}>
                    {item.title}
                  </p>
                </div>
                <div className="mono muted" style={{ fontSize: 10, letterSpacing: '0.05em', flexShrink: 0 }}>
                  {item.time}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="card dash-quick-actions">
            <div className="dash-section-header">
              <h3 className="mono uppercase parchment" style={{ fontSize: 11, letterSpacing: '0.15em' }}>
                Quick Actions
              </h3>
            </div>
            <div className="divider" />
            <div className="quick-actions-grid">
              {[
                { icon: MessageSquare, label: 'New Chat', sub: 'Start AI consultation', to: '/chat', accent: true },
                { icon: FileText, label: 'Upload Document', sub: 'Analyse & review', to: '/documents', accent: false },
                { icon: Scale, label: 'Browse Cases', sub: '12,440+ precedents', to: '/cases', accent: false },
                { icon: Compass, label: 'Find a Lawyer', sub: 'AI-matched counsel', to: '/find-lawyer', accent: false },
              ].map(({ icon: Icon, label, sub, to, accent }) => (
                <Link key={to} to={to} className={`quick-action-btn ${accent ? 'accent' : ''}`}>
                  <div className="quick-action-icon">
                    <Icon size={20} strokeWidth={1.5} color={accent ? 'var(--deep-void)' : 'var(--gold-verdict)'} />
                  </div>
                  <div>
                    <div className="mono parchment" style={{ fontSize: 11, letterSpacing: '0.08em' }}>{label}</div>
                    <div className="mono muted" style={{ fontSize: 10 }}>{sub}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Suggested Cases */}
        <div className="dash-suggested">
          <div className="dash-section-header" style={{ marginBottom: 20 }}>
            <h3 className="mono uppercase parchment" style={{ fontSize: 11, letterSpacing: '0.15em' }}>
              Suggested Cases
            </h3>
            <Link to="/cases" className="mono gold" style={{ fontSize: 10, letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: 4 }}>
              ALL CASES <ArrowRight size={10} strokeWidth={1.5} />
            </Link>
          </div>
          <div className="suggested-scroll">
            {suggestedCases.map((c) => (
              <Link key={c.id} to={`/cases/${c.id}`} className="card suggested-case-card">
                <div className="mono" style={{ fontSize: 9, color: 'var(--gold-verdict)', letterSpacing: '0.15em', marginBottom: 10 }}>
                  {c.court}
                </div>
                <h4 className="serif" style={{ fontSize: 17, color: 'var(--parchment)', marginBottom: 6, lineHeight: 1.3 }}>
                  {c.title}
                </h4>
                <div className="mono muted" style={{ fontSize: 10, marginBottom: 12 }}>{c.year}</div>
                <span className="pill" style={{
                  background: `${categoryColors[c.category]}22`,
                  color: categoryColors[c.category],
                  border: `1px solid ${categoryColors[c.category]}44`,
                  marginBottom: 12
                }}>
                  {c.category}
                </span>
                <p style={{ fontSize: 12, lineHeight: 1.5, margin: '8px 0 16px' }}>{c.summary}</p>
                <div className="mono gold" style={{ fontSize: 11, letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: 4 }}>
                  Read Case <ArrowRight size={10} strokeWidth={1.5} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
