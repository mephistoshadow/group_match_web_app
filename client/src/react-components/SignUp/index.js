import React from "react"
import { Link } from 'react-router-dom'

// Imports to create Checkbox
import { withStyles } from '@material-ui/core/styles'
import { orange } from '@material-ui/core/colors'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import { updateForm, updateCheckbox } from "../../actions/basicoperation"
import { isEmailTaken, isUsernameTaken, signUp } from "../../actions/signup"

import "./styles.css"

const OrangeCheckbox = withStyles({
	root: {
		color: orange[500],
		'&$checked': {
			color: orange[500],
		},
	},
	checked: {},
})((props) => <Checkbox color="default" {...props} />)


class SignUp extends React.Component {
	constructor(props) {
		super(props)
	}

	state = {
		email: '', emailError: '',
		username: '', usernameError: '',
		password: '', passwordError: '',
		firstName: '', firstNameError: '',
		lastName: '', lastNameError: '',
		year: '', yearError: '',
		CGPA: '', CGPAError: '',
		isCommuter: false,
		next: false,
	}

	async validateUserInfo(event) {
		event.preventDefault()

		const email = this.state.email, username = this.state.username, password = this.state.password
		const emailRegex = new RegExp('.+@.+\\..+')
		let emailError = '', usernameError = '', passwordError = ''
		
		if (!email) {
			emailError = 'Email Address is required'
		} else if (!emailRegex.test(email)) {
			emailError = 'Invalid Email Address'
		}

		if (!username) {
			usernameError = 'Username is required'
		}

		if (password.length < 6) {
			passwordError = 'Password must be at least 6 characters long'
		}

		if (emailError === '') {
			await isEmailTaken(email, this)
		}

		if (usernameError === '') {
			await isUsernameTaken(username, this)
		}

		this.setState(
			{
				emailError: (this.state.emailError === '' ? emailError : this.state.emailError),
				usernameError: (this.state.usernameError === '' ? usernameError : this.state.usernameError),
				passwordError: passwordError
			},
			function() {
				if (this.state.emailError === '' &&
					this.state.usernameError === '' &&
					this.state.passwordError === '') {
					this.setState({next: true})
				}
			}
		)
	}

	async validateStudentInfo(event) {
		event.preventDefault()

		const firstName = this.state.firstName, lastName = this.state.lastName
		const year = parseInt(this.state.year), CGPA = parseFloat(this.state.CGPA)
		let firstNameError = '', lastNameError = '', yearError = '', CGPAError = ''

		if (!firstName) {
			firstNameError = 'First Name is required'
		}

		if (!lastName) {
			lastNameError = 'Last Name is required'
		}

		if (!year) {
			yearError = 'Year must be an integer'
		} else if (year < 1 || year > 4) {
			yearError = 'Year must be an integer between 1 and 4'
		}

		if (CGPA && (CGPA < 0.0 || CGPA > 4.0)) {
			CGPAError = 'CGPA must be a number between 0.0 and 4.0'
		}

		this.setState(
			{
				firstNameError: firstNameError,
				lastNameError: lastNameError,
				yearError: yearError,
				CGPAError: CGPAError
			},
			async function() {
				if (this.state.firstNameError === '' &&
					this.state.lastNameError === '' &&
					this.state.yearError === '' &&
					this.state.CGPAError === '') {
					await signUp(this, this.props.history)
				}
			}
		)
	}

	render() {
		return(
			<div className="homeContainer">
				{!this.state.next &&
				<div className="homeForm">
					<span className="homeLogo">Create an account</span>

					<div className="formContainer">
						<input className="formInput" name="email" value={this.state.email} placeholder="Email Address" onChange={(e) => updateForm(this, e.target)}/>
						<span className="errorMessage">{this.state.emailError}</span>
					</div>

					<div className="formContainer">
						<input className="formInput" name="username" value={this.state.username} placeholder="Username" onChange={(e) => updateForm(this, e.target)}/>
						<span className="errorMessage">{this.state.usernameError}</span>
					</div>

					<div className="formContainer">
						<input className="formInput" type="password" value={this.state.password} name="password" placeholder="Password" onChange={(e) => updateForm(this, e.target)}/>
						<span className="errorMessage">{this.state.passwordError}</span>
					</div>
					
					<button className="homeButton" onClick={(event) => this.validateUserInfo(event)}>NEXT</button>
					<span>Sign In to Groupie <Link to="/">Login</Link></span>
				</div>}

				{this.state.next &&
				<div className="homeForm">
					<span className="homeLogo">Tell us about yourself</span>

					<div className="halfFormContainer">
						<div className="halfForm">
							<input className="formInput" name="firstName" value={this.state.firstName} placeholder="First Name" onChange={(e) => updateForm(this, e.target)}/>
							<span className="errorMessage">{this.state.firstNameError}</span>
						</div>
						<div className="halfForm">
							<input className="formInput" name="lastName" value={this.state.lastName} placeholder="Last Name" onChange={(e) => updateForm(this, e.target)}/>
							<span className="errorMessage">{this.state.lastNameError}</span>
						</div>
					</div>

					<div className="halfFormContainer">
						<div className="halfForm">
							<input className="formInput" name="year" value={this.state.year} placeholder="Year of Study" onChange={(e) => updateForm(this, e.target)}/>
							<span className="errorMessage">{this.state.yearError}</span>
						</div>
						<div className="halfForm">
							<input className="formInput" name="CGPA" value={this.state.CGPA} placeholder="CGPA" onChange={(e) => updateForm(this, e.target)}/>
							<span className="errorMessage">{this.state.CGPAError}</span>
						</div>
					</div>

					<FormControlLabel control={<OrangeCheckbox name="isCommuter" checked={this.state.isCommuter} onChange={(e) => updateCheckbox(this, e.target)}/>} label="I'm a commuter"/>
					
					<div className="halfFormContainer">
						<div className="halfForm"><button className="homeButton" onClick={() => this.setState({next: false})}>BACK</button></div>
						<div className="halfForm"><button className="homeButton" onClick={(event) => this.validateStudentInfo(event)}>SIGN UP</button></div>
					</div>

					<span>Sign In to Groupie <Link to="/">Login</Link></span>
				</div>}
			</div>
		)
	}
}

export default SignUp
