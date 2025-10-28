# 🚀 Getting Started with GitHub Actions

**You're just a few steps away from automated releases!**

## 📝 Pre-Release Checklist

Before creating your first release:

- [ ] Set workflow permissions (see below)
- [ ] **Add npm token to GitHub secrets** (see `.github/NPM_PUBLISHING_SETUP.md`)
- [ ] Test locally with `npm test` and `npm run build`
- [ ] Test Docker build locally
- [ ] Choose your first version number

## ⚡ 5-Minute Setup

### Step 1: Configure Repository Settings (2 minutes)

1. Go to your GitHub repository
2. Click **Settings** → **Actions** → **General**
3. Scroll to "Workflow permissions"
4. Select **Read and write permissions**
5. Click **Save**

### Step 2: Add npm Token (2 minutes)

Follow the guide in `.github/NPM_PUBLISHING_SETUP.md` to:
1. Generate npm automation token
2. Add `NPM_TOKEN` to GitHub secrets

> **Important:** The workflows will fail without this token!

### Step 3: Test CI (1 minute)

```bash
# Make a small change
git checkout main
echo "# CI Test" >> .github/test.txt
git add .
git commit -m "test: trigger CI"
git push origin main

# Watch the CI workflow
gh run watch
# OR visit: https://github.com/J-Pizza/pizza-backend/actions
```

### Step 4: Create Your First Release (1 minute)

```bash
# Create and push version tag
git tag v1.0.0 -m "Initial release"
git push origin v1.0.0

# Watch the release workflow
gh run watch
```

**That's it! Your release is being built! 🎉**

## 🎯 What to Expect

### During Release (3-5 minutes)

The workflow will:
1. ✅ Run tests and build TypeScript
2. 🐳 Build Docker images (amd64 + arm64)
3. 📦 Publish to npm registry
4. 🎉 Create GitHub release with changelog

### After Release

You'll have:
- **Docker Image**: `ghcr.io/j-pizza/pizza-backend:1.0.0`
- **npm Package**: `pizza-store-backend@1.0.0`
- **GitHub Release**: With changelog and installation instructions

## 🧪 Test Your Release

```bash
# Test npm package
npm install pizza-store-backend@1.0.0

# Test Docker image
docker pull ghcr.io/j-pizza/pizza-backend:1.0.0
docker run -d -p 3001:3001 ghcr.io/j-pizza/pizza-backend:1.0.0

# Test health endpoint
curl http://localhost:3001/health
```

## 📚 Learn More

- **Complete Setup**: `.github/NPM_PUBLISHING_SETUP.md`
- **Workflows**: `.github/workflows/README.md`
- **Troubleshooting**: See below

## 🆘 Need Help?

### CI Not Running?

Check that:
- [ ] Changes are pushed to `main` or `develop` branch
- [ ] Actions are enabled (Settings → Actions)

### Release Not Creating?

Check that:
- [ ] Tag format is `v1.0.0` (with `v` prefix)
- [ ] Tag is pushed: `git push origin v1.0.0`
- [ ] Workflow permissions are set correctly
- [ ] `NPM_TOKEN` is added to GitHub secrets

### Quick Debug Commands

```bash
# View recent workflow runs
gh run list --limit 5

# View specific run details
gh run view

# View logs for failed run
gh run view --log-failed
```

## 💡 Pro Tips

1. **Use Semantic Versioning**
   - `v1.0.0` → `v1.0.1` (bug fixes)
   - `v1.0.0` → `v1.1.0` (new features)
   - `v1.0.0` → `v2.0.0` (breaking changes)

2. **Write Good Commit Messages**
   - They become your changelog!
   - Use: `feat:`, `fix:`, `docs:`, `chore:`

3. **Test Locally First**
   ```bash
   npm test
   npm run build
   docker build -t test .
   docker run -d -p 3001:3001 test
   curl http://localhost:3001/health
   ```

4. **Use Pre-releases for Testing**
   ```bash
   git tag v1.0.0-beta.1 -m "Beta release"
   git push origin v1.0.0-beta.1
   ```

## 🎉 Ready to Release?

```bash
# Add npm token to GitHub secrets first!
# Then:

git tag v1.0.0 -m "Initial release"
git push origin v1.0.0
gh run watch
```

**Welcome to automated releases! 🚀**

