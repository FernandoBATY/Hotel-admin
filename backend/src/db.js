const { Pool } = require('pg');

// Usa los hostnames de Docker
const hosts = [
  '100.76.128.66',
  '100.78.38.102',
  '100.113.50.42',
  '100.110.81.32'
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
  let connectedNodes = [];
  let failedNodes = [];
  for (let i = 0; i < pools.length; i++) {
    const pool = pools[i];
    const host = hosts[i];
    try {
      const dbs = await pool.query('SHOW DATABASES;');
      const nodeInfo = await pool.query('SELECT node_id FROM crdb_internal.node_runtime_info LIMIT 1;');
      let nodeId = nodeInfo.rows.length > 0 ? nodeInfo.rows[0].node_id : 'desconocido';
      connectedNodes.push({ host, nodeId });
      console.log(`Conexión exitosa al nodo ${nodeId} (${host})`);
      console.log('Bases de datos disponibles:', dbs.rows.map(r => r.database_name).join(', '));
    } catch (err) {
      failedNodes.push({ host, error: err.message });
      console.error(`Error al conectar con el nodo (${host}):`, err.message);
    }
  }
  if (connectedNodes.length === 0) {
    console.error('No se pudo conectar con ningún nodo de la base de datos.');
  } else {
    console.log('Resumen de conexión:');
    connectedNodes.forEach(n => {
      console.log(`✔ Nodo conectado: ${n.nodeId} (${n.host})`);
    });
    if (failedNodes.length > 0) {
      failedNodes.forEach(n => {
        console.log(`✖ Nodo NO conectado: (${n.host}) - ${n.error}`);
      });
    }
  }
};

module.exports = {
  query,
  getClient,
  testConnection,
};