const {
    log4js,
    pool,
    util,
    co
} = require('../global');
const Base = require('./base');
const logger = log4js.getLogger('mysql');
class <%=tableName%>
Module extends Base {
    constructor(table, options) {
        super(table, options);
    }
}
module.exports = new <%=tableName %>
Module('<%=table %>', {
    schema: require('../schema/<%=tableName %>.js')
});