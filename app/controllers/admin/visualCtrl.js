/**
 * Created by Administrator on 2016/9/1.
 */
var echBusiness = require('../../business/detailBusiness')();
module.exports= {
    save : function(req,res,next){

        echBusiness.getTypeByWhere({"categoryId":"插件"}, function (data) {
            console.log(data);
            res.render('../views/admin/detail/visual',{
                dataLength : data
            });
        })
    }
};