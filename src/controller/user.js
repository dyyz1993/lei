const { co, log4js,errors,_ } = require('../global');
const { wxUserModule,supermarketWxUserModule } = require('../module');
const logger = log4js.getLogger();
const { lotteryService }  = require('../service');


exports.isLogin = function(req,res,next){
  
  let wx_user = req.session['wx_user'];
  if(!wx_user) return res.error(errors.ERROR_INFO.LoginError);
  req.$user = wx_user;
  next();
}

// 添加用户
exports.add = function* (req, res) {
  // const { nickname } = req.body;
  yield wxUserModule.add( req.body );
  let  user = yield wxUserModule.get({openid:req.body.openid})
  req.session['wx_user'] = user;
  return res.success(user);
};

// 选择超市
exports.selectMarkettype = function* (req, res) {
  const { markettype } = req.params;
  const { openid }  = req.$user;
  // 如果没有数据则创建
  try {
     yield supermarketWxUserModule.insert({openid,markettype}); 
  } catch (e) {
    logger.trace(e);
  }
  const result = yield wxUserModule.switch({markettype,openid} );
  return res.success(result);
};

// 我的奖品
exports.awards = function* (req, res) {
  const {openid} = req.$user;
  const result = yield wxUserModule.myAwards( openid );
  return res.success(result);
};

// 分页获取用户中奖列表
exports.lotteryList = function* (req, res) {
  const user = req.$user;
  const result = yield wxUserModule.pageList(req.$page,req.$pagecount);
  return res.success(result);
};

// 抽奖
exports.lottery = function* (req, res) {
  let result ;
  const { markettype } = req.params;
  const { openid } = req.$user;
  let award = yield lotteryService.lottery({openid,markettype});

  try{
    yield  wxUserModule.updateChanceAndAward(award);
    result = yield wxUserModule.switch({markettype,openid} );
    return res.success(result);
  }catch(e){
    logger.error(e.stack)
    return res.error(e,`抽奖次数异常`);
  }
  
};

// 配置地址
exports.perfect = function* (req, res) {
  const { username,markettype } = req.body;
  const { openid } = req.$user;
  let result = yield  supermarketWxUserModule.update(_.pick(req.body,["username","mobile","area","address","identity_card"]),{openid,markettype,chance:0});
  if(!result){
    return res.error(`更新失败`);
  }
  return res.success('');
};

// 处理奖品
exports.dealPrize = function* (req, res) {
  const { markettype } = req.body;
  const { openid } = req.$user;
  let result = yield  supermarketWxUserModule.update({isdeal:1},{markettype,openid,ischance:0});
  if(!result){
    return res.error(`更新失败`);
  }
  return res.success('更新成功');
};

