import React, { useState, useEffect, useContext } from 'react'
import { LangContext } from '../App'

export default function Countdown({ targetDate }) {
  const { t } = useContext(LangContext)
  const calc = () => {
    const diff = new Date(targetDate) - new Date()
    if (diff <= 0) return null
    return { days:Math.floor(diff/86400000), hours:Math.floor((diff%86400000)/3600000), minutes:Math.floor((diff%3600000)/60000), seconds:Math.floor((diff%60000)/1000) }
  }
  const [tl, setTl] = useState(calc())
  useEffect(() => { const id = setInterval(()=>setTl(calc()),1000); return ()=>clearInterval(id) }, [])
  if (!tl) return <p style={{fontSize:'18px',color:'var(--gold)',letterSpacing:'3px'}}>{t.countdown.passed}</p>
  const units = [{v:tl.days,l:t.countdown.days},{v:tl.hours,l:t.countdown.hours},{v:tl.minutes,l:t.countdown.minutes},{v:tl.seconds,l:t.countdown.seconds}]
  return (
    <div style={{display:'flex',justifyContent:'center',gap:'clamp(8px,4vw,48px)',flexWrap:'wrap'}}>
      {units.map((u,i) => (
        <div key={i} style={{textAlign:'center',minWidth:'60px'}}>
          <p className="display-font" style={{fontSize:'clamp(36px,8vw,64px)',fontWeight:300,color:'var(--text-dark)',lineHeight:1,letterSpacing:'2px'}}>
            {String(u.v).padStart(2,'0')}
          </p>
          <div style={{width:'100%',height:'1px',background:'var(--border)',margin:'8px 0'}} />
          <p style={{fontSize:'8px',letterSpacing:'3px',textTransform:'lowercase',color:'var(--text-light)'}}>{u.l}</p>
        </div>
      ))}
    </div>
  )
}