# Rick & Morty API

![Node](https://img.shields.io/badge/node-18.x-green)
![Docker](https://img.shields.io/badge/docker-✓-blue)
![PostgreSQL](https://img.shields.io/badge/postgresql-15.x-blue)
![Redis](https://img.shields.io/badge/redis-7.x-orange)

This project is a GraphQL API for Rick & Morty characters. It allows you to fetch, store, and update character information from the official Rick & Morty API
. The API is built with Node.js, TypeScript, and Express, using Sequelize ORM with PostgreSQL as the primary database.

Key features include:

GraphQL Queries and Mutations: Fetch characters, filter by different fields (name, status, species, gender, origin), and update local database records.

Database Persistence: All character data is stored in a PostgreSQL database.

Caching with Redis: Frequently accessed data is cached in Redis to improve performance and reduce repeated external API calls.

Automated Cron Jobs: The project includes a cron process that periodically fetches and synchronizes character data from the Rick & Morty API to the local database.

Migrations and Seeders: Database structure and initial data can be created using Sequelize migrations and seed scripts.

Dockerized Setup: The entire stack (Node.js app, PostgreSQL, Redis) can run in Docker containers for easy deployment.

ERD Included: The database Entity-Relationship Diagram (ERD) is included in the repository as ERD.png to visualize the database schema.

Environment Management: The project uses separate environment files for Docker (.env.docker) and local development (.env).

This API provides a robust, efficient, and easily deployable backend for working with Rick & Morty character data, with caching, database persistence, and automated updates built in.  

---

## Prerequisites

- Node.js >= 18
- npm >= 9
- TypeScript
- Redis
- PostgreSQL

## 1️⃣ Running with Docker

This is the easiest way, as everything (Postgres, Redis, and the app) will run in containers.

### Steps:

1. Make sure you have [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed.

2. Copy the Docker environment example file:

```bash
cp .env.docker.example .env.docker
```

3. Customize .env.docker if needed (database credentials, API URL, etc.).

4. Build and run the containers:

```bash
docker-compose up --build -d
```

5. Check the logs to see if everything started correctly:

```bash
docker-compose logs -f <app_name>
```

6. Access GraphQL Playground at:

```bash
http://localhost:4000/graphql
```

7. Stop containers when needed:

```bash
docker-compose down
```

## 2️⃣ Running Manually (without Docker)

If you want to run the project locally, you need Redis and PostgreSQL installed on your machine.

### Steps:

1. Copy the environment file:

```bash
cp .env.example .env
```

2. Edit .env with your local database and Redis credentials
   
3. Install dependencies:

```bash
npm install
```

4. Run database migrations:

```bash
npx sequelize-cli db:migrate
```

5. Seed the database:

```bash
npx sequelize-cli db:seed:all
```

6. Start the server:

```bash
npx ts-node-dev src/server.ts
```

7. Open GraphQL Playground in your browser:

```bash
http://localhost:4000/graphql
```

## 3️⃣ Useful Commands

* Run migrations: npm run migrate or npx sequelize-cli db:migrate

* Run seeders: npm run seed or npx sequelize-cli db:seed:all

* Run tests: npm test


## 5️⃣ Example Queries

1. Get all characters

```bash
query {
  characters {
    id
    name
    status
    species
    gender
    origin
    image
  }
}
```

2. Get a character by ID

```bash
query {
  character(id: 1) {
    id
    name
    status
    species
    gender
    origin
    image
  }
}
```

3. Filter characters by name

```bash
query {
  characters(filter: { name: "Rick" }) {
    id
    name
    status
    species
    gender
    origin
    image
  }
}
```

4. Filter by status  

```bash
query {
  characters(filter: { status: "Alive" }) {
    id
    name
    status
    species
    gender
    origin
    image
  }
}
```

5. Combine multiple filters

```bash
query {
  characters(filter: { name: "Rick", status: "Alive", species: "Human" }) {
    id
    name
    status
    species
    gender
    origin
    image
  }
}
```
 
