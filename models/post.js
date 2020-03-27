/* Course mongoose model */
const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
	course: mongoose.Types.ObjectId,
	content :{
		type: String,
		required: true,
		trim: true,
		maxlength: 280
	},
	author: mongoose.Types.ObjectId
})

PostSchema.index({'author': -1, 'courseCode': -1}, {unique: true})

const Post = mongoose.model('Post', PostSchema) 
module.exports = { Post }