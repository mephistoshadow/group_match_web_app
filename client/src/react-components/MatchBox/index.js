import React from "react";

import './styles.css';


class MatchBox extends React.Component {
	constructor(props) {
		super(props);
	}

	render () {
		let userOption;
		let matchStatus;

		if (!this.props.match.status) {
			matchStatus = "Match accepted!";
			userOption = <div className="userOption">
			<button className="matchBoxButton">View Profile</button>
			</div>
		}
//        else {
//			matchStatus = "Please accept or reject the match!";
//			userOption = <div className="userOption">
//			<button className="matchBoxButton"><i class="fas fa-user-check"></i></button>
//			<button className="matchBoxButton"><i class="fas fa-user-times"></i></button>
//			</div>
//		}

		return (
			<div className="matchBox">
				<h3>Name: {this.props.match.receiver}</h3>
				<h3>Match status: {matchStatus}</h3>
				{userOption}
			</div>
		);
	}
}

export default MatchBox;
