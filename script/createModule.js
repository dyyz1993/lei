const {
    pool,
    co,
    config,
    log4js,
    TYPES,
    utils
} = require('../src/global');

const logger = log4js.getLogger();
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const dirPath = path.resolve(__dirname, '../src/module');


co(function* () {
    try {
        let result = yield pool.queryAsync(`show tables`);
        result = result.map(({
            Tables_in_test: table
        }) => {
            if (table.indexOf(config.table_pre) !== -1) return table
        }).filter(v => v);
        logger.debug(`table`, result)

        //创建schema
        for (let table of result) {
            createModule(table);
            // wrireFile(table, schema);
        }
        process.exit(-1);
    } catch (error) {
        logger.error(error);
    }

});


function createModule(table) {
    try {


        table = table.replace(eval('/^' + config.table_pre + '/g'), '');
        let tableName = utils.underlineToCamel(table);
        let tmp = fs.readFileSync('./script/tempModule.js');
        tmp = ejs.render(tmp.toString(), {
            table,
            tableName
        });
        let realFilePath = path.resolve(dirPath, `./${tableName}Module.js`);
        if (fs.existsSync(realFilePath)) {
            throw new Error(`%1:文件存在覆盖 `, table);
        } else {
            fs.writeFileSync(realFilePath, tmp);
            //index.js 添加;
            let index = fs.readFileSync(path.resolve(dirPath, './index.js'));
            logger.trace(`${table} 创建成功`);
            fs.writeFileSync(path.resolve(dirPath, './index.js'), index.toString().replace(/\}/,
                `${tableName}Module:require('./${tableName}Module.js'),
                }`))
            logger.trace(`${tableName} 添加成功`);
        }
    } catch (error) {
        logger.error(error);
    }


}