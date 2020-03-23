/* Course mongoose model */
const mongoose = require('mongoose')

const MatchSchema = new mongoose.Schema({
	sender: {
        type: String,
		required: true,
	},
	receiver: {
        type: String,
		required: true
	},
	courseCode: {
		type: String,
		required: true,
		uppercase: true,
		maxlength: 6
	}
})

const Match = mongoose.model('Match', MatchSchema)
module.exports = { Match }
