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
        setTimeout(() => setVisible(false), 500); // Ждём окончания анимации
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
      onClick={scrollToContent}
      style={{
        position: 'fixed',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        zIndex: 100,
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.5s ease',
        animation: 'bounce 2s infinite'
      }}
    >
      <span style={{
        fontFamily: "'xio', sans-serif",
        fontSize: '18px',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        color: 'var(--ink)',
        opacity: 0.7
      }}>
        {t?.scrollDown || 'Свайпните вниз'}
      </span>
      
      {/* Стрелка */}
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
      
      {/* CSS анимация */}
      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-10px); }
          60% { transform: translateX(-50%) translateY(-5px); }
        }
      `}</style>
    </div>
  );
}