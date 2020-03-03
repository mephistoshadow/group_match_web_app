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

  // here we need the server call that can correct setup the data objects for us to use.
  // ie courses, students,posts.
	state = {
        isAdmin: false,
        notificationCounter: 0,
		countCourse: 3,
		countStudent: 4,
		courses: [
			{ id: 1, name: "CSC373", people: 123 },
			{ id: 2, name: "CSC309", people: 35 },
			{ id: 3, name: "CSC369", people: 300 },
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
				current_courses: ["CSC309"],
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
		enrolledCourses: ['CSC309'],
		current_course: 'CSC309',
		posts: [
			{
				name: 'CSC309',
				posts: [
					{
						id: 1,
						name: "happy",
						email: "happy@mail.utoronto.ca",
						isAuthored: false,
						content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tem" +
							"por incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis" +
							" nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis a" +
							"ute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pa" +
							"riatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mo" +
							"llit anim id est laborum."
					},
					{
						id: 2,
						name: "jerry",
						email: "jerry@mail.utoronto.ca",
						isAuthored: false,
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
					<Route exact path="/" render={() =>
						(<Login state={this.state} app={this} />)} />
					<Route exact path="/signup" component={SignUp} />
					<Route exact path="/dashboard" render={() =>
						(<HomePage state={this.state} app={this} />)} />
					<Route exact path='/admin-user' render={() =>
						(<User state={this.state} app={this} />)} />
					<Route exact path='/admin-course' render={() =>
						(<Course state={this.state} app={this} />)} />
					<Route exact path='/user-profile' render={() =>
						(<Profile state={this.state} app={this} />)} />
						<Route exact path='/admin-profile' render={() =>
						(<AdminProfile state={this.state} app={this} />)} />
                    <Route exact path='/search' render={() =>
						(<Search state={this.state} app={this} />)} />
					<Route exact path='/post' render={() =>
						(<PostPage state={this.state} app={this} />)} />
				</Switch>
				</BrowserRouter>
		</div>
);
}
}
export default App;
