/* Course mongoose model */
const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
	title: {
		type: String,
		minlength: 1
	},
	code: {
		type: String,
		required: true,
		uppercase: true,
		minlength: 6,
		maxlength: 6
	},
	people: {
		type: Number,
		default: 0
	}
	
})

const Course = mongoose.model('Course', courseSchema) 
module.exports = { Course }