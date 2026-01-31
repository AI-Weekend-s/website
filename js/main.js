/* AI WEEKENDS - Main JavaScript */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initScrollAnimations();
  initSmoothScroll();
});

// Header scroll effect
function initHeader() {
  const header = document.querySelector('.header');
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        header.classList.toggle('scrolled', window.scrollY > 50);
        ticking = false;
      });
      ticking = true;
    }
  });
}

// Mobile menu
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const overlay = document.querySelector('.mobile-nav-overlay');
  const links = document.querySelectorAll('.mobile-nav-link');
  
  const closeMenu = () => {
    toggle?.classList.remove('active');
    mobileNav?.classList.remove('active');
    overlay?.classList.remove('active');
    document.body.style.overflow = '';
  };
  
  toggle?.addEventListener('click', () => {
    const isActive = mobileNav?.classList.toggle('active');
    toggle.classList.toggle('active');
    overlay?.classList.toggle('active');
    document.body.style.overflow = isActive ? 'hidden' : '';
  });
  
  overlay?.addEventListener('click', closeMenu);
  links.forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e) => e.key === 'Escape' && closeMenu());
}

// Scroll animations
function initScrollAnimations() {
  const options = { root: null, rootMargin: '0px 0px -100px 0px', threshold: 0.1 };
  
  const animate = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  };
  
  const observer = new IntersectionObserver(animate, options);
  
  document.querySelectorAll('.timeline-item, .highlight-card, .about-feature').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
    observer.observe(el);
  });
}

// Smooth scroll
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        window.scrollTo({
          top: target.offsetTop - headerHeight,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Ripple effect for buttons
document.querySelectorAll('.hero-cta, .community-cta').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.cssText = `
      position: absolute; left: ${e.clientX - rect.left}px; top: ${e.clientY - rect.top}px;
      width: 20px; height: 20px; margin: -10px;
      background: rgba(255,255,255,0.4); border-radius: 50%;
      transform: scale(0); animation: ripple 0.6s ease-out; pointer-events: none;
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple keyframes
const style = document.createElement('style');
style.textContent = '@keyframes ripple { to { transform: scale(20); opacity: 0; } }';
document.head.appendChild(style);

console.log('🚀 AI Weekends initialized!');
