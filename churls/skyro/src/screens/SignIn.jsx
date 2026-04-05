import React, { useState } from 'react'
import SkyroLogo from '../components/SkyroLogo'

export default function SignIn({ setScreen }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const inputStyle = {
    width: '100%', padding: '14px 16px', borderRadius: 12, border: '1.5px solid #e5e7eb',
    fontSize: 15, outline: 'none', fontFamily: 'Inter, sans-serif', color: '#111'
  }

  const socialBtn = (label, emoji) => (
    <button style={{
      width: '100%', padding: '13px', borderRadius: 12, border: '1.5px solid #e5e7eb',
      background: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: '#374151'
    }}>
      <span>{emoji}</span> Continue with {label}
    </button>
  )

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: '0 24px' }}>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #1a56db 0%, #1e40af 60%, #0ea5e9 100%)',
        margin: '0 -24px', padding: '60px 24px 40px', textAlign: 'center'
      }}>
        <SkyroLogo size="lg" light />
        <p style={{ color: '#bfdbfe', marginTop: 10, fontSize: 14 }}>Deals that take you higher ✈️</p>
      </div>

      <div style={{ flex: 1, paddingTop: 32, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Email</label>
          <input style={inputStyle} type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Password</label>
          <input style={inputStyle} type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: 13, color: '#1a56db', fontWeight: 600, cursor: 'pointer' }}>Forgot password?</span>
        </div>

        <button onClick={() => setScreen('home')} style={{
          width: '100%', padding: '15px', borderRadius: 12, border: 'none',
          background: 'linear-gradient(90deg, #1a56db, #0ea5e9)', color: '#fff',
          fontSize: 16, fontWeight: 800, cursor: 'pointer', marginTop: 4,
          boxShadow: '0 4px 16px rgba(26,86,219,0.35)'
        }}>
          Sign In
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '4px 0' }}>
          <div style={{ flex: 1, height: 1, background: '#e5e7eb' }} />
          <span style={{ fontSize: 13, color: '#9ca3af' }}>or</span>
          <div style={{ flex: 1, height: 1, background: '#e5e7eb' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {socialBtn('Google', '🔵')}
          {socialBtn('Facebook', '🔷')}
          {socialBtn('Apple', '🍎')}
        </div>

        <p style={{ textAlign: 'center', fontSize: 14, color: '#6b7280', marginTop: 8, paddingBottom: 32 }}>
          New to Skyro?{' '}
          <span style={{ color: '#1a56db', fontWeight: 700, cursor: 'pointer' }}>Join now</span>
        </p>
      </div>
    </div>
  )
}
