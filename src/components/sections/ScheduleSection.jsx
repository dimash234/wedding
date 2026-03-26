import React, { useState, useContext } from 'react';
import { LangContext } from '../../context/LangContext';
import { Reveal } from '../common/Reveal';
import { SectionLabel } from '../common/SectionLabel';

export function ScheduleSection() {
  const { t } = useContext(LangContext);
  const photos = ['./nev.png', './arch.png', './cake.png'];

  return (
    <section id="schedule" style={{ padding: 'clamp(64px,10vh,96px) 20px', background: 'var(--white)' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 'clamp(44px,8vh,72px)' }}>
          <Reveal delay={0}><SectionLabel>{t.schedule.label}</SectionLabel></Reveal>
          <Reveal delay={0.1}>
            <h2 style={{
              fontFamily: "'Bickham', Georgia, serif",
              fontSize: 'clamp(42px,8vw,64px)',
              fontWeight: 400, color: 'var(--ink)', letterSpacing: '2px',
            }}>{t.schedule.title}</h2>
          </Reveal>
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute', left: '50%', top: 0, bottom: 0,
            width: '1px', transform: 'translateX(-50%)',
            background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.15) 12%, rgba(0,0,0,0.15) 88%, transparent)',
          }} />

          {t.schedule.items.map((item, i) => {
            const flip = i % 2 === 0;
            return (
              <Reveal key={i} delay={i * 0.15} y={24} style={{ marginBottom: i < t.schedule.items.length - 1 ? 'clamp(40px,7vh,64px)' : 0 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 48px 1fr', alignItems: 'center' }}>
                  <div style={{ paddingRight: '24px', display: 'flex', justifyContent: 'flex-end' }}>
                    {flip ? <SchCard item={item} align="right" /> : <SchPhoto src={photos[i]} />}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
                    <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: 'var(--ink)', boxShadow: '0 0 0 4px var(--white), 0 0 0 5.5px rgba(0,0,0,0.2)' }} />
                  </div>
                  <div style={{ paddingLeft: '24px', display: 'flex', justifyContent: 'flex-start' }}>
                    {flip ? <SchPhoto src={photos[i]} /> : <SchCard item={item} align="left" />}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SchCard({ item, align }) {
  return (
    <div style={{ maxWidth: '220px', width: '100%', textAlign: align }}>
      <p style={{ fontFamily: "'Bickham', Georgia, serif", fontSize: 'clamp(26px,5vw,38px)', fontWeight: 400, color: 'var(--ink)', letterSpacing: '2px', lineHeight: 1, marginBottom: '10px' }}>
        {item.time}
      </p>
      <p style={{ fontSize: '13px', fontWeight: 500, letterSpacing: '0.8px', color: 'var(--ink)', marginBottom: '5px', fontFamily: "'Jost', sans-serif" }}>
        {item.title}
      </p>
      <p style={{ fontSize: '12px', color: 'var(--ink)', lineHeight: 1.75, fontWeight: 300, fontFamily: "'Jost', sans-serif", opacity: 0.7 }}>
        {item.desc}
      </p>
    </div>
  );
}

function SchPhoto({ src }) {
  return (
    <div style={{ width: 'clamp(96px,18vw,175px)', height: 'clamp(120px,22vw,215px)', overflow: 'hidden', background: 'var(--white)', flexShrink: 0 }}>
      <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'none' }} />
    </div>
  );
}