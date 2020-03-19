/* Course mongoose model */
const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
	courseCode: {
		type: String,
		required: true,
		uppercase: true,
		maxlength: 6
	},
	content :{
		type: String,
		required: true,
		trim: true,
		maxlength: 280
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	}
})

const Post = mongoose.model('Post', PostSchema) 
module.exports = { Post }