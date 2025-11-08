# Automatic Version Tagging

## Overview
Every merge to `main` branch now automatically:
1. Bumps the **minor version** (e.g., 1.0.0 → 1.1.0 → 1.2.0)
2. Creates a git tag (e.g., v1.1.0)
3. Pushes the tag to GitHub
4. Deploys to S3 + CloudFront

## How It Works

### Version Numbering
- Current version is read from `package.json`
- Format: `MAJOR.MINOR.PATCH`
- Each merge to main increments the MINOR version and resets PATCH to 0
- Example progression: `1.0.0` → `1.1.0` → `1.2.0` → `1.3.0`

### Workflow Process
1. **Checkout code** with full git history
2. **Bump version**: Increment minor version in package.json
3. **Create tag**: Tag the commit with the new version (e.g., `v1.1.0`)
4. **Push changes**: Commit version bump and push tag to GitHub
5. **Build**: Create production build
6. **Deploy**: Upload to S3 and invalidate CloudFront cache

### Commit Message
Version bump commits follow this format:
```
chore: bump version to X.Y.Z [skip ci]
```

The `[skip ci]` flag prevents the CI workflow from triggering on the version bump commit itself.

## Important Notes

### Permissions
The deploy workflow has `contents: write` permission to:
- Commit version changes to package.json
- Create and push git tags

### Viewing Tags
You can view all version tags:
```bash
git tag
```

Or on GitHub: Navigate to **Releases** or **Tags** section

### Manual Version Adjustment
If you need to manually adjust the version:
1. Update `package.json` version field
2. Commit and push to main
3. The workflow will continue from that version

### Skip Version Bump
If you need to deploy without bumping version (not recommended), you would need to:
1. Temporarily modify the workflow
2. Or use a different branch strategy

## CI/CD Workflow Summary

### Workflows Active on Main Branch
1. **CI Build** (`ci.yml`): Runs build and tests
2. **Deploy** (`deploy.yml`): Bumps version, builds, and deploys

### Removed Workflows
- **Lighthouse**: Deleted (was not providing useful metrics)

### No PR Triggers
- No workflows run on pull requests
- All automation happens only on merge to `main`

## Version History
All versions and releases can be viewed:
- GitHub Releases page
- Git tags: `git tag -l`
- GitHub Tags section in the repository

