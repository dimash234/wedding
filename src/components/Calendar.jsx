import React, { useContext } from 'react'
import { LangContext } from '../context/LangContext'

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

// Heart with number inside — SVG viewBox sized to fit digit
function HeartWithNumber({ number, size = 36 }) {
  return (
    <svg
      viewBox="0 0 40 38"
      style={{ width: size, height: size * 0.95, display: 'block' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Heart outline */}
      <path
        d="M20,34 C20,34 3,22 3,11 C3,5.5 7.2,2 12,2 C15.2,2 18,3.8 20,6.2 C22,3.8 24.8,2 28,2 C32.8,2 37,5.5 37,11 C37,22 20,34 20,34Z"
        fill="none"
        stroke="#E53E3E"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Number inside */}
      <text
        x="20"
        y="22"
        textAnchor="middle"
        style={{
          fontSize: '13px',
          fill: '#E53E3E',
          fontFamily: "'Jost', sans-serif",
          fontWeight: 400,
        }}
      >
        {number}
      </text>
    </svg>
  )
}

// Small heart for legend
function HeartSmall({ size = 14 }) {
  return (
    <svg viewBox="0 0 32 30" style={{ width: size, height: size * 0.94, display: 'block' }}>
      <path
        d="M16,27 C16,27 2,18 2,9 C2,4.5 5.5,1 10,1 C12.5,1 14.7,2.2 16,4 C17.3,2.2 19.5,1 22,1 C26.5,1 30,4.5 30,9 C30,18 16,27 16,27Z"
        fill="none" stroke="#E53E3E" strokeWidth="1.5" strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Calendar({ weddingDate }) {
  const { t } = useContext(LangContext)
  const year = 2026, month = 5
  const firstDay    = new Date(year, month, 1).getDay()
  const startDay    = firstDay === 0 ? 6 : firstDay - 1
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells = []
  for (let i = 0; i < startDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  return (
    <Reveal delay={0.1}>
      <div style={{
        background: 'transparent',
        padding: 'clamp(16px,4vw,28px)',
        maxWidth: '380px', margin: '0 auto',
      }}>
        {/* Month title */}
        <p style={{
          textAlign: 'center',
          fontFamily: "'Bickham', cursive",
          fontSize: 'clamp(42px,8vw,64px)',
          fontWeight: 400, letterSpacing: '3px',
          color: 'var(--ink)',
          marginBottom: '24px',
          textTransform: 'capitalize',
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
              fontFamily: "'Jost', sans-serif",
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
                padding: isWed ? '0' : '6px 2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {isWed ? (
                  /* Heart with number inside */
                  <HeartWithNumber number={28} size={38} />
                ) : (
                  <span style={{
                    fontSize: 'clamp(11px,2.2vw,13px)',
                    fontWeight: 300,
                    color: day ? 'var(--ink)' : 'transparent',
                    lineHeight: 1.2,
                    fontFamily: "'Jost', sans-serif",
                  }}>
                    {day || ''}
                  </span>
                )}
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
          <HeartSmall size={14} />
          <span style={{
            fontSize: '10px', letterSpacing: '2.5px',
            color: 'var(--ink)', textTransform: 'lowercase',
            fontWeight: 300, opacity: 0.6,
            fontFamily: "'Ante', sans-serif",
          }}>
            {t.calendar.legend}
          </span>
        </div>
      </div>
    </Reveal>
  )
}