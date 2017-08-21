/**
 * @Author: yingzhou xu
 * @Date:   2017-04-14T09:53:10+08:00
 * @Email:  dyyz1993@qq.com
 * @Filename: util.js
 * @Last modified by:   yingzhou xu
 * @Last modified time: 2017-08-04T16:50:24+08:00
 */

/**
 * 配置日志
 */

exports.moment = require('moment');



global.log4js = require('log4js');
global.config = require('./config');


log4js.configure({
  appenders: [{
    type: 'dateFile',
    filename: 'logs/system.log',
    pattern: '-yyyy-MM-dd',
    category: 'system',
  }, {
    type: 'console',
    category: 'system',
  }, {
    type: 'dateFile',
    filename: 'logs/wechat.log',
    pattern: '-yyyy-MM-dd',
    category: 'wechat',
  }, {
    type: 'console',
    category: 'wechat',
  }, {
    type: 'dateFile',
    filename: 'logs/mysql.log',
    pattern: '-yyyy-MM-dd',
    category: 'mysql',
  }, {
    type: 'console',
    category: 'mysql',
  }],
});


// 输出当前环境
exports.env = {
  istest: process.env.NODE_ENV === 'test',
  ispro: process.env.NODE_ENV === 'production',
  isdev: process.env.NODE_ENV === 'dev',
};

/**
 * 连接redis数据库
 */
const IoRedis = require('ioredis');
exports.redisClient = () => {
  return new IoRedis(config.redis);
};

/**
 * 加载数据库配置文件
 */
const mysql = require('mysql');
Promise.promisifyAll(require('mysql/lib/Connection')
  .prototype);
Promise.promisifyAll(require('mysql/lib/Pool')
  .prototype);
const pool = exports.pool = mysql.createPool(config.mysql);

/*
 * 获取数据库连接
 */
exports.getConnect = () => {
  return this.pool.getConnectionAsync()
    .then((conn) => {
      return conn;
    });
};

// 配置文件上传
const multer = require('multer');
exports.upfile = () => {
  const storage = multer.diskStorage({
    // 设置上传后文件路径，uploads文件夹会自动创建。
    destination(req, file, cb) {
      cb(null, './public/uploads');
    },
      // 给上传文件重命名，获取添加后缀名
    filename(req, file, cb) {
      const fileFormat = (file.originalname)
          .split('.');
      cb(null, file.fieldname + '-' + Date.now() + '.' + fileFormat[
          fileFormat.length - 1]);
    },
  });

  return multer({
    storage,
    limits: {},
  });
};

const multiparty = require('multiparty');
/*
 * 提取form提交的文件
 * */
exports.parseForm = (req) => {
  return new Promise((resolve, reject) => {
    const form = new multiparty.Form({
      maxFieldsSize: 10,
      maxFilesSize: 1024 * 1024 * 3, // 限制上传3m
      uploadDir: '/tmp', //资源临时存储的位置
    });
    form.parse(req, function (err, fields, files) {
      if (err) {
        if (err.code === 'ETOOBIG') {
          // 上传文件过大
          return reject(new Error('ETOOBIG'));
        }
        return reject(err);
      }
      const _files = [];
      for (const key in files) {
        _files.push(files[key][0]);
      }
      resolve({
        fields, files: _files,
      });
    });
  });
};
exports.filterParams = function (data, arr) {
  const obj = {};
  for (const key of arr) {
    if (key instanceof Object) {
      if (key['field'] !== undefined && typeof data[key['field']] === key[
          'type']) {
        obj[key['field']] = data[key['field']];
      }
    } else if (data[key] !== undefined) {
      obj[key] = data[key];
    }
  }
  return obj;
};

/**
 * 检查参数是否必填
 */
exports.checkParams = (data, arr) => {
  for (const val of arr) {
    if (data[val] === undefined) {
      return val + `: is required \n`;
    }
  }
  return false;
};


exports.getClientIp = function (req) {
  return req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;
};
/*
 * 成功返回
 */
exports.success = (obj) => {
  return Object.assign({}, obj, config.message.success);
};

/*
 * 返回失败
 */
exports.fail = (obj) => {
  return Object.assign({}, obj, config.message.error);
};
