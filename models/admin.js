
const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
	username: {
		type:String,
		minlength:1
	},
	name: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	}
})

const Admin = mongoose.model('Admin', AdminSchema)
module.exports = { Admin }