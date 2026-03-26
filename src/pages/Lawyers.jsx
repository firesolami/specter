import React from 'react';
import { useState } from 'react'
import AppLayout from '../components/AppLayout'
import { Search, MapPin, Star } from 'lucide-react'
import './Lawyers.css'

const lawyers = [
  { id: 1, initials: 'CI', name: 'Chief Ikechukwu Okonkwo (SAN)', nbaNo: 'NBA/1998/L/00847', firm: 'Okonkwo & Partners LP', specs: ['Constitutional', 'Criminal'], years: 26, location: 'Abuja', bg: '#2C4A6B', rating: 5 },
  { id: 2, initials: 'AB', name: 'Adaobi Bello, Esq.', nbaNo: 'NBA/2011/L/03621', firm: 'Liberty Legal LLP', specs: ['Human Rights', 'Employment'], years: 13, location: 'Lagos', bg: '#3D5A78', rating: 5 },
  { id: 3, initials: 'TJ', name: 'Tunde Jegede (SAN)', nbaNo: 'NBA/1996/L/00412', firm: 'Jegede & Associates', specs: ['Commercial', 'Corporate'], years: 28, location: 'Lagos', bg: '#1A3A5C', rating: 5 },
  { id: 4, initials: 'FO', name: 'Fatimah Olatunji, Esq.', nbaNo: 'NBA/2015/L/05819', firm: 'Olatunji Chambers', specs: ['Family', 'Property'], years: 9, location: 'Port Harcourt', bg: '#4A2C5C', rating: 4 },
  { id: 5, initials: 'EI', name: 'Emeka Ikenna, Esq.', nbaNo: 'NBA/2005/L/02214', firm: 'Pinnacle Legal Group', specs: ['Corporate', 'IP'], years: 19, location: 'Lagos', bg: '#1A4A3A', rating: 5 },
  { id: 6, initials: 'KA', name: 'Kemi Adeyemi, Esq.', nbaNo: 'NBA/2013/L/04732', firm: 'Adeyemi Law Group', specs: ['Immigration', 'Employment'], years: 11, location: 'Abuja', bg: '#3D2C1A', rating: 4 },
  { id: 7, initials: 'ON', name: 'Olumide Nurudeen (SAN)', nbaNo: 'NBA/1999/L/01044', firm: 'Nurudeen & Co.', specs: ['Commercial', 'Criminal'], years: 25, location: 'Lagos', bg: '#1A3A4A', rating: 5 },
  { id: 8, initials: 'BA', name: 'Bisi Adewale, Esq.', nbaNo: 'NBA/2018/L/07912', firm: 'Adewale Legal', specs: ['Property', 'Family'], years: 6, location: 'Kano', bg: '#2C4A2C', rating: 4 },
  { id: 9, initials: 'RC', name: 'Rotimi Coker, Esq.', nbaNo: 'NBA/2009/L/03108', firm: 'Coker & Bright', specs: ['IP', 'Commercial'], years: 15, location: 'Lagos', bg: '#4A1A2C', rating: 4 },
  { id: 10, initials: 'NK', name: 'Ngozi Ike-Kanu, Esq.', nbaNo: 'NBA/2007/L/02788', firm: 'Ike-Kanu Chambers', specs: ['Constitutional', 'Criminal'], years: 17, location: 'Abuja', bg: '#1A2C4A', rating: 5 },
  { id: 11, initials: 'SO', name: 'Seye Olutunde (SAN)', nbaNo: 'NBA/1994/L/00318', firm: 'Olutunde & Partners', specs: ['Corporate', 'Commercial'], years: 30, location: 'Port Harcourt', bg: '#3A2A1A', rating: 5 },
  { id: 12, initials: 'AT', name: 'Amaka Tochukwu, Esq.', nbaNo: 'NBA/2016/L/06124', firm: 'TAO Legal', specs: ['Family', 'Employment'], years: 8, location: 'Lagos', bg: '#1A3A2C', rating: 4 },
]

const specs = ['Criminal', 'Commercial', 'Corporate', 'Family', 'Property', 'Immigration', 'IP', 'Constitutional', 'Employment']
const locations = ['Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'International']
const experiences = ['All', '5+ years', '10+ years', '20+ years']
const specColors = { Constitutional: '#C9A44C', Criminal: '#C0392B', Commercial: '#1A7A4A', Corporate: '#2980B9', Family: '#9B59B6', Property: '#D35400', Immigration: '#16A085', IP: '#8E44AD', Employment: '#D68910', 'Human Rights': '#1A7A4A' }

function RatingDots({ rating }) {
  return (
    <div className="rating-dots">
      {[1,2,3,4,5].map(i => (
        <div key={i} className={`rating-dot ${i <= rating ? 'filled' : ''}`} />
      ))}
    </div>
  )
}

export default function Lawyers() {
  const [search, setSearch] = useState('')
  const [selectedSpecs, setSelectedSpecs] = useState([])
  const [selectedLoc, setSelectedLoc] = useState('')
  const [selectedExp, setSelectedExp] = useState('All')

  const toggleSpec = s => setSelectedSpecs(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])

  const filtered = lawyers.filter(l => {
    const matchSearch = l.name.toLowerCase().includes(search.toLowerCase()) || l.firm.toLowerCase().includes(search.toLowerCase()) || l.specs.some(s => s.toLowerCase().includes(search.toLowerCase()))
    const matchSpec = selectedSpecs.length === 0 || l.specs.some(s => selectedSpecs.includes(s))
    const matchLoc = !selectedLoc || l.location === selectedLoc
    const matchExp = selectedExp === 'All' || (selectedExp === '5+ years' && l.years >= 5) || (selectedExp === '10+ years' && l.years >= 10) || (selectedExp === '20+ years' && l.years >= 20)
    return matchSearch && matchSpec && matchLoc && matchExp
  })

  return (
    <AppLayout>
      <div className="lawyers-page">
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <h1 className="serif" style={{ fontSize: 32, marginBottom: 4 }}>COUNSEL DIRECTORY</h1>
          <p className="mono muted" style={{ fontSize: 11, letterSpacing: '0.1em' }}>Find verified legal professionals — Nigerian Bar Association certified practitioners</p>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 24 }}>
          <Search size={16} strokeWidth={1.5} color="var(--steel-authority)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          <input className="input-field" style={{ paddingLeft: 42 }} placeholder="Search by name, firm, or specialisation..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        <div className="lawyers-layout">
          {/* LEFT: Filter Sidebar */}
          <div className="lawyers-filter-panel">
            <div className="filter-section">
              <div className="mono uppercase" style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--gold-verdict)', marginBottom: 14 }}>SPECIALISATION</div>
              {specs.map(s => (
                <label key={s} className="filter-checkbox-label">
                  <input type="checkbox" checked={selectedSpecs.includes(s)} onChange={() => toggleSpec(s)} style={{ display: 'none' }} />
                  <div className={`filter-checkbox ${selectedSpecs.includes(s) ? 'checked' : ''}`} />
                  <span className="mono" style={{ fontSize: 11, color: selectedSpecs.includes(s) ? 'var(--gold-verdict)' : 'var(--silver-counsel)' }}>{s}</span>
                </label>
              ))}
            </div>
            <div className="divider" />
            <div className="filter-section">
              <div className="mono uppercase" style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--gold-verdict)', marginBottom: 14 }}>LOCATION</div>
              {['', ...locations].map(loc => (
                <label key={loc} className="filter-checkbox-label">
                  <input type="radio" name="location" checked={selectedLoc === loc} onChange={() => setSelectedLoc(loc)} style={{ display: 'none' }} />
                  <div className={`filter-checkbox ${selectedLoc === loc ? 'checked' : ''}`} />
                  <span className="mono" style={{ fontSize: 11, color: selectedLoc === loc ? 'var(--gold-verdict)' : 'var(--silver-counsel)' }}>{loc || 'All Locations'}</span>
                </label>
              ))}
            </div>
            <div className="divider" />
            <div className="filter-section">
              <div className="mono uppercase" style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--gold-verdict)', marginBottom: 14 }}>EXPERIENCE</div>
              {experiences.map(e => (
                <label key={e} className="filter-checkbox-label">
                  <input type="radio" name="exp" checked={selectedExp === e} onChange={() => setSelectedExp(e)} style={{ display: 'none' }} />
                  <div className={`filter-checkbox ${selectedExp === e ? 'checked' : ''}`} />
                  <span className="mono" style={{ fontSize: 11, color: selectedExp === e ? 'var(--gold-verdict)' : 'var(--silver-counsel)' }}>{e}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Right: Lawyers Grid */}
          <div className="lawyers-grid">
            {filtered.map((l, i) => (
              <div key={l.id} className="card card-featured lawyer-card stagger-item" style={{ animationDelay: `${i * 50}ms` }}>
                <div className="lawyer-card-top">
                  <div className="avatar avatar-lg" style={{ background: l.bg }}>{l.initials}</div>
                  <div style={{ flex: 1 }}>
                    <div className="serif" style={{ fontSize: 18, color: 'var(--parchment)', lineHeight: 1.2, marginBottom: 4 }}>{l.name}</div>
                    <div className="mono gold" style={{ fontSize: 9, letterSpacing: '0.15em' }}>{l.nbaNo}</div>
                  </div>
                </div>
                <div className="mono muted" style={{ fontSize: 10, marginBottom: 12 }}>{l.firm}</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                  {l.specs.map(s => (
                    <span key={s} className="pill" style={{ background: `${specColors[s] || '#778DA9'}20`, color: specColors[s] || '#778DA9', border: `1px solid ${specColors[s] || '#778DA9'}40` }}>
                      {s}
                    </span>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <MapPin size={11} strokeWidth={1.5} color="var(--silver-counsel)" />
                    <span className="mono muted" style={{ fontSize: 10 }}>{l.location}</span>
                  </div>
                  <span className="mono muted" style={{ fontSize: 10 }}>·</span>
                  <span className="mono muted" style={{ fontSize: 10 }}>{l.years} years exp.</span>
                  <RatingDots rating={l.rating} />
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-ghost btn-sm" style={{ flex: 1 }}>View Profile</button>
                  <button className="btn btn-gold btn-sm" style={{ flex: 1 }}>Message</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
