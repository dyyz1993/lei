/**
 * @Author: yingzhou xu
 * @Date:   2017-04-14T09:53:10+08:00
 * @Email:  dyyz1993@qq.com
 * @Filename: index.js
 * @Last modified by:   yingzhou xu
 * @Last modified time: 2017-07-10T20:14:49+08:00
 */


'use strict';
/**
 * 全局设置
 */

global.rootPath = __dirname;
global.Promise = require('bluebird');
global.fs = Promise.promisifyAll(require('fs'));
global.util = require('./util.js');
global.co = Promise.coroutine;
global.express = require('express');

const bodyparser = require('body-parser');
const ejs = require('ejs');
const app = express();
const expressValidator = require('express-validator');
const logger = log4js.getLogger('system');


app.enable('trust proxy');

// 跨域
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , Cookie');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS, PATCH');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});


// 静态文件中间件
app.use('/public', express.static('public'));

// 配置post body解析中间件
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(require('./libs/ip')());
// session配置
const session = require('express-session');
// const RedisStore = require('connect-redis')(session);
app.use(session({
  secret: '!@#$%',
  resave: false,
  saveUninitialized: true,
  // store: new RedisStore({
  //     client : redisClient
  // })
}));

// 配置参数校验
app.use(expressValidator(
  {
    errorFormatter(param, msg, value) {
      return {
        param,
        msg,
        value,
      };
    },
  }));
// 设置ejs模板
app.set('views', './views');
app.set('view engine', 'html');
app.engine('.html', ejs.__express);


// 当发生了未捕获的异常 守护中间件
process.on('uncaughtException', (err) => {
  logger.error(err.stack);
});

// Promise未補貨
process.on('unhandledRejection', function (err, promise){
  logger.error(err.stack, promise);
});


// 挂载自定义路由表(勿删)


// 处理favicon.ico请求
const favicon = require('serve-favicon');
app.use(favicon(rootPath.concat('/public/favicon.ico')));

// 404错误中间件
app.use((req, res) => {
  logger.error(req.url.concat(' not found'));
  res.status(404).send(config.message.notfound);
});


// 服务器内中错误处理
app.use((err, req, res) => {
  logger.error(err.stack);
  res.status(500).send(config.message.servererr);
});

// 开启web服务器
const server = app.listen(config.port, () => logger.info('服务器启动成功!', '端口号:', config.port));
server.setTimeout(5000);
server.on('timeout',function(){
  const pool =	util.pool;
  const info = {
	  all:pool._allConnections.length,
  	free:pool._freeConnections.length,
  	queue:pool._connectionQueue.length,
  }
  logger.info('timeout','超时了 -- ', JSON.stringify(info));
})

// 开始socket服务器
// const io = require('socket.io')(server);
// require(rootPath.concat("/router/wsRouter.js")).webSocket( io );
