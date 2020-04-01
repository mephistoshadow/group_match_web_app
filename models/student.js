/* Student mongoose model */
const mongoose = require('mongoose')

const Student = mongoose.model('Student', {
	username: {
		type: String,
		required: true,
		trim: true,
		unique: true,
		minlength: 1
	},
	firstName: {
		type: String,
		required: true,
		trim: true,
		minlength: 1
	},
	lastName: {
		type: String,
		required: true,
		trim: true,
		minlength: 1
	},
	year: {
		type: Number,
		minvalue: 1,
		maxvalue: 4,
		required: true
	},
	courses: [mongoose.Types.ObjectId],
	CGPA: {
		type: Number,
		minvalue: 0.0,
		maxvalue: 4.0,
		required: true
	},
	isCommuter: Boolean
})

module.exports = { Student }
