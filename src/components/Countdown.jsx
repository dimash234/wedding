import React, { useState, useEffect, useContext, useRef } from 'react'
import { LangContext } from '../App'

// Single animated digit that flips on change
function FlipDigit({ value }) {
  const [prev, setPrev] = useState(value)
  const [flipping, setFlipping] = useState(false)

  useEffect(() => {
    if (value !== prev) {
      setFlipping(true)
      const t = setTimeout(() => { setPrev(value); setFlipping(false) }, 300)
      return () => clearTimeout(t)
    }
  }, [value])

  return (
    <span style={{
      display:'inline-block',
      transition: flipping ? 'transform 0.15s ease-in, opacity 0.15s ease-in' : 'transform 0.15s ease-out, opacity 0.15s ease-out',
      transform: flipping ? 'translateY(-6px) scaleY(0.6)' : 'translateY(0) scaleY(1)',
      opacity: flipping ? 0 : 1,
    }}>
      {String(value).padStart(2, '0')}
    </span>
  )
}

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

  const [tl, setTl]     = useState(calc())
  const [blink, setBlink] = useState(true)

  useEffect(() => {
    const id = setInterval(() => {
      setTl(calc())
      setBlink(b => !b)
    }, 1000)
    return () => clearInterval(id)
  }, [])

  if (!tl) return (
    <p style={{ fontSize:'16px', letterSpacing:'4px', color:'var(--gold)', textAlign:'center', fontStyle:'italic' }}>
      {t.countdown.passed}
    </p>
  )

  const units = [
    { v: tl.days,    l: t.countdown.days    },
    { v: tl.hours,   l: t.countdown.hours   },
    { v: tl.minutes, l: t.countdown.minutes },
    { v: tl.seconds, l: t.countdown.seconds },
  ]

  // Separator style
  const sep = {
    fontSize:'clamp(28px,6vw,52px)',
    fontWeight:300,
    color:'var(--gold)',
    lineHeight:1,
    opacity: blink ? 1 : 0.15,
    transition:'opacity 0.4s ease',
    alignSelf:'flex-start',
    paddingTop:'4px',
    flexShrink:0,
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'20px' }}>

      {/* One single row — no wrap on desktop, compact on mobile */}
      <div style={{
        display:'flex',
        alignItems:'flex-start',
        justifyContent:'center',
        gap:'clamp(4px, 1vw, 12px)',
        flexWrap:'nowrap',   // NEVER wrap to next line
        overflowX:'auto',    // scroll on tiny screens instead of wrapping
        width:'100%',
        paddingBottom:'4px', // space for scrollbar if needed
      }}>
        {units.map((u, i) => (
          <React.Fragment key={i}>
            {/* Unit block */}
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', flexShrink:0 }}>
              {/* Number card */}
              <div style={{
                width:'clamp(58px, 14vw, 110px)',
                height:'clamp(66px, 16vw, 124px)',
                background:'var(--white)',
                border:'1px solid var(--border)',
                display:'flex', alignItems:'center', justifyContent:'center',
                position:'relative', overflow:'hidden',
                flexShrink:0,
              }}>
                {/* Top shimmer */}
                <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(to right, transparent, var(--gold), transparent)' }} />
                {/* Bottom shimmer */}
                <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'1px', background:'linear-gradient(to right, transparent, var(--gold-light), transparent)' }} />
                {/* Middle split line */}
                <div style={{ position:'absolute', top:'50%', left:'8px', right:'8px', height:'1px', background:'var(--border)', zIndex:1 }} />

                <span className="display-font" style={{
                  fontSize:'clamp(28px, 7vw, 58px)',
                  fontWeight:300,
                  color:'var(--text-dark)',
                  lineHeight:1,
                  letterSpacing:'-1px',
                  zIndex:2, position:'relative',
                }}>
                  <FlipDigit value={u.v} />
                </span>
              </div>

              {/* Label */}
              <p style={{
                marginTop:'8px',
                fontSize:'clamp(6px, 1.5vw, 9px)',
                letterSpacing:'3px',
                textTransform:'lowercase',
                color:'var(--text-light)',
                whiteSpace:'nowrap',
              }}>{u.l}</p>
            </div>

            {/* Colon separator */}
            {i < 3 && (
              <span className="display-font" style={sep}>:</span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Subtitle */}
      <div style={{ display:'flex', alignItems:'center', gap:'14px', opacity:0.45, marginTop:'4px' }}>
        <div style={{ width:'32px', height:'1px', background:'var(--line)' }} />
        <p style={{ fontSize:'8px', letterSpacing:'4px', textTransform:'lowercase', color:'var(--text-light)', whiteSpace:'nowrap' }}>
          28 · 06 · 2026
        </p>
        <div style={{ width:'32px', height:'1px', background:'var(--line)' }} />
      </div>
    </div>
  )
}