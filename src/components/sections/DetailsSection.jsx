import React, { useContext } from 'react';
import { LangContext } from '../../context/LangContext';
import { Reveal } from '../common/Reveal';
import { SectionLabel } from '../common/SectionLabel';

export function DetailsSection() {
  const { t } = useContext(LangContext);
  return (
    <section
      style={{
        padding: 'clamp(56px,9vh,80px) 20px',
        background: 'var(--off)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
        <Reveal delay={0}>
          <SectionLabel>{t.details.label}</SectionLabel>
        </Reveal>

        {/* Top row: date + time */}
        <Reveal delay={0.1}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1px',
              background: 'var(--border)',
              marginBottom: '1px',
            }}
          >
            {[
              [t.details.date, t.details.dv],
              [t.details.time, t.details.tv],
            ].map(([l, v], i) => (
              <div
                key={i}
                style={{
                  padding: 'clamp(18px,4vw,28px) 16px',
                  background: 'var(--white)',
                  textAlign: 'center',
                }}
              >
                <p
                  style={{
                    fontSize: '12px',
                    letterSpacing: '3px',
                    textTransform: 'lowercase',
                    color: 'var(--ink)',
                    marginBottom: '9px',
                    opacity: 0.45,
                    fontFamily: "'Jost', sans-serif",
                    fontWeight: 300,
                  }}
                >
                  {l}
                </p>
                <p
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: 'clamp(16px,3.5vw,22px)',
                    color: 'var(--ink)',
                    letterSpacing: '1.5px',
                    fontWeight: 300,
                  }}
                >
                  {v}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Bottom row: address full width */}
        <Reveal delay={0.2}>
          <div
            style={{
              background: 'var(--white)',
              border: '1px solid var(--border)',
              borderTop: 'none',
              padding: 'clamp(18px,4vw,28px) 16px',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontSize: '12px',
                letterSpacing: '3px',
                textTransform: 'lowercase',
                color: 'var(--soft)',
                marginBottom: '9px',
                fontFamily: "'Jost', sans-serif",
                fontWeight: 300,
              }}
            >
              {t.details.place}
            </p>
            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 'clamp(16px,3.5vw,22px)',
                color: 'var(--ink)',
                letterSpacing: '1px',
                fontWeight: 300,
              }}
            >
              {t.details.pv}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
