import React from "react";
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import './style.css';


class SearchPost extends React.Component {
	constructor(props) {
		super(props);
	}
 

	render() {
		const poster_name = this.props.post.name
		const poster_email = this.props.post.email
		const poster_content = this.props.post.content

		return (
			<li>
				<div className="postHeader">
					<i className="far fa-user" />
					<span classNAme="posterName"> {poster_name} </span>
					<span id ="posterEmail">{poster_email} </span>
					<i className="far fa-star"/>
				</div>
				<div className="postContent">
					<p className="postDesc"> {poster_content}</p> 
					<strong class="postInfo">Current Matching Course: 0</strong>
				</div>
			</li>
		)
	}
}


export default SearchPost;

