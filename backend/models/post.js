/* Course mongoose model */
const mongoose = require('mongoose')

const Post = mongoose.model('Post', {
	CourseName: {
		type: String,
		required: true,
		maxlength:3
	},
	Content :{
		type:String
	}
})

module.exports = { Post }