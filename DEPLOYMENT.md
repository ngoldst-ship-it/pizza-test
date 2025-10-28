# Deployment Guide

This guide covers deploying the Pizza Store Backend API in various environments.

## Docker Deployment

### Building the Docker Image

```bash
docker build -t pizza-store-backend:latest .
```

### Running the Container

```bash
# Basic run
docker run -p 3001:3001 pizza-store-backend:latest

# With environment variables
docker run -p 3001:3001 \
  -e PORT=3001 \
  -e NODE_ENV=production \
  pizza-store-backend:latest

# Run in detached mode
docker run -d -p 3001:3001 --name pizza-backend pizza-store-backend:latest
```

### Docker Compose

Create a `docker-compose.yml`:

```yaml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - PORT=3001
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "node", "-e", "require('http').get('http://localhost:3001/health')"]
      interval: 30s
      timeout: 3s
      retries: 3
```

Run with:
```bash
docker-compose up -d
```

## Production Deployment

### Environment Variables

Set the following environment variables:

- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (production/development)

### Health Checks

The API provides a health check endpoint at `/health` that returns:

```json
{
  "status": "OK",
  "message": "Pizza Store API is running"
}
```

### Security Considerations

- Uses Helmet for secure HTTP headers
- Runs as non-root user in Docker
- CORS enabled (configure for production)
- Error details hidden in production

## Cloud Platforms

### Heroku

```bash
heroku create pizza-backend
heroku container:push web
heroku container:release web
```

### AWS ECS / Azure Container Instances / GCP Cloud Run

Build and push the Docker image to your container registry, then deploy using your platform's container service.

## Monitoring

- Check `/health` endpoint for uptime monitoring
- Review application logs for errors
- Monitor HTTP request logs (Morgan)

## Scaling

The application is stateless (except in-memory orders) and can be scaled horizontally. For production, replace the in-memory order storage with a database.
