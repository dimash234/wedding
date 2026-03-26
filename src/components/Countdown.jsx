import React, { useState, useEffect, useContext } from 'react';
import { LangContext } from '../context/LangContext';

function FlipBlock({ value }) {
  const [disp, setDisp] = useState(value);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    if (value !== disp) {
      setAnimKey(k => k + 1);
      const t = setTimeout(() => setDisp(value), 200);
      return () => clearTimeout(t);
    }
  }, [value]);

  return (
    <span key={animKey} style={{
      display: 'inline-block',
      fontFamily: "'Jost', sans-serif",
      fontSize: 'clamp(36px,8.5vw,72px)',
      fontWeight: 300,
      color: 'var(--ink)',
      lineHeight: 1,
      letterSpacing: '-1px',
      animation: animKey > 0 ? 'flipUp 0.38s cubic-bezier(.4,0,.2,1) both' : 'none',
    }}>
      {String(disp).padStart(2, '0')}
    </span>
  );
}

export default function Countdown({ targetDate }) {
  const { t } = useContext(LangContext);
  const FONT = "'Jost', sans-serif";

  const calc = () => {
    const diff = new Date(targetDate) - new Date();
    if (diff <= 0) return null;
    return {
      days:    Math.floor(diff / 86400000),
      hours:   Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };

  const [tl, setTl] = useState(calc);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const id = setInterval(() => { setTl(calc()); setBlink(b => !b); }, 1000);
    return () => clearInterval(id);
  }, []);

  if (!tl) return (
    <p style={{ fontFamily: FONT, fontSize: '22px', letterSpacing: '3px', color: 'var(--ink)', fontWeight: 300 }}>
      {t.countdown.done}
    </p>
  );

  const units = [
    { v: tl.days,    l: t.countdown.days    },
    { v: tl.hours,   l: t.countdown.hours   },
    { v: tl.minutes, l: t.countdown.minutes },
    { v: tl.seconds, l: t.countdown.seconds },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
      <div style={{
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        gap: 'clamp(4px,1vw,10px)', flexWrap: 'nowrap', width: '100%',
        overflowX: 'auto', paddingBottom: '2px',
      }}>
        {units.map((u, i) => (
          <React.Fragment key={i}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
              <div style={{
                width: 'clamp(62px,14vw,112px)', height: 'clamp(70px,16vw,126px)',
                background: 'var(--white)', border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: '1px', background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.15), transparent)' }} />
                <div style={{ position: 'absolute', top: '50%', left: '10%', right: '10%', height: '1px', background: 'var(--border)', zIndex: 1 }} />
                <div style={{ position: 'absolute', bottom: 0, left: '15%', right: '15%', height: '1px', background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.12), transparent)' }} />
                <div style={{ zIndex: 2, position: 'relative' }}>
                  <FlipBlock value={u.v} />
                </div>
              </div>
              <p style={{
                marginTop: '9px', fontSize: 'clamp(9px,1.6vw,11px)',
                letterSpacing: '2.5px', textTransform: 'lowercase',
                color: 'var(--ink)', whiteSpace: 'nowrap',
                fontWeight: 400, fontFamily: FONT, opacity: 0.5,
              }}>{u.l}</p>
            </div>

            {i < 3 && (
              <span style={{
                fontFamily: FONT, fontSize: 'clamp(28px,6vw,52px)',
                fontWeight: 300, color: 'var(--ink)', lineHeight: 1,
                marginTop: 'clamp(10px,2vw,18px)', flexShrink: 0,
                opacity: blink ? 0.6 : 0.1, transition: 'opacity 0.35s ease',
              }}>:</span>
            )}
          </React.Fragment>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', opacity: 0.35 }}>
        <span style={{ display: 'inline-block', width: '28px', height: '1px', background: 'rgba(0,0,0,0.2)' }} />
        <p style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'lowercase', color: 'var(--ink)', whiteSpace: 'nowrap', fontWeight: 400, fontFamily: FONT }}>
          28.06.2026
        </p>
        <span style={{ display: 'inline-block', width: '28px', height: '1px', background: 'rgba(0,0,0,0.2)' }} />
      </div>
    </div>
  );
}