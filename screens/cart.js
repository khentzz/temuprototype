function renderCart() {
  const el = document.getElementById('screen-cart');
  const total = State.cartTotal();
  const freeShipThreshold = 1120;
  const progress = Math.min(100, (total / freeShipThreshold) * 100);
  const remaining = Math.max(0, freeShipThreshold - total).toFixed(2);
  const saved = State.cart.reduce((s,i) => s + (i.orig - i.price) * i.qty, 0).toFixed(2);

  el.innerHTML = `
    <div style="position:sticky;top:0;z-index:100;background:#fff;display:flex;align-items:center;padding:12px 14px;border-bottom:1px solid var(--border)">
      <span style="font-size:22px;cursor:pointer;margin-right:10px" onclick="State.navigate('home')">←</span>
      <span style="flex:1;font-size:16px;font-weight:800">My Cart (${State.cartCount()})</span>
    </div>
    <div class="scroll-content">
      ${State.cart.length === 0 ? `
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 20px;gap:16px">
          <div style="font-size:64px">🛒</div>
          <div style="font-size:18px;font-weight:700;color:var(--text)">Your cart is empty</div>
          <div style="font-size:13px;color:var(--sub)">Add items to get started!</div>
          <button class="btn-orange" style="width:200px" onclick="State.navigate('home')">Start Shopping</button>
        </div>` : `

        <!-- Saved Banner -->
        ${parseFloat(saved) > 0 ? `<div class="saved-banner">🎉 You saved <strong>${fmt(parseFloat(saved))}</strong> on this order!</div>` : ''}

        <!-- Free Shipping Progress -->
        <div class="ship-progress">
          <div style="font-size:13px;font-weight:600;color:var(--text)">
            ${progress >= 100 ? '🎉 You qualify for FREE shipping!' : `Add <strong style="color:var(--orange)">${fmt(parseFloat(remaining))}</strong> more for FREE shipping`}
          </div>
          <div class="ship-progress-bar"><div class="ship-progress-fill" style="width:${progress}%"></div></div>
        </div>

        <!-- Cart Items -->
        <div style="background:#fff">
          <div style="padding:10px 14px;font-size:13px;font-weight:700;color:var(--sub);border-bottom:1px solid var(--border);display:flex;align-items:center;gap:8px">
            <input type="checkbox" checked style="accent-color:var(--orange);width:16px;height:16px"/> Select All (${State.cart.length} items)
          </div>
          ${State.cart.map(item => `
            <div class="cart-item">
              <input type="checkbox" checked/>
              <img src="${item.img}" alt="${item.title}"/>
              <div class="cart-item-info">
                <div class="cart-item-name">${item.title}</div>
                ${item.variant ? `<div class="cart-item-variant">Variant: ${item.variant}</div>` : ''}
                <div class="cart-item-price">${fmt(item.price)} <span style="font-size:11px;color:var(--sub);text-decoration:line-through;font-weight:400">${fmt(item.orig)}</span></div>
                <div class="cart-qty">
                  <div class="cart-qty-btn" onclick="State.updateQty(${item.id},-1)">−</div>
                  <span style="font-size:14px;font-weight:700;min-width:20px;text-align:center">${item.qty}</span>
                  <div class="cart-qty-btn" onclick="State.updateQty(${item.id},1)">+</div>
                  <span style="margin-left:auto;font-size:12px;color:var(--sub);cursor:pointer" onclick="State.removeFromCart(${item.id})">🗑 Remove</span>
                </div>
              </div>
            </div>`).join('')}
        </div>

        <!-- Order Summary -->
        <div class="divider"></div>
        <div class="order-summary">
          <div style="font-size:14px;font-weight:800;margin-bottom:8px">Order Summary</div>
          <div class="summary-row"><span>Subtotal (${State.cartCount()} items)</span><span>${fmt(total)}</span></div>
          <div class="summary-row"><span>Shipping</span><span class="free">${progress>=100?'FREE':'₱0.00'}</span></div>
          <div class="summary-row"><span>Discount</span><span style="color:var(--red)">-${fmt(parseFloat(saved))}</span></div>
          <div class="summary-row total"><span>Total</span><span style="color:var(--orange)">${fmt(total)}</span></div>
        </div>

        <!-- Checkout Button -->
        <div style="padding:12px 14px">
          <button class="btn-orange" onclick="State.navigate('address')">CHECKOUT (${fmt(total)})</button>
        </div>
      `}
    </div>
    ${renderBottomNav()}`;

  State.updateCartBadge();
}
