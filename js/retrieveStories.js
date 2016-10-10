// Retrieving Story entries from Firebase
// Get a database reference to our posts
var ref = firebase.database().ref("write");

var storyIndex = 0;

var returnedStories = retrieveStories();

// Looping through entries to return story objects
function retrieveStories(){
	var storyArray = [];
	ref.once("value").then(function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			var key = childSnapshot.key;
			var rawData = childSnapshot.val();
			var singleStory = [];
			var noPrompts = rawData.items.length;
			// iterate through object to return all responses
			for (i=0;i<noPrompts;i++){
				// returning response
				var singleResponse = rawData.items[i].response
				// appending response to story array
				singleStory.push(singleResponse);
			}	
			// appending whole single story as into global array
			storyArray.push(singleStory);
		});

var returnedStories = [
];

// Looping through entries to return story objects
ref.once("value").then(function(snapshot) {
	snapshot.forEach(function(childSnapshot) {
		var key = childSnapshot.key;
		var rawData = childSnapshot.val();

		var singleStory = [];
		var noPrompts = rawData.items.length;

		// iterate through object to return all responses
		for (i=0;i<noPrompts;i++){
			// returning response
			var singleResponse = rawData.items[i].response
			// appending response to story array
			singleStory.push(singleResponse);
		}	
		// appending whole single story as into global array
		returnedStories.push(singleStory);
	});
});



      // console.log(rawData.items[0].prompt);
      // // var response = key.items.length;
      // console.log(rawData.items.length);