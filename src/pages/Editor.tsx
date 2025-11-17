import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useEditorStore from '@/stores/editorStore'
import Viewport3D from '@/components/Viewport3D'
import Timeline from '@/components/Timeline'

const Editor: React.FC = () => {
  const { sceneId } = useParams<{ sceneId: string }>()
  const {
    currentScene,
    createScene,
    selectedObjectIds,
    selectObjects,
    isPlaying,
    togglePlayback,
    currentTime,
    setCurrentTime,
  } = useEditorStore()

  useEffect(() => {
    if (!currentScene && sceneId) {
      createScene(`Scene-${sceneId}`)
    }
  }, [sceneId, currentScene, createScene])

  if (!currentScene) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-900">
        <div className="text-center text-gray-300">
          <div className="mb-4 text-lg">Loading scene...</div>
          <div className="animate-spin">⚙️</div>
        </div>
      </div>
    )
  }

  const handlePlayPause = () => {
    togglePlayback()
    // Animation loop would be handled here
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">{currentScene.name}</h1>
        <div className="flex gap-2">
          <button
            onClick={handlePlayPause}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold"
          >
            {isPlaying ? '⏸ Pause' : '▶ Play'}
          </button>
          <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded">Export</button>
        </div>
      </div>

      {/* Main editor area */}
      <div className="flex flex-1 gap-0 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 overflow-y-auto">
          <div className="p-4 space-y-4">
            <h3 className="font-semibold text-sm text-gray-400">Objects</h3>
            <button className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm">
              Add Object
            </button>

            <div className="space-y-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className={`p-2 rounded text-sm cursor-pointer ${
                    selectedObjectIds.includes(`obj-${i}`)
                      ? 'bg-blue-600'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                  onClick={() => selectObjects([`obj-${i}`])}
                >
                  Object {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Viewport */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Viewport3D />
          <Timeline />
        </div>

        {/* Properties panel */}
        <div className="w-80 bg-gray-800 border-l border-gray-700 overflow-y-auto p-4">
          <h3 className="font-semibold text-sm text-gray-400 mb-4">Properties</h3>
          {selectedObjectIds.length > 0 ? (
            <div className="space-y-4 text-sm">
              <div>
                <label className="block text-gray-400 mb-1">Position X</label>
                <input type="number" className="w-full px-2 py-1 bg-gray-700 rounded text-white" />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Position Y</label>
                <input type="number" className="w-full px-2 py-1 bg-gray-700 rounded text-white" />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Position Z</label>
                <input type="number" className="w-full px-2 py-1 bg-gray-700 rounded text-white" />
              </div>
            </div>
          ) : (
            <div className="text-gray-500 text-sm">Select an object to edit properties</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Editor
