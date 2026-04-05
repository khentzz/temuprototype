import React from 'react'
import { useCart } from '../context/CartContext'

const tabs = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'categories', label: 'Categories', icon: '☰' },
  { id: 'cart', label: 'Cart', icon: '🛒' },
  { id: 'messages', label: 'Messages', icon: '💬' },
  { id: 'profile', label: 'Profile', icon: '👤' },
]

export default function BottomNav({ screen, setScreen }) {
  const { cartCount } = useCart()

  return (
    <nav style={{
      position: 'fixed', bottom: 0, width: 375, background: '#fff',
      borderTop: '1px solid #e5e7eb', display: 'flex', zIndex: 100,
      boxShadow: '0 -2px 12px rgba(0,0,0,0.08)'
    }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => setScreen(t.id)} style={{
          flex: 1, padding: '8px 0 10px', border: 'none', background: 'none',
          cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
          color: screen === t.id ? '#1a56db' : '#9ca3af', position: 'relative'
        }}>
          <span style={{ fontSize: 20 }}>{t.icon}</span>
          <span style={{ fontSize: 10, fontWeight: screen === t.id ? 700 : 500 }}>{t.label}</span>
          {t.id === 'cart' && cartCount > 0 && (
            <span style={{
              position: 'absolute', top: 4, right: '50%', transform: 'translateX(8px)',
              background: '#ef4444', color: '#fff', borderRadius: 99, fontSize: 9,
              fontWeight: 700, padding: '1px 5px', minWidth: 16, textAlign: 'center'
            }}>{cartCount}</span>
          )}
        </button>
      ))}
    </nav>
  )
}
