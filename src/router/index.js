
const fs = require('fs');
const path = require('path');
const { log4js }  = require('../global');
const logger = log4js.getLogger();

const dirPath = path.resolve(__dirname,'./');
const listFilesPath = fs.readdirSync(dirPath);

module.exports =(app,router)=> {
    for (let file of listFilesPath) {
      if(file === 'index.js' ||file === 'wsRouter.js' || file.indexOf('.js') === -1){continue;}
          logger.debug('Load: %s', file.split('.js')[0]);
          app.use('/apis/'+file.split('.js')[0] ,require('./' + file)(router));
      }
}