/* Course mongoose model */
const mongoose = require('mongoose')
const validator = require('validator')

const Login = mongoose.model('LogInfo', {
	username: {
		type: String,
		required: true,
		trim: true,
		unique: true
		minlength: 1
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: "Not a valid email"
		}
	}
})

module.exports = { Login }