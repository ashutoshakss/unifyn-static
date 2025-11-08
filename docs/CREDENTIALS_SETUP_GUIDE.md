# Complete Credentials Setup Guide - AWS S3 + CloudFront

This guide shows you exactly how to get credentials for AWS S3 and CloudFront, and where to save them.

---

## 🟠 AWS Account Setup

### Step 1: Create AWS Account (if you don't have one)

1. **Go to:** https://aws.amazon.com
2. Click **"Create an AWS Account"**
3. **Required information:**
   - Email address
   - Password
   - AWS account name (e.g., "Unifyn Production")
   - **Credit card** (required even for free tier)
   - Phone number for verification
4. Choose **"Basic support - Free"** plan
5. Complete phone verification
6. Log in to AWS Console: https://console.aws.amazon.com

**Free Tier Benefits (First 12 Months):**
- ✅ 5 GB S3 storage
- ✅ 20,000 GET requests
- ✅ 2,000 PUT requests
- ✅ 1 TB CloudFront data transfer
- ✅ 10 million HTTP/HTTPS requests

---

## 📦 Step 2: Get Your Existing S3 Bucket Details

> **Note:** If you already have CloudFront + S3 set up, you can **skip creating a new bucket** and just get your existing bucket details.

### If You Already Have S3 Bucket (SKIP TO STEP 3)

1. **Log in to AWS Console:** https://console.aws.amazon.com
2. Search for **"S3"** and open it
3. Find your existing bucket in the list
4. **Save these details:**
   - ✅ **Bucket name** (e.g., `unifyn-trade-prod`)
   - ✅ **Region** (click bucket → Properties → check "AWS Region")

**Important:** Your S3 bucket should remain **PRIVATE** (Block all public access enabled). CloudFront will access it via Origin Access Control (OAC), and GitHub Actions will upload via IAM credentials. This is the **secure** setup!

### If You Need to Create a New S3 Bucket

#### A. Create the Bucket

1. **Log in to AWS Console:** https://console.aws.amazon.com
2. In the search bar at top, type **"S3"** and click on it
3. Click the **"Create bucket"** button (orange button, top right)

#### B. Bucket Configuration

**General Configuration:**

4. **Bucket name:** (This is your "bucket ID")
   - Choose a unique name: `unifyn-trade-website` or `unifyn-trade-prod`
   - Must be globally unique (across ALL AWS accounts)
   - Use lowercase letters, numbers, and hyphens only
   - **SAVE THIS NAME** - you'll need it for GitHub secrets!
   
   ```
   Example: unifyn-trade-prod
   ```

5. **AWS Region:** Choose closest to your users
   - US East (N. Virginia) - `us-east-1` **(cheapest, recommended)**
   - US West (Oregon) - `us-west-2`
   - Europe (Ireland) - `eu-west-1`
   - Asia Pacific (Singapore) - `ap-southeast-1`
   - **SAVE THIS REGION** - you'll need it!

**Object Ownership:**
6. Keep default: **"ACLs disabled (recommended)"**

**Block Public Access settings:**
7. ✅ **KEEP "Block all public access" ENABLED** (Recommended for security!)
   - Keep all 4 checkboxes checked
   - CloudFront will access S3 privately via Origin Access Control
   - Public users will access via CloudFront URL only

**Bucket Versioning:**
8. **Enable** bucket versioning (recommended for rollbacks)

**Tags:**
9. Optional: Add tags
   - Key: `Project`, Value: `Unifyn`
   - Key: `Environment`, Value: `Production`

**Default encryption:**
10. **Enable** - Use Amazon S3 managed keys (SSE-S3) - *Free!*

11. Click **"Create bucket"** button

**Your S3 Bucket is ready!** ✅

**Save these values:**
- ✅ Bucket name: `unifyn-trade-prod`
- ✅ Region: `us-east-1`

**NO public bucket policy needed!** Your bucket stays private and secure.

---

## 🌐 Step 3: Get Your Existing CloudFront Distribution Details

> **Note:** If you already have CloudFront set up, just get your distribution details below.

### If You Already Have CloudFront Distribution

1. In AWS Console search bar, type **"CloudFront"** and click on it
2. You'll see your distributions list

**Find and save these values:**

**Distribution ID:**
```
Example: E1234ABCDEFGH
```
**Where:** In the CloudFront distributions list, leftmost column (or click distribution → General tab)

**Distribution domain name:**
```
Example: d1234abcdef.cloudfront.net
```
**Where:** In the distributions list, "Domain name" column

**Save both of these - you'll need them for GitHub secrets!**

### Verify Origin Access Control (OAC) is Set Up

3. Click on your distribution
4. Go to **"Origins"** tab
5. Click on your S3 origin
6. Check **"Origin access"** setting:
   - Should show: **"Origin access control settings (recommended)"**
   - Or: **"Legacy access identities"** (older setup, still works)

This ensures CloudFront can access your private S3 bucket securely! ✅

### If You Need to Create a New CloudFront Distribution

#### A. Create Distribution

1. In AWS Console search bar, type **"CloudFront"** and click on it
2. Click **"Create distribution"** button

#### B. Origin Settings

3. **Origin domain:**
   - Click the dropdown and select your S3 bucket
   - Example: `unifyn-trade-prod.s3.us-east-1.amazonaws.com`
   - (Use bucket endpoint, NOT website endpoint)

4. **Origin access:**
   - Select **"Origin access control settings (recommended)"**
   - Click **"Create control setting"**
   - Keep default name and click **"Create"**

5. **After creating distribution:** AWS will show a banner to update S3 bucket policy
   - Click **"Copy policy"**
   - Go to S3 bucket → Permissions → Bucket policy → Paste and save
   - This allows CloudFront to access your private bucket

#### C. Default Cache Behavior Settings

6. **Path pattern:** Default (*)

7. **Compress objects automatically:** ✅ **Yes** (important for performance!)

8. **Viewer protocol policy:** **Redirect HTTP to HTTPS**

9. **Allowed HTTP methods:** GET, HEAD, OPTIONS

10. **Cache key and origin requests:**
    - Select **"CachingOptimized"**
    - Or customize for better performance

#### D. Settings

11. **Price class:** Choose based on your needs
    - **Use all edge locations** (best performance)
    - Or **Use only North America and Europe** (cheaper)

12. **Alternate domain names (CNAMEs):** Leave empty for now
    - Add your custom domain later (e.g., `www.unifyn.trade`)

13. **Custom SSL certificate:** Default CloudFront certificate
    - If you add custom domain, request ACM certificate first

14. **Supported HTTP versions:** HTTP/2, HTTP/3

15. **Default root object:** `index.html`

16. **Standard logging:** Off (or enable for analytics)

17. **IPv6:** Enabled

18. Click **"Create distribution"**

#### E. Wait for Deployment

19. **Status will show "Deploying"** - This takes 5-15 minutes
20. Wait until status changes to **"Enabled"**

#### F. Update S3 Bucket Policy

21. Copy the policy shown in the CloudFront banner
22. Go to S3 → Your bucket → Permissions → Bucket policy
23. Paste the policy (allows CloudFront OAC to access S3)
24. Save

**Your CloudFront Distribution is ready!** ✅

**Distribution ID and domain name are shown in the distributions list.**

---

## 🔑 Step 4: Create AWS IAM Access Keys

### A. Create IAM User (Recommended) or Use Root Keys (Not Recommended)

**Option 1: Create IAM User (Better Security)**

1. In AWS Console, search for **"IAM"**
2. Click **"Users"** in left sidebar
3. Click **"Create user"**
4. **User name:** `github-actions-deploy`
5. ✅ Check **"Provide user access to the AWS Management Console"** (optional)
6. Click **"Next"**

**Set Permissions:**
7. Select **"Attach policies directly"**
8. Search and check these policies:
   - ✅ **AmazonS3FullAccess**
   - ✅ **CloudFrontFullAccess**
9. Click **"Next"** → **"Create user"**

**Option 2: Use Root Account Keys (Quick but Less Secure)**

Skip to "Create Access Keys" below.

### B. Create Access Keys

1. In IAM Dashboard, click **"Users"** → Click your username
2. Click **"Security credentials"** tab
3. Scroll to **"Access keys"**
4. Click **"Create access key"**

5. **Use case:** Select **"Command Line Interface (CLI)"**
6. ✅ Check the confirmation checkbox
7. Click **"Next"**

8. **Description tag (optional):** `GitHub Actions Deployment`
9. Click **"Create access key"**

### C. Save Your Credentials

10. **🚨 CRITICAL: Copy these NOW - you won't see them again!**

**Access key ID:**
```
Example: AKIAIOSFODNN7EXAMPLE
```

**Secret access key:**
```
Example: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

11. Click **"Download .csv file"** for backup
12. Store the CSV file securely (password manager, encrypted drive)
13. Click **"Done"**

**Your AWS credentials are created!** ✅

---

## 🔐 Step 5: Save Credentials in GitHub

### A. Navigate to GitHub Secrets

1. **Go to your GitHub repository:** https://github.com/your-username/unifyn-static
2. Click **"Settings"** tab (top menu)
3. In the left sidebar, expand **"Secrets and variables"**
4. Click **"Actions"**
5. You should see the "Actions secrets and variables" page

### B. Add Each Secret

Click **"New repository secret"** button for each of these:

---

**Secret 1: AWS Access Key ID**

- Click **"New repository secret"**
- **Name:** `AWS_ACCESS_KEY_ID`
- **Value:** Paste your Access Key ID
  ```
  AKIAIOSFODNN7EXAMPLE
  ```
- Click **"Add secret"**

---

**Secret 2: AWS Secret Access Key**

- Click **"New repository secret"**
- **Name:** `AWS_SECRET_ACCESS_KEY`
- **Value:** Paste your Secret Access Key
  ```
  wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
  ```
- Click **"Add secret"**

---

**Secret 3: S3 Bucket Name**

- Click **"New repository secret"**
- **Name:** `AWS_S3_BUCKET`
- **Value:** Your bucket name (NO s3:// prefix!)
  ```
  unifyn-trade-prod
  ```
- Click **"Add secret"**

---

**Secret 4: AWS Region**

- Click **"New repository secret"**
- **Name:** `AWS_REGION`
- **Value:** Your bucket's region
  ```
  us-east-1
  ```
- Click **"Add secret"**

---

**Secret 5: CloudFront Distribution ID**

- Click **"New repository secret"**
- **Name:** `CLOUDFRONT_DISTRIBUTION_ID`
- **Value:** Your CloudFront Distribution ID
  ```
  E1234ABCDEFGH
  ```
- Click **"Add secret"**

---

### C. Verify All Secrets Are Saved

Your secrets page should show:
```
✓ AWS_ACCESS_KEY_ID
✓ AWS_SECRET_ACCESS_KEY
✓ AWS_S3_BUCKET
✓ AWS_REGION
✓ CLOUDFRONT_DISTRIBUTION_ID
```

**Note:** You can't view secret values after saving (security feature). You can only update or delete them.

**Your GitHub secrets are configured!** ✅

---

## 📋 Quick Reference

| What You Need | Where to Find It | GitHub Secret Name |
|---------------|------------------|-------------------|
| Access Key ID | IAM → Users → Security credentials → Access keys | `AWS_ACCESS_KEY_ID` |
| Secret Access Key | IAM → Created with Access Key | `AWS_SECRET_ACCESS_KEY` |
| S3 Bucket Name | S3 → Your bucket name | `AWS_S3_BUCKET` |
| AWS Region | S3 → Bucket properties | `AWS_REGION` |
| CloudFront Distribution ID | CloudFront → Distributions list | `CLOUDFRONT_DISTRIBUTION_ID` |

---

## ✅ Verify Everything Works

### Test Manual Deployment (Optional)

If you have AWS CLI installed:

```bash
# Configure AWS CLI
aws configure
# Enter: Access Key ID, Secret Key, Region, output format (json)

# Build your site
npm run build

# Test S3 upload (dry run - doesn't actually upload)
aws s3 sync out s3://YOUR-BUCKET-NAME --dryrun

# Test actual S3 upload
aws s3 sync out s3://YOUR-BUCKET-NAME

# Test CloudFront invalidation
aws cloudfront create-invalidation \
  --distribution-id YOUR-DISTRIBUTION-ID \
  --paths "/*"
```

### Test GitHub Actions Deployment

1. Make a small change to your code
2. Commit and push:
   ```bash
   git add .
   git commit -m "Test S3 + CloudFront deployment"
   git push origin live
   ```
3. Go to GitHub → **Actions** tab
4. Watch the workflow run
5. Check for green checkmark ✅

### Verify Live Site

Visit your **CloudFront Distribution URL:**
```
https://d1234abcdef.cloudfront.net
```

Your website should load! 🎉

**Note:** With Origin Access Control, you can only access the site via CloudFront, not directly from S3 (which is the secure way!).

---

## 🚨 Troubleshooting

### Error: "Access Denied" when uploading to S3

**Solution:**
1. Go to IAM → Users → Your user
2. Click "Add permissions" → "Attach policies directly"
3. Add **AmazonS3FullAccess**
4. Save and try again

### Error: "InvalidAccessKeyId"

**Solution:**
- Double-check the Access Key ID in GitHub secrets
- Make sure there are no spaces before/after
- Try regenerating access keys in IAM

### Error: "The specified bucket does not exist"

**Solution:**
- Verify bucket name in GitHub secret matches exactly
- Check you're using bucket name, not ARN or URL
- Example: `unifyn-trade-prod` (NOT `s3://unifyn-trade-prod`)

### Error: "Access Denied" for CloudFront invalidation

**Solution:**
1. Go to IAM → Users → Your user
2. Add **CloudFrontFullAccess** policy
3. Wait 1-2 minutes for propagation

### CloudFront shows "Access Denied"

**Solution:**
- Check S3 bucket policy allows CloudFront OAC to read
- Go to CloudFront → Your distribution → Origins → Edit
- Make sure "Origin access" is set to "Origin access control"
- Copy the policy and add it to S3 bucket → Permissions → Bucket policy
- Make sure distribution is "Enabled" not "Disabled"

### Website shows old content

**Solution:**
- Wait 3-5 minutes for CloudFront invalidation
- Try hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
- Check CloudFront → Invalidations tab for status

---

## 💰 Cost Calculator

### Free Tier (First 12 Months)
```
✅ S3: 5 GB storage + 20,000 GET + 2,000 PUT
✅ CloudFront: 1 TB transfer + 10M requests
✅ Estimated 500K page views/month: FREE
```

### After Free Tier (Example: 50K visitors/month)
```
S3 Storage (5 GB):           $0.12
S3 Requests:                 $0.50
CloudFront (50 GB transfer): $4.25
CloudFront Requests:         $0.10
--------------------------------------
Total:                       ~$5/month
```

Much cheaper than Netlify/Vercel Pro! 💰

---

## 🔒 Security Checklist

✅ **Complete these security steps:**

1. **Enable MFA on AWS account**
   - AWS Console → Security credentials → MFA

2. **Use IAM user (not root keys)**
   - Create dedicated user for deployments
   - Give minimal required permissions

3. **Rotate access keys every 90 days**
   - IAM → Users → Security credentials
   - Deactivate old keys, create new ones

4. **Enable CloudTrail logging**
   - AWS Console → CloudTrail
   - Track all API calls

5. **Set up billing alerts**
   - AWS Console → Billing → Budgets
   - Get notified if costs exceed $5

6. **Enable S3 bucket versioning**
   - Protection against accidental deletions

---

## 🎯 Next Steps

1. ✅ Create S3 bucket and CloudFront distribution
2. ✅ Get AWS credentials
3. ✅ Save all 5 secrets in GitHub
4. ✅ Push code to trigger deployment
5. ✅ Verify site loads on CloudFront URL
6. 🔧 Optional: Set up custom domain
7. 🔧 Optional: Configure WAF (firewall)
8. 🔧 Optional: Set up monitoring alerts

---

## 📞 Support Resources

- **AWS S3 Docs:** https://docs.aws.amazon.com/s3/
- **AWS CloudFront Docs:** https://docs.aws.amazon.com/cloudfront/
- **GitHub Actions Docs:** https://docs.github.com/actions
- **AWS Support:** https://console.aws.amazon.com/support/

---

**You're all set! 🚀**

Your credentials are configured. Now push your code and watch it deploy automatically!
