/**

 */

var mongoose = require('mongoose'),
    schema = mongoose.Schema;

var medicalConsumablesSchema = new schema({
    mc_id: String,
	mc_name: String,
	mc_name_en: String,
	mc_name_short: String,
	mc_category: String,
	mc_brand: String,
	mc_item_no: String,
	mc_specification: String,
	mc_unit: String,
	mc_price: String,
	mc_dangerous_level: String,
	mc_des: String,
	mc_doc: String,
	mc_cas: String,
	mc_un: String,
	mc_img: String,
	mc_from: String,
	mc_save_envir: String,
	mc_url: String,
	mc_preps:String
});

module.exports=medicalConsumablesSchema;