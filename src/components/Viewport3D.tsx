import React, { useRef, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import useEditorStore from '@/stores/editorStore'

const Viewport3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      setIsLoading(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initialize viewport')
      setIsLoading(false)
    }
  }, [])

  if (error) {
    return (
      <div ref={containerRef} className="w-full flex-1 bg-gray-900 flex items-center justify-center">
        <div className="text-red-400 text-center">
          <p className="font-bold">Viewport Error</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="w-full flex-1 bg-gray-900 relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
          <div className="text-gray-300">Initializing 3D viewport...</div>
        </div>
      )}
      <Canvas 
        gl={{ antialias: true, alpha: true }}
        onCreated={() => setIsLoading(false)}
      >
        <PerspectiveCamera makeDefault position={[0, 10, 20]} fov={75} />
        <OrbitControls makeDefault />
        
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.4} />
        
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="#ff9500" metalness={0.3} roughness={0.4} />
        </mesh>

        <gridHelper args={[50, 50]} />
        <axesHelper args={[10]} />
      </Canvas>
    </div>
  )
}

export default Viewport3D
