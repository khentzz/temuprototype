import React, { useState } from 'react'
import { useCart } from '../context/CartContext'

const paymentMethods = [
  { id: 'card', label: 'Credit / Debit Card', icon: '💳' },
  { id: 'gcash', label: 'GCash', icon: '📱' },
  { id: 'paypal', label: 'PayPal', icon: '🅿️' },
  { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
]

export default function Payment({ setScreen }) {
  const { subtotal, totalSaved, setOrder, cartItems } = useCart()
  const [method, setMethod] = useState('card')
  const [voucher, setVoucher] = useState('')
  const [voucherApplied, setVoucherApplied] = useState(false)
  const [useCredits, setUseCredits] = useState(false)

  const skyroCredits = 250
  const discount = voucherApplied ? 100 : 0
  const creditsUsed = useCredits ? Math.min(skyroCredits, subtotal) : 0
  const total = Math.max(0, subtotal - discount - creditsUsed)

  const handlePlaceOrder = () => {
    setOrder({
      id: 'SKY-' + Math.random().toString(36).substr(2, 8).toUpperCase(),
      date: 'April 5, 2026',
      items: cartItems.filter(i => i.checked),
      total,
      method,
      status: 'placed'
    })
    setScreen('tracking')
  }

  return (
    <div style={{ paddingBottom: 90 }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1a56db, #0ea5e9)',
        padding: '16px 16px 18px', display: 'flex', alignItems: 'center', gap: 12
      }}>
        <button onClick={() => setScreen('address')} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 10, width: 36, height: 36, cursor: 'pointer', fontSize: 18, color: '#fff' }}>←</button>
        <span style={{ fontWeight: 800, fontSize: 17, color: '#fff' }}>Payment</span>
      </div>

      <div style={{ padding: '16px 16px 0' }}>
        {/* Payment Methods */}
        <div style={{ fontWeight: 700, fontSize: 14, color: '#374151', marginBottom: 12 }}>Payment Method</div>
        {paymentMethods.map(pm => (
          <div key={pm.id} onClick={() => setMethod(pm.id)} style={{
            background: '#fff', borderRadius: 12, padding: '13px 14px', marginBottom: 8,
            border: `2px solid ${method === pm.id ? '#1a56db' : '#e5e7eb'}`,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12
          }}>
            <div style={{
              width: 20, height: 20, borderRadius: 99, border: `2px solid ${method === pm.id ? '#1a56db' : '#d1d5db'}`,
              background: method === pm.id ? '#1a56db' : '#fff', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {method === pm.id && <div style={{ width: 8, height: 8, borderRadius: 99, background: '#fff' }} />}
            </div>
            <span style={{ fontSize: 20 }}>{pm.icon}</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#111' }}>{pm.label}</span>
          </div>
        ))}

        {/* Voucher */}
        <div style={{ fontWeight: 700, fontSize: 14, color: '#374151', margin: '16px 0 10px' }}>Promo Code / Voucher</div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <input
            value={voucher} onChange={e => setVoucher(e.target.value)}
            placeholder="Enter voucher code"
            style={{
              flex: 1, padding: '11px 14px', borderRadius: 10, border: '1.5px solid #e5e7eb',
              fontSize: 14, outline: 'none', fontFamily: 'Inter, sans-serif'
            }}
          />
          <button onClick={() => voucher && setVoucherApplied(true)} style={{
            padding: '11px 16px', borderRadius: 10, border: 'none',
            background: '#1a56db', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer'
          }}>Apply</button>
        </div>
        {voucherApplied && (
          <div style={{ background: '#f0fdf4', borderRadius: 10, padding: '8px 12px', marginBottom: 12, fontSize: 13, fontWeight: 600, color: '#16a34a' }}>
            ✅ Voucher applied! You saved ₱100
          </div>
        )}

        {/* Skyro Credits */}
        <div style={{
          background: '#eff6ff', borderRadius: 12, padding: '12px 14px', marginBottom: 16,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1a56db' }}>✨ Skyro Credits</div>
            <div style={{ fontSize: 12, color: '#6b7280' }}>Balance: ₱{skyroCredits.toLocaleString()}</div>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>Use credits</span>
            <div onClick={() => setUseCredits(u => !u)} style={{
              width: 40, height: 22, borderRadius: 99, background: useCredits ? '#1a56db' : '#d1d5db',
              position: 'relative', cursor: 'pointer', transition: 'background 0.2s'
            }}>
              <div style={{
                position: 'absolute', top: 3, left: useCredits ? 20 : 3, width: 16, height: 16,
                borderRadius: 99, background: '#fff', transition: 'left 0.2s',
                boxShadow: '0 1px 4px rgba(0,0,0,0.2)'
              }} />
            </div>
          </label>
        </div>

        {/* Order Summary */}
        <div style={{ background: '#fff', borderRadius: 14, padding: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#111', marginBottom: 12 }}>Order Summary</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 13, color: '#6b7280' }}>Subtotal</span>
            <span style={{ fontSize: 13, fontWeight: 600 }}>₱{subtotal.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 13, color: '#6b7280' }}>Shipping</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#16a34a' }}>FREE</span>
          </div>
          {discount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: '#6b7280' }}>Voucher Discount</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#ef4444' }}>-₱{discount}</span>
            </div>
          )}
          {creditsUsed > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: '#6b7280' }}>Skyro Credits</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#38bdf8' }}>-₱{creditsUsed}</span>
            </div>
          )}
          <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: 10, display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 15, fontWeight: 800, color: '#111' }}>Total</span>
            <span style={{ fontSize: 20, fontWeight: 900, color: '#1a56db' }}>₱{total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div style={{ position: 'fixed', bottom: 0, width: 375, background: '#fff', padding: '12px 16px', borderTop: '1px solid #f3f4f6', boxShadow: '0 -4px 16px rgba(0,0,0,0.08)' }}>
        <button onClick={handlePlaceOrder} style={{
          width: '100%', padding: '15px', borderRadius: 12, border: 'none',
          background: 'linear-gradient(90deg, #1a56db, #0ea5e9)', color: '#fff',
          fontSize: 16, fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 14px rgba(26,86,219,0.35)'
        }}>PLACE ORDER · ₱{total.toLocaleString()}</button>
      </div>
    </div>
  )
}
