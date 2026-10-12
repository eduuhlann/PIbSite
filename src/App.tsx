import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, BookOpen, CalendarDays, Check, Clock3, Heart, Instagram, Leaf, MapPin, Menu, Moon, Navigation, Plus, Sun, UsersRound, X } from 'lucide-react'
import { church, gatherings } from './content'
import { useTheme } from './useTheme'
import { useSmoothScroll } from './useSmoothScroll'
import ScheduleList from './ScheduleList'
import AnimatedText from './AnimatedText'
import './youth.css'

type Modal = 'visit' | 'about' | null

const navigation = [
  { label: 'Início', id: 'inicio' },
  { label: 'Nossa igreja', id: 'nossa-igreja' },
  { label: 'Programação', id: 'programacao' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')
  const [modal, setModal] = useState<Modal>(null)
  const { theme, toggleTheme } = useTheme()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const isDialogOpen = modal !== null
  useSmoothScroll(isDialogOpen)

  useEffect(() => {
    if (!isDialogOpen) return
    const dialog = dialogRef.current
    const previousOverflow = document.body.style.overflow
    dialog?.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog?.close()
      document.body.style.overflow = previousOverflow
    }
  }, [isDialogOpen])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting)
      if (visible.length) setActiveSection(visible[0].target.id)
    }, { rootMargin: '-20% 0px -55% 0px', threshold: 0 })
    navigation.forEach(({ id }) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [])

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

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const openModal = (next: Modal) => {
    setMenuOpen(false)
    setModal(next)
  }

  return (
    <div className="site-shell" data-theme={theme}>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <div className="announcement">
        <div className="container announcement-inner">
          <span>Uma comunidade de fé, esperança e amor.</span>
          <a href={church.instagram} target="_blank" rel="noreferrer"><Instagram size={13} /> {church.instagramHandle}<ArrowUpRight size={12} /></a>
        </div>
      </div>

      <header className="header">
        <div className="container header-inner">
          <a href="#inicio" className="brand" aria-label="PIB Campo Mourão — início" onClick={() => setMenuOpen(false)}>
            <img src="/logo-pib.png" width="375" height="175" alt="Primeira Igreja Batista Campo Mourão" />
          </a>
          <nav className={menuOpen ? 'navigation is-open' : 'navigation'} aria-label="Navegação principal" id="main-navigation">
            {navigation.map((item) => <a key={item.id} href={`#${item.id}`} className={activeSection === item.id ? 'nav-link active' : 'nav-link'} aria-current={activeSection === item.id ? 'location' : undefined} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
            <button className="button button-green mobile-visit" onClick={() => openModal('visit')}>Venha nos visitar <ArrowUpRight size={17} /></button>
          </nav>
          <button className="theme-toggle" type="button" aria-label={theme === 'light' ? 'Tema claro. Ativar modo escuro' : 'Tema escuro. Ativar modo claro'} title={theme === 'light' ? 'Mudar para modo escuro' : 'Mudar para modo claro'} onClick={toggleTheme}>{theme === 'light' ? <Sun size={18} strokeWidth={1.7} aria-hidden="true" /> : <Moon size={18} strokeWidth={1.7} aria-hidden="true" />}<span>{theme === 'light' ? 'Claro' : 'Escuro'}</span></button>
          <button className="button button-green header-visit" onClick={() => openModal('visit')}>Venha nos visitar <ArrowUpRight size={17} /></button>
          <button className="menu-toggle" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <main id="conteudo">
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <img className="hero-image" src="/images/church-worship.jpg" alt="Comunidade da Primeira Igreja Batista de Campo Mourão reunida em louvor" fetchPriority="high" width="826" height="452" />
          <div className="hero-shade" />
          <div className="container hero-inner">
            <div className="hero-copy" data-reveal>
              <div className="eyebrow hero-eyebrow"><span className="eyebrow-line" aria-hidden="true" /> JUNTOS, EM CRISTO</div>
              <h1 id="hero-title"><AnimatedText text="Um lugar para" /><br /><em><AnimatedText text="pertencer." /></em></h1>
              <p>Uma família para caminhar com você.<br />Uma fé que transforma a vida.</p>
              <div className="hero-actions">
                <button className="button button-green button-large" onClick={() => openModal('visit')}>Planeje sua visita <ArrowUpRight size={19} /></button>
                <a className="button button-outline button-large" href="#nossa-igreja">Conheça nossa igreja <ArrowRight size={18} /></a>
              </div>
              <div className="hero-location"><MapPin size={15} /> PRIMEIRA IGREJA BATISTA · CAMPO MOURÃO, PR</div>
            </div>
            <div className="hero-bottom">
              <span>AMAR A DEUS. CUIDAR DE PESSOAS. VIVER O EVANGELHO.</span>
              <a href="#nossa-igreja">HÁ MAIS PARA CONHECER <ArrowDown size={16} /></a>
            </div>
          </div>
          <div className="hero-side-word" aria-hidden="true">FÉ. ESPERANÇA. AMOR.</div>
        </section>

        <section className="welcome-strip" aria-label="Informações para sua visita">
          <div className="container strip-inner">
            <a className="strip-item" data-reveal href="#programacao"><span className="strip-icon"><Clock3 size={23} strokeWidth={1.5} /></span><span><small>DOMINGO É DIA DE ESTAR JUNTO</small><strong>Culto de celebração às 19h</strong></span><ArrowUpRight size={19} className="strip-arrow" /></a>
            <a className="strip-item" data-reveal href={church.maps} target="_blank" rel="noreferrer"><span className="strip-icon"><MapPin size={24} strokeWidth={1.5} /></span><span><small>ESPERAMOS POR VOCÊ</small><strong>Av. Norberto Marcondes, 813</strong></span><ArrowUpRight size={19} className="strip-arrow" /></a>
            <button className="strip-item" data-reveal onClick={() => openModal('visit')}><span className="strip-icon"><Heart size={24} strokeWidth={1.5} /></span><span><small>SUA PRIMEIRA VEZ POR AQUI?</small><strong>Sinta-se em casa.</strong></span><ArrowUpRight size={19} className="strip-arrow" /></button>
          </div>
        </section>

        <section className="about-section section-space" id="nossa-igreja" aria-labelledby="about-title">
          <div className="container about-grid">
            <div className="about-visual">
              <div className="about-main-image"><img src="/images/church-worship.jpg" alt="Momento de adoração na PIB Campo Mourão" width="826" height="452" loading="lazy" /></div>
              <div className="about-small-image"><img src="/images/church-building.jpg" alt="Fachada da Primeira Igreja Batista de Campo Mourão, na Avenida Comendador Norberto Marcondes" width="680" height="510" loading="lazy" /></div>
              <div className="about-note"><Leaf size={30} strokeWidth={1.3} /><span>Raízes na Palavra.<br /><strong>Vidas em comunhão.</strong></span></div>
              <span className="about-caption">A VIDA É MELHOR QUANDO CAMINHAMOS JUNTOS.</span>
            </div>
            <div className="about-copy" data-reveal>
              <div className="eyebrow"><span className="eyebrow-line" /> BEM-VINDO À NOSSA FAMÍLIA</div>
              <h2 id="about-title"><AnimatedText text="Somos igreja." /><br /><AnimatedText text="Somos" /> <em><AnimatedText text="comunidade." /></em></h2>
              <p className="text-lead">Mais do que um lugar para ir, uma família para fazer parte.</p>
              <p>Somos a Primeira Igreja Batista de Campo Mourão. Nossa fé está em Jesus, nossas raízes estão na Bíblia e nosso coração está nas pessoas.</p>
              <p>Acreditamos em uma fé vivida no dia a dia: no cuidado com o próximo, na alegria de servir e na caminhada que construímos juntos. Seja qual for a sua história, há um lugar para você aqui.</p>
              <button className="text-link" onClick={() => openModal('about')}>Conheça o que nos move <span className="round-arrow"><ArrowUpRight size={18} /></span></button>
            </div>
          </div>
        </section>

        <section className="values-section" aria-label="Nossa essência">
          <div className="container values-inner">
            <div className="values-intro" data-reveal><span className="eyebrow">NOSSA ESSÊNCIA</span><h2><AnimatedText text="Uma fé que" /><br /><AnimatedText text="se torna" /> <em><AnimatedText text="vida." /></em></h2></div>
            <div className="value" data-reveal><BookOpen size={29} strokeWidth={1.35} /><h3>Firmes na Palavra</h3><p>A Bíblia ilumina nossos passos e nos aproxima de Deus.</p></div>
            <div className="value" data-reveal><UsersRound size={29} strokeWidth={1.35} /><h3>Juntos na caminhada</h3><p>Compartilhamos a vida, a fé e o cuidado uns com os outros.</p></div>
            <div className="value" data-reveal><Heart size={29} strokeWidth={1.35} /><h3>Amor em movimento</h3><p>Servir é a nossa resposta ao amor que recebemos de Jesus.</p></div>
          </div>
        </section>

        <section className="schedule-section section-space" id="programacao" aria-labelledby="schedule-title">
          <div className="container">
            <div className="section-heading" data-reveal><div><div className="eyebrow"><span className="eyebrow-line" /> VAMOS NOS ENCONTRAR</div><h2 id="schedule-title"><AnimatedText text="Tem lugar para você" /><br /><AnimatedText text="na nossa" /> <em><AnimatedText text="semana." /></em></h2></div><p>Cada encontro é uma oportunidade de<br className="desktop-break" /> crescer na fé e compartilhar a vida.<br className="desktop-break" /> Venha do jeito que você é.</p></div>
            <ScheduleList onVisit={() => openModal('visit')} />
            <div className="schedule-footer"><CalendarDays size={17} /><span>Uma semana cheia de oportunidades para estar perto de Deus e de pessoas.</span><a href={church.instagram} target="_blank" rel="noreferrer">Acompanhe as novidades <ArrowUpRight size={15} /></a></div>
          </div>
        </section>

        <section className="youth-section section-space" id="juventude" aria-labelledby="youth-title">
          <div className="container">
            <div className="section-heading" data-reveal>
              <div>
                <div className="eyebrow"><span className="eyebrow-line" aria-hidden="true" /> JUVENTUDE PIB</div>
                <h2 id="youth-title"><AnimatedText text="Conheça mais a" /><br /><AnimatedText text="nossa" /> <em><AnimatedText text="juventude" /></em></h2>
              </div>
              <p>Uma geração que caminha junta, compartilha a fé e encontra alegria em servir a Jesus.</p>
            </div>
            <div className="youth-gallery">
              <figure className="youth-photo" data-reveal>
                <img src="/images/youth-keyboard.png" alt="Jovem tocando teclado durante um momento de louvor na igreja" width="900" height="1600" loading="lazy" decoding="async" />
                <figcaption>Louvor e serviço</figcaption>
              </figure>
              <figure className="youth-photo" data-reveal>
                <img src="/images/youth-worship.png" alt="Jovens reunidos em adoração durante um culto, com a banda ao fundo" width="1200" height="1600" loading="lazy" decoding="async" />
                <figcaption>Fé e comunhão</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="visit-section section-space" id="visite" aria-labelledby="visit-title">
          <div className="container visit-grid"><div className="visit-copy" data-reveal><div className="eyebrow"><span className="eyebrow-line" /> A PORTA ESTÁ ABERTA</div><h2 id="visit-title"><AnimatedText text="Sua história também" /><br /><AnimatedText text="cabe" /> <em><AnimatedText text="aqui." /></em></h2><p>Não precisa ter tudo resolvido. Não precisa conhecer ninguém. Venha conhecer a nossa família e viver esse encontro com a gente.</p><a className="button button-green button-large" href={church.maps} target="_blank" rel="noreferrer">Como chegar <Navigation size={17} /></a><div className="visit-address"><MapPin size={18} /><span>{church.address}<br /><small>{church.locality}</small></span></div></div><div className="visit-questions" data-reveal><div className="faq-title">Vem pela primeira vez? <Heart size={18} /></div><details open><summary>Preciso avisar que estou indo? <Plus size={18} /></summary><p>Você pode vir diretamente a um dos nossos encontros. Confira a programação acima e escolha o melhor dia para conhecer a igreja.</p></details><details><summary>O que vou encontrar no culto? <Plus size={18} /></summary><p>Um momento para adorar a Deus, ouvir a Palavra e estar em comunidade. Nosso culto de celebração acontece aos domingos, às 19h.</p></details><details><summary>Como posso conhecer melhor a igreja? <Plus size={18} /></summary><p>Acompanhe nosso Instagram <a href={church.instagram} target="_blank" rel="noreferrer">{church.instagramHandle}</a> ou converse com a gente durante sua visita. Será uma alegria conhecer você.</p></details></div></div>
        </section>

        <section className="instagram-banner"><div className="container instagram-inner"><span className="instagram-icon"><Instagram size={29} strokeWidth={1.4} /></span><div data-reveal><h2><AnimatedText text="A nossa conexão continua por lá." /></h2><p>Um pouco da nossa vida em comunidade, todos os dias.</p></div><a data-reveal href={church.instagram} target="_blank" rel="noreferrer">{church.instagramHandle} <ArrowUpRight size={22} /></a></div></section>
      </main>

      <footer className="footer"><div className="container"><div className="footer-top"><a href="#inicio" className="footer-brand"><img src="/logo-pib.png" width="375" height="175" alt="Primeira Igreja Batista Campo Mourão" /><span>Um lugar para pertencer.<br />Uma fé para viver.</span></a><div className="footer-links"><span>FAÇA PARTE</span><a href="#nossa-igreja">Nossa igreja</a><a href="#programacao">Nossos encontros</a><a href="#visite">Planeje sua visita</a></div><div className="footer-contact"><span>ENCONTRE A GENTE</span><a href={church.maps} target="_blank" rel="noreferrer">{church.address}<br />{church.locality} <ArrowUpRight size={13} /></a><a href={church.instagram} target="_blank" rel="noreferrer"><Instagram size={15} /> {church.instagramHandle}</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Primeira Igreja Batista de Campo Mourão.</span><span>Feito com fé, esperança e amor. <Heart size={12} /></span><a href="#inicio" aria-label="Voltar ao início">Voltar ao topo <ArrowUpRight size={14} /></a></div></div></footer>

      {modal && <dialog ref={dialogRef} className="dialog" onCancel={() => setModal(null)} onClose={() => setModal(null)} onClick={(event) => { if (event.target === event.currentTarget) { const box = event.currentTarget.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) setModal(null) } }} aria-labelledby="dialog-title">
        <button className="dialog-close" aria-label="Fechar janela" onClick={() => setModal(null)}><X size={21} /></button>
        {modal === 'visit' ? <>
          <div className="dialog-symbol"><Heart size={27} strokeWidth={1.5} /></div>
          <div className="eyebrow">VAI SER BOM TER VOCÊ AQUI</div>
          <h2 id="dialog-title">Vamos nos <em>encontrar?</em></h2>
          <p>Escolha um encontro e venha conhecer a nossa família. Você não precisa fazer inscrição.</p>
          <div className="dialog-schedule">{gatherings.map((item) => <div key={item.title}><span><strong>{item.title}</strong><small>{item.day.toLowerCase()}</small></span><b>{item.time}</b></div>)}</div>
          <div className="dialog-address"><MapPin size={19} /><span>{church.address}<br /><small>{church.locality}</small></span></div>
          <a className="button button-green" href={church.maps} target="_blank" rel="noreferrer">Abrir rota no Google Maps <Navigation size={16} /></a>
          <a className="dialog-instagram" href={church.instagram} target="_blank" rel="noreferrer"><Instagram size={16} /> Acompanhe {church.instagramHandle} <ArrowUpRight size={14} /></a>
        </> : <>
          <div className="dialog-symbol"><Leaf size={27} strokeWidth={1.5} /></div>
          <div className="eyebrow">O QUE NOS MOVE</div>
          <h2 id="dialog-title">Jesus no centro.<br /><em>Pessoas no coração.</em></h2>
          <p>Somos uma comunidade cristã batista em Campo Mourão. Desejamos conhecer Jesus, viver seus ensinamentos e compartilhar seu amor.</p>
          <div className="belief-list">
            <div><Check size={19} /><span><strong>A Bíblia como fundamento</strong><p>Buscamos na Palavra de Deus direção para nossa fé e nossa vida.</p></span></div>
            <div><Check size={19} /><span><strong>A vida em comunidade</strong><p>Crescemos juntos, compartilhando a oração, o aprendizado e o cuidado.</p></span></div>
            <div><Check size={19} /><span><strong>O amor ao próximo</strong><p>Uma fé que se expressa no serviço, no acolhimento e na generosidade.</p></span></div>
          </div>
          <button className="button button-green" onClick={() => setModal('visit')}>Quero conhecer vocês <ArrowUpRight size={17} /></button>
        </>}</dialog>}
    </div>
  )
}

export default App
