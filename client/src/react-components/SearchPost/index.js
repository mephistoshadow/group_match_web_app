import React from "react";
import './styles.css';

class SearchPost extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { id, author, authored, content, isMatch } = this.props
		const { deletePost, addMatch, deleteMatch } = this.props

		const deleteButton = <i className="fas fa-trash-alt trash" onClick={() => deletePost()}></i>
		const matchButton = (
			isMatch ? 
			<i className="fas fa-star match" onClick={() => deleteMatch()}></i> :
			<i className="far fa-star noMatch" onClick={() => addMatch()}></i>
		)

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

