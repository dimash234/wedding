import React, { useContext } from 'react';
import { LangContext } from '../context/LangContext';
import { Reveal } from './common/Reveal';

export default function MapSection() {
  const { t } = useContext(LangContext);
  const FONT = "'Jost', sans-serif";

  return (
    <section id="map" style={{ padding: 'clamp(56px,9vh,88px) 20px', background: 'var(--off)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>

        <Reveal delay={0}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px',
              fontSize: '13px', letterSpacing: '3px', textTransform: 'lowercase',
              color: 'var(--ink)', opacity: 0.45, marginBottom: '18px',
              fontFamily: FONT, fontWeight: 400,
            }}>
              <span style={{ display: 'inline-block', width: '32px', height: '1px', background: 'linear-gradient(to right,transparent,rgba(0,0,0,0.2),transparent)' }} />
              {t.map.label}
              <span style={{ display: 'inline-block', width: '32px', height: '1px', background: 'linear-gradient(to right,transparent,rgba(0,0,0,0.2),transparent)' }} />
            </p>
            <h2 style={{ fontFamily: "'Bickham', Georgia, serif", fontSize: 'clamp(22px,4vw,34px)', fontWeight: 300, color: 'var(--ink)', letterSpacing: '2px', marginBottom: '8px' }}>
              {t.map.title}
            </h2>
            <p style={{ fontFamily: FONT, fontSize: '14px', letterSpacing: '2px', color: 'var(--ink)', fontWeight: 300, opacity: 0.55 }}>
              {t.map.sub}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div style={{ overflow: 'hidden', border: '1px solid var(--border)' }}>
            <div style={{ height: '2px', background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.15), transparent)' }} />
            <iframe
              src="https://widgets.2gis.com/widget?type=firmsonmap&options=%7B%22pos%22%3A%7B%22lat%22%3A43.305975%2C%22lon%22%3A77.04876%2C%22zoom%22%3A16%7D%2C%22opt%22%3A%7B%22city%22%3A%22almaty%22%7D%2C%22org%22%3A%2270000001054095105%22%7D"
              width="100%" height="420"
              style={{ border: 'none', display: 'block' }}
              title="map" allowFullScreen
            />
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
            <a
              href="https://2gis.kz/almaty/firm/70000001054095105/77.04876,43.305975"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-block', padding: '14px 40px',
                background: 'var(--ink)', color: 'white', textDecoration: 'none',
                fontSize: '11px', letterSpacing: '3px', textTransform: 'lowercase',
                fontFamily: FONT, fontWeight: 300, transition: 'opacity 0.3s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >{t.map.btn2gis}</a>
          </div>
        </Reveal>

      </div>
    </section>
  );
}