# GitHub Actions Workflows

This directory contains automated workflows for the Pizza Store Backend API.

## Available Workflows

### 1. CI Workflow (`ci.yml`)

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

**What it does:**
- Installs dependencies and runs tests
- Builds the TypeScript application
- Validates Docker build
- Tests Docker image health check
- Reports build output

**Purpose:** Ensures code quality and catches issues early in development.

### 2. Release Workflow (`release.yml`)

**Triggers:**
- Push of version tags (e.g., `v1.0.0`, `v2.1.3`)

**What it does:**
- Runs all CI checks
- Builds and pushes multi-platform Docker images to GitHub Container Registry
- Publishes package to npm
- Creates GitHub release with changelog and installation instructions
- Tests Docker image functionality

**Purpose:** Automates the entire release process.

## Quick Start

### Running CI

CI runs automatically on every push and pull request. No manual action needed!

### Creating a Release

```bash
# Create and push a version tag
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

The release workflow will run automatically.

## Workflow Permissions

Both workflows use minimal required permissions:

**CI Workflow:**
- `contents: read` - Read repository contents
- `pull-requests: read` - Read PR information

**Release Workflow:**
- `contents: write` - Create releases and tags
- `packages: write` - Push Docker images to GitHub Container Registry
- `id-token: write` - OIDC token for secure authentication

## Secrets Required

### For npm Publishing

- `NPM_TOKEN` - npm automation token (required for publishing to npm registry)

See `.github/NPM_PUBLISHING_SETUP.md` for detailed setup instructions.

## Artifacts

### CI Workflow

- Build output (retained for 1 day)
- Docker health check results in job summary

### Release Workflow

- Docker images in GitHub Container Registry
- npm package on npmjs.com
- Build artifacts (retained for 1 day)
- GitHub release with changelog

## Customization

### Changing Node.js Version

Edit the `node-version` in both workflows:

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20'  # Change from 18 to 20
```

### Adding More Tests

Update the test step in workflows:

```yaml
- name: Run tests
  run: npm test

- name: Run integration tests
  run: npm run test:integration

- name: Run linting
  run: npm run lint
```

### Changing Docker Platforms

Edit the `platforms` in the release workflow:

```yaml
- name: Build and push Docker image
  uses: docker/build-push-action@v5
  with:
    platforms: linux/amd64,linux/arm64,linux/arm/v7  # Add more platforms
```

## Monitoring

### View Workflow Runs

1. Go to your repository on GitHub
2. Click the "Actions" tab
3. Select a workflow from the left sidebar
4. Click on a specific run to see details

### Workflow Status Badge

Add to your README.md:

```markdown
![CI](https://github.com/J-Pizza/pizza-backend/workflows/CI/badge.svg)
![Release](https://github.com/J-Pizza/pizza-backend/workflows/Release/badge.svg)
```

## Troubleshooting

### CI Failures

**Build errors:**
```bash
npm run build
```

**Test failures:**
```bash
npm test
```

### Release Failures

**Docker build issues:**
```bash
docker build -t test .
```

**npm publish errors:**
- Verify `NPM_TOKEN` is set in GitHub secrets
- Check package name is available on npmjs.com
- Ensure `"private": false` in package.json

### Permission Errors

Make sure your repository settings allow:
1. Go to Settings → Actions → General
2. Workflow permissions → Read and write permissions
3. Allow GitHub Actions to create and approve pull requests (optional)

## Best Practices

1. **Always run CI before releasing**
   - Wait for CI to pass on main branch
   - Fix any issues before creating a release tag

2. **Use semantic versioning**
   - Major: Breaking changes (v2.0.0)
   - Minor: New features (v1.1.0)
   - Patch: Bug fixes (v1.0.1)

3. **Test locally first**
   ```bash
   npm test
   npm run build
   docker build -t test .
   docker run -p 3001:3001 test
   curl http://localhost:3001/health
   ```

4. **Write good commit messages**
   - They become your changelog
   - Be descriptive and clear

5. **Use pre-releases for testing**
   - `v1.0.0-beta.1`
   - `v1.0.0-rc.1`

## Health Check Testing

The workflows include automated health check testing:

```bash
# Build and test Docker image
docker build -t test .
docker run -d --name test -p 3001:3001 test
sleep 5
curl -f http://localhost:3001/health
docker stop test && docker rm test
```

This ensures the API is functional before publishing.

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Docker Build Push Action](https://github.com/docker/build-push-action)
- [npm Publishing Guide](https://docs.npmjs.com/cli/v9/commands/npm-publish)

