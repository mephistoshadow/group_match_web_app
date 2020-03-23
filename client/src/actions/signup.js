const signUp = (signUpComp, history) => {
    // Create our request constructor with all the parameters we need
    const createUserRequest = new Request("http://localhost:5000/users", {
        method: "post",
        body: JSON.stringify({
        	username: signUpComp.state.username,
        	password: signUpComp.state.password,
        	email: signUpComp.state.email,
        	isAdmin: false
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    const createStudentRequest = new Request("http://localhost:5000/students", {
    	method: "post",
    	body: JSON.stringify({
    		username: signUpComp.state.username,
    		firstName: signUpComp.state.firstName,
    		lastName: signUpComp.state.lastName,
    		year: signUpComp.state.year,
    		CGPA: signUpComp.state.CGPA,
    		isCommuter: signUpComp.state.isCommuter
    	}),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    Promise.all([fetch(createUserRequest), fetch(createStudentRequest)]).then((results) => {
    	const userRes = results[0], studentRes = results[1]
    	if (userRes.status === 200 && studentRes.status === 200) {
    		history.push('/')
    	}
    }).catch((error) => {
    	console.log(error)
    })
}

const getUserByEmail = (email) => {
	const url = `http://localhost:5000/users/email/${email}`
    return fetch(url).then((result) => {
    	if (result.status === 200) {
    		return Promise.resolve(result.json())
    	} else {
    		return Promise.reject()
    	}
    }).catch((error) => {
    	console.log(error)
    })
}

const getUserByUsername = (username) => {
	const url = `http://localhost:5000/users/username/${username}`
    return fetch(url).then((result) => {
    	if (result.status === 200) {
    		return Promise.resolve(result.json())
    	} else {
    		return Promise.reject()
    	}
    }).catch((error) => {
    	console.log(error)
    })
}

module.exports = {
	signUp,
	getUserByEmail,
	getUserByUsername
}