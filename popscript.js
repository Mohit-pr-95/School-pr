(() => {
  if (window.self !== window.top) {
    const notifyParentToClose = () => {
      window.parent.postMessage({ type: 'admission-popup-close' }, '*');
    };

    document.getElementById('popupClose')?.addEventListener('click', notifyParentToClose);
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') notifyParentToClose();
    });
    return;
  }

  const schoolLifeSection = document.getElementById('school-life');
  const popup = document.getElementById('admissionPopup');
  const popupFrame = document.getElementById('admissionPopupFrame');

  if (!schoolLifeSection || !popup || !popupFrame) return;

  let hasShown = false;
  let opener = null;

  function closePopup() {
    popup.hidden = true;
    popup.setAttribute('aria-hidden', 'true');
    if (opener) opener.focus();
  }

  function openPopup() {
    if (hasShown) return;
    hasShown = true;
    opener = document.activeElement;
    popup.hidden = false;
    popup.setAttribute('aria-hidden', 'false');
    popupFrame.focus();
  }

  const schoolLifeObserver = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    openPopup();
    schoolLifeObserver.disconnect();
  }, { threshold:0.2 });

  schoolLifeObserver.observe(schoolLifeSection);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !popup.hidden) closePopup();
  });

  window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'admission-popup-close') {
      closePopup();
    }
  });
})();
