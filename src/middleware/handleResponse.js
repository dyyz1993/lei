
const { log4js } = require('../global');
const logger = log4js.getLogger();
module.exports = function (req,res,next){
    // 错误的时候打印请求的数据
    res.error = (err,code)=>{
        res.json({
            success: false,
            code: code || err.code || -1,
            message: err.message || err.toString(),
            msg: err.msg || err.message || err.toString(),
        })
        logger.trace(req);
    };
    res.success = (data) => {
        res.json({
          success: true,
          code:0,
          data: data || {},
        });
      };
      next();
}