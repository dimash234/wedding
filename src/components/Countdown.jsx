import React, { useState, useEffect, useContext } from 'react'
import { LangContext } from '../App'

export default function Countdown({ targetDate }) {
  const { t } = useContext(LangContext)
  const calc = () => {
    const diff = new Date(targetDate) - new Date()
    if (diff <= 0) return null
    return {
      days:    Math.floor(diff / 86400000),
      hours:   Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000)  / 60000),
      seconds: Math.floor((diff % 60000)    / 1000),
    }
  }
  const [tl, setTl] = useState(calc())
  const [tick, setTick] = useState(false)

  useEffect(() => {
    const id = setInterval(() => {
      setTl(calc())
      setTick(t => !t)
    }, 1000)
    return () => clearInterval(id)
  }, [])

  if (!tl) return (
    <p style={{ fontSize:'18px', letterSpacing:'4px', color:'var(--gold)', textAlign:'center' }}>
      {t.countdown.passed}
    </p>
  )

  const units = [
    { v: tl.days,    l: t.countdown.days    },
    { v: tl.hours,   l: t.countdown.hours   },
    { v: tl.minutes, l: t.countdown.minutes },
    { v: tl.seconds, l: t.countdown.seconds },
  ]

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'48px' }}>

      {/* Big numbers row */}
      <div style={{
        display:'flex', alignItems:'center',
        gap:'clamp(8px, 3vw, 32px)',
        flexWrap:'wrap', justifyContent:'center'
      }}>
        {units.map((u, i) => (
          <React.Fragment key={i}>
            <div style={{ textAlign:'center', position:'relative' }}>
              {/* Number box */}
              <div style={{
                width:'clamp(72px, 18vw, 130px)',
                height:'clamp(80px, 20vw, 144px)',
                background:'var(--white)',
                border:'1px solid var(--border)',
                display:'flex', alignItems:'center', justifyContent:'center',
                position:'relative', overflow:'hidden',
              }}>
                {/* Top shimmer line */}
                <div style={{
                  position:'absolute', top:0, left:0, right:0, height:'1px',
                  background:'linear-gradient(to right, transparent, var(--gold), transparent)'
                }} />

                {/* Number */}
                <span className="display-font" style={{
                  fontSize:'clamp(36px, 9vw, 76px)',
                  fontWeight:300,
                  color:'var(--text-dark)',
                  lineHeight:1,
                  letterSpacing:'-2px',
                  // animate only seconds
                  animation: i === 3 ? 'fadeInUp 0.3s ease' : 'none',
                  animationKey: i === 3 ? tl.seconds : undefined,
                }}>
                  {String(u.v).padStart(2, '0')}
                </span>

                {/* Bottom shimmer line */}
                <div style={{
                  position:'absolute', bottom:0, left:0, right:0, height:'1px',
                  background:'linear-gradient(to right, transparent, var(--gold-light), transparent)'
                }} />
              </div>

              {/* Label below */}
              <p style={{
                marginTop:'10px',
                fontSize:'8px',
                letterSpacing:'4px',
                textTransform:'lowercase',
                color:'var(--text-light)',
              }}>{u.l}</p>
            </div>

            {/* Separator between units */}
            {i < 3 && (
              <span className="display-font" style={{
                fontSize:'clamp(28px, 6vw, 52px)',
                fontWeight:300,
                color:'var(--gold)',
                lineHeight:1,
                opacity: tick ? 1 : 0.25,
                transition:'opacity 0.5s ease',
                marginTop:'-20px', // align with numbers
              }}>:</span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Date reminder */}
      <div style={{
        display:'flex', alignItems:'center', gap:'16px',
        opacity:0.5
      }}>
        <div style={{ width:'40px', height:'1px', background:'var(--line)' }} />
        <p style={{ fontSize:'9px', letterSpacing:'5px', textTransform:'lowercase', color:'var(--text-light)' }}>
          28 · 06 · 2026
        </p>
        <div style={{ width:'40px', height:'1px', background:'var(--line)' }} />
      </div>
    </div>
  )
}