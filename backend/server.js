/* server.js, with mongodb API and static directories */
'use strict';
const log = console.log
const path = require('path')

const express = require('express')
// starting the express server
const app = express();

// mongoose and mongo connection
const { mongoose } = require('./db/mongoose')

// import the mongoose models
const { Student } = require('./models/student')
const { Course } = require('./models/course')
const { Post } = require('./models/post')
const { Match } = require('./models/match')
const { LogInfo } = require('./models/Loginfo')


const { ObjectID } = require('mongodb')


const bodyParser = require('body-parser') 
app.use(bodyParser.json())


// app.use("/js", express.static(path.join(__dirname, '/public/js')))


// app.get('/', (req, res) => {
// 	res.sendFile(path.join(__dirname, '/public/dashboard.html'))
// })



/*** API Routes below ************************************/

app.post('/posts', (req, res) => {
	log(req.body)

	const post = new Post({
		courseCode: req.body.courseCode,
		content: req.body.content,
		author: req.body.author
	})

	post.save().then((result) => {
		res.send(result)
	}, (error) => {
		res.status(400).send(error); // Client error: bad request
	})
})

app.get('/posts/:courseCode', (req, res) => {
	log(req.params.id)
	const courseCode = req.params.courseCode

	Post.find({courseCode: courseCode}).then((posts) => {
		if (!posts) {
			res.status(404).send() // Client error: not found
		} else {
			res.send(posts)
		}
	}).catch((error) => {
		res.status(500).send() // Serve error: internal server error
	})
})


const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
}) 

