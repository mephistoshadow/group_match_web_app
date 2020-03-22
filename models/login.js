const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const LoginSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		trim: true,
		unique: true,
		minlength: 1
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: "Not a valid email"
		}
	},
	isAdmin: Boolean
})

// Edited Mark's Code
LoginSchema.pre('save', function(next) {
    const user = this; // binds this to User document instance

    // checks to ensure we don't hash password more than once
    if (user.isModified('password')) {
        // generate salt and hash the password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

// Edited Mark's code
LoginSchema.statics.findByEmailPassword = function(email, password) {
    const User = this // binds this to the User model

    // First find the user by their email
    return User.findOne({ email: email }).then((user) => {
        if (!user) {
            return Promise.reject()  // a rejected promise
        }
        // if the user exists, make sure their password is correct
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    resolve(user)
                } else {
                    reject()
                }
            })
        })
    })
}

const Login = mongoose.model('Login', LoginSchema)
module.exports = { Login }
