/**
 * @Author: yingzhou xu
 * @Date:   2017-06-19T10:50:18+08:00
 * @Email:  dyyz1993@qq.com
 * @Filename: ip.js
 * @Last modified by:   yingzhou xu
 * @Last modified time: 2017-06-19T16:56:04+08:00
 */


// 添加IP
// 配置{ 一分钟内可以访问多少次 ,  }

function IP(){
  this.ip = '';
  this.host = '';
  this.referer = '';
  this.user_agent = '';
  this.cookie = '';
}

IP.prototype.get = function (){
  return this.ip;
};

IP.prototype.toString = function (){
  return JSON.stringify({
    ip: this.ip,
    host: this.host,
    referer: this.referer,
    user_agent: this.user_agent,
    cookie: this.cookie,
  });
};


function POOL(){
  const pool = {};

}

function push(){

}

function get(){

}

module.exports = push;
