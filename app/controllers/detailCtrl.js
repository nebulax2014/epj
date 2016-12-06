/**
 * Created by Administrator on 2016/9/2.
 */
var detailBusiness = require('../business/detailBusiness')();
module.exports= function (req,res) {

    detailBusiness.getAll(function(err,data){
        res.render('index',{
            item:data
        });
    })

}