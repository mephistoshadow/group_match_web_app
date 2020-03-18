/* Course mongoose model */
const mongoose = require('mongoose')

const Match = mongoose.model('Match', {
	sender: {
		type: Number,
		required: true,
	},
	receiver: {
		type: Number,
		required: true
	},
	Course: {
		type: String
	},
	Status: {
		type:String
	}
})

module.exports = { Match }