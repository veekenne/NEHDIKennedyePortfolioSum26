// Scroll-reveal
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
toggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
// Close nav when a link is clicked
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    toggle.setAttribute('aria-expanded', false);
  });
});

// ✨ Floating background sparkles ✨
const sparkleLayer = document.createElement('div');
sparkleLayer.className = 'sparkle-layer';
document.body.appendChild(sparkleLayer);

const SPARKLES = ['✨', '💖', '⭐', '🌸', '💫', '🩷'];
function spawnSparkle() {
  const s = document.createElement('span');
  s.className = 'sparkle';
  s.textContent = SPARKLES[Math.floor(Math.random() * SPARKLES.length)];
  s.style.left = Math.random() * 100 + 'vw';
  s.style.fontSize = (Math.random() * 14 + 10) + 'px';
  const dur = Math.random() * 6 + 6;
  s.style.animationDuration = dur + 's';
  s.style.opacity = (Math.random() * 0.5 + 0.4).toFixed(2);
  sparkleLayer.appendChild(s);
  setTimeout(() => s.remove(), dur * 1000);
}
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion) {
  setInterval(spawnSparkle, 450);

  // Sparkle trail that follows the cursor 💫
  let lastTrail = 0;
  document.addEventListener('pointermove', (e) => {
    const now = Date.now();
    if (now - lastTrail < 60) return;
    lastTrail = now;
    const t = document.createElement('span');
    t.className = 'sparkle-trail';
    t.textContent = '✨';
    t.style.left = e.clientX + 'px';
    t.style.top = e.clientY + 'px';
    t.style.fontSize = (Math.random() * 8 + 8) + 'px';
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 800);
  });
}

// Highlight active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a[href^="#"]');
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navAs.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  },
  { rootMargin: '-40% 0px -50% 0px' }
);
sections.forEach(s => sectionObserver.observe(s));
