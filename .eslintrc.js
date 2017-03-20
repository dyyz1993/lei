module.exports = {
    extends : "lei",
    rules : {
        'promise/catch-or-return' : "off",
         "semi": 2
    },
    globals : {
        express : false,
        rootPath : false,
        config : false,
        util : false,
        log4js : false,
    }
};
