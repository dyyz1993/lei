const Promise = require('bluebird');


module.exports = {
    co: require('express-coroutine').coroutine,
    coroutine: Promise.coroutine,
    redis: require('./redis'),
    pool: require('./mysql'),
    pm2: require('./pm2'),
    mono: require('./monologue'),
    moment: require('moment'),
    log4js: require('./log4js'),
    fs: Promise.promisifyAll(require('fs')),
    config: require('../config'),
    util: require('../libs/util'),
    express: require('express'),
    TYPES: require('./types')
}