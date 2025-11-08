# How GitHub Actions Deploys to Private S3 Bucket

## Your Current Setup (Secure ✅)

```
[GitHub Actions] → [AWS IAM Credentials] → [Private S3 Bucket]
                                                    ↓
[Public Users] → [CloudFront CDN] → [Origin Access Control] → [Private S3]
```

### Key Points:

1. **S3 Bucket is PRIVATE** ✅
   - Block all public access enabled
   - No public bucket policy
   - Only CloudFront can read via Origin Access Control (OAC)

2. **GitHub Actions Uploads via AWS API** ✅
   - Uses IAM credentials (Access Key + Secret Key)
   - Authenticated AWS API calls to S3
   - Does NOT need public access
   - IAM user needs these permissions:
     - `s3:PutObject` - Upload files
     - `s3:GetObject` - Read files (optional)
     - `s3:DeleteObject` - Delete old files
     - `s3:ListBucket` - List bucket contents

3. **CloudFront Serves Publicly** ✅
   - CloudFront has special permission via OAC
   - Public users access via CloudFront URL only
   - CloudFront fetches from private S3

---

## What You Need for GitHub Actions

### Required GitHub Secrets:
```
AWS_ACCESS_KEY_ID        → IAM user credentials
AWS_SECRET_ACCESS_KEY    → IAM user credentials
AWS_S3_BUCKET            → Your bucket name
AWS_REGION               → Bucket region
CLOUDFRONT_DISTRIBUTION_ID → For cache invalidation
```

### IAM Permissions Needed:

Your IAM user needs these policies attached:

**Option 1: Use AWS Managed Policies (Easier)**
- `AmazonS3FullAccess` - Full S3 access
- `CloudFrontFullAccess` - For cache invalidation

**Option 2: Custom Policy (More Secure)**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "S3DeployAccess",
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
      "Sid": "CloudFrontInvalidation",
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

## How the Deployment Works

### GitHub Actions Workflow Steps:

1. **Build the site**
   ```bash
   npm run build
   # Creates 'out' directory with static files
   ```

2. **Configure AWS credentials**
   ```yaml
   - uses: aws-actions/configure-aws-credentials@v4
     with:
       aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
       aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
       aws-region: ${{ secrets.AWS_REGION }}
   ```

3. **Upload to S3 (authenticated)**
   ```bash
   # GitHub Actions uses AWS SDK with IAM credentials
   aws s3 sync out s3://YOUR-BUCKET \
     --delete \
     --cache-control "max-age=31536000,public,immutable" \
     --exclude "*.html"
   
   # This uses authenticated AWS API - NOT public access!
   ```

4. **Invalidate CloudFront cache**
   ```bash
   aws cloudfront create-invalidation \
     --distribution-id YOUR-DISTRIBUTION-ID \
     --paths "/*"
   # Clears CDN cache so users get new content
   ```

---

## Why Your S3 Doesn't Need to be Public

### Authentication Methods:

**GitHub Actions → S3:**
- Uses **IAM credentials** (API authentication)
- Not public HTTP access
- Like logging in with username/password

**CloudFront → S3:**
- Uses **Origin Access Control** (OAC)
- Special permission via bucket policy
- Not public access

**Public Users → CloudFront:**
- Only way to access your site
- CloudFront fetches from S3 privately
- Users never touch S3 directly

---

## Verify Your Setup is Correct

### Check S3 Bucket is Private:

1. Go to AWS Console → S3 → Your bucket
2. Click **"Permissions"** tab
3. Check **"Block public access"**:
   ```
   ✅ Block all public access: ON
     ✅ Block public access to buckets and objects granted through new access control lists (ACLs)
     ✅ Block public access to buckets and objects granted through any access control lists (ACLs)
     ✅ Block public access to buckets and objects granted through new public bucket or access point policies
     ✅ Block public and cross-account access to buckets and objects through any public bucket or access point policies
   ```

4. Check **"Bucket policy"**:
   - Should have a policy that allows CloudFront OAC to read
   - Should NOT have `"Principal": "*"` for `GetObject`

### Example Correct Bucket Policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontServicePrincipal",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::YOUR-ACCOUNT-ID:distribution/YOUR-DISTRIBUTION-ID"
        }
      }
    }
  ]
}
```

**Note:** This allows ONLY CloudFront (not public) to read from S3.

---

## Common Questions

### Q: Will GitHub Actions fail if S3 is private?
**A:** No! GitHub Actions uses AWS IAM credentials, not public access. It will work perfectly with a private bucket.

### Q: Do I need static website hosting enabled on S3?
**A:** No! When using CloudFront with OAC, you access S3 as an object storage (not as a website). Static website hosting is not needed.

### Q: How do I test if my bucket is private?
**A:** Try accessing a file directly via S3 URL:
```
https://YOUR-BUCKET.s3.amazonaws.com/index.html
```
You should get **"Access Denied"** - that's correct! ✅

Access via CloudFront should work:
```
https://YOUR-DISTRIBUTION.cloudfront.net/
```

### Q: What if I accidentally made my bucket public?
**A:** You can make it private again:
1. S3 → Your bucket → Permissions
2. Enable "Block all public access"
3. Remove public bucket policy (keep CloudFront OAC policy)
4. CloudFront and GitHub Actions will still work!

---

## Security Best Practices

✅ **Your Current Setup (Recommended):**
- Private S3 bucket
- CloudFront with Origin Access Control
- GitHub Actions with IAM credentials
- Minimal IAM permissions

❌ **Avoid This (Less Secure):**
- Public S3 bucket
- Direct S3 website hosting URLs
- Overly permissive IAM policies
- Root account credentials

---

## Summary

**You do NOT need to make S3 public!**

Your setup is correct:
1. ✅ S3 bucket is private
2. ✅ CloudFront accesses S3 via OAC (secure)
3. ✅ GitHub Actions uploads via IAM credentials (authenticated)
4. ✅ Public users access via CloudFront only

The GitHub Actions workflow I created will work perfectly with your private S3 bucket! 🎉

---

## Next Steps

1. ✅ Keep your S3 bucket private (don't change it!)
2. ✅ Get your existing S3 bucket name and CloudFront distribution ID
3. ✅ Create IAM access keys
4. ✅ Add 5 secrets to GitHub
5. ✅ Push code to deploy

Your secure setup will work perfectly! 🚀

