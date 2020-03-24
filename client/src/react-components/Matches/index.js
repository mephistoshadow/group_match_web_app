import React from "react";

import Header from "../Header";
import MatchBox from "../MatchBox"
import { Link, Redirect } from 'react-router-dom'
import { getAllMatches, getStudentCourses} from "../../actions/match";


import './styles.css';


class Matches extends React.Component {
	constructor(props) {
		super(props);
        this.state = {
        
            matches : [],
        
            user: '',
            enrolledCourses: [],
//            matches: [{name: 'Jane Doe', course: 'CSC309', status: 'accepted'}, {name: 'John Doe', course: 'CSC309', status: 'pending'}, {name: 'Mr Bean', course: 'CSC373', status: 'accepted'}]
        }
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

	render() {
        const { app } = this.props
		return (
                <div>
				<Header app={app}/>
                <h2 className="h2Header">View Your Matches Below</h2>


                <div id="matchesContainer">
                {this.state.enrolledCourses.map((enrolledCourse) =>
                    <div id={enrolledCourse.toString() + "Matches"}>

                    <h3 className="h3Header">Your matches in {enrolledCourse}</h3>
                    
                    {this.state.matches
                        .filter((match) => match.courseCode === enrolledCourse)
                        .map((match) => <MatchBox match={match}></MatchBox>)
                    }

                    </div>)}
                </div>


                </div>
        );
	}
}




export default Matches;

