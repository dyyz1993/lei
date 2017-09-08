
const { log4js, _ } = require('../global');
const util = require('util');
const logger = log4js.getLogger();
module.exports = function (req, res, next) {
    // 错误的时候打印请求的数据
    res.error = (err, code) => {
        res.json({
            code: code || err.code || -1,
            message: err.message || err.toString(),
            msg: err.msg || err.message || err.toString(),
        })
        logger.trace(util.inspect(_.pick(req, 'originalUrl', 'headers', 'ip', 'params', 'body', 'query'), true, 2, true));
    };

    res.success = (data) => {
        res.json({
            code: 0,
            data: data || {},
        });
    };
    next();
}