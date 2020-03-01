// Importing react-router-dom to use the React Router
import { Route, Switch, BrowserRouter } from 'react-router-dom';

// Importing the Queue and our simple Home Page
import User from './react-components/User/user';
import Course from './react-components/Course/course';
import Login from './react-components/Login'
import SignUp from './react-components/SignUp'
import Header from './react-components/Header'
import HomePage from './react-components/HomePage/HomePage'
import Profile from './react-components/Profile/profile'
import Search from './react-components/Search/Search'

import '../node_modules/font-awesome/css/font-awesome.min.css';
import React from 'react';
// import Home from './react-components/Home';

class App extends React.Component {

  // a 'global' state that you can pass through to any child componenets of App.
  //   In the Routes below they are passed to both the Home and Queue states.
	state = {
		countCourse: 3,
		countStudent: 4,
		courses: [
			{ id: 1, name: "CSC373", people: "123" },
			{ id: 2, name: "CSC309", people: "35" },
			{ id: 3, name: "CSC369", people: "300" },
		],
		students: [
			{ id: 1,
			  name: "admin",
			  password: "12345",
        Email:"admin@mail.utoronto.ca",
			  current_courses: [],
			  past_courses: []
			},
      { id: 2,
        name: "user",
        password: "12345",
        Email:"user@mail.utoronto.ca",
        current_courses: [],
        past_courses: []
      },
			{
			  id: 3,
			  name: "happy",
        Email:"happy@mail.utoronto.ca",
			  password: "1235",
			  current_courses: [],
			  past_courses: []
			},
			{
			  id: 4,
			  name: "jerry",
        Email:"user@mail.utoronto.ca",
			  password: "user",
			  current_courses: ["CSC373", "CSC309", "CSC369"],
			  past_courses: []
			}
		],
		pop: false,
		enrolledCourses: ['CSC373'] 
	}
	render() {
		return (
			<div>
				<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Login} />
					<Route exact path="/signup" component={SignUp} />
					<Route exact path="/dashboard" render={() =>
						(<HomePage state={this.state} app={this} />)} />
					<Route exact path='/AdminUser' render={() =>
						(<User state={this.state} app={this} />)} />
					<Route exact path='/Admincourse' render={() =>
						(<Course state={this.state} app={this} />)} />
					<Route exact path='/Profile' render={() =>
						(<Profile state={this.state} app={this} />)} />
                    <Route exact path='/Search' render={() =>
                        (<Search state={this.state} app={this} />)} />
				</Switch>
				</BrowserRouter>
		</div>
);
}
}
export default App;
