(() => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
  const media = [...document.querySelectorAll('video, audio')];
  media.forEach(player => player.addEventListener('play', () => {
    media.forEach(other => { if (other !== player) other.pause(); });
  }));
  const header = document.querySelector('.site-header');
  function measureHeader() {
    if (header) document.documentElement.style.setProperty('--header-height', `${Math.ceil(header.getBoundingClientRect().height)}px`);
  }
  measureHeader();
  if ('ResizeObserver' in window && header) new ResizeObserver(measureHeader).observe(header);
  else window.addEventListener('resize', measureHeader, {passive: true});
  const marquee = document.querySelector('.skills-marquee');
  const toggle = document.querySelector('.skills-toggle');
  if (marquee && toggle) {
    marquee.classList.add('is-ready');
    toggle.hidden = false;
    toggle.addEventListener('click', () => {
      const paused = marquee.classList.toggle('is-paused');
      toggle.textContent = paused ? 'Reanudar' : 'Pausar';
    });
  }
  const navItems = [...document.querySelectorAll('nav a[href^="#"]')].map(link => ({link, section: document.getElementById(link.hash.slice(1))})).filter(item => item.section);
  let ticking = false;
  function updateNav() {
    ticking = false;
    const line = header.getBoundingClientRect().bottom + 70;
    let active = null;
    navItems.forEach(item => { const r = item.section.getBoundingClientRect(); if (r.top <= line && r.bottom > line) active = item; });
    navItems.forEach(item => { if (item === active) item.link.setAttribute('aria-current', 'location'); else item.link.removeAttribute('aria-current'); });
  }
  function schedule() { if (!ticking) { ticking = true; requestAnimationFrame(updateNav); } }
  window.addEventListener('scroll', schedule, {passive: true});
  window.addEventListener('resize', schedule, {passive: true});
  updateNav();
})();
