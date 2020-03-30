import React from "react";

import Header from "../Header";
import MatchBox from "../MatchBox"
import { getStudentCourses, getStudentMatches, getCoursesToMatches, deleteMatch } from "../../actions/match";

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

        const currentId = app.state.currentId

        await getStudentMatches(this, currentId)
        await getStudentCourses(this, currentId)
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        const { app } = this.props

        const currentId = app.state.currentId
        const updatedMatches = JSON.stringify(prevState.matches) !== JSON.stringify(this.state.matches)

        if (updatedMatches) { // Match is deleted
            await getStudentMatches(this, currentId)
            await getStudentCourses(this, currentId)
        }
    }

	render() {
        const { app, history } = this.props

        console.log('props', this.props)
        console.log('state', this.state)

		return (
                <div>
				    <Header app={app}/>
                    <h2 className="h2Header">View Your Matches Below</h2>

                    <div id="matchesContainer">

                    {getCoursesToMatches(this).map((obj) =>
                            <div className="outerMatchesContainer">
                            <h3 className="h3Header">Your matches in {obj.course.code}: {obj.course.title}</h3>
                            {
                                obj.matches.length === 0 ?
                                <span>No matches!</span> :
                                (<div className="innerMatchesContainer">
                                    {obj.matches.map((match) =>
                                    <MatchBox
                                        match={match}
                                        history={history}
                                        deleteMatch={() => deleteMatch(this, match.course, match.sender, match.receiver)}
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
