/* Course mongoose model */
const mongoose = require('mongoose')

const MatchSchema = new mongoose.Schema({
	sender: mongoose.Types.ObjectId,
	receiver: mongoose.Types.ObjectId
	course: mongoose.Types.ObjectId
})

const Match = mongoose.model('Match', MatchSchema)
module.exports = { Match }
