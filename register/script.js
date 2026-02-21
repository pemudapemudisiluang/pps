 // ============================================================
    // LOADING SCREEN
    // ============================================================
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
        // Tampilkan popup setelah loading selesai
        setTimeout(() => {
          document.getElementById('popup-overlay').classList.add('show');
        }, 400);
      }, 1900);
    });

    // ============================================================
    // WELCOME POPUP
    // ============================================================
    function closePopup() {
      document.getElementById('popup-overlay').classList.remove('show');
      showToast('Selamat datang! Marhaban ya Ramadhan 🌙', '🌙');
    }

    // Klik di luar popup untuk tutup
    document.getElementById('popup-overlay').addEventListener('click', function(e) {
      if (e.target === this) closePopup();
    });

    // ============================================================
    // TOAST NOTIFICATION
    // ============================================================
    function showToast(message, icon = '✅') {
      const container = document.getElementById('toast-container');
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
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
        document.getElementById('cd-hari').textContent   = '00';
        document.getElementById('cd-jam').textContent    = '00';
        document.getElementById('cd-menit').textContent  = '00';
        document.getElementById('cd-detik').textContent  = '00';
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
      // Reset semua tab & panel
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.form-panel').forEach(p => p.classList.remove('active'));
      // Aktifkan yang dipilih
      document.getElementById('tab-' + tab).classList.add('active');
      document.getElementById('panel-' + tab).classList.add('active');
      showToast(`Tab ${tab === 'kaligrafi' ? 'Kaligrafi 🎨' : 'Cerdas Cermat 🧠'} dipilih`);
    }

    // Shortcut dari tombol lomba ke form
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
      // Tutup semua FAQ
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      // Buka yang diklik (jika sebelumnya tertutup)
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
      showToast('Membuka WhatsApp untuk berbagi...', '📱');
    }

    // ============================================================
    // RIPPLE EFFECT PADA TOMBOL
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
    // NAVBAR SCROLL SHADOW
    // ============================================================
    window.addEventListener('scroll', () => {
      const nav = document.querySelector('nav');
      if (window.scrollY > 60) {
        nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)';
      } else {
        nav.style.boxShadow = 'none';
      }
    });