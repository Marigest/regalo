// === PARTICELLE FLUTTUANTI ===
(function () {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const symbols = ['♡', '✦', '·', '˚', '⋆', '✿', '✧'];
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: canvas.height + 20,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      size: Math.random() * 14 + 8,
      speed: Math.random() * 0.6 + 0.2,
      drift: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.4 + 0.1,
      hue: Math.random() * 60 + 290
    };
  }

  for (let i = 0; i < 30; i++) {
    const p = createParticle();
    p.y = Math.random() * canvas.height;
    particles.push(p);
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      p.y -= p.speed;
      p.x += p.drift;
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = `hsl(${p.hue}, 70%, 75%)`;
      ctx.font = `${p.size}px serif`;
      ctx.fillText(p.symbol, p.x, p.y);
      if (p.y < -30) particles[i] = createParticle();
    });
    if (Math.random() < 0.03 && particles.length < 60) particles.push(createParticle());
    requestAnimationFrame(animate);
  }
  animate();
})();
