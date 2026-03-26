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
    <div style={{ maxWidth: '280px', width: '100%', textAlign: align }}>
      <p style={{ 
        fontFamily: "'Bickham', Georgia, serif", 
        fontSize: 'clamp(32px, 5vw, 42px)', // Сделали чуть крупнее
        fontWeight: 400, 
        color: 'var(--ink)', 
        lineHeight: 1, 
        marginBottom: '8px' 
      }}>
        {item.time}
      </p>
      <p style={{ 
        fontSize: '14px', 
        fontWeight: 500, 
        textTransform: 'uppercase', // Добавим стиля заголовку
        letterSpacing: '1.5px', 
        color: 'var(--ink)', 
        marginBottom: '6px', 
        fontFamily: "'Jost', sans-serif" 
      }}>
        {item.title}
      </p>
      <p style={{ 
        fontSize: '13px', 
        color: 'var(--ink)', 
        lineHeight: 1.6, 
        fontWeight: 300, 
        fontFamily: "'Jost', sans-serif", 
        opacity: 0.8 
      }}>
        {item.desc}
      </p>
    </div>
  );
}

function SchPhoto({ src }) {
  return (
    <div style={{ 
      width: 'clamp(140px, 25vw, 220px)', // Увеличили ширину
      height: 'clamp(180px, 32vw, 280px)', // Увеличили высоту
      overflow: 'hidden', 
      flexShrink: 0,
      borderRadius: '2px', // Легкое смягчение углов
      boxShadow: '0 4px 15px rgba(0,0,0,0.05)' // Добавим глубины
    }}>
      <img 
        src={src} 
        alt="" 
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover',
          display: 'block' // Убирает лишние отступы снизу
        }} 
        onError={(e) => { e.target.style.display = 'none'; }} // Спрячет битую картинку
      />
    </div>
  );
}