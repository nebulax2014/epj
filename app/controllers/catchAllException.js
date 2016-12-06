/**
 */
var path = require('path');
module.exports = function (req, res, next) {
    //拦截404
    // catch 404 and forward to error handler
    // app.use(function (req, res, next) {
    // var err = new Error('Not Found');
    // err.status = 404;
    //     next(err);
    // });

    // if (res.statusCode == '404') {
    //     res.status(404).sendfile(path.resolve('public/images/404.jpg'));
    // } else {
    //     next()
    // }
    next();
}