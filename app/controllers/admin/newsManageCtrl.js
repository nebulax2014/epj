/**
 * Created by Administrator on 2016/9/2.
 */


// var detailBusiness = require('../../business/detailBusiness')();
// var multiparty = require('multiparty');
//var fs = require('fs');
var path = require('path');
module.exports = {

    add: function (req, res) {
        // if (!req.session.admin) {
        //     res.redirect("/login");
        // } else {
        // var form = new multiparty.Form({ uploadDir: './public/updateImg/' });
        // form.parse(req, function (err, fields, files) {
        //console.log(fields.title[0]);

        // var detailModel = {
        //     'title': fields.title[0],
        //     'Describe': fields.describe[0],
        //     'createTime': new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
        //     'Platform': fields.platform[0],
        //     'Img': files.Img[0].path.substring(7),
        //     'authorid': fields.authorid[0],
        //     'downLoadUrl': files.downLoadUrl[0].path.substring(7),
        //     'pluginTypeId': fields.pluginTypeId[0],
        //     'domeURL': fields.domeURL[0],
        //     'categoryId': fields.categoryId[0]
        // };
        // console.log(detailModel.downLoadUrl);

        // if (err) {
        //     console.log('parse error: ' + err);
        //     //res.send("写文件操作失败。");
        // } else {
        //     //res.send("文件上传成功");

        //     detailBusiness.add(detailModel, function (data) {
        //         var state;
        //         if (data.state == "ok") {
        //             state = "添加成功"
        //         }
        //         res.render('../views/admin/detail/result', {
        //             result: state
        //         });
        //     }, function () {

        //     });
        //     //console.log('parse files: ' + filesTmp);
        //     var fileNameArr = Object.keys(files);
        //     var firstFilename = fileNameArr[0];
        //     var fileDataArr = files[firstFilename];
        //     //console.log( typeof fileDataArr);
        //     //console.log(fileDataArr);
        //     var fileData = fileDataArr[0];
        //     var uploadedPath = fileData.path;
        //     var dstPath = './public/' + firstFilename.originalFilename;
        //     //fs.rename(uploadedPath, dstPath, function(err) {
        //     //    if (err){
        //     //        console.log("重命名文件错误："+ err);
        //     //    } else {
        //     //        console.log("重命名文件成功。");
        //     //    }
        //     //});
        // }
        // });
        // }
        res.render('admin/newsAdd', {});
    },
    save: function (req, res) {

        // res.render('admin/detail/add', {
        //     userName: req.session.admin
        // });

    },
    fileSave: function (req, res) {

    },
    config: function (req, res) {
        if(req.query.action=='config'){
        res.sendfile(path.resolve('public/ueditor/nodejs/config.json'));
        }
    }

};