import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { marketplaceAPI } from '@/services/api'
import { MarketplaceAsset } from '@/types'

const Marketplace: React.FC = () => {
  const { t } = useTranslation()
  const [assets, setAssets] = useState<MarketplaceAsset[]>([])
  const [category, setCategory] = useState('model')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadAssets()
  }, [category])

  const loadAssets = async () => {
    setIsLoading(true)
    try {
      const response = await marketplaceAPI.list()
      const filtered = response.data.filter((a) => a.category === category)
      setAssets(filtered)
    } catch {
      console.error('Failed to load marketplace assets')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await marketplaceAPI.search(searchQuery, category)
      setAssets(response.data)
    } catch {
      console.error('Search failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">{t('nav.marketplace')}</h1>

        <form onSubmit={handleSearch} className="mb-8 flex gap-4">
          <input
            type="text"
            placeholder={t('marketplace.search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-blue-500"
          />
          <button type="submit" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold">
            Search
          </button>
        </form>

        <div className="mb-6 flex gap-2">
          {['model', 'animation', 'effect', 'sound'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded font-medium transition ${
                category === cat
                  ? 'bg-blue-600'
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}s
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="text-gray-400">Loading...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {assets.map((asset) => (
              <div key={asset.id} className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition">
                <img
                  src={asset.thumbnailUrl}
                  alt={asset.name}
                  className="w-full h-32 object-cover bg-gray-900"
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-1">{asset.name}</h3>
                  <p className="text-sm text-gray-400 mb-2 line-clamp-2">{asset.description}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-yellow-400">⭐ {asset.rating.toFixed(1)}</span>
                    <span className="text-gray-400">${asset.price}</span>
                  </div>
                  <button className="w-full mt-3 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium">
                    {asset.price === 0 ? 'Download' : 'Buy'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Marketplace
