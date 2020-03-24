import React from "react";
import './styles.css';

class SearchPost extends React.Component {
	constructor(props) {
		super(props);
	}

	state = {
		match: false
	}

	match() {
		this.setState({match: !this.state.match})
	}

	render() {
		const { id, author, authored, content } = this.props
		const { deletePost } = this.props
		const match = this.state.match

		const deleteButton = <i className="fas fa-trash-alt trash" onClick={() => deletePost()}></i>
		const matchButton = match ? <i className="fas fa-star match"></i> : <i className="far fa-star noMatch"></i>

		return (
			<li>
				<div className="postHeader">
					<i className="far fa-user" />
					<span className="posterName">{author}</span>
					{authored ? deleteButton : matchButton}
				</div>
				<div className="postContent">
					<p className="postDesc">{content}</p>
				</div>
			</li>
		)
	}
}


export default SearchPost;

