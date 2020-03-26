import React from "react";

import { getStudentObj } from "../../actions/match"
import { Link } from 'react-router-dom'

import './styles.css';

class MatchBox extends React.Component {
	constructor(props) {
		super(props);
	}

	state = {
		studentObject: {}
	}

	async componentDidMount() {
		await getStudentObj(this, this.props.match.receiver)
	}

	async componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.match.receiver !== this.props.match.receiver) {
			console.log('CHANGED MATCH BOX RECEIVER')
			await getStudentObj(this, this.props.match.receiver)
		}
	}

	render () {
        const { match, history, deleteMatch } = this.props

		return (
			<div className="matchBox">
				<span>Username: {this.props.match.receiver}</span>
				<div className="matchOption">
					<button className="matchBoxButton" onClick={() => history.push(`/profile/user/${this.state.studentObject._id}`)}>VIEW PROFILE</button>
					<button onClick={deleteMatch} className="matchBoxButton">REMOVE MATCH</button>
				</div>
			</div>
		)
	}
}

export default MatchBox;
