const { pool,co,config,fs,TYPES } = require('../global');



 co(function*(){
    let result = yield pool.queryAsync(`show tables`);
    result = result.map(({Tables_in_test:table})=> {if(table.indexOf(config.table_pre) !==-1)return table }).filter(v=>v);
    console.log(result)
    //创建scheme
    for(let table of result){
        yield createScheme(table);
    }

})();



function createScheme(tabel){
    return co(function *(){
        let result = yield pool.queryAsync(`show FULL FIELDS  FROM ${tabel}`);
        let scheme = {};
        result.forEach(({ Field,Type,Comment,Default,Null })=> {
            scheme.type = convertFiled(Field); 
            return {
                
            }
        })
        console.log(scheme)
    })();
    
}


function convertFiled(field) {
    if (field.indexOf('char') > -1) {
      return TYPES.String;
    }
    if (field.indexOf('int') > -1) {
      return TYPES.Integer;
    }
    if (field === 'timestamp') {
      return TYPES.Integer;
    }
    if(field.indexOf('enum') > -1){
      return TYPES.ENUM;
    }
    if (field === 'tinytext' || field === 'mediumtext') {
      return TYPES.String;
    }
    if (field === 'text') {
      return TYPES.String;
    }
    if(field === 'date') {
      return TYPES.Date;
    }
    console.log(field);
    return TYPES.Any;
  }

// .then(res=>console.log(res));