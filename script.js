// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  hamburger.classList.toggle('active', menuOpen);
  navMenu.classList.toggle('open', menuOpen);
  document.body.style.overflow = menuOpen ? 'hidden' : '';
});

// Close menu on nav link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
  if (menuOpen && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
    menuOpen = false;
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== BACK TO TOP =====
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.fontWeight = link.getAttribute('href') === `#${id}` ? '700' : '500';
      });
    }
  });
}, {
  threshold: 0.3,
  rootMargin: '-80px 0px 0px 0px'
});

sections.forEach(section => sectionObserver.observe(section));

// ===== GALERI LAZY LOAD =====
const galeriItems = document.querySelectorAll('.galeri-item');

const lazyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'scale(1)';
      lazyObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.05 });

galeriItems.forEach((item, i) => {
  item.style.opacity = '0';
  item.style.transform = 'scale(0.95)';
  item.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
  lazyObserver.observe(item);
});

// ===== FORM SUBMIT =====
const kontakForm = document.getElementById('kontakForm');
if (kontakForm) {
  kontakForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = kontakForm.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Pesan Terkirim!';
    btn.style.background = '#4CAF50';
    btn.style.color = 'white';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
      btn.style.color = '';
      btn.disabled = false;
      kontakForm.reset();
    }, 3000);
  });
}

// ===== HERO PARALLAX (subtle) =====
const hero = document.querySelector('.hero');
const heroOrbs = document.querySelectorAll('.hero-orb');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  if (scrolled < window.innerHeight) {
    heroOrbs.forEach((orb, i) => {
      const speed = (i + 1) * 0.12;
      orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
  }
}, { passive: true });

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const isPlus = target.toString().includes('+');
  const num = parseInt(target);
  const step = num / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= num) {
      el.textContent = num + (isPlus ? '+' : '');
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start) + (isPlus ? '+' : '');
    }
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNums = entry.target.querySelectorAll('.stat-num');
      const targets = ['150+', '50+', '10+'];
      statNums.forEach((el, i) => animateCounter(el, targets[i]));
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ===== CARD HOVER TILT =====
document.querySelectorAll('.keg-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;
    card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'all 0.4s cubic-bezier(0.4,0,0.2,1)';
  });
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'box-shadow 0.3s ease, border-color 0.3s ease, transform 0.1s ease';
  });
});

// ===== PAGE LOAD ANIMATION =====
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 50);
});