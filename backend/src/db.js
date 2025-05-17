const { Pool } = require('pg');

// Usa los hostnames de Docker
const hosts = [
  '192.168.0.206',
  '192.168.1.11'
];
const pools = hosts.map(host => new Pool({
  user: 'root',
  host,
  database: 'hotel_reservation',
  password: '',
  port: 26257,
  ssl: false,
}));

// Intenta la consulta en cada pool hasta que una funcione
async function tryQueryOnPools(queryText, params) {
  let lastError;
  for (const pool of pools) {
    try {
      return await pool.query(queryText, params);
    } catch (err) {
      lastError = err;
      // Si es un error de conexión, intenta el siguiente pool
      if (err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND' || err.code === '57P01') {
        continue;
      } else {
        throw err;
      }
    }
  }
  throw lastError;
}

const query = (text, params) => tryQueryOnPools(text, params);

const getClient = async () => {
  let lastError;
  for (const pool of pools) {
    try {
      return await pool.connect();
    } catch (err) {
      lastError = err;
      if (err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND' || err.code === '57P01') {
        continue;
      } else {
        throw err;
      }
    }
  }
  throw lastError;
};

// Método para probar la conexión y mostrar información del nodo y base de datos
const testConnection = async () => {
  for (const pool of pools) {
    try {
      const dbs = await pool.query('SHOW DATABASES;');
      const nodeInfo = await pool.query('SELECT node_id FROM crdb_internal.node_runtime_info LIMIT 1;');
      console.log('Conexión a la base de datos exitosa');
      console.log('Bases de datos disponibles:', dbs.rows.map(r => r.database_name).join(', '));
      if (nodeInfo.rows.length > 0) {
        console.log('Conectado al nodo:', nodeInfo.rows[0].node_id);
      }
      return;
    } catch (err) {
      // Intenta el siguiente pool
      continue;
    }
  }
  console.error('Error al conectar con la base de datos en todos los nodos');
};

module.exports = {
  query,
  getClient,
  testConnection,
};