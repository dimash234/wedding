import React, { useState, useEffect, createContext, useContext } from 'react'
import Countdown  from './components/Countdown'
import MapSection from './components/MapSection'
import RSVPForm   from './components/RSVPForm'
import Calendar   from './components/Calendar'
import Petals     from './components/Petals'
import { translations } from './lang'

export const LangContext = createContext()

/* ─── Scroll reveal hook ─────────────────────────────────────────── */
function useScrollReveal(options = {}) {
  const ref = React.useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: options.threshold ?? 0.12, rootMargin: options.rootMargin ?? '0px 0px -40px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return [ref, visible]
}

/* ─── Reveal wrapper ─────────────────────────────────────────────── */
function Reveal({ children, delay = 0, y = 28, style: extraStyle }) {
  const [ref, visible] = useScrollReveal()
  return (
    <div ref={ref} style={{
      opacity:   visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : `translateY(${y}px)`,
      transition: `opacity 0.85s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.85s cubic-bezier(.16,1,.3,1) ${delay}s`,
      ...extraStyle,
    }}>
      {children}
    </div>
  )
}

/* ─── Audio ──────────────────────────────────────────────────────── */
const audio = new Audio('./music/mahabbat.mp3')
audio.loop = true
audio.volume = 0.55

const bootAudio = () => {
  audio.play().catch(() => {
    const go = () => audio.play().catch(() => {})
    ;['click', 'touchstart', 'scroll'].forEach(ev =>
      document.addEventListener(ev, go, { once: true })
    )
  })
}
bootAudio()

/* ─── App ─────────────────────────────────────────────────────────── */
export default function App() {
  const [scrolled,  setScrolled]  = useState(false)
  const [lang,      setLang]      = useState('kz')
  const [playing,   setPlaying]   = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  useEffect(() => {
    const on  = () => setPlaying(true)
    const off = () => setPlaying(false)
    audio.addEventListener('play',  on)
    audio.addEventListener('pause', off)
    return () => {
      audio.removeEventListener('play',  on)
      audio.removeEventListener('pause', off)
    }
  }, [])

  const toggle = () => playing ? audio.pause() : audio.play().catch(() => {})
  const t = translations[lang]

  return (
    <LangContext.Provider value={{ t, lang, setLang, playing, toggle }}>
      <div style={{ background: 'var(--white)' }}>
        <Petals />
        <Navbar scrolled={scrolled} />
        <Hero />
        {/* ── Ornament between hero and schedule ── */}
        <Reveal delay={0}>
          <div style={{ padding: '24px 0 0', background: 'var(--white)', textAlign: 'center' }}>
            <ShanyraqOrnament size={48} opacity={0.35} />
          </div>
        </Reveal>
        <ScheduleSection />
        <CalendarSection />
        <DetailsSection />
        <CountdownSection />
        <MapSection />
        <RSVPForm />
        <FooterSection />
      </div>
    </LangContext.Provider>
  )
}

/* ─── Navbar ─────────────────────────────────────────────────────── */
function Navbar({ scrolled }) {
  const { t, lang, setLang } = useContext(LangContext)

  const linkColor   = scrolled ? 'var(--mid)'             : 'rgba(255,255,255,0.75)'
  const linkHover   = scrolled ? 'var(--ink)'             : 'white'
  const logoColor   = scrolled ? 'var(--ink)'             : 'white'

  return (
    <nav style={{
      position: 'fixed', inset: '0 0 auto', zIndex: 300,
      height: '58px', padding: '0 clamp(20px,5vw,48px)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background:     scrolled ? 'rgba(255,255,255,0.96)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)'             : 'none',
      borderBottom:   scrolled ? '1px solid var(--border)': 'none',
      transition: 'all 0.5s cubic-bezier(.16,1,.3,1)',
    }}>
      {/* Logo */}
      <span style={{
        fontFamily: "'Cormorant SC', serif",
        fontSize: '15px', letterSpacing: '5px',
        color: logoColor, fontWeight: 300,
        transition: 'color 0.4s',
      }}>Р · Ж</span>

      {/* Links */}
      <div style={{ display: 'flex', gap: 'clamp(16px,3vw,32px)', alignItems: 'center' }}>
        {[['#schedule', t.nav.schedule], ['#map', t.nav.place], ['#rsvp', t.nav.rsvp]].map(([h, l]) => (
          <a key={h} href={h} style={{
            fontSize: '9.5px', letterSpacing: '2.5px', textTransform: 'lowercase',
            color: linkColor, textDecoration: 'none', transition: 'color 0.3s',
          }}
            onMouseEnter={e => e.target.style.color = linkHover}
            onMouseLeave={e => e.target.style.color = linkColor}
          >{l}</a>
        ))}

        {/* Lang */}
        <div style={{ display: 'flex', gap: '0', marginLeft: '4px' }}>
          {['kz', 'ru'].map(l => (
            <button key={l} onClick={() => setLang(l)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '4px 9px',
              fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase',
              color: lang === l
                ? (scrolled ? 'var(--ink)' : 'white')
                : (scrolled ? 'var(--soft)' : 'rgba(255,255,255,0.4)'),
              fontWeight: lang === l ? 500 : 300,
              borderBottom: lang === l
                ? `1px solid ${scrolled ? 'var(--gold)' : 'rgba(255,255,255,0.7)'}`
                : '1px solid transparent',
              transition: 'all 0.3s',
            }}>{l === 'kz' ? 'қаз' : 'рус'}</button>
          ))}
        </div>
      </div>
    </nav>
  )
}

/* ─── Hero ───────────────────────────────────────────────────────── */
function Hero() {
  const { t, playing, toggle } = useContext(LangContext)

  return (
    <section id="hero">

      {/* ══ FULL-SCREEN PHOTO ══════════════════════════════════════ */}
      <div style={{
        position: 'relative',
        width: '100%', height: '100svh', minHeight: '600px',
        overflow: 'hidden',
        background: 'var(--cream)',
      }}>
        <img
          src="./photo1.jpg" alt="Р & Ж"
          className="scale-in"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 30%',
          }}
        />

        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: [
            'linear-gradient(180deg,',
            '  rgba(10,8,5,0.55) 0%,',
            '  rgba(10,8,5,0.10) 35%,',
            '  rgba(10,8,5,0.06) 60%,',
            '  rgba(255,255,255,0.0) 80%,',
            '  var(--white) 100%)',
          ].join(''),
        }} />

        {/* ── Initials — upper-center ── */}
        <div style={{
          position: 'absolute', top: '18%', left: 0, right: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          pointerEvents: 'none',
        }}>
          <h1 className="rise-1" style={{
            fontFamily: "'Shelley Volante', 'Cormorant SC', serif",
            fontSize: 'clamp(58px,15vw,116px)',
            fontWeight: 300, letterSpacing: 'clamp(8px,3vw,22px)',
            color: 'white', lineHeight: 1,
            textShadow: '0 3px 40px rgba(0,0,0,0.3)',
          }}>
            Р{' '}
            <span style={{
              color: 'rgba(255,255,255,0.45)',
              fontSize: '0.42em',
              letterSpacing: 0,
              verticalAlign: 'middle',
              fontStyle: 'italic',
            }}>{'&'}</span>
            {' '}Ж
          </h1>

          <p className="rise-2" style={{
            marginTop: '14px',
            fontSize: '8.5px', letterSpacing: '7px', textTransform: 'lowercase',
            color: 'rgba(255,255,255,0.55)',
            fontWeight: 300,
          }}>{t.invite}</p>
        </div>

        {/* ── Music button — lower centre ── */}
        <div style={{
          position: 'absolute', top: '65%', left: '50%',
          transform: 'translate(-50%, -50%)',
        }}>
          <MusicRing playing={playing} onClick={toggle} />
        </div>

        {/* ── Subtle date bottom ── */}
        <p className="rise-4" style={{
          position: 'absolute', bottom: '10%', left: 0, right: 0,
          textAlign: 'center',
          fontSize: '9px', letterSpacing: '7px', textTransform: 'lowercase',
          color: 'rgba(255,255,255,0.5)',
          fontWeight: 300,
          pointerEvents: 'none',
        }}>сенбі · 28 маусым 2026 · 18:00</p>
      </div>

      {/* ══ BELOW PHOTO — white area ═══════════════════════════════ */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: 'clamp(40px,8vh,72px) 24px clamp(52px,10vh,88px)',
        background: 'var(--white)',
        textAlign: 'center',
      }}>

        {/* Names */}
        <Reveal delay={0}>
          <h2 style={{
            fontFamily: "'Shelley Volante', 'Cormorant Garamond', serif",
            fontSize: 'clamp(28px,7.5vw,58px)',
            fontWeight: 300, fontStyle: 'italic',
            letterSpacing: 'clamp(1px,0.5vw,4px)',
            color: 'var(--ink)', lineHeight: 1.2,
          }}>
            Райымбек{' '}
            <span style={{ color: 'var(--gold)', fontStyle: 'normal', fontSize: '0.65em' }}>{'&'}</span>
            {' '}Жансая
          </h2>
        </Reveal>

        {/* Date */}
        <Reveal delay={0.12}>
          <p style={{
            marginTop: '16px',
            fontFamily: "'Shelley Volante', 'Cormorant Garamond', serif",
            fontSize: 'clamp(18px,4vw,32px)',
            fontWeight: 300, letterSpacing: 'clamp(3px,1.5vw,8px)',
            color: 'var(--ink)',
          }}>28 · 06 · 2026</p>
        </Reveal>

        {/* Ornament divider */}
        <Reveal delay={0.22}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '16px',
            margin: 'clamp(20px,4vh,32px) 0',
          }}>
            <WaveLine />
            <GoldDiamond />
            <WaveLine />
          </div>
        </Reveal>

        {/* Quote */}
        <Reveal delay={0.3}>
          <p style={{
            fontFamily: "'Shelley Volante', 'Cormorant Garamond', serif",
            fontSize: 'clamp(14px,3.5vw,20px)',
            fontStyle: 'italic', color: 'var(--ink)',
            lineHeight: 1.9, letterSpacing: '0.3px',
            maxWidth: '420px',
          }}>{t.quote}</p>
        </Reveal>

        {/* Floral ornament */}
        <Reveal delay={0.36}>
          <div style={{ marginTop: 'clamp(16px,3vh,24px)' }}>
            <FloralDivider opacity={0.5} />
          </div>
        </Reveal>

        {/* Greeting */}
        <Reveal delay={0.42}>
          <div style={{ marginTop: 'clamp(28px,5vh,44px)', maxWidth: '500px' }}>
            <p style={{
              fontFamily: "'Shelley Volante', 'Cormorant Garamond', serif",
              fontSize: 'clamp(18px,4vw,28px)',
              fontWeight: 400, color: 'var(--ink)',
              letterSpacing: '1px', marginBottom: '12px',
            }}>{t.greeting}</p>
            <p style={{
              fontSize: '12.5px', letterSpacing: '0.5px',
              color: 'var(--ink)', lineHeight: 2,
              fontWeight: 300,
            }}>{t.subGreeting}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── Music ring ─────────────────────────────────────────────────── */
function MusicRing({ playing, onClick }) {
  const TEXT = 'МАХАББАТ · ДЕГЕН · ҚАНДАЙ · ТОЙ · МУЗЫКА · '

  return (
    <button
      onClick={onClick}
      aria-label={playing ? 'Pause' : 'Play'}
      style={{
        width: '100px', height: '100px', borderRadius: '50%',
        background: 'none', border: 'none', cursor: 'pointer',
        position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      {/* Spinning text ring */}
      <svg viewBox="0 0 100 100" style={{
        position: 'absolute', inset: 0, width: '100px', height: '100px',
        animation: 'spinSlow 12s linear infinite',
        animationPlayState: playing ? 'running' : 'paused',
      }}>
        <defs>
          <path id="cp" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
        </defs>
        <text style={{
          fontSize: '6.5px',
          fill: playing ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.55)',
          letterSpacing: '2.2px', fontFamily: "'Jost',sans-serif", fontWeight: 300,
        }}>
          <textPath href="#cp">{TEXT}</textPath>
        </text>
      </svg>

      {/* Button disc — BLACK when playing (shows ⏸), WHITE outline when paused (shows ▶) */}
      <div style={{
        width: '56px', height: '56px', borderRadius: '50%',
        background: playing ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.18)',
        backdropFilter: 'blur(12px)',
        border: playing ? '1.5px solid rgba(255,255,255,0.3)' : '1.5px solid rgba(255,255,255,0.8)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.4s cubic-bezier(.16,1,.3,1)',
        boxShadow: playing
          ? '0 0 0 6px rgba(0,0,0,0.18), 0 4px 20px rgba(0,0,0,0.3)'
          : '0 2px 16px rgba(0,0,0,0.15)',
      }}>
        {playing ? (
          /* Pause: two vertical bars */
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <span style={{ width: '3px', height: '14px', background: 'white', borderRadius: '2px', display: 'block' }} />
            <span style={{ width: '3px', height: '14px', background: 'white', borderRadius: '2px', display: 'block' }} />
          </div>
        ) : (
          /* Play: triangle */
          <svg viewBox="0 0 16 18" style={{ width: '14px', height: '16px', marginLeft: '3px' }}>
            <path d="M2,1 L15,9 L2,17 Z" fill="white" />
          </svg>
        )}
      </div>
    </button>
  )
}

/* ─── Countdown ──────────────────────────────────────────────────── */
function CountdownSection() {
  const { t } = useContext(LangContext)
  return (
    <section id="countdown" style={{
      padding: 'clamp(56px,10vh,88px) 20px',
      background: 'var(--off)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
        <Reveal delay={0}>
          <SectionLabel>{t.countdown.label}</SectionLabel>
        </Reveal>
        <Reveal delay={0.12} y={20}>
          <Countdown targetDate="2026-06-28T18:00:00" />
        </Reveal>
        <Reveal delay={0.3}>
          <div style={{ marginTop: '40px' }}>
            <ScrollDivider opacity={0.4} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── Schedule ───────────────────────────────────────────────────── */
function ScheduleSection() {
  const { t } = useContext(LangContext)
  const photos = ['./photo2.jpg', './couple.jpg', './photo1.jpg']

  return (
    <section id="schedule" style={{ padding: 'clamp(64px,10vh,96px) 20px', background: 'var(--white)' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(44px,8vh,72px)' }}>
          <Reveal delay={0}>
            <SectionLabel>{t.schedule.label}</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 style={{
              fontFamily: "'Shelley Volante', 'Cormorant Garamond', serif",
              fontSize: 'clamp(24px,5vw,42px)',
              fontWeight: 300, fontStyle: 'italic',
              color: 'var(--ink)', letterSpacing: '2px',
            }}>{t.schedule.title}</h2>
          </Reveal>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute', left: '50%', top: 0, bottom: 0,
            width: '1px', transform: 'translateX(-50%)',
            background: 'linear-gradient(to bottom, transparent, var(--gold2) 12%, var(--gold2) 88%, transparent)',
          }} />

          {t.schedule.items.map((item, i) => {
            const flip = i % 2 === 0
            return (
              <Reveal key={i} delay={i * 0.15} y={24} style={{ marginBottom: i < t.schedule.items.length - 1 ? 'clamp(40px,7vh,64px)' : 0 }}>
                <div style={{
                  display: 'grid', gridTemplateColumns: '1fr 48px 1fr',
                  alignItems: 'center',
                }}>
                  {/* Left */}
                  <div style={{ paddingRight: '24px', display: 'flex', justifyContent: 'flex-end' }}>
                    {flip ? <SchCard item={item} align="right" /> : <SchPhoto src={photos[i]} />}
                  </div>
                  {/* Centre dot */}
                  <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
                    <div style={{
                      width: '11px', height: '11px', borderRadius: '50%',
                      background: 'var(--gold)',
                      boxShadow: '0 0 0 4px var(--white), 0 0 0 5.5px var(--gold2)',
                    }} />
                  </div>
                  {/* Right */}
                  <div style={{ paddingLeft: '24px', display: 'flex', justifyContent: 'flex-start' }}>
                    {flip ? <SchPhoto src={photos[i]} /> : <SchCard item={item} align="left" />}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function SchCard({ item, align }) {
  return (
    <div style={{ maxWidth: '220px', width: '100%', textAlign: align }}>
      <p style={{
        fontFamily: "'Shelley Volante', 'Cormorant SC', serif",
        fontSize: 'clamp(26px,5vw,38px)',
        fontWeight: 400, color: 'var(--gold)',
        letterSpacing: '2px', lineHeight: 1, marginBottom: '10px',
      }}>{item.time}</p>
      <p style={{
        fontSize: '12.5px', fontWeight: 500,
        letterSpacing: '0.8px', color: 'var(--ink)',
        marginBottom: '5px',
      }}>{item.title}</p>
      <p style={{
        fontSize: '11px', color: 'var(--ink)',
        lineHeight: 1.75, fontWeight: 300,
      }}>{item.desc}</p>
    </div>
  )
}

function SchPhoto({ src }) {
  const [ok, setOk] = useState(false)
  return (
    <div style={{
      width: 'clamp(96px,18vw,175px)',
      height: 'clamp(120px,22vw,215px)',
      overflow: 'hidden', background: 'var(--mist)', flexShrink: 0,
    }}>
      <img
        src={src} alt=""
        onLoad={() => setOk(true)}
        style={{
          width: '100%', height: '100%', objectFit: 'cover', display: 'block',
          opacity: ok ? 1 : 0, transition: 'opacity 0.6s ease',
          filter: 'brightness(1.01) saturate(0.88)',
        }}
      />
    </div>
  )
}

/* ─── Details ────────────────────────────────────────────────────── */
function DetailsSection() {
  const { t } = useContext(LangContext)
  return (
    <section style={{
      padding: 'clamp(56px,9vh,80px) 20px',
      background: 'var(--off)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
        <Reveal delay={0}>
          <SectionLabel>{t.details.label}</SectionLabel>
        </Reveal>

        {/* Top row: date + time */}
        <Reveal delay={0.1}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--border)', marginBottom: '1px' }}>
            {[
              [t.details.date,  t.details.dv],
              [t.details.time,  t.details.tv],
            ].map(([l, v], i) => (
              <div key={i} style={{ padding: 'clamp(18px,4vw,28px) 16px', background: 'var(--white)', textAlign: 'center' }}>
                <p style={{ fontSize: '8px', letterSpacing: '3px', textTransform: 'lowercase', color: 'var(--ink)', marginBottom: '9px', opacity: 0.45 }}>{l}</p>
                <p style={{
                  fontFamily: "'Shelley Volante', 'Cormorant Garamond', serif",
                  fontSize: 'clamp(13px,3vw,18px)',
                  color: 'var(--ink)', letterSpacing: '1.5px', fontWeight: 300,
                }}>{v}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Bottom row: address full width */}
        <Reveal delay={0.2}>
          <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderTop: 'none', padding: 'clamp(18px,4vw,28px) 16px', textAlign: 'center' }}>
            <p style={{ fontSize: '8px', letterSpacing: '3px', textTransform: 'lowercase', color: 'var(--soft)', marginBottom: '9px' }}>{t.details.place}</p>
            <p style={{
              fontFamily: "'Shelley Volante', 'Cormorant Garamond', serif",
              fontSize: 'clamp(13px,3vw,18px)',
              color: 'var(--ink)', letterSpacing: '1px', fontWeight: 300,
            }}>{t.details.pv}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── Calendar ───────────────────────────────────────────────────── */
function CalendarSection() {
  const { t } = useContext(LangContext)
  return (
    <section style={{ padding: 'clamp(56px,9vh,80px) 20px', background: 'var(--white)', position: 'relative' }}>
      {/* Corner florals */}
      <div style={{ position: 'absolute', top: '20px', left: '20px', pointerEvents: 'none' }}>
        <CornerFloral position="tl" size={60} opacity={0.28} />
      </div>
      <div style={{ position: 'absolute', top: '20px', right: '20px', pointerEvents: 'none' }}>
        <CornerFloral position="tr" size={60} opacity={0.28} />
      </div>
      <div style={{ maxWidth: '440px', margin: '0 auto', textAlign: 'center' }}>
        <Reveal delay={0}>
          <SectionLabel>{t.calendar.label}</SectionLabel>
        </Reveal>
        <Reveal delay={0.12} y={20}>
          <Calendar weddingDate="2026-06-28" />
        </Reveal>
      </div>
    </section>
  )
}

/* ─── Footer ─────────────────────────────────────────────────────── */
function FooterSection() {
  const { t } = useContext(LangContext)
  return (
    <footer style={{
      padding: 'clamp(56px,10vh,88px) 20px',
      background: 'var(--white)',
      textAlign: 'center',
      borderTop: '1px solid var(--border)',
    }}>
      <Reveal delay={0}>
        <div style={{ width: '1px', height: '64px', background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.15))', margin: '0 auto 32px' }} />
        <p style={{
          fontFamily: "'Shelley Volante', 'Cormorant SC', serif",
          fontSize: 'clamp(44px,11vw,80px)',
          fontWeight: 300, letterSpacing: 'clamp(10px,3vw,20px)',
          color: 'var(--ink)', lineHeight: 1, marginBottom: '16px',
        }}>Р ✦ Ж</p>
        <p style={{ fontSize: '9px', letterSpacing: '5px', color: 'var(--ink)', fontWeight: 300 }}>{t.footer}</p>
        <div style={{ marginTop: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
          <WaveLine />
          <GoldDiamond />
          <WaveLine />
        </div>
        <div style={{ width: '1px', height: '64px', background: 'linear-gradient(to bottom, rgba(0,0,0,0.15), transparent)', margin: '24px auto 0' }} />
      </Reveal>
    </footer>
  )
}

/* ─── Shared UI ──────────────────────────────────────────────────── */
function SectionLabel({ children }) {
  return (
    <p style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px',
      fontSize: '8.5px', letterSpacing: '5px', textTransform: 'lowercase',
      color: 'var(--soft)', marginBottom: '20px', fontWeight: 300,
    }}>
      <ThinLine />
      {children}
      <ThinLine />
    </p>
  )
}

function ThinLine() {
  return (
    <span style={{
      display: 'inline-block', width: '32px', height: '1px',
      background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.15), transparent)',
    }} />
  )
}

function WaveLine() {
  return (
    <svg width="56" height="8" viewBox="0 0 56 8" fill="none">
      <path d="M0 4 Q7 0 14 4 Q21 8 28 4 Q35 0 42 4 Q49 8 56 4"
        stroke="rgba(0,0,0,0.22)" strokeWidth="0.8" fill="none" opacity="0.7" />
    </svg>
  )
}

function GoldDiamond() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 0.5 L13.5 7 L7 13.5 L0.5 7 Z" fill="none" stroke="var(--gold)" strokeWidth="0.8" />
      <circle cx="7" cy="7" r="1.8" fill="#111" opacity="0.6" />
    </svg>
  )
}

/* ─── Rich SVG Ornaments ──────────────────────────────────────────── */

// Delicate floral branch divider
export function FloralDivider({ opacity = 0.6 }) {
  return (
    <svg viewBox="0 0 320 40" style={{ width: '100%', maxWidth: '320px', display: 'block', margin: '0 auto', opacity }}>
      <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(0,0,0,0.2)" strokeWidth="0.7"/>
      {/* Left florals */}
      <circle cx="95" cy="20" r="2.5" fill="none" stroke="var(--gold)" strokeWidth="0.8"/>
      <line x1="92" y1="14" x2="95" y2="18" stroke="rgba(0,0,0,0.22)" strokeWidth="0.8"/>
      <circle cx="91" cy="12" r="2" fill="#888" opacity="0.4"/>
      <line x1="98" y1="14" x2="95" y2="18" stroke="rgba(0,0,0,0.22)" strokeWidth="0.8"/>
      <circle cx="99" cy="12" r="2" fill="#888" opacity="0.4"/>
      {/* Centre diamond */}
      <path d="M160,8 L168,20 L160,32 L152,20Z" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="1"/>
      <circle cx="160" cy="20" r="3" fill="#111" opacity="0.4"/>
      {/* Right florals (mirror) */}
      <circle cx="225" cy="20" r="2.5" fill="none" stroke="var(--gold)" strokeWidth="0.8"/>
      <line x1="228" y1="14" x2="225" y2="18" stroke="rgba(0,0,0,0.22)" strokeWidth="0.8"/>
      <circle cx="229" cy="12" r="2" fill="#888" opacity="0.4"/>
      <line x1="222" y1="14" x2="225" y2="18" stroke="rgba(0,0,0,0.22)" strokeWidth="0.8"/>
      <circle cx="221" cy="12" r="2" fill="#888" opacity="0.4"/>
      <line x1="220" y1="20" x2="320" y2="20" stroke="rgba(0,0,0,0.2)" strokeWidth="0.7"/>
    </svg>
  )
}

// Corner botanical corner piece
export function CornerFloral({ position = 'tl', size = 80, opacity = 0.35 }) {
  const transforms = {
    tl: 'translate(0,0)',
    tr: `translate(${size},0) scale(-1,1)`,
    bl: `translate(0,${size}) scale(1,-1)`,
    br: `translate(${size},${size}) scale(-1,-1)`,
  }
  return (
    <svg viewBox={`0 0 ${size} ${size}`} style={{ width: size, height: size, display: 'block', opacity }} xmlns="http://www.w3.org/2000/svg">
      <g transform={transforms[position]}>
        <path d="M4,4 L4,36 Q4,40 8,40 L36,40" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="1.2"/>
        <path d="M10,4 L10,30 Q10,34 14,34 L36,34" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="0.7"/>
        {/* Floral tip */}
        <circle cx="4" cy="4" r="3" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="1"/>
        <circle cx="4" cy="4" r="1.2" fill="var(--gold)" opacity="0.6"/>
        {/* Leaf at end */}
        <path d="M36,40 Q42,36 38,30 Q34,34 36,40Z" fill="var(--gold2)" opacity="0.4"/>
        {/* Small dot accents */}
        <circle cx="20" cy="4" r="1.5" fill="#888" opacity="0.4"/>
        <circle cx="4" cy="22" r="1.5" fill="#888" opacity="0.4"/>
      </g>
    </svg>
  )
}

// Ornate section separator with rings and scrolls
export function ScrollDivider({ opacity = 0.55 }) {
  return (
    <svg viewBox="0 0 400 28" style={{ width: '100%', maxWidth: '400px', display: 'block', margin: '0 auto', opacity }}>
      {/* Left scroll */}
      <path d="M0,14 Q20,4 40,14 Q20,24 0,14Z" fill="none" stroke="rgba(0,0,0,0.22)" strokeWidth="0.8"/>
      <path d="M40,14 L170,14" stroke="rgba(0,0,0,0.18)" strokeWidth="0.6"/>
      {/* Small diamonds on line */}
      <path d="M90,10 L94,14 L90,18 L86,14Z" fill="#888" opacity="0.35"/>
      <path d="M140,10 L144,14 L140,18 L136,14Z" fill="#888" opacity="0.35"/>
      {/* Centre ring with inner star */}
      <circle cx="200" cy="14" r="10" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="1"/>
      <circle cx="200" cy="14" r="5" fill="none" stroke="var(--gold)" strokeWidth="0.7"/>
      <line x1="200" y1="4" x2="200" y2="24" stroke="var(--gold)" strokeWidth="0.6" opacity="0.5"/>
      <line x1="190" y1="14" x2="210" y2="14" stroke="var(--gold)" strokeWidth="0.6" opacity="0.5"/>
      <circle cx="200" cy="14" r="2" fill="var(--gold)" opacity="0.7"/>
      {/* Right mirror */}
      <path d="M230,14 L360,14" stroke="rgba(0,0,0,0.18)" strokeWidth="0.6"/>
      <path d="M260,10 L264,14 L260,18 L256,14Z" fill="#888" opacity="0.35"/>
      <path d="M310,10 L314,14 L310,18 L306,14Z" fill="#888" opacity="0.35"/>
      <path d="M400,14 Q380,4 360,14 Q380,24 400,14Z" fill="none" stroke="rgba(0,0,0,0.22)" strokeWidth="0.8"/>
    </svg>
  )
}

// Shanyrak (yurt crown symbol) — cultural Kazakh ornament
export function ShanyraqOrnament({ size = 56, opacity = 0.45 }) {
  return (
    <svg viewBox="0 0 56 56" style={{ width: size, height: size, display: 'block', margin: '0 auto', opacity }}>
      <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="1"/>
      <circle cx="28" cy="28" r="16" fill="none" stroke="rgba(0,0,0,0.22)" strokeWidth="0.8"/>
      <circle cx="28" cy="28" r="6" fill="none" stroke="var(--gold)" strokeWidth="0.8"/>
      {/* Spokes */}
      {[0,30,60,90,120,150].map(a => {
        const rad = a * Math.PI / 180
        return <line key={a}
          x1={28 + 6*Math.cos(rad)} y1={28 + 6*Math.sin(rad)}
          x2={28 + 24*Math.cos(rad)} y2={28 + 24*Math.sin(rad)}
          stroke="rgba(0,0,0,0.2)" strokeWidth="0.7" opacity="0.7"
        />
      })}
      <circle cx="28" cy="28" r="2.5" fill="var(--gold)" opacity="0.7"/>
    </svg>
  )
}