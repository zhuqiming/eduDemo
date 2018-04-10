var url = require('url');
var routeUtil = require('./routeUtil.js');
var constant = require('./config/constant');



/**
 * 总入口
 * @param app
 */
module.exports.mainEntrance = function(app) {
    /**
     * 针对get形式的请求拦截,其余形式后续添加
     */
    app.get('/',function(req ,res) {
        res.end("received");
    });


    app.get('/edu',function(req ,res){
        console.log("req.url:  " + req.url);
        var query = url.parse(req.url,true).query;//获取参数
        console.log("参数: " + JSON.stringify(query));
        var routes = routeUtil.routeList;
        console.log("路由: " + routes);
        for(var i=0 ; i<routes.length ;i++) {
            var route = routes[i];
            if(query.attribute && query.attribute === route.path) {
                var action = route.action;
                action(req ,res);


                /*
                防止文件名中存在index.register.js这种形式的文件
                判断存在js后缀？不处理:加js后缀
                */
                /*var filenames = action.split('.');
                var filename = "js"===filenames[filenames.length-1]?action:action+'.js';
                //加载路由文件，在这里分发路由
                require(filename)(req ,res);*/
                return;
            }else {
                console.log("-------------------没有找到对应的路由参数attribute-------------------"
                        + query.attribute||null);
                handleError(req ,res ,constant.attributeErr);
                return;
            }
        }
        handleError(req ,res ,constant.notFound);
    });
}


function handleError(req ,res ,msg) {
    res.writeHead(500 ,{'Content-Type':'text/plain'});
    res.end(msg);
}