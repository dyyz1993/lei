// 自定义中间件

const { log4js }  = require('../global');
const logger = log4js.getLogger();

//中间件注册
const middlewares = [
    {
        title:`返回码响应`,
        entity:require('./handleResponse'),
        name:'handleResponse',
        enabled:true
    },
    {
        title:`跨域`,
        entity:require('./crossDomain'),
        name:'crossDomain',
        enabled:false
    },
    {
        title:`ip限流`,
        entity:require('./ipController')({
            maxCount:20,
            maxTime:1000,
            maxIpNum:1000
        }),
        name:'ipController',
        enabled:true
    }
]

module.exports = (app)=>{
    for (let  { entity,name,enabled} of middlewares) {
        if(enabled || enabled === undefined){
            app.use(entity);
            // entity.call(this,...arguments);
            logger.trace(`middleware ${name} start`);
        }
    }
    
}


