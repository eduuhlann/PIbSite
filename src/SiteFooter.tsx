import { ArrowUpRight, Heart, Instagram } from 'lucide-react'
import { church } from './content'

type SiteFooterProps = {
  page: 'home' | 'youth'
}

export default function SiteFooter({ page }: SiteFooterProps) {
  const homePrefix = page === 'home' ? '' : '/'

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <a href={page === 'home' ? '#inicio' : '/'} className="footer-brand">
            <img src="/logo-pib.png" width="375" height="175" alt="Primeira Igreja Batista Campo Mourão" />
            <span>Um lugar para pertencer.<br />Uma fé para viver.</span>
          </a>
          <div className="footer-links">
            <span>FAÇA PARTE</span>
            <a href={`${homePrefix}#nossa-igreja`}>Nossa igreja</a>
            <a href={`${homePrefix}#programacao`}>Nossos encontros</a>
            <a href="/juventude/" aria-current={page === 'youth' ? 'page' : undefined}>Juventude</a>
            <a href={`${homePrefix}#visite`}>Planeje sua visita</a>
          </div>
          <div className="footer-contact">
            <span>ENCONTRE A GENTE</span>
            <a href={church.maps} target="_blank" rel="noreferrer">{church.address}<br />{church.locality} <ArrowUpRight size={13} aria-hidden="true" /></a>
            <a href={church.instagram} target="_blank" rel="noreferrer"><Instagram size={15} aria-hidden="true" /> {church.instagramHandle}</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Primeira Igreja Batista de Campo Mourão.</span>
          <span>Feito com fé, esperança e amor. <Heart size={12} aria-hidden="true" /></span>
          <a href="#inicio" aria-label="Voltar ao início">Voltar ao topo <ArrowUpRight size={14} aria-hidden="true" /></a>
        </div>
      </div>
    </footer>
  )
}
