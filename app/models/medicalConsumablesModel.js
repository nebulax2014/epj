/**
 * author wusheng.xu
 * date 16/4/6
 */
var mongoose = require('mongoose'),
    medicalConsumablesSchema = require('../schemas/medicalConsumablesSchema'),

    medicalConsumablesModel = mongoose.model('medicalConsumables', medicalConsumablesSchema, 'medicalConsumables');

module.exports = medicalConsumablesModel;