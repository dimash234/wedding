import React, { useContext } from 'react';
import { LangContext } from '../../context/LangContext';
import { Reveal } from '../common/Reveal';
import { MusicRing } from './MusicRing';

export function Hero() {
  const { t, playing, toggle } = useContext(LangContext);

  return (
    <section id="hero">
      <div style={{ position: 'relative', width: '100%', height: '100svh', minHeight: '600px', overflow: 'hidden', background: 'var(--cream)' }}>
        <img src="./photo1.jpg" alt="Р & Ж" className="scale-in"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }}
        />
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(180deg, rgba(10,8,5,0.55) 0%, rgba(10,8,5,0.10) 35%, rgba(10,8,5,0.06) 60%, rgba(255,255,255,0.0) 80%, var(--white) 100%)',
        }} />

        {/* Initials */}
        <div style={{ position: 'absolute', top: '18%', left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none' }}>
          <h1 className="rise-1" style={{
            fontFamily: "'Bickham', Georgia, serif",
            fontSize: 'clamp(120px,25vw,220px)',
            fontWeight: 400, letterSpacing: 'clamp(10px,3.5vw,26px)',
            color: 'white', lineHeight: 1, textShadow: '0 3px 40px rgba(0,0,0,0.3)',
          }}>
            Р{' '}
            <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.42em', letterSpacing: 0, verticalAlign: 'middle' }}>{'&'}</span>
            {' '}Ж
          </h1>
          <p className="rise-2" style={{
            marginTop: '14px', fontSize: '10px', letterSpacing: '7px',
            textTransform: 'lowercase', color: 'rgba(255,255,255,0.55)',
            fontWeight: 300, fontFamily: "'Jost', sans-serif",
          }}>{t.invite}</p>
        </div>

        {/* Music button */}
        <div style={{ position: 'absolute', top: '65%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <MusicRing playing={playing} onClick={toggle} />
        </div>

        {/* Date bottom */}
        <p className="rise-4" style={{
          position: 'absolute', bottom: '10%', left: 0, right: 0, textAlign: 'center',
          fontSize: '10px', letterSpacing: '6px', textTransform: 'lowercase',
          color: 'rgba(255,255,255,0.5)', fontWeight: 300, pointerEvents: 'none',
          fontFamily: "'Jost', sans-serif",
        }}>сенбі · 28.06.2026 · 18:00</p>
      </div>

      {/* Below photo */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 'clamp(40px,8vh,72px) 24px clamp(52px,10vh,88px)', background: 'var(--white)', textAlign: 'center' }}>

        <Reveal delay={0}>
          <h2 style={{
            fontFamily: "'Bickham', Georgia, serif",
            fontSize: 'clamp(50px,12vw,80px)',
            fontWeight: 400, letterSpacing: 'clamp(1px,0.5vw,4px)',
            color: 'var(--ink)', lineHeight: 1.2,
          }}>
            Райымбек{' '}
            <span style={{ fontStyle: 'normal', fontSize: '0.65em' }}>{'&'}</span>
            {' '}Жансая
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <p style={{
            marginTop: '16px', fontFamily: "'Bickham', Georgia, serif",
            fontSize: 'clamp(22px,5vw,38px)', fontWeight: 400,
            letterSpacing: 'clamp(2px,1vw,5px)', color: 'var(--ink)',
          }}>28.06.2026</p>
        </Reveal>

        <Reveal delay={0.22}>
          <div style={{ margin: 'clamp(16px,3vh,28px) 0' }}>
            <KazakhScrollOrnament />
          </div>
        </Reveal>

        <Reveal delay={0.36}>
          <div style={{ marginTop: 'clamp(20px,4vh,36px)', maxWidth: '500px' }}>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 'clamp(18px,3.5vw,26px)', fontWeight: 300, color: 'var(--ink)', letterSpacing: '1px', marginBottom: '12px' }}>
              {t.greeting}
            </p>
            <p style={{ fontSize: '14px', letterSpacing: '0.5px', color: 'var(--ink)', lineHeight: 2, fontWeight: 300, fontFamily: "'Jost', sans-serif" }}>
              {t.subGreeting}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function KazakhScrollOrnament() {
  return (
    <svg viewBox="0 0 280 48" style={{ width: '100%', maxWidth: '280px', height: 'auto', display: 'block', margin: '0 auto', opacity: 0.65 }}>
      <path d="M140,8 C143,14 143,20 140,24 C137,20 137,14 140,8Z" fill="var(--ink)" opacity="0.7"/>
      <path d="M140,40 C143,34 143,28 140,24 C137,28 137,34 140,40Z" fill="var(--ink)" opacity="0.7"/>
      <path d="M128,24 C134,21 140,21 144,24 C140,27 134,27 128,24Z" fill="var(--ink)" opacity="0.7"/>
      <path d="M152,24 C146,21 140,21 136,24 C140,27 146,27 152,24Z" fill="var(--ink)" opacity="0.7"/>
      <circle cx="140" cy="24" r="4.5" fill="none" stroke="var(--ink)" strokeWidth="1"/>
      <circle cx="140" cy="24" r="2" fill="var(--ink)" opacity="0.8"/>
      <line x1="0" y1="24" x2="108" y2="24" stroke="var(--ink)" strokeWidth="0.7" opacity="0.4"/>
      <line x1="172" y1="24" x2="280" y2="24" stroke="var(--ink)" strokeWidth="0.7" opacity="0.4"/>
      <path d="M108,24 Q100,14 92,18 Q88,22 92,26 Q96,30 100,26 Q102,22 98,20" fill="none" stroke="var(--ink)" strokeWidth="1" opacity="0.6"/>
      <path d="M92,24 Q80,10 68,16 Q62,20 66,27 Q70,33 78,29 Q84,25 80,19" fill="none" stroke="var(--ink)" strokeWidth="1" opacity="0.5"/>
      <path d="M68,24 Q54,8 40,15 Q34,20 38,28 Q44,35 54,30 Q62,25 56,17" fill="none" stroke="var(--ink)" strokeWidth="1" opacity="0.4"/>
      <path d="M172,24 Q180,14 188,18 Q192,22 188,26 Q184,30 180,26 Q178,22 182,20" fill="none" stroke="var(--ink)" strokeWidth="1" opacity="0.6"/>
      <path d="M188,24 Q200,10 212,16 Q218,20 214,27 Q210,33 202,29 Q196,25 200,19" fill="none" stroke="var(--ink)" strokeWidth="1" opacity="0.5"/>
      <path d="M212,24 Q226,8 240,15 Q246,20 242,28 Q236,35 226,30 Q218,25 224,17" fill="none" stroke="var(--ink)" strokeWidth="1" opacity="0.4"/>
    </svg>
  );
}