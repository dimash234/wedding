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
    maxWidth: '500px',
    position: 'relative',
  }}>
    {/* Decorative corner accent */}
    <div style={{
      position: 'absolute',
      top: '-20px',
      left: '-30px',
      width: '60px',
      height: '60px',
      borderLeft: '1px solid var(--border)',
      borderTop: '1px solid var(--border)',
      opacity: 0.4,
      pointerEvents: 'none',
    }} />
    
    {/* Greeting with decorative underline */}
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <p style={{ 
        fontFamily: "'Bickham', sans-serif", 
        fontSize: 'clamp(44px,9vw,65px)', 
        fontWeight: 300, 
        color: 'var(--ink)', 
        letterSpacing: '1px', 
        marginBottom: '12px',
        position: 'relative',
        zIndex: 1,
      }}>
        {t.greeting}
      </p>
      <div style={{
        position: 'absolute',
        bottom: '8px',
        left: '0',
        width: '100%',
        height: '8px',
        background: 'linear-gradient(90deg, var(--border), transparent)',
        opacity: 0.15,
        zIndex: 0,
      }} />
    </div>
    
    {/* Divider line */}
    <div style={{
      width: '80px',
      height: '1px',
      background: 'linear-gradient(90deg, var(--ink), transparent)',
      margin: '8px 0 16px 0',
      opacity: 0.3,
    }} />
    
    {/* SubGreeting with left border accent */}
    <div style={{
      position: 'relative',
      paddingLeft: '16px',
    }}>
      <div style={{
        position: 'absolute',
        left: '0',
        top: '8px',
        bottom: '8px',
        width: '2px',
        background: 'linear-gradient(180deg, var(--border), transparent)',
        opacity: 0.4,
        borderRadius: '1px',
      }} />
      <p style={{ 
        fontSize: '16px', 
        letterSpacing: '0.5px', 
        color: 'var(--ink)', 
        lineHeight: 2, 
        fontWeight: 300, 
        fontFamily: "'mia', sans-serif",
        marginTop: '0',
      }}>
        {t.subGreeting}
      </p>
    </div>
  </div>
</Reveal>


      </div>
    </section>
  );
}