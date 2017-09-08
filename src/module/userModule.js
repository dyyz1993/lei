const {
    log4js,
    pool,
    utils,
    co
} = require('../global');
const Base = require('./base');
const logger = log4js.getLogger('mysql');
class userModule extends Base {
    constructor(table, options) {
        super(table, options);
    }
    getByName(username){
        return this._one(this.mono({backquote: false}).select('*',this.table).where({username}).query().sql);
    }


}
module.exports = new userModule('user', {
    schema: require('../schema/user.js')
});