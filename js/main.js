(function () {
  'use strict';
  var burger = document.querySelector('.burger');
  var menu = document.querySelector('.nav');
  var form = document.getElementById('booking-form');
  var wa = 'https://wa.me/923010888957';

  function closeMenu() {
    if (!burger || !menu) return;
    burger.classList.remove('on');
    menu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('lock');
  }

  if (burger && menu) {
    burger.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = burger.classList.toggle('on');
      menu.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('lock', open);
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var today = days[new Date().getDay()];
  document.querySelectorAll('.hours tr[data-day]').forEach(function (row) {
    if (row.getAttribute('data-day') === today) row.classList.add('today');
  });

  var nodes = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    nodes.forEach(function (el) { io.observe(el); });
  } else {
    nodes.forEach(function (el) { el.classList.add('show'); });
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var msg = [
        'Assalam o Alaikum The Dental Specialists,',
        'I would like to book an appointment.',
        '',
        'Name: ' + String(data.get('name') || '').trim(),
        'Phone: ' + String(data.get('phone') || '').trim(),
        'Service: ' + String(data.get('service') || '').trim(),
        data.get('date') ? 'Preferred date: ' + data.get('date') : '',
        data.get('message') ? 'Notes: ' + data.get('message') : ''
      ].filter(Boolean).join('\n');
      window.location.href = wa + '?text=' + encodeURIComponent(msg);
      var ok = document.getElementById('form-ok');
      if (ok) ok.classList.add('show');
      form.reset();
    });
  }

  var y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());
})();
