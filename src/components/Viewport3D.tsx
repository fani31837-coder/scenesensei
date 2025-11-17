import React, { useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import useEditorStore from '@/stores/editorStore'

const Viewport3D: React.FC = () => {
  const { objects, currentTime } = useEditorStore()
  const sceneRef = useRef<THREE.Scene>(null)

  return (
    <div className="w-full h-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 10, 20]} />
        <OrbitControls />
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="orange" />
        </mesh>

        <gridHelper args={[100, 100]} />
      </Canvas>
    </div>
  )
}

export default Viewport3D
