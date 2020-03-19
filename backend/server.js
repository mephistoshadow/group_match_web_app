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



////////////////////////////////////////////////student api
// add the student to database
app.post('/students', (req, res) => {
	
	const student = new Student({
		username: req.body.username,
		name: req.body.name,
		year: req.body.year,
		courses:req.body.courses,
		email: req.body.email,
		role: req.body.role
	})

	student.save().then((result) => {
		res.send(result)
	}, (error) => {
		res.status(400).send(error)
	})
})

// get all the students from database
app.get('/students', (req, res) => {
	Student.find({}).then((students) => {
		res.send({ students }) 
	}, (error) => {
		res.status(500).send(error)
	})
})

// get student by their id
app.get('/students/:id', (req, res) => {
	const thisId = req.params.id
	Student.findById(thisId).then((student) => {
		if (!student) {
			res.status(404).send()
		} else {
			res.send({ student })
		}
	}).catch((error) => {
		res.status(500).send(error)
	})
})

// delete the student by their id
app.delete('/students/:id', (req, res) => {
	const thisId = req.params.id
	if (!ObjectID.isValid(thisId)) {
		return res.redirect("/error")
	}
	Student.findByIdAndRemove(thisId).then((student) => {
		if (!student) {
			res.status(404).send();
		} else {
			res.send({ student })
		}
	}).catch((error) => {
		res.status(500).send(error)
	})
})


////////////////////////////////////////////////courses Api
app.post('/courses', (req, res) => {
	
	const course = new Course({
		title: req.body.title,
		courseCode:req.body.courseCode,
		people:req.body.people
	})

	course.save().then((result) => {
		res.send(result)
	}, (error) => {
		res.status(400).send(error)
	})
})







const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
}) 

