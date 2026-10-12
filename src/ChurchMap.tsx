import { useEffect, useRef, useState } from 'react'
import type { Map as LeafletMap } from 'leaflet'
import { ArrowUpRight } from 'lucide-react'
import { church } from './content'
import 'leaflet/dist/leaflet.css'
import './church-map.css'

type MapState = 'idle' | 'loading' | 'ready' | 'fallback'
const { latitude, longitude } = church.coordinates
const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - .004},${latitude - .0028},${longitude + .004},${latitude + .0028}&layer=mapnik&marker=${latitude},${longitude}`

export default function ChurchMap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<MapState>('idle')

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    let disposed = false
    let failed = false
    let map: LeafletMap | null = null
    let visibility: IntersectionObserver | undefined
    let resize: ResizeObserver | undefined
    let timeout: ReturnType<typeof setTimeout> | undefined
    let frame = 0

    const fallback = () => {
      if (disposed || failed) return
      failed = true
      clearTimeout(timeout)
      resize?.disconnect()
      map?.remove()
      map = null
      setState('fallback')
    }

    const initialize = async () => {
      visibility?.disconnect()
      setState('loading')
      timeout = setTimeout(fallback, 12000)
      try {
        const L = await import('leaflet')
        if (disposed || failed) return
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        map = L.map(container, {
          scrollWheelZoom: false,
          zoomControl: false,
          zoomAnimation: !reducedMotion,
          fadeAnimation: !reducedMotion,
          markerZoomAnimation: !reducedMotion,
          inertia: !reducedMotion,
        }).setView([latitude, longitude], 16)
        L.control.zoom({ position: 'bottomleft', zoomInTitle: 'Aproximar', zoomOutTitle: 'Afastar' }).addTo(map)

        const popup = document.createElement('div')
        popup.className = 'church-map-popup'
        const title = document.createElement('strong')
        title.textContent = `${church.name} de ${church.city}`
        const address = document.createElement('span')
        address.textContent = church.address
        popup.append(title, address)
        const marker = L.marker([latitude, longitude], {
          title: `${church.name} de ${church.city}`,
          icon: L.divIcon({ className: 'church-map-marker', html: '<span></span>', iconSize: [36, 36], iconAnchor: [18, 18], popupAnchor: [0, -20] }),
        }).addTo(map)
        marker.getElement()?.setAttribute('aria-label', `${church.name}: ${church.address}`)
        const popupOverlay = L.popup({ maxWidth: 260, autoPan: false }).setContent(popup)
        marker.bindPopup(popupOverlay).on('popupopen', () => {
          const close = popupOverlay.getElement()?.querySelector('.leaflet-popup-close-button')
          close?.setAttribute('aria-label', 'Fechar informações da igreja')
          close?.setAttribute('title', 'Fechar informações da igreja')
        }).openPopup()

        let tilesLoaded = false
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          keepBuffer: 1,
          updateWhenIdle: true,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).on('tileload', () => {
          if (disposed || failed || tilesLoaded) return
          tilesLoaded = true
        }).on('load', () => {
          if (disposed || failed) return
          if (!tilesLoaded) { fallback(); return }
          clearTimeout(timeout)
          setState('ready')
        }).addTo(map)

        if ('ResizeObserver' in window) {
          resize = new ResizeObserver(() => map?.invalidateSize({ pan: false }))
          resize.observe(container)
        }
        frame = requestAnimationFrame(() => map?.invalidateSize({ pan: false }))
      } catch {
        fallback()
      }
    }

    if ('IntersectionObserver' in window) {
      visibility = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) void initialize()
      }, { rootMargin: '160px 0px', threshold: 0 })
      visibility.observe(container)
    } else {
      void initialize()
    }

    return () => {
      disposed = true
      visibility?.disconnect()
      resize?.disconnect()
      clearTimeout(timeout)
      cancelAnimationFrame(frame)
      map?.remove()
    }
  }, [])

  return (
    <section className="church-location" id="localizacao" aria-label="Localização da igreja">
      <div className="church-location-heading">
        <div><h3>Encontre a igreja</h3><p>{church.address} · {church.locality}</p></div>
        <a className="church-map-external" href={church.openStreetMap} target="_blank" rel="noreferrer">Abrir no OpenStreetMap <ArrowUpRight size={17} /></a>
      </div>
      <div data-map-state={state}>
        <div className="church-map-canvas" ref={containerRef} role="region" aria-label="Mapa da Primeira Igreja Batista de Campo Mourão" tabIndex={0} hidden={state === 'fallback'} />
        {state === 'fallback' && <iframe className="church-map-canvas church-map-fallback" title="Localização da igreja no OpenStreetMap" src={embedUrl} loading="lazy" />}
        {(state === 'idle' || state === 'loading') && <div className="church-map-status" role="status"><p>Carregando a localização da igreja…</p><a href={church.openStreetMap} target="_blank" rel="noreferrer">Ver no OpenStreetMap <ArrowUpRight size={16} /></a></div>}
      </div>
      <span className="church-map-note">Use os botões + e − para aproximar.</span>
    </section>
  )
}
