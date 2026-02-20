/* =============================================
   ArtiNiki ✨ Dual-Brand Portfolio
   script.js
   ============================================= */

// ── Loader ─────────────────────────────────────
const loader    = document.getElementById('loader');
const loaderBar = document.getElementById('loaderBar');
let progress = 0;

const loadInterval = setInterval(() => {
  progress += Math.random() * 14 + 4;
  if (progress >= 100) {
    progress = 100;
    clearInterval(loadInterval);
    setTimeout(() => loader.classList.add('hidden'), 450);
  }
  loaderBar.style.width = progress + '%';
}, 90);

// ── Custom Star Cursor ──────────────────────────
const cursorStar = document.createElement('div');
cursorStar.className = 'cursor-star';
cursorStar.textContent = '✦';
document.body.appendChild(cursorStar);

document.addEventListener('mousemove', (e) => {
  cursorStar.style.left = e.clientX + 'px';
  cursorStar.style.top  = e.clientY + 'px';
});

// ── Sparkle Canvas Trail ────────────────────────
const canvas = document.getElementById('sparkleCanvas');
const ctx    = canvas.getContext('2d');
let sparkles = [];

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const sparkleSymbols = ['✦', '★', '✸', '✺', '⭐', '♥', '✿', '❀', '◆'];
const sparkleColors  = ['#FF1493', '#FF69B4', '#FFD700', '#DA70D6', '#FFFFFF', '#FFB6C1', '#C0C0C0'];

document.addEventListener('mousemove', (e) => {
  if (Math.random() > 0.45) return;
  sparkles.push({
    x:        e.clientX,
    y:        e.clientY,
    symbol:   sparkleSymbols[Math.floor(Math.random() * sparkleSymbols.length)],
    color:    sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
    size:     Math.random() * 15 + 9,
    alpha:    1,
    vx:       (Math.random() - 0.5) * 2.8,
    vy:       (Math.random() - 1.8) * 2.5,
    decay:    Math.random() * 0.022 + 0.018,
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.18,
  });
});

function animateSparkles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  sparkles = sparkles.filter(s => s.alpha > 0);
  for (const s of sparkles) {
    ctx.save();
    ctx.globalAlpha = s.alpha;
    ctx.font        = `${s.size}px serif`;
    ctx.fillStyle   = s.color;
    ctx.translate(s.x, s.y);
    ctx.rotate(s.rotation);
    ctx.fillText(s.symbol, -s.size / 2, s.size / 2);
    ctx.restore();
    s.x        += s.vx;
    s.y        += s.vy;
    s.alpha    -= s.decay;
    s.rotation += s.rotSpeed;
    s.vy       -= 0.04;
  }
  requestAnimationFrame(animateSparkles);
}
animateSparkles();

// ── Card Sparkle Burst on Click ─────────────────
document.querySelectorAll('.art-card').forEach(card => {
  card.addEventListener('click', () => {
    const rect = card.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    for (let i = 0; i < 14; i++) {
      const angle = (i / 14) * Math.PI * 2;
      const speed = Math.random() * 5 + 2.5;
      sparkles.push({
        x:        cx, y: cy,
        symbol:   sparkleSymbols[Math.floor(Math.random() * sparkleSymbols.length)],
        color:    sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
        size:     Math.random() * 22 + 12,
        alpha:    1,
        vx:       Math.cos(angle) * speed,
        vy:       Math.sin(angle) * speed,
        decay:    0.022,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.28,
      });
    }
  });
});

// ── ArtiNiki Gallery Filter ─────────────────────
const filterBtnsArt = document.querySelectorAll('.filter-btn-art');
const artCards      = document.querySelectorAll('#artiniki .art-card');

filterBtnsArt.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtnsArt.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filterArt;
    artCards.forEach(card => {
      card.style.display = (cat === 'all' || card.dataset.catArt === cat) ? '' : 'none';
    });
  });
});

// ── Retouching Gallery Filter ───────────────────
const filterBtnsRt = document.querySelectorAll('.filter-btn-rt');
const retouchCards = document.querySelectorAll('.retouch-card');

filterBtnsRt.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtnsRt.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filterRt;
    retouchCards.forEach(card => {
      card.style.display = (cat === 'all' || card.dataset.catRt === cat) ? '' : 'none';
    });
  });
});

// ── Visitor Counter ─────────────────────────────
const counterEl = document.getElementById('visitorCount');
if (counterEl) {
  let count = parseInt(localStorage.getItem('artinikiVisits') || '842');
  count++;
  localStorage.setItem('artinikiVisits', count);
  counterEl.textContent = String(count).padStart(6, '0');
}

// ── Nav Active Brand Highlight on Scroll ────────
const artSection     = document.getElementById('artiniki');
const retouchSection = document.getElementById('retouching');
const brandArt       = document.querySelector('.brand-art');
const brandRt        = document.querySelector('.brand-retouch');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + window.innerHeight / 2;

  if (artSection && retouchSection) {
    const artTop    = artSection.offsetTop;
    const artBottom = artTop + artSection.offsetHeight;
    const rtTop     = retouchSection.offsetTop;
    const rtBottom  = rtTop + retouchSection.offsetHeight;

    if (scrollY >= artTop && scrollY < artBottom) {
      brandArt.style.opacity = '1';
      brandRt.style.opacity  = '0.4';
    } else if (scrollY >= rtTop && scrollY < rtBottom) {
      brandArt.style.opacity = '0.4';
      brandRt.style.opacity  = '1';
    } else {
      brandArt.style.opacity = '1';
      brandRt.style.opacity  = '1';
    }
  }
});

// ── Scroll Reveal ───────────────────────────────
const revealEls = document.querySelectorAll(
  '.art-card, .retouch-card, .service-card, .about-card, .contact-box, .skill-tag'
);
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.08 });

revealEls.forEach((el, i) => {
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(26px)';
  el.style.transition = `opacity 0.5s ease ${i * 0.04}s, transform 0.5s ease ${i * 0.04}s`;
  observer.observe(el);
});

// ── Back to Top ─────────────────────────────────
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Smooth Nav Links ────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href   = link.getAttribute('href');
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ── Contact Form ────────────────────────────────
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', () => {
    const btn = form.querySelector('.btn-send');
    btn.textContent = 'Sent! ✦';
    btn.style.background = 'linear-gradient(135deg, #4CAF50, #2E7D32)';
    btn.style.boxShadow  = '4px 4px 0 #1B5E20';
    setTimeout(() => {
      btn.textContent = 'Send ♥';
      btn.style.background = '';
      btn.style.boxShadow  = '';
    }, 3000);
  });
}
