const {
  pool,
} = util;


function BaseModule(options) {
  this.options = options || {};
}


BaseModule.query = function (sql) {
  return pool.queryAsync(sql);
};

BaseModule.prototype.add = function (sql) {

  return this.query(sql);
};

BaseModule.prototype.add = function (sql) {
  return pool.queryAsync(sql);
};


module.exports = BaseModule;
