/* Student mongoose model */
const mongoose = require('mongoose')

const Student = mongoose.model('Student', {
	username: {
		type:String,
		minlength:1
	},
	name: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	year: {
		type: Number,
		required: true
	},
	courses:[String],
	email: {
		type :String,
	},
	role: {
		type:String
	}

})

module.exports = { Student }