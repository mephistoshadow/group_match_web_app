// Methods in this file is some basic functions we might used in different pages
// This file has some function copy/changed from Week8 student.js in class by Prof


'use strict';
const log  = console.log 


// Return a  object selected by his/her id
const getObjectById = (objectList, id) => {
	const object = objectList.filter((o) => o.id === id)
	return object[0]
} 


// Return a  object selected by his/her name
const getObjectByName = (objectList, name) => {
	const object = objectList.filter((o) => o.name === name)
	return object[0] 
}


module.exports= {
	getObjectById,
	getObjectByName
}
