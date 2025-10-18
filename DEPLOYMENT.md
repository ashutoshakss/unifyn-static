# Deployment Guide for Unifyn

This guide covers deploying the Unifyn static site to Cloudflare Pages.

## Prerequisites

- A Cloudflare account (free tier works)
- Git repository (GitHub, GitLab, or Bitbucket)
- Domain name (optional, Cloudflare provides a `*.pages.dev` subdomain)

## Cloudflare Pages Deployment

### Option 1: Deploy via Cloudflare Dashboard (Recommended)

1. **Push your code to a Git repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Connect to Cloudflare Pages**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to **Pages** → **Create a project**
   - Select **Connect to Git**
   - Authorize Cloudflare to access your repository
   - Select the `unifyn-trade` repository

3. **Configure build settings**
   - **Project name**: `unifyn-trade` (or your choice)
   - **Production branch**: `main`
   - **Build command**: Leave empty (static site, no build needed)
   - **Build output directory**: `/` or `.`
   - **Root directory**: `/`

4. **Environment variables** (if needed)
   - You can set environment variables in the dashboard
   - For GA4 or analytics IDs, add them here

5. **Deploy**
   - Click **Save and Deploy**
   - Cloudflare will deploy your site in ~1 minute
   - You'll get a URL like `https://unifyn-trade.pages.dev`

### Option 2: Deploy via Wrangler CLI

1. **Install Wrangler**
   ```bash
   npm install -g wrangler
   # or
   yarn global add wrangler
   ```

2. **Login to Cloudflare**
   ```bash
   wrangler login
   ```

3. **Deploy**
   ```bash
   wrangler pages deploy . --project-name=unifyn-trade
   ```

## Custom Domain Setup

1. **Add your domain to Cloudflare**
   - Go to **Pages** → **Your Project** → **Custom domains**
   - Click **Set up a custom domain**
   - Enter `unifyn.trade`
   - Follow DNS setup instructions

2. **DNS Records** (if using Cloudflare DNS)
   - Cloudflare will automatically create CNAME records
   - `unifyn.trade` → `unifyn-trade.pages.dev`
   - `www.unifyn.trade` → `unifyn-trade.pages.dev`

3. **SSL/TLS**
   - Cloudflare automatically provisions SSL certificates
   - Set SSL/TLS mode to **Full** or **Full (strict)**

## Environment Configuration

### Production
- Ensure `robots.txt` allows crawling
- Update `sitemap.xml` with production URLs
- Set up analytics (GA4 or Plausible)
- Enable security headers (already configured in `wrangler.toml`)

### Staging
- Create a separate branch (e.g., `staging`)
- Cloudflare automatically creates preview deployments for non-production branches
- Preview URL: `https://<branch-name>.unifyn-trade.pages.dev`

## Performance Optimization

Cloudflare Pages automatically provides:
- ✅ Global CDN (300+ edge locations)
- ✅ HTTP/3 and QUIC
- ✅ Brotli compression
- ✅ Automatic minification (HTML, CSS, JS)
- ✅ Always Online (cached version during downtime)
- ✅ DDoS protection

### Additional Optimizations

1. **Enable Argo Smart Routing** (paid, ~$5/month)
   - Faster routing across Cloudflare's network
   - Up to 30% faster load times

2. **Image Optimization**
   - Use Cloudflare Images or Image Resizing
   - Automatically serve WebP/AVIF to supported browsers

3. **Caching Rules**
   - Already configured in `wrangler.toml`
   - Static assets: 1 year cache
   - HTML: 1 hour cache with revalidation

## Monitoring & Analytics

1. **Cloudflare Web Analytics** (free, privacy-first)
   - Go to **Web Analytics** → **Add a site**
   - Add the tracking script to your `index.html`

2. **Cloudflare Insights**
   - View traffic, performance, and security metrics
   - Available in the Pages dashboard

## Redirects & Rewrites

The `_redirects` file handles:
- Legacy URL redirects
- Custom 404 page
- Security headers
- Force HTTPS

### Testing Redirects Locally
```bash
# Install Miniflare (local Cloudflare Pages simulator)
npm install -g miniflare
miniflare --live-reload
```

## Troubleshooting

### Build fails
- Ensure no build command is set (static site)
- Check file permissions in repository

### 404 errors
- Verify `_redirects` file is in the root directory
- Check file paths are correct (case-sensitive)

### Assets not loading
- Check relative paths in HTML files
- Ensure assets are in the repository

### Headers not applied
- Wait 5-10 minutes for cache to clear
- Use `curl -I` to check headers
- Verify `wrangler.toml` syntax

## Rollback

Cloudflare keeps all deployments:
1. Go to **Pages** → **Your Project** → **Deployments**
2. Find the previous deployment
3. Click **Rollback to this deployment**

## CI/CD Integration

### GitHub Actions
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Cloudflare Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: unifyn-trade
          directory: .
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}
```

## Support

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Cloudflare Community](https://community.cloudflare.com/)
- [Discord](https://discord.gg/cloudflaredev)

## Alternative: Amazon S3 + CloudFront

If you prefer AWS (as originally planned):

### S3 Setup
```bash
# Create S3 bucket
aws s3 mb s3://unifyn.trade

# Enable static website hosting
aws s3 website s3://unifyn.trade --index-document index.html --error-document 404.html

# Upload files
aws s3 sync . s3://unifyn.trade --exclude ".git/*" --exclude "node_modules/*"

# Set public read access
aws s3api put-bucket-policy --bucket unifyn.trade --policy file://s3-policy.json
```

### CloudFront Setup
1. Create a CloudFront distribution
2. Set S3 bucket as origin
3. Configure custom domain and SSL
4. Add cache behaviors for assets

**Note**: Cloudflare Pages is simpler and includes CDN + SSL for free, so it's recommended over S3+CloudFront for static sites.

---

**Last updated**: January 2025

