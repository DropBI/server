const { Pool } = require('pg');

const [dbName, maxCon] =
  process.env.DOLPHIN_TEST ?
    ['drop_bi', 1] :
    ['drop_bi', 4];

const config = {
    user: 'postgres',
    host: 'localhost',
    password: '1234',
    port: 5432,
    database: dbName,
    max: maxCon,
    idleTimeoutMillis: 30000,
}

const pool = new Pool(config)
  .on('error', err => {
    console.error('idle client error', err.message, err.stack);
  });

exports.pool = pool;