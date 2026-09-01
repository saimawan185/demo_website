(function () {
  'use strict';
  var burger = document.querySelector('.burger');
  var menu = document.querySelector('.nav');
  var row = document.querySelector('.site-head-row');
  var form = document.getElementById('booking-form');
  var wa = 'https://wa.me/923003643768';
  var mq = window.matchMedia('(max-width: 960px)');

  function placeNav() {
    if (!menu) return;
    if (mq.matches) {
      if (menu.parentElement !== document.body) {
        document.body.appendChild(menu);
      }
    } else if (row && menu.parentElement !== row) {
      closeMenu();
      row.appendChild(menu);
    }
  }

  function closeMenu() {
    if (!burger || !menu) return;
    burger.classList.remove('on');
    menu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('lock');
  }

  if (burger && menu) {
    placeNav();
    if (mq.addEventListener) {
      mq.addEventListener('change', placeNav);
    } else if (mq.addListener) {
      mq.addListener(placeNav);
    }

    burger.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      placeNav();
      var open = !menu.classList.contains('open');
      burger.classList.toggle('on', open);
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
  document.querySelectorAll('.hours tr[data-day]').forEach(function (rowEl) {
    if (rowEl.getAttribute('data-day') === today) rowEl.classList.add('today');
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
        'Assalam o Alaikum Ivory Dental Clinic,',
        'I would like to book an appointment with Dr Nomair.',
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
