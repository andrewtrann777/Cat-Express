# Cat-Express
REST API for pictures of cats.

## Table of Contents
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [REST Endpoints](#rest-endpoints)

## Environment Variables
Create a file named `.env`. After creating the file, run:
```bash
python3 generateRandomHash.py
```
Set `TOKEN_SECRET` equal to the randomly generated hash in `.env`.

## Running the Application
To start the application, run:
```bash
yarn --frozen-lockfile && node .
```
When signing in, there is an already-existing user:
```txt
Username: test
Password: test
```

## REST Endpoints
- `localhost:8080/auth/signup` (POST)
- `localhost:8080/auth/login` (POST)
- `localhost:8080/auth/logout` (POST)
- `localhost:8080/pictures/:id` (GET)
- `localhost:8080/pictures/upload` (POST)
