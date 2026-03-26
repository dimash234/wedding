import React from 'react';

export function MusicRing({ playing, onClick }) {
  const TEXT = 'МАХАББАТ · ДЕГЕН · ҚАНДАЙ · ТОЙ · МУЗЫКА · ';

  return (
    <button
      onClick={onClick}
      aria-label={playing ? 'Pause' : 'Play'}
      style={{
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Spinning text ring */}
      <svg
        viewBox="0 0 100 100"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100px',
          height: '100px',
          animation: 'spinSlow 12s linear infinite',
          animationPlayState: playing ? 'running' : 'paused',
        }}
      >
        <defs>
          <path id="cp" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
        </defs>
        <text
          style={{
            fontSize: '6.5px',
            fill: 'rgba(0,0,0,0.6)',
            letterSpacing: '2.2px',
            fontFamily: "'Anastasia Script', Georgia, serif",
            fontWeight: 300,
          }}
        >
          <textPath href="#cp">{TEXT}</textPath>
        </text>
      </svg>

      {/* Button disc */}
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: '#111',
          backdropFilter: 'blur(12px)',
          border: '1.5px solid #111',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.4s cubic-bezier(.16,1,.3,1)',
          boxShadow: playing
            ? '0 0 0 6px rgba(255,255,255,0.15), 0 4px 20px rgba(0,0,0,0.15)'
            : '0 2px 20px rgb(236, 233, 233)',
        }}
      >
        {playing ? (
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <span
              style={{
                width: '3px',
                height: '14px',
                background: 'white',
                borderRadius: '2px',
                display: 'block',
              }}
            />
            <span
              style={{
                width: '3px',
                height: '14px',
                background: 'white',
                borderRadius: '2px',
                display: 'block',
              }}
            />
          </div>
        ) : (
          <svg viewBox="0 0 16 18" style={{ width: '14px', height: '16px', marginLeft: '3px' }}>
            <path d="M2,1 L15,9 L2,17 Z" fill="#f7f4f4" />
          </svg>
        )}
      </div>
    </button>
  );
}
