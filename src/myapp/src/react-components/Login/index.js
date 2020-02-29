import React from "react"
import { Link } from "react-router-dom"

import "./styles.css"

class Login extends React.Component {

	state = {
		username: "",
		password: ""
	}

	handleLogin() {
		const username = this.refs.username.value
		const password = this.refs.password.value

		if (username === 'user' && password === 'user') {
			console.log('User is logging in')
		} else if (username === 'admin' && password === 'admin') {
			console.log('Admin is logging in');
		}

		this.setState({
			username: username,
			password: password
		})
	}

	render() {
		return(
			<div className="homeContainer">
				<div className="homeForm">
					<span className="homeLogo">GROUPIE</span>
					<input className="homeInput" type="text" ref="username" placeholder="Username"/>
					<input className="homeInput" type="password" ref="password" placeholder="Password"/>
					<button className="homeButton" onClick={this.handleLogin.bind(this)}>SIGN IN</button>
					<span>Don't have an account yet? <Link to='/signup'>Create one!</Link></span>
				</div>
			</div>
		);
	}
}

export default Login;