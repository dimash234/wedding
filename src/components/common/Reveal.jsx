import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export function Reveal({ children, delay = 0, y = 28, style: extraStyle }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : `translateY(${y}px)`,
        transition: `opacity 0.85s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.85s cubic-bezier(.16,1,.3,1) ${delay}s`,
        ...extraStyle,
      }}
    >
      {children}
    </div>
  );
}
