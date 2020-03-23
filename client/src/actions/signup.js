export const signUp = (signUpComp, history) => {
    // Create our request constructor with all the parameters we need
    const createUserRequest = new Request("/users", {
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

    const createStudentRequest = new Request("/students", {
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

    fetch(createUserRequest).then((userRes) => {
    	if (userRes.status === 200) {
    		fetch(createStudentRequest).then((studentRes) => {
    			if (studentRes.status === 200) {
    				history.push('/')
    			}
    		})
    	}
    }).catch((error) => {
    	console.log(error)
    })
}

export const isEmailTaken = (email, signUpComp) => {
	const url = `/users/email/${email}`
    return fetch(url).then((result) => {
    	if (result.status === 200) {
    		return result.json()
    	}
    }).then((json) => {
        console.log(json)
        if (json && json.email === email) {
            console.log('setting state')
            signUpComp.setState({emailError: `Email ${email} is already in use`})
        }
    }).catch((error) => {
    	console.log(error)
    })
}

export const isUsernameTaken = (username, signUpComp) => {
	const url = `/users/username/${username}`
    return fetch(url).then((result) => {
        if (result.status === 200) {
            return result.json()
        }
    }).then((json) => {
        if (json && json.username === username) {
            signUpComp.setState({usernameError: `Username ${username} is not available`})
        }
    }).catch((error) => {
        console.log(error)
    })
}