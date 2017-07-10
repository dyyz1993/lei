/**
 * @Author: yingzhou xu
 * @Date:   2017-07-10T18:31:16+08:00
 * @Email:  dyyz1993@qq.com
 * @Filename: index.js
 * @Last modified by:   yingzhou xu
 * @Last modified time: 2017-07-10T19:40:29+08:00
 */


 const logger = log4js.getLogger('system');
 /**
  * 加载配置文件
  */
 const config = require('../config/config.base.js');

 if (process.env.NODE_ENV === 'production') {
   // 生产
   Object.assign(config, require('../config/config.pro.js'));
   logger.info('生产环境');
 } else if (process.env.NODE_ENV === 'test') {
   Object.assign(config, require('../config/config.test.js'));
   logger.info('测试环境');
 } else {
   Object.assign(config, require('../config/config.dev.js'));
   logger.info('开发环境');
 }
 config.message = require('../config/error.code.js');

 module.exports = config;
