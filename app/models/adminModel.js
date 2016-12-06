/**
 * author wusheng.xu
 * date 16/4/6
 */
var mongoose = require('mongoose'),
    adminSchema = require('../schemas/adminSchema'),

    adminModel = mongoose.model('administrators', adminSchema, 'administrators');

module.exports = adminModel;