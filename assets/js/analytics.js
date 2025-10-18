/*
  Consent-gated analytics loader (Plausible or GA4 placeholder)
  Default: disabled until consent is granted.
*/

const CONSENT_KEY = 'analytics_consent';

export function getAnalyticsConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY) === 'granted';
  } catch {
    return false;
  }
}

export function setAnalyticsConsent(granted) {
  try {
    localStorage.setItem(CONSENT_KEY, granted ? 'granted' : 'denied');
  } catch {}
  if (granted) loadAnalytics();
}

export function loadAnalytics() {
  if (!getAnalyticsConsent()) return;
  if (document.querySelector('script[data-analytics="plausible"]')) return;
  const s = document.createElement('script');
  s.defer = true;
  s.setAttribute('data-domain', 'unifyn.trade');
  s.src = 'https://plausible.io/js/script.js';
  s.setAttribute('data-analytics', 'plausible');
  document.head.appendChild(s);
}

document.addEventListener('DOMContentLoaded', () => {
  // Attempt to load if previously granted
  loadAnalytics();
  // Optional: wire up consent buttons if present
  document.querySelectorAll('[data-analytics-consent]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const state = btn.getAttribute('data-analytics-consent');
      setAnalyticsConsent(state === 'grant');
    });
  });
});


