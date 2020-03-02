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

	show = (e) => {
		if (!e) {
			return null;
		}

		return (
		<div className="popup">
			<div className="cross" onClick={this.closepop}>
			<i className="fa fa-times-circle"></i>
			</div>
			<span className="popupcontent">Changes Saved!</span>
			</div>
	);
}

	closepop = () => {
		this.props.app.setState({ pop: false });
		console.log(this.state.pop);
	}

	handleId = () => {
		const current_user = this.props.state.current_user
		const user_list = this.props.state.students
		const user_id = getObjectByName(user_list, current_user).id
		this.setState({id : user_id})
	}
	
	handleName = (event) => {
		this.setState({ name: event.target.value})

	}
	handleEmail = (event) => {
		this.setState({ email: event.target.value})
	}

	handleContent = (event) => {
		this.setState({ content: event.target.value})
	}


	update = () => {
		const total_posts = this.props.state.posts
		const current_course = this.props.state.current_course
		const current_posts = total_posts.filter(p => p.name === current_course)[0]

		console.log(current_posts)
		total_posts.splice(total_posts.indexOf(current_posts), 1)

		const newPost = {
			id: this.state.id,
			name: this.state.name,
			email: this.state.email,
			content: this.state.content
		}
		current_posts.posts.push(newPost)
		total_posts.push(current_posts)

		this.setState({ posts: total_posts })

		console.log(total_posts[2])
		this.setState({post: true})
	}
	render()
	{	
		if (this.state.post) {
			return <Redirect to='/Search' />
		}
		return (
			<div>
				<Header enrolledCourses={this.props.state.enrolledCourses}></Header>
				<div className="profilecard">
					<h2 className="PostPageTitle"> Make a Post to Current Course </h2>
					<div className="profileicon">
						<a className="usericon" href="">
						<i className="fa fa-user-circle"></i>
						</a>
					</div> 
					<div className="Stats">
						<ul> 
							<li className="profilenumber">Name:<input type="text" value={this.state.name} onChange={this.handleName} /></li>
							<li className="profilenumber">Email: <input type="text" value={this.state.email} onChange={this.handleEmail} /></li> 
							<li className="profilenumber">Current Course:<span className="profileStatsNumber">CSC309</span></li>
							<li className="profilenumber">Past Course:<span className="profileStatsNumber">CSC121 CSC100</span></li>
							<li className="profilenumber">Short Message <textarea className="PostPageMessage" type="text" value={this.state.content} onChange={this.handleContent} /></li>
						</ul>
					</div>
					<div className="profilebutton">
						<a onClick= {this.update} className="name">Post</a>
					</div>
				</div>
			</div>
)

	}

}

export default PostPage;