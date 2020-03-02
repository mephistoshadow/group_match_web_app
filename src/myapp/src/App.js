// Importing react-router-dom to use the React Router
import { Route, Switch, BrowserRouter } from 'react-router-dom';

// Importing the Queue and our simple Home Page
import User from './react-components/User/user';
import Course from './react-components/Course/course';
import Login from './react-components/Login'
import SignUp from './react-components/SignUp'
import Header from './react-components/Header'
import HomePage from './react-components/HomePage/HomePage'
import AdminProfile from './react-components/AdminProfile/adminProfile'
import Profile from './react-components/Profile/profile'
import Search from './react-components/Search/Search'
import PostPage from './react-components/PostPage/PostPage'

import '../node_modules/font-awesome/css/font-awesome.min.css';
import React from 'react';
// import Home from './react-components/Home';

class App extends React.Component {

  // a 'global' state that you can pass through to any child componenets of App.
  //   In the Routes below they are passed to both the Home and Queue states.
	state = {
        notificationCounter: 0,
		countCourse: 3,
		countStudent: 4,
		courses: [
			{ id: 1, name: "CSC373", people: "123" },
			{ id: 2, name: "CSC309", people: "35" },
			{ id: 3, name: "CSC369", people: "300" },
		],
		students: [
			{
				id: 1,
				name: "admin",
				password: "admin",
				Email: "admin@mail.utoronto.ca",
				current_courses: [],
				past_courses: []
			},
			{
				id: 2,
				name: "user",
				password: "user",
				Email: "user@mail.utoronto.ca",
				year:1,
				current_courses: ["CSC373", "CSC301"],
				past_courses: ["CSC369", "CSC301", "CSC401"]
			},
			{
				id: 3,
				name: "happy",
				Email: "happy@mail.utoronto.ca",
				year:2,
				password: "1235",
				current_courses: ["CSC373", "CSC301"],
				past_courses: ["CSC369", "CSC301", "CSC401"]
			},
			{
				id: 4,
				name: "jerry",
				Email: "jerry@mail.utoronto.ca",
				year:3,
				password: "user",
				current_courses: ["CSC369", "CSC301", "CSC401"],
				past_courses: []
			}
		],
		pop: false,
		enrolledCourses: ['CSC373'],
		current_user: 'user',
		current_course: 'CSC309',
		posts: [
			{
				name: 'CSC309',
				posts: [
					{
						name: "happy",
						email: "happy@mail.utoronto.ca",
						content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tem" +
							"por incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis" +
							" nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis a" +
							"ute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pa" +
							"riatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mo" +
							"llit anim id est laborum."
					},
					{
						name: "jerry",
						email: "jerry@mail.utoronto.ca",
						content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tem" +
							"por incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis" +
							" nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis a" +
							"ute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pa" +
							"riatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mo" +
							"llit anim id est laborum."
					}
				]
			},
			{
				name: 'CSC373', posts: []
			},
			{
				name: 'CSC369', posts: []
			}
		]
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
						<Route exact path='/AdminProfile' render={() =>
						(<AdminProfile state={this.state} app={this} />)} />
                    <Route exact path='/Search' render={() =>
						(<Search state={this.state} app={this} />)} />
					<Route exact path='/Post' render={() =>
						(<PostPage state={this.state} app={this} />)} />
				</Switch>
				</BrowserRouter>
		</div>
);
}
}
export default App;
