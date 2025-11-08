# CI/CD Setup Guide - AWS S3 + CloudFront Deployment

This document explains the CI/CD pipeline setup for automatic deployment to AWS S3 with CloudFront CDN.

## Overview

Your project has three GitHub Actions workflows:

1. **CI (Continuous Integration)** - Runs on every push and PR
2. **Deploy** - Deploys to S3 + invalidates CloudFront cache on push to main/live
3. **Lighthouse** - Performance audits on PRs

## Setup Instructions

### Step 1: Create AWS S3 Bucket

1. **Log in to AWS Console:** https://console.aws.amazon.com
2. Search for **"S3"** and open the S3 service
3. Click **"Create bucket"**

#### Bucket Configuration:
- **Bucket name:** Choose a unique name (e.g., `unifyn-trade-website`)
  - Must be globally unique across all AWS
  - Use lowercase, numbers, and hyphens only
  - Example: `unifyn-trade-prod`

- **AWS Region:** Choose one (remember it!)
  - `us-east-1` (US East - N. Virginia) - Cheapest
  - `us-west-2` (US West - Oregon)
  - `eu-west-1` (Europe - Ireland)
  - `ap-southeast-1` (Asia Pacific - Singapore)

- **Block Public Access settings:**
  - ⚠️ **UNCHECK** "Block all public access"
  - Acknowledge the warning (your site needs to be public)

- **Bucket Versioning:** Enable (recommended for safety)
- **Default encryption:** Enable (free security)

4. Click **"Create bucket"**

#### Configure Static Website Hosting:

5. Click on your bucket name
6. Go to **"Properties"** tab
7. Scroll to **"Static website hosting"**
8. Click **"Edit"**
9. Enable **"Static website hosting"**
10. Index document: `index.html`
11. Error document: `404.html`
12. Click **"Save changes"**
13. **Note the website endpoint URL** (you'll need this)

#### Set Bucket Policy:

14. Go to **"Permissions"** tab
15. Scroll to **"Bucket policy"**
16. Click **"Edit"**
17. Paste this policy (replace `YOUR-BUCKET-NAME`):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    }
  ]
}
```

18. Click **"Save changes"**

---

### Step 2: Create CloudFront Distribution

1. In AWS Console, search for **"CloudFront"**
2. Click **"Create distribution"**

#### Origin Settings:
- **Origin domain:** Select your S3 bucket from dropdown
  - Or use the S3 website endpoint URL
- **Origin path:** Leave empty
- **Name:** Auto-filled, keep it
- **Origin access:** 
  - Choose **"Public"** (since bucket is public)
  - Or use **"Origin access control"** (recommended for security)

#### Default Cache Behavior:
- **Viewer protocol policy:** Redirect HTTP to HTTPS
- **Allowed HTTP methods:** GET, HEAD
- **Cache policy:** CachingOptimized
- **Origin request policy:** None

#### Settings:
- **Price class:** Use all edge locations (best performance)
  - Or choose "Use only North America and Europe" (cheaper)
- **Alternate domain name (CNAME):** Add your custom domain if you have one
  - Example: `www.unifyn.trade`, `unifyn.trade`
- **Custom SSL certificate:** Request/import certificate if using custom domain
- **Default root object:** `index.html`

3. Click **"Create distribution"**

4. **Important:** Wait 5-15 minutes for distribution to deploy
5. **Copy the Distribution ID** (e.g., `E1234ABCDEFGH`)
6. **Copy the Distribution domain name** (e.g., `d1234abcdef.cloudfront.net`)

---

### Step 3: Create AWS IAM Access Keys

1. In AWS Console, click your **account name** (top right)
2. Select **"Security credentials"**
3. Scroll to **"Access keys"**
4. Click **"Create access key"**
5. Select **"Command Line Interface (CLI)"**
6. Check the acknowledgment box
7. Click **"Next"**
8. Optional: Add description tag: "GitHub Actions Deploy"
9. Click **"Create access key"**

10. **CRITICAL:** Copy and save both:
    - **Access key ID:** `AKIAIOSFODNN7EXAMPLE`
    - **Secret access key:** `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`

11. Download the CSV file as backup
12. Store these securely - you won't see the secret again!

---

### Step 4: Set IAM Permissions (Important!)

Your IAM user needs these permissions:

1. Go to **IAM** in AWS Console
2. Click **"Users"** → Select your user
3. Click **"Add permissions"** → **"Attach policies directly"**
4. Attach these policies:
   - ✅ **AmazonS3FullAccess** (for S3 deployment)
   - ✅ **CloudFrontFullAccess** (for cache invalidation)

Or create a custom policy with minimal permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket",
        "s3:PutObjectAcl"
      ],
      "Resource": [
        "arn:aws:s3:::YOUR-BUCKET-NAME",
        "arn:aws:s3:::YOUR-BUCKET-NAME/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation",
        "cloudfront:GetInvalidation",
        "cloudfront:ListInvalidations"
      ],
      "Resource": "arn:aws:cloudfront::YOUR-ACCOUNT-ID:distribution/YOUR-DISTRIBUTION-ID"
    }
  ]
}
```

---

### Step 5: Add Secrets to GitHub Repository

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"** for each:

#### Required Secrets:

**1. AWS_ACCESS_KEY_ID**
- **Name:** `AWS_ACCESS_KEY_ID`
- **Value:** Your AWS Access Key ID
  ```
  AKIAIOSFODNN7EXAMPLE
  ```

**2. AWS_SECRET_ACCESS_KEY**
- **Name:** `AWS_SECRET_ACCESS_KEY`
- **Value:** Your AWS Secret Access Key
  ```
  wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
  ```

**3. AWS_S3_BUCKET**
- **Name:** `AWS_S3_BUCKET`
- **Value:** Your S3 bucket name
  ```
  unifyn-trade-prod
  ```

**4. AWS_REGION**
- **Name:** `AWS_REGION`
- **Value:** Your bucket's region
  ```
  us-east-1
  ```

**5. CLOUDFRONT_DISTRIBUTION_ID**
- **Name:** `CLOUDFRONT_DISTRIBUTION_ID`
- **Value:** Your CloudFront Distribution ID
  ```
  E1234ABCDEFGH
  ```

---

### Step 6: Update package.json S3 Deploy Script

Update the deploy script in your `package.json` to use your actual bucket name:

```json
"deploy:s3": "npm run build && aws s3 sync out s3://unifyn-trade-prod --delete --cache-control max-age=31536000,public --exclude '*.html' && aws s3 sync out s3://unifyn-trade-prod --delete --cache-control max-age=3600,public --exclude '*' --include '*.html' && aws cloudfront create-invalidation --distribution-id E1234ABCDEFGH --paths '/*'"
```

Replace:
- `unifyn-trade-prod` with your bucket name
- `E1234ABCDEFGH` with your distribution ID

---

### Step 7: Test the Deployment

#### Option A: Automatic Deployment (Recommended)

Push any change to `main` or `live` branch:

```bash
git add .
git commit -m "Test S3 + CloudFront deployment"
git push origin live
```

Go to GitHub → **Actions** tab to watch the deployment.

#### Option B: Manual Deployment

You can also deploy manually using the AWS CLI:

```bash
# Install AWS CLI if not installed
brew install awscli  # macOS
# or: pip install awscli

# Configure AWS CLI
aws configure
# Enter: Access Key ID, Secret Key, Region, Output format (json)

# Run deployment
npm run deploy:s3
```

---

## Workflow Details

### Deploy Workflow (`.github/workflows/deploy.yml`)

**Triggers:** Push to `main` or `live` branches

**Actions:**
1. ✅ Checkout code
2. ✅ Setup Node.js and install dependencies
3. ✅ Build Next.js static site
4. ✅ Configure AWS credentials
5. ✅ Sync files to S3 with optimized cache headers:
   - Static assets (JS, CSS, images): 1 year cache
   - HTML files: 1 hour cache
   - Metadata files: 24 hour cache
6. ✅ Invalidate CloudFront cache (clear CDN)
7. ✅ Display deployment summary

### Cache Strategy

The workflow uses optimized cache headers:

```bash
# Static assets - cache forever (immutable)
*.js, *.css, *.svg, *.png, *.jpg, *.woff2
→ Cache-Control: max-age=31536000, public, immutable

# HTML files - short cache with revalidation
*.html
→ Cache-Control: max-age=3600, public, must-revalidate

# Metadata files
robots.txt, sitemap.xml
→ Cache-Control: max-age=86400, public
```

---

## Verify Your Setup

### 1. Check S3 Deployment

1. Go to AWS Console → S3 → Your bucket
2. Click on bucket name
3. Verify files are uploaded:
   - `index.html`
   - `_next/` directory
   - `assets/` directory
   - Static files

### 2. Check CloudFront Distribution

1. Go to AWS Console → CloudFront
2. Click on your distribution
3. Status should be **"Deployed"**
4. Copy the domain name (e.g., `d1234abcdef.cloudfront.net`)
5. Open it in browser - your site should load!

### 3. Check Custom Domain (if configured)

If you added a custom domain:
1. Go to Route 53 or your DNS provider
2. Add CNAME record:
   - **Name:** `www` (or `@` for apex domain)
   - **Value:** Your CloudFront domain
   - **TTL:** 300

---

## Monitoring Deployments

### GitHub Actions
- Go to **Actions** tab in your repository
- View running and completed workflows
- Click on any run for detailed logs

### AWS S3
- AWS Console → S3 → Your bucket
- Check upload timestamps
- View file properties

### AWS CloudFront
- AWS Console → CloudFront → Your distribution
- View **Invalidations** tab for cache clears
- Check **Monitoring** for traffic stats

---

## Cost Estimate

### AWS Free Tier (First 12 Months)
```
✅ S3: 5 GB storage, 20,000 GET, 2,000 PUT
✅ CloudFront: 1 TB data transfer out
✅ 10,000,000 HTTP/HTTPS requests
```

### After Free Tier
```
Monthly cost for moderate traffic (~10K visitors):
- S3 Storage (5 GB): ~$0.12
- S3 Requests: ~$0.50
- CloudFront (50 GB transfer): ~$4.25
- Cache Invalidations: ~$0.10 (1,000 paths free/month)

Total: ~$5/month
```

**Note:** This is significantly cheaper than most hosting providers!

---

## Troubleshooting

### Build Fails
- Check GitHub Actions logs
- Verify all dependencies are in `package.json`
- Run `npm run build` locally to test

### S3 Upload Fails
- Verify AWS credentials are correct
- Check IAM user has S3 permissions
- Verify bucket name matches exactly

### CloudFront Cache Not Clearing
- Check Distribution ID is correct
- Verify IAM user has CloudFront permissions
- Invalidations can take 3-5 minutes

### Website Shows Old Content
- Wait 3-5 minutes for cache invalidation
- Try hard refresh: `Cmd/Ctrl + Shift + R`
- Check CloudFront invalidation status

### 403 Forbidden Error
- Check bucket policy allows public reads
- Verify CloudFront origin settings
- Check S3 bucket permissions

### Custom Domain Not Working
- Verify DNS records are correct
- Check SSL certificate is validated
- CloudFront deployment takes 15-30 minutes

---

## Performance Optimization

### Already Implemented:
✅ CloudFront CDN (global edge locations)
✅ Optimized cache headers
✅ Automatic cache invalidation
✅ Static file compression (gzip/brotli)

### Recommended:
1. **Enable CloudFront compression:**
   - Edit behavior → Compress objects automatically
   
2. **Use CloudFront Functions for redirects:**
   - 301 redirects without Lambda@Edge
   
3. **Set up monitoring:**
   - CloudWatch alarms for 4xx/5xx errors
   - Budget alerts

---

## Security Best Practices

✅ **Already Implemented:**
- HTTPS only (CloudFront)
- Secrets stored in GitHub (encrypted)
- Minimal IAM permissions
- Versioned backups (if enabled)

🔐 **Recommended:**
1. **Enable S3 bucket versioning** (rollback protection)
2. **Set up AWS CloudTrail** (audit logging)
3. **Use CloudFront signed URLs** (for protected content)
4. **Rotate AWS keys every 90 days**
5. **Enable S3 encryption at rest**

---

## Branch Strategy

### Production Branches
- `main` - Primary production branch
- `live` - Live production branch (currently active)

Both trigger automatic deployments to the same S3 bucket.

### Feature Branches
- Create feature branches for development
- Open PRs to merge into `main` or `live`
- CI workflow runs tests without deploying

---

## Rollback Strategy

### Option 1: Redeploy Previous Commit
```bash
# Find the working commit
git log

# Checkout that commit
git checkout <commit-hash>

# Push to trigger deployment
git push origin live
```

### Option 2: Use S3 Versioning (if enabled)
1. Go to AWS Console → S3 → Your bucket
2. Enable "Show versions"
3. Select the version you want
4. Click "Actions" → "Make current version"

### Option 3: Rollback CloudFront Distribution
1. AWS Console → CloudFront → Your distribution
2. Temporarily point to a backup S3 bucket
3. Create invalidation

---

## Advanced: Custom Domain Setup

### 1. Request SSL Certificate

1. Go to **AWS Certificate Manager** (ACM)
2. **Important:** Must be in `us-east-1` region for CloudFront!
3. Click **"Request certificate"**
4. Choose **"Request a public certificate"**
5. Domain names:
   - Add: `yourdomain.com`
   - Add: `www.yourdomain.com`
6. Validation: **DNS validation** (recommended)
7. Request certificate
8. Add CNAME records to your DNS (shown in ACM)
9. Wait for validation (5-30 minutes)

### 2. Update CloudFront Distribution

1. Go to CloudFront → Your distribution → **Edit**
2. **Alternate domain names (CNAMEs):**
   - Add: `yourdomain.com`
   - Add: `www.yourdomain.com`
3. **Custom SSL certificate:**
   - Select your ACM certificate
4. Save changes (takes 10-20 minutes to deploy)

### 3. Update DNS Records

Add these records in your DNS provider (Route 53, Cloudflare, etc.):

```
Type: A (or ALIAS if Route 53)
Name: @ (or yourdomain.com)
Value: Your CloudFront distribution domain

Type: A (or ALIAS if Route 53)
Name: www
Value: Your CloudFront distribution domain
```

Wait for DNS propagation (5 minutes - 48 hours).

---

## Next Steps

1. ✅ Create S3 bucket and CloudFront distribution
2. ✅ Get AWS credentials and distribution ID
3. ✅ Add secrets to GitHub
4. ✅ Push code to trigger deployment
5. ✅ Verify site is live on CloudFront URL
6. 🔧 Optional: Set up custom domain
7. 🔧 Optional: Configure monitoring alerts
8. 🔧 Optional: Set up WAF for security

---

## Support Resources

- **AWS S3 Static Hosting:** https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html
- **AWS CloudFront:** https://docs.aws.amazon.com/cloudfront/
- **GitHub Actions:** https://docs.github.com/actions
- **Next.js Static Export:** https://nextjs.org/docs/pages/building-your-application/deploying/static-exports

---

**Status:** Your CI/CD pipeline is ready! 🚀

Add the AWS secrets to GitHub and push your code to deploy!
