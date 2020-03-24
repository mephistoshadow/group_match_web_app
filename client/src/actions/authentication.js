// A function to check if a user is logged in on the session cookie
export const readCookie = (app) => {
    const url = "/users/check-session"

    fetch(url)
        .then((result) => {
            if (result.status === 200) {
                return result.json()
            }
        })
        .then((json) => {
            if (json && json.currentUser) {
                app.setState({ currentUser: json.currentUser })
            }
        })
        .catch((error) => {
            console.log(error)
        })
}

// A function to send a POST request with the user to be logged in
export const login = (loginComp, app) => {
    // Create our request constructor with all the parameters we need
    const request = new Request("/users/login", {
        method: "post",
        body: JSON.stringify(loginComp.state),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    // Send the request with fetch()
    fetch(request)
        .then((result) => {
            if (result.status === 200) {
                return result.json()
            } else {
                loginComp.setState({loginError: 'Username or password is incorrect'})
            }
        })
        .then((json) => {
            if (json.currentUser !== undefined) {
                app.setState({ currentUser: json.currentUser, isAdmin: json.isAdmin })
            }
        })
        .catch((error) => {
            console.log(error)
        })
}

export const logout = (app) => {
    const url = 'users/logout'

    fetch(url)
        .then((result) => {
            app.setState({currentUser: null, isAdmin: null})
        })
        .catch((error) => {
            console.log(error)
        })
}