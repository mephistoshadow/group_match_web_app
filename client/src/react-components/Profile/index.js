import './styles.css';
import React from "react";
import Header from "../Header"

import { isEmailTaken } from '../../actions/signup'
import { updateForm, updateCheckbox } from "../../actions/basicoperation"
import { getUserById, updateUserById, getStudentById, updateStudentById } from '../../actions/profile'

// Imports to create Checkboxes
import { withStyles } from '@material-ui/core/styles'
import { orange } from '@material-ui/core/colors'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const OrangeCheckbox = withStyles({
    root: {
        color: orange[500],
        '&$checked': {
            color: orange[500],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />)

class Profile extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        username: '',
        firstName: '', firstNameError: '',
        lastName: '', lastNameError: '',
        email: '', newEmail: '', emailError: '', // Need to keep track of both old and new email
        password: '', passwordError: '',
        year: '', yearError: '',
        CGPA: '', CGPAError: '',
        isCommuter: false
    }

    async componentDidMount() {
        const { app, match } = this.props

        const userToFetch = match.params.id
        const currentId = app.state.currentId

        console.log(userToFetch)

        await getUserById(this, userToFetch)
        await getStudentById(this, userToFetch)
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
    	const { app, match } = this.props

    	const userToFetch = match.params.id
    	const fetchNewUser = prevProps.match.params.id !== userToFetch

    	console.log(userToFetch)

    	if (fetchNewUser) {
    		await getUserById(this, userToFetch)
    		await getStudentById(this, userToFetch)
    	}
    }

    async validateStudentInfo() {
    	const firstName = this.state.firstName, lastName = this.state.lastName
    	let firstNameError = '', lastNameError = ''
    	
    	if (firstName === '') {
    		firstNameError = 'First name cannot be empty'
    	}

    	if (lastName === '') {
    		lastNameError = 'Last name cannot be empty'
    	}

    	const email = this.state.email, newEmail = this.state.newEmail, password = this.state.password
    	const emailRegex = new RegExp('.+@.+\\..+')
    	let emailError = '', passwordError = ''

    	if (newEmail !== '') {
			if (!emailRegex.test(newEmail)) {
	    		emailError = 'Invalid email address'
	    	} else {
	    		await isEmailTaken(newEmail, this)
	    	}
    	}

    	if (password !== '' && password.length < 4) {
    		passwordError = 'Password must be at least 4 characters long'
    	}

    	const year = parseInt(this.state.year), CGPA = parseFloat(this.state.CGPA)
    	let yearError = '', CGPAError = ''

    	if (!year) {
    		yearError = 'Year must be an integer'
    	} else if (year < 1 || year > 4) {
    		yearError = 'Year must be an integer between 1 and 4'
    	}

    	if (CGPA && (CGPA < 0.0 || CGPA > 4.0)) {
    		CGPAError = 'CGPA must be a number between 0.0 and 4.0'
    	}

    	this.setState({
    		firstNameError: firstNameError, lastNameError: lastNameError,
    		emailError: (this.state.emailError === '' ? emailError : this.state.emailError),
    		passwordError: passwordError, yearError: yearError, CGPAError: CGPAError
    	}, function() {
    		if (this.noErrors()) {
    			this.updateProfile()
    		}
    	})
    }

    noErrors() {
    	return (this.state.firstNameError === '' && this.state.lastNameError === '' &&
    			this.state.emailError === '' && this.state.passwordError === '' &&
    			this.state.yearError === '' && this.state.CGPAError === '')
    }

    async updateProfile() {
        const { app } = this.props
        const currentId = app.state.currentId

        const inputs = document.querySelectorAll('input')
        inputs.forEach((input) => input.value = '')

        await updateUserById(this, currentId)
        await updateStudentById(this, currentId)
    }

    toggleCommuterState() {
    	this.setState({
    		isCommuter: !this.state.isCommuter
    	})
    }

    render() {
        const { app, match, history } = this.props
        console.log(this.props)

        const userToFetch = match.params.id
        const currentId = app.state.currentId

        const canEdit = (userToFetch === currentId)
        
        return (
            <div>
                <Header app={app}/>
                <i class="fas fa-chevron-left" id="profileBackButton" onClick={() => history.goBack()}></i>
                <h2 className='h2Header'>User: {this.state.username}</h2>
                <div className='profileContainer'>

                    {
                    canEdit && // Only show password on current user profile
                    <div className='profileField'>
                        <span>Password:</span>
	                        <div>
		                        <input type='password' name='password' placeholder='Enter new password' onChange={(e) => updateForm(this, e.target)}/>
		                        <span className='errorMessage'>{this.state.passwordError}</span>
	                        </div>
                    </div>
                    }

                    <div className='profileField'>
                        <span>First name:</span>
                        {
                            canEdit ?
                            (<div>
                            	<input type='text' name='firstName' placeholder={this.state.firstName} onChange={(e) => updateForm(this, e.target)}/>
                            	<span className='errorMessage'>{this.state.firstNameError}</span>
                            </div>) :
                            <span className='profileFieldValue'>{this.state.firstName}</span>
                        }

                        <span>Last name:</span>
                        {
                            canEdit ?
                            (<div>
                            	<input type='text' name='lastName' placeholder={this.state.lastName} onChange={(e) => updateForm(this, e.target)}/>
                            	<span className='errorMessage'>{this.state.lastNameError}</span>
                            </div>) :
                            <span className='profileFieldValue'>{this.state.lastName}</span>
                        }
                    </div>

                    <div className='profileField'>
                        <span>Email:</span>
                        {
                            canEdit ?
                            (<div>
                            	<input type='email' name='newEmail' placeholder={this.state.email} onChange={(e) => updateForm(this, e.target)}/>
                            	<span className='errorMessage'>{this.state.emailError}</span>
                            </div>) :
                            <span className='profileFieldValue'>{this.state.email}</span>
                        }
                    </div>

                    <div className='profileField'>
                        <span>Year:</span>
                        {
                            canEdit ?
                            (<div className='profileInput'>
                            	<input type='number' min='1' max='4' step='1' name='year' placeholder={this.state.year} onChange={(e) => updateForm(this, e.target)}/>
                            	<span className='errorMessage'>{this.state.yearError}</span>
                            </div>) :
                            <span className='profileFieldValue'>{this.state.year}</span>
                        }

                        <span>CGPA:</span>
                        {
                            canEdit ?
                            (<div> 
                            	<input type='number' min='0' max='4' step='0.25' name='CGPA' placeholder={this.state.CGPA} onChange={(e) => updateForm(this, e.target)}/>
                            	<span className='errorMessage'>{this.state.CGPAError}</span>
                            </div>) :
                            <span className='profileFieldValue'>{this.state.CGPA}</span>
                        }
                    </div>

                    <div className='profileField'>
                        <span>Commuter:</span>
                        {
                            canEdit ?
                            <OrangeCheckbox name='isCommuter' checked={this.state.isCommuter} onClick={() => this.toggleCommuterState()}/> :
                            <OrangeCheckbox name='isCommuter' checked={this.state.isCommuter}/>
                        }
                    </div>

                    {
                        canEdit ?
                        <button className="profileActionButton" onClick={() => this.validateStudentInfo()}>SAVE CHANGES</button> :
                        <button className="profileActionButton"><a href={`mailto:${this.state.email}`}>CONTACT THIS USER</a></button>
                    }
                </div>
            </div>
        )
    }
}

export default Profile
