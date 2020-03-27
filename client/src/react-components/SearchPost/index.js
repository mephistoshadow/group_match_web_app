import React from "react";
import './styles.css';
import { getStudentObj } from "../../actions/match" //for now we'll use the one from match lol

class SearchPost extends React.Component {
	constructor(props) {
		super(props);
	}
 
	state = {
		studentObject: {}
	}
 
    async componentDidMount() {
        const {author} = this.props
        await getStudentObj(this, author)
        
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
  
        const commuterState = this.state.studentObject.isCommuter
        const isCommuter =  <span className="posterInfo">Is a Commuter</span>
        const notCommuter =  <span className="posterInfo">Not a Commuter</span>

		return (
			<li className="post" title={`${author}-post`}>
				<div className="postHeader">
					<i className="far fa-user" />
					<span className="posterName">{author}</span>
                    <span className="posterInfo">Year: {this.state.studentObject.year}</span>
                    <span className="posterInfo">CGPA: {this.state.studentObject.CGPA}</span>
                    {commuterState ? isCommuter : notCommuter}
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

