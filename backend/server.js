/* server.js, with mongodb API and static directories */
'use strict'
const log = console.log
const path = require('path')

const express = require('express')
// starting the express server
const app = express()

// mongoose and mongo connection
const { mongoose } = require('./db/mongoose')

// import the mongoose models
const { Student } = require('./models/student')
const { Course } = require('./models/course')
const { Post } = require('./models/post')
const { Match } = require('./models/match')
const { Login } = require('./models/login')


const { ObjectID } = require('mongodb')


const bodyParser = require('body-parser') 
app.use(bodyParser.json())


// app.use("/js", express.static(path.join(__dirname, '/public/js')))


// app.get('/', (req, res) => {
// 	res.sendFile(path.join(__dirname, '/public/dashboard.html'))
// })



// Student API Calls
// Add student to database
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

// Get all students from database
app.get('/students', (req, res) => {
	Student.find().then((students) => {
		res.send(students) 
	}, (error) => {
		res.status(500).send(error)
	})
})

// Get student by ID
app.get('/students/:id', (req, res) => {
	const studentId = req.params.id

	Student.findById(studentId).then((student) => {
		if (!student) {
			res.status(404).send()
		} else {
			res.send(student)
		}
	}).catch((error) => {
		res.status(500).send(error)
	})
})

// Delete student by ID
app.delete('/students/:id', (req, res) => {
	const studentId = req.params.id

	if (!ObjectID.isValid(studentId)) {
		res.redirect("/error")
	}

	Student.deleteOne({_id: studentId}).then((result) => {
		if (result.deletedCount !== 1) {
			res.status(404).send()
		} else {
			res.send()
		}
	}).catch((error) => {
		res.status(500).send(error)
	})
})


// Courses API Calls
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

// Get all students in course
app.get('/:courseCode/students', (req, res) => {
	const courseCode = req.params.courseCode

	Student.find({courses: {$in : [courseCode]}}).then((students) => {
		if (!students) {
			res.status(404).send()
		} else {
			res.send(students)
		}
	}).catch((error) => {
		res.status(500).send()
	})
})

// Posts API Calls
app.post('/posts', (req, res) => {
	const post = new Post({
		courseCode: req.body.courseCode,
		content: req.body.content,
		author: req.body.author
	})

	post.save().then((result) => {
		res.send(result)
	}, (error) => {
		res.status(400).send(error)
	})
})

app.get('/posts/:courseCode', (req, res) => {
	const courseCode = req.params.courseCode

	Post.find({courseCode: courseCode}).then((posts) => {
		if (!posts) {
			res.status(404).send()
		} else {
			res.send(posts)
		}
	}).catch((error) => {
		res.status(500).send()
	})
})

app.delete('/posts/:courseCode/:author', (req, res) => {
	const courseCode = req.params.courseCode
	const author = req.params.author

	if (!ObjectID.isValid(author)) {
		res.status(400).send()
	}

	Post.deleteOne({courseCode: courseCode, author: author}).then((result) => {
		if (result.deletedCount !== 1) {
			res.status(404).send()
		} else {
			res.send()
		}
	}).catch((error) => {
		res.status(500).send()
	})
})

app.get('/posts/:courseCode/:author', (req, res) => {
	const courseCode = req.params.courseCode
	const author = req.params.author

	if (!ObjectID.isValid(author)) {
		res.status(400).send()
	}

	Post.findOne({courseCode : courseCode, author: author}).then((post) => {
		if (!post) {
			res.status(404).send()
		} else {
			res.send(post)
		}
	}).catch((error) => {
		res.status(500).send()
	})
})

const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
}) 

