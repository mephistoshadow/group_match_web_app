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
    if(users.state.searchId !== "") {

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



