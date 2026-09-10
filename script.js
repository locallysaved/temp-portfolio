const fixedTabs = document.querySelector('.fixed-tabs');
const contactTab = document.querySelector('.contact-tab');
const contactPanel = document.querySelector('.contact-panel');
const contactClose = document.querySelector('.contact-close');

const setContactPanelState = (isOpen) => {
  fixedTabs?.classList.toggle('contact-open', isOpen);
  contactPanel?.classList.toggle('is-open', isOpen);
  contactTab?.setAttribute('aria-expanded', String(isOpen));
  contactPanel?.setAttribute('aria-hidden', String(!isOpen));
};

contactTab?.addEventListener('click', () => {
  setContactPanelState(!contactPanel?.classList.contains('is-open'));
});

contactClose?.addEventListener('click', () => {
  setContactPanelState(false);
});

const copyEmailLinks = document.querySelectorAll('.copy-email-link');
const copyPopup = document.querySelector('.copy-popup');

const copyTextToClipboard = async (text) => {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const copyField = document.createElement('textarea');
  copyField.value = text;
  copyField.setAttribute('readonly', '');
  copyField.style.position = 'fixed';
  copyField.style.opacity = '0';
  document.body.appendChild(copyField);
  copyField.select();
  document.execCommand('copy');
  copyField.remove();
};

copyEmailLinks.forEach((copyEmailLink) => {
  copyEmailLink.addEventListener('click', async (event) => {
    event.preventDefault();

    const copyText = copyEmailLink.dataset.copyText || 'placeholder text';
    await copyTextToClipboard(copyText);
    copyPopup?.classList.add('is-visible');

    window.setTimeout(() => {
      copyPopup?.classList.remove('is-visible');
    }, 1200);
  });
});

if (fixedTabs) {
  const updateFixedTabs = () => {
    fixedTabs.classList.toggle('is-visible', window.scrollY >= window.innerHeight * 0.5);
  };

  window.addEventListener('scroll', updateFixedTabs, { passive: true });
  updateFixedTabs();
}

const dropdowns = document.querySelectorAll('.dropdown-wrap');

dropdowns.forEach((dropdownWrap) => {
  const dropdownToggle = dropdownWrap.querySelector('.dropdown-toggle');
  const dropdownArrows = dropdownWrap.querySelectorAll('.dropdown-arrow');
  const dropdownPanel = dropdownWrap.querySelector('.dropdown-panel');

  if (dropdownToggle && dropdownArrows.length && dropdownPanel) {
    const setDropdownState = (isOpen) => {
      dropdownWrap.classList.toggle('is-open', isOpen);
      dropdownToggle.setAttribute('aria-expanded', String(isOpen));
      dropdownArrows.forEach((arrow) => {
        arrow.textContent = 'v';
      });
      dropdownPanel.setAttribute('aria-hidden', String(!isOpen));
    };

    setDropdownState(false);

    dropdownToggle.addEventListener('click', () => {
      const isOpen = !dropdownWrap.classList.contains('is-open');
      setDropdownState(isOpen);
    });
  }
});

const workItems = document.querySelectorAll('.work-item');

workItems.forEach((item) => {
  const updateTilt = (event) => {
    const rect = item.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    const rotateX = (0.5 - py) * 12;
    const rotateY = (px - 0.5) * 16;

    item.style.setProperty('--rx', `${rotateX.toFixed(2)}deg`);
    item.style.setProperty('--ry', `${rotateY.toFixed(2)}deg`);
    item.style.setProperty('--mx', `${(px * 100).toFixed(2)}%`);
    item.style.setProperty('--my', `${(py * 100).toFixed(2)}%`);
  };

  item.addEventListener('pointermove', updateTilt);

  item.addEventListener('pointerleave', () => {
    item.style.setProperty('--rx', '0deg');
    item.style.setProperty('--ry', '0deg');
    item.style.setProperty('--mx', '50%');
    item.style.setProperty('--my', '50%');
    item.classList.remove('is-pressed');
  });

  item.addEventListener('pointerdown', () => item.classList.add('is-pressed'));
  item.addEventListener('pointerup', () => item.classList.remove('is-pressed'));
  item.addEventListener('pointercancel', () => item.classList.remove('is-pressed'));
});
