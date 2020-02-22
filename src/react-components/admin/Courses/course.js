"use strict"
const log = console.log
let state = 0;



function showpop() {
	document.querySelector(".popup").style.display = "block";
}


function closepop() {
	document.querySelector(".popup").style.display = "none";
}


function hamburgerClick() {
    if (state == 0) {
        openHamburger()
    } else if (state == 1){
        closeHamburger()
    }
}

function openHamburger() {
    const hamburger = document.querySelector('.hamburger-toggle')
    
    document.querySelector(".hamburgerMenu").style.width = "120px";
    document.querySelector(".collapsedMenu").style.marginLeft = "120px";
    document.querySelector(".card").style.marginLeft = "300px";
    hamburger.style.transform = "rotate(90deg)";
    state = 1;
}

function closeHamburger() {
    const hamburger = document.querySelector('.hamburger-toggle')
    
    document.querySelector(".hamburgerMenu").style.width = "0px";
    document.querySelector(".collapsedMenu").style.marginLeft = "0px";
    document.querySelector(".card").style.marginLeft = "150px";
    hamburger.style.transform = "rotate(0deg)"
    state = 0;
}