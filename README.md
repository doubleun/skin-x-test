# WORK IN PROGRESS

## How to run the project

### Docker compose

#### Run project with docker-compose (all in one)

- In the root project run:

  ```bash
  $ docker-compose up -d
  ```

### Development

#### Install dependencies

- In the root project, run:

  ```bash
  $ pnpm install
  ```

#### Run development servers

**NOTE: you can skip this step, if you want to just run the project with docker-compose (see next section below)**

- Run the PostgreSQL database:

  - Option 1: Change env file in /api to target your localhost PostgreSQL

  - Option 2: Run PostgreSQL using Docker (be sure to have docker installed on your machine):

    - Pull postgres:16 image

      ```bash
      $ docker pull postgres:16-alpine
      ```

    - Run the image
      ```bash
      $ docker run --name skin_x-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_USER=skinx -e POSTGRES_DB=db -p 5431:5432 -d postgres:16-alpine
      ```

  - Then you can connect to the database using this command (be sure to have `psql` installed):
    ```bash
      $ psql postgresql://skinx:password@localhost:5431/db
    ```

- Run client and api server (concurrently):

  ```bash
  $ pnpm dev
  ```

- (Optional) Or you can run client and api server individually

  - Client:

    ```bash
    $ pnpm dev:client
    ```

  - API server:

    ```bash
    $ pnpm dev:api
    ```

- (Optional) Seed the database
  - run the `/api` server at least once to migrate the tables
  - then run in `/api`:
    ```bash
    $ npx sequelize-cli db:seed:all
    ```
  - **NOTE: If want to seed the db again, drop all tables first then re-run the seed command**
  - (Optional) replace json data or file in `/api/seeders`
- (Optional) Dump the SQL for Docker
  - if you need to dump new SQL data to use with Docker mak sure to have postgresql 16 installed, then run (password is `password`):
    ```bash
    $ pg_dump db > dump.sql -h localhost -p 5431 -U skinx
    ```
  -
