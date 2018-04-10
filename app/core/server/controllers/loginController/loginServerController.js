/**
 * 登录相关控制器
 * @type {{register: module.exports.register, login: module.exports.login}}
 */



module.exports = {
    /**
     * 用户注册
     */
    "register" : function(req,res) {
        console.log("注册");
        res.send("注册");
    },
    /**
     * 登录验证
     */
    "login" : function(req ,res) {
        console.log("登录");
        res.send("登录");
    }
}