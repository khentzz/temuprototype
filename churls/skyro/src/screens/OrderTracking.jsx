import React from 'react'
import { useCart } from '../context/CartContext'
import SkyroLogo from '../components/SkyroLogo'

const steps = [
  { id: 0, label: 'Order Placed', icon: '📋', desc: 'April 5, 2026 · 10:42 AM' },
  { id: 1, label: 'Payment Confirmed', icon: '✅', desc: 'April 5, 2026 · 10:43 AM' },
  { id: 2, label: 'Processing', icon: '📦', desc: 'April 5, 2026 · 11:00 AM' },
  { id: 3, label: 'Shipped', icon: '🚚', desc: 'Expected: April 6, 2026' },
  { id: 4, label: 'Out for Delivery', icon: '🛵', desc: 'Expected: April 8, 2026' },
  { id: 5, label: 'Delivered', icon: '🎉', desc: 'Expected: April 8–10, 2026' },
]

const ACTIVE_STEP = 2

export default function OrderTracking({ setScreen }) {
  const { order } = useCart()

  const orderId = order?.id || 'SKY-DEMO001'
  const orderDate = order?.date || 'April 5, 2026'
  const items = order?.items || []

  return (
    <div style={{ paddingBottom: 90 }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1a56db, #0ea5e9)',
        padding: '16px 16px 24px', textAlign: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <button onClick={() => setScreen('home')} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 10, width: 36, height: 36, cursor: 'pointer', fontSize: 18, color: '#fff' }}>←</button>
          <span style={{ fontWeight: 800, fontSize: 17, color: '#fff' }}>Order Tracking</span>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 14, padding: '14px 16px' }}>
          <div style={{ fontSize: 12, color: '#bfdbfe', marginBottom: 4 }}>Order Number</div>
          <div style={{ fontSize: 18, fontWeight: 900, color: '#fff', letterSpacing: 1 }}>{orderId}</div>
          <div style={{ fontSize: 12, color: '#bfdbfe', marginTop: 4 }}>Placed on {orderDate}</div>
        </div>
      </div>

      {/* Estimated Delivery */}
      <div style={{ margin: '16px 16px 0', background: '#eff6ff', borderRadius: 14, padding: '14px 16px', textAlign: 'center', border: '2px solid #bfdbfe' }}>
        <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>Estimated Delivery</div>
        <div style={{ fontSize: 22, fontWeight: 900, color: '#1a56db' }}>April 8–10, 2026</div>
        <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>📍 Quezon City, NCR</div>
      </div>

      {/* Carrier Info */}
      <div style={{ margin: '12px 16px 0', background: '#fff', borderRadius: 12, padding: '12px 14px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 12, color: '#6b7280' }}>Carrier</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#111' }}>Skyro Express</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 12, color: '#6b7280' }}>Tracking No.</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1a56db' }}>SKYEXP-{orderId.replace('SKY-', '')}</div>
        </div>
      </div>

      {/* Step Tracker */}
      <div style={{ margin: '16px 16px 0', background: '#fff', borderRadius: 14, padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: '#111', marginBottom: 16 }}>Shipment Status</div>
        {steps.map((step, i) => {
          const isDone = i <= ACTIVE_STEP
          const isActive = i === ACTIVE_STEP
          return (
            <div key={step.id} style={{ display: 'flex', gap: 14, position: 'relative' }}>
              {/* Line */}
              {i < steps.length - 1 && (
                <div style={{
                  position: 'absolute', left: 17, top: 36, width: 2, height: 40,
                  background: i < ACTIVE_STEP ? '#1a56db' : '#e5e7eb', zIndex: 0
                }} />
              )}
              {/* Dot */}
              <div style={{
                width: 36, height: 36, borderRadius: 99, flexShrink: 0, zIndex: 1,
                background: isActive ? '#1a56db' : isDone ? '#dbeafe' : '#f3f4f6',
                border: `2px solid ${isDone ? '#1a56db' : '#e5e7eb'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, boxShadow: isActive ? '0 0 0 4px rgba(26,86,219,0.15)' : 'none'
              }}>{step.icon}</div>
              <div style={{ paddingBottom: 24 }}>
                <div style={{ fontSize: 13, fontWeight: isActive ? 800 : 600, color: isDone ? '#111' : '#9ca3af' }}>{step.label}</div>
                <div style={{ fontSize: 11, color: isActive ? '#1a56db' : '#9ca3af', fontWeight: isActive ? 600 : 400 }}>{step.desc}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Items */}
      {items.length > 0 && (
        <div style={{ margin: '12px 16px 0', background: '#fff', borderRadius: 14, padding: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#111', marginBottom: 10 }}>Items in this Order</div>
          {items.map(item => (
            <div key={item.key} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
              <img src={item.image} alt={item.name} style={{ width: 52, height: 52, borderRadius: 10, objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>{item.name}</div>
                <div style={{ fontSize: 11, color: '#9ca3af' }}>Qty: {item.qty} {item.color ? `· ${item.color}` : ''}</div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#1a56db' }}>₱{(item.price * item.qty).toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ margin: '12px 16px 0', display: 'flex', gap: 10 }}>
        <button style={{
          flex: 1, padding: '13px', borderRadius: 12, border: '2px solid #1a56db',
          background: '#fff', color: '#1a56db', fontSize: 13, fontWeight: 700, cursor: 'pointer'
        }}>💬 Contact Seller</button>
        <button style={{
          flex: 1, padding: '13px', borderRadius: 12, border: '2px solid #e5e7eb',
          background: '#fff', color: '#374151', fontSize: 13, fontWeight: 700, cursor: 'pointer'
        }}>↩️ Request Return</button>
      </div>

      <div style={{ margin: '16px 16px 0', textAlign: 'center' }}>
        <button onClick={() => setScreen('home')} style={{
          padding: '13px 32px', borderRadius: 12, border: 'none',
          background: 'linear-gradient(90deg, #1a56db, #0ea5e9)', color: '#fff',
          fontSize: 14, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 14px rgba(26,86,219,0.3)'
        }}>Continue Shopping ✈️</button>
      </div>
    </div>
  )
}
