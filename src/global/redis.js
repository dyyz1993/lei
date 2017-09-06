const IoRedis = require('ioredis');
const log4js = require('./log4js');
const config = require('../config');
const logger = log4js.getLogger('redis');

IoRedis.Promise.onPossiblyUnhandledRejection((error) => {
    logger.error(error);
  });


const redis =  new IoRedis(config.redis);



module.exports = redis;