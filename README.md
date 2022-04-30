# Storefront backend API

Storefront API is a RESTFul API with PostgreSQL Database

## Getting started

### Install all dependencies

```
npm install
```

### Setting Environment

#### Creating database using postgres

Run the following commands in psql to create database and user.

1. Create database

```
CREATE DATABASE storefront;
```

2. Create test database

```
CREATE DATABASE storefront_test;
```

3. Create user

```
CREATE USER storeowner WITH PASSWORD ‘123456’;
```

5. Connect to the database

```
\c storefront
```

4. Grant privileges

```
GRANT ALL PRIVILEGES ON DATABASE storefront TO storeowner;
```

5. Connect to the test database

```
\c storefront_test
```

6. Grant privileges

```
GRANT ALL PRIVILEGES ON DATABASE storefront_test TO storeowner;
```

#### Adding Environment variables

In the project root folder add `.env` file and add the following variables

```
PORT=4000
ENV=dev
POSTGRES_USER=storeowner
POSTGRES_PASSWORD=123456
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=storefront
POSTGRES_DB_TEST=storefront_test
SALT_ROUNDS=10
PEPPER=perfectstore123
SECRET=thestore123
```

**Important Note**: database name, user name, password and environment variables' values can be changed, these values were only used in development and testing.

### Build the server

```
npm run build
```

### Run the server in development mode

```
npm run start
```

### Run the server in production mode

```
npm run start:prod
```

## Testing and Formatting

### Jasmine with supertest

```
npm run test
```

### Prettier

```
npm run prettier
```

### ESLint

#### To check code only.

```
npm run lint
```

#### To check code and fix.

```
npm run lint:fix
```

## Usage

This server will be listening on `port:4000`

### Endpoints.

- Some enpoints will need a JWT to be provided Request Headers Authorization in the following format `Authorization` : `Bearer <token>` .
  - To start testing API for the first time use the following token : `Authorization` : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoidGVzdCIsImxhc3RfbmFtZSI6InVzZXIiLCJwYXNzd29yZCI6InBhc3Nhc2QxMjMiLCJpYXQiOjE2NTEzNDE2OTd9.3Ntbb5LQLRHW52x74b2n16JGcJTLm-dc-BhvGxtzK5s`
- Endpoints to access and modify database are available in the [REQUIREMENTS.md](https://github.com/mactav1sh/storefront-backend/blob/master/REQUIREMENTS.md) file
