import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Suspense } from 'react'
import i18n from '@/i18n'
import useAuthStore from '@/stores/authStore'
import useUIStore from '@/stores/uiStore'
import ErrorBoundary from '@/components/ErrorBoundary'
import Home from '@/pages/Home'
import Editor from '@/pages/Editor'
import Login from '@/pages/Login'
import Marketplace from '@/pages/Marketplace'
import Projects from '@/pages/Projects'
import NotFound from '@/pages/NotFound'
import '@/styles/global.css'

const LoadingFallback = () => (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin text-2xl mb-4">⚙️</div>
      <p className="text-gray-300">Loading...</p>
    </div>
  </div>
)

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
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<LoadingFallback />}>
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
    </ErrorBoundary>
  )
}

export default App
