# CI/CD Setup Guide for Unifyn Trade

This document explains the CI/CD pipeline setup for automatic deployment to Cloudflare Pages.

## Overview

Your project now has three GitHub Actions workflows:

1. **CI (Continuous Integration)** - Runs on every push and PR
2. **Deploy** - Deploys to Cloudflare Pages on push to main/live
3. **Lighthouse** - Performance audits on PRs

## Setup Instructions

### 1. Get Cloudflare Credentials

You'll need two pieces of information from Cloudflare:

#### A. Cloudflare Account ID
1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Go to **Workers & Pages** → **Overview**
3. On the right sidebar, you'll see your **Account ID**
4. Copy this ID

#### B. Cloudflare API Token
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click on your profile icon → **My Profile** → **API Tokens**
3. Click **Create Token**
4. Use the **Edit Cloudflare Workers** template OR create a custom token with:
   - **Permissions:**
     - Account - Cloudflare Pages - Edit
   - **Account Resources:**
     - Include - Your Account
5. Click **Continue to summary** → **Create Token**
6. Copy the token (you won't be able to see it again!)

### 2. Add Secrets to GitHub Repository

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add these two secrets:

   - **Name:** `CLOUDFLARE_API_TOKEN`
     - **Value:** [Paste your Cloudflare API Token]
   
   - **Name:** `CLOUDFLARE_ACCOUNT_ID`
     - **Value:** [Paste your Cloudflare Account ID]

### 3. Verify GitHub Actions is Enabled

1. In your repository, go to **Settings** → **Actions** → **General**
2. Ensure "Allow all actions and reusable workflows" is selected
3. Under "Workflow permissions", select "Read and write permissions"
4. Save changes

### 4. Create Cloudflare Pages Project (if not already created)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Workers & Pages** → **Create application** → **Pages**
3. Connect to Git or use Direct Upload
4. Set project name to: `unifyn-trade` (must match `wrangler.toml`)
5. Build settings:
   - Build command: (leave empty, GitHub Actions handles this)
   - Build output directory: `/out`
6. Click **Save and Deploy**

### 5. Test the Setup

#### Automatic Deployment
Push any change to the `main` or `live` branch:
```bash
git add .
git commit -m "Test CI/CD deployment"
git push origin live
```

#### Manual Deployment
You can also deploy manually:
```bash
npm run build
npm run deploy
```

## Workflow Details

### CI Workflow (`.github/workflows/ci.yml`)
**Triggers:** Every push and PR
**Actions:**
- Installs dependencies
- Runs TypeScript type checking
- Builds the Next.js static site
- Verifies build output
- Uploads build artifacts

### Deploy Workflow (`.github/workflows/deploy.yml`)
**Triggers:** Push to `main` or `live` branches, and PRs
**Actions:**
- Runs all CI steps
- Deploys to Cloudflare Pages
- Production deployment for `main`/`live`
- Preview deployment for PRs

### Lighthouse Workflow (`.github/workflows/lighthouse.yml`)
**Triggers:** PRs and manual trigger
**Actions:**
- Builds the site
- Runs Lighthouse performance audits
- Tests multiple pages (home, privacy, terms)
- Reports performance scores

## Monitoring Deployments

### GitHub
- Go to **Actions** tab in your repository
- View running and completed workflows
- Click on any workflow run to see detailed logs

### Cloudflare
- Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
- Navigate to **Workers & Pages** → **unifyn-trade**
- View deployment history and logs
- Access preview URLs for each deployment

## Branch Strategy

### Production Branches
- `main` - Primary production branch
- `live` - Live production branch (currently active)

### Feature Branches
- Create feature branches from `live` or `main`
- Open PRs to merge back
- Preview deployments are created automatically
- Lighthouse audits run on PRs

## Troubleshooting

### Build Fails
- Check the GitHub Actions logs
- Ensure all dependencies are in `package.json`
- Verify Next.js config is correct

### Deployment Fails
- Verify Cloudflare secrets are set correctly
- Check that project name matches: `unifyn-trade`
- Ensure API token has correct permissions

### Performance Issues
- Review Lighthouse reports in PR comments
- Check the performance optimization guides in your docs:
  - `PERFORMANCE_OPTIMIZATIONS.md`
  - `LIGHTHOUSE_FIXES.md`
  - `FINAL_OPTIMIZATION_SUMMARY.md`

## Additional Features

### Manual Deployment via GitHub Actions
1. Go to **Actions** tab
2. Select **Deploy to Cloudflare Pages** workflow
3. Click **Run workflow**
4. Choose the branch and click **Run workflow**

### Rollback a Deployment
1. Go to Cloudflare Dashboard
2. Navigate to **Workers & Pages** → **unifyn-trade**
3. Find the previous successful deployment
4. Click **Rollback to this deployment**

### Environment Variables
To add environment variables:
1. In GitHub: Settings → Secrets and variables → Actions
2. In Cloudflare: Workers & Pages → unifyn-trade → Settings → Environment variables

## Security Best Practices

✅ **Already Implemented:**
- Secrets stored in GitHub (not in code)
- Minimal permissions for API tokens
- No sensitive data in logs
- Branch protection (recommended)

🔐 **Recommended:**
1. Enable branch protection on `main`/`live`:
   - Require PR reviews
   - Require status checks to pass
   - Require up-to-date branches
2. Set up CODEOWNERS file
3. Enable Dependabot for security updates

## Cost & Limits

**Cloudflare Pages Free Tier:**
- Unlimited requests
- Unlimited bandwidth
- 500 builds per month
- 100 custom domains

**GitHub Actions:**
- 2,000 minutes/month (free tier)
- This project uses ~3-5 minutes per deployment
- ~400-600 deployments per month possible

## Next Steps

1. ✅ Set up GitHub secrets (Cloudflare API Token & Account ID)
2. ✅ Push to `live` or `main` branch
3. ✅ Verify deployment in GitHub Actions
4. ✅ Check site is live on Cloudflare Pages
5. 🔧 Optional: Set up branch protection
6. 🔧 Optional: Configure custom domain in Cloudflare

## Support

- **Cloudflare Pages Docs:** https://developers.cloudflare.com/pages/
- **GitHub Actions Docs:** https://docs.github.com/actions
- **Next.js Static Export:** https://nextjs.org/docs/pages/building-your-application/deploying/static-exports

---

**Status:** Ready to deploy! 🚀

Your CI/CD pipeline is fully configured and ready to use. Just add the Cloudflare secrets to GitHub and push your code!

