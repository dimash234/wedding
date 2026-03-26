import React, { useState, useEffect } from 'react';
import MapSection from './components/MapSection';
import RSVPForm from './components/RSVPForm';
import { translations } from './lang';
import { LangContext } from './context/LangContext';
import { Navbar } from './components/sections/Navbar';
import { Hero } from './components/sections/Hero';
import { ScheduleSection } from './components/sections/ScheduleSection';
import { CalendarSection } from './components/sections/CalendarSection';
import { DetailsSection } from './components/sections/DetailsSection';
import { CountdownSection } from './components/sections/CountdownSection';
import { FooterSection } from './components/sections/FooterSection';

/* ─── Audio Instance ─────────────────────────────────────────────── */
const audio = new Audio('./music/mahabbat.mp3');
audio.loop = true;
audio.volume = 0.55;

const bootAudio = () => {
  const playAudio = () => audio.play().catch(() => {});
  ['click', 'touchstart', 'scroll'].forEach((ev) =>
    document.addEventListener(ev, playAudio, { once: true })
  );
};
bootAudio();

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState('kz');
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
    };
  }, []);

  const toggleMusic = () => (playing ? audio.pause() : audio.play().catch(() => {}));
  const t = translations[lang];

  return (
    <LangContext.Provider value={{ t, lang, setLang, playing, toggle: toggleMusic }}>
      <div style={{ background: 'var(--white)' }}>
        <Navbar scrolled={scrolled} />
        <Hero />
        <CalendarSection />
        <CountdownSection />
        <ScheduleSection />
        <DetailsSection />
        <MapSection />
        <RSVPForm />
        <FooterSection />
      </div>
    </LangContext.Provider>
  );
}

/* ─── Shared UI ──────────────────────────────────────────────────── */
function SectionLabel({ children }) {
  return (
    <p style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px',
      fontSize: '13px', letterSpacing: '5px', textTransform: 'lowercase',
      color: 'var(--soft)', marginBottom: '20px', fontWeight: 300,
      fontFamily: "'Jost', sans-serif",
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

