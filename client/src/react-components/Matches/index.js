import React from "react";

import Header from "../Header";
import MatchBox from "../MatchBox"
import { getAllMatches, getStudentCourses, deleteMatch, getStudentObj} from "../../actions/match";

import './styles.css';


class Matches extends React.Component {
	constructor(props) {
		super(props);
	}
    
    state = {
            matches : [],
            courses: [],
            coursesToMatches: [],
            currProfile: ""
    }

    async componentDidMount() {
        const { app } = this.props
        await getAllMatches(this, app.state.currentUser)
        await getStudentCourses(this, app.state.currentUser)
        this.updateCoursesToMatches()
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        const { app } = this.props
        if (prevState.matches !== this.state.matches) { // Match is deleted
            await getAllMatches(this, app.state.currentUser)
            this.updateCoursesToMatches()
        }
    }

    updateCoursesToMatches() {
        const coursesToMatches = []
        this.state.courses.forEach((course) => 
            coursesToMatches.push(
                {'course': course, 'matches': this.state.matches.filter((match) => match.courseCode === course)}
            )
        )
        this.setState({coursesToMatches: coursesToMatches})
    }

	render() {
        const { app, history } = this.props

		return (
                <div>
				    <Header app={app}/>
                    <h2 className="h2Header">View Your Matches Below</h2>

                    <div id="matchesContainer">

                    {this.state.coursesToMatches.map((obj) =>
                            <div className="outerMatchesContainer">
                            <h3 className="h3Header">Your matches in {obj.course}</h3>
                            {
                                obj.matches.length === 0 ?
                                <span>No matches!</span> :
                                (<div className="innerMatchesContainer">
                                    {obj.matches.map((match) =>
                                    <MatchBox
                                        match={match}
                                        history={history}
                                        deleteMatch={() => deleteMatch(this, match.courseCode, match.sender, match.receiver)}
                                        linkMatchProfile={() => this.linkMatchProfile(match.receiver)}
                                        />)}
                                </div>)
                            }
                            </div>
                    )}

                    </div>
                </div>
            )
	}
}

export default Matches
