import React, { useState } from 'react'
import useEditorStore from '@/stores/editorStore'
import { AnimationTrack, Keyframe } from '@/types'
import { v4 as uuid } from 'uuid'

const Timeline: React.FC = () => {
  const { currentScene, currentTime, setCurrentTime, addKeyframe, deleteKeyframe } =
    useEditorStore()
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null)

  if (!currentScene) {
    return <div className="p-4">No scene loaded</div>
  }

  const handleAddKeyframe = (trackId: string) => {
    const keyframe: Keyframe = {
      time: currentTime,
      value: 0,
      easing: 'linear',
    }
    addKeyframe(trackId, keyframe)
  }

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const newTime = (x / rect.width) * currentScene.duration
    setCurrentTime(newTime)
  }

  return (
    <div className="w-full h-48 bg-gray-900 border-t border-gray-700 overflow-y-auto">
      <div className="p-4 space-y-2">
        <div className="text-sm text-gray-400 mb-2">
          Time: {currentTime.toFixed(2)}s / {currentScene.duration}s
        </div>

        <div
          className="h-32 bg-gray-800 relative cursor-pointer border border-gray-700 rounded"
          onClick={handleTimelineClick}
        >
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-red-500"
            style={{ left: `${(currentTime / currentScene.duration) * 100}%` }}
          />

          {currentScene.tracks.map((track) => (
            <div
              key={track.id}
              className={`h-6 border-b border-gray-700 hover:bg-gray-700 cursor-pointer ${
                selectedTrack === track.id ? 'bg-gray-700' : ''
              }`}
              onClick={() => setSelectedTrack(track.id)}
            >
              <div className="text-xs text-gray-400 px-2 py-1">{track.name}</div>
            </div>
          ))}
        </div>

        {selectedTrack && (
          <button
            onClick={() => handleAddKeyframe(selectedTrack)}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
          >
            Add Keyframe at {currentTime.toFixed(2)}s
          </button>
        )}
      </div>
    </div>
  )
}

export default Timeline
