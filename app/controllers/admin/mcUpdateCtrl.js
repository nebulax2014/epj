/**
 * author longfei.liu
 * date 16/9/6
 */
var updateBusiness = require('../../business/medicalConsumablesBusiness')();
var multiparty = require('multiparty');
module.exports = {
    query: function (req, res) {
        var byId = req.query.id;
        updateBusiness.getMCById(byId, function (data) {
            //console.log(data);
            res.render('../views/admin/medicalConsum/mcUpdate', {
                result: data
            });
        })
    },
    save: function (req, res) {

        var form = new multiparty.Form({ uploadDir: './public/updateImg/' });
        form.parse(req, function (err, fields, files) {
            //console.log(fields.title[0]);
            //var filesTmp = JSON.stringify(files,null,2);
            // var imgUrl, fileUrl;
            // files.Img[0].size > 100 ? imgUrl = files.Img[0].path.substring(7) : imgUrl = fields.oldImg[0];
            // files.downLoadUrl[0].size > 100 ? fileUrl = files.downLoadUrl[0].path.substring(7) : fileUrl = fields.oldFile[0];


            var detailModel = {
                '_id': fields._id[0],
                'mc_name': fields.mc_name[0],
                'mc_name_en': fields.mc_name_en[0],
                'mc_name_short': fields.mc_name_short[0],
                'mc_category': fields.mc_category[0],
                'mc_brand': fields.mc_brand[0],
                'mc_item_no': fields.mc_item_no[0],
                'mc_specification': fields.mc_specification[0],
                'mc_unit': fields.mc_unit[0],
                'mc_price': fields.mc_price[0],
                'mc_dangerous_level': fields.mc_dangerous_level[0],
                'mc_des': fields.mc_des[0],
                'mc_doc': fields.mc_doc[0],
                'mc_cas': fields.mc_cas[0],
                'mc_un': fields.mc_un[0],
                'mc_img': fields.mc_img[0],
                'mc_from': fields.mc_from[0],
                'mc_save_envir': fields.mc_save_envir[0],
                'mc_url': fields.mc_url[0],
                'mc_preps': fields.mc_preps[0]
            };

            if (err) {
                //console.log('parse error: ' + err);
                //res.send("写文件操作失败。");
            } else {
                //res.send("文件上传成功");

                updateBusiness.update({ '_id': detailModel._id }, detailModel, function (data) {
                    var state;
                    if (data) {
                        state = "修改成功"
                    }
                    res.render('../views/admin/medicalConsum/result', {
                        result: state
                    });
                });

            }
        });

    }
};




