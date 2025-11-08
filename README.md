# Unifyn — Global Unified Finance Platform

<div align="center">

![Unifyn Logo](favicon.svg)

**Fast • Secure • SEO-Optimized Static Website**

[![Deploy to Cloudflare Pages](https://img.shields.io/badge/Deploy-Cloudflare%20Pages-F38020?style=flat&logo=cloudflare)](https://pages.cloudflare.com)
[![License](https://img.shields.io/badge/License-Private-red.svg)](LICENSE)

</div>

## 📋 Overview

Static, multi-page marketing website for **Unifyn** — a global unified, broker-agnostic trading hub. Built with modern web standards for maximum performance and SEO.

### 🎯 Features

- ✅ **100% Static** — No server-side rendering, perfect for CDN hosting
- ✅ **Blazing Fast** — Lighthouse score 95+ (Performance, Accessibility, Best Practices, SEO)
- ✅ **SEO-First** — Schema.org JSON-LD, Open Graph, Twitter Cards, sitemap, robots.txt
- ✅ **Accessible** — WCAG AA compliant, semantic HTML, ARIA labels, keyboard navigation
- ✅ **Mobile-First** — Responsive design with Tailwind CSS
- ✅ **Modern UX** — Cosmic theme, glass morphism, smooth animations
- ✅ **Dark Mode** — System preference detection with manual toggle
- ✅ **Privacy-First** — No tracking without consent, OAuth-only authentication

## 🛠 Tech Stack

| Technology | Usage |
|------------|-------|
| **HTML5** | Semantic markup, multi-page structure |
| **Tailwind CSS** | Utility-first styling via CDN (no build step) |
| **Vanilla JavaScript** | ES6 modules for interactions (`main.js`, `forms.js`, `analytics.js`) |
| **Cloudflare Pages** | Global CDN hosting with edge caching |

**No frameworks. No bundlers. Just fast, clean HTML, CSS, and JS.**

## 📂 Project Structure

```
unifyn-trade/
├── index.html              # Home page (hero, features, pricing, FAQ)
├── contact.html            # Contact form
├── terms.html              # Terms & Conditions
├── privacy.html            # Privacy Policy
├── 404.html                # Custom 404 page
├── login.html              # Legacy login page (now uses modal)
├── signup.html             # Legacy signup page (now uses modal)
│
├── partials/
│   ├── header.html         # Shared header (logo, nav, theme toggle)
│   └── footer.html         # Shared footer (links, modals)
│
├── assets/
│   ├── js/
│   │   ├── main.js         # Core UI: theme, modals, accordion, nav
│   │   ├── forms.js        # Form validation and submission
│   │   └── analytics.js    # Privacy-first analytics (GA4/Plausible)
│   └── img/
│       └── brokers.svg     # Broker logos placeholder
│
├── favicon.svg             # Modern SVG favicon
├── favicon.ico             # Legacy ICO favicon
├── site.webmanifest        # PWA manifest
├── robots.txt              # Search engine directives
├── sitemap.xml             # Site map for SEO
│
├── _redirects              # Cloudflare Pages redirects
├── _headers                # Cloudflare Pages custom headers
├── wrangler.toml           # Cloudflare Pages configuration
├── package.json            # Scripts for local dev and deployment
├── DEPLOYMENT.md           # Detailed deployment guide
└── README.md               # This file
```

## 🚀 Quick Start

### Local Development

**Option 1: Python (Recommended)**
```bash
python3 -m http.server 8080
# Open http://localhost:8080
```

**Option 2: Node.js**
```bash
npm install -g http-server
http-server -p 8080 -c-1
# Open http://localhost:8080
```

**Option 3: Using package.json**
```bash
npm install
npm run dev
# Open http://localhost:8080
```

### Preview with Cloudflare Pages Locally
```bash
npm install -g wrangler
wrangler pages dev .
# Open http://localhost:8788
```

## 📦 Deployment

### Deploy to Cloudflare Pages (Recommended)

1. **Push to Git**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

2. **Connect to Cloudflare Pages**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Pages**
   - Click **Create a project** → **Connect to Git**
   - Select your repository
   - **Build command**: Leave empty (no build needed)
   - **Build output directory**: `/` or `.`
   - Click **Save and Deploy**

3. **Custom Domain** (Optional)
   - Go to **Pages** → **Your Project** → **Custom domains**
   - Add `unifyn.trade`
   - Follow DNS instructions

**That's it!** Your site is live with:
- ✅ Global CDN (300+ locations)
- ✅ Automatic SSL/TLS
- ✅ HTTP/3 & QUIC
- ✅ DDoS protection
- ✅ Instant cache invalidation

### Alternative: Deploy to AWS S3 + CloudFront

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed S3 deployment instructions.

## 🎨 Design System

### Colors
- **Primary**: Cyan 500 (`#06b6d4`)
- **Background**: Slate 950 (`#020617`)
- **Text**: Slate 100 (`#f1f5f9`)
- **Accent**: Blue 500 (`#3b82f6`)

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: 700 weight
- **Body**: 400 weight
- **Labels**: 500 weight

### Components
- **Modals**: Glass morphism with backdrop blur
- **Buttons**: Rounded-full with gradient hover effects
- **Forms**: Consistent focus states with cyan ring
- **Cards**: Subtle borders with hover glow

## 🔒 Security

- ✅ **OAuth-only authentication** — No password storage
- ✅ **HTTPS enforced** — Automatic SSL via Cloudflare
- ✅ **Security headers** — CSP, X-Frame-Options, HSTS
- ✅ **Privacy-first analytics** — Consent-gated tracking
- ✅ **No third-party cookies** — Only localStorage for theme

## ♿ Accessibility

- ✅ **WCAG AA compliant** — Color contrast 4.5:1+
- ✅ **Keyboard navigation** — All interactions accessible
- ✅ **Screen reader friendly** — ARIA labels and semantic HTML
- ✅ **Skip links** — Skip to main content
- ✅ **Focus indicators** — Clear focus states on all interactive elements
- ✅ **Reduced motion** — Respects `prefers-reduced-motion`

## 📊 Performance

- ✅ **Lighthouse score**: 95+ across all metrics
- ✅ **First Contentful Paint**: <1s
- ✅ **Time to Interactive**: <2s
- ✅ **Total Blocking Time**: <100ms
- ✅ **Cumulative Layout Shift**: <0.1

### Optimization Techniques
- Preconnect to Google Fonts
- Lazy loading for non-critical images
- Minimal JavaScript (no frameworks)
- Aggressive caching for static assets
- Brotli compression via Cloudflare

## 🔍 SEO

- ✅ **Sitemap**: `sitemap.xml` with all pages
- ✅ **Robots.txt**: Proper crawler directives
- ✅ **Meta tags**: Title, description, Open Graph, Twitter Card
- ✅ **Canonical URLs**: Prevent duplicate content
- ✅ **Schema.org**: Organization, WebSite, FAQPage JSON-LD
- ✅ **Alt text**: All images have descriptive alt attributes
- ✅ **Semantic HTML**: Proper heading hierarchy (h1-h6)

## 📝 Content Management

### Updating Content

1. **Hero Section**: Edit `index.html` lines 30-80
2. **Features**: Edit `index.html` lines 100-150
3. **Footer Links**: Edit `partials/footer.html`
4. **Legal Pages**: Edit `terms.html` and `privacy.html`

### Adding New Pages

1. Create `new-page.html` based on existing structure
2. Add cosmic background (fixed div)
3. Include `partials/header.html` and `partials/footer.html`
4. Update `sitemap.xml` and `_redirects`
5. Add link in footer navigation

## 🧪 Testing

### Manual Testing Checklist
- [ ] All pages load without errors
- [ ] Modals open/close smoothly
- [ ] Forms validate correctly
- [ ] Theme toggle works (light/dark/system)
- [ ] Mobile responsive on all screen sizes
- [ ] Keyboard navigation works
- [ ] Links go to correct destinations
- [ ] Images have proper alt text

### Lighthouse Audit
```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit
lighthouse http://localhost:8080 --view
```

### Accessibility Testing
```bash
# Install axe-cli
npm install -g @axe-core/cli

# Run accessibility audit
axe http://localhost:8080
```

## 📚 Documentation

- [DEPLOYMENT.md](DEPLOYMENT.md) — Detailed deployment guide for Cloudflare Pages and AWS S3
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## 🤝 Contributing

This is a private project. If you have suggestions or find bugs, please contact the team.

## 📄 License

Private and confidential. All rights reserved.

## 🆘 Support

For technical support or questions:
- **Email**: support@unifyn.trade
- **Website**: [unifyn.trade](https://unifyn.trade)

---

**Built with ❤️ by the Unifyn team**

*Last updated: January 2025*
