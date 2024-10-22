# Advisor Dashboard Backend

This project is the backend for the Advisor Dashboard application. It is built with Node.js, Express, and Prisma, and uses PostgreSQL as the database.

## Prerequisites

- Node.js (version 14 or later)
- Yarn package manager
- Docker (for running the PostgreSQL database)

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/advisor-dashboard-backend.git
cd advisor-dashboard-backend
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Run the Database

```bash
docker-compose up -d db
```

### 4. Run Migrations and Seed Data

```bash
yarn prisma:migrate
yarn prisma:seed (optional)
```

### 5. Start the Server

```bash
yarn start
```
