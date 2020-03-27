export const addStudentObj = (searchComp, currentUser) => {
    const url = `/students/username/${currentUser}`

    fetch(url).then((result) => {
        if (result.status === 200) {
            return result.json()
        }
    }).then((json) => {
        if (json) {
            if (!searchComp.state.studentObjList.includes(JSON.stringify(json))){
                searchComp.setState({ studentObjList: [...searchComp.state.studentObjList, json]})
            }
        }
    }).catch((error) => {
        console.log(error)
    })
}

export const getCoursePosts = (searchComp, courseCode, currentUser) => {
	const url = `/posts/${courseCode}`

	fetch(url).then((result) => {
		if (result.status === 200) {
			return result.json()
		}
	}).then((posts) => {
		searchComp.setState({
			posts: posts,
			madePost: posts.some((post) => post.author === currentUser)
		})
	}).catch((error) => {
		console.log(error)
	})
}

export const getSentMatches = (searchComp, courseCode, currentUser) => {
	const url = `/matches/sent/${currentUser}/${courseCode}`

	fetch(url).then((result) => {
		if (result.status === 200) {
			return result.json()
		}
	}).then((matches) => {
		searchComp.setState({
			sentMatches: matches
		})
	})
}

export const addMatch = (searchComp, courseCode, sender, receiver) => {
	const url = `/matches`

	const addRequest = new Request(url, {
		method: "post",
		body: JSON.stringify({
			sender: sender,
			receiver: receiver,
			courseCode: courseCode
		}),
		headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
	})

	fetch(addRequest).then((result) => {
		if (result.status === 200) {
			return result.json()
		}
	}).then((json) => {
		searchComp.setState({
			sentMatches: searchComp.state.sentMatches.concat([json])
		})
	}).catch((error) => {
		console.log(error)
	})
}

export const deleteMatch = (searchComp, courseCode, sender, receiver) => {
	const url = `/matches`

	const deleteRequest = new Request(url, {
		method: "delete",
		body: JSON.stringify({
			sender: sender,
			receiver: receiver,
			courseCode: courseCode
		}),
		headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
	})

	fetch(deleteRequest).then((result) => {
		if (result.status === 200) {
			return result.json()
		}
	}).then((json) => {
		searchComp.setState({
			sentMatches: searchComp.state.sentMatches.filter((match) => JSON.stringify(match) !== JSON.stringify(json))
		})
	}).catch((error) => {
		console.log(error)
	})
}

export const addPost = (searchComp, courseCode, content, author) => {
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
    			return result.json()
    		}
    	}).then((json) => {
    		searchComp.setState({
    			madePost: true,
    			posts: searchComp.state.posts.concat([json])
    		})
    	}).catch((error) => {
    		console.log(error)
    	})
	}
}

export const deletePost = (searchComp, courseCode, author) => {
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
    		return result.json()
    	}
    }).then((json) => {
    	searchComp.setState({
    		madePost: false,
    		posts: searchComp.state.posts.filter((post) => JSON.stringify(post) !== JSON.stringify(json))
    	})
    }).catch((error) => {
    	console.log(error)
    })
}
