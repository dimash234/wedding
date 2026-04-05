import React, { useContext } from 'react';
import { LangContext } from '../../context/LangContext';
import { Reveal } from '../common/Reveal';
import { SectionLabel } from '../common/SectionLabel';
import Calendar from '../Calendar';

export function CalendarSection() {
  const { t } = useContext(LangContext);
  return (
    <section
      style={{
        padding: 'clamp(32px, 6vh, 48px) 12px',
        background: 'var(--white)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '440px', margin: '0 auto', textAlign: 'center' }}>
        <Reveal delay={0}>
          <SectionLabel>{t.calendar.label}</SectionLabel>
        </Reveal>

        {/* Дата текстом под лейблом */}
        <Reveal delay={0.06} y={10}>
          <p style={{
            fontFamily: "'Ante', sans-serif",
            fontSize: 'clamp(13px, 3vw, 15px)',
            letterSpacing: '3px',
            textTransform: 'lowercase',
            color: 'var(--ink)',
            opacity: 0.45,
            marginBottom: '24px',
            fontWeight: 300,
          }}>
            {t.details.dv} · {t.details.tv}
          </p>
        </Reveal>

        <Reveal delay={0.12} y={20}>
          <Calendar weddingDate="2026-06-28" />
        </Reveal>
      </div>
    </section>
  );
}