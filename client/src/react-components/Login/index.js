import React from 'react'
import { login } from "../../actions/authentication";
import './styles.css'

class Login extends React.Component {

	constructor(props) {
		super(props);
	}

	state = {
		'currentUser': '',
		'isAdmin': false,
	}

	render() {
		const { app } = this.props

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