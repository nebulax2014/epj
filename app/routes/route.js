/**
 * 路由器
 * date 16/4/5
 */

var index = require('../controllers/indexCtrl'),
    filter = require('../controllers/filterCtrl'),
    typeCtrl = require('../controllers/typeCtrl')(),
    detail_add = require('../controllers/admin/detailAddCtrl'),
    listCtrl = require('../controllers/admin/listCtrl'),
    mcListCtrl = require('../controllers/admin/mcListCtrl'),
    updateCtrl = require('../controllers/admin/updateCtrl'),
    admin = require('../controllers/admin/adminCtrl'),
    visualCtrl = require('../controllers/admin/visualCtrl'),
    medicalConsum = require('../controllers/admin/medicalConsumCtrl'),
    mcUpdate = require('../controllers/admin/mcUpdateCtrl'),
    contact = require('../controllers/contactCtrl'),
    newsManage = require('../controllers/admin/newsManageCtrl'),
    catchAllException = require('../controllers/catchAllException');

module.exports = function (app) {
    app.get('/', index.query);
    app.get('/index', index.query);

    //后台身份校验
    app.all('/admin/*', filter);


    app.get('/admin', admin.loadAdmin);
    app.get('/admin/index', admin.save);
    //主页 默认页
    app.get('/admin/home', function (req, res) {
        res.render('admin/home', {});
    });
    app.post('/admin/home', admin.save);

    //列表list
    app.get('/admin/list', listCtrl.query);
    app.post('/admin/list', listCtrl.deleteByData);
    //列表update
    app.get('/admin/pluginUpdate', updateCtrl.query);
    app.post('/admin/pluginUpdate', updateCtrl.save);

    //详细add
    app.get('/admin/detailAdd', detail_add.loadAdd);
    //详细add
    app.post('/admin/detailAdd', detail_add.addData);

    //用户user
    app.get('/admin/detailUser', function (req, res) {
        res.render('admin/detail/user', {});
    });
    // app.post('/admin/addPlatform',platformCtrl);

    //用户注册(admin)
    //app.get('/admin', admin.loadAdmin);
    //app.post('/admin',admin.admin);

    //登陆(login)
    app.get('/login', admin.loadLogin);
    app.post('/login', admin.login);

    //注销(logout)
    app.get('/logout', admin.logout);


    //关键词搜索
    app.get('/search', index.search);
    //搜索结果
    app.get('/searchResult', index.searchResult);
    //详情
    app.get('/detail', index.detail);

    //管理后台部分
    app.get('/admin/mcList', mcListCtrl.query);
    app.post('/admin/mcList', mcListCtrl.deleteByData);

    //产品add
    app.get('/admin/mcAdd', medicalConsum.mcAdd);
    app.post('/admin/mcSave', medicalConsum.mcSave);

    //产品update
    app.get('/admin/mcUpdate', mcUpdate.query);
    app.post('/admin/mcUpdate', mcUpdate.save);

    //内容管理
    app.get('/admin/newsAdd', newsManage.add);
    app.post('/admin/newsAdd', newsManage.save);

    //文件上传
    app.get('/admin/ueditor', newsManage.config);
    app.post('/admin/ueditor', newsManage.fileSave);

    //联系我们
    app.get('/contact', contact.query);



    //捕获所有异常
    //app.all('/*', catchAllException);
};