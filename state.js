const State = {
  currentScreen: 'signin',
  cart: [],
  selectedProduct: null,
  selectedColor: null,
  selectedSize: null,
  qty: 1,
  selectedAddress: 1,
  selectedPayment: 'cod',
  timerSeconds: 3 * 3600 + 24 * 60 + 17,
  cartItemQty: {},

  navigate(screen) {
    this.currentScreen = screen;
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const el = document.getElementById('screen-' + screen);
    if (el) { el.classList.add('active'); el.scrollTop = 0; }
    document.querySelectorAll('.nav-item').forEach(n => {
      n.classList.toggle('active', n.dataset.screen === screen);
    });
    if (screen === 'home') renderHome();
    if (screen === 'cart') renderCart();
    if (screen === 'product') renderProduct();
    if (screen === 'address') renderAddress();
    if (screen === 'payment') renderPayment();
    if (screen === 'tracking') renderTracking();
  },

  addToCart(product) {
    const existing = this.cart.find(i => i.id === product.id);
    if (existing) { existing.qty += this.qty; }
    else { this.cart.push({...product, qty: this.qty, variant: this.selectedColor || this.selectedSize || ''}); }
    this.updateCartBadge();
    showToast('Added to cart 🛒');
  },

  removeFromCart(id) {
    this.cart = this.cart.filter(i => i.id !== id);
    this.updateCartBadge();
    renderCart();
  },

  updateQty(id, delta) {
    const item = this.cart.find(i => i.id === id);
    if (item) {
      item.qty = Math.max(1, item.qty + delta);
      renderCart();
    }
  },

  cartTotal() {
    return this.cart.reduce((s, i) => s + i.price * i.qty, 0);
  },

  cartCount() {
    return this.cart.reduce((s, i) => s + i.qty, 0);
  },

  updateCartBadge() {
    const b = document.getElementById('cart-badge');
    const count = this.cartCount();
    if (b) { b.textContent = count; b.style.display = count > 0 ? 'flex' : 'none'; }
  },

  startTimer() {
    setInterval(() => {
      if (this.timerSeconds > 0) this.timerSeconds--;
      const el = document.getElementById('flash-timer');
      if (el) el.innerHTML = formatTimer(this.timerSeconds);
    }, 1000);
  }
};

function formatTimer(s) {
  const h = String(Math.floor(s / 3600)).padStart(2,'0');
  const m = String(Math.floor((s % 3600) / 60)).padStart(2,'0');
  const sec = String(s % 60).padStart(2,'0');
  return `<span class="timer-block">${h}</span><span class="timer-sep">:</span><span class="timer-block">${m}</span><span class="timer-sep">:</span><span class="timer-block">${sec}</span>`;
}

function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2000);
}
