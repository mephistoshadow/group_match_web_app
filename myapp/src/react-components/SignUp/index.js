import React from "react"

import "./styles.css"

import { Link } from 'react-router-dom'

class SignUp extends React.Component {
	state = {
		firstName: "",
		lastName: "",
		emailAddress: "",
		username: "",
		password: ""
	}

	render() {
		return(
			<div className="homeContainer">
				<div className="homeForm">
					<span className="homeLogo">Create an account</span>
					<div className="nameContainer">
						<div className="nameForm">
							<input className="homeInput" type="text" name="firstName" placeholder="First Name"/>
						</div>
						<div className="nameForm">
							<input className="homeInput" type="text" name="lastName" placeholder="Last Name"/>
						</div>
					</div>
					<input className="homeInput" type="text" name="email" placeholder="Email Address"/>
					<input className="homeInput" type="username" name="username" placeholder="Username"/>
					<input className="homeInput" type="password" name="password" placeholder="Password"/>
					<button className="homeButton">SIGN UP</button>
				<span>Sign In to Groupie <Link to="/">Login</Link></span>
				</div>
			</div>
		);
	}
}

export default SignUp;