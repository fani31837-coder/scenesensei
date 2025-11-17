import { useEffect } from 'react'
import useUIStore from '@/stores/uiStore'

export const usePreferredColorScheme = () => {
  const { theme, setTheme } = useUIStore()

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [setTheme])

  return theme
}
