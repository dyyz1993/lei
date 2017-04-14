/**
 * @Author: yingzhou xu
 * @Date:   2017-04-14T09:53:10+08:00
 * @Email:  dyyz1993@qq.com
 * @Filename: index.js
 * @Last modified by:   yingzhou xu
 * @Last modified time: 2017-04-14T10:51:05+08:00
 */


'use strict';

global.util = require('./util.js');
global.express = require('express');
global.moment = require('moment');
const bodyparser = require('body-parser');
const ejs = require('ejs');
const app = express();
const logger = log4js.getLogger('system');
const expressValidator = require('express-validator');

// 静态文件中间件
app.use('/public', express.static('public'));

// 配置post body解析中间件
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

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

// 当发生了未捕获的异常 守护中间件
process.on('uncaughtException', (err) => {
  logger.error(err.stack);
});

// 开启web服务器
app.listen(config.port, () => logger.info('服务器启动成功!', '端口号:', config.port));

// 开始socket服务器
// const io = require('socket.io')(server);
// require(rootPath.concat("/router/wsRouter.js")).webSocket( io );
