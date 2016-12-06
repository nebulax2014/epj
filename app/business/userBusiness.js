/**
 * Created by Administrator on 2016/9/20.
 */
var mongoose = require('mongoose'),
    userModel = require('../models/userModel');
var userBusiness = function(){
    return{
        /**
         * 注册
         */
        register: function (detail,success,fail) {
            userModel.create(detail,function (err) {
                if(err){
                    //错误处理
                    if(typeof fail === Function){
                        success({"state": "error"})
                    }

                    return false;
                }

                if(success instanceof Function)
                {
                    success({"state":"注册成功"});
                }
            });
        },
        findOne : function(name,cb){
            userModel.findOne(name,function (err,data) {
                    if(err){
                        //错误处理
                        return false;
                    }
                    if(cb instanceof Function)
                        cb(data);
                });
        }
    }
};
module.exports = userBusiness;