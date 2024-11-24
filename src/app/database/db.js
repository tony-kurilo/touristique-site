import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'DB',
    password: '3113',
    port: 5432,
});

export default pool;