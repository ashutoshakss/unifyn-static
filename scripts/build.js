#!/usr/bin/env node
// Simple static build: inline HTML partials into dist/ to avoid runtime includes

const fs = require('fs');
const fsp = fs.promises;
const path = require('path');

const ROOT = process.cwd();
const SRC_DIR = ROOT;
const DIST_DIR = path.join(ROOT, 'dist');

async function rimraf(target) {
  try {
    await fsp.rm(target, { recursive: true, force: true });
  } catch {}
}

async function ensureDir(dir) {
  await fsp.mkdir(dir, { recursive: true });
}

async function copyFile(src, dest) {
  await ensureDir(path.dirname(dest));
  await fsp.copyFile(src, dest);
}

async function copyDir(srcDir, destDir) {
  await ensureDir(destDir);
  const entries = await fsp.readdir(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'dist' || entry.name === 'node_modules' || entry.name === '.git') continue;
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await copyFile(srcPath, destPath);
    }
  }
}

async function readPartial(rel) {
  const abs = path.join(SRC_DIR, rel);
  return await fsp.readFile(abs, 'utf8');
}

function removeWebComponentsScript(html) {
  return html.replace(/<script[^>]+src=["']assets\/js\/web-components\.js["'][^>]*><\/script>\s*/gi, '');
}

async function inlineIncludesInHtmlFile(absPath) {
  let html = await fsp.readFile(absPath, 'utf8');

  // Inline <include-html src="..."></include-html>
  const includeTag = /<include-html\s+src=["']([^"']+)["']\s*>\s*<\/include-html>/gi;
  let match;
  let guard = 0;
  while ((match = includeTag.exec(html)) && guard++ < 100) {
    const rel = match[1];
    const content = await readPartial(rel);
    html = html.replace(match[0], content);
    includeTag.lastIndex = 0; // reset search after replace
  }

  // Inline any [data-include] placeholders
  const dataInclude = /<([a-zA-Z][a-zA-Z0-9:-]*)[^>]*\sdata-include=["']([^"']+)["'][^>]*>\s*<\/\1>/gi;
  guard = 0;
  while ((match = dataInclude.exec(html)) && guard++ < 100) {
    const rel = match[2];
    const content = await readPartial(rel);
    html = html.replace(match[0], content);
    dataInclude.lastIndex = 0;
  }

  // Remove runtime web-components script in built output
  html = removeWebComponentsScript(html);

  await fsp.writeFile(absPath, html, 'utf8');
}

async function processHtmlFiles(dir) {
  const entries = await fsp.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await processHtmlFiles(p);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) {
      await inlineIncludesInHtmlFile(p);
    }
  }
}

async function main() {
  await rimraf(DIST_DIR);
  await copyDir(SRC_DIR, DIST_DIR);
  await processHtmlFiles(DIST_DIR);
  console.log('Build complete →', DIST_DIR);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


