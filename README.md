# Energy Management App

## Architecture

This project uses a microservices architecture with the following components hosted on GitLab:

- **[API Gateway](https://gitlab.com/sd2025_30643_moga_eduard/api-gateway)** - Main entry point (Port 8100)
- **[Auth Microservice](https://gitlab.com/sd2025_30643_moga_eduard/auth-microservice)** - Authentication service (Port 8082)
- **[Device Microservice](https://gitlab.com/sd2025_30643_moga_eduard/device-microservice)** - Device management (Port 8080)
- **[User Microservice](https://gitlab.com/sd2025_30643_moga_eduard/user-microservice)** - User management (Port 8081)
- **[Frontend](https://gitlab.com/sd2025_30643_moga_eduard/frontend)** - React frontend

## Getting Started

Clone this repository with submodules:
```bash
git clone --recursive https://github.com/MichiMauser/Energy-Management-App.git
cd Energy-Management-App
```

## Docker Deployment

The application uses Docker Compose to orchestrate all microservices and their databases.

### Prerequisites

- Docker
- Docker Compose

### Services Overview

The stack includes:

**Databases:**
- `user-db` - MySQL 8.1 (Port 3307)
- `device-db` - MySQL 8.1 (Port 3308)
- `auth-db` - MySQL 8.1 (Port 3309)

**Microservices:**
- `api-gateway` - API Gateway (Port 8100)
- `auth-microservice` - Authentication Service (Port 8082)
- `user-microservice` - User Management (Port 8081)
- `device-microservice` - Device Management (Port 8080)

### Starting the Application

Build and start all services:
```bash
docker-compose up --build
```

Run in detached mode:
```bash
docker-compose up -d
```

### Stopping the Application
```bash
docker-compose down
```

To remove volumes (this will delete all data):
```bash
docker-compose down -v
```

### Exposed Ports

| Service | Port | Description |
|---------|------|-------------|
| API Gateway | 8100 | Main application entry point |
| Auth Microservice | 8082 | Authentication endpoints |
| User Microservice | 8081 | User management endpoints |
| Device Microservice | 8080 | Device management endpoints |
| User Database | 3307 | MySQL database for users |
| Device Database | 3308 | MySQL database for devices |
| Auth Database | 3309 | MySQL database for authentication |

### Health Checks

All microservices include health check endpoints available at:
- `http://localhost:8080/actuator/health` (Device)
- `http://localhost:8081/actuator/health` (User)
- `http://localhost:8082/actuator/health` (Auth)

### Troubleshooting

Check service logs:
```bash
docker-compose logs -f [service-name]
```

Restart a specific service:
```bash
docker-compose restart [service-name]
```

View running containers:
```bash
docker-compose ps
```