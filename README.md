# Docker Practice - Learning & Setup

## What I Created

A simple basic Task App overdone with Docker, PostgreSQL, Flask, and Vite.

- A Dockerized Flask backend connected to a PostgreSQL database.
- A Dockerized Vite frontend that communicates with the Flask backend.
- A `docker-compose.yml` file to manage multi-container services.
- A PostgreSQL database initialized with a custom SQL script.
- A `.dockerignore` file to optimize Docker builds.

## To run

1. Clone the repository:
   ```sh
   git clone https://github.com/anshmehta7x/docker-practice.git
   ```
2. Navigate to the project directory:
   ```sh
   cd docker-practice
   ```
3. Run Docker Compose:
   ```sh
   docker-compose up --build
   ```

## What I Learned

- **Docker Basics:**

  - Understanding Docker images and containers.
  - Writing Dockerfiles for backend and frontend apps.
  - Managing containerized services with Docker Compose.

- **PostgreSQL Setup:**

  - Running PostgreSQL in a Docker container.
  - Mounting volumes to persist database data.
  - Initializing the database with scripts using `/docker-entrypoint-initdb.d/`.

- **Flask Backend:**

  - Setting up Flask inside a Docker container.
  - Connecting Flask to PostgreSQL with SQLAlchemy.
  - Handling CORS with `flask_cors`.

- **Vite Frontend:**

  - Dockerized the Vite build for production.
  - Passed environment variables as build arguments.
  - Connected the frontend to the Flask backend.

- **Docker Compose:**

  - Defining multi-container services (frontend, backend, db).
  - Managing environment variables and dependencies.
  - Mounting volumes and setting up network communication.

- **Database Operations:**
  - Creating and verifying tables through Docker.
  - Running SQL scripts and manual queries inside the DB container.
  - Debugging missing tables and script execution issues.

## Steps I Took

1. **Project Setup:**

   - Created separate folders for `backend` and `frontend`.
   - Initialized PostgreSQL as a Docker container.

2. **Flask API Setup:**

   - Wrote a simple API with SQLAlchemy and CORS.
   - Connected the API to PostgreSQL.

3. **Database Initialization:**

   - Created an `init.sql` script for table creation and sample data.
   - Mounted the script to `/docker-entrypoint-initdb.d/`.

4. **Docker Compose Configuration:**

   - Defined services for `db`, `backend`, and `frontend`.
   - Linked the services through Docker Compose networks.
   - Used volumes for PostgreSQL data persistence.

5. **Vite Build Optimization:**

   - Dockerized the Vite build for production deployment.
   - Passed environment variables as build arguments for flexibility.

6. **Debugging:**

   - Solved the "relation \"tasks\" does not exist" error.
   - Verified and executed SQL scripts directly in the DB container.

7. **Optimization:**
   - Used a `.dockerignore` file to exclude `node_modules/` and other unnecessary files.
   - Optimized the Dockerfile for better build performance by layering correctly.
