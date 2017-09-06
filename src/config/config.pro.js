/**
 * @Author: yingzhou xu
 * @Date:   2017-04-14T09:53:10+08:00
 * @Email:  dyyz1993@qq.com
 * @Filename: config.js
 * @Last modified by:   yingzhou xu
 * @Last modified time: 2017-04-14T10:20:59+08:00
 */


module.exports = {
  'mysql': {
    'host': '127.0.0.1',
    'port': '3306',
    'user': 'root',
    'password': '',
    'database': '',
    'dateStrings': 'DATETIME',
    'connectionLimit': 50
  },
  'redis': {
    'host': '127.0.0.1',
    'port': '6379',
    'db': 1,
  },
};
