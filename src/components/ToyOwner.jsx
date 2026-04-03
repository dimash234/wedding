import React, { useContext } from 'react';
import { LangContext } from '../context/LangContext';
import { Reveal } from './common/Reveal';

export default function MapSection() {
  const { t } = useContext(LangContext);

  return (
    <section
      id="map"
      style={{
        padding: 'clamp(32px, 6vh, 48px) 12px',
        background: 'var(--off)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>

        <Reveal delay={0}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>

            {/* label */}
            <p style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '14px',
              fontSize: 'clamp(48px,9vw,72px)',
              letterSpacing: '2px',
              color: 'var(--ink)',
              opacity: 0.7,
              marginBottom: '12px',
              fontFamily: "'Bickham', Georgia, serif",
              fontWeight: 300,
            }}>
              {t.host.label}
            </p>

            {/* name */}
            <h2 style={{
              fontFamily: "'Bickham', Georgia, serif",
              fontSize: 'clamp(42px,8vw,64px)',
              fontWeight: 300,
              color: 'var(--ink)',
              letterSpacing: '2px',
              marginBottom: '10px',
            }}>
              {t.host.title}
            </h2>

            {/* sub */}
            {t.host.sub && (
              <p style={{
                fontFamily: "'Bickham', Georgia, serif",
                fontSize: 'clamp(27px,6vw,33px)',
                color: 'var(--ink)',
                opacity: 0.7,
                marginTop: '8px',
              }}>
                {t.host.sub}
              </p>
            )}

          </div>
        </Reveal>

      </div>
    </section>
  );
}