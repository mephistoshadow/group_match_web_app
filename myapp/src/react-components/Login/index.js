import React from 'react'
import { Link, Redirect } from 'react-router-dom'

import './styles.css'

class Login extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			authorized: false
		}
	}

	authenticate() {
		const username = this.refs.username.value;
		const password = this.refs.password.value;

		if (this.validCredentials(username, password)) {
			this.setState({
				username: username,
				password: password,
				authorized: true,
			});
		}
	}

	// We need to read data from server in order to check if the username matches the password
	validCredentials(username, password) {
		if ((username === 'user' && password === 'user') ||
			(username === 'admin' && password === 'admin')) {
			console.log('Valid credentials');

			if (username === 'admin') {
				this.setState({
					isAdmin: true
				})
			} else {
				this.setState({
					isAdmin: false
				})
			}
			return true;
		}

		return false;
	}

	render() {
		if (this.state.authorized) {
			if (this.state.username === 'admin') {
				return <Redirect to={{
					pathname: '/admin-profile'
				}}/>
			} else if (this.state.username === 'user') {
				return <Redirect to={{
					pathname: '/dashboard'
				}}/>
			}
		}

		return(
			<div className='homeContainer'>
				<div className='homeForm'>
					<span className='homeLogo'>GROUPIE</span>
					<input className='homeInput' type='text' ref='username' placeholder='Username'/>
					<input className='homeInput' type='password' ref='password' placeholder='Password'/>
					<button className='homeButton' onClick={this.authenticate.bind(this)}>SIGN IN</button>
					<span>Don't have an account yet? <Link to='/signup'>Create one!</Link></span>
				</div>
			</div>
		);
	}
}

export default Login;