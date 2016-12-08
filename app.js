/**
 * author:autozi frontEnd team:liyong、大飞、wusheng
 * date 
 */
var express = require('express'),
    app = express(),
    fs = require('fs'),
    path = require('path'),
    http = require('http').Server(app),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    multiparty = require('multiparty'),
    session = require('express-session'),
    config = require('./app/config'),
    port = config.port,    //端口号
    dbPath = config.dbPath,
    ueditor = require("ueditor");


mongoose.connect(dbPath);

app.set('views', './app/views'); //设置views目录
app.set('view engine', 'ejs');   //设置视图引擎

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/ueditor/ueditor", ueditor(path.join(__dirname, 'public'), function(req, res, next) {
    // ueditor 客户发起上传图片请求
    if (req.query.action === 'uploadimage') {
        var foo = req.ueditor;
        var imgname = req.ueditor.filename;
        var img_url = '/images/ueditor/';
        //你只要输入要保存的地址 。保存操作交给ueditor来做
        res.ue_up(img_url);
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = '/images/ueditor/';
        // 客户端会列出 dir_url 目录下的所有图片
        res.ue_list(dir_url);
    }
    // 客户端发起其它请求
    else {
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/ueditor/nodejs/config.json');
    }
}));

app.use(session({
    resave: false,//添加这行  
    saveUninitialized: true,//添加这行   
    secret: 'secret',
    //key: settings.db,//cookie name  
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },//30 days  
    // store: new MongoStore({
    //     db: settings.db,
    //     host: settings.host,
    //     port: settings.port
    // })
}));
//1000*60*20
app.use(function(req, res, next) {
    res.locals.user = req.session.admin;   // 从session 获取 user对象
    next();  //中间件传递
});


app.listen(port);
app.use(express.static(__dirname + '/public'));
require('./app/routes/route')(app);

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


console.log('服务已启动 端口:' + port);



