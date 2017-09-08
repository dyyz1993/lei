const {
    log4js,
    pool,
    utils,
    co,
    _,
    errors
} = require('../global');
const Base = require('./base');
const schema  = require('../schema');
const logger = log4js.getLogger('mysql');
class wxUserModule extends Base {
    constructor(table, options) {
        super(table, options);
    }

    /**
     * 添加用户信息
     * @param {any} obj 
     * @returns 
     * @memberof wxUserModule
     */
    add(obj){
        logger.info(obj);
        //需要对添加参数进行过滤以及校验
        return this.insert(obj);
    }
    
    
    /**
     * 更新用户抽奖次数
     * @param {any} condition 
     * @returns 
     * @memberof wxUserModule
     */
    updateChanceAndAward(condition){
        let result,sql1,sql2,_that = this;

            //增加减少票数
            sql1 = this.mono({backquote:false}).update(schema.supermarketWxUser.table,`set ischance=ischance-1,lotterytime = now(),awardname='${condition.awardname}',award_id=${condition.award_id}`)
            .where(_.pick(condition,['openid','markkettype'])).query().sql;

            if(condition.is_manual === 1){
                sql2 = this.mono({backquote:false})
                .update(schema.awards.table,`set send_amount = send_amount + 1 , rest_amount = rest_amount-1,manual_amount=manual_amount-1`)
                .where(_.pick(condition,['award_id','markettype']))
                .and('rest_amount').gt(0)
                .and('manual_amount').gt(0)
                .query().sql;
            }else{
                sql2 = this.mono({backquote:false})
                .update(schema.awards.table,`set send_amount = send_amount +1 , rest_amount = rest_amount-1`)
                .where(_.pick(condition,['award_id','markettype']))
                .and('rest_amount').gt(0)
                .query().sql;
            }
         

        return this._transaction((conn)=>{
            return co(function*(){
                result = yield _that._query(conn,sql1);
                if(!result.affectedRows) throw errors.dataBaseError(`${sql1} 更新失败`);
                result = yield _that._query(conn,sql2);
                if(!result.affectedRows) throw errors.dataBaseError(`${sql2} 更新失败`);
            })
        });
    }

    /**
     * 选择
     * 
     * @param {any} markettype 
     * @returns 
     * @memberof wxUserModule
     */
    switch({markettype,openid}){
        let sql  = this.mono({backquote:false}).select('*',`${schema.supermarketWxUser.table} su`).where({openid,markettype}).query().sql;
        return this._one(sql);
    }

    /**
     * 查询我的奖品
     * 
     * @param {any} openid 
     * @returns 
     * @memberof wxUserModule
     */
    myAwards(openid){
        let sql  = this.mono({backquote:false}).select('su.*,u.nickname,u.headimgurl',`${schema.supermarketWxUser.table} su`).ljoin(`${this.table} u`,'u.openid = su.openid').where({"su.openid":openid,'su.ischance':0}).query().sql;
        return this.query(sql);
    }

    /**
     * 分页查询
     */

    pageList( page = 1, pagecount = this.pagecount) {
        let _that = this, limit = pagecount,
        off = (page - 1) * pagecount;
        return co(function* () {
            let sql1 = _that.mono({backquote:false}).select('count(*) count',schema.supermarketWxUser.table).where('ischance=0').query().sql;
            let sql2 = _that.mono({backquote:false}).select('su.*,u.nickname,u.headimgurl',`${schema.supermarketWxUser.table} su`).ljoin(`${_that.table} u`,'u.openid = su.openid').where('su.ischance=0').limit(limit, off).query().sql;
          let totalcount = yield _that._count(sql1);
          let list = yield _that.query(sql2);
          return [
            list,
            {
              pagecount,
              page,
              totalcount
            }
          ]
        })
      }






}
module.exports = new wxUserModule('wx_user', {
    schema: require('../schema/wxUser.js')
});