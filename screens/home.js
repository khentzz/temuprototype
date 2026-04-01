function renderHome() {
  const el = document.getElementById('screen-home');
  const todayDeals = PRODUCTS.slice(0, 4);
  const grid = PRODUCTS;

  el.innerHTML = `
    <div class="topbar">
      <div class="search-box">
        <span>🔍</span>
        <input type="text" placeholder="Free shipping on everything!"/>
        <span style="font-size:18px;cursor:pointer">📷</span>
      </div>
      <div class="icons">
        <span onclick="showToast('No new notifications')">🔔</span>
        <span onclick="State.navigate('cart')" style="position:relative">🛒<span id="cart-badge" class="badge" style="display:${State.cartCount()>0?'flex':'none'}">${State.cartCount()}</span></span>
      </div>
    </div>
    <div class="scroll-content">
      <!-- Flash Deals Banner -->
      <div class="flash-banner">
        <div class="flash-title">⚡ FLASH DEALS</div>
        <div class="timer" id="flash-timer">${formatTimer(State.timerSeconds)}</div>
      </div>

      <!-- Free Shipping -->
      <div class="free-ship">🚚 &nbsp; FREE SHIPPING ON ALL ORDERS — No minimum!</div>

      <!-- Categories -->
      <div class="section-title">Shop by Category</div>
      <div class="cat-row">
        ${CATEGORIES.map(c => `
          <div class="cat-item" onclick="showToast('${c.label} category')">
            <div class="cat-icon">${c.icon}</div>
            <div class="cat-label">${c.label}</div>
          </div>`).join('')}
      </div>

      <div class="divider"></div>

      <!-- Today's Deals -->
      <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 12px 6px">
        <div style="font-size:15px;font-weight:800;color:var(--text)">🔥 Today's Deals</div>
        <div style="font-size:12px;color:var(--orange);font-weight:700;cursor:pointer">See all ›</div>
      </div>
      <div class="h-scroll">
        ${todayDeals.map(p => productCardHTML(p)).join('')}
      </div>

      <div class="divider"></div>

      <!-- Promo Banner -->
      <div style="margin:8px 12px;border-radius:10px;overflow:hidden;background:linear-gradient(135deg,#ff6000,#ff9800);padding:14px;color:#fff;display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-size:11px;font-weight:700;opacity:.85">LIMITED TIME</div>
          <div style="font-size:20px;font-weight:900">Up to 90% OFF</div>
          <div style="font-size:12px;opacity:.85">New user exclusive deals</div>
        </div>
        <div style="font-size:48px">🎁</div>
      </div>

      <!-- Product Grid -->
      <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 12px 6px">
        <div style="font-size:15px;font-weight:800;color:var(--text)">Recommended For You</div>
        <div style="font-size:12px;color:var(--sub)">Based on your interests</div>
      </div>
      <div class="product-grid">
        ${grid.map(p => `
          <div class="product-card" onclick="State.selectedProduct=${p.id};State.selectedColor=null;State.selectedSize=null;State.qty=1;State.navigate('product')">
            <div style="position:relative">
              <img src="${p.img}" alt="${p.title}" loading="lazy"/>
              <div style="position:absolute;top:6px;left:6px;display:flex;flex-direction:column;gap:3px">
                ${p.id<=3?'<span class="badge-tag seller">Best Seller</span>':''}
                ${p.id===4||p.id===7?'<span class="badge-tag limited">Limited</span>':''}
              </div>
            </div>
            <div class="card-body">
              <div style="display:flex;align-items:center;gap:4px;flex-wrap:wrap">
                <span class="price">${fmt(p.price)}</span>
                <span class="off-badge">${p.off}% OFF</span>
              </div>
              <div class="orig-price">${fmt(p.orig)}</div>
              <div class="title">${p.title}</div>
              <div style="font-size:10px;color:var(--sub);margin-top:3px">${p.sold} sold · ⭐ ${p.rating}</div>
            </div>
          </div>`).join('')}
      </div>

      <div style="text-align:center;padding:16px;font-size:13px;color:var(--sub)">
        🎉 You've seen all products! Check back for more deals.
      </div>
    </div>
    ${renderBottomNav()}`;

  State.updateCartBadge();
}
