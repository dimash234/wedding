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
        padding: 'clamp(40px, 8vh, 64px) 16px',
        background: 'var(--white)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '440px', margin: '0 auto', textAlign: 'center' }}>
        <Reveal delay={0}>
          <SectionLabel>{t.calendar.label}</SectionLabel>
        </Reveal>
        <Reveal delay={0.12} y={20}>
          <Calendar weddingDate="2026-06-28" />
        </Reveal>
      </div>
    </section>
  );
}
