// Retrieving Story entries from Firebase
// Get a database reference to our posts
var ref = firebase.database().ref("write");

var storyIndex = 0;

var initialDataLoaded = false;

var storyArray = [];
// Looping through entries to return story objects
function populateRead(stories){
	var dom = {
		body:document.getElementById("body"),
		columns: document.getElementById("columns")
	}

	console.log("cat");
	console.log(stories.length);
	console.log(stories);
	// create card for each story
	for (var storyIndex=0;storyIndex<stories.length;storyIndex++){
		console.log(storyIndex);
		var storyDiv = document.createElement("ul");
		storyDiv.className = "storyItem";
		// appending list of responses to card
		for (var responseIndex=0;responseIndex<stories[storyIndex].length;responseIndex++){
			console.log(responseIndex);
			var singleResponse = document.createElement("li");
			singleResponse.innerHTML = stories[storyIndex][responseIndex];
			storyDiv.appendChild(singleResponse);
		}
		dom.columns.appendChild(storyDiv);
	}
}

function retrieveStories(){
	ref.once("value").then(function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			var key = childSnapshot.key;
			var rawData = childSnapshot.val();
			var singleStory = [];
			var retrieveNoPrompts = childSnapshot.val().items.length;
			// iterate through object to return all responses
			for (i=0;i<retrieveNoPrompts;i++){
				// returning response
				var singleResponse = rawData.items[i].response
				// appending response to story array
				singleStory.push(singleResponse);
			}	
			// appending whole single story as into global array
			storyArray.push(singleStory);
		});
		initialDataLoaded = true;
		console.log(initialDataLoaded);
		if (initialDataLoaded){
			populateRead(storyArray);
		}
	});


};

retrieveStories();
