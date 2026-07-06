let lockCount = 0;
let savedScrollY = 0;

export function lockBodyScroll() {
  if (lockCount === 0) {
    savedScrollY = window.scrollY;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }
  lockCount += 1;
}

export function unlockBodyScroll() {
  if (lockCount === 0) {
    return;
  }

  lockCount -= 1;

  if (lockCount > 0) {
    return;
  }

  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  document.body.style.width = '';
  window.scrollTo(0, savedScrollY);
}

export function forceUnlockBodyScroll() {
  lockCount = 0;
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  document.body.style.width = '';
}
