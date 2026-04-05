import React, { useContext } from 'react';
import { LangContext } from '../context/LangContext';
import { Reveal } from './common/Reveal';

export default function OwnerSection() {
  const { t } = useContext(LangContext);

  return (
    <section
      id="owner"
      style={{
        padding: 'clamp(32px, 6vh, 48px) 12px',
        background: 'linear-gradient(180deg, var(--off) 0%, #f8f6f3 50%, var(--off) 100%)',
        borderTop: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background circles */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '-5%',
        width: '200px',
        height: '200px',
        border: '1px solid var(--border)',
        borderRadius: '50%',
        opacity: 0.3,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '-8%',
        width: '150px',
        height: '150px',
        border: '1px solid var(--border)',
        borderRadius: '50%',
        opacity: 0.2,
        pointerEvents: 'none',
      }} />
      
      {/* Dot pattern */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: '60px',
        height: '60px',
        backgroundImage: 'radial-gradient(circle, var(--border) 1px, transparent 1px)',
        backgroundSize: '8px 8px',
        opacity: 0.4,
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        <Reveal delay={0}>
  <div style={{ 
    position: 'relative', 
    textAlign: 'center', 
    marginBottom: '40px',
    padding: '30px 40px',
  }}>
    {/* Four symmetric corner frames */}
    <div style={{
      position: 'absolute',
      top: '0',
      left: '0',
      width: '25px',
      height: '25px',
      borderLeft: '1px solid var(--border)',
      borderTop: '1px solid var(--border)',
      opacity: 0.4,
    }} />
    <div style={{
      position: 'absolute',
      top: '0',
      right: '0',
      width: '25px',
      height: '25px',
      borderRight: '1px solid var(--border)',
      borderTop: '1px solid var(--border)',
      opacity: 0.4,
    }} />
    <div style={{
      position: 'absolute',
      bottom: '0',
      left: '0',
      width: '25px',
      height: '25px',
      borderLeft: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      opacity: 0.4,
    }} />
    <div style={{
      position: 'absolute',
      bottom: '0',
      right: '0',
      width: '25px',
      height: '25px',
      borderRight: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      opacity: 0.4,
    }} />

    {/* Symmetric ornamental dots - corners */}
    <div style={{
      position: 'absolute',
      top: '15px',
      right: '15px',
      width: '30px',
      height: '30px',
      backgroundImage: 'radial-gradient(circle, var(--border) 1.5px, transparent 1.5px)',
      backgroundSize: '8px 8px',
      opacity: 0.3,
    }} />
    <div style={{
      position: 'absolute',
      bottom: '15px',
      left: '15px',
      width: '30px',
      height: '30px',
      backgroundImage: 'radial-gradient(circle, var(--border) 1.5px, transparent 1.5px)',
      backgroundSize: '8px 8px',
      opacity: 0.3,
    }} />

    {/* Vertical side accents */}
    <div style={{
      position: 'absolute',
      left: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      height: '60%',
      width: '1px',
      background: 'linear-gradient(180deg, transparent, var(--border) 50%, transparent)',
      opacity: 0.3,
    }} />
    <div style={{
      position: 'absolute',
      right: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      height: '60%',
      width: '1px',
      background: 'linear-gradient(180deg, transparent, var(--border) 50%, transparent)',
      opacity: 0.3,
    }} />

    {/* Top decorative flourish */}
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      marginBottom: '20px',
    }}>
      <div style={{
        width: '60px',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--border))',
        opacity: 0.5,
      }} />
      <div style={{
        width: '6px',
        height: '6px',
        transform: 'rotate(45deg)',
        border: '1px solid var(--border)',
        opacity: 0.5,
      }} />
      <div style={{
        width: '60px',
        height: '1px',
        background: 'linear-gradient(90deg, var(--border), transparent)',
        opacity: 0.5,
      }} />
    </div>

    {/* label with decorative lines */}
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px',
      marginBottom: '12px',
    }}>
      <span style={{
        width: '40px',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--border))',
      }} />
      <p style={{
        fontSize: '16px',
        letterSpacing: '2px',
        color: 'black',
        fontFamily: "'Ante', Georgia, serif",
        fontWeight: 300,
        margin: 0,
      }}>
        {t.host.label}
      </p>
      <span style={{
        width: '40px',
        height: '1px',
        background: 'linear-gradient(90deg, var(--border), transparent)',
      }} />
    </div>

    {/* name with symmetric double underline accent */}
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <h2 style={{
        fontFamily: "'Bickham', Georgia, serif",
        fontSize: 'clamp(42px,8vw,64px)',
        fontWeight: 300,
        color: 'black',
        letterSpacing: '2px',
        margin: '0 0 16px 0',
      }}>
        {t.host.title}
      </h2>
      {/* Top accent line */}
      <div style={{
        position: 'absolute',
        top: '-8px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '40px',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--ink), transparent)',
        opacity: 0.3,
      }} />
      {/* Bottom accent line */}
      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '60px',
        height: '2px',
        background: 'linear-gradient(90deg, transparent, var(--ink), transparent)',
        opacity: 0.3,
      }} />
      {/* Center diamond */}
      <div style={{
        position: 'absolute',
        bottom: '-3px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '4px',
        height: '4px',
        background: 'var(--ink)',
        opacity: 0.4,
        transform: 'translateX(-50%) rotate(45deg)',
      }} />
    </div>

    {/* Bottom decorative flourish */}
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      marginTop: '20px',
      marginBottom: '16px',
    }}>
      <div style={{
        width: '30px',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--border))',
        opacity: 0.4,
      }} />
      <div style={{
        width: '4px',
        height: '4px',
        borderRadius: '50%',
        background: 'var(--border)',
        opacity: 0.5,
      }} />
      <div style={{
        width: '4px',
        height: '4px',
        borderRadius: '50%',
        background: 'var(--border)',
        opacity: 0.5,
      }} />
      <div style={{
        width: '30px',
        height: '1px',
        background: 'linear-gradient(90deg, var(--border), transparent)',
        opacity: 0.4,
      }} />
    </div>

    {/* sub with decorative dots */}
    {t.host.sub && (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
      }}>
        <span style={{
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          background: 'var(--ink)',
          opacity: 0.4,
        }} />
        <p style={{
          fontFamily: "'mia', Georgia, serif",
          fontSize: '19px',
          color: 'var(--ink)',
          opacity: 1.0,
          margin: 0,
        }}>
          {t.host.sub}
        </p>
        <span style={{
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          background: 'var(--ink)',
          opacity: 0.4,
        }} />
      </div>
    )}
  </div>
</Reveal>

      </div>
    </section>
  );
}