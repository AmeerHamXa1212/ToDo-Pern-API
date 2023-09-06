import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: process.env.DATABASE,
  password: process.env.DATABASE_KEY,
  port: 5432,
});

export default pool;
