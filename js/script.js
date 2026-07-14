// ============================================
// MD Emran Hossain — Portfolio interactions
// ============================================

// ---- Sticky nav background on scroll ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ---- Mobile menu ----
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});
// Close menu when a link is tapped
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ---- Scroll reveal ----
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ---- Animated stat counters ----
const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.count, 10);
    const duration = 1600;
    const start = performance.now();
    const tick = now => {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    statsObserver.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num').forEach(el => statsObserver.observe(el));

// ---- Portfolio filters ----
const filterBtns = document.querySelectorAll('.filter-btn');
const workCards = document.querySelectorAll('.work-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    workCards.forEach(card => {
      // Cards flagged data-hide-all only appear under their own category filter
      const show = filter === 'all'
        ? !card.dataset.hideAll
        : card.dataset.category === filter;
      card.classList.toggle('hidden', !show);
    });
  });
});

// ---- Video modal (YouTube) ----
const modal = document.getElementById('videoModal');
const modalPlayer = document.getElementById('modalPlayer');

function openVideo(videoId) {
  modalPlayer.innerHTML =
    `<iframe src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0" ` +
    `title="Video player" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" ` +
    `allowfullscreen></iframe>`;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeVideo() {
  modal.classList.remove('open');
  modalPlayer.innerHTML = ''; // stop playback
  document.body.style.overflow = '';
}

// Plays the video directly inside the clicked element (no popup)
function playInline(el, videoId) {
  el.innerHTML =
    `<iframe src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1" ` +
    `title="Video player" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" ` +
    `allowfullscreen style="width:100%;height:100%;border:0;"></iframe>`;
  el.classList.remove('video-trigger');
  el.style.cursor = 'default';
}

document.querySelectorAll('.video-trigger').forEach(el => {
  el.addEventListener('click', () => {
    const id = el.dataset.videoId;
    if (!id || id.startsWith('VIDEO_ID')) {
      alert('Add your YouTube video ID to this item in index.html to enable playback.');
      return;
    }
    if (el.dataset.inline) {
      playInline(el, id);
    } else {
      openVideo(id);
    }
  });
});

modal.querySelector('.modal-backdrop').addEventListener('click', closeVideo);
modal.querySelector('.modal-close').addEventListener('click', closeVideo);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.classList.contains('open')) closeVideo();
});

// ---- Footer year ----
document.getElementById('year').textContent = new Date().getFullYear();
