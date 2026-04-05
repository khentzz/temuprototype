import React, { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [order, setOrder] = useState(null)

  const addToCart = (product, qty = 1, color = '', size = '') => {
    setCartItems(prev => {
      const key = `${product.id}-${color}-${size}`
      const existing = prev.find(i => i.key === key)
      if (existing) return prev.map(i => i.key === key ? { ...i, qty: i.qty + qty } : i)
      return [...prev, { ...product, qty, color, size, key, checked: true }]
    })
  }

  const updateQty = (key, delta) => {
    setCartItems(prev => prev.map(i => i.key === key ? { ...i, qty: Math.max(1, i.qty + delta) } : i))
  }

  const removeItem = (key) => setCartItems(prev => prev.filter(i => i.key !== key))

  const toggleCheck = (key) => setCartItems(prev => prev.map(i => i.key === key ? { ...i, checked: !i.checked } : i))

  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0)

  const checkedItems = cartItems.filter(i => i.checked)
  const subtotal = checkedItems.reduce((s, i) => s + i.price * i.qty, 0)
  const totalSaved = checkedItems.reduce((s, i) => s + (i.original - i.price) * i.qty, 0)

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQty, removeItem, toggleCheck, cartCount, subtotal, totalSaved, order, setOrder }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
