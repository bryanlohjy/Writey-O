// Define Breakpoints
var tablet;
var mobile;
var desktop;

var mobileNav;
var currentState;
// Browser Width Check ---------------------
function checkWidth(){
	var tabletBreak = 768;
	var mobileNavBreak = 580;
	var mobileBreak = 425;

	var windowWidth = window.innerWidth;
	// check for desktop
	if(windowWidth>tabletBreak){
		desktop=true;
	}else if (windowWidth<=tabletBreak){
		desktop=false;
	}
	// check for tablet
	if(windowWidth>mobileBreak && windowWidth<=tabletBreak){
		tablet=true;
	}else if (windowWidth>tabletBreak){
		tablet=false;
	}

	if(windowWidth<=mobileBreak){
		mobile=true;
	}else if (windowWidth>mobileBreak){
		mobile=false;
	}

	if(windowWidth<=mobileNavBreak){
		mobileNav=true;
	}else if (windowWidth>mobileNavBreak){
		mobileNav=false;
	}
	// console.log("desktop: " + desktop);
	// console.log("tablet: " + tablet);
	// console.log("mobileNav: " + mobileNav);
	// console.log("mobile: " + mobile);
}
// Invoke width check on resize and initial load --------------------------
window.onresize=function(){
	checkWidth();
	if(currentState=="splash"){
		styleSplash();
	}else if(currentState=="session"){
		styleSession();
	}else if(currentState=="end"){
		styleEnd();
	}
	// apply restyles
}
window.onload=function(){
	checkWidth();
}
// Resize Divs to Body Height
function fullHeight(elementID){
	// If mobile is true, true full height to compensate for invisible nav
	if(mobileNav==true){
		var navHeight = 0;
	}else{
		var navHeight = document.getElementById('navBar').clientHeight;
	}
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
	var rotationUnit = 360/noCircs;
	if(desktop==true){
		var originRotation = 180;
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
	} else if (!desktop){
		var originRotation = 270;	
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
function rotateWriteyO(noCircs){
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
	clearStyleAttr('session-writeyO-indicator');
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
	if(desktop==false){
		splashText.innerHTML="Writey-O, tap to start."
	}else if(desktop==true){
		splashText.innerHTML="Writey-O, hit enter to start."	
	}
}
function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}
function clearStyleAttr(idName){
	document.getElementById(idName).removeAttribute('style');
}
function styleEndHistory(){
	var entryCont = document.getElementById('session-writeyO-entry-container');
	clearStyleAttr('session-writeyO-entry-container');
	if(mobile==true){
		entryCont.style.top = 20 + "px";
		entryCont.style.bottom = "";
	} else if(tablet==true){
		entryCont.style.top = -10 + "px";
		entryCont.style.bottom = "";
	}
}
function styleSplash(){
    fullHeight('splash');
    vertCenter('splash','splash-writeyO', 0, 'margin');
    if(desktop==true){
    	// console.log("stylingdesktop");
    	vertCenter('splash-writeyO','splash-text', 0, 'margin');   	
    }else if (tablet==true){
    	// console.log("stylingtablet");
    	vertCenter('splash-writeyO','splash-text', 0, 'margin');   	
    }else if (mobile==true){
    	// console.log("stylingmobile");
    	vertCenter('splash-writeyO','splash-text', 0, 'margin');   	    	
    }
	refreshSplashText();
}
function styleSession(){
    positionCircles(initWrite.noPrompts);
    fullHeight('session');

	if(desktop==true){
		clearStyleAttr('session-writeyO');
		clearStyleAttr('session-writeyO-timerPrompt');
	    vertCenter('session-left','session-writeyO', 0 , 'margin');
	    vertCenter('session-writeyO','session-writeyO-timerPrompt', -40 , 'margin');
	    styleIndicator();
	} else if (tablet==true || mobile==true){
		clearStyleAttr('session-writeyO');
		clearStyleAttr('session-writeyO-timerPrompt');
	    // vertCenter('session-left','session-writeyO', 0 , 'padding');
	    // vertCenter('session-writeyO','session-writeyO-timerPrompt', 0 , 'margin');
	    // styleIndicator();
	} 
}
function styleEnd(){
    fullHeight('end');
	if(desktop==true){
		clearStyleAttr('end-writeyO');
		clearStyleAttr('end-text');
	    vertCenter('end-left','end-writeyO', 0 , 'margin');
	    vertCenter('end-left','end-writeyO', 0, 'margin');
	    vertCenter('end-writeyO','end-text', 0, 'margin');
	} else if (desktop==false){
		clearStyleAttr('end-writeyO');
		clearStyleAttr('end-text');
		styleEndHistory();
	    // vertCenter('session-left','session-writeyO', 0 , 'padding');
	    // vertCenter('session-writeyO','session-writeyO-timerPrompt', 0 , 'margin');
	    // styleIndicator();
	}
}

