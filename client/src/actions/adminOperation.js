

const showAllUsers = (users, app) => {
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
            if(json) {
               users.setState({ students: json.students });
                users.setState({ load: false });
                console.log(1);
            }
            // the resolved promise with the JSON body
           
        })
        .catch(error => {
            console.log(error);
        });
}


const searchStudents = (users, app) => {
    if(users.state.searchId!= "") {


    const url = "http://localhost:5000/students/" + users.state.searchId;

    
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




module.exports = {
    showAllUsers,
    searchStudents
}