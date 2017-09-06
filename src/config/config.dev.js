/**
 * @Author: yingzhou xu
 * @Date:   2017-04-14T09:55:05+08:00
 * @Email:  dyyz1993@qq.com
 * @Filename: config.test.js
 * @Last modified by:   yingzhou xu
 * @Last modified time: 2017-04-15T18:22:26+08:00
 */


module.exports = {
  'mysql': {
    'host': '127.0.0.1',
    'port': '3306',
    'user': 'root',
    'password': '',
    'database': 'test',
    'dateStrings': 'DATETIME',
    'connectionLimit': 50
  },
  'redis': {
    'host': '127.0.0.1',
    'port': '6379',
    'db': 1,
  },
};
