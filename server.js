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
const { User } = require('./models/user')
const { Admin } = require('./models/admin')

const { ObjectID } = require('mongodb')

const bodyParser = require('body-parser') 
app.use(bodyParser.json())

const session = require('express-session')
app.use(bodyParser.urlencoded({ extended: true }))

app.use(
	session({
		secret: "csc309",
		resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60000,
            httpOnly: true
        }
	})
)

app.post('/users', (req, res) => {
	const user = new User({
		username: req.body.username,
		password: req.body.password,
		email: req.body.email,
		isAdmin: req.body.isAdmin
	})

	user.save().then((user) => {
		res.send(user)
	}, (error) => {
		res.status(400).send(error)
	})
})

// A route to login and create a session
app.post('/users/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    // Use the static method on the User model to find a user
    // by their email and password
    User.findByUsernamePassword(username, password).then((user) => {
            // Add username and isAdmin to the session cookie
            req.session.user = user.username
            req.session.isAdmin = user.isAdmin
            res.send({currentUser: user.username, isAdmin: user.isAdmin})
    }).catch(error => {
            res.status(400).send()
    })
})

// A route to logout a user
app.get('/users/logout', (req, res) => {
    // Remove the session
    req.session.destroy((error) => {
        if (error) {
            res.status(500).send(error)
        } else {
            res.send()
        }
    })
})

// A route to check if a use is logged in on the session cookie
app.get('users/check-session', (req, res) => {
    if (req.session.user) {
        res.send({currentUser: req.session.user})
    } else {
        res.status(401).send()
    }
})

//create admin
app.post('/admin', (req, res) => {
	const  admin = new Admin({
		username: req.body.username,
		name: req.body.name
	})

	admin.save().then((result) => {
		res.send(result)
	}, (error) => {
		res.status(400).send(error)
	})
})

// get admin
app.get('/admin', (req, res) => {
	Admin.find().then((admin) => {
		res.send(admin) 
	}, (error) => {
		res.status(500).send(error)
	})
})

// Add student
app.post('/students', (req, res) => {
	const student = new Student({
		username: req.body.username,
		name: req.body.name,
		year: req.body.year,
		courses:req.body.courses,
		email: req.body.email
	})

	student.save().then((result) => {
		res.send(result)
	}, (error) => {
		res.status(400).send(error)
	})
})

// Get all students
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

	if (!ObjectID.isValid(studentId)) {
		res.status(400).send()
	}
	
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
		res.status(400).send()
	}

	Student.deleteOne({_id: studentId}).then((result) => {
		if (result.deletedCount === 1) {
			Post.deleteMany({author: studentId}).then((result) => {
				res.send()
			}).catch((error) => {
				res.status(500).send(error)
			})
		} else {
			res.status(404).send()
		}
	}).catch((error) => {
		res.status(500).send(error)
	})
})

// Add student to course
app.patch('/students/add-course', (req, res) => {
    const courseCode = req.body.courseCode
    const studentId = req.body.studentId

    if (!ObjectID.isValid(studentId)) {
        res.status(400).send()
    }

  	Promise.all([Course.findOne({code: courseCode}), Student.findById(studentId)]).then((results) => {
  		const course = results[0], student = results[1]

  		if (course && student) {
  			if (!student.courses.includes(course.code)) {
  				course.people += 1
  				student.courses.push(course.code)

  				Promise.all([course.save(), student.save()]).then((results) => {
  					res.send({course: results[0], student: results[1]})
  				}).catch((error) => {
  					res.status(500).send(error)
  				})
  			} else {
  				res.status(400).send()
  			}
  		} else {
  			res.status(404).send()
  		}
  	}).catch((error) => {
  		res.status(500).send(error)
  	})
})

// Remove student from course
app.patch('/students/remove-course', (req, res) => {
    const courseCode = req.body.courseCode
    const studentId = req.body.studentId

    if (!ObjectID.isValid(studentId)) {
        res.status(400).send()
    }

  	Promise.all([Course.findOne({code: courseCode}), Student.findById(studentId)]).then((results) => {
  		const course = results[0], student = results[1]

  		if (course && student) {
  			if (student.courses.includes(course.code)) {
  				course.people -= 1
  				student.courses = student.courses.filter((courseCode) => courseCode !== course.code)

  				Promise.all([course.save(), student.save()]).then((results) => {
  					res.send({course: results[0], student: results[1]})
  				}).catch((error) => {
  					res.status(500).send(error)
  				})
  			} else {
  				res.status(400).send()
  			}
  		} else {
  			res.status(404).send()
  		}
  	}).catch((error) => {
  		res.status(500).send(error)
  	})
})

// Add course
app.post('/courses', (req, res) => {
	const course = new Course({
		title: req.body.title,
		code: req.body.code
	})

	course.save().then((result) => {
		res.send(result)
	}, (error) => {
		res.status(400).send(error)
	})
})

// Delete course
app.delete('/courses', (req, res) => {
	const courseCode = req.body.code

	Course.deleteOne({code: courseCode}).then((result) => {
		if (result.deletedCount === 1) {
			Promise.all([Student.updateMany({}, {$pull: {courses: courseCode}}), Post.deleteMany({courseCode: courseCode})]).then((result) => {
				res.send()
			}).catch((error) => {
				res.status(500).send(error)
			})
		} else {
			res.status(404).send()
		}
	}).catch((error) => {
		res.status(500).send(error)
	})
})

// Get all students in course
app.get('/:courseCode/students', (req, res) => {
	const courseCode = req.params.courseCode

	Student.find({courses: {$in: [courseCode]}}).then((students) => {
		if (!students) {
			res.status(404).send()
		} else {
			res.send(students)
		}
	}).catch((error) => {
		res.status(500).send(error)
	})
})

// Add post
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

// Get all posts in course
app.get('/posts/:courseCode', (req, res) => {
	const courseCode = req.params.courseCode

	Post.find({courseCode: courseCode}).then((posts) => {
		if (!posts) {
			res.status(404).send()
		} else {
			res.send(posts)
		}
	}).catch((error) => {
		res.status(500).send(error)
	})
})

// Delete post in course by author
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
		res.status(500).send(error)
	})
})

// Get post in course by author
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
		res.status(500).send(error)
	})
})

const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
})