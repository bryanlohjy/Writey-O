// Define Breakpoints
var breakpoint = 768;





// Resize Divs to Body Height
function fullHeight(elementID){
	var navHeight = document.getElementById('navBar').clientHeight;
	var windowHeight = window.innerHeight;
	var bodyHeight = windowHeight - navHeight;
	document.getElementById(elementID).style.height = bodyHeight+"px";
}

// Browser Width Check
function checkWidth(){
	return window.innerWidth;
}

// // Running functions
// document.addEventListener("DOMContentLoaded", function(event) { 
// 	if (checkWidth()<=breakpoint){
// 		document.getElementById('writeyO').style.height=200+'px';
// 	}
// 	else if (checkWidth()>breakpoint){
// 		fullHeight('writeyO');
// 	}
// });
// Functions are run within the React Components when rendered under "componentdidmount"

// Run functions on resize
// window.onresize = function(event) {
// 	if (checkWidth()<=breakpoint){
// 		document.getElementById('columns').style.height=200+'px';
// 	}
// 	else if (checkWidth()>breakpoint){
// 		fullHeight('columns');
// 	}
// };
// fullHeight('columns');