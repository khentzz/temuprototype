function renderAddress() {
  const el = document.getElementById('screen-address');
  el.innerHTML = `
    <div style="position:sticky;top:0;z-index:100;background:#fff;display:flex;align-items:center;padding:12px 14px;border-bottom:1px solid var(--border)">
      <span style="font-size:22px;cursor:pointer;margin-right:10px" onclick="State.navigate('cart')">←</span>
      <span style="flex:1;font-size:16px;font-weight:800">Delivery Address</span>
    </div>
    <div class="scroll-content">
      <div style="padding:10px 14px 4px;font-size:13px;font-weight:700;color:var(--sub)">SAVED ADDRESSES</div>

      ${ADDRESSES.map(a => `
        <div class="address-card ${State.selectedAddress===a.id?'selected':''}" onclick="State.selectedAddress=${a.id};renderAddress()">
          <div class="radio"></div>
          <div class="name">${a.name} · ${a.phone}</div>
          <div class="addr">${a.line}, ${a.city}, ${a.zip}, ${a.region}</div>
          <div class="delivery">📦 Estimated delivery: ${a.delivery}</div>
        </div>`).join('')}

      <!-- Add New Address -->
      <div style="padding:10px 14px 4px;font-size:13px;font-weight:700;color:var(--sub);margin-top:8px">ADD NEW ADDRESS</div>
      <div class="form-group"><label>Full Name</label><input type="text" placeholder="[Full Name]"/></div>
      <div class="form-group"><label>Phone Number</label><input type="tel" placeholder="[Phone Number]"/></div>
      <div class="form-group"><label>Address Line</label><input type="text" placeholder="Street, Building, Unit"/></div>
      <div style="display:flex;gap:8px;padding:0 14px;margin-bottom:12px">
        <div style="flex:1"><label style="font-size:12px;color:var(--sub);font-weight:600;display:block;margin-bottom:4px">City</label><input type="text" placeholder="City" style="width:100%;border:1.5px solid var(--border);border-radius:10px;padding:11px 14px;font-size:14px;outline:none"/></div>
        <div style="flex:1"><label style="font-size:12px;color:var(--sub);font-weight:600;display:block;margin-bottom:4px">ZIP Code</label><input type="text" placeholder="ZIP" style="width:100%;border:1.5px solid var(--border);border-radius:10px;padding:11px 14px;font-size:14px;outline:none"/></div>
      </div>
      <div class="form-group">
        <label>Region / Province</label>
        <select>
          <option>Metro Manila</option><option>Cebu</option><option>Davao</option><option>Laguna</option><option>Cavite</option>
        </select>
      </div>

      <div style="padding:12px 14px">
        <button class="btn-orange" onclick="State.navigate('payment')">CONTINUE</button>
      </div>
      <div style="height:20px"></div>
    </div>
    ${renderBottomNav()}`;
}
