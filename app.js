// Minimalny Mini App: zewnętrzny plik (bez inline script)
(async () => {
  // Zbuduj prosty UI
  const root = document.createElement('div');
  root.innerHTML = `
    <div style="font-family: system-ui, sans-serif; padding: 20px; line-height:1.4">
      <h1 style="margin:0 0 8px">Hello Farcaster 👋</h1>
      <p style="margin:0 0 16px">To jest najprostszy Mini App. Załadował się poprawnie.</p>
      <button id="ping" style="padding:10px 14px; border-radius:10px; border:1px solid #ddd; cursor:pointer">
        Ping ⚡
      </button>
    </div>
  `;
  document.body.appendChild(root);

  // Załaduj SDK i wywołaj ready()
  try {
    const { createClient } = await import('https://cdn.farcaster.xyz/mini-apps/sdk/v1/index.js');
    const sdk = await createClient();

    await sdk.actions.ready(); // usuwa splash

    document.getElementById('ping').addEventListener('click', async () => {
      await sdk.actions.toast({ title: 'Pong!', description: 'Mini App działa ✅' });
    });
  } catch (err) {
    // Pokaż błąd w UI i konsoli (widać w Developer Mode)
    console.error('Mini App init error:', err);
    const errBox = document.createElement('pre');
    errBox.textContent = 'Init error: ' + (err && err.message ? err.message : String(err));
    errBox.style.color = 'crimson';
    document.body.appendChild(errBox);
  }
})();
