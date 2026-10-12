import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

export function useSmoothScroll(paused: boolean) {
  const scrollRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const scroll = new Lenis({
      autoRaf: true,
      lerp: 0.11,
      smoothWheel: true,
      respectReducedMotion: true,
      // Lenis uses the responsive scroll-padding-top already defined in CSS.
      anchors: true,
      prevent: (node) => node.tagName === 'DIALOG',
      // Keep sideways trackpad gestures and Shift + wheel native.
      virtualScroll: ({ event, deltaX, deltaY }) => !event.shiftKey && Math.abs(deltaY) >= Math.abs(deltaX),
    })
    scrollRef.current = scroll
    // Cross-page links arrive before React has rendered their anchor targets.
    const initialAnchorFrame = requestAnimationFrame(() => {
      if (!window.location.hash) return
      try {
        const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)))
        if (target) scroll.scrollTo(target, { immediate: true })
      } catch { /* Ignore malformed URL fragments. */ }
    })
    return () => {
      cancelAnimationFrame(initialAnchorFrame)
      scroll.destroy()
      scrollRef.current = null
    }
  }, [])

  useEffect(() => {
    if (paused) scrollRef.current?.stop()
    else scrollRef.current?.start()
  }, [paused])
}
