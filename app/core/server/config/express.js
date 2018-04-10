var express = require('express');
var routeUtil = require('../routeUtil.js').loadRoute;

module.exports = function() {
    var app = express();
    routeUtil.init(app);//routeUtil.init(app,[可选参数，路由目录，默认为./routes/])，即可动态加载路由文件了
    var route = require('../router.js');
    route.mainEntrance(app);
    return app;
}