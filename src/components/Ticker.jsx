import React from 'react';
export default function Ticker() {
  const items = [
    '4,847 DOCUMENTS ANALYSED',
    '12,391 CITATIONS VERIFIED',
    '239 LAWYERS MATCHED',
    'NIGERIAN LEGAL DATABASE v2.1 ACTIVE',
    'SUPREME COURT JUDGMENTS UPDATED',
    '99.2% CITATION ACCURACY',
    'REAL-TIME HALLUCINATION DETECTION ACTIVE',
  ]

  const doubled = [...items, ...items]

  return (
    <div className="ticker-wrap">
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span key={i} className="ticker-item">
            <span style={{ color: 'var(--gold-verdict)', opacity: 0.5 }}>◆</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
