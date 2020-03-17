import React from 'react'

import './styles.css'

import { openHamburgerMenu, closeHamburgerMenu } from './hamburgerMenuActions'
import { Link, Redirect } from 'react-router-dom'

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hamburgerMenuIsOpen: false 
		}
	}

	hamburgerMenuClick() {
        if (this.state.hamburgerMenuIsOpen) {
            closeHamburgerMenu(this.refs.hamburgerIcon, this.refs.hamburgerMenu, this.refs.hamburgerCollapsedMenu);
        } else {
            openHamburgerMenu(this.refs.hamburgerIcon, this.refs.hamburgerMenu, this.refs.hamburgerCollapsedMenu);
        }

        this.setState({
            hamburgerMenuIsOpen: !this.state.hamburgerMenuIsOpen
        })
    }

	getNavbarDropdownCourses() {
        const navbarDropdownCourses = this.props.enrolledCourses.map(function(course) {
			return <Link to="/search" className="navbarDropdownCourse">{course}</Link>
		})

		return navbarDropdownCourses;
	}

	// We need server call to get information about current user's Notifications
	// This can be done with other pages pass the notification information to Headers
	// Once the student click yes/no, the reaction should be saved into our database 
	// by another server call
    handleNotificationCounter = () => {
        const notifCounter = document.querySelector(".notificationCounter")
        const notifBell = document.querySelector("#notificationBell").children[0]
        const notifText = document.querySelector("#notificationDropdown").children[0]
        const notifButtons = document.querySelectorAll(".notificationDropdownButton")
//        console.log(notifButtons)
        if (notifCounter.innerText == 0){
            notifCounter.style.display = "none"
            notifBell.style.color = null
            
            //Check for 0 notifications
            notifText.innerText = "0 Notifications"
            notifButtons[0].style.display = "none"
            notifButtons[1].style.display = "none"
        } else{
            notifCounter.style.display = "visible"
            notifBell.style.color = "orange"
            
            //Grab notofications here
            notifText.innerText = "Mark Z. has invited you to connect for CSC309"
            notifButtons[0].style.display = "visible"
            notifButtons[1].style.display = "visible"
        }
        
    
    }
    
    handleNotifClickYes = () => {
        const notifButtons = document.querySelectorAll(".notificationDropdownButton")
        const notifText = document.querySelector("#notificationDropdown").children[0]
        notifText.innerText = "Accepted"
        notifButtons[0].style.display = "none"
        notifButtons[1].style.display = "none"
        
        //Hardcoded so far
        const notifCounter = document.querySelector(".notificationCounter")
        notifCounter.innerText -= 1
        setTimeout(this.handleNotificationCounter, 1000);
    }
    
    handleNotifClickNo = () => {
        const notifButtons = document.querySelectorAll(".notificationDropdownButton")
        const notifText = document.querySelector("#notificationDropdown").children[0]
        notifText.innerText = "Declined"
        notifButtons[0].style.display = "none"
        notifButtons[1].style.display = "none"
        
        //Hardcoded so far
        const notifCounter = document.querySelector(".notificationCounter")
        notifCounter.innerText -= 1
        setTimeout(this.handleNotificationCounter, 1000);

        
    }

    componentDidMount = () => {
        console.log("NOTIF ", this.props.notificationCounter)
        if (this.props.user === 'user') {
        	this.handleNotificationCounter();
    	}
    }

	render() {
		let userOptions;
		let homeLink;
		let homeLinkButton;

		if (this.props.user === 'user') {
			userOptions =
				<div id="userOptions">
                    <Link to="/matches" className="navbarLink">MATCHES</Link>
					<div id="navbarDropdownMenu">
						<span id="navbarDropdownButton">
							COURSES <i className="fas fa-chevron-down"></i>
						</span>
						<div id="navbarDropdownContent" ref="navbarDropdownContent">
							{this.getNavbarDropdownCourses.bind(this)()}
						</div>
					</div>

					<div id="notificationBell">
						<i className="fas fa-bell"></i>
						<span className="notificationCounter"> {this.props.notificationCounter} </span>
						<div id="notificationDropdown">
							<span> Mark Z. has invited you to connect for CSC309 </span>

							<button className="notificationDropdownButton" onClick={this.handleNotifClickYes}><i className="far fa-check-circle"></i></button>
							<button className="notificationDropdownButton" onClick={this.handleNotifClickNo}><i className="far fa-times-circle"></i></button>
						</div>
					</div>
				</div>
			homeLink = <Link to={"/dashboard"}>Home</Link>
			homeLinkButton = <Link to={"/dashboard"} className="fas fa-home"></Link>
		}
		

		return(
			<div id="header">
				<div id="hamburgerMenu" ref="hamburgerMenu">
                    <div className="hamburgerContent">
						{homeLink}
                        <Link to={"/" + this.props.user + '-profile'}>Profile</Link>
                        <Link to={"/"}>Logout</Link>
                    </div>
                </div>

			    <div id="hamburgerCollapsedMenu" ref="hamburgerCollapsedMenu">
                    <a className="hamburgerMenuButton">
                        <i className="fa fa-bars hamburger-toggle" ref="hamburgerIcon" onClick={this.hamburgerMenuClick.bind(this)}></i>
                    </a>

                    <div className="hamburgerContent">
						{homeLinkButton}
						<Link to={"/" + this.props.user + '-profile'} className="far fa-user-circle"></Link>
                        <Link to={"/"} className="fas fa-sign-out-alt"></Link>
                    </div>
                </div>

			    <div id="navbar">
			        <span id="navbarLogo">GROUPIE</span>
			        	{userOptions}
			    </div>
		    </div>
		);
	}
}

export default Header;
