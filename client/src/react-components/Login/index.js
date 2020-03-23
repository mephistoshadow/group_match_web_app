import React from 'react'
import { Link } from 'react-router-dom'
import { login } from "../../actions/authentication"
import { updateForm } from "../../actions/basicoperation"
import './styles.css'

class Login extends React.Component {
	constructor(props) {
		super(props);
	}

	state = {
		username: '',
		password: '',
		loginError: ''
	}

	render() {
		const { app } = this.props

		return(
			<div className='homeContainer'>
				<div className='homeForm'>
					<span className='homeLogo'>GROUPIE</span>

					<div className="halfFormContainer">
						<div className="halfForm">
							<input className='formInput' type='text' name='username' placeholder='Username' onChange={(e) => updateForm(this, e.target)}/>
							<span className="errorMessage">{this.state.loginError}</span>
						</div>
						<div className="halfForm">
							<input className='formInput' type='password' name='password' placeholder='Password' onChange={(e) => updateForm(this, e.target)}/>
						</div>
					</div>

					<button className='homeButton' onClick={() => login(this, app)}>SIGN IN</button>
					<span>Don't have an account yet? <Link to='/signup'>Create one!</Link></span>
				</div>
			</div>
		);
	}
}

export default Login;