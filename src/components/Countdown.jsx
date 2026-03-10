import React, { useState, useEffect } from 'react'

export default function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(calcTime())

  function calcTime() {
    const now = new Date()
    const target = new Date(targetDate)
    const diff = target - now
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(calcTime()), 1000)
    return () => clearInterval(interval)
  }, [])

  const units = [
    { value: timeLeft.days, label: 'Күн', labelEn: 'Days' },
    { value: timeLeft.hours, label: 'Сағат', labelEn: 'Hours' },
    { value: timeLeft.minutes, label: 'Минут', labelEn: 'Minutes' },
    { value: timeLeft.seconds, label: 'Секунд', labelEn: 'Seconds' },
  ]

  return (
    <div style={{
      display: 'flex', justifyContent: 'center',
      gap: 'clamp(12px, 3vw, 32px)',
      flexWrap: 'wrap'
    }}>
      {units.map((unit, i) => (
        <div key={i} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: '8px'
        }}>
          {/* Card */}
          <div style={{
            width: 'clamp(70px, 15vw, 120px)',
            height: 'clamp(80px, 17vw, 130px)',
            background: 'var(--white)',
            border: '1px solid var(--border)',
            borderRadius: '4px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(201,168,76,0.08)'
          }}>
            {/* Gold top bar */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
              background: 'linear-gradient(to right, var(--gold), var(--rose-light))'
            }} />
            {/* Corner ornaments */}
            <div style={{
              position: 'absolute', top: '8px', left: '8px',
              width: '12px', height: '12px',
              borderTop: '1px solid var(--gold)', borderLeft: '1px solid var(--gold)',
              opacity: 0.5
            }} />
            <div style={{
              position: 'absolute', bottom: '8px', right: '8px',
              width: '12px', height: '12px',
              borderBottom: '1px solid var(--gold)', borderRight: '1px solid var(--gold)',
              opacity: 0.5
            }} />
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(28px, 6vw, 52px)',
              fontWeight: 300, color: 'var(--text-dark)',
              lineHeight: 1,
              animation: 'countdown-tick 1s ease infinite'
            }}>
              {String(unit.value).padStart(2, '0')}
            </span>
          </div>

          {/* Label */}
          <p style={{
            fontSize: '11px', letterSpacing: '3px',
            textTransform: 'uppercase', color: 'var(--gold)',
            fontWeight: 500
          }}>{unit.label}</p>
        </div>
      ))}
    </div>
  )
}