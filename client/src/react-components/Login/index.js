import React from 'react'
import { Link } from 'react-router-dom'
import { updateLoginForm, login } from "../../actions/authentication";
import './styles.css'

class Login extends React.Component {
	constructor(props) {
		super(props);
	}

	state = {
		'username': '',
		'password': '',
	}

	render() {
		const { app } = this.props

		return(
			<div className='homeContainer'>
				<div className='homeForm'>
					<span className='homeLogo'>GROUPIE</span>
					<input className='homeInput' type='text' name='username' placeholder='Username' onChange={(e) => updateLoginForm(this, e.target)}/>
					<input className='homeInput' type='password' name='password' placeholder='Password' onChange={(e) => updateLoginForm(this, e.target)}/>
					<button className='homeButton' onClick={() => login(this, app)}>SIGN IN</button>
					<span>Don't have an account yet? <Link to='/signup'>Create one!</Link></span>
				</div>
			</div>
		);
	}
}

export default Login;