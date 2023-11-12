# Notes Serverless Backend

This project is a Serverless Express API built using TypeORM, AWS Lambda and the Serverless Framework. It's designed to interact with a PostgreSQL database.

## Getting Started

These instructions will guide you through setting up the project locally in Docker or in the same machine.

## Docker

### Prerequisites to run the project in Docker

1. Install [Docker](https://docs.docker.com/get-docker/)
2. Install [Docker Compose](https://docs.docker.com/compose/install/)

### Running the project

Run the project using Docker Compose:

```docker compose -p notes-serverless up -d```

This command will start the project container and expose the database on port 5432 and the API on port 3000.

### Running seeders

```docker compose -p notes-serverless run app npm run seeds```

This command will run the seeders using TypeORM.

### To execute the tests

```docker compose -p notes-serverless run app npm test```

This command will run the tests using Jest.

## Locally

### Prerequisites to run the project

1. Install [Node.js](https://nodejs.org/) (v18.14.0 or higher)
2. Install [Serverless Framework](https://www.serverless.com/framework/docs/getting-started/) globally: `npm install -g serverless`

### Setting up the environment

1. Clone this repository.
2. Create a `.env` file in the project root directory.
```DB_HOST=localhost```
```DB_USER=postgres```
```DB_PASSWORD=test```
```DB_NAME=test```
```DB_PORT=5432```

### Installing dependencies

Install the project dependencies by running:

```npm install```

This command will run the seeders using TypeORM.

### Running the API

Run the API locally using the Serverless Offline plugin:

```npm start```

### Running seeders

Run the seeders using the following command:

```npm run seeds```

This command will start the local API server on port 3000 by default. It's set up with Nodemon and has hot loading enabled.

### To execute the tests

Run the tests using the following command:

```npm test```

This command will run the tests using Jest.
