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
					<button className="matchBoxButton">VIEW PROFILE</button>
					<button className="matchBoxButton">REMOVE MATCH</button>
				</div>
			</div>
		)
	}
}

export default MatchBox;
