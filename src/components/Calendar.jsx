import React, { useContext } from 'react'
import { LangContext } from '../App'

export default function Calendar({ weddingDate }) {
  const { t } = useContext(LangContext)
  const wedding = new Date(weddingDate)
  const year = 2026, month = 5 // June

  const firstDay = new Date(year, month, 1).getDay()
  const startDay = firstDay === 0 ? 6 : firstDay - 1
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells = []
  for (let i = 0; i < startDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  const isWedding = (day) => day === 28
  const today = new Date()
  const isToday = (day) => day === today.getDate() && month === today.getMonth() && year === today.getFullYear()

  return (
    <div style={{
      background: 'var(--white)', border: '1px solid var(--border)',
      borderRadius: '8px', padding: '32px', maxWidth: '480px', margin: '0 auto',
      boxShadow: '0 8px 40px rgba(201,168,76,0.08)', position: 'relative', overflow: 'hidden'
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(to right, var(--gold), var(--rose-light), var(--gold))' }} />

      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', fontStyle: 'italic', color: 'var(--text-dark)' }}>
          {t.calendar.months[month]} {year}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '8px' }}>
        {t.calendar.days.map(d => (
          <div key={d} style={{ textAlign: 'center', padding: '6px 0', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500 }}>{d}</div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
        {cells.map((day, i) => {
          const wed = isWedding(day)
          const tod = isToday(day)
          return (
            <div key={i} style={{
              textAlign: 'center', padding: '8px 4px', borderRadius: '4px',
              background: wed ? 'linear-gradient(135deg, var(--gold), var(--rose-light))' : tod ? 'var(--gold-faint)' : 'transparent',
              border: wed ? 'none' : tod ? '1px solid var(--border)' : '1px solid transparent',
              transform: wed ? 'scale(1.15)' : 'scale(1)',
              zIndex: wed ? 2 : 1, position: 'relative',
              boxShadow: wed ? '0 4px 16px rgba(201,168,76,0.4)' : 'none',
              transition: 'all 0.2s ease'
            }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', fontWeight: wed ? 600 : 400, color: wed ? 'white' : day ? 'var(--text-dark)' : 'transparent', display: 'block' }}>
                {day || ''}
              </span>
              {wed && <span style={{ fontSize: '8px', display: 'block', color: 'white', opacity: 0.9, lineHeight: 1.2, marginTop: '2px' }}>💍</span>}
            </div>
          )
        })}
      </div>

      <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        <div style={{ width: '16px', height: '16px', borderRadius: '3px', background: 'linear-gradient(135deg, var(--gold), var(--rose-light))' }} />
        <span style={{ fontSize: '13px', color: 'var(--text-mid)', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' }}>
          {t.calendar.legend}
        </span>
      </div>
    </div>
  )
}