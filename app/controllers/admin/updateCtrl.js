/**
 * author longfei.liu
 * date 16/9/6
 */
var updateBusiness = require('../../business/detailBusiness')();
module.exports = {
    query: function (req, res) {
        var byId = req.query.id;
        updateBusiness.getTypeById(byId, function (data) {
            //console.log(data);
            res.render('../views/admin/medicalConsum/update', {
                dataByTypeId: data
            });
        })
    },
    save: function (req, res) {

        var form = new multiparty.Form({ uploadDir: './public/updateImg/' });
        form.parse(req, function (err, fields, files) {
            //console.log(fields.title[0]);
            //var filesTmp = JSON.stringify(files,null,2);
            var imgUrl, fileUrl;
            files.Img[0].size > 100 ? imgUrl = files.Img[0].path.substring(7) : imgUrl = fields.oldImg[0];
            files.downLoadUrl[0].size > 100 ? fileUrl = files.downLoadUrl[0].path.substring(7) : fileUrl = fields.oldFile[0];


            var detailModel = {
                'id': fields.id[0],
                'title': fields.title[0],
                'createTime': new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
                'Platform': fields.platform[0],
                'Img': imgUrl,
                'authorid': fields.authorid[0],
                'downLoadUrl': fileUrl,
                'pluginTypeId': fields.pluginTypeId[0],
                'domeURL': fields.domeURL[0],
                'categoryId': fields.categoryId[0],
                'Describe': fields.Describe[0]
            };

            if (err) {
                //console.log('parse error: ' + err);
                //res.send("写文件操作失败。");
            } else {
                //res.send("文件上传成功");
                console.log(detailModel.downLoadUrl);
                updateBusiness.update({ '_id': detailModel.id }, detailModel, function (data) {
                    var state;
                    if (data.state == "ok") {
                        state = "修改成功"
                    }
                    res.render('../views/admin/medicalConsum/result', {
                        result: state
                    });
                });
                //console.log('parse files: ' + filesTmp);
                var fileNameArr = Object.keys(files);
                var firstFilename = fileNameArr[0];
                var fileDataArr = files[firstFilename];
                //console.log( typeof fileDataArr);
                //console.log(fileDataArr);
                var fileData = fileDataArr[0];
                var uploadedPath = fileData.path;
                var dstPath = './public/' + firstFilename.originalFilename;
                //fs.rename(uploadedPath, dstPath, function(err) {
                //    if (err){
                //        console.log("重命名文件错误："+ err);
                //    } else {
                //        console.log("重命名文件成功。");
                //    }
                //});
            }
        });

    }
};




