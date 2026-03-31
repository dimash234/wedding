// src/components/ScrollIndicator.jsx
import React, { useState, useEffect, useContext } from 'react';
import { LangContext } from '../context/LangContext';

export default function ScrollIndicator() {
  const { t } = useContext(LangContext);
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setFadeOut(true);
        setTimeout(() => setVisible(false), 500);
      } else {
        setVisible(true);
        setFadeOut(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.5s ease',
        pointerEvents: 'none' // Чтобы не мешал кликам, но дочерние элементы вернут
      }}
    >
      <div 
        onClick={scrollToContent}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          pointerEvents: 'auto',
          animation: 'bounceIndicator 2s infinite'
        }}
      >
        <span style={{
          fontFamily: "'Bickhamb', sans-serif",
          fontSize: '12px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: 'var(--ink)',
          opacity: 0.7,
          textAlign: 'center',
          whiteSpace: 'nowrap',
          fontWeight: 'bold'
        }}>
          {t?.scrollDown || 'Свайпните вниз'}
        </span>
        
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5"
          style={{ color: 'var(--ink)', opacity: 0.7 }}
        >
          <path d="M12 5v14M19 12l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <style>{`
        @keyframes bounceIndicator {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}