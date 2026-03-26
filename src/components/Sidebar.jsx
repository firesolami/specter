import React from 'react';
import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, MessageSquare, FileSearch, BookOpen,
  Users, Compass, Globe, CreditCard, ChevronRight, Shield
} from 'lucide-react'
import './Sidebar.css'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: MessageSquare, label: 'AI Chat', path: '/chat' },
  { icon: FileSearch, label: 'Document Analyser', path: '/documents' },
  { icon: BookOpen, label: 'Case Library', path: '/cases' },
  { icon: Users, label: 'Lawyer Directory', path: '/lawyers' },
  { icon: Compass, label: 'Find a Lawyer', path: '/find-lawyer' },
  { icon: Globe, label: 'Chrome Extension', path: '/extension' },
  { icon: CreditCard, label: 'Pricing', path: '/pricing' },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <nav className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <Shield size={20} strokeWidth={1.5} color="var(--gold-verdict)" />
        </div>
        <div className="sidebar-logo-text">
          <span className="sidebar-wordmark">SPECTER</span>
          <span className="sidebar-platform-label">INTELLIGENCE PLATFORM</span>
        </div>
      </div>

      {/* Divider */}
      <div className="sidebar-divider" />

      {/* Nav Items */}
      <div className="sidebar-nav">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path ||
            (path === '/cases' && location.pathname.startsWith('/cases'))
          return (
            <NavLink
              key={path}
              to={path}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} strokeWidth={1.5} className="sidebar-item-icon" />
              <span className="sidebar-item-label">{label}</span>
              {isActive && <ChevronRight size={12} strokeWidth={1.5} className="sidebar-item-chevron" />}
            </NavLink>
          )
        })}
      </div>

      {/* User Info */}
      <div className="sidebar-footer">
        <div className="sidebar-divider" />
        <div className="sidebar-user">
          <div className="avatar">OA</div>
          <div className="sidebar-user-info">
            <span className="sidebar-username">O. Adeyemi</span>
            <span className="pill pill-gold" style={{ fontSize: '9px', padding: '2px 6px' }}>Pro Plan</span>
          </div>
        </div>
      </div>
    </nav>
  )
}
