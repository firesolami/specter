import React from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import { Search, MessageSquare, ArrowRight } from 'lucide-react'
import './Cases.css'

export const cases = [
  {
    id: 1,
    title: 'Gani Fawehinmi v. Inspector General of Police',
    court: 'SUPREME COURT OF NIGERIA',
    year: 2002,
    citation: '[2002] 7 NWLR 636',
    category: 'Constitutional',
    summary: 'Landmark case establishing locus standi for public interest litigation and fundamental rights enforcement across Nigeria.',
    appellant: 'Gani Fawehinmi',
    respondent: 'Inspector General of Police',
  },
  {
    id: 2,
    title: 'Abacha v. Federal Republic of Nigeria',
    court: 'SUPREME COURT OF NIGERIA',
    year: 2006,
    citation: '[2006] 6 NWLR (Pt. 977) 368',
    category: 'Criminal',
    summary: 'Landmark anti-corruption case establishing the constitutional limits of asset forfeiture and fair hearing rights under Section 36 CFRN.',
    appellant: 'Mohammed Abacha',
    respondent: 'Federal Republic of Nigeria',
  },
  {
    id: 3,
    title: 'Ransome-Kuti v. Attorney-General of the Federation',
    court: 'SUPREME COURT OF NIGERIA',
    year: 1985,
    citation: '[1985] 2 NWLR 211',
    category: 'Constitutional',
    summary: 'Pivotal ruling affirming the right to personal liberty and the constitutional prohibition against arbitrary detention without trial.',
    appellant: 'Dr. Beko Ransome-Kuti',
    respondent: 'Attorney-General of the Federation',
  },
  {
    id: 4,
    title: 'Shell Petroleum Development Co. v. Farah',
    court: 'COURT OF APPEAL NIGERIA',
    year: 1995,
    citation: '[1995] 3 NWLR (Pt. 382) 148',
    category: 'Tort',
    summary: 'Established firm precedent on corporate liability for environmental damage in Nigeria, particularly regarding oil spills in the Niger Delta.',
    appellant: 'Shell Petroleum Development Co.',
    respondent: 'Chief Agbara Farah',
  },
  {
    id: 5,
    title: 'United Bank for Africa Plc v. Jargaba',
    court: 'SUPREME COURT OF NIGERIA',
    year: 2007,
    citation: '[2007] 11 NWLR (Pt. 1044) 99',
    category: 'Commercial',
    summary: 'Significant banking law decision addressing banker-customer relationship, duty of care in financial transactions, and negligence standards.',
    appellant: 'United Bank for Africa Plc',
    respondent: 'Emmanuel Jargaba',
  },
  {
    id: 6,
    title: 'Donoghue v Stevenson',
    court: 'HOUSE OF LORDS',
    year: 1932,
    citation: '[1932] AC 562',
    category: 'Tort',
    summary: "Foundation of modern negligence law. Lord Atkin's neighbour principle remains the cornerstone of duty of care doctrine worldwide.",
    appellant: 'May Donoghue',
    respondent: 'David Stevenson',
  },
  {
    id: 7,
    title: 'Hadley v Baxendale',
    court: 'COURT OF EXCHEQUER',
    year: 1854,
    citation: '[1854] 9 Exch 341',
    category: 'Contract',
    summary: 'Established the two-limb test for remoteness of damages in contract breach — a principle adopted in virtually all common law jurisdictions.',
    appellant: 'Hadley',
    respondent: 'Baxendale',
  },
  {
    id: 8,
    title: 'R v Brown',
    court: 'HOUSE OF LORDS',
    year: 1993,
    citation: '[1993] 2 All ER 75',
    category: 'Criminal',
    summary: 'Controversial ruling on consent as a defence to assault in criminal law. Subject of ongoing academic debate on personal autonomy.',
    appellant: 'Regina',
    respondent: 'Anthony Brown et al.',
  },
  {
    id: 9,
    title: 'Carlill v Carbolic Smoke Ball Company',
    court: 'COURT OF APPEAL',
    year: 1893,
    citation: '[1893] 1 QB 256',
    category: 'Contract',
    summary: 'Seminal case on offer and acceptance, unilateral contracts, and the legal enforceability of advertisements and public promises.',
    appellant: 'Mrs Louisa Carlill',
    respondent: 'Carbolic Smoke Ball Co.',
  },
  {
    id: 10,
    title: 'EFCC v. Dariye',
    court: 'COURT OF APPEAL NIGERIA',
    year: 2011,
    citation: '[2011] 16 NWLR (Pt. 1272) 52',
    category: 'Criminal',
    summary: 'Critical anti-corruption precedent examining the scope of EFCC investigatory powers and constitutional safeguards for suspects.',
    appellant: 'Economic & Financial Crimes Commission',
    respondent: 'Joshua Dariye',
  },
]

const categories = ['All', 'Constitutional', 'Criminal', 'Contract', 'Tort', 'Commercial', 'Family', 'Employment', 'Property']

const categoryColors = {
  Constitutional: '#C9A44C',
  Tort: '#778DA9',
  Contract: '#415A77',
  Criminal: '#C0392B',
  Commercial: '#1A7A4A',
  Family: '#9B59B6',
  Employment: '#2980B9',
  Property: '#D35400',
}

export default function Cases() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [sort, setSort] = useState('Latest')

  const filtered = cases.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.summary.toLowerCase().includes(search.toLowerCase())
    const matchCat = activeCategory === 'All' || c.category === activeCategory
    return matchSearch && matchCat
  }).sort((a, b) => sort === 'Latest' ? b.year - a.year : 0)

  return (
    <AppLayout>
      <div className="cases-page">
        {/* Header */}
        <div className="cases-header">
          <div>
            <h1 className="serif" style={{ fontSize: 32, marginBottom: 4 }}>CASE LAW LIBRARY</h1>
            <div className="mono gold" style={{ fontSize: 11, letterSpacing: '0.15em' }}>
              12,440 CASES INDEXED · NIGERIAN & INTERNATIONAL PRECEDENTS
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="cases-search-wrap">
          <Search size={16} strokeWidth={1.5} color="var(--steel-authority)" className="cases-search-icon" />
          <input
            type="text"
            className="input-field cases-search"
            placeholder="Search cases by name, topic, or citation..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="cases-filter-row">
          <div className="category-pills">
            {categories.map(cat => (
              <button key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`btn btn-sm ${activeCategory === cat ? 'btn-gold' : 'btn-ghost'}`}
                style={{ borderRadius: 20 }}>
                {cat}
              </button>
            ))}
          </div>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="input-field"
            style={{ width: 'auto', padding: '6px 10px', fontSize: 11 }}>
            <option>Latest</option>
            <option>Relevance</option>
            <option>Most Cited</option>
          </select>
        </div>

        {/* Cases Grid */}
        <div className="cases-grid">
          {filtered.map((c, i) => (
            <Link
              key={c.id}
              to={`/cases/${c.id}`}
              className="card case-card stagger-item"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="mono" style={{ fontSize: 9, color: 'var(--gold-verdict)', letterSpacing: '0.2em', marginBottom: 10 }}>
                {c.court}
              </div>
              <h3 className="serif" style={{ fontSize: 19, color: 'var(--parchment)', lineHeight: 1.3, marginBottom: 8 }}>
                {c.title}
              </h3>
              <div className="mono muted" style={{ fontSize: 10, marginBottom: 12 }}>
                {c.citation}
              </div>
              <span className="pill" style={{
                background: `${categoryColors[c.category] || '#778DA9'}20`,
                color: categoryColors[c.category] || '#778DA9',
                border: `1px solid ${categoryColors[c.category] || '#778DA9'}40`,
                marginBottom: 12,
                display: 'inline-block',
              }}>
                {c.category}
              </span>
              <p style={{ fontSize: 13, lineHeight: 1.6, margin: '8px 0 20px', color: 'var(--silver-counsel)' }}>
                {c.summary}
              </p>
              <div className="case-card-footer">
                <span className="mono gold" style={{ fontSize: 11, letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: 4 }}>
                  Read Case <ArrowRight size={10} strokeWidth={1.5} />
                </span>
                <button className="btn btn-ghost btn-sm" onClick={e => e.preventDefault()}>
                  <MessageSquare size={11} strokeWidth={1.5} />
                  Ask AI
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
