import * as mysql from 'mysql';
import { Pool, PoolConfig } from 'mysql';

const mysqlConfig: PoolConfig = require('./mysql-config.json');

// Create a pool for handling multiple connections
const pool: Pool = mysql.createPool(mysqlConfig);

export default pool;