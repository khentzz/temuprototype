import React, { useState } from 'react'
import SkyroLogo from '../components/SkyroLogo'
import FlashDealTimer from '../components/FlashDealTimer'
import { products, flashDeals, categories } from '../data/mockData'
import { useCart } from '../context/CartContext'

export default function Home({ setScreen, setSelectedProduct }) {
  const [search, setSearch] = useState('')
  const { cartCount } = useCart()

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ paddingBottom: 70 }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1a56db 0%, #1e40af 70%, #0ea5e9 100%)',
        padding: '16px 16px 20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <SkyroLogo size="sm" light />
          <div style={{ display: 'flex', gap: 12 }}>
            <button style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 10, width: 36, height: 36, cursor: 'pointer', fontSize: 16 }}>🔔</button>
            <button onClick={() => setScreen('cart')} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 10, width: 36, height: 36, cursor: 'pointer', fontSize: 16, position: 'relative' }}>
              🛒
              {cartCount > 0 && <span style={{ position: 'absolute', top: -4, right: -4, background: '#ef4444', color: '#fff', borderRadius: 99, fontSize: 9, fontWeight: 700, padding: '1px 4px' }}>{cartCount}</span>}
            </button>
          </div>
        </div>
        {/* Search */}
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 16 }}>🔍</span>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search deals on Skyro..."
            style={{
              width: '100%', padding: '11px 44px 11px 38px', borderRadius: 12,
              border: 'none', fontSize: 14, background: '#fff', outline: 'none', fontFamily: 'Inter, sans-serif'
            }}
          />
          <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 16, cursor: 'pointer' }}>📷</span>
        </div>
      </div>

      {/* Flash Deals Banner */}
      <div style={{ background: 'linear-gradient(90deg, #1a56db, #0ea5e9)', margin: 12, borderRadius: 16, padding: '12px 14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div>
            <div style={{ color: '#fff', fontWeight: 800, fontSize: 16 }}>⚡ Flash Deals</div>
            <div style={{ color: '#bfdbfe', fontSize: 12 }}>Ends in</div>
          </div>
          <FlashDealTimer />
        </div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
          {flashDeals.map(d => (
            <div key={d.id} style={{
              background: '#fff', borderRadius: 12, padding: 8, minWidth: 90, textAlign: 'center', flexShrink: 0
            }}>
              <img src={d.image} alt={d.name} style={{ width: 60, height: 60, borderRadius: 8, objectFit: 'cover' }} />
              <div style={{ fontSize: 11, fontWeight: 700, color: '#111', marginTop: 4 }}>₱{d.price}</div>
              <div style={{ fontSize: 10, color: '#9ca3af', textDecoration: 'line-through' }}>₱{d.original}</div>
              <div style={{ background: '#ef4444', color: '#fff', borderRadius: 6, fontSize: 10, fontWeight: 700, padding: '1px 5px', marginTop: 2 }}>-{d.discount}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div style={{ padding: '0 12px 4px' }}>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10, color: '#111' }}>Categories</div>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {categories.map(c => (
            <div key={c.id} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              minWidth: 60, cursor: 'pointer'
            }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14, background: '#eff6ff',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                border: '1.5px solid #dbeafe'
              }}>{c.icon}</div>
              <span style={{ fontSize: 10, fontWeight: 600, color: '#374151', textAlign: 'center' }}>{c.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Deals */}
      <div style={{ padding: '12px 12px 4px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: '#111' }}>🔥 Today's Deals</div>
          <span style={{ fontSize: 12, color: '#1a56db', fontWeight: 600, cursor: 'pointer' }}>See all</span>
        </div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
          {products.slice(0, 5).map(p => (
            <div key={p.id} onClick={() => { setSelectedProduct(p); setScreen('product') }} style={{
              minWidth: 130, background: '#fff', borderRadius: 14, overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)', cursor: 'pointer', flexShrink: 0
            }}>
              <img src={p.image} alt={p.name} style={{ width: '100%', height: 100, objectFit: 'cover' }} />
              <div style={{ padding: '8px 8px 10px' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#111', marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#1a56db' }}>₱{p.price}</div>
                <div style={{ fontSize: 11, color: '#9ca3af', textDecoration: 'line-through' }}>₱{p.original}</div>
                <div style={{ background: '#ef4444', color: '#fff', borderRadius: 6, fontSize: 10, fontWeight: 700, padding: '1px 5px', display: 'inline-block', marginTop: 2 }}>-{p.discount}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Free Shipping Banner */}
      <div style={{
        margin: '12px 12px', borderRadius: 14, padding: '12px 16px',
        background: 'linear-gradient(90deg, #eff6ff, #e0f2fe)',
        border: '1.5px solid #bfdbfe', display: 'flex', alignItems: 'center', gap: 10
      }}>
        <span style={{ fontSize: 28 }}>🚀</span>
        <div>
          <div style={{ fontWeight: 800, fontSize: 14, color: '#1a56db' }}>Free Shipping on All Orders</div>
          <div style={{ fontSize: 12, color: '#6b7280' }}>No minimum spend required today!</div>
        </div>
      </div>

      {/* Product Grid */}
      <div style={{ padding: '0 12px' }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: '#111', marginBottom: 10 }}>All Products</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {filtered.map(p => (
            <div key={p.id} onClick={() => { setSelectedProduct(p); setScreen('product') }} style={{
              background: '#fff', borderRadius: 14, overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)', cursor: 'pointer'
            }}>
              <div style={{ position: 'relative' }}>
                <img src={p.image} alt={p.name} style={{ width: '100%', height: 130, objectFit: 'cover' }} />
                <span style={{
                  position: 'absolute', top: 8, left: 8, background: '#ef4444', color: '#fff',
                  borderRadius: 8, fontSize: 11, fontWeight: 800, padding: '2px 7px'
                }}>-{p.discount}%</span>
              </div>
              <div style={{ padding: '8px 10px 12px' }}>
                <div style={{ fontSize: 12, color: '#374151', marginBottom: 4, lineHeight: 1.3 }}>{p.name}</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#1a56db' }}>₱{p.price}</div>
                <div style={{ fontSize: 11, color: '#9ca3af', textDecoration: 'line-through' }}>₱{p.original}</div>
                <div style={{ fontSize: 10, color: '#6b7280', marginTop: 4 }}>⭐ {p.rating} · {p.sold.toLocaleString()} sold</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
