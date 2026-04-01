function renderProduct() {
  const p = PRODUCTS.find(x => x.id === State.selectedProduct);
  if (!p) return;
  const el = document.getElementById('screen-product');
  const savings = p.orig - p.price;

  el.innerHTML = `
    <div style="position:sticky;top:0;z-index:100;background:#fff;display:flex;align-items:center;padding:10px 14px;border-bottom:1px solid var(--border)">
      <span style="font-size:22px;cursor:pointer;margin-right:10px" onclick="State.navigate('home')">←</span>
      <span style="flex:1;font-size:15px;font-weight:700">Product Details</span>
      <span style="font-size:22px;cursor:pointer;margin-right:10px" onclick="showToast('Added to wishlist ❤️')">🤍</span>
      <span style="font-size:22px;cursor:pointer;position:relative" onclick="State.navigate('cart')">🛒<span id="cart-badge" class="badge" style="display:${State.cartCount()>0?'flex':'none'}">${State.cartCount()}</span></span>
    </div>
    <div class="scroll-content">
      <!-- Image Carousel -->
      <div class="img-carousel">
        <img src="${p.img}" alt="${p.title}"/>
        <div class="carousel-dots">
          <div class="dot active"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div>
        </div>
        <div style="position:absolute;top:10px;left:10px;display:flex;flex-direction:column;gap:4px">
          <span class="off-badge" style="font-size:13px;padding:4px 8px">${p.off}% OFF</span>
          ${p.sold?`<span class="badge-tag seller">${p.sold} sold</span>`:''}
        </div>
      </div>

      <!-- Price Row -->
      <div class="detail-price-row">
        <div style="display:flex;align-items:baseline;flex-wrap:wrap;gap:4px">
          <span class="detail-price">${fmt(p.price)}</span>
          <span class="detail-orig">${fmt(p.orig)}</span>
          <span class="detail-save">Save ${fmt(savings)}</span>
        </div>
        <div style="font-size:12px;color:var(--sub);margin-top:4px">⭐ ${p.rating} (${p.reviews.toLocaleString()} reviews) · ${p.sold} sold</div>
        <div style="font-size:13px;font-weight:700;color:var(--text);margin-top:6px;line-height:1.4">${p.title}</div>
        <div style="display:flex;gap:6px;margin-top:8px;flex-wrap:wrap">
          <span class="badge-tag seller">Best Seller</span>
          <span class="badge-tag new">Free Returns</span>
          <span class="badge-tag limited">Limited Stock</span>
        </div>
      </div>

      <!-- Shipping Note -->
      <div class="ship-note">✈️ Ships from overseas · Estimated delivery: <strong>Apr 8 – Apr 15</strong></div>
      <div style="background:#f0fff4;padding:8px 14px;font-size:12px;color:#2e7d32;display:flex;align-items:center;gap:6px">🚚 FREE Shipping · 🔄 Free Returns within 90 days</div>

      <!-- Color Selector -->
      ${p.colors ? `
      <div class="selector-row">
        <label>Color: <strong>${State.selectedColor || p.colors[0]}</strong></label>
        <div class="selector-options">
          ${p.colors.map(c => `<div class="sel-opt ${(State.selectedColor||p.colors[0])===c?'active':''}" onclick="State.selectedColor='${c}';renderProduct()">${c}</div>`).join('')}
        </div>
      </div>` : ''}

      <!-- Size Selector -->
      ${p.sizes ? `
      <div class="selector-row">
        <label>Size: <strong>${State.selectedSize || 'Select'}</strong></label>
        <div class="selector-options">
          ${p.sizes.map(s => `<div class="sel-opt ${State.selectedSize===s?'active':''}" onclick="State.selectedSize='${s}';renderProduct()">${s}</div>`).join('')}
        </div>
      </div>` : ''}

      <!-- Quantity -->
      <div class="qty-row">
        <span style="font-size:13px;color:var(--sub);font-weight:600">Quantity:</span>
        <div class="qty-btn" onclick="if(State.qty>1){State.qty--;renderProduct()}">−</div>
        <div class="qty-val">${State.qty}</div>
        <div class="qty-btn" onclick="State.qty++;renderProduct()">+</div>
        <span style="font-size:12px;color:var(--sub);margin-left:4px">Only 47 left!</span>
      </div>

      <!-- Seller Info -->
      <div style="padding:10px 14px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px">
        <div style="width:36px;height:36px;border-radius:50%;background:var(--orange);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:14px">T</div>
        <div style="flex:1">
          <div style="font-size:13px;font-weight:700">Temu Official Store</div>
          <div style="font-size:11px;color:var(--sub)">98.7% positive feedback · 120k+ sales</div>
        </div>
        <button class="btn-outline" style="width:auto;padding:6px 14px;font-size:12px" onclick="showToast('Chat with seller')">Chat</button>
      </div>

      <!-- Reviews -->
      <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 14px 6px">
        <div style="font-size:15px;font-weight:800">Reviews (${p.reviews.toLocaleString()})</div>
        <div style="font-size:12px;color:var(--orange);cursor:pointer">See all ›</div>
      </div>
      <div style="padding:0 14px 8px;display:flex;align-items:center;gap:10px">
        <div style="font-size:36px;font-weight:900;color:var(--text)">${p.rating}</div>
        <div>
          <div style="color:#ffa000;font-size:18px">${'★'.repeat(Math.round(p.rating))}${'☆'.repeat(5-Math.round(p.rating))}</div>
          <div style="font-size:11px;color:var(--sub)">${p.reviews.toLocaleString()} ratings</div>
        </div>
      </div>
      ${REVIEWS.map(r => `
        <div class="review-card">
          <div style="display:flex;align-items:center">
            <span class="review-stars">${'★'.repeat(r.stars)}${'☆'.repeat(5-r.stars)}</span>
            <span class="review-author">${r.author} · ${r.date}</span>
          </div>
          <div class="review-text">${r.text}</div>
        </div>`).join('')}

      <div style="height:80px"></div>
    </div>

    <!-- Action Buttons -->
    <div class="action-row">
      <button class="btn-buy" onclick="State.addToCart(PRODUCTS.find(x=>x.id===${p.id}))">ADD TO CART</button>
      <button class="btn-add" onclick="State.addToCart(PRODUCTS.find(x=>x.id===${p.id}));setTimeout(()=>State.navigate('cart'),300)">BUY NOW</button>
    </div>
    ${renderBottomNav()}`;

  State.updateCartBadge();
}
