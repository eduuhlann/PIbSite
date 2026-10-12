import { useEffect } from 'react'

export function useScrollReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const shell = document.querySelector('.site-shell')
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]')
    if (!shell || elements.length === 0) return

    shell.classList.add('has-scroll-reveal')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-revealed')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' })
    elements.forEach((element) => observer.observe(element))

    return () => {
      observer.disconnect()
      shell.classList.remove('has-scroll-reveal')
    }
  }, [])
}
