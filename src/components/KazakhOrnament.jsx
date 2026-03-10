import React from 'react'

export default function KazakhOrnament({ type = 'band', color = '#C9A84C', opacity = 1, size = 40 }) {
  const style = { opacity }

  if (type === 'band') {
    return (
      <svg viewBox="0 0 900 60" style={{ width: '100%', maxWidth: '900px', display: 'block', margin: '0 auto', ...style }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`kazakh-band-${color.replace('#','')}`} x="0" y="0" width="90" height="60" patternUnits="userSpaceOnUse">
            {/* Tumar (triangular amulet shape) */}
            <polygon points="45,5 55,20 45,35 35,20" fill="none" stroke={color} strokeWidth="1.5"/>
            <polygon points="45,10 50,20 45,30 40,20" fill={color} opacity="0.2"/>
            {/* Side scrolls */}
            <path d="M10,30 Q20,20 30,30 Q20,40 10,30Z" fill="none" stroke={color} strokeWidth="1.2"/>
            <path d="M60,30 Q70,20 80,30 Q70,40 60,30Z" fill="none" stroke={color} strokeWidth="1.2"/>
            {/* Corner dots */}
            <circle cx="5" cy="30" r="2" fill={color} opacity="0.6"/>
            <circle cx="85" cy="30" r="2" fill={color} opacity="0.6"/>
            {/* Top/bottom lines */}
            <line x1="0" y1="3" x2="90" y2="3" stroke={color} strokeWidth="0.5" opacity="0.5"/>
            <line x1="0" y1="57" x2="90" y2="57" stroke={color} strokeWidth="0.5" opacity="0.5"/>
            {/* Small diamonds on line */}
            <polygon points="45,1 47,3 45,5 43,3" fill={color} opacity="0.7"/>
            <polygon points="45,55 47,57 45,59 43,57" fill={color} opacity="0.7"/>
          </pattern>
        </defs>
        <rect width="900" height="60" fill={`url(#kazakh-band-${color.replace('#','')})`}/>
      </svg>
    )
  }

  if (type === 'bottom-band') {
    return (
      <svg viewBox="0 0 1400 80" preserveAspectRatio="none" style={{ width: '100%', height: '80px', display: 'block', ...style }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="kazakh-btm" x="0" y="0" width="100" height="80" patternUnits="userSpaceOnUse">
            {/* Ram horn (Koshkar muyiz) - iconic Kazakh motif */}
            <path d="M50,10 C65,10 75,20 75,35 C75,50 65,60 50,60 C35,60 25,50 25,35 C25,20 35,10 50,10Z" fill="none" stroke={color} strokeWidth="1.5"/>
            <path d="M50,18 C60,18 67,26 67,35 C67,44 60,52 50,52 C40,52 33,44 33,35 C33,26 40,18 50,18Z" fill="none" stroke={color} strokeWidth="1"/>
            {/* Spiral ends */}
            <path d="M25,35 Q15,25 20,15 Q28,8 35,15" fill="none" stroke={color} strokeWidth="1.5"/>
            <path d="M75,35 Q85,25 80,15 Q72,8 65,15" fill="none" stroke={color} strokeWidth="1.5"/>
            {/* Center dot */}
            <circle cx="50" cy="35" r="3" fill={color} opacity="0.4"/>
            {/* Bottom geometric line */}
            <line x1="0" y1="75" x2="100" y2="75" stroke={color} strokeWidth="1"/>
            <polygon points="50,72 53,75 50,78 47,75" fill={color}/>
          </pattern>
        </defs>
        <rect width="1400" height="80" fill={`url(#kazakh-btm)`}/>
      </svg>
    )
  }

  if (type === 'divider') {
    return (
      <svg viewBox="0 0 500 30" style={{ width: '100%', maxWidth: '500px', display: 'block', margin: '0 auto', ...style }} xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="15" x2="195" y2="15" stroke={color} strokeWidth="0.8" opacity="0.5"/>
        <polygon points="220,5 235,15 220,25 205,15" fill="none" stroke={color} strokeWidth="1.5"/>
        <polygon points="220,10 228,15 220,20 212,15" fill={color} opacity="0.3"/>
        <circle cx="250" cy="15" r="4" fill={color} opacity="0.8"/>
        <polygon points="280,5 295,15 280,25 265,15" fill="none" stroke={color} strokeWidth="1.5"/>
        <polygon points="280,10 288,15 280,20 272,15" fill={color} opacity="0.3"/>
        <line x1="305" y1="15" x2="500" y2="15" stroke={color} strokeWidth="0.8" opacity="0.5"/>
      </svg>
    )
  }

  if (type === 'diamond') {
    return (
      <svg viewBox="0 0 30 30" style={{ width: size, height: size, display: 'inline-block', ...style }} xmlns="http://www.w3.org/2000/svg">
        <polygon points="15,2 28,15 15,28 2,15" fill="none" stroke={color} strokeWidth="1.5"/>
        <polygon points="15,7 23,15 15,23 7,15" fill={color} opacity="0.3"/>
        <circle cx="15" cy="15" r="2.5" fill={color} opacity="0.8"/>
      </svg>
    )
  }

  if (type === 'star') {
    return (
      <svg viewBox="0 0 30 30" style={{ width: size, height: size, display: 'inline-block', ...style }} xmlns="http://www.w3.org/2000/svg">
        <polygon points="15,2 17,11 26,11 19,17 21,26 15,20 9,26 11,17 4,11 13,11" fill={color} opacity="0.7"/>
      </svg>
    )
  }

  if (type === 'corner-set') {
    return (
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', ...style }}>
        {/* Top-left */}
        <svg viewBox="0 0 80 80" style={{ position: 'absolute', top: 20, left: 20, width: 70, height: 70, opacity }} xmlns="http://www.w3.org/2000/svg">
          <path d="M5,40 L5,10 Q5,5 10,5 L40,5" fill="none" stroke={color} strokeWidth="1.5"/>
          <path d="M15,40 L15,18 Q15,15 18,15 L40,15" fill="none" stroke={color} strokeWidth="1"/>
          <circle cx="5" cy="5" r="3" fill={color} opacity="0.6"/>
          <polygon points="40,5 45,10 40,15 35,10" fill={color} opacity="0.4"/>
        </svg>
        {/* Top-right */}
        <svg viewBox="0 0 80 80" style={{ position: 'absolute', top: 20, right: 20, width: 70, height: 70, opacity, transform: 'scaleX(-1)' }} xmlns="http://www.w3.org/2000/svg">
          <path d="M5,40 L5,10 Q5,5 10,5 L40,5" fill="none" stroke={color} strokeWidth="1.5"/>
          <path d="M15,40 L15,18 Q15,15 18,15 L40,15" fill="none" stroke={color} strokeWidth="1"/>
          <circle cx="5" cy="5" r="3" fill={color} opacity="0.6"/>
          <polygon points="40,5 45,10 40,15 35,10" fill={color} opacity="0.4"/>
        </svg>
        {/* Bottom-left */}
        <svg viewBox="0 0 80 80" style={{ position: 'absolute', bottom: 20, left: 20, width: 70, height: 70, opacity, transform: 'scaleY(-1)' }} xmlns="http://www.w3.org/2000/svg">
          <path d="M5,40 L5,10 Q5,5 10,5 L40,5" fill="none" stroke={color} strokeWidth="1.5"/>
          <path d="M15,40 L15,18 Q15,15 18,15 L40,15" fill="none" stroke={color} strokeWidth="1"/>
          <circle cx="5" cy="5" r="3" fill={color} opacity="0.6"/>
          <polygon points="40,5 45,10 40,15 35,10" fill={color} opacity="0.4"/>
        </svg>
        {/* Bottom-right */}
        <svg viewBox="0 0 80 80" style={{ position: 'absolute', bottom: 20, right: 20, width: 70, height: 70, opacity, transform: 'scale(-1,-1)' }} xmlns="http://www.w3.org/2000/svg">
          <path d="M5,40 L5,10 Q5,5 10,5 L40,5" fill="none" stroke={color} strokeWidth="1.5"/>
          <path d="M15,40 L15,18 Q15,15 18,15 L40,15" fill="none" stroke={color} strokeWidth="1"/>
          <circle cx="5" cy="5" r="3" fill={color} opacity="0.6"/>
          <polygon points="40,5 45,10 40,15 35,10" fill={color} opacity="0.4"/>
        </svg>
      </div>
    )
  }

  if (type === 'full-border') {
    return (
      <svg viewBox="0 0 700 120" style={{ width: '100%', maxWidth: '700px', display: 'block', margin: '0 auto', ...style }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="orn-border" x="0" y="0" width="70" height="120" patternUnits="userSpaceOnUse">
            {/* Shanyrak (yurt crown) motif */}
            <circle cx="35" cy="60" r="18" fill="none" stroke={color} strokeWidth="1.2"/>
            {/* Cross spokes */}
            <line x1="35" y1="42" x2="35" y2="78" stroke={color} strokeWidth="0.8"/>
            <line x1="17" y1="60" x2="53" y2="60" stroke={color} strokeWidth="0.8"/>
            <line x1="22" y1="47" x2="48" y2="73" stroke={color} strokeWidth="0.8"/>
            <line x1="48" y1="47" x2="22" y2="73" stroke={color} strokeWidth="0.8"/>
            {/* Center */}
            <circle cx="35" cy="60" r="4" fill={color} opacity="0.5"/>
            {/* Connecting dots */}
            <circle cx="0" cy="60" r="2" fill={color} opacity="0.4"/>
            <circle cx="70" cy="60" r="2" fill={color} opacity="0.4"/>
          </pattern>
        </defs>
        <rect width="700" height="120" fill={`url(#orn-border)`}/>
        <rect width="700" height="120" fill="none" stroke={color} strokeWidth="1" opacity="0.3"/>
      </svg>
    )
  }

  return null
}