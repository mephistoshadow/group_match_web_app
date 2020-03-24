
const mongoose = require('mongoose')
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/GroupieAPI'

mongoose.connect(mongoURI, 
	{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true});
module.exports = { mongoose } 