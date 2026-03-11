import React, { useState, useEffect, useRef, createContext, useContext } from 'react'
import KazakhOrnament from './components/KazakhOrnament'
import Countdown from './components/Countdown'
import MapSection from './components/MapSection'
import RSVPForm from './components/RSVPForm'
import Calendar from './components/Calendar'
import Petals from './components/Petals'
import { translations } from './lang'

export const LangContext = createContext()

// ─── Global audio instance ────────────────────────────────────────────────────
const audio = new Audio('./music/mahabbat.mp3')
audio.loop = true
audio.volume = 0.5

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
        <StorySection />
        <CalendarSection />
        <MapSection />
        <RSVPForm />
        <Footer />
      </div>
    </LangContext.Provider>
  )
}

// ─── Language Switch ──────────────────────────────────────────────────────────
function LangSwitch() {
  const { lang, setLang } = useContext(LangContext)
  return (
    <div style={{ display:'flex', gap:'2px', background:'rgba(201,168,76,0.1)', borderRadius:'20px', padding:'3px', border:'1px solid rgba(201,168,76,0.25)' }}>
      {['kz','ru'].map(l => (
        <button key={l} onClick={() => setLang(l)} style={{
          padding:'4px 12px', borderRadius:'16px', border:'none', cursor:'pointer',
          fontSize:'11px', fontFamily:"'Raleway',sans-serif", fontWeight:600,
          letterSpacing:'1px', textTransform:'uppercase',
          background: lang===l ? 'linear-gradient(135deg,var(--gold),var(--gold-light))' : 'transparent',
          color: lang===l ? 'white' : 'var(--text-light)',
          transition:'all 0.3s ease',
          boxShadow: lang===l ? '0 2px 8px rgba(201,168,76,0.3)' : 'none'
        }}>{l==='kz'?'ҚАЗ':'РУС'}</button>
      ))}
    </div>
  )
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav({ scrolled }) {
  const { t } = useContext(LangContext)
  return (
    <nav style={{
      position:'fixed', top:0, left:0, right:0, zIndex:200,
      padding:'10px 24px',
      background: scrolled ? 'rgba(253,248,242,0.97)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      transition:'all 0.4s ease',
      display:'flex', justifyContent:'center', alignItems:'center', gap:'20px', flexWrap:'wrap'
    }}>
      {[
        { label: t.nav.home, href:'#hero' },
        { label: t.nav.time, href:'#countdown' },
        { label: t.nav.schedule, href:'#schedule' },
        { label: t.nav.place, href:'#map' },
        { label: t.nav.rsvp, href:'#rsvp' },
      ].map(item => (
        <a key={item.href} href={item.href} style={{
          fontFamily:"'Raleway',sans-serif", fontWeight:400, fontSize:'12px',
          letterSpacing:'2px', textTransform:'uppercase',
          color:'var(--text-mid)', textDecoration:'none', transition:'color 0.3s',
        }}
        onMouseEnter={e=>e.target.style.color='var(--gold)'}
        onMouseLeave={e=>e.target.style.color='var(--text-mid)'}
        >{item.label}</a>
      ))}
      <LangSwitch />
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  const { t, playing, toggleMusic } = useContext(LangContext)
  return (
    <section id="hero" style={{
      minHeight:'100vh', display:'flex', flexDirection:'column',
      alignItems:'center', position:'relative', overflow:'hidden',
      background:'var(--cream)'
    }}>
      {/* Full bleed photo */}
      <div style={{
        width:'100%', maxHeight:'70vh', overflow:'hidden',
        position:'relative',
        boxShadow:'0 20px 60px rgba(0,0,0,0.1)'
      }}>
        <img
          src="./couple.jpg"
          alt="Р & Ж"
          style={{
            width:'100%', height:'70vh', objectFit:'cover', objectPosition:'center top',
            display:'block',
            animation:'fadeIn 1.5s ease both',
            filter:'brightness(0.95) contrast(1.05)'
          }}
        />
        {/* Subtle vignette */}
        <div style={{
          position:'absolute', inset:0,
          background:'linear-gradient(to bottom, transparent 50%, rgba(253,248,242,0.6) 85%, var(--cream) 100%)'
        }}/>

        {/* Top ornament over photo */}
        <div style={{ position:'absolute', top:0, left:0, right:0, animation:'fadeIn 2s ease 0.5s both' }}>
          <KazakhOrnament type="band" color="var(--gold)" opacity={0.45} />
        </div>
      </div>

      {/* Below photo content */}
      <div style={{
        width:'100%', maxWidth:'700px', textAlign:'center',
        padding:'0 24px 80px',
        display:'flex', flexDirection:'column', alignItems:'center',
        position:'relative', zIndex:2
      }}>
        {/* Invite label */}
        <p style={{
          letterSpacing:'6px', fontSize:'10px', textTransform:'uppercase',
          color:'var(--gold)', marginTop:'32px', marginBottom:'20px',
          animation:'fadeInUp 1s ease 0.4s both'
        }}>{t.hero.invite}</p>

        {/* R & Ж — Antarctic font */}
        <div style={{ animation:'fadeInUp 1s ease 0.6s both', marginBottom:'16px' }}>
          <h1 style={{
            fontFamily:'Antarctic, "Cormorant Garamond", serif',
            fontSize:'clamp(72px, 16vw, 140px)',
            fontWeight:400,
            letterSpacing:'8px',
            lineHeight:1,
            color:'var(--text-dark)',
          }}>
            <span style={{ color:'var(--brown)' }}>Р</span>
            <span style={{ color:'var(--gold)', margin:'0 12px', fontSize:'0.6em', verticalAlign:'middle' }}>✦</span>
            <span style={{ color:'var(--rose)' }}>Ж</span>
          </h1>
        </div>

        {/* Date pill */}
        <div style={{
          display:'inline-flex', alignItems:'center', gap:'14px',
          background:'rgba(253,248,242,0.9)',
          border:'1px solid var(--border)', borderRadius:'60px',
          padding:'12px 32px', marginBottom:'10px',
          boxShadow:'0 4px 20px rgba(201,168,76,0.1)',
          animation:'fadeInUp 1s ease 0.8s both'
        }}>
          <KazakhOrnament type="star" color="var(--gold)" size={13} />
          <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'20px', letterSpacing:'3px', color:'var(--text-mid)' }}>
            {t.hero.date}
          </span>
          <KazakhOrnament type="star" color="var(--gold)" size={13} />
        </div>

        <p style={{ fontSize:'11px', letterSpacing:'4px', color:'var(--text-light)', textTransform:'uppercase', marginBottom:'28px', animation:'fadeInUp 1s ease 0.9s both' }}>
          {t.hero.day}
        </p>

        {/* ── MUSIC PLAYER inline ── */}
        <InlineMusicPlayer />

        {/* Quote */}
        <p style={{
          fontFamily:"'Cormorant Garamond',serif",
          fontSize:'18px', fontStyle:'italic',
          color:'var(--text-light)', lineHeight:2,
          marginTop:'28px',
          animation:'fadeInUp 1s ease 1.2s both'
        }}>{t.hero.quote}</p>

        {/* Bottom ornament */}
        <div style={{ width:'100%', marginTop:'32px', animation:'fadeIn 2s ease 1s both' }}>
          <KazakhOrnament type="band" color="var(--gold)" opacity={0.4} />
        </div>
      </div>

      {/* Scroll arrow */}
      <div style={{ position:'absolute', bottom:'24px', zIndex:2, display:'flex', flexDirection:'column', alignItems:'center', gap:'6px', animation:'fadeIn 2s ease 2s both' }}>
        <div style={{ width:'1px', height:'40px', background:'linear-gradient(to bottom, transparent, var(--gold))' }} />
        <span style={{ fontSize:'14px', color:'var(--gold)', opacity:0.7 }}>↓</span>
      </div>
    </section>
  )
}

// ─── Inline Music Player ──────────────────────────────────────────────────────
function InlineMusicPlayer() {
  const { t, playing, toggleMusic } = useContext(LangContext)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(0.5)
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

  const fmt = (s) => !s || isNaN(s) ? '0:00' : `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`

  return (
    <div style={{
      width:'100%', maxWidth:'420px',
      background:'rgba(255,255,255,0.85)',
      backdropFilter:'blur(12px)',
      border:'1px solid var(--border)',
      borderRadius:'20px',
      padding:'20px 24px',
      boxShadow:'0 8px 40px rgba(201,168,76,0.12)',
      animation:'fadeInUp 1s ease 1s both',
      position:'relative', overflow:'hidden'
    }}>
      {/* Top gold line */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:'3px', background:'linear-gradient(to right, var(--gold), var(--rose-light), var(--gold))' }} />

      {/* Song info row */}
      <div style={{ display:'flex', alignItems:'center', gap:'14px', marginBottom:'16px' }}>
        {/* Vinyl disc */}
        <div style={{
          width:'52px', height:'52px', borderRadius:'50%', flexShrink:0,
          background:'conic-gradient(from 0deg, var(--gold), var(--rose-light), var(--gold-pale), var(--brown), var(--gold))',
          display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow:'0 4px 16px rgba(201,168,76,0.3)',
          animation: playing ? 'spin-slow 3s linear infinite' : 'none',
          transition:'animation 0.3s'
        }}>
          <div style={{ width:'16px', height:'16px', borderRadius:'50%', background:'var(--cream)', border:'2px solid rgba(201,168,76,0.4)' }} />
        </div>

        <div style={{ flex:1, textAlign:'left' }}>
          <p style={{ fontSize:'14px', fontWeight:600, color:'var(--text-dark)', marginBottom:'3px', letterSpacing:'0.5px' }}>
            {translations.kz.music.title}
          </p>
          <p style={{ fontSize:'11px', color:'var(--gold)', letterSpacing:'1px' }}>
            {playing ? '♪ Ойнауда...' : '♪ ' + translations.kz.music.sub}
          </p>
        </div>

        {/* Play/Pause big button */}
        <button onClick={toggleMusic} style={{
          width:'52px', height:'52px', borderRadius:'50%',
          background:'linear-gradient(135deg, var(--gold), var(--gold-light))',
          border:'none', cursor:'pointer', flexShrink:0,
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:'22px', color:'white',
          boxShadow: playing ? '0 0 0 6px rgba(201,168,76,0.2), 0 4px 16px rgba(201,168,76,0.4)' : '0 4px 16px rgba(201,168,76,0.3)',
          transition:'all 0.3s ease',
          animation: playing ? 'pulse-gold 2s ease infinite' : 'none'
        }}>
          {playing ? '⏸' : '▶'}
        </button>
      </div>

      {/* Progress bar */}
      <div onClick={seek} style={{ height:'5px', borderRadius:'3px', background:'var(--gold-pale)', cursor:'pointer', marginBottom:'8px', position:'relative' }}>
        <div style={{ height:'100%', borderRadius:'3px', width:`${progress}%`, background:'linear-gradient(to right, var(--gold), var(--rose-light))', transition:'width 0.5s linear', position:'relative' }}>
          <div style={{ position:'absolute', right:'-6px', top:'-4px', width:'13px', height:'13px', borderRadius:'50%', background:'var(--gold)', boxShadow:'0 1px 4px rgba(201,168,76,0.6)' }} />
        </div>
      </div>

      {/* Time + Volume */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span style={{ fontSize:'10px', color:'var(--text-light)' }}>{fmt(currentTime)} / {fmt(duration)}</span>
        <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
          <span style={{ fontSize:'12px' }}>{volume===0?'🔇':volume<0.5?'🔉':'🔊'}</span>
          <input type="range" min="0" max="1" step="0.05" value={volume} onChange={changeVol}
            style={{ width:'70px', accentColor:'var(--gold)', cursor:'pointer' }} />
        </div>
      </div>
    </div>
  )
}

// ─── Countdown ────────────────────────────────────────────────────────────────
function CountdownSection() {
  const { t } = useContext(LangContext)
  return (
    <section id="countdown" style={{ padding:'80px 20px', background:'var(--ivory)', position:'relative', overflow:'hidden' }}>
      <div style={{ maxWidth:'900px', margin:'0 auto', textAlign:'center' }}>
        <KazakhOrnament type="corner-set" color="var(--gold)" opacity={0.2} />
        <p style={{ letterSpacing:'5px', fontSize:'11px', textTransform:'uppercase', color:'var(--gold)', marginBottom:'12px' }}>{t.countdown.label}</p>
        <h2 style={{ fontSize:'clamp(28px,5vw,48px)', fontWeight:300, color:'var(--text-dark)', marginBottom:'48px', fontStyle:'italic' }}>{t.countdown.title}</h2>
        <Countdown targetDate="2026-06-28T18:00:00" />
      </div>
    </section>
  )
}

// ─── Schedule ─────────────────────────────────────────────────────────────────
// Decorative placeholder images for each schedule item
const SCHEDULE_IMGS = [
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80',  // wedding veil / ceremony
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80',  // champagne glasses
  'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80',  // wedding cake
]

function ScheduleSection() {
  const { t } = useContext(LangContext)
  return (
    <section id="schedule" style={{ padding:'80px 20px', background:'var(--cream)', position:'relative' }}>
      <div style={{ maxWidth:'900px', margin:'0 auto' }}>
        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:'60px' }}>
          <KazakhOrnament type="divider" color="var(--gold)" />
          <p style={{ letterSpacing:'5px', fontSize:'11px', textTransform:'uppercase', color:'var(--gold)', marginBottom:'12px', marginTop:'32px' }}>{t.schedule.label}</p>
          <h2 style={{ fontSize:'clamp(28px,5vw,48px)', fontWeight:300, fontStyle:'italic', color:'var(--text-dark)' }}>{t.schedule.title}</h2>
        </div>

        {/* Timeline items */}
        <div style={{ display:'flex', flexDirection:'column', gap:'0' }}>
          {t.schedule.items.map((item, i) => (
            <ScheduleItem key={i} item={item} index={i} imgSrc={SCHEDULE_IMGS[i]} isLast={i === t.schedule.items.length - 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ScheduleItem({ item, index, imgSrc, isLast }) {
  const isLeft = index % 2 === 0

  return (
    <div style={{
      display:'grid',
      gridTemplateColumns: isLeft ? '1fr 60px 1fr' : '1fr 60px 1fr',
      gap:'0',
      alignItems:'stretch',
      minHeight:'220px'
    }}>
      {/* Left side */}
      <div style={{
        display:'flex', justifyContent: isLeft ? 'flex-end' : 'flex-start',
        alignItems:'center', padding:'16px 24px 16px 0',
        animation:'fadeInUp 0.8s ease both',
        animationDelay: `${index * 0.15}s`
      }}>
        {isLeft ? (
          <ScheduleCard item={item} align="right" />
        ) : (
          <SchedulePhoto src={imgSrc} alt={item.title} />
        )}
      </div>

      {/* Center timeline */}
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', position:'relative' }}>
        {/* Vertical line top */}
        {index > 0 && <div style={{ width:'1px', flex:'1', background:'linear-gradient(to bottom, var(--border), rgba(201,168,76,0.5))' }} />}
        {index === 0 && <div style={{ flex:'1' }} />}

        {/* Dot */}
        <div style={{
          width:'44px', height:'44px', borderRadius:'50%', flexShrink:0,
          background:'linear-gradient(135deg, var(--gold), var(--gold-light))',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:'20px', zIndex:2,
          boxShadow:'0 0 0 6px rgba(201,168,76,0.12), 0 4px 16px rgba(201,168,76,0.3)',
          animation:'glow-pulse 3s ease infinite',
          animationDelay: `${index * 0.5}s`
        }}>
          {item.emoji}
        </div>

        {/* Vertical line bottom */}
        {!isLast && <div style={{ width:'1px', flex:'1', background:'linear-gradient(to bottom, rgba(201,168,76,0.5), var(--border))' }} />}
        {isLast && <div style={{ flex:'1' }} />}
      </div>

      {/* Right side */}
      <div style={{
        display:'flex', justifyContent: isLeft ? 'flex-start' : 'flex-end',
        alignItems:'center', padding:'16px 0 16px 24px',
        animation:'fadeInUp 0.8s ease both',
        animationDelay: `${index * 0.15 + 0.1}s`
      }}>
        {isLeft ? (
          <SchedulePhoto src={imgSrc} alt={item.title} />
        ) : (
          <ScheduleCard item={item} align="left" />
        )}
      </div>
    </div>
  )
}

function ScheduleCard({ item, align }) {
  return (
    <div style={{
      maxWidth:'280px', width:'100%',
      background:'var(--white)',
      border:'1px solid var(--border)',
      borderRadius:'8px',
      padding:'24px',
      textAlign: align,
      position:'relative', overflow:'hidden',
      boxShadow:'0 4px 24px rgba(201,168,76,0.08)',
      transition:'transform 0.3s ease, box-shadow 0.3s ease'
    }}
    onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 12px 40px rgba(201,168,76,0.15)' }}
    onMouseLeave={e=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 4px 24px rgba(201,168,76,0.08)' }}
    >
      <div style={{
        position:'absolute', top:0, left:0, right:0, height:'3px',
        background:'linear-gradient(to right, var(--gold), var(--rose-light))'
      }} />
      <p style={{
        fontFamily:'Antarctic,"Cormorant Garamond",serif',
        fontSize:'32px', color:'var(--gold)', letterSpacing:'2px',
        marginBottom:'8px', fontWeight:400
      }}>{item.time}</p>
      <h3 style={{
        fontFamily:"'Cormorant Garamond',serif",
        fontSize:'22px', fontWeight:500,
        color:'var(--text-dark)', marginBottom:'8px'
      }}>{item.title}</h3>
      <p style={{ fontSize:'13px', color:'var(--text-light)', lineHeight:1.7 }}>{item.desc}</p>
    </div>
  )
}

function SchedulePhoto({ src, alt }) {
  return (
    <div style={{
      maxWidth:'260px', width:'100%', height:'180px',
      borderRadius:'8px', overflow:'hidden',
      border:'1px solid var(--border)',
      boxShadow:'0 4px 24px rgba(0,0,0,0.08)',
      position:'relative'
    }}>
      <img src={src} alt={alt} style={{
        width:'100%', height:'100%', objectFit:'cover', display:'block',
        filter:'sepia(15%) saturate(90%)',
        transition:'transform 0.5s ease'
      }}
      onMouseEnter={e=>e.target.style.transform='scale(1.05)'}
      onMouseLeave={e=>e.target.style.transform='scale(1)'}
      onError={e=>{
        e.target.style.display='none'
        e.target.parentElement.style.background='linear-gradient(135deg, var(--gold-pale), var(--rose-pale))'
        e.target.parentElement.style.display='flex'
        e.target.parentElement.style.alignItems='center'
        e.target.parentElement.style.justifyContent='center'
        e.target.parentElement.innerHTML='<span style="font-size:40px">✨</span>'
      }}
      />
      {/* overlay */}
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, transparent 60%, rgba(253,248,242,0.3) 100%)' }} />
    </div>
  )
}

// ─── Story cards ──────────────────────────────────────────────────────────────
function StorySection() {
  const { t } = useContext(LangContext)
  return (
    <section style={{ padding:'80px 20px', background:'var(--ivory)', position:'relative' }}>
      <div style={{ maxWidth:'700px', margin:'0 auto', textAlign:'center' }}>
        <KazakhOrnament type="divider" color="var(--gold)" />
        <p style={{ letterSpacing:'5px', fontSize:'11px', textTransform:'uppercase', color:'var(--gold)', marginBottom:'12px', marginTop:'40px' }}>{t.story.label}</p>
        <h2 style={{ fontSize:'clamp(28px,5vw,48px)', fontWeight:300, fontStyle:'italic', color:'var(--text-dark)', marginBottom:'28px' }}>{t.story.title}</h2>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'20px', lineHeight:2, color:'var(--text-mid)', fontStyle:'italic', marginBottom:'12px' }}>
          {t.story.text1}<br/>{t.story.text2}
        </p>
        <div style={{ margin:'40px 0' }}>
          <KazakhOrnament type="full-border" color="var(--gold)" opacity={0.2} />
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:'20px' }}>
          {[
            { icon:'📅', label:t.story.date, value:t.story.dateVal },
            { icon:'🕕', label:t.story.time, value:t.story.timeVal },
            { icon:'📍', label:t.story.place, value:t.story.placeVal },
          ].map((item, i) => (
            <div key={i} style={{ padding:'28px 20px', background:'var(--white)', border:'1px solid var(--border)', borderRadius:'4px', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:'3px', background:'linear-gradient(to right, var(--gold), var(--rose-light))' }} />
              <div style={{ fontSize:'28px', marginBottom:'12px' }}>{item.icon}</div>
              <p style={{ fontSize:'11px', letterSpacing:'3px', textTransform:'uppercase', color:'var(--gold)', marginBottom:'6px' }}>{item.label}</p>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'20px', color:'var(--text-dark)' }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Calendar ─────────────────────────────────────────────────────────────────
function CalendarSection() {
  const { t } = useContext(LangContext)
  return (
    <section style={{ padding:'60px 20px 80px', background:'var(--cream)' }}>
      <div style={{ maxWidth:'600px', margin:'0 auto', textAlign:'center' }}>
        <p style={{ letterSpacing:'5px', fontSize:'11px', textTransform:'uppercase', color:'var(--gold)', marginBottom:'12px' }}>{t.calendar.label}</p>
        <h2 style={{ fontSize:'clamp(26px,4vw,42px)', fontWeight:300, fontStyle:'italic', color:'var(--text-dark)', marginBottom:'40px' }}>{t.calendar.title}</h2>
        <Calendar weddingDate="2026-06-28" />
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const { t } = useContext(LangContext)
  return (
    <footer style={{ padding:'60px 20px', background:'var(--cream)', textAlign:'center', borderTop:'1px solid var(--border)' }}>
      <KazakhOrnament type="band" color="var(--gold)" opacity={0.4} />
      <div style={{ marginTop:'32px' }}>
        <p style={{
          fontFamily:'Antarctic,"Cormorant Garamond",serif',
          fontSize:'clamp(28px,6vw,52px)',
          color:'var(--text-mid)', marginBottom:'12px', letterSpacing:'6px'
        }}>Р ✦ Ж</p>
        <p style={{ fontSize:'13px', color:'var(--text-light)', letterSpacing:'3px' }}>{t.footer.date}</p>
        <div style={{ marginTop:'20px', display:'flex', justifyContent:'center' }}>
          <KazakhOrnament type="diamond" color="var(--gold)" size={18} />
        </div>
      </div>
    </footer>
  )
}