export const showAllUsers = (users, app) => {
    const url = "http://localhost:5000/students";

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


export const deleteUser = (studentCard, app) => {
    let url = ""
    if(studentCard.state.name=="") {
         url = "/users/" + studentCard.props.student.username;
    } else {
        url = "/users/" + studentCard.state.name;
    }
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
    if(comp.state.name=="") {
         url = "/users/admin/" + comp.props.student.username;
    } else {
        url = "/users/admin/" + comp.state.name;
    }

   
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
    if(comp.state.name=="") {
         url = "/users/admin/password/" + comp.props.student.username;
    } else {
        url = "/users/admin/password/" + comp.state.name;
    }

    console.log(comp.state.name);
    

    
    const info = 
    {
        password:comp.state.newPassword
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
            } else {
                console.log("failed")
            }
        })
        .catch(error => {
            console.log(error);
        });
};







