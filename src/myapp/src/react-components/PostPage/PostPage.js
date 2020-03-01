import '../Profile/profile.css';
import './style.css'
import React from "react";
import Header from "../Header/index"


class PostPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			pop: false,

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

	render()
	{
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
							<li className="profilenumber">First Name:<input type="text" value={this.state.newName} onChange={this.handleNChange} /></li>
							<li className="profilenumber">Last Name: <input type="text" value={this.state.newName} onChange={this.handleNChange} /></li> 
							<li className="profilenumber">Current Course:<span className="profileStatsNumber">CSC309</span></li>
							<li className="profilenumber">Past Course:<span className="profileStatsNumber">CSC121 CSC100</span></li>
							<li className="profilenumber">Short Message <textarea className="PostPageMessage" type="text" value={this.state.newName} onChange={this.handleNChange} /></li>
						</ul>
					</div>
					<div className="profilebutton">
						<a onclick="showpop()" className="name">Post</a>
					</div>
				</div>
			</div>
)

	}

}

export default PostPage;