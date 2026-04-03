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
            <span style={{ color: 'white', fontSize: '0.42em', letterSpacing: 0, verticalAlign: 'middle' }}>{'&'}</span>
            {' '}Ж
          </h1>
          <p className="rise-2" style={{
            marginTop: '14px', fontSize: '10px', letterSpacing: '7px',
            textTransform: 'lowercase', color: 'rgb(255, 255, 255)',
            fontWeight: 300, fontFamily: "'Jost', sans-serif",
          }}>{t.invite}</p>
        </div>

        {/* Music button */}
        <div style={{ position: 'absolute', top: '65%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <MusicRing playing={playing} onClick={toggle} />
        </div>

        {/* Date bottom */}
        
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
            marginTop: '1px', fontFamily: "'Bickham', Georgia, serif",
            fontSize: 'clamp(50px,12vw,80px)', fontWeight: 400,
            letterSpacing: 'clamp(2px,1vw,5px)', color: 'var(--ink)',
          }}>28.06.2026</p>
        </Reveal>

        <Reveal delay={0.28}>
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    
    <img
      src="./floral3.svg"
      alt="decor"
      style={{
        width: '300px',     // ← стало в 2 раза шире и больше
        height: '150px',    // ← стало в 2 раза выше
        display: 'block',
        objectFit: 'fill'
      }}
    />
  </div>
</Reveal>

       <Reveal delay={0.36}>
  <div style={{ 
    marginTop: '0', 
    maxWidth: '520px',
    position: 'relative',
    padding: '40px 32px',
  }}>
    {/* Subtle shadow layer */}
    <div style={{
      position: 'absolute',
      inset: '0',
      background: 'var(--white)',
      boxShadow: '0 4px 30px rgba(0,0,0,0.03)',
      borderRadius: '2px',
      zIndex: 0,
    }} />
    
    {/* Top decorative line with ornament */}
    <div style={{
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '28px',
    }}>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, var(--border))', opacity: 0.6 }} />
      <span style={{ 
        margin: '0 16px', 
        color: 'var(--border)', 
        fontSize: '14px',
        opacity: 0.8,
      }}>◇</span>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, var(--border), transparent)', opacity: 0.6 }} />
    </div>

    {/* Greeting with refined underline */}
    <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
      <p style={{ 
        fontFamily: "'Bickham', Georgia, serif", 
        fontSize: 'clamp(40px,8vw,56px)', 
        fontWeight: 300, 
        color: 'var(--ink)', 
        letterSpacing: '3px', 
        marginBottom: '8px',
        lineHeight: 1.1,
      }}>
        {t.greeting}
      </p>
      <div style={{
        width: '40px',
        height: '1px',
        background: 'var(--ink)',
        margin: '16px auto',
        opacity: 0.3,
      }} />
    </div>

    {/* SubGreeting — simple with first letter accent */}
    <div style={{ position: 'relative', zIndex: 1, marginTop: '24px' }}>
      <p style={{ 
        fontSize: '15px', 
        letterSpacing: '0.6px', 
        color: 'var(--ink)', 
        lineHeight: 1.8, 
        fontWeight: 400, 
        fontFamily: "'mia', Georgia, serif",
        textAlign: 'center',
        opacity: 0.85,
      }}>
        <span style={{
          fontFamily: "'Bickham', Georgia, serif",
          fontSize: '1.4em',
          float: 'left',
          lineHeight: 0.8,
          marginRight: '4px',
          marginTop: '2px',
          opacity: 0.6,
        }}>
          {t.subGreeting?.charAt(0)}
        </span>
        {t.subGreeting?.slice(1)}
      </p>
    </div>

    {/* Bottom decorative element */}
    <div style={{
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '28px',
    }}>
      <div style={{ width: '60px', height: '1px', background: 'var(--border)', opacity: 0.4 }} />
      <div style={{
        width: '5px',
        height: '5px',
        border: '1px solid var(--border)',
        transform: 'rotate(45deg)',
        margin: '0 12px',
        opacity: 0.5,
      }} />
      <div style={{ width: '60px', height: '1px', background: 'var(--border)', opacity: 0.4 }} />
    </div>
  </div>
</Reveal>


      </div>
    </section>
  );
}