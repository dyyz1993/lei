const {
    log4js,
    pool,
    utils,
    co
} = require('../global');
const Base = require('./base');
const logger = log4js.getLogger('mysql');
class awardsModule extends Base {
    constructor(table, options) {
        super(table, options);
    }


}
module.exports = new awardsModule('awards', {
    schema: require('../schema/awards.js')
});