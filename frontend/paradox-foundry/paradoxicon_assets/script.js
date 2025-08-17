<file name=NavBar.tsx path=/Users/patricktreloar/Documents/GitHub/simulacrum-engine/frontend/paradox-foundry/src/components>
const navLinks = [
  // ... other links ...
  {
    name: { en: "Secret" },
    href: "/zoan.html"
  },
  // ... other links ...
];
</file>

<file name=zoan.html path=/Users/patricktreloar/Documents/GitHub/simulacrum-engine/frontend/paradox-foundry/public>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Zoan! — Paradoxicon Recruitment Portal</title>
  <style>
    :root { --gold: #d4af37; }
    html, body { margin:0; padding:0; background:#0a0a0a; color:#e6e6e6; font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif; }
    a { color: var(--gold); text-decoration:none; }
    .header { position:relative; width:100%; height:58vh; min-height:340px; overflow:hidden; background: radial-gradient(60% 60% at 50% 50%, #0a0a0a 0%, #000 100%); }
    #blackHoleHeaderCanvas { position:absolute; inset:0; width:100%; height:100%; display:block; }
    .overlay {
      position:absolute; inset:0; display:flex; align-items:center; justify-content:center; text-align:center;
      padding:2rem; background:linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.0) 40%, rgba(0,0,0,0.35) 100%);
    }
    .title { font-size: clamp(28px, 5vw, 56px); font-weight:800; letter-spacing:0.02em; color:var(--gold); text-shadow:0 2px 18px rgba(212,175,55,0.25); margin:0 0 0.35rem; }
    .subtitle { font-size: clamp(14px, 1.6vw, 18px); opacity:0.9; margin:0; }
    .chipbar { position:fixed; right:16px; top:14px; z-index:20; font-size:12px; background:rgba(0,0,0,0.35); border:1px solid rgba(212,175,55,0.35); border-radius:999px; padding:6px 10px; }
    .chipbar a { color:#bcbcbc; margin-right:8px; }
    .chipbar a.active { color:var(--gold); }
    .container { max-width: 980px; margin: 28px auto 60px; padding: 0 16px; line-height:1.6; }
    .cta { display:inline-block; margin-top:18px; border:1px solid rgba(212,175,55,0.4); padding:10px 16px; border-radius:10px; }
    .back { position:fixed; left:16px; top:14px; z-index:20; font-size:12px; background:rgba(0,0,0,0.35); border:1px solid rgba(212,175,55,0.35); border-radius:999px; padding:6px 10px; }
  </style>
</head>
<body>
  <a class="back" href="/">← Back to site</a>
  <div class="chipbar">
    <a id="fig8Link" href="?variant=figure8">Figure‑8</a>
    <a id="mobiusLink" class="active" href="?variant=mobius">Möbius</a>
  </div>

  <header id="animation-header" class="header" role="img" aria-label="Möbius black‑hole header animation">
    <canvas id="blackHoleHeaderCanvas"></canvas>
    <div class="overlay">
      <div>
        <h1 class="title">Enter the Zoan</h1>
        <p class="subtitle">Level None: a coin‑toss into He Tu / Lo Shu. Make the first paradox fold.</p>
        <a class="cta" href="#seed">Begin the experiment</a>
      </div>
    </div>
  </header>

  <main class="container">
    <h2 id="seed">Level None — Seed Trial</h2>
    <p>This is the simplest viable entry. On merge, we’ll attach a Yin/Yang coin‑toss that routes to He Tu or Lo Shu and logs resonance (no backend required).</p>
    <ul>
      <li>Tier 0: coin toss (yin/yang) → He Tu / Lo Shu visual route.</li>
      <li>Tier 1: Bagua UI sketch with Weiqi stones as counters.</li>
      <li>Tier 2: King Wen sequence visualiser (non‑interactive baseline).</li>
    </ul>
    <p>For A/B: add <code>?variant=mobius</code> (this page) or <code>?variant=figure8</code> (falls back to current script if present).</p>
  </main>

  <script>
    (function(){
      var params = new URLSearchParams(location.search);
      var variant = params.get('variant');

      // Default to Möbius (we include it inline). If ?variant=figure8 and /paradoxicon_assets/script.js exists, try to load it.
      if (variant === 'figure8') {
        var s = document.createElement('script');
        s.src = '/paradoxicon_assets/script.js';
        s.defer = true;
        s.onerror = function(){ /* silently fall back to inline Möbius */ initBlackHoleHeader && initBlackHoleHeader(); };
        s.onload  = function(){ /* figure‑8 script is expected to self‑boot */ };
        document.head.appendChild(s);
      }
    })();
  </script>

  <script>
    // === Möbius / Black‑hole header (inline) ===
    (function(){
      let rafId;
      function project(point, w, h){
        const fov = 280;
        const scale = fov / (fov + point.z);
        return { x: w/2 + point.x * scale, y: h/2 + point.y * scale };
      }
      function mobius(u, v, radius){
        const half = v * 0.5;
        const x = (radius + half * Math.cos(u/2)) * Math.cos(u);
        const y = (radius + half * Math.cos(u/2)) * Math.sin(u);
        const z = half * Math.sin(u/2) * radius * 0.6;
        return {x, y, z};
      }
      function initBlackHoleHeader(){
        const canvas = document.getElementById('blackHoleHeaderCanvas');
        const header = document.getElementById('animation-header');
        if(!canvas || !header){ return; }
        const ctx = canvas.getContext('2d', { alpha: true });
        const DPR = Math.min(window.devicePixelRatio || 1, 2);
        function resize(){
          const rect = header.getBoundingClientRect();
          canvas.width  = Math.max(1, Math.floor(rect.width * DPR));
          canvas.height = Math.max(1, Math.floor(rect.height * DPR));
          canvas.style.width = rect.width + 'px';
          canvas.style.height = rect.height + 'px';
        }
        resize();
        window.addEventListener('resize', () => { cancelAnimationFrame(rafId); resize(); animate(); }, { passive:true });

        const COUNT = 800; let t = 0;
        function animate(){
          const w = canvas.width, h = canvas.height;
          const radius = Math.min(w, h) * 0.22;
          ctx.clearRect(0,0,w,h);
          const g = ctx.createRadialGradient(w/2, h/2, 10, w/2, h/2, Math.max(w,h)*0.6);
          g.addColorStop(0, 'rgba(0,0,0,0.0)'); g.addColorStop(1, 'rgba(0,0,0,0.9)');
          ctx.fillStyle = g; ctx.fillRect(0,0,w,h);
          ctx.globalCompositeOperation = 'lighter';
          for(let i=0;i<COUNT;i++){
            const u = ((i / COUNT) * Math.PI * 2 + t*0.002) % (Math.PI*2);
            const v = (Math.random() * 2 - 1) * 0.9;
            const m = mobius(u, v, radius);
            const p = project(m, w, h);
            const alpha = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(u*3 + t*0.002));
            ctx.beginPath();
            ctx.fillStyle = `rgba(212,175,55,${alpha})`;
            const size = 1 + 1.5 * alpha * (window.devicePixelRatio||1);
            ctx.arc(p.x, p.y, size, 0, Math.PI*2);
            ctx.fill();
          }
          ctx.globalCompositeOperation = 'source-over';
          t += 1; rafId = requestAnimationFrame(animate);
        }
        animate();
      }
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBlackHoleHeader, { once:true });
      } else { initBlackHoleHeader(); }
      window.initBlackHoleHeader = initBlackHoleHeader;
    })();
  </script>
</body>
</html>
