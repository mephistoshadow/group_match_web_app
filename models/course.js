/* Course mongoose model */
const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
	title: {
		type: String
	},
	courseCode: {
		type: String,
		required: true,
		uppercase: true,
		maxlength: 6
	},
	people: {
		type: Number
	}
	
})

const Course = mongoose.model('Course', courseSchema) 
module.exports = { Course }