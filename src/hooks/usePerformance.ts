import { useCallback } from 'react'
import useUIStore from '@/stores/uiStore'

export const usePerformanceMonitoring = () => {
  const { setPerformance } = useUIStore()

  const measurePerformance = useCallback(() => {
    if (typeof window === 'undefined') return

    const stats = {
      fps: 0,
      renderTime: 0,
      memoryUsage: 0,
      drawCalls: 0,
      triangles: 0,
    }

    // Get memory info if available
    if ((performance as any).memory) {
      stats.memoryUsage = (performance as any).memory.usedJSHeapSize / 1048576 // Convert to MB
    }

    setPerformance(stats)
  }, [setPerformance])

  return { measurePerformance }
}
