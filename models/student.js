/* Student mongoose model */
const mongoose = require('mongoose')

const Student = mongoose.model('Student', {
	username: {
		type: String,
		required: true,
		minlength: 1
	},
	firstName: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	lastname: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	year: {
		type: Number,
		required: true
	},
	courses: [String],
	CGPA: {
		type: Number,
		minvalue: 0.0,
		maxvalue: 4.0
	},
	isCommuter: Boolean
})

module.exports = { Student }