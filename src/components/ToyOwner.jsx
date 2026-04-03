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
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>

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
                fontSize: 'clamp(48px,9vw,72px)',
                letterSpacing: '2px',
                color: 'black',
                fontFamily: "'Bickham', Georgia, serif",
                fontWeight: 300,
              }}>
                {t.host.label}
              </p>
              <span style={{
                width: '40px',
                height: '1px',
                background: 'linear-gradient(90deg, var(--border), transparent)',
              }} />
            </div>

            {/* name with underline accent */}
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <h2 style={{
                fontFamily: "'Bickham', Georgia, serif",
                fontSize: 'clamp(42px,8vw,64px)',
                fontWeight: 300,
                color: 'black',
                letterSpacing: '2px',
                marginBottom: '10px',
              }}>
                {t.host.title}
              </h2>
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
            </div>

            {/* sub with decorative dots */}
            {t.host.sub && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                marginTop: '16px',
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
                  fontSize: '16px',
                  color: 'var(--ink)',
                  opacity: 0.7,
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