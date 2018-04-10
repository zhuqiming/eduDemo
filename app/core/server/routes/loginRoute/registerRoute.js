var routeUtil = require("../../routeUtil.js");

const filename = __dirname+"/"+__filename;//与文件名一致 js后缀不必须
const path =  "register";
module.exports.execute = function(req ,res) {
    console.log("注册路由");
    var loginController = require('../../controllers/loginController/loginServerController');
    loginController.register(req ,res);
};
module.exports.basePath = path;
