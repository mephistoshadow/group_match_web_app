export const getCoursePosts = (searchComp, courseCode) => {
	const url = `/posts/${courseCode}`

	fetch(url).then((result) => {
		if (result.status === 200) {
			return result.json()
		}
	}).then((posts) => {
		searchComp.setState({posts: posts})
	}).catch((error) => {
		console.log(error)
	})
}

export const getUserPost = (searchComp, courseCode, currentUser) => {
	const url = `/posts/${courseCode}/${currentUser}`

	fetch(url).then((result) => {
		if (result.status === 200) {
			return result.json()
		}
	}).then((post) => {
		if (post) {
			searchComp.setState({madePost: true})
		}
	}).catch((error) => {
		console.log(error)
	})
}

export const deleteUserPost = (searchComp, courseCode, author) => {
	const url = `/posts/${courseCode}`

	const deleteRequest = new Request(url, {
        method: "delete",
        body: JSON.stringify({
        	author: author
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    fetch(deleteRequest).then((result) => {
    	if (result.status === 200) {
    		fetch(url).then((result) => {
    			if (result.status === 200) {
    				return result.json()
    			}
    		}).then((posts) => {
    			searchComp.setState({posts: posts, madePost: false})
    		}).catch((error) => {
    			console.log(error)
    		})
    	}
    }).catch((error) => {
    	console.log(error)
    })
}