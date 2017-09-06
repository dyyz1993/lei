/**
 * @Author: yingzhou xu
 * @Date:   2017-08-28T15:27:58+08:00
 * @Email:  dyyz1993@qq.com
 * @Filename: baseModule.js
 * @Last modified by:   yingzhou xu
 * @Last modified time: 2017-09-04T19:22:36+08:00
 */


const logger = log4js.getLogger('mysql');
const pool = exports.pool = util.pool;

// 查询mysql
const querySql = exports.querySql = function (sql, arr) {
  if (!util.ispro)		{ logger.info(sql); }
  return pool.queryAsync(sql, arr).catch((err) => {
    logger.error(err);
    throw err;
  });
};


/**
 * 查询次数
 */
exports.queryCount = function (sql) {
  return querySql(sql)
		.then(res => res.length > 0 ? res[0].count : 0);
};
/**
 * 查询单个用户
 */
exports.querySingle = function (sql) {
  return querySql(sql)
		.then(res => res[0]);
};

/**
 * 更新语句
 */
const updateSql = exports.updateSql = function (sql) {
  return querySql(sql)
		.then(res => res.affectedRows);
};

/**
 * 更新多条语句
 */
exports.updatesSql = co(function* (sqls) {
  const resultArr = [];
  for (const sql of sqls) {
    const res = yield updateSql(sql);
    resultArr.push(res);
  }
  return resultArr;
});


// 回滚次数
exports.transaction = co(function* (sqls) {
  let conn;
  try {
    conn = yield pool.getConnectionAsync();
    yield conn.beginTransactionAsync();
    for (const sql of sqls) {
      yield conn.queryAsync(sql);
    }
    yield conn.commitAsync();
    return true;
  } catch (e) {
    logger.error(`【异常】回滚`, e);
    yield conn.rollbackAsync();
    return false;
  } finally {
    conn && conn.release();
  }
});
