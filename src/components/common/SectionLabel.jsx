import React from 'react';

export function SectionLabel({ children }) {
  return (
    <p style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px',
      fontSize: '13px', letterSpacing: '4px', textTransform: 'lowercase',
      color: 'var(--ink)', marginBottom: '20px',
      fontWeight: 400, fontFamily: "'Jost', sans-serif",
      opacity: 0.5,
    }}>
      <span style={{ display: 'inline-block', width: '32px', height: '1px', background: 'linear-gradient(to right,transparent,rgba(0,0,0,0.2),transparent)' }} />
      {children}
      <span style={{ display: 'inline-block', width: '32px', height: '1px', background: 'linear-gradient(to right,transparent,rgba(0,0,0,0.2),transparent)' }} />
    </p>
  );
}