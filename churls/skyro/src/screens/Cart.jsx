import React from 'react'
import { useCart } from '../context/CartContext'
import SkyroLogo from '../components/SkyroLogo'

const FREE_SHIPPING_THRESHOLD = 1500

export default function Cart({ setScreen }) {
  const { cartItems, updateQty, removeItem, toggleCheck, subtotal, totalSaved } = useCart()
  const checkedItems = cartItems.filter(i => i.checked)
  const shipping = 0
  const total = subtotal + shipping
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1a56db, #0ea5e9)',
        padding: '16px 16px 18px', display: 'flex', alignItems: 'center', gap: 12
      }}>
        <button onClick={() => setScreen('home')} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 10, width: 36, height: 36, cursor: 'pointer', fontSize: 18, color: '#fff' }}>←</button>
        <span style={{ fontWeight: 800, fontSize: 17, color: '#fff' }}>My Cart</span>
        <span style={{ fontSize: 13, color: '#bfdbfe', marginLeft: 4 }}>({cartItems.length} items)</span>
      </div>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 24px' }}>
          <div style={{ fontSize: 60, marginBottom: 16 }}>🛒</div>
          <div style={{ fontWeight: 700, fontSize: 18, color: '#111', marginBottom: 8 }}>Your cart is empty</div>
          <div style={{ fontSize: 14, color: '#6b7280', marginBottom: 24 }}>Discover amazing deals on Skyro</div>
          <button onClick={() => setScreen('home')} style={{
            padding: '13px 32px', borderRadius: 12, border: 'none',
            background: 'linear-gradient(90deg, #1a56db, #0ea5e9)', color: '#fff',
            fontSize: 15, fontWeight: 700, cursor: 'pointer'
          }}>Shop Now</button>
        </div>
      ) : (
        <>
          {/* Free shipping progress */}
          <div style={{ margin: '12px 12px 0', background: '#eff6ff', borderRadius: 12, padding: '10px 14px' }}>
            {remaining > 0 ? (
              <div style={{ fontSize: 12, fontWeight: 600, color: '#1a56db', marginBottom: 6 }}>
                Add <span style={{ fontWeight: 800 }}>₱{remaining}</span> more for Free Shipping 🚀
              </div>
            ) : (
              <div style={{ fontSize: 12, fontWeight: 700, color: '#16a34a', marginBottom: 6 }}>🎉 You've unlocked Free Shipping!</div>
            )}
            <div style={{ background: '#dbeafe', borderRadius: 99, height: 6, overflow: 'hidden' }}>
              <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #1a56db, #0ea5e9)', borderRadius: 99, transition: 'width 0.4s' }} />
            </div>
          </div>

          {/* Items */}
          <div style={{ padding: '12px 12px 0' }}>
            {cartItems.map(item => (
              <div key={item.key} style={{
                background: '#fff', borderRadius: 14, padding: '12px', marginBottom: 10,
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', gap: 10, alignItems: 'flex-start'
              }}>
                <input type="checkbox" checked={item.checked} onChange={() => toggleCheck(item.key)}
                  style={{ marginTop: 4, accentColor: '#1a56db', width: 16, height: 16, flexShrink: 0 }} />
                <img src={item.image} alt={item.name} style={{ width: 72, height: 72, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#111', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</div>
                  {(item.color || item.size) && (
                    <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 4 }}>
                      {item.color}{item.color && item.size ? ' · ' : ''}{item.size}
                    </div>
                  )}
                  <div style={{ fontSize: 16, fontWeight: 800, color: '#1a56db', marginBottom: 6 }}>₱{item.price}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
                      <button onClick={() => updateQty(item.key, -1)} style={{ width: 28, height: 28, border: 'none', background: '#f9fafb', cursor: 'pointer', fontWeight: 700, fontSize: 16 }}>−</button>
                      <span style={{ width: 32, textAlign: 'center', fontSize: 13, fontWeight: 700 }}>{item.qty}</span>
                      <button onClick={() => updateQty(item.key, 1)} style={{ width: 28, height: 28, border: 'none', background: '#f9fafb', cursor: 'pointer', fontWeight: 700, fontSize: 16 }}>+</button>
                    </div>
                    <button onClick={() => removeItem(item.key)} style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Savings */}
          {totalSaved > 0 && (
            <div style={{ margin: '0 12px 10px', background: '#eff6ff', borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 18 }}>🎉</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#38bdf8' }}>You saved <span style={{ color: '#1a56db' }}>₱{totalSaved.toLocaleString()}</span> on this order!</span>
            </div>
          )}

          {/* Order Summary */}
          <div style={{ margin: '0 12px', background: '#fff', borderRadius: 14, padding: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#111', marginBottom: 10 }}>Order Summary</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: '#6b7280' }}>Subtotal ({checkedItems.length} items)</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>₱{subtotal.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 13, color: '#6b7280' }}>Shipping</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#16a34a' }}>FREE</span>
            </div>
            <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: 10, display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 15, fontWeight: 800, color: '#111' }}>Total</span>
              <span style={{ fontSize: 18, fontWeight: 900, color: '#1a56db' }}>₱{total.toLocaleString()}</span>
            </div>
          </div>
        </>
      )}

      {/* Checkout */}
      {cartItems.length > 0 && (
        <div style={{ position: 'fixed', bottom: 0, width: 375, background: '#fff', padding: '12px 16px', borderTop: '1px solid #f3f4f6', boxShadow: '0 -4px 16px rgba(0,0,0,0.08)' }}>
          <button onClick={() => setScreen('address')} style={{
            width: '100%', padding: '15px', borderRadius: 12, border: 'none',
            background: checkedItems.length === 0 ? '#e5e7eb' : 'linear-gradient(90deg, #1a56db, #0ea5e9)',
            color: checkedItems.length === 0 ? '#9ca3af' : '#fff',
            fontSize: 16, fontWeight: 800, cursor: checkedItems.length === 0 ? 'not-allowed' : 'pointer',
            boxShadow: checkedItems.length > 0 ? '0 4px 14px rgba(26,86,219,0.35)' : 'none'
          }} disabled={checkedItems.length === 0}>
            CHECKOUT · ₱{total.toLocaleString()}
          </button>
        </div>
      )}
    </div>
  )
}
