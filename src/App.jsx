import React, { useState, useEffect, useRef, createContext, useContext } from 'react'
import KazakhOrnament from './components/KazakhOrnament'
import Countdown from './components/Countdown'
import MapSection from './components/MapSection'
import RSVPForm from './components/RSVPForm'
import Calendar from './components/Calendar'
import Petals from './components/Petals'
import { translations } from './lang'

export const LangContext = createContext()

// ── Audio ──────────────────────────────────────────────────────────────────────
const audio = new Audio('./music/mahabbat.mp3')
audio.loop = true
audio.volume = 0.6

const tryAutoPlay = () => {
  audio.play().catch(() => {
    const unlock = () => { audio.play().catch(()=>{}) }
    document.addEventListener('click',    unlock, { once:true })
    document.addEventListener('touchstart', unlock, { once:true })
    document.addEventListener('scroll',   unlock, { once:true })
  })
}
tryAutoPlay()

// ── App ────────────────────────────────────────────────────────────────────────
export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [lang, setLang]         = useState('kz')
  const [playing, setPlaying]   = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  useEffect(() => {
    const onPlay  = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    audio.addEventListener('play',  onPlay)
    audio.addEventListener('pause', onPause)
    return () => {
      audio.removeEventListener('play',  onPlay)
      audio.removeEventListener('pause', onPause)
    }
  }, [])

  const toggleMusic = () => {
    if (playing) { audio.pause() } else { audio.play().catch(()=>{}) }
  }

  const t = translations[lang]

  return (
    <LangContext.Provider value={{ lang, t, setLang, playing, toggleMusic }}>
      <div style={{ background:'var(--cream)', minHeight:'100vh' }}>
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
    <div style={{ display:'flex', gap:'2px' }}>
      {['kz','ru'].map(l => (
        <button key={l} onClick={() => setLang(l)} style={{
          padding:'5px 10px', border:'none', cursor:'pointer', background:'transparent',
          fontSize:'10px', fontFamily:'inherit', letterSpacing:'2px', textTransform:'uppercase',
          color: lang===l ? (dark ? 'var(--text-dark)' : 'white') : 'rgba(255,255,255,0.5)',
          fontWeight: lang===l ? 600 : 400,
          borderBottom: lang===l ? `1px solid ${dark ? 'var(--text-dark)' : 'rgba(255,255,255,0.7)'}` : '1px solid transparent',
          transition:'all 0.3s',
        }}>{l==='kz'?'қаз':'рус'}</button>
      ))}
    </div>
  )
}

// ── Nav ────────────────────────────────────────────────────────────────────────
function Nav({ scrolled }) {
  const { t } = useContext(LangContext)
  return (
    <nav style={{
      position:'fixed', top:0, left:0, right:0, zIndex:300,
      padding:'14px 28px',
      background: scrolled ? 'rgba(250,250,248,0.96)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      transition:'all 0.5s ease',
      display:'flex', justifyContent:'space-between', alignItems:'center',
    }}>
      <div style={{ display:'flex', gap:'24px', alignItems:'center' }}>
        {[
          { l:t.nav.home,     h:'#hero'     },
          { l:t.nav.schedule, h:'#schedule' },
          { l:t.nav.place,    h:'#map'      },
          { l:t.nav.rsvp,     h:'#rsvp'     },
        ].map(item => (
          <a key={item.h} href={item.h} style={{
            fontSize:'10px', letterSpacing:'2px', textTransform:'lowercase',
            color: scrolled ? 'var(--text-mid)' : 'rgba(255,255,255,0.85)',
            textDecoration:'none', transition:'color 0.3s',
          }}
          onMouseEnter={e => e.target.style.color = scrolled ? 'var(--gold)' : 'white'}
          onMouseLeave={e => e.target.style.color = scrolled ? 'var(--text-mid)' : 'rgba(255,255,255,0.85)'}
          >{item.l}</a>
        ))}
      </div>
      <LangSwitch dark={scrolled} />
    </nav>
  )
}

// ── Hero ───────────────────────────────────────────────────────────────────────
function HeroSection() {
  const { t, playing, toggleMusic } = useContext(LangContext)

  return (
    <section id="hero" style={{ background:'var(--cream)' }}>

      {/* ── PHOTO BLOCK with overlays ── */}
      <div style={{ position:'relative', width:'100%', height:'100svh', minHeight:'600px', overflow:'hidden' }}>

        {/* Background photo */}
        <img src="./photo1.jpg" alt=""
          style={{
            position:'absolute', inset:0,
            width:'100%', height:'100%',
            objectFit:'cover', objectPosition:'center',
            animation:'fadeIn 2s ease both',
          }}
        />

        {/* Dark overlay — top heavy for text readability */}
        <div style={{
          position:'absolute', inset:0,
          background:'linear-gradient(to bottom, rgba(20,15,10,0.45) 0%, rgba(20,15,10,0.1) 45%, rgba(20,15,10,0.15) 60%, rgba(250,250,248,0) 100%)',
        }} />

        {/* Bottom fade into cream */}
        <div style={{
          position:'absolute', bottom:0, left:0, right:0, height:'35%',
          background:'linear-gradient(to bottom, transparent, var(--cream))',
        }} />

        {/* ── NAMES — top of photo ── */}
        <div style={{
          position:'absolute', top:0, left:0, right:0,
          display:'flex', flexDirection:'column', alignItems:'center',
          paddingTop:'80px',
          animation:'fadeInUp 1.2s ease 0.3s both',
        }}>
          <h1 className="display-font" style={{
            fontSize:'clamp(56px, 16vw, 120px)',
            fontWeight:300,
            letterSpacing:'10px',
            color:'white',
            textShadow:'0 2px 24px rgba(0,0,0,0.35)',
            lineHeight:1,
            margin:0,
          }}>
            Р <span style={{ color:'rgba(255,255,255,0.6)', fontSize:'0.45em', verticalAlign:'middle', letterSpacing:0 }}>&amp;</span> Ж
          </h1>
          <p style={{
            marginTop:'10px',
            fontSize:'10px', letterSpacing:'6px', textTransform:'lowercase',
            color:'rgba(255,255,255,0.7)',
          }}>{t.hero.invite}</p>
        </div>

        {/* ── MUSIC BUTTON — center of photo ── */}
        <div style={{
          position:'absolute', top:'50%', left:'50%',
          transform:'translate(-50%, -50%)',
          display:'flex', flexDirection:'column', alignItems:'center', gap:'12px',
          animation:'fadeIn 2s ease 1s both',
        }}>
          {/* Rotating text ring around button */}
          <div style={{ position:'relative', width:'100px', height:'100px' }}>
            <svg viewBox="0 0 100 100" style={{
              position:'absolute', inset:0, width:'100%', height:'100%',
              animation:'spin-slow 8s linear infinite',
            }}>
              <defs>
                <path id="circle-path" d="M 50,50 m -34,0 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0" />
              </defs>
              <text style={{ fontSize:'7.5px', fill:'rgba(255,255,255,0.75)', letterSpacing:'2.2px', fontFamily:'Georgia,serif' }}>
                <textPath href="#circle-path">
                  МАХАББАТ · ДЕГЕН · ҚАНДАЙ · ТОЙ · МУЗЫКА ·
                </textPath>
              </text>
            </svg>

            {/* Play/Pause button */}
            <button onClick={toggleMusic} style={{
              position:'absolute', inset:'18px',
              borderRadius:'50%',
              background: 'rgba(255,255,255,0.15)',
              backdropFilter:'blur(8px)',
              border:'1.5px solid rgba(255,255,255,0.6)',
              cursor:'pointer',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'22px', color:'white',
              transition:'all 0.4s ease',
              boxShadow: playing ? '0 0 0 6px rgba(255,255,255,0.1)' : 'none',
            }}>
              <span style={{ marginLeft: playing ? 0 : '2px' }}>{playing ? '⏸' : '▶'}</span>
            </button>
          </div>
        </div>

        {/* ── DATE — bottom of photo, above fade ── */}
        <div style={{
          position:'absolute', bottom:'8%', left:0, right:0,
          textAlign:'center',
          animation:'fadeInUp 1s ease 0.8s both',
        }}>
          <p style={{
            fontSize:'11px', letterSpacing:'5px',
            color:'rgba(255,255,255,0.65)', textTransform:'lowercase',
          }}>{t.hero.day}</p>
        </div>
      </div>

      {/* ── NAMES + DATE — below photo ── */}
      <div style={{
        textAlign:'center',
        padding:'40px 24px 60px',
        display:'flex', flexDirection:'column', alignItems:'center', gap:'16px',
        animation:'fadeInUp 1s ease 1s both',
      }}>
        {/* Names script */}
        <p className="display-font" style={{
          fontSize:'clamp(28px, 8vw, 56px)',
          fontWeight:300, letterSpacing:'4px',
          color:'var(--text-dark)', lineHeight:1.2,
        }}>Райымбек <span style={{ color:'var(--gold)', fontSize:'0.6em' }}>&amp;</span> Жансая</p>

        {/* Date */}
        <p className="display-font" style={{
          fontSize:'clamp(20px, 5vw, 36px)',
          fontWeight:300, letterSpacing:'4px',
          color:'var(--text-mid)',
        }}>28.06.2026</p>

        {/* Ornament divider */}
        <div style={{ display:'flex', alignItems:'center', gap:'12px', margin:'4px 0' }}>
          <div style={{ width:'60px', height:'1px', background:'var(--line)' }} />
          <span style={{ color:'var(--gold)', fontSize:'14px' }}>✦</span>
          <div style={{ width:'60px', height:'1px', background:'var(--line)' }} />
        </div>

        {/* Invite subtitle */}
        <p style={{
          fontSize:'13px', fontStyle:'italic',
          color:'var(--text-light)', letterSpacing:'1px',
          fontFamily:"'Cormorant Garamond', Georgia, serif"
        }}>{t.hero.quote}</p>
      </div>
    </section>
  )
}

// ── Countdown ──────────────────────────────────────────────────────────────────
function CountdownSection() {
  const { t } = useContext(LangContext)
  return (
    <section id="countdown" style={{ padding:'64px 20px', background:'var(--ivory)' }}>
      <div style={{ maxWidth:'700px', margin:'0 auto', textAlign:'center' }}>
        <SectionLabel>{t.countdown.label}</SectionLabel>
        <Countdown targetDate="2026-06-28T18:00:00" />
      </div>
    </section>
  )
}

// ── Schedule ───────────────────────────────────────────────────────────────────
function ScheduleSection() {
  const { t } = useContext(LangContext)
  const photos = ['./photo1.jpg','./photo2.jpg','./couple.jpg']

  return (
    <section id="schedule" style={{ padding:'72px 20px', background:'var(--cream)' }}>
      <div style={{ maxWidth:'680px', margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:'56px' }}>
          <SectionLabel>{t.schedule.label}</SectionLabel>
          <h2 className="display-font" style={{ fontSize:'clamp(22px,4vw,36px)', fontWeight:300, color:'var(--text-dark)', letterSpacing:'3px', textTransform:'lowercase' }}>
            {t.schedule.title}
          </h2>
        </div>

        <div style={{ position:'relative' }}>
          {/* Center vertical line */}
          <div style={{ position:'absolute', left:'50%', top:0, bottom:0, width:'1px', background:'var(--line)', transform:'translateX(-50%)' }} />

          {t.schedule.items.map((item, i) => {
            const isLeft = i % 2 === 0
            return (
              <div key={i} style={{
                display:'grid', gridTemplateColumns:'1fr 60px 1fr',
                alignItems:'center',
                marginBottom: i < t.schedule.items.length-1 ? '52px' : '0',
                animation:'fadeInUp 0.7s ease both',
                animationDelay:`${i*0.18}s`
              }}>
                <div style={{ display:'flex', justifyContent:'flex-end', paddingRight:'28px' }}>
                  {isLeft ? <ScheduleTextCard item={item} align="right" /> : <SchedulePhoto src={photos[i]} />}
                </div>
                <div style={{ display:'flex', justifyContent:'center' }}>
                  <div style={{ width:'10px', height:'10px', borderRadius:'50%', background:'var(--gold)', boxShadow:'0 0 0 4px var(--cream), 0 0 0 5px var(--line)', zIndex:2 }} />
                </div>
                <div style={{ display:'flex', justifyContent:'flex-start', paddingLeft:'28px' }}>
                  {isLeft ? <SchedulePhoto src={photos[i]} /> : <ScheduleTextCard item={item} align="left" />}
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
    <div style={{ maxWidth:'230px', width:'100%', textAlign:align }}>
      <p className="display-font" style={{ fontSize:'clamp(26px,5vw,38px)', fontWeight:300, color:'var(--gold)', letterSpacing:'2px', lineHeight:1, marginBottom:'8px' }}>{item.time}</p>
      <p style={{ fontSize:'13px', fontWeight:500, color:'var(--text-dark)', letterSpacing:'0.5px', marginBottom:'5px' }}>{item.title}</p>
      <p style={{ fontSize:'11px', color:'var(--text-light)', lineHeight:1.7 }}>{item.desc}</p>
    </div>
  )
}

function SchedulePhoto({ src }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div style={{ width:'clamp(110px,22vw,190px)', height:'clamp(140px,28vw,230px)', borderRadius:'2px', overflow:'hidden', background:'var(--gold-pale)', flexShrink:0 }}>
      <img src={src} alt="" onLoad={()=>setLoaded(true)}
        style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', opacity:loaded?1:0, transition:'opacity 0.5s ease' }} />
    </div>
  )
}

// ── Details ────────────────────────────────────────────────────────────────────
function DetailsSection() {
  const { t } = useContext(LangContext)
  return (
    <section style={{ padding:'56px 20px', background:'var(--ivory)' }}>
      <div style={{ maxWidth:'560px', margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:'36px' }}>
          <SectionLabel>{t.details.label}</SectionLabel>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1px', background:'var(--border)' }}>
          {[
            { label:t.details.date,  value:t.details.dateVal  },
            { label:t.details.time,  value:t.details.timeVal  },
            { label:t.details.place, value:t.details.placeVal },
          ].map((item,i) => (
            <div key={i} style={{ padding:'24px 16px', background:'var(--cream)', textAlign:'center' }}>
              <p style={{ fontSize:'8px', letterSpacing:'3px', textTransform:'lowercase', color:'var(--text-light)', marginBottom:'8px' }}>{item.label}</p>
              <p className="display-font" style={{ fontSize:'clamp(13px,2.5vw,17px)', color:'var(--text-dark)', letterSpacing:'1px' }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Calendar ───────────────────────────────────────────────────────────────────
function CalendarSection() {
  const { t } = useContext(LangContext)
  return (
    <section style={{ padding:'56px 20px', background:'var(--cream)' }}>
      <div style={{ maxWidth:'460px', margin:'0 auto', textAlign:'center' }}>
        <SectionLabel>{t.calendar.label}</SectionLabel>
        <Calendar weddingDate="2026-06-28" />
      </div>
    </section>
  )
}

// ── Footer ─────────────────────────────────────────────────────────────────────
function Footer() {
  const { t } = useContext(LangContext)
  return (
    <footer style={{ padding:'64px 20px', background:'var(--cream)', textAlign:'center', borderTop:'1px solid var(--border)' }}>
      <div style={{ width:'1px', height:'48px', background:'linear-gradient(to bottom, transparent, var(--line))', margin:'0 auto 24px' }} />
      <p className="display-font" style={{ fontSize:'clamp(32px,7vw,56px)', fontWeight:300, letterSpacing:'12px', color:'var(--text-dark)', marginBottom:'12px' }}>
        Р ✦ Ж
      </p>
      <p style={{ fontSize:'9px', letterSpacing:'4px', color:'var(--text-light)' }}>{t.footer}</p>
      <div style={{ width:'1px', height:'48px', background:'linear-gradient(to bottom, var(--line), transparent)', margin:'24px auto 0' }} />
    </footer>
  )
}

// ── Utility ────────────────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <p style={{ fontSize:'9px', letterSpacing:'5px', textTransform:'lowercase', color:'var(--text-light)', marginBottom:'16px', display:'flex', alignItems:'center', justifyContent:'center', gap:'12px' }}>
      <span style={{ display:'inline-block', width:'24px', height:'1px', background:'var(--line)' }} />
      {children}
      <span style={{ display:'inline-block', width:'24px', height:'1px', background:'var(--line)' }} />
    </p>
  )
}