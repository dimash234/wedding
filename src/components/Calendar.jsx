import React, { useState } from 'react'

export default function Calendar({ weddingDate }) {
  const wedding = new Date(weddingDate)
  const [currentMonth] = useState(new Date(2026, 5, 1)) // June 2026

  const monthNames = [
    'Қаңтар','Ақпан','Наурыз','Сәуір','Мамыр','Маусым',
    'Шілде','Тамыз','Қыркүйек','Қазан','Қараша','Желтоқсан'
  ]
  const dayNames = ['Дс', 'Сс', 'Ср', 'Бс', 'Жм', 'Сб', 'Жк']

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const startDay = firstDay === 0 ? 6 : firstDay - 1
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells = []
  for (let i = 0; i < startDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  const isWedding = (day) => day === wedding.getDate() && month === wedding.getMonth() && year === wedding.getFullYear()
  const today = new Date()
  const isToday = (day) => day === today.getDate() && month === today.getMonth() && year === today.getFullYear()

  return (
    <div style={{
      background: 'var(--white)',
      border: '1px solid var(--border)',
      borderRadius: '8px',
      padding: '32px',
      maxWidth: '480px',
      margin: '0 auto',
      boxShadow: '0 8px 40px rgba(201,168,76,0.08)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Top gold bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
        background: 'linear-gradient(to right, var(--gold), var(--rose-light), var(--gold))'
      }} />

      {/* Month header */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '28px', fontWeight: 400, fontStyle: 'italic',
          color: 'var(--text-dark)'
        }}>
          {monthNames[month]} {year}
        </p>
      </div>

      {/* Day names */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '8px' }}>
        {dayNames.map(d => (
          <div key={d} style={{
            textAlign: 'center', padding: '6px 0',
            fontSize: '11px', letterSpacing: '1px',
            textTransform: 'uppercase', color: 'var(--gold)',
            fontWeight: 500
          }}>{d}</div>
        ))}
      </div>

      {/* Days grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
        {cells.map((day, i) => {
          const wedding_ = isWedding(day)
          const today_ = isToday(day)
          return (
            <div key={i} style={{
              textAlign: 'center',
              padding: '8px 4px',
              borderRadius: '4px',
              position: 'relative',
              cursor: day ? 'default' : 'auto',
              background: wedding_
                ? 'linear-gradient(135deg, var(--gold), var(--rose-light))'
                : today_
                ? 'var(--gold-faint)'
                : 'transparent',
              border: wedding_ ? 'none' : today_ ? '1px solid var(--border)' : '1px solid transparent',
              transform: wedding_ ? 'scale(1.15)' : 'scale(1)',
              zIndex: wedding_ ? 2 : 1,
              boxShadow: wedding_ ? '0 4px 16px rgba(201,168,76,0.4)' : 'none',
              transition: 'all 0.2s ease'
            }}>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '16px',
                fontWeight: wedding_ ? 600 : 400,
                color: wedding_ ? 'white' : day ? 'var(--text-dark)' : 'transparent',
                display: 'block'
              }}>
                {day || ''}
              </span>
              {wedding_ && (
                <span style={{ fontSize: '8px', display: 'block', color: 'white', opacity: 0.9, lineHeight: 1.2, marginTop: '2px' }}>
                  💍
                </span>
              )}
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div style={{
        marginTop: '24px', paddingTop: '20px',
        borderTop: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
      }}>
        <div style={{
          width: '16px', height: '16px', borderRadius: '3px',
          background: 'linear-gradient(135deg, var(--gold), var(--rose-light))'
        }} />
        <span style={{ fontSize: '13px', color: 'var(--text-mid)', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' }}>
          Той күні — 28 Маусым 2026
        </span>
      </div>
    </div>
  )
}