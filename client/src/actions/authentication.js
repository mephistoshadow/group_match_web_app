// A function to check if a user is logged in on the session cookie
export const readCookie = (app) => {
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

// A functon to update the login form state
export const updateLoginForm = (loginComp, field) => {
    const value = field.value
    const name = field.name

    loginComp.setState({
        [name]: value
    })
}

// A function to send a POST request with the user to be logged in
export const login = (loginComp, app) => {
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