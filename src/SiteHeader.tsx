import { useEffect, useState } from 'react'
import { ArrowUpRight, Instagram, Menu, Moon, Sun, X } from 'lucide-react'
import { church } from './content'

type SiteHeaderProps = {
  page: 'home' | 'youth'
  activeSection?: string
  theme: 'light' | 'dark'
  onToggleTheme: () => void
  onVisit?: () => void
}

const navigation = [
  { label: 'Início', id: 'inicio' },
  { label: 'Nossa igreja', id: 'nossa-igreja' },
  { label: 'Programação', id: 'programacao' },
  { label: 'Juventude', id: 'juventude' },
]

export default function SiteHeader({ page, activeSection, theme, onToggleTheme, onVisit }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const homePrefix = page === 'home' ? '' : '/'

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)
  const visit = () => {
    closeMenu()
    onVisit?.()
  }

  const visitLink = (className: string) => page === 'home'
    ? <button className={`button button-green ${className}`} type="button" onClick={visit}>Venha nos visitar <ArrowUpRight size={17} aria-hidden="true" /></button>
    : <a className={`button button-green ${className}`} href="#encontros" onClick={closeMenu}>Quero participar <ArrowUpRight size={17} aria-hidden="true" /></a>

  return (
    <>
      <div className="announcement">
        <div className="container announcement-inner">
          <span>Uma comunidade de fé, esperança e amor.</span>
          <a href={church.instagram} target="_blank" rel="noreferrer"><Instagram size={13} aria-hidden="true" /> {church.instagramHandle}<ArrowUpRight size={12} aria-hidden="true" /></a>
        </div>
      </div>

      <header className="header">
        <div className="container header-inner">
          <a href={page === 'home' ? '#inicio' : '/'} className="brand" aria-label="PIB Campo Mourão — início" onClick={closeMenu}>
            <img src="/logo-pib.png" width="375" height="175" alt="Primeira Igreja Batista Campo Mourão" />
          </a>
          <nav className={menuOpen ? 'navigation is-open' : 'navigation'} aria-label="Navegação principal" id="main-navigation">
            {navigation.map((item) => {
              const isYouth = item.id === 'juventude'
              const active = page === 'youth' ? isYouth : !isYouth && activeSection === item.id
              return <a key={item.id} href={isYouth ? '/juventude/' : `${homePrefix}#${item.id}`} className={active ? 'nav-link active' : 'nav-link'} aria-current={active ? (page === 'youth' ? 'page' : 'location') : undefined} onClick={closeMenu}>{item.label}</a>
            })}
            {visitLink('mobile-visit')}
          </nav>
          <button className="theme-toggle" type="button" aria-label={theme === 'light' ? 'Tema claro. Ativar modo escuro' : 'Tema escuro. Ativar modo claro'} title={theme === 'light' ? 'Mudar para modo escuro' : 'Mudar para modo claro'} onClick={onToggleTheme}>{theme === 'light' ? <Sun size={18} strokeWidth={1.7} aria-hidden="true" /> : <Moon size={18} strokeWidth={1.7} aria-hidden="true" />}<span>{theme === 'light' ? 'Claro' : 'Escuro'}</span></button>
          {visitLink('header-visit')}
          <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
        </div>
      </header>
    </>
  )
}
