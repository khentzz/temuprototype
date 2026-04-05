import React from 'react'

export default function SkyroLogo({ size = 'md', light = false }) {
  const sizes = { sm: { text: 22, icon: 14 }, md: { text: 32, icon: 20 }, lg: { text: 42, icon: 26 } }
  const s = sizes[size]
  const color = light ? '#fff' : '#1a56db'
  const accent = light ? '#93c5fd' : '#38bdf8'

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <svg width={s.icon + 8} height={s.icon + 8} viewBox="0 0 32 32" fill="none">
        <path d="M16 28 C8 20, 4 14, 8 8 C12 2, 24 2, 26 10 C28 16, 22 20, 16 28Z" fill={color} opacity="0.15"/>
        <path d="M16 26 L8 14 L13 16 L16 6 L19 16 L24 14 Z" fill={color}/>
        <circle cx="16" cy="6" r="3" fill={accent}/>
      </svg>
      <span style={{ fontSize: s.text, fontWeight: 900, color, letterSpacing: '-1px', fontFamily: 'Inter, sans-serif' }}>
        Sky<span style={{ color: accent }}>ro</span>
      </span>
    </div>
  )
}
