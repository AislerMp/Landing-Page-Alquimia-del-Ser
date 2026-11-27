'use strict';

const siteHeader = document.querySelector('.site-header');
const siteNav = document.querySelector('.site-nav');
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = window.matchMedia('(max-width: 979px)');
const sectionContexts = {
  inicio: ['inicio', 'Alquimia del Ser'],
  experiencias: ['experiencias', 'las experiencias del centro'],
  membresia: ['membresia', 'la membresía Transformación Integral'],
  calendario: ['calendario', 'el horario de las clases'],
  rose: ['rose', 'Rose Amador y sus actividades'],
  academia: ['experiencias', 'los libros y la academia'],
  preguntas: ['contacto', 'una consulta antes de visitar el centro'],
  contacto: ['contacto', 'visitar el centro en Woodside'],
};
const trackedSections = [...document.querySelectorAll('main > section[id]')]
  .filter((section) => Object.hasOwn(sectionContexts, section.id));
const navLinks = siteNav.querySelectorAll('[data-nav-section]');
const floatingWhatsApp = document.querySelector('.whatsapp-float');
let activeSectionId;
let navFrame = 0;

function setMenu(open, restoreFocus = false) {
  siteNav.classList.toggle('is-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  if (restoreFocus) menuToggle.focus();
}

menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') === 'false'));
siteNav.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (!link || !mobileNav.matches) return;

  const target = document.getElementById(link.hash.slice(1));
  setMenu(false, !target);
  if (target && link.hash) {
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  }
});
mobileNav.addEventListener('change', () => setMenu(false));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') setMenu(false, true);
});
document.addEventListener('pointerdown', (event) => {
  if (!siteHeader.contains(event.target) && menuToggle.getAttribute('aria-expanded') === 'true') setMenu(false);
});

function updateHeader() {
  navFrame = 0;
  siteHeader.classList.toggle('is-scrolled', window.scrollY > 20);
  const marker = siteHeader.getBoundingClientRect().bottom + Math.min(window.innerHeight * .22, 160);
  let current = trackedSections[0];
  for (const section of trackedSections) {
    if (section.getBoundingClientRect().top > marker) break;
    current = section;
  }

  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 3) {
    current = trackedSections.at(-1);
  }
  if (current.id === activeSectionId) return;
  activeSectionId = current.id;
  const [navSection, topic] = sectionContexts[activeSectionId];

  for (const link of navLinks) {
    if (link.dataset.navSection === navSection) {
      link.setAttribute('aria-current', 'location');
    } else {
      link.removeAttribute('aria-current');
    }
  }

  const message = encodeURIComponent(`Hola, quisiera información sobre ${topic}.`);
  floatingWhatsApp.setAttribute('aria-label', `Escribir por WhatsApp sobre ${topic}`);
  floatingWhatsApp.href = `https://wa.me/16468426119?text=${message}`;
}

function queueHeaderUpdate() {
  if (!navFrame) navFrame = window.requestAnimationFrame(updateHeader);
}

window.addEventListener('scroll', queueHeaderUpdate, { passive: true });
window.addEventListener('resize', queueHeaderUpdate);
window.addEventListener('hashchange', queueHeaderUpdate);
window.addEventListener('load', queueHeaderUpdate);
updateHeader();

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.replace('will-reveal', 'is-revealed');
      observer.unobserve(entry.target);
    }
  }, { threshold: .08 });

  for (const element of document.querySelectorAll('[data-reveal]')) {
    element.classList.add('will-reveal');
    observer.observe(element);
  }
}

const detailDialog = document.querySelector('#detail-dialog');
const detailMedia = detailDialog.querySelector('.detail-media');
const detailImage = detailDialog.querySelector('.detail-image');
const detailKicker = detailDialog.querySelector('.detail-kicker');
const detailTitle = detailDialog.querySelector('#detail-title');
const detailMeta = detailDialog.querySelector('.detail-meta');
const detailDescription = detailDialog.querySelector('.detail-description');
const detailItems = detailDialog.querySelector('.detail-items');
const detailNote = detailDialog.querySelector('.detail-note');
const detailAction = detailDialog.querySelector('.detail-action');
const detailActionIcon = detailDialog.querySelector('.detail-action-icon');
const detailActionLabel = detailAction.querySelector('span');
const detailContinue = detailDialog.querySelector('.detail-continue');

document.addEventListener('alquimia:detail', (event) => {
  const details = event.detail;
  const isExperience = details.type === 'experience';
  detailDialog.classList.toggle('is-experience', isExperience);
  detailContinue.hidden = !isExperience;
  detailTitle.textContent = details.title;
  detailKicker.textContent = details.kicker || '';
  detailKicker.hidden = !details.kicker;
  detailMeta.textContent = details.meta || '';
  detailMeta.hidden = !details.meta;
  detailDescription.textContent = details.description || '';
  detailDescription.hidden = !details.description;
  const items = details.items || [];
  detailItems.replaceChildren(...items.map((text) => {
    const item = document.createElement('li');
    item.textContent = text;
    return item;
  }));
  detailItems.hidden = items.length === 0;
  detailNote.textContent = details.note || '';
  detailNote.hidden = !details.note;
  detailMedia.hidden = !details.image;
  if (details.image) {
    detailImage.src = details.image;
    detailImage.alt = details.imageAlt || '';
  } else {
    detailImage.removeAttribute('src');
  }
  detailAction.hidden = !details.actionHref;
  detailActionIcon.toggleAttribute('hidden', !details.actionHref?.startsWith('https://wa.me/'));
  if (details.actionHref) {
    detailAction.href = details.actionHref;
    detailActionLabel.textContent = details.actionLabel || 'Consultar';
    detailAction.setAttribute('aria-label', `${detailActionLabel.textContent} sobre ${details.title}`);
    if (details.actionHref.startsWith('https://')) {
      detailAction.target = '_blank';
      detailAction.rel = 'noopener noreferrer';
    } else {
      detailAction.removeAttribute('target');
      detailAction.removeAttribute('rel');
    }
  }
  if (!detailDialog.open) detailDialog.showModal();
  detailDialog.scrollTop = 0;
});

detailDialog.addEventListener('click', (event) => {
  if (event.target === detailDialog) detailDialog.close();
});
detailAction.addEventListener('click', () => {
  if (detailAction.getAttribute('href').startsWith('#')) detailDialog.close();
});
