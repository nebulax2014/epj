/**
 * author longfei.liu
 * date 16/9/6
 */
var mcListBusiness = require('../../business/medicalConsumablesBusiness')();
module.exports = {
    //query : function (req,res) {
    //
    //    mcListBusiness.getAll(function(err,data){
    //        //console.log(data);
    //        res.render('../views/admin/detail/list',{
    //            dataList : data
    //        });
    //    })
    //
    //},

    query: function (req, res) {
        var page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
        //var rows = 10;
        mcListBusiness.getMCByMcName_J('', page, function (jsonResult) {
            //console.log("页数"+Math.ceil(countNum/5)+":"+page);
            var countNum = jsonResult.total;
            var compare = Math.ceil(countNum / 10);
            if (page >= compare) {
                page = compare;
            }
            if (page <= 1) {
                page = 1;
            }
            res.render('../views/admin/medicalConsum/mcList', {
                dataList: jsonResult.rows,
                pageNum: page
            });

        })
    },

    deleteByData: function (req, res) {
        var delId = req.body.delete;
        mcListBusiness.delete({ '_id': delId }, function (data) {
            var state;
            if (data.state == "ok") {
                state = "删除成功"
            }
            //res.render('../views/admin/medicalConsum/list',{
            //    result:state
            //});
            res.redirect('/admin/mcList');
        })
    }
};