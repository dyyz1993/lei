/**
 * @Author: yingzhou xu
 * @Date:   2017-04-14T09:53:10+08:00
 * @Email:  dyyz1993@qq.com
 * @Filename: .eslintrc.js
 * @Last modified by:   yingzhou xu
 * @Last modified time: 2017-04-15T19:25:22+08:00
 */


module.exports = {
  extends: 'lei',
  rules: {
    'promise/catch-or-return': 'off',
    'semi': 2,
  },
  globals: {
    express: true,
    rootPath: false,
    config: true,
    util: true,
    log4js: true,
    co: true,
  },
};
