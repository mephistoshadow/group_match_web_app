import React from "react";

import './styles.css';


class MatchBox extends React.Component {
	constructor(props) {
		super(props);
	}

	render () {
		return (
			<div className="matchBox">
				<span>Username: {this.props.match.receiver}</span>
				<div className="matchOption">
					<button className="matchBoxButton">View Profile</button>
					<button className="matchBoxButton">Remove Match</button>
				</div>
			</div>
		)
	}
}

export default MatchBox;
