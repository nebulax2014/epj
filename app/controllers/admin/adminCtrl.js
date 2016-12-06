/**
 * Created by Administrator on 2016/9/20.
 */
var adminBS = require('../../business/adminBusiness')();
module.exports = {
    loadRegister: function (req, res, next) {
        res.render('../../views/register', {});
    },
    register: function (req, res, next) {
        var dataName = { "userName": req.body.uname, "loginName": req.body.ulogin, "password": req.body.upassword };
        adminBS.findOne(dataName, function (data) {
            if (data) {
                res.json({ "state": "用户名已注册~" });
            } else {
                adminBS.register(dataName, function (succeed) {
                    res.json(succeed);
                });
            }

        });
    },
    loadLogin: function (req, res, next) {
        res.render('../views/login', {});
    },

    loadAdmin: function (req, res, next) {

        res.render('admin/index', {
            loginName: req.session.admin
        });

    },
    login: function (req, res, next) {
        var loginName = { "loginName": req.body.ulogin };
        adminBS.findOne(loginName, function (data) {
            if (!data) {
                res.json({ "state": "0002", msg: "登录名不存在!" });
            } else {
                if (req.body.upassword != data.password) {
                    res.json({ "state": "0001", msg: "密码错误！" });
                } else {
                    req.session.admin = data.userName;
                    res.json({ "state": "0000", msg: "登陆成功！" });
                }
            }
        });
    },
    logout: function (req, res, next) {
        req.session.admin = null;
        res.redirect("/login");
    },
    save: function (req, res, next) {

    }
};