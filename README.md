Technologies

Backend

    NodeJS

Framework

    Express

Message Broker

    Kafka

Database

    MongoDB

ORM

    Mongoose

Container

    Docker

Authentication

    JWT

Logging

    Winston

Validation

    Zod

Environment

    dotenv

=======================

Centralized Logger
User Service

↓

Order Service

↓

Kafka

↓

Inventory

↓

Payment

↓

Notification

One Request ID.

Health Check
GET /health for the Every service.

=================

Graceful Shutdown

    SIGTERM

    Disconnect Kafka

    Close MongoDB

    Exit safely.

===================

API Gateway
localhost:3000

↓

Routes

/users

/orders

/products

No client directly accesses services.

======================

Future Enhancements

Authentication

↓

Redis

↓

Caching

↓

Rate Limiter

↓

Circuit Breaker

↓

Service Discovery

↓

Nginx

↓

Kubernetes

↓

AWS ECS

↓

Terraform

↓

GitHub Actions

↓

Prometheus

↓

Grafana

=====================

Our Development Workflow

From now on, every feature follows the same cycle:

Implement a small piece.

Run:

      npm run lint
      npm run format
      npm run dev
      Test it.

Commit with a conventional message, for example:

git commit -m "feat(shared): add error handling utilities"
