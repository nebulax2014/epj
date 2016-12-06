/**
 * 详细业务
 * author wusheng.xu
 * date 16/4/7
 */


var mongoose = require('mongoose'),
    detailModel = require('../models/detailModel');

var detailBusiness = function () {
    return {
        /**
         * 查询所有
         * 参数:callback
         */
        getAll: function (cb) {
            detailModel.find({})
                .exec(cb);
        },
        /**
         * 根据id查询
         * 参数:id,callback
         */
        getTypeById: function (id, cb) {

            detailModel
                .findOne({_id: id})
                .exec(function (err,data) {
                    if(err){
                        //错误处理
                        console.log(err);
                        return false;
                    }
                    if(cb instanceof Function)
                        cb(data);
                });
        },
        /**
         * 根据自定义条件查询
         * 参数:条件语句,callback
         */
        getTypeByWhere: function (where, cb) {
            detailModel
                .find(where)
                .exec(function (err,data) {
                    if(err){
                        //错误处理
                        return false;
                    }
                    if(cb instanceof Function)
                        cb(data);
                });
        },
        /**
         * 添加
         */
        add: function (detail,success,cb) {
            //console.log(cb);
            detailModel.create(detail,function (err) {
                if(err){
                    //错误处理
                    console.log(err);
                    if(typeof fail === Function){
                        cb({"state": "error"})
                    }

                    return false;
                }

                if(success instanceof Function)
                {
                    success({"state":"ok"});
                }
            });

            //detail= new Detail(detail);
            //detail.save(function (err,data) {
            //    if(err){
            //        //错误处理
            //        return false;
            //    }
            //    if(cb instanceof Function)
            //        cb(data);
            //})

        },
        /**
         * 修改
         * @param where 查询条件(object)
         * @param setObj 修改参数(object)
         * @param cb 回调(返回修改的数据)
         */
        update: function (where,setObj,cb) {
            detailModel.update(where,{$set:setObj}, function (err,data) {
                if(err){
                    //错误处理
                    if(cb instanceof Function) {
                        cb({"state": "error"})
                    }
                    return false;
                }
                if(cb instanceof Function)
                    cb({"state":"ok"});
            })
        },
        /**
         * 删除
         * @param where 查询条件(object)
         * @param cb 回调(返回修改的数据)
         */
        delete: function (where,cb) {
            detailModel.remove(where, function (err,data) {
                if(err){
                    //错误处理
                    if(cb instanceof Function) {
                        cb({"state": "error"})
                    }
                    return false;
                }
                if(cb instanceof Function)
                    cb({"state":"ok"});
            });
        },
        /**
         * 分页
         */
        pages:function(page,rows,cb){
            detailModel.count({},function(err,num){
                if(err){
                    //错误处理
                    return false;
                }
                detailModel.find({}).skip((page-1)*rows).limit(rows).sort({"_id":-1})
                    .exec(function (err,data) {
                        if(err){
                            //错误处理
                            return false;
                        }
                        if(cb instanceof Function)
                            cb(data,num);
                    });
                }
            );

        }
    }
};

module.exports = detailBusiness;
