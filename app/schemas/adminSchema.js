/**

 */

var mongoose = require('mongoose'),
	schema = mongoose.Schema;

var adminSchema = new schema({
	userName: String,
	loginName:String,
	password: String,
	createDate: String

});

module.exports = adminSchema;