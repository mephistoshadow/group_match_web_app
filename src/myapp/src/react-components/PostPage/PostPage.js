import '../Profile/profile.css';
import './style.css'
import React from "react";
import Header from "../Header/index"
import {getObjectByName} from "../../actions/BasicOperation"
import { Link, Redirect } from 'react-router-dom'

class PostPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			pop: false,
			id: "",
			name: "",
			email: "",
			content: "",
			post: false
		}
		// const { state, app} = this.props;
	}

	handleId = () => {
		const current_user = this.props.state.current_user
		const user_list = this.props.state.students
		const user_id = getObjectByName(user_list, current_user).id
		this.setState({id : user_id})
	}
	
	handleName = (event) => {
		this.setState({name: event.target.value})
	}

	handleEmail = (event) => {
		this.setState({email: event.target.value})
	}

	handleContent = (event) => {
		this.setState({content: event.target.value})
	}

	// For this update, we need server call to write data into server
	// Specifically, we need to write the new post into Data of posts
	update = () => {
		const total_posts = this.props.state.posts
		const current_course_name = this.props.state.current_course
		const current_course = total_posts.filter(p => p.name === current_course_name)[0]
		const current_posts = current_course.posts

		total_posts.splice(total_posts.indexOf(current_posts), 1)

		const new_post = {
			id: current_posts.length + 1,
			name: this.state.name,
			email: this.state.email,
			isAuthored: true,
			content: this.state.content
		}

		current_posts.push(new_post)
		total_posts.push(current_course)

		this.setState({posts: total_posts})

		console.log(total_posts[2])
		this.setState({post: true})
	}

	render() {	
		if (this.state.post) {
			return <Redirect to='/search'/>
		}
		return (
			<div>
				<Header enrolledCourses={this.props.state.enrolledCourses}></Header>
				<h2 className="h2Header">Create a Post</h2>
				<div className="profileCard">
					<div className="profileIcon">
						<i className="fa fa-user-circle"></i>
					</div> 
					<div className="inputList">
						<ul> 
							<li>Name:<input type="text" value={this.state.name} onChange={this.handleName}/></li>
							<li>Email: <input type="text" value={this.state.email} onChange={this.handleEmail}/></li> 
							<li>Current Course(s): CSC309</li>
							<li>Past Course(s): CSC121, CSC100</li>
							<li>Short Message <textarea className="postPageMessageInput" type="text" value={this.state.content} onChange={this.handleContent}/></li>
						</ul>
						<button className="homeButton" onClick= {this.update}>POST</button>
					</div>
				</div>
			</div>
		);
	}
}

export default PostPage;