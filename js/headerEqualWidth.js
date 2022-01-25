//Give hidden header element same width as the nav element

//Get nav element
let navElement = document.querySelector('.navContainer nav');

//get computed width of nav element
let computedWidth = window.getComputedStyle(navElement).width;

//Set width of hidden element
document.querySelector('.navContainer .hidden').style.width = computedWidth;