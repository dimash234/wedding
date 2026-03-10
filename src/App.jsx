import React, { useState, useEffect, useRef } from 'react'
import KazakhOrnament from './components/KazakhOrnament'
import Countdown from './components/Countdown'
import MapSection from './components/MapSection'
import RSVPForm from './components/RSVPForm'
import Calendar from './components/Calendar'
import MusicPlayer from './components/MusicPlayer'
import Petals from './components/Petals'

export default function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
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
  )
}

function Nav({ scrolled }) {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '12px 24px',
      background: scrolled ? 'rgba(253,248,242,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      transition: 'all 0.4s ease',
      display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '32px'
    }}>
      {[
        { label: 'Басты бет', href: '#hero' },
        { label: 'Уақыт', href: '#countdown' },
        { label: 'Орын', href: '#map' },
        { label: 'Қатысу', href: '#rsvp' },
      ].map(item => (
        <a key={item.href} href={item.href} style={{
          fontFamily: "'Raleway', sans-serif",
          fontWeight: 400, fontSize: '13px', letterSpacing: '2px',
          textTransform: 'uppercase', color: 'var(--text-mid)',
          textDecoration: 'none', transition: 'color 0.3s',
          opacity: scrolled ? 1 : 0.9
        }}
        onMouseEnter={e => e.target.style.color = 'var(--gold)'}
        onMouseLeave={e => e.target.style.color = 'var(--text-mid)'}
        >{item.label}</a>
      ))}
    </nav>
  )
}

function HeroSection() {
  return (
    <section id="hero" style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
      padding: '80px 20px 60px',
      background: `
        radial-gradient(ellipse at 20% 20%, rgba(201,168,76,0.07) 0%, transparent 60%),
        radial-gradient(ellipse at 80% 80%, rgba(212,137,122,0.07) 0%, transparent 60%),
        var(--cream)
      `
    }}>
      {/* Top ornament band */}
      <div style={{ width: '100%', maxWidth: '900px', marginBottom: '32px', animation: 'fadeIn 1.5s ease both' }}>
        <KazakhOrnament type="band" color="var(--gold)" opacity={0.5} />
      </div>

      {/* Ring icon */}
      <div style={{ fontSize: '36px', marginBottom: '16px', animation: 'fadeInUp 1s ease 0.2s both' }}>
        💍
      </div>

      {/* Subtitle */}
      <p style={{
        fontFamily: "'Raleway', sans-serif",
        letterSpacing: '5px', fontSize: '11px',
        textTransform: 'uppercase', color: 'var(--gold)',
        marginBottom: '24px', animation: 'fadeInUp 1s ease 0.3s both'
      }}>Сіздерді шақырамыз</p>

      {/* Names */}
      <div style={{ textAlign: 'center', animation: 'fadeInUp 1s ease 0.5s both' }}>
        <h1 style={{
          fontSize: 'clamp(52px, 10vw, 110px)',
          fontWeight: 300, lineHeight: 1.05,
          color: 'var(--text-dark)',
          letterSpacing: '-1px',
          fontStyle: 'italic'
        }}>
          <span style={{ color: 'var(--brown)' }}>Райымбек</span>
        </h1>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '16px', margin: '8px 0'
        }}>
          <div style={{ height: '1px', width: '80px', background: 'linear-gradient(to right, transparent, var(--gold))' }} />
          <KazakhOrnament type="diamond" color="var(--gold)" size={24} />
          <div style={{ height: '1px', width: '80px', background: 'linear-gradient(to left, transparent, var(--gold))' }} />
        </div>
        <h1 style={{
          fontSize: 'clamp(52px, 10vw, 110px)',
          fontWeight: 300, lineHeight: 1.05,
          color: 'var(--text-dark)',
          letterSpacing: '-1px',
          fontStyle: 'italic'
        }}>
          <span style={{ color: 'var(--rose)' }}>Жансая</span>
        </h1>
      </div>

      {/* Date */}
      <div style={{
        margin: '40px 0 32px',
        animation: 'fadeInUp 1s ease 0.7s both',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '20px',
          background: 'rgba(201,168,76,0.08)',
          border: '1px solid var(--border)',
          borderRadius: '60px',
          padding: '14px 40px'
        }}>
          <KazakhOrnament type="star" color="var(--gold)" size={16} />
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '22px', fontWeight: 400,
            letterSpacing: '3px', color: 'var(--text-mid)'
          }}>28 Маусым 2026</span>
          <KazakhOrnament type="star" color="var(--gold)" size={16} />
        </div>
        <p style={{
          marginTop: '10px', fontSize: '13px', letterSpacing: '3px',
          color: 'var(--text-light)', textTransform: 'uppercase'
        }}>Сенбі • 18:00</p>
      </div>

      {/* Quote */}
      <div style={{
        maxWidth: '480px', textAlign: 'center',
        animation: 'fadeInUp 1s ease 0.9s both'
      }}>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '20px', fontStyle: 'italic',
          color: 'var(--text-light)', lineHeight: 1.8,
          letterSpacing: '0.5px'
        }}>
          «Екі жүрек, бір ғұмыр — бақыт осы»
        </p>
      </div>

      {/* Scroll arrow */}
      <div style={{
        position: 'absolute', bottom: '40px',
        animation: 'fadeIn 2s ease 1.5s both',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px'
      }}>
        <div style={{
          width: '1px', height: '50px',
          background: 'linear-gradient(to bottom, transparent, var(--gold))'
        }} />
        <div style={{ fontSize: '18px', color: 'var(--gold)', opacity: 0.7 }}>↓</div>
      </div>

      {/* Bottom ornament band */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        animation: 'fadeIn 2s ease 1s both'
      }}>
        <KazakhOrnament type="bottom-band" color="var(--gold)" opacity={0.35} />
      </div>
    </section>
  )
}

function CountdownSection() {
  return (
    <section id="countdown" style={{
      padding: '80px 20px',
      background: `
        linear-gradient(135deg, rgba(201,168,76,0.05) 0%, transparent 50%),
        var(--ivory)
      `,
      position: 'relative', overflow: 'hidden'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <KazakhOrnament type="corner-set" color="var(--gold)" opacity={0.3} />

        <p style={{
          letterSpacing: '5px', fontSize: '11px', textTransform: 'uppercase',
          color: 'var(--gold)', marginBottom: '12px'
        }}>Тойға дейін</p>

        <h2 style={{
          fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 300,
          color: 'var(--text-dark)', marginBottom: '48px',
          fontStyle: 'italic'
        }}>Қалған уақыт</h2>

        <Countdown targetDate="2026-06-28T18:00:00" />
      </div>
    </section>
  )
}

function StorySection() {
  return (
    <section style={{
      padding: '80px 20px',
      background: 'var(--cream)',
      position: 'relative'
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
        <KazakhOrnament type="divider" color="var(--gold)" />

        <p style={{
          letterSpacing: '5px', fontSize: '11px', textTransform: 'uppercase',
          color: 'var(--gold)', marginBottom: '12px', marginTop: '40px'
        }}>Біздің Той</p>

        <h2 style={{
          fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 300,
          fontStyle: 'italic', color: 'var(--text-dark)',
          marginBottom: '32px'
        }}>Махаббат шақыруы</h2>

        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '20px', lineHeight: 2,
          color: 'var(--text-mid)', fontStyle: 'italic',
          marginBottom: '24px'
        }}>
          Сізді біздің бақытты күнімізде бірге болуға шақырамыз.<br/>
          Сіздің келуіңіз бізге өте маңызды!
        </p>

        <p style={{
          fontSize: '15px', lineHeight: 1.9,
          color: 'var(--text-light)'
        }}>
          28 маусым 2026 жылы Алматы қаласында <br/>
          Райымбек пен Жансаяның қосылу тойы өтеді.
        </p>

        <div style={{ margin: '48px 0' }}>
          <KazakhOrnament type="full-border" color="var(--gold)" opacity={0.25} />
        </div>

        {/* Details cards */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '20px', marginTop: '8px'
        }}>
          {[
            { icon: '📅', label: 'Күні', value: '28 Маусым 2026' },
            { icon: '🕕', label: 'Уақыты', value: '18:00' },
            { icon: '📍', label: 'Орны', value: 'Алматы' },
          ].map((item, i) => (
            <div key={i} style={{
              padding: '28px 20px',
              background: 'var(--white)',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                background: 'linear-gradient(to right, var(--gold), var(--rose-light))'
              }} />
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
  return (
    <section style={{
      padding: '60px 20px 80px',
      background: 'var(--ivory)'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{
          letterSpacing: '5px', fontSize: '11px', textTransform: 'uppercase',
          color: 'var(--gold)', marginBottom: '12px'
        }}>Күнтізбе</p>
        <h2 style={{
          fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 300,
          fontStyle: 'italic', color: 'var(--text-dark)', marginBottom: '40px'
        }}>Маусым 2026</h2>
        <Calendar weddingDate="2026-06-28" />
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer style={{
      padding: '60px 20px',
      background: 'var(--cream)',
      textAlign: 'center',
      borderTop: '1px solid var(--border)'
    }}>
      <KazakhOrnament type="band" color="var(--gold)" opacity={0.4} />
      <div style={{ marginTop: '32px' }}>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '32px', fontStyle: 'italic',
          color: 'var(--text-mid)', marginBottom: '12px'
        }}>Райымбек & Жансая</p>
        <p style={{ fontSize: '13px', color: 'var(--text-light)', letterSpacing: '2px' }}>28 • 06 • 2026</p>
        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
          <KazakhOrnament type="diamond" color="var(--gold)" size={20} />
        </div>
      </div>
    </footer>
  )
}