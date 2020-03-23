import React from "react"
import { Link } from 'react-router-dom'

// Imports to create Checkbox
import { withStyles } from '@material-ui/core/styles'
import { orange } from '@material-ui/core/colors'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import { updateForm, updateCheckbox } from "../../actions/basicoperation"
import { signUp } from "../../actions/signup"

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
		email: '',
		username: '',
		password: '',
		firstName: '',
		lastName: '',
		year: null,
		CGPA: null,
		isCommuter: null,
		next: false
	}

	render() {
		const { history, app } = this.props

		return(
			<div className="homeContainer">
				{!this.state.next &&
				<div className="homeForm">
					<span className="homeLogo">Create an account</span>
					<input className="homeInput" name="email" value={this.state.email} placeholder="Email Address" onChange={(e) => updateForm(this, e.target)}/>
					<input className="homeInput" name="username" value={this.state.username} placeholder="Username" onChange={(e) => updateForm(this, e.target)}/>
					<input className="homeInput" type="password" value={this.state.password} name="password" placeholder="Password" onChange={(e) => updateForm(this, e.target)}/>
					<button className="homeButton" onClick={() => this.setState({next: true})}>NEXT</button>
					<span>Sign In to Groupie <Link to="/">Login</Link></span>
				</div>}

				{this.state.next &&
				<div className="homeForm">
					<span className="homeLogo">Tell us about yourself</span>
					<div className="formContainer">
						<div className="form"><input className="homeInput" name="firstName" value={this.state.firstName} placeholder="Fist Name" onChange={(e) => updateForm(this, e.target)}/></div>
						<div className="form"><input className="homeInput" name="lastName" value={this.state.lastName} placeholder="Last Name" onChange={(e) => updateForm(this, e.target)}/></div>
					</div>
					<div className="formContainer">
						<div className="form"><input className="homeInput" name="year" value={this.state.year} placeholder="Year of Study" onChange={(e) => updateForm(this, e.target)}/></div>
						<div className="form"><input className="homeInput" name="CGPA" value={this.state.CGPA} placeholder="CGPA" onChange={(e) => updateForm(this, e.target)}/></div>
					</div>
					<FormControlLabel control={<OrangeCheckbox name="isCommuter" checked={this.state.isCommuter} onChange={(e) => updateCheckbox(this, e.target)}/>} label="I'm a commuter"/>
					<div className="formContainer">
						<div className="form"><button className="homeButton" onClick={() => this.setState({next: false})}>BACK</button></div>
						<div className="form"><button className="homeButton" onClick={() => signUp(this, history)}>SIGN UP</button></div>
					</div>
					<span>Sign In to Groupie <Link to="/">Login</Link></span>
				</div>}
						
			</div>
		);
	}
}

export default SignUp;
