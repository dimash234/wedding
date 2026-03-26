import React, { useContext } from 'react';
import { LangContext } from '../../context/LangContext';
import { Reveal } from '../common/Reveal';
import { SectionLabel } from '../common/SectionLabel';
import Countdown from '../Countdown';

export function CountdownSection() {
  const { t } = useContext(LangContext);

  const ScrollDivider = ({ opacity = 0.4 }) => (
    <div
      style={{
        width: '1px',
        height: '60px',
        background: `linear-gradient(to bottom, transparent, rgba(0,0,0,${opacity}), transparent)`,
        margin: '0 auto',
      }}
    />
  );

  return (
    <section
      id="countdown"
      style={{
        padding: 'clamp(56px,10vh,88px) 20px',
        background: 'var(--off)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
        <Reveal delay={0}>
          <SectionLabel>{t.countdown.label}</SectionLabel>
        </Reveal>
        <Reveal delay={0.12} y={20}>
          <Countdown targetDate="2026-06-28T18:00:00" />
        </Reveal>
        <Reveal delay={0.3}>
          <div style={{ marginTop: '40px' }}>
            <ScrollDivider opacity={0.4} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
