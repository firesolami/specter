import React from 'react';
import Sidebar from './Sidebar'
import Ticker from './Ticker'
import FAB from './FAB'

export default function AppLayout({ children }) {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="content-area">
        <Ticker />
        <div className="content-inner page-enter">
          {children}
        </div>
      </div>
      <FAB />
    </div>
  )
}
