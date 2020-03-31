/* server.js, with mongodb API and static directories */
'use strict'
const log = console.log
const path = require('path')

const express = require('express')
const bcrypt = require('bcryptjs');
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

const cors = require('cors')
app.use(cors())

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

// Add a match
app.post('/matches', (req, res) => {
    const match = new Match({
        sender: req.body.sender,
        receiver: req.body.receiver,
        course: req.body.course
    })
 
    match.save().then((match) => {
        res.send(match)
    }, (error) => {
        res.status(400).send(error)
    })

})

// Delete a match
app.delete('/matches', (req, res) => {
    const sender = req.body.sender
    const receiver = req.body.receiver
    const course = req.body.course

    Match.findOneAndRemove({sender: sender, receiver: receiver, course: course}).then((match) => {
    	if (!match) {
    		res.status(404).send()
    	} else {
    		res.send(match)
    	}
    }).catch((error) => {
		res.status(400).send(error)
	})
})

// Get matches for a user
app.get('/matches/:userId', (req, res) => {
    const userId = req.params.userId

    // Suppress _id and __v from queries
    Promise.all([Match.find({sender: userId}, {_id: 0, __v: 0}), Match.find({receiver: userId}, {_id: 0, __v: 0})]).then((results) => {
    	const senderMatches = results[0], receiverMatches = results[1]

    	const twoWayMatches = senderMatches.filter((senderMatch) =>
    		// Check if corresponding receiver match exists
    		receiverMatches.some((receiverMatch) => (
    			senderMatch.sender.equals(receiverMatch.receiver) &&
    			senderMatch.receiver.equals(receiverMatch.sender) &&
    			senderMatch.course.equals(receiverMatch.course)
    		))
    	)
    	
    	res.send(twoWayMatches)
    }).catch((error) => {
    	res.status(400).send(error)
    })
})

// Get matches sent by a user in a course
app.get('/matches/sent/:userId/:courseId', (req, res) => {
	const userId = req.params.userId
	const courseId = req.params.courseId

	Match.find({sender: userId, course: courseId}).then((sentMatches) => {
		res.send(sentMatches)
	}).catch((error) => {
		res.status(400).send(error)
	})
})

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
            req.session.currentId = user._id
            req.session.currentUser = user.username
            req.session.isAdmin = user.isAdmin
            res.send({currentId: user._id, currentUser: user.username, isAdmin: user.isAdmin})
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
app.get('/users/check-session', (req, res) => {
    if (req.session.currentId !== undefined && req.session.currentUser !== undefined && req.session.isAdmin !== undefined) {
        res.send({
        	currentId: req.session.currentId,
        	currentUser: req.session.currentUser,
        	isAdmin: req.session.isAdmin
        })
    } else {
        res.status(401).send()
    }
})

app.post('/users/signup', (req, res) => {
	const user = {
		username: req.body.username,
		password: req.body.password,
		email: req.body.email,
		isAdmin: req.body.isAdmin
	}

	const student = {
		username: req.body.username,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		year: req.body.year,
		courses:req.body.courses,
		CGPA: req.body.CGPA,
		isCommuter: req.body.isCommuter
	}

	new User(user).save().then((user) => {
		student._id = user._id
		new Student(student).save().then((student) => {
			res.send()
		}, (error) => {
			res.stats(400).send(error)
		})
	}, (error) => {
		res.status(400).send(error)
	})
})

app.delete('/users/:username', (req, res) => {
	const username = req.params.username

	User.deleteOne({username: username}).then((result) => {
		if (!result) {
			res.status(404).send();
		} else {
			res.send(result);
		}
	}).catch((error) => {
		res.status(500).send(error)
	})
})

app.patch("/users/admin/:user", (req, res) => {
    const {username,email} = req.body;
    const body = {username,email};

    User.findOneAndUpdate({username:req.params.user}, { $set: body }, { new: true })
        .then(student => {
            if (!student) {
                res.status(404).send();
            } else {
                res.send(student);
            }
        })
        .catch(error => {
            res.status(400).send(); 
        });
});

app.post("/users/admin/password/:username", (req, res) => {
  		User.findOne({username:req.params.username})
        .then(student => {
            if (!student) {
                res.status(404).send();
            } else {
                student.password = req.body.password
               	student.save().then((results) => {
  					res.send(results)
  				}).catch((error) => {
  					res.status(500).send(error)
  				})
            }
        })
        .catch(error => {
            res.status(400).send(); 
        });   

});

app.put('/users/update/:id',(req, res) => {
	const userId = req.params.id
	const fields = ['username', 'email', 'password']

	if (!ObjectID.isValid(userId)) {
		res.status(400).send()
	}

	// Keep only relevant fields in request body
	Object.keys(req.body).forEach((key) => {
		if (!fields.includes(key)) {delete req.body[key]}
	})

	User.findByIdAndUpdate(userId, { $set: req.body }, { new : true }).then((user) => {
		if (!user) {
			res.status(404).send()
		} else {
			res.send(user)
		}
	}).catch((error) => {
		res.status(400).send()
	})
})

app.put('/students/update/:id',(req, res) => {
	const studentId = req.params.id
	const fields = ['username', 'firstName', 'lastName', 'year', 'CGPA', 'isCommuter']

	if (!ObjectID.isValid(studentId)) {
		res.status(400).send()
	}

	// Keep only relevant fields in request body
	Object.keys(req.body).forEach((key) => {
		if (!fields.includes(key)) {delete req.body[key]}
	})

	Student.findByIdAndUpdate(studentId, { $set: req.body }, { new : true }).then((student) => {
		if (!student) {
			res.status(404).send()
		} else {
			res.send(student)
		}
	}).catch((error) => {
		res.status(400).send()
	})
})

app.get('/users/:id', (req, res) => {
	const id = req.params.id

	User.findById(id).then((user) => {
		if (!user) {
			res.status(404).send()
		} else {
			res.send(user)
		}
	}, (error) => {
		res.status(400).send(error)
	})
})

// Get users by username
app.get('/users/username/:username', (req, res) => {
	const username = req.params.username

	User.findOne({username: username}).then((user) => {
		if (!user) {
			res.status(404).send()
		} else {
			res.send(user)
		}
	}, (error) => {
		res.status(400).send(error)
	})
})

// Get users by email
app.get('/users/email/:email', (req, res) => {
	const email = req.params.email

	User.findOne({email: email}).then((user) => {
		if (!user) {
			res.status(404).send()
		} else {
			res.send(user)
		}
	}, (error) => {
		res.status(400).send(error)
	})
})

//create admin
app.post('/admin', (req, res) => {
	const admin = new Admin({
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
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		year: req.body.year,
		courses:req.body.courses,
		CGPA: req.body.CGPA,
		isCommuter: req.body.isCommuter
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
	}, (error) => {
		res.status(500).send(error)
	})
})

// Get courses of student by ID
app.get('/students/courses/:id', (req, res) => {
	const studentId = req.params.id

	if (!ObjectID.isValid(studentId)) {
		res.status(400).send()
	}

	Student.findById(studentId).then((student) => {
		if (!student) {
			res.status(404).send()
		} else {
			const courses = student.courses

			Course.find({_id: {$in : courses}}).then((courses) => {
				res.send(courses)
			}).catch((error) => {
				res.status(500).send(error)
			})
		}
	}).catch((error) => {
		res.status(500).send(error)
	})
})

/// update the student username by admin part
app.patch("/students/admin/:id", (req, res) => {
    const id = req.params.id;
    const {username} = req.body;
    const body = { username};

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }
    Student.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then(student => {
            if (!student) {
                res.status(404).send();
            } else {
                res.send(student);
            }
        })
        .catch(error => {
            res.status(400).send(); 
        });
})

// Delete student by ID
app.delete('/students/:id', (req, res) => {
	const studentId = req.params.id

	if (!ObjectID.isValid(studentId)) {
		res.status(400).send()
	}

	Student.deleteOne({_id: studentId}).then((result) => {
			Promise.all([Match.deleteMany({sender: studentId}),Post.deleteMany({author: studentId}),Match.deleteMany({receiver: studentId})]).then((result) => {
				res.send()
			}).catch((error) => {
				res.status(500).send(error)
			})
	}).catch((error) => {
		res.status(500).send(error)
	})
})

// Add student to course
app.post('/students/add-course', (req, res) => {
    const courseId = req.body.courseId
    const studentId = req.body.studentId

  	Promise.all([Course.findById(courseId), Student.findById(studentId)]).then((results) => {
  		const course = results[0], student = results[1]

  		if (course && student) {
  			if (!student.courses.includes(course._id)) {
  				course.people += 1
  				student.courses.push(course._id)

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
app.post('/students/remove-course', (req, res) => {
    const courseId = req.body.courseId
    const studentId = req.body.studentId

  	Promise.all([Course.findById(courseId), Student.findById(studentId)]).then((results) => {
  		const course = results[0], student = results[1]

  		if (course && student) {
  			if (student.courses.includes(course._id)) {
  				course.people -= 1
  				student.courses = student.courses.filter((courseId) => !courseId.equals(course._id))

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


app.post('/students/delete-course', (req, res) => {
    const courseId = req.body.courseId
    const studentId = req.body.studentId

  	Promise.all([Course.findById(courseId), Student.findById(studentId)]).then((results) => {
  		const course = results[0], student = results[1]

  		if (course && student) {
  			if (student.courses.includes(course._id)) {
  				course.people -= 1
  				student.courses = student.courses.filter((courseId) => !courseId.equals(course._id))

  					course.save().then((result) => {
		res.send(result)
	}, (error) => {
		res.status(400).send(error)
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

// Get all courses
app.get('/courses', (req, res) => {
	Course.find().then((courses) => {
		res.send(courses)
	}).catch((error) => {
		res.status(500).send(error)
	})
})

//get course by id
app.get('/courses/:id', (req, res) => {
	const courseid = req.params.id

	Course.findById(courseid).then((course) => {
		if (!course) {
			res.status(404).send()
		} else {
			res.send(course)
		}
	}, (error) => {
		res.status(400).send(error)
	})
})

// update course
app.patch("/courses/:id", (req, res) => {
    const id = req.params.id;
    const {title} = req.body;
    const body = {title};

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }
    Course.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then(course => {
            if (!course) {
                res.status(404).send();
            } else {
                res.send(course);
            }
        })
        .catch(error => {
            res.status(400).send(); 
        });
});


app.delete('/courses', (req, res) => {
	const courseID = req.body.code

	Course.deleteOne({_id: courseID}).then((result) => {
		if (result.deletedCount === 1) {
			Promise.all([Student.updateMany({}, { $pull: { courses: courseID } }), Post.deleteMany({ course: courseID})]).then((result) => {
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


// Add post
app.post('/posts', (req, res) => {
	const course = req.body.course
	const content = req.body.content
	const author = req.body.author

	const post = new Post({
		course: course,
		content: content,
		author: author
	})

	if (!ObjectID.isValid(course) || !ObjectID.isValid(author)) {
		res.status(400).send()
	}

	post.save().then((result) => {
		res.send(result)
	}, (error) => {
		res.status(400).send(error)
	})
})

// Get all posts in course
app.get('/posts/:courseId', (req, res) => {
	const courseId = req.params.courseId

	Post.find({course: courseId}).then((posts) => {
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
app.delete('/posts/:courseId/', (req, res) => {
	const courseId = req.params.courseId
	const author = req.body.author // Is a username

	Post.findOneAndRemove({course: courseId, author: author}).then((post) => {
		if (!post) {
			res.status(404).send()
		} else {
			res.send(post)
		}
	}).catch((error) => {
		res.status(500).send(error)
	})
})

// Get post in course by author
app.get('/posts/:courseId/:author', (req, res) => {
	const courseId = req.params.courseId
	const author = req.params.author // Is a username

	Post.findOne({course: courseId, author: author}).then((post) => {
		if (!post) {
			res.status(404).send()
		} else {
			res.send(post)
		}
	}).catch((error) => {
		res.status(500).send(error)
	})
})

/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(__dirname + "/client/build"))

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    res.sendFile(__dirname + "/client/build/index.html")
})

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
})
