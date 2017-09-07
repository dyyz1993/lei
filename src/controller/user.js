const {} = require('../global');
const { userModule } = require('../module');

exports.login = function (req, res) {
    const { user, password, remember } = req.query;
    const admin_res =  userModule.get(user);

    res.error('用户名或密码错误');
  };

