/**
 * @Author: yingzhou xu
 * @Date:   2017-09-05T18:18:48+08:00
 * @Email:  dyyz1993@qq.com
 * @Filename: base.js
 * @Last modified by:   yingzhou xu
 * @Last modified time: 2017-09-05T20:05:36+08:00
 */

const mono = require('./monologue');
const { log4js,pool,util,co } = require('./global');
const logger = log4js.getLogger('mysql');


class Base{
  constructor(tabel,options){
    this.mono = mono;
    this.tabel = config.pre?config.table_pre+table:tabel;
    this.debug = !uitl.ispro;
    this.schema = options.schema;
    this.fields = Object.keys(this.schema);
    this.pagecount = 20;
  }

// 查询mysql
  _query(conn,sql,param) {
    if (this.debug) { logger.debug(sql);}
    if(typeof sql === 'string') throw `sql must string`;
    return conn.queryAsync(sql,param).catch(err=>{
      logger.error(err);
      throw err;
    });
  };

  // 更新
  _update(sql,param){
    return this.query(sql,param).then(res=>{
      return res.affectedRows;
    });
  }

  // 单个
  _one(sql,param){
    return this.query(sql,param).then(res=>{
      return res[0];
    });
  }

  // 计数
  _count(sql,param){
    return this.query(sql,param).then(res=>{
      return res[0]?0:res[0].count;
    });
  }

  /**
   * 查询
   * @param {any} sql 
   * @param {any} param 
   * @returns 
   * @memberof Base
   */
  query(sql,param){
    let _that = this;
    return co(function*(){
      let conn
      try{
        conn = yield pool.getConnectionAsync();
        return yield _that._query(sql,param);
      }finally{
        conn&&conn.release();
      }
    })
  }

  // 过滤掉表没有的字段
  _filter(condition){
    if(typeof condition !== 'object'){
      throw `必须为数组或者对象`;
    }
    if(condition instanceof Array ){
      // 数组
      condition =   condition.filter(key=>{
        return this.schema[key]?true:false;
      })
    }else{
      //对象
      for(let key in  condition){
        if(!this.schema[key] || condition[key] === undefined) delete condition[key];
      }
      
    }
    return condition;
  }


  //校验参数
  _verify(condition){
    // for(let key in condition){
    //   if(this.schema[key]);  
    // }
    return condition;
  }

  /**
   * 计算个数
   * @param {any} condition 
   * @returns 
   * @memberof Base
   */
  count(condition){
    return this._count(this.mono({backquote:false}).select('count(*) count',this.tabel).where(condition).query().sql);
  }

  /**
   * 查询用户列表
   * @param {string} [fields='*'] 
   * @param {any} [condition={}] 
   * @param {number} [page=1] 
   * @param {any} [pagecount=this.pagecount] 
   * @returns {Array} [...fields]
   * @memberof Base
   */
  list(fields = '*',condition = {},page = 1,pagecount = this.pagecount){
    let limit = pagecount,off = (page-1)*pagecount;
    fields = typeof fields === 'string' ? fields:this._filter(fields);
    condition = this._verify(condition);
    return this.query(this.mono({backquote:false}).select(fields,this.tabel).where(condition).limit(limit,off).query().sql);
  }

  /**
   * 更新用户数据
   * @param {any} data      更新的数据
   * @param {any} condition 更新的条件
   * @returns 
   * @memberof Base
   */
  update(data,condition){
    data = this._filter(data);
    condition = this._filter(condition);
    return this._update(this.mono({backquote:false}).update(this.table,data).where(condition).query().sql);
  }
  
  /**
   * 物理删除用户数据
   * @param {any} condition 删除的条件
   * @returns  
   * @memberof Base
   */
  delete(condition){
    condition = this.filter(condition);
    return this._update(this.mono({backquote:false}).delete(this.tabel,condition).query().sql);
  }




  /**
   * 查询用户列表 分页
   * @param {string} [fields='*'] 
   * @param {any} [condition={}] 
   * @param {number} [page=1] 
   * @param {any} [pagecount=this.pagecount] 
   * @returns 
   * @memberof Base
   */
  pageList(fields = '*',condition = {},page = 1,pagecount = this.pagecount){
    let _that = this;
    return co(function*(){
      let totalcount = yield _that.count(condition);
      let list = yield _that.list(arguments);
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

  /**
   * 批量插入或更新
   * 
   * @param {any} array 
   * @param {any} [updateFields=this.fields] 需要更新的字段
   * @param {any} [fields=this.fields] 需要插入的字段
   * @returns {number} 影响的行数
   * @memberof Base
   */
  batchInsertUpdate(array,updateFields = this.fields,fields=this.fields){
    fields = this._filter(fields),updateFields = this._filter(updateFields);
    let updateSql = updateFields.map(k=>`${k} = values (${k})`).join(',');
    let valuesSql = array.map(item=>`(${Object.values(item).join(',')})`).join(',');
    let sql = `
      insert into ${this.tabel} 
      (${fields.join(',')})
      values
      ${valuesSql}
      duplicate key
      update 
      ${updateSql}
    `;
    return this._update(sql);
  }


  /**
   * 批量更新
   * @param {any} key 主键或者唯一键
   * @param {any} fields 需要更新的字段
   * @param {any} array 需要更新字段
   * @returns {number} 影响的行数
   * @memberof Base
   */
  batchUpdate(key,fields,array){
    fields = this._filter(fields);
    let whereSql = array.map(item=>item[key]).join(',')
    let arr  = [];
    for(let k of fields){
      let str = `SET ${k} = CASE ${key}`;
      for(let item of array){
        str +=`WHEN ${item[key]} THEN ${item[k]}`;
      }
      str += `END`
      arr.push(str);
    }
    let whenSql = arr.join(',')

    let sql = `
      UPDATE ${this.table}
      ${whenSql}
      WHERE ${key} IN (${whereSql})
    `;
    return this._update(sql);
  }



  /**
   * 批量插入
   * @param {any} array 
   * @memberof Base
   */
  batchInsert(array){
    return this._update(this.mono({backquote:false}).insert(this.tabel,array).query().sql);
  }

}


module.exports = Base;