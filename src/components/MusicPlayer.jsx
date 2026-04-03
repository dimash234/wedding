import React, { useState, useContext } from 'react'
import { LangContext } from '../context/LangContext'

export default function MusicPlayer() {
  // Берём всё необходимое из контекста (то, что мы настроили в App.js)
  const { t, playing, toggle } = useContext(LangContext)
  
  // Эти состояния оставляем локальными для интерфейса плеера
  const [volume, setVolume] = useState(0.5)
  const [minimized, setMinimized] = useState(false)

  // Находим объект аудио, чтобы управлять громкостью (опционально)
  const changeVolume = (e) => {
    const v = parseFloat(e.target.value)
    setVolume(v)
    // Напрямую находим аудио, если нужно регулировать громкость
    const audioEl = document.querySelector('audio') 
    if (audioEl) audioEl.volume = v
  }

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 300, fontFamily: "'Raleway', sans-serif" }}>
      <div style={{
        background: 'black', backdropFilter: 'blur(20px)',
        border: '1px solid rgba(201,168,76,0.4)', borderRadius: '16px',
        boxShadow: '0 8px 40px rgba(201,168,76,0.2), 0 2px 8px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        width: minimized ? '60px' : '300px',
        transition: 'width 0.4s cubic-bezier(0.4,0,0.2,1)'
      }}>
        <div style={{ height: '3px', background: 'linear-gradient(to right, var(--gold), var(--rose-light), var(--gold))' }} />

        {minimized ? (
          <div style={{ display:'flex',alignItems:'center',justifyContent:'center',padding:'16px' }}>
            <button onClick={() => setMinimized(false)} style={{ 
              width:'28px',height:'28px',background:'none',border:'none',cursor:'pointer',fontSize:'20px', 
              animation: playing ? 'spin-slow 4s linear infinite' : 'none' 
            }}>🎵</button>
          </div>
        ) : (
          <div style={{ padding: '16px' }}>
            <div style={{ display:'flex',alignItems:'center',gap:'12px',marginBottom:'14px' }}>
              <div style={{
                width:'48px',height:'48px',borderRadius:'50%',flexShrink:0,
                background:'conic-gradient(from 0deg, var(--gold), var(--rose-light), var(--gold-pale), var(--gold))',
                display:'flex',alignItems:'center',justifyContent:'center',
                animation: playing ? 'spin-slow 3s linear infinite' : 'none',
                boxShadow:'0 2px 12px rgba(201,168,76,0.35)'
              }}>
                <div style={{ width:'14px',height:'14px',borderRadius:'50%',background:'var(--cream)',border:'2px solid rgba(201,168,76,0.5)' }} />
              </div>
              <div style={{ flex:1,minWidth:0 }}>
                <p style={{ fontSize:'13px',fontWeight:600,color:'white',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',marginBottom:'2px' }}>
                  {t.music.title}
                </p>
                <p style={{ fontSize:'11px',color:'var(--gold)',letterSpacing:'1px' }}>{t.music.sub}</p>
              </div>
              <button onClick={() => setMinimized(true)} style={{ background:'none',border:'none',cursor:'pointer',fontSize:'16px',color:'white',padding:'4px' }}>—</button>
            </div>

            <div style={{ display:'flex',alignItems:'center',justifyContent:'center',gap:'16px' }}>
              <div style={{ display:'flex',alignItems:'center',gap:'6px' }}>
                <span style={{ fontSize:'12px' }}>{volume===0?'🔇':volume<0.5?'🔉':'🔊'}</span>
                <input type="range" min="0" max="1" step="0.05" value={volume} onChange={changeVolume}
                  style={{ width:'60px',accentColor:'var(--gold)',cursor:'pointer',height:'3px' }} />
              </div>
              <button onClick={toggle} style={{
                width:'48px',height:'48px',borderRadius:'50%',
                background:'white',
                border:'none',cursor:'pointer',
                display:'flex',alignItems:'center',justifyContent:'center',
                fontSize:'20px',color:'black',
                boxShadow: playing ? '0 0 0 6px rgba(201,168,76,0.2),0 4px 16px rgba(201,168,76,0.4)' : '0 4px 16px rgba(201,168,76,0.3)',
                transition:'all 0.3s ease'
              }}>
                {playing ? '⏸' : '▶'}
              </button>
              <div style={{ fontSize:'16px',color:'var(--gold)',opacity:0.7 }}>🔁</div>
            </div>

            <p style={{ marginTop:'12px',fontSize:'9px',color:'white',textAlign:'center',opacity:0.7 }}>
              {t.music.note}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}