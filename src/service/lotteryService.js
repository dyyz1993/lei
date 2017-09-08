

const { co,utils,config,log4js,errors } =  require('../global');
const { awardsModule } = require('../module');
const logger = log4js.getLogger();

module.exports = {
    lottery,
}



function lottery({openid,markettype}){
    return co(function*(){
        let result,awards=[],award;
        try{
            result = yield awardsModule.select({markettype});
            awards = result.filter((item) => {
                if ((item.is_manual ? item.manual_amount === 0 : item.rest_amount === 0)) return false;
                if (item.rate === 0) return false;
                // 普吉岛双人游邀请满60位才能抽中
                // if (item.award_id === 1 && (user.friends < 60)) return false;
                // 鲜花礼盒邀请满30位才能抽中
                // if (item.award_id === 3 && (user.friends < 30)) return false;
                // 电影票兑换券邀请满20位才能抽中
                // if (item.award_id === 4 && (user.friends < 20)) return false;
                //细节处理
                // if (item.award_id === 1 && userDel.indexOf(user.id) !== -1 ) return false; 
                //微商城100元代金券
                // if (item.award_id === 6 && lotteryHistory[item.award_id] >= 2) return false;
                //微商城50元代金券
                // if (item.award_id === 7 && lotteryHistory[item.award_id] >= 2) return false;
                //微商城20元代金券
                // if (item.award_id === 8 && lotteryHistory[item.award_id] >= 10) return false;
                return true;
            });
            award = utils.getGift(awards);
            if(award){
                switch(award.award_id){
                    case 1:
                    award.cuisine_type =  utils.randItem([5]);
                    break;
                    case 2:
                    award.cuisine_type =  utils.randItem([1]);
                        break;
                    case 3:
                    award.cuisine_type =  utils.randItem([2,3,4]);
                    break;
                    case 4:
                    award.cuisine_type =  utils.randItem([6,7,8]);
                    break;
                }
            }
            

            return award || null;
        }catch(error){
            logger.trace(error.stack)
            throw errors.internalError(error);
        }
    })
}