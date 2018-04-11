var fs = require('fs');

var routes = [];//路由数组，用于匹配路由
module.exports.routeList = routes;
var addRoutes = function(path,action) {
    var route = {
        "path" : path,
        "action" : action
    };
    routes.push(route);
}

/**
 * 动态遍历目录加载路由工具
 * author: 朱启铭-改
 */
// 动态路由
var loadRoute = {
    path : __dirname + '/routes/',
    app : null,
    // 遍历目录
    listDir : function(dir){
        //同步读取目录，返回该目录下的文件list
        var fileList = fs.readdirSync(dir,'utf-8');
        for(var i=0;i<fileList.length;i++) {
            var stat = fs.lstatSync(dir + fileList[i]);//返回同步stats实例
            // 是目录，需要继续
            if (stat.isDirectory()) {
                this.listDir(dir + fileList[i]  + '/');
            } else {
                this.loadRoute(dir + fileList[i]);
            }
        }
    },
    // 加载路由
    loadRoute : function(routeFile){

        var route = require(routeFile.substring(0,routeFile.lastIndexOf('.')));
        // 在路由文件中定义了一个basePath变量，设置路由路径前缀
        if(route.basePath){
            // this.app.use(route.basePath,route);
            addRoutes(route.basePath,route.execute);
        }/*else{
            this.app.use(route);
        }*/

    },
    // 初始化入口
    init : function(app,path){
        if(!app){
            console.error("系统主参数App未设置");
            return false;
        }
        this.app = app;
        this.path = path?path:this.path;
        this.listDir(this.path);
        // console.log(routes);
    }
};

module.exports.loadRoute = loadRoute;