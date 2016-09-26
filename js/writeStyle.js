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

// Running functions
if (checkWidth()<=breakpoint){
	document.getElementById('writeyO').style.height=200+'px';
}
else if (checkWidth()>breakpoint){
	fullHeight('writeyO');
}

// Run functions on resize
window.onresize = function(event) {
	if (checkWidth()<=breakpoint){
		document.getElementById('writeyO').style.height=200+'px';
	}
	else if (checkWidth()>breakpoint){
		fullHeight('writeyO');
	}
};