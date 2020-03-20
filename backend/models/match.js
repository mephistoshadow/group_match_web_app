/* Course mongoose model */
const mongoose = require('mongoose')

const MatchSchema = new mongoose.Schema({
	sender: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	receiver: {
		type: mongoose.Schema.Types.ObjectId,
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