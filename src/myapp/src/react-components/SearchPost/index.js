import React from "react";
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import './style.css';


class SearchPost extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isMatch: false
		}
	}

	match() {
		this.setState({
			isMatch: !this.state.isMatch
		})
	}

	render() {
		const poster_name = this.props.post.name
		const poster_email = this.props.post.email
		const poster_content = this.props.post.content

		let star;
		if (this.state.isMatch) {
			star = <i className="fas fa-star match" onClick={this.match.bind(this)}></i>
		} else {
			star = <i className="far fa-star noMatch" onClick={this.match.bind(this)}></i>
		}

		return (
			<li>
				<div className="postHeader">
					<i className="far fa-user" />
					<span className="posterName"> {poster_name} </span>
					<span className="posterEmail">{poster_email} </span>
					{star}
				</div>
				<div className="postContent">
					<p className="postDesc"> {poster_content}</p>
					<strong className="postInfo">Current Matching Course: 0</strong>
				</div>
			</li>
		)
	}
}


export default SearchPost;

