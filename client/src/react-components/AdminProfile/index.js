import '../Profile/styles.css';
import React from "react";
import Header from "../Header"

import { isEmailTaken } from '../../actions/signup'

import { updateForm, updateCheckbox } from "../../actions/basicoperation"
import { getUserById, updateUserById} from '../../actions/profile'
import { getCourseNumber, getStudentNumber} from '../../actions/adminProfile'


class AdminProfile extends React.Component {

   constructor(props) {
    super(props)
	}

	state = {
		username: '',
		email: '', newEmail: '', emailError: '', // Need to keep track of both old and new email
		password: '', passwordError: '',
		course_num: 0,
		student_num: 0
	}

    
	async componentDidMount() {

		const {app} = this.props
		const currentId = app.state.currentId

		await getUserById(this, currentId)
		await getCourseNumber(this)
		await getStudentNumber(this)

	}

  // show= (e) => {
  //       if (!e) {
  //           return null;
  //       }

  //       return (
  //          <div className="popup">
  //               <div className="cross" onClick={this.closepop}>
  //                   <i className="fa fa-times-circle"></i>
  //               </div>
  //               <span className="popupcontent">Changes Saved!</span>
  //           </div>
  //       );
  //   }

  //   closepop = () =>{
  //       this.props.app.setState({pop:false});
  //       console.log(this.state.pop);
  //   }
  // {this.show(this.props.state.pop)}

	async validateStudentInfo() {

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

		this.setState({
			emailError: (this.state.emailError === '' ? emailError : this.state.emailError),
			passwordError: passwordError
		}, function () {
			if (this.noErrors()) {
				this.updateProfile()
			}
		})
	}

	noErrors() {
		return (this.state.emailError === '' && this.state.passwordError === '')
	}


	async updateProfile() {
		const { app } = this.props
		const currentId = app.state.currentId

		const inputs = document.querySelectorAll('input')
		inputs.forEach((input) => input.value = '')

		await updateUserById(this, currentId)
	}


    render() {
        const {app} = this.props

		const currentId = app.state.currentId
        return (
            <div>
				<Header app={app}/>
				<h2 className="h2Header">Admin Profile Page</h2>
				<div className = "profileContainer">
					<div className='profileField'>
						<span>Username: {this.state.username}</span>
					</div>

			
					<div className='profileField'>
						<span>Password:</span>
						<div>
							<input type='password' name='password' placeholder='Enter new password' onChange={(e) => updateForm(this, e.target)} />
							<span className='errorMessage'>{this.state.passwordError}</span>
						</div>
					</div>
					

					<div className='profileField'>
						<span>Email:</span>
						<div>
							<input type='email' name='newEmail' placeholder={this.state.email} onChange={(e) => updateForm(this, e.target)} />
							<span className='errorMessage'>{this.state.emailError}</span>
						</div>
						
					</div>

					<div className='profileField'>
						<span>Number of Courses: {this.state.course_num}</span>
					</div>

					<div className='profileField'>
						<span>Number of Students: {this.state.student_num}</span>
					</div>

					<button className="profileActionButton" onClick={() => this.validateStudentInfo()}>SAVE CHANGES</button>

				</div>
            </div>
        );
    }


}


export default AdminProfile;


