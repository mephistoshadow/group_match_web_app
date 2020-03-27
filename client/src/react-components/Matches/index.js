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
            courses: []
    }

    async componentDidMount() {
        const { app } = this.props
        await getAllMatches(this, app.state.currentUser)
        await getStudentCourses(this, app.state.currentUser)
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        const { app } = this.props

        const updatedMatches = JSON.stringify(prevState.matches) !== JSON.stringify(this.state.matches)

        if (updatedMatches) { // Match is deleted
            await getAllMatches(this, app.state.currentUser)
            await getStudentCourses(this, app.state.currentUser)
        }
    }

    getCoursesToMatches() {
        const coursesToMatches = []
        this.state.courses.forEach((course) => 
            coursesToMatches.push(
                {'course': course, 'matches': this.state.matches.filter((match) => match.courseCode === course)}
            )
        )
        return coursesToMatches
    }

	render() {
        const { app, history } = this.props

        console.log(this.state)

		return (
                <div>
				    <Header app={app}/>
                    <h2 className="h2Header">View Your Matches Below</h2>

                    <div id="matchesContainer">

                    {this.getCoursesToMatches().map((obj) =>
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
