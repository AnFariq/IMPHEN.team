import { useState } from 'react'
import './App.css'
// React Router
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
// Pages
import LandingP from './components/LandingP'
import ButterflyWelcome from './components/ButterflyWelcome'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ButterflyWelcome />} />
        <Route path="/home" element={<LandingP />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
