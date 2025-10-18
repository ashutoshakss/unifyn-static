#!/usr/bin/env node

/**
 * Validation script for Unifyn static site
 * Checks for required files, validates HTML structure, and ensures best practices
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const REQUIRED_FILES = [
  'index.html',
  'contact.html',
  'terms.html',
  'privacy.html',
  '404.html',
  'partials/header.html',
  'partials/footer.html',
  'assets/js/main.js',
  'assets/js/forms.js',
  'assets/js/analytics.js',
  'favicon.svg',
  'favicon.ico',
  'site.webmanifest',
  'robots.txt',
  'sitemap.xml',
  '_redirects',
  '_headers',
  'README.md',
  'DEPLOYMENT.md',
];

let errors = 0;
let warnings = 0;

function error(msg) {
  console.error(`❌ ERROR: ${msg}`);
  errors++;
}

function warn(msg) {
  console.warn(`⚠️  WARNING: ${msg}`);
  warnings++;
}

function success(msg) {
  console.log(`✅ ${msg}`);
}

function info(msg) {
  console.log(`ℹ️  ${msg}`);
}

// Check required files
info('Checking required files...');
REQUIRED_FILES.forEach((file) => {
  const filePath = path.join(ROOT, file);
  if (fs.existsSync(filePath)) {
    success(`Found: ${file}`);
  } else {
    error(`Missing: ${file}`);
  }
});

// Check HTML files for common issues
info('\nValidating HTML files...');
const htmlFiles = ['index.html', 'contact.html', 'terms.html', 'privacy.html', '404.html'];

htmlFiles.forEach((file) => {
  const filePath = path.join(ROOT, file);
  if (!fs.existsSync(filePath)) return;
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Check for title
  if (!content.includes('<title>')) {
    error(`${file}: Missing <title> tag`);
  } else {
    success(`${file}: Has <title> tag`);
  }
  
  // Check for meta description
  if (!content.includes('name="description"')) {
    warn(`${file}: Missing meta description`);
  } else {
    success(`${file}: Has meta description`);
  }
  
  // Check for canonical link
  if (!content.includes('rel="canonical"')) {
    warn(`${file}: Missing canonical link`);
  }
  
  // Check for Open Graph tags
  if (!content.includes('property="og:')) {
    warn(`${file}: Missing Open Graph tags`);
  }
  
  // Check for header/footer includes
  if (!content.includes('data-include="partials/header.html"')) {
    warn(`${file}: Not using header partial`);
  }
  if (!content.includes('data-include="partials/footer.html"')) {
    warn(`${file}: Not using footer partial`);
  }
  
  // Check for cosmic background
  if (!content.includes('fixed inset-0 -z-10')) {
    warn(`${file}: Missing fixed cosmic background`);
  }
  
  // Check for skip link
  if (!content.includes('Skip to content')) {
    warn(`${file}: Missing skip link for accessibility`);
  }
});

// Check JavaScript files
info('\nValidating JavaScript files...');
const jsFiles = ['assets/js/main.js', 'assets/js/forms.js', 'assets/js/analytics.js'];

jsFiles.forEach((file) => {
  const filePath = path.join(ROOT, file);
  if (!fs.existsSync(filePath)) return;
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Check for console.log (should be removed in production)
  if (content.includes('console.log(') && !content.includes('// TODO')) {
    warn(`${file}: Contains console.log statements`);
  }
  
  success(`${file}: Basic validation passed`);
});

// Check robots.txt
info('\nValidating robots.txt...');
const robotsPath = path.join(ROOT, 'robots.txt');
if (fs.existsSync(robotsPath)) {
  const content = fs.readFileSync(robotsPath, 'utf8');
  if (content.includes('Disallow: /')) {
    warn('robots.txt: Blocks all crawlers - is this intentional?');
  } else {
    success('robots.txt: Allows crawling');
  }
}

// Check sitemap.xml
info('\nValidating sitemap.xml...');
const sitemapPath = path.join(ROOT, 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  const content = fs.readFileSync(sitemapPath, 'utf8');
  if (!content.includes('<?xml')) {
    error('sitemap.xml: Invalid XML format');
  } else if (!content.includes('<urlset')) {
    error('sitemap.xml: Missing <urlset> tag');
  } else if (!content.includes('https://unifyn.trade')) {
    warn('sitemap.xml: URLs not using production domain');
  } else {
    success('sitemap.xml: Valid format');
  }
}

// Check manifest
info('\nValidating site.webmanifest...');
const manifestPath = path.join(ROOT, 'site.webmanifest');
if (fs.existsSync(manifestPath)) {
  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    if (!manifest.name) warn('site.webmanifest: Missing name');
    if (!manifest.icons) warn('site.webmanifest: Missing icons');
    if (manifest.icons && manifest.icons.length === 0) {
      warn('site.webmanifest: No icons defined');
    } else {
      success('site.webmanifest: Valid JSON format');
    }
  } catch (e) {
    error('site.webmanifest: Invalid JSON format');
  }
}

// Check _redirects
info('\nValidating _redirects...');
const redirectsPath = path.join(ROOT, '_redirects');
if (fs.existsSync(redirectsPath)) {
  const content = fs.readFileSync(redirectsPath, 'utf8');
  if (!content.includes('404')) {
    warn('_redirects: No 404 handler defined');
  } else {
    success('_redirects: Has 404 handler');
  }
}

// Summary
console.log('\n' + '='.repeat(50));
console.log('📊 VALIDATION SUMMARY');
console.log('='.repeat(50));

if (errors === 0 && warnings === 0) {
  console.log('🎉 All checks passed! Your site is ready to deploy.');
} else {
  if (errors > 0) {
    console.log(`❌ ${errors} error(s) found - please fix before deploying`);
  }
  if (warnings > 0) {
    console.log(`⚠️  ${warnings} warning(s) found - review recommended`);
  }
}

console.log('='.repeat(50) + '\n');

// Exit with error code if there are errors
process.exit(errors > 0 ? 1 : 0);

