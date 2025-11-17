import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import useAuthStore from '@/stores/authStore'
import useUIStore from '@/stores/uiStore'

const Settings: React.FC = () => {
  const { t } = useTranslation()
  const { user } = useAuthStore()
  const { accessibility, setAccessibility, theme, setTheme, language, setLanguage } =
    useUIStore()

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-gray-800 rounded-lg text-white">
      <h2 className="text-2xl font-bold mb-6">{t('nav.settings')}</h2>

      <div className="space-y-6">
        {/* Theme */}
        <div>
          <label className="block text-sm font-medium mb-2">Theme</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        {/* Language */}
        <div>
          <label className="block text-sm font-medium mb-2">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </select>
        </div>

        {/* Accessibility */}
        <div className="space-y-3">
          <h3 className="font-semibold">Accessibility</h3>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={accessibility.highContrast}
              onChange={(e) => setAccessibility({ highContrast: e.target.checked })}
              className="w-4 h-4"
            />
            <span>High Contrast</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={accessibility.reducedMotion}
              onChange={(e) => setAccessibility({ reducedMotion: e.target.checked })}
              className="w-4 h-4"
            />
            <span>Reduce Motion</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={accessibility.screenReaderEnabled}
              onChange={(e) => setAccessibility({ screenReaderEnabled: e.target.checked })}
              className="w-4 h-4"
            />
            <span>Screen Reader</span>
          </label>

          <div>
            <label className="block text-sm font-medium mb-2">Font Size</label>
            <select
              value={accessibility.fontSize}
              onChange={(e) =>
                setAccessibility({ fontSize: e.target.value as any })
              }
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
            >
              <option value="small">Small</option>
              <option value="normal">Normal</option>
              <option value="large">Large</option>
              <option value="xlarge">Extra Large</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
