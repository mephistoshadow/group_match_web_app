/* Course mongoose model */
const mongoose = require('mongoose')

const Login = mongoose.model('LogInfo', {
	username: {
		type: String,
		required: true,
	},
	password: {
	},
	id: {
		type: String
	}
})

module.exports = { Login }