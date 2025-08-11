/**
 * Möbius header variant + existing page systems (FSA, geometry, easter egg)
 * Load via ?variant=mobius (handled by dynamic loader in paradoxicon.html)
 */

// === Mobius / Black-hole header animation ===
(function(){
  let rafId;
  function project(point, w, h){
    const fov = 280;
    const scale = fov / (fov + point.z);
    return { x: w/2 + point.x * scale, y: h/2 + point.y * scale };
  }
  function mobius(u, v, radius){
    // u ∈ [0, 2π), v ∈ [-1, 1]
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
    window.addEventListener('resize', () => {
      cancelAnimationFrame(rafId);
      resize();
      animate();
    }, { passive:true });

    const COUNT = 800;
    let t = 0;
    function animate(){
      const w = canvas.width, h = canvas.height;
      const radius = Math.min(w, h) * 0.22;
      ctx.clearRect(0,0,w,h);

      // soft vignette
      const g = ctx.createRadialGradient(w/2, h/2, 10, w/2, h/2, Math.max(w,h)*0.6);
      g.addColorStop(0, 'rgba(0,0,0,0.0)');
      g.addColorStop(1, 'rgba(0,0,0,0.9)');
      ctx.fillStyle = g;
      ctx.fillRect(0,0,w,h);

      // particle pass
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

      t += 1;
      rafId = requestAnimationFrame(animate);
    }
    animate();
  }

  // boot when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlackHoleHeader, { once:true });
  } else {
    initBlackHoleHeader();
  }
  window.initBlackHoleHeader = initBlackHoleHeader;
})();

/**
 * FSA System - for detecting user flow state.
 * (copied from current script.js)
 */
class FlowStateDetector {
    constructor(){this.startTime=Date.now();this.scrollDepth=0;this.flowScore=0;this.isInFlow=!1;this.initTracking()}
    initTracking(){let e;window.addEventListener("scroll",()=>{this.scrollDepth=Math.max(this.scrollDepth,window.scrollY/(document.body.scrollHeight-window.innerHeight)*100),clearTimeout(e),e=setTimeout(()=>this.calculateFlow(),1e3)})}
    calculateFlow(){const e=(Date.now()-this.startTime)/1e3;if(e>10){const t=this.scrollDepth/e;let i=0;t>=.5&&t<=2&&(i=1-Math.abs(t-1.25)/0.75);const o=Math.min(e/120,1);this.flowScore=.6*i+.4*o;const s=this.isInFlow;this.isInFlow=this.flowScore>.65,this.isInFlow&&!s&&this.onFlowEntered(),window.fsaParticles&&window.fsaParticles.updateFlow(this.flowScore)}}
    onFlowEntered(){setTimeout(()=>{this.isInFlow&&this.revealZoan()},12e4)}
    revealZoan(){const e=document.createElement("div");e.style.cssText="position:fixed;top:20px;right:20px;background:rgba(212,175,55,0.1);border:1px solid rgba(212,175,55,0.3);color:#d4af37;padding:1rem;border-radius:8px;font-size:0.8rem;max-width:250px;z-index:1000;opacity:0;transition:opacity 1s",e.innerHTML='<div style="font-weight:600;margin-bottom:0.5rem;">The Zoan Recognition</div><div style="font-size:0.75rem;">You\'ve experienced adaptive technology.</div>',document.body.appendChild(e),setTimeout(()=>e.style.opacity="1",100),setTimeout(()=>{e.style.opacity="0",setTimeout(()=>e.remove(),1e3)},1e4)}
}

/**
 * FSAParticleSystem - for the subtle background dust effect.
 * (copied from current script.js)
 */
class FSAParticleSystem{constructor(e){this.canvas=e,this.ctx=e.getContext("2d"),this.particles=[],this.flowScore=0,this.mouse={x:window.innerWidth/2,y:window.innerHeight/2},this.resizeCanvas(),this.createParticles(),this.animate(),window.addEventListener("resize",()=>this.resizeCanvas()),document.addEventListener("mousemove",e=>{this.mouse.x=e.clientX,this.mouse.y=e.clientY})}
resizeCanvas(){this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight}
createParticles(){const e=window.innerWidth<768?15:25;this.particles=[];for(let t=0;t<e;t++)this.particles.push({x:Math.random()*this.canvas.width,y:Math.random()*this.canvas.height,vx:.2*(Math.random()-.5),vy:.2*(Math.random()-.5),size:1.5*Math.random()+.5,opacity:.2*Math.random()+.05,baseOpacity:.2*Math.random()+.05,coherence:0})}
updateFlow(e){this.flowScore=e}
updateParticles(){this.particles.forEach(e=>{this.flowScore>.65?(e.coherence=Math.min(1,e.coherence+.01),e.opacity=Math.min(2.5*e.baseOpacity,e.opacity+.003)):(e.vx+=.002*(Math.random()-.5),e.vy+=.002*(Math.random()-.5),e.coherence=Math.max(0,e.coherence-.005),e.opacity=Math.max(.5*e.baseOpacity,e.opacity-.002)),e.vx*=.995,e.vy*=.995,e.x+=e.vx,e.y+=e.vy,e.x<-10&&(e.x=this.canvas.width+10),e.x>this.canvas.width+10&&(e.x=-10),e.y<-10&&(e.y=this.canvas.height+10),e.y>this.canvas.height+10&&(e.y=-10)})}
drawParticles(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.particles.forEach(e=>{const t=45+15*e.coherence,i=20+30*e.coherence,o=40+25*e.coherence;this.ctx.fillStyle=`hsla(${t}, ${i}%, ${o}%, ${e.opacity})`,this.ctx.beginPath(),this.ctx.arc(e.x,e.y,e.size,0,2*Math.PI),this.ctx.fill()})}
animate(){this.updateParticles(),this.drawParticles(),requestAnimationFrame(()=>this.animate())}}

/**
 * Misc page utilities (copied from current script.js)
 */
function createGeometry(){const e=document.getElementById("geometryBg");if(!e)return;const t=window.innerWidth<768?8:15;for(let i=0;i<t;i++){const o=document.createElement("div");o.className="hyperbolic-circle";const s=200*Math.random()+50;o.style.width=s+"px",o.style.height=s+"px",o.style.left=Math.random()*window.innerWidth+"px",o.style.top=Math.random()*window.innerHeight+"px",o.style.animationDelay=20*Math.random()+"s",e.appendChild(o)}}
let easterEggActivated=!1;function activateEasterEgg(){easterEggActivated||(easterEggActivated=!0,document.querySelector(".easter-egg").classList.add("activated"),document.getElementById("hiddenMessage").classList.add("visible"))}
function closeEasterEgg(){document.getElementById("hiddenMessage").classList.remove("visible"),setTimeout(()=>{easterEggActivated=!1,document.querySelector(".easter-egg").classList.remove("activated")},500)}

/**
 * Initializer
 */
document.addEventListener('DOMContentLoaded', function() {
    // start Möbius header
    if (typeof initBlackHoleHeader === 'function') initBlackHoleHeader();
    // re-use the rest of the systems
    createGeometry();
    const canvas = document.getElementById('fsaCanvas');
    if (canvas) {
        window.fsaDetector = new FlowStateDetector();
        window.fsaParticles = new FSAParticleSystem(canvas);
    }
    window.addEventListener('resize', () => {
        const geometryBg = document.getElementById('geometryBg');
        if (geometryBg) { geometryBg.innerHTML = ''; createGeometry(); }
    });
});
