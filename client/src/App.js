import { Route, Switch, BrowserRouter } from 'react-router-dom';

import { readCookie } from './actions/authentication'

import User from './react-components/User';
import Course from './react-components/Course';
import Login from './react-components/Login'
import SignUp from './react-components/SignUp'
import HomePage from './react-components/HomePage'
import AdminProfile from './react-components/AdminProfile'
import Profile from './react-components/Profile'
import Search from './react-components/Search'
import Matches  from './react-components/Matches'

import React from 'react';

class App extends React.Component {
	constructor(props) {
		super(props)
		readCookie(this)
	}
	
	state = {
		currentId: '',
  		currentUser: '',
		isAdmin: false
	}

	render() {
		const {currentId, currentUser, isAdmin} = this.state
		const authorized = (currentUser !== '' && currentId !== '')
		const emptyPage = <div></div>

		return (
			<div><BrowserRouter>
				<Switch>
					<Route exact path={['/', '/login', '/dashboard', '/admin-profile']} render={() => (
						!authorized ? <Login app={this}/> : (
						!isAdmin ? <HomePage app={this}/> : <AdminProfile app={this}/>
					))}/>

					<Route exact path='/signup' render={({history}) => (
						<SignUp history={history} app={this}/>
					)}/>

					<Route exact path='/admin-user' render={() => (
						authorized ? <User state={this.state} app={this}/> : emptyPage
					)}/>

					<Route exact path='/admin-course' render={() => (
						authorized ? <Course state={this.state} app={this}/> : emptyPage
					)}/>

					<Route path='/profile/user/:id' render={({match, history}) => (
						authorized ? <Profile app={this} match={match} history={history}/> : emptyPage
					)}/>

                    <Route path='/search/course/:id' render={({match, location}) => (
                    	authorized ? <Search app={this} match={match} location={location}/> : emptyPage
                    )}/>

					<Route exact path='/matches' render={({match, history}) => (
						authorized ? <Matches app={this} match={match} history={history}/> : emptyPage
					)}/>
				</Switch>
			</BrowserRouter></div>
		)
	}
}

export default App;