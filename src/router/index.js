
const fs = require('fs');
const path = require('path');
const { log4js }  = require('../global');
const logger = log4js.getLogger();

const dirPath = path.resolve(__dirname,'./');
const listFilesPath = fs.readdirSync(dirPath);

module.exports =()=> {

    for (let file of listFilesPath) {
        if (file !== 'index.js' && file.indexOf('.js') !== -1) {
          logger.debug('Load: %s', file);
          require('./' + file)(api);
        }
      }
}