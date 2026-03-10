import React, { useState, useEffect, createContext, useContext } from 'react'
import KazakhOrnament from './components/KazakhOrnament'
import Countdown from './components/Countdown'
import MapSection from './components/MapSection'
import RSVPForm from './components/RSVPForm'
import Calendar from './components/Calendar'
import MusicPlayer from './components/MusicPlayer'
import Petals from './components/Petals'
import { translations } from './lang'

export const LangContext = createContext('kz')

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [lang, setLang] = useState('kz')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const t = translations[lang]

  return (
    <LangContext.Provider value={{ lang, t, setLang }}>
      <div style={{ background: 'var(--cream)', minHeight: '100vh', position: 'relative' }}>
        <Petals />
        <MusicPlayer />
        <Nav scrolled={scrolled} />
        <HeroSection />
        <CountdownSection />
        <StorySection />
        <CalendarSection />
        <MapSection />
        <RSVPForm />
        <Footer />
      </div>
    </LangContext.Provider>
  )
}

function LangSwitch() {
  const { lang, setLang } = useContext(LangContext)
  return (
    <div style={{
      display: 'flex', gap: '2px',
      background: 'rgba(201,168,76,0.1)',
      borderRadius: '20px',
      padding: '3px',
      border: '1px solid rgba(201,168,76,0.25)'
    }}>
      {['kz', 'ru'].map(l => (
        <button key={l} onClick={() => setLang(l)} style={{
          padding: '4px 12px',
          borderRadius: '16px',
          border: 'none',
          cursor: 'pointer',
          fontSize: '11px',
          fontFamily: "'Raleway', sans-serif",
          fontWeight: 600,
          letterSpacing: '1px',
          textTransform: 'uppercase',
          background: lang === l
            ? 'linear-gradient(135deg, var(--gold), var(--gold-light))'
            : 'transparent',
          color: lang === l ? 'white' : 'var(--text-light)',
          transition: 'all 0.3s ease',
          boxShadow: lang === l ? '0 2px 8px rgba(201,168,76,0.3)' : 'none'
        }}>
          {l === 'kz' ? 'ҚАЗ' : 'РУС'}
        </button>
      ))}
    </div>
  )
}

function Nav({ scrolled }) {
  const { t } = useContext(LangContext)
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '10px 24px',
      background: scrolled ? 'rgba(253,248,242,0.97)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      transition: 'all 0.4s ease',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      gap: '24px', flexWrap: 'wrap'
    }}>
      {[
        { label: t.nav.home, href: '#hero' },
        { label: t.nav.time, href: '#countdown' },
        { label: t.nav.place, href: '#map' },
        { label: t.nav.rsvp, href: '#rsvp' },
      ].map(item => (
        <a key={item.href} href={item.href} style={{
          fontFamily: "'Raleway', sans-serif",
          fontWeight: 400, fontSize: '12px', letterSpacing: '2px',
          textTransform: 'uppercase', color: 'var(--text-mid)',
          textDecoration: 'none', transition: 'color 0.3s',
        }}
        onMouseEnter={e => e.target.style.color = 'var(--gold)'}
        onMouseLeave={e => e.target.style.color = 'var(--text-mid)'}
        >{item.label}</a>
      ))}
      <LangSwitch />
    </nav>
  )
}

function HeroSection() {
  const { t } = useContext(LangContext)
  return (
    <section id="hero" style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
      padding: '80px 20px 100px',
    }}>

      {/* BACKGROUND YURT PHOTO */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'url(./yurt.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
        backgroundRepeat: 'no-repeat',
        opacity: 0.18,
        filter: 'sepia(20%) saturate(80%)'
      }} />

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: `
          linear-gradient(to bottom,
            rgba(253,248,242,0.3) 0%,
            rgba(253,248,242,0.1) 40%,
            rgba(253,248,242,0.5) 80%,
            rgba(253,248,242,0.95) 100%
          ),
          radial-gradient(ellipse at 50% 30%, rgba(201,168,76,0.08) 0%, transparent 60%)
        `
      }} />

      {/* Animated background rings */}
      <div style={{
        position: 'absolute', width: '500px', height: '500px',
        borderRadius: '50%', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        border: '1px solid rgba(201,168,76,0.1)',
        animation: 'spin-slow 40s linear infinite',
        pointerEvents: 'none', zIndex: 1
      }} />
      <div style={{
        position: 'absolute', width: '700px', height: '700px',
        borderRadius: '50%', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        border: '1px solid rgba(201,168,76,0.06)',
        animation: 'spin-slow 60s linear infinite reverse',
        pointerEvents: 'none', zIndex: 1
      }} />

      {/* All content above bg */}
      <div style={{ position: 'relative', zIndex: 2, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* Top ornament band */}
        <div style={{ width: '100%', maxWidth: '900px', marginBottom: '28px', animation: 'fadeIn 1.5s ease both' }}>
          <KazakhOrnament type="band" color="var(--gold)" opacity={0.55} />
        </div>

        <p style={{
          letterSpacing: '6px', fontSize: '11px', textTransform: 'uppercase',
          color: 'var(--gold)', marginBottom: '32px',
          animation: 'fadeInUp 1s ease 0.3s both'
        }}>{t.hero.invite}</p>

        {/* Names */}
        <div style={{ textAlign: 'center', animation: 'fadeInUp 1s ease 0.5s both' }}>
          <h1 style={{
            fontSize: 'clamp(52px, 10vw, 110px)',
            fontWeight: 300, lineHeight: 1.05,
            letterSpacing: '-1px', fontStyle: 'italic',
            margin: 0
          }}>
            <span style={{ color: 'var(--brown)', textShadow: '2px 4px 24px rgba(122,92,58,0.15)' }}>Райымбек</span>
          </h1>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '16px', margin: '10px 0'
          }}>
            <div style={{ height: '1px', width: '100px', background: 'linear-gradient(to right, transparent, var(--gold))' }} />
            <span style={{ fontSize: '24px', animation: 'pulse-gold 2.5s ease infinite' }}>💍</span>
            <div style={{ height: '1px', width: '100px', background: 'linear-gradient(to left, transparent, var(--gold))' }} />
          </div>
          <h1 style={{
            fontSize: 'clamp(52px, 10vw, 110px)',
            fontWeight: 300, lineHeight: 1.05,
            letterSpacing: '-1px', fontStyle: 'italic',
            margin: 0
          }}>
            <span style={{ color: 'var(--rose)', textShadow: '2px 4px 24px rgba(212,137,122,0.18)' }}>Жансая</span>
          </h1>
        </div>

        {/* Date badge */}
        <div style={{ margin: '36px 0 24px', animation: 'fadeInUp 1s ease 0.7s both', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '16px',
            background: 'rgba(253,248,242,0.85)',
            backdropFilter: 'blur(8px)',
            border: '1px solid var(--border)',
            borderRadius: '60px', padding: '14px 36px',
            boxShadow: '0 4px 24px rgba(201,168,76,0.12)'
          }}>
            <KazakhOrnament type="star" color="var(--gold)" size={14} />
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '22px', fontWeight: 400,
              letterSpacing: '3px', color: 'var(--text-mid)'
            }}>{t.hero.date}</span>
            <KazakhOrnament type="star" color="var(--gold)" size={14} />
          </div>
          <p style={{ marginTop: '10px', fontSize: '12px', letterSpacing: '4px', color: 'var(--text-light)', textTransform: 'uppercase' }}>
            {t.hero.day}
          </p>
        </div>

        {/* Quote */}
        <div style={{ maxWidth: '480px', textAlign: 'center', animation: 'fadeInUp 1s ease 0.9s both', padding: '0 20px' }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '20px', fontStyle: 'italic',
            color: 'var(--text-light)', lineHeight: 1.9
          }}>{t.hero.quote}</p>
        </div>

        {/* Bottom ornament strip */}
        <div style={{ width: '100%', maxWidth: '900px', marginTop: '40px', animation: 'fadeIn 2s ease 1s both' }}>
          <KazakhOrnament type="band" color="var(--gold)" opacity={0.4} />
        </div>
      </div>

      {/* Scroll arrow */}
      <div style={{
        position: 'absolute', bottom: '36px', zIndex: 2,
        animation: 'fadeIn 2s ease 2s both',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px'
      }}>
        <div style={{ width: '1px', height: '50px', background: 'linear-gradient(to bottom, transparent, var(--gold))' }} />
        <div style={{ fontSize: '18px', color: 'var(--gold)', opacity: 0.7 }}>↓</div>
      </div>
    </section>
  )
}

function CountdownSection() {
  const { t } = useContext(LangContext)
  return (
    <section id="countdown" style={{
      padding: '80px 20px',
      background: `linear-gradient(135deg, rgba(201,168,76,0.05) 0%, transparent 50%), var(--ivory)`,
      position: 'relative', overflow: 'hidden'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <KazakhOrnament type="corner-set" color="var(--gold)" opacity={0.25} />
        <p style={{ letterSpacing: '5px', fontSize: '11px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '12px' }}>
          {t.countdown.label}
        </p>
        <h2 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 300, color: 'var(--text-dark)', marginBottom: '48px', fontStyle: 'italic' }}>
          {t.countdown.title}
        </h2>
        <Countdown targetDate="2026-06-28T18:00:00" />
      </div>
    </section>
  )
}

function StorySection() {
  const { t } = useContext(LangContext)
  return (
    <section style={{ padding: '80px 20px', background: 'var(--cream)', position: 'relative' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
        <KazakhOrnament type="divider" color="var(--gold)" />
        <p style={{ letterSpacing: '5px', fontSize: '11px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '12px', marginTop: '40px' }}>
          {t.story.label}
        </p>
        <h2 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 300, fontStyle: 'italic', color: 'var(--text-dark)', marginBottom: '32px' }}>
          {t.story.title}
        </h2>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', lineHeight: 2, color: 'var(--text-mid)', fontStyle: 'italic', marginBottom: '12px' }}>
          {t.story.text1}<br/>{t.story.text2}
        </p>
        <p style={{ fontSize: '15px', lineHeight: 1.9, color: 'var(--text-light)' }}>{t.story.text3}</p>
        <div style={{ margin: '48px 0' }}>
          <KazakhOrnament type="full-border" color="var(--gold)" opacity={0.2} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
          {[
            { icon: '📅', label: t.story.date, value: t.story.dateVal },
            { icon: '🕕', label: t.story.time, value: t.story.timeVal },
            { icon: '📍', label: t.story.place, value: t.story.placeVal },
          ].map((item, i) => (
            <div key={i} style={{
              padding: '28px 20px', background: 'var(--white)',
              border: '1px solid var(--border)', borderRadius: '4px', position: 'relative', overflow: 'hidden'
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(to right, var(--gold), var(--rose-light))' }} />
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>{item.icon}</div>
              <p style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '6px' }}>{item.label}</p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', color: 'var(--text-dark)' }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CalendarSection() {
  const { t } = useContext(LangContext)
  return (
    <section style={{ padding: '60px 20px 80px', background: 'var(--ivory)' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ letterSpacing: '5px', fontSize: '11px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '12px' }}>
          {t.calendar.label}
        </p>
        <h2 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 300, fontStyle: 'italic', color: 'var(--text-dark)', marginBottom: '40px' }}>
          {t.calendar.title}
        </h2>
        <Calendar weddingDate="2026-06-28" />
      </div>
    </section>
  )
}

function Footer() {
  const { t } = useContext(LangContext)
  return (
    <footer style={{ padding: '60px 20px', background: 'var(--cream)', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
      <KazakhOrnament type="band" color="var(--gold)" opacity={0.4} />
      <div style={{ marginTop: '32px' }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', fontStyle: 'italic', color: 'var(--text-mid)', marginBottom: '12px' }}>
          Райымбек & Жансая
        </p>
        <p style={{ fontSize: '13px', color: 'var(--text-light)', letterSpacing: '2px' }}>{t.footer.date}</p>
        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
          <KazakhOrnament type="diamond" color="var(--gold)" size={20} />
        </div>
      </div>
    </footer>
  )
}