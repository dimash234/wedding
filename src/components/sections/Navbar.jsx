import React, { useContext } from 'react';
import { LangContext } from '../../context/LangContext';

export function Navbar({ scrolled }) {
  const { t, lang, setLang } = useContext(LangContext);

  const linkColor = scrolled ? 'var(--mid)' : 'rgba(255,255,255,0.75)';
  const linkHover = scrolled ? 'var(--ink)' : 'white';
  const logoColor = scrolled ? 'var(--ink)' : 'white';

  return (
    <nav
      style={{
        position: 'fixed',
        inset: '0 0 auto',
        zIndex: 300,
        height: '58px',
        padding: '0 clamp(20px,5vw,48px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(255,255,255,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : 'none',
        transition: 'all 0.5s cubic-bezier(.16,1,.3,1)',
      }}
    >
      {/* Logo */}
      <span
        style={{
          fontFamily: "'Anastasia Script', Georgia, serif",
          fontSize: '28px',
          letterSpacing: '5px',
          color: logoColor,
          fontWeight: 300,
          transition: 'color 0.4s',
        }}
      >
        Р · Ж
      </span>

      {/* Links */}
      <div style={{ display: 'flex', gap: 'clamp(16px,3vw,32px)', alignItems: 'center' }}>
        {[['#schedule', t.nav.schedule], ['#map', t.nav.place], ['#rsvp', t.nav.rsvp]].map(([h, l]) => (
          <a
            key={h}
            href={h}
            style={{
              fontSize: '9.5px',
              letterSpacing: '2.5px',
              textTransform: 'lowercase',
              color: linkColor,
              textDecoration: 'none',
              transition: 'color 0.3s',
              fontFamily: "'Jost', sans-serif",
            }}
            onMouseEnter={(e) => (e.target.style.color = linkHover)}
            onMouseLeave={(e) => (e.target.style.color = linkColor)}
          >
            {l}
          </a>
        ))}

        {/* Lang */}
        <div style={{ display: 'flex', gap: '0', marginLeft: '4px' }}>
          {['kz', 'ru'].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 9px',
                fontSize: '9px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color:
                  lang === l
                    ? scrolled
                      ? 'var(--ink)'
                      : 'white'
                    : scrolled
                    ? 'var(--soft)'
                    : 'rgba(255,255,255,0.4)',
                fontWeight: lang === l ? 500 : 300,
                borderBottom:
                  lang === l
                    ? `1px solid ${scrolled ? 'var(--gold)' : 'rgba(255,255,255,0.7)'}`
                    : '1px solid transparent',
                transition: 'all 0.3s',
                fontFamily: "'Jost', sans-serif",
              }}
            >
              {l === 'kz' ? 'қаз' : 'рус'}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
