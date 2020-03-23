// A function to check if a user is logged in on the session cookie
const readCookie = (app) => {
    const url = "/users/check-session"

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json()
            }
        })
        .then(json => {
            if (json && json.currentUser) {
                app.setState({ currentUser: json.currentUser })
            }
        })
        .catch(error => {
            console.log(error)
        })
}

// A function to send a POST request with the user to be logged in
const login = (loginComp, app) => {
    // Create our request constructor with all the parameters we need
    const request = new Request("http://localhost:5000/users/login", {
        method: "post",
        body: JSON.stringify(loginComp.state),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json()
            } else {
                loginComp.setState({loginError: 'Username or password is incorrect'})
            }
        })
        .then(json => {
            if (json.currentUser !== undefined) {
                app.setState({ currentUser: json.currentUser, isAdmin: json.isAdmin })
            }
        })
        .catch(error => {
            console.log(error)
        })
}

module.exports = {
    readCookie,
    login
}