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
    
    document.querySelector("#hamburgerMenu").style.width = "120px";
    document.querySelector("#collapsedMenu").style.marginLeft = "120px";
    hamburger.style.transform = "rotate(90deg)";
    state = 1;
}

function closeHamburger() {
    const hamburger = document.querySelector('.hamburger-toggle')
    
    document.querySelector("#hamburgerMenu").style.width = "0px";
    document.querySelector("#collapsedMenu").style.marginLeft = "0px";
    hamburger.style.transform = "rotate(0deg)"
    state = 0;
}