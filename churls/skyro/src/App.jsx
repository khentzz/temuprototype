import React, { useState } from 'react'
import { CartProvider } from './context/CartContext'
import BottomNav from './components/BottomNav'
import SignIn from './screens/SignIn'
import Home from './screens/Home'
import ProductDetail from './screens/ProductDetail'
import Cart from './screens/Cart'
import Address from './screens/Address'
import Payment from './screens/Payment'
import OrderTracking from './screens/OrderTracking'

const SCREENS_WITH_NAV = ['home', 'categories', 'cart', 'messages', 'profile']

export default function App() {
  const [screen, setScreen] = useState('signin')
  const [selectedProduct, setSelectedProduct] = useState(null)

  const renderScreen = () => {
    switch (screen) {
      case 'signin': return <SignIn setScreen={setScreen} />
      case 'home': return <Home setScreen={setScreen} setSelectedProduct={setSelectedProduct} />
      case 'product': return selectedProduct ? <ProductDetail product={selectedProduct} setScreen={setScreen} /> : null
      case 'cart': return <Cart setScreen={setScreen} />
      case 'address': return <Address setScreen={setScreen} />
      case 'payment': return <Payment setScreen={setScreen} />
      case 'tracking': return <OrderTracking setScreen={setScreen} />
      case 'categories':
      case 'messages':
      case 'profile':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh', gap: 12 }}>
            <div style={{ fontSize: 60 }}>{screen === 'categories' ? '☰' : screen === 'messages' ? '💬' : '👤'}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#111', textTransform: 'capitalize' }}>{screen}</div>
            <div style={{ fontSize: 14, color: '#9ca3af' }}>Coming soon on Skyro</div>
          </div>
        )
      default: return null
    }
  }

  return (
    <CartProvider>
      <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
        {renderScreen()}
        {SCREENS_WITH_NAV.includes(screen) && (
          <BottomNav screen={screen} setScreen={setScreen} />
        )}
      </div>
    </CartProvider>
  )
}
