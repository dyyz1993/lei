/**
 * @Author: yingzhou xu
 * @Date:   2017-06-19T10:50:18+08:00
 * @Email:  dyyz1993@qq.com
 * @Filename: ip.js
 * @Last modified by:   yingzhou xu
 * @Last modified time: 2017-08-04T16:49:19+08:00
 */

function getClientIp(req) {
  return req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
}

const store = {};
function handler(options) {
  options = options || {};
  options.maxCount = options.maxCount || 20;
  options.maxTime = options.maxTime || 1000;
  options.maxIpNum = options.maxIpNum || 1000;
  return function (req, res, next) {
    const ip = getClientIp(req);
    let obj = store[ip];
    if (!obj) {
      // 不存在
      obj = {};
      obj.cookie = req.cookie;
      obj.user_agent = req['user-agent'];
      obj.referer = req.referer;

      obj['count'] = 0;
      obj['timestamp'] = Date.now();
      store[ip] = obj;
      // if( options. )
    } else if (Date.now() - obj['timestamp'] > options.maxTime) {
      delete store[ip];
    } else {
      obj.count++;
      if (obj.count > options.maxCount) {
        return res.status(500).send(`访问频率过快`);
      }
    }
    req.ip = ip;
    next();
  };
}


module.exports = handler;
