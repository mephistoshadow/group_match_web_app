"use strict"
const log = console.log
let state = 0;



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
    document.querySelector(".courseContainer").style.marginLeft = "300px";
    hamburger.style.transform = "rotate(90deg)";
    state = 1;
}

function closeHamburger() {
    const hamburger = document.querySelector('.hamburger-toggle')
    
    document.querySelector(".hamburgerMenu").style.width = "0px";
    document.querySelector(".collapsedMenu").style.marginLeft = "0px";
document.querySelector(".courseContainer").style.marginLeft = "150px";
    hamburger.style.transform = "rotate(0deg)"
    state = 0;
}

function joinClassClick(){}

function dropClassClick(){}