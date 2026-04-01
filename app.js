function initApp() {
  try {
    const app = document.getElementById('app');

    const screens = ['signin','home','product','cart','address','payment','tracking'];
    screens.forEach(id => {
      const div = document.createElement('div');
      div.id = 'screen-' + id;
      div.className = 'screen' + (id === 'signin' ? ' active' : '');
      app.appendChild(div);
    });

    renderSignIn();
    State.startTimer();
    State.currentScreen = 'signin';
  } catch(e) {
    document.getElementById('app').innerHTML =
      '<div style="padding:40px;text-align:center;color:red;font-family:sans-serif">' +
      '<h2>Something went wrong</h2><pre style="text-align:left;font-size:12px;margin-top:16px">' +
      e.stack + '</pre></div>';
  }
}

document.addEventListener('DOMContentLoaded', initApp);
