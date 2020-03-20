
const mongoose = require('mongoose')
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/GroupAPI'

mongoose.connect(mongoURI, 
	{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});
module.exports = { mongoose } 