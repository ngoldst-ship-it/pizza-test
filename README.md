# 🍕 Pizza Store Backend API

A RESTful API backend for the Pizza Store application built with Node.js, Express, and TypeScript.

![CI](https://github.com/J-Pizza/pizza-backend/workflows/CI/badge.svg)
![Release](https://github.com/J-Pizza/pizza-backend/workflows/Release/badge.svg)

## Features

- RESTful API endpoints
- TypeScript support
- CORS enabled
- Security best practices (Helmet middleware)
- Docker support with health checks
- Hot-reload development environment
- Automated CI/CD with GitHub Actions
- Multi-platform Docker images (amd64, arm64)
- Published to npm registry

## 📦 Installation

### From npm

```bash
npm install pizza-store-backend
```

### From Source

```bash
# Clone the repository
git clone git@github.com:J-Pizza/pizza-backend.git
cd pizza-backend

# Install dependencies
npm install

# Create environment file (optional)
cp .env.example .env
```

### From Docker

```bash
docker pull ghcr.io/j-pizza/pizza-backend:latest
docker run -d -p 3001:3001 ghcr.io/j-pizza/pizza-backend:latest
```

## Getting Started

### Development

```bash
# Start development server with hot-reload
npm run dev
```

The server will start on `http://localhost:3001`

### Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Scripts

- `npm run dev` - Start development server with nodemon
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run production build
- `npm test` - Run tests

## API Endpoints

### Health Check

#### GET /health
Check API health status

**Response:**
```json
{
  "status": "OK",
  "message": "Pizza Store API is running"
}
```

### Menu

#### GET /api/menu
Get all available pizzas

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "name": "Margherita",
      "unitPrice": 12,
      "soldOut": false,
      "ingredients": ["tomato", "mozzarella", "basil"],
      "imageUrl": "..."
    }
  ]
}
```

### Orders

#### POST /api/order
Create a new order

**Request Body:**
```json
{
  "customer": "John Doe",
  "phone": "123-456-7890",
  "address": "123 Main St",
  "cart": [
    {
      "pizzaId": 1,
      "name": "Margherita",
      "quantity": 2,
      "unitPrice": 12,
      "totalPrice": 24
    }
  ],
  "priority": false,
  "position": {
    "latitude": 40.7128,
    "longitude": -74.0060
  }
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "id": "uuid",
    "customer": "John Doe",
    "orderPrice": 24,
    "priorityPrice": 0,
    "totalPrice": 24,
    "estimatedDelivery": "2024-01-01T12:45:00Z",
    "status": "preparing",
    "createdAt": "2024-01-01T12:00:00Z",
    ...
  }
}
```

#### GET /api/order/:orderId
Get order by ID

**Response:**
```json
{
  "status": "success",
  "data": {
    "id": "uuid",
    "customer": "John Doe",
    "status": "preparing",
    ...
  }
}
```

#### PATCH /api/order/:orderId
Update order (priority or status)

**Request Body:**
```json
{
  "priority": true,
  "status": "ready"
}
```

## Technologies

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **TypeScript** - Type-safe JavaScript
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger
- **UUID** - Unique ID generation
- **Nodemon** - Development auto-reload

## 🐳 Docker

### Using Pre-built Images

```bash
# Pull from GitHub Container Registry
docker pull ghcr.io/j-pizza/pizza-backend:latest
docker run -d -p 3001:3001 --name pizza-backend ghcr.io/j-pizza/pizza-backend:latest

# Check health
curl http://localhost:3001/health
```

### Build Locally

```bash
docker build -t pizza-store-backend .
docker run -p 3001:3001 pizza-store-backend
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 🚀 CI/CD

This project uses GitHub Actions for automated continuous integration and deployment.

### Workflows

- **CI Workflow**: Runs on every push and pull request
  - Runs tests
  - Builds TypeScript
  - Validates Docker build
  - Tests health endpoint

- **Release Workflow**: Triggers on version tags (e.g., `v1.0.0`)
  - Runs all tests
  - Builds and publishes to npm
  - Builds and pushes multi-platform Docker images
  - Creates GitHub release with changelog

### Creating a Release

```bash
# Create and push a version tag
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

The release workflow will automatically:
- Publish to npm registry
- Build Docker images for amd64 and arm64
- Publish to GitHub Container Registry (ghcr.io)
- Create GitHub release with changelog

**First time?** See [.github/NPM_PUBLISHING_SETUP.md](.github/NPM_PUBLISHING_SETUP.md) for setup instructions.

See [.github/GETTING_STARTED.md](.github/GETTING_STARTED.md) for quick start guide.

## License

MIT
