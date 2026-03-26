import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Chat from './pages/Chat'
import Documents from './pages/Documents'
import Cases from './pages/Cases'
import CaseView from './pages/CaseView'
import Lawyers from './pages/Lawyers'
import FindLawyer from './pages/FindLawyer'
import Extension from './pages/Extension'
import Pricing from './pages/Pricing'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/cases" element={<Cases />} />
        <Route path="/cases/:id" element={<CaseView />} />
        <Route path="/lawyers" element={<Lawyers />} />
        <Route path="/find-lawyer" element={<FindLawyer />} />
        <Route path="/extension" element={<Extension />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
    </BrowserRouter>
  )
}
