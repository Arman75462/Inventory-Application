import "../config/env.js";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.USE_SSL === "true" ? { rejectUnauthorized: true } : false,
});

export default pool;
