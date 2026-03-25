import React, { useContext } from 'react'
import { LangContext } from '../App'

function Reveal({ children, delay = 0 }) {
  const [ref, setRef] = React.useState(null)
  const [vis, setVis] = React.useState(false)
  React.useEffect(() => {
    if (!ref) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    )
    obs.observe(ref)
    return () => obs.disconnect()
  }, [ref])
  return (
    <div ref={setRef} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.85s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.85s cubic-bezier(.16,1,.3,1) ${delay}s`,
    }}>
      {children}
    </div>
  )
}

export default function Calendar({ weddingDate }) {
  const { t } = useContext(LangContext)
  const year = 2026, month = 5
  const firstDay   = new Date(year, month, 1).getDay()
  const startDay   = firstDay === 0 ? 6 : firstDay - 1
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells = []
  for (let i = 0; i < startDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  return (
    <Reveal delay={0.1}>
      {/* No border on the container */}
      <div style={{
        background: 'transparent',
        padding: 'clamp(16px,4vw,28px)',
        maxWidth: '380px', margin: '0 auto',
      }}>
        {/* Month title */}
        <p style={{
          textAlign: 'center',
          fontFamily: "'Shelley Volante','Cormorant Garamond',serif",
          fontSize: 'clamp(16px,3.5vw,22px)',
          fontWeight: 300, letterSpacing: '4px',
          color: 'var(--ink)',
          marginBottom: '24px',
          textTransform: 'lowercase',
        }}>
          {t.calendar.months[month]} {year}
        </p>

        {/* Day headers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '2px', marginBottom: '8px' }}>
          {t.calendar.days.map(d => (
            <div key={d} style={{
              textAlign: 'center', padding: '4px 0',
              fontSize: '9px', letterSpacing: '1px',
              textTransform: 'lowercase', color: 'var(--ink)', opacity: 0.35,
            }}>{d}</div>
          ))}
        </div>

        {/* Days grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '4px' }}>
          {cells.map((day, i) => {
            const isWed = day === 28
            return (
              <div key={i} style={{
                textAlign: 'center',
                padding: '6px 2px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {/* Red circle outline around wedding day */}
                {isWed && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    border: '1.5px solid #E53E3E',
                    margin: '1px',
                  }} />
                )}
                <span style={{
                  fontSize: 'clamp(11px,2.2vw,13px)',
                  fontWeight: isWed ? 500 : 300,
                  color: isWed ? '#E53E3E' : day ? 'var(--ink)' : 'transparent',
                  position: 'relative', zIndex: 1,
                  fontFamily: isWed ? "'Shelley Volante',serif" : 'inherit',
                  letterSpacing: isWed ? '0.5px' : '0',
                }}>
                  {day || ''}
                </span>
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div style={{
          marginTop: '20px', paddingTop: '16px',
          borderTop: '1px solid rgba(0,0,0,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
        }}>
          <div style={{
            width: '14px', height: '14px', borderRadius: '50%',
            border: '1.5px solid #E53E3E', flexShrink: 0,
          }} />
          <span style={{ fontSize: '10px', letterSpacing: '2.5px', color: 'var(--ink)', textTransform: 'lowercase', fontWeight: 300, opacity: 0.6 }}>
            {t.calendar.legend}
          </span>
        </div>
      </div>
    </Reveal>
  )
}