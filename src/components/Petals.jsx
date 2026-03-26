import React, { useEffect, useState } from 'react'

const PETAL_SHAPES = ['🌸', '🌼', '✨', '🌺', '💮']

function Petal({ id }) {
  const left = Math.random() * 100
  const delay = Math.random() * 8
  const duration = 8 + Math.random() * 6
  const size = 12 + Math.random() * 14
  const shape = PETAL_SHAPES[Math.floor(Math.random() * PETAL_SHAPES.length)]
  const opacity = 0.3 + Math.random() * 0.4

  return (
    <div style={{
      position: 'fixed',
      left: `${left}%`,
      top: '-40px',
      fontSize: `${size}px`,
      opacity,
      animation: `floatPetal ${duration}s ${delay}s linear infinite`,
      pointerEvents: 'none',
      zIndex: 0,
      userSelect: 'none'
    }}>
      {shape}
    </div>
  )
}

export default function Petals() {
  return null
}