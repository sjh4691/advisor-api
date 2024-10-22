# Advisor Dashboard Backend

This project is the backend for the Advisor Dashboard application. It is built with Node.js, Express, and Prisma, and uses PostgreSQL as the database.

## Prerequisites

- Node.js (version 14 or later)
- Yarn package manager
- Docker (for running the PostgreSQL database)

## Setup

### 1. Install Dependencies

```bash
yarn install
```

### 2. Run the Database

```bash
docker-compose up -d db
```

### 3. Run Migrations and Seed Data

```bash
yarn prisma:migrate
yarn prisma:seed
```

Optional:

```bash
yarn prisma:seed
```

### 4. Start the Server

```bash
yarn dev
```
