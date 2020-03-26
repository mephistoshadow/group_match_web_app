import React from "react";

import Header from "../Header";
import MatchBox from "../MatchBox"
import { getAllMatches, getStudentCourses, deleteMatch} from "../../actions/match";

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
    
    getMatchesForCourse(enrolledCourse) {
        const matches = this.state.matches.filter((match) => match.courseCode === enrolledCourse);
        return matches.map()
    }

//    testDelete(a,b,c,d) {
//        console.log(b,c,d)
//    }

	render() {
        const { app } = this.props
        console.log('courses', this.state.courses)
        console.log('matches', this.state.matches)

        const coursesToMatches = []
        this.state.courses.forEach((course) => 
            coursesToMatches.push(
                {'course': course, 'matches': this.state.matches.filter((match) => match.courseCode === course)}
            )
        )

        console.log('courses to matches', coursesToMatches)

		return (
                <div>
				    <Header app={app}/>
                    <h2 className="h2Header">View Your Matches Below</h2>

                    <div id="matchesContainer">

                    {coursesToMatches.map((obj) =>
                            <div className="outerMatchesContainer">
                            <h3 className="h3Header">Your matches in {obj.course}</h3>
                            {
                                obj.matches.length === 0 ?
                                <span>No matches!</span> :
                                (<div className="innerMatchesContainer">
                                    {obj.matches.map((match) =>
                                    <MatchBox
                                        match={match}
                                        deleteMatch={() => deleteMatch(this, match.courseCode, match.sender, match.receiver)}
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
