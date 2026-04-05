import React, { useState } from 'react'
import { mockReviews } from '../data/mockData'
import { useCart } from '../context/CartContext'

export default function ProductDetail({ product, setScreen }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '')
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '')
  const [qty, setQty] = useState(1)
  const [imgIdx, setImgIdx] = useState(0)
  const { addToCart } = useCart()

  const images = [product.image, product.image, product.image]
  const savings = product.original - product.price
  const savePct = Math.round((savings / product.original) * 100)

  const handleAddToCart = () => {
    addToCart(product, qty, selectedColor, selectedSize)
    setScreen('cart')
  }

  return (
    <div style={{ paddingBottom: 90 }}>
      {/* Back */}
      <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid #f3f4f6' }}>
        <button onClick={() => setScreen('home')} style={{ background: '#f3f4f6', border: 'none', borderRadius: 10, width: 36, height: 36, cursor: 'pointer', fontSize: 18 }}>←</button>
        <span style={{ fontWeight: 700, fontSize: 15, color: '#111' }}>Product Details</span>
      </div>

      {/* Image Carousel */}
      <div style={{ position: 'relative', background: '#f8fafc' }}>
        <img src={images[imgIdx]} alt={product.name} style={{ width: '100%', height: 280, objectFit: 'cover' }} />
        <div style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
          {images.map((_, i) => (
            <div key={i} onClick={() => setImgIdx(i)} style={{
              width: i === imgIdx ? 20 : 8, height: 8, borderRadius: 4,
              background: i === imgIdx ? '#1a56db' : '#cbd5e1', cursor: 'pointer', transition: 'width 0.2s'
            }} />
          ))}
        </div>
        <span style={{
          position: 'absolute', top: 12, left: 12, background: '#ef4444', color: '#fff',
          borderRadius: 8, fontSize: 12, fontWeight: 800, padding: '3px 9px'
        }}>-{savePct}% OFF</span>
      </div>

      <div style={{ padding: '16px 16px 0' }}>
        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 28, fontWeight: 900, color: '#1a56db' }}>₱{product.price}</span>
          <span style={{ fontSize: 16, color: '#9ca3af', textDecoration: 'line-through' }}>₱{product.original}</span>
        </div>
        <div style={{ background: '#eff6ff', borderRadius: 8, padding: '4px 10px', display: 'inline-block', marginBottom: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#1a56db' }}>You save ₱{savings}</span>
        </div>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#111', marginBottom: 4 }}>{product.name}</div>
        <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 8 }}>⭐ {product.rating} ({product.reviews.toLocaleString()} reviews) · {product.sold.toLocaleString()} sold</div>

        {/* Delivery */}
        <div style={{ background: '#f0fdf4', borderRadius: 10, padding: '10px 12px', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 18 }}>🚚</span>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#166534' }}>Free Shipping</div>
            <div style={{ fontSize: 11, color: '#6b7280' }}>Estimated delivery: Apr 8–10, 2026</div>
          </div>
        </div>

        {/* Colors */}
        {product.colors.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 8 }}>Color: <span style={{ color: '#1a56db' }}>{selectedColor}</span></div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {product.colors.map(c => (
                <button key={c} onClick={() => setSelectedColor(c)} style={{
                  padding: '6px 14px', borderRadius: 20, border: `2px solid ${selectedColor === c ? '#1a56db' : '#e5e7eb'}`,
                  background: selectedColor === c ? '#eff6ff' : '#fff', fontSize: 13, fontWeight: 600,
                  color: selectedColor === c ? '#1a56db' : '#374151', cursor: 'pointer'
                }}>{c}</button>
              ))}
            </div>
          </div>
        )}

        {/* Sizes */}
        {product.sizes.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 8 }}>Size: <span style={{ color: '#1a56db' }}>{selectedSize}</span></div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {product.sizes.map(s => (
                <button key={s} onClick={() => setSelectedSize(s)} style={{
                  width: 44, height: 44, borderRadius: 10, border: `2px solid ${selectedSize === s ? '#1a56db' : '#e5e7eb'}`,
                  background: selectedSize === s ? '#eff6ff' : '#fff', fontSize: 13, fontWeight: 700,
                  color: selectedSize === s ? '#1a56db' : '#374151', cursor: 'pointer'
                }}>{s}</button>
              ))}
            </div>
          </div>
        )}

        {/* Qty */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#374151' }}>Quantity</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, border: '1.5px solid #e5e7eb', borderRadius: 10, overflow: 'hidden' }}>
            <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 36, height: 36, border: 'none', background: '#f9fafb', fontSize: 18, cursor: 'pointer', fontWeight: 700 }}>−</button>
            <span style={{ width: 40, textAlign: 'center', fontWeight: 700, fontSize: 15 }}>{qty}</span>
            <button onClick={() => setQty(q => q + 1)} style={{ width: 36, height: 36, border: 'none', background: '#f9fafb', fontSize: 18, cursor: 'pointer', fontWeight: 700 }}>+</button>
          </div>
        </div>

        {/* Reviews */}
        <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: 16, marginBottom: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: '#111', marginBottom: 12 }}>Reviews ({product.reviews.toLocaleString()})</div>
          {mockReviews.map(r => (
            <div key={r.id} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: '1px solid #f3f4f6' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontWeight: 700, fontSize: 13, color: '#111' }}>{r.user}</span>
                <span style={{ fontSize: 11, color: '#9ca3af' }}>{r.date}</span>
              </div>
              <div style={{ fontSize: 13, marginBottom: 4 }}>{'⭐'.repeat(r.rating)}</div>
              <div style={{ fontSize: 13, color: '#374151' }}>{r.comment}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky CTA */}
      <div style={{
        position: 'fixed', bottom: 0, width: 375, background: '#fff',
        padding: '12px 16px', borderTop: '1px solid #f3f4f6',
        display: 'flex', gap: 10, boxShadow: '0 -4px 16px rgba(0,0,0,0.08)'
      }}>
        <button onClick={handleAddToCart} style={{
          flex: 1, padding: '14px', borderRadius: 12, border: '2px solid #1a56db',
          background: '#fff', color: '#1a56db', fontSize: 14, fontWeight: 800, cursor: 'pointer'
        }}>ADD TO CART</button>
        <button onClick={() => { addToCart(product, qty, selectedColor, selectedSize); setScreen('address') }} style={{
          flex: 1, padding: '14px', borderRadius: 12, border: 'none',
          background: 'linear-gradient(90deg, #1a56db, #0ea5e9)', color: '#fff',
          fontSize: 14, fontWeight: 800, cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(26,86,219,0.35)'
        }}>BUY NOW</button>
      </div>
    </div>
  )
}
