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
const util = require('util');
const dirPath = path.resolve(__dirname, '../src/schema');
// console.log(util.inspect(util, { showHidden: true, depth: 3,colors:true }));

co(function* () {
    let result = yield pool.queryAsync(`show tables`);
    result = result.map(({
        Tables_in_test: table
    }) => {
        if (table.indexOf(config.table_pre) !== -1) return table
    }).filter(v => v);
    logger.debug(`table`, result)
    //创建schema
    for (let table of result) {
        let schema = yield createschema(table);
        wrireFile(table, schema);
    }
    process.exit(-1);
});
/**
 * 写入文件
 * 
 * @param {any} table 
 * @param {any} schema 
 */
function wrireFile(table, schema) {
    let str = `
        module.exports = 
            ${util.inspect(schema, false,null)}
      `;
    try {
        //判断文件是否存在
        table = table.replace(eval('/^' + config.table_pre + '/g'), '');
        let tableName = utils.underlineToCamel(table);
        let realFilePath = path.resolve(__dirname, `../src/schema/${tableName}.js`);
        if (fs.existsSync(realFilePath)) {
            throw new Error(`${tableName}.js 文件存在,写入失败`);
        } else {
            fs.writeFileSync(realFilePath, str);
            let index = fs.readFileSync(path.resolve(dirPath, './index.js'));
            logger.trace(`${table} 创建成功`);

            fs.writeFileSync(path.resolve(dirPath, './index.js'), index.toString().replace(/\n/,
                `${tableName}:require('./${tableName}.js'),
                `))
            logger.trace(`${tableName} 添加成功`);
        }

    } catch (error) {
        logger.trace(error)
    }
}
/**
 * 创建schema
 * @param {any} table 
 * @returns 
 */
function createschema(table) {
    return co(function* () {
        try {

            let result = yield pool.queryAsync(`show FULL FIELDS  FROM ${table}`);
            let schema = {
                type: 'object',
                title: table,
                table,
                additionalProperties: false,
                properties: {},
                required: [],
            };
            result.forEach(({
                Field,
                Type,
                Comment,
                Default,
                Null
            }) => {
                let obj = {
                    type: convertFiled(Type),
                }
                if (Comment !== '') {
                    obj.description = Comment;
                }
                //是否必填
                if (Null === 'NO')
                    schema.required.push(Field)
                //默认值
                if (Default !== null) {
                    obj.default = Default;
                }
                if (obj.type === TYPES.ENUM) {
                    obj.enum = Type.split('enum')[1].split(/','/).map(v => v.replace(/\(\'|\'\)/, ''))
                    obj.type = TYPES.String;
                }

                if (obj.type === TYPES.Date) {
                    obj.type = TYPES.String;
                    // obj.format = 'YYYY-MM-DD HH:mm:ss'
                }

                schema.properties[Field] = obj;

            })

            return schema;

        } catch (error) {
            console.log(error.stack)
        }
    });

}


function convertFiled(type) {
    if (type.indexOf('char') > -1) {
        return TYPES.String;
    }
    if (type.indexOf('int') > -1) {
        return TYPES.Number;
    }
    if (type === 'timestamp') {
        return TYPES.Integer;
    }
    if (type.indexOf('enum') > -1) {
        return TYPES.ENUM;
    }
    if (type === 'tinytext' || type === 'mediumtext') {
        return TYPES.String;
    }
    if (type === 'text') {
        return TYPES.String;
    }
    if (type === 'date') {
        return TYPES.Date;
    }
    if (type === 'datetime') {
        return TYPES.Date;
    }
    return TYPES.Any;
}

// .then(res=>console.log(res));