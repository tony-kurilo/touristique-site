
import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'hotel_db',
  password: '3113',
  port: 5432,
});

export default pool;
