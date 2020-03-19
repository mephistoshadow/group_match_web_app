/* Course mongoose model */
const mongoose = require('mongoose')

const LogInfo = mongoose.model('LogInfo', {
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

module.exports = { LogInfo }