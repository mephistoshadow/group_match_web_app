export const openHamburgerMenu = (hamburgerIcon, hamburgerMenu, hamburgerCollapsedMenu) => {
	hamburgerIcon.style.transform = "rotate(90deg)";
	hamburgerMenu.style.width = "120px";
	hamburgerCollapsedMenu.style.marginLeft = "120px";
}

export const closeHamburgerMenu = (hamburgerIcon, hamburgerMenu, hamburgerCollapsedMenu) => {
	hamburgerIcon.style.transform = "rotate(0deg)";
	hamburgerMenu.style.width = "0px";
	hamburgerCollapsedMenu.style.marginLeft = "0px";
}