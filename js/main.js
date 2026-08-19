(function () {
  'use strict';
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const form = document.getElementById('booking-form');
  const wa = 'https://wa.me/923374800486';

  const onScroll = () => { if (header) header.classList.toggle('is-scrolled', window.scrollY > 40); };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const open = toggle.classList.toggle('is-open');
      navLinks.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        toggle.classList.remove('is-open');
        navLinks.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-in'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach((el) => io.observe(el));
  } else reveals.forEach((el) => el.classList.add('is-in'));

  const dayMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = dayMap[new Date().getDay()];
  document.querySelectorAll('.hours-table tr[data-day]').forEach((row) => {
    if (row.getAttribute('data-day') === today) row.classList.add('today');
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const lines = [
        'Assalam o Alaikum Bright Smile Dental Aesthetics,',
        'I would like to book an appointment.',
        '',
        `Name: ${String(data.get('name') || '').trim()}`,
        `Phone: ${String(data.get('phone') || '').trim()}`,
        `Service: ${String(data.get('service') || '').trim()}`,
        data.get('date') ? `Preferred date: ${data.get('date')}` : '',
        data.get('message') ? `Notes: ${data.get('message')}` : '',
      ].filter(Boolean).join('\n');
      window.location.href = wa + '?text=' + encodeURIComponent(lines);
      const success = document.getElementById('form-success');
      if (success) success.classList.add('is-visible');
      form.reset();
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
