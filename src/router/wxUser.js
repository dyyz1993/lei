const { user } = require('../controller');
module.exports = (router)=>{
    router.get('/',user.login);
    return router;
};