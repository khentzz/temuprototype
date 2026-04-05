import React, { useState } from 'react'
import { savedAddresses } from '../data/mockData'

export default function Address({ setScreen }) {
  const [selected, setSelected] = useState(savedAddresses[0].id)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ fullName: '', phone: '', line: '', city: '', zip: '', region: '' })

  const selectedAddr = savedAddresses.find(a => a.id === selected)

  return (
    <div style={{ paddingBottom: 90 }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1a56db, #0ea5e9)',
        padding: '16px 16px 18px', display: 'flex', alignItems: 'center', gap: 12
      }}>
        <button onClick={() => setScreen('cart')} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 10, width: 36, height: 36, cursor: 'pointer', fontSize: 18, color: '#fff' }}>←</button>
        <span style={{ fontWeight: 800, fontSize: 17, color: '#fff' }}>Delivery Address</span>
      </div>

      <div style={{ padding: '16px 16px 0' }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: '#374151', marginBottom: 12 }}>Saved Addresses</div>

        {savedAddresses.map(addr => (
          <div key={addr.id} onClick={() => setSelected(addr.id)} style={{
            background: '#fff', borderRadius: 14, padding: '14px', marginBottom: 10,
            border: `2px solid ${selected === addr.id ? '#1a56db' : '#e5e7eb'}`,
            cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{
                  width: 20, height: 20, borderRadius: 99, border: `2px solid ${selected === addr.id ? '#1a56db' : '#d1d5db'}`,
                  background: selected === addr.id ? '#1a56db' : '#fff', flexShrink: 0, marginTop: 2,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {selected === addr.id && <div style={{ width: 8, height: 8, borderRadius: 99, background: '#fff' }} />}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontWeight: 700, fontSize: 14, color: '#111' }}>{addr.fullName}</span>
                    <span style={{ background: '#eff6ff', color: '#1a56db', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 6 }}>{addr.name}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.5 }}>
                    {addr.phone}<br />
                    {addr.line}, {addr.city}, {addr.zip}<br />
                    {addr.region}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add new */}
        <button onClick={() => setShowForm(!showForm)} style={{
          width: '100%', padding: '13px', borderRadius: 12, border: '2px dashed #1a56db',
          background: '#eff6ff', color: '#1a56db', fontSize: 14, fontWeight: 700, cursor: 'pointer', marginBottom: 16
        }}>+ Add New Address</button>

        {showForm && (
          <div style={{ background: '#fff', borderRadius: 14, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: 16 }}>
            {[
              { key: 'fullName', label: 'Full Name', placeholder: 'Your full name' },
              { key: 'phone', label: 'Phone Number', placeholder: '+63 9XX XXX XXXX' },
              { key: 'line', label: 'Address Line', placeholder: 'Street, Barangay' },
              { key: 'city', label: 'City / Municipality', placeholder: 'City' },
              { key: 'zip', label: 'ZIP Code', placeholder: '0000' },
              { key: 'region', label: 'Region', placeholder: 'e.g. NCR' },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>{f.label}</label>
                <input
                  value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                  placeholder={f.placeholder}
                  style={{
                    width: '100%', padding: '11px 14px', borderRadius: 10, border: '1.5px solid #e5e7eb',
                    fontSize: 14, outline: 'none', fontFamily: 'Inter, sans-serif'
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Estimated delivery */}
        {selectedAddr && (
          <div style={{ background: '#f0fdf4', borderRadius: 12, padding: '12px 14px', marginBottom: 16, display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ fontSize: 22 }}>📦</span>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#166534' }}>Estimated Delivery</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#111' }}>April 8–10, 2026</div>
              <div style={{ fontSize: 11, color: '#6b7280' }}>Delivering to {selectedAddr.city}</div>
            </div>
          </div>
        )}
      </div>

      <div style={{ position: 'fixed', bottom: 0, width: 375, background: '#fff', padding: '12px 16px', borderTop: '1px solid #f3f4f6', boxShadow: '0 -4px 16px rgba(0,0,0,0.08)' }}>
        <button onClick={() => setScreen('payment')} style={{
          width: '100%', padding: '15px', borderRadius: 12, border: 'none',
          background: 'linear-gradient(90deg, #1a56db, #0ea5e9)', color: '#fff',
          fontSize: 16, fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 14px rgba(26,86,219,0.35)'
        }}>CONTINUE</button>
      </div>
    </div>
  )
}
