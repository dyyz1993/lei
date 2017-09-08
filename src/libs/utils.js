/**
 * @Author: yingzhou xu
 * @Date:   2017-04-14T09:53:10+08:00
 * @Email:  dyyz1993@qq.com
 * @Filename: util.js
 * @Last modified by:   yingzhou xu
 * @Last modified time: 2017-08-04T16:50:24+08:00
 */

const assert = require('chai').assert;

// 输出当前环境
const env = {
  istest: process.env.NODE_ENV === 'test',
  ispro: process.env.NODE_ENV === 'production',
  isdev: process.env.NODE_ENV === 'dev',
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

function filterParams(data, arr) {
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
function checkParams(data, arr) {
  for (const val of arr) {
    if (data[val] === undefined) {
      return val + `: is required \n`;
    }
  }
  return false;
};

function getClientIp(req) {
  return req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
};
/*
 * 成功返回
 */
function success(obj) {
  return Object.assign({}, obj, config.message.success);
};

/*
 * 返回失败
 */
function fail(obj) {
  return Object.assign({}, obj, config.message.error);
};


/**
 * 驼峰转下划线
 * 
 * @param {any} str 
 * @returns 
 */
function camelToUnderline(str) {
  return str.replace(/([A-Z])/g, "_$1").toLowerCase();
}

/**
 * 下划线转驼峰
 * 
 * @param {any} str 
 */
function underlineToCamel(str) {
  let re = /_(\w)/g;
  return str.replace(re, function ($0, $1) {
    return $1.toUpperCase();
  });
}
/**
 * 随机获取
 * @param  {Array} gifts  用户的列表 [{ gift_name: 'day1', rate: 10, base: 100 },{ gift_name: 'day2', rate: 10, base: 100 },]
 * @return {Object} 对象或者 null;
 */
function getGift(gifts)  {
  const arr = [];
  let total = 0,random;
  gifts.forEach((gift) => {
    gift.start = total;
    total += gift.rate;
    gift.end = total;
  });
  random = Math.random() * total;
  for (let i = 0, len = gifts.length; i < len; i++) {
    const gift = gifts[i];
    if (gift.start <= random && gift.end > random) {
      return gift;
    }
  }
  return null;
};


function randomStr(len){
  let str1 = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890`;
  let str = ``;
  for(var i=0;i<len;i++){
    str += str1[Math.floor(Math.random()*str1.length)];
  }  
  return str;
} 

/**
 * 随机数组中的某一项
 * @param {any} arr 
 * @returns 
 */
function randItem(arr){
  assert.isArray(arr);
  return arr[Math.floor(Math.random()*arr.length)]
}

module.exports = {
  env,
  underlineToCamel,
  camelToUnderline,
  fail,
  success,
  getClientIp,
  checkParams,
  filterParams,
  getGift,
  randomStr,
  randItem
}

