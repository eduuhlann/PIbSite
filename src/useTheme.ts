import { useLayoutEffect, useState } from 'react'

type Theme = 'light' | 'dark'
const storageKey = 'pib-theme'

function savedTheme(): Theme | null {
  try {
    const saved = localStorage.getItem(storageKey)
    return saved === 'light' || saved === 'dark' ? saved : null
  } catch {
    return null
  }
}

function preferredTheme(): Theme {
  return savedTheme() ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#000000' : '#ffffff')
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(preferredTheme)

  useLayoutEffect(() => {
    applyTheme(theme)
  }, [theme])

  useLayoutEffect(() => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
    const syncSavedTheme = (event: StorageEvent) => {
      if (event.key === storageKey || event.key === null) setTheme(preferredTheme())
    }
    const syncSystemTheme = () => {
      if (savedTheme() === null) setTheme(preferredTheme())
    }
    window.addEventListener('storage', syncSavedTheme)
    systemTheme.addEventListener('change', syncSystemTheme)
    return () => {
      window.removeEventListener('storage', syncSavedTheme)
      systemTheme.removeEventListener('change', syncSystemTheme)
    }
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    // The React wrapper owns its palette even inside an embedded preview.
    applyTheme(next)
    setTheme(next)
    try { localStorage.setItem(storageKey, next) } catch { /* Switching also works without browser storage. */ }
  }

  return { theme, toggleTheme }
}
