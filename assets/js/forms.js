/*
  Form helpers for Unifyn static site
  - Newsletter (data-form="newsletter")
  - Signup (data-form="signup")
  - Contact (data-form="contact")
  Uses Constraint Validation API with lightweight enhancements.
  Attempts POST to /api/collect, falls back to localStorage queue when offline/error.
*/

const PENDING_KEY = 'unifyn_pending_submissions';

function getPendingQueue() {
  try {
    const val = localStorage.getItem(PENDING_KEY);
    return val ? JSON.parse(val) : [];
  } catch {
    return [];
  }
}

function setPendingQueue(queue) {
  try {
    localStorage.setItem(PENDING_KEY, JSON.stringify(queue));
  } catch {}
}

function enqueuePending(payload) {
  const queue = getPendingQueue();
  queue.push({ ...payload, queuedAt: new Date().toISOString() });
  setPendingQueue(queue);
}

function serializeForm(form) {
  const data = new FormData(form);
  return Object.fromEntries(data.entries());
}

function setBusy(form, busy) {
  const btn = form.querySelector('[type="submit"]');
  if (btn) {
    btn.disabled = busy;
    btn.setAttribute('aria-busy', String(busy));
  }
}

function getToastRegion(form) {
  // Prefer a scoped [data-toast] inside the form; fallback to global
  return form.querySelector('[data-toast]') || document.querySelector('[data-toast-global]');
}

function showToast(form, message, type = 'info') {
  const region = getToastRegion(form);
  if (!region) return;
  region.textContent = message;
  region.setAttribute('data-type', type);
}

async function postCollect(type, payload) {
  // Intentionally simple; S3 hosting has no backend. This endpoint is a placeholder.
  // A future CloudFront + Lambda@Edge/Functions URL can be substituted.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch('/api/collect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, payload }),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    return res.ok;
  } catch {
    clearTimeout(timeout);
    return false;
  }
}

function handleSuccess(form, message) {
  showToast(form, message, 'success');
  form.reset();
}

function handleFailure(form, message) {
  showToast(form, message, 'error');
}

async function processForm(form, type, successMessage) {
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  setBusy(form, true);
  const payload = serializeForm(form);
  const ok = await postCollect(type, payload);
  if (ok) {
    handleSuccess(form, successMessage);
  } else {
    enqueuePending({ type, payload });
    // Graceful offline fallback — still show success to user
    handleSuccess(form, successMessage + ' (saved offline)');
  }
  setBusy(form, false);
}

function initNewsletter() {
  document.querySelectorAll('form[data-form="newsletter"]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      processForm(form, 'newsletter', 'You are on the list. Thank you!');
    });
  });
}

function initSignup() {
  document.querySelectorAll('form[data-form="signup"]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      processForm(form, 'signup', 'Thanks! We will reach out soon.');
    });
  });
}

function initContact() {
  document.querySelectorAll('form[data-form="contact"]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      processForm(form, 'contact', 'Message received. We will reply shortly.');
    });
  });
}

export function initForms() {
  initNewsletter();
  initSignup();
  initContact();
}

document.addEventListener('DOMContentLoaded', () => {
  initForms();
});


