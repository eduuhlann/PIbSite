import type { CSSProperties } from 'react'
import { ArrowUpRight, BookOpen, Church, Heart, UsersRound } from 'lucide-react'
import { gatherings } from './content'
import AnimatedText from './AnimatedText'
import './schedule-list.css'

type ScheduleListProps = {
  onVisit: () => void
}

const gatheringIcons = [Heart, UsersRound, BookOpen, Church]

export default function ScheduleList({ onVisit }: ScheduleListProps) {
  return (
    <div className="schedule-list">
      {gatherings.map((gathering, index) => {
        const Icon = gatheringIcons[index]
        return (
          <article className="schedule-list-card" data-reveal style={{ '--enter-delay': `${index * 90}ms` } as CSSProperties} key={gathering.title}>
            <div className="schedule-list-day"><AnimatedText text={gathering.day} /></div>
            <div className="schedule-list-time"><AnimatedText text={gathering.time} /></div>
            <div className="schedule-list-details">
              <h3><AnimatedText text={gathering.title} /></h3>
              <p><AnimatedText text={gathering.description} /></p>
            </div>
            <span className="schedule-list-icon-wrap" aria-hidden="true"><Icon className="schedule-list-icon" size={25} strokeWidth={1.35} /></span>
            <button
              type="button"
              className="schedule-list-link"
              onClick={onVisit}
              aria-label={`Planejar uma visita: ${gathering.title}, ${gathering.day.toLowerCase()}, ${gathering.time}`}
            >
              Quero participar <ArrowUpRight size={18} aria-hidden="true" />
            </button>
          </article>
        )
      })}
    </div>
  )
}
