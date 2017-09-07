const {
    log4js,
    pool,
    utils,
    co
} = require('../global');
const Base = require('./base');
const logger = log4js.getLogger('mysql');
class supermarketModule extends Base {
    constructor(table, options) {
        super(table, options);
    }
}
module.exports = new supermarketModule('supermarket', {
    schema: require('../schema/supermarket.js')
});