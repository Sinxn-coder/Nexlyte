import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import CustomCursor from './components/CustomCursor'
import ScrollToTop from './components/ScrollToTop'

function App() {
  const location = useLocation()
  const isProjectsPage = location.pathname === '/projects'

  return (
    <div className="app-shell">
      <CustomCursor />
      <ScrollToTop />
      {!isProjectsPage && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>




      <style dangerouslySetInnerHTML={{ __html: `
        .app-shell {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        main {
          flex: 1;
        }
        .py-20 { padding-top: 5rem; padding-bottom: 5rem; }
        .text-center { text-align: center; }
        .mb-4 { margin-bottom: 1rem; }
      `}} />
    </div>
  )
}

export default App
