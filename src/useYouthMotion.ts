import { useEffect, type RefObject } from 'react'

export function useYouthMotion(ref: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const page = ref.current
    if (!page) return
    let frame = 0
    const update = () => {
      frame = 0
      const distance = document.documentElement.scrollHeight - window.innerHeight
      const progress = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0
      page.style.setProperty('--youth-progress', String(progress))
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      page.style.removeProperty('--youth-progress')
    }
  }, [ref])
}
