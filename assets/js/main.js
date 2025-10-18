/*
  Core UI interactions for Unifyn static site
  - Theme toggle with localStorage persistence (dark/light/system)
  - Mobile nav toggle (accessible)
  - FAQ accordion (ARIA compliant)
  - Smooth-scroll with reduced-motion respect
  - IntersectionObserver-based reveal animations
  - Modal management
*/

const THEME_STORAGE_KEY = 'theme';

function prefersDark() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function resolveDarkFromPreference(pref) {
  if (pref === 'dark') return true;
  if (pref === 'light') return false;
  return prefersDark();
}

export function applySavedTheme() {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) || 'dark'; // Default to dark
    const useDark = resolveDarkFromPreference(saved);
    document.documentElement.classList.toggle('dark', useDark);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', useDark ? '#0f172a' : '#ffffff');
    }
  } catch {
    document.documentElement.classList.add('dark'); // Fallback to dark
  }
}

function setThemePreference(pref) {
  try { localStorage.setItem(THEME_STORAGE_KEY, pref); } catch {}
  applySavedTheme();
  updateThemeButtons(pref);
}

function updateThemeButtons(pref) {
  const saved = localStorage.getItem(THEME_STORAGE_KEY) || 'dark';
  document.querySelectorAll('[data-theme-option]').forEach((el) => {
    const val = el.getAttribute('data-theme-option');
    if (val === saved) {
      el.classList.add('bg-cyan-500', 'text-white');
      el.classList.remove('text-slate-700', 'dark:text-slate-300');
    } else {
      el.classList.remove('bg-cyan-500', 'text-white');
      el.classList.add('text-slate-700', 'dark:text-slate-300');
    }
  });
}

function initThemeMenu() {
  const menuToggles = document.querySelectorAll('[data-theme-menu-toggle]');
  const menu = document.querySelector('[data-theme-menu-panel]');
  const options = document.querySelectorAll('[data-theme-option]');
  
  function close() { if (menu) menu.classList.add('hidden'); }
  function open() { if (menu) menu.classList.remove('hidden'); }
  
  menuToggles.forEach((t) => t.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!menu) return;
    menu.classList.toggle('hidden');
  }));
  
  options.forEach((opt) => {
    opt.addEventListener('click', () => {
      const pref = opt.getAttribute('data-theme-option');
      if (pref) setThemePreference(pref);
      close();
    });
  });
  
  document.addEventListener('click', (e) => {
    if (!menu) return;
    const within = menu.contains(e.target) || Array.from(menuToggles).some((t) => t.contains(e.target));
    if (!within) close();
  });
  
  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  if (mql && mql.addEventListener) {
    mql.addEventListener('change', () => {
      const saved = localStorage.getItem(THEME_STORAGE_KEY) || 'dark';
      if (saved === 'system') applySavedTheme();
    });
  }
  
  updateThemeButtons(localStorage.getItem(THEME_STORAGE_KEY) || 'dark');
}

function initMobileNav() {
  const toggleButton = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (!toggleButton || !menu) return;
  
  const closeOnEscape = (e) => {
    if (e.key === 'Escape') {
      const expanded = toggleButton.getAttribute('aria-expanded') === 'true';
      if (expanded) {
        toggleButton.click();
        toggleButton.focus();
      }
    }
  };
  
  toggleButton.addEventListener('click', () => {
    const expanded = toggleButton.getAttribute('aria-expanded') === 'true';
    toggleButton.setAttribute('aria-expanded', String(!expanded));
    menu.hidden = expanded;
    document.removeEventListener('keydown', closeOnEscape);
    if (!expanded) document.addEventListener('keydown', closeOnEscape);
  });
}

function initSmoothScroll() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href') || '';
      const target = id.length > 1 ? document.querySelector(id) : null;
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        if (target instanceof HTMLElement) target.focus({ preventScroll: true });
      }
    });
  });
}

function initAccordions() {
  const triggers = document.querySelectorAll('[data-accordion-trigger]');
  triggers.forEach((btn) => {
    const controlsId = btn.getAttribute('aria-controls');
    const region = controlsId ? document.getElementById(controlsId) : null;
    if (!region) return;
    
    const setState = (expanded) => {
      btn.setAttribute('aria-expanded', String(expanded));
      region.hidden = !expanded;
    };
    
    btn.addEventListener('click', () => setState(btn.getAttribute('aria-expanded') !== 'true'));
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setState(btn.getAttribute('aria-expanded') !== 'true');
      }
    });
  });
}

function initRevealOnScroll() {
  const els = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window) || els.length === 0) return;
  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    els.forEach((el) => el.classList.remove('opacity-0', 'translate-y-2'));
    return;
  }
  
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('opacity-0', 'translate-y-2');
        entry.target.classList.add('opacity-100', 'translate-y-0');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  els.forEach((el) => io.observe(el));
}

function initYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}

// Lightweight HTML partial loader for header/footer templates
async function loadPartials() {
  const placeholders = document.querySelectorAll('[data-include]');
  if (!placeholders.length) return;
  
  await Promise.all(
    Array.from(placeholders).map(async (el) => {
      const src = el.getAttribute('data-include');
      if (!src) return;
      try {
        const res = await fetch(src, { cache: 'no-cache' });
        if (!res.ok) return;
        const html = await res.text();
        el.outerHTML = html;
      } catch {}
    })
  );
}

// Modals
function closeModal(modal) {
  if (!modal) return;
  
  // Start exit animation
  modal.classList.remove('opacity-100');
  modal.classList.add('opacity-0');
  const content = modal.querySelector('.modal-content');
  if (content) {
    content.classList.remove('scale-100');
    content.classList.add('scale-95');
  }
  
  // Wait for animation to complete, then hide
  setTimeout(() => {
    modal.classList.add('hidden');
    modal.setAttribute('hidden', '');
    document.body.classList.remove('overflow-hidden');
  }, 300);
}

function openModalById(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  
  // Show modal immediately
  modal.classList.remove('hidden');
  modal.removeAttribute('hidden');
  document.body.classList.add('overflow-hidden');
  
  // Trigger animation on next frame
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      modal.classList.remove('opacity-0');
      modal.classList.add('opacity-100');
      const content = modal.querySelector('.modal-content');
      if (content) {
        content.classList.remove('scale-95');
        content.classList.add('scale-100');
      }
    });
  });
}

function initModals() {
  // Open modal buttons
  document.querySelectorAll('[data-open-modal]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const target = el.getAttribute('data-open-modal');
      if (!target) return;
      openModalById(`modal-${target}`);
    });
  });
  
  // Close modal on close button or backdrop click
  document.addEventListener('click', (e) => {
    // Check if clicked element or any parent has data-close-modal
    const closeBtn = e.target.closest('[data-close-modal]');
    if (!closeBtn) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    // Find the modal container
    let modal = closeBtn.closest('[id^="modal-"]');
    
    // If closeBtn is the backdrop (direct child of modal), get parent
    if (!modal && closeBtn.hasAttribute('data-close-modal')) {
      modal = closeBtn.parentElement;
    }
    
    if (modal && modal.id && modal.id.startsWith('modal-')) {
      closeModal(modal);
    }
  });
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('[id^="modal-"]:not(.hidden)').forEach((m) => closeModal(m));
    }
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  applySavedTheme();
  await loadPartials();
  initThemeMenu();
  initMobileNav();
  initSmoothScroll();
  initAccordions();
  initRevealOnScroll();
  initYear();
  initModals();
});

// Early theme apply to prevent flash
applySavedTheme();
