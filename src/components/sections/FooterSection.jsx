import React, { useContext } from 'react';
import { LangContext } from '../../context/LangContext';
import { Reveal } from '../common/Reveal';

const WaveLine = () => (
  <svg width="56" height="8" viewBox="0 0 56 8" fill="none">
    <path
      d="M0 4 Q7 0 14 4 Q21 8 28 4 Q35 0 42 4 Q49 8 56 4"
      stroke="rgba(0,0,0,0.22)"
      strokeWidth="0.8"
      fill="none"
      opacity="0.7"
    />
  </svg>
);

const GoldDiamond = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M7 0L14 7L7 14L0 7L7 0Z"
      fill="var(--gold)"
      style={{ filter: 'drop-shadow(0 0 4px rgba(212,180,131,0.4))' }}
    />
    <path d="M7 3L11 7L7 11L3 7L7 3Z" fill="rgba(255,255,255,0.4)" />
  </svg>
);

export function FooterSection() {
  const { t } = useContext(LangContext);
  return (
    <footer
      style={{
        padding: 'clamp(56px,10vh,88px) 20px',
        background: 'var(--white)',
        textAlign: 'center',
        borderTop: '1px solid var(--border)',
      }}
    >
      <Reveal delay={0}>
        <div
          style={{
            width: '1px',
            height: '64px',
            background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.15))',
            margin: '0 auto 32px',
          }}
        />
        <p
  style={{
    fontFamily: "'Bickham', cursive",
    fontSize: 'clamp(65px,14vw,110px)',
    fontWeight: 300,
    color: 'var(--ink)',
    lineHeight: 1,
    marginBottom: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
  }}
>
  <span>Р ㅤㅤㅤ</span>
  <span style={{ display: 'inline-block', transform: 'translateY(5%)' }}>✦</span>
  <span>Ж</span>
</p>
        <p
          style={{
            fontSize: '36px',
            letterSpacing: '5px',
            color: 'var(--ink)',
            fontWeight: 300,
            fontFamily: "'Bickham', cursive",
          }}
        >
          {t.footer}
        </p>
        <div
          style={{
            marginTop: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
          }}
        >
          <WaveLine />
          <GoldDiamond />
          <WaveLine />
        </div>
        <div
          style={{
            width: '1px',
            height: '64px',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.15), transparent)',
            margin: '24px auto 0',
          }}
        />
      </Reveal>
    </footer>
  );
}
