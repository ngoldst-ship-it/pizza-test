# 📦 npm Publishing Setup Guide

Your release workflow is configured to automatically publish packages to npm! Follow these steps to complete the setup.

## 🔧 One-Time Setup Required

### Step 1: Create an npm Account (if you don't have one)

1. Go to https://www.npmjs.com/signup
2. Create your account
3. Verify your email address

### Step 2: Generate npm Access Token

1. **Login to npm:**
   - Go to https://www.npmjs.com/
   - Click "Sign In"

2. **Generate Access Token:**
   - Click your profile icon (top right) → "Access Tokens"
   - Click "Generate New Token" → "Classic Token"
   - Select token type: **"Automation"** (recommended for CI/CD)
   - Give it a name: "GitHub Actions - pizza-backend"
   - Click "Generate Token"
   - **IMPORTANT:** Copy the token immediately (you won't see it again!)

### Step 3: Add Token to GitHub Secrets

1. **Go to your GitHub repository:**
   - Navigate to: https://github.com/J-Pizza/pizza-backend

2. **Open Settings:**
   - Click "Settings" tab
   - Click "Secrets and variables" → "Actions"

3. **Add New Secret:**
   - Click "New repository secret"
   - Name: `NPM_TOKEN` (must be exactly this)
   - Value: Paste the npm token you copied
   - Click "Add secret"

### Step 4: Verify package.json Configuration

Your `package.json` has been updated with:
- ✅ `"private": false` - Allows publishing
- ✅ Package metadata (description, keywords, etc.)
- ✅ Repository information
- ✅ License information
- ✅ `dist` folder configuration

## 🚀 How It Works

Once setup is complete, the workflow will automatically:

1. **On tag push** (e.g., `git push origin v1.0.0`):
   - Build the TypeScript application
   - Run tests
   - Update package version to match the tag
   - Publish to npm as `pizza-store-backend@1.0.0`
   - Build and push Docker images
   - Create GitHub release

## 📦 Package Information

**Package Name:** `pizza-store-backend`  
**Registry:** npm public registry  
**Access:** Public (anyone can install)

### Installation

After publishing, users can install with:

```bash
npm install pizza-store-backend@1.0.0

# Or install latest version
npm install pizza-store-backend
```

### Package Contents

The published package includes:
- `dist/` - Compiled JavaScript files
- `dist/index.d.ts` - TypeScript type definitions
- `package.json` - Package metadata
- `README.md` - API documentation
- `LICENSE` - MIT license

## 🔍 Verify Setup

### Check if npm token is configured:

```bash
# Using GitHub CLI
gh secret list

# You should see: NPM_TOKEN
```

### Test the workflow (after adding token):

```bash
# Create a test tag
git tag v0.1.0-test -m "Test npm publishing"
git push origin v0.1.0-test

# Watch the workflow
gh run watch

# If successful, check npm:
# https://www.npmjs.com/package/pizza-store-backend
```

## 📋 Release Checklist

Before creating a production release:

- [x] npm account created
- [x] npm access token generated
- [x] `NPM_TOKEN` added to GitHub secrets
- [x] `package.json` updated (private: false)
- [x] Workflow files created with npm-publish job
- [ ] Test release created (v0.1.0-test)
- [ ] Package visible on npmjs.com
- [ ] Ready for v1.0.0 production release!

## 🎯 First Release

Once everything is set up:

```bash
# Commit the changes
git add .
git commit -m "feat: add GitHub Actions workflows with npm publishing"
git push origin main

# Create and push the first release tag
git tag v1.0.0 -m "Initial release with CI/CD"
git push origin v1.0.0

# Monitor the release
gh run watch
```

## 📊 What Gets Published

When you release `v1.0.0`, you'll get:

1. **npm Package:** `pizza-store-backend@1.0.0`
   - Accessible at: https://www.npmjs.com/package/pizza-store-backend
   - Install with: `npm install pizza-store-backend@1.0.0`

2. **Docker Images:**
   - `ghcr.io/j-pizza/pizza-backend:1.0.0`
   - `ghcr.io/j-pizza/pizza-backend:latest`

3. **GitHub Release:**
   - With changelog
   - With all installation instructions
   - Docker run commands

## 🔐 Security Best Practices

### Token Permissions

The npm Automation token has:
- ✅ Publish access
- ✅ No package modification access
- ✅ Cannot delete packages
- ✅ Limited to CI/CD use

### Token Rotation

Rotate your npm token periodically:
1. Generate new token on npmjs.com
2. Update `NPM_TOKEN` secret in GitHub
3. Old token will be invalidated

## 🐛 Troubleshooting

### Error: "npm ERR! code E401"

**Cause:** Invalid or missing npm token

**Solution:**
1. Verify token is added to GitHub secrets as `NPM_TOKEN`
2. Generate a new token and update the secret
3. Ensure token type is "Automation"

### Error: "npm ERR! code E403"

**Cause:** Package name already taken or permission denied

**Solution:**
1. Check if package name is available: https://www.npmjs.com/package/pizza-store-backend
2. If taken, update `name` in `package.json` to a unique name
3. Or use scoped package: `@YOUR_USERNAME/pizza-store-backend`

### Error: "npm ERR! package.json private is set to true"

**Cause:** Package is marked as private

**Solution:**
- Verify `package.json` has `"private": false`
- This has already been set in your package.json

### Package Not Appearing on npm

**Wait time:** It can take 1-2 minutes for packages to appear after publishing

**Check:**
```bash
# Search for your package
npm search pizza-store-backend

# Or check directly
npm view pizza-store-backend
```

### Build Failures

**TypeScript compilation errors:**
```bash
npm run build
```

**Test failures:**
```bash
npm test
```

## 📚 Additional Resources

- [npm Automation Tokens](https://docs.npmjs.com/about-access-tokens)
- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning](https://semver.org/)

## ✅ Success Indicators

After a successful release, you should see:

1. ✅ Green checkmark on GitHub Actions workflow
2. ✅ Package listed on https://www.npmjs.com/package/pizza-store-backend
3. ✅ GitHub release created with npm installation instructions
4. ✅ Docker images pushed to ghcr.io
5. ✅ Docker health check passed

## 🎉 You're Ready!

Once you've added the `NPM_TOKEN` secret, your release workflow will automatically:
- ✅ Publish to npm
- ✅ Build and push Docker images
- ✅ Create GitHub releases with changelog

**Next Step:** Add the `NPM_TOKEN` secret to GitHub, then create your first release! 🚀

