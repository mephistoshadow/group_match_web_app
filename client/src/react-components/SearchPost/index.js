import React from "react";
import './styles.css';

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
		const postId = this.props.post.id
		const postName = this.props.post.name
		const postEmail = this.props.post.email
		const postMessage = this.props.post.content
		
		const isAuthored = this.props.post.isAuthored
		const isMatch = this.state.isMatch

		let symbol;
		if (isAuthored) {
			symbol = <i className="fas fa-trash-alt trash" onClick={e => this.props.clickRemovePost(postId)}></i>
		} else {
			if (isMatch) {
				symbol = <i className="fas fa-star match" onClick={this.match.bind(this)}></i>
			} else {
				symbol = <i className="far fa-star noMatch" onClick={this.match.bind(this)}></i>
			}
		}

		return (
			<li>
				<div className="postHeader">
					<i className="far fa-user" />
					<span className="posterName"> {postName} </span>
					<span className="posterEmail">{postEmail} </span>
					{symbol}
				</div>
				<div className="postContent">
					<p className="postDesc"> {postMessage}</p>
					<strong className="postInfo">Current Matching Course: 0</strong>
				</div>
			</li>
		)
	}
}


export default SearchPost;

