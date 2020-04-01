const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
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
		minlength: 4
	},
	email: {
		type: String,
		required: true,
		trim: true,
		validate: {
			validator: validator.isEmail,
			message: "Not a valid email"
		}
	},
	isAdmin: Boolean
})

// Edited Mark's Code
UserSchema.pre('save', function(next) {
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

UserSchema.pre('findOneAndUpdate', function(next) {
    const update = this.getUpdate().$set;
    const password = update.password;

    if (password) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                update.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

// Edited Mark's code
UserSchema.statics.findByUsernamePassword = function(username, password) {
    const User = this // binds this to the User model

    // First find the user by their username
    return User.findOne({username: username}).then((user) => {
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

const User = mongoose.model('User', UserSchema)
module.exports = { User }
