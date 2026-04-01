const PAYMENT_METHODS = [
  {id:'card',icon:'💳',label:'Credit / Debit Card'},
  {id:'gcash',icon:'📱',label:'GCash'},
  {id:'paypal',icon:'🅿️',label:'PayPal'},
  {id:'cod',icon:'💵',label:'Cash on Delivery'},
];

function renderPayment() {
  const el = document.getElementById('screen-payment');
  const total = State.cartTotal();
  const addr = ADDRESSES.find(a => a.id === State.selectedAddress);
  const saved = State.cart.reduce((s,i) => s + (i.orig - i.price) * i.qty, 0).toFixed(2);

  el.innerHTML = `
    <div style="position:sticky;top:0;z-index:100;background:#fff;display:flex;align-items:center;padding:12px 14px;border-bottom:1px solid var(--border)">
      <span style="font-size:22px;cursor:pointer;margin-right:10px" onclick="State.navigate('address')">←</span>
      <span style="flex:1;font-size:16px;font-weight:800">Payment</span>
    </div>
    <div class="scroll-content">

      <!-- Delivery Address Summary -->
      <div style="padding:10px 14px;background:#f9f9f9;border-bottom:1px solid var(--border)">
        <div style="font-size:11px;color:var(--sub);font-weight:700;margin-bottom:4px">DELIVERING TO</div>
        <div style="font-size:13px;font-weight:700">${addr ? addr.name : '[Name]'}</div>
        <div style="font-size:12px;color:var(--sub)">${addr ? addr.line + ', ' + addr.city : '[Address]'}</div>
        <div style="font-size:12px;color:#2e7d32;font-weight:600;margin-top:3px">📦 ${addr ? addr.delivery : 'Apr 8 - Apr 12'}</div>
      </div>

      <!-- Payment Methods -->
      <div style="padding:10px 14px 4px;font-size:13px;font-weight:700;color:var(--sub)">PAYMENT METHOD</div>
      ${PAYMENT_METHODS.map(m => `
        <div class="payment-option ${State.selectedPayment===m.id?'selected':''}" onclick="State.selectedPayment='${m.id}';renderPayment()">
          <div class="pay-icon">${m.icon}</div>
          <div class="pay-label">${m.label}</div>
          <div class="radio"></div>
        </div>`).join('')}

      <!-- Voucher -->
      <div class="divider"></div>
      <div style="padding:10px 14px 4px;font-size:13px;font-weight:700;color:var(--sub)">PROMO CODE / VOUCHER</div>
      <div class="voucher-row">
        <input type="text" placeholder="Enter promo code" id="voucher-input"/>
        <button onclick="applyVoucher()">Apply</button>
      </div>

      <!-- Temu Credits -->
      <div class="divider"></div>
      <div class="credits-row">
        <div>
          <div class="label">🪙 Temu Credits</div>
          <div style="font-size:11px;color:var(--sub);margin-top:2px">Balance: ₱700.00</div>
        </div>
        <div style="display:flex;align-items:center;gap:10px">
          <div class="amount">-₱0.00</div>
          <div class="toggle" id="credits-toggle" onclick="toggleCredits()"></div>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="divider"></div>
      <div class="order-summary">
        <div style="font-size:14px;font-weight:800;margin-bottom:8px">Order Summary</div>
        ${State.cart.map(i => `
          <div class="summary-row" style="font-size:12px">
            <span style="flex:1;margin-right:8px;color:var(--sub)">${i.title.substring(0,30)}... x${i.qty}</span>
            <span>${fmt(i.price * i.qty)}</span>
          </div>`).join('')}
        <div class="summary-row"><span>Subtotal</span><span>${fmt(total)}</span></div>
        <div class="summary-row"><span>Shipping</span><span class="free">FREE</span></div>
        <div class="summary-row"><span>Discount</span><span style="color:var(--red)">-${fmt(parseFloat(saved))}</span></div>
        <div class="summary-row"><span>Promo Code</span><span style="color:var(--red)" id="promo-discount">-₱0.00</span></div>
        <div class="summary-row total"><span>Total</span><span style="color:var(--orange)">${fmt(total)}</span></div>
      </div>

      <div style="padding:12px 14px">
        <button class="btn-orange" onclick="placeOrder()">PLACE ORDER · ${fmt(total)}</button>
        <div style="text-align:center;font-size:11px;color:var(--sub);margin-top:8px">🔒 Secured by Temu Buyer Protection</div>
      </div>
      <div style="height:20px"></div>
    </div>
    ${renderBottomNav()}`;
}

function applyVoucher() {
  const v = document.getElementById('voucher-input').value.trim().toUpperCase();
  if (v === 'TEMU10') {
    document.getElementById('promo-discount').textContent = '-₱112.00';
    showToast('Voucher applied! -₱112.00 🎉');
  } else if (v) {
    showToast('Invalid voucher code');
  }
}

function toggleCredits() {
  const t = document.getElementById('credits-toggle');
  t.classList.toggle('on');
  showToast(t.classList.contains('on') ? 'Credits applied: -₱700.00' : 'Credits removed');
}

function placeOrder() {
  showToast('Placing order...');
  setTimeout(() => {
    State.cart = [];
    State.updateCartBadge();
    State.navigate('tracking');
  }, 1000);
}
