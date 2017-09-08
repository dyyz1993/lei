const { wxUser } = require('../controller');
module.exports = (router)=>{
    router.post('/add',wxUser.add);

    router.get('/:markettype', wxUser.isLogin, wxUser.selectMarkettype);

    router.put('/lottery/:markettype',wxUser.isLogin,wxUser.lottery);

    router.get('/my/awards',wxUser.isLogin,wxUser.awards);

    router.put('/perfect',wxUser.isLogin,wxUser.perfect);

    router.get('/lottery/list',wxUser.isLogin,wxUser.lotteryList);

    router.put('/deal/prize',wxUser.isLogin,wxUser.dealPrize);

    return router;
};