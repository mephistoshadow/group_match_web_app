// A functon to update a form state
export const updateForm = (comp, field) => {
    const value = field.value
    const name = field.name

    comp.setState({
        [name]: value
    })
}

export const updateCheckbox = (comp, checkbox) => {
	const name = checkbox.name
	const value = checkbox.checked

	comp.setState({
		[name]: value
	})
}

// Return a  object selected by his/her id
export const getObjectById = (objectList, id) => {
	const object = objectList.filter((o) => o.id === id)
	return object[0]
} 


// Return a  object selected by his/her name
export const getObjectByName = (objectList, name) => {
	const object = objectList.filter((o) => o.name === name)
	return object[0] 
}