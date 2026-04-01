function renderSignIn() {
  const el = document.getElementById('screen-signin');
  el.innerHTML = `
    <div class="signin-screen">
      <div class="logo">temu</div>
      <div class="tagline">Shop Like a Billionaire 💸</div>
      <input class="input-field" type="email" placeholder="Email address" id="si-email"/>
      <input class="input-field" type="password" placeholder="Password" id="si-pass"/>
      <button class="btn-orange" onclick="handleSignIn()">Sign In</button>
      <div style="width:100%;text-align:right;margin-top:-8px">
        <a href="#" style="font-size:12px;color:var(--orange);text-decoration:none">Forgot password?</a>
      </div>
      <div class="divider-text">or continue with</div>
      <button class="social-btn">🇬 &nbsp; Continue with Google</button>
      <button class="social-btn">📘 &nbsp; Continue with Facebook</button>
      <button class="social-btn">🍎 &nbsp; Continue with Apple</button>
      <div class="join-link">New to Temu? <a href="#" onclick="State.navigate('home');return false">Join now</a></div>
      <div style="font-size:10px;color:var(--sub);text-align:center;margin-top:8px;line-height:1.5">
        By continuing, you agree to Temu's<br/>
        <a href="#" style="color:var(--orange);text-decoration:none">Terms of Use</a> &amp; <a href="#" style="color:var(--orange);text-decoration:none">Privacy Policy</a>
      </div>
    </div>`;
}

function handleSignIn() {
  const email = document.getElementById('si-email').value;
  const pass = document.getElementById('si-pass').value;
  if (!email || !pass) { showToast('Please fill in all fields'); return; }
  showToast('Signing in...');
  setTimeout(() => State.navigate('home'), 800);
}
