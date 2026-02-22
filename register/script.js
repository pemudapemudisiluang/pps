// ============================================================
// BACA NAMA TAMU DARI URL
// ============================================================
function getGuestName() {
  const pathMatch = window.location.pathname.match(/\(([^)]+)\)/);
  if (pathMatch) {
    return decodeURIComponent(pathMatch[1].replace(/-/g, ' '));
  }
  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get('tamu') || params.get('name') || params.get('nama');
  if (fromQuery) {
    return decodeURIComponent(fromQuery);
  }
  return 'Sauda/i';
}

const guestName = getGuestName();
document.getElementById('popup-guest-name').textContent = guestName;

// ============================================================
// LOADING SCREEN — bintang dekoratif
// ============================================================
(function createLoadingStars() {
  const container = document.getElementById('loading-stars');
  if (!container) return;
  for (let i = 0; i < 80; i++) {
    const s = document.createElement('div');
    const size = Math.random() * 2.5 + 0.5;
    s.style.cssText = `
      position:absolute;
      width:${size}px; height:${size}px;
      border-radius:50%;
      background:rgba(200,168,75,${Math.random() * 0.6 + 0.2});
      left:${Math.random() * 100}%;
      top:${Math.random() * 100}%;
      animation: twinkle ${2 + Math.random() * 3}s ease-in-out infinite;
      animation-delay: ${Math.random() * 4}s;
    `;
    container.appendChild(s);
  }
})();

// ============================================================
// LOADING SCREEN
// ============================================================
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loading').classList.add('hidden');
    setTimeout(() => {
      document.getElementById('popup-overlay').classList.add('show');
    }, 400);
  }, 2200);
});

// ============================================================
// WELCOME POPUP
// ============================================================
function closePopup() {
  document.getElementById('popup-overlay').classList.remove('show');
  const name = document.getElementById('popup-guest-name').textContent;
  const isDefault = name === 'Sauda/i';
  showToast(
    isDefault
      ? 'Selamat datang! Marhaban ya Ramadhan'
      : `Selamat datang, ${name}! Marhaban ya Ramadhan`,
    'moon'
  );
  // Auto-play music after popup closed
  startMusic();
}

document.getElementById('popup-overlay').addEventListener('click', function(e) {
  if (e.target === this) closePopup();
});

// ============================================================
// MUSIC PLAYER
// ============================================================
let musicPlaying = false;
const bgMusic = document.getElementById('bg-music');
const musicPlayer = document.getElementById('music-player');
const iconPlay = document.getElementById('icon-play');
const iconPause = document.getElementById('icon-pause');
const musicBars = document.getElementById('music-bars');

function startMusic() {
  bgMusic.volume = 0.45;
  bgMusic.play().then(() => {
    musicPlaying = true;
    musicPlayer.classList.remove('hidden');
    updateMusicUI();
  }).catch(() => {
    // Autoplay blocked — show player anyway for manual start
    musicPlayer.classList.remove('hidden');
  });
}

function toggleMusic() {
  if (musicPlaying) {
    bgMusic.pause();
    musicPlaying = false;
  } else {
    bgMusic.play();
    musicPlaying = true;
  }
  updateMusicUI();
}

function updateMusicUI() {
  if (musicPlaying) {
    iconPlay.style.display = 'none';
    iconPause.style.display = 'block';
    musicBars.classList.add('active');
  } else {
    iconPlay.style.display = 'block';
    iconPause.style.display = 'none';
    musicBars.classList.remove('active');
  }
}

bgMusic.addEventListener('pause', () => {
  musicPlaying = false;
  updateMusicUI();
});
bgMusic.addEventListener('play', () => {
  musicPlaying = true;
  updateMusicUI();
});

// ============================================================
// TOAST NOTIFICATION
// ============================================================
const toastIcons = {
  moon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>`,
  pin:  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>`,
  check:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`,
  share:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>`,
  trophy:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0 0 11 15.9V18H9v2h6v-2h-2v-2.1a5.01 5.01 0 0 0 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2z"/></svg>`,
};

function showToast(message, iconKey = 'check') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  const icon = toastIcons[iconKey] || toastIcons.check;
  toast.innerHTML = `${icon}<span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3600);
}

// ============================================================
// HAMBURGER / MOBILE MENU
// ============================================================
function toggleMenu() {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  btn.classList.toggle('active');
  menu.classList.toggle('open');
}

// ============================================================
// COUNTDOWN TIMER
// ============================================================
function updateCountdown() {
  const target = new Date('2026-03-14T08:00:00').getTime();
  const now = new Date().getTime();
  const diff = target - now;

  if (diff <= 0) {
    ['cd-hari','cd-jam','cd-menit','cd-detik'].forEach(id => {
      document.getElementById(id).textContent = '00';
    });
    return;
  }
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('cd-hari').textContent   = String(d).padStart(2, '0');
  document.getElementById('cd-jam').textContent    = String(h).padStart(2, '0');
  document.getElementById('cd-menit').textContent  = String(m).padStart(2, '0');
  document.getElementById('cd-detik').textContent  = String(s).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ============================================================
// SCROLL REVEAL
// ============================================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ============================================================
// TAB SWITCH (FORM LOMBA)
// ============================================================
function switchTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.form-panel').forEach(p => p.classList.remove('active'));
  document.getElementById('tab-' + tab).classList.add('active');
  document.getElementById('panel-' + tab).classList.add('active');
  showToast(`Tab ${tab === 'kaligrafi' ? 'Kaligrafi' : 'Cerdas Cermat'} dipilih`, 'trophy');
}

function showForm(tab) {
  document.getElementById('pendaftaran').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => switchTab(tab), 600);
}

// ============================================================
// FAQ TOGGLE
// ============================================================
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ============================================================
// SHARE WHATSAPP
// ============================================================
function shareWhatsApp(e) {
  e.preventDefault();
  const msg = encodeURIComponent(
    `🌙 *Peringatan Nuzulul Qur'an 1447 H*\n` +
    `📅 Sabtu, 14 Maret 2026\n` +
    `📍 Mushola Sholihin Siluang\n\n` +
    `🏆 Kegiatan Lomba:\n` +
    `🎨 Kaligrafi (Tingkat Umum)\n` +
    `🧠 Cerdas Cermat (SMA ke Bawah)\n\n` +
    `✨ GRATIS & Hadiah Menarik!\n` +
    `Yuk ikut & ajak teman-teman! 🤝\n\n` +
    `📝 Info & Daftar: ${window.location.href}`
  );
  window.open(`https://wa.me/?text=${msg}`, '_blank');
  showToast('Membuka WhatsApp untuk berbagi...', 'share');
}

// ============================================================
// RIPPLE EFFECT
// ============================================================
document.querySelectorAll('.ripple-container').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    ripple.className = 'ripple-effect';
    ripple.style.cssText = `
      width: ${size}px; height: ${size}px;
      left: ${e.clientX - rect.left - size/2}px;
      top:  ${e.clientY - rect.top  - size/2}px;
    `;
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
});

// ============================================================
// BINTANG HERO (dekoratif)
// ============================================================
const starsContainer = document.getElementById('hero-stars');
for (let i = 0; i < 60; i++) {
  const star = document.createElement('div');
  star.className = 'star';
  star.style.cssText = `
    left: ${Math.random() * 100}%;
    top:  ${Math.random() * 100}%;
    animation-delay: ${Math.random() * 4}s;
    animation-duration: ${2 + Math.random() * 3}s;
    opacity: ${Math.random() * 0.6 + 0.2};
  `;
  starsContainer.appendChild(star);
}

// ============================================================
// NAVBAR — STICKY HIDE ON SCROLL DOWN, SHOW ON SCROLL UP
// ============================================================
(function initNav() {
  const nav = document.getElementById('main-nav');
  const progressBar = nav.querySelector('.nav-progress-bar');
  let lastScrollY = 0;
  let ticking = false;

  function updateNav() {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Scrolled state (background)
    if (scrollY > 40) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }

    // Hide on scroll down, show on scroll up
    if (scrollY > lastScrollY && scrollY > 80) {
      nav.classList.add('nav-hidden');
    } else {
      nav.classList.remove('nav-hidden');
    }

    // Progress bar
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';

    lastScrollY = scrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNav);
      ticking = true;
    }
  }, { passive: true });
})();
