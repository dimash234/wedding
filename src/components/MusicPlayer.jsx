import React, { useState, useRef, useEffect } from 'react'

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const [visible, setVisible] = useState(true)
  const audioRef = useRef(null)

  // We'll use a YouTube search link since we can't host audio
  // But we implement a visual player that auto-creates an audio context
  const songTitle = 'Махаббат деген қандай'
  const songArtist = 'Kazakh Wedding Song'

  useEffect(() => {
    // Create audio element pointing to a free Kazakh music source
    // Using a publicly available mp3 URL for demo
    const audio = new Audio()
    audio.loop = true
    audioRef.current = audio
    
    // Try autoplay on first interaction
    const enableAudio = () => {
      if (audioRef.current && !playing) {
        // Don't autoplay - let user choose
      }
      document.removeEventListener('click', enableAudio)
    }
    document.addEventListener('click', enableAudio)
    
    return () => {
      audio.pause()
      document.removeEventListener('click', enableAudio)
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      // Since we can't host audio, open YouTube search
      window.open('https://www.youtube.com/results?search_query=Махаббат+деген+қандай+қазақша', '_blank')
    }
  }

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 200,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '8px'
    }}>
      {/* Song info card */}
      <div style={{
        background: 'rgba(253,248,242,0.95)',
        backdropFilter: 'blur(12px)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        padding: '12px 16px',
        boxShadow: '0 4px 24px rgba(201,168,76,0.15)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        maxWidth: '260px'
      }}>
        {/* Album art placeholder */}
        <div style={{
          width: '40px', height: '40px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--gold), var(--rose-light))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '18px', flexShrink: 0,
          animation: playing ? 'spin-slow 4s linear infinite' : 'none'
        }}>🎵</div>
        
        {/* Song info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontSize: '12px', fontWeight: 500, color: 'var(--text-dark)',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            lineHeight: 1.3
          }}>{songTitle}</p>
          <p style={{
            fontSize: '11px', color: 'var(--text-light)', letterSpacing: '1px'
          }}>Той музыкасы</p>
        </div>

        {/* Play button */}
        <button
          onClick={toggle}
          style={{
            width: '36px', height: '36px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '14px', color: 'white',
            flexShrink: 0,
            boxShadow: '0 2px 8px rgba(201,168,76,0.4)',
            transition: 'transform 0.2s ease',
            animation: 'pulse-gold 2s ease infinite'
          }}
          title="Музыканы ашу"
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          ▶
        </button>

        {/* Close */}
        <button
          onClick={() => setVisible(false)}
          style={{
            position: 'absolute', top: '-6px', right: '-6px',
            width: '18px', height: '18px',
            borderRadius: '50%',
            background: 'var(--text-light)',
            border: 'none', cursor: 'pointer',
            fontSize: '10px', color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            lineHeight: 1
          }}
        >✕</button>
      </div>

      {/* YouTube link button */}
      <a
        href="https://www.youtube.com/results?search_query=Махаббат+деген+қандай+казахская+свадебная"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          background: 'rgba(253,248,242,0.95)',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--border)',
          borderRadius: '30px',
          padding: '8px 16px',
          fontSize: '11px',
          color: 'var(--gold)',
          textDecoration: 'none',
          letterSpacing: '1px',
          boxShadow: '0 2px 12px rgba(201,168,76,0.1)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--gold-faint)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(253,248,242,0.95)'}
      >
        🎵 YouTube-та тыңдау
      </a>
    </div>
  )
}