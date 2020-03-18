/* Course mongoose model */
const mongoose = require('mongoose')

const Course = mongoose.model('Courses', {
	title: {
		type: String,
		required: true,
		maxlength:3
	},
	code: {
		type: Number,
		required: true,
		maxlegth:3
	},
	people: {
		type: Number
	}	
})

module.exports = { Course }