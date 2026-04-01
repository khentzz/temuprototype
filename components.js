function renderBottomNav() {
  return `<nav class="bottom-nav">
    <div class="nav-item active" data-screen="home" onclick="State.navigate('home')">
      <span class="icon">🏠</span>Home
    </div>
    <div class="nav-item" data-screen="categories" onclick="showToast('Categories coming soon!')">
      <span class="icon">☰</span>Categories
    </div>
    <div class="nav-item" data-screen="cart" onclick="State.navigate('cart')">
      <span class="icon" style="position:relative">🛒<span id="cart-badge" class="badge" style="display:none">0</span></span>Cart
    </div>
    <div class="nav-item" onclick="showToast('Messages coming soon!')">
      <span class="icon">💬</span>Messages
    </div>
    <div class="nav-item" onclick="showToast('Profile coming soon!')">
      <span class="icon">👤</span>Profile
    </div>
  </nav>`;
}

function productCardHTML(p, mini = false) {
  return `<div class="product-card" onclick="State.selectedProduct=${p.id};State.selectedColor=null;State.selectedSize=null;State.qty=1;State.navigate('product')">
    <img src="${p.img}" alt="${p.title}" loading="lazy"/>
    <div class="card-body">
      <div style="display:flex;align-items:center;gap:4px;flex-wrap:wrap">
        <span class="price">${fmt(p.price)}</span>
        <span class="off-badge">${p.off}% OFF</span>
      </div>
      <div class="orig-price">${fmt(p.orig)}</div>
      <div class="title">${p.title}</div>
      ${p.sold ? `<div style="font-size:10px;color:var(--sub);margin-top:3px">${p.sold} sold</div>` : ''}
    </div>
  </div>`;
}
