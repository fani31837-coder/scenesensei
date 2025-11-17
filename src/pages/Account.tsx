import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import useAuthStore from '@/stores/authStore'
import useUIStore from '@/stores/uiStore'
import Settings from '@/components/Settings'

const Account: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const { language, setLanguage } = useUIStore()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (!user) {
    navigate('/login')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">{t('nav.account')}</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded font-semibold"
          >
            {t('nav.logout')}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Profile Info */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-1">Name</label>
                <input
                  type="text"
                  value={user.name}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Email</label>
                <input
                  type="email"
                  value={user.email}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Role</label>
                <input
                  type="text"
                  value={user.role}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Subscription</label>
                <div className="px-4 py-2 bg-blue-600 rounded font-semibold text-center">
                  {user.subscription.toUpperCase()}
                </div>
              </div>
            </div>
          </div>

          {/* Settings */}
          <Settings />
        </div>
      </div>
    </div>
  )
}

export default Account
