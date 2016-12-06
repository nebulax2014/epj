/**
 * author wusheng.xu
 * date 16/4/6
 */

module.exports = function (req, res, next) {
    //过滤器待完善
    if (!req.session.admin) {
        if (req.path != 'login') {
            res.redirect("/login");
        }
    }
    //var userName = req.session.admin;
    next();
}