import { useRef, useState, type CSSProperties } from 'react'
import { ArrowDown, ArrowLeft, ArrowUpRight, Clock3, Heart, MapPin, Maximize2, Navigation } from 'lucide-react'
import AnimatedText from './AnimatedText'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import ChurchMap from './ChurchMap'
import YouthLightbox from './YouthLightbox'
import { useYouthMotion } from './useYouthMotion'
import { church, gatherings } from './content'
import { useTheme } from './useTheme'
import { useSmoothScroll } from './useSmoothScroll'
import { useScrollReveal } from './useScrollReveal'

const photos = [
  { src: '/images/youth-acoustic.png', width: 900, height: 1600, alt: 'Jovens cantando e tocando teclado e violão durante o louvor' },
  { src: '/images/youth-keyboard.png', width: 900, height: 1600, alt: 'Jovem tocando teclado em um momento de louvor com iluminação azul' },
  { src: '/images/youth-praise.png', width: 1011, height: 761, alt: 'Jovens cantando de mãos erguidas, com um guitarrista ao fundo' },
  { src: '/images/youth-worship.png', width: 1200, height: 1600, alt: 'Jovens reunidos em adoração durante um culto, com a banda ao fundo' },
  { src: '/images/youth-singers.png', width: 900, height: 1600, alt: 'Grupo de jovens cantando juntos no palco da igreja' },
  { src: '/images/youth-gathering.png', width: 571, height: 758, alt: 'Três jovens com microfones em um encontro da juventude, sob iluminação roxa' },
  { src: '/images/youth-band.png', width: 567, height: 753, alt: 'Banda da juventude reunida no palco durante um momento de adoração' },
  { src: '/images/youth-welcome.png', width: 1139, height: 761, alt: 'Duas jovens sorrindo na recepção da igreja, diante de uma placa de boas-vindas' },
  { src: '/images/youth-prayer.png', width: 1139, height: 760, alt: 'Jovens reunidos em oração, com a cabeça inclinada e as mãos unidas' },
  { src: '/images/youth-community.png', width: 1142, height: 755, alt: 'Jovens participando de um momento de oração entre os bancos da igreja' },
  { src: '/images/youth-message.png', width: 505, height: 744, alt: 'Mensagem compartilhada ao microfone no púlpito da igreja' },
  { src: '/images/youth-sharing.png', width: 1138, height: 755, alt: 'Jovem falando ao microfone durante um encontro, com a banda ao fundo' },
  { src: '/images/youth-worship-night.png', width: 1209, height: 750, alt: 'Momento de louvor com a banda no palco e a comunidade reunida' },
]

export default function YouthPage() {
  const { theme, toggleTheme } = useTheme()
  const youthGathering = gatherings.find((gathering) => gathering.title === 'Reunião de jovens')
  const pageRef = useRef<HTMLDivElement>(null)
  const [activePhoto, setActivePhoto] = useState<number | null>(null)
  const closePhoto = () => setActivePhoto(null)
  const stepPhoto = (direction: number) => setActivePhoto((current) => current === null ? null : (current + direction + photos.length) % photos.length)
  useSmoothScroll(activePhoto !== null)
  useYouthMotion(pageRef)
  useScrollReveal()

  return (
    <div className="site-shell youth-page" data-theme={theme} ref={pageRef}>
      <div className="youth-scroll-progress" aria-hidden="true" />
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <SiteHeader page="youth" theme={theme} onToggleTheme={toggleTheme} />

      <main id="conteudo">
        <section className="youth-hero" id="inicio" aria-labelledby="youth-title">
          <div className="youth-hero-glow" aria-hidden="true"><span /><span /><span /></div>
          <div className="container youth-hero-inner">
            <div className="youth-intro" data-reveal>
              <a className="youth-back" href="/" data-youth-step><ArrowLeft size={16} /> Voltar para a igreja</a>
              <div className="eyebrow"><span className="eyebrow-line" aria-hidden="true" /> JUVENTUDE PIB · CAMPO MOURÃO</div>
              <h1 id="youth-title" data-youth-step style={{ '--youth-delay': '100ms' } as CSSProperties}><AnimatedText text="Conheça mais a" /><br /><AnimatedText text="nossa" /> <em><AnimatedText text="juventude" /></em></h1>
              <p data-youth-step style={{ '--youth-delay': '200ms' } as CSSProperties}>Uma geração que caminha junta, compartilha a fé e encontra alegria em servir a Jesus. Aqui, há espaço para sua história.</p>
              <div className="youth-hero-actions" data-youth-step style={{ '--youth-delay': '300ms' } as CSSProperties}>
                <a className="button button-green button-large" href="#encontros">Vem com a gente <ArrowUpRight size={18} /></a>
                <a className="text-link" href="#momentos">Nossos momentos <ArrowDown size={17} /></a>
              </div>
              {youthGathering && <div className="youth-hero-note" data-youth-step style={{ '--youth-delay': '400ms' } as CSSProperties}><Clock3 size={17} /><span>{youthGathering.day === 'SÁBADO' ? 'Sábados' : youthGathering.day}, às {youthGathering.time}</span></div>}
            </div>
            <figure className="youth-cover" data-reveal>
              <div className="youth-cover-frame"><img src="/images/youth-praise.png" width="1011" height="761" alt="Jovens da PIB Campo Mourão cantando juntos de mãos erguidas" fetchPriority="high" /></div>
            </figure>
          </div>
        </section>

        <section className="youth-moments section-space" id="momentos" aria-labelledby="moments-title">
          <div className="container">
            <div className="section-heading" data-reveal>
              <div><div className="eyebrow"><span className="eyebrow-line" aria-hidden="true" /> NOSSA JUVENTUDE EM FOTOS</div><h2 id="moments-title"><AnimatedText text="Uma fé. Muitas" /><br /><em><AnimatedText text="histórias." /></em></h2></div>
              <p>Louvor, amizade e comunhão. Um pouco dos momentos que vivemos juntos.</p>
            </div>
            <div className="youth-gallery">
              {photos.map((photo, index) => <figure className="youth-photo" data-reveal key={photo.src} style={{ '--youth-delay': `${index % 3 * 60}ms` } as CSSProperties}>
                <button className="youth-photo-button" type="button" onClick={() => setActivePhoto(index)} aria-label={`Ampliar foto ${index + 1} de ${photos.length}: ${photo.alt}`}>
                  <img src={photo.src} width={photo.width} height={photo.height} alt={photo.alt} loading="lazy" decoding="async" />
                  <span className="youth-photo-open" aria-hidden="true"><Maximize2 size={20} /></span>
                </button>
              </figure>)}
            </div>
          </div>
        </section>

        <section className="youth-meetup section-space" id="encontros" aria-labelledby="meetup-title">
          <div className="container youth-meetup-grid">
            <div className="youth-meetup-copy" data-reveal>
              <div className="eyebrow"><span className="eyebrow-line" aria-hidden="true" /> VAMOS NOS ENCONTRAR</div>
              <h2 id="meetup-title"><AnimatedText text="Tem lugar para" /><br /><em><AnimatedText text="você aqui." /></em></h2>
              <p>Venha conhecer a nossa juventude, fazer novas amizades e crescer na fé com a gente.</p>
              <div className="youth-details">
                {youthGathering && <div><Clock3 size={23} strokeWidth={1.5} /><span><small>REUNIÃO DE JOVENS</small><strong>{youthGathering.day === 'SÁBADO' ? 'Sábados' : youthGathering.day}, às {youthGathering.time}</strong></span></div>}
                <div><MapPin size={23} strokeWidth={1.5} /><span><small>PIB CAMPO MOURÃO</small><strong>{church.address}</strong><span>{church.locality}</span></span></div>
              </div>
            </div>
            <div className="youth-meetup-card" data-reveal>
              <Heart size={30} strokeWidth={1.4} />
              <h3>Vamos caminhar juntos?</h3>
              <p>Não precisa conhecer ninguém nem fazer inscrição. Venha do jeito que você é. Vai ser bom ter você aqui.</p>
              <a className="button button-green button-large" href={church.maps} target="_blank" rel="noreferrer">Como chegar <Navigation size={17} /></a>
              <a className="text-link" href={church.instagram} target="_blank" rel="noreferrer">Acompanhe no Instagram <ArrowUpRight size={17} /></a>
            </div>
          </div>
          <div className="container"><ChurchMap /></div>
        </section>
      </main>
      <SiteFooter page="youth" />
      <YouthLightbox photo={activePhoto === null ? null : photos[activePhoto]} index={activePhoto ?? 0} total={photos.length} onClose={closePhoto} onStep={stepPhoto} />
    </div>
  )
}
