import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import useAuthStore from '@/stores/authStore'

const Home: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleDemoLogin = async () => {
    setIsLoading(true)
    try {
      await login('demo@scenesensei.com', 'demo')
      navigate('/projects')
    } catch {
      console.error('Demo login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">{t('app.name')}</h1>
          <p className="text-xl text-gray-300">{t('app.tagline')}</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 space-y-4">
          <button
            onClick={handleDemoLogin}
            disabled={isLoading}
            className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold rounded-lg transition"
          >
            {isLoading ? 'Loading...' : 'Try Demo'}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-800 text-gray-400">Or</span>
            </div>
          </div>

          <a
            href="/login"
            className="w-full px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition text-center"
          >
            Sign In
          </a>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-400">3D</div>
            <div className="text-sm text-gray-400">Animation</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-400">Real-time</div>
            <div className="text-sm text-gray-400">Preview</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-400">Collab</div>
            <div className="text-sm text-gray-400">Support</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
