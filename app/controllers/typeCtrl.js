/**
 * 类型控制器
 * author wusheng.xu
 * date 16/4/6
 */
var typeBusiness = require('../business/typeBusiness')();
module.exports = function () {

    var model = {
        typeId: 0,
        platformId: '',
        name:''
    }
    return {
        add: function (req, res) {
            var platformId=parseInt(req.body['platformId']);
            platformBusiness.getPlatformByPlatformId(platformId, function (data) {
                if(data) {
                    model.typeId = parseInt(req.body['typeId']);
                    model.platformId = data._id;
                    model.name=req.body['name'];
                    typeBusiness.add(model, function (data) {
                        console.log(data);
                        res.json(data);
                        res.end();
                    })
                }else {
                    res.json({message:'平台id不存在!'});
                    res.end();
                }

            })

        }
    }
}