import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { ThemeProvider } from './lib/ui-core'
import { ReactHeader, ReactFooter } from './components'
import { headerContent, footerContent } from './content';
import { siteConfig } from './content/site.config';
import HomePage from './pages/HomePage'
import ExamplesPage from './pages/ExamplesPage'
import LegalPage from './pages/LegalPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import CookiesPage from './pages/CookiesPage'
import FormsDemo from './pages/FormsDemo'

function App() {
  // Theme persistence script equivalent to Next.js
  useEffect(() => {
    const stored = localStorage.getItem('ui-theme')
    if (stored) {
      document.documentElement.classList.remove('light', 'dark')
      document.documentElement.classList.add(stored)
    } else {
      const media = window.matchMedia('(prefers-color-scheme: dark)')
      document.documentElement.classList.remove('light', 'dark')
      document.documentElement.classList.add(media.matches ? 'dark' : 'light')
    }
  }, [])

  return (
    <Router>
      <ThemeProvider 
        defaultTheme="dark" 
        storageKey="ui-theme"
      >
        <div className="min-h-screen flex flex-col">
          <ReactHeader
            content={headerContent}
            LinkComponent={Link}
          />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/examples" element={<ExamplesPage />} />
              <Route path="/forms-demo" element={<FormsDemo />} />
              <Route path="/legal" element={<LegalPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/cookies" element={<CookiesPage />} />
            </Routes>
          </main>
          <ReactFooter
            variant={siteConfig.variants.footer}
            legalPreset={siteConfig.presets.legal}
            sections={footerContent}
            LinkComponent={Link}
          />
        </div>
      </ThemeProvider>
    </Router>
  )
}

export default App
