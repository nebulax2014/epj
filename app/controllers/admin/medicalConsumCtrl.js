/**
 * Created by Administrator on 2016/9/2.
 */


var mcBusiness = require('../../business/medicalConsumablesBusiness')();
var multiparty = require('multiparty');
//var fs = require('fs');
module.exports = {

    mcSave: function (req, res) {

        var form = new multiparty.Form({ uploadDir: './public/updateImg/' });
        form.parse(req, function (err, fields, files) {
            //console.log(fields.title[0]);

            var detailModel = {
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
                console.log('parse error: ' + err);
                //res.send("写文件操作失败。");
            } else {
                //res.send("文件上传成功");

                mcBusiness.add(detailModel, function (data) {
                    var state;
                    if (data.state == "ok") {
                        state = "添加成功"
                    }
                    res.render('../views/admin/medicalConsum/result', {
                        result: state
                    });
                }, function () {

                });
            }
        });

    },
    mcAdd: function (req, res) {
        res.render('admin/medicalConsum/mcAdd', {
            userName: req.session.admin
        });
    }
};