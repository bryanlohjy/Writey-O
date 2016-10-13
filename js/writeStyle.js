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


function vertCenter(parentID,childID,offset, paddingOrMargin){

	var parentHeight = document.getElementById(parentID).offsetHeight;
	var childHeight = document.getElementById(childID).offsetHeight;	
	var childStyle = document.getElementById(childID).style;

	if (paddingOrMargin == "padding"){
		childStyle.paddingTop = parentHeight / 2 - childHeight/2 + offset + "px";
	} else if (paddingOrMargin == "margin"){
		childStyle.marginTop = parentHeight / 2 - childHeight/2 + offset + "px";
	}
}






// Writey-O--------------
function positionCircles(noCircs){
	var container = document.getElementById('writeyO-circ-container');
	var containerNodes = document.getElementById('writeyO-circ-container').childNodes;
	var radius;

	var writeyOCirc = document.getElementById('writeyO');

	var originRotation = 180;
	var rotationUnit = 360/noCircs;

	for (var circIndex = 0; circIndex< containerNodes.length; circIndex++) {

		// rotating length
		var lengthRotAngle = circIndex * rotationUnit;
		var totalRotation = lengthRotAngle + originRotation;

	    containerNodes[circIndex].style.transform = "rotate(" + totalRotation + "deg)";
	    containerNodes[circIndex].style.webkitTransform = "rotate(" + totalRotation  + "deg)";
	    containerNodes[circIndex].style.MozTransform = "rotate(" + totalRotation  + "deg)";
	    containerNodes[circIndex].style.msTransform = "rotate(" + totalRotation  + "deg)";
	    containerNodes[circIndex].style.OTransform = "rotate(" + totalRotation  + "deg)";

	    // organising circles
		var circle = containerNodes[circIndex].childNodes[0];
		var radius = circle.offsetWidth/2;
	    circle.style.marginTop = -radius+"px";
	    circle.style.marginLeft = -radius+"px";

	    // rotating inner number
	    containerNodes[circIndex].childNodes[0].style.transform = "rotate(" + -totalRotation + "deg)";
	    containerNodes[circIndex].childNodes[0].style.webkitTransform = "rotate(" + -totalRotation  + "deg)";
	    containerNodes[circIndex].childNodes[0].style.MozTransform = "rotate(" + -totalRotation + "deg)";
	    containerNodes[circIndex].childNodes[0].style.msTransform = "rotate(" + -totalRotation  + "deg)";
	    containerNodes[circIndex].childNodes[0].style.OTransform = "rotate(" + -totalRotation + "deg)";

	    // totalRotation
	    // adjusting margins

	}

	// setting container position
	var existingContainerMargin = container.style.marginTop; 
	var newMargin = existingContainerMargin + radius*2;

	var writeyOCircRadius = writeyOCirc.offsetHeight/2
	console.log(writeyOCircRadius);

	container.style.marginTop = writeyOCircRadius + "px";

}
// Setup --------------
// Circ placem]ent


// Interaction ---------------
// Rotation
// function rotateWriteyO(noCircs,index){
// 	console.log(noCircs);
// 	var rotationUnit = 360/noCircs;
// 	var writeyO = document.getElementById('writeyO');
// 	var rotateBy = rotationUnit * index;

//     writeyO.style.webkitTransform = 'rotate('+rotateBy+'deg)'; 
//     writeyO.style.mozTransform    = 'rotate('+rotateBy+'deg)'; 
//     writeyO.style.msTransform     = 'rotate('+rotateBy+'deg)'; 
//     writeyO.style.oTransform      = 'rotate('+rotateBy+'deg)'; 
//     writeyO.style.transform       = 'rotate('+rotateBy+'deg)'; 

//     // rotating innerelements in reverse
//     console.log(writeyO.childNodes);
//     writeyO.childNodes["0"].childNodes[1].style.webkitTransform = 'rotate('+ -rotateBy+'deg)';
    
// }
function returnBracketVal(string){
	var indexOpenBracket = string.indexOf("(") +1;
	var indexClosedBracket = string.indexOf(")")-3;
	var val = parseFloat(string.substring(indexOpenBracket,indexClosedBracket),10);
	return val;
}


function rotateWriteyO(noCircs, index){
	var container = document.getElementById('writeyO-circ-container');
	var containerNodes = document.getElementById('writeyO-circ-container').childNodes;
	var radius;

	var writeyOCirc = document.getElementById('writeyO');
	var rotationUnit = 360/noCircs;
	var rotateBy = rotationUnit;

	for (var circIndex = 0; circIndex< containerNodes.length; circIndex++) {

		// rotating length
		// var totalRotation = circIndex* rotateBy;
		var currentRotUnparsed =containerNodes[circIndex].style.transform || containerNodes[circIndex].style.webkitTransform || containerNodes[circIndex].style.MozTransform || 
								containerNodes[circIndex].style.msTransform || containerNodes[circIndex].style.OTransform;

		var currentRot= returnBracketVal(currentRotUnparsed);
		var newRot = currentRot - rotationUnit;
		console.log("currentRot: " + currentRot);
		console.log(circIndex + " currentRotUnparsed: " + currentRotUnparsed);
		// console.log(circIndex + " rotationUnit: " + currentRot);
		// console.log("rotationUnit: " + rotationUnit);
		// console.log(circIndex+1 + " rotation: " + newRot);
		

	    containerNodes[circIndex].style.transform = "rotate(" + newRot + "deg)";
	    containerNodes[circIndex].style.webkitTransform = "rotate(" + newRot  + "deg)";
	    containerNodes[circIndex].style.MozTransform = "rotate(" + newRot + "deg)";
	    containerNodes[circIndex].style.msTransform = "rotate(" + newRot  + "deg)";
	    containerNodes[circIndex].style.OTransform = "rotate(" + newRot  + "deg)";

	    // organising circles


	    // rotating inner number
	    containerNodes[circIndex].childNodes[0].style.transform = "rotate(" + -newRot + "deg)";
	    containerNodes[circIndex].childNodes[0].style.webkitTransform = "rotate(" + -newRot  + "deg)";
	    containerNodes[circIndex].childNodes[0].style.MozTransform = "rotate(" + -newRot + "deg)";
	    containerNodes[circIndex].childNodes[0].style.msTransform = "rotate(" + -newRot  + "deg)";
	    containerNodes[circIndex].childNodes[0].style.OTransform = "rotate(" + -newRot + "deg)";

	    // totalRotation
	    // adjusting margins

	}
}






// document.getElementById('button').onclick = function() {
//     var div = document.getElementById('div'),
//         deg = rotated ? 0 : 66;

//     div.style.webkitTransform = 'rotate('+deg+'deg)'; 
//     div.style.mozTransform    = 'rotate('+deg+'deg)'; 
//     div.style.msTransform     = 'rotate('+deg+'deg)'; 
//     div.style.oTransform      = 'rotate('+deg+'deg)'; 
//     div.style.transform       = 'rotate('+deg+'deg)'; 

//     rotated = !rotated;
// }



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
// 		document.getElementById('writeyO').style.height=200+'px';
// 		document.getElementById('splash').style.height=200+'px';
// 	}
// 	else if (checkWidth()>breakpoint){
// 		fullHeight('writeyO');
// 		fullHeight('splash');
// 	}
// };