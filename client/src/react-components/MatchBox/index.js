import React from "react";

import { getStudent } from "../../actions/match"
import { Link } from 'react-router-dom'

import './styles.css';

class MatchBox extends React.Component {
	constructor(props) {
		super(props);
	}

	state = {
		student: {}
	}

	async componentDidMount() {
		const { course, sender, receiver } = this.props.match

		await getStudent(this, receiver)
	}

	async componentDidUpdate(prevProps, prevState, snapshot) {
		const { match } = this.props
		const { course, sender, receiver } = this.props.match

		const updatedMatch = prevProps.match !== match

		if (updatedMatch) {
			await getStudent(this, receiver)
		}
	}

	render () {
        const { match, history, deleteMatch } = this.props

		return (
			<div className="matchBox">
				<span>Username: {this.state.student.username}</span>
				<div className="matchOption">
					<button className="matchBoxButton" onClick={() => { history.push(`/profile/user/${match.receiver}`) }}>VIEW PROFILE</button>
					<button onClick={() => { if (window.confirm('Are you sure you want to remove this match?')) deleteMatch() }} className="removeBoxButton">REMOVE MATCH</button>
				</div>
			</div>
		)
	}
}

export default MatchBox;
