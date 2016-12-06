/**
 * author longfei.liu
 * date 16/9/6
 */
var listBusiness = require('../../business/detailBusiness')();
module.exports = {

    query: function (req, res) {
        var pNum = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
        var rows = 10;
        listBusiness.pages(pNum, rows, function (data, countNum) {
            //console.log("页数"+Math.ceil(countNum/5)+":"+pNum);
            var compare = Math.ceil(countNum / 10);
            if (pNum >= compare) {
                pNum = compare;
            }
            if (pNum <= 1) {
                pNum = 1;
            }
            res.render('../views/admin/medicalConsum/list', {
                dataList: data,
                pageNum: pNum
            });

        })
    },

    deleteByData: function (req, res) {
        var delId = req.body.delete;
        listBusiness.delete({ '_id': delId }, function (data) {
            var state;
            if (data.state == "ok") {
                state = "删除成功"
            }
            //res.render('../views/admin/detail/list',{
            //    result:state
            //});
            res.redirect('/admin/pluginList');
        })
    }
};