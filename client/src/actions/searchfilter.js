export const updateYearCheckbox = (searchComp, checkBox) => {
	const targetYear = parseInt(checkBox.name)

	if (checkBox.checked === true) {
		searchComp.setState({
			yearFilter: searchComp.state.yearFilter.concat([targetYear])
		})
	} else {
		searchComp.setState({
			yearFilter: searchComp.state.yearFilter.filter((year) => year !== targetYear)
		})
	}
}

export const updateMinCGPA = (searchComp, field) => {
	const CGPA = parseFloat(field.value)

	if (isNaN(CGPA)) {
		searchComp.setState({
			minCGPAFilter: 0,
			minCGPAError: ''
		})
	} else if (CGPA < 0 || CGPA > 4) {
		searchComp.setState({
			minCGPAError: 'Min CGPA must be between 0 and 4'
		})
	} else {
		searchComp.setState({
			minCGPAFilter: CGPA,
			minCGPAError: ''
		})
	}
}

export const updateMaxCGPA = (searchComp, field) => {
	const CGPA = parseFloat(field.value)

	if (isNaN(CGPA)) {
		searchComp.setState({
			maxCGPAFilter: 4,
			maxCGPAError: ''
		})
	} else if (CGPA < 0 || CGPA > 4) {
		searchComp.setState({
			maxCGPAError: 'Max CGPA must be between 0 and 4'
		})
	} else {
		searchComp.setState({
			maxCGPAFilter: CGPA,
			maxCGPAError: ''
		})
	}
}

export const updateCommuterCheckbox = (searchComp, checkBox) => {
	searchComp.setState({
		commuterFilter: checkBox.checked
	})
}