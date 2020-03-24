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

// export const getUserPost = (searchComp, courseCode, currentUser) => {
// 	const url = `/posts/${courseCode}/${currentUser}`

// 	fetch(url).then((result) => {
// 		if (result.status === 200) {
// 			return result.json()
// 		}
// 	}).then((post) => {
// 		if (post) {
// 			searchComp.setState({madePost: true})
// 		}
// 	}).catch((error) => {
// 		console.log(error)
// 	})
// }

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
    		searchComp.setState({madePost: false})
    	}
    }).catch((error) => {
    	console.log(error)
    })
}

export const addUserPost = (searchComp, courseCode, content, author) => {
	if (content.trim().length === 0) {
		searchComp.setState({postError: 'Post body cannot be empty'})
	} else {
		const addRequest = new Request('/posts', {
			method: "post",
			body: JSON.stringify({
				courseCode: courseCode,
				content: content,
				author: author
			}),
			headers: {
	            Accept: "application/json, text/plain, */*",
	            "Content-Type": "application/json"
	        }
		})

		fetch(addRequest).then((result) => {
    		if (result.status === 200) {
    			searchComp.setState({madePost: true, postError: ''})
    		}
    	}).catch((error) => {
    		console.log(error)
    	})
	}
}