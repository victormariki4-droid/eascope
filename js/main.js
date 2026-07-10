/* ============================================================
   EASCOPE EXPEDITIONS — Main JavaScript
   ============================================================ */

/* ── Preloader ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const pre = document.getElementById('preloader');
    if (pre) pre.classList.add('gone');
  }, 1600);
});

/* ── Navbar scroll + hamburger ── */
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navOverlay = document.querySelector('.nav-overlay');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
}, { passive: true });

function toggleMenu() {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
  navOverlay.classList.toggle('show');
  document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
}

if (hamburger) hamburger.addEventListener('click', toggleMenu);
if (navOverlay) navOverlay.addEventListener('click', toggleMenu);

/* Mobile dropdown toggle */
document.querySelectorAll('.nav-item').forEach(item => {
  const link = item.querySelector('.nav-link');
  const drop = item.querySelector('.drop-menu');
  if (drop && window.innerWidth <= 1024) {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 1024) {
        e.preventDefault();
        drop.classList.toggle('open');
      }
    });
  }
});

/* ── Active nav link ── */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href && (href === currentPage || (currentPage === '' && href === 'index.html'))) {
    link.classList.add('active');
  }
});

/* ── Hero Slider ── */
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.h-dot');
let current = 0, sliderTimer;

function goToSlide(n) {
  slides[current].classList.remove('active');
  dots[current]?.classList.remove('active');
  current = (n + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current]?.classList.add('active');
}

function startSlider() {
  sliderTimer = setInterval(() => goToSlide(current + 1), 6000);
}

if (slides.length) {
  dots.forEach((dot, i) => dot.addEventListener('click', () => { clearInterval(sliderTimer); goToSlide(i); startSlider(); }));
  startSlider();
}

/* ── Testimonial Slider ── */
const testiTrack = document.querySelector('.testi-track');
const prevBtn = document.querySelector('.s-btn.prev');
const nextBtn = document.querySelector('.s-btn.next');
let testiIndex = 0;

function moveTesti(dir) {
  const total = document.querySelectorAll('.testi-slide').length;
  testiIndex = (testiIndex + dir + total) % total;
  testiTrack.style.transform = `translateX(-${testiIndex * 100}%)`;
}

if (prevBtn) prevBtn.addEventListener('click', () => moveTesti(-1));
if (nextBtn) nextBtn.addEventListener('click', () => moveTesti(1));

/* Auto-advance testimonials */
if (testiTrack) setInterval(() => moveTesti(1), 7000);

/* ── Scroll Reveal ── */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ── Counter Animation ── */
function animateCount(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 2000;
  const step = target / (duration / 16);
  let count = 0;
  const timer = setInterval(() => {
    count = Math.min(count + step, target);
    el.textContent = Math.round(count) + suffix;
    if (count >= target) clearInterval(timer);
  }, 16);
}

const statObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-target]').forEach(animateCount);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.hero-stats').forEach(el => statObserver.observe(el));

/* ── Smooth gallery duplicate for infinite scroll ── */
const galTrack = document.querySelector('.gal-track');
if (galTrack) {
  const clone = galTrack.innerHTML;
  galTrack.innerHTML += clone;
}

/* ── Contact form ── */
const contactForm = document.querySelector('#contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Message Sent ✓';
      btn.style.background = '#2d5a35';
      contactForm.reset();
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.background = '';
        btn.disabled = false;
      }, 3500);
    }, 1500);
  });
}

/* ── Newsletter form ── */
const nwsForms = document.querySelectorAll('.nws-form');
nwsForms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.nws-btn');
    btn.textContent = 'Subscribed ✓';
    form.querySelector('.nws-input').value = '';
    setTimeout(() => btn.textContent = 'Subscribe', 3000);
  });
});

/* ── Back to top on logo click ── */
document.querySelectorAll('.logo').forEach(logo => {
  logo.style.cursor = 'pointer';
});
