import React, { useState, useEffect, useRef, createContext, useContext } from 'react'
import KazakhOrnament from './components/KazakhOrnament'
import Countdown from './components/Countdown'
import MapSection from './components/MapSection'
import RSVPForm from './components/RSVPForm'
import Calendar from './components/Calendar'
import Petals from './components/Petals'
import { translations } from './lang'

export const LangContext = createContext()

// Single shared audio instance
const audio = new Audio('./music/mahabbat.mp3')
audio.loop = true
audio.volume = 0.55

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [lang, setLang] = useState('kz')
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  const toggleMusic = () => {
    if (playing) { audio.pause(); setPlaying(false) }
    else { audio.play().then(() => setPlaying(true)).catch(() => {}) }
  }

  const t = translations[lang]

  return (
    <LangContext.Provider value={{ lang, t, setLang, playing, toggleMusic }}>
      <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
        <Petals />
        <Nav scrolled={scrolled} />
        <HeroSection />
        <CountdownSection />
        <ScheduleSection />
        <DetailsSection />
        <CalendarSection />
        <MapSection />
        <RSVPForm />
        <Footer />
      </div>
    </LangContext.Provider>
  )
}

// ── Lang Switch ────────────────────────────────────────────────────────────────
function LangSwitch({ dark }) {
  const { lang, setLang } = useContext(LangContext)
  return (
    <div style={{ display:'flex', gap:'1px' }}>
      {['kz','ru'].map(l => (
        <button key={l} onClick={() => setLang(l)} style={{
          padding:'5px 10px', border:'none', cursor:'pointer', background:'transparent',
          fontSize:'10px', fontFamily:'inherit', letterSpacing:'2px', textTransform:'uppercase',
          color: lang===l ? (dark ? 'var(--text-dark)' : 'var(--white)') : 'var(--text-light)',
          fontWeight: lang===l ? 600 : 400,
          borderBottom: lang===l ? `1px solid ${dark ? 'var(--text-dark)' : 'rgba(255,255,255,0.6)'}` : '1px solid transparent',
          transition:'all 0.3s',
        }}>{l==='kz'?'қаз':'рус'}</button>
      ))}
    </div>
  )
}

// ── Nav ───────────────────────────────────────────────────────────────────────
function Nav({ scrolled }) {
  const { t } = useContext(LangContext)
  return (
    <nav style={{
      position:'fixed', top:0, left:0, right:0, zIndex:200,
      padding:'14px 32px',
      background: scrolled ? 'rgba(250,250,248,0.96)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      transition:'all 0.5s ease',
      display:'flex', justifyContent:'space-between', alignItems:'center',
    }}>
      <div style={{ display:'flex', gap:'28px' }}>
        {[
          { l: t.nav.home, h:'#hero' },
          { l: t.nav.schedule, h:'#schedule' },
          { l: t.nav.place, h:'#map' },
          { l: t.nav.rsvp, h:'#rsvp' },
        ].map(item => (
          <a key={item.h} href={item.h} style={{
            fontSize:'10px', letterSpacing:'2px', textTransform:'lowercase',
            color: scrolled ? 'var(--text-mid)' : 'var(--text-mid)',
            textDecoration:'none', transition:'color 0.3s',
          }}
          onMouseEnter={e=>e.target.style.color='var(--gold)'}
          onMouseLeave={e=>e.target.style.color='var(--text-mid)'}
          >{item.l}</a>
        ))}
      </div>
      <LangSwitch dark />
    </nav>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function HeroSection() {
  const { t, playing, toggleMusic } = useContext(LangContext)
  return (
    <section id="hero" style={{ minHeight:'100vh', display:'flex', flexDirection:'column', background:'var(--cream)', position:'relative', overflow:'hidden' }}>

      {/* Full photo - no yurt */}
      <div style={{ width:'100%', height:'75vh', position:'relative', overflow:'hidden' }}>
        <img src="./couple.jpg" alt=""
          style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 30%', display:'block', animation:'fadeIn 1.8s ease both' }}
        />
        {/* Bottom fade into cream */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, transparent 55%, rgba(250,250,248,0.7) 85%, var(--cream) 100%)' }} />
      </div>

      {/* Content below photo */}
      <div style={{
        flex:1, display:'flex', flexDirection:'column', alignItems:'center',
        padding:'0 24px 80px', textAlign:'center',
        animation:'fadeInUp 1s ease 0.6s both'
      }}>
        {/* Thin line */}
        <div style={{ width:'1px', height:'48px', background:'linear-gradient(to bottom, transparent, var(--line))', marginBottom:'24px' }} />

        {/* Invite text */}
        <p style={{ fontSize:'10px', letterSpacing:'5px', textTransform:'lowercase', color:'var(--text-light)', marginBottom:'20px' }}>
          {t.hero.invite}
        </p>

        {/* R & Ж — big display */}
        <h1 className="display-font" style={{
          fontSize:'clamp(64px, 18vw, 130px)',
          fontWeight:300, letterSpacing:'12px',
          lineHeight:1, color:'var(--text-dark)',
          marginBottom:'28px',
        }}>
          Р <span style={{ color:'var(--gold)', fontSize:'0.5em', letterSpacing:'0', verticalAlign:'middle' }}>✦</span> Ж
        </h1>

        {/* Date */}
        <p style={{ fontSize:'12px', letterSpacing:'5px', textTransform:'lowercase', color:'var(--text-mid)', marginBottom:'6px' }}>
          {t.hero.date}
        </p>
        <p style={{ fontSize:'10px', letterSpacing:'4px', color:'var(--text-light)', marginBottom:'36px' }}>
          {t.hero.day}
        </p>

        {/* ── Inline Music Player ── */}
        <InlineMusicPlayer />

        {/* Quote */}
        <div style={{ marginTop:'36px', display:'flex', alignItems:'center', gap:'16px' }}>
          <div style={{ height:'1px', width:'40px', background:'var(--line)' }} />
          <p style={{ fontSize:'13px', fontStyle:'italic', color:'var(--text-light)', letterSpacing:'0.5px' }}>
            {t.hero.quote}
          </p>
          <div style={{ height:'1px', width:'40px', background:'var(--line)' }} />
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position:'absolute', bottom:'20px', left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:'4px', animation:'fadeIn 3s ease 2s both' }}>
        <div style={{ width:'1px', height:'36px', background:'linear-gradient(to bottom, transparent, var(--gold))', animation:'pulse-soft 2s ease infinite' }} />
      </div>
    </section>
  )
}

// ── Inline Music Player ───────────────────────────────────────────────────────
function InlineMusicPlayer() {
  const { t, playing, toggleMusic } = useContext(LangContext)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(0.55)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const onMeta = () => setDuration(audio.duration)
    const onTime = () => {
      setCurrentTime(audio.currentTime)
      if (audio.duration) setProgress(audio.currentTime / audio.duration * 100)
    }
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('timeupdate', onTime)
    return () => { audio.removeEventListener('loadedmetadata', onMeta); audio.removeEventListener('timeupdate', onTime) }
  }, [])

  const seek = (e) => {
    if (!audio.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration
  }

  const changeVol = (e) => {
    const v = parseFloat(e.target.value)
    setVolume(v); audio.volume = v
  }

  const fmt = s => !s || isNaN(s) ? '0:00' : `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`

  return (
    <div style={{
      width:'100%', maxWidth:'360px',
      background:'var(--white)',
      border:'1px solid var(--border)',
      borderRadius:'2px',
      padding:'20px 24px',
      boxShadow:'0 2px 24px rgba(0,0,0,0.04)',
    }}>
      {/* Song row */}
      <div style={{ display:'flex', alignItems:'center', gap:'14px', marginBottom:'16px' }}>
        {/* Vinyl */}
        <div style={{
          width:'44px', height:'44px', borderRadius:'50%', flexShrink:0,
          background:'conic-gradient(from 0deg, var(--text-dark) 0%, #5a4a3a 25%, var(--text-dark) 50%, #3a2a1a 75%, var(--text-dark) 100%)',
          display:'flex', alignItems:'center', justifyContent:'center',
          animation: playing ? 'spin-slow 4s linear infinite' : 'none',
          boxShadow:'0 2px 8px rgba(0,0,0,0.12)'
        }}>
          <div style={{ width:'12px', height:'12px', borderRadius:'50%', background:'var(--cream)' }} />
        </div>

        <div style={{ flex:1, textAlign:'left' }}>
          <p style={{ fontSize:'12px', letterSpacing:'1px', color:'var(--text-dark)', marginBottom:'3px' }}>
            Махаббат деген қандай
          </p>
          <p style={{ fontSize:'10px', letterSpacing:'2px', color:'var(--text-light)', textTransform:'lowercase' }}>
            {t.music}
          </p>
        </div>

        {/* Play button */}
        <button onClick={toggleMusic} style={{
          width:'40px', height:'40px', borderRadius:'50%', flexShrink:0,
          background: playing ? 'var(--text-dark)' : 'var(--white)',
          border:`1px solid ${playing ? 'var(--text-dark)' : 'var(--line)'}`,
          cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:'14px', color: playing ? 'var(--white)' : 'var(--text-dark)',
          transition:'all 0.3s ease',
          animation: playing ? 'pulse-gold 2.5s ease infinite' : 'none'
        }}>
          {playing ? '⏸' : '▶'}
        </button>
      </div>

      {/* Progress bar */}
      <div onClick={seek} style={{ height:'3px', borderRadius:'2px', background:'var(--gold-pale)', cursor:'pointer', marginBottom:'8px', position:'relative' }}>
        <div style={{ height:'100%', borderRadius:'2px', width:`${progress}%`, background:'var(--text-dark)', transition:'width 0.5s linear', position:'relative' }}>
          <div style={{ position:'absolute', right:'-5px', top:'-4px', width:'11px', height:'11px', borderRadius:'50%', background:'var(--text-dark)' }} />
        </div>
      </div>

      {/* Time + Volume */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span style={{ fontSize:'9px', letterSpacing:'1px', color:'var(--text-light)' }}>
          {fmt(currentTime)} / {fmt(duration)}
        </span>
        <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
          <span style={{ fontSize:'11px' }}>{volume===0?'🔇':volume<0.5?'🔉':'🔊'}</span>
          <input type="range" min="0" max="1" step="0.05" value={volume} onChange={changeVol}
            style={{ width:'60px', accentColor:'var(--text-dark)', cursor:'pointer' }} />
        </div>
      </div>
    </div>
  )
}

// ── Countdown ─────────────────────────────────────────────────────────────────
function CountdownSection() {
  const { t } = useContext(LangContext)
  return (
    <section id="countdown" style={{ padding:'80px 20px', background:'var(--ivory)' }}>
      <div style={{ maxWidth:'700px', margin:'0 auto', textAlign:'center' }}>
        <SectionLabel>{t.countdown.label}</SectionLabel>
        <Countdown targetDate="2026-06-28T18:00:00" />
      </div>
    </section>
  )
}

// ── Schedule ──────────────────────────────────────────────────────────────────
function ScheduleSection() {
  const { t } = useContext(LangContext)
  const photos = ['./photo1.jpg','./photo2.jpg','./couple.jpg']

  return (
    <section id="schedule" style={{ padding:'80px 20px', background:'var(--cream)' }}>
      <div style={{ maxWidth:'680px', margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:'60px' }}>
          <SectionLabel>{t.schedule.label}</SectionLabel>
          <h2 className="display-font" style={{ fontSize:'clamp(22px,4vw,36px)', fontWeight:300, color:'var(--text-dark)', letterSpacing:'3px', textTransform:'lowercase' }}>
            {t.schedule.title}
          </h2>
        </div>

        {/* Minimal two-column: icon+line | text — alternating photo */}
        <div style={{ position:'relative' }}>
          {/* Center vertical line */}
          <div style={{
            position:'absolute', left:'50%', top:0, bottom:0,
            width:'1px', background:'var(--line)',
            transform:'translateX(-50%)',
            animation:'line-grow 1.5s ease both'
          }} />

          {t.schedule.items.map((item, i) => {
            const isLeft = i % 2 === 0
            return (
              <div key={i} style={{
                display:'grid',
                gridTemplateColumns:'1fr 60px 1fr',
                alignItems:'center',
                marginBottom: i < t.schedule.items.length-1 ? '56px' : '0',
                animation:'fadeInUp 0.8s ease both',
                animationDelay:`${i*0.2}s`
              }}>

                {/* Left */}
                <div style={{ display:'flex', justifyContent:'flex-end', paddingRight:'32px' }}>
                  {isLeft
                    ? <ScheduleTextCard item={item} align="right" />
                    : <SchedulePhoto src={photos[i]} />
                  }
                </div>

                {/* Center dot */}
                <div style={{ display:'flex', justifyContent:'center', alignItems:'center' }}>
                  <div style={{
                    width:'10px', height:'10px', borderRadius:'50%',
                    background:'var(--gold)',
                    boxShadow:'0 0 0 4px var(--cream), 0 0 0 5px var(--line)',
                    zIndex:2
                  }} />
                </div>

                {/* Right */}
                <div style={{ display:'flex', justifyContent:'flex-start', paddingLeft:'32px' }}>
                  {isLeft
                    ? <SchedulePhoto src={photos[i]} />
                    : <ScheduleTextCard item={item} align="left" />
                  }
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ScheduleTextCard({ item, align }) {
  return (
    <div style={{ maxWidth:'240px', width:'100%', textAlign: align }}>
      <p className="display-font" style={{
        fontSize:'clamp(28px,5vw,40px)', fontWeight:300,
        color:'var(--gold)', letterSpacing:'2px', lineHeight:1,
        marginBottom:'10px'
      }}>{item.time}</p>
      <p style={{ fontSize:'14px', fontWeight:500, color:'var(--text-dark)', letterSpacing:'1px', marginBottom:'6px' }}>
        {item.title}
      </p>
      <p style={{ fontSize:'11px', color:'var(--text-light)', lineHeight:1.7, letterSpacing:'0.3px' }}>
        {item.desc}
      </p>
    </div>
  )
}

function SchedulePhoto({ src }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div style={{
      width:'clamp(120px,25vw,200px)',
      height:'clamp(150px,30vw,240px)',
      borderRadius:'2px',
      overflow:'hidden',
      background:'var(--gold-pale)',
      flexShrink:0
    }}>
      <img src={src} alt="" onLoad={()=>setLoaded(true)}
        style={{
          width:'100%', height:'100%', objectFit:'cover', display:'block',
          opacity: loaded ? 1 : 0, transition:'opacity 0.5s ease',
          filter:'brightness(1.02) saturate(0.92)'
        }}
      />
    </div>
  )
}

// ── Details cards ─────────────────────────────────────────────────────────────
function DetailsSection() {
  const { t } = useContext(LangContext)
  return (
    <section style={{ padding:'60px 20px', background:'var(--ivory)' }}>
      <div style={{ maxWidth:'600px', margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:'40px' }}>
          <SectionLabel>{t.details.label}</SectionLabel>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1px', background:'var(--border)' }}>
          {[
            { icon:'◦', label:t.details.date,  value:t.details.dateVal  },
            { icon:'◦', label:t.details.time,  value:t.details.timeVal  },
            { icon:'◦', label:t.details.place, value:t.details.placeVal },
          ].map((item,i) => (
            <div key={i} style={{ padding:'28px 20px', background:'var(--cream)', textAlign:'center' }}>
              <p style={{ fontSize:'9px', letterSpacing:'3px', textTransform:'lowercase', color:'var(--text-light)', marginBottom:'10px' }}>{item.label}</p>
              <p className="display-font" style={{ fontSize:'clamp(14px,3vw,18px)', color:'var(--text-dark)', letterSpacing:'1px' }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Calendar ──────────────────────────────────────────────────────────────────
function CalendarSection() {
  const { t } = useContext(LangContext)
  return (
    <section style={{ padding:'60px 20px', background:'var(--cream)' }}>
      <div style={{ maxWidth:'480px', margin:'0 auto', textAlign:'center' }}>
        <SectionLabel>{t.calendar.label}</SectionLabel>
        <Calendar weddingDate="2026-06-28" />
      </div>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  const { t } = useContext(LangContext)
  return (
    <footer style={{ padding:'64px 20px', background:'var(--cream)', textAlign:'center', borderTop:'1px solid var(--border)' }}>
      <div style={{ width:'1px', height:'48px', background:'linear-gradient(to bottom, transparent, var(--line))', margin:'0 auto 24px' }} />
      <p className="display-font" style={{ fontSize:'clamp(36px,8vw,64px)', fontWeight:300, letterSpacing:'14px', color:'var(--text-dark)', marginBottom:'16px' }}>
        Р ✦ Ж
      </p>
      <p style={{ fontSize:'10px', letterSpacing:'4px', color:'var(--text-light)' }}>{t.footer}</p>
      <div style={{ width:'1px', height:'48px', background:'linear-gradient(to bottom, var(--line), transparent)', margin:'24px auto 0' }} />
    </footer>
  )
}

// ── Utility ───────────────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <p style={{
      fontSize:'9px', letterSpacing:'5px', textTransform:'lowercase',
      color:'var(--text-light)', marginBottom:'16px',
      display:'flex', alignItems:'center', justifyContent:'center', gap:'12px'
    }}>
      <span style={{ display:'inline-block', width:'24px', height:'1px', background:'var(--line)' }} />
      {children}
      <span style={{ display:'inline-block', width:'24px', height:'1px', background:'var(--line)' }} />
    </p>
  )
}