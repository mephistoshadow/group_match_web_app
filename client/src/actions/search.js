export const getStudent = (searchPostComp, author) => {
	const url = `/students/${author}`

	fetch(url).then((result) => {
		if (result.status === 200) {
			return result.json()
		}
	}).then((student) => {
		if (student._id === author) {
			searchPostComp.setState({student: student})
		}
	}).catch((error) => {
		console.log(error)
	})
}

export const getCoursePosts = (searchComp, courseId, currentId) => {
	const url = `/posts/${courseId}`

	fetch(url).then((result) => {
		if (result.status === 200) {
			return result.json()
		}
	}).then((posts) => {
		searchComp.setState({
			posts: posts,
			madePost: posts.some((post) => post.author === currentId)
		})
	}).catch((error) => {
		console.log(error)
	})
}

export const addPost = (searchComp, courseId, content, author) => {
	const url = '/posts'

	if (content.trim().length === 0) {
		searchComp.setState({postError: 'Post body cannot be empty'})
	} else {
		const addRequest = new Request(url, {
			method: "post",
			body: JSON.stringify({
				course: courseId,
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

export const deletePost = (searchComp, courseId, author) => {
	const url = `/posts/${courseId}`

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

export const getSentMatches = (searchComp, courseId, currentId) => {
	const url = `/matches/sent/${currentId}/${courseId}`
	console.log('url', url)
	fetch(url).then((result) => {
		console.log('sent matches result', result)
		if (result.status === 200) {
			return result.json()
		}
	}).then((matches) => {
		searchComp.setState({
			sentMatches: matches
		})
	})
}

export const addMatch = (searchComp, courseId, sender, receiver) => {
	const url = `/matches`

	const addRequest = new Request(url, {
		method: "post",
		body: JSON.stringify({
			sender: sender,
			receiver: receiver,
			course: courseId
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

export const deleteMatch = (searchComp, courseId, sender, receiver) => {
	const url = `/matches`

	const deleteRequest = new Request(url, {
		method: "delete",
		body: JSON.stringify({
			sender: sender,
			receiver: receiver,
			course: courseId
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