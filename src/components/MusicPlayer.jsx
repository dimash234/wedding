import React, { useState, useRef, useEffect, useContext } from 'react'
import { LangContext } from '../context/LangContext'

const AUDIO_URL = './music/mahabbat.mp3'

export default function MusicPlayer() {
  const { t } = useContext(LangContext)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.5)
  const [minimized, setMinimized] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const audioRef = useRef(null)
  const hasAutoPlayed = useRef(false)

  useEffect(() => {
    const audio = new Audio(AUDIO_URL)
    audio.loop = true
    audio.volume = volume
    audioRef.current = audio

    audio.addEventListener('loadedmetadata', () => setDuration(audio.duration))
    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime)
      if (audio.duration) setProgress(audio.currentTime / audio.duration * 100)
    })

    const tryAutoPlay = () => {
      if (!hasAutoPlayed.current && audioRef.current) {
        audioRef.current.play().then(() => { setPlaying(true); hasAutoPlayed.current = true }).catch(() => {})
        document.removeEventListener('click', tryAutoPlay)
        document.removeEventListener('scroll', tryAutoPlay)
        document.removeEventListener('touchstart', tryAutoPlay)
      }
    }

    audio.play().then(() => { setPlaying(true); hasAutoPlayed.current = true }).catch(() => {
      document.addEventListener('click', tryAutoPlay)
      document.addEventListener('scroll', tryAutoPlay)
      document.addEventListener('touchstart', tryAutoPlay)
    })

    return () => {
      audio.pause(); audio.src = ''
      document.removeEventListener('click', tryAutoPlay)
      document.removeEventListener('scroll', tryAutoPlay)
      document.removeEventListener('touchstart', tryAutoPlay)
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) { audio.pause(); setPlaying(false) }
    else { audio.play().then(() => setPlaying(true)).catch(() => {}) }
  }

  const seek = (e) => {
    const audio = audioRef.current
    if (!audio || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * duration
  }

  const changeVolume = (e) => {
    const v = parseFloat(e.target.value)
    setVolume(v)
    if (audioRef.current) audioRef.current.volume = v
  }

  const fmt = (s) => {
    if (!s || isNaN(s)) return '0:00'
    return `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`
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
            <button onClick={() => setMinimized(false)} style={{ width:'28px',height:'28px',background:'none',border:'none',cursor:'pointer',fontSize:'20px', animation: playing ? 'spin-slow 4s linear infinite' : 'none' }}>🎵</button>
          </div>
        ) : (
          <div style={{ padding: '16px' }}>
            <div style={{ display:'flex',alignItems:'center',gap:'12px',marginBottom:'14px' }}>
              {/* Vinyl disc */}
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
                <p style={{ fontSize:'13px',fontWeight:600,color:'var(--text-dark)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',marginBottom:'2px' }}>
                  {t.music.title}
                </p>
                <p style={{ fontSize:'11px',color:'var(--gold)',letterSpacing:'1px' }}>{t.music.sub}</p>
              </div>
              <button onClick={() => setMinimized(true)} style={{ background:'none',border:'none',cursor:'pointer',fontSize:'16px',color:'var(--text-light)',padding:'4px' }}>—</button>
            </div>

            {/* Progress */}
            <div onClick={seek} style={{ height:'4px',borderRadius:'2px',background:'var(--gold-pale)',cursor:'pointer',marginBottom:'6px',position:'relative' }}>
              <div style={{ height:'100%',borderRadius:'2px',width:`${progress}%`,background:'linear-gradient(to right, var(--gold), var(--rose-light))',transition:'width 0.5s linear',position:'relative' }}>
                <div style={{ position:'absolute',right:'-5px',top:'-4px',width:'12px',height:'12px',borderRadius:'50%',background:'var(--gold)',boxShadow:'0 1px 4px rgba(201,168,76,0.5)' }} />
              </div>
            </div>

            <div style={{ display:'flex',justifyContent:'space-between',fontSize:'10px',color:'var(--text-light)',marginBottom:'14px' }}>
              <span>{fmt(currentTime)}</span>
              <span>{fmt(duration)}</span>
            </div>

            {/* Controls */}
            <div style={{ display:'flex',alignItems:'center',justifyContent:'center',gap:'16px' }}>
              <div style={{ display:'flex',alignItems:'center',gap:'6px' }}>
                <span style={{ fontSize:'12px' }}>{volume===0?'🔇':volume<0.5?'🔉':'🔊'}</span>
                <input type="range" min="0" max="1" step="0.05" value={volume} onChange={changeVolume}
                  style={{ width:'60px',accentColor:'var(--gold)',cursor:'pointer',height:'3px' }} />
              </div>
              <button onClick={toggle} style={{
                width:'48px',height:'48px',borderRadius:'50%',
                background:'linear-gradient(135deg, var(--gold), var(--gold-light))',
                border:'none',cursor:'pointer',
                display:'flex',alignItems:'center',justifyContent:'center',
                fontSize:'20px',color:'black',
                boxShadow: playing ? '0 0 0 6px rgba(201,168,76,0.2),0 4px 16px rgba(201,168,76,0.4)' : '0 4px 16px rgba(201,168,76,0.3)',
                transition:'all 0.3s ease',
                animation: playing ? 'pulse-gold 2s ease infinite' : 'none'
              }}>
                {playing ? '⏸' : '▶'}
              </button>
              <div style={{ fontSize:'16px',color:'var(--gold)',opacity:0.7 }}>🔁</div>
            </div>

            <p style={{ marginTop:'12px',fontSize:'9px',color:'var(--text-light)',textAlign:'center',opacity:0.7 }}>
              {t.music.note}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}