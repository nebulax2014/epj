/**
 * 详细业务
 */


var mongoose = require('mongoose'),
    mcModal = require('../models/medicalConsumablesModel'),
    config = require('../config');

var listBusiness = function () {
    return {
        /**
         * 查询所有
         * 参数:callback
         */
        getAll: function (cb) {
            mcModal.find({}).limit(config.pageSize)
                .exec(cb);
        },
        /**
         * 根据id查询
         * 参数:id,callback
         */
        getMCById: function (id, cb) {

            mcModal
                .findOne({ _id: id })
                .exec(function (err, data) {
                    if (err) {
                        //错误处理

                        return false;
                    }
                    if (cb instanceof Function)
                        cb(data);
                });
        },
        /**
         * 根据mc_name查询
         * 参数:mc_name,callback
         * 返回array
         */
        getMCByMcName_A: function (mc_name, cb) {

            mcModal
                .find({ 'mc_name': { $regex: mc_name, $options: 'i' } }, { mc_name: 1, _id: 0 }).limit(10)
                .exec(function (err, data) {
                    if (err) {
                        //错误处理

                        return false;
                    }
                    var arr = [];
                    for (var i = 0; i < data.length; i++) {
                        arr.push(data[i].mc_name);
                    }
                    if (cb instanceof Function)
                        cb(arr);
                });
        },

        /**
         * 根据mc_name查询
         * 参数:mc_name,callback
         * 返回json
         */
        getMCByMcName_J: function (mc_name, page, cb) {
            var searchOpt = {};
            if (mc_name == null || mc_name.trim() == "") {
                //searchOpt={}
            } else {
                searchOpt = { 'mc_name': { $regex: mc_name, $options: 'i' } }
            }
            mcModal
                .find(searchOpt).skip((page - 1) * config.pageSize).limit(config.pageSize).where(searchOpt)
                .exec(function (err, data) {
                    if (err) {
                        //错误处理
                        return false;
                    }
                    mcModal.find(searchOpt).count(function (err, count) {
                        if (err) {
                            return false;
                        }
                        jsonResult = { rows: data, total: count };
                        if (cb instanceof Function)
                            cb(jsonResult);
                    });

                });
        },

        /**
         * 添加
         */
        add: function (detail, success, fail) {
            //console.log(cb);
            mcModal.create(detail, function (err) {
                if (err) {
                    //错误处理
                    console.log(err);
                    if (typeof fail === Function) {
                        fail();
                    }
                    return false;
                }


                if (success instanceof Function) {
                    console.log("business" + "成功");
                    success({ "state": "ok" });
                }
            });
        },
        /**
         * 修改
         * @param where 查询条件(object)
         * @param setObj 修改参数(object)
         * @param cb 回调(返回修改的数据)
         */
        update: function (where, setObj, cb) {
            mcModal.update(where, { $set: setObj }, function (err, data) {
                if (err) {
                    //错误处理
                    return false;
                }
                if (cb instanceof Function)
                    cb(data);
            })
        },
        /**
         * 删除
         * @param where 查询条件(object)
         * @param cb 回调(返回修改的数据)
         */
        delete: function (where, cb) {
            mcModal.remove(where, function (err, data) {
                if (err) {
                    //错误处理
                    return false;
                }
                if (cb instanceof Function)
                    cb(data);
            });
        },
        /**
         * 分页
         */
        pages: function (page, rows, cb) {
            mcModal.count({}, function (err, num) {
                if (err) {
                    //错误处理
                    return false;
                }
                mcModal.find({}).skip((page - 1) * rows).limit(rows).sort({ "_id": -1 })
                    .exec(function (err, data) {
                        if (err) {
                            //错误处理
                            return false;
                        }
                        if (cb instanceof Function)
                            cb(data, num);
                    });
            }
            );

        }
    }
}

module.exports = listBusiness;
