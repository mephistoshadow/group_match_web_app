import React from "react"
import { Link } from 'react-router-dom'

import "./styles.css"

class SignUp extends React.Component {
	state = {
		firstName: "",
		lastName: "",
		emailAddress: "",
		username: "",
		password: ""
	}


	handleNChange= (event) => {
         this.setState({username: event.target.value});
         console.log(this.state.username);
    }

    handleEChange= (event) => {
         this.setState({emailAddress: event.target.value});
    }

    handlePChange= (event) => {
         this.setState({password: event.target.value});
    }
    // here we need a server call to update the information and store it in server side database.
    update = () => {
         const student = {
         		id: this.props.state.countStudent+1,
				name: this.state.username,
				Email: this.state.emailAddress,
				year:"N/A",
				password: this.state.password,
				current_courses: [],
				past_courses: []
         }
         this.props.app.setState({
         	students:  this.props.state.students.concat(student),
         	countStudent:this.props.state.countStudent+1
         })

         alert("Succuess signed up!");
       

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
					<input className="homeInput" type="text" name="email" placeholder="Email Address" value={this.state.emailAddress} onChange={this.handleEChange}/>
					<input className="homeInput" type="username" name="username" placeholder="Username" value={this.state.username} onChange={this.handleNChange}/>
					<input className="homeInput" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handlePChange}/>
					<button className="homeButton" onClick = {this.update}>SIGN UP</button>
				<span>Sign In to Groupie <Link to="/">Login</Link></span>
				</div>
			</div>
		);
	}
}

export default SignUp;
