'use strict';

(() => {
  const grid = document.querySelector('[data-experiences]');
  const template = document.querySelector('#experience-card-template');
  const cards = window.ALQUIMIA_EXPERIENCES.map((experience, index) => {
    const card = template.content.firstElementChild.cloneNode(true);
    const number = String(index + 1).padStart(2, '0');
    const image = card.querySelector('img');
    const button = card.querySelector('button');

    card.dataset.experience = experience.id;
    image.src = experience.image;
    image.alt = experience.imageAlt;
    card.querySelector('.experience-card-number').textContent = number;
    card.querySelector('.experience-card-kicker').textContent = experience.kicker;
    card.querySelector('h3').textContent = experience.title;
    card.querySelector('.experience-card-summary').textContent = experience.summary;
    button.setAttribute('aria-label', `Ver detalles de ${experience.title}`);

    button.addEventListener('click', () => {
      const message = encodeURIComponent(`Hola, quisiera información sobre ${experience.title.toLowerCase()} en Alquimia del Ser.`);
      document.dispatchEvent(new CustomEvent('alquimia:detail', {
        detail: {
          type: 'experience',
          title: experience.title,
          kicker: `${number} · ${experience.kicker}`,
          description: experience.details,
          items: experience.items,
          note: experience.note,
          image: experience.image,
          imageAlt: experience.imageAlt,
          actionLabel: 'Consultar por WhatsApp',
          actionHref: `https://wa.me/16468426119?text=${message}`,
        },
      }));
    });

    return card;
  });

  grid.append(...cards);
})();
