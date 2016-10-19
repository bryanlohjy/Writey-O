// Define Breakpoints
var tablet;
var currentState;
// Browser Width Check ---------------------
function checkWidth(){
	var breakpoint = 768;
	var windowWidth = window.innerWidth;
	if(windowWidth<=breakpoint){
		tablet=true;
	}else if (windowWidth>breakpoint){
		tablet=false;
	}
}
// Invoke width check on resize and initial load --------------------------
window.onresize=function(){
	checkWidth();
	console.log(window.innerWidth);
	console.log("currentstate"+currentState);
	if(currentState=="splash"){
		styleSplash();
		console.log("styledSplash");
	}else if(currentState=="session"){
		styleSession();
		console.log("styledSession");
	}else if(currentState=="end"){
		console.log("end");
	}
	// apply restyles
}
window.onload=function(){
	checkWidth();
	console.log(window.innerWidth);
	console.log("tablet="+tablet);
}
// Resize Divs to Body Height
function fullHeight(elementID){
	var navHeight = document.getElementById('navBar').clientHeight;
	var windowHeight = window.innerHeight;
	var bodyHeight = windowHeight - navHeight;
	document.getElementById(elementID).style.height = bodyHeight+"px";
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
	var container = document.getElementById('session-writeyO-circ-container');
	var containerNodes = document.getElementById('session-writeyO-circ-container').childNodes;
	var radius;
	var writeyOCirc = document.getElementById('session-writeyO');
	if(!tablet){
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
		}
		// setting container position
		var existingContainerMargin = container.style.marginTop; 
		var newMargin = existingContainerMargin + radius*2;
		var writeyOCircRadius = writeyOCirc.offsetHeight/2
		container.style.marginTop = writeyOCircRadius + "px";
	} else if (tablet==true){
		var originRotation = 270;	
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
		}
		// setting container position
		var existingContainerMargin = container.style.marginTop; 
		var newMargin = existingContainerMargin + radius*2;
		var writeyOCircRadius = writeyOCirc.offsetHeight/2
		container.style.marginTop = writeyOCircRadius + "px";
	}

}
function returnBracketVal(string){
	var indexOpenBracket = string.indexOf("(") +1;
	var indexClosedBracket = string.indexOf(")")-3;
	var val = parseFloat(string.substring(indexOpenBracket,indexClosedBracket),10);
	return val;
}
function rotateWriteyO(noCircs, index){
	var container = document.getElementById('session-writeyO-circ-container');
	var containerNodes = document.getElementById('session-writeyO-circ-container').childNodes;
	var radius;
	var writeyOCirc = document.getElementById('session-writeyO');
	var rotationUnit = 360/noCircs;
	var rotateBy = rotationUnit;
	for (var circIndex = 0; circIndex< containerNodes.length; circIndex++) {
		// rotating length
		var currentRotUnparsed =containerNodes[circIndex].style.transform || containerNodes[circIndex].style.webkitTransform || containerNodes[circIndex].style.MozTransform || 
								containerNodes[circIndex].style.msTransform || containerNodes[circIndex].style.OTransform;
		var currentRot= returnBracketVal(currentRotUnparsed);
		var newRot = currentRot - rotationUnit;
	    containerNodes[circIndex].style.transform = "rotate(" + newRot + "deg)";
	    containerNodes[circIndex].style.webkitTransform = "rotate(" + newRot  + "deg)";
	    containerNodes[circIndex].style.MozTransform = "rotate(" + newRot + "deg)";
	    containerNodes[circIndex].style.msTransform = "rotate(" + newRot  + "deg)";
	    containerNodes[circIndex].style.OTransform = "rotate(" + newRot  + "deg)";
	    // rotating inner number
	    containerNodes[circIndex].childNodes[0].style.transform = "rotate(" + -newRot + "deg)";
	    containerNodes[circIndex].childNodes[0].style.webkitTransform = "rotate(" + -newRot  + "deg)";
	    containerNodes[circIndex].childNodes[0].style.MozTransform = "rotate(" + -newRot + "deg)";
	    containerNodes[circIndex].childNodes[0].style.msTransform = "rotate(" + -newRot  + "deg)";
	    containerNodes[circIndex].childNodes[0].style.OTransform = "rotate(" + -newRot + "deg)";
	}
}
function styleIndicator(){
	var borderWidth = 2;
	var indicator = document.getElementById('session-writeyO-indicator');
	var inputForm = document.getElementById('session-writey-O-Input');
	var inputFormHeight=inputForm.clientHeight;
	// Bottom offset
	indicator.style.bottom= inputFormHeight+"px";
	// adjusting height
	var sessionLeft = document.getElementById('session-left');
	var sessionLeftWidth=sessionLeft.offsetWidth;
	var sessionLeftHeight=sessionLeft.clientHeight;
	indicator.style.height= (sessionLeftHeight/2-inputFormHeight)- borderWidth +"px";
	// adjusting width
	var writeyORM = document.getElementById('session-writeyO');
	var writeyORM = writeyORM.offsetWidth; 
	var activeCirc = document.getElementsByClassName('session-writeyO-circ-active');
	var activeCircRadius = activeCirc[0].offsetWidth/2;
	var indicWidth = ((sessionLeftWidth-(activeCircRadius + writeyORM))/2) - 3;
	console.log(activeCircRadius);
	indicator.style.width = indicWidth + "px";
}
function changeBG(colorIndex){
	var backgroundColours=[
		"rgb(11,0,51)",
		"rgb(85,76,97)",
		"rgb(134,77,92)",
		"rgb(199,102,69)",
		"rgb(240,131,62)",
		"rgb(170,206,22)"
	];
	var docBody=document.body;
	loopColIndex = colorIndex%backgroundColours.length;
	currentCol = backgroundColours[loopColIndex];
	// Background
	docBody.style.backgroundColor = currentCol;
	// Inactive circs
	var allCircs = [];
	var circClass = document.getElementsByClassName('session-writeyO-circ');
	for(var circClassIndex=0;circClassIndex<circClass.length;circClassIndex++){
		allCircs.push(circClass[circClassIndex]);
	}
	for(var inacCheckedIndex=0;inacCheckedIndex<allCircs.length;inacCheckedIndex++){
		allCircs[inacCheckedIndex].style.backgroundColor=currentCol;
		allCircs[inacCheckedIndex].style.color="white";
	}
	// Look for active class and apply diff styles
	for(var inacIndex=0;inacIndex<allCircs.length-1;inacIndex++){
		if(hasClass(allCircs[inacIndex],"session-writeyO-circ-active")==true){
			allCircs[inacIndex+1].style.backgroundColor="white";
			allCircs[inacIndex+1].style.color=currentCol;
		}
	}
}
function refreshSplashText(){
	var splashText=document.getElementById('splash-text');
	if(tablet==true){
		splashText.innerHTML="Writey-O, tap to start."
	}else if(!tablet){
		splashText.innerHTML="Writey-O, hit enter to start."	
	}

}
function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}
function clearStyleAttr(idName){
	document.getElementById(idName).removeAttribute('style');
	console.log("removedattr");
}
function styleSplash(){
	refreshSplashText();
    fullHeight('splash');
    vertCenter('splash','splash-writeyO', 0, 'margin');
    vertCenter('splash-writeyO','splash-text', 0, 'margin');
}
function styleSession(){
    positionCircles(initWrite.noPrompts);
    fullHeight('session');

	if(!tablet){
	    vertCenter('session-left','session-writeyO', 0 , 'margin');
	    vertCenter('session-writeyO','session-writeyO-timerPrompt', -40 , 'margin');
	    styleIndicator();
	} else if (tablet==true){
		clearStyleAttr('session-writeyO');
		clearStyleAttr('session-writeyO-timerPrompt');
	    // vertCenter('session-left','session-writeyO', 0 , 'padding');
	    // vertCenter('session-writeyO','session-writeyO-timerPrompt', 0 , 'margin');
	    // styleIndicator();
	}
}
function styleEnd(){
    fullHeight('end');
    vertCenter('end-left','end-writeyO', 0 , 'margin');
    this.props.saveOutput();
    vertCenter('end-left','end-writeyO', 0, 'margin');
    vertCenter('end-writeyO','end-text', 0, 'margin');
}

