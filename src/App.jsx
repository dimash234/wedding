import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import Countdown from './components/Countdown';
import MapSection from './components/MapSection';
import RSVPForm from './components/RSVPForm';
import Calendar from './components/Calendar';
import { translations } from './lang';

export const LangContext = createContext();

/* ─── Hook: Scroll Reveal ────────────────────────────────────────── */
function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: options.threshold ?? 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [options.threshold]);

  return [ref, visible];
}

/* ─── Wrapper: Reveal ────────────────────────────────────────────── */
function Reveal({ children, delay = 0, y = 28, style: extraStyle }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : `translateY(${y}px)`,
      transition: `opacity 0.8s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.8s cubic-bezier(.16,1,.3,1) ${delay}s`,
      ...extraStyle,
    }}>
      {children}
    </div>
  );
}

/* ─── Audio Logic ────────────────────────────────────────────────── */
const audio = new Audio('./music/mahabbat.mp3');
audio.loop = true;
audio.volume = 0.5;

/* ─── Main App ───────────────────────────────────────────────────── */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState('kz');
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    const on = () => setPlaying(true);
    const off = () => setPlaying(false);
    audio.addEventListener('play', on);
    audio.addEventListener('pause', off);
    return () => {
      audio.removeEventListener('play', on);
      audio.removeEventListener('pause', off);
    };
  }, []);

  const toggleMusic = () => {
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(e => console.log("Audio play blocked", e));
    }
  };

  const t = translations[lang];

  return (
    <LangContext.Provider value={{ t, lang, setLang, playing, toggle: toggleMusic }}>
      <div style={{ background: 'var(--white)' }}>
        <Navbar scrolled={scrolled} />
        <Hero />
        <ScheduleSection />
        <CalendarSection />
        <DetailsSection />
        <CountdownSection />
        <MapSection />
        <RSVPForm />
        <FooterSection />
      </div>
    </LangContext.Provider>
  );
}

/* ─── Navbar ─────────────────────────────────────────────────────── */
function Navbar({ scrolled }) {
  const { t, lang, setLang } = useContext(LangContext);
  const color = scrolled ? 'var(--ink)' : 'white';

  return (
    <nav style={{
      position: 'fixed', inset: '0 0 auto', zIndex: 300,
      height: '58px', padding: '0 clamp(20px,5vw,48px)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(255,255,255,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      transition: 'all 0.4s ease',
    }}>
      <span style={{ fontFamily: "'Anastasia Script', serif", fontSize: '26px', color }}>Р · Ж</span>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        {[['#schedule', t.nav.schedule], ['#map', t.nav.place], ['#rsvp', t.nav.rsvp]].map(([h, l]) => (
          <a key={h} href={h} style={{ fontSize: '10px', textTransform: 'lowercase', color, textDecoration: 'none', letterSpacing: '1px' }}>{l}</a>
        ))}
        <button onClick={() => setLang(lang === 'kz' ? 'ru' : 'kz')} style={{ background: 'none', border: `1px solid ${color}`, color, padding: '2px 8px', fontSize: '9px', cursor: 'pointer' }}>
          {lang === 'kz' ? 'РУС' : 'ҚАЗ'}
        </button>
      </div>
    </nav>
  );
}

/* ─── Hero ───────────────────────────────────────────────────────── */
function Hero() {
  const { t, playing, toggle } = useContext(LangContext);

  return (
    <section id="hero" style={{ position: 'relative', height: '100svh', overflow: 'hidden' }}>
      <img src="./photo1.jpg" className="scale-in" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Hero" />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), transparent, var(--white))' }} />
      
      <div style={{ position: 'absolute', top: '20%', width: '100%', textAlign: 'center', color: 'white' }}>
        <h1 style={{ fontFamily: "'Bickham_Script_Pro_3', serif", fontSize: 'clamp(80px, 15vw, 120px)', lineHeight: 1 }}>Р & Ж</h1>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '10px', letterSpacing: '6px', marginTop: '10px', opacity: 0.8 }}>{t.invite}</p>
      </div>

      <div style={{ position: 'absolute', bottom: '25%', left: '50%', transform: 'translateX(-50%)' }}>
        <MusicRing playing={playing} onClick={toggle} />
      </div>
    </section>
  );
}

/* ─── Music Ring ─────────────────────────────────────────────────── */
function MusicRing({ playing, onClick }) {
  return (
    <button onClick={onClick} style={{ width: '90px', height: '90px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: '1px solid white', cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="0 0 100 100" style={{ position: 'absolute', width: '100%', height: '100%', animation: 'spinSlow 10s linear infinite', animationPlayState: playing ? 'running' : 'paused' }}>
        <path id="circlePath" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
        <text fill="white" fontSize="6" letterSpacing="2" fontFamily="'Jost'">
          <textPath href="#circlePath">МАХАББАТ · ДЕГЕН · ҚАНДАЙ · ТОЙ · МУЗЫКА · </textPath>
        </text>
      </svg>
      <div style={{ color: 'white', fontSize: '12px' }}>{playing ? 'II' : '▶'}</div>
    </button>
  );
}

/* ─── Schedule Section ───────────────────────────────────────────── */
function ScheduleSection() {
  const { t } = useContext(LangContext);
  return (
    <section id="schedule" style={{ padding: '80px 20px', textAlign: 'center' }}>
      <Reveal><SectionLabel>{t.schedule.label}</SectionLabel></Reveal>
      <Reveal delay={0.1}>
        <h2 style={{ fontFamily: "'Bickham_Script_Pro_3', serif", fontSize: 'clamp(40px, 8vw, 60px)', marginBottom: '40px' }}>{t.schedule.title}</h2>
      </Reveal>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {t.schedule.items.map((item, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div style={{ marginBottom: '30px', borderBottom: '1px solid var(--border)', paddingBottom: '15px' }}>
              <span style={{ fontFamily: "'Anastasia Script', serif", fontSize: '28px', color: 'var(--gold2)' }}>{item.time}</span>
              <h3 style={{ fontSize: '16px', margin: '5px 0' }}>{item.title}</h3>
              <p style={{ fontSize: '12px', opacity: 0.7 }}>{item.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── Details Section ────────────────────────────────────────────── */
function DetailsSection() {
  const { t } = useContext(LangContext);
  return (
    <section style={{ padding: '60px 20px', background: 'var(--off)', textAlign: 'center' }}>
      <Reveal><SectionLabel>{t.details.label}</SectionLabel></Reveal>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
        <div style={{ background: 'white', padding: '30px', minWidth: '250px', border: '1px solid var(--border)' }}>
          <p style={{ fontSize: '10px', letterSpacing: '2px', opacity: 0.5 }}>{t.details.date}</p>
          <p style={{ fontFamily: "'Маусым 2026', serif", fontSize: '24px', marginTop: '10px' }}>{t.details.dv}</p>
        </div>
        <div style={{ background: 'white', padding: '30px', minWidth: '250px', border: '1px solid var(--border)' }}>
          <p style={{ fontSize: '10px', letterSpacing: '2px', opacity: 0.5 }}>{t.details.place}</p>
          <p style={{ fontSize: '18px', marginTop: '10px' }}>{t.details.pv}</p>
        </div>
      </div>
    </section>
  );
}

/* ─── Common UI Components ───────────────────────────────────────── */
function SectionLabel({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', opacity: 0.6, marginBottom: '20px' }}>
      <div style={{ width: '40px', height: '1px', background: 'currentColor' }} />
      {children}
      <div style={{ width: '40px', height: '1px', background: 'currentColor' }} />
    </div>
  );
}

function CalendarSection() {
  const { t } = useContext(LangContext);
  return (
    <section style={{ padding: '60px 20px', textAlign: 'center' }}>
      <Reveal><SectionLabel>{t.calendar.label}</SectionLabel></Reveal>
      <Reveal delay={0.2}><Calendar weddingDate="2026-06-28" /></Reveal>
    </section>
  );
}

function CountdownSection() {
  const { t } = useContext(LangContext);
  return (
    <section style={{ padding: '60px 20px', background: 'var(--white)', textAlign: 'center' }}>
      <Reveal><SectionLabel>{t.countdown.label}</SectionLabel></Reveal>
      <Reveal delay={0.2}><Countdown targetDate="2026-06-28T18:00:00" /></Reveal>
    </section>
  );
}

function FooterSection() {
  const { t } = useContext(LangContext);
  return (
    <footer style={{ padding: '80px 20px', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
      <h2 style={{ fontFamily: "'Bickham_Script_Pro_3', serif", fontSize: '60px' }}>Р ✦ Ж</h2>
      <p style={{ fontSize: '14px', letterSpacing: '3px', marginTop: '10px' }}>28.06.2026</p>
    </footer>
  );
}

// Функции WaveLine, GoldDiamond и ScrollDivider остаются как в вашем оригинале.

/* ─── Kazakh Scroll Ornament ────────────────────────────────────── */


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



export function ScrollDivider({ opacity = 0.55 }) {
  return (
    <svg viewBox="0 0 400 28" style={{ width: '100%', maxWidth: '400px', display: 'block', margin: '0 auto', opacity }}>
      <path d="M0,14 Q20,4 40,14 Q20,24 0,14Z" fill="none" stroke="rgba(0,0,0,0.22)" strokeWidth="0.8"/>
      <path d="M40,14 L170,14" stroke="rgba(0,0,0,0.18)" strokeWidth="0.6"/>
      <path d="M90,10 L94,14 L90,18 L86,14Z" fill="#888" opacity="0.35"/>
      <path d="M140,10 L144,14 L140,18 L136,14Z" fill="#888" opacity="0.35"/>
      <circle cx="200" cy="14" r="10" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="1"/>
      <circle cx="200" cy="14" r="5" fill="none" stroke="var(--gold)" strokeWidth="0.7"/>
      <line x1="200" y1="4" x2="200" y2="24" stroke="var(--gold)" strokeWidth="0.6" opacity="0.5"/>
      <line x1="190" y1="14" x2="210" y2="14" stroke="var(--gold)" strokeWidth="0.6" opacity="0.5"/>
      <circle cx="200" cy="14" r="2" fill="var(--gold)" opacity="0.7"/>
      <path d="M230,14 L360,14" stroke="rgba(0,0,0,0.18)" strokeWidth="0.6"/>
      <path d="M260,10 L264,14 L260,18 L256,14Z" fill="#888" opacity="0.35"/>
      <path d="M310,10 L314,14 L310,18 L306,14Z" fill="#888" opacity="0.35"/>
      <path d="M400,14 Q380,4 360,14 Q380,24 400,14Z" fill="none" stroke="rgba(0,0,0,0.22)" strokeWidth="0.8"/>
    </svg>
  )
}

