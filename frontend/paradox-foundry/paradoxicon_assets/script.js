/**
 * BinaryBlackHoleFigure8 Class for the header animation.
 */
class BinaryBlackHoleFigure8 {
    constructor() {
        this.canvas = document.getElementById('blackHoleHeaderCanvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.time = 0;
        
        this.resizeCanvas();
        this.initParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = this.canvas.parentElement.offsetHeight;
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        // Adjusted scale calculation to better fit the central animation
        this.scale = Math.min(this.canvas.width, this.canvas.height) * 0.3;
        
        // Recenter the animation slightly higher up to make space for the subtitle below
        this.centerY -= this.canvas.height * 0.1;

        this.blackHole1 = { x: this.centerX - this.scale * 0.6, y: this.centerY, radius: 25 };
        this.blackHole2 = { x: this.centerX + this.scale * 0.6, y: this.centerY, radius: 25 };
    }
    
    figure8Position(t, streamWidth = 0) {
        const a = this.scale * 0.8;
        const separation = this.scale * 1.2;
        const denominator = 1 + Math.sin(t) * Math.sin(t);
        let x = (separation * Math.cos(t)) / denominator;
        let y = (a * Math.sin(t) * Math.cos(t)) / denominator;
        const normal_x = -Math.sin(t);
        const normal_y = Math.cos(t);
        x += normal_x * streamWidth;
        y += normal_y * streamWidth;
        return { x: this.centerX + x, y: this.centerY + y };
    }
    
    initParticles() {
        const numStreams = 8;
        const particlesPerStream = 200;
        this.particles = [];
        for (let stream = 0; stream < numStreams; stream++) {
            const streamWidth = (stream - numStreams/2) * 8;
            for (let i = 0; i < particlesPerStream; i++) {
                const t = (i / particlesPerStream) * Math.PI * 2;
                const pos = this.figure8Position(t, streamWidth);
                this.particles.push({ t, streamWidth, x: pos.x, y: pos.y, speed: 0.008 + Math.random() * 0.004, size: 0.5 + Math.random() * 1.5, opacity: 0.3 + Math.random() * 0.7, phase: Math.random() * Math.PI * 2, baseStreamWidth: streamWidth, brightness: Math.random() });
            }
        }
        for (let i = 0; i < 300; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = this.scale * (1.5 + Math.random() * 0.8);
            this.particles.push({ t: Math.random() * Math.PI * 2, streamWidth: (Math.random() - 0.5) * 60, x: this.centerX + Math.cos(angle) * radius, y: this.centerY + Math.sin(angle) * radius, speed: 0.002 + Math.random() * 0.003, size: 0.3 + Math.random() * 1, opacity: 0.1 + Math.random() * 0.4, phase: Math.random() * Math.PI * 2, baseStreamWidth: (Math.random() - 0.5) * 60, brightness: Math.random() * 0.5, chaotic: true });
        }
    }
    
    updateParticles() {
        for (let p of this.particles) {
            p.t = (p.t + p.speed) % (Math.PI * 2);
            const oscillation = Math.sin(this.time * 0.01 + p.phase) * 5;
            p.streamWidth = p.baseStreamWidth + oscillation;
            const pos = this.figure8Position(p.t, p.streamWidth);
            p.x = pos.x; p.y = pos.y;
            const dist1 = Math.hypot(p.x - this.blackHole1.x, p.y - this.blackHole1.y);
            const dist2 = Math.hypot(p.x - this.blackHole2.x, p.y - this.blackHole2.y);
            const minDist = Math.min(dist1, dist2);
            p.brightness = p.opacity * (1 + 100 / (minDist + 20));
            if (minDist < 30) {
                const newT = Math.random() * Math.PI * 2;
                const newPos = this.figure8Position(newT, p.baseStreamWidth);
                p.t = newT; p.x = newPos.x; p.y = newPos.y;
            }
        }
    }
    
    drawBlackHoles() {
        [this.blackHole1, this.blackHole2].forEach(bh => {
            const gradient = this.ctx.createRadialGradient(bh.x, bh.y, 0, bh.x, bh.y, bh.radius * 3);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
            gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.4)');
            gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.1)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            this.ctx.fillStyle = gradient; this.ctx.beginPath(); this.ctx.arc(bh.x, bh.y, bh.radius * 3, 0, Math.PI * 2); this.ctx.fill();
            this.ctx.fillStyle = '#000000'; this.ctx.beginPath(); this.ctx.arc(bh.x, bh.y, bh.radius, 0, Math.PI * 2); this.ctx.fill();
            this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.6 + Math.sin(this.time * 0.02) * 0.3})`; this.ctx.lineWidth = 2; this.ctx.beginPath(); this.ctx.arc(bh.x, bh.y, bh.radius + 8, 0, Math.PI * 2); this.ctx.stroke();
        });
    }
    
    drawParticles() {
        for (let p of this.particles) {
            const alpha = Math.min(1, p.brightness);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`; this.ctx.beginPath(); this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); this.ctx.fill();
            if (alpha > 0.7) {
                this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.2})`; this.ctx.beginPath(); this.ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2); this.ctx.fill();
            }
        }
    }
    
    animate() {
        this.time++;
        this.ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.updateParticles();
        this.drawParticles();
        this.drawBlackHoles();
        requestAnimationFrame(() => this.animate());
    }
}

/**
 * FSA System - for detecting user flow state.
 * Currently a placeholder, to be fully implemented as per the Execution Plan.
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
 * Currently a placeholder, to be fully implemented as per the Execution Plan.
 */
class FSAParticleSystem{constructor(e){this.canvas=e,this.ctx=e.getContext("2d"),this.particles=[],this.flowScore=0,this.mouse={x:window.innerWidth/2,y:window.innerHeight/2},this.resizeCanvas(),this.createParticles(),this.animate(),window.addEventListener("resize",()=>this.resizeCanvas()),document.addEventListener("mousemove",e=>{this.mouse.x=e.clientX,this.mouse.y=e.clientY})}
resizeCanvas(){this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight}
createParticles(){const e=window.innerWidth<768?15:25;this.particles=[];for(let t=0;t<e;t++)this.particles.push({x:Math.random()*this.canvas.width,y:Math.random()*this.canvas.height,vx:.2*(Math.random()-.5),vy:.2*(Math.random()-.5),size:1.5*Math.random()+.5,opacity:.2*Math.random()+.05,baseOpacity:.2*Math.random()+.05,coherence:0})}
updateFlow(e){this.flowScore=e}
updateParticles(){this.particles.forEach(e=>{this.flowScore>.65?(e.coherence=Math.min(1,e.coherence+.01),e.opacity=Math.min(2.5*e.baseOpacity,e.opacity+.003)):(e.vx+=.002*(Math.random()-.5),e.vy+=.002*(Math.random()-.5),e.coherence=Math.max(0,e.coherence-.005),e.opacity=Math.max(.5*e.baseOpacity,e.opacity-.002)),e.vx*=.995,e.vy*=.995,e.x+=e.vx,e.y+=e.vy,e.x<-10&&(e.x=this.canvas.width+10),e.x>this.canvas.width+10&&(e.x=-10),e.y<-10&&(e.y=this.canvas.height+10),e.y>this.canvas.height+10&&(e.y=-10)})}
drawParticles(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.particles.forEach(e=>{const t=45+15*e.coherence,i=20+30*e.coherence,o=40+25*e.coherence;this.ctx.fillStyle=`hsla(${t}, ${i}%, ${o}%, ${e.opacity})`,this.ctx.beginPath(),this.ctx.arc(e.x,e.y,e.size,0,2*Math.PI),this.ctx.fill()})}
animate(){this.updateParticles(),this.drawParticles(),requestAnimationFrame(()=>this.animate())}}

/**
 * Miscellaneous page functions
 */
function createGeometry(){const e=document.getElementById("geometryBg");if(!e)return;const t=window.innerWidth<768?8:15;for(let i=0;i<t;i++){const o=document.createElement("div");o.className="hyperbolic-circle";const s=200*Math.random()+50;o.style.width=s+"px",o.style.height=s+"px",o.style.left=Math.random()*window.innerWidth+"px",o.style.top=Math.random()*window.innerHeight+"px",o.style.animationDelay=20*Math.random()+"s",e.appendChild(o)}}
let easterEggActivated=!1;function activateEasterEgg(){easterEggActivated||(easterEggActivated=!0,document.querySelector(".easter-egg").classList.add("activated"),document.getElementById("hiddenMessage").classList.add("visible"))}
function closeEasterEgg(){document.getElementById("hiddenMessage").classList.remove("visible"),setTimeout(()=>{easterEggActivated=!1,document.querySelector(".easter-egg").classList.remove("activated")},500)}

/**
 * Initializer that runs when the DOM is fully loaded.
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize ALL animations and interactive elements
    new BinaryBlackHoleFigure8(); // For the new header
    createGeometry();
    
    const canvas = document.getElementById('fsaCanvas');
    if (canvas) {
        window.fsaDetector = new FlowStateDetector();
        window.fsaParticles = new FSAParticleSystem(canvas);
    }
    
    window.addEventListener('resize', () => {
        const geometryBg = document.getElementById('geometryBg');
        if (geometryBg) {
            geometryBg.innerHTML = '';
            createGeometry();
        }
    });
});
