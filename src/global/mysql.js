
const mysql = require('mysql');
const Bluebird = require('bluebird');
Bluebird.promisifyAll(require('mysql/lib/Connection').prototype);
Bluebird.promisifyAll(require('mysql/lib/Pool').prototype);

const config = require('../config');
const log4js = require('./log4js');
const logger = log4js.getLogger('mysql');
const pool = mysql.createPool(config.mysql);

pool.getConnectionAsync().then((connection) => {
  logger.debug('MySQL connected');
  return connection.release();
}).catch((err) => {
  logger.error(err);
});

pool.on('enqueue', function () {
    const info = {
        all: pool._allConnections.length,
        free: pool._freeConnections.length,
        queue: pool._connectionQueue.length,
    };
    logger.info('Waiting for available connection slot', JSON.stringify(info));
});


module.exports = pool;