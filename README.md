# Energy Management App

## Architecture

This project uses a microservices architecture with the following components hosted on GitLab:

- **[API Gateway](https://gitlab.com/sd2025_30643_moga_eduard/api-gateway)** - Main entry point
- **[Auth Microservice](https://gitlab.com/sd2025_30643_moga_eduard/auth-microservice)** - Authentication service
- **[Device Microservice](https://gitlab.com/sd2025_30643_moga_eduard/device-microservice)** - Device management
- **[User Microservice](https://gitlab.com/sd2025_30643_moga_eduard/user-microservice)** - User management  
- **[Frontend](https://gitlab.com/sd2025_30643_moga_eduard/frontend)** - React frontend

## Getting Started

Clone this repository with submodules:
```bash
git clone --recursive https://github.com/MichiMauser/Energy-Management-App.git
```




Microservices Project Deployment

This document provides instructions for deploying the microservices application stack using Docker Compose.

Overview

This project consists of a microservice architecture comprised of:

API Gateway: The single entry point for all client requests.

Auth Microservice: Handles authentication and authorization.

User Microservice: Manages user data.

Device Microservice: Manages device data.

Each microservice has its own dedicated MySQL database, and the entire stack is orchestrated using the provided docker-compose.yml file.

Prerequisites

Before you begin, ensure you have the following installed on your system:

Docker

Docker Compose

Project Structure

This docker-compose.yml file assumes the following directory structure:

.
├── docker-compose.yml
├── api-gateway/
│   └── Dockerfile
├── auth-microservice/
│   └── Dockerfile
├── device-microservice/
│   └── Dockerfile
└── user-microservice/
    └── Dockerfile



How to Run

Build and Start Services:
Open a terminal in the root directory (where docker-compose.yml is located) and run:

docker-compose up -d --build



This command will build the images for the API gateway and microservices and then start all services in detached mode.

Check Service Status:
To see the status of your running containers:

docker-compose ps



View Logs:
To view the logs for all services in real-time:

docker-compose logs -f



To view logs for a specific service (e.g., api-gateway):

docker-compose logs -f api-gateway



Stop Services:
To stop and remove all running containers, networks, and volumes:

docker-compose down



If you want to remove the named volumes (database data) as well, use:

docker-compose down -v



Service & Port Configuration

The application will be accessible through the API Gateway on the host machine.

Application Services

|

| Service | Host Port | Container Port | Health Check |
| api-gateway | 8100 | 8100 | N/A |
| auth-microservice | 8082 | 8082 | http://localhost:8082/actuator/health |
| device-microservice | 8080 | 8080 | http://localhost:8080/actuator/health |
| user-microservice | 8081 | 8081 | http://localhost:8081/actuator/health |

Database Services

| Service | Host Port | DB Name | DB User | DB Password |
| auth-db | 3309 | auth_db | auth | root |
| device-db | 3308 | device_db | device | root |
| user-db | 3307 | user_db | user | root |

Note: The MYSQL_ROOT_PASSWORD for all database instances is set to root.