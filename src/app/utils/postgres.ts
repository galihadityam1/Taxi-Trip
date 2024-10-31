import { Pool, PoolConfig } from "pg";

const poolConfig: PoolConfig = {
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "postgres",
  database: "test_case",
};

const pool = new Pool(poolConfig);

export default pool;
