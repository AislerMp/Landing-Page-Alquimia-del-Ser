'use strict';

(() => {
  const board = document.querySelector('.schedule-board');
  const controls = board.querySelector('.schedule-controls');
  const filters = [...controls.querySelectorAll('button')];
  const scheduleGrid = board.querySelector('.schedule-grid');
  const panels = [...scheduleGrid.querySelectorAll('[data-schedule-day]')];
  const status = board.querySelector('[data-schedule-status]');
  const narrow = matchMedia('(max-width: 700px)');
  const activities = [
    'Una clase de Transformación Integral para explorar tus intenciones y convertirlas en una práctica semanal.',
    'Sesión de meditación guiada incluida en Transformación Integral.',
    'Encuentro grupal de Transformación Integral para explorar la relación contigo misma.',
    'Clase de baile y movimiento grupal incluida en Transformación Integral.',
    'Clase de baile latino incluida en Transformación Integral.',
  ];

  function selectDay(day, announce = true) {
    const week = day === 'todos';
    scheduleGrid.classList.toggle('is-day', !week);
    for (const filter of filters) {
      filter.setAttribute('aria-pressed', String(filter.dataset.day === day));
    }
    for (const panel of panels) {
      panel.hidden = !week && panel.dataset.scheduleDay !== day;
    }
    if (!announce) return;
    const panel = panels.find((entry) => entry.dataset.scheduleDay === day);
    if (!panel) {
      status.textContent = 'Agenda de la semana completa';
      return;
    }

    const count = panel.querySelectorAll('.schedule-slot').length;
    status.textContent = `${panel.querySelector('h3').textContent}: ${count} ${count === 1 ? 'actividad' : 'actividades'}`;
  }

  function selectDefault() {
    selectDay(narrow.matches ? 'lunes' : 'todos', false);
  }

  controls.hidden = false;
  selectDefault();
  narrow.addEventListener('change', selectDefault);
  controls.addEventListener('click', (event) => {
    const filter = event.target.closest('[data-day]');
    if (filter) selectDay(filter.dataset.day);
  });

  scheduleGrid.addEventListener('click', (event) => {
    const slot = event.target.closest('.schedule-slot');
    if (!slot) return;
    const title = slot.querySelector('strong').textContent;
    const day = slot.closest('.schedule-day').querySelector('h3').textContent;
    const time = slot.querySelector('.schedule-time').textContent.trim();
    const message = encodeURIComponent(`Hola, quisiera información sobre ${title} del ${day.toLowerCase()} (${time}).`);
    document.dispatchEvent(new CustomEvent('alquimia:detail', {
      detail: {
        title,
        kicker: 'Membresía Transformación Integral',
        meta: `${day} · ${time} · Nueva York`,
        description: activities[Number(slot.dataset.activity)],
        actionLabel: 'Consultar por WhatsApp',
        actionHref: `https://wa.me/16468426119?text=${message}`,
      },
    }));
  });
})();
