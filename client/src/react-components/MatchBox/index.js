import React from "react";

import './styles.css';
//import {deleteMatch} from "../../actions/search";

class MatchBox extends React.Component {
	constructor(props) {
		super(props);
	}

	render () {
        const { match, deleteMatch, linkMatchProfile } = this.props
		return (
			<div className="matchBox">
				<span>Username: {this.props.match.receiver}</span>
				<div className="matchOption">
					<button onClick={linkMatchProfile} className="matchBoxButton">VIEW PROFILE</button>
					<button onClick={deleteMatch} className="matchBoxButton">REMOVE MATCH</button>
				</div>
			</div>
		)
	}
}

export default MatchBox;
