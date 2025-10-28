# ✅ GitHub Actions Setup Complete

Your Pizza Store Backend API is now equipped with a complete CI/CD pipeline!

## 📦 What Was Created

### Workflow Files (`.github/workflows/`)

1. **`ci.yml`** - Continuous Integration
   - Triggers on pushes and PRs to main/develop
   - Runs tests and builds TypeScript
   - Validates Docker build
   - Tests health endpoint

2. **`release.yml`** - Automated Release Pipeline
   - Triggers on version tags (e.g., `v1.0.0`)
   - Builds and tests application
   - Creates multi-platform Docker images (amd64, arm64)
   - Publishes to npm registry
   - Publishes to GitHub Container Registry
   - Creates GitHub release with changelog

### Documentation Files (`.github/`)

3. **`GETTING_STARTED.md`** - Quick Start Guide
   - 5-minute setup instructions
   - Step-by-step checklist
   - Troubleshooting tips

4. **`NPM_PUBLISHING_SETUP.md`** - npm Publishing Guide
   - How to create npm token
   - How to add token to GitHub secrets
   - Complete setup instructions

5. **`workflows/README.md`** - Workflows Overview
   - Detailed workflow descriptions
   - Configuration options
   - Best practices

### Updated Files

6. **`package.json`** (Updated)
   - Added `"private": false` - Enables npm publishing
   - Added package metadata
   - Added repository information
   - Added `dist` folder configuration

7. **`README.md`** (Updated)
   - Added CI/CD badges
   - Added npm installation instructions
   - Added Docker pull commands
   - Added release workflow documentation

## 🚀 Quick Start

### 1. Repository Settings

Ensure GitHub Actions has the necessary permissions:

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Actions** → **General**
3. Under "Workflow permissions", select:
   - ✅ **Read and write permissions**
4. Save changes

### 2. Add npm Token (Required)

To enable npm publishing:

1. **Generate npm token:**
   - Go to https://www.npmjs.com/settings/YOUR_USERNAME/tokens
   - Generate "Automation" token
   - Copy the token

2. **Add to GitHub:**
   - Go to Settings → Secrets and variables → Actions
   - New repository secret
   - Name: `NPM_TOKEN`
   - Value: paste your token

**See `.github/NPM_PUBLISHING_SETUP.md` for detailed instructions.**

### 3. Create Your First Release

```bash
# Make sure you're on main branch with latest changes
git checkout main
git pull origin main

# Create and push a version tag
git tag v1.0.0 -m "Initial release"
git push origin v1.0.0
```

### 4. Monitor the Release

```bash
# Using GitHub CLI
gh run watch

# Or visit in browser
# https://github.com/J-Pizza/pizza-backend/actions
```

## 📋 What Happens on Release

When you push a tag like `v1.0.0`, the workflow automatically:

1. ✅ Runs all tests
2. ✅ Builds TypeScript application
3. 🐳 Builds Docker images for:
   - linux/amd64
   - linux/arm64
4. 📦 Pushes Docker images with tags:
   - `ghcr.io/j-pizza/pizza-backend:1.0.0`
   - `ghcr.io/j-pizza/pizza-backend:1.0`
   - `ghcr.io/j-pizza/pizza-backend:1`
   - `ghcr.io/j-pizza/pizza-backend:latest`
5. 📦 Publishes to npm as `pizza-store-backend@1.0.0`
6. 📝 Generates changelog from git commits
7. 🎉 Creates GitHub release with all artifacts
8. ✅ Tests Docker image health endpoint

## 🎯 What You'll Get

### npm Package
```bash
npm install pizza-store-backend@1.0.0
```

### Docker Images
```bash
docker pull ghcr.io/j-pizza/pizza-backend:1.0.0
docker run -d -p 3001:3001 ghcr.io/j-pizza/pizza-backend:1.0.0

# Test health
curl http://localhost:3001/health
```

### GitHub Release
- Changelog with all commits
- Installation instructions
- Docker run commands

## 📚 Documentation

- **Quick Start:** `.github/GETTING_STARTED.md` - 5-minute setup
- **npm Setup:** `.github/NPM_PUBLISHING_SETUP.md` - Token configuration
- **Workflows:** `.github/workflows/README.md` - Workflow details

## 🔧 Customization

### Change Node.js Version

Edit both workflow files to use a different Node.js version:

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20'  # Change from 18 to 20
```

### Add Linting

If you add ESLint:

```yaml
- name: Run linter
  run: npm run lint
```

### Add Integration Tests

```yaml
- name: Run integration tests
  run: npm run test:integration
```

## 🎯 Next Steps

### 1. Test CI First

Make a small change and push to trigger CI:

```bash
git checkout -b test-ci
echo "# Test" >> test.txt
git add .
git commit -m "test: trigger CI workflow"
git push origin test-ci
```

Check that CI runs successfully before creating a release.

### 2. Prepare for Release

1. **Merge all features to main**
2. **Ensure CI is passing on main**
3. **Add `NPM_TOKEN` to GitHub secrets** (required!)
4. **Choose version number** (follow semantic versioning)

### 3. Create Release

```bash
git tag v1.0.0 -m "Initial release"
git push origin v1.0.0
```

### 4. Verify Release

After the workflow completes:

1. **Check npm**: `npm view pizza-store-backend`
2. **Check Docker**: `docker pull ghcr.io/j-pizza/pizza-backend:1.0.0`
3. **Check Release**: Visit GitHub Releases page
4. **Test health**: 
   ```bash
   docker run -d -p 3001:3001 ghcr.io/j-pizza/pizza-backend:1.0.0
   curl http://localhost:3001/health
   ```

## ⚠️ Important Notes

### npm Token Required

The release workflow will fail without the `NPM_TOKEN` secret. Make sure to add it before creating a release!

### Health Check Testing

The workflows include automated health check testing to ensure the API is functional:

```bash
curl -f http://localhost:3001/health
```

If the health check fails, the workflow will fail.

### Semantic Versioning

Use semantic versioning for tags:
- **MAJOR** (v2.0.0): Breaking changes
- **MINOR** (v1.1.0): New features, backwards compatible
- **PATCH** (v1.0.1): Bug fixes, backwards compatible

## 🐛 Troubleshooting

### Workflow Not Running?

- Check that Actions are enabled (Settings → Actions)
- Verify tag format is `v1.0.0` (with `v` prefix)
- Ensure you pushed the tag: `git push origin v1.0.0`

### npm Publish Fails?

- Verify `NPM_TOKEN` is set in GitHub secrets
- Check package name is available on npmjs.com
- Ensure `"private": false` in package.json (already set)

### Docker Build Fails?

- Test locally: `docker build -t test .`
- Check Dockerfile syntax
- Verify all dependencies are listed

### Tests Failing?

- Run tests locally: `npm test`
- Check test configuration in package.json
- Ensure test files are included in repository

## ✨ Features

Your new CI/CD pipeline includes:

- ✅ Automated testing on every push/PR
- ✅ TypeScript compilation and validation
- ✅ Multi-platform Docker images (amd64 & arm64)
- ✅ GitHub Container Registry integration
- ✅ npm package publishing
- ✅ Automated changelog generation
- ✅ Health endpoint testing
- ✅ Pre-release support (alpha, beta, rc)
- ✅ Build caching for faster builds
- ✅ Semantic versioning support

## 🎉 You're All Set!

Your GitHub Actions workflows are ready to use. Create your first release with:

```bash
# Add NPM_TOKEN to GitHub secrets first!
# Then:

git tag v1.0.0 -m "Initial release"
git push origin v1.0.0
gh run watch
```

**Happy releasing! 🚀**

