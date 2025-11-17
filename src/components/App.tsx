import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Suspense } from 'react'
import i18n from '@/i18n'
import useAuthStore from '@/stores/authStore'
import useUIStore from '@/stores/uiStore'
import Home from '@/pages/Home'
import Editor from '@/pages/Editor'
import Login from '@/pages/Login'
import Marketplace from '@/pages/Marketplace'
import Projects from '@/pages/Projects'
import NotFound from '@/pages/NotFound'
import '@/styles/global.css'

const App: React.FC = () => {
  const { isAuthenticated } = useAuthStore()
  const { theme, language } = useUIStore()

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language])

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  // Register service worker for PWA
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // Service worker registration failed - app continues to work offline with limitations
      })
    }
  }, [])

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {!isAuthenticated ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Projects />} />
              <Route path="/editor/:sceneId" element={<Editor />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="*" element={<NotFound />} />
            </>
          )}
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
