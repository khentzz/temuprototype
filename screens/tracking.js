const TRACKING_STEPS = [
  {label:'Order Placed',time:'Apr 1, 2026 · 8:45 PM',done:true},
  {label:'Payment Confirmed',time:'Apr 1, 2026 · 8:46 PM',done:true},
  {label:'Processing',time:'Apr 2, 2026 · 10:00 AM',done:true},
  {label:'Shipped',time:'Apr 3, 2026 · 2:30 PM',done:false,active:true},
  {label:'Out for Delivery',time:'Estimated Apr 8',done:false},
  {label:'Delivered',time:'Estimated Apr 8 – Apr 12',done:false},
];

function renderTracking() {
  const el = document.getElementById('screen-tracking');
  const orderItems = PRODUCTS.slice(0, 2);

  el.innerHTML = `
    <div style="position:sticky;top:0;z-index:100;background:var(--orange);display:flex;align-items:center;padding:12px 14px">
      <span style="font-size:22px;cursor:pointer;margin-right:10px;color:#fff" onclick="State.navigate('home')">←</span>
      <span style="flex:1;font-size:16px;font-weight:800;color:#fff">Order Tracking</span>
    </div>
    <div class="scroll-content">

      <!-- Header -->
      <div class="tracking-header">
        <div class="order-num">Order #TM-2026-04010847 · Apr 1, 2026</div>
        <div class="eta">📦 Arriving Apr 8 – Apr 12</div>
        <div class="eta-sub">Estimated delivery · Standard Shipping</div>
      </div>

      <!-- Status Banner -->
      <div style="background:#fff9f0;padding:12px 14px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px">
        <div style="font-size:28px">✈️</div>
        <div>
          <div style="font-size:14px;font-weight:800;color:var(--orange)">Your package is on the way!</div>
          <div style="font-size:12px;color:var(--sub);margin-top:2px">Left the overseas warehouse · In transit to your country</div>
        </div>
      </div>

      <!-- Carrier Info -->
      <div class="carrier-card">
        <div style="font-size:11px;color:var(--sub);font-weight:700;margin-bottom:6px">CARRIER INFORMATION</div>
        <div class="carrier-name">🚚 Temu Express Logistics</div>
        <div class="tracking-num">Tracking #: TML-PH-20260401-88472</div>
        <div style="margin-top:8px;display:flex;gap:8px">
          <button class="btn-outline" style="width:auto;padding:6px 14px;font-size:12px" onclick="showToast('Copied tracking number!')">Copy #</button>
          <button class="btn-outline" style="width:auto;padding:6px 14px;font-size:12px" onclick="showToast('Opening carrier site...')">Track on Carrier</button>
        </div>
      </div>

      <!-- Step Tracker -->
      <div style="padding:10px 14px 4px;font-size:13px;font-weight:700;color:var(--sub)">TRACKING HISTORY</div>
      <div class="step-tracker">
        ${TRACKING_STEPS.map((s,i) => `
          <div class="step ${s.done?'done':''} ${s.active?'active':''}">
            <div style="position:relative">
              <div class="step-dot">${s.done||s.active?'✓':''}</div>
              ${i < TRACKING_STEPS.length-1 ? '<div class="step-line"></div>' : ''}
            </div>
            <div class="step-info">
              <div class="step-label">${s.label}</div>
              <div class="step-time">${s.time}</div>
            </div>
          </div>`).join('')}
      </div>

      <!-- Action Buttons -->
      <div class="divider"></div>
      <div class="action-btns">
        <button class="btn-ghost" onclick="showToast('Connecting to seller...')">💬 Contact Seller</button>
        <button class="btn-ghost" onclick="showToast('Return request submitted!')">↩️ Request Return</button>
      </div>

      <!-- Order Items -->
      <div class="divider"></div>
      <div style="padding:10px 14px 4px;font-size:13px;font-weight:700;color:var(--sub)">ITEMS IN THIS ORDER</div>
      <div class="order-items-mini">
        ${orderItems.map(p => `
          <div class="order-item-mini">
            <img src="${p.img}" alt="${p.title}"/>
            <div style="flex:1">
              <div class="item-name">${p.title}</div>
              <div class="item-price">${fmt(p.price)}</div>
            </div>
            <button class="btn-outline" style="width:auto;padding:5px 10px;font-size:11px" onclick="State.selectedProduct=${p.id};State.navigate('product')">Buy Again</button>
          </div>`).join('')}
      </div>

      <!-- Rate Order -->
      <div style="margin:10px 14px;background:#fff9f0;border-radius:10px;padding:14px;text-align:center">
        <div style="font-size:14px;font-weight:700;margin-bottom:8px">How was your order?</div>
        <div style="font-size:28px;display:flex;justify-content:center;gap:8px;cursor:pointer">
          ${['😞','😐','🙂','😊','🤩'].map(e => `<span onclick="showToast('Thanks for your feedback!')">${e}</span>`).join('')}
        </div>
      </div>

      <div style="height:20px"></div>
    </div>
    ${renderBottomNav()}`;
}
