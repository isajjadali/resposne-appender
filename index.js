
module.exports = function ({ reponsesConfigFilePath = './responses-config' }) {
    const responseConfig = require(`${process.cwd()}/${reponsesConfigFilePath}`);
    const methodsInfo = require('./methods-creator').createMethodNameWithRespectiveConfig(responseConfig);
    const methods = require('./methods-creator').methodCreater(methodsInfo);

    return function (req, res, next) {
        for (const func in methods) {
            res[func] = methods[func];
        }
        next();
    };
};
