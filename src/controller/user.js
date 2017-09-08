const { co, log4js } = require('../global');
const { userModule } = require('../module');
const logger = log4js.getLogger();
exports.login = function (req, res) {
  const { username } = req.query;
  const user = userModule.get({ username });
  logger.trace(user);
  return res.json('ok')
  // return res.error('用户名或密码错误');
};

