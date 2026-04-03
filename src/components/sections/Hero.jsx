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
    padding: '20px 0',
  }}>
    {/* Все 4 угловые рамки */}
    <div style={{
      position: 'absolute',
      top: '0',
      left: '-10px',
      width: '30px',
      height: '30px',
      borderLeft: '1px solid var(--border)',
      borderTop: '1px solid var(--border)',
      opacity: 0.5,
      transition: 'all 0.4s ease',
    }} />
    <div style={{
      position: 'absolute',
      top: '0',
      right: '-10px',
      width: '30px',
      height: '30px',
      borderRight: '1px solid var(--border)',
      borderTop: '1px solid var(--border)',
      opacity: 0.5,
    }} />
    <div style={{
      position: 'absolute',
      bottom: '0',
      left: '-10px',
      width: '30px',
      height: '30px',
      borderLeft: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      opacity: 0.5,
    }} />
    <div style={{
      position: 'absolute',
      bottom: '0',
      right: '-10px',
      width: '30px',
      height: '30px',
      borderRight: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      opacity: 0.5,
    }} />
    
    {/* Паттерн из точек */}
    <div style={{
      position: 'absolute',
      top: '10px',
      right: '20px',
      width: '40px',
      height: '40px',
      backgroundImage: 'radial-gradient(circle, var(--border) 1.5px, transparent 1.5px)',
      backgroundSize: '10px 10px',
      opacity: 0.3,
    }} />

    {/* Плавающие частицы */}
    {[...Array(3)].map((_, i) => (
      <div
        key={i}
        style={{
          position: 'absolute',
          width: '3px',
          height: '3px',
          background: 'var(--ink)',
          borderRadius: '50%',
          opacity: 0.15,
          right: `${25 + i * 12}px`,
          top: `${60 + i * 25}px`,
        }}
      />
    ))}

    {/* Вертикальный текст (боковой) */}
    <div style={{
      position: 'absolute',
      right: '-35px',
      top: '50%',
      transform: 'translateY(-50%) rotate(90deg)',
      fontSize: '9px',
      letterSpacing: '3px',
      color: 'var(--border)',
      textTransform: 'uppercase',
      opacity: 0.5,
      fontFamily: 'monospace',
      whiteSpace: 'nowrap',
    }}>
      SCROLL • EXPLORE
    </div>

    {/* Приветствие с подчеркиванием */}
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <p style={{ 
        fontFamily: "'Bickham', sans-serif", 
        fontSize: 'clamp(44px,9vw,65px)', 
        fontWeight: 300, 
        color: 'var(--ink)', 
        letterSpacing: '2px', 
        marginBottom: '16px',
      }}>
        {t.greeting}
      </p>
      
      {/* Подчеркивание с градиентом */}
      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        width: '100%',
        height: '1px',
        background: 'linear-gradient(90deg, var(--ink), var(--border), transparent)',
        opacity: 0.4,
      }} />
      
      {/* Декоративная точка под текстом */}
      <div style={{
        position: 'absolute',
        bottom: '-4px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '6px',
        height: '6px',
        border: '1px solid var(--border)',
        borderRadius: '50%',
        background: 'var(--off)',
      }} />

      {/* SVG завиток справа */}
      <svg 
        width="50" 
        height="20" 
        viewBox="0 0 50 20" 
        style={{
          position: 'absolute',
          right: '-60px',
          top: '40%',
          transform: 'translateY(-50%)',
          opacity: 0.3,
        }}
      >
        <path
          d="M0,10 Q12.5,0 25,10 T50,10"
          fill="none"
          stroke="var(--border)"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    </div>
    
    {/* Декоративный разделитель с ромбом */}
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      margin: '24px 0',
    }}>
      <div style={{
        flex: 1,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--border))',
        opacity: 0.4,
      }} />
      <div style={{
        width: '10px',
        height: '10px',
        transform: 'rotate(45deg)',
        border: '1px solid var(--border)',
        opacity: 0.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          width: '3px',
          height: '3px',
          background: 'var(--ink)',
          borderRadius: '50%',
          opacity: 0.5,
        }} />
      </div>
      <div style={{
        flex: 1,
        height: '1px',
        background: 'linear-gradient(90deg, var(--border), transparent)',
        opacity: 0.4,
      }} />
    </div>
    
    {/* Подзаголовок с акцентом слева */}
    <div style={{
      position: 'relative',
      paddingLeft: '24px',
    }}>
      {/* Вертикальная линия */}
      <div style={{
        position: 'absolute',
        left: '0',
        top: '0',
        bottom: '0',
        width: '3px',
        background: 'linear-gradient(180deg, var(--ink) 0%, var(--border) 50%, transparent 100%)',
        opacity: 0.25,
        borderRadius: '2px',
      }} />
      
      {/* Точка на линии */}
      <div style={{
        position: 'absolute',
        left: '6px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '4px',
        height: '4px',
        borderRadius: '50%',
        background: 'var(--border)',
        opacity: 0.5,
      }} />
      
      <p style={{ 
        fontSize: '18px', 
        letterSpacing: '0.8px', 
        color: 'var(--ink)', 
        lineHeight: 1.9, 
        fontWeight: 700, 
        fontFamily: "'mia', sans-serif",
        margin: '0',
        opacity: 1,
      }}>
        {t.subGreeting}
      </p>
    </div>

    {/* Нумерация внизу */}
    <div style={{
      position: 'absolute',
      bottom: '-25px',
      right: '0',
      fontSize: '11px',
      color: 'var(--border)',
      letterSpacing: '2px',
      fontFamily: 'monospace',
      opacity: 0.6,
    }}>
      — 01 —
    </div>
  </div>
</Reveal>

      </div>
    </section>
  );
}