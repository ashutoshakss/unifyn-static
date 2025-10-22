// Custom Elements for partials - secure, template-based insertion

class IncludeHTML extends HTMLElement {
  async connectedCallback() {
    const src = this.getAttribute('src');
    if (!src) return;

    // Security: Only allow loading from partials/ directory
    if (!src.startsWith('partials/')) {
      console.error('Security: Only partials/ directory is allowed');
      return;
    }

    try {
      const cacheBustedUrl = `${src}?v=${Date.now()}`;
      const response = await fetch(cacheBustedUrl, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      if (!response.ok) {
        console.error(`Failed to load ${src}: ${response.status}`);
        return;
      }

      const html = await response.text();

      // Prefer Range#createContextualFragment using PARENT context to preserve special tags (li, tr, etc.)
      let replaced = false;
      if (document.createRange && this.parentNode && this.parentNode.nodeType === 1) {
        const range = document.createRange();
        range.selectNode(this.parentNode);
        const fragment = range.createContextualFragment(html);
        this.replaceWith(fragment);
        replaced = true;
      }

      // Fallback: use <template> to safely parse without executing scripts
      if (!replaced) {
        const template = document.createElement('template');
        template.innerHTML = html;
        const fragment = template.content;
        if (this.parentNode) {
          this.parentNode.replaceChild(fragment, this);
        }
      }

      // Notify listeners that an include finished
      document.dispatchEvent(new CustomEvent('include:loaded', { detail: { src } }));
      if (typeof window.__includesPending === 'number') {
        window.__includesPending = Math.max(0, window.__includesPending - 1);
        if (window.__includesPending === 0) {
          document.dispatchEvent(new CustomEvent('include:all-loaded'));
        }
      }
    } catch (error) {
      console.error(`Failed to load ${src}:`, error);
    }
  }
}

// Track when all includes finish
if (!window.__includesPending) {
  window.__includesPending = document.querySelectorAll('include-html').length;
}

// Register the custom element
customElements.define('include-html', IncludeHTML);

