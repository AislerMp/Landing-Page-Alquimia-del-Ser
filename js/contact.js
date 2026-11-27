(() => {
  const preview = document.querySelector('[data-contact-map-preview]');
  const openButton = document.querySelector('[data-contact-map-open]');
  const closeButton = document.querySelector('[data-contact-map-close]');
  const frame = document.querySelector('#contact-map-frame');

  if (!preview || !openButton || !closeButton || !frame) return;

  openButton.hidden = false;

  openButton.addEventListener('click', () => {
    if (!frame.hasAttribute('src')) frame.src = frame.dataset.src;
    preview.hidden = true;
    frame.hidden = false;
    closeButton.hidden = false;
    closeButton.focus({ preventScroll: true });
  });

  closeButton.addEventListener('click', () => {
    frame.hidden = true;
    closeButton.hidden = true;
    preview.hidden = false;
    openButton.focus({ preventScroll: true });
  });
})();
