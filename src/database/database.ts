import { Pool } from 'pg';
import { config } from 'dotenv';
config();

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  // POSTGRES_DB_TEST,
} = process.env;

const client = new Pool({
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  host: POSTGRES_HOST,
  port: parseInt(POSTGRES_PORT as string),
  database: POSTGRES_DB,
});

export default client;
