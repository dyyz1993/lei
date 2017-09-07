const {
    log4js,
    pool,
    utils,
    co
} = require('../global');
const Base = require('./base');
const logger = log4js.getLogger('mysql');
class wxUserModule extends Base {
    constructor(table, options) {
        super(table, options);
    }
}
module.exports = new wxUserModule('wx_user', {
    schema: require('../schema/wxUser.js')
});