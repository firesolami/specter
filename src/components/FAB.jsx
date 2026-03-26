import React from 'react';
import { MessageSquare } from 'lucide-react'
import { useState } from 'react'
import MiniChat from './MiniChat'

export default function FAB() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button className="fab" onClick={() => setOpen(true)} style={{ gap: 0 }}>
        <MessageSquare size={20} strokeWidth={1.5} color="var(--deep-void)" />
        <span className="fab-label">Ask Specter</span>
      </button>
      {open && <MiniChat onClose={() => setOpen(false)} />}
    </>
  )
}
