import { useEffect, useRef, useCallback } from 'react'

interface AnimationFrameOptions {
  fps?: number
  onFrame?: (deltaTime: number, currentTime: number) => void
}

export const useAnimationFrame = (options: AnimationFrameOptions = {}) => {
  const { fps = 60, onFrame } = options
  const frameRef = useRef<number>()
  const lastTimeRef = useRef<number>(0)
  const currentTimeRef = useRef<number>(0)
  const frameIntervalRef = useRef<number>(1000 / fps)

  const animate = useCallback((currentTime: number) => {
    const deltaTime = currentTime - lastTimeRef.current

    if (deltaTime >= frameIntervalRef.current) {
      currentTimeRef.current += deltaTime / 1000

      if (onFrame) {
        onFrame(deltaTime / 1000, currentTimeRef.current)
      }

      lastTimeRef.current = currentTime
    }

    frameRef.current = requestAnimationFrame(animate)
  }, [onFrame])

  useEffect(() => {
    frameRef.current = requestAnimationFrame(animate)

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [animate])

  return {
    currentTime: currentTimeRef.current,
    reset: () => {
      currentTimeRef.current = 0
      lastTimeRef.current = 0
    },
  }
}
