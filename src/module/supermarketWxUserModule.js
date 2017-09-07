const {
    log4js,
    pool,
    utils,
    co
} = require('../global');
const Base = require('./base');
const logger = log4js.getLogger('mysql');
class supermarketWxUserModule extends Base {
    constructor(table, options) {
        super(table, options);
    }
}
module.exports = new supermarketWxUserModule('supermarket_wx_user', {
    schema: require('../schema/supermarketWxUser.js')
});