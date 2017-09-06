const {
    log4js,
    pool,
    util,
    co
} = require('../global');
const Base = require('./base');
const logger = log4js.getLogger('mysql');
class userModule extends Base {
    constructor(table, options) {
        super(table, options);
    }
}
module.exports = new userModule('user', {
    schema: require('../schema/user.js')
});