import { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

type YouthPhoto = { src: string; alt: string; width: number; height: number }
type YouthLightboxProps = {
  photo: YouthPhoto | null
  index: number
  total: number
  onClose: () => void
  onStep: (direction: number) => void
}

export default function YouthLightbox({ photo, index, total, onClose, onStep }: YouthLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const isOpen = photo !== null

  useEffect(() => {
    if (!isOpen) return
    const dialog = dialogRef.current
    const previousOverflow = document.body.style.overflow
    dialog?.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog?.close()
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  return (
    <dialog
      ref={dialogRef}
      className="youth-lightbox"
      aria-label="Fotos da juventude"
      onCancel={(event) => { event.preventDefault(); onClose() }}
      onClose={onClose}
      onClick={(event) => { if (event.target === event.currentTarget) onClose() }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault()
          onStep(event.key === 'ArrowRight' ? 1 : -1)
        }
      }}
    >
      {photo && <div className="youth-lightbox-shell">
        <div className="youth-lightbox-toolbar">
          <span className="youth-lightbox-count" aria-live="polite" aria-atomic="true">{index + 1} / {total}</span>
          <button className="youth-lightbox-close" type="button" onClick={onClose} aria-label="Fechar foto ampliada" autoFocus><X size={23} /></button>
        </div>
        <div className="youth-lightbox-stage">
          <button className="youth-lightbox-nav youth-lightbox-prev" type="button" onClick={() => onStep(-1)} aria-label="Foto anterior"><ChevronLeft size={28} /></button>
          <img className="youth-lightbox-image" key={photo.src} src={photo.src} width={photo.width} height={photo.height} alt={photo.alt} decoding="async" />
          <button className="youth-lightbox-nav youth-lightbox-next" type="button" onClick={() => onStep(1)} aria-label="Próxima foto"><ChevronRight size={28} /></button>
        </div>
        <p className="youth-lightbox-hint">Use as setas para explorar os nossos momentos.</p>
      </div>}
    </dialog>
  )
}
