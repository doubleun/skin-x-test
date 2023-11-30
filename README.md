# WORK IN PROGRESS

## RUN EVERTHING WITH DOCKER COMPOSE

1. Install `pnpm`
2. run `docker-compose up -d` at the root of the project (the installation could take a while since the client needs to install many deps)
3. Checkout the [Web at localhost:3000](http://localhost:3000) and the api server running [at localhost:3003](http://localhost:3003)
   1. Check the cahses in stock via this [url](http://localhost:3003/api/cashes)
   2. You can check the products in stock via this [url](http://localhost:3003/api/products)
4. If you want to connect to the mongodb see the **setup mongodb** part down below

**NOTE:**

- see `.env.example` of each package (client and server)
- the client will run on port `3000` by default
- the server will run on port `3003` by default
- to connect to the database see **SETUP MONGODB** section down below

## HOW TO RUN LOCAL

### HOW TO INSTALL

1. Install `pnpm`
2. setup the `.env` file in both api (./api/) server and client folder (./client/)
3. Install recursively with `pnpm install --recursive`
   - Or install separately
     1. Install client dependencies `pnpm -F client install`
     2. Install server api dependencies `pnpm -F api install`

### RUN DEV

**OPTION 1:** run individually

1. Run client `pnpm dev:client`
2. Run the api server `pnpm dev:api`

OPTION 2: run both in the same terminal

1. Run `pnpm dev`

### SETUP MONGODB

**OPTION 1 (Recommend):**

1. run `docker-compose up -d` in the root project the database will be initiate using default data
2. connect using `mongosh --host localhost --port 27017 --authenticationDatabase admin -u root -p password`

**OPTION 2:** NO DEFAULT DATA

In `api` workspace setup the `.env` for `MONGO_URI` If you want to run locally via Docker follow these steps:

1. run `docker pull mongo`
2. run `docker network create mongo-network` (if you want to connect mongo to the network along with other containers)
3. run `docker run -d --name mongodb --network mongo-network -p 27017:27017 mongo` (skip the `--network mongo-network` if network is not needed)
4. connect app via `mongodb://localhost:27017/blue-pi-vending` (change "blue-pi-vending" to the correct collection name)
5. connect shell using `mongosh` run `mongosh --host localhost --port 27017`

### RUN JEST

1. run `pnpm test:client:coverage`

## Screenshots

<img width="1469" alt="image" src="https://github.com/doubleun/blue-pi-test/assets/84143891/b9af362d-1700-4983-9c72-fb13f7ae4cc7">
<img width="623" alt="image" src="https://github.com/doubleun/blue-pi-test/assets/84143891/db05f7ba-ab0b-4e33-a96f-0f212070361f">
