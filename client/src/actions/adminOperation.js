export const showAllUsers = (users, app) => {
    const url = "/students";

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get students");
            }
        })
        .then(json => {
               users.setState({ students: json });
               users.setState({ load: false });
            // the resolved promise with the JSON body
        })
        .catch(error => {
            console.log(error);
        });
}

export const showAllCourses = (courses, app) => {
    const url = "/courses";

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert("Could not get courses");
            }
        })
        .then(json => {
               courses.setState({ courses: json });
               courses.setState({ load: false });
            // the resolved promise with the JSON body
        })
        .catch(error => {
            console.log(error);
        });
}

export const searchStudents = (users, app) => {
    if(users.state.searchId != "") {

    const url = "/students/" + users.state.searchId;
    
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert("Could not get students");
            }
        })
        .then(json => {
            if(json) {
               users.setState({ searchOne: json });
               users.setState({searchResult:true});
            }
            // the resolved promise with the JSON body
        })
        .catch(error => {
            console.log(error);
        });
    }
}

export const searchCourse = (course, app) => {

	if (course.state.searchId !== "") {
		const url = "/courses/" + course.state.searchId;
		fetch(url)
			.then(res => {
				if (res.status === 200) {
					return res.json();
				} else {
					alert("Could not get students");
				}
			})
			.then(json => {
				if(json) {
				   course.setState({ searchOne: json });
				   course.setState({searchResult:true});
				}
			})
			.catch(error => {
				console.log(error);
			});
    }
}

export const deleteStudent = (studentCard, app) => {
    const url = "/students/" + studentCard.props.student._id;
    const request = new Request(url, {
        method: "delete",
    });

    fetch(request)
        .then(function (res) {
            if (res.status === 200) {
                studentCard.props.user.setState({load:true})
            } else {
            }
        })
        .catch(error => {
            console.log(error);
        });
}

export const deleteCourse = (courseCard, app) => {
    const url = "/courses"
    console.log(courseCard.props.student.code);
    const request = new Request(url, {
        method: "delete",
        body: JSON.stringify({
            code : courseCard.props.student._id
        }),
         headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
        .then(function (res) {
            if (res.status === 200) {
                courseCard.props.course.setState({load:true})
            } else {
            }
        })
        .catch(error => {
            console.log(error);
        });
}

export const deleteUser = (studentCard, app) => {
    let url = ""
    
    url = "/users/" + studentCard.props.student._id;
    const request = new Request(url, {
        method: "delete",
    });

    fetch(request)
        .then(function (res) {
            if (res.status === 200) {
                studentCard.props.user.setState({load:true})
            } else {
            }
        })
        .catch(error => {
            console.log(error);
        });
}

export const addNew = (comp, app) => {
    const request = new Request("/users/signup", {
        method: 'post',
        body: JSON.stringify({
            // Fields to create new user
            username: comp.state.newName,
            password: comp.state.newPassword,
            email: comp.state.newName + "@mail.ca",
            isAdmin: false,
            // Fields to create new student
            username: comp.state.newName,
            firstName: "N/A",
            lastName: "N/A",
            year: 0,
            CGPA:0,
            isCommuter: false
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    fetch(request).then((res) => {
        if (res.status === 200) {
        }
    }).catch((error) => {
        console.log(error)
    })

}

export const addStudent = (comp, app) => {
    if(comp.state.newName != "") {


   const url = "/students"
   const student = {
        username: comp.state.newName,
        firstName: "N/A",
        lastName: "N/A",
        year: 0,
        courses:[],
        CGPA: 0,
        isCommuter: false

   }
   const request = new Request(url, {
        method: "post",
        body: JSON.stringify(student),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                 comp.props.user.setState({load:true})
            } else {
            }
        })
        .catch(error => {
            console.log(error);
        });
    }
}

export const addCourse = (comp, app) => {


   const url = "/courses"
   const course = {
        title: comp.state.newName,
        code:comp.state.newCode,
        people:0
   }
   const request = new Request(url, {
        method: "post",
        body: JSON.stringify(course),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
        .then(function (res) {
            if (res.status === 200) {
                 comp.props.course.setState({load:true})
            } else {
            }
        })
        .catch(error => {
            console.log(error);
        });
}

export const addUser = (comp, app) => {

   const url = "/users"
   const user = {
        username: comp.state.newName,
        password: comp.state.newPassword,
        email:comp.state.newName + "@mail.ca",
        isAdmin:false

   }
   const request = new Request(url, {
        method: "post",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            if (res.status === 200) {

            } else {
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

export const updateCourse = (comp, app) => {
   
    const url = "/courses/" + comp.props.student._id;

    const title = 
    {
        title:comp.state.newName
    }

    const request = new Request(url, {
        method: "PATCH",
        body: JSON.stringify(title),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });
    fetch(request)
        .then(function (res) {
            if (res.status === 200) {
                  comp.props.course.setState({load:true})
            } else {
                console.log("failed")
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const updateCourseCode = (comp, app) => {
	const url = "/courses/code/" + comp.props.student._id
	const code = { code: comp.state.newCode }

	const request = new Request(url, {
		method: "PATCH",
		body: JSON.stringify(code),
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json"
		}
	});
	fetch(request)
		.then(function (res) {
			if (res.status === 200) {
				comp.props.course.setState({ load: true })
			} else {
				console.log("failed")
			}
		})
		.catch(error => {
			console.log(error);
		});
}

export const updateStudentUserName = (comp, app) => {
   
    const url = "/students/admin/" + comp.props.student._id;

    
    const name = 
    {
        username:comp.state.newName
    }

   
    const request = new Request(url, {
        method: "PATCH",
        body: JSON.stringify(name),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });
    fetch(request)
        .then(function (res) {
            if (res.status === 200) {
                  comp.props.user.setState({load:true})
            } else {
                console.log("failed")
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const updateUserName = (comp, app) => {
    let url = ""
   
    url = "/users/admin/" + comp.props.student._id;

    // const url = "/users/admin/" + comp.props.student.username;
    const info = 
    {
        username:comp.state.newName,
        email:comp.state.newName + "@mail.ca"
    }
    const request = new Request(url, {
        method: "PATCH",
        body: JSON.stringify(info),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });
    fetch(request)
        .then(function (res) {
            if (res.status === 200) {
                  comp.props.user.setState({load:true})
                  comp.props.user.setState({...comp.props.user.state.searchOne,username:comp.state.newName})
            } else {
                console.log("failed")
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const updateUserPassword = (comp, app) => {
    let url = ""
   
    url = "/users/admin/password/" + comp.props.student._id;

    console.log(comp.state.name);
    
    const info = 
    {
        password:comp.state.newPassword
    }
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(info),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });
    fetch(request)
        .then(function (res) {
            if (res.status === 200) {
                  comp.props.user.setState({load:true})
            } else {
                console.log("failed")
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const getEnrolledStudent = (comp, id) => {
	let url = '/students'
	fetch(url).then((result) => {
		if (result.status == 200) {
			return result.json()
		}
	}).then((json) => {
		const enrolledStudents = json.filter((student) => {
			return student.courses.indexOf(id) !== -1
		})
		comp.setState({ enrolledStudents: enrolledStudents })
	}).catch((e) => {
		console.log(e)
	})
}

export const getEnrolledCourses = (comp, ids) => {
   

    ids.map((courseid) => {
         let url = '/courses/' + courseid
        fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert("Could not get students");
            }
        })
        .then(json => {
            if(json) {
               comp.setState({ enrollCourses:  comp.state.enrollCourses.concat([json])});
            }
        })
        .catch(error => {
            console.log(error);
        });
    });
}





